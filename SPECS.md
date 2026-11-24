# SPECS.md — AgentHub | Panel de Administración

**Proyecto:** Plataforma de Alquiler de Agentes IA — prototipo frontend  
**Versión de especificación:** 1.0  
**Idioma de la interfaz:** Español  
**Estado:** Especificación previa a cualquier implementación HTML propia.

## 1. Visión del producto

AgentHub es una plataforma SaaS ficticia donde empresas alquilan agentes de inteligencia artificial y contratan skills adicionales. El entregable es un **prototipo visual y navegable del panel de administración interno** para que producto y backend validen estructura, datos e interacciones.

**Usuario principal:** administrador interno de AgentHub que supervisa ingresos, usuarios, agentes, skills, contratos e incidentes.  
**Problema:** hoy no existe una interfaz unificada para visualizar y gestionar estas entidades.  
**Objetivo:** ofrecer una vista coherente de las seis áreas, con navegación persistente, controles interactivos y diseño responsive.

### 1.1 Alcance y exclusiones

- **Incluye:** seis vistas, sidebar persistente, barra superior, modo claro/oscuro, dropdowns, modales, listas de skills colapsables, datos de demostración coherentes y estados visuales.
- **No incluye:** llamadas a APIs, backend, login, base de datos, autenticación real, pagos reales, envíos de formularios ni persistencia de cambios en un servidor.
- Todos los datos son **hardcodeados**. Las acciones de edición, eliminación y resolución se simulan en memoria durante la sesión; al recargar se restauran los datos originales.
- El marcador del gráfico semanal es exclusivamente visual; **no** requiere librería de gráficos.

## 2. Stack y restricciones innegociables

1. HTML5 semántico y accesible, con `lang="es"`, `meta viewport`, encabezados jerárquicos y títulos descriptivos.
2. **Tailwind CSS v3 mediante Play CDN** (`https://cdn.tailwindcss.com`), sin herramientas de build, frameworks de componentes ni hojas de estilo externas o personalizadas. Configurar `tailwind.config = { darkMode: "class" }` en JavaScript para alternar el tema mediante la clase `dark` del elemento raíz.
3. **JavaScript vanilla**, sin React, Vue, jQuery ni bibliotecas de interfaz.
4. Prohibidos los atributos HTML `style` y los bloques `<style>` para estilos propios. Usar clases utilitarias Tailwind para toda la presentación y las transiciones.
5. Para el modo oscuro, usar `dark:` y alternar la clase `dark` en `<html>`; configurar la estrategia manual apropiada para la versión CDN elegida. El cambio debe afectar a toda la interfaz y conservarse al navegar entre secciones.
6. Una implementación aceptable es `index.html` con scripts JavaScript en el mismo archivo; se permite un archivo JS separado si facilita el mantenimiento. Las seis secciones funcionan dentro del prototipo, sin navegación a páginas externas.
7. No modificar ni crear HTML propio **hasta que `SPECS.md` tenga su commit independiente en Git**. La plantilla `html-hello` puede contener archivos HTML previos: el requisito se aplica al primer commit de implementación del estudiante.
8. Diseño responsive para escritorio y teléfono. Sin desplazamiento horizontal en la página; las tablas podrán desplazarse dentro de su propio contenedor.

## 3. Dirección visual y estructura global

**Estilo:** SaaS profesional, limpio, ordenado, alta legibilidad y tarjetas de bordes suaves. Identidad AgentHub con acento índigo/violeta, fondo neutro claro y una variante oscura azul pizarra. Evitar imágenes stock, ilustraciones innecesarias y efectos excesivos. **Paleta guía Tailwind:** en claro, `bg-slate-50`, tarjetas `bg-white`, texto `text-slate-900`, bordes `border-slate-200`; en oscuro, `dark:bg-slate-950`, tarjetas `dark:bg-slate-900`, texto `dark:text-slate-100`, bordes `dark:border-slate-700`; acciones primarias `bg-indigo-600` y `hover:bg-indigo-700`. Los modales usan backdrop translúcido y ancho máximo de lectura (`max-w-xl` o similar).

