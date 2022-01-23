import styled from 'styled-components';

export const Container = styled.div`
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

export const Form = styled.div`
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
