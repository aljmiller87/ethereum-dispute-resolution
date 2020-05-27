import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _get from "lodash/get";
import ThreeJudge from "../ethereum/threejudge";
import * as contractActions from "../redux/actions/contractActions";
import { formatContractData } from "../utilities/contractHelpers";

const initialListeningState = {
  isLoading: false,
  isListening: false,
  hasError: "contract has not loaded yet",
};

const useContractEventSubscription = (contractAddress) => {
  const dispatch = useDispatch();

  // Grabbing the contract's event subscription status from redux store
  const { contractReducer } = useSelector((state) => state);
  const listeningStatus = _get(
    contractReducer,
    [contractAddress].listeningStatus,
    initialListeningState
  );
  const { isLoading, isListening, hasError } = listeningStatus;

  // Setting the contract's event subscription status to local state to control number of subscribeToContractEvents calls
  const [isLoadingState, setIsDataLoading] = useState(isLoading);
  const [isListeningState, setListeningStatus] = useState(isListening);
  const [errorState, setError] = useState(hasError);

  // useEffect(() => {
  //   subscribeToContractEvents;
  // }, [isLoadingState, isListeningState, errorState]);

  const subscribeToContractEvents = async (contractAddress) => {
    if (!contractAddress) {
      return null;
    }
    if (isListeningState) {
      // If already listening, then return the subscription ID
      return isListeningState;
    }
    if (isLoadingState) {
      // If event listeners initiated but have not received subscription ID, then return loading state
      return "Currently loading";
    }
    setIsDataLoading(true);
    setListeningStatus(false);
    setError(false);
    try {
      const instance = ThreeJudge(contractAddress);
      const summary = await instance.methods.getStatus().call();
      const disputeSummary = await instance.methods.getDisputeStatus().call();
      const { escrowState, disputeState } = formatContractData({
        summary,
        disputeSummary,
      });

      if (
        escrowState === "CANCELLED" ||
        escrowState === "COMPLETE" ||
        disputeState === "COMPLETE"
      ) {
        throw new Error("Contract is inactive");
      }

      // Subscribing to events
      instance.events
        .allEvents({
          fromBlock: "latest",
        })
        .on("connected", function (subscriptionId) {
          console.log("connected subscriptionId", subscriptionId);
          setIsDataLoading(false);
          setListeningStatus(subscriptionId);
        })
        .on("data", function (event) {
          // Callback function when event is detected
          console.log("data event", event);
          dispatch(contractActions.addEvent(contractAddress, event));
        });
    } catch (error) {
      // dispatch(
      console.log("error", error.message);
      setError(error.message);
      setIsDataLoading(false);
      // );
    }
  };

  useEffect(() => {
    dispatch(
      contractActions.setListeningStatus(contractAddress, {
        isLoading: isLoadingState,
        isListening: isListeningState,
        hasError: errorState,
      })
    );
  }, [isLoadingState, isListeningState, errorState]);

  return [
    { isLoadingState, isListeningState, errorState },
    subscribeToContractEvents,
  ];
};

export default useContractEventSubscription;
