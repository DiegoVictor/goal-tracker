import styled, { css } from 'styled-components';

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

export const TaskForm = styled.div`
  align-items: center;
  background-color: #eee;
  border-radius: 25px;
  display: flex;
  height: 50px;

  > div {
    width: 100%;

    input {
      background-color: transparent;
      border-radius: 25px;
      height: 50px;
      padding: 5px 5px 5px 20px;
      width: 100%;
    }
  }

  button {
    padding-right: 0px;
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

      input {
        border-radius: 0px;
        width: auto;

        &[type='checkbox'] {
          height: 30px;
        }
      }
    }

    th:first-child {
      text-align: center;
    }

    td:first-child {
      text-align: center;
      vertical-align: center;

      button {
        height: 30px;
        padding: 3px;
        width: 30px;
      }
    }

    td:nth-child(2) {
      background-color: #eeeeee;

      input {
        background-color: transparent;
        border: 0px;
        height: 40px;
        padding: 5px 10px;
        width: 100%;
      }
    }

    td:nth-child(3) {
      display: flex;
      justify-content: flex-end;

      button {
        align-items: center;
        background-color: transparent;
        border: 0px;
        cursor: pointer;
        display: flex;
        height: 42px;
        justify-content: center;
        margin-right: 10px;
        padding: 0px;
        width: 42px;
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  text-align: center;

  button {
    border: 0px;
    cursor: pointer;
    margin: auto 5px;
    padding: 10px;
  }
`;
