import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import CommomStyles from '../CommomStyles';
const Task = ({ task, onEdit, onDelete, done, toggleDone }) => {
    useEffect(() => {
        task.done = done;
        task.doneAt = task.done ? new Date() : null; 
    }, [done]);

    return (
        <GestureHandlerRootView>
            <Swipeable 
                renderRightActions={() => {
                    return (
                         <View style={styles.rightActions}>
                            <TouchableOpacity style={styles.editButton} onPress={() => onEdit(task)}>
                                <FontAwesome5 name="edit" size={30} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
                                <FontAwesome5 name="trash" size={30} color="white" /> 
                            </TouchableOpacity>
                        </View>
                    );
                }}
            >
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => toggleDone(task.id)}>
                        <View style={styles.checkcontainer}>
                            <Ionicons name={done ? 'checkbox' : 'square-outline'} size={25} color={CommomStyles.colors.today} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.desccontainer}>
                        <Text style={[styles.desc, done ? styles.done : null]}>{task.desc}</Text>
                        <Text style={[styles.date, done ? styles.done : null]}>{task.estimateAt}</Text>
                    </View>
                        </View>
                    </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFF'
    },
    checkcontainer: {
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desccontainer: {
        width: '70%'
    },
    desc: {
        fontSize: 15
    },
    date: {
        fontSize: 12
    },
    rightActions: {
        flexDirection: 'row'
    },
    editButton: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%'
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%'
    },
    done: {
        textDecorationLine: 'line-through'
    }
});
export default Task;
