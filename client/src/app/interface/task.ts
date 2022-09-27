export interface Task {
  id?: number | string;
  done: boolean;
  active: boolean;
  task: string;
  description: string;
  timestamp?: string;
}
