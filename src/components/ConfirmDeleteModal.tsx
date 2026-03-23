import { Button, Modal } from 'react-bootstrap';

interface ConfirmDeleteModalProps {
  show: boolean;
  taskText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDeleteModal = ({
  show,
  taskText,
  onCancel,
  onConfirm
}: ConfirmDeleteModalProps): JSX.Element => {
  return (
    <Modal show={show} onHide={onCancel} centered contentClassName="modal-dark">
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Удалить задачу?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите удалить задачу:
        <div className="mt-2 text-light-emphasis">"{taskText}"</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
