import { useState } from 'react';
import { Card, Field, Message } from '../components/Card.jsx';
import PasswordRules, { unmetRules } from '../components/PasswordRules.jsx';
import { Link, navigate } from '../router.jsx';
import { findUser, saveUser } from '../store.js';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [failed, setFailed] = useState([]);

  function submit(event) {
    event.preventDefault();
    const broken = unmetRules(password);
    setFailed(broken);
    if (broken.length) {
      setError('Your new password does not meet the rules below.');
      return;
    }
    const user = findUser(email);
    if (!user) {
      setError('No account was found for this email.');
      return;
    }
    saveUser({ ...user, password });
    setError('');
    navigate('/login');
  }

  return (
    <Card title="Reset your password">
      <form onSubmit={submit} noValidate>
        <Field label="Email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Field label="New password" name="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <PasswordRules password={password} failed={failed} />
        <Message>{error}</Message>
        <button type="submit">Reset password</button>
      </form>
      <p className="switch">
        Remembered it? <Link to="/login">Log in</Link>
      </p>
    </Card>
  );
}
