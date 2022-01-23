import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: ${(props) => (props.open ? '15px' : '5px')};

  > div {
    display: ${(props) => (props.open ? 'block' : 'flex')};
  }
`;

export const Task = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  margin: 3px 0px 0px 1px;

  span {
    margin-left: 2px;
    margin-top: 1px;
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
