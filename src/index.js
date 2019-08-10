import React from 'react'
import ReactDOM from 'react-dom'

import './styles.css'
import * as sw from './serviceWorker'

import GradientProvider from './context/GradientContext/GradientContext'
import MessagesProvider from './context/MessagesContext/MessagesContext'
import App from './App/App'

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
