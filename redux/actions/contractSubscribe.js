//Action Types
export const SET_LISTENING_STATUS = "SET_LISTENING_STATUS";
export const SET_BATCH_LISTENING_STATUS = "SET_BATCH_LISTENING_STATUS";
export const CLEAR_SUBSCRIPTIONS = "CLEAR_SUBSCRIPTIONS";

//Action Creator
export const setListeningStatus = (contractAddress, subscriptionID) => ({
  type: SET_LISTENING_STATUS,
  payload: { contractAddress, subscriptionID },
});

export const clearSubscriptions = () => ({
  type: CLEAR_SUBSCRIPTIONS,
});

export const setBatchListeningStatus = (contractList, subscriptionID) => {
  const updatedContracts = {};
  for (let contract of contractList) {
    updatedContracts[contract] = subscriptionID;
  }
  return {
    type: SET_BATCH_LISTENING_STATUS,
    payload: updatedContracts,
  };
};
