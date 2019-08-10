import React from 'react'
import GradientStopList from '../../components/GradientStopList/GradientStopList'
import {
    useGradientState,
    useGradientActions
} from '../../context/GradientContext/GradientContext'
import { removeGradientStop } from '../../context/GradientContext/actions'

function GradientStops() {
    const gradientState = useGradientState()
    const gradientStateDispatch = useGradientActions()

    const onRemoveGradientStop = x =>
        gradientStateDispatch(removeGradientStop(x.id))

    return (
        <GradientStopList
            stops={gradientState.gradientStops}
            onRemoveItem={onRemoveGradientStop}
        />
    )
}

export default GradientStops
