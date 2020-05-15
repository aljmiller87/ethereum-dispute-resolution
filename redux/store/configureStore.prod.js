import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import { routerMiddleware } from "connected-react-router";
// import { createBrowserHistory } from "history";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers/rootReducer";

// export const history = createBrowserHistory();

const makeStore = (context) => {
  console.log("dev version of configure store");
  const store = createStore(
    rootReducer,
    applyMiddleware()
    // thunk
    // routerMiddleware(history),
    // reduxImmutableStateInvariant()
  );
  return store;
};

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper;
