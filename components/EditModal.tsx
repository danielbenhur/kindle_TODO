
import React, { useState } from 'react';
import { Task, Priority } from '../types';
import { useTasks } from '../context/TaskContext';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

interface EditModalProps {
  task: Task;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ task, onClose }) => {
  const [text, setText] = useState(task.text);
  const [date, setDate] = useState(task.date);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const { updateTask } = useTasks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    updateTask(task.id, { text, date, priority });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="edit-task-text" className="text-sm font-medium text-slate-600">Task</label>
              <Input
                id="edit-task-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="edit-task-date" className="text-sm font-medium text-slate-600">Date</label>
              <Input
                id="edit-task-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="edit-task-priority" className="text-sm font-medium text-slate-600">Priority</label>
              <Select
                id="edit-task-priority"
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
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
