import React from 'react'
import ReactDOM from 'react-dom'
import styles from './BgPreview.module.css'

function BgPreview({ gradient }) {
    return (
        <div
            className={styles['bg-preview']}
            style={{ background: gradient }}
        />
    )
}

export default React.memo(
    BgPreview,
    (prevProps, nextProps) => prevProps.gradient === nextProps.gradient
)

const root = document.querySelector('#bg-preview')

export function BGPreviewPortal(props) {
    return ReactDOM.createPortal(props.children, root)
}
