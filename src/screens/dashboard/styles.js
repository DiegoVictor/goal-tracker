import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  margin: auto;
  min-width: 400px;
  max-width: 900px;
  padding: 50px 20px;
  width: 100%;

  @media (max-width: 440px) {
    min-width: auto;
    padding: 30px 15px;
  }
`;

export const PreventScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;
