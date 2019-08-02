const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledContract = require('./build/ThreeJudge.json');

const compiledFactory = compiledContract.ContractFactory
const compiledFactoryABI = compiledFactory.abi;
const compiledFactoryBytecode = compiledFactory.evm.bytecode.object;


const provider = new HDWalletProvider(
    `${process.env.SEED_KEY}`,
    'https://rinkeby.infura.io/v3/ad66eb1337e043b2b50abe1323fff5f0'
);

const web3 = new Web3(provider);

const deploy = async () => {
    // Get account to deploy from
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    // deploy code
    const result = await new web3.eth.Contract(compiledFactoryABI)
    .deploy({ data: '0x' + compiledFactoryBytecode })
    .send({ gas: '1000000', from: accounts[0] });


    console.log('result address', result.options.address)
};

deploy();

