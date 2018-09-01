import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Task from './Task.js';
import styles from '../styles/task.js';

class TaskList extends React.Component {
  tasks = [
    {
      label:'fazer x',
      status: 'pending'
    },
    {
      label:'fazer y',
      status: 'pending'
    },
    {
      label:'fazer z',
      status: 'complete',
      url:'../default.png'
    }
  ];
  state = {
    currentStatus: 'all',
  };
  
  returnTasks = (classes, status) => {
    var buildedTasks = [];
    this.tasks.forEach((task) => {
      if(task.status === status || status === 'all') {
        buildedTasks.push(
          <Task task={task}/>
        )
      }
    });
    return buildedTasks;
  } 

  render() {
    const { classes, status } = this.props;
    return (
      <div className={classes.root}>
        {this.returnTasks(classes, status)}
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);
