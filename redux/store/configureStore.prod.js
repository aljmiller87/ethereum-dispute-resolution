import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers/rootReducer";

const routerMiddleware = createRouterMiddleware();

const makeStore = (initialState = {}, options) => {
  if (options && options.asPath) {
    initialState.router = initialRouterState(options.asPath);
  }
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware, thunk)
  );
  return store;
};

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper;
