import React, { useState } from 'react';
import {
  Container,
  Description,
  Tasks,
} from './styles';
import { GoalsContext } from '../../../../contexts/GoalsContext';

function Goal({ id, title, description, deadline, completedAt, tasks, done }) {
  const [showTasksDetails, setShowTasksDetails] = useState(false);

  return (
    <GoalsContext.Consumer>
        <Container done={done}>
          <h4>{title}</h4>
          <Description>{description}</Description>

          {tasks?.length > 0 && (
            <Tasks showDetails={showTasksDetails}>
              <div>
              </div>
            </Tasks>
          )}
        </Container>
    </GoalsContext.Consumer>
  );
}

Goal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  completedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(Date),
  ]),
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      completedAt: PropTypes.string,
    })
  ),
};

Goal.defaultProps = {
  completedAt: '',
  tasks: [],
};

export default Goal;
