import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";

function TodoItem({ todo }) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.text);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const handleEdit = () => {
    updateTodo(todo.id, { ...todo, text: todoMsg });
    setIsEditable(false);
  };

  const handleToggle = () => toggleComplete(todo.id);

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="cursor-pointer"
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isEditable}
      />
      <button
        className="w-8 h-8 rounded-lg border border-black/10 text-sm bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => {
          if (todo.completed) return;
          if (isEditable) handleEdit();
          else setIsEditable(true);
        }}
        disabled={todo.completed}
      >
        {isEditable ? "📁" : "✏️"}
      </button>
      <button
        className="w-8 h-8 rounded-lg border border-black/10 text-sm bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
