
export enum TaskStatus {
  Open = 'open',
  Done = 'done',
}

export enum Priority {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
}

export interface Task {
  id: string;
  text: string;
  date: string; // YYYY-MM-DD
  status: TaskStatus;
  priority: Priority;
}
