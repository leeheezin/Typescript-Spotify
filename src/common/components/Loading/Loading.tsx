import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import React from 'react'
import styled from 'styled-components'

const LoadingWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000; 
    background-color: rgba(255, 255, 255, 0.8); 
    border-radius: 8px;  
    padding: 20px;
    width: 10vw;
    height: 10vw;
    max-width: 150px; 
    max-height: 150px; 
    box-sizing: border-box;
`
function Loading() {
    return (
        <DotLottieReact
        src="https://lottie.host/df433975-e95e-49c7-8ff3-983255d26a89/opjCTC9m58.lottie"
        loop
        autoplay
        />
    )
}

export default Loading