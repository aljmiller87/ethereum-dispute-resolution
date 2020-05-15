import web3 from "./web3";

const compiledContract = require("../ethereum/build/ThreeJudge.json");
const compiledThreeJudge = compiledContract.ThreeJudge;
const compiledThreeJudgeABI = compiledThreeJudge.abi;

export default (address) => {
  return new web3.eth.Contract(compiledThreeJudgeABI, address);
};
