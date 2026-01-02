import React, { useState } from 'react';
import { CheckSquare, Trash2, Plus, X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const TodoList: React.FC = () => {
  const { tasks, addTask, toggleTask, removeTask } = useStore();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTask(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white w-80 shadow-xl flex flex-col max-h-[50vh]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <CheckSquare size={18} /> Tasks
        </h3>
        <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-md text-white/70">
          {tasks.filter(t => t.completed).length}/{tasks.length}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="relative mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
        />
        <button 
          type="submit"
          disabled={!inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-0 transition-all disabled:scale-75"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </form>

      <div className="overflow-y-auto custom-scrollbar flex-1 space-y-2 pr-1">
        {tasks.length === 0 && (
          <div className="text-center text-white/30 text-sm py-8 italic">
            No tasks yet. Time to focus!
          </div>
        )}
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border border-transparent ${
              task.completed ? 'bg-white/5' : 'bg-white/10 hover:border-white/10'
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`flex-shrink-0 w-5 h-5 rounded border transition-colors flex items-center justify-center ${
                task.completed 
                  ? 'bg-green-500 border-green-500 text-black' 
                  : 'border-white/40 hover:border-white'
              }`}
            >
              {task.completed && <Plus size={12} className="rotate-45" strokeWidth={4} />}
            </button>
            
            <span className={`text-sm flex-1 truncate transition-opacity ${task.completed ? 'opacity-40 line-through' : 'opacity-90'}`}>
              {task.text}
            </span>
            
            <button
              onClick={() => removeTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-white/40 hover:text-red-400 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};