import React, { useCallback, useContext, useState } from 'react';
import { IoIosSave, IoIosTime } from 'react-icons/io';
import { IoCloseOutline, IoText } from 'react-icons/io5';
import * as yup from 'yup';

import { Subtitle } from 'components/subtitle/styles';
import { FormContext } from 'contexts/FormContext';
import { GoalsContext } from 'contexts/GoalsContext';

import Done from './components/done';
import Tasks from './components/tasks';
import InputGroup from './components/input-group';
import Modal from '../modal';
import { Container, PreventScroll, Footer } from './styles';

const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'The title must has at least 3 characters')
    .required('Please type the goal title'),
  deadline: yup.string().required('Please select a deadline date'),
});

function Form() {
  const { formData: goal, setFormData: setGoal } = useContext(FormContext);
  const { userData, setUserData } = useContext(GoalsContext);
  const [errors, setErrors] = useState(null);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      await schema
        .validate(goal, { abortEarly: false })
        .then(() => {
          const items = [...userData.goals];

          if (goal.id) {
            const goalIndex = items.findIndex(({ id }) => id === goal.id);
            items.splice(goalIndex, 1, {
              ...items[goalIndex],
              ...goal,
            });
          } else {
            goal.id = Date.now();
            items.push(goal);
          }

          setUserData({
            ...userData,
            goals: items,
          });
          setGoal(null);
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
    [userData, goal]
  );

  if (!goal) {
    return null;
  }

  return (
    <Modal>
      <PreventScroll />
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
            <button
              type="button"
              onClick={() => {
                setGoal(null);
              }}
              data-testid="cancel"
            >
              <IoCloseOutline size={20} />
            </button>
            <button type="submit" data-testid="submit">
              <IoIosSave size={18} />
            </button>
          </Footer>
        </form>
      </Container>
    </Modal>
  );
}

export default Form;
