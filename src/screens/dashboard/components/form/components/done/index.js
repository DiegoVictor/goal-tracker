import React from 'react';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Done({ value, onChange }) {
  return (
    <Container
      onClick={() => onChange(!value)}
      data-testid="done"
      data-value={value}
    >
      <div>
        {value ? (
          <BsToggleOn size={30} color="#17d076" />
        ) : (
          <BsToggleOff size={30} />
        )}
      </div>
      <span>DONE</span>
    </Container>
  );
}

Done.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Done;
