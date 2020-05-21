import { HYDRATE } from "next-redux-wrapper";

const initialState = "contracts";

const dashboardNavReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case "SET_DASHBOARD_NAV": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default dashboardNavReducer;