**Composición desktop (>= 1024 px):** sidebar persistente a la izquierda de unos 240–260 px; topbar con título de sección, etiqueta «Administrador» y toggle de tema; contenido principal con ancho fluido, márgenes generosos y áreas bien separadas.

**Tablet (768–1023 px):** sidebar utilizable sin tapar controles; tarjetas y tablas se reorganizan con puntos de quiebre Tailwind.

**Mobile (< 768 px):** sidebar accesible desde botón de menú, sobre backdrop; al seleccionar una sección, el menú se cierra. Tablas con desplazamiento horizontal interno y modales ajustados a la pantalla. El botón de tema sigue visible.

**Navegación lateral, en este orden:** Dashboard, Gestión de usuarios, Gestión de agentes, Skills, Contrataciones de agentes, Log de errores. Cada entrada muestra icono, nombre y estado activo inequívoco (fondo/acento y `aria-current` cuando corresponda). Cambiar de sección no recarga la página ni pierde el tema seleccionado.

**Topbar:** título dinámico de la sección actual, breve subtítulo/contexto, toggle «Modo claro/oscuro» accesible por teclado y control para abrir sidebar en móvil. Preferencia visual del tema retenida entre secciones; opcionalmente entre recargas usando `localStorage`.

**Formato de datos:** moneda USD (`$`), fechas coherentes `DD/MM/AAAA`, horas de 24 h. Todos los nombres, montos y registros son ejemplos ficticios.

## 4. Especificación por sección

### 4.1 Dashboard

**Propósito:** mostrar la salud operativa y financiera de AgentHub de un vistazo.

1. Encabezado «Dashboard» y subtítulo explicando que son datos ilustrativos del mes actual.
2. **Exactamente cuatro tarjetas de métricas** en un grid responsive de **dos columnas por dos filas en escritorio**, y una columna en móvil. Cada tarjeta incluye icono propio, etiqueta visible, valor hardcodeado y contraste suficiente:
   - **Ingresos totales (este mes):** `$357`.
   - **Pérdidas por descuentos y cupones:** `$18`.
   - **Agentes activos:** `2`.
   - **Agentes fallando:** `1`.
3. Debajo de las tarjetas, una **zona de ancho completo** con borde discontinuo, una etiqueta centrada «Gráfico de actividad semanal» y una breve leyenda «Marcador de posición · sin conexión a datos». Debe parecer un espacio reservado para un gráfico futuro, no un gráfico real.
4. Los valores son demostrativos y no cambian al navegar. En el texto de ayuda no deben describirse como datos sincronizados con un servidor.

### 4.2 Gestión de usuarios

**Propósito:** revisar y administrar de forma simulada las cuentas de clientes.

1. Encabezado, subtítulo y **tabla con cinco o más usuarios hardcodeados**. Columnas: nombre, email, plan, estado y acciones. Las filas deben ser legibles, con separación clara, cabecera `<thead>` y nombres de columna accesibles.
2. Planes de ejemplo `Starter`, `Pro`, `Business`; estados con badges como `Activo`, `Pendiente`, `Suspendido`. Mantener el color consistente en toda la aplicación.
3. Cada fila contiene botón `⋮` con nombre accesible «Acciones de [nombre]». Al pulsarlo abre un **dropdown** con exactamente las acciones relevantes **«Ver detalle»** y **«Eliminar»**. Abrir otro menú o hacer clic fuera cierra el anterior.
4. **«Ver detalle»** abre un modal con registro completo ficticio: ID, nombre, email, empresa, plan, estado, fecha de registro y agentes asignados. Se cierra con botón «Cerrar», backdrop y `Escape`.
5. **«Eliminar»** abre una confirmación de demostración y, al confirmar, elimina solo esa fila del estado en memoria; cancelar no modifica nada. Ningún dato se elimina en un backend. Si la tabla queda vacía, mostrar estado vacío.

