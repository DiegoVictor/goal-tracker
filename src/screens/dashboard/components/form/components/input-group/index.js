import React from 'react';
import PropTypes from 'prop-types';

import Error from 'components/error';
import Input from 'components/input';
import TextArea from 'components/textarea';

import { Container, Icon } from './styles';

function InputGroup({
  title,
  placeholder,
  value,
  left: Left,
  onChange,
  error,
  area,
  ...props
}) {
  return (
    <Container>
      <span>{title}</span>
      {area ? (
        <TextArea
          placeholder={placeholder}
          left={
            <Icon align="top">
              <Left color="#ccc" size={24} />
            </Icon>
          }
          value={value}
          onChange={(event) => onChange(event.target.value)}
          {...props}
        />
      ) : (
        <Input
          type="text"
          placeholder={placeholder}
          left={
            <Icon>
              <Left color="#ccc" size={24} />
            </Icon>
          }
          value={value}
          onChange={(event) => onChange(event.target.value)}
          {...props}
        />
      )}
      {error && <Error text={error} />}
    </Container>
  );
}

InputGroup.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  left: PropTypes.func.isRequired,
  error: PropTypes.string,
  area: PropTypes.bool,
};

InputGroup.defaultProps = {
  error: null,
  placeholder: '',
  area: false,
};

export default InputGroup;
