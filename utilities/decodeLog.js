import web3 from "../ethereum/web3";
import { StatusEventABI, TestimonyEventABI } from "../ethereum/eventABIs";

export default function (log) {
  let decodedEventLog;
  try {
    // Try decode as status event
    decodedEventLog = web3.eth.abi.decodeLog(
      StatusEventABI,
      log.data,
      log.topics
    );
  } catch (error) {
    // if error decode as testimony event
    decodedEventLog = web3.eth.abi.decodeLog(
      TestimonyEventABI,
      log.data,
      log.topics
    );
  } finally {
    return decodedEventLog;
  }
}