### 4.3 Gestión de agentes

**Propósito:** revisar agentes alquilables, propietarios, estado y capacidades.

1. **Al menos cuatro agentes hardcodeados**, cada uno con nombre, propietario, badge de estado (`Activo`, `Inactivo`, `Fallando`), descripción breve y acciones. Presentarlos como tarjetas o filas apiladas responsive.
2. Cada agente muestra un control «Ver skills» con icono de flecha y `aria-expanded`. La lista de skills está **colapsada por defecto** y solo se despliega al activarla.
3. La expansión/contracción de skills tiene una **transición visual suave** mediante utilidades Tailwind; la información queda accesible y el control vuelve a colapsar al pulsarlo de nuevo. No esconder permanentemente contenido que debe mostrarse cuando esté expandido.
4. Cada agente tiene menú `⋮` con **«Configurar»** y **«Eliminar»**. El menú se cierra al seleccionar una opción, pulsar fuera o abrir otro.
5. **«Configurar»** abre un modal con nombre del agente y su **prompt de sistema en un `<textarea>` editable**. Incluir botones «Guardar cambios» y «Cancelar/Cerrar». Guardar actualiza únicamente la copia local en memoria y se refleja al reabrir.
6. **«Eliminar»** abre confirmación y retira visualmente la tarjeta en memoria; no hace peticiones ni afecta registros históricos de otras secciones.

### 4.4 Skills

**Propósito:** examinar las habilidades disponibles para equipar agentes.

1. Encabezado «Skills» con texto explicativo visible: «Una skill es una capacidad adicional que puede habilitarse en un agente, como navegar por la web, analizar datos, leer documentos o gestionar calendarios».
2. **Catálogo de al menos cuatro skills hardcodeadas**. Cada tarjeta muestra nombre, descripción breve, icono y número de agentes con esa habilidad habilitada.
3. Cada skill tiene menú `⋮` con **«Ver detalle»** y **«Eliminar»**. El modal de detalle incluye nombre, descripción ampliada, categoría, ejemplos de uso y número de agentes que la utilizan.
4. «Eliminar» solicita confirmación y retira la tarjeta únicamente en memoria. Ninguna acción modifica el backend ni cambia automáticamente las contrataciones de demostración.
5. Los badges de cantidad y nombres de skills deben corresponder a la misma colección conceptual utilizada en las tarjetas de agentes y desglose de contratos.

### 4.5 Contrataciones de agentes

**Propósito:** visualizar contratos de alquiler y desglose económico.

1. **Tabla de al menos cuatro contratos hardcodeados**, con columnas: cliente, agente alquilado, skills contratadas, fecha de inicio, fecha de finalización, importe total pagado, estado y acciones. Las skills pueden mostrarse como chips compactos o lista resumida.
2. Incluir contratos actuales y pasados. Las fechas se representan de forma consistente y el importe se muestra en USD. El cliente y agente coinciden con el inventario de demostración.
3. Cada fila dispone de menú `⋮` con opción **«Ver detalle»**; la opción abre un modal con ID, cliente, agente, fechas, estado y precio base del agente.
4. En el modal, mostrar **cada skill contratada en una línea separada con su precio individual**, más total calculado por suma del precio base y las skills. El total del modal coincide con el mostrado en la tabla.
5. El modal puede cerrarse mediante botón, backdrop y `Escape`. No permitir cobrar, renovar ni editar contratos en esta versión.

### 4.6 Log de errores

**Propósito:** identificar incidentes operativos y simular su seguimiento.

