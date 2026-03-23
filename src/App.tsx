import { useEffect, useMemo, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { EditTaskModal } from './components/EditTaskModal';
import { LoginForm } from './components/LoginForm';
import { TodoForm } from './components/TodoForm';
import { TodoTable } from './components/TodoTable';
import { loadTodos, saveTodos } from './storage';
import type { Priority, TodoItem } from './types';

const createTodo = (text: string, priority: Priority): TodoItem => {
  return {
    id: Math.random().toString(16).substring(2, 10),
    text,
    completed: false,
    priority
  };
};

const App = (): JSX.Element => {
  const [draftUsername, setDraftUsername] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [taskText, setTaskText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('normal');
  const [todoForDelete, setTodoForDelete] = useState<TodoItem | null>(null);
  const [todoForEdit, setTodoForEdit] = useState<TodoItem | null>(null);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setTodos(loadTodos(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    saveTodos(currentUser, todos);
  }, [currentUser, todos]);

  const headerText = useMemo(() => {
    if (!currentUser) {
      return 'Todo App';
    }
    return `Todo App: ${currentUser}`;
  }, [currentUser]);

  const login = (): void => {
    const normalized = draftUsername.trim();
    if (normalized.length > 0) {
      setCurrentUser(normalized);
    }
  };

  const logout = (): void => {
    setCurrentUser(null);
    setDraftUsername('');
    setTodos([]);
    setTaskText('');
    setPriority('normal');
  };

  const addTodo = (): void => {
    const text = taskText.trim();
    if (text.length === 0) {
      return;
    }
    setTodos((prev) => [...prev, createTodo(text, priority)]);
    setTaskText('');
    setPriority('normal');
  };

  const toggleTodo = (id: string): void => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const editTodo = (newText: string): void => {
    if (!todoForEdit) {
      return;
    }
    setTodos((prev) => prev.map((todo) => (todo.id === todoForEdit.id ? { ...todo, text: newText } : todo)));
    setTodoForEdit(null);
  };

  const deleteTodo = (): void => {
    if (!todoForDelete) {
      return;
    }
    setTodos((prev) => prev.filter((todo) => todo.id !== todoForDelete.id));
    setTodoForDelete(null);
  };

  return (
    <Container fluid className="app-root py-5">
      <div className="mx-auto app-shell">
        <h1 className="text-center text-white mb-4 fw-bold">{headerText}</h1>

        {!currentUser ? (
          <LoginForm username={draftUsername} onChange={setDraftUsername} onSubmit={login} />
        ) : (
          <Card className="glass-card p-3 p-md-4 shadow-lg">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 mb-3">
              <h3 className="text-white m-0">Ваши задачи</h3>
              <Button variant="outline-light" size="sm" onClick={logout} className="user-switch-btn">
                Сменить пользователя
              </Button>
            </div>

            <TodoForm
              taskText={taskText}
              priority={priority}
              onTaskTextChange={setTaskText}
              onPriorityChange={setPriority}
              onSubmit={addTodo}
            />

            <TodoTable
              todos={todos}
              onDeleteClick={setTodoForDelete}
              onToggle={toggleTodo}
              onEditClick={setTodoForEdit}
            />
          </Card>
        )}
      </div>

      <ConfirmDeleteModal
        show={todoForDelete !== null}
        taskText={todoForDelete?.text ?? ''}
        onCancel={() => setTodoForDelete(null)}
        onConfirm={deleteTodo}
      />

      <EditTaskModal
        show={todoForEdit !== null}
        task={todoForEdit}
        onCancel={() => setTodoForEdit(null)}
        onSave={editTodo}
      />
    </Container>
  );
};

export default App;
