import React from 'react'; 
import {withStyles }from '@material-ui/core/styles'; 
import ExpansionPanel from '@material-ui/core/ExpansionPanel'; 
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'; 
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'; 
import Typography from '@material-ui/core/Typography'; 
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'; 
import Delete from '@material-ui/icons/Delete'; 
import styles from '../styles/task.js'; 
import {deleteTask, fetchTasks, fetchTasksFinish }from '../actions/Tasks'; 
import {connect}from 'react-redux'; 

class Task extends React.Component {
  deleteTask = (task) =>  {
    this.props.dispatch(deleteTask(task.id)).then(() =>  {
      this.props.dispatch(fetchTasks()).then((response) =>  {
         this.props.dispatch(fetchTasksFinish(response.payload.data)); 
         this.forceUpdate();
      }); 
    }); 
  }

  render() {
    const {classes, task } = this.props; 
    return ( 
      <ExpansionPanel className =  { classes.task } expanded =  {task.status !== 'complete' ? false : undefined } >  
        <ExpansionPanelSummary className = {task.status == 'complete' ? classes.complete : ''} expandIcon = {task.status === 'complete'? <ExpandMoreIcon/> : '' } >  
          <Delete className =  {classes.deleteIcon}fontSize = 'inherit' onClick =  {(e) =>  {this.deleteTask(task)}}/>  
          <Typography> 
             {task.description} 
          </Typography>  
        </ExpansionPanelSummary>  
        <ExpansionPanelDetails>
          <img className =  {classes.imageComplete}src =  {task.url} ></img >  
        </ExpansionPanelDetails>  
      </ExpansionPanel> 
    ); 
  }
}

export default connect(state => state)(withStyles(styles)(Task)); 
