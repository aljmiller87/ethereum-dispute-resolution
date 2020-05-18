// import * as types from "./actionTypes";

export function beginBlockchainReadCall() {
  return { type: "BEGIN_BLOCKCHAIN_READ_CALL" };
}

export function endBlockchainReadCall() {
  return { type: "END_BLOCKCHAIN_READ_CALL" };
}

export function beginBlockchainWriteCall(currentCalls, contract) {
  console.log(currentCalls, contract);
  if (!contract) {
    return { type: "beginBlockchainWriteCall_Failed" };
  }

  const updatedCallList = [...currentCalls, contract];

  return { type: "UPDATE_BLOCKCHAIN_WRITE_CALL", payload: updatedCallList };
}

export function endBlockchainWriteCall(currentCalls, contract) {
  const updatedCallList = [...currentCalls];
  const indexFound = contractHasActiveBlockchainWrite(
    updatedCallList,
    contract
  );
  updatedCallList.splice(indexFound, 1);
  return { type: "UPDATE_BLOCKCHAIN_WRITE_CALL", payload: updatedCallList };
}

export function blockchainCallError() {
  return { type: "BLOCKCHAIN_CALL_ERROR" };
}

const contractHasActiveBlockchainWrite = (currentCalls, contract) => {
  const index = currentCalls.findIndex((address) => address === contract);
  console.log("index in contractHasActiveBlockchainWrite", index);
  return index;
};
