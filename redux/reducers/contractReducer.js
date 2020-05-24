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
          listeningStatus: false,
        },
      };
    case "SET_LISTENING_STATUS":
      return {
        ...state,
        [action.payload]: {
          events: state[action.payload].events,
          summary: state[action.payload].summary,
          listeningStatus: action.payload.subscriptionId,
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
          listeningStatus:
            state[action.payload.contractAddress].listeningStatus,
        },
      };
    case "UPDATE_SUMMARY":
      return {
        ...state,
        [action.payload.contractAddress]: {
          events: state[action.payload.contractAddress].events,
          summary: action.payload.summary,
          listeningStatus:
            state[action.payload.contractAddress].listeningStatus,
        },
      };
    default:
      return { ...state };
  }
};

export default contractReducer;
