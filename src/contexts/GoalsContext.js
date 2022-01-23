import React from 'react';
export const INITIAL_GOAL_STATE = {
  title: '',
  description: '',
  deadline: '',
  tasks: [],
  done: false,
  completedAt: '',
};

export const GoalsContext = React.createContext({
  goals: [],
  reList: () => {},
  updateGoalById: () => {},
  deleteGoalById: () => {},
  setFormData: () => {},
});
