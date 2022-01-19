import React from 'react';
import PropTypes from 'prop-types';
import { MdError } from 'react-icons/md';

import { Container } from './styles';

function Error({ text }) {
  return (
    <Container>
      <MdError />
      <span>{text}</span>
    </Container>
  );
}

Error.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Error;
