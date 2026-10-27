import { useState } from 'react';
import { Card, Field, Message } from '../components/Card.jsx';
import { Link, navigate } from '../router.jsx';
import { findUser, saveUser } from '../store.js';

export const passwordRules = [
  { label: 'At least 8 characters', error: 'Password must be at least 8 characters long.', test: (value) => value.length >= 8 },
  { label: 'One uppercase letter', error: 'Password must contain at least one uppercase letter.', test: (value) => /[A-Z]/.test(value) },
  { label: 'One lowercase letter', error: 'Password must contain at least one lowercase letter.', test: (value) => /[a-z]/.test(value) },
  { label: 'One number', error: 'Password must contain at least one number.', test: (value) => /[0-9]/.test(value) },
  {
    label: 'One special character',
    error: 'Password must contain at least one special character.',
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
];

export function passwordErrors(value) {
  return passwordRules.filter((rule) => !rule.test(value)).map((rule) => rule.error);
}

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]);

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  function submit(event) {
    event.preventDefault();
    const failed = passwordErrors(form.password);
    setErrors(failed);
    if (failed.length) {
      setError('');
      return;
    }
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
        <Field label="Password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} required aria-describedby="password-rules" />
        <ul className="rules" id="password-rules">
          {passwordRules.map((rule) => (
            <li key={rule.label}>{rule.label}</li>
          ))}
        </ul>
        {errors.length > 0 && (
          <ul className="message error" role="alert">
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}
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
