import { ListIcon, CalendarIcon } from './icons';
import { Button } from './ui/Button';

type View = 'list' | 'calendar';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Header = ({ currentView, onViewChange }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-black">
      <h1 className="text-xl font-bold">Kindle To-Do</h1>
      <div className="flex items-center gap-2">
        <Button 
          variant={currentView === 'list' ? 'primary' : 'ghost'} 
          size="sm"
          onClick={() => onViewChange('list')}
          aria-label="List view"
        >
          <ListIcon className="w-5 h-5" />
        </Button>
        <Button 
          variant={currentView === 'calendar' ? 'primary' : 'ghost'} 
          size="sm"
          onClick={() => onViewChange('calendar')}
          aria-label="Calendar view"
        >
          <CalendarIcon className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
