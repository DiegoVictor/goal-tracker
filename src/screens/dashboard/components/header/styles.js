import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;

  > div {
    min-width: 400px;

    @media (max-width: 440px) {
      min-width: auto;
      width: 100%;
    }
  }
`;

export const Logout = styled.button`
  align-items: center;
  background-color: #e33d8e;
  border: 0px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding-left: 3px;
  padding-right: 0px;
  height: 40px;
  width: 40px;
`;

export const AddButton = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  &:hover {
    opacity: 0.7;
  }

  span {
    margin-left: 5px;
  }
`;
