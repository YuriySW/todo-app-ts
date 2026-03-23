export type Priority = 'normal' | 'important' | 'urgent';

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
}
