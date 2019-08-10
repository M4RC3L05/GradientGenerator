import React from 'react'
import {
    useGradientState,
    useGradientActions
} from '../../context/GradientContext/GradientContext'
import { updateGradientStop } from '../../context/GradientContext/actions'
import ColorPicker from '../../components/ColorPicker/ColorPicker'

function ColorPickerContainer() {
    const gradientState = useGradientState()
    const gradientStateDispatch = useGradientActions()

    const onUpdateGradientStopColor = color =>
        gradientStateDispatch(
            updateGradientStop(gradientState.activeGradientStop, { color })
        )

    return (
        <ColorPicker
            color={
                gradientState.gradientStops[gradientState.activeGradientStop]
                    .color
            }
            onColorChange={onUpdateGradientStopColor}
        />
    )
}

export default ColorPickerContainer
