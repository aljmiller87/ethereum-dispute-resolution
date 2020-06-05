import { HYDRATE } from "next-redux-wrapper";

const contractLogs = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };

    case "SET_PAST_EVENTS":
      return {
        ...state,
        [action.payload.contractAddress]: action.payload.pastEvents,
      };
    case "ADD_EVENT":
      return {
        ...state,
        [action.payload.contractAddress]: [
          ...state[action.payload.contractAddress],
          action.payload.event,
        ],
      };
    case "SET_BATCH_CONTRACT_EVENTS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};

export default contractLogs;
