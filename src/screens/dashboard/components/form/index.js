import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { Subtitle } from '../../../../components/subtitle/styles';
import {
  Container,
  Done,
} from './styles';

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
          onSubmit(goal);
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
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Form</h3>
          <Subtitle>Create or update a goal</Subtitle>
        </div>

        <Done
          onClick={() => {
            const done = !goal.done;
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
        >
          <div>
            {goal.done ? (
              <BsToggleOn size={30} color="#17d076" />
            ) : (
              <BsToggleOff size={30} />
            )}
          </div>
          <span>DONE</span>
        </Done>
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
