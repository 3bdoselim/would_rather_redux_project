import { ADD_QUESTION, ANSWER_QUESTION, USER_AUTH_LOGIN, USER_AUTH_LOGOUT } from "./actionNames";

export function userLogin(userId) {
    return {
        type: USER_AUTH_LOGIN,
        payload: {
            userId,
        }
    }
}

export function userLogout() {
    return {
        type: USER_AUTH_LOGOUT,
    }
}

export function CreateQuestion(question) {
    return {
        type: ADD_QUESTION,
        payload: { question }
    }
}


export function answerQuestion(questionId, userId, selectedOption) {
    return {
        type: ANSWER_QUESTION,
        payload: { questionId, userId, selectedOption }
    }
}
