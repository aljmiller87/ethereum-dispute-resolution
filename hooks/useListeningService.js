import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThreeJudge from "../ethereum/threejudge";

const initialListeningState = {
  isLoading: false,
  isListening: false,
  hasError: false,
};

const useListeningService = (contractAddress) => {
  // const { listeningStatus } = useSelector(
  //   (state) => state.contractReducer[contractAddress] || {}
  // );
  const listeningStatus = {};

  const { isLoading, isListening, hasError } = Object.keys(listeningStatus)
    .length
    ? listeningStatus
    : initialListeningState;
  const [isLoadingState, setIsDataLoading] = useState(isLoading);
  const [isListeningState, setListeningStatus] = useState(isListening);
  const [errorState, setError] = useState(hasError);

  // const setContractEventListeners = async (contractAddress) => {
  //   if (!contractAddress) {
  //     return null;
  //   }
  //   if (isListening || isListeningState) {
  //     return [
  //       { isDataLoading, listeningStatus, error },
  //       setContractEventListeners,
  //     ];
  //   }
  //   try {
  //     setIsLoading(true);
  //     setError(false);
  //     const instance = ThreeJudge(contractAddress);
  //     const summary = await instance.methods.getStatus().call();
  //     const disputeSummary = await instance.methods.getDisputeStatus().call();
  //     const { escrowState, disputeState } = formatContractData({
  //       summary,
  //       disputeSummary,
  //     });

  //     if (
  //       escrowState === "CANCELLED" ||
  //       escrowState === "COMPLETE" ||
  //       disputeState === "COMPLETE"
  //     ) {
  //       throw new Error("Contract is inactive");
  //     }
  //     instance.events
  //       .allEvents({
  //         fromBlock: "latest",
  //       })
  //       .on("connected", function (subscriptionId) {
  //         console.log("connected subscriptionId", subscriptionId);
  //         dispatch(
  //           contractActions.setListeningStatus(contractAddress, {
  //             isLoading: false,
  //             isListening: subscriptionId,
  //             hasError: false,
  //           })
  //         );
  //       })
  //       .on("data", function (event) {
  //         console.log("data event", event);
  //         dispatch(contractActions.addEvent(contractAddress, event));
  //       })
  //       .on("changed", function (event) {
  //         console.log("changed event", event);
  //         // remove event from local database
  //       })
  //       .on("error", function (error, receipt) {
  //         // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
  //         console.log("error", error);
  //         console.log("error receipt", receipt);
  //       });
  //   } catch (error) {
  //     dispatch(
  //       contractActions.setListeningStatus(contractAddress, {
  //         isLoading: false,
  //         isListening: false,
  //         hasError: error.message,
  //       })
  //     );
  //   }
  // };

  return [{ isLoading, isListening, hasError }];
};

export default useListeningService;
