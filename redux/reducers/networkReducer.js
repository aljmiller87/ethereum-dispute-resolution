import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  network: null,
  isEthereumConnected: false,
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case "SET_IS_ETHEREUM_CONNECTED":
      return {
        ...state,
        isEthereumConnected: action.payload,
      };
    case "SET_NETWORK":
      return {
        ...state,
        network: action.payload,
      };
    default:
      return { ...state };
  }
};

export default networkReducer;
