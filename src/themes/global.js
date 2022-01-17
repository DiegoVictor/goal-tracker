import { createGlobalStyle } from 'styled-components';

export const Style = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background-color: #1c1d25;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    margin: 0px
  }

  h3 {
    font-size: 48px;
    font-weight: 900;
    margin: 0px;
  }

  input {
    background-color: #0b0c14;
    color: #3b3c45;
    font-size: 17px;
    font-weight: 700;
    height: 60px;
    padding: 10px 56px 10px 20px;
  }

  button {
    border-radius: 8px;
    height: 100%;
    padding-right: 10px;
    width: 56px;
  }
`;
