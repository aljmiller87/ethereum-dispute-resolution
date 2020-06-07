import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers/rootReducer";

const makeStore = (initialState = {}) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
};

const wrapper = createWrapper(makeStore, { debug: false });

export default wrapper;