1. **Al menos seis errores hardcodeados**. Cada registro presenta timestamp, agente afectado, tipo de error, badge de gravedad o categoría y descripción breve. Los agentes deben ser nombres presentes en Gestión de agentes.
2. Usar badges con **colores diferenciados** (ej.: crítico rojo, advertencia ámbar, informativo azul, resuelto gris/verde); el texto del badge siempre identifica la categoría, sin depender solo del color.
3. Cada fila o tarjeta tiene menú `⋮` con **«Ver detalle»** y **«Marcar como resuelto»**. El menú debe poder cerrarse al hacer clic fuera.
4. «Ver detalle» abre un modal con timestamp, agente, tipo, gravedad, descripción completa y **traza de error ficticia** en un bloque monoespaciado con ajuste/desplazamiento adecuado. No incluir información secreta en la traza.
5. «Marcar como resuelto» cambia localmente el badge/estado de la entrada y muestra confirmación visual. Si ya está resuelta, deshabilitar la acción o mostrar «Ya resuelto». El cambio se conserva al navegar entre secciones durante la misma sesión.

## 5. Datos de demostración y coherencia

Estos datos son orientativos y deben existir como estructuras JavaScript hardcodeadas, con identificadores estables.

### Usuarios (mínimo cinco)

| ID | Nombre | Correo ficticio | Plan | Estado |
|---|---|---|---|---|
| U001 | Camila Torres | camila@empresa.example | Business | Activo |
| U002 | Mateo Ríos | mateo@empresa.example | Pro | Activo |
| U003 | Daniela Vega | daniela@empresa.example | Starter | Suspendido |
| U004 | Andrés Moreno | andres@empresa.example | Business | Activo |
| U005 | Valeria Cruz | valeria@empresa.example | Pro | Pendiente |

### Agentes (mínimo cuatro)

| ID | Agente | Propietario | Estado | Skills |
|---|---|---|---|---|
| A001 | Atlas | Camila Torres | Activo | Navegación web; Lectura de documentos; Gestión de calendario |
| A002 | Nova | Mateo Ríos | Fallando | Navegación web; Análisis de datos |
| A003 | Iris | Andrés Moreno | Activo | Lectura de documentos; Gestión de calendario |
| A004 | Echo | Daniela Vega | Inactivo | Lectura de documentos |

### Skills (mínimo cuatro)

| Skill | Descripción breve | Agentes que la usan |
|---|---|---:|
| Navegación web | Consulta páginas y recopila información pública | 2 |
| Lectura de documentos | Extrae y resume información de archivos | 3 |
| Gestión de calendario | Consulta y organiza agendas | 2 |
| Análisis de datos | Interpreta tablas y métricas | 1 |

### Contratos (mínimo cuatro)

| ID | Cliente | Agente | Vigencia | Base | Skills y precios | Total | Estado |
|---|---|---|---|---:|---|---:|---|
| C001 | Camila Torres | Atlas | 01/11/2026–30/11/2026 | $79 | Web $20; Documentos $15; Calendario $15 | $129 | Activo |
| C002 | Mateo Ríos | Nova | 05/11/2026–04/12/2026 | $79 | Web $20; Análisis $20 | $119 | Activo |
| C003 | Andrés Moreno | Iris | 10/11/2026–09/12/2026 | $79 | Documentos $15; Calendario $15 | $109 | Activo |
| C004 | Daniela Vega | Echo | 01/10/2026–31/10/2026 | $74 | Documentos $15 | $89 | Finalizado |

**Coherencia económica:** los tres contratos activos de noviembre suman `$357`, como el indicador de ingresos del dashboard. La pérdida por descuentos `$18` es una métrica ficticia independiente. Agentes `Activo`: 2; agentes `Fallando`: 1.

### Errores (mínimo seis)

Crear seis registros con ID, fecha/hora, agente, código/tipo, gravedad, descripción, `stackTrace` ficticia y estado de resolución. Combinar al menos tres de los agentes `Atlas`, `Nova`, `Iris` y `Echo`; incluir varios errores de Nova, un aviso y un registro informativo. Evitar datos personales en las trazas.

## 6. Inventario de componentes UI reutilizables

