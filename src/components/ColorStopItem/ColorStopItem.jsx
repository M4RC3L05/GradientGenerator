import React from "react"
import styles from "./ColorStopItem.module.css"
import { rgbToHex, hsvToRgb } from "../../utils/colors"

function ColorStopItem({ color, at, onRemoveItem }) {
    return (
        <div className={styles["ColorStopItem__card"]}>
            <div
                className={styles["ColorStopItem__card__color"]}
                style={{ background: color }}
            />
            <div className={styles["ColorStopItem__card__info"]}>
                <div className={styles["ColorStopItem__card__info__hex"]}>
                    {color}
                </div>
                <div className={styles["ColorStopItem__card__info__at"]}>
                    {Number(at * 100).toFixed(2)}%
                </div>
            </div>
            <div
                className={styles["ColorStopItem__card__remove"]}
                onClick={onRemoveItem}
            >
                &times;
            </div>
        </div>
    )
}

export default ColorStopItem
