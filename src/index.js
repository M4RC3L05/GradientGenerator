import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import GradientGen from './containers/GradientGen/GradientGen'
import GradientProvider from './context/GradientContext/GradientContext'

import * as sw from './serviceWorker'

function App() {
    return <GradientGen />
}

const rootElement = document.getElementById('root')
ReactDOM.render(
    <GradientProvider>
        <App />
    </GradientProvider>,
    rootElement
)

sw.register()
