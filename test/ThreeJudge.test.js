const assert = require("assert");
const chai = require("chai");
const should = chai.should();
const ganache = require("ganache-cli");
const Web3 = require("web3");
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(ganache.provider(), null, OPTIONS);
web3.currentProvider.setMaxListeners(300);

const compiledContract = require("../ethereum/build/ThreeJudge.json");
const compiledFactory = compiledContract.ContractFactory;
const compiledFactoryABI = compiledFactory.abi;
const compiledFactoryBytecode = compiledFactory.evm.bytecode.object;
const compiledThreeJudge = compiledContract.ThreeJudge;
const compiledThreeJudgeABI = compiledThreeJudge.abi;
const compiledThreeJudgeBytecode = compiledThreeJudge.evm.bytecode.object;

let accounts;
let factory;
let threeJudgeAddress;
let threeJudge;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactoryABI)
    .deploy({ data: "0x" + compiledFactoryBytecode })
    .send({ from: accounts[0], gas: "6000000" });

  await factory.methods.createContract(`${accounts[1]}`).send({
    from: accounts[0],
    gas: "5000000"
  });

  [threeJudgeAddress] = await factory.methods.getdeployedContracts().call();
  threeJudge = await new web3.eth.Contract(
    compiledThreeJudgeABI,
    threeJudgeAddress
  );
});

describe("Factory and Contract Initialization", () => {
  it("deploys a factory and a threeJudge", () => {
    should.exist(factory.options.address);
    factory.options.address.should.be.a("string");
    should.exist(threeJudge.options.address);
    threeJudge.options.address.should.be.a("string");
  });

  it("confirms factory is tracking child contract via mapping", async () => {
    const contractAddress = threeJudge.options.address;
    const [foundAddress] = await factory.methods.getdeployedContracts().call();
    contractAddress.should.equal(foundAddress);
  });

  it("confirms starting point for threeJudge", async () => {
    const buyer = await threeJudge.methods.buyer().call();
    const seller = await threeJudge.methods.seller().call();
    const initialState = await threeJudge.methods.currentState().call();
    const initialDisputeState = await threeJudge.methods
      .currentDisputeState()
      .call();
    buyer.should.equal(`${accounts[0]}`);
    seller.should.equal(`${accounts[1]}`);
    initialState.should.equal("0");
    initialDisputeState.should.equal("0");
  });
});

describe("Submitting payment step", async () => {
  it("Confirms only buyer can submit payment", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmPayment().send({
        value: "1000000",
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Only buyer is authorized.");
  });

  it("Confirms confirmPayment results in contract balance and new state", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    const updatedState = await threeJudge.methods.currentState().call();
    updatedState.should.equal("1");

    // Confirms contract receives value from confirmPayment
    const balance = await web3.eth.getBalance(threeJudge.options.address);
    balance.should.be.equal("1000000");
  });
});

describe("Confirms Abort Functionality", async () => {
  it("Confirms only Seller can call Abort", async () => {
    try {
      await threeJudge.methods.abort().send({
        from: accounts[0]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("Confirms abort can be called in AWAITING_PAYMENT state", async () => {
    await threeJudge.methods.abort().send({
      from: accounts[1]
    });
    let abortedState = await threeJudge.methods.currentState().call();
    abortedState.should.equal("5");
  });

  it("Confirms abort can be called in AWAITING_PRODUCT_SENT state", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });

    let initialState = await threeJudge.methods.currentState().call();
    initialState.should.equal("1");
  });

  it("Confirms abort functionality will refund contract balance", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });

    let initialBalance = await web3.eth.getBalance(accounts[0]);
    await threeJudge.methods.abort().send({
      from: accounts[1]
    });

    const balance = await web3.eth.getBalance(threeJudge.options.address);
    balance.should.be.equal("0");

    initialState = await threeJudge.methods.currentState().call();
    initialState.should.equal("5");
    let newBalance = await web3.eth.getBalance(accounts[0]);
    const balanceDiff = parseFloat(newBalance) - parseFloat(initialBalance);
    balanceDiff.should.be.at.least(990000);
  });
});

