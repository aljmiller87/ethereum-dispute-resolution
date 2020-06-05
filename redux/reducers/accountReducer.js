import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  coinbase: {
    address: null,
    contracts: [],
  },
  currentView: {
    address: null,
    contracts: [],
  },
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case "SET_COINBASE": {
      return {
        ...state,
        coinbase: {
          ...state.coinbase,
          address: action.payload,
        },
      };
    }
    case "SET_COINBASE_CONTRACT_LIST": {
      return {
        ...state,
        coinbase: {
          ...state.coinbase,
          contracts: action.payload,
        },
      };
    }
    case "SET_CURRENT_VIEW_ACCOUNT": {
      return {
        ...state,
        currentView: {
          ...state.currentView,
          address: action.payload,
        },
      };
    }
    case "SET_CURRENT_VIEW_ACCOUNT_CONTRACT_LIST": {
      return {
        ...state,
        currentView: {
          ...state.currentView,
          contracts: action.payload,
        },
      };
    }
    default:
      return { ...state };
  }
};

export default accountReducer;
