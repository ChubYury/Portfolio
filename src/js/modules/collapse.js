/* Expandable project descriptions. The panel is looked up by aria-controls,
   so the card markup can change without touching this code. */

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