describe("Confirm confirmProductSent Functionality", async () => {
  it("Requires to be called in AWAITING_PRODUCT_SENT state", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmProductSent().send({
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this state");
  });

  it("Requires confirmProductSent to be called by seller", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });

    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmProductSent().send({
        from: accounts[0]
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Only seller is authorized.");
  });

  it("Confirms confirmProductSent updates state", async () => {
    let state = "_PRETEST_";
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.confirmProductSent().send({
      from: accounts[1]
    });
    state = await threeJudge.methods.currentState().call();
    state.should.be.equal("2");
  });
});

describe("Confirm confirmDelivery Functionality", async () => {
  it("Requires to be called in AWAITING_DELIVERY state", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmDelivery().send({
        from: accounts[0]
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this state");
  });

  it("Requires confirmProductSent to be called by buyer", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });

    await threeJudge.methods.confirmProductSent().send({
      from: accounts[1]
    });

    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmDelivery().send({
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Only buyer is authorized.");
  });

  it("Confirms confirmDelivery updates state and transfers balance to seller", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });

    await threeJudge.methods.confirmProductSent().send({
      from: accounts[1]
    });

    let initialSellerBalance = await web3.eth.getBalance(accounts[1]);

    await threeJudge.methods.confirmDelivery().send({
      from: accounts[0]
    });

    let newSellerBalance = await web3.eth.getBalance(accounts[1]);
    const balanceDiff =
      parseInt(newSellerBalance) - parseInt(initialSellerBalance);
    balanceDiff.should.be.greaterThan(0);
    balanceDiff.should.be.greaterThan(990000);
    balanceDiff.should.be.lessThan(1000000);

    let state = "_PRETEST_";
    state = await threeJudge.methods.currentState().call();
    state.should.be.equal("3");
  });
});

describe("Initiating Dispute Functionality", async () => {
  it("Confirms initDispute must be called with address argument", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.initDispute().send({
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Invalid number of parameters");
  });

  it("Confirms buyer can call initDispute", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.initDispute(accounts[2]).send({
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Only buyer is authorized.");
  });

  it("Confirms initDispute can only be called after buyer submits funds to contract", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.initDispute(accounts[2]).send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain(
      "Buyer can only initiate dispute after funds submitted to contract"
    );
  });

  it("Confirms initDispute cannot be called during active dispute", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.initDispute(accounts[2]).send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain(
      "Requires there to be no active dispute. Please continue with arbitration process"
    );
  });

  it("Confirms initDispute updates state and dispute variables", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    const state = await threeJudge.methods.currentState().call();
    const disputeState = await threeJudge.methods.currentDisputeState().call();
    state.should.equal("4");
    disputeState.should.equal("1");

    const buyerJudge = await threeJudge.methods.buyerJudge().call();
    buyerJudge.should.equal(accounts[2]);
    const buyerJudgeHasVoted = await threeJudge.methods
      .hasVoted(accounts[2])
      .call();
    buyerJudgeHasVoted.should.equal(false);
    const buyerJudgeHasNominated = await threeJudge.methods
      .hasNominated(accounts[2])
      .call();
    buyerJudgeHasNominated.should.equal(false);
    let now = parseInt(new Date().getTime() / 1000);
    let deadline = await threeJudge.methods.deadline().call();
    deadline = parseInt(deadline);
    deadline = deadline - now;
    // 259199 seconds =  3 days minus 1 second
    // deadline.should.be.greaterThan(259100);
    const awaitingParty = await threeJudge.methods.awaitingParty().call();
    awaitingParty.should.equal(accounts[1]);
  });

  it("Confirms Seller calling pickJudge updates state and dispute variables", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });

    const sellerJudge = await threeJudge.methods.sellerJudge().call();
    sellerJudge.should.equal(accounts[3]);
    const sellerJudgeHasVoted = await threeJudge.methods
      .hasVoted(accounts[2])
      .call();
    sellerJudgeHasVoted.should.equal(false);
    const sellerJudgeHasNominated = await threeJudge.methods
      .hasNominated(accounts[2])
      .call();
    sellerJudgeHasNominated.should.equal(false);
    let deadline = await threeJudge.methods.deadline().call();
    deadline.should.equal("0");
    const awaitingParty = await threeJudge.methods.awaitingParty().call();
    awaitingParty.should.contain("0x0000");
  });
});

