import { connect } from 'react-redux'
import { fetchTasks, fetchTasksFinish } from '../actions/Tasks';
import TasksList from '../components/TaskList';


const mapStateToProps = (state) => {
  return state.tasks;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTasks: () => {
      dispatch(fetchTasks()).then((response) => {
            dispatch(fetchTasksFinish(response.payload.data));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);