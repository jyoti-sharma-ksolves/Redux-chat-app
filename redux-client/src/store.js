import { combineReducers, createStore, applyMiddleware } from "redux";
import textChangeReducer from "./reducers/auth";
import notifications from "./reducers/notifications"
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    textChangeReducer,
    notifications
  })

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;