import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
import styled from 'styled-components'

const LoadingWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;  
    padding: 20px;
    width: 15vw;
    height: 15vw;
    max-width: 200px; 
    max-height: 200px; 
    box-sizing: border-box;
`
function Loading() {
    return (
        <LoadingWrap>
            <DotLottieReact
            src="https://lottie.host/df433975-e95e-49c7-8ff3-983255d26a89/opjCTC9m58.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
            />
        </LoadingWrap>
    )
}

export default Loading