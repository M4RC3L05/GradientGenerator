import React from 'react'
import {
    changeGradientDirection,
    chnageGradientAngle
} from '../../context/GradientContext/actions'
import styles from './LinearPropsFormContainer.module.css'

function LinearPropsFormContainer({ dispatch, direction, angle }) {
    return (
        <div className={styles['LinearForm']}>
            <select
                onChange={e =>
                    dispatch(changeGradientDirection(e.target.value))
                }
                className={styles['LinearForm__direction']}
                name="gradient-direction"
                id="gradient-direction"
                value={direction || 'to right'}
            >
                <option value="to right">to right</option>
                <option value="to bottom">to bottom</option>
                <option value="to left">to left</option>
                <option value="to top">to top</option>
            </select>
            <input
                className={styles['LinearForm__angle']}
                type="number"
                value={angle || 0}
                onChange={e => dispatch(chnageGradientAngle(e.target.value))}
            />
        </div>
    )
}

export default LinearPropsFormContainer
