pragma solidity ^0.5.0;

contract ContractFactory {
    mapping (address=>address[]) deployedContracts;

    function createContract(address payable _seller) public {
        ThreeJudge newContract = new ThreeJudge(msg.sender, _seller);
        deployedContracts[msg.sender].push(address(newContract));
        deployedContracts[_seller].push(address(newContract));
    }

    function getdeployedContracts() public view returns (address[] memory) {
        return deployedContracts[msg.sender];
    }
}

contract ThreeJudge {

    enum State {AWAITING_PAYMENT, AWAITING_PRODUCT_SENT, AWAITING_DELIVERY, COMPLETE, IN_DISPUTE, CANCELLED}
    enum DisputeState {AWAITING_S_JUDGE, AWAITING_NOMINATION, AWAITING_NOMINATION_CONFIRMATION, AWAITING_RESOLUTION, COMPLETE}

    State public currentState;
    DisputeState public currentDisputeState;

    uint public deadline;
    address public awaitingParty;
    address payable public buyer;
    address payable public seller;
    address payable public buyerJudge;
    address payable public sellerJudge;
    address payable public nominatedJudge;
    address payable public finalJudge;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public hasNominated;
    uint public balance;
    uint public votesForBuyer = 0;
    uint public votesForSeller = 0;

    // confirmPayment needs to require correct balance

    modifier buyerOnly() {
        require(msg.sender == buyer, "Only buyer is authorized.");
        _;
    }

    modifier sellerOnly() {
        require(msg.sender == seller, "Only seller is authorized.");
        _;
    }

    modifier buyerSellerOnly() {
        require(msg.sender == buyer || msg.sender == seller, "Only buyer and seller are authorized.");
        _;
    }

    modifier judgeOnly() {
        require(msg.sender == buyerJudge || msg.sender == sellerJudge || msg.sender == finalJudge, "Only judges are authorized.");
        _;
    }

    modifier noActiveDipuste() {
        require(currentState != State.IN_DISPUTE, "Requires there to be no active dispute. Please continue with arbitration process.");
        _;
    }

    modifier inState(State expectedState) {
        require(currentState == expectedState, "Sender not authorized.");
        _;
    }

    modifier inDisputeState(DisputeState expectedState) {
        require(currentDisputeState == expectedState, "Sender not authorized.");
        _;
    }

    constructor(address payable _buyer, address payable _seller) payable public {
        buyer = _buyer;
        seller = _seller;
        balance = 0;
        currentState = State.AWAITING_PAYMENT;
    }

    function abort() public sellerOnly noActiveDipuste {
        require(currentState == State.AWAITING_PAYMENT || currentState == State.AWAITING_PRODUCT_SENT, "Cannot abort contract after product is sent.");
        currentState = State.CANCELLED;
        if (currentState == State.AWAITING_PRODUCT_SENT) {
            buyer.transfer(address(this).balance);
        }
    }

    function confirmPayment() public buyerOnly noActiveDipuste inState(State.AWAITING_PAYMENT) payable {
        currentState = State.AWAITING_PRODUCT_SENT;
        balance += msg.value;
    }

    function confirmProductSent() public sellerOnly noActiveDipuste inState(State.AWAITING_PRODUCT_SENT) {
        currentState = State.AWAITING_DELIVERY;
    }

    function confirmDelivery() public buyerOnly noActiveDipuste inState(State.AWAITING_DELIVERY) {
        seller.transfer(address(this).balance);
        currentState = State.COMPLETE;
    }

    function initDispute(address payable _judge) public buyerOnly noActiveDipuste {
        currentState = State.IN_DISPUTE;
        pickJudge(_judge);
        currentDisputeState = DisputeState.AWAITING_S_JUDGE;
    }

    function setNewDeadline() private {
        deadline = now + 3 days;
    }

    function cancelDeadline() private {
        deadline = 0;
    }

    function pickJudge(address payable _judge) public buyerSellerOnly inState(State.IN_DISPUTE) {
        if (msg.sender == buyer) {
            buyerJudge = _judge;
            hasVoted[buyerJudge] = false;
            hasNominated[buyerJudge] = false;
            currentDisputeState = DisputeState.AWAITING_S_JUDGE;
            setNewDeadline();
            awaitingParty = seller;
        } else {
            require(currentDisputeState == DisputeState.AWAITING_S_JUDGE, "Seller must select judge.");
            sellerJudge = _judge;
            hasVoted[sellerJudge] = false;
            hasNominated[sellerJudge] = false;
            currentDisputeState = DisputeState.AWAITING_NOMINATION;
        }
    }

    function nominateFinalJudge(address payable _nominatedJudge) public inState(State.IN_DISPUTE) inDisputeState(DisputeState.AWAITING_NOMINATION) {
        require(msg.sender == buyerJudge || msg.sender == sellerJudge, "Only judges are authorized to nominate final judge.");
        require(hasNominated[msg.sender] == false, "Your nomination has already been submitted.");
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

    function confirmFinalJudge(bool _approve) public judgeOnly inState(State.IN_DISPUTE) inDisputeState(DisputeState.AWAITING_NOMINATION_CONFIRMATION) {
        require(hasNominated[msg.sender] == false, "The judge who nominated the final judge cannot approve the nominated judge.");
        if (_approve == true) {
            finalJudge = nominatedJudge;
            currentDisputeState = DisputeState.AWAITING_RESOLUTION;
        } else {
            currentDisputeState = DisputeState.AWAITING_NOMINATION;
            hasNominated[buyerJudge] = false;
            hasNominated[sellerJudge] = false;
        }
    }

    function arbtrateDispute(bool _forBuyer) public judgeOnly inDisputeState(DisputeState.AWAITING_RESOLUTION) {
        require(hasVoted[msg.sender] == false, 'A judge can only vote once.');
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
            payJudges();
            completeArbitration();
        }
    }

    function payJudges() private {
        uint judgeFee = address(this).balance / 100;
        buyerJudge.transfer(judgeFee);
        sellerJudge.transfer(judgeFee);
        finalJudge.transfer(judgeFee);
    }

    function completeArbitration() private {
        if (votesForBuyer >= 2) {
            buyer.transfer(address(this).balance);
        } else {
            seller.transfer(address(this).balance);
        }
        currentDisputeState = DisputeState.COMPLETE;
        currentState = State.COMPLETE;
    }

    function getStatus() public view returns (
        State,
        DisputeState,
        address,
        address,
        uint
    ) {
        return (
            currentState,
            currentDisputeState,
            buyer,
            seller,
            balance
        );
    }

    function getDisputeStatus() public view returns (
        address,
        bool,
        bool,
        address,
        bool,
        bool,
        address,
        address,
        uint,
        uint
    ) {
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
            votesForSeller
        );
    }
}