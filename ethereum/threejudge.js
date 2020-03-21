import web3 from "./web3";

const compiledContract = require("../ethereum/build/ThreeJudge.json");
const compiledFactory = compiledContract.ThreeJudge;
const compiledFactoryABI = compiledFactory.abi;

export default address => {
  return new web3.eth.Contract(compiledFactoryABI, address);
};