La palabra «componente» describe una unidad visual reutilizable, no exige framework. Puede implementarse con funciones de renderizado y plantillas HTML en JavaScript vanilla.

1. **AppShell:** estructura general con sidebar, topbar y contenido principal.
2. **SidebarNavItem:** icono, etiqueta, estado activo y comportamiento de navegación.
3. **SectionHeader:** título y subtítulo coherentes entre las seis vistas.
4. **MetricCard:** icono, etiqueta, valor y variante visual para las cuatro métricas.
5. **StatusBadge:** etiquetas y paleta consistente para planes, agentes, contratos y errores.
6. **ActionDropdown:** botón `⋮`, lista contextual de acciones, cierre al hacer clic fuera y soporte de teclado.
7. **ModalDialog:** overlay, panel, título, contenido variable, botón cerrar, backdrop y `Escape`.
8. **ResponsiveDataTable:** cabeceras, filas y contenedor con scroll horizontal interno en móvil.
9. **AgentSkillCollapsible:** control expandible y lista con transición, `aria-expanded` y estado inicial cerrado.
10. **SkillCard:** nombre, descripción, contador de agentes, menú de acciones.
11. **ContractBreakdown:** líneas de precio base, skills y total consistente.
12. **ThemeToggle:** alternancia claro/oscuro para toda la app y conservación entre secciones.
13. **ConfirmDialog / FeedbackToast:** confirmación de eliminación y avisos de cambios solo locales.
14. **EmptyState:** mensaje adecuado cuando una colección quede vacía tras acciones simuladas.

## 7. Modelo de interacción global

- **Navegación:** una sola sección visible a la vez; sidebar siempre utilizable; indicador activo actualizado y título de topbar sincronizado.
- **Dropdowns:** inicialmente cerrados; uno abierto como máximo; clic fuera, `Escape`, cambio de sección o selección de acción los cierra. No se deben ocultar detrás de contenedores de tabla.
- **Modales:** overlay sobre todo el contenido; contenido dinámico de usuario, agente, skill, contrato o error; botón cerrar, backdrop y `Escape`. Mientras un modal está abierto, el fondo no debe recibir clics. Restaurar el foco al control que abrió el modal cuando sea posible.
- **Colapsables:** skills de cada agente ocultas inicialmente; clic abre/cierra con transición Tailwind claramente perceptible; reflejar estado con `aria-expanded`.
- **Modo oscuro:** toggle en topbar aplica paleta completa mediante `dark:` y clase raíz; no se restablece al navegar. Componentes, sidebar, tablas, dropdowns, modales, badges y fondos deben tener estilos para ambos modos.
- **Acciones ficticias:** mostrar respuesta visible; eliminación y resolución modifican solo el estado de la interfaz, nunca un servidor. Al recargar, se recuperan los ejemplos originales.
- **Accesibilidad:** botones reales (`<button>`), etiquetas accesibles, uso de `aria-label`, `aria-expanded`, `aria-modal`, `role="dialog"` y foco visible. Contraste suficiente y controles usables con teclado.

## 8. Criterios de aceptación verificables

