/* Highlights the nav link for the section currently in view. The link list is
   rendered twice — header bar and burger menu — so both copies are updated. */

// Matches scroll-margin-top in base.sass: the sticky header covers that much,
// so a section counts as current once its top passes below the bar.
const HEADER_OFFSET = 80;

export function initNavActive() {
  const links = Array.from(document.querySelectorAll('.nav_link, .menu_link'));
  if (!links.length) return;

  const sections = [];
  links.forEach((link) => {
    const id = (link.getAttribute('href') || '').slice(1);
    const section = id && document.getElementById(id);
    if (section && sections.indexOf(section) === -1) sections.push(section);
  });
  if (!sections.length) return;

  // The nav lists Projects before Experience while the markup has them the
  // other way round, and both the scan below and the bottom-of-page fallback
  // assume document order.
  sections.sort((a, b) =>
    a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );

  function paint(id) {
    links.forEach((link) => {
      const modifier = link.classList.contains('menu_link')
        ? 'menu_link--active'
        : 'nav_link--active';
      link.classList.toggle(modifier, link.getAttribute('href') === '#' + id);
    });
  }

  function current() {
    let active = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= HEADER_OFFSET + 1) active = section;
    });
    // The last section is shorter than the viewport, so its top never reaches
    // the line. At the bottom of the page it is the one being looked at.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      active = sections[sections.length - 1];
    }
    return active.id;
  }

  // Five rect reads per event, so it runs straight from the listener instead
  // of being deferred to a frame.
  function update() {
    paint(current());
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}
