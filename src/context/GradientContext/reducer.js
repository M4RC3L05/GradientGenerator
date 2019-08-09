import {
    UPDATE_GRADIENT_STOP,
    SET_ACTIVE_GRADIENT_STOP,
    ADD_NEW_GRADIENT_STOP,
    REMOVE_GRADIENT_STOP,
    CHANGE_GRADIENT_TYPE
} from "./actionTypes"

export default function reducer(prevState, action) {
    switch (action.type) {
        case UPDATE_GRADIENT_STOP:
            if (!prevState.gradientStops[action.payload.id]) return prevState

            return {
                ...prevState,
                gradientStops: {
                    ...prevState.gradientStops,
                    [action.payload.id]: {
                        ...prevState.gradientStops[action.payload.id],
                        ...action.payload.values
                    }
                },
                activeGradientStop: action.payload.id
            }

        case SET_ACTIVE_GRADIENT_STOP:
            return { ...prevState, activeGradientStop: action.payload }

        case ADD_NEW_GRADIENT_STOP:
            return {
                ...prevState,
                gradientStops: {
                    ...prevState.gradientStops,
                    [action.payload.id]: action.payload
                }
            }

        case REMOVE_GRADIENT_STOP:
            if (Object.keys(prevState.gradientStops).length <= 2)
                return prevState

            const filteredArr = Object.values(prevState.gradientStops).filter(
                stop => stop.id !== action.payload
            )

            return {
                ...prevState,
                gradientStops: filteredArr.reduce(
                    (acc, curr) => ({ ...acc, [curr.id]: curr }),
                    {}
                ),
                activeGradientStop:
                    prevState.activeGradientStop === action.payload
                        ? filteredArr.sort(
                              (stop1, stop2) => stop1.percent - stop2.percent
                          )[0].id
                        : prevState.activeGradientStop
            }

        case CHANGE_GRADIENT_TYPE:
            return {
                ...prevState,
                gradient: {
                    ...prevState.gradient,
                    isLinear: action.payload ? false : true
                }
            }

        default:
            return prevState
    }
}
