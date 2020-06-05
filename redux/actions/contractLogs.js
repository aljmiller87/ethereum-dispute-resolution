import ThreeJudge from "../../ethereum/threejudge";
import { formatContractData } from "../../utilities/contractHelpers";

//Action Types
export const ADD_EVENT = "ADD_EVENT";
export const SET_PAST_EVENTS = "SET_PAST_EVENTS";
export const SET_BATCH_CONTRACT_EVENTS = "SET_BATCH_CONTRACT_EVENTS";

//Action Creators
export const addEvent = (contractAddress, event) => ({
  type: ADD_EVENT,
  payload: { contractAddress, event },
});

export const setPastEvents = (contractAddress, pastEvents) => ({
  type: SET_PAST_EVENTS,
  payload: { contractAddress, pastEvents },
});

export const setBatchContractEvents = (logs) => ({
  type: SET_BATCH_CONTRACT_EVENTS,
  payload: logs,
});

export const asyncSetPastEvents = (address) => {
  return async (dispatch) => {
    try {
      const contract = ThreeJudge(address);
      const contractEvents = await contract.getPastEvents("allEvents", {
        fromBlock: 0,
      });
      dispatch(setPastEvents(address, contractEvents));
    } catch (error) {
      console.log("asyncSetPastEvents error: ", error.message);
    }
    return "done";
  };
};

export const fetchBatchContractEvents = (contracts) => {
  return async (dispatch) => {
    try {
      const allEvents = {};
      await Promise.all(
        contracts.map(async (contract) => {
          let contractLogs = await fetchContracPastEvents(contract);
          allEvents[contract] = contractLogs;
        })
      );
      dispatch(setBatchContractEvents(allEvents));
    } catch (error) {
      console.log("fetchBatchContractData error:", error.message);
    }
  };
};

export const fetchContracPastEvents = async (address) => {
  const contract = ThreeJudge(address);
  const contractEvents = await contract.getPastEvents("allEvents", {
    fromBlock: 0,
  });
  return contractEvents;
};
