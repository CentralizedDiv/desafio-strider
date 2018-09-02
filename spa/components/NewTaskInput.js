import React from 'react'; 
import {withStyles }from '@material-ui/core/styles'; 
import TextField from '@material-ui/core/TextField'; 
import Create from '@material-ui/icons/Create'; 
import Grid from '@material-ui/core/Grid'; 
import {connect}from 'react-redux'; 
import {createTask, fetchTasks, fetchTasksFinish }from '../actions/Tasks'; 

const styles = () => ( {
  container: {
    display:'flex', 
    flexWrap:'wrap'
  }, 
  textField: {
    width:'100%'
  }, 
  createIcon: {
    margin:'auto', 
    cursor:'pointer'
  }
}); 

class NewTask extends React.Component {
  state =  {
    newTask:null
  }
  __getMaxId = () =>  {
    var max = 0; 
    this.props.tasks.tasks.forEach(element =>  {
      if (element.id >= max) {
        max = element.id++; 
      }
    }); 
    return max; 
  }
  changeNewTaskLabel = (value) =>  {
    this.setState( {newTask:value})
  }
  createNewTask = () =>  {
    if (this.state.newTask !== null) {
      var nextId = this.__getMaxId(); 
      var newTask =  {
        id:nextId, 
        status:'pending', 
        description:this.state.newTask
      }
      this.props.dispatch(createTask(newTask)).then(() =>  {
        this.props.dispatch(fetchTasks()).then((response) =>  {
          this.props.dispatch(fetchTasksFinish(response.payload.data)); 
        }); 
        this.setState( {newTask:null}); 
        this.inputNewtask.value = null; 
      }); 
    }
  }
  render() {
    const {classes } = this.props; 
    return ( 
      <div className = { classes.container }>
        <Grid container justify = "center" spacing = { 24 } className = { classes.gridContainer }>
         <Grid item xs = { 11 }> 
          <TextField
              label = "Nova tarefa"
              className =  {classes.textField}
              value =  {this.state.newTask}
              inputRef =  {input => this.inputNewtask = input}
              helperText = "O que precisa ser feito?"
              onChange =  {e => this.changeNewTaskLabel(e.target.value)}
            />
          </Grid>
          <Grid item xs = { 1 } className = { classes.createIcon }>
            <Create color = { this.state.newTask === null ? 'disabled':'primary' } onClick =  {(e) =>  {this.createNewTask()}}/>
          </Grid>
        </Grid>
      </div>
    ); 
  }
}; 

export default connect(state => state)(withStyles(styles)(NewTask)); 
