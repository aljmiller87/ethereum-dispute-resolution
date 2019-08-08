pragma solidity ^0.5.0;

contract ContractFactory {
    address[] public deployedContracts;

    function createContract(address payable _buyer, address payable _seller) public {
        ThreeJudge newContract = new ThreeJudge(_buyer, _seller);
        deployedContracts.push(address(newContract));
    }

    function getCampaignsByAddress() public view returns (address[] memory) {
        return deployedContracts;
    }
}

contract ThreeJudge {

    enum State {AWAITING_PAYMENT, AWAITING_PRODUCT_SENT, AWAITING_DELIVERY, COMPLETE, IN_DISPUTE}
    enum DisputeState {AWAITING_B_JUDGE, AWAITING_S_JUDGE, AWAITING_NOMINATION, AWAITING_NOMINATION_CONFIRMATION, AWAITING_RESOLUTION, COMPLETE}

    State public currentState;
    DisputeState public currentDisputeState;

    address payable public buyer;
    address payable public seller;
    address payable public buyerJudge;
    address payable public sellerJudge;
    address payable public nominatedJudge;
    address payable public finalJudge;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public hasNominated;
    uint public ballance;
    uint public votesForBuyer = 0;
    uint public votesForSeller = 0;

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
        ballance = 0;
        currentState = State.AWAITING_PAYMENT;
    }

    function confirmPayment() public buyerOnly noActiveDipuste inState(State.AWAITING_PAYMENT) payable {
        currentState = State.AWAITING_PRODUCT_SENT;
        ballance += msg.value;
    }

    function confirmProductSent() public sellerOnly noActiveDipuste inState(State.AWAITING_PRODUCT_SENT) payable {
        currentState = State.AWAITING_DELIVERY;
        ballance += msg.value;
    }

    function confirmDelivery() public buyerOnly noActiveDipuste inState(State.AWAITING_DELIVERY) {
        seller.transfer(address(this).balance);
        currentState = State.COMPLETE;
    }

    function initDispute() public buyerOnly noActiveDipuste {
        currentState = State.IN_DISPUTE;
        currentDisputeState = DisputeState.AWAITING_B_JUDGE;
    }

    function pickJudge(address payable _judge) public buyerSellerOnly inState(State.IN_DISPUTE) {
        if (msg.sender == buyer) {
            require(currentDisputeState == DisputeState.AWAITING_B_JUDGE, "Buyer must select judge first.");
            buyerJudge = _judge;
            hasVoted[buyerJudge] = false;
            hasNominated[buyerJudge] = false;
            currentDisputeState = DisputeState.AWAITING_S_JUDGE;

        } else {
            require(currentDisputeState == DisputeState.AWAITING_S_JUDGE, "Seller must select judge.");
            sellerJudge = _judge;
            hasVoted[sellerJudge] = false;
            hasNominated[sellerJudge] = false;
            currentDisputeState = DisputeState.AWAITING_NOMINATION;
        }
    }

    function nominateFinalJudge(address payable _finalJudge) public inState(State.IN_DISPUTE) inDisputeState(DisputeState.AWAITING_NOMINATION) {
        require(msg.sender == buyerJudge || msg.sender == sellerJudge, "Only judges are authorized to nominate final judge.");
        require(hasNominated[msg.sender] == false, "Your nomination has already been submitted.");
        hasNominated[msg.sender] = true;
        nominatedJudge = _finalJudge;
        currentDisputeState = DisputeState.AWAITING_NOMINATION_CONFIRMATION;
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

        if (votesForBuyer >= 2 || votesForSeller >= 2) {
            payJudges();
            completeArbitration();
        }
    }

    function payJudges() private {
        uint balance = address(this).balance;
        uint judgeFee = balance / 100;
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
}