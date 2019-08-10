import React from 'react'
import {
    useMessagesContextState,
    useMessagesContextDispatch
} from '../../context/MessagesContext/MessagesContext'
import MessagesPortal from '../../components/MessagesPortal'
import MessageDisplay from '../../components/MessageDisplay/MessageDisplay'
import { removeMessage } from '../../context/MessagesContext/actions'

function MessagesContainer() {
    const msgs = useMessagesContextState()
    const dispatch = useMessagesContextDispatch()

    return (
        <MessagesPortal>
            {Object.values(msgs).map(msg => (
                <MessageDisplay
                    key={msg.id}
                    text={'Copied to the clipboard'}
                    show={true}
                    autoClose={true}
                    onClose={() => dispatch(removeMessage(msg.id))}
                />
            ))}
        </MessagesPortal>
    )
}

export default MessagesContainer
