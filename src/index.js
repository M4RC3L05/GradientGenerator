import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import GradientGen from './containers/GradientGen/GradientGen'
import GradientProvider from './context/GradientContext/GradientContext'

import * as sw from './serviceWorker'
import { MessagesProvider } from './context/MessagesContext/MessagesContext'

function App() {
    return <GradientGen />
}

const rootElement = document.getElementById('root')
ReactDOM.render(
    <GradientProvider>
        <MessagesProvider>
            <App />
        </MessagesProvider>
    </GradientProvider>,
    rootElement
)

sw.register()
