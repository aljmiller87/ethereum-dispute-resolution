const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(ganache.provider(), null, OPTIONS);

const compiledContract = require('../ethereum/build/ThreeJudge.json');
const compiledFactory = compiledContract.ContractFactory
const compiledFactoryABI = compiledFactory.abi;
const compiledFactoryBytecode = compiledFactory.evm.bytecode.object;


let accounts;
let factory;
let contractAddress;
let contract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactoryABI))
    .deploy({ data: compiledFactoryBytecode })
    .send({ from: accounts[0], gas: '1000000' });

});

describe('Contracts', () => {
  it('deploys a factory and a contract', () => {
    assert.ok(factory.options.address);
    assert.ok(contract.options.address);
  });

});
