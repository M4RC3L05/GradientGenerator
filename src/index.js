import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import BgPreview from './components/BgPreview/BgPreview'
import GradientGen from './containers/GradientGen/GradientGen'
import GradientProvider, {
    useGradientState
} from './context/GradientContext/GradientContext'
import { stateToGradientCSS } from './utils/gradient'
import * as sw from './serviceWorker'

function App() {
    const gradientState = useGradientState()

    return (
        <>
            <BgPreview gradient={`${stateToGradientCSS(gradientState)}`} />
            <GradientGen />
        </>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.render(
    <GradientProvider>
        <App />
    </GradientProvider>,
    rootElement
)

sw.register()
