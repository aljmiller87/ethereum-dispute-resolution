import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const makeStore = (context) => {
  const store = createStore(rootReducer);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
