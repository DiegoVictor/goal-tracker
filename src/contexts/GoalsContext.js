import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

export const INITIAL_GOAL_STATE = {
  title: '',
  description: '',
  deadline: '',
  tasks: [],
  done: false,
  completedAt: '',
};

export const GoalsContext = React.createContext({
  userData: { goals: [] },
});

export function GoalsContextProvider({ children }) {
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

  const [userData, setUserData] = useState({ goals: [] });
  useEffect(() => {
    if (userKey) {
      const data = JSON.parse(localStorage.getItem(userKey));
      if (data) {
        setUserData(data);
      }
    }
  }, [userKey]);

  const [goals, setGoals] = useState([]);
  useEffect(() => {
    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(userData));
      setGoals(userData.goals);
    }
  }, [userKey, userData]);

  const reList = useCallback(
    (query) => {
      if (query.length < 3) {
        setGoals(userData.goals);
      }

      setGoals(
        userData.goals.filter(
          ({ title }) => title.search(new RegExp(query, 'gi')) > -1
        )
      );
    },
    [userData]
  );

  const update = useCallback(
    (id, params) => {
      const updatedGoals = [...userData.goals];
      const goalIndex = updatedGoals.findIndex((goal) => goal.id === id);

      updatedGoals[goalIndex] = {
        ...updatedGoals[goalIndex],
        ...params,
      };

      if (params.done) {
        updatedGoals[goalIndex].tasks = updatedGoals[goalIndex].tasks.map(
          (task) => ({ ...task, done: true })
        );
      }

      setUserData({ ...userData, goals: updatedGoals });
    },
    [userData]
  );

  const remove = useCallback(
    (id) => {
      const updatedGoals = [...userData.goals];
      const goalIndex = updatedGoals.findIndex((goal) => goal.id === id);

      updatedGoals.splice(goalIndex, 1);
      setUserData({ goals: updatedGoals });
    },
    [userData]
  );

  const [formData, setFormData] = useState(null);
  const context = useMemo(
    () => ({
      goals,
      formData,
      setFormData,
      userData,
      setUserData,
      reList,
      update,
      remove,
    }),
    [goals, userData, formData]
  );

  return (
    <GoalsContext.Provider value={context}>{children}</GoalsContext.Provider>
  );
}

GoalsContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
