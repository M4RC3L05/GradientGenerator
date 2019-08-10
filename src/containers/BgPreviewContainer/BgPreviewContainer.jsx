import React from 'react'
import BgPreview, {
    BGPreviewPortal
} from '../../components/BgPreview/BgPreview'
import { stateToGradientCSS } from '../../utils/gradient'
import { useGradientState } from '../../context/GradientContext/GradientContext'

function BgPreviewContainer() {
    const gradientState = useGradientState()
    return (
        <BGPreviewPortal>
            <BgPreview gradient={`${stateToGradientCSS(gradientState)}`} />
        </BGPreviewPortal>
    )
}

export default BgPreviewContainer
