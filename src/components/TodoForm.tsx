import { Button, Col, Form, Row } from 'react-bootstrap';
import type { Priority } from '../types';

interface TodoFormProps {
  taskText: string;
  priority: Priority;
  onTaskTextChange: (value: string) => void;
  onPriorityChange: (value: Priority) => void;
  onSubmit: () => void;
}

export const TodoForm = ({
  taskText,
  priority,
  onTaskTextChange,
  onPriorityChange,
  onSubmit
}: TodoFormProps): JSX.Element => {
  const isDisabled = taskText.trim().length === 0;

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (!isDisabled) {
          onSubmit();
        }
      }}
      className="mb-4"
    >
      <Row className="g-2">
        <Col md={7}>
          <Form.Control
            value={taskText}
            onChange={(event) => onTaskTextChange(event.target.value)}
            placeholder="Введите задачу"
            className="dark-input"
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={priority}
            onChange={(event) => onPriorityChange(event.target.value as Priority)}
            className="dark-input"
          >
            <option value="normal">Обычная</option>
            <option value="important">Важная</option>
            <option value="urgent">Срочная</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button type="submit" variant="light" disabled={isDisabled} className="w-100 fw-semibold">
            Сохранить
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
