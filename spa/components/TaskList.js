import React from 'react'; 
import {withStyles }from '@material-ui/core/styles'; 
import {connect}from 'react-redux'; 
import Task from './Task.js'; 
import styles from '../styles/task.js'; 

class TaskList extends React.Component {
  
  componentWillMount() {
      if (this.props.status === "all")
        this.props.fetchTasks(); 
  }
  
  returnTasks = (status, tasks) =>  {
    tasks.sort((a, b) => {
      if(a.status === "complete") {
        return 1;
      }
      if(a.status === "pending") {
        return -1;
      }
    });
    return tasks.map((task) =>  {
      if (task.status === status || status === 'all') {
        return ( 
          <Task task =  {task}/>
        ); 
      }
    }); 
  }

  render() {
    const {classes, status, tasks } = this.props; 
    return ( 
      <div className =  {classes.root}>
        {
          this.returnTasks(status, tasks.tasks)
        } 
      </div>
    ); 
  }
}

export default connect(state => state)(withStyles(styles)(TaskList)); 
