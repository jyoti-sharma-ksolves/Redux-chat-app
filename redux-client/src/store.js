import { combineReducers, createStore, applyMiddleware } from "redux";
import textChangeReducer from "./reducers/auth";
import notifications from "./reducers/notifications";
import userInfoReducer from "./reducers/chat-room";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    textChangeReducer,
    notifications,
    userInfoReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;