
import React, { useState } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import CalendarView from './components/CalendarView';
import { useTasks } from './context/TaskContext';

type View = 'list' | 'calendar';

const App: React.FC = () => {
  const [view, setView] = useState<View>('list');
  const { tasks } = useTasks();

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <Header currentView={view} setView={setView} />
        <main className="mt-6 bg-white rounded-lg shadow-sm border border-slate-200 p-4 sm:p-6">
          {view === 'list' ? (
            <>
              <AddTaskForm />
              <TaskList />
            </>
          ) : (
            <CalendarView tasks={tasks} />
          )}
        </main>
        <footer className="text-center mt-6 text-slate-500 text-sm">
          <p>E-Ink Todo - Inspired by kindle-todo</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
