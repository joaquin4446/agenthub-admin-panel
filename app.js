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
const usersSection = document.querySelector('#users');
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
    const showUsers = button.dataset.section === 'users';
    sectionTitle.textContent = title;
    sectionContext.textContent = button.dataset.context;
    document.title = `${title} | AgentHub`;
    dashboard.hidden = !showDashboard;
    usersSection.hidden = !showUsers;
    pendingSection.hidden = showDashboard || showUsers;
    closeUserActions();

    if (mobileMenu.open) mobileMenu.close();
    sectionTitle.focus();
  });
}

themeToggle.addEventListener('click', () => {
  const darkMode = document.documentElement.classList.toggle('dark');
  themeToggle.setAttribute('aria-pressed', String(darkMode));
});

const users = [
  { id: 'U001', name: 'Camila Torres', email: 'camila@empresa.example', company: 'Torre Norte', plan: 'Business', status: 'Activo', registered: '12/09/2026', agents: ['Atlas'] },
  { id: 'U002', name: 'Mateo Ríos', email: 'mateo@empresa.example', company: 'Río Consultoría', plan: 'Pro', status: 'Activo', registered: '21/09/2026', agents: ['Nova'] },
  { id: 'U003', name: 'Daniela Vega', email: 'daniela@empresa.example', company: 'Vega Estudio', plan: 'Starter', status: 'Suspendido', registered: '24/09/2026', agents: ['Echo'] },
  { id: 'U004', name: 'Andrés Moreno', email: 'andres@empresa.example', company: 'Horizonte Digital', plan: 'Business', status: 'Activo', registered: '02/10/2026', agents: ['Iris'] },
  { id: 'U005', name: 'Valeria Cruz', email: 'valeria@empresa.example', company: 'Cruz Operaciones', plan: 'Pro', status: 'Pendiente', registered: '20/11/2026', agents: [] },
];

const statusColors = {
  Activo: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  Suspendido: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
  Pendiente: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
};
const usersRows = document.querySelector('#users-rows');
const usersEmpty = document.querySelector('#users-empty');
const usersFeedback = document.querySelector('#users-feedback');
const userDialog = document.querySelector('#user-dialog');
const dialogTitle = document.querySelector('#user-dialog-title');
const dialogDescription = document.querySelector('#user-dialog-description');
const dialogDetails = document.querySelector('#user-dialog-details');
const dialogDismiss = document.querySelector('#user-dialog-dismiss');
const dialogConfirm = document.querySelector('#user-dialog-confirm');
let openUserActions = null;
let pendingDeletion = null;

function statusBadge(status) {
  return `<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[status]}">${status}</span>`;
}

function closeUserActions() {
  openUserActions?.hidePopover();
}

// Only the local demonstration fixtures are interpolated into these templates.
function renderUserRow(user) {
  return `
    <tr data-user-id="${user.id}" class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
      <th scope="row" class="px-5 py-3 font-medium sm:px-6">${user.name}</th>
      <td class="px-5 py-3 text-slate-600 dark:text-slate-300 sm:px-6">${user.email}</td>
      <td class="px-5 py-3 text-slate-600 dark:text-slate-300 sm:px-6">${user.plan}</td>
      <td class="px-5 py-3 sm:px-6">${statusBadge(user.status)}</td>
      <td class="px-5 py-3 text-right sm:px-6">
        <button type="button" aria-label="Acciones de ${user.name}" aria-expanded="false" aria-controls="actions-${user.id}" popovertarget="actions-${user.id}" class="size-10 rounded-lg text-xl leading-none text-slate-600 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-slate-300 dark:hover:bg-slate-700">⋮</button>
        <div id="actions-${user.id}" popover="auto" class="inset-auto bottom-4 right-4 m-0 w-44 rounded-xl border border-slate-200 bg-white p-1 text-left text-sm text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 supports-[position-area:bottom]:inset-auto supports-[position-area:bottom]:[position-area:bottom_span-left] supports-[position-area:bottom]:justify-self-end supports-[position-area:bottom]:[position-try-fallbacks:flip-block]">
          <button type="button" data-user-action="detail" autofocus class="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:hover:bg-slate-800">Ver detalle</button>
          <button type="button" data-user-action="delete" class="block w-full rounded-lg px-3 py-2 text-left text-rose-700 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-rose-300 dark:hover:bg-rose-500/15">Eliminar</button>
        </div>
      </td>
    </tr>`;
}

function showUserDialog(user, action) {
  const isDeletion = action === 'delete';
  pendingDeletion = isDeletion ? user : null;
  dialogTitle.textContent = isDeletion ? 'Eliminar usuario' : 'Detalle de usuario';
  dialogDescription.textContent = isDeletion
    ? `¿Quieres eliminar a ${user.name} de esta sesión de demostración?`
    : user.name;
  dialogDismiss.textContent = isDeletion ? 'Cancelar' : 'Cerrar';
  dialogConfirm.hidden = !isDeletion;
  dialogDetails.hidden = isDeletion;

  if (!isDeletion) {
    const fields = [
      ['ID', user.id],
      ['Nombre', user.name],
      ['Email', user.email],
      ['Empresa', user.company],
      ['Plan contratado', user.plan],
      ['Estado', statusBadge(user.status)],
      ['Fecha de registro', user.registered],
      ['Agentes asignados', user.agents.join(', ') || 'Sin agentes asignados'],
    ];
    dialogDetails.innerHTML = fields.map(([label, value]) => `
      <div>
        <dt class="text-xs font-medium text-slate-600 dark:text-slate-400">${label}</dt>
        <dd class="mt-1 break-words font-medium">${value}</dd>
      </div>`).join('');
  }

  userDialog.showModal();
}

usersRows.innerHTML = users.map(renderUserRow).join('');

for (const panel of usersRows.querySelectorAll('[popover]')) {
  panel.addEventListener('beforetoggle', (event) => {
    const expanded = event.newState === 'open';
    panel.previousElementSibling.setAttribute('aria-expanded', String(expanded));
    if (expanded) openUserActions = panel;
    else if (openUserActions === panel) openUserActions = null;
  });
}

usersRows.addEventListener('click', (event) => {
  const action = event.target.closest('[data-user-action]');
  if (!action) return;

  const row = action.closest('[data-user-id]');
  const user = users.find(({ id }) => id === row.dataset.userId);
  closeUserActions();
  row.querySelector('[popovertarget]').focus();
  showUserDialog(user, action.dataset.userAction);
});

userDialog.addEventListener('click', (event) => {
  if (event.target !== userDialog) return;
  const bounds = userDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX >= bounds.right ||
      event.clientY < bounds.top || event.clientY >= bounds.bottom) {
    userDialog.close();
  }
});

userDialog.querySelector('form').addEventListener('submit', (event) => {
  if (event.submitter !== dialogConfirm || !pendingDeletion) return;
  event.preventDefault();

  const user = pendingDeletion;
  pendingDeletion = null;
  const row = usersRows.querySelector(`[data-user-id="${user.id}"]`);
  const nextRow = row.nextElementSibling || row.previousElementSibling;
  userDialog.close();
  users.splice(users.indexOf(user), 1);
  row.remove();
  usersFeedback.textContent = `${user.name} se eliminó de esta sesión.`;

  if (nextRow) {
    nextRow.querySelector('[popovertarget]').focus();
  } else {
    document.querySelector('#users-table').parentElement.hidden = true;
    usersEmpty.hidden = false;
    usersEmpty.focus();
  }
});
