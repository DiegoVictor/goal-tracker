import styled from 'styled-components';

export const Container = styled.div`
  min-width: 450px;

  @media (max-width: 480px) {
    min-width: auto;
    width: 100%;
  }

  form {
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    color: #333;

    > div {
      margin-bottom: 10px;
    }
  }

  input,
  textarea {
    background-color: #fff;
    border: 0px;
    border: 1px solid #eee;
    border-radius: 8px;
    color: #444;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 400;
    padding: 25px 15px 10px 45px;
    width: 100%;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  text-align: center;

  button {
    align-items: center;
    border: 0px;
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: auto 5px;
    padding: 10px;
    width: 40px;
  }
`;
