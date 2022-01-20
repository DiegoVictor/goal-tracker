import { GoalsContext } from '../../../../contexts/GoalsContext';
function Goal({ id, title, description, deadline, completedAt, tasks, done }) {
  return (
    <GoalsContext.Consumer>
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
