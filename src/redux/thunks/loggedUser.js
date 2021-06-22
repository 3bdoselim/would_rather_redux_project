import { userLogin, userLogout } from "../actions/createActions"

const CURRENT_USER = 'loggedUser'

export function handleUserLogin() {
    return function(dispatch) {
        const UserId = localStorage.getItem(CURRENT_USER)

        if (UserId) {
            dispatch(userLogin(UserId))
        }
    }
}

export function handleUserLogout() {
    return function(dispatch) {
        localStorage.removeItem(CURRENT_USER)
        dispatch(userLogout())
    }
}
