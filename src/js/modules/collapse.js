/* Раскрытие описаний проектов. Панель находится по aria-controls,
   поэтому разметку карточки можно менять не трогая этот код. */

export function initCollapse() {
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-collapse]');
    if (!toggle) return;

    const panel = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!panel) return;

    const open = panel.hasAttribute('hidden');
    panel.toggleAttribute('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
  });
}
