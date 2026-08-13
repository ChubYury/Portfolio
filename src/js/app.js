import * as flsFunctions from "./modules/webpTest.js";
import { initTheme } from "./modules/theme.js";
import { initMenu } from "./modules/menu.js";
import { initCollapse } from "./modules/collapse.js";
import { initShare } from "./modules/share.js";
import { initNavActive } from "./modules/navActive.js";

document.addEventListener('DOMContentLoaded', () => {
  flsFunctions.isWebp();
  initTheme();
  initMenu();
  initCollapse();
  initShare();
  initNavActive();
})
