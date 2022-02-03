import React, { useCallback } from 'react';
import { IoIosAddCircle, IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import { Subtitle } from 'components/subtitle/styles';
import { Center, FlexRight, Orange } from 'styles/commons';
import HelpText from 'components/help-text';

import { FormContext, INITIAL_GOAL_STATE } from 'contexts/FormContext';
import Search from './components/search';

import { AddButton, Container, Logout } from './styles';

function Header() {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    localStorage.removeItem('current_session');
    navigate('/');
  }, []);

  return (
    <FormContext.Consumer>
      {({ setFormData }) => (
        <Container>
          <div>
            <FlexRight>
              <Logout onClick={logout} title="Logout" data-testid="logout">
                <IoIosLogOut size={22} color="#fff" />
              </Logout>
            </FlexRight>

            <h3>
              <Orange>Goals</Orange>
            </h3>
            <Subtitle>List</Subtitle>

            <Search />
            <HelpText text="You can mark a goal as done to check all subtasks automatically!" />

            <Center>
              <AddButton
                onClick={() => setFormData(INITIAL_GOAL_STATE)}
                data-testid="add"
              >
                <IoIosAddCircle size={32} color="#fff" />
                <span>Add new goal</span>
              </AddButton>
            </Center>
          </div>
        </Container>
      )}
    </FormContext.Consumer>
  );
}

export default Header;
