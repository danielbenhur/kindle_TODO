
import { useState } from 'react';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { AddTaskForm } from './components/AddTaskForm';
import { CalendarView } from './components/CalendarView';
import { TaskProvider } from './context/TaskContext';

type View = 'list' | 'calendar';

function App() {
  const [view, setView] = useState<View>('list');

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <Header currentView={view} onViewChange={setView} />
      <main className="p-4 max-w-lg mx-auto">
        {view === 'list' && (
          <>
            <AddTaskForm />
            <TaskList />
          </>
        )}
        {view === 'calendar' && <CalendarView />}
      </main>
    </div>
  );
}

export default App;
