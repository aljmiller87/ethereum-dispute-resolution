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
    case "ADD_EVENT": {
      const logs = Object.keys(state).some(
        (key) => key === action.payload.contractAddress
      )
        ? [...state[action.payload.contractAddress]]
        : [];
      return {
        ...state,
        [action.payload.contractAddress]: [...logs, action.payload.event],
      };
    }
    case "SET_BATCH_CONTRACT_EVENTS":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_EVENT_STATUS":
      return {
        ...state,
        [action.payload.address]: state[action.payload.address].map(
          (item, index) => {
            // Find the item with the matching id
            if (index === action.payload.logIndex) {
              // Return a new object
              return {
                ...item, // copy the existing item
                isNew: false, // invert isNew value
              };
            }

            // Leave every other item unchanged
            return item;
          }
        ),
      };
    default:
      return { ...state };
  }
};

export default contractLogs;
