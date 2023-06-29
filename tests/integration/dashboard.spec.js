import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { format } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { SHA3 } from 'crypto-js';

import factory from '../utils/factory';
import Dashboard from '../../src/screens/dashboard';
import { GoalsContextProvider } from '../../src/contexts/GoalsContext';

jest.mock('react-router-dom');

function setSession() {
  const email = faker.internet.email().toLowerCase();
  const userKey = SHA3(email).toString();
  const location = {
    state: {
      key: userKey,
    },
  };
  localStorage.setItem('current_session', userKey);

  useLocation.mockClear();
  useLocation.mockReturnValue(location);

  return { userKey };
}

describe('Dashboard', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to log out ', async () => {
    const { userKey } = setSession();

    const { getByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    expect(localStorage).toHaveProperty('current_session', userKey);
    await act(async () => {
      fireEvent.click(getByTestId('logout'));
    });

    expect(localStorage).not.toHaveProperty('current_session');
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should be redirected to home when not logged in', async () => {
    useLocation.mockClear();
    useLocation.mockReturnValue({});

    render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should be able to set goal as done and not done', async () => {
    const { userKey } = setSession();
    const goal = await factory.attrs('Goal', { done: false, completedAt: '' });
    goal.tasks[0].done = false;

    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const { getByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    const [task] = goal.tasks;
    const taskDoneButton = getByTestId(`task-${task.id}-done`);
    expect(taskDoneButton.getAttribute('data-value')).toBe('false');

    const goalDoneButton = getByTestId(`goal-${goal.id}-done`);
    expect(goalDoneButton.getAttribute('data-value')).toBe('false');
    await act(async () => {
      fireEvent.click(goalDoneButton);
    });

    expect(goalDoneButton.getAttribute('data-value')).toBe('true');
    expect(taskDoneButton.getAttribute('data-value')).toBe('true');

    const expected = {
      ...goal,
      tasks: [
        {
          ...task,
          done: true,
          completedAt: expect.any(String),
        },
      ],
      deadline: goal.deadline.toISOString(),
      done: true,
      completedAt: expect.any(String),
    };
    expect(JSON.parse(localStorage.getItem(userKey))).toStrictEqual({
      goals: [expected],
    });

    await act(async () => {
      fireEvent.click(goalDoneButton);
    });

    expect(goalDoneButton.getAttribute('data-value')).toBe('false');

    expected.done = false;
    expect(JSON.parse(localStorage.getItem(userKey))).toStrictEqual({
      goals: [expected],
    });
  });

  it("should be able to change goal's task status", async () => {
    const { userKey } = setSession();

    const goal = await factory.attrs('Goal');
    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const { getByTestId, getByText } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    const [task] = goal.tasks;

    const button = getByTestId(`task-${task.id}-done`);
    expect(button.getAttribute('data-value')).toBe(task.done.toString());
    await act(async () => {
      fireEvent.click(button);
    });
    expect(button.getAttribute('data-value')).toBe((!task.done).toString());

    await act(async () => {
      fireEvent.click(getByTestId(`goal-${goal.id}-tasks-details`));
    });
    expect(getByText(task.title)).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(button);
    });

    const div = getByTestId(`task-${task.id}-done`);
    expect(div.getAttribute('data-value')).toBe(task.done.toString());
  });

  it('should be able to delete a goal', async () => {
    const { userKey } = setSession();

    const goal = await factory.attrs('Goal');
    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const { getByTestId, queryByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId(`goal-${goal.id}-delete`));
    });

    expect(queryByTestId(`goal-${goal.id}`)).not.toBeInTheDocument();
  });

  it('should be able to search goals', async () => {
    const { userKey } = setSession();

    const goals = await factory.attrsMany('Goal', 2);
    localStorage.setItem(userKey, JSON.stringify({ goals }));

    const { queryByTestId, getByTestId, getByPlaceholderText } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    const [goal, ...rest] = goals;

    await act(async () => {
      fireEvent.change(getByPlaceholderText('Search'), {
        target: { value: goal.title },
      });
    });

    expect(getByTestId(`goal-${goal.id}`)).toBeInTheDocument();
    rest.forEach(({ id }) => {
      expect(queryByTestId(`goal-${id}`)).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(getByTestId('clear'));
    });
    goals.forEach(({ id }) => {
      expect(getByTestId(`goal-${id}`)).toBeInTheDocument();
    });
  });

  it('should be able to create a goal', async () => {
    setSession();

    const goal = await factory.attrs('Goal', {
      done: true,
      completedAt: faker.date.past,
    });

    const [task] = goal.tasks;
    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() => task.id)
      .mockImplementationOnce(() => goal.id);

    const { getByTestId, getByPlaceholderText, getByText } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId(`add`));
    });

    fireEvent.change(getByTestId('task-input'), {
      target: { value: task.title },
    });
    await act(async () => {
      fireEvent.click(getByTestId('submit-task'));
    });

    const taskDoneButton = getByTestId(`tasks-${task.id}-done`);
    expect(taskDoneButton.getAttribute('data-value')).toBe('false');
    await act(async () => {
      fireEvent.click(getByTestId('done'));
    });
    expect(taskDoneButton.getAttribute('data-value')).toBe('true');

    const deadline = goal.deadline.toISOString().slice(0, 10);
    fireEvent.change(getByTestId('deadline'), {
      target: { value: deadline },
    });

    fireEvent.change(getByPlaceholderText('Update that beautiful report'), {
      target: { value: goal.title },
    });
    fireEvent.change(getByPlaceholderText('Update my report about...'), {
      target: { value: goal.description },
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });
    await waitFor(() => getByText(goal.title));

    expect(getByText(goal.title)).toBeInTheDocument();
    expect(getByText(goal.description)).toBeInTheDocument();
    expect(
      getByText(format(new Date(`${deadline}T00:00:00.000Z`), 'do, MMM yy'))
    ).toBeInTheDocument();
    expect(getByText(format(new Date(), 'do, MMM yy'))).toBeInTheDocument();

    const goalDoneButton = getByTestId(`goal-${goal.id}-done`);
    expect(goalDoneButton.getAttribute('data-value')).toBe('true');
  });

  it('should be able to edit a goal', async () => {
    const { userKey } = setSession();

    const [goal, { title, description, deadline, tasks }] =
      await factory.attrsMany('Goal', 2, [
        {
          done: true,
          completedAt: faker.date.past,
        },
      ]);
    goal.tasks[0].done = true;
    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const [task] = goal.tasks;
    jest.spyOn(Date, 'now').mockImplementationOnce(() => task.id);

    const { getByTestId, getByPlaceholderText, getByText, queryByTestId } =
      render(
        <GoalsContextProvider>
          <Dashboard />
        </GoalsContextProvider>
      );

    await waitFor(() => getByText(goal.title));
    await act(async () => {
      fireEvent.click(getByTestId(`goal-${goal.id}-edit`));
    });

    fireEvent.click(getByTestId('done'));
    fireEvent.change(getByPlaceholderText('Update that beautiful report'), {
      target: { value: title },
    });
    fireEvent.change(getByPlaceholderText('Update my report about...'), {
      target: { value: description },
    });

    const date = deadline.toISOString().slice(0, 10);
    fireEvent.change(getByTestId('deadline'), {
      target: { value: date },
    });

    expect(
      getByTestId(`tasks-${task.id}-done`).getAttribute('data-value')
    ).toBe('true');

    fireEvent.click(getByTestId(`tasks-${task.id}-done`));
    expect(
      getByTestId(`tasks-${task.id}-done`).getAttribute('data-value')
    ).toBe('false');

    const taskText = getByTestId(`tasks-${task.id}-title`);
    fireEvent.change(taskText, {
      target: { value: tasks[0].title },
    });
    expect(taskText.value).toBe(tasks[0].title);

    fireEvent.click(getByTestId(`tasks-${task.id}-delete`));
    expect(queryByTestId(`tasks-${task.id}-title`)).not.toBeInTheDocument();

    const taskTitle = faker.lorem.words();
    fireEvent.change(getByTestId('task-input'), {
      target: { value: taskTitle },
    });

    fireEvent.keyDown(getByTestId('task-input'), { keyCode: 13 });
    expect(queryByTestId(`tasks-${task.id}-title`)).not.toBeInTheDocument();

    fireEvent.click(getByTestId('submit-task'));
    expect(queryByTestId(`tasks-${task.id}-title`).value).toBe(taskTitle);

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    await waitFor(() => getByText(title));

    expect(getByTestId(`goal-${goal.id}`)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();
    expect(
      getByText(format(new Date(`${date}T00:00:00.000Z`), 'do, MMM yy'))
    ).toBeInTheDocument();

    const button = getByTestId(`goal-${goal.id}-done`);
    expect(button.getAttribute('data-value')).toBe('false');
  });

  it('should not be able to create goal with invalid data', async () => {
    setSession();

    const { getByTestId, getByText, queryByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    fireEvent.click(getByTestId(`add`));
    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    await waitFor(() => getByText('The title must has at least 3 characters'));

    expect(
      getByText('The title must has at least 3 characters')
    ).toBeInTheDocument();
    expect(getByText('Please select a deadline date')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByTestId('cancel'));
    });
    expect(queryByTestId('form')).not.toBeInTheDocument();
  });
});
