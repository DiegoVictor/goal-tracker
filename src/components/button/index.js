import React from 'react';
import PropTypes from 'prop-types';

import * as Style from './styles';

function Button({ children, ...props }) {
  return <Style.Button {...props}>{children}</Style.Button>;
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};

export default Button;
