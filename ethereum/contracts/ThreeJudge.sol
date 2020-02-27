pragma solidity ^0.5.0;

contract ContractFactory {
    mapping(address => address[]) deployedContracts;

    function addContractToUserList(address payable _actor, address _contract)
        public
    {
        deployedContracts[_actor].push(_contract);
    }

    function createContract(address payable _actor, bool _isCreatorTheBuyer)
        public
        payable
    {
        ThreeJudge newContract = _isCreatorTheBuyer
            ? new ThreeJudge(msg.sender, _actor)
            : new ThreeJudge(_actor, msg.sender);
        addContractToUserList(msg.sender, address(newContract));
        addContractToUserList(_actor, address(newContract));
        // deployedContracts[msg.sender].push(address(newContract));
        // deployedContracts[_actor].push(address(newContract));
    }

    function getdeployedContracts() public view returns (address[] memory) {
        return deployedContracts[msg.sender];
    }
}

contract ThreeJudge {
    enum State {
        AWAITING_PAYMENT,
        AWAITING_PRODUCT_SENT,
        AWAITING_DELIVERY,
        COMPLETE,
        IN_DISPUTE,
        CANCELLED
    }
    enum DisputeState {
        NO_DISPUTE,
        AWAITING_JUDGE_SELECTION,
        AWAITING_NOMINATION,
        AWAITING_NOMINATION_CONFIRMATION,
        AWAITING_RESOLUTION,
        COMPLETE
    }

    State public currentState;
    DisputeState public currentDisputeState;

    struct Testimony {
        string description;
        uint256 timestamp;
        address witness;
    }

    Testimony[] public testimony;
    uint256 public deadline;
    address public awaitingParty;
    address payable public buyer;
    address payable public seller;
    address payable public buyerJudge;
    address payable public sellerJudge;
    address payable public nominatedJudge;
    address payable public finalJudge;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public hasNominated;
    uint256 public balance;
    uint256 public votesForBuyer = 0;
    uint256 public votesForSeller = 0;

    // confirmPayment needs to require correct balance

    modifier buyerOnly() {
        require(msg.sender == buyer, "Only buyer is authorized.");
        _;
    }

    modifier buyerSellerOnly() {
        require(
            msg.sender == buyer || msg.sender == seller,
            "Only buyer and seller are authorized."
        );
        _;
    }

    modifier judgeOnly() {
        require(
            msg.sender == buyerJudge ||
                msg.sender == sellerJudge ||
                msg.sender == finalJudge,
            "Only judges are authorized."
        );
        _;
    }

    modifier inState(State expectedState) {
        require(
            currentState == expectedState,
            "Action cannot be called at this state."
        );
        _;
    }

    modifier inDisputeState(DisputeState expectedState) {
        require(
            currentDisputeState == expectedState,
            "Action cannot be called at this dispute state."
        );
        _;
    }

    constructor(address payable _buyer, address payable _seller)
        public
        payable
    {
        buyer = _buyer;
        seller = _seller;
        buyerJudge = address(0);
        sellerJudge = address(0);
        balance = 0;
        currentState = State.AWAITING_PAYMENT;
        currentDisputeState = DisputeState.NO_DISPUTE;
    }

    function setNewDeadline() private {
        deadline = now + 3 days;
    }

    function cancelDeadline() private {
        deadline = 0;
        awaitingParty = address(0);
    }

    function claimFunds() public buyerSellerOnly inState(State.IN_DISPUTE) {
        require(
            deadline > 0,
            "There must be valid deadline that has been violated. No current deadline set."
        );
        require(deadline < now, "Deadline has not expired");
        if (awaitingParty == finalJudge) {
            finalJudge = address(0);
            nominatedJudge = address(0);
            currentDisputeState = DisputeState.AWAITING_NOMINATION;
        } else {
            if (awaitingParty == buyer) {
                seller.transfer(address(this).balance);
            }
            if (awaitingParty == seller) {
                buyer.transfer(address(this).balance);
            }
            currentDisputeState = DisputeState.COMPLETE;
            currentState = State.COMPLETE;
        }
    }

    function abort() public buyerSellerOnly {
        require(
            currentState == State.AWAITING_PAYMENT ||
                currentState == State.AWAITING_PRODUCT_SENT,
            "Cannot abort contract after product is sent. Must initiate dispute for arbitration"
        );
        if (msg.sender == buyer) {
            require(
                currentState == State.AWAITING_PAYMENT,
                "Buyer cannot abort contract after funds submitted. Buyer must initiate dispute for arbitration."
            );
        }
        currentState = State.CANCELLED;
        if (address(this).balance > 0) {
            buyer.transfer(address(this).balance);
        }
    }

    function confirmPayment()
        public
        payable
        buyerOnly
        inState(State.AWAITING_PAYMENT)
    {
        require(msg.value > 0, "No funds sent");
        currentState = State.AWAITING_PRODUCT_SENT;
        balance += msg.value;
    }

    function confirmProductSent() public inState(State.AWAITING_PRODUCT_SENT) {
        require(msg.sender == seller, "Only seller is authorized.");
        currentState = State.AWAITING_DELIVERY;
    }

    function confirmDelivery()
        public
        buyerOnly
        inState(State.AWAITING_DELIVERY)
    {
        seller.transfer(address(this).balance);
        currentState = State.COMPLETE;
    }

    function initDispute() public buyerSellerOnly {
        require(
            currentState == State.AWAITING_PRODUCT_SENT ||
                currentState == State.AWAITING_DELIVERY,
            "Cannot initiate dispute due to one of the following: 1) Contract can still be aborted without dispute. 2) There is currently an open dispute. 3) Contract is either complete or cancelled"
        );
        currentState = State.IN_DISPUTE;
        currentDisputeState == DisputeState.AWAITING_JUDGE_SELECTION;
    }

    function pickJudge(address payable _judge)
        public
        buyerSellerOnly
        inState(State.IN_DISPUTE)
    {
        require(
            currentDisputeState == DisputeState.AWAITING_JUDGE_SELECTION,
            "Cannot select Judges at this time."
        );
        if (msg.sender == buyer) {
            require(
                buyerJudge == address(0),
                "Judge has already been selected."
            );
            buyerJudge = _judge;
            hasVoted[buyerJudge] = false;
            hasNominated[buyerJudge] = false;
            awaitingParty = seller;
        } else {
            require(
                sellerJudge == address(0),
                "Judge has already been selected."
            );
            sellerJudge = _judge;
            hasVoted[sellerJudge] = false;
            hasNominated[sellerJudge] = false;
            awaitingParty = seller;
        }

        if (buyerJudge != address(0) && sellerJudge != address(0)) {
            currentDisputeState = DisputeState.AWAITING_NOMINATION;
            cancelDeadline();
        } else {
            setNewDeadline();
        }
    }

    function nominateFinalJudge(address payable _nominatedJudge)
        public
        inDisputeState(DisputeState.AWAITING_NOMINATION)
    {
        require(
            msg.sender == buyerJudge || msg.sender == sellerJudge,
            "Only judges are authorized to nominate final judge."
        );
        require(
            hasNominated[msg.sender] == false,
            "Your nomination has already been submitted."
        );
        hasNominated[msg.sender] = true;
        nominatedJudge = _nominatedJudge;
        currentDisputeState = DisputeState.AWAITING_NOMINATION_CONFIRMATION;
        setNewDeadline();
        if (msg.sender == buyerJudge) {
            awaitingParty = seller;
        } else {
            awaitingParty = buyer;
        }
    }

    function confirmFinalJudge(bool _approve)
        public
        judgeOnly
        inDisputeState(DisputeState.AWAITING_NOMINATION_CONFIRMATION)
    {
        require(
            hasNominated[msg.sender] == false,
            "The judge who nominated the final judge cannot approve the nominated judge."
        );
        if (_approve == true) {
            finalJudge = nominatedJudge;
            currentDisputeState = DisputeState.AWAITING_RESOLUTION;
        } else {
            currentDisputeState = DisputeState.AWAITING_NOMINATION;
            hasNominated[buyerJudge] = false;
            hasNominated[sellerJudge] = false;
            nominatedJudge = address(0);
        }
    }

    function provideTestimony(string memory _testimony)
        public
        buyerSellerOnly
        inState(State.IN_DISPUTE)
    {
        Testimony memory newTesimony = Testimony({
            description: _testimony,
            timestamp: now,
            witness: msg.sender
        });
        testimony.push(newTesimony);
    }

    function getTestimonyCount() public view returns (uint256) {
        return testimony.length;
    }

    function getTestimony(uint256 index)
        public
        view
        returns (string memory, uint256, address)
    {
        return (
            testimony[index].description,
            testimony[index].timestamp,
            testimony[index].witness
        );
    }

    function arbtrateDispute(bool _forBuyer)
        public
        judgeOnly
        inDisputeState(DisputeState.AWAITING_RESOLUTION)
    {
        require(hasVoted[msg.sender] == false, "A judge can only vote once.");
        hasVoted[msg.sender] = true;
        if (_forBuyer == true) {
            votesForBuyer = votesForBuyer + 1;
        } else {
            votesForSeller = votesForSeller + 1;
        }

        if (hasVoted[buyerJudge] == true && hasVoted[sellerJudge] == true) {
            setNewDeadline();
            awaitingParty = finalJudge;
        } else {
            if (msg.sender == buyerJudge) {
                setNewDeadline();
                awaitingParty = seller;
            }

            if (msg.sender == sellerJudge) {
                setNewDeadline();
                awaitingParty = buyer;
            }
        }

        if (votesForBuyer >= 2 || votesForSeller >= 2) {
            currentDisputeState = DisputeState.COMPLETE;
            currentState = State.COMPLETE;
        }
    }

    function distributeFunds()
        public
        payable
        inDisputeState(DisputeState.COMPLETE)
    {
        uint256 judgeFee = balance / 100;
        uint256 settlement = (balance / 100) * 97;
        buyerJudge.transfer(judgeFee);
        sellerJudge.transfer(judgeFee);
        finalJudge.transfer(judgeFee);
        if (votesForBuyer >= 2) {
            buyer.transfer(settlement);
        } else {
            seller.transfer(settlement);
        }
    }

    function getStatus()
        public
        view
        returns (State, DisputeState, address, address, uint256)
    {
        return (currentState, currentDisputeState, buyer, seller, balance);
    }

    function getDisputeStatus()
        public
        view
        returns (
            address,
            bool,
            bool,
            address,
            bool,
            bool,
            address,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        return (
            buyerJudge,
            hasNominated[buyerJudge],
            hasVoted[buyerJudge],
            sellerJudge,
            hasNominated[sellerJudge],
            hasVoted[sellerJudge],
            nominatedJudge,
            finalJudge,
            votesForBuyer,
            votesForSeller,
            testimony.length,
            deadline,
            awaitingParty
        );
    }
}
