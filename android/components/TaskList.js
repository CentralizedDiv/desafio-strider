import React from 'react'; 
import Task from './Task.js'; 
import { Text, ActivityIndicator } from 'react-native';
import { List, View } from 'react-native-elements'

class TaskList extends React.Component {
  state = {
    tasks:null
  }

  componentWillReceiveProps() {
    fetch('http://192.168.0.110:8080/task/pending', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({tasks:responseJson})
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  returnTasks = (tasks) =>  {
    if(tasks === null) {
      return (
        <ActivityIndicator size="large" color="#000" style={{marginTop:50}}/>
            );
    }else if(tasks.length === 0) {
      return <Text style={{marginVertical:50, marginLeft:100, fontSize:30}}>Sem Tarefas</Text>
    } else {
      tasks.sort((a, b) => {
        if(a.status === "complete") {
          return 1;
        }
        if(a.status === "pending") {
          return -1;
        }
      });
      return tasks.map((task) =>  {
        return ( 
          <Task key={task.id} task =  {task} openCamera={this.props.openCamera} finishTask={this.props.finishTask} sending={this.props.sending}/>
        ); 
      });
    }    
  }

  render() {
    return ( 
      <List style={{marginTop:0}}>
        {
          this.returnTasks(this.state.tasks)
        } 
      </List>
    ); 
  }
}

export default TaskList; 
