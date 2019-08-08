const assert = require('assert');
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
    .send({ from: accounts[0], gas: '3000000' });

    console.log('factory.methods.createContract', factory.methods.createContract);

  await factory.methods.createContract(`${accounts[0]}`, `${accounts[1]}`).send({
    from: accounts[0],
    gas: '3000000'
  });

  [threeJudgeAddress] = await factory.methods.getCampaignsByAddress().call();
  threeJudge = await new web3.eth.Contract(
    compiledThreeJudgeABI,
    threeJudgeAddress
  );
});

describe('Contract Bare Functionality', () => {
  it('deploys a factory and a threeJudge', () => {
    assert.ok(factory.options.address);
    assert.ok(threeJudge.options.address);
  });

  // it('marks caller as the campaign manager', async () => {
  //   const manager = await campaign.methods.manager().call();
  //   assert.equal(accounts[0], manager);
  // });

  // it('allows people to contribute money and marks them as approvers', async () => {
  //   await campaign.methods.contribute().send({
  //     value: '200',
  //     from: accounts[1]
  //   });
  //   const isContributor = await campaign.methods.approvers(accounts[1]).call();
  //   assert(isContributor);
  // });

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
});
