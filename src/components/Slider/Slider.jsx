import React, { useEffect, useRef, useState } from 'react'

import styles from './Slider.module.css'

function Slider({
    cursors = [],
    onIndicatorChange,
    css = { slider: {}, cursor: {} },
    onCursor,
    onDoubleClick
}) {
    const [state, setState] = useState({
        canSlide: false,
        isFromOutside: true,
        cursors: cursors.reduce(
            (acc, curr) => ({ ...acc, [curr.id]: curr }),
            {}
        ),
        activeIndicator: null
    })

    const sliderRef = useRef()

    useEffect(() => {
        function onMouseMove(e) {
            if (!state.canSlide || !state.activeIndicator) return

            const rect = sliderRef.current.getBoundingClientRect()
            let x = e.clientX - rect.left
            if (x >= rect.width) x = rect.width
            if (x < 0) x = 0

            if (state.cursors[state.activeIndicator].percent === x / rect.width)
                return

            setState(ps => ({
                ...ps,
                cursors: {
                    ...ps.cursors,
                    [ps.activeIndicator]: {
                        ...ps.cursors[ps.activeIndicator],
                        percent: x / rect.width
                    }
                },
                isFromOutside: false
            }))
        }

        function onMouseUp() {
            setState(ps => ({ ...ps, canSlide: false, activeIndicator: null }))
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    })

    useEffect(() => {
        setState(ps => ({
            ...ps,
            cursors: cursors.reduce(
                (acc, curr) => ({ ...acc, [curr.id]: curr }),
                {}
            ),
            isFromOutside: true
        }))
    }, [cursors])

    useEffect(() => {
        if (!state.activeIndicator || !onIndicatorChange || state.isFromOutside)
            return
        onIndicatorChange({ ...state.cursors[state.activeIndicator] })
    }, [
        state.cursors,
        state.activeIndicator,
        state.isFromOutside,
        onIndicatorChange
    ])

    return (
        <div className={styles['Slider__wrapper']}>
            <div
                className={styles['Slider__slider']}
                ref={sliderRef}
                style={css.slider || {}}
                onDoubleClick={e => {
                    const rect = sliderRef.current.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    onDoubleClick({ x, percent: x / rect.width })
                }}
            />
            {Object.entries(state.cursors).map(([id, cursor]) => (
                <div
                    key={id}
                    className={`${styles['Slider__slider__cursor']} 
                    ${state.activeIndicator === id &&
                        styles['Slider__slider__cursor--active']}`}
                    onMouseDown={() => {
                        setState(ps => ({
                            ...ps,
                            canSlide: true,
                            activeIndicator: id
                        }))
                        if (onCursor) onCursor(state.cursors[id])
                    }}
                    style={{
                        left: `${cursor.percent * 100}%`,
                        ...((css.cursor && css.cursor[id]) || {})
                    }}
                />
            ))}
        </div>
    )
}

export default React.memo(
    Slider,
    (prevProps, nextProps) =>
        prevProps.cursors === nextProps.cursors &&
        prevProps.onCursor === nextProps.onCursor &&
        prevProps.onDoubleClick === nextProps.onDoubleClick &&
        prevProps.onIndicatorChange === nextProps.onIndicatorChange &&
        prevProps.css === nextProps.css
)
