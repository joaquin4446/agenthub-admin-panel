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
const agentsSection = document.querySelector('#bot');
const skillsSection = document.querySelector('#skills');
const contractsSection = document.querySelector('#contracts');
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
    const showAgents = button.dataset.section === 'bot';
    const showSkills = button.dataset.section === 'skills';
    const showContracts = button.dataset.section === 'contracts';
    closeActions();
    sectionTitle.textContent = title;
    sectionContext.textContent = button.dataset.context;
    document.title = `${title} | AgentHub`;
    dashboard.hidden = !showDashboard;
    usersSection.hidden = !showUsers;
    agentsSection.hidden = !showAgents;
    skillsSection.hidden = !showSkills;
    contractsSection.hidden = !showContracts;
    pendingSection.hidden = showDashboard || showUsers || showAgents || showSkills || showContracts;

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

const agents = [
  {
    id: 'A001', name: 'Atlas', owner: 'Camila Torres', status: 'Activo',
    skills: ['Navegación web', 'Lectura de documentos', 'Gestión de calendario'],
    description: 'Asistente empresarial para investigación, documentos y organización de agendas.',
    prompt: 'Eres Atlas, un asistente empresarial. Investiga fuentes públicas, resume documentos e identifica fechas y tareas para organizar la agenda del equipo.',
  },
  {
    id: 'A002', name: 'Nova', owner: 'Mateo Ríos', status: 'Fallando',
    skills: ['Navegación web', 'Análisis de datos'],
    description: 'Agente especializado en investigación y análisis de información.',
    prompt: 'Eres Nova, un asistente de investigación. Contrasta fuentes públicas, analiza tablas y presenta tus hallazgos con las métricas y limitaciones relevantes.',
  },
  {
    id: 'A003', name: 'Iris', owner: 'Andrés Moreno', status: 'Activo',
    skills: ['Lectura de documentos', 'Gestión de calendario'],
    description: 'Asistente administrativo para documentos y planificación.',
    prompt: 'Eres Iris, un asistente administrativo. Extrae acuerdos y plazos de los documentos y propone horarios para las tareas pendientes.',
  },
  {
    id: 'A004', name: 'Echo', owner: 'Daniela Vega', status: 'Inactivo',
    skills: ['Lectura de documentos'],
    description: 'Agente de procesamiento y resumen de documentos.',
    prompt: 'Eres Echo, un asistente documental. Resume cada documento, conserva sus cifras y fechas e indica las páginas de los hallazgos cuando estén disponibles.',
  },
];

const skills = [
  {
    id: 'S001', name: 'Navegación web', category: 'Investigación y navegación',
    description: 'Consulta páginas y recopila información pública.',
    details: 'Localiza información en sitios públicos, compara lo que dicen distintas fuentes y conserva los enlaces para poder revisar los hallazgos.',
    examples: ['Comparar los requisitos publicados para dos becas ficticias.', 'Recopilar fechas y enlaces de eventos publicados por un centro cultural ficticio.'],
    icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18 M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>',
  },
  {
    id: 'S002', name: 'Lectura de documentos', category: 'Procesamiento documental',
    description: 'Extrae y resume información de archivos.',
    details: 'Identifica secciones relevantes en documentos, extrae datos como fechas y acuerdos, y prepara resúmenes para facilitar su revisión.',
    examples: ['Resumir el acta ficticia de una reunión de proyecto.', 'Extraer plazos y responsables de un manual de incorporación de ejemplo.'],
    icon: '<path d="M6 3h9l4 4v14H6z M14 3v5h5 M9 12h7 M9 16h7"/>',
  },
  {
    id: 'S003', name: 'Gestión de calendario', category: 'Productividad y organización',
    description: 'Consulta y organiza agendas.',
    details: 'Revisa disponibilidades, identifica conflictos entre citas y propone horarios compatibles con la agenda y las prioridades del equipo.',
    examples: ['Proponer horarios para una reunión ficticia entre tres departamentos.', 'Detectar solapamientos en la agenda de un taller de ejemplo.'],
    icon: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4 M16 3v4 M3 10h18 M8 14h2 M14 14h2 M8 17h2"/>',
  },
  {
    id: 'S004', name: 'Análisis de datos', category: 'Analítica',
    description: 'Interpreta tablas y métricas.',
    details: 'Resume datos tabulares mediante métricas comparables, detecta variaciones y explica los resultados teniendo en cuenta la calidad de los datos.',
    examples: ['Comparar ventas mensuales de una tienda de demostración.', 'Detectar valores atípicos en una tabla ficticia de tiempos de entrega.'],
    icon: '<path d="M3 3v18h18 M8 16v-3 M13 16V9 M18 16V6"/>',
  },
].map(skill => ({
  ...skill,
  // Capture the original demo assignments before either inventory can be edited.
  agentNames: agents.filter(agent => agent.skills.includes(skill.name)).map(agent => agent.name),
}));

