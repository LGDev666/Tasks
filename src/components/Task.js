
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, Pressable } from "react-native";
import { FaAngleDown,FaCheck } from "react-icons/fa6";
import { Ionicons } from '@expo/vector-icons'; 
import moment from "moment";
import { useEffect, useState } from "react";
import CommomStyles from "../CommomStyles";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

import { FontAwesome5, Entypo } from '@expo/vector-icons'; 
import AsyncStorage from "@react-native-async-storage/async-storage";


export default props => {

    const {task, itemClickCallback, onDelete} = props //ele recebe aqui agora
    const [done, setDone] = useState(task.done)

    const doneOrNotStyle = task.done ? {textDecorationLine: 'line-through', color:'red'} : null
    const date = task.doneAt || task.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMM, [às] h:mm a')

    console.log('redraw do filho');

    
    const tasks = localStorage.getItem('tasks')
    //console.log(JSON.parse(tasks));
    
    const click = () =>{
        //agora o children nao faz nada quando clickado, apenas avisa o parent que vc clickou  com o callback q o proprio parent passou...
      
        itemClickCallback(task) //nao  faz sentido, retorna soh a task que o  cara clikou pra q a lista toda?
        
    }

    //executa esse bloco quando 'done' mudar
    useEffect(_=>{
        task.done = done 
        task.doneAt = task.done ? new Date() : null//atualiznado doneAt
    }, [done]) 

    const id = task.id
    console.log(id)
    
    return(
        <GestureHandlerRootView>
        <Swipeable 
            renderRightActions={() => {
                return(
                    <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(id)}>
                        <FontAwesome5 name="trash" size={30} color="white" />
                    </TouchableOpacity>
                )
            }} 
            renderLeftActions={() => {
                return(
                    <View style={styles.left}>
                        <FontAwesome5 name="trash" size={20} color="white" style={styles.excludeIcon}/>
                        <Text style={styles.excludeText}>Excluir</Text>
                    </View>
                )
            }}
            onSwipeableOpen={(direction) => {
           
                if(direction === 'left' ){
                    props.onDelete && props.onDelete(id)
                    
                }
         }}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() =>click()}>
                    <View style={styles.checkcontainer}>
                        <View style={ task.done ?  styles.done : styles.pending}>
                            <Ionicons name={task.done ? "ios-checkmark-circle" : null} size={28} color="green" style={{paddingLeft: 2}}/>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{task.desc} - </Text>
                    <Text style={[styles.date]}>{doneOrNotStyle != null ? 'Tarefa concluída em ' + formattedDate : 'Tarefa agendada em ' + formattedDate}</Text>
                </View>

            </View>
        </Swipeable>
        </GestureHandlerRootView>
    )



}




const styles = StyleSheet.create({

    container: {
      flexDirection: 'row',
      borderColor: '#aaa',
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: '#fff'
    },
    checkcontainer:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending:{
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: '#555',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'large',
        color: 'white',

    },
    done: {

        borderRadius: 100,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 'large',
        color: 'white',
        // fontWeight: 600
    },
    desc:{
        fontFamily: CommomStyles.fontFamily,
        color: CommomStyles.colors.mainText,
        fontSize: 15,
    },
    date:{
        fontFamily: CommomStyles.fontFamily,
        color: CommomStyles.colors.subText,
        fontSize: 12,
        marginTop: 2,
    },
    right:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    left:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    excludeText:{
        fontFamily: CommomStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        margin: 10,
    },
    excludeIcon:{
        marginLeft: 10,
    },
});










































