import { ADD_MESSAGE, REMOVE_MESSAGE } from './actionTypes'

export default function reducer(prevState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return { ...prevState, [action.payload.id]: action.payload }

        case REMOVE_MESSAGE:
            return Object.values(prevState)
                .filter(msg => msg.id !== action.payload)
                .reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})

        default:
            return prevState
    }
}
