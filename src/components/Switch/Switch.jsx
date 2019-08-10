import React, { useState, useEffect } from 'react'
import styles from './Switch.module.css'

function Switch({ on = false, onChange }) {
    const [state, setState] = useState({ on: on || false, isFromOutside: true })

    useEffect(() => {
        if (state.isFromOutside) return
        if (onChange) onChange(state.on)
    }, [state.on, onChange, state.isFromOutside])

    return (
        <div className={styles['Switch__wrapper']}>
            <div className={styles['Switch__bg']} />
            <div
                className={`${styles['Switch__indicator']} ${
                    state.on
                        ? styles['Switch__indicator--on']
                        : styles['Switch__indicator--off']
                }`}
                onClick={() =>
                    setState(ps => ({
                        ...ps,
                        isFromOutside: false,
                        on: !ps.on
                    }))
                }
            />
        </div>
    )
}

export default React.memo(
    Switch,
    (prevProps, nextProps) => prevProps.on === nextProps.on
)
