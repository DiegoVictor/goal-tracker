import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { format } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';
import faker from 'faker';
import { SHA3 } from 'crypto-js';

import factory from '../utils/factory';
import Dashboard from '../../src/screens/dashboard';
import { GoalsContextProvider } from '../../src/contexts/GoalsContext';

jest.mock('react-router-dom');

describe('Dashboard', () => {
  const navigate = jest.fn();
  useNavigate.mockReturnValue(navigate);

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to log out ', async () => {
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

    const { getByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    expect(localStorage).toHaveProperty('current_session', userKey);

    const button = getByTestId(`logout`);
    await act(async () => {
      fireEvent.click(button);
    });

    expect(localStorage).not.toHaveProperty('current_session');
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should be redirected to home', async () => {
    const location = {};

    useLocation.mockClear();
    useLocation.mockReturnValue(location);

    render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should be able to set goal as done', async () => {
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

    const goal = await factory.attrs('Goal', { done: false, completedAt: '' });
    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const { getByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );
    const button = getByTestId(`goal-${goal.id}-done`);
    expect(button.getAttribute('data-value')).toBe('false');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button.getAttribute('data-value')).toBe('true');

    expect(JSON.parse(localStorage.getItem(userKey))).toStrictEqual({
      goals: [
        {
          ...goal,
          tasks: goal.tasks.map((task) => {
            if (task.completedAt) {
              task.completedAt = task.completedAt.toISOString();
            }
            task.done = true;
            return task;
          }),
          deadline: goal.deadline.toISOString(),
          done: true,
          completedAt: expect.any(String),
        },
      ],
    });
  });

  it('should be able to unset goal as done', async () => {
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

    const goal = await factory.attrs('Goal', {
      done: true,
      completedAt: faker.date.past,
    });
    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const { getByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );
    const button = getByTestId(`goal-${goal.id}-done`);
    expect(button.getAttribute('data-value')).toBe('true');

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button.getAttribute('data-value')).toBe('false');

    expect(JSON.parse(localStorage.getItem(userKey))).toStrictEqual({
      goals: [
        {
          ...goal,
          tasks: goal.tasks.map((task) => {
            if (task.completedAt) {
              task.completedAt = task.completedAt.toISOString();
            }
            return task;
          }),
          deadline: goal.deadline.toISOString(),
          done: false,
          completedAt: expect.any(String),
        },
      ],
    });
  });

  it('should be able to invert task status', async () => {
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

    const goal = await factory.attrs('Goal');
    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const { getByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    const [task] = goal.tasks;
    const button = getByTestId(`goal-${goal.id}-task-${task.id}-done`);
    expect(button.getAttribute('data-value')).toBe(task.done.toString());

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button.getAttribute('data-value')).toBe((!task.done).toString());
  });

  it('should be able to delete a goal', async () => {
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

    const goal = await factory.attrs('Goal');
    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const { getByTestId, queryByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    const button = getByTestId(`goal-${goal.id}-delete`);
    await act(async () => {
      fireEvent.click(button);
    });

    expect(queryByTestId(`goal-${goal.id}`)).not.toBeInTheDocument();
  });

  it('should be able to search goals', async () => {
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

    const goals = await factory.attrsMany('Goal', 2);
    localStorage.setItem(userKey, JSON.stringify({ goals }));

    const { queryByTestId, getByPlaceholderText } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    const [goal] = goals;
    await act(async () => {
      fireEvent.change(getByPlaceholderText('Search'), {
        target: { value: goal.title },
      });
    });

    goals.slice(1).forEach(({ id }) => {
      expect(queryByTestId(`goal-${id}`)).not.toBeInTheDocument();
    });
  });

  it('should be able to cancel the search', async () => {
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

    const goals = await factory.attrsMany('Goal', 2);
    localStorage.setItem(userKey, JSON.stringify({ goals }));

    const { getByTestId, getByPlaceholderText } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    const input = getByPlaceholderText('Search');
    const text = faker.lorem.word(2);
    await act(async () => {
      fireEvent.change(input, {
        target: { value: text },
      });
    });

    expect(input.value).toBe(text);

    await act(async () => {
      fireEvent.click(getByTestId('clear'));
    });

    expect(input.value).toBe('');
  });

  it('should be able to get goals list', async () => {
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

    const goals = await factory.attrsMany('Goal', 2, [
      {
        done: true,
        completedAt: faker.date.past(),
      },
      { done: false },
    ]);
    localStorage.setItem(userKey, JSON.stringify({ goals }));

    const { getByText, getByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    await goals.reduce(async (promise, goal) => {
      promise.then(() =>
        act(async () =>
          fireEvent.click(getByTestId(`goal-${goal.id}-tasks-details`))
        )
      );
      return promise;
    }, Promise.resolve());

    goals.forEach((goal) => {
      expect(getByText(goal.title)).toBeInTheDocument();
      expect(getByText(goal.description)).toBeInTheDocument();
      expect(
        getByText(format(new Date(goal.deadline), 'do, MMM yy'))
      ).toBeInTheDocument();

      const button = getByTestId(`goal-${goal.id}-done`);
      expect(button.getAttribute('data-value')).toBe(goal.done.toString());

      if (goal.done) {
        expect(
          getByText(format(new Date(goal.completedAt), 'do, MMM yy'))
        ).toBeInTheDocument();
      }

      goal.tasks.forEach((task) => {
        const div = getByTestId(`goal-${goal.id}-task-${task.id}-done`);

        expect(getByText(task.title)).toBeInTheDocument();
        expect(div.getAttribute('data-value')).toBe(task.done.toString());
      });
    });
  });

  it('should be able to create a goal', async () => {
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

    const goal = await factory.attrs('Goal', {
      done: true,
      completedAt: faker.date.past(),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => goal.id);

    const { getByTestId, getByPlaceholderText, getByText } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId(`add`));
    });

    fireEvent.click(getByTestId('done'));
    fireEvent.change(getByPlaceholderText('Update that beautiful report'), {
      target: { value: goal.title },
    });
    fireEvent.change(getByPlaceholderText('Update my report about...'), {
      target: { value: goal.description },
    });

    const date = goal.deadline.toISOString().slice(0, 10);
    fireEvent.change(getByTestId('deadline'), {
      target: { value: date },
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    await waitFor(() => getByText(goal.title));

    expect(getByText(goal.title)).toBeInTheDocument();
    expect(getByText(goal.description)).toBeInTheDocument();
    expect(
      getByText(format(new Date(`${date}T00:00:00.000Z`), 'do, MMM yy'))
    ).toBeInTheDocument();

    const button = getByTestId(`goal-${goal.id}-done`);
    expect(button.getAttribute('data-value')).toBe('true');

    expect(getByText(format(new Date(), 'do, MMM yy'))).toBeInTheDocument();
  });

  it('should be able to edit a goal', async () => {
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

    const [old, goal] = await factory.attrsMany('Goal', 2, [
      {
        done: true,
        completedAt: faker.date.past(),
      },
    ]);
    old.tasks[0].done = true;

    localStorage.setItem(userKey, JSON.stringify({ goals: [old] }));

    jest.spyOn(Date, 'now').mockImplementationOnce(() => old.tasks[0].id);

    const { getByTestId, getByPlaceholderText, getByText, queryByTestId } =
      render(
        <GoalsContextProvider>
          <Dashboard />
        </GoalsContextProvider>
      );

    await waitFor(() => getByText(old.title));

    await act(async () => {
      fireEvent.click(getByTestId(`goal-${old.id}-edit`));
    });

    fireEvent.click(getByTestId('done'));
    fireEvent.change(getByPlaceholderText('Update that beautiful report'), {
      target: { value: goal.title },
    });
    fireEvent.change(getByPlaceholderText('Update my report about...'), {
      target: { value: goal.description },
    });

    const date = goal.deadline.toISOString().slice(0, 10);
    fireEvent.change(getByTestId('deadline'), {
      target: { value: date },
    });

    const [task] = old.tasks;
    expect(
      getByTestId(`tasks-${task.id}-done`).getAttribute('data-value')
    ).toBe('true');

    fireEvent.click(getByTestId(`tasks-${task.id}-done`));
    expect(
      getByTestId(`tasks-${task.id}-done`).getAttribute('data-value')
    ).toBe('false');

    fireEvent.change(getByTestId(`tasks-${task.id}-title`), {
      target: { value: goal.tasks[0].title },
    });
    expect(getByTestId(`tasks-${task.id}-title`).value).toBe(
      goal.tasks[0].title
    );

    fireEvent.click(getByTestId(`tasks-${task.id}-delete`));

    const title = faker.name.title();
    fireEvent.change(getByTestId('task-input'), { target: { value: title } });

    expect(queryByTestId(`tasks-${task.id}-title`)).not.toBeInTheDocument();
    fireEvent.keyDown(getByTestId('task-input'), { keyCode: 13 });
    expect(queryByTestId(`tasks-${task.id}-title`)).not.toBeInTheDocument();

    fireEvent.click(getByTestId('submit-task'));

    expect(queryByTestId(`tasks-${task.id}-title`).value).toBe(title);

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    await waitFor(() => getByText(goal.title));

    expect(getByTestId(`goal-${old.id}`)).toBeInTheDocument();
    expect(getByText(goal.title)).toBeInTheDocument();
    expect(getByText(goal.description)).toBeInTheDocument();
    expect(
      getByText(format(new Date(`${date}T00:00:00.000Z`), 'do, MMM yy'))
    ).toBeInTheDocument();

    const button = getByTestId(`goal-${old.id}-done`);
    expect(button.getAttribute('data-value')).toBe('false');
  });

  it('should be able to set tasks as done when the goal is set as done', async () => {
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

    const goal = await factory.attrs('Goal', { done: false });
    goal.tasks[0].done = false;

    localStorage.setItem(userKey, JSON.stringify({ goals: [goal] }));

    const { getByTestId, getByText } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    await waitFor(() => getByText(goal.title));

    await act(async () => {
      fireEvent.click(getByTestId(`goal-${goal.id}-edit`));
    });

    const [task] = goal.tasks;
    expect(
      getByTestId(`tasks-${task.id}-done`).getAttribute('data-value')
    ).toBe('false');

    fireEvent.click(getByTestId('done'));

    expect(getByTestId(`done`).getAttribute('data-value')).toBe('true');
    expect(
      getByTestId(`tasks-${task.id}-done`).getAttribute('data-value')
    ).toBe('true');
  });

  it('should be able to cancel goal creation', async () => {
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

    const { queryByTestId, getByTestId } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId(`add`));
    });

    expect(getByTestId('form')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(getByTestId('cancel'));
    });
    expect(queryByTestId('form')).not.toBeInTheDocument();
  });

  it('should be able to get validation messages', async () => {
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

    const { getByTestId, getByText } = render(
      <GoalsContextProvider>
        <Dashboard />
      </GoalsContextProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId(`add`));
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    await waitFor(() => getByText('The title must has at least 3 characters'));

    expect(
      getByText('The title must has at least 3 characters')
    ).toBeInTheDocument();
    expect(getByText('Please select a deadline date')).toBeInTheDocument();
  });
});
