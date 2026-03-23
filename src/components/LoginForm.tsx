import { Button, Card, Form } from 'react-bootstrap';

interface LoginFormProps {
  username: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const LoginForm = ({ username, onChange, onSubmit }: LoginFormProps): JSX.Element => {
  const isDisabled = username.trim().length === 0;

  return (
    <Card className="glass-card p-4 shadow-lg login-card">
      <h2 className="mb-3 text-white">Авторизация</h2>
      <p className="text-secondary mb-4">Введите имя пользователя для продолжения</p>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          if (!isDisabled) {
            onSubmit();
          }
        }}
      >
        <Form.Group className="mb-3">
          <Form.Control
            value={username}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Имя пользователя"
            className="dark-input"
          />
        </Form.Group>
        <Button type="submit" variant="light" disabled={isDisabled} className="w-100 fw-semibold">
          Войти
        </Button>
      </Form>
    </Card>
  );
};
