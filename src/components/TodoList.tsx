import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, X } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem('homepage-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('homepage-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
      setShowInput(false);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-800/40 h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <CheckSquare className="w-5 h-5 text-blue-400" />
          <span className="text-slate-300 text-sm font-medium">To Do List</span>
        </div>
        <button
          onClick={() => setShowInput(!showInput)}
          className="w-6 h-6 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>
      
      {showInput && (
        <div className="mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add new task..."
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400 transition-colors"
            autoFocus
          />
        </div>
      )}
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">No tasks yet</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-3 group">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  todo.completed 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-slate-500 hover:border-blue-400'
                }`}
              >
                {todo.completed && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </button>
              <span className={`flex-1 text-sm transition-colors ${
                todo.completed 
                  ? 'text-slate-500 line-through' 
                  : 'text-white'
              }`}>
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;