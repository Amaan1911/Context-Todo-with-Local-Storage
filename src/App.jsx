import React from 'react';
import { TodoProvider } from './Context/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { useTodo } from './Context/TodoContext';

function TodoList() {
  const { todos } = useTodo();
  
  return (
    <div className="flex flex-wrap gap-y-3">
      {todos.map((todo) => (
        <div key={todo.id} className="w-full">
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
}

export const App = () => {
  return (
    <TodoProvider>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};