import React from 'react'

import styles from './CSSRuleDisplay.module.css'

function CSSRuleDisplay({ rule, onClick }) {
    return (
        <div className={styles['CSSRuleDisplay']} onClick={onClick}>
            <div className={styles['CSSRuleDisplay__rule']}>{rule}</div>
        </div>
    )
}

export default CSSRuleDisplay
