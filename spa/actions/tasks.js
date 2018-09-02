import axios from 'axios'; 

export const FETCH_TASKS = 'FETCH_TASKS'; 
export const FETCH_TASKS_FINISH = 'FETCH_TASKS_FINISH'; 
export const CREATE_TASK = 'CREATE_TASK'; 
export const DELETE_TASK = 'DELETE_TASK'; 

const ROOT_URL = 'http://localhost:8080';

export function fetchTasks() {
  const request = axios( {
    method:'get', 
    url: `${ROOT_URL}/task`, 
    headers:[]
  }); 

  return {
    type:FETCH_TASKS, 
    payload:request
  }; 
}

export function fetchTasksFinish(tasks) {
  return {
    type:FETCH_TASKS_FINISH, 
    payload:tasks
  }; 
}

export function createTask(newTask) {
  const request = axios( {
    method:'post', 
    data:newTask, 
    url: `${ROOT_URL}/task`
  }); 

  return {
    type:CREATE_TASK, 
    payload:request
  }; 
}

export function deleteTask(id) {
  const request = axios( {
    method:'delete', 
    url: `${ROOT_URL}/task/${id}`
  }); 
  return {
    type:DELETE_TASK, 
    payload:request
  }; 
}
