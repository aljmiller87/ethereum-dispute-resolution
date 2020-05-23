import { HYDRATE } from "next-redux-wrapper";

const contractReducer = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };
    case "SET_ALL_CONTRACT_DATA":
      return {
        ...action.payload,
      };
    case "SET_SINGLE_CONTRACT_DATA":
      return {
        ...state,
        [action.payload.contractAddress]: {
          events: action.payload.eventsArray,
          summary: action.payload.summary,
          isListening: false,
        },
      };
    case "SET_LISTENING_ACTIVE":
      return {
        ...state,
        [action.payload]: {
          events: state[action.payload].events,
          summary: state[action.payload].summary,
          isLoading: true,
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
          isLoading: state[action.payload.contractAddress].isLoading,
        },
      };
    case "UPDATE_SUMMARY":
      return {
        ...state,
        [action.payload.contractAddress]: {
          events: state[action.payload.contractAddress].events,
          summary: action.payload.summary,
          isLoading: state[action.payload.contractAddress].isLoading,
        },
      };
    default:
      return { ...state };
  }
};

export default contractReducer;