1. `SPECS.md` existe en la raíz y se encuentra en un **commit específico anterior al primer commit de implementación HTML propia**; el historial Git lo demuestra.
2. Este documento contiene seis secciones, con **mínimo tres especificaciones concretas por sección**, inventario de componentes y criterios numerados.
3. El prototipo abre `index.html` y muestra las seis secciones sin necesitar API, backend ni instalación de paquetes.
4. Las seis entradas de la barra lateral funcionan y muestran un indicador de sección activa.
5. Sidebar desktop persistente; en móvil es accesible desde control y puede cerrarse.
6. Dashboard muestra exactamente cuatro tarjetas: ingresos, descuentos, activos y fallando, con iconos, etiquetas y valores.
7. Dashboard muestra debajo un marcador de gráfico semanal de ancho completo, borde discontinuo y etiqueta centrada.
8. Usuarios muestra **al menos cinco filas** con nombre, email, plan y badge de estado.
9. Todas las filas de usuarios tienen menú `⋮`, con «Ver detalle» y «Eliminar».
10. «Ver detalle» de usuario abre un modal con registro completo.
11. Agentes muestra **al menos cuatro registros**, con propietario, estado y skills colapsadas inicialmente.
12. Pulsar «Ver skills» expande/contrae con transición suave y actualiza `aria-expanded`.
13. Cada agente dispone de «Configurar» y «Eliminar»; «Configurar» abre un modal con prompt editable en `<textarea>`.
14. Skills contiene explicación de qué es una skill y **al menos cuatro tarjetas** con nombre, descripción, contador y menú `⋮`.
15. «Ver detalle» de skill abre modal con información ampliada.
16. Contrataciones muestra **al menos cuatro contratos** con cliente, agente, skills, fechas e importe total.
17. «Ver detalle» de contrato abre modal con precio base y cada skill contratada con su precio individual; la suma coincide con el total mostrado.
18. Log de errores muestra **al menos seis entradas** con fecha/hora, agente, tipo, descripción y badge de gravedad.
19. «Ver detalle» de error abre modal con traza ficticia; «Marcar como resuelto» modifica el estado visual local.
20. Los menús de acciones de **todas las tablas/listas** se cierran al hacer clic fuera.
21. Los modales se pueden cerrar con botón y clic en backdrop; adicionalmente con `Escape`.
22. «Ver detalle» abre un modal en **al menos cuatro secciones** (usuarios, skills, contratos y errores; configurar agentes también usa modal).
23. El modo oscuro/claro cambia toda la interfaz con clases `dark:` y conserva la elección al cambiar entre secciones.
24. Todos los estilos usan utilidades Tailwind desde CDN; no existen atributos `style`, bloques `<style>` personalizados, archivos CSS externos propios ni frameworks JS.
25. La maquetación es legible en desktop y móvil, con tablas desplazables internamente y sin overflow horizontal global.
26. El HTML usa `header`, `nav`, `main`, `section`, `table`, `button` y otros elementos semánticos apropiados.
27. Los datos de agentes, skills, contratos e incidentes son coherentes entre secciones y claramente de demostración.
28. El repositorio público de entrega contiene `SPECS.md`, `index.html` y recursos necesarios; los cambios están commiteados y publicados en GitHub.

## 9. Plan de trabajo y orden de commits

**Fase A — Especificación (obligatoria antes del código):** crear `SPECS.md`, revisar que incluya todos los requisitos y ejecutar un commit exclusivo, por ejemplo `docs: define AgentHub admin panel specifications`. Hacer `git push`. **No modificar HTML en esta fase.**

**Fase B — Propuesta visual:** utilizar el contenido de `SPECS.md` como prompt en Google Stitch; guardar o documentar la referencia visual elegida. Adaptarla a la especificación, no al revés.

**Fase C — Esqueleto HTML:** implementar shell, topbar, sidebar, navegación y tokens visuales Tailwind CDN. Commit/push.

**Fase D — Secciones:** desarrollar Dashboard, Usuarios, Agentes, Skills, Contrataciones y Log de errores; realizar commits y pushes por avances verificables.

**Fase E — Interacciones:** completar dropdowns, modales, colapsables, edición ficticia, marcación de errores, cierre por backdrop, tema y versión móvil. Commit/push.

**Fase F — QA y entrega:** validar checklist, HTML semántico, responsive, modo oscuro, ausencia de CSS propio, README y URL del repositorio. Commit/push final.

## 10. Criterio de terminado

El proyecto estará listo para revisión cuando los **28 criterios de aceptación** estén comprobados manualmente y `SPECS.md` figure en el historial antes de cualquier commit de implementación HTML realizada por el estudiante. El prototipo es demostrativo y todas sus operaciones usan datos hardcodeados.
