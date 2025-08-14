
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Priority } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { SparklesIcon } from './icons';
import { getSubtasks } from '../services/geminiService';

export const AddTaskForm = () => {
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<Priority>(Priority.None);
  const [isLoading, setIsLoading] = useState(false);
  const { addTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim(), date, priority);
      setText('');
    }
  };

  const handleSmartAdd = async () => {
    if (!text.trim()) return;
    setIsLoading(true);
    const subtasks = await getSubtasks(text);
    if (subtasks.length > 0) {
      subtasks.forEach(subtask => {
        addTask(subtask, date, priority);
      });
      setText(''); // Clear input after adding subtasks
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label htmlFor="task-text" className="sr-only">New Task</label>
        <Input
          id="task-text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="task-date" className="sr-only">Task Date</label>
          <Input
            id="task-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="task-priority" className="sr-only">Priority</label>
          <Select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value) as Priority)}
          >
            <option value={Priority.None}>No Priority</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.High}>High</option>
          </Select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button type="submit" className="w-full sm:w-auto flex-grow">Add Task</Button>
        <Button type="button" variant="secondary" onClick={handleSmartAdd} disabled={isLoading || !process.env.VITE_GEMINI_API_KEY} className="w-full sm:w-auto">
          <SparklesIcon className="w-4 h-4 mr-2" />
          {isLoading ? 'Thinking...' : 'Smart Add'}
        </Button>
      </div>
    </form>
  );
};
