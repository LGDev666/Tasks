import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import CommomStyles from "../CommomStyles";

export default ({ task, onSave, onCancel }) => {
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleSave = () => {
        onSave(editedTask); // Salva a tarefa editada
    };

    return (
        <Modal visible={true} animationType="slide" onRequestClose={onCancel}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Editar Tarefa</Text>
                <TextInput
                    style={styles.input}
                    value={editedTask.desc}
                    onChangeText={text => setEditedTask({ ...editedTask, desc: text })}
                    placeholder="Descrição da tarefa"
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={onCancel} style={styles.button}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} style={styles.button}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', padding: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { height: 40, borderColor: CommomStyles.colors.border, borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { backgroundColor: CommomStyles.colors.today, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 16 }
});
