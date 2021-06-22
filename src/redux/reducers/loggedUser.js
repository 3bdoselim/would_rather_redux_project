import { USER_AUTH_LOGIN, USER_AUTH_LOGOUT } from "../actions/actionNames";

const initialState = 'tylermcginnis'

export default function loggedUser(state = initialState, action) {
    switch (action.type) {
        case USER_AUTH_LOGIN:
            return action.payload.userId
        case USER_AUTH_LOGOUT:
            return ''
        default:
            return state
    }
}
