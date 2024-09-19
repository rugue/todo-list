import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  setTodos,
  loadTodosFromStorage,
  Todo,
} from "../features/todoSlice";

const MainScreen = () => {
  const [newTodo, setNewTodo] = useState("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.todos.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTodos = async () => {
      const storedTodos = await loadTodosFromStorage();
      dispatch(setTodos(storedTodos));
    };
    loadTodos();
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
        <Text style={item.completed ? styles.completedTodo : styles.activeTodo}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => dispatch(setFilter("all"))}>
          <Text
            style={[
              styles.filterButton,
              filter === "all" && styles.activeFilter,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setFilter("active"))}>
          <Text
            style={[
              styles.filterButton,
              filter === "active" && styles.activeFilter,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(setFilter("completed"))}>
          <Text
            style={[
              styles.filterButton,
              filter === "completed" && styles.activeFilter,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTodos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    padding: 5,
  },
  activeFilter: {
    fontWeight: "bold",
    color: "#007AFF",
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeTodo: {
    fontSize: 16,
  },
  completedTodo: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    color: "red",
  },
});

export default MainScreen;
