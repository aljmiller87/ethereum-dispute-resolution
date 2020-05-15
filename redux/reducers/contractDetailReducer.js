import { HYDRATE } from "next-redux-wrapper";

const contractDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };

    default:
      return { ...state };
  }
};

export default contractDetailReducer;