describe("Nominating Final Judge Functionality", async () => {
  it("Confirms judge can only be nominated during active dispute", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this dispute state");
  });

  it("Confirms judge can only be nominated during AWAITING_NOMINATION stage of dispute", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
        from: accounts[2],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this dispute state");
  });

  it("Confirms only judges can nominated final judge", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain(
      "Only judges are authorized to nominate final judge"
    );
  });

  it("Confirms judge cannot nominate twice", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.nominateFinalJudge(accounts[5]).send({
        from: accounts[2],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this dispute state");
  });

  it("Confirms nominating judges updates state variables", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });

    //Tracks which judge has nominated
    const buyerJudgeNominated = await threeJudge.methods
      .hasNominated(accounts[2])
      .call();
    const sellerJudgeNominated = await threeJudge.methods
      .hasNominated(accounts[3])
      .call();
    buyerJudgeNominated.should.equal(true);
    sellerJudgeNominated.should.equal(false);

    // Confirms nominated final judge saved
    const nominatedJudge = await threeJudge.methods.nominatedJudge().call();
    nominatedJudge.should.equal(accounts[4]);

    // Confirms new dispute status
    const updatedDisputeState = await threeJudge.methods
      .currentDisputeState()
      .call();
    updatedDisputeState.should.equal("2");

    // Confirms updated deadline data
    let now = parseInt(new Date().getTime() / 1000);
    let deadline = await threeJudge.methods.deadline().call();
    deadline = parseInt(deadline);
    deadline = deadline - now;
    // 259199 seconds = 3 days minus 1 second
    deadline.should.be.greaterThan(259100);
    const awaitingParty = await threeJudge.methods.awaitingParty().call();
    awaitingParty.should.equal(accounts[1]);
  });
});

describe("Confirms confirmFinalJudge functionality", async () => {
  it("Confirms function can only be called in AWAITING_NOMINATION_CONFIRMATION status", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    // Calling before correct state will return error
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmFinalJudge(true).send({
        from: accounts[3],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this dispute state");
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: "1000000"
    });
    // Calling after correct state will return error
    err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmFinalJudge(true).send({
        from: accounts[3],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this dispute state");
  });
  it("Confirms only judge who has not nominated can approve or reject nomination", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmFinalJudge(true).send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Only judges are authorized");
    let error = "_PRETEST_";
    try {
      await threeJudge.methods.confirmFinalJudge(true).send({
        from: accounts[2],
        gas: "1000000"
      });
    } catch (e) {
      error = e;
    }
    error.message.should.contain(
      "The judge who nominated the final judge cannot approve the nominated judge"
    );
  });

  it("Confirms rejecting nomination updates state variables", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(false).send({
      from: accounts[3],
      gas: "1000000"
    });

    // Resets judge nomination status
    const buyerJudgeNominated = await threeJudge.methods
      .hasNominated(accounts[2])
      .call();
    const sellerJudgeNominated = await threeJudge.methods
      .hasNominated(accounts[3])
      .call();
    buyerJudgeNominated.should.equal(false);
    sellerJudgeNominated.should.equal(false);

    // Confirms nominated final judge saved
    const nominatedJudge = await threeJudge.methods.nominatedJudge().call();
    nominatedJudge.should.contain("0x0000");

    // Confirms new dispute status
    const updatedDisputeState = await threeJudge.methods
      .currentDisputeState()
      .call();
    updatedDisputeState.should.equal("1");
  });

  it("Confirms approving nomination updates state variables", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: "1000000"
    });

    // Confirms final judge saved
    const nominatedJudge = await threeJudge.methods.nominatedJudge().call();
    const finalJudge = await threeJudge.methods.finalJudge().call();
    nominatedJudge.should.equal(finalJudge);

    // Confirms new dispute status
    const updatedDisputeState = await threeJudge.methods
      .currentDisputeState()
      .call();
    updatedDisputeState.should.equal("3");
  });
});

