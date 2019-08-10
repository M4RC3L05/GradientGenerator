import React from 'react'
import Slider from '../../components/Slider/Slider'
import {
    useGradientState,
    useGradientActions
} from '../../context/GradientContext/GradientContext'
import { stateToGradientCSS } from '../../utils/gradient'
import { hsvToRgb } from '../../utils/colors'
import {
    addNewGradientStop,
    setActiveGradientStop,
    updateGradientStop
} from '../../context/GradientContext/actions'

function GradientSlider() {
    const gradientState = useGradientState()
    const gradientStateDispatch = useGradientActions()

    const onAddNewGradientStop = x =>
        gradientStateDispatch(addNewGradientStop(null, x.percent))

    const onSetActiveGradientStop = x =>
        gradientStateDispatch(setActiveGradientStop(x.id))

    const onUpdateGradientStop = x => {
        gradientStateDispatch(
            updateGradientStop(x.id, {
                percent: x.percent
            })
        )
    }

    return (
        <Slider
            cursors={Object.values(gradientState.gradientStops)}
            css={{
                slider: {
                    background: `${stateToGradientCSS(gradientState, true)}`
                },
                cursor: Object.values(gradientState.gradientStops).reduce(
                    (acc, curr) => {
                        const rgb = hsvToRgb(
                            curr.color.h,
                            curr.color.s,
                            curr.color.v
                        )

                        return {
                            ...acc,
                            [curr.id]: {
                                background: `rgba(${rgb.r}, ${rgb.g}, ${
                                    rgb.b
                                }, ${curr.color.a})`
                            }
                        }
                    },
                    {}
                )
            }}
            onDoubleClick={onAddNewGradientStop}
            onCursor={onSetActiveGradientStop}
            onIndicatorChange={onUpdateGradientStop}
        />
    )
}

export default GradientSlider
