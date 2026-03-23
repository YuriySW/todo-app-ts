import type { TodoItem } from './types';

export const buildStorageKey = (username: string): string => {
  return `todo-app:${username.toLowerCase().trim()}`;
};

export const loadTodos = (username: string): TodoItem[] => {
  const data = localStorage.getItem(buildStorageKey(username));
  if (!data) {
    return [];
  }

  try {
    const parsed = JSON.parse(data) as TodoItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
};

export const saveTodos = (username: string, todos: TodoItem[]): void => {
  localStorage.setItem(buildStorageKey(username), JSON.stringify(todos));
};
