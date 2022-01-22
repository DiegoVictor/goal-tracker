import React from 'react';
import PropTypes from 'prop-types';

import { Container, Left, Text } from './styles';

function TextArea({ left, onChange, help, ...props }) {
  const defaultProps = {
    onChange,
    onPaste: onChange,
  };
  if (left) {
    return (
      <>
        <Container>
          {left && <Left>{left}</Left>}
          <Text {...defaultProps} {...props} />
        </Container>
        {help}
      </>
    );
  }

  return <Text {...defaultProps} {...props} />;
}

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  left: PropTypes.element,
  help: PropTypes.element,
};

TextArea.defaultProps = {
  left: null,
  help: null,
};

export default TextArea;
