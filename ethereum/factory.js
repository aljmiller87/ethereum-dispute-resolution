// importing instance from file, not constructor from library
import web3 from "./web3";
const compiledContract = require("../ethereum/build/ThreeJudge.json");
const compiledFactory = compiledContract.ContractFactory;
const compiledFactoryABI = compiledFactory.abi;

const instance = new web3.eth.Contract(
  compiledFactoryABI,
  "0x3373B2aA12Ccd0994097a95513FD9f9a5248e1Ba"
);

export default instance;
