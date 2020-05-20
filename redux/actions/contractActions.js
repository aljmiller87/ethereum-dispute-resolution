//Action Types
export const SET_CONTRACT_DETAILS = "SET_CONTRACT_DETAILS";
export const ADD_EVENT = "ADD_EVENT";
export const UPDATE_SUMMARY = "UPDATE_SUMMARY";

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
