//Action Types
export const SET_IS_ETHEREUM_CONNECTED = "SET_IS_ETHEREUM_CONNECTED";
export const SET_NETWORK = "SET_NETWORK";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_CONTRACTS = "SET_CONTRACTS";

//Action Creator
export const setIsEthereumConnected = (payload) => ({
  type: SET_IS_ETHEREUM_CONNECTED,
  payload,
});

export const setNetwork = (network) => ({
  type: SET_NETWORK,
  payload: network,
});

export const setAccount = (accounts) => ({
  type: SET_ACCOUNT,
  payload: accounts,
});

export const setContracts = (contracts) => ({
  type: SET_CONTRACTS,
  payload: contracts,
});
