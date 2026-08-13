/* Share button in the sidebar.
   On phones it hands off to the native share sheet; on desktop it opens
   its own menu with copy-link and Telegram / LinkedIn / email intents. */

// Read canonical rather than location.href: on a local build or a preview
// the link would carry localhost, and this button is used to send the page
// to recruiters.
function pageUrl() {
  const canonical = document.querySelector('link[rel="canonical"]');
  return (canonical && canonical.href) || location.href;
}

function pageTitle() {
  return document.title;
}

function targets(url, title) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return {
    telegram: `https://t.me/share/url?url=${u}&text=${t}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    email: `mailto:?subject=${t}&body=${u}`,
  };
}

// clipboard.writeText is unavailable in insecure contexts (http, file://),
// hence the legacy hidden-field path.
function copy(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(field);
    field.select();
    try {
      document.execCommand('copy') ? resolve() : reject();
    } catch (e) {
      reject(e);
    }
    document.body.removeChild(field);
  });
}

export function initShare() {
  const toggle = document.querySelector('[data-share]');
  const menu = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
  if (!menu) return;

  const copyBtn = menu.querySelector('[data-share-copy]');
  const copyLabel = copyBtn ? copyBtn.textContent : '';
  let copyTimer = null;

  const links = targets(pageUrl(), pageTitle());
  menu.querySelectorAll('[data-share-net]').forEach((link) => {
    link.href = links[link.dataset.shareNet];
  });

  function close() {
    menu.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function open() {
    menu.removeAttribute('hidden');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', () => {
    // The native sheet is mostly a mobile thing; our own menu is redundant there.
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      navigator.share({ title: pageTitle(), url: pageUrl() }).catch(() => {});
      return;
    }
    menu.hasAttribute('hidden') ? open() : close();
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copy(pageUrl()).then(
        () => {
          copyBtn.textContent = 'Link copied';
          clearTimeout(copyTimer);
          copyTimer = setTimeout(() => {
            copyBtn.textContent = copyLabel;
          }, 1800);
        },
        () => {
          copyBtn.textContent = 'Press Ctrl+C';
        }
      );
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.share')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || menu.hasAttribute('hidden')) return;
    close();
    toggle.focus();
  });
}
