import './style.css';
import { renderSignup } from './pages/signup.js';
import { renderLogin } from './pages/login.js';
import { renderWelcome } from './pages/welcome.js';

// Hash routes: #/signup, #/login, #/welcome. Add a page by adding it here.
const routes = {
  '/signup': renderSignup,
  '/login': renderLogin,
  '/welcome': renderWelcome,
};

function render() {
  const path = location.hash.replace(/^#/, '') || '/signup';
  const page = routes[path] ?? renderSignup;
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.append(page());
}

window.addEventListener('hashchange', render);
render();
