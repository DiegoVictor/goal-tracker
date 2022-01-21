import styled, { createGlobalStyle } from 'styled-components';

export const PreventScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

export const Container = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0px;
  position: fixed;
  top: 0px;
  width: 100%;

  @media (max-width: 440px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    display: block;
    padding: 10px;
    overflow-y: auto;
  }

  > div {
    border-radius: 8px;
    box-shadow: 0px 0px 5px 5px #1c1f33;

    @media (max-width: 480px) {
      width: 100%;
    }
  }
`;
