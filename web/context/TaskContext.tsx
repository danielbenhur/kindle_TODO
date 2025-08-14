
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskStatus, Priority } from '../types';
import { TASKS_STORAGE_KEY } from '../constants';

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string, date: string, priority: Priority) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTasksByDate: (date: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      console.error('Error reading tasks from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage', error);
    }
  }, [tasks]);

  const addTask = (text: string, date: string, priority: Priority) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      date,
      priority,
      status: TaskStatus.Pending,
      createdAt: Date.now(),
    };
    setTasks(prevTasks => [...prevTasks, newTask].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const removeTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, status: task.status === TaskStatus.Done ? TaskStatus.Pending : TaskStatus.Done }
          : task
      )
    );
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter(task => task.date === date);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    removeTask,
    toggleTaskStatus,
    getTasksByDate,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
