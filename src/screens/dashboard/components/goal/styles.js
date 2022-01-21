export const Container = styled.div`
  background: linear-gradient(
    49deg,
    rgba(11, 12, 20, 1) 0%,
    rgba(43, 44, 51, 1) 100%
  );
  border-radius: 8px;
  max-width: 350px;
  font-size: 18px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 3px #000;
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

  h4 {
    font-weight: 700;
    margin: 0px;
  }
`;

export const Description = styled.div`
  font-size: 14px;
  margin-top: 3px;
`;

export const Tasks = styled.div`
  margin-top: ${(props) => (props.showDetails ? '15px' : '5px')};

  > div {
    display: ${(props) => (props.showDetails ? 'block' : 'flex')};
  }
`;
`;