// Contract records keep the names and fees agreed at the time of rental.
const contracts = [
  {
    id: 'C001', client: 'Camila Torres', agent: 'Atlas', start: '2026-11-01', end: '2026-11-30',
    status: 'Activo', basePrice: 79,
    skills: [
      { name: 'Navegación web', price: 20 },
      { name: 'Lectura de documentos', price: 15 },
      { name: 'Gestión de calendario', price: 15 },
    ],
  },
  {
    id: 'C002', client: 'Mateo Ríos', agent: 'Nova', start: '2026-11-05', end: '2026-12-04',
    status: 'Activo', basePrice: 79,
    skills: [
      { name: 'Navegación web', price: 20 },
      { name: 'Análisis de datos', price: 20 },
    ],
  },
  {
    id: 'C003', client: 'Andrés Moreno', agent: 'Iris', start: '2026-11-10', end: '2026-12-09',
    status: 'Activo', basePrice: 79,
    skills: [
      { name: 'Lectura de documentos', price: 15 },
      { name: 'Gestión de calendario', price: 15 },
    ],
  },
  {
    id: 'C004', client: 'Daniela Vega', agent: 'Echo', start: '2026-10-01', end: '2026-10-31',
    status: 'Finalizado', basePrice: 74,
    skills: [{ name: 'Lectura de documentos', price: 15 }],
  },
];

const statusColors = {
  Activo: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  Suspendido: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
  Pendiente: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  Fallando: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
  Inactivo: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  Finalizado: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
};
const usersRows = document.querySelector('#users-rows');
const usersEmpty = document.querySelector('#users-empty');
const usersFeedback = document.querySelector('#users-feedback');
const agentsList = document.querySelector('#agents-list');
const agentsEmpty = document.querySelector('#agents-empty');
const agentsFeedback = document.querySelector('#agents-feedback');
const skillsList = document.querySelector('#skills-list');
const skillsEmpty = document.querySelector('#skills-empty');
const skillsFeedback = document.querySelector('#skills-feedback');
const contractsRows = document.querySelector('#contracts-rows');

const actionDialog = document.querySelector('#action-dialog');
const dialogTitle = document.querySelector('#action-dialog-title');
const dialogDescription = document.querySelector('#action-dialog-description');
const dialogDetails = document.querySelector('#action-dialog-details');
const dialogDismiss = document.querySelector('#action-dialog-dismiss');
const dialogConfirm = document.querySelector('#action-dialog-confirm');
const agentConfig = document.querySelector('#agent-dialog-config');
const agentMeta = document.querySelector('#agent-dialog-meta');
const agentPrompt = document.querySelector('#agent-prompt');
let openActions = null;
let confirmAction = null;

function statusBadge(status) {
  return `<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusColors[status]}">${status}</span>`;
}

function closeActions(trigger) {
  openActions?.hidePopover();
  trigger?.focus();
}

function renderActions({ id, name }, action, label, { canDelete = true } = {}) {
  return `
    <button type="button" aria-label="Acciones de ${name}" aria-expanded="false" aria-controls="actions-${id}" popovertarget="actions-${id}" class="size-10 rounded-lg text-xl leading-none text-slate-600 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-slate-300 dark:hover:bg-slate-700">⋮</button>
    <div id="actions-${id}" popover="auto" class="inset-auto bottom-4 right-4 m-0 w-44 rounded-xl border border-slate-200 bg-white p-1 text-left text-sm text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 supports-[position-area:bottom]:inset-auto supports-[position-area:bottom]:[position-area:bottom_span-left] supports-[position-area:bottom]:justify-self-end supports-[position-area:bottom]:[position-try-fallbacks:flip-block]">
      <button type="button" data-action="${action}" autofocus class="block w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:hover:bg-slate-800">${label}</button>
      ${canDelete ? '<button type="button" data-action="delete" class="block w-full rounded-lg px-3 py-2 text-left text-rose-700 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-rose-300 dark:hover:bg-rose-500/15">Eliminar</button>' : ''}
    </div>`;
}

