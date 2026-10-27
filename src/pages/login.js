import { el, field, card, message } from '../ui.js';
import { findUser, setCurrentUser } from '../store.js';

export function renderLogin() {
  const email = el('input', { name: 'email', type: 'email', required: '', autocomplete: 'email' });
  const password = el('input', { name: 'password', type: 'password', required: '', autocomplete: 'current-password' });
  const status = el('div');

  function submit(event) {
    event.preventDefault();
    status.innerHTML = '';
    const user = findUser(email.value);
    if (!user || user.password !== password.value) {
      status.append(message('Email or password is incorrect.'));
      return;
    }
    setCurrentUser(user.email);
    location.hash = '#/welcome';
  }

  return card(
    'Log in',
    el(
      'form',
      { onsubmit: submit, novalidate: '' },
      field('Email', email),
      field('Password', password),
      status,
      el('button', { type: 'submit' }, 'Log in'),
    ),
    el('p', { class: 'switch' }, 'New here? ', el('a', { href: '#/signup' }, 'Create an account')),
  );
}
