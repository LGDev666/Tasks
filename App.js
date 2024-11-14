import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import React from 'react';

import todayImage from './assets/imgs/today.jpg'

import { FaEye ,FaEyeSlash, FaPlus, Fa0 } from "react-icons/fa6";

import moment from 'moment/moment';
import CommomStyles from './src/CommomStyles';
import Task from './src/components/Task';

import { useState, setState, useEffect } from 'react';
import ListItem from './src/components/ListItem';
import AddTask from './src/screens/AddTask';

import { FontAwesome, Entypo } from '@expo/vector-icons'; 


import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState =  
{
  id: Math.random(),
  desc: '',
  estimateAt: null,
  doneAt: null,
  done:false
}

export default function App() {

  const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
  
  const [showDoneTasks, setShowDoneTasks] = useState(false)

  const [addTask, setaddTask]  = useState([
    {
      showAddTasks: false,
    },
  ])

  const [tasks, setTasks] = useState([])


  const addTasksList = newTask => {
    //aqui ta meio errado, vc  tem  que pegar uma lista de tasks atual  e dar  push nela
    //no ccaso vai ser  alista tasks
    console.log(newTask);

    //testando pra ver se a descrição tem algo
    if(!newTask.desc || !newTask.desc.trim()){
      Alert.alert('Dados Invalidos!', 'Descrição não informada!')
      return // bom return
    }

    //aqui vc ja validou, task passou
    
    const newTasks = [...tasks]

    // newTasks.push({  //push, eh array
    //   id: Math.random(), //interessante a ideia
    //   desc: newTask.desc,
    //   estimateAt: newTask.date,
    //   doneAt: null,
    //   done: false
    // })

    //faz desse  jeito

    newTasks.push({id:Math.random(),  done:false, ...newTask}) //assim  eh melhgor, ah nao ser  que tenha algo dentro  do  task q  vc n queira de jeito algum

    setTasks(newTasks)  //ah  task  eh state,vdd

    localStorage.setItem('tasks', JSON.stringify(newTasks)) //isso é um array
  }


  const showDoneTasksHandler = _ =>{
    setShowDoneTasks(!showDoneTasks) 
    //só to invertendo aqui, se tiver mostrando, pare, se nao, mostre. E vou usar essa var la no meu if
  }

 

  //vamos passar isso aqui la pra baixo (pro filho)
  //aqui eh o callback, ele vai fazer o done ficar 'ao contrario' (toogle)
  const itemClickCallback = item =>{


    // const toogle = JSON.parse(item) //nao preicsa
    
    // console.log('callback2 ' + toogle) //obj
    item.done = !item.done
    // toogle.done = !toogle.done //toggle no done ok, ojb
    
    //procurando o item correspondente pelo id e alterando para o novo item recebido e modificado
    tasks.map(x=> {
      if(x.id === item.id){
        x = item
      }
      return x
    }) //ok

    setTasks([...tasks])//maravilha


 
  }

  
  const deleteTask = id => {

    const tasks = JSON.parse(localStorage.getItem('tasks'))

    console.log('id do delete ' + id)
    
    const index = tasks.findIndex(task => task.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTasks(tasks);
    console.log('tasks ' + tasks)
 }

  useEffect(_=>{

    let list= localStorage.getItem('tasks')

    if(list){
      setTasks(JSON.parse(list))
    }
//agora sohprecisar ter  como excluir neh
  },[])//fazer um useEffect que funciona apenas uma vez, e que verifica se tem localStorage salvo



  return (

    <View style={styles.container}>
      {addTask.showAddTasks ? <AddTask isVisible={addTask.showAddTasks} 
      onCancel={() => setaddTask({showAddTasks: false})} onSave={addTasksList}/> : null}
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={showDoneTasksHandler}>
            {showDoneTasks ? <FontAwesome name="eye" size={30} color="white" /> : <FontAwesome name="eye-slash" size={30} color="white" style={styles.icon}/>}
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subTitle}>{today}</Text>
        </View>
      </ImageBackground>
      
      <View style={styles.tasklist}>
        { 
        tasks.map((task, index)=>( //aqui vc precisa  usar
          

          showDoneTasks ? //if showDone
            //mostrar apenas as dones
            (task.done) && <Task task={task} key={index} itemClickCallback={itemClickCallback} onDelete={deleteTask}></Task>
            : //else
            //mostrar apenas as 'nao dones'
            (!task.done) && <Task task={task} key={index} itemClickCallback={itemClickCallback} onDelete={deleteTask}></Task>

        ))}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setaddTask({showAddTasks: true})} >
        <Entypo name="plus" size={30} color="white" />
      </TouchableOpacity>
     
    </View>
    
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

  },

  background:{
    flex: 3,
  },

  tasklist: {
    flex: 7,
  },

  titleBar:{
    flex: 1,
    justifyContent: 'flex-end',
  },

  title:{
    fontFamily: CommomStyles.fontFamily,
    color: CommomStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  
  subTitle:{
    fontFamily: CommomStyles.fontFamily,
    color: CommomStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },

  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: 45

  },

  icon:{
    color: CommomStyles.colors.secondary,
    width: 30,
    height: 30,
  },

  addButton:{
    position: 'absolute',
    right: 30,
    bottom: 30,
    height: 50,
    width: 50, 
    borderRadius: 25, 
    backgroundColor: CommomStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
