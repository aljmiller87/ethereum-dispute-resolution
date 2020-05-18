import { combineReducers } from "redux";
import {
  routerReducer,
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import networkReducer from "./networkReducer";
import accountReducer from "./accountReducer";
import contractDetailReducer from "./contractDetailReducer";
import blockchainCallsReducer from "./blockchainStatusReducer";

const rootReducer = combineReducers({
  accountReducer,
  networkReducer,
  contractDetailReducer,
  blockchainCallsReducer,
  router: routerReducer,
});

export default rootReducer;
