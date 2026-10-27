import { useState } from 'react';
import { Card, Field, Message } from '../components/Card.jsx';
import { Link, navigate } from '../router.jsx';
import { findUser, saveUser } from '../store.js';

export default function ResetPassword() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const user = findUser(form.email);
    if (!user) {
      setError('No account with this email exists.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    saveUser({ ...user, password: form.password });
    navigate('/login');
  }

  return (
    <Card title="Reset your password">
      <form onSubmit={submit} noValidate>
        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
        <Field label="New password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} required />
        <Field label="Confirm new password" name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} required />
        <Message>{error}</Message>
        <button type="submit">Reset password</button>
      </form>
      <p className="switch">
        Remembered it? <Link to="/login">Log in</Link>
      </p>
    </Card>
  );
}
