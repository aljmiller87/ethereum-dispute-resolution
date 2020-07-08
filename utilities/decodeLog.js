import web3 from "../ethereum/web3";
import { StatusEventABI } from "../ethereum/eventABIs";

export default function (log) {
  return web3.eth.abi.decodeLog(StatusEventABI, log.data, log.topics);
}
