// importing instance from file, not constructor from library
import web3 from "./web3";
const compiledContract = require("../ethereum/build/ThreeJudge.json");
const compiledFactory = compiledContract.ContractFactory;
const compiledFactoryABI = compiledFactory.abi;

const instance = new web3.eth.Contract(
  compiledFactoryABI,
  "0xb03576A7Ed0fB129334ab48e2549Ac5F853cbC56"
);

export default instance;
