
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback } from "react-native";
import { FaAngleDown,FaCheck } from "react-icons/fa6";
import moment from "moment";

import { useEffect, useState } from "react";

import CommomStyles from "../CommomStyles";

export default props => {


    const {task, callback} = props
    const [done, setDone] = useState(task.done)

    const doneOrNotStyle = done ? {textDecorationLine: 'line-through', color:'red', mod: true} : null
    const date = task.doneAt || task.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('dddd, D [de] MMMM, [às] h:mm a')


    const click = () =>{
        //aqui soh muda a 'view'
        setDone(!done)

        //outro exemploi, vou fazer algo importante, vou mudar a task

        // task.done = false
        //viu? nada dispara o useEffect, por que o componente n foi atualizado
        //quem dispara atualizacoes no comp geralmente eh o useState e esses hooks, dae pra vc no começo vai ser tentantiva e erro
        //eu basicamente nunca uso useEffect sem dependencia, por que n tem muitas situacoes que vc precisa fazer isso
        //mas se vc precisar executar algo, sempre que o componente mudar, n importa o que mudar, vc pode usar ele
    }

    //executa esse bloco quando 'done' mudar
    useEffect(_=>{
        // aqui muda o objeto de fato
        //isso foi soh um exemplo do useEffect, ele permite 'escutar' uma variavel, sempre que ela mudar, executa algo..
        task.done = done //facil nao?
        task.doneAt = task.done ? new Date() : null//atualiznado doneAt
    }, [done]) // entao aqui pode ter tipo [done, doneAt ] e ele vai "escutar" as duas? exato. e tem mais uma variacao

    // useEffect(_=>{
    //     console.log('use Effect sem  nada')
    // },[]) //aqui eh sem depdenndecia, mas com array vazaio

    //nesse caso, ele excuta apenas uma vez, na criacao de tudo
    //ou seja, quero executar uma funcao apenas uma vez na criacao da pagina = useEffect com [] de depdendncia
    //certo?  certor é nois



    //console.log(task)

    return(
        <View style={styles.container}>
            <div onPress={() =>click()}>
                <View style={styles.checkcontainer}>
                    <View style={ done ?  styles.done : styles.pending}>
                        <FaCheck />
                    </View>

                </View>
            </div>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{task.desc} - </Text>
                <Text style={[styles.date]}>{doneOrNotStyle != null ? 'Concluído em ' + formattedDate : 'Agendado em ' + formattedDate}</Text>
            </View>

        </View>
    )



}




const styles = StyleSheet.create({

    container: {
      flexDirection: 'row',
      borderColor: '#aaa',
      borderBottomWidth: 1,
      alignItems: 'center',
      paddingVertical: 10,
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
        height: 25,
        width: 25,
        borderRadius: '100%',
        backgroundColor: 'green',
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
    }
});










































