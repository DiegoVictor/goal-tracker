import React from 'react';

import { GoalsContext } from '../../../../contexts/GoalsContext';
import { Container } from './styles';

function Goals() {
  return (
    <Container>
      <GoalsContext.Consumer>
        {({ goals }) => {
        }}
      </GoalsContext.Consumer>
    </Container>
  );
}

export default Goals;
