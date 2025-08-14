import React, { useState } from 'react';
import { Task, Priority } from '../types';
import { useTasks } from '../context/TaskContext';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Select } from './ui/Select';

interface EditModalProps {
  task: Task;
  onClose: () => void;
}

export const EditModal = ({ task, onClose }: EditModalProps) => {
  const [text, setText] = useState(task.text);
  const [date, setDate] = useState(task.date);
  const [priority, setPriority] = useState(task.priority);
  const { updateTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      updateTask(task.id, { text: text.trim(), date, priority });
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-title"
    >
      <div 
        className="bg-white rounded-sm shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="edit-task-title" className="text-lg font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-task-text" className="block text-sm font-medium mb-1">Task</label>
            <Input
              id="edit-task-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="edit-task-date" className="block text-sm font-medium mb-1">Date</label>
              <Input
                id="edit-task-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="edit-task-priority" className="block text-sm font-medium mb-1">Priority</label>
              <Select
                id="edit-task-priority"
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
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
