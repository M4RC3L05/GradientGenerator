import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { stateToGradientCSS } from '../../utils/gradient'
import { useMessagesContextDispatch } from '../../context/MessagesContext/MessagesContext'
import { addMessage } from '../../context/MessagesContext/actions'
import CSSRuleDisplay from '../../components/CSSRuleDisplay/CSSRuleDisplay'
import { useGradientState } from '../../context/GradientContext/GradientContext'

function CSSRuleToClipBoard() {
    const messagesDispatch = useMessagesContextDispatch()
    const gradientState = useGradientState()
    return (
        <CopyToClipboard
            text={stateToGradientCSS(gradientState)}
            onCopy={() =>
                messagesDispatch(addMessage('Copied to the clipboad!'))
            }
        >
            <CSSRuleDisplay rule={stateToGradientCSS(gradientState)} />
        </CopyToClipboard>
    )
}

export default CSSRuleToClipBoard
