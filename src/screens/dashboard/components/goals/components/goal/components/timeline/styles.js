import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;

  > div {
    display: inline-block;

    > span {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
    }

    & + div {
      margin-left: 5px;
    }

    > div {
      align-items: center;
      background-color: ${(props) =>
        props.done ? 'rgba(255,255,255,0.5)' : 'rgba(43, 44, 51, 1)'};
      border-radius: 4px;
      display: flex;
      font-size: 14px;
      font-weight: 700;
      padding: 3px 5px;

      > span {
        margin-left: 5px;
        margin-top: 2px;
      }
    }
  }
`;
