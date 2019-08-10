import uuid from 'uuid/v4'
import { ADD_MESSAGE, REMOVE_MESSAGE } from './actionTypes'

export function addMessage(txt) {
    return {
        type: ADD_MESSAGE,
        payload: {
            id: uuid(),
            text: txt
        }
    }
}

export function removeMessage(id) {
    return {
        type: REMOVE_MESSAGE,
        payload: id
    }
}
