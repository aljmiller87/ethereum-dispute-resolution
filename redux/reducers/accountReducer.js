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
    case "SET_CONTRACTS": {
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
