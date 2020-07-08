// importing instance from file, not constructor from library
import web3 from "./web3";
const compiledContract = require("../ethereum/build/ThreeJudge.json");
const compiledFactory = compiledContract.ContractFactory;
const compiledFactoryABI = compiledFactory.abi;

const instance = new web3.eth.Contract(
  compiledFactoryABI,
  "0x2cbc15F810E6061EEe837Bc92e96B4Ceca5F963e"
);

export default instance;
