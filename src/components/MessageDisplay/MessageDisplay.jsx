import React, { useState, useEffect } from 'react'
import styles from './MessageDisplay.module.css'

function MessageDisplay({ text, show, autoClose, onClose }) {
    const [state, setState] = useState({ show: !!show, isFromOutside: true })

    useEffect(() => {
        if (!autoClose) return

        const timeout = setTimeout(() => {
            console.log('from timeout')
            setState(ps => ({ show: false, isFromOutside: false }))
        }, 5000)

        return () => {
            if (timeout) clearTimeout(timeout)
        }
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
                onClick={() =>
                    setState(ps => ({ show: false, isFromOutside: false }))
                }
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
