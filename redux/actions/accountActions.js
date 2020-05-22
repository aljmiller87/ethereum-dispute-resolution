import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";

//Action Types
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_ACCOUNT_CONTRACT_LIST = "SET_ACCOUNT_CONTRACT_LIST";

//Action Creator
export const setAccount = (coinbase) => ({
  type: SET_ACCOUNT,
  payload: coinbase,
});

export const setAccountContractList = (contracts) => ({
  type: SET_ACCOUNT_CONTRACT_LIST,
  payload: contracts,
});

export const asyncLoadAccountInfo = () => {
  return async (dispatch) => {
    try {
      const [coinbase] = await web3.eth.getAccounts();
      const fetchedContracts = await factory.methods
        .getdeployedContracts()
        .call({}, { from: coinbase });
      dispatch(setAccount(coinbase));
      dispatch(setAccountContractList(fetchedContracts));
    } catch (error) {
      // dispatch(errorHandle(error));
      console.log("asyncLoadAccountInfo: ", error);
    }

    return "done";
  };
};
