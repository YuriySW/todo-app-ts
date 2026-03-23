import { memo } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';
import type { Priority, TodoItem } from '../types';

interface TodoTableProps {
  todos: TodoItem[];
  onDeleteClick: (todo: TodoItem) => void;
  onToggle: (id: string) => void;
  onEditClick: (todo: TodoItem) => void;
}

const priorityMap: Record<Priority, { label: string; className: string }> = {
  normal: { label: 'Обычная', className: 'priority-normal' },
  important: { label: 'Важная', className: 'priority-important' },
  urgent: { label: 'Срочная', className: 'priority-urgent' }
};

interface TodoRowProps {
  todo: TodoItem;
  index: number;
  onDeleteClick: (todo: TodoItem) => void;
  onToggle: (id: string) => void;
  onEditClick: (todo: TodoItem) => void;
}

const TodoRow = memo(({ todo, index, onDeleteClick, onToggle, onEditClick }: TodoRowProps): JSX.Element => {
  const rowClass = todo.completed ? 'table-success' : 'table-light';
  const statusText = todo.completed ? 'Выполнена' : 'В процессе';
  const priority = priorityMap[todo.priority];

  return (
    <tr className={rowClass}>
      <td>{index + 1}</td>
      <td className={todo.completed ? 'text-decoration-line-through' : ''}>{todo.text}</td>
      <td>{statusText}</td>
      <td>
        <Badge className={priority.className}>{priority.label}</Badge>
      </td>
      <td className="d-flex gap-2">
        <Button size="sm" variant="danger" onClick={() => onDeleteClick(todo)}>
          Удалить
        </Button>
        <Button size="sm" variant="secondary" onClick={() => onEditClick(todo)}>
          Редактировать
        </Button>
        <Button size="sm" variant="success" onClick={() => onToggle(todo.id)}>
          Завершить
        </Button>
      </td>
    </tr>
  );
});

TodoRow.displayName = 'TodoRow';

export const TodoTable = ({ todos, onDeleteClick, onToggle, onEditClick }: TodoTableProps): JSX.Element => {
  const isEmpty = todos.length === 0;

  return (
    <>
      <div className="table-wrapper d-none d-md-block">
        <Table hover bordered responsive className="align-middle table-dark-custom">
          <thead>
            <tr>
              <th>№</th>
              <th>Задача</th>
              <th>Статус</th>
              <th>Важность</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {isEmpty ? (
              <tr className="table-light">
                <td colSpan={5} className="text-center text-secondary">
                  Пока нет задач
                </td>
              </tr>
            ) : (
              todos.map((todo, index) => (
                <TodoRow
                  key={todo.id}
                  todo={todo}
                  index={index}
                  onDeleteClick={onDeleteClick}
                  onToggle={onToggle}
                  onEditClick={onEditClick}
                />
              ))
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-md-none">
        {isEmpty ? (
          <div className="mobile-task-card text-secondary text-center">Пока нет задач</div>
        ) : (
          todos.map((todo, index) => {
            const statusText = todo.completed ? 'Выполнена' : 'В процессе';
            const priority = priorityMap[todo.priority];
            return (
              <div key={todo.id} className="mobile-task-card">
                <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                  <div className={`fw-semibold ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                    {index + 1}. {todo.text}
                  </div>
                  <Badge className={priority.className}>{priority.label}</Badge>
                </div>
                <div className="mobile-status small mb-3">Статус: {statusText}</div>
                <div className="mobile-actions-row">
                  <Button size="sm" variant="danger" className="mobile-action-btn" onClick={() => onDeleteClick(todo)}>
                    Удалить
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="mobile-action-btn"
                    onClick={() => onEditClick(todo)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="sm"
                    variant="success"
                    className="mobile-action-btn"
                    onClick={() => onToggle(todo.id)}
                  >
                    Завершить
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
