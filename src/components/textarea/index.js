import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Container, Left, Text } from './styles';

function TextArea({ left, onChange, ...props }) {
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
      <Text {...defaultProps} {...props} />
    </Container>
  );
}

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  left: PropTypes.element,
};

TextArea.defaultProps = {
  left: null,
};

export default TextArea;
