//Action Types
export const SET_IS_ETHEREUM_CONNECTED = "SET_IS_ETHEREUM_CONNECTED";
export const SET_NETWORK = "SET_NETWORK";

//Action Creator
export const setIsEthereumConnected = (payload) => ({
  type: SET_IS_ETHEREUM_CONNECTED,
  payload,
});

export const setNetwork = (network) => ({
  type: SET_NETWORK,
  payload: network,
});
