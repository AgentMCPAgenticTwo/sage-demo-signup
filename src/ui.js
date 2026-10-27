// Small helpers shared by the pages.

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else node.setAttribute(key, value);
  }
  node.append(...children);
  return node;
}

export function field(label, input) {
  return el('label', { class: 'field' }, el('span', {}, label), input);
}

export function card(title, ...children) {
  return el('main', { class: 'card' }, el('h1', {}, title), ...children);
}

export function message(text, kind = 'error') {
  return el('p', { class: `message ${kind}`, role: kind === 'error' ? 'alert' : 'status' }, text);
}
