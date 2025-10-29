import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Task {
  id: number;
  type: string;
  time: string;
  title: string;
  room: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    type: 'Пр',
    time: '09:00 - 10:20',
    title: 'Физическая культура и спорт',
    room: '5101',
  },
  {
    id: 2,
    type: 'Лаб',
    time: '10:30 - 11:50',
    title: 'Основы программирования',
    room: '4340',
  },
  {
    id: 3,
    type: 'Лаб',
    time: '12:00 - 13:20',
    title: 'Основы программирования',
    room: '4340',
  },
];

const weekDays = [
  { short: 'Пн', date: 27 },
  { short: 'Вт', date: 28, active: true },
  { short: 'Ср', date: 29 },
  { short: 'Чт', date: 30 },
  { short: 'Пт', date: 31 },
  { short: 'Сб', date: 1 },
  { short: 'Вс', date: 2 },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(28);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    type: '',
    time: '',
    title: '',
    room: '',
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.time && newTask.type && newTask.room) {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
      setNewTask({ type: '', time: '', title: '', room: '' });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-foreground">Окт. - Нояб.</h1>
              <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
                <Icon name="RefreshCw" size={20} className="text-muted-foreground" />
              </button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                    <Icon name="Plus" size={20} className="text-primary" />
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Добавить задачу</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Название</Label>
                      <Input
                        id="title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        placeholder="Название занятия"
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Тип занятия</Label>
                      <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Лек">Лекция</SelectItem>
                          <SelectItem value="Пр">Практика</SelectItem>
                          <SelectItem value="Лаб">Лабораторная</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Время</Label>
                      <Input
                        id="time"
                        value={newTask.time}
                        onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                        placeholder="09:00 - 10:20"
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="room">Аудитория</Label>
                      <Input
                        id="room"
                        value={newTask.room}
                        onChange={(e) => setNewTask({ ...newTask, room: e.target.value })}
                        placeholder="4340"
                        className="bg-background border-border"
                      />
                    </div>
                    <Button onClick={handleAddTask} className="w-full">
                      Добавить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
            <span>Числитель - 1</span>
            <span className="text-muted-foreground/50">|</span>
            <span>9 - неделя</span>
          </div>

          <div className="flex gap-2 mb-6">
            {weekDays.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`flex-1 flex flex-col items-center py-3 rounded-xl transition-all ${
                  day.date === selectedDate
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                }`}
              >
                <span className="text-xs mb-1">{day.short}</span>
                <span className="text-lg font-semibold">{day.date}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-3">
          {tasks.map((task, index) => (
            <Card
              key={task.id}
              className="bg-card border-border p-4 hover:bg-secondary/30 transition-all cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <Badge variant="secondary" className="text-xs px-2">
                    {task.type}
                  </Badge>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{task.title}</h3>
                    <span className="text-xs px-3 py-1 bg-background rounded-full text-muted-foreground">
                      {task.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Аудитория: {task.room}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="max-w-md mx-auto flex items-center justify-around py-4">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'calendar'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Calendar" size={24} />
              <span className="text-xs font-medium">Календарь</span>
            </button>

            <button
              onClick={() => setActiveTab('stats')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'stats'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="BarChart3" size={24} />
              <span className="text-xs font-medium">Статистика</span>
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'menu'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Menu" size={24} />
              <span className="text-xs font-medium">Меню</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;