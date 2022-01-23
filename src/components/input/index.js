import React from 'react';
import PropTypes from 'prop-types';

import { Container, Left, Right, TextInput } from './styles';

function Input({ right, left, onChange, help, ...props }) {
  const defaultProps = {
    onChange,
    onPaste: onChange,
  };
  if (right || left) {
    return (
      <Container>
        {left && <Left>{left}</Left>}
        <TextInput {...defaultProps} {...props} />
        {right && <Right>{right}</Right>}
      </Container>
    );
  }

  return <TextInput {...defaultProps} {...props} />;
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  left: PropTypes.element,
  right: PropTypes.element,
};

Input.defaultProps = {
  left: null,
  right: null,
};

export default Input;
