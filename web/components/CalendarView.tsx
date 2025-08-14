
import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export const CalendarView = () => {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const tasksByDate = tasks.reduce((acc, task) => {
    (acc[task.date] = acc[task.date] || []).push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = startOfMonth.getDay();
  
  const daysInMonth = [];
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const changeMonth = (offset: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => changeMonth(-1)} className="font-bold p-2">&lt;</button>
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="font-bold p-2">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-semibold">
        {weekDays.map(day => <div key={day} className="p-2 border-b-2 border-black">{day.charAt(0)}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {daysInMonth.map(day => {
          const dateString = day.toISOString().split('T')[0];
          const hasTasks = tasksByDate[dateString] && tasksByDate[dateString].length > 0;
          const isToday = dateString === new Date().toISOString().split('T')[0];

          return (
            <div
              key={dateString}
              className={`p-2 border border-transparent rounded-full aspect-square flex items-center justify-center
                ${isToday ? 'border-black' : ''}
                ${hasTasks ? 'bg-black text-white font-bold' : 'bg-gray-100'}`}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};
