import { useEffect } from 'react';
import { Card } from '../components/Card.jsx';
import { Link, navigate } from '../router.jsx';
import { currentUser } from '../store.js';

export default function Welcome() {
  const user = currentUser();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  if (!user) return null;
  return (
    <Card title={`Welcome, ${user.name || user.email}`}>
      <p>You are signed in.</p>
      <p className="switch">
        <Link to="/login">Log out</Link>
      </p>
    </Card>
  );
}
