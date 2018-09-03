import { ListItem } from 'react-native-elements';
import  React from 'react'; 
import  { Alert, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'; 
import Modal from 'react-native-modal'; 

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    display:'flex',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    flex:1
  }
});

export default class Task extends React.Component {
  completeTask = (id) => {
    Alert.alert('Finalizar Tarefa!', 'Você deseja enviar uma imagem?',
    [
      {
        text: 'Não', onPress: () => this.props.finishTask(id)
      },
      {
        text: 'Sim', onPress: () => this.props.openCamera(id)
      }
    ]
    )   
  }

  render() {
    return (
      <View>
        <Modal isVisible={this.props.sending}>
          <View style={styles.modalContent}>
            <View style={{flex:0.5, alignSelf:'flex-start'}}>
              <Text style={{fontWeight:'bold', justifyContent:'flex-start', fontSize:20}}>Aguarde...</Text>
              <Text>Enviando resolução de tarefa:</Text>
              <Text>"{this.props.task.description}"</Text>
            </View>
            <ActivityIndicator size="large" color="#000" style={{alignSelf:'flex-end', flex:0.4}}></ActivityIndicator>
          </View>
        </Modal>
        <ListItem
          rightTitleContainerStyle={{padding:1}}
          hideChevron
          rightTitle="Fazer"
          onPressRightContainer={()=> {this.completeTask(this.props.task.id)}}
          rightTitleStyle={{paddingVertical:5, paddingLeft:15,paddingRight:13, color:"#4f4f4f", backgroundColor:"#c6c6c6", fontSize:16, borderRadius:5}}
          title={this.props.task.description}
          titleStyle={{fontSize:25}}
        />
      </View>
    );
  }
}

