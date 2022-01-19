import React from 'react';

export const GoalsContext = React.createContext({
  goals: [],
  reList: () => {},
  updateGoalById: () => {},
  deleteGoalById: () => {},
  setFormData: () => {},
});
