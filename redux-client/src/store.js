import { combineReducers, createStore, applyMiddleware } from "redux";
import textChangeReducer from "./reducers/sign-up";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    textChangeReducer
  })

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;