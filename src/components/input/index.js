import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Container, Left, Right, TextInput } from './styles';

function Input({ right, left, onChange, ...props }) {
  const defaultProps = useMemo(
    () => ({
      onChange,
      onPaste: onChange,
    }),
    [onChange]
  );

  return (
    <Container>
      {left && <Left>{left}</Left>}
      <TextInput {...defaultProps} {...props} />
      {right && <Right>{right}</Right>}
    </Container>
  );
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
