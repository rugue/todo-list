import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
}

const initialState: TodoState = {
  todos: [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      saveTodosToStorage(state.todos);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodosToStorage(state.todos);
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      saveTodosToStorage(state.todos);
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "active" | "completed">
    ) => {
      state.filter = action.payload;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, setTodos } =
  todoSlice.actions;

export default todoSlice.reducer;

// Helper function to save todos to AsyncStorage
const saveTodosToStorage = async (todos: Todo[]) => {
  try {
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  } catch (e) {
    console.error("Failed to save todos to storage", e);
  }
};

// Function to load todos from AsyncStorage
export const loadTodosFromStorage = async () => {
  try {
    const storedTodos = await AsyncStorage.getItem("todos");
    if (storedTodos) {
      return JSON.parse(storedTodos) as Todo[];
    }
  } catch (e) {
    console.error("Failed to load todos from storage", e);
  }
  return [];
};
