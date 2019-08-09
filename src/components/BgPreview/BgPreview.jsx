import React from "react"
import styles from "./BgPreview.module.css"

function BgPreview({ gradient }) {
    return (
        <div
            className={styles["bg-preview"]}
            style={{ background: gradient }}
        />
    )
}

export default BgPreview
