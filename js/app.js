// ═══════════════════════════════════════════════════════════════════════
// Panel de Gestión FID by Lakaut — Lógica de Aplicación
// ═══════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────
// DATOS DE DEMOSTRACIÓN
// ─────────────────────────────────────────────────────────────────────

const demoData = {
  usuarios: [
    {
      id: 1,
      nombre: 'Isaac',
      apellido: 'Meneses',
      email: 'isacris23@gmail.com',
      auth: 'Email',
      rol: 'Administrador',
      fechaInvitacion: '2026-07-17 14:32:15',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'González',
      email: 'maria.gonzalez@empresa.com',
      auth: 'Email',
      rol: 'Colaborador',
      fechaInvitacion: '2026-07-17 13:58:00',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos.lopez@empresa.com',
      auth: 'Email',
      rol: 'Colaborador',
      fechaInvitacion: '2026-07-16 18:21:00',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Rodríguez',
      email: 'ana.rodriguez@empresa.com',
      auth: 'Email',
      rol: 'Administrador',
      fechaInvitacion: '2026-07-12 16:45:00',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
    }
  ],

  firmasIndividuales: [
    {
      id: 1,
      fecha: '2026-07-20 14:32:15',
      documento: 'Contrato_001.pdf',
      estado: 'firmado',
      certificado: 'CN=Isaac Meneses',
      hash: '3a7b2c8f...',
      hashCompleto: '3a7b2c8f9d1e4f6a8b2c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a'
    },
    {
      id: 2,
      fecha: '2026-07-20 13:45:20',
      documento: 'Factura_2026_001.pdf',
      estado: 'firmado',
      certificado: 'CN=María González',
      hash: '5d9e4a1c...',
      hashCompleto: '5d9e4a1c3b8f6d2e4a7c9b1d3f5e7a9c1b3d5f7e9a1c3b5d7f9e1a3c5b7d9f1e'
    },
    {
      id: 3,
      fecha: '2026-07-20 12:15:45',
      documento: 'Acuerdo_confidencialidad.pdf',
      estado: 'pendiente',
      certificado: 'CN=Carlos López',
      hash: '7f2b6c8a...',
      hashCompleto: '7f2b6c8a1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a'
    },
    {
      id: 4,
      fecha: '2026-07-19 16:20:10',
      documento: 'Poder_notarial.pdf',
      estado: 'error',
      certificado: 'CN=Isaac Meneses',
      hash: '9c3d7e1f...',
      hashCompleto: '9c3d7e1f2a4b6c8d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d'
    },
    {
      id: 5,
      fecha: '2026-07-19 15:10:30',
      documento: 'Testamento.pdf',
      estado: 'firmado',
      certificado: 'CN=Ana Rodríguez',
      hash: '2e4a8b5c...',
      hashCompleto: '2e4a8b5c7d9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b'
    }
  ],

  firmasMasivas: [
    {
      id: 'LOTE-2026-001',
      fecha: '2026-07-20 10:00:00',
      total: 50,
      exitosos: 48,
      errores: 2,
      estado: 'con-errores',
      certificado: 'Isaac Meneses',
      documentosConError: [
        { documento: 'Certificado_representacion.pdf', motivo: 'Certificado vencido' },
        { documento: 'Poder_general.pdf', motivo: 'El firmante no completó la validación de identidad' }
      ]
    },
    {
      id: 'LOTE-2026-002',
      fecha: '2026-07-19 09:30:00',
      total: 100,
      exitosos: 100,
      errores: 0,
      estado: 'completada',
      certificado: 'María González',
      documentosConError: []
    },
    {
      id: 'LOTE-2026-003',
      fecha: '2026-07-18 14:15:00',
      total: 75,
      exitosos: 70,
      errores: 5,
      estado: 'con-errores',
      certificado: 'Carlos López',
      documentosConError: [
        { documento: 'Recibo_haberes_01.pdf', motivo: 'Documento duplicado' },
        { documento: 'Recibo_haberes_02.pdf', motivo: 'Certificado vencido' },
        { documento: 'Recibo_haberes_03.pdf', motivo: 'El firmante no completó la validación de identidad' },
        { documento: 'Recibo_haberes_04.pdf', motivo: 'Formato de documento no soportado' },
        { documento: 'Recibo_haberes_05.pdf', motivo: 'Error de conexión con el firmante' }
      ]
    }
  ],

  certificados: [
    {
      id: 1,
      persona: 'Isaac Cristian Meneses',
      resultado: 'exito',
      idCert: 'CERT-2026-001',
      fechaEmision: '2026-07-15 10:20:00',
      motivo: '—',
      alertas: null
    },
    {
      id: 2,
      persona: 'María González',
      resultado: 'error',
      idCert: 'CERT-2026-002',
      fechaEmision: '—',
      motivo: 'Datos inconsistentes',
      alertas: 'Alerta crítica'
    },
    {
      id: 3,
      persona: 'Carlos López',
      resultado: 'exito',
      idCert: 'CERT-2026-003',
      fechaEmision: '2026-07-10 09:15:00',
      motivo: '—',
      alertas: null
    },
    {
      id: 4,
      persona: 'Ana Rodríguez',
      resultado: 'exito',
      idCert: 'CERT-2026-004',
      fechaEmision: '2025-08-20 14:40:00',
      motivo: '—',
      alertas: 'Vence en 30 días'
    }
  ],

  actividad: [
    {
      id: 1,
      usuario: 'Isaac Meneses',
      fecha: '2026-07-21 09:30:15',
      ip: '192.168.1.100',
      origen: 'Chrome - Windows',
      dispositivo: 'Desktop'
    },
    {
      id: 2,
      usuario: 'María González',
      fecha: '2026-07-21 09:25:42',
      ip: '192.168.1.105',
      origen: 'Safari - iOS',
      dispositivo: 'iPhone 13'
    },
    {
      id: 3,
      usuario: 'Carlos López',
      fecha: '2026-07-21 09:10:20',
      ip: '192.168.1.110',
      origen: 'Firefox - Windows',
      dispositivo: 'Desktop'
    },
    {
      id: 4,
      usuario: 'Ana Rodríguez',
      fecha: '2026-07-21 08:45:30',
      ip: '192.168.1.115',
      origen: 'Chrome - macOS',
      dispositivo: 'MacBook Pro'
    },
    {
      id: 5,
      usuario: 'Isaac Meneses',
      fecha: '2026-07-20 18:20:10',
      ip: '192.168.1.100',
      origen: 'Chrome - Windows',
      dispositivo: 'Desktop'
    },
    {
      id: 6,
      usuario: 'María González',
      fecha: '2026-07-20 17:35:45',
      ip: '192.168.1.105',
      origen: 'Safari - macOS',
      dispositivo: 'iPad Air'
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────
// ESTADO DE LA APLICACIÓN
// ─────────────────────────────────────────────────────────────────────

let appState = {
  currentSection: 'firmas',
  currentTab: 'firmas-individual',
  currentPage: 1,
  itemsPerPage: 10,
  filters: {},
  visibleColumns: {}
};

// ─────────────────────────────────────────────────────────────────────
// NAVEGACIÓN ENTRE SECCIONES
// ─────────────────────────────────────────────────────────────────────

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item[data-section]');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const section = item.dataset.section;

      // Actualizar nav-item activo
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Mostrar sección correspondiente
      showSection(section);
      appState.currentSection = section;
    });
  });
}

