import React, { useCallback, useState } from 'react';
import {
  IoIosAddCircle,
  IoIosCheckbox,
  IoIosSave,
  IoIosTime,
  IoMdSquareOutline,
} from 'react-icons/io';
import { IoCloseCircle, IoCloseOutline, IoText } from 'react-icons/io5';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { Subtitle } from 'components/subtitle/styles';

import Done from './components/done';
import Tasks from './components/tasks';
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

            onChange={(event) => {
              setGoal({
                ...goal,
                title: event.target.value,
              });
            }}
          />
          {errors?.title && <Error text={errors.title} />}
        </InputGroup>
        <InputGroup>
          <span>Description</span>
          <TextArea
            cols="30"
            rows="3"
            left={
              <Icon align="top">
                <IoText color="#ccc" size={24} />
              </Icon>
            }
            placeholder="Update my report about..."
            value={goal.description}
            onChange={(event) => {
              setGoal({
                ...goal,
                description: event.target.value,
              });
            }}
          />
        </InputGroup>
        <InputGroup>
          <span>Deadline</span>
          <Input
            type="date"
            name="deadline"
            left={
              <Icon>
                <IoIosTime color="#ccc" size={24} />
              </Icon>
            }
            value={goal.deadline}
            onChange={(event) => {
              setGoal({
                ...goal,
                deadline: event.target.value,
              });
            }}
          />
          {errors?.deadline && <Error text={errors.deadline} />}
        </InputGroup>

        <Tasks items={goal.tasks} onChange={setGoal} />

        <Footer>
          <button
            type="button"
            onClick={cancel}
            style={{
              alignItems: 'center',
              borderRadius: 30,
              justifyContent: 'center',
              display: 'flex',
              width: 40,
            }}
          >
            <IoCloseOutline size={20} />
          </button>
          <button
            type="submit"
            style={{
              alignItems: 'center',
              borderRadius: 30,
              justifyContent: 'center',
              display: 'flex',
              width: 40,
            }}
          >
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
