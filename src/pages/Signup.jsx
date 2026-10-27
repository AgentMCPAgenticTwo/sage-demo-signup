import { useState } from 'react';
import { Card, Field, Message } from '../components/Card.jsx';
import { Link, navigate } from '../router.jsx';
import { findUser, saveUser } from '../store.js';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  function submit(event) {
    event.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (findUser(form.email)) {
      setError('An account with this email already exists.');
      return;
    }
    saveUser({ name: form.name.trim(), email: form.email.trim(), password: form.password });
    navigate('/login');
  }

  return (
    <Card title="Create your account">
      <form onSubmit={submit} noValidate>
        <Field label="Full name" name="name" autoComplete="name" value={form.name} onChange={set('name')} required />
        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} required />
        <Field label="Password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} required />
        <Field label="Confirm password" name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} required />
        <Message>{error}</Message>
        <button type="submit">Sign up</button>
      </form>
      <p className="switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </Card>
  );
}
