
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskStatus, Priority } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

interface TaskContextType {
  tasks: Task[];
  addTask: (text: string, date: string, priority: Priority) => void;
  addMultipleTasks: (tasks: { text: string; date: string; priority: Priority }[]) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage", error);
    }
  }, [tasks]);

  const addTask = (text: string, date: string, priority: Priority) => {
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      date,
      priority,
      status: TaskStatus.Open,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const addMultipleTasks = (newTasks: { text: string; date: string; priority: Priority }[]) => {
    const tasksToAdd: Task[] = newTasks.map(t => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${t.text.slice(0,5)}`,
        text: t.text,
        date: t.date,
        priority: t.priority,
        status: TaskStatus.Open,
    }));
    setTasks(prevTasks => [...prevTasks, ...tasksToAdd]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updates } : task)));
  };

  const removeTask = (id:string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, status: task.status === TaskStatus.Open ? TaskStatus.Done : TaskStatus.Open }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, addMultipleTasks, updateTask, removeTask, toggleTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
