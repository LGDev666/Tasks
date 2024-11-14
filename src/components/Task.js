import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import moment from "moment";
import { useEffect, useState } from "react";
import CommomStyles from "../CommomStyles";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default (props) => {
    const { task, itemClickCallback, onDelete, onEdit } = props; // Agora temos onEdit
    const [done, setDone] = useState(task.done);

    const doneOrNotStyle = task.done ? { textDecorationLine: 'line-through', color: 'red' } : null;
    const date = task.doneAt || task.estimateAt;
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMM, [às] h:mm a');

    const click = () => {
        itemClickCallback(task);
    };

    // Função para excluir a tarefa
    const handleDelete = () => {
        onDelete(task.id); // Passa o id da tarefa para a função de exclusão
    };

    // Função para editar a tarefa
    const handleEdit = () => {
        onEdit(task); // Chama a função para editar a tarefa
    };

    useEffect(() => {
        task.done = done;
        task.doneAt = task.done ? new Date() : null; // atualizando doneAt
    }, [done]);

    return (
        <GestureHandlerRootView>
            <Swipeable 
                renderRightActions={() => {
                    return (
                        <TouchableOpacity style={styles.right} onPress={handleDelete}> {/* Muda a ação para exclusão */}
                            <FontAwesome5 name="trash" size={30} color="white" /> {/* Troca para ícone de exclusão */}
                        </TouchableOpacity>
                    );
                }}
            >
                <TouchableOpacity onPress={handleEdit}> {/* Muda o comportamento do onPress para editar */}
                    <View style={styles.container}>
                        <TouchableWithoutFeedback onPress={click}>
                            <View style={styles.checkcontainer}>
                                <Ionicons name={done ? 'checkbox' : 'square-outline'} size={25} color={CommomStyles.colors.today} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.desccontainer}>
                            <Text style={[styles.desc, doneOrNotStyle]}>{task.desc}</Text>
                            <Text style={[styles.date, doneOrNotStyle]}>{formattedDate}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    padding: 10, 
    alignItems: 'center', // Centraliza todos os itens verticalmente
    justifyContent: 'center', // Garante que todos os itens estejam centralizados horizontalmente
    borderBottomWidth: 1, // Adiciona uma linha inferior
    borderBottomColor: CommomStyles.colors.today, // Cor da linha igual à da checkbox
  },
  checkcontainer: { 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  desccontainer: { 
    flex: 1, 
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center' // Centraliza o conteúdo horizontalmente
  },
  desc: { 
    fontSize: 18, 
    textAlign: 'center' // Garante que o texto da descrição fique centralizado
  },
  date: { 
    fontSize: 16, 
    color: CommomStyles.colors.subText, 
    textAlign: 'center' // Centraliza o texto da data
  },
  right: { 
    backgroundColor: 'red', 
    justifyContent: 'center', 
    padding: 20 
  },
});
