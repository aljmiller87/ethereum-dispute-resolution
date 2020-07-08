import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isCoinbase: false,
  activeTab: "dashboard",
  mobileMenuOpen: false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return state;
    case "SET_DASHBOARD_VIEW": {
      return {
        ...state,
        activeTab: action.payload,
      };
    }
    case "SET_DASHBOARD_USER": {
      return {
        ...state,
        isCoinbase: action.payload,
      };
    }
    case "TOGGLE_MOBILE_NAV": {
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    }
    default:
      return state;
  }
};

export default dashboardReducer;
