import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import patternReducer from "./pattern";
import testerReducer from "./tester";
import patternImageReducer from "./patternImage"
import checkoutReducer from "./checkout";

const rootReducer = combineReducers({
  session: sessionReducer,
  patterns: patternReducer,
  testers: testerReducer,
  patternImages: patternImageReducer,
  checkout: checkoutReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
