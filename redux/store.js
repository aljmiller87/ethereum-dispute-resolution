// import { createStore } from "redux";
// import { createWrapper } from "next-redux-wrapper";
// import rootReducer from "./reducers/rootReducer";

// const makeStore = (context) => {
//   const store = createStore(rootReducer);
//   return store;
// };

// export const wrapper = createWrapper(makeStore, { debug: true });

import { createStore, applyMiddleware, compose } from "redux";
// import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
// import thunk from "redux-thunk";
// import { routerMiddleware } from "connected-react-router";
// import { createBrowserHistory } from "history";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

// export const history = createBrowserHistory();

const makeStore = (context) => {
  console.log("dev version of configure store");
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware()
      // thunk
      // routerMiddleware(history),
      // reduxImmutableStateInvariant()
    )
  );
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
