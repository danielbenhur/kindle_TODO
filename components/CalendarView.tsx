
import React, { useState, useMemo } from 'react';
import { Task } from '../types';

interface CalendarViewProps {
  tasks: Task[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const tasksByDate = useMemo(() => {
    const map = new Map<string, Task[]>();
    tasks.forEach(task => {
      const dateKey = task.date;
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(task);
    });
    return map;
  }, [tasks]);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());

  const days = [];
  let day = new Date(startDate);
  while (day <= endOfMonth || days.length % 7 !== 0) {
    if (days.length > 41) break; // prevent infinite loops
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-100">&lt;</button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-100">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map(wd => <div key={wd} className="font-bold text-slate-600 text-sm py-2">{wd}</div>)}
        
        {days.map((d, index) => {
          const dateKey = d.toISOString().split('T')[0];
          const tasksForDay = tasksByDate.get(dateKey);
          const isCurrentMonth = d.getMonth() === currentDate.getMonth();
          const isToday = d.toDateString() === new Date().toDateString();

          return (
            <div
              key={index}
              className={`h-24 p-1 border border-slate-200 rounded-md flex flex-col ${
                isCurrentMonth ? 'bg-white' : 'bg-slate-50'
              }`}
            >
              <div className={`flex justify-center items-center w-6 h-6 rounded-full text-sm ${
                  isToday ? 'bg-slate-800 text-white' : ''
              } ${isCurrentMonth ? 'text-slate-700' : 'text-slate-400'}`}>
                {d.getDate()}
              </div>
              {tasksForDay && (
                <div className="mt-1 flex-grow overflow-y-auto text-left">
                  {tasksForDay.slice(0, 2).map(task => (
                    <div key={task.id} className="text-xs truncate bg-slate-100 text-slate-700 rounded px-1 mb-0.5">
                      {task.text}
                    </div>
                  ))}
                  {tasksForDay.length > 2 && <div className="text-xs text-slate-500">+ {tasksForDay.length - 2} more</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
