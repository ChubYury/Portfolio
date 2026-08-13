/* Бургер-меню. Ширина 992px совпадает с брейкпоинтом lg,
   на котором меню скрывается и появляются обычные ссылки. */

const DESKTOP = '(min-width: 992px)';

function setOpen(toggle, menu, open) {
  menu.toggleAttribute('hidden', !open);
  toggle.setAttribute('aria-expanded', String(open));
}

export function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    setOpen(toggle, menu, menu.hasAttribute('hidden'));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) setOpen(toggle, menu, false);
  });

  const desktop = window.matchMedia(DESKTOP);
  const onChange = (e) => {
    if (e.matches) setOpen(toggle, menu, false);
  };
  if (desktop.addEventListener) {
    desktop.addEventListener('change', onChange);
  } else if (desktop.addListener) {
    desktop.addListener(onChange);
  }
}
