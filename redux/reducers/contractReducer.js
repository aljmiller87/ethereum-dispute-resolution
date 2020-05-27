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
          ...state[action.payload.contractAddress],
          events: action.payload.eventsArray,
          summary: action.payload.summary,
        },
      };
    case "SET_LISTENING_STATUS":
      return {
        ...state,
        [action.payload.contractAddress]: {
          ...state[action.payload.contractAddress],
          listeningStatus: action.payload.listeningStatus,
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
          ...state[action.payload.contractAddress],
          events: updatedEvents,
        },
      };
    case "UPDATE_SUMMARY":
      return {
        ...state,
        [action.payload.contractAddress]: {
          ...state[action.payload.contractAddress],
          summary: action.payload.summary,
        },
      };
    default:
      return { ...state };
  }
};

export default contractReducer;
