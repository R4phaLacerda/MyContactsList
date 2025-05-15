import React, { useState } from "react";
import {
View,
Text,
Pressable,
Modal,
TextInput,
FlatList,
Alert,
StyleSheet,
TouchableOpacity,
} from "react-native";
import { List } from "react-native-paper";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]); // Lista de contatos
  const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
  const [newName, setNewName] = useState(""); // Nome do contato
  const [newNumber, setNewNumber] = useState(""); // Número do contato
  const [newCategory, setNewCategory] = useState(""); // Categoria do contato
  const [editIndex, setEditIndex] = useState(null); // Índice do contato em edição

  // Função para salvar contato (adicionar ou editar)
function saveContact() {
    if (!newName || !newNumber || !newCategory) {
    Alert.alert("Erro", "Preencha todos os campos antes de salvar.");
    return;
    }

    const updatedContacts = [...contacts];

    if (editIndex !== null) {
      // Edita o contato existente
    updatedContacts[editIndex] = {
        name: newName,
        number: newNumber,
        category: newCategory,
    };
    } else {
      // Adiciona um novo contato
    updatedContacts.push({
        name: newName,
        number: newNumber,
        category: newCategory,
    });
    }

    // Ordena os contatos por categoria e nome
    updatedContacts.sort(
    (a, b) =>
        a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
    );

    setContacts(updatedContacts); // Atualiza a lista de contatos
    setNewName(""); // Limpa o campo de nome
    setNewNumber(""); // Limpa o campo de número
    setNewCategory(""); // Limpa a categoria
    setEditIndex(null); // Reseta o índice de edição
    setModalVisible(false); // Fecha o modal
}

  // Função para abrir o modal em modo de edição
function editContact(index) {
    const contact = contacts[index];
    setNewName(contact.name);
    setNewNumber(contact.number);
    setNewCategory(contact.category);
    setEditIndex(index);
    setModalVisible(true);
}

  // Função para confirmar exclusão de contato
function confirmDelete(index) {
    Alert.alert("Excluir Contato?", `Remover "${contacts[index].name}"?`, [
    { text: "Cancelar", style: "cancel" },
    {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
        const updatedContacts = [...contacts];
          updatedContacts.splice(index, 1); // Remove o contato
          setContacts(updatedContacts); // Atualiza a lista
        },
    },
    ]);
}

return (
    <View style={styles.container}>
      {/* Lista de contatos */}
    <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)} // Chave única para cada item
        renderItem={({ item, index }) => (
        <View style={styles.contactItemContainer}>
            <View>
            <Text style={styles.contactItemName}>{item.name}</Text>
            <Text style={styles.contactItemDetails}>
                {item.number} - {item.category}
            </Text>
            </View>
            <View style={styles.contactButtons}>
              {/* Botão de editar */}
            <Pressable
                onPress={() => editContact(index)} // Abre o modal para editar
                style={[styles.contactButton, styles.editButton]}
            >
                <Text style={styles.buttonText}>✏️</Text>
            </Pressable>
              {/* Botão de excluir */}
            <Pressable
                onPress={() => confirmDelete(index)} // Exclui o contato
                style={[styles.contactButton, styles.deleteButton]}
            >
                <Text style={styles.buttonText}>🗑️</Text>
            </Pressable>
            </View>
        </View>
        )}
        ListEmptyComponent={
        <Text style={styles.emptyText}>Nenhum contato ainda!</Text>
        }
    />

      {/* Botão para abrir o modal */}
    <Pressable
        onPress={() => {
        setNewName("");
        setNewNumber("");
        setNewCategory("");
        setEditIndex(null);
        setModalVisible(true);
        }}
        style={styles.addButton}
    >
        <Text style={styles.addButtonText}>＋ Adicionar Contato</Text>
    </Pressable>

      {/* Modal para adicionar ou editar contato */}
    <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
    >
        <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
            {editIndex !== null ? "Editar Contato" : "Adicionar Contato"}
            </Text>
            <TextInput
            value={newName}
            onChangeText={setNewName}
            placeholder="Nome"
            style={styles.input}
            />
            <TextInput
            value={newNumber}
            onChangeText={setNewNumber}
            placeholder="Número"
            keyboardType="phone-pad"
            style={styles.input}
            />
            <Text style={styles.modalSubtitle}>Categoria:</Text>
            <List.Section>
            <TouchableOpacity onPress={() => setNewCategory("Pessoal")}>
                <List.Item
                style={styles.listItem}
                title="Pessoal"
                left={() => (
                    <FontAwesome6 name="user" size={24} color="black" />
                  )} // Nome do ícone corrigido
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNewCategory("Trabalho")}>
                <List.Item
                style={styles.listItem}
                title="Trabalho"
                left={() => (
                    <FontAwesome6 name="briefcase" size={24} color="black" />
                )}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setNewCategory("Família")}>
                <List.Item
                style={styles.listItem}
                title="Família"
                left={() => (
                    <FontAwesome6 name="users" size={24} color="black" />
                  )} // Nome do ícone corrigido
                />
            </TouchableOpacity>
            </List.Section>
            <Pressable onPress={saveContact} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvar</Text>
            </Pressable>
            <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.cancelButton}
            >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
        </View>
        </View>
    </Modal>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
},
addButton: {
    marginTop: 16,
    alignSelf: "center",
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
},
addButtonText: {
    color: "#fff",
    fontSize: 16,
},
contactItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
},
contactItemName: {
    fontSize: 16,
    fontWeight: "bold",
},
contactItemDetails: {
    fontSize: 14,
    color: "#666",
},
contactButtons: {
    flexDirection: "row",
},
contactButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 4,
},
editButton: {
    backgroundColor: "#ffca28",
},
deleteButton: {
    backgroundColor: "#f44336",
},
buttonText: {
    color: "#fff",
    fontSize: 16,
},
emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#666",
},
modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
},
modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
},
modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
},
modalSubtitle: {
    fontSize: 16,
    marginBottom: 8,
},
input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
},
listItem: {
    marginLeft: 10,
},
saveButton: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
},
saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
},
cancelButton: {
    padding: 12,
},
cancelButtonText: {
    color: "#999",
    textAlign: "center",
    fontSize: 16,
},
});
