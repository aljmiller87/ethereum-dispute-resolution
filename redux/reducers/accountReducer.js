import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  account: null,
  contracts: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case "SET_ACCOUNT": {
      return {
        ...state,
        account: action.payload,
      };
    }
    case "SET_ACCOUNT_CONTRACT_LIST": {
      return {
        ...state,
        contracts: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default accountReducer;
