import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import styles from './CSSRuleDisplay.module.css'

function CSSRuleDisplay({ rule }) {
    return (
        <div className={styles['CSSRuleDisplay']}>
            <CopyToClipboard text={rule} onCopy={() => console.log('copied')}>
                <div className={styles['CSSRuleDisplay__rule']}>{rule}</div>
            </CopyToClipboard>
        </div>
    )
}

export default CSSRuleDisplay
