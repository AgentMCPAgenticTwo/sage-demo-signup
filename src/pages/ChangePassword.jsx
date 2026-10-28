import { useEffect, useState } from 'react';
import { Card, Field, Message } from '../components/Card.jsx';
import { PasswordRules, passwordIsValid } from '../components/PasswordRules.jsx';
import { Link, navigate } from '../router.jsx';
import { currentUser, saveUser } from '../store.js';

export default function ChangePassword() {
  const user = currentUser();
  const [form, setForm] = useState({ current: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [showRuleErrors, setShowRuleErrors] = useState(false);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  function submit(event) {
    event.preventDefault();
    if (form.current !== user.password) {
      setShowRuleErrors(false);
      setError('Your current password is incorrect.');
      return;
    }
    if (!passwordIsValid(form.password)) {
      setShowRuleErrors(true);
      setError('Your new password does not meet the rules below.');
      return;
    }
    setShowRuleErrors(false);
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    saveUser({ ...user, password: form.password });
    navigate('/welcome');
  }

  if (!user) return null;
  return (
    <Card title="Change your password">
      <form onSubmit={submit} noValidate>
        <Field
          label="Current password"
          name="current"
          type="password"
          autoComplete="current-password"
          value={form.current}
          onChange={set('current')}
          required
        />
        <Field
          label="New password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={set('password')}
          required
        />
        <PasswordRules password={form.password} showErrors={showRuleErrors} />
        <Field
          label="Confirm new password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set('confirm')}
          required
        />
        <Message>{error}</Message>
        <button type="submit">Change password</button>
      </form>
      <p className="switch">
        <Link to="/welcome">Back to welcome</Link>
      </p>
    </Card>
  );
}
