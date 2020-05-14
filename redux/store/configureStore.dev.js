import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

export const history = createBrowserHistory();

const makeStore = (context) => {
  console.log("dev version of configure store");
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
        reduxImmutableStateInvariant()
      )
    )
  );
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });

// export default function configureStore(initialState) {
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

//   return createStore(
//     createRootReducer(history),
//     initialState,
//     composeEnhancers(
//       applyMiddleware(
//         thunk,
//         routerMiddleware(history),
//         reduxImmutableStateInvariant()
//       )
//     )
//   );
// }
