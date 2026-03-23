import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import type { TodoItem } from '../types';

interface EditTaskModalProps {
  show: boolean;
  task: TodoItem | null;
  onCancel: () => void;
  onSave: (newText: string) => void;
}

export const EditTaskModal = ({ show, task, onCancel, onSave }: EditTaskModalProps): JSX.Element => {
  const [draft, setDraft] = useState<string>('');

  useEffect(() => {
    setDraft(task?.text ?? '');
  }, [task]);

  const isDisabled = draft.trim().length === 0;

  return (
    <Modal show={show} onHide={onCancel} centered contentClassName="modal-dark">
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Редактирование задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="dark-input"
          placeholder="Новый текст задачи"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
        <Button variant="light" disabled={isDisabled} onClick={() => onSave(draft.trim())}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
