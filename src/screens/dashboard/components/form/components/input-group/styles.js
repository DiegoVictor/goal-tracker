import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;

  > span {
    color: #999;
    font-size: 14px;
    font-weight: 700;
    left: 45px;
    position: absolute;
    top: 10px;
    z-index: 2;
  }
`;

export const Icon = styled.div`
  align-items: ${(props) => (props.align === 'top' ? 'flex-start' : 'center')};
  display: flex;
  justify-content: center;
  height: 100%;
  width: 50px;

  ${(props) =>
    props.align === 'top' &&
    css`
      margin-top: 28px;
    `}
`;
