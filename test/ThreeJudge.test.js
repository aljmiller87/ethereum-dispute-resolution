const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const ganache = require('ganache-cli');
const Web3 = require('web3');
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(ganache.provider(), null, OPTIONS);
web3.currentProvider.setMaxListeners(300);

const compiledContract = require('../ethereum/build/ThreeJudge.json');
const compiledFactory = compiledContract.ContractFactory
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
    .deploy({ data: '0x' + compiledFactoryBytecode })
    .send({ from: accounts[0], gas: '5000000' });

  await factory.methods.createContract(`${accounts[1]}`).send({
    from: accounts[0],
    gas: '5000000'
  });

  [threeJudgeAddress] = await factory.methods.getdeployedContracts().call();
  threeJudge = await new web3.eth.Contract(
    compiledThreeJudgeABI,
    threeJudgeAddress
  );
});

describe('Factory and Contract Initialization', () => {

  it('deploys a factory and a threeJudge', () => {
    should.exist(factory.options.address);
    factory.options.address.should.be.a('string');
    should.exist(threeJudge.options.address);
    threeJudge.options.address.should.be.a('string');
  });

  it('confirms factory is tracking child contract via mapping', async () => {
    const contractAddress = threeJudge.options.address;
    const [foundAddress] = await factory.methods.getdeployedContracts().call();
    contractAddress.should.equal(foundAddress);
  });

  it('confirms starting point for threeJudge', async () => {
    const buyer = await threeJudge.methods.buyer().call();
    const seller = await threeJudge.methods.seller().call();
    const initialState = await threeJudge.methods.currentState().call();
    buyer.should.equal(`${accounts[0]}`);
    seller.should.equal(`${accounts[1]}`);
    initialState.should.equal('0');
  });
});

describe('Submitting payment step', async () => {
  it('Confirms only buyer can submit payment', async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmPayment().send({
        value: '1000000',
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Only buyer is authorized.");
  });

  it('Confirms confirmPayment results in contract balance and new state', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
      from: accounts[0]
    });
    const updatedState = await threeJudge.methods.currentState().call();
    updatedState.should.equal('1');

    // Confirms contract receives value from confirmPayment
    const balance = await web3.eth.getBalance(threeJudge.options.address);
    balance.should.be.equal('1000000');
  });
});

describe('Confirms Abort Functionality', async () => {
  it('Confirms only Seller can call Abort', async () => {
    try {
          await threeJudge.methods.abort().send({
            from: accounts[0]
          });
          assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('Confirms abort can be called in AWAITING_PAYMENT state', async () => {
    await threeJudge.methods.abort().send({
      from: accounts[1]
    });
    let abortedState = await threeJudge.methods.currentState().call();
    abortedState.should.equal('5');
  });

  it('Confirms abort can be called in AWAITING_PRODUCT_SENT state', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
      from: accounts[0]
    });

    let initialState = await threeJudge.methods.currentState().call();
    initialState.should.equal('1');

  });

  it('Confirms abort functionality will refund contract balance', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
      from: accounts[0]
    });


    let initialBalance = await web3.eth.getBalance(accounts[0]);
    await threeJudge.methods.abort().send({
      from: accounts[1]
    });

    const balance = await web3.eth.getBalance(threeJudge.options.address);
    balance.should.be.equal('0');

    initialState = await threeJudge.methods.currentState().call();
    initialState.should.equal('5');
    let newBalance = await web3.eth.getBalance(accounts[0]);
    const balanceDiff = parseFloat(newBalance) - parseFloat(initialBalance);
    balanceDiff.should.be.at.least(990000);
  });
});

describe('Confirm confirmProductSent Functionality', async () => {
  it('Requires to be called in AWAITING_PRODUCT_SENT state', async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmProductSent().send({
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Sender not authorized.");
  });

  it('Requires confirmProductSent to be called by seller', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
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
    (err.message).should.contain("Only seller is authorized.");
  });

  it('Confirms confirmProductSent updates state', async () => {
    let state = '_PRETEST_';
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
      from: accounts[0]
    });
    await threeJudge.methods.confirmProductSent().send({
      from: accounts[1]
    });
    state = await threeJudge.methods.currentState().call();
    state.should.be.equal('2')
  })
});

describe('Confirm confirmDelivery Functionality', async () => {
  it('Requires to be called in AWAITING_DELIVERY state', async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.confirmDelivery().send({
        from: accounts[0]
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Sender not authorized.");
  });

  it('Requires confirmProductSent to be called by buyer', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
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
    (err.message).should.contain("Only buyer is authorized.");
  });

  it('Confirms confirmDelivery updates state and transfers balance to seller', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
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
    const balanceDiff = parseInt(newSellerBalance) - parseInt(initialSellerBalance);
    balanceDiff.should.be.greaterThan(0);
    balanceDiff.should.be.greaterThan(990000);
    balanceDiff.should.be.lessThan(1000000)


    let state = '_PRETEST_';
    state = await threeJudge.methods.currentState().call();
    state.should.be.equal('3')
  });
});