function showActionDialog({ title, description, content, confirmation, destructive = false, onConfirm }) {
  dialogTitle.textContent = title;
  dialogDescription.textContent = description;
  dialogDetails.hidden = content !== dialogDetails;
  agentConfig.hidden = content !== agentConfig;
  dialogDismiss.textContent = confirmation ? 'Cancelar' : 'Cerrar';
  dialogConfirm.hidden = !confirmation;
  dialogConfirm.textContent = confirmation || '';
  dialogConfirm.dataset.destructive = String(destructive);
  confirmAction = onConfirm;
  actionDialog.showModal();
}

function confirmDeletion(record, entity, onConfirm) {
  showActionDialog({
    title: `Eliminar ${entity}`,
    description: `¿Quieres eliminar ${entity === 'skill' ? 'la skill' : 'a'} ${record.name} de esta sesión de demostración?`,
    confirmation: `Eliminar ${entity}`,
    destructive: true,
    onConfirm,
  });
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
        ${renderActions(user, 'detail', 'Ver detalle')}
      </td>
    </tr>`;
}

function showDetails(title, description, fields) {
  dialogDetails.innerHTML = fields.map(([label, value]) => `
    <div class="sm:last:odd:col-span-2">
      <dt class="text-xs font-medium text-slate-600 dark:text-slate-400">${label}</dt>
      <dd class="mt-1 break-words font-medium">${value}</dd>
    </div>`).join('');
  showActionDialog({ title, description, content: dialogDetails });
}

function showUserDetails(user) {
  showDetails('Detalle de usuario', user.name, [
    ['ID', user.id],
    ['Nombre', user.name],
    ['Email', user.email],
    ['Empresa', user.company],
    ['Plan contratado', user.plan],
    ['Estado', statusBadge(user.status)],
    ['Fecha de registro', user.registered],
    ['Agentes asignados', user.agents.join(', ') || 'Sin agentes asignados'],
  ]);
}

function renderAgent(agent) {
  const skillsId = `agent-skills-${agent.id}`;
  return `
    <li data-agent-id="${agent.id}">
      <article aria-labelledby="agent-name-${agent.id}" class="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div class="flex items-start gap-3 sm:gap-4">
          <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8 M4 8h16v12H4z M1 13h3 M20 13h3 M9 13h.01 M15 13h.01"/></svg>
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2 id="agent-name-${agent.id}" class="text-lg font-semibold tracking-tight">${agent.name}</h2>
              <span class="font-mono text-xs text-slate-500 dark:text-slate-400">${agent.id}</span>
              ${statusBadge(agent.status)}
            </div>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">Propietario: ${agent.owner}</p>
          </div>
          <div class="shrink-0">${renderActions(agent, 'configure', 'Configurar')}</div>
        </div>
        <p class="mt-4 text-sm text-slate-600 dark:text-slate-300 sm:pl-14">${agent.description}</p>
        <div class="mt-3 sm:pl-14">
          <button type="button" data-skills-toggle aria-controls="${skillsId}" aria-expanded="false" class="group inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-violet-300 dark:hover:bg-violet-500/15">
            <span>Ver skills</span><span class="sr-only"> de ${agent.name}</span>
            <svg aria-hidden="true" class="size-4 motion-safe:transition-transform motion-safe:duration-300 group-aria-expanded:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div id="${skillsId}" inert data-expanded="false" class="grid grid-rows-[0fr] opacity-0 data-[expanded=true]:grid-rows-[1fr] data-[expanded=true]:opacity-100 motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300 motion-safe:ease-in-out">
            <div class="min-h-0 overflow-hidden">
              <ul role="list" class="flex flex-wrap gap-2 pt-2">
                ${agent.skills.map(skill => `<li class="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">${skill}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </li>`;
}

function configureAgent(agent) {
  agentMeta.innerHTML = `<span class="font-mono text-slate-600 dark:text-slate-300">${agent.id}</span>${statusBadge(agent.status)}`;
  agentPrompt.value = agent.prompt;
  showActionDialog({
    title: `Configurar ${agent.name}`,
    description: 'Edita las instrucciones del agente para esta sesión.',
    content: agentConfig,
    confirmation: 'Guardar cambios',
    onConfirm: () => {
      agent.prompt = agentPrompt.value;
      agentsFeedback.textContent = `Se guardó el prompt de ${agent.name} para esta sesión.`;
    },
  });
  agentPrompt.focus();
}

function renderSkill(skill) {
  const count = skill.agentNames.length;
  return `
    <li data-skill-id="${skill.id}">
      <article aria-labelledby="skill-name-${skill.id}" class="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div class="flex items-start gap-3 sm:gap-4">
          <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${skill.icon}</svg>
          </span>
          <div class="min-w-0 flex-1">
            <h2 id="skill-name-${skill.id}" class="text-lg font-semibold tracking-tight">${skill.name}</h2>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">${skill.category}</p>
          </div>
          <div class="shrink-0">${renderActions(skill, 'detail', 'Ver detalle')}</div>
        </div>
        <p class="mt-4 flex-1 text-sm text-slate-600 dark:text-slate-300">${skill.description}</p>
        <p class="mt-4">
          <span class="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-violet-500/15 dark:text-violet-200">${count} ${count === 1 ? 'agente' : 'agentes'}</span>
        </p>
      </article>
    </li>`;
}

function showSkillDetails(skill) {
  const examples = skill.examples.map(example => `<li>${example}</li>`).join('');
  showDetails(skill.name, skill.details, [
    ['ID', skill.id],
    ['Categoría', skill.category],
    ['Cantidad de agentes', skill.agentNames.length],
    ['Agentes que la utilizan', skill.agentNames.join(', ')],
    ['Ejemplos de uso', `<ul class="list-disc space-y-1 pl-5">${examples}</ul>`],
  ]);
}

function contractTotal({ basePrice, skills }) {
  return skills.reduce((total, { price }) => total + price, basePrice);
}

function renderContractDate(date) {
  return `<time datetime="${date}">${date.split('-').reverse().join('/')}</time>`;
}

function renderContractRow(contract) {
  const chips = contract.skills.map(({ name }) => `
    <li class="w-fit whitespace-nowrap rounded-md bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700 dark:bg-violet-500/15 dark:text-violet-200">${name}</li>`).join('');
  return `
    <tr data-contract-id="${contract.id}" class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
      <th scope="row" class="px-4 py-3 font-mono text-xs font-semibold">${contract.id}</th>
      <td class="whitespace-nowrap px-4 py-3 font-medium">${contract.client}</td>
      <td class="px-4 py-3">${contract.agent}</td>
      <td class="px-4 py-3"><ul role="list" class="flex min-w-40 flex-wrap gap-1.5">${chips}</ul></td>
      <td class="whitespace-nowrap px-4 py-3 tabular-nums text-slate-600 dark:text-slate-300">${renderContractDate(contract.start)}</td>
      <td class="whitespace-nowrap px-4 py-3 tabular-nums text-slate-600 dark:text-slate-300">${renderContractDate(contract.end)}</td>
      <td class="px-4 py-3 text-right font-semibold tabular-nums">$${contractTotal(contract)}</td>
      <td class="px-4 py-3">${statusBadge(contract.status)}</td>
      <td class="px-4 py-3 text-right">${renderActions({ id: contract.id, name: `contrato ${contract.id}` }, 'detail', 'Ver detalle', { canDelete: false })}</td>
    </tr>`;
}

function showContractDetails(contract) {
  const charges = [{ name: `Alquiler de ${contract.agent}`, price: contract.basePrice }, ...contract.skills];
  const breakdown = `
    <dl class="space-y-2">
      ${charges.map(({ name, price }) => `
        <div class="flex justify-between gap-3">
          <dt>${name}</dt>
          <dd class="shrink-0 tabular-nums">$${price}</dd>
        </div>`).join('')}
      <div class="flex justify-between gap-3 border-t border-slate-200 pt-2 font-semibold dark:border-slate-700">
        <dt>Total</dt>
        <dd class="tabular-nums">$${contractTotal(contract)}</dd>
      </div>
    </dl>`;
  showDetails(`Contrato ${contract.id}`, 'Detalle del alquiler y sus importes.', [
    ['ID', contract.id],
    ['Cliente', contract.client],
    ['Agente alquilado', contract.agent],
    ['Fecha de inicio', renderContractDate(contract.start)],
    ['Fecha de finalización', renderContractDate(contract.end)],
    ['Estado', statusBadge(contract.status)],
    ['Desglose (USD)', breakdown],
  ]);
}

function removeRecord(record, collection, element, emptyState) {
  const nextElement = element.nextElementSibling || element.previousElementSibling;
  collection.splice(collection.indexOf(record), 1);
  element.remove();

  if (nextElement) {
    nextElement.querySelector('[popovertarget]').focus();
  } else {
    emptyState.hidden = false;
    emptyState.focus();
  }
}

usersRows.innerHTML = users.map(renderUserRow).join('');
agentsList.innerHTML = agents.map(renderAgent).join('');
skillsList.innerHTML = skills.map(renderSkill).join('');
contractsRows.innerHTML = contracts.map(renderContractRow).join('');

for (const panel of document.querySelectorAll('[popover]')) {
  panel.addEventListener('beforetoggle', (event) => {
    const expanded = event.newState === 'open';
    panel.previousElementSibling.setAttribute('aria-expanded', String(expanded));
    if (expanded) openActions = panel;
    else if (openActions === panel) openActions = null;
  });
}

usersRows.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]');
  if (!action) return;

  const row = action.closest('[data-user-id]');
  const user = users.find(({ id }) => id === row.dataset.userId);
  closeActions(row.querySelector('[popovertarget]'));
  if (action.dataset.action === 'detail') {
    showUserDetails(user);
  } else {
    confirmDeletion(user, 'usuario', () => {
      removeRecord(user, users, row, usersEmpty);
      if (!users.length) document.querySelector('#users-table').parentElement.hidden = true;
      usersFeedback.textContent = `${user.name} se eliminó de esta sesión.`;
    });
  }
});

