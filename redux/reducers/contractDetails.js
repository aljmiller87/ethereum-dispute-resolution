import { HYDRATE } from "next-redux-wrapper";

const contractDetails = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state };

    case "SET_CONTRACT_STATE":
      return {
        ...state,
        [action.payload.contractAddress]: action.payload.contractState,
      };
    case "SET_BATCH_CONTRACT_STATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
};

export default contractDetails;
