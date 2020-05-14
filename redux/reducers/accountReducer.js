import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  account: [],
  contracts: [],
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };

    default:
      return { ...state };
  }
};

export default accountReducer;
