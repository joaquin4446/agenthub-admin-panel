const desktopSidebar = document.querySelector('#desktop-sidebar');
const sidebarContent = document.querySelector('#sidebar-content');
const mobileMenu = document.querySelector('#mobile-menu');
const openMenu = document.querySelector('#open-menu');
const closeMenu = document.querySelector('#close-menu');
const desktopLayout = window.matchMedia('(min-width: 768px)');

const sectionButtons = sidebarContent.querySelectorAll('[data-section]');
const sectionTitle = document.querySelector('#section-title');
const sectionContext = document.querySelector('#section-context');
const dashboard = document.querySelector('#dashboard');
const pendingSection = document.querySelector('#pending-section');
const themeToggle = document.querySelector('#theme-toggle');

openMenu.addEventListener('click', () => {
  mobileMenu.append(sidebarContent);
  mobileMenu.showModal();
  openMenu.setAttribute('aria-expanded', 'true');
});

closeMenu.addEventListener('click', () => mobileMenu.close());

mobileMenu.addEventListener('click', (event) => {
  if (event.target === mobileMenu) mobileMenu.close();
});

mobileMenu.addEventListener('close', () => {
  if (mobileMenu.open) return;
  desktopSidebar.append(sidebarContent);
  openMenu.setAttribute('aria-expanded', 'false');
});

desktopLayout.addEventListener('change', (event) => {
  if (event.matches && mobileMenu.open) {
    mobileMenu.close();
    sectionTitle.focus();
  }
});

for (const button of sectionButtons) {
  button.addEventListener('click', () => {
    sidebarContent.querySelector('[aria-current="page"]').removeAttribute('aria-current');
    button.setAttribute('aria-current', 'page');

    const title = button.querySelector('span').textContent;
    const showDashboard = button.dataset.section === 'dashboard';
    sectionTitle.textContent = title;
    sectionContext.textContent = button.dataset.context;
    document.title = `${title} | AgentHub`;
    dashboard.hidden = !showDashboard;
    pendingSection.hidden = showDashboard;

    if (mobileMenu.open) mobileMenu.close();
    sectionTitle.focus();
  });
}

themeToggle.addEventListener('click', () => {
  const darkMode = document.documentElement.classList.toggle('dark');
  themeToggle.setAttribute('aria-pressed', String(darkMode));
});
