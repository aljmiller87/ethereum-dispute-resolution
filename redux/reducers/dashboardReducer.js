import { HYDRATE } from "next-redux-wrapper";

const initialState = { activeTab: "dashboard", mobileMenuOpen: false };

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case "SET_DASHBOARD_NAV": {
      return { ...state, activeTab: action.payload };
    }
    case "TOGGLE_MOBILE_NAV": {
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
