import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

// Reducers
import { ProfileReducer, ExperiencesReducer } from "./Reducers";

// All reducers
const rootReducer = combineReducers({ ProfileReducer, ExperiencesReducer });

function configureStore() {
  return createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk, logger))
  );
}

const store = configureStore();
export default store;
