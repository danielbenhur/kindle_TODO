
import React, { useState } from 'react';
import { Task, TaskStatus, Priority } from '../types';
import { useTasks } from '../context/TaskContext';
import { CheckIcon, TrashIcon, EditIcon } from './icons';
import EditModal from './EditModal';
import Button from './ui/Button';

interface TaskItemProps {
  task: Task;
}

const priorityStyles = {
    [Priority.None]: { badge: 'border-slate-300', text: 'text-slate-400' },
    [Priority.Low]: { badge: 'border-blue-400', text: 'text-blue-600' },
    [Priority.Medium]: { badge: 'border-yellow-500', text: 'text-yellow-700' },
    [Priority.High]: { badge: 'border-red-500', text: 'text-red-700' },
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTaskStatus, removeTask } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isDone = task.status === TaskStatus.Done;
  const styles = priorityStyles[task.priority];

  return (
    <>
      <div className={`flex items-center p-3 rounded-lg transition-colors ${isDone ? 'bg-slate-50' : 'bg-white'} border ${styles.badge}`}>
        <button
          onClick={() => toggleTaskStatus(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isDone ? 'bg-slate-600 border-slate-600' : `${styles.badge} hover:bg-slate-100`
          }`}
          aria-label={isDone ? 'Mark as not done' : 'Mark as done'}
        >
          {isDone && <CheckIcon className="w-4 h-4 text-white" />}
        </button>

        <div className="ml-4 flex-grow">
          <p className={`text-slate-800 ${isDone ? 'line-through text-slate-400' : ''}`}>{task.text}</p>
          <div className="text-xs flex items-center space-x-2 mt-1">
            <span className="text-slate-500">{task.date}</span>
            {task.priority !== Priority.None && (
                <span className={`font-semibold ${styles.text}`}>{Priority[task.priority]}</span>
            )}
          </div>
        </div>

        <div className="ml-4 flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={() => setIsEditModalOpen(true)} aria-label="Edit task">
              <EditIcon className="w-4 h-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => removeTask(task.id)} aria-label="Remove task">
              <TrashIcon className="w-4 h-4 text-slate-500 hover:text-red-600" />
            </Button>
        </div>
      </div>
      {isEditModalOpen && <EditModal task={task} onClose={() => setIsEditModalOpen(false)} />}
    </>
  );
};

export default TaskItem;
