// importing instance from file, not constructor from library
import web3 from "./web3";
const compiledContract = require("../ethereum/build/ThreeJudge.json");
const compiledFactory = compiledContract.ContractFactory;
const compiledFactoryABI = compiledFactory.abi;

const instance = new web3.eth.Contract(
  compiledFactoryABI,
  "0x92E5533fB865dA1afB2351828c547Ff4Ce078526"
);

export default instance;
