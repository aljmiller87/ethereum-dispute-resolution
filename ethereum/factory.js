// importing instance from file, not constructor from library
import web3 from './web3';
const compiledContract = require('../ethereum/build/ThreeJudge.json');
const compiledFactory = compiledContract.ContractFactory
const compiledFactoryABI = compiledFactory.abi;

const instance = new web3.eth.Contract(
    compiledFactoryABI,
    '0xe5D56E8A10fafd7707A30aDca580C15A2280AEc5'
);

export default instance;