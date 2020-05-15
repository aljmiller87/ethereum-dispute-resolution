import { combineReducers } from "redux";
import {
  routerReducer,
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import networkReducer from "./networkReducer";
import accountReducer from "./accountReducer";
import contractReducer from "./contractReducer";

const rootReducer = combineReducers({
  accountReducer,
  networkReducer,
  contractReducer,
  router: routerReducer,
});

export default rootReducer;
