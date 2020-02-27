// importing instance from file, not constructor from library
import web3 from "./web3";
const compiledContract = require("../ethereum/build/ThreeJudge.json");
const compiledFactory = compiledContract.ContractFactory;
const compiledFactoryABI = compiledFactory.abi;

const instance = new web3.eth.Contract(
  compiledFactoryABI,
  "0x76e22296238654F3C55e28850EE5f01cfb703A29"
);

export default instance;
