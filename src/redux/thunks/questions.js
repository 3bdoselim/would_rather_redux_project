import { v4 } from 'uuid'
import { CreateQuestion } from '../actions/createActions'

export function handleCreateQuestion(optionOneText, optionTwoText) {
    
    return function(dispatch, getState) {
        const id = v4().replace('-', '').slice(0, 22)
        const timestamp = Date.now()
        const author = getState().loggedUser

        const question = {
            id,
            timestamp,
            author,
            optionOne: {
                votes: [],
                text: optionOneText
            },
            optionTwo: {
                votes: [],
                text: optionTwoText
            },
        }

        dispatch(CreateQuestion(question))
    }
}