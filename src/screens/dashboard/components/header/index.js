import React, { useCallback } from 'react';
import { IoIosAddCircle, IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { Subtitle } from 'components/subtitle/styles';
import { Center, FlexRight, Orange } from 'styles/commons';
import Help from 'components/help';
import { GoalsContext, INITIAL_GOAL_STATE } from 'contexts/GoalsContext';

import Search from './components/search';

import { AddButton, Container, Logout } from './styles';

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

            <Search />
            <Help text="You can mark a goal as done to check all subtasks automatically!" />

            <Center>
              <AddButton onClick={() => setFormData(INITIAL_GOAL_STATE)}>
                <IoIosAddCircle size={32} color="#fff" />
                <span>Add new goal</span>
              </AddButton>
            </Center>
          </div>
        </Container>
      )}
    </GoalsContext.Consumer>
  );
}

export default Header;
