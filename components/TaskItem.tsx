import { Task, TaskStatus, Priority } from '../types';
import { useTasks } from '../context/TaskContext';
import { Button } from './ui/Button';
import { SquareIcon, CheckSquareIcon, EditIcon, TrashIcon } from './icons';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
}

const priorityClasses: Record<Priority, string> = {
  [Priority.None]: 'border-gray-300',
  [Priority.Low]: 'border-blue-500',
  [Priority.Medium]: 'border-yellow-500',
  [Priority.High]: 'border-red-500',
};

export const TaskItem = ({ task, onEdit }: TaskItemProps) => {
  const { removeTask, toggleTaskStatus } = useTasks();

  return (
    <li className={`flex items-center p-3 border-l-4 rounded-sm bg-gray-50 ${priorityClasses[task.priority]} ${task.status === TaskStatus.Done ? 'opacity-60' : ''}`}>
      <button onClick={() => toggleTaskStatus(task.id)} className="mr-3 flex-shrink-0" aria-label={task.status === TaskStatus.Done ? 'Mark as pending' : 'Mark as done'}>
        {task.status === TaskStatus.Done ? <CheckSquareIcon className="w-6 h-6" /> : <SquareIcon className="w-6 h-6" />}
      </button>
      <div className="flex-grow">
        <p className={`text-base ${task.status === TaskStatus.Done ? 'line-through' : ''}`}>
          {task.text}
        </p>
        <p className="text-sm text-gray-600">{task.date}</p>
      </div>
      <div className="flex items-center ml-2 flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={onEdit} aria-label="Edit task">
          <EditIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => removeTask(task.id)} aria-label="Remove task">
          <TrashIcon className="w-5 h-5 text-red-700" />
        </Button>
      </div>
    </li>
  );
};
