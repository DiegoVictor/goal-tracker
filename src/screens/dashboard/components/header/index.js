import React, { useCallback } from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Subtitle } from '../../../../components/subtitle/styles';
import { FlexRight, Orange } from '../../../../themes/commons';
import { GoalsContext } from '../../../../contexts/GoalsContext';
import { Logout } from './styles';
function Header() {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    localStorage.removeItem('current_session');
    navigate('/');
  }, []);

  return (
    <GoalsContext.Consumer>
      {({ setFormData }) => (
        <Container>
          <div>
            <FlexRight>
              <Logout onClick={logout} title="Logout">
                <IoIosLogOut size={22} color="#fff" />
              </Logout>
            </FlexRight>

            <h3>
              <Orange>Goals</Orange>
            </h3>
            <Subtitle>List</Subtitle>
        </Container>
      )}
    </GoalsContext.Consumer>
  );
}

export default Header;
