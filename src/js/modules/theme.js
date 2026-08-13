/* Dark and light theme switching.
   The initial data-theme is set by the inline script in head; this module
   only handles the buttons and reacts to system theme changes. */

const STORAGE_KEY = 'theme';

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch (e) {
    return null;
  }
}

function store(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {}
}

function paint(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('[data-set-theme]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.setTheme === theme));
  });
}

export function initTheme() {
  paint(document.documentElement.getAttribute('data-theme') || 'dark');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-set-theme]');
    if (!btn) return;
    store(btn.dataset.setTheme);
    paint(btn.dataset.setTheme);
  });

  // Follow the system theme only until the user makes an explicit choice.
  const system = window.matchMedia('(prefers-color-scheme: light)');
  const onSystemChange = (e) => {
    if (readStored()) return;
    paint(e.matches ? 'light' : 'dark');
  };
  if (system.addEventListener) {
    system.addEventListener('change', onSystemChange);
  } else if (system.addListener) {
    system.addListener(onSystemChange);
  }
}