agentsList.addEventListener('click', (event) => {
  const toggle = event.target.closest('[data-skills-toggle]');
  if (toggle) {
    const expanded = toggle.getAttribute('aria-expanded') === 'false';
    const panel = document.getElementById(toggle.getAttribute('aria-controls'));
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.querySelector('span').textContent = expanded ? 'Ocultar skills' : 'Ver skills';
    panel.dataset.expanded = String(expanded);
    panel.inert = !expanded;
    return;
  }

  const action = event.target.closest('[data-action]');
  if (!action) return;

  const card = action.closest('[data-agent-id]');
  const agent = agents.find(({ id }) => id === card.dataset.agentId);
  closeActions(card.querySelector('[popovertarget]'));
  if (action.dataset.action === 'configure') {
    configureAgent(agent);
  } else {
    confirmDeletion(agent, 'agente', () => {
      removeRecord(agent, agents, card, agentsEmpty);
      agentsFeedback.textContent = `${agent.name} se eliminó del inventario de esta sesión.`;
    });
  }
});

skillsList.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]');
  if (!action) return;

  const card = action.closest('[data-skill-id]');
  const skill = skills.find(({ id }) => id === card.dataset.skillId);
  closeActions(card.querySelector('[popovertarget]'));
  if (action.dataset.action === 'detail') {
    showSkillDetails(skill);
  } else {
    confirmDeletion(skill, 'skill', () => {
      removeRecord(skill, skills, card, skillsEmpty);
      skillsFeedback.textContent = `Se eliminó ${skill.name} del catálogo de esta sesión.`;
    });
  }
});

contractsRows.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action="detail"]');
  if (!action) return;

  const row = action.closest('[data-contract-id]');
  const contract = contracts.find(({ id }) => id === row.dataset.contractId);
  closeActions(row.querySelector('[popovertarget]'));
  showContractDetails(contract);
});

actionDialog.addEventListener('click', (event) => {
  if (event.target !== actionDialog) return;
  const bounds = actionDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX >= bounds.right ||
      event.clientY < bounds.top || event.clientY >= bounds.bottom) {
    actionDialog.close();
  }
});

actionDialog.querySelector('form').addEventListener('submit', (event) => {
  if (event.submitter !== dialogConfirm || !actionDialog.open || !confirmAction) return;
  event.preventDefault();

  const applyChange = confirmAction;
  confirmAction = null;
  actionDialog.close();
  applyChange();
});
