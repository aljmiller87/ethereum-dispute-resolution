import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";

//Action Types
export const SET_COINBASE = "SET_COINBASE";
export const SET_COINBASE_CONTRACT_LIST = "SET_COINBASE_CONTRACT_LIST";
export const SET_CURRENT_VIEW_ACCOUNT = "SET_CURRENT_VIEW_ACCOUNT";
export const SET_CURRENT_VIEW_ACCOUNT_CONTRACT_LIST =
  "SET_CURRENT_VIEW_ACCOUNT_CONTRACT_LIST";

//Action Creator
export const setCoinbase = (coinbase) => ({
  type: SET_COINBASE,
  payload: coinbase,
});

export const setCoinbaseContractList = (contracts) => ({
  type: SET_COINBASE_CONTRACT_LIST,
  payload: contracts,
});

export const setcurrentView = (address) => ({
  type: SET_CURRENT_VIEW_ACCOUNT,
  payload: address,
});

export const setCurrentViewContractList = (contracts) => ({
  type: SET_CURRENT_VIEW_ACCOUNT_CONTRACT_LIST,
  payload: contracts,
});

export const asyncLoadCoinbaseInfo = () => {
  return async (dispatch) => {
    try {
      const [coinbase] = await web3.eth.getAccounts();
      const fetchedContracts = await factory.methods
        .getdeployedContracts()
        .call({}, { from: coinbase });
      dispatch(setCoinbase(coinbase));
      dispatch(setCoinbaseContractList(fetchedContracts));
    } catch (error) {
      // dispatch(errorHandle(error));
      console.log("asyncLoadCoinbaseInfo: ", error);
    }

    return "done";
  };
};

export const asyncLoadCurrentViewInfo = (address) => {
  return async (dispatch) => {
    try {
      const fetchedContracts = await factory.methods
        .getdeployedContracts()
        .call({}, { from: address });
      dispatch(setcurrentView(coinbase));
      dispatch(setCurrentViewContractList(fetchedContracts));
    } catch (error) {
      // dispatch(errorHandle(error));
      console.log("asyncLoadCurrentViewInfo: ", error);
    }

    return "done";
  };
};
