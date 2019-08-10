import React from 'react'
import {
    useGradientActions,
    useGradientState
} from '../../context/GradientContext/GradientContext'
import { changeGradientType } from '../../context/GradientContext/actions'
import Switch from '../../components/Switch/Switch'
import styles from './GradientProps.module.css'
import LinearPropsFormContainer from '../LinearPropsFormContainer/LinearPropsFormContainer'

function GradientProps() {
    const gradientState = useGradientState()
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
            {gradientState.gradient.isLinear && (
                <LinearPropsFormContainer
                    dispatch={gradientStateDispatch}
                    direction={gradientState.gradient.direction}
                    angle={gradientState.gradient.angle}
                />
            )}
        </div>
    )
}

export default GradientProps
