import { hsvToRgb } from "./colors"

export function stateToGradientCSS(state, forceLinear = false) {
    const isLinear = forceLinear ? forceLinear : state.gradient.isLinear
    const isDirectional = !!state.gradient.direction

    return `${isLinear ? "linear-gradient" : "radial-gradient"}(${
        isLinear
            ? isDirectional
                ? state.gradient.direction
                : `${state.gradient.angle}deg`
            : "circle"
    }, ${Object.entries(state.gradientStops)
        .sort(([id1, stop1], [id2, stop2]) => stop1.percent - stop2.percent)
        .map(([id, stop]) => {
            const rgb = hsvToRgb(stop.color.h, stop.color.s, stop.color.v)

            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${
                stop.color.a
            }) ${stop.percent * 100}%`
        })
        .join(",")})`
}
