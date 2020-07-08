import ThreeJudge from "../../ethereum/threejudge";
// import { formatContractData } from "../../utilities/contractHelpers";

//Action Types
export const ADD_EVENT = "ADD_EVENT";
export const SET_PAST_EVENTS = "SET_PAST_EVENTS";
export const SET_BATCH_CONTRACT_EVENTS = "SET_BATCH_CONTRACT_EVENTS";
export const SET_EVENT_STATUS = "SET_EVENT_STATUS";

//Action Creators
export const addEvent = (contractAddress, event) => {
  console.log("addEvent", contractAddress, event);
  return {
    type: ADD_EVENT,
    payload: { contractAddress, event },
  };
};

export const setPastEvents = (contractAddress, pastEvents) => ({
  type: SET_PAST_EVENTS,
  payload: { contractAddress, pastEvents },
});

export const setBatchContractEvents = (logs) => ({
  type: SET_BATCH_CONTRACT_EVENTS,
  payload: logs,
});

export const setEventStatus = (address, logIndex) => ({
  type: SET_EVENT_STATUS,
  payload: { address, logIndex },
});

export const asyncSetPastEvents = (address) => {
  return async (dispatch) => {
    try {
      const contract = ThreeJudge(address);
      let contractLogs = await fetchContracPastEvents(contract);
      console.log("contractLogs before", contractLogs);
      contractLogs = contractLogs.map((event) => {
        return { ...event, isNew: true };
      });
      console.log("contractLogs after", contractLogs);

      dispatch(setPastEvents(address, contractLogs));
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
          contractLogs = contractLogs.map((event) => {
            return { ...event, isNew: false };
          });

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
