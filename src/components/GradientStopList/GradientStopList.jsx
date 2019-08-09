import React from "react"

import styles from "./GradientStopList.module.css"
import { hsvToRgb, rgbToHex } from "../../utils/colors"
import ColorStopItem from "../ColorStopItem/ColorStopItem"

function GradientStopList({ stops, onRemoveItem }) {
    return (
        <div className={styles["GradientStopList__wrapper"]}>
            {Object.values(stops)
                .sort((stop1, stop2) => stop1.percent - stop2.percent)
                .map(stop => {
                    const rgb = hsvToRgb(
                        stop.color.h,
                        stop.color.s,
                        stop.color.v
                    )
                    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
                    return (
                        <ColorStopItem
                            key={stop.id}
                            color={hex}
                            at={stop.percent}
                            onRemoveItem={() => onRemoveItem(stop)}
                        />
                    )
                })}
        </div>
    )
}

export default GradientStopList
