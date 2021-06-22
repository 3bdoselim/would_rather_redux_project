import loggedUser from "./loggedUser";
import users from "./users";
import questions from "./questions";

import { combineReducers } from "redux";

const reducer = combineReducers({
    loggedUser,
    users,
    questions
})

export default reducer
