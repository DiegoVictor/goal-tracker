import React from 'react';
import PropTypes from 'prop-types';
import { IoIosCheckmarkCircle, IoMdRadioButtonOff } from 'react-icons/io';

import { Container } from './styles';

function Task({ data, showDetails, onClick }) {
  return (
    <Container
      data-testid={`task-${data.id}-done`}
      data-value={data.done}
      onClick={onClick}
    >
      {data.done ? (
        <IoIosCheckmarkCircle size={17} key={data.id} />
      ) : (
        <IoMdRadioButtonOff size={17} key={data.id} />
      )}

      {showDetails && <span>{data.title}</span>}
    </Container>
  );
}

Task.propTypes = {
  showDetails: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Task;