describe("Confirms arbitrateDispute Functionality", async () => {
  it("Confirms arbitrateDispute can only be called in AWAITING_RESOLUTION status", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.arbtrateDispute(true).send({
        from: accounts[2],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this dispute state");
  });

  it("Confirms arbitrateDispute can only be called by a judge", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.arbtrateDispute(true).send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Only judges are authorized");
  });
  it("Confirms a judge can only call arbitrateDispute once", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: "1000000"
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[2],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.arbtrateDispute(true).send({
        from: accounts[2],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("A judge can only vote once");
  });

  it("Confirms arbitrateDispute updates state variables", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: "1000000"
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[2],
      gas: "1000000"
    });

    // Tracks votes
    const votesForBuyer = await threeJudge.methods.votesForBuyer().call();
    votesForBuyer.should.equal("1");

    // Confirms updated deadline data
    let now = parseInt(new Date().getTime() / 1000);
    let deadline = await threeJudge.methods.deadline().call();
    deadline = parseInt(deadline);
    deadline = deadline - now;
    // 259100 seconds = 3 days minus 100 second
    deadline.should.be.greaterThan(259100);
    const awaitingParty = await threeJudge.methods.awaitingParty().call();
    awaitingParty.should.equal(accounts[1]);
  });

  it("Confirms successful arbitration pays judges", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: `${web3.utils.toWei("1", "ether")}`,
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: "1000000"
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[3],
      gas: "1000000"
    });

    // Fetching initial balances of all judges
    let contractBalance = await web3.eth.getBalance(threeJudge.options.address);
    let judge1 = await web3.eth.getBalance(accounts[2]);
    judge1 = parseInt(judge1);
    let judge2 = await web3.eth.getBalance(accounts[3]);
    judge2 = parseInt(judge2);
    let judge3 = await web3.eth.getBalance(accounts[4]);
    judge3 = parseInt(judge3);

    await threeJudge.methods.distributeFunds().send({
      from: accounts[0],
      gas: "1000000"
    });

    // Fetching final balances of all judges
    let judge1Final = await web3.eth.getBalance(accounts[2]);
    judge1Final = parseInt(judge1Final);
    let judge2Final = await web3.eth.getBalance(accounts[3]);
    judge2Final = parseInt(judge2Final);
    let judge3Final = await web3.eth.getBalance(accounts[4]);
    judge3Final = parseInt(judge3Final);

    // Asserting that amount deposited into any judges account should be greater than 99% of the judges fee
    // Asserting 99% to account for any gas used by potential judges account to call function
    judge1Final.should.be.greaterThan(
      judge1 + parseInt(web3.utils.toWei("9.9", "finney"))
    );
    judge2Final.should.be.greaterThan(
      judge2 + parseInt(web3.utils.toWei("9.9", "finney"))
    );
    judge3Final.should.be.greaterThan(
      judge3 + parseInt(web3.utils.toWei("9.9", "finney"))
    );

    const finalContractBalance = await web3.eth.getBalance(
      threeJudge.options.address
    );
    finalContractBalance.should.be.equal("0");

    // State and Dispute state variables
    const updatedState = await threeJudge.methods.currentState().call();
    const updatedDisputeState = await threeJudge.methods
      .currentDisputeState()
      .call();
    updatedState.should.equal("3");
    updatedDisputeState.should.equal("4");
  });

  it("Confirms successful arbitration pays correct party", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: `${web3.utils.toWei("1", "ether")}`,
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: "1000000"
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[3],
      gas: "1000000"
    });

    // Fetching initial balances buyer and seller
    let contractBalance = await web3.eth.getBalance(threeJudge.options.address);
    contractBalance = parseInt(contractBalance);
    let buyer = await web3.eth.getBalance(accounts[0]);
    buyer = parseInt(buyer);
    let seller = await web3.eth.getBalance(accounts[1]);
    seller = parseInt(seller);

    await threeJudge.methods.distributeFunds().send({
      from: accounts[0],
      gas: "1000000"
    });

    // Fetching final balances of buyer and seller
    let buyerFinal = await web3.eth.getBalance(accounts[0]);
    buyerFinal = parseInt(buyerFinal);
    let sellerFinal = await web3.eth.getBalance(accounts[1]);
    sellerFinal = parseInt(sellerFinal);
    seller.should.equal(sellerFinal);
    buyerFinal.should.be.greaterThan(contractBalance * 0.95);
  });
});

