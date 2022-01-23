import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { GoalsContext } from 'contexts/GoalsContext';

import Modal from './components/modal';
import Header from './components/header';
import Goals from './components/goals';
import Form from './components/form';
import { Container, PreventScroll } from './styles';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userKey, setUserKey] = useState('');
  useEffect(() => {
    if (!location.state || !location.state?.key) {
      navigate('/');
    } else {
      const { key } = location.state;

      setUserKey(key);
    }
  }, []);

  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (userKey) {
      const data = JSON.parse(localStorage.getItem(userKey)) || { goals: [] };
      setUserData(data);
    }
  }, [userKey]);

  const [goals, setGoals] = useState([]);
  useEffect(() => {
    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(userData));
      setGoals(userData.goals);
    }
  }, [userKey, userData]);

  const [goal, setGoal] = useState(null);
  const handleSubmit = useCallback(
    (data) => {
      const items = [...userData.goals];

      if (data.id) {
        const goalIndex = items.findIndex(({ id }) => id === data.id);
        items.splice(goalIndex, 1, {
          ...items[goalIndex],
          ...data,
        });
      } else {
        data.id = new Date().getTime();
        items.push(data);
      }

      setUserData({
        ...userData,
        goals: items,
      });
      setGoal(null);
    },
    [userData]
  );

  const initialGoal = {
    title: '',
    description: '',
    deadline: '',
    tasks: [],
    done: false,
    completedAt: '',
  };
  const context = useMemo(() => {
    return {
      goals,
      reList: (query) => {
        if (query.length < 3) {
          setGoals(userData.goals);
        } else {
          setGoals(
            userData.goals.filter(
              ({ title }) => title.search(new RegExp(query, 'gi')) > -1
            )
          );
        }
      },
      updateGoalById: (goalId, params) => {
        const updatedGoals = [...userData.goals];
        const goalIndex = updatedGoals.findIndex(({ id }) => id === goalId);

        updatedGoals[goalIndex] = {
          ...updatedGoals[goalIndex],
          ...params,
        };

        if (params.done) {
          updatedGoals[goalIndex].tasks = updatedGoals[goalIndex].tasks.map(
            (task) => ({ ...task, done: true })
          );
        }

        setUserData({ goals: updatedGoals });
      },
      deleteGoalById: (goalId) => {
        const updatedGoals = [...userData.goals];
        const goalIndex = updatedGoals.findIndex(({ id }) => id === goalId);

        updatedGoals.splice(goalIndex, 1);
        setUserData({ goals: updatedGoals });
      },
      setFormData: (params = initialGoal) => {
        setGoal(params);
      },
    };
  }, [userData, goals]);

  return (
    <GoalsContext.Provider value={context}>
      <Container>
        <Header />

        {goal && (
          <Modal>
            <PreventScroll />
            <Form
              data={goal}
              cancel={() => setGoal(null)}
              onSubmit={handleSubmit}
            />
          </Modal>
        )}

        <Goals />
      </Container>
    </GoalsContext.Provider>
  );
}
