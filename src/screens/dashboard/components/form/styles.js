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

  textarea {
    padding-top: 28px;
    resize: none;
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

export const InputGroup = styled.div`
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

export const Tasks = styled.div`
  margin-top: 40px;

  table {
    margin-bottom: 20px;
    width: 100%;

    th,
    td {
      text-align: left;


    }

  }
`;
