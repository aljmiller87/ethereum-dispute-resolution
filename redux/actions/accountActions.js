import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";

//Action Types
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_CONTRACTS = "SET_CONTRACTS";

//Action Creator
export const setAccount = (coinbase) => ({
  type: SET_ACCOUNT,
  payload: coinbase,
});

export const setContracts = (contracts) => ({
  type: SET_CONTRACTS,
  payload: contracts,
});

export const asyncLoadAccountInfo = () => {
  console.log("asyncLoadAccountInfo called");
  return async (dispatch) => {
    try {
      const [coinbase] = await web3.eth.getAccounts();
      const fetchedContracts = await factory.methods
        .getdeployedContracts()
        .call({}, { from: coinbase });

      dispatch(setAccount(coinbase));
      dispatch(setContracts(fetchedContracts));
    } catch (error) {
      // dispatch(errorHandle(error));
      console.log("error", error);
    }

    return "done";
  };
};
// return function (dispatch) {
//  const fetchAccountInfo = async () => {

//  }
//   let accounts = await web3.eth.getAccounts();
//   dispatch(setAccounts(accounts));
// const fetchedContracts = await factory.methods
//   .getdeployedContracts()
//   .call({}, { from: accounts[0] });
//   // coinbase = coinbase ? coinbase.toLowerCase() : null;
//   dispatch(setContracts(fetchedContracts));
// };
