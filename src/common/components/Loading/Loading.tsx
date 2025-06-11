import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';
import styled from 'styled-components';

// 로딩 애니메이션을 테이블 하단 가운데에 배치
const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; /* 테이블의 relative 영역을 기준으로 위치 설정 */
  top: 50%;  /* 하단에 20px 떨어지게 위치 */
  left: 50%;     /* 가로 중앙 정렬 */
  transform: translateX(-50%); /* 정확히 가로 중앙 정렬 */
  padding: 20px;
  z-index: 10000;  /* 다른 요소 위에 표시 */
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
