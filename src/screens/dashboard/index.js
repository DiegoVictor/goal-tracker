import React, { useCallback, useContext } from 'react';

import { GoalsContext } from 'contexts/GoalsContext';

import Modal from './components/modal';
import Header from './components/header';
import Goals from './components/goals';
import Form from './components/form';
import { Container, PreventScroll } from './styles';

export default function Dashboard() {
  const { userData, setUserData, setFormData } = useContext(GoalsContext);
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
        data.id = Date.now();
        items.push(data);
      }

      setUserData({
        ...userData,
        goals: items,
      });
      setFormData(null);
    },
    [userData]
  );

  return (
    <GoalsContext.Consumer>
      {({ formData }) => (
        <Container>
          <Header />

          {formData && (
            <Modal>
              <PreventScroll />
              <Form
                data={formData}
                cancel={() => setFormData(null)}
                onSubmit={handleSubmit}
              />
            </Modal>
          )}

          <Goals />
        </Container>
      )}
    </GoalsContext.Consumer>
  );
}
