// Demo-only account store in localStorage. Not for real credentials.
const KEY = 'acme-users';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function findUser(email) {
  return load()[email.trim().toLowerCase()] ?? null;
}

export function saveUser(user) {
  const users = load();
  users[user.email.trim().toLowerCase()] = user;
  localStorage.setItem(KEY, JSON.stringify(users));
}

export function setCurrentUser(email) {
  sessionStorage.setItem('acme-current', email);
}

export function currentUser() {
  const email = sessionStorage.getItem('acme-current');
  return email ? findUser(email) : null;
}
