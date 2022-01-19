import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Help({ text, ...props }) {
  return (
    <Container {...props}>
      <span>{text}</span>
    </Container>
  );
}

Help.propTypes = {
  text: PropTypes.string,
};

Help.defaultProps = {
  text: '',
};

export default Help;
