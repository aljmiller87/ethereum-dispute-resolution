import { createStore, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";

const makeStore = (initialState = {}) => {
  const devToolOptions = { trace: true };
  const composeEnhancers = composeWithDevTools(devToolOptions);

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
  return store;
};

const wrapper = createWrapper(makeStore, { debug: true });

export default wrapper;
