import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  network: null,
  isEthereumConnected: false,
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };

    default:
      return { ...state };
  }
};

export default networkReducer;
