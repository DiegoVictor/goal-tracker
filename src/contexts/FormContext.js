import propTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

export const INITIAL_GOAL_STATE = {
  title: '',
  description: '',
  deadline: '',
  tasks: [],
  done: false,
  completedAt: '',
};

export const FormContext = React.createContext({
  formData: {},
});

export function FormContextProvider({ children }) {
  const [formData, setFormData] = useState(null);

  const context = useMemo(() => ({ formData, setFormData }), [formData]);

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
}

FormContextProvider.propTypes = {
  children: propTypes.element.isRequired,
};
