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

// describe('Factory and Contract Initialization', () => {

//   it('deploys a factory and a threeJudge', () => {
//     should.exist(factory.options.address);
//     factory.options.address.should.be.a('string');
//     should.exist(threeJudge.options.address);
//     threeJudge.options.address.should.be.a('string');
//   });

//   it('confirms factory is tracking child contract via mapping', async () => {
//     const contractAddress = threeJudge.options.address;
//     const [foundAddress] = await factory.methods.getdeployedContracts().call();
//     contractAddress.should.equal(foundAddress);
//   });

//   it('confirms starting point for threeJudge', async () => {
//     const buyer = await threeJudge.methods.buyer().call();
//     const seller = await threeJudge.methods.seller().call();
//     const initialState = await threeJudge.methods.currentState().call();
//     buyer.should.equal(`${accounts[0]}`);
//     seller.should.equal(`${accounts[1]}`);
//     initialState.should.equal('0');
//   });
// });

// describe('Submitting payment step', async () => {
//   it('Confirms only buyer can submit payment', async () => {
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmPayment().send({
//         value: '1000000',
//         from: accounts[1]
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Only buyer is authorized.");
//   });

//   it('Confirms confirmPayment results in contract balance and new state', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     const updatedState = await threeJudge.methods.currentState().call();
//     updatedState.should.equal('1');

//     // Confirms contract receives value from confirmPayment
//     const balance = await web3.eth.getBalance(threeJudge.options.address);
//     balance.should.be.equal('1000000');
//   });
// });

// describe('Confirms Abort Functionality', async () => {
//   it('Confirms only Seller can call Abort', async () => {
//     try {
//           await threeJudge.methods.abort().send({
//             from: accounts[0]
//           });
//           assert(false);
//     } catch (err) {
//       assert(err);
//     }
//   });

//   it('Confirms abort can be called in AWAITING_PAYMENT state', async () => {
//     await threeJudge.methods.abort().send({
//       from: accounts[1]
//     });
//     let abortedState = await threeJudge.methods.currentState().call();
//     abortedState.should.equal('5');
//   });

//   it('Confirms abort can be called in AWAITING_PRODUCT_SENT state', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });

//     let initialState = await threeJudge.methods.currentState().call();
//     initialState.should.equal('1');

//   });

//   it('Confirms abort functionality will refund contract balance', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });


//     let initialBalance = await web3.eth.getBalance(accounts[0]);
//     await threeJudge.methods.abort().send({
//       from: accounts[1]
//     });

//     const balance = await web3.eth.getBalance(threeJudge.options.address);
//     balance.should.be.equal('0');

//     initialState = await threeJudge.methods.currentState().call();
//     initialState.should.equal('5');
//     let newBalance = await web3.eth.getBalance(accounts[0]);
//     const balanceDiff = parseFloat(newBalance) - parseFloat(initialBalance);
//     balanceDiff.should.be.at.least(990000);
//   });
// });

// describe('Confirm confirmProductSent Functionality', async () => {
//   it('Requires to be called in AWAITING_PRODUCT_SENT state', async () => {
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmProductSent().send({
//         from: accounts[1]
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Sender not authorized.");
//   });

//   it('Requires confirmProductSent to be called by seller', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });

//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmProductSent().send({
//         from: accounts[0]
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Only seller is authorized.");
//   });

//   it('Confirms confirmProductSent updates state', async () => {
//     let state = '_PRETEST_';
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.confirmProductSent().send({
//       from: accounts[1]
//     });
//     state = await threeJudge.methods.currentState().call();
//     state.should.be.equal('2')
//   })
// });

// describe('Confirm confirmDelivery Functionality', async () => {
//   it('Requires to be called in AWAITING_DELIVERY state', async () => {
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmDelivery().send({
//         from: accounts[0]
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Sender not authorized.");
//   });

//   it('Requires confirmProductSent to be called by buyer', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });

//     await threeJudge.methods.confirmProductSent().send({
//       from: accounts[1]
//     });

//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmDelivery().send({
//         from: accounts[1]
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Only buyer is authorized.");
//   });

//   it('Confirms confirmDelivery updates state and transfers balance to seller', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });

//     await threeJudge.methods.confirmProductSent().send({
//       from: accounts[1]
//     });

//     let initialSellerBalance = await web3.eth.getBalance(accounts[1]);

//     await threeJudge.methods.confirmDelivery().send({
//       from: accounts[0]
//     });

//     let newSellerBalance = await web3.eth.getBalance(accounts[1]);
//     const balanceDiff = parseInt(newSellerBalance) - parseInt(initialSellerBalance);
//     balanceDiff.should.be.greaterThan(0);
//     balanceDiff.should.be.greaterThan(990000);
//     balanceDiff.should.be.lessThan(1000000)


//     let state = '_PRETEST_';
//     state = await threeJudge.methods.currentState().call();
//     state.should.be.equal('3')
//   });
// });

// describe("Initiating Dispute Functionality", async () => {
//   it('Confirms initDispute must be called with address argument', async () => {
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.initDispute().send({
//         from: accounts[1]
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Invalid number of parameters");
//   });

//   it('Confirms only buyer can call initDispute', async () => {
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.initDispute(accounts[2]).send({
//         from: accounts[1]
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Only buyer is authorized.");
//   });

//   it('Confirms initDispute can only be called after buyer submits funds to contract', async () => {
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.initDispute(accounts[2]).send({
//         from: accounts[0],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Buyer can only initiate dispute after funds submitted to contract");
//   });

//   it('Confirms initDispute cannot be called during active dispute', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.initDispute(accounts[2]).send({
//         from: accounts[0],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Requires there to be no active dispute. Please continue with arbitration process");
//   });

//   it('Confirms initDispute updates state and dispute variables', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     state = await threeJudge.methods.currentState().call();
//     disputeState = await threeJudge.methods.currentDisputeState().call();
//     state.should.equal('4');
//     disputeState.should.equal('0');

//     const buyerJudge = await threeJudge.methods.buyerJudge().call();
//     buyerJudge.should.equal(accounts[2]);
//     const buyerJudgeHasVoted = await threeJudge.methods.hasVoted(accounts[2]).call();
//     buyerJudgeHasVoted.should.equal(false);
//     const buyerJudgeHasNominated = await threeJudge.methods.hasNominated(accounts[2]).call();
//     buyerJudgeHasNominated.should.equal(false);
//     let now = parseInt(new Date().getTime() / 1000);
//     let deadline = await threeJudge.methods.deadline().call();
//     deadline = parseInt(deadline);
//     deadline = deadline - now;
//     // 259199 seconds =  3 days minus 1 second
//     deadline.should.be.greaterThan(259100);
//     const awaitingParty = await threeJudge.methods.awaitingParty().call();
//     awaitingParty.should.equal(accounts[1]);
//   });

//   it('Confirms Seller calling pickJudge updates state and dispute variables', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     await threeJudge.methods.pickJudge(accounts[3]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });

//     const sellerJudge = await threeJudge.methods.sellerJudge().call();
//     sellerJudge.should.equal(accounts[3]);
//     const sellerJudgeHasVoted = await threeJudge.methods.hasVoted(accounts[2]).call();
//     sellerJudgeHasVoted.should.equal(false);
//     const sellerJudgeHasNominated = await threeJudge.methods.hasNominated(accounts[2]).call();
//     sellerJudgeHasNominated.should.equal(false);
//     let deadline = await threeJudge.methods.deadline().call();
//     deadline.should.equal('0');
//     const awaitingParty = await threeJudge.methods.awaitingParty().call();
//     awaitingParty.should.contain("0x0000");
//   });
// });

// describe("Nominating Final Judge Functionality", async () => {
//   it('Confirms judge can only be nominated during active dispute',  async () => {
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//         from: accounts[0],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Sender not authorized");
//   });

//   it('Confirms judge can only be nominated during AWAITING_NOMINATION stage of dispute',  async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//         from: accounts[2],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Sender not authorized");
//   });

//   it('Confirms only judges can nominated final judge',  async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     await threeJudge.methods.pickJudge(accounts[3]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//         from: accounts[0],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Only judges are authorized to nominate final judge");
//   });

//   it('Confirms judge cannot nominate twice', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     await threeJudge.methods.pickJudge(accounts[3]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });
//     await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//       from: accounts[2],
//       gas: '1000000'
//     });
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.nominateFinalJudge(accounts[5]).send({
//         from: accounts[2],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Sender not authorized");
//   });

//   it('Confirms nominating judges updates state variables', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     await threeJudge.methods.pickJudge(accounts[3]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });
//     await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//       from: accounts[2],
//       gas: '1000000'
//     });

//     //Tracks which judge has nominated
//     const buyerJudgeNominated = await threeJudge.methods.hasNominated(accounts[2]).call();
//     const sellerJudgeNominated = await threeJudge.methods.hasNominated(accounts[3]).call();
//     buyerJudgeNominated.should.equal(true);
//     sellerJudgeNominated.should.equal(false);

//     // Confirms nominated final judge saved
//     const nominatedJudge = await threeJudge.methods.nominatedJudge().call();
//     nominatedJudge.should.equal(accounts[4]);

//     // Confirms new dispute status
//     const updatedDisputeState = await threeJudge.methods.currentDisputeState().call();
//     updatedDisputeState.should.equal('2');

//     // Confirms updated deadline data
//     let now = parseInt(new Date().getTime() / 1000);
//     let deadline = await threeJudge.methods.deadline().call();
//     deadline = parseInt(deadline);
//     deadline = deadline - now;
//     // 259199 seconds = 3 days minus 1 second
//     deadline.should.be.greaterThan(259100);
//     const awaitingParty = await threeJudge.methods.awaitingParty().call();
//     awaitingParty.should.equal(accounts[1]);
//   });
// });

// describe('Confirms confirmFinalJudge functionality', async () => {
//   it('Confirms function can only be called in AWAITING_NOMINATION_CONFIRMATION status', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     await threeJudge.methods.pickJudge(accounts[3]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });
//     // Calling before correct state will return error
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmFinalJudge(true).send({
//         from: accounts[3],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Sender not authorized");
//     await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//       from: accounts[2],
//       gas: '1000000'
//     });
//     await threeJudge.methods.confirmFinalJudge(true).send({
//       from: accounts[3],
//       gas: '1000000'
//     });
//     // Calling after correct state will return error
//     err = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmFinalJudge(true).send({
//         from: accounts[3],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Sender not authorized");
//   });
//   it('Confirms only judge who has not nominated can approve or reject nomination', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     await threeJudge.methods.pickJudge(accounts[3]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });
//     await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//       from: accounts[2],
//       gas: '1000000'
//     });
//     let err = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmFinalJudge(true).send({
//         from: accounts[0],
//         gas: '1000000'
//       });
//     } catch (e) {
//       err = e;
//     }
//     (err.message).should.contain("Only judges are authorized");
//     let error = "_PRETEST_";
//     try {
//       await threeJudge.methods.confirmFinalJudge(true).send({
//         from: accounts[2],
//         gas: '1000000'
//       });
//     } catch (e) {
//       error = e;
//     }
//     (error.message).should.contain("The judge who nominated the final judge cannot approve the nominated judge");
//   });

//   it('Confirms rejecting nomination updates state variables', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     await threeJudge.methods.pickJudge(accounts[3]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });
//     await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//       from: accounts[2],
//       gas: '1000000'
//     });
//     await threeJudge.methods.confirmFinalJudge(false).send({
//       from: accounts[3],
//       gas: '1000000'
//     });

//     // Resets judge nomination status
//     const buyerJudgeNominated = await threeJudge.methods.hasNominated(accounts[2]).call();
//     const sellerJudgeNominated = await threeJudge.methods.hasNominated(accounts[3]).call();
//     buyerJudgeNominated.should.equal(false);
//     sellerJudgeNominated.should.equal(false);

//     // Confirms nominated final judge saved
//     const nominatedJudge = await threeJudge.methods.nominatedJudge().call();
//     nominatedJudge.should.contain("0x0000");

//     // Confirms new dispute status
//     const updatedDisputeState = await threeJudge.methods.currentDisputeState().call();
//     updatedDisputeState.should.equal('1');
//   });

//   it('Confirms approving nomination updates state variables', async () => {
//     await threeJudge.methods.confirmPayment().send({
//       value: '1000000',
//       from: accounts[0]
//     });
//     await threeJudge.methods.initDispute(accounts[2]).send({
//       from: accounts[0],
//       gas: '1000000'
//     });
//     await threeJudge.methods.pickJudge(accounts[3]).send({
//       from: accounts[1],
//       gas: '1000000'
//     });
//     await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
//       from: accounts[2],
//       gas: '1000000'
//     });
//     await threeJudge.methods.confirmFinalJudge(true).send({
//       from: accounts[3],
//       gas: '1000000'
//     });

//     // Confirms final judge saved
//     const nominatedJudge = await threeJudge.methods.nominatedJudge().call();
//     const finalJudge = await threeJudge.methods.finalJudge().call();
//     nominatedJudge.should.equal(finalJudge);

//     // Confirms new dispute status
//     const updatedDisputeState = await threeJudge.methods.currentDisputeState().call();
//     updatedDisputeState.should.equal('3');
//   });
// });

describe('Confirms arbitrateDispute Functionality', async () => {
  it('Confirms arbitrateDispute can only be called in AWAITING_RESOLUTION status', async () => {
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
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: '1000000'
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.arbtrateDispute(true).send({
        from: accounts[2],
        gas: '1000000'
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Sender not authorized");
  });

  it('Confirms arbitrateDispute can only be called by a judge', async () => {
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
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: '1000000'
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: '1000000'
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.arbtrateDispute(true).send({
        from: accounts[0],
        gas: '1000000'
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("Only judges are authorized");
  });
  it('Confirms a judge can only call arbitrateDispute once', async () => {
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
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: '1000000'
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: '1000000'
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[2],
      gas: '1000000'
    });
    let err = "_PRETEST_";
    try {
      await threeJudge.methods.arbtrateDispute(true).send({
        from: accounts[2],
        gas: '1000000'
      });
    } catch (e) {
      err = e;
    }
    (err.message).should.contain("A judge can only vote once");
  });

  it('Confirms arbitrateDispute updates state variables', async () => {
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
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: '1000000'
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: '1000000'
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[2],
      gas: '1000000'
    });

    // Tracks votes
    const votesForBuyer = await threeJudge.methods.votesForBuyer().call();
    votesForBuyer.should.equal('1');

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

  it('Confirms successful arbitration pays judges', async () => {
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
    await threeJudge.methods.nominateFinalJudge(accounts[4]).send({
      from: accounts[2],
      gas: '1000000'
    });
    await threeJudge.methods.confirmFinalJudge(true).send({
      from: accounts[3],
      gas: '1000000'
    });
    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[2],
      gas: '1000000'
    });

    let contractBalance = await web3.eth.getBalance(threeJudge.options.address);
    console.log(contractBalance, ' contractBalance');
    console.log(parseInt(contractBalance) / 100, ' judgefee (contractBalance / 100)');
    let judge1 = await web3.eth.getBalance(accounts[2]);
    judge1 = parseInt(judge1);
    let judge2 = await web3.eth.getBalance(accounts[3]);
    judge2 = parseInt(judge2);
    let judge3 = await web3.eth.getBalance(accounts[4]);
    judge3 = parseInt(judge3);

    await threeJudge.methods.arbtrateDispute(true).send({
      from: accounts[3],
      gas: '1000000'
    });

    let judge1Final = await web3.eth.getBalance(accounts[2]);
    judge1Final = parseInt(judge1Final);
    let judge2Final = await web3.eth.getBalance(accounts[3]);
    judge2Final = parseInt(judge2Final);
    let judge3Final = await web3.eth.getBalance(accounts[4]);
    judge3Final = parseInt(judge3Final);

    console.log(judge1Final, ' judge1Final');
    console.log(judge1, ' judge1');
    console.log(judge1Final - judge1, 'judge1Final - judge1');
    console.log(judge2Final, ' judge2Final');
    console.log(judge2, ' judge2');
    console.log(judge2Final - judge2, 'judge2Final - judge2');
    console.log(judge3Final, ' judge3Final');
    console.log(judge3, ' judge3');
    console.log(judge3Final - judge3, 'judge3Final - judge3');
    judge1Final.should.be.equal(judge1 + 10000);
    judge2Final.should.be.equal(judge2 + 10000);
    judge3Final.should.be.equal(judge3 + 10000);

    const finalContractBalance = await web3.eth.getBalance(threeJudge.options.address);
    finalContractBalance.should.be.equal('0');



    // State variables
    const updatedState = await threeJudge.methods.currentState().call();
    const updatedDisputeState = await threeJudge.methods.currentDisputeState().call();
    updatedState.should.equal('3');
    updatedDisputeState.should.equal('4');
  });
});
