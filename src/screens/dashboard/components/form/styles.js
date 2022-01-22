import styled from 'styled-components';

export const Container = styled.div`
  min-width: 450px;
  form {
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 8px;
    color: #333;

    > div {
      margin-bottom: 10px;
    }
  }
`;

export const Done = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;

  > div {
    margin-top: 2px;
  }

  span {
    margin-left: 10px;
  }
`;