function showSection(sectionId) {
  // Ocultar todas las secciones
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  // Mostrar sección solicitada
  const section = document.getElementById(`section-${sectionId}`);
  if (section) {
    section.classList.add('active');

    // Poblar tabla si es necesario
    if (sectionId === 'firmas') {
      populateFiremosTable();
    } else if (sectionId === 'certificados') {
      populateCertificadosTable();
    } else if (sectionId === 'usuarios') {
      populateUsuariosTable();
    } else if (sectionId === 'actividad') {
      populateActividadTable();
    }
  }
}

// ─────────────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────────────

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      // Actualizar tab activo
      btn.parentElement.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Mostrar contenido de tab
      btn.parentElement.parentElement.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`tab-${tabId}`).classList.add('active');

      // Poblar tabla del nuevo tab
      appState.currentTab = tabId;
      if (tabId === 'firmas-individual') {
        populateFiremosTable();
      } else if (tabId === 'firmas-masiva') {
        populateFirmasMasivasTable();
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// POBLACIÓN DE TABLAS
// ─────────────────────────────────────────────────────────────────────

function populateFiremosTable() {
  const tbody = document.querySelector('#tab-firmas-individual .data-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const data = demoData.firmasIndividuales;

  const estadoFirmaLabels = {
    firmado: 'Firmado',
    pendiente: 'Por firmar',
    error: 'Error en firma'
  };

  data.forEach(item => {
    const row = document.createElement('tr');

    const estadoBadgeClass = item.estado === 'firmado' ? 'success' : item.estado === 'error' ? 'error' : 'warning';

    row.innerHTML = `
      <td data-col="documento">${item.documento}</td>
      <td data-col="fecha">${item.fecha}</td>
      <td data-col="certificado">${item.certificado}</td>
      <td data-col="estado"><span class="badge ${estadoBadgeClass}">${estadoFirmaLabels[item.estado]}</span></td>
      <td data-col="acciones">
        <div class="table-actions">
          <button class="btn-action-pill" onclick="showFirmaDetalle(${item.id})">Mostrar detalles</button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });

  applyColumnConfig('firmas-individual');
}

function populateFirmasMasivasTable() {
  const tbody = document.querySelector('#tab-firmas-masiva .data-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const data = demoData.firmasMasivas;

  const estadoLoteLabels = {
    completada: 'Firmado',
    'con-errores': 'Error en firmas'
  };

  data.forEach(item => {
    const row = document.createElement('tr');

    const estadoBadgeClass = item.estado === 'completada' ? 'success' : 'error';

    row.innerHTML = `
      <td data-col="lote">${item.id}</td>
      <td data-col="fecha">${item.fecha}</td>
      <td data-col="total">${item.total}</td>
      <td data-col="certificado">${item.certificado}</td>
      <td data-col="estado"><span class="badge ${estadoBadgeClass}">${estadoLoteLabels[item.estado]}</span></td>
      <td data-col="acciones">
        <div class="table-actions">
          <button class="btn-action-pill" onclick="showLoteDetalle('${item.id}')">Mostrar detalles</button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });

  applyColumnConfig('firmas-masiva');
}

function populateCertificadosTable() {
  const tbody = document.querySelector('#section-certificados .data-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const data = demoData.certificados;

  data.forEach(item => {
    const row = document.createElement('tr');

    const resultadoBadgeClass = item.resultado === 'exito' ? 'success' : 'error';
    const resultadoLabel = item.resultado === 'exito' ? 'Éxito' : 'Error';

    let alertaCell = '<span class="no-alert">—</span>';
    if (item.alertas) {
      const alertaBadgeClass = item.alertas === 'Alerta crítica' ? 'error' : 'warning';
      alertaCell = `<span class="badge ${alertaBadgeClass}">${item.alertas}</span>`;
    }

    row.innerHTML = `
      <td data-col="persona">${item.persona}</td>
      <td data-col="resultado"><span class="badge ${resultadoBadgeClass}">${resultadoLabel}</span></td>
      <td data-col="id-cert">${item.idCert}</td>
      <td data-col="motivo">${item.motivo}</td>
      <td data-col="alertas">${alertaCell}</td>
      <td data-col="acciones">
        <div class="table-actions">
          <button class="btn-action" onclick="showCertificadoDetalle(${item.id})">Ver certificado</button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });

  applyColumnConfig('certificados');
}

function populateUsuariosTable() {
  const tbody = document.querySelector('#section-usuarios .data-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const data = demoData.usuarios;

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td data-col="nombre">${item.nombre} ${item.apellido}</td>
      <td data-col="email">${item.email}</td>
      <td data-col="invitacion">${item.fechaInvitacion}</td>
      <td data-col="rol">${item.rol}</td>
      <td data-col="acciones">
        <div class="table-actions">
          <button class="btn-action-menu" aria-label="Más acciones para ${item.nombre} ${item.apellido}" onclick="showUserMenu(event, ${item.id})">
            <span class="icon">more_vert</span>
          </button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function populateActividadTable() {
  const tbody = document.querySelector('#section-actividad .data-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const data = demoData.actividad;

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td data-col="usuario">${item.usuario}</td>
      <td data-col="fecha">${item.fecha}</td>
      <td data-col="ip">${item.ip}</td>
      <td data-col="origen">${item.origen}</td>
      <td data-col="dispositivo">${item.dispositivo}</td>
      <td data-col="acciones">
        <div class="table-actions">
          <button class="btn-action-pill" onclick="showActividadDetalle(${item.id})">Mostrar detalles</button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// ─────────────────────────────────────────────────────────────────────
// PANTALLAS DE DETALLE
// ─────────────────────────────────────────────────────────────────────

function showFirmaDetalle(id) {
  const item = demoData.firmasIndividuales.find(f => f.id === id);
  if (!item) return;

  const estadoFirmaLabels = { firmado: 'Firmado', pendiente: 'Por firmar', error: 'Error en firma' };
  const estadoBadgeClass = item.estado === 'firmado' ? 'success' : item.estado === 'error' ? 'error' : 'warning';

  document.getElementById('firma-detalle-body').innerHTML = `
    <div class="profile-field">
      <label>Documento</label>
      <p>${item.documento}</p>
    </div>
    <div class="profile-field">
      <label>Estado</label>
      <p><span class="badge ${estadoBadgeClass}">${estadoFirmaLabels[item.estado]}</span></p>
    </div>
    <div class="profile-field">
      <label>Fecha y hora de firma</label>
      <p>${item.fecha}</p>
    </div>
    <div class="profile-field">
      <label>Certificado usado</label>
      <p>${item.certificado}</p>
    </div>
    <div class="profile-field">
      <label>Hash del documento</label>
      <p class="hash-value">${item.hashCompleto}</p>
    </div>
  `;

  document.getElementById('modal-firma-detalle').style.display = 'flex';
}

function showLoteDetalle(id) {
  const item = demoData.firmasMasivas.find(l => l.id === id);
  if (!item) return;

  const estadoLoteLabels = { completada: 'Firma completada', 'con-errores': 'Con errores' };
  const estadoBadgeClass = item.estado === 'completada' ? 'success' : 'warning';

  let erroresHtml = '<p class="empty-state">No hay documentos con error en este lote.</p>';
  if (item.documentosConError.length > 0) {
    erroresHtml = item.documentosConError.map((doc, index) => `
      <div class="error-doc-item">
        <div class="error-doc-info">
          <p class="error-doc-name">${doc.documento}</p>
          <p class="error-doc-motivo">${doc.motivo}</p>
        </div>
        <div class="table-actions">
          <button class="btn-action" onclick="reintentarDocumento('${item.id}', ${index})">Reintentar</button>
          <button class="btn-action btn-action-danger" onclick="eliminarDocumento('${item.id}', ${index})">Eliminar</button>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('lote-detalle-titulo').textContent = `Lote ${item.id}`;
  document.getElementById('lote-detalle-body').innerHTML = `
    <div class="lote-summary">
      <div class="profile-field">
        <label>Fecha de creación</label>
        <p>${item.fecha}</p>
      </div>
      <div class="profile-field">
        <label>Total de documentos</label>
        <p>${item.total}</p>
      </div>
      <div class="profile-field">
        <label>Firmados</label>
        <p><span class="badge success">${item.exitosos}</span></p>
      </div>
      <div class="profile-field">
        <label>Estado general</label>
        <p><span class="badge ${estadoBadgeClass}">${estadoLoteLabels[item.estado]}</span></p>
      </div>
    </div>
    <h4 class="detail-section-title">Documentos con error</h4>
    <div class="error-doc-list">
      ${erroresHtml}
    </div>
  `;

  document.getElementById('modal-lote-detalle').style.display = 'flex';
}

function reintentarDocumento(loteId, index) {
  const lote = demoData.firmasMasivas.find(l => l.id === loteId);
  const doc = lote.documentosConError[index];
  alert(`Reintentando la firma de "${doc.documento}".`);
}

function eliminarDocumento(loteId, index) {
  const lote = demoData.firmasMasivas.find(l => l.id === loteId);
  const doc = lote.documentosConError[index];
  if (confirm(`¿Eliminar "${doc.documento}" del lote? No vas a poder deshacer esta acción.`)) {
    lote.documentosConError.splice(index, 1);
    lote.errores = lote.documentosConError.length;
    showLoteDetalle(loteId);
    populateFirmasMasivasTable();
  }
}

function showCertificadoDetalle(id) {
  const item = demoData.certificados.find(c => c.id === id);
  if (!item) return;

  const resultadoBadgeClass = item.resultado === 'exito' ? 'success' : 'error';
  const resultadoLabel = item.resultado === 'exito' ? 'Éxito' : 'Error';
  const alertaHtml = item.alertas
    ? `<span class="badge ${item.alertas === 'Alerta crítica' ? 'error' : 'warning'}">${item.alertas}</span>`
    : '<span class="no-alert">—</span>';

  document.getElementById('certificado-detalle-body').innerHTML = `
    <div class="profile-field">
      <label>Persona</label>
      <p>${item.persona}</p>
    </div>
    <div class="profile-field">
      <label>Resultado</label>
      <p><span class="badge ${resultadoBadgeClass}">${resultadoLabel}</span></p>
    </div>
    <div class="profile-field">
      <label>ID del certificado</label>
      <p>${item.idCert}</p>
    </div>
    <div class="profile-field">
      <label>Fecha de emisión</label>
      <p>${item.fechaEmision}</p>
    </div>
    <div class="profile-field">
      <label>Motivo del error</label>
      <p>${item.motivo}</p>
    </div>
    <div class="profile-field">
      <label>Alertas</label>
      <p>${alertaHtml}</p>
    </div>
  `;

  document.getElementById('modal-certificado-detalle').style.display = 'flex';
}

function showActividadDetalle(id) {
  const item = demoData.actividad.find(a => a.id === id);
  if (!item) return;

  document.getElementById('actividad-detalle-body').innerHTML = `
    <div class="profile-field">
      <label>Usuario</label>
      <p>${item.usuario}</p>
    </div>
    <div class="profile-field">
      <label>Fecha y hora</label>
      <p>${item.fecha}</p>
    </div>
    <div class="profile-field">
      <label>IP</label>
      <p>${item.ip}</p>
    </div>
    <div class="profile-field">
      <label>Origen</label>
      <p>${item.origen}</p>
    </div>
    <div class="profile-field">
      <label>Dispositivo</label>
      <p>${item.dispositivo}</p>
    </div>
  `;

  document.getElementById('modal-actividad-detalle').style.display = 'flex';
}

// ─────────────────────────────────────────────────────────────────────
// FILTROS
// ─────────────────────────────────────────────────────────────────────

function initFilters() {
  // Los filtros quedan siempre visibles; este botón solo limpia los valores cargados.
  const clearBtns = document.querySelectorAll('.btn-clear-filters');
  clearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filtersPanel = btn.closest('.table-toolbar').parentElement.querySelector('.filters-panel');
      if (filtersPanel) {
        filtersPanel.querySelectorAll('.filter-input').forEach(input => {
          input.value = '';
        });
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// SELECTOR DE RANGO DE FECHAS (calendario doble, tipo Figma)
// ─────────────────────────────────────────────────────────────────────

const shortMonthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const fullMonthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const calendarState = {};

function populateCalendarSelectors(panelEl) {
  const yearSelect = panelEl.querySelector('.calendar-year-select');
  const monthSelect = panelEl.querySelector('.calendar-month-select');
  if (yearSelect.options.length === 0) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 3; year <= currentYear + 3; year++) {
      yearSelect.add(new Option(year, year));
    }
  }
  if (monthSelect.options.length === 0) {
    fullMonthNames.forEach((name, index) => monthSelect.add(new Option(name, index)));
  }
}

// Selecciona una fecha dentro del rango compartido (independiente del panel
// donde se hizo clic): el 1er clic fija "desde" y reinicia "hasta"; el 2do
// clic fija "hasta"; si ya había un rango completo, el siguiente clic
// reinicia la selección. Esto permite elegir un rango dentro del mismo mes,
// clickeando dos días del mismo panel.
function selectCalendarDate(instanceId, date) {
  const range = calendarState[instanceId].range;

  if (!range.start || (range.start && range.end)) {
    range.start = date;
    range.end = null;
  } else {
    range.end = date;
  }

  renderCalendarPanel(instanceId, 'start');
  renderCalendarPanel(instanceId, 'end');
}

function renderCalendarPanel(instanceId, panelKey) {
  const wrapEl = document.querySelector(`.toolbar-daterange-wrap[data-instance="${instanceId}"]`);
  const panelEl = wrapEl.querySelector(`.calendar-panel[data-panel="${panelKey}"]`);
  const display = calendarState[instanceId].display[panelKey];
  const range = calendarState[instanceId].range;
  const yearSelect = panelEl.querySelector('.calendar-year-select');
  const monthSelect = panelEl.querySelector('.calendar-month-select');
  const grid = panelEl.querySelector('.calendar-grid');

  yearSelect.value = display.year;
  monthSelect.value = display.month;

  const startWeekday = new Date(display.year, display.month, 1).getDay();
  grid.innerHTML = '';

  let rangeStartTime = null;
  let rangeEndTime = null;
  if (range.start && range.end) {
    rangeStartTime = Math.min(range.start.getTime(), range.end.getTime());
    rangeEndTime = Math.max(range.start.getTime(), range.end.getTime());
  }

  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(display.year, display.month, i - startWeekday + 1);
    const isCurrentMonth = cellDate.getMonth() === display.month;
    const cellTime = cellDate.getTime();
    const isSelected = isCurrentMonth
      && ((range.start && cellTime === range.start.getTime()) || (range.end && cellTime === range.end.getTime()));
    const isInRange = isCurrentMonth && !isSelected && rangeStartTime !== null
      && cellTime > rangeStartTime && cellTime < rangeEndTime;

    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'calendar-day'
      + (isCurrentMonth ? '' : ' calendar-day-muted')
      + (isInRange ? ' calendar-day-in-range' : '')
      + (isSelected ? ' calendar-day-selected' : '');
    cell.textContent = cellDate.getDate();
    cell.addEventListener('click', () => selectCalendarDate(instanceId, cellDate));
    grid.appendChild(cell);
  }
}

function initCalendarPanel(instanceId, panelKey, panelEl) {
  populateCalendarSelectors(panelEl);
  renderCalendarPanel(instanceId, panelKey);

  panelEl.querySelector('.calendar-year-select').addEventListener('change', event => {
    calendarState[instanceId].display[panelKey].year = parseInt(event.target.value, 10);
    renderCalendarPanel(instanceId, panelKey);
  });

  panelEl.querySelector('.calendar-month-select').addEventListener('change', event => {
    calendarState[instanceId].display[panelKey].month = parseInt(event.target.value, 10);
    renderCalendarPanel(instanceId, panelKey);
  });
}

function initDateRangePicker(wrapEl) {
  const instanceId = wrapEl.dataset.instance;
  const btn = wrapEl.querySelector('[data-daterange-trigger]');
  const popover = wrapEl.querySelector('[data-daterange-popover]');
  if (!btn || !popover) return;

  const label = wrapEl.querySelector('.date-range-label');
  calendarState[instanceId] = {
    display: {
      start: { year: 2026, month: 6 },
      end: { year: 2026, month: 6 }
    },
    range: { start: null, end: null }
  };

  initCalendarPanel(instanceId, 'start', wrapEl.querySelector('.calendar-panel[data-panel="start"]'));
  initCalendarPanel(instanceId, 'end', wrapEl.querySelector('.calendar-panel[data-panel="end"]'));

  btn.addEventListener('click', event => {
    event.stopPropagation();
    const isHidden = popover.style.display === 'none' || !popover.style.display;
    if (isHidden) {
      const rect = btn.getBoundingClientRect();
      popover.style.top = rect.bottom + 8 + 'px';
      popover.style.left = rect.left + 'px';
      popover.style.display = 'flex';
    } else {
      popover.style.display = 'none';
    }
  });

  popover.addEventListener('click', event => event.stopPropagation());

  document.addEventListener('click', () => {
    popover.style.display = 'none';
  });

  wrapEl.querySelector('[data-daterange-swap]').addEventListener('click', () => {
    const display = calendarState[instanceId].display;
    const temp = { ...display.start };
    display.start = { ...display.end };
    display.end = temp;
    renderCalendarPanel(instanceId, 'start');
    renderCalendarPanel(instanceId, 'end');
  });

  wrapEl.querySelector('[data-daterange-apply]').addEventListener('click', () => {
    const { start, end } = calendarState[instanceId].range;
    const rangeStart = start && end ? (start.getTime() <= end.getTime() ? start : end) : start;
    const rangeEnd = start && end ? (start.getTime() <= end.getTime() ? end : start) : null;

    if (rangeStart && rangeEnd) {
      label.textContent = `${shortMonthNames[rangeStart.getMonth()]} ${String(rangeStart.getDate()).padStart(2, '0')} - ${shortMonthNames[rangeEnd.getMonth()]} ${String(rangeEnd.getDate()).padStart(2, '0')}`;
    } else if (rangeStart) {
      label.textContent = `Desde ${shortMonthNames[rangeStart.getMonth()]} ${String(rangeStart.getDate()).padStart(2, '0')}`;
    } else {
      label.textContent = 'Seleccionar fechas';
    }
    popover.style.display = 'none';
  });

  wrapEl.querySelector('[data-daterange-cancel]').addEventListener('click', () => {
    popover.style.display = 'none';
  });
}

// ─────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE FILTROS (elegir qué filtros preestablecidos mostrar)
// ─────────────────────────────────────────────────────────────────────

const filterConfigs = {
  'firmas-individual': [
    { key: 'estado', label: 'Estado', visible: true },
    { key: 'certificado', label: 'Certificado', visible: true }
  ],
  'firmas-masiva': [
    { key: 'estado', label: 'Estado', visible: true },
    { key: 'certificado', label: 'Certificado', visible: true }
  ],
  certificados: [
    { key: 'resultado', label: 'Resultado', visible: true },
    { key: 'motivo', label: 'Motivo del error', visible: true }
  ]
};

const filterPanelSelectors = {
  'firmas-individual': '#tab-firmas-individual .toolbar-group',
  'firmas-masiva': '#tab-firmas-masiva .toolbar-group',
  certificados: '#section-certificados .filters-panel'
};

let currentFilterConfigTable = null;

function applyFilterConfig(tableKey) {
  const config = filterConfigs[tableKey];
  const panel = document.querySelector(filterPanelSelectors[tableKey]);
  if (!config || !panel) return;

  config.forEach(filter => {
    const item = panel.querySelector(`[data-filter-key="${filter.key}"]`);
    if (item) item.style.display = filter.visible ? '' : 'none';
  });
}

function openFilterConfig(tableKey) {
  currentFilterConfigTable = tableKey;
  const config = filterConfigs[tableKey];
  const list = document.getElementById('filters-config-list');

  list.innerHTML = config.map(filter => `
    <div class="column-item" data-key="${filter.key}">
      <input type="checkbox" id="filter-cfg-${tableKey}-${filter.key}" ${filter.visible ? 'checked' : ''}>
      <label for="filter-cfg-${tableKey}-${filter.key}">${filter.label}</label>
    </div>
  `).join('');

  document.getElementById('modal-filters-config').style.display = 'flex';
}

function saveFilterConfig() {
  if (!currentFilterConfigTable) return;

  const items = document.querySelectorAll('#filters-config-list .column-item');
  const previousConfig = filterConfigs[currentFilterConfigTable];

  filterConfigs[currentFilterConfigTable] = Array.from(items).map(item => {
    const key = item.dataset.key;
    const checkbox = item.querySelector('input[type="checkbox"]');
    const original = previousConfig.find(filter => filter.key === key);
    return { ...original, visible: checkbox.checked };
  });

  applyFilterConfig(currentFilterConfigTable);
  document.getElementById('modal-filters-config').style.display = 'none';
}

function initFiltersConfig() {
  document.querySelectorAll('.btn-filters-config').forEach(btn => {
    btn.addEventListener('click', () => openFilterConfig(btn.dataset.table));
  });

  document.getElementById('btn-save-filters-config').addEventListener('click', saveFilterConfig);
}

// ─────────────────────────────────────────────────────────────────────
// MENÚ DE OPCIONES DEL TOOLBAR (⚙ → Filtros / Columnas)
// ─────────────────────────────────────────────────────────────────────

function initToolbarOptionsMenu(wrapEl) {
  const tableKey = wrapEl.dataset.instance;
  const btn = wrapEl.querySelector('[data-gear-trigger]');
  const menu = wrapEl.querySelector('[data-gear-menu]');
  if (!btn || !menu) return;

  btn.addEventListener('click', event => {
    event.stopPropagation();
    const isHidden = menu.style.display === 'none' || !menu.style.display;
    if (isHidden) {
      const rect = btn.getBoundingClientRect();
      menu.style.top = rect.bottom + 8 + 'px';
      menu.style.right = (window.innerWidth - rect.right) + 'px';
      menu.style.left = 'auto';
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  });

  menu.addEventListener('click', event => event.stopPropagation());

  document.addEventListener('click', () => {
    menu.style.display = 'none';
  });

  menu.querySelector('[data-action="filtros"]').addEventListener('click', () => {
    menu.style.display = 'none';
    openFilterConfig(tableKey);
  });

  menu.querySelector('[data-action="columnas"]').addEventListener('click', () => {
    menu.style.display = 'none';
    openColumnConfig(tableKey);
  });
}

// ─────────────────────────────────────────────────────────────────────
// COLUMNAS CONFIGURABLES (mostrar/ocultar y reordenar)
// ─────────────────────────────────────────────────────────────────────

const columnConfigs = {
  'firmas-individual': [
    { key: 'documento', label: 'Nombre del documento', visible: true },
    { key: 'fecha', label: 'Fecha de firma', visible: true },
    { key: 'certificado', label: 'Certificado', visible: true },
    { key: 'estado', label: 'Estado', visible: true }
  ],
  'firmas-masiva': [
    { key: 'lote', label: 'Nombre de sobre', visible: true },
    { key: 'fecha', label: 'Fecha de creación', visible: true },
    { key: 'total', label: 'Cantidad de documentos', visible: true },
    { key: 'certificado', label: 'Certificado', visible: true },
    { key: 'estado', label: 'Estado', visible: true }
  ],
  certificados: [
    { key: 'persona', label: 'Persona', visible: true },
    { key: 'resultado', label: 'Resultado', visible: true },
    { key: 'id-cert', label: 'ID del certificado', visible: true },
    { key: 'motivo', label: 'Motivo del error', visible: true },
    { key: 'alertas', label: 'Alertas', visible: true }
  ]
};

const columnConfigTableSelectors = {
  'firmas-individual': '#tab-firmas-individual .data-table',
  'firmas-masiva': '#tab-firmas-masiva .data-table',
  certificados: '#section-certificados .data-table'
};

let currentColumnConfigTable = null;

// Reordena y muestra/oculta las columnas de la tabla real según el
// config guardado. "Acciones" queda siempre fija al final.
function applyColumnConfig(tableKey) {
  const config = columnConfigs[tableKey];
  const table = document.querySelector(columnConfigTableSelectors[tableKey]);
  if (!config || !table) return;

  const headerRow = table.querySelector('thead tr');
  const bodyRows = table.querySelectorAll('tbody tr');

  const reorderRow = row => {
    config.forEach(col => {
      const cell = row.querySelector(`[data-col="${col.key}"]`);
      if (cell) {
        cell.style.display = col.visible ? '' : 'none';
        row.appendChild(cell);
      }
    });
    const acciones = row.querySelector('[data-col="acciones"]');
    if (acciones) row.appendChild(acciones);
  };

  reorderRow(headerRow);
  bodyRows.forEach(reorderRow);
}

function openColumnConfig(tableKey) {
  currentColumnConfigTable = tableKey;
  const config = columnConfigs[tableKey];
  const list = document.getElementById('columns-config-list');

  list.innerHTML = config.map(col => `
    <div class="column-item" draggable="true" data-key="${col.key}">
      <span class="icon drag-handle">drag_indicator</span>
      <input type="checkbox" id="col-${tableKey}-${col.key}" ${col.visible ? 'checked' : ''}>
      <label for="col-${tableKey}-${col.key}">${col.label}</label>
    </div>
  `).join('');

  initColumnDragAndDrop(list);
  document.getElementById('modal-columns').style.display = 'flex';
}

function initColumnDragAndDrop(list) {
  let draggedItem = null;

  list.querySelectorAll('.column-item').forEach(item => {
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => item.classList.add('dragging'), 0);
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      draggedItem = null;
    });

    item.addEventListener('dragover', event => {
      event.preventDefault();
      if (!draggedItem || draggedItem === item) return;
      const rect = item.getBoundingClientRect();
      const isAfter = event.clientY > rect.top + rect.height / 2;
      list.insertBefore(draggedItem, isAfter ? item.nextSibling : item);
    });
  });
}

function saveColumnConfig() {
  if (!currentColumnConfigTable) return;

  const items = document.querySelectorAll('#columns-config-list .column-item');
  const previousConfig = columnConfigs[currentColumnConfigTable];

  columnConfigs[currentColumnConfigTable] = Array.from(items).map(item => {
    const key = item.dataset.key;
    const checkbox = item.querySelector('input[type="checkbox"]');
    const original = previousConfig.find(col => col.key === key);
    return { ...original, visible: checkbox.checked };
  });

  applyColumnConfig(currentColumnConfigTable);
  document.getElementById('modal-columns').style.display = 'none';
}

function initColumnConfig() {
  document.querySelectorAll('.btn-column-config').forEach(btn => {
    btn.addEventListener('click', () => openColumnConfig(btn.dataset.table));
  });

  document.getElementById('btn-save-columns').addEventListener('click', saveColumnConfig);
}

// ─────────────────────────────────────────────────────────────────────
// MODALES
// ─────────────────────────────────────────────────────────────────────

function initModals() {
  // Cerrar modales con botón close
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Cerrar modal al hacer clic fuera
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Botón invitar usuario
  const btnInvite = document.getElementById('btn-invite-user');
  if (btnInvite) {
    btnInvite.addEventListener('click', () => {
      const modal = document.getElementById('modal-invite');
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  }

  // Form invitar usuario
  const formInvite = document.getElementById('form-invite-user');
  if (formInvite) {
    formInvite.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Usuario invitado correctamente');
      document.getElementById('modal-invite').style.display = 'none';
      formInvite.reset();
    });
  }
}

let currentUserMenuId = null;

function showUserMenu(event, userId) {
  event.preventDefault();
  const modal = document.getElementById('modal-user-menu');
  const content = modal ? modal.querySelector('.modal-content') : null;
  if (modal && content) {
    currentUserMenuId = userId;

    // El overlay cubre toda la pantalla (para poder cerrar al hacer clic afuera);
    // solo el menú se posiciona cerca del botón que lo abrió.
    const rect = event.target.closest('button').getBoundingClientRect();
    modal.style.display = 'flex';
    modal.style.justifyContent = 'flex-start';
    modal.style.alignItems = 'flex-start';
    content.style.position = 'fixed';
    content.style.top = rect.bottom + 8 + 'px';
    content.style.left = rect.left - 200 + 'px';
    content.style.margin = '0';
  }
}

// ─────────────────────────────────────────────────────────────────────
// MODALES DE ACCIONES DE USUARIO (Editar datos / Cambiar rol / Eliminar)
// ─────────────────────────────────────────────────────────────────────

function openEditUserModal(userId) {
  const user = demoData.usuarios.find(u => u.id === userId);
  if (!user) return;

  document.getElementById('edit-user-nombre').value = user.nombre;
  document.getElementById('edit-user-apellido').value = user.apellido;
  document.getElementById('edit-user-email').value = user.email;

  const modal = document.getElementById('modal-edit-user');
  modal.dataset.userId = userId;
  modal.style.display = 'flex';
}

function openChangeRoleModal(userId) {
  const user = demoData.usuarios.find(u => u.id === userId);
  if (!user) return;

  document.getElementById('change-role-select').value = user.rol;

  const modal = document.getElementById('modal-change-role');
  modal.dataset.userId = userId;
  modal.style.display = 'flex';
}

function openDeleteUserModal(userId) {
  const user = demoData.usuarios.find(u => u.id === userId);
  if (!user) return;

  document.getElementById('delete-user-message').textContent =
    `¿Eliminar a ${user.nombre} ${user.apellido} del equipo? No vas a poder deshacer esta acción.`;

  const overlay = document.getElementById('modal-delete-user');
  overlay.dataset.userId = userId;
  overlay.classList.add('visible');
}

function initUserActionModals() {
  // Menú (⋯): cada acción cierra el menú y abre su modal correspondiente
  document.querySelectorAll('#modal-user-menu .action-item').forEach(item => {
    item.addEventListener('click', () => {
      document.getElementById('modal-user-menu').style.display = 'none';
      const userId = currentUserMenuId;
      const action = item.dataset.action;
      if (action === 'editar-datos') openEditUserModal(userId);
      else if (action === 'cambiar-rol') openChangeRoleModal(userId);
      else if (action === 'eliminar-usuario') openDeleteUserModal(userId);
    });
  });

  // Editar datos
  document.getElementById('form-edit-user').addEventListener('submit', event => {
    event.preventDefault();
    const modal = document.getElementById('modal-edit-user');
    const user = demoData.usuarios.find(u => u.id === parseInt(modal.dataset.userId, 10));
    if (user) {
      user.nombre = document.getElementById('edit-user-nombre').value;
      user.apellido = document.getElementById('edit-user-apellido').value;
      user.email = document.getElementById('edit-user-email').value;
      populateUsuariosTable();
    }
    modal.style.display = 'none';
  });

  // Cambiar rol
  document.getElementById('form-change-role').addEventListener('submit', event => {
    event.preventDefault();
    const modal = document.getElementById('modal-change-role');
    const user = demoData.usuarios.find(u => u.id === parseInt(modal.dataset.userId, 10));
    if (user) {
      user.rol = document.getElementById('change-role-select').value;
      populateUsuariosTable();
    }
    modal.style.display = 'none';
  });

  // Eliminar usuario
  const deleteOverlay = document.getElementById('modal-delete-user');

  const closeDeleteModal = () => deleteOverlay.classList.remove('visible');

  document.getElementById('btn-cancel-delete-user').addEventListener('click', closeDeleteModal);
  document.getElementById('btn-close-delete-user').addEventListener('click', closeDeleteModal);
  deleteOverlay.addEventListener('click', event => {
    if (event.target === deleteOverlay) closeDeleteModal();
  });

  document.getElementById('btn-confirm-delete-user').addEventListener('click', () => {
    const userId = parseInt(deleteOverlay.dataset.userId, 10);
    demoData.usuarios = demoData.usuarios.filter(u => u.id !== userId);
    populateUsuariosTable();
    closeDeleteModal();
  });
}

// ─────────────────────────────────────────────────────────────────────
// INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTabs();
  initFilters();
  initFiltersConfig();
  document.querySelectorAll('.toolbar-gear-wrap').forEach(initToolbarOptionsMenu);
  document.querySelectorAll('.toolbar-daterange-wrap').forEach(initDateRangePicker);
  initColumnConfig();
  initModals();
  initUserActionModals();

  // Mostrar sección inicial
  showSection('firmas');
  populateFiremosTable();
});
