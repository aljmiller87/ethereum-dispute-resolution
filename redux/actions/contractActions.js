import ThreeJudge from "../../ethereum/threejudge";
import { formatContractData } from "../../utilities/contractHelpers";

//Action Types
export const SET_CONTRACT_DETAILS = "SET_CONTRACT_DETAILS";
export const ADD_EVENT = "ADD_EVENT";
export const UPDATE_SUMMARY = "UPDATE_SUMMARY";
export const SET_ALL_CONTRACT_DATA = "SET_ALL_CONTRACT_DATA";

//Action Creator
export const setContractDetails = (contractAddress, summary, eventsArray) => ({
  type: SET_CONTRACT_DETAILS,
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

export const setAllContractData = (allContractData) => ({
  type: SET_ALL_CONTRACT_DATA,
  payload: allContractData,
});

export const asyncFetchState = (address, instance) => {
  console.log("instance in asyncFetchState", instance);
  return async (dispatch) => {
    try {
      const escrowSummary = await instance.methods.getStatus().call();
      const disputeSummary = await instance.methods.getDisputeStatus().call();
      const summary = { ...escrowSummary, disputeSummary };
      console.log("summary in asyncFetchState", summary);
      dispatch(updateSummary(address, summary));
    } catch (error) {
      console.log("asyncFetchState: ", error);
    }
    return "done";
  };
};

export const fetchAllContractData = (contracts) => {
  console.log("Getting HERE????", contracts);
  return async (dispatch) => {
    try {
      const allData = {};
      await Promise.all(
        contracts.map(async (contract) => {
          let contractData = await fetchContractDetails(contract);
          allData[contract] = contractData;
        })
      );
      console.log("allData", allData);
      dispatch(setAllContractData(allData));
    } catch (error) {
      console.log("fetchAllContractData error:", error.message);
    }
  };
};

export const fetchContractDetails = async (contract) => {
  const campaign = ThreeJudge(contract);
  const summary = await campaign.methods.getStatus().call();
  const disputeSummary = await campaign.methods.getDisputeStatus().call();
  const formattedSummary = formatContractData({ summary, disputeSummary });
  return formattedSummary;
};
