import React, { useState, useEffect, useRef } from 'react'
import styles from './MessageDisplay.module.css'

function MessageDisplay({ text, show, autoClose, onClose }) {
    const [state, setState] = useState({ show: !!show, isFromOutside: true })
    const timeout = useRef()
    useEffect(() => {
        if (!autoClose) return

        timeout.current = setTimeout(
            () => setState(ps => ({ show: false, isFromOutside: false })),
            5000
        )
    }, [])

    useEffect(() => {
        if (onClose && !state.isFromOutside && !state.show)
            setTimeout(onClose, 200)
    }, [state.isFromOutside, state.show, onClose])

    return (
        <div
            className={`${styles['MessageDisplay']} ${
                state.show
                    ? styles['MessageDisplay--show']
                    : styles['MessageDisplay--hide']
            }`}
        >
            <div className={styles['MessageDisplay__text']}>{text}</div>
            <div
                className={styles['MessageDisplay__dismiss']}
                onClick={() => {
                    if (timeout.current) clearTimeout(timeout.current)
                    setState(ps => ({ show: false, isFromOutside: false }))
                }}
            >
                &times;
            </div>
        </div>
    )
}

export default React.memo(
    MessageDisplay,
    (prevProps, nextProps) =>
        prevProps.show === nextProps.show && prevProps.text === nextProps.text
)
