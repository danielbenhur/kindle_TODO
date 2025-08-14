export enum TaskStatus {
  Pending = 'pending',
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
  status: TaskStatus;
  date: string; // YYYY-MM-DD
  priority: Priority;
  createdAt: number; // timestamp
}
