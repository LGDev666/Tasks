import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';
import CommomStyles from './src/CommomStyles';
import Task from './src/components/Task';
import AddTask from './src/screens/AddTask';
import EditTask from './src/screens/EditTask';  // Importando o EditTask
import { FontAwesome, Entypo } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState =  {
  id: Math.random(),
  desc: '',
  estimateAt: null,
  doneAt: null,
  done: false
}

export default function App() {

  const today = moment().locale('pt-br').format('dddd, D [de] MMMM');
  
  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [addTask, setaddTask] = useState([{ showAddTasks: false }]);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // Estado para tarefa selecionada para edição
  const [showEditModal, setShowEditModal] = useState(false); // Estado para controle do modal de edição

  const addTasksList = newTask => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Invalidos!', 'Descrição não informada!');
      return; 
    }

    const newTasks = [...tasks, { id: Math.random(), done: false, ...newTask }];
    setTasks(newTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(newTasks)); // Usando AsyncStorage para salvar as tarefas
  };

  const showDoneTasksHandler = _ => setShowDoneTasks(!showDoneTasks);
//toggledone ao inves de itemcallback melhorar funcionalidade
 const toggleDone = taskId => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
  };

  const onEdit = task => {
    setSelectedTask(task); // Passando a tarefa completa para edição
    setShowEditModal(true); // Exibe o modal de edição
  };

  const onSaveEditedTask = (editedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === editedTask.id ? editedTask : task // Atualiza a tarefa com a edição
    );
    setTasks(updatedTasks); // Atualize o estado com a nova lista de tarefas
    AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Salve as tarefas no AsyncStorage
    setShowEditModal(false); // Fecha o modal após salvar
  };

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      {/* Exibe o modal de adicionar tarefa */}
      {addTask.showAddTasks && <AddTask isVisible={addTask.showAddTasks} onCancel={() => setaddTask({ showAddTasks: false })} onSave={addTasksList} />}

      {/* Exibe o modal de edição, se showEditModal for true */}
      {showEditModal && <EditTask task={selectedTask} onCancel={() => setShowEditModal(false)} onSave={onSaveEditedTask} />}

      <ImageBackground source={require('./assets/imgs/today.jpg')} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={showDoneTasksHandler}>
            {showDoneTasks ? <FontAwesome name="eye" size={30} color="white" /> : <FontAwesome name="eye-slash" size={30} color="white" style={styles.icon}/> }
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>

      <View style={styles.tasklist}>
        {tasks.map((task, index) => (
          showDoneTasks 
          
            ? (task.done && <Task key={index} task={task} toggleDone={toggleDone} onDelete={deleteTask} onEdit={onEdit} />)
            : (!task.done && <Task key={index} task={task} toggleDone={toggleDone} onDelete={deleteTask} onEdit={onEdit} />)
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setaddTask({ showAddTasks: true })}>
        <Entypo name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 3 },
  tasklist: { flex: 7 },
  titleBar: { flex: 1, justifyContent: 'flex-end' },
  title: { fontFamily: CommomStyles.fontFamily, color: CommomStyles.colors.secondary, fontSize: 50, marginLeft: 20, marginBottom: 20 },
  subTitle: { fontFamily: CommomStyles.fontFamily, color: CommomStyles.colors.secondary, fontSize: 20, marginLeft: 20, marginBottom: 30 },
  iconBar: { flexDirection: 'row', marginHorizontal: 20, justifyContent: 'flex-end', marginTop: 45 },
  icon: { color: CommomStyles.colors.secondary, width: 30, height: 30 },
  addButton: { position: 'absolute', right: 30, bottom: 30, height: 50, width: 50, borderRadius: 25, backgroundColor: CommomStyles.colors.today, justifyContent: 'center', alignItems: 'center' }
});
