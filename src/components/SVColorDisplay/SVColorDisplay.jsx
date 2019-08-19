import React, { useState, useEffect, useRef } from "react"
import styles from "./SVColorDisplay.module.css"
import { hsvToRgb } from "../../utils/colors"

function SVColorDisplay({ color, onSVChange }) {
    const [state, setState] = useState({
        cursorValues: { s: color.s, v: color.v },
        canMove: false,
        isFromOutside: false,
        preventDefault: false
    })

    const displayRef = useRef()

    useEffect(() => {
        function onMouseMove(e) {
            if (state.preventDefault) e.preventDefault()
            if (!state.canMove) return

            const rect = displayRef.current.getBoundingClientRect()
            let x = e.clientX - rect.left
            let y = e.clientY - rect.top
            if (x >= rect.width) x = rect.width
            if (x < 0) x = 0
            if (y < 0) y = 0
            if (y >= rect.height) y = rect.height

            const s = x / rect.width
            const v = 1 - y / rect.height

            if (s === state.cursorValues.s && v === state.cursorValues.v) return

            setState(ps => ({
                ...ps,
                cursorValues: { s, v },
                isFromOutside: false
            }))
        }

        function onMouseMoveMobile(e) {
            if (state.preventDefault) e.preventDefault()
            if (!state.canMove) return

            const rect = displayRef.current.getBoundingClientRect()
            let x = e.changedTouches[0].clientX - rect.left
            let y = e.changedTouches[0].clientY - rect.top
            if (x >= rect.width) x = rect.width
            if (x < 0) x = 0
            if (y < 0) y = 0
            if (y >= rect.height) y = rect.height

            const s = x / rect.width
            const v = 1 - y / rect.height

            if (s === state.cursorValues.s && v === state.cursorValues.v) return

            setState(ps => ({
                ...ps,
                cursorValues: { s, v },
                isFromOutside: false
            }))
        }

        function onMouseUp() {
            setState(ps => ({ ...ps, canMove: false, preventDefault: false }))
        }

        window.addEventListener("mousemove", onMouseMove)
        window.addEventListener("touchmove", onMouseMoveMobile, {
            passive: false
        })
        window.addEventListener("mouseup", onMouseUp)
        window.addEventListener("touchend", onMouseUp)

        return () => {
            window.removeEventListener("mousemove", onMouseMove)
            window.removeEventListener("touchmove", onMouseMoveMobile, {
                passive: false
            })
            window.removeEventListener("mouseup", onMouseUp)
            window.removeEventListener("touchend", onMouseUp)
        }
    })

    useEffect(() => {
        if (onSVChange && !state.isFromOutside) onSVChange(state.cursorValues)
    }, [onSVChange, state.cursorValues, state.isFromOutside])

    useEffect(() => {
        setState(ps => ({
            ...ps,
            cursorValues: { s: color.s, v: color.v },
            isFromOutside: true
        }))
    }, [color])

    const rgb = hsvToRgb(color.h, 1, 1)
    const rgb2 = hsvToRgb(color.h, state.cursorValues.s, state.cursorValues.v)

    return (
        <div className={styles["SVColorDisplay__wrapper"]}>
            <div
                className={styles["SVColorDisplay__sb-display"]}
                style={{ background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
                ref={displayRef}
            />
            <div className={styles["SVColorDisplay__sb-display__overlay"]} />
            <div className={styles["SVColorDisplay__sb-display__overlay2"]} />
            <div
                className={styles["SVColorDisplay__cursor"]}
                onMouseDown={() =>
                    setState(ps => ({
                        ...ps,
                        canMove: true,
                        preventDefault: true
                    }))
                }
                onTouchStart={() =>
                    setState(ps => ({
                        ...ps,
                        canMove: true,
                        preventDefault: true
                    }))
                }
                style={{
                    background: `rgba(${rgb2.r}, ${rgb2.g}, ${rgb2.b}, ${
                        color.a
                    })`,
                    left: `${state.cursorValues.s * 100}%`,
                    top: `${(1 - state.cursorValues.v) * 100}%`
                }}
            />
        </div>
    )
}

export default SVColorDisplay
