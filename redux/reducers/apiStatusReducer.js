import { HYDRATE } from "next-redux-wrapper";

const apiStatusReducer = (apiCallsInProgress = 0, action) => {
  switch (action.type) {
    case HYDRATE:
      return apiCallsInProgress;
    case "BEGIN_API_CALL": {
      return apiCallsInProgress + 1;
    }
    case "END_API_CALL": {
      return apiCallsInProgress - 1;
    }
    default:
      return apiCallsInProgress;
  }
};

export default apiStatusReducer;
