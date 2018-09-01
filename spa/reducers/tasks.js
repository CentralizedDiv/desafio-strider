import {
	FETCH_TASKS, CREATE_TASK, DELETE_TASK, FETCH_TASKS_FINISH
} from '../actions/tasks';


	const INITIAL_STATE = { tasks: [], newTask: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

  case FETCH_TASKS:
    return { ...state, tasks: [] }; 

  case FETCH_TASKS_FINISH:
  	return { ...state, tasks: action.payload }; 
  
  case CREATE_TASK:
  	return {...state, newTask: null}
  
  case DELETE_TASK:
   	return {...state}
  
  default:
    return state;
  }
}