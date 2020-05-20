import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import {
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";

const routerMiddleware = createRouterMiddleware();

const makeStore = (initialState = {}, options) => {
  const devToolOptions = { trace: true };
  const composeEnhancers = composeWithDevTools(devToolOptions);

  if (options && options.asPath) {
    initialState.router = initialRouterState(options.asPath);
  }
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk, routerMiddleware, reduxImmutableStateInvariant())
    )
  );
  return store;
};

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper;
