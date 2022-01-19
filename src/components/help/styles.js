import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  color: ${(props) => (props.color ? props.color : '#3b3c45')};
  display: flex;
  margin-left: 10px;
  margin-top: 10px;
  max-width: 300px;

  span {
    margin-left: 5px;
  }
`;
