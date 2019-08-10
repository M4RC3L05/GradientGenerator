import React, { useState, useEffect, useCallback } from 'react'
import styles from './ColorPicker.module.css'
import SVColorDisplay from '../SVColorDisplay/SVColorDisplay'
import Slider from '../Slider/Slider'

function ColorPicker({ color, onColorChange }) {
    const [state, setState] = useState({
        isFromOutside: !!color,
        finalColor: color || { h: 0, s: 1, v: 1, a: 1 }
    })

    const onSVChange = useCallback(
        ({ s, v }) =>
            setState(ps => ({
                ...ps,
                finalColor: { ...ps.finalColor, s, v },
                isFromOutside: false
            })),
        []
    )

    const onHueChange = useCallback(
        x =>
            setState(ps => ({
                ...ps,
                finalColor: { ...ps.finalColor, h: x.percent },
                isFromOutside: false
            })),
        []
    )

    const onAlphaChnage = useCallback(
        x =>
            setState(ps => ({
                ...ps,
                finalColor: { ...ps.finalColor, a: x.percent },
                isFromOutside: false
            })),
        []
    )

    useEffect(() => {
        if (state.isFromOutside) return
        if (onColorChange) onColorChange(state.finalColor)
    }, [state.finalColor, state.isFromOutside, onColorChange])

    useEffect(() => {
        if (color)
            setState(ps => ({ ...ps, finalColor: color, isFromOutside: true }))
    }, [color])

    return (
        <div className={styles['ColorPicker__wrapper']}>
            <SVColorDisplay color={state.finalColor} onSVChange={onSVChange} />
            <div className={styles['ColorPicker__controls']}>
                <Slider
                    cursors={[
                        {
                            id: 'hue-cursor',
                            percent: state.finalColor.h
                        }
                    ]}
                    css={{
                        slider: {
                            background:
                                'linear-gradient(to left, red 0px, rgb(255, 0, 153) 10%, rgb(205, 0, 255) 20%, rgb(50, 0, 255) 30%, rgb(0, 102, 255) 40%, rgb(0, 255, 253) 50%, rgb(0, 255, 102) 60%, rgb(53, 255, 0) 70%, rgb(205, 255, 0) 80%, rgb(255, 153, 0) 90%, red 100%)'
                        },
                        cursor: {
                            'hue-cursor': {
                                width: '16px',
                                height: '16px',
                                background: 'white',
                                border: '1px solid #D8D8D8',
                                marginTop: 'calc(-3px)'
                            }
                        }
                    }}
                    onIndicatorChange={onHueChange}
                />
                <Slider
                    cursors={[
                        {
                            id: 'alpha-cursor',
                            percent: state.finalColor.a
                        }
                    ]}
                    css={{
                        slider: {
                            background:
                                "linear-gradient(to left, white 0%, transparent 100%),url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg=='), #000"
                        },
                        cursor: {
                            'alpha-cursor': {
                                width: '16px',
                                height: '16px',
                                background: 'white',
                                border: '1px solid #D8D8D8',
                                marginTop: 'calc(-3px)'
                            }
                        }
                    }}
                    onIndicatorChange={onAlphaChnage}
                />
            </div>
        </div>
    )
}

export default ColorPicker
