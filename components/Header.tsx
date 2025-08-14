
import React from 'react';

interface HeaderProps {
  currentView: 'list' | 'calendar';
  setView: (view: 'list' | 'calendar') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const commonButtonClasses = 'px-4 py-2 rounded-md text-sm font-medium transition-colors';
  const activeButtonClasses = 'bg-slate-800 text-white';
  const inactiveButtonClasses = 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200';

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b border-slate-200">
      <h1 className="text-3xl font-bold text-slate-800 mb-4 sm:mb-0">E-Ink Todo</h1>
      <nav className="flex items-center space-x-2 p-1 bg-slate-100 rounded-lg">
        <button
          onClick={() => setView('list')}
          className={`${commonButtonClasses} ${currentView === 'list' ? activeButtonClasses : inactiveButtonClasses}`}
        >
          List
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`${commonButtonClasses} ${currentView === 'calendar' ? activeButtonClasses : inactiveButtonClasses}`}
        >
          Calendar
        </button>
      </nav>
    </header>
  );
};

export default Header;