describe("Buyer and Seller are able to submit testimony that can be read", async () => {
  it("Only allows testimony during dispute", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods
        .provideTestimony("This is buyer testimony")
        .send({
          from: accounts[0],
          gas: "1000000"
        });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this state");
  });
  it("Only allows buyer and seller to submit testimony", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.provideTestimony("This is buyer testimony").send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.provideTestimony("This is seller testimony").send({
      from: accounts[1],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods
        .provideTestimony("This is other testimony")
        .send({
          from: accounts[2],
          gas: "1000000"
        });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Only buyer and seller are authorized");
  });
  it("Confirms testimony description, time, and address are recorded", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: "1000000",
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.provideTestimony("This is buyer testimony").send({
      from: accounts[0],
      gas: "1000000"
    });
    setTimeout(async () => {
      await threeJudge.methods
        .provideTestimony("This is seller testimony")
        .send({
          from: accounts[1],
          gas: "1000000"
        });
      let testimonyCount = await threeJudge.methods.getTestimonyCount().call();
      testimonyCount.should.equal("2");
      let buyerTestimony = await threeJudge.methods.getTestimony("0").call();
      buyerTestimony["0"].should.equal("This is buyer testimony");
      let buyer = await threeJudge.methods.buyer().call();
      buyerTestimony["2"].should.equal(buyer);

      let sellerTestimony = await threeJudge.methods.getTestimony("1").call();
      sellerTestimony["0"].should.equal("This is seller testimony");
      let seller = await threeJudge.methods.seller().call();
      sellerTestimony["2"].should.equal(seller);
      parseInt(sellerTestimony["1"]).should.be.greaterThan(
        parseInt(buyerTestimony["1"])
      );
    }, 1000);
  });
});

describe("Confirms Deadline and claimFunds functionality", async () => {
  it("Confirms claimFunds can only be called by buyer or seller", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.claimFunds().send({
        from: accounts[2],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Only buyer and seller are authorized");
  });
  it("Confirms claimFunds can only be called during dispute", async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.claimFunds().send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Action cannot be called at this state");
  });
  it("Confirms claimFunds cannot be called when no deadline set", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: `${web3.utils.toWei("1", "ether")}`,
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.claimFunds().send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain(
      "There must be valid deadline that has been violated. No current deadline set"
    );
  });
  it("Confirms claimFunds can only be called when deadline has expired", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: `${web3.utils.toWei("1", "ether")}`,
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.claimFunds().send({
        from: accounts[0],
        gas: "1000000"
      });
    } catch (e) {
      err = e;
    }
    err.message.should.contain("Deadline has not expired");

    // setTimeout(async () => {
    //   const initialBalance = await web3.eth.getBalance(accounts[0]);
    //   await threeJudge.methods.claimFunds().send({
    //     from: accounts[0],
    //     gas: '1000000'
    //   });
    //   const newBalance = await web3.eth.getBalance(accounts[0]);
    //   const balanceDiff = parseFloat(newBalance) - parseFloat(initialBalance);
    //   balanceDiff.should.be.at.least(990000);

    //   const state = await threeJudge.methods.currentState().call();
    //   const disputeState = await threeJudge.methods.currentDisputeState().call();
    //   state.should.equal('3');
    //   disputeState.should.equal('4');
    // }, 3000);
  });
  it("Confirms deadline expiration by final judge resets final judge status", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: `${web3.utils.toWei("1", "ether")}`,
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: "1000000"
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[2],
      gas: "1000000"
    });
    await threeJudge.methods.arbtrateDispute(false).send({
      from: accounts[3],
      gas: "1000000"
    });
    let awaitingParty = await threeJudge.methods.finalJudge().call();
    awaitingParty.should.equal(accounts[4]);
    setTimeout(async () => {
      await threeJudge.methods.claimFunds().send({
        from: accounts[0],
        gas: "1000000"
      });
      const state = await threeJudge.methods.currentState().call();
      const disputeState = await threeJudge.methods
        .currentDisputeState()
        .call();
      state.should.equal("4");
      disputeState.should.equal("1");
      const nominatedJudge = await threeJudge.methods.nominatedJudge().call();
      const finalJudge = await threeJudge.methods.finalJudge().call();
      nominatedJudge.should.contain("0x00");
      finalJudge.should.contain("0x00");
    }, 3000);
  });
});

describe("Confirms getStatus function", async () => {
  it("Confirms getDisputeStatus function", async () => {
    await threeJudge.methods.confirmPayment().send({
      value: `${web3.utils.toWei("1", "ether")}`,
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: "1000000"
    });
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: "1000000"
    });
    const status = await threeJudge.methods.getStatus().call();
    console.log("status: ", status["0"]);
    if (status["0"] === "4") {
      const disputeStatus = await threeJudge.methods.getDisputeStatus().call();
      console.log("disputeStatus: ", disputeStatus);
    }
  });
});
