import { HYDRATE } from "next-redux-wrapper";

const contractReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case "SET_LISTENING_STATUS":
      return {
        ...state,
        [action.payload.contractAddress]: action.payload.subscriptionID,
      };

    case "CLEAR_SUBSCRIPTIONS":
      return {};
    case "SET_BATCH_LISTENING_STATUS":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return { ...state };
  }
};

export default contractReducer;
