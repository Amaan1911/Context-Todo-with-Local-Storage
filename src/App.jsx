import React, { useState, useEffect } from 'react';
import { TodoProvider } from './Context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

export const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [
      { id: Date.now(), ...todo },
      ...prevTodos,
    ]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? updatedTodo : item))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed } // ✅ fix: consistent key
          : item
      )
    );
  };

  // Load todos from localStorage on mount
  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos'));
    if (todosFromStorage && todosFromStorage.length > 0) {
      setTodos(todosFromStorage);
    }
  }, []);

  // Save todos to localStorage on every change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};
