export type TaskPriority = 'urgent' | 'important' | 'normal';

export interface Task {
  id: string;
  title: string;
  meta?: string;
  priority: TaskPriority;
  completed: boolean;
}

export interface TaskFormValue {
  title: string;
  list: string;
  date: string;
  time: string;
  priority: TaskPriority;
  notes: string;
}
