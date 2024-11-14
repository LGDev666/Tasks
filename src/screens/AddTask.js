import react, { useEffect, useState } from "react";
import { Modal, View, TouchableWithoutFeedback, StyleSheet, Text, TouchableOpacity, TextInput, Platform} from "react-native";
import CommomStyles from "../CommomStyles";

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";


export default props => {
    

    const [task, setTask] = useState({ desc: '', date: new Date(), showDatePicker: false });

    const saveTask = () => {
        props.onSave(task);
    }

    const handleDatePickerChange = (_, selectedDate) => {
        setTask({ ...task, date: selectedDate, showDatePicker: false });
    }

    const renderDatePicker = () => {
        const dateString = moment(task.date).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY');

        return (
            <View>
                <TouchableOpacity onPress={() => setTask({ ...task, showDatePicker: true })}>
                    <Text style={styles.date}>
                        {dateString}
                    </Text>
                </TouchableOpacity>
                {task.showDatePicker && <DateTimePicker 
                    value={task.date}
                    onChange={handleDatePickerChange}
                    mode="datetime"
                />}
            </View>
        )
    }

    return(
        <Modal transparent={true} visible={props.isVisible} onRequestClose={props.onCancel} animationType="slide">

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput style={styles.input} placeholder="Informe a descrição" onChangeText={desk => setTask({ ...task, desc: desk })} value={task.desc}/>
                {renderDatePicker()}
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={props.onCancel}>
                        <Text style={{color: CommomStyles.colors.today}}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => saveTask()}>
                        <Text style={{color: CommomStyles.colors.today}}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}


const styles = StyleSheet.create({

    background: {
        flex: 0.7,
        backgroundColor: 'rgba(0,0,0,0.7)'

    },
    container:{
        backgroundColor: '#fff'

    },
    header:{
        fontFamily: CommomStyles.fontFamily,
        backgroundColor: CommomStyles.colors.today,
        color: CommomStyles.colors.secondary,
        textAlign: 'center',
        padding: 20,
        fontSize: 18
    },
    input:{
        fontFamily: CommomStyles.fontFamily,
        width: '90%',
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: CommomStyles.colors.today,
        borderRadius: 6,
        paddingLeft: 5,
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: CommomStyles.colors.today,
    },
    date:{
        fontFamily: CommomStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    },
})















