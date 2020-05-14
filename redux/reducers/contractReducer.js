import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  contract: {},
};

const contractReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };

    default:
      return { ...state };
  }
};

export default contractReducer;
