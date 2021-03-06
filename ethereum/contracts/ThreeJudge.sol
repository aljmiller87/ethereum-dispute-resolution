pragma solidity ^0.5.0;

contract ContractFactory {
    mapping(address => address[]) deployedContracts;
    mapping(address => bool) verifiedContracts;

    event ContractRoleCreated(
        uint256 indexed date,
        address indexed user,
        address indexed relatedContract
    );

    function isValidContract(address _contract) private view returns (bool) {
        return verifiedContracts[_contract] == true;
    }

    function addContractToUserList(address payable _actor, address _contract)
        public
    {
        if (isValidContract(_contract)) {
            deployedContracts[_actor].push(_contract);
            emit ContractRoleCreated(now, _actor, _contract);
        }
    }

    function createContract(address payable _actor, bool _isCreatorTheBuyer)
        public
        payable
    {
        ThreeJudge newContract = _isCreatorTheBuyer
            ? new ThreeJudge(msg.sender, _actor)
            : new ThreeJudge(_actor, msg.sender);
        verifiedContracts[address(newContract)] = true;
        addContractToUserList(msg.sender, address(newContract));
        addContractToUserList(_actor, address(newContract));
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
        IN_DISPUTE,
        CANCELLED,
        COMPLETE
    }
    enum DisputeState {
        AWAITING_JUDGE_SELECTION,
        AWAITING_NOMINATION,
        AWAITING_NOMINATION_CONFIRMATION,
        AWAITING_RESOLUTION,
        COMPLETE
    }

    State public currentState;
    DisputeState public currentDisputeState;

    event StatusEvent(
        uint256 indexed timestamp,
        address indexed triggeredByUser,
        string functionCalled,
        string description
    );

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
        currentDisputeState = DisputeState.AWAITING_JUDGE_SELECTION;
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
        }
        emit StatusEvent(
            now,
            msg.sender,
            "claimFunds",
            "Dispute State: Complete"
        );
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
        emit StatusEvent(now, msg.sender, "abort", "State: Cancelled");
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
        emit StatusEvent(
            now,
            msg.sender,
            "confirmPayment",
            "State: Awaiting Product Sent"
        );
    }

    function confirmProductSent() public inState(State.AWAITING_PRODUCT_SENT) {
        require(msg.sender == seller, "Only seller is authorized.");
        currentState = State.AWAITING_DELIVERY;
        emit StatusEvent(
            now,
            msg.sender,
            "confirmProductSent",
            "State: Awaiting Delivery"
        );
    }

    function confirmDelivery()
        public
        buyerOnly
        inState(State.AWAITING_DELIVERY)
    {
        seller.transfer(address(this).balance);
        currentState = State.COMPLETE;
        emit StatusEvent(now, msg.sender, "confirmDelivery", "State: Complete");
    }

    function initDispute() public buyerSellerOnly {
        require(
            currentState == State.AWAITING_PRODUCT_SENT ||
                currentState == State.AWAITING_DELIVERY,
            "Cannot initiate dispute because contract must either be in Awaiting Product Sent or Awaiting Delivery states."
        );
        currentState = State.IN_DISPUTE;
        emit StatusEvent(now, msg.sender, "initDispute", "State: In Dispute");
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
        require(
            (_judge != buyer && _judge != seller),
            "Parties in the dispute are not elligible as judges."
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
            awaitingParty = buyer;
        }

        if (buyerJudge != address(0) && sellerJudge != address(0)) {
            currentDisputeState = DisputeState.AWAITING_NOMINATION;
            cancelDeadline();
        } else {
            setNewDeadline();
        }
        string memory newState = currentDisputeState ==
            DisputeState.AWAITING_JUDGE_SELECTION
            ? "Dispute State: Awaiting Judge Selection"
            : "State: Awaiting Final Judge Nomination";
        emit StatusEvent(now, msg.sender, "pickJudge", newState);
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
        require(
            (_nominatedJudge != buyerJudge && _nominatedJudge != sellerJudge),
            "Existing judges are not eligible to nominated for the final judge."
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
        emit StatusEvent(
            now,
            msg.sender,
            "nominateFinalJudge",
            "Dispute State: Awaiting Nomination Confirmation"
        );
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

        string memory newState = currentDisputeState ==
            DisputeState.AWAITING_RESOLUTION
            ? "Dispute State: Awaiting Resolution"
            : "Dispute State: Awaiting Final Judge Nomination";
        emit StatusEvent(now, msg.sender, "confirmFinalJudge", newState);
    }

    function provideTestimony(string memory _testimony)
        public
        buyerSellerOnly
        inState(State.IN_DISPUTE)
    {
        emit StatusEvent(now, msg.sender, "provideTestimony", _testimony);
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
        }
        string memory newState = currentDisputeState == DisputeState.COMPLETE
            ? "Dispute State: Complete"
            : "Dispute State: Awaiting Resolution";
        emit StatusEvent(now, msg.sender, "arbtrateDispute", newState);
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
        balance = address(this).balance;
        emit StatusEvent(
            now,
            msg.sender,
            "distributeFunds",
            "Dispute State: Complete"
        );
    }

    function getStatus()
        public
        view
        returns (
            State,
            DisputeState,
            address,
            address,
            uint256
        )
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
            bool,
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
            hasVoted[finalJudge],
            votesForBuyer,
            votesForSeller,
            deadline,
            awaitingParty
        );
    }
}
