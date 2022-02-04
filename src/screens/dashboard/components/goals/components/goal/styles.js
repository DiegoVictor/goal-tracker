import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(
    49deg,
    rgba(11, 12, 20, 1) 0%,
    rgba(43, 44, 51, 1) 100%
  );
  border-radius: 8px;
  box-shadow: 0px 0px 3px #000;
  font-size: 18px;
  width: 350px;
  margin-bottom: 20px;
  padding: 15px;

  ${(props) =>
    props.done &&
    css`
      background: linear-gradient(
        49deg,
        rgba(0, 205, 105, 1) 0%,
        rgba(64, 213, 141, 1) 100%
      );
      color: #fff;
    `}

  button {
    align-items: center;
    background-color: transparent;
    border: 0px;
    color: #fff;
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    padding: 5px;
    width: 30px;
  }

  h4 {
    font-weight: 700;
    margin: 0px;
  }
`;

export const Description = styled.div`
  font-size: 14px;
  margin-top: 3px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  > button:first-child {
    margin-left: -5px;
  }

  > div {
    align-items: center;
    display: flex;

    button {
      margin-left: 5px;
    }
  }
`;

export const Tasks = styled.div`
  margin-top: ${(props) => (props.open ? '15px' : '5px')};

  > div {
    display: ${(props) => (props.open ? 'block' : 'flex')};
  }
`;

export const Button = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 20px;
  justify-content: center;
  margin-left: 3px;
  margin-top: 3px;
  width: 20px;

  ${(props) =>
    props.open &&
    css`
      margin-left: -1px;
      transform: rotate(180deg);
    `}
`;
