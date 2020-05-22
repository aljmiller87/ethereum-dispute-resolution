import { HYDRATE } from "next-redux-wrapper";

const contractDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case "SET_ALL_CONTRACT_DATA":
      return {
        ...action.payload,
      };
    case "SET_CONTRACT_DETAILS":
      return {
        ...state,
        [action.payload.contractAddress]: {
          events: action.payload.eventsArray,
          summary: action.payload.summary,
        },
      };
    case "ADD_EVENT":
      const updatedEvents = [
        ...state[action.payload.contractAddress].events,
        action.payload.event,
      ];

      return {
        ...state,
        [action.payload.contractAddress]: {
          events: updatedEvents,
          summary: state[action.payload.contractAddress].summary,
        },
      };
    case "UPDATE_SUMMARY":
      return {
        ...state,
        [action.payload.contractAddress]: {
          events: state[action.payload.contractAddress].events,
          summary: action.payload.summary,
        },
      };
    default:
      return { ...state };
  }
};

export default contractDetailReducer;
