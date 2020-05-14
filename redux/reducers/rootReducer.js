import networkReducer from "./networkReducer";
import accountReducer from "./accountReducer";
import contractReducer from "./contractReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  accountReducer,
  networkReducer,
  contractReducer,
});

export default rootReducer;
