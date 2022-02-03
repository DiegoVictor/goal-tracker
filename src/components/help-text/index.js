import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function HelpText({ text, ...props }) {
  return (
    <Container {...props}>
      <span>{text}</span>
    </Container>
  );
}

HelpText.propTypes = {
  text: PropTypes.string,
};

HelpText.defaultProps = {
  text: '',
};

export default HelpText;
