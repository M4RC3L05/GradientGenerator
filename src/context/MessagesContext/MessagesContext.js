import React from 'react'
import reducer from './reducer'

const MessagesContextState = React.createContext({})
const MessagesContextDispatch = React.createContext(x => {})

export function useMessagesContextState() {
    const ctx = React.useContext(MessagesContextState)

    if (!ctx)
        throw Error('useMessagesContextState must be inside a MessagesProvider')

    return ctx
}

export function useMessagesContextDispatch() {
    const ctx = React.useContext(MessagesContextDispatch)

    if (!ctx)
        throw Error(
            'useMessagesContextDispatch must be inside a MessagesProvider'
        )

    return ctx
}

export function MessagesProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, {})

    return (
        <MessagesContextState.Provider value={state}>
            <MessagesContextDispatch.Provider value={dispatch}>
                {props.children}
            </MessagesContextDispatch.Provider>
        </MessagesContextState.Provider>
    )
}
