import React from 'react';
import { format } from 'date-fns';
import {
  BsFillCalendar2CheckFill,
  BsFillCalendarWeekFill,
  BsFillCalendarXFill,
} from 'react-icons/bs';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Timeline({ done, deadline, completedAt }) {
  return (
    <Container done={done}>
      <div>
        <span>Deadline</span>
        <div>
          <BsFillCalendarWeekFill size={15} />
          <span>{format(new Date(deadline), 'do, MMM yy')}</span>
        </div>
      </div>

      {completedAt && (
        <div>
          <span>Completed At</span>
          <div>
            <BsFillCalendar2CheckFill size={15} />

            <span>{format(new Date(completedAt), 'do, MMM yy')}</span>
          </div>
        </div>
      )}
    </Container>
  );
}

Timeline.propTypes = {
  done: PropTypes.bool.isRequired,
  deadline: PropTypes.string.isRequired,
  completedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(Date),
  ]),
};

Timeline.defaultProps = {
  completedAt: '',
};

export default Timeline;
