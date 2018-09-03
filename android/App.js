import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements'
import TaskList from './components/TaskList.js'; 
import { Camera, Permissions } from 'expo';
import { Alert } from 'react-native';

export default class App extends React.Component {
  state = {
    cameraOpen: false,
    hasCameraPermission: 'granted',
    type: Camera.Constants.Type.back,
    sending:false
  }

  finishTask = (id) => {
    this.setState({sending:true});
    return fetch('http://192.168.0.110:8080/task/'+id, {
      method:'put',
      body:JSON.stringify({status:"complete"}),
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    }).then((response) => {      
      this.setState({sending:false});
      this.forceUpdate();
    });  
  }

  componentDidMount() {
    this.interval = setInterval(() => {this.forceUpdate()}, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  snap = async () => {
    let id = this.state.taskSelectingImage;
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.setState({cameraOpen:false, sending:true});
      const data = new FormData();
      data.append("file", {
        uri: photo.uri,
        type:"image/jpeg",
        name:"completeImage.jpg"
      });
      return fetch('http://192.168.0.110:8080/uploadImage/'+id, {
        method:'post',
        body:data,
        header: {
          'content-type': 'multipart/form-data',
        }
      }).then((response) => {
        this.setState({sending:false});
        this.finishTask(id);
      });
    }
  };

  async getAccess() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  openCamera = (id) => {
    this.setState({cameraOpen:true, taskSelectingImage: id});
  }

  render() {
    if(this.state.cameraOpen === true) {
      if(this.state.hasCameraPermission === 'granted') {
        return (
          <View style={{ flex: 1 }}>
            <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type} ratio="16:9">
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 0.9,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.snap()
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Tirar foto{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      } else {
        this.getAccess().then(() => {
          this.setState({cameraOpen:true});  
          this.forceUpdate();
        });
        this.setState({cameraOpen:false});
        this.forceUpdate();
      } 
    } else{
      return (
        <View>
          <Header 
            leftComponent={{text:''}}
            centerComponent={{ text: 'Minhas Tarefas', style: { color: '#fff' } }}
            rightComponent={{text:''}}
            backgroundColor="#000"
            outerContainerStyles={{marginBottom:-23}}
          />
          <TaskList openCamera={this.openCamera} finishTask={this.finishTask} sending={this.state.sending}/>
        </View>
      );
    }
  }
}