import React, { useContext, useState } from 'react';
import {
  IoIosCheckbox,
  IoIosRemoveCircle,
  IoMdSquareOutline,
} from 'react-icons/io';
import { RiEdit2Fill } from 'react-icons/ri';
import PropTypes from 'prop-types';

import { GoalsContext } from 'contexts/GoalsContext';

import Tasks from './components/tasks';
import Timeline from './components/timeline';
import { Actions, Container, Description } from './styles';

function Goal({ id, title, description, done, completedAt, deadline, tasks }) {
  const { goals, setFormData, update, remove } = useContext(GoalsContext);
  const [goal] = useState(goals.find(({ id: goalId }) => goalId === id));

  return (
    <Container done={done}>
      <h4>{title}</h4>
      <Description>{description}</Description>
      <Tasks goalId={id} items={tasks} />
      <Timeline done={done} completedAt={completedAt} deadline={deadline} />

      <Actions done={done}>
        <button
          type="button"
          onClick={() =>
            update(id, {
              done: !done,
              completedAt: !done ? new Date() : null,
            })
          }
        >
          {done ? <IoIosCheckbox size={24} /> : <IoMdSquareOutline size={24} />}
        </button>
        <div>
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...goal,
                title,
                description,
                deadline,
                done,
                tasks,
              })
            }
          >
            <RiEdit2Fill size={20} />
          </button>
          <button type="button" onClick={() => remove(id)}>
            <IoIosRemoveCircle size={20} />
          </button>
        </div>
      </Actions>
    </Container>
  );
}

Goal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  completedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(Date),
  ]),
  deadline: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

Goal.defaultProps = {
  completedAt: '',
};

export default Goal;
