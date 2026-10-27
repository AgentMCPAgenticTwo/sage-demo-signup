import { useState } from 'react';
import { Card, Field } from '../components/Card.jsx';
import { Link, navigate } from '../router.jsx';
import { findUser, saveUser } from '../store.js';

export const PASSWORD_RULES = [
  { hint: 'At least 8 characters', error: 'Password must be at least 8 characters long.', test: (value) => value.length >= 8 },
  { hint: 'At least one uppercase letter', error: 'Password must contain at least one uppercase letter.', test: (value) => /[A-Z]/.test(value) },
  { hint: 'At least one lowercase letter', error: 'Password must contain at least one lowercase letter.', test: (value) => /[a-z]/.test(value) },
  { hint: 'At least one number', error: 'Password must contain at least one number.', test: (value) => /[0-9]/.test(value) },
  { hint: 'At least one special character', error: 'Password must contain at least one special character.', test: (value) => /[^A-Za-z0-9]/.test(value) },
];

export function passwordErrors(password) {
  return PASSWORD_RULES.filter((rule) => !rule.test(password)).map((rule) => rule.error);
}

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState([]);

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const setError = (message) => setErrors([message]);

  function submit(event) {
    event.preventDefault();
    const failed = passwordErrors(form.password);
    if (failed.length) {
      setErrors(failed);
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
        <Field label="Password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={set('password')} required />
        <ul className="hints">
          {PASSWORD_RULES.map((rule) => (
            <li key={rule.hint}>{rule.hint}</li>
          ))}
        </ul>
        <Field label="Confirm password" name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={set('confirm')} required />
        {errors.length > 0 && (
          <ul className="message error" role="alert">
            {errors.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}
        <button type="submit">Sign up</button>
      </form>
      <p className="switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </Card>
  );
}
