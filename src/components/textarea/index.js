import React from 'react';
import PropTypes from 'prop-types';

import { Container, Left, Text } from './styles';

function TextArea({ left, onChange, ...props }) {
function TextArea({ left, onChange, help, ...props }) {
  const defaultProps = {
    onChange,
    onPaste: onChange,
  };
  if (left) {
    return (
      <Container>
        {left && <Left>{left}</Left>}
        <Text {...defaultProps} {...props} />
      </Container>
    );
  }

  return <Text {...defaultProps} {...props} />;
}

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  left: PropTypes.element,
};

TextArea.defaultProps = {
  left: null,
};

export default TextArea;
