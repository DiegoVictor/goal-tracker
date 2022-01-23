import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  IoIosArrowDown,
  IoIosCheckmarkCircle,
  IoMdRadioButtonOff,
} from 'react-icons/io';

import { GoalsContext } from 'contexts/GoalsContext';

import { Container, Button, Task } from './styles';

function Tasks({ goalId, items }) {
  const [showTasksDetails, setShowTasksDetails] = useState(false);
  const { update } = useContext(GoalsContext);

  return (
    <Container open={showTasksDetails}>
      {items.length > 0 && (
        <div>
          {items.map((task) => (
            <Task
              title={task.title}
              key={task.id}
              onClick={() => {
                task.done = !task.done;
                update(goalId, {
                  tasks: items,
                });
              }}
            >
              {task.done ? (
                <IoIosCheckmarkCircle size={17} key={task.id} />
              ) : (
                <IoMdRadioButtonOff size={17} key={task.id} />
              )}

              {showTasksDetails && <span>{task.title}</span>}
            </Task>
          ))}
          <Button open={showTasksDetails}>
            <IoIosArrowDown
              size={15}
              onClick={() => setShowTasksDetails(!showTasksDetails)}
            />
          </Button>
        </div>
      )}
    </Container>
  );
}

Tasks.propTypes = {
  goalId: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Tasks;
