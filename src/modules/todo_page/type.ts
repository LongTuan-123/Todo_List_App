export interface Task {
  date: string;
  category: string;
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface TaskDetail {
  id: string;
  content: string;
  isCompleted: boolean;
}

export interface GroupedTask {
  date: string;
  categories: Record<string, TaskDetail[]>;
}
