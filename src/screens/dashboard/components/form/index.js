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

import Button from '../../../../components/button';
import Input from '../../../../components/input';
import { Subtitle } from '../../../../components/subtitle/styles';
import TextArea from '../../../../components/textarea';
import Error from '../../../../components/error';
import {
  Container,
  Done,
  Footer,
  Icon,
  InputGroup,
  TaskForm,
  Tasks,
} from './styles';

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'The title must has at least 3 characters')
    .required('Please type the goal title'),
  deadline: yup.string().required('Please select a deadline date'),
});

function Form({ data, cancel, onSubmit }) {
  const [title, setTitle] = useState('');
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
        <InputGroup>
          <span>Title</span>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Update that beatiful report"
            left={
              <Icon>
                <IoText color="#ccc" size={24} />
              </Icon>
            }
            value={goal.title}
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

        <Tasks>
          {goal?.tasks?.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Done</th>
                  <th>Title</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {goal.tasks.map((task, index) => (
                  <tr key={task.id}>
                    <td>
                      <Button
                        type="button"
                        onClick={() => {
                          const tasks = [...goal.tasks];
                          tasks[index].done = !tasks[index].done;
                          setGoal({
                            ...goal,
                            tasks,
                          });
                        }}
                      >
                        {task.done ? (
                          <IoIosCheckbox size={24} />
                        ) : (
                          <IoMdSquareOutline size={24} />
                        )}
                      </Button>
                    </td>
                    <td>
                      <input
                        type="text"
                        value={task.title}
                        onChange={(event) => {
                          const tasks = [...goal.tasks];
                          tasks[index].title = event.target.value;
                          setGoal({
                            ...goal,
                            tasks,
                          });
                        }}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          const tasks = [...goal.tasks];
                          tasks.splice(index, 1);

                          setGoal({
                            ...goal,
                            tasks,
                          });
                        }}
                      >
                        <IoCloseCircle color="#ccc" size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Tasks>

        <TaskForm>
          <Input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            right={
              <Button
                type="button"
                disabled={!(title?.length > 3)}
                onClick={() => {
                  setGoal({
                    ...goal,
                    tasks: [...goal.tasks, { done: false, title }],
                  });
                  setTitle('');
                }}
              >
                <IoIosAddCircle size={32} color="#ccc" />
              </Button>
            }
          />
        </TaskForm>

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
