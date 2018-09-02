import {
	FETCH_TASKS, CREATE_TASK, DELETE_TASK, FETCH_TASKS_FINISH
}from '../actions/tasks'; 


	const INITIAL_STATE =  {tasks:[] }; 

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

  case FETCH_TASKS:
    return {...state }; 

  case FETCH_TASKS_FINISH:
  	return {...state, tasks:action.payload }; 
  
  case CREATE_TASK:
  	return {...state }
  
  case DELETE_TASK:
   	return {...state}
  
  default:
    return state; 
  }
}