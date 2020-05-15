import { combineReducers } from "redux";
import {
  routerReducer,
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import networkReducer from "./networkReducer";
import accountReducer from "./accountReducer";
import contractDetailReducer from "./contractDetailReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  accountReducer,
  networkReducer,
  contractDetailReducer,
  apiCallsInProgress,
  router: routerReducer,
});

export default rootReducer;
