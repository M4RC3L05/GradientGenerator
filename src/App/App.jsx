import React from 'react'
import styles from './App.module.css'
import BgPreviewContainer from '../containers/BgPreviewContainer/BgPreviewContainer'
import MessagesContainer from '../containers/MessagesContainer/MessagesContainer'
import GradientSlider from '../containers/GradientSlider/GradientSlider'
import ColorPickerContainer from '../containers/ColorPickerContainer/ColorPickerContainer'
import GradientStops from '../containers/GradientStops/GradientStops'
import GradientProps from '../containers/GradientProps/GradientProps'
import CSSRuleToClipBoard from '../containers/CSSRuleToClipBoard/CSSRuleToClipBoard'

function App() {
    return (
        <div className={styles['GradientGen']}>
            <BgPreviewContainer />
            <MessagesContainer />
            <div className={styles['GradientGen__GradientSlider']}>
                <GradientSlider />
            </div>
            <div className={styles['GradientGen__others']}>
                <ColorPickerContainer />
                <GradientStops />
                <GradientProps />
            </div>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <CSSRuleToClipBoard />
            </div>
        </div>
    )
}

export default App
