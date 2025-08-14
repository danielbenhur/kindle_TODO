
import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types';
import TaskItem from './TaskItem';

type Filter = 'today' | 'week' | 'all';

const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<Filter>('week');

  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    let filtered: Task[] = [];
    switch (filter) {
      case 'today':
        filtered = tasks.filter(task => {
          const taskDate = new Date(task.date);
          return taskDate.toDateString() === today.toDateString();
        });
        break;
      case 'week':
        filtered = tasks.filter(task => {
          const taskDate = new Date(task.date);
          return taskDate >= startOfWeek && taskDate <= endOfWeek;
        });
        break;
      case 'all':
      default:
        filtered = tasks;
        break;
    }
    
    // Sort tasks: open first, then by date, then by priority
    return filtered.sort((a, b) => {
        if (a.status !== b.status) return a.status === 'open' ? -1 : 1;
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return b.priority - a.priority;
    });
  }, [tasks, filter]);

  const FilterButton: React.FC<{
    currentFilter: Filter;
    filterName: Filter;
    setFilter: (filter: Filter) => void;
    children: React.ReactNode;
  }> = ({ currentFilter, filterName, setFilter, children }) => {
    const isActive = currentFilter === filterName;
    return (
      <button
        onClick={() => setFilter(filterName)}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          isActive ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-100'
        }`}
      >
        {children}
      </button>
    );
  };
  
  return (
    <div>
      <div className="flex items-center justify-end space-x-2 mb-4">
        <FilterButton currentFilter={filter} filterName="today" setFilter={setFilter}>Today</FilterButton>
        <FilterButton currentFilter={filter} filterName="week" setFilter={setFilter}>This Week</FilterButton>
        <FilterButton currentFilter={filter} filterName="all" setFilter={setFilter}>All</FilterButton>
      </div>

      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => <TaskItem key={task.id} task={task} />)
        ) : (
          <div className="text-center py-10 text-slate-500">
            <p>No tasks found for this period.</p>
            <p className="text-sm">Try adding a new task or changing the filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
