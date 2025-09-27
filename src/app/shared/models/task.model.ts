export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Task {
  id: string;           // UUID as string
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;    // ISO date string
  userId: string;
}
