import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from './components/header';
import Goals from './components/goals';
import { GoalsContext } from '../../contexts/GoalsContext';
import { Container } from './styles';

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
      const data = JSON.parse(localStorage.getItem(userKey));
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
      setFormData: (params = initialGoal) => {
        setGoal(params);
      },
    };
  }, [userData, goals]);

  return (
    <GoalsContext.Provider value={context}>
      <Container>
        <Header />


        <Goals />
      </Container>
    </GoalsContext.Provider>
  );
}
