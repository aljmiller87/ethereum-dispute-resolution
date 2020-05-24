import ThreeJudge from "../../ethereum/threejudge";
import { formatContractData } from "../../utilities/contractHelpers";

//Action Types
export const SET_SINGLE_CONTRACT_DATA = "SET_SINGLE_CONTRACT_DATA";
export const ADD_EVENT = "ADD_EVENT";
export const UPDATE_SUMMARY = "UPDATE_SUMMARY";
export const SET_ALL_CONTRACT_DATA = "SET_ALL_CONTRACT_DATA";
export const SET_LISTENING_STATUS = "SET_LISTENING_STATUS";

//Action Creator
export const setSingleContractData = (
  contractAddress,
  summary,
  eventsArray
) => ({
  type: SET_SINGLE_CONTRACT_DATA,
  payload: { contractAddress, summary, eventsArray },
});

export const addEvent = (contractAddress, event) => ({
  type: ADD_EVENT,
  payload: { contractAddress, event },
});

export const updateSummary = (contractAddress, summary) => ({
  type: UPDATE_SUMMARY,
  payload: { contractAddress, summary },
});

export const setListeningStatus = (contractAddress, subscriptionId) => ({
  type: SET_LISTENING_STATUS,
  payload: { contractAddress, subscriptionId },
});

export const setAllContractData = (allContractData) => ({
  type: SET_ALL_CONTRACT_DATA,
  payload: allContractData,
});

// export const asyncFetchState = (address, instance) => {
//   return async (dispatch) => {
//     try {
//       const escrowSummary = await instance.methods.getStatus().call();
//       const disputeSummary = await instance.methods.getDisputeStatus().call();
//       const summary = { ...escrowSummary, disputeSummary };
//       dispatch(updateSummary(address, summary));
//     } catch (error) {
//       console.log("asyncFetchState: ", error);
//     }
//     return "done";
//   };
// };

export const fetchAllContractData = (contracts) => {
  return async (dispatch) => {
    try {
      const allData = {};
      await Promise.all(
        contracts.map(async (contract) => {
          let contractState = await fetchContractDetails(contract);
          let contractEventLogs = await fetchContracEventsLogs(contract);
          const contractData = {
            summary: contractState,
            events: contractEventLogs,
            listeningStatus: {
              isLoading: false,
              isListening: false,
              hasError: false,
            },
          };
          allData[contract] = contractData;
        })
      );
      dispatch(setAllContractData(allData));
    } catch (error) {
      console.log("fetchAllContractData error:", error.message);
    }
  };
};

export const fetchContracEventsLogs = async (address) => {
  const contract = ThreeJudge(address);
  const contractEvents = await contract.getPastEvents("allEvents", {
    fromBlock: 0,
  });
  return contractEvents;
};

export const fetchContractDetails = async (contract) => {
  const campaign = ThreeJudge(contract);
  const summary = await campaign.methods.getStatus().call();
  const disputeSummary = await campaign.methods.getDisputeStatus().call();
  const formattedSummary = formatContractData({ summary, disputeSummary });
  return formattedSummary;
};
