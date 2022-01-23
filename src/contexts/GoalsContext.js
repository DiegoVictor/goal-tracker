import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
