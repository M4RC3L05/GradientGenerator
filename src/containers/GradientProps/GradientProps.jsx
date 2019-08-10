import React from 'react'
import { useGradientActions } from '../../context/GradientContext/GradientContext'
import { changeGradientType } from '../../context/GradientContext/actions'
import Switch from '../../components/Switch/Switch'
import styles from './GradientProps.module.css'

function GradientProps() {
    const gradientStateDispatch = useGradientActions()
    return (
        <div className={styles['GradientProps']}>
            <div className={styles['GradientProps__title']}>
                <h2>Linear</h2> <h2>Radial</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Switch
                    onChange={x => gradientStateDispatch(changeGradientType(x))}
                />
            </div>
        </div>
    )
}

export default GradientProps
