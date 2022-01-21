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

export const Task = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  margin: 3px 0px 0px 1px;

  span {
    margin-left: 2px;
    margin-top: 1px;
  }
`;

export const SeeMoreButton = styled.div`
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

export const Events = styled.div`
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

`;
