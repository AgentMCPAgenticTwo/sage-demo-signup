import { el, card } from '../ui.js';
import { currentUser } from '../store.js';

export function renderWelcome() {
  const user = currentUser();
  if (!user) {
    location.hash = '#/login';
    return el('div');
  }
  return card(
    `Welcome, ${user.name || user.email}`,
    el('p', {}, 'You are signed in.'),
    el('p', { class: 'switch' }, el('a', { href: '#/login' }, 'Log out')),
  );
}
