import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styles from './GradientGen.module.css'
import ColorPicker from '../ColorPicker/ColorPicker'
import Slider from '../../components/Slider/Slider'
import {
    useGradientState,
    useGradientActions
} from '../../context/GradientContext/GradientContext'
import { stateToGradientCSS } from '../../utils/gradient'
import { hsvToRgb } from '../../utils/colors'
import GradientStopList from '../../components/GradientStopList/GradientStopList'
import {
    addNewGradientStop,
    updateGradientStop,
    setActiveGradientStop,
    removeGradientStop,
    changeGradientType
} from '../../context/GradientContext/actions'
import Switch from '../../components/Switch/Switch'
import CSSRuleDisplay from '../../components/CSSRuleDisplay/CSSRuleDisplay'

import BgPreview, {
    BGPreviewPortal
} from '../../components/BgPreview/BgPreview'
import { useMessagesContextDispatch } from '../../context/MessagesContext/MessagesContext'
import { addMessage } from '../../context/MessagesContext/actions'
import MessagesContainer from '../MessagesContainer/MessagesContainer'

function GradientGen() {
    const gradientState = useGradientState()
    const gradientStateDispatch = useGradientActions()
    const messagesDispatch = useMessagesContextDispatch()

    const onAddNewGradientStop = React.useCallback(
        x => gradientStateDispatch(addNewGradientStop(null, x.percent)),
        [gradientStateDispatch]
    )

    const onSetActiveGradientStop = React.useCallback(
        x => gradientStateDispatch(setActiveGradientStop(x.id)),
        [gradientStateDispatch]
    )

    const onUpdateGradientStop = React.useCallback(
        x => {
            gradientStateDispatch(
                updateGradientStop(x.id, {
                    percent: x.percent
                })
            )
        },
        [gradientStateDispatch]
    )

    const onUpdateGradientStopColor = React.useCallback(
        color =>
            gradientStateDispatch(
                updateGradientStop(gradientState.activeGradientStop, { color })
            ),
        [gradientStateDispatch, gradientState.activeGradientStop]
    )

    const onRemoveGradientStop = React.useCallback(
        x => gradientStateDispatch(removeGradientStop(x.id)),
        [gradientStateDispatch]
    )

    return (
        <div className={styles['GradientGen']}>
            <BGPreviewPortal>
                <BgPreview gradient={`${stateToGradientCSS(gradientState)}`} />
            </BGPreviewPortal>
            <MessagesContainer />
            <div className={styles['GradientGen__GradientSlider']}>
                <Slider
                    cursors={Object.values(gradientState.gradientStops)}
                    css={{
                        slider: {
                            background: `${stateToGradientCSS(
                                gradientState,
                                true
                            )}`
                        },
                        cursor: Object.values(
                            gradientState.gradientStops
                        ).reduce((acc, curr) => {
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
                        }, {})
                    }}
                    onDoubleClick={onAddNewGradientStop}
                    onCursor={onSetActiveGradientStop}
                    onIndicatorChange={onUpdateGradientStop}
                />
            </div>
            <div className={styles['GradientGen__others']}>
                <ColorPicker
                    color={
                        gradientState.gradientStops[
                            gradientState.activeGradientStop
                        ].color
                    }
                    onColorChange={onUpdateGradientStopColor}
                />
                <GradientStopList
                    stops={gradientState.gradientStops}
                    onRemoveItem={onRemoveGradientStop}
                />
                <div className={styles['GradientGen__others__props']}>
                    <div
                        className={styles['GradientGen__others__props__title']}
                    >
                        <h2>Linear</h2> <h2>Radial</h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Switch
                            onChange={x =>
                                gradientStateDispatch(changeGradientType(x))
                            }
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <CopyToClipboard
                    text={stateToGradientCSS(gradientState)}
                    onCopy={() =>
                        messagesDispatch(addMessage('Copied to the clipboad!'))
                    }
                >
                    <CSSRuleDisplay rule={stateToGradientCSS(gradientState)} />
                </CopyToClipboard>
            </div>
        </div>
    )
}

export default GradientGen
