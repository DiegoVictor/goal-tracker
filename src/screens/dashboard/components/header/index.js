import { GoalsContext } from '../../../../contexts/GoalsContext';
function Header() {
  return (
    <GoalsContext.Consumer>
      {({ setFormData }) => (
        <Container>
        </Container>
      )}
    </GoalsContext.Consumer>
  );
}

export default Header;
