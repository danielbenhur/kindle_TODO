
import React, { useState, useMemo } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskItem } from './TaskItem';
import { EditModal } from './EditModal';
import { Task, TaskStatus } from '../types';
import { Button } from './ui/Button';

type Filter = 'today' | 'week' | 'all';

export const TaskList = () => {
  const { tasks } = useTasks();
  const [filter, setFilter] = useState<Filter>('week');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    let sortedTasks = [...tasks].sort((a, b) => {
      // Sort by status first (pending before done)
      if (a.status !== b.status) {
        return a.status === TaskStatus.Pending ? -1 : 1;
      }
      // Then sort by date
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    if (filter === 'today') {
      const todayStr = today.toISOString().split('T')[0];
      return sortedTasks.filter(task => task.date === todayStr);
    }
    if (filter === 'week') {
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return sortedTasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
      });
    }
    return sortedTasks;
  }, [tasks, filter]);

  return (
    <section>
      <div className="flex items-center justify-center gap-2 mb-4 border-b border-black pb-4">
        <Button variant={filter === 'today' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('today')}>Today</Button>
        <Button variant={filter === 'week' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('week')}>This Week</Button>
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('all')}>All</Button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks for this period.</p>
      ) : (
        <ul className="space-y-2">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onEdit={() => setEditingTask(task)} />
          ))}
        </ul>
      )}

      {editingTask && (
        <EditModal 
          task={editingTask} 
          onClose={() => setEditingTask(null)} 
        />
      )}
    </section>
  );
};
