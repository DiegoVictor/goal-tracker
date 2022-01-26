import React, { useCallback, useState } from 'react';
import { IoIosSave, IoIosTime } from 'react-icons/io';
import { IoCloseOutline, IoText } from 'react-icons/io5';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { Subtitle } from 'components/subtitle/styles';

import Done from './components/done';
import Tasks from './components/tasks';
import InputGroup from './components/input-group';
import { Container, Footer } from './styles';

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'The title must has at least 3 characters')
    .required('Please type the goal title'),
  deadline: yup.string().required('Please select a deadline date'),
});

function Form({ data, cancel, onSubmit }) {
  const [errors, setErrors] = useState(null);
  const [goal, setGoal] = useState(data);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      await schema
        .validate(goal, { abortEarly: false })
        .then(() => {
          onSubmit({
            ...goal,
            deadline: new Date(goal.deadline),
          });
        })
        .catch((err) => {
          const messages = {};
          err.inner.forEach((error) => {
            if (!messages[error.path]) {
              messages[error.path] = error.message;
            }
          });
          setErrors(messages);
        });
    },
    [goal]
  );

  return (
    <Container data-testid="form">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Form</h3>
          <Subtitle>Create or update a goal</Subtitle>
        </div>

        <Done
          value={goal.done}
          onChange={(done) => {
            setGoal({
              ...goal,
              completedAt: done ? new Date() : null,
              tasks: done
                ? goal.tasks.map((task) => {
                    task.done = true;
                    return task;
                  })
                : goal.tasks,
              done,
            });
          }}
        />

        <InputGroup
          title="Title"
          placeholder="Update that beautiful report"
          value={goal.title}
          error={errors?.title}
          left={IoText}
          onChange={(value) => {
            setGoal({
              ...goal,
              title: value,
            });
          }}
        />

        <InputGroup
          area
          title="Description"
          cols="30"
          rows="3"
          placeholder="Update my report about..."
          value={goal.description}
          left={IoText}
          onChange={(value) => {
            setGoal({
              ...goal,
              description: value,
            });
          }}
        />

        <InputGroup
          type="date"
          data-testid="deadline"
          title="Deadline"
          value={goal.deadline}
          error={errors?.deadline}
          left={IoIosTime}
          onChange={(value) => {
            setGoal({
              ...goal,
              deadline: value,
            });
          }}
        />

        <Tasks items={goal.tasks} onChange={setGoal} />

        <Footer>
          <button type="button" onClick={cancel} data-testid="cancel">
            <IoCloseOutline size={20} />
          </button>
          <button type="submit" data-testid="submit">
            <IoIosSave size={18} />
          </button>
        </Footer>
      </form>
    </Container>
  );
}

Form.propTypes = {
  cancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    done: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
  }),
};

Form.defaultProps = {
  data: {},
};

export default Form;
