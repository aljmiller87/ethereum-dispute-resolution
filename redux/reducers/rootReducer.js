import { combineReducers } from "redux";
import networkReducer from "./networkReducer";
import accountReducer from "./accountReducer";
import blockchainCallsReducer from "./blockchainStatusReducer";
import dashboardReducer from "./dashboardReducer";
import contractDetails from "./contractDetails";
import contractLogs from "./contractLogs";
import contractSubscribe from "./contractSubscribe";

const rootReducer = combineReducers({
  accountReducer,
  networkReducer,
  blockchainCallsReducer,
  dashboardReducer,
  contractDetails,
  contractLogs,
  contractSubscribe,
});

export default rootReducer;
