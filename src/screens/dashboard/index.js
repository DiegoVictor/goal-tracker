import React from 'react';

import { FormContextProvider } from 'contexts/FormContext';

import Header from './components/header';
import Goals from './components/goals';
import Form from './components/form';
import { Container } from './styles';

export default function Dashboard() {
  return (
    <FormContextProvider>
      <Container>
        <Header />
        <Form />
        <Goals />
      </Container>
    </FormContextProvider>
  );
}
