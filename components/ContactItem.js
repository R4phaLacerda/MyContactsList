import React from "react";
import { Alert, StyleSheet } from "react-native";
import { List, Avatar, IconButton } from "react-native-paper";

export default function ContactItem({ contact, index, onEdit, onDelete }) {
const confirmDelete = () => {
    Alert.alert(
    "Excluir contato?",
    `Deseja remover "${contact.name}"?`,
    [
        { text: "Cancelar", style: "cancel" },
        {
        text: "Excluir",
        style: "destructive",
          onPress: () => onDelete(index), // Chama a função de exclusão
        },
    ]
    );
};

return (
    <List.Item
    title={contact.name}
    description={`${contact.phone} - ${contact.category}`}
    left={() => (
        <Avatar.Text
        size={40}
        label={contact.name.charAt(0).toUpperCase()}
        style={styles.avatar}
        />
    )}
    right={() => (
        <>
          {/* Botão de editar */}
        <IconButton
            icon="pencil"
            size={24}
            onPress={() => onEdit(index)} // Chama a função de edição
            style={styles.editButton}
        />
          {/* Botão de excluir */}
        <IconButton
            icon="delete"
            size={24}
            onPress={confirmDelete} // Chama a função de confirmação de exclusão
            style={styles.deleteButton}
        />
        </>
    )}
    style={styles.contactItem}
    />
);
}

const styles = StyleSheet.create({
contactItem: {
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
    borderRadius: 6,
},
avatar: {
    backgroundColor: "#6200ee",
},
editButton: {
    backgroundColor: "#ffca28",
    borderRadius: 20,
},
deleteButton: {
    backgroundColor: "#f44336",
    borderRadius: 20,
},
});