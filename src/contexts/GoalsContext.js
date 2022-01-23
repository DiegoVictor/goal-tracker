import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

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
  return (
    <GoalsContext.Provider value={context}>{children}</GoalsContext.Provider>
  );
}

GoalsContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
