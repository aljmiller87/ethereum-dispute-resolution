import { combineReducers } from "redux";
import { routerReducer } from "connected-next-router";
import networkReducer from "./networkReducer";
import accountReducer from "./accountReducer";
import contractDetailReducer from "./contractDetailReducer";
import blockchainCallsReducer from "./blockchainStatusReducer";
import dashboardReducer from "./dashboardReducer";

const rootReducer = combineReducers({
  accountReducer,
  networkReducer,
  contractDetailReducer,
  blockchainCallsReducer,
  dashboardReducer,
  router: routerReducer,
});

export default rootReducer;
