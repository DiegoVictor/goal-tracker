import React from 'react';
import PropTypes from 'prop-types';

import { Orange } from 'styles/commons';
import { Subtitle } from 'components/subtitle/styles';

function Welcome({ children }) {
  return (
    <div>
      <h3>
        <Orange>Achieve your Goals</Orange>
      </h3>
      <Subtitle>Like a fox 🦊</Subtitle>

      {children}
    </div>
  );
}

Welcome.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Welcome;
