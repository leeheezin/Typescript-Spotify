import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';
import styled from 'styled-components';

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; /* 절대 위치 */
  left: 50%;
  transform: translate(-50%, -70%);  /* 가운데 정렬 */
  padding: 20px;
  z-index: 1000;  /* 다른 요소 위에 표시 */
`;

const Loading = () => {
  return (
    <LoadingWrap>
      <DotLottieReact
        src="https://lottie.host/df433975-e95e-49c7-8ff3-983255d26a89/opjCTC9m58.lottie"
        loop
        autoplay
        style={{ width: "100px", height: "100px" }}  // 적당한 크기 설정
      />
    </LoadingWrap>
  );
};

export default Loading;
