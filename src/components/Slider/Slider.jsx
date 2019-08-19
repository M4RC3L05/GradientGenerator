import React, { useEffect, useRef, useState } from "react"

import styles from "./Slider.module.css"

let __MYLASTTAP = 0

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
            e.preventDefault()
            if (!state.canSlide || !state.activeIndicator) return

            const rect = sliderRef.current.getBoundingClientRect()
            let x =
                e instanceof TouchEvent
                    ? e.changedTouches[0].clientX - rect.left
                    : e.clientX - rect.left
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

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("touchmove", onMouseMove, { passive: false })
        window.addEventListener("mouseup", onMouseUp)
        window.addEventListener("touchend", onMouseUp)

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("touchmove", onMouseMove, {
                passive: false
            })
            window.removeEventListener("mouseup", onMouseUp)
            window.removeEventListener("touchend", onMouseUp)
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
        <div className={styles["Slider__wrapper"]}>
            <div
                className={styles["Slider__slider"]}
                ref={sliderRef}
                style={css.slider || {}}
                onTouchStart={e => {
                    const now = new Date().getTime()
                    const timesince = now - __MYLASTTAP
                    if (timesince < 600 && timesince > 0) {
                        const rect = sliderRef.current.getBoundingClientRect()
                        const x = e.touches[0].clientX - rect.left
                        onDoubleClick({ x, percent: x / rect.width })
                    } else {
                        console.log("no double")
                    }

                    __MYLASTTAP = new Date().getTime()
                }}
                onDoubleClick={e => {
                    const rect = sliderRef.current.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    onDoubleClick({ x, percent: x / rect.width })
                }}
            />
            {Object.entries(state.cursors).map(([id, cursor]) => (
                <div
                    key={id}
                    className={`${styles["Slider__slider__cursor"]}
                    ${state.activeIndicator === id &&
                        styles["Slider__slider__cursor--active"]}`}
                    onMouseDown={() => {
                        setState(ps => ({
                            ...ps,
                            canSlide: true,
                            activeIndicator: id
                        }))
                        if (onCursor) onCursor(state.cursors[id])
                    }}
                    onTouchStart={() => {
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
