
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Priority } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import { SparklesIcon } from './icons';
import { getTaskSuggestions } from '../services/geminiService';


const AddTaskForm: React.FC = () => {
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [priority, setPriority] = useState<Priority>(Priority.None);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAISubmitting, setAISubmitting] = useState(false);
  const { addTask, addMultipleTasks } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setIsSubmitting(true);
    addTask(text, date, priority);
    setText('');
    setIsSubmitting(false);
  };
  
  const handleSmartAdd = async () => {
    if (!text.trim()) return;
    setAISubmitting(true);
    try {
        const subtasks = await getTaskSuggestions(text);
        if (subtasks.length > 0) {
            const newTasks = subtasks.map(subtask => ({ text: subtask, date, priority }));
            addMultipleTasks(newTasks);
            setText('');
        } else {
            // If AI returns no subtasks, add the original task.
            addTask(text, date, priority);
            setText('');
        }
    } catch (error) {
        console.error("Smart Add failed, adding as single task.", error);
        // Fallback to adding the single task
        addTask(text, date, priority);
        setText('');
    } finally {
        setAISubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row items-end gap-2">
        <div className="flex-grow w-full">
          <label htmlFor="task-text" className="text-xs font-medium text-slate-600">New Task</label>
          <Input
            id="task-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Buy groceries"
            className="mt-1"
          />
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="task-date" className="text-xs font-medium text-slate-600">Date</label>
          <Input
            id="task-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="task-priority" className="text-xs font-medium text-slate-600">Priority</label>
          <Select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value) as Priority)}
            className="mt-1"
          >
            <option value={Priority.None}>None</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.High}>High</option>
          </Select>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
            <Button type="submit" disabled={isSubmitting || isAISubmitting} className="w-full sm:w-auto">
              Add Task
            </Button>
            {process.env.API_KEY && (
              <Button type="button" onClick={handleSmartAdd} variant="secondary" disabled={isSubmitting || isAISubmitting || !text.trim()} className="w-full sm:w-auto">
                <SparklesIcon className={`h-4 w-4 ${isAISubmitting ? 'animate-spin' : ''}`} />
                <span className="sr-only">Smart Add</span>
              </Button>
            )}
        </div>
      </div>
    </form>
  );
};

export default AddTaskForm;
