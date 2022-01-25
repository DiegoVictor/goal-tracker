import React from 'react';

import { GoalsContext } from 'contexts/GoalsContext';

import Goal from './components/goal';
import { Container } from './styles';

function Goals() {
  return (
    <Container>
      <GoalsContext.Consumer>
        {({ goals }) => {
          return (
            <div>
              {goals.length > 0 &&
                goals.map((goal) => <Goal {...goal} key={goal.id} />)}
            </div>
          );
        }}
      </GoalsContext.Consumer>
    </Container>
  );
}

export default Goals;
