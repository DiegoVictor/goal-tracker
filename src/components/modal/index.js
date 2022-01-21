import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Modal({ children }) {
  return (
    <Container>
      <div>{children}</div>
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Modal;
