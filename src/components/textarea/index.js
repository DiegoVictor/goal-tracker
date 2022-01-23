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
