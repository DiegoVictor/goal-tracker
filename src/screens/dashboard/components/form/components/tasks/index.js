import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  IoIosAddCircle,
  IoIosCheckbox,
  IoMdSquareOutline,
} from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';

import { Button } from 'components/button/styles';
import Input from 'components/input';

import { Container, Form } from './styles';

function Tasks({ items, onChange }) {
  const [title, setTitle] = useState('');

  const update = useCallback(
    (modifier) => {
      const tasks = modifier([...items]);
      onChange((state) => ({ ...state, tasks }));
    },
    [items]
  );

  return (
    <Container>
      {items.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Done</th>
              <th>Title</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {items.map((task, index) => (
              <tr key={task.id}>
                <td>
                  <Button
                    type="button"
                    data-testid={`tasks-${task.id}-done`}
                    onClick={() => {
                      update((tasks) => {
                        tasks[index].done = !tasks[index].done;
                        return tasks;
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
                    data-testid={`tasks-${task.id}-title`}
                    value={task.title}
                    onChange={(event) => {
                      update((tasks) => {
                        tasks[index].title = event.target.value;
                        return tasks;
                      });
                    }}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    data-testid={`tasks-${task.id}-delete`}
                    onClick={() => {
                      update((tasks) => {
                        tasks.splice(index, 1);
                        return tasks;
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

      <Form>
        <Input
          type="text"
          data-testid="task-input"
          placeholder="Task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.keyCode === 13) {
              event.preventDefault();
            }
          }}
          right={
            <Button
              type="button"
              data-testid="submit-task"
              onClick={() => {
                update((tasks) => {
                  tasks.push({ id: new Date().getTime(), done: false, title });
                  return tasks;
                });
                setTitle('');
              }}
            >
              <IoIosAddCircle size={32} color="#ccc" />
            </Button>
          }
        />
      </Form>
    </Container>
  );
}

Tasks.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Tasks;
