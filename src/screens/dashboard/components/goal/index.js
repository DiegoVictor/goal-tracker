import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  BsFillCalendar2CheckFill,
  BsFillCalendarWeekFill,
  BsFillCalendarXFill,
} from 'react-icons/bs';
import {
  IoIosCheckbox,
  IoIosCheckmarkCircle,
  IoMdRadioButtonOff,
  IoMdSquareOutline,
  IoIosArrowDown,
} from 'react-icons/io';
import { format } from 'date-fns';

import {
  Container,
  Description,
  Events,
  Footer,
  SeeMoreButton,
  Task,
  Tasks,
} from './styles';
import { GoalsContext } from '../../../../contexts/GoalsContext';

function Goal({ id, title, description, deadline, completedAt, tasks, done }) {
  const [showTasksDetails, setShowTasksDetails] = useState(false);

  return (
    <GoalsContext.Consumer>
      {({ updateGoalById }) => (
        <Container done={done}>
          <h4>{title}</h4>
          <Description>{description}</Description>

          {tasks?.length > 0 && (
            <Tasks showDetails={showTasksDetails}>
              <div>
                {tasks.map((task) => (
                  <Task
                    title={task.title}
                    key={task.id}
                    onClick={() => {
                      task.done = !task.done;
                      updateGoalById(id, {
                        tasks,
                      });
                    }}
                  >
                    {task.done ? (
                      <IoIosCheckmarkCircle size={17} key={task.id} />
                    ) : (
                      <IoMdRadioButtonOff size={17} key={task.id} />
                    )}

                    {showTasksDetails && <span>{task.title}</span>}
                  </Task>
                ))}
                <SeeMoreButton open={showTasksDetails}>
                  <IoIosArrowDown
                    size={15}
                    onClick={() => setShowTasksDetails(!showTasksDetails)}
                  />
                </SeeMoreButton>
              </div>
            </Tasks>
          )}

          <Events done={done}>
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
                  {new Date(deadline) < new Date(completedAt) ? (
                    <BsFillCalendarXFill />
                  ) : (
                    <BsFillCalendar2CheckFill size={15} />
                  )}
                  <span>{format(new Date(completedAt), 'do, MMM yy')}</span>
                </div>
              </div>
            )}
          </Events>

          <Footer>
            <button
              type="button"
              onClick={() =>
                updateGoalById(id, {
                  done: !done,
                  completedAt: !done ? new Date() : null,
                })
              }
            >
              {done ? (
                <IoIosCheckbox size={24} />
              ) : (
                <IoMdSquareOutline size={24} />
              )}
            </button>
          </Footer>
        </Container>
      )}
    </GoalsContext.Consumer>
  );
}

Goal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  completedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(Date),
  ]),
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
      completedAt: PropTypes.string,
    })
  ),
};

Goal.defaultProps = {
  completedAt: '',
  tasks: [],
};

export default Goal;
