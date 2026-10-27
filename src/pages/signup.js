import { el, field, card, message } from '../ui.js';
import { findUser, saveUser } from '../store.js';

export function renderSignup() {
  const name = el('input', { name: 'name', required: '', autocomplete: 'name' });
  const email = el('input', { name: 'email', type: 'email', required: '', autocomplete: 'email' });
  const password = el('input', { name: 'password', type: 'password', required: '', autocomplete: 'new-password' });
  const confirm = el('input', { name: 'confirm', type: 'password', required: '', autocomplete: 'new-password' });
  const status = el('div');

  function submit(event) {
    event.preventDefault();
    status.innerHTML = '';
    if (password.value !== confirm.value) {
      status.append(message('Passwords do not match.'));
      return;
    }
    if (findUser(email.value)) {
      status.append(message('An account with this email already exists.'));
      return;
    }
    saveUser({ name: name.value.trim(), email: email.value.trim(), password: password.value });
    location.hash = '#/login';
  }

  return card(
    'Create your account',
    el(
      'form',
      { onsubmit: submit, novalidate: '' },
      field('Full name', name),
      field('Email', email),
      field('Password', password),
      field('Confirm password', confirm),
      status,
      el('button', { type: 'submit' }, 'Sign up'),
    ),
    el('p', { class: 'switch' }, 'Already have an account? ', el('a', { href: '#/login' }, 'Log in')),
  );
}