describe("Initiating Dispute Functionality", async () => {
  it('Confirms initDispute must be called with address argument', async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.initDispute().send({
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Invalid number of parameters");
  });

  it('Confirms only buyer can call initDispute', async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.initDispute(accounts[2]).send({
        from: accounts[1]
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Only buyer is authorized.");
  });

  it('Confirms initDispute can only be called after buyer submits funds to contract', async () => {
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.initDispute(accounts[2]).send({
        from: accounts[0],
        gas: '1000000'
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Buyer can only initiate dispute after funds submitted to contract");
  });

  it('Confirms initDispute cannot be called during active dispute', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: '1000000'
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.initDispute(accounts[2]).send({
        from: accounts[0],
        gas: '1000000'
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Requires there to be no active dispute. Please continue with arbitration process");
  });

  it('Confirms initDispute updates state and dispute variables', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: '1000000'
    });
    state = await threeJudge.methods.currentState().call();
    disputeState = await threeJudge.methods.currentDisputeState().call();
    state.should.equal('4');
    disputeState.should.equal('0');

    const buyerJudge = await threeJudge.methods.buyerJudge().call();
    buyerJudge.should.equal(accounts[2]);
    const buyerJudgeHasVoted = await threeJudge.methods.hasVoted(accounts[2]).call();
    buyerJudgeHasVoted.should.equal(false);
    const buyerJudgeHasNominated = await threeJudge.methods.hasNominated(accounts[2]).call();
    buyerJudgeHasNominated.should.equal(false);
    let now = parseInt(new Date().getTime() / 1000);
    let deadline = await threeJudge.methods.deadline().call();
    deadline = parseInt(deadline);
    deadline = deadline - now;
    // 259199 seconds =  3 days minus 1 second
    deadline.should.be.greaterThan(259199);
    const awaitingParty = await threeJudge.methods.awaitingParty().call();
    awaitingParty.should.equal(accounts[1]);
  });

  it('Confirms Seller calling initDispute updates state and dispute variables', async () => {
    await threeJudge.methods.confirmPayment().send({
      value: '1000000',
      from: accounts[0]
    });
    await threeJudge.methods.initDispute(accounts[2]).send({
      from: accounts[0],
      gas: '1000000'
    });
    await threeJudge.methods.pickJudge(accounts[3]).send({
      from: accounts[1],
      gas: '1000000'
    });

    const sellerJudge = await threeJudge.methods.sellerJudge().call();
    sellerJudge.should.equal(accounts[3]);
    const sellerJudgeHasVoted = await threeJudge.methods.hasVoted(accounts[2]).call();
    sellerJudgeHasVoted.should.equal(false);
    const sellerJudgeHasNominated = await threeJudge.methods.hasNominated(accounts[2]).call();
    sellerJudgeHasNominated.should.equal(false);
    let deadline = await threeJudge.methods.deadline().call();
    deadline.should.equal('0');
    const awaitingParty = await threeJudge.methods.awaitingParty().call();
    awaitingParty.should.contain("0x0000");
  });
});


  // it('requires a minimum contribution', async () => {
  //   try {
  //     await campaign.methods.contribute().send({
  //       value: '5',
  //       from: accounts[1]
  //     });
  //     assert(false);
  //   } catch (err) {
  //     assert(err);
  //   }
  // });

  // it('allows a manager to make a payment request', async () => {
  //   await campaign.methods
  //     .createRequest('Buy batteries', '100', accounts[1])
  //     .send({
  //       from: accounts[0],
  //       gas: '1000000'
  //     });
  //   const request = await campaign.methods.requests(0).call();

  //   assert.equal('Buy batteries', request.description);
  // });

  // it('processes requests', async () => {
  //   await campaign.methods.contribute().send({
  //     from: accounts[0],
  //     value: web3.utils.toWei('10', 'ether')
  //   });

  //   await campaign.methods
  //     .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
  //     .send({ from: accounts[0], gas: '1000000' });

  //   await campaign.methods.approveRequest(0).send({
  //     from: accounts[0],
  //     gas: '1000000'
  //   });

  //   await campaign.methods.finalizeRequest(0).send({
  //     from: accounts[0],
  //     gas: '1000000'
  //   });

  //   let balance = await web3.eth.getBalance(accounts[1]);
  //   balance = web3.utils.fromWei(balance, 'ether');
  //   balance = parseFloat(balance);

  //   assert(balance > 104);
  // });
