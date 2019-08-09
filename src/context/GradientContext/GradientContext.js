import uuid from "uuid/v4"
import React from "react"
import reducer from "./reducer"

const id1 = uuid()
const id2 = uuid()

const INIT_STATE = {
    gradient: {
        isLinear: true,
        direction: "to right",
        angle: null
    },
    gradientStops: {
        [id1]: {
            id: id1,
            color: { h: 0, s: 1, v: 1, a: 1 },
            percent: 0
        },
        [id2]: {
            id: id2,
            color: { h: 0.4, s: 1, v: 1, a: 1 },
            percent: 1
        }
    },
    activeGradientStop: id1
}

const GradientStateContext = React.createContext(INIT_STATE)
const GradientActionsContext = React.createContext({})

export function useGradientState() {
    const context = React.useContext(GradientStateContext)

    if (!context)
        throw Error(`Must call useGradientState inside a GradientProvider`)

    return context
}

export function useGradientActions() {
    const dispatch = React.useContext(GradientActionsContext)

    if (!dispatch)
        throw Error(`Must call useGradientActions inside a GradientProvider`)

    return dispatch
}

export default function GradientProvider({ state, children }) {
    const [gradientState, dispatch] = React.useReducer(
        reducer,
        state || INIT_STATE
    )

    return (
        <GradientStateContext.Provider value={gradientState}>
            <GradientActionsContext.Provider value={dispatch}>
                {children}
            </GradientActionsContext.Provider>
        </GradientStateContext.Provider>
    )
}
