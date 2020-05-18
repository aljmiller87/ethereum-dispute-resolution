// import * as types from "./actionTypes";

export function beginBlockchainReadCall() {
  return { type: "BEGIN_BLOCKCHAIN_READ_CALL" };
}

export function endBlockchainReadCall() {
  return { type: "END_BLOCKCHAIN_READ_CALL" };
}

export function beginBlockchainWriteCall(contract) {
  if (!contract) {
    return { type: "beginBlockchainWriteCall_Failed" };
  }

  return { type: "BEGIN_BLOCKCHAIN_WRITE_CALL", payload: contract };
}

export function endBlockchainWriteCall(contract) {
  if (!contract) {
    return { type: "endBlockchainWriteCall_Failed" };
  }
  return { type: "END_BLOCKCHAIN_WRITE_CALL", payload: contract };
}

export function blockchainCallError() {
  return { type: "BLOCKCHAIN_CALL_ERROR" };
}

const contractHasActiveBlockchainWrite = (currentCalls, contract) => {
  const index = currentCalls.findIndex((address) => address === contract);
  console.log("index in contractHasActiveBlockchainWrite", index);
  return index;
};
