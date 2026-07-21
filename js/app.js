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
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'González',
      email: 'maria.gonzalez@empresa.com',
      auth: 'Email',
      rol: 'Colaborador',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'López',
      email: 'carlos.lopez@empresa.com',
      auth: 'Email',
      rol: 'Colaborador',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Rodríguez',
      email: 'ana.rodriguez@empresa.com',
      auth: 'Email',
      rol: 'Administrador',
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
      documentosConError: []
    },
    {
      id: 'LOTE-2026-003',
      fecha: '2026-07-18 14:15:00',
      total: 75,
      exitosos: 70,
      errores: 5,
      estado: 'con-errores',
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
    completada: 'Firma completada',
    'con-errores': 'Con errores'
  };

  data.forEach(item => {
    const row = document.createElement('tr');

    const estadoBadgeClass = item.estado === 'completada' ? 'success' : 'warning';

    row.innerHTML = `
      <td data-col="lote">${item.id}</td>
      <td data-col="fecha">${item.fecha}</td>
      <td data-col="total">${item.total}</td>
      <td data-col="exitosos"><span class="badge success">${item.exitosos}</span></td>
      <td data-col="errores"><span class="badge error">${item.errores}</span></td>
      <td data-col="estado"><span class="badge ${estadoBadgeClass}">${estadoLoteLabels[item.estado]}</span></td>
      <td data-col="acciones">
        <div class="table-actions">
          <button class="btn-action" onclick="showLoteDetalle('${item.id}')">Ver lote</button>
          ${item.errores > 0 ? `<button class="btn-action" onclick="reintentarLote('${item.id}')">Reintentar</button>` : ''}
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
      <td data-col="nombre">${item.nombre}</td>
      <td data-col="apellido">${item.apellido}</td>
      <td data-col="email">${item.email}</td>
      <td data-col="auth">${item.auth}</td>
      <td data-col="rol"><span class="badge info">${item.rol}</span></td>
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

  applyColumnConfig('usuarios');
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
          <button class="btn-action" onclick="showActividadDetalle(${item.id})">Ver detalles</button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });

  applyColumnConfig('actividad');
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

function reintentarLote(id) {
  if (confirm('¿Reintentar todos los documentos con error de este lote?')) {
    alert(`Reintentando los documentos con error del lote ${id}.`);
  }
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
// SELECTOR DE RANGO DE FECHAS (toolbar compacto tipo Figma)
// ─────────────────────────────────────────────────────────────────────

const shortMonthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function formatShortDate(isoDate) {
  const [, month, day] = isoDate.split('-');
  return `${shortMonthNames[parseInt(month, 10) - 1]} ${day}`;
}

function initDateRangePicker() {
  const btn = document.getElementById('btn-date-range');
  const popover = document.getElementById('date-range-popover');
  if (!btn || !popover) return;

  const label = document.getElementById('date-range-label');
  const desde = document.getElementById('date-range-desde');
  const hasta = document.getElementById('date-range-hasta');

  btn.addEventListener('click', event => {
    event.stopPropagation();
    popover.style.display = popover.style.display === 'none' ? 'flex' : 'none';
  });

  popover.addEventListener('click', event => event.stopPropagation());

  document.addEventListener('click', () => {
    popover.style.display = 'none';
  });

  document.getElementById('btn-apply-date-range').addEventListener('click', () => {
    if (desde.value && hasta.value) {
      label.textContent = `${formatShortDate(desde.value)} - ${formatShortDate(hasta.value)}`;
    } else if (desde.value) {
      label.textContent = `Desde ${formatShortDate(desde.value)}`;
    } else if (hasta.value) {
      label.textContent = `Hasta ${formatShortDate(hasta.value)}`;
    } else {
      label.textContent = 'Seleccionar fechas';
    }
    popover.style.display = 'none';
  });

  document.getElementById('btn-clear-date-range').addEventListener('click', () => {
    desde.value = '';
    hasta.value = '';
    label.textContent = 'Seleccionar fechas';
    popover.style.display = 'none';
  });
}

// ─────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE FILTROS (elegir qué filtros preestablecidos mostrar)
// ─────────────────────────────────────────────────────────────────────

const filterConfigs = {
  certificados: [
    { key: 'resultado', label: 'Resultado', visible: true },
    { key: 'motivo', label: 'Motivo del error', visible: true }
  ],
  usuarios: [
    { key: 'rol', label: 'Rol', visible: true },
    { key: 'auth', label: 'Método de autenticación', visible: true }
  ],
  actividad: [
    { key: 'fecha', label: 'Fecha', visible: true },
    { key: 'usuario', label: 'Usuario', visible: true }
  ]
};

const filterPanelSelectors = {
  certificados: '#section-certificados .filters-panel',
  usuarios: '#section-usuarios .filters-panel',
  actividad: '#section-actividad .filters-panel'
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
    { key: 'lote', label: 'ID del lote', visible: true },
    { key: 'fecha', label: 'Fecha de creación', visible: true },
    { key: 'total', label: 'Total de documentos', visible: true },
    { key: 'exitosos', label: 'Firmados', visible: true },
    { key: 'errores', label: 'Errores', visible: true },
    { key: 'estado', label: 'Estado general', visible: true }
  ],
  certificados: [
    { key: 'persona', label: 'Persona', visible: true },
    { key: 'resultado', label: 'Resultado', visible: true },
    { key: 'id-cert', label: 'ID del certificado', visible: true },
    { key: 'motivo', label: 'Motivo del error', visible: true },
    { key: 'alertas', label: 'Alertas', visible: true }
  ],
  usuarios: [
    { key: 'nombre', label: 'Nombre', visible: true },
    { key: 'apellido', label: 'Apellido', visible: true },
    { key: 'email', label: 'Email', visible: true },
    { key: 'auth', label: 'Método de autenticación', visible: true },
    { key: 'rol', label: 'Rol', visible: true }
  ],
  actividad: [
    { key: 'usuario', label: 'Usuario', visible: true },
    { key: 'fecha', label: 'Fecha y hora', visible: true },
    { key: 'ip', label: 'IP', visible: true },
    { key: 'origen', label: 'Origen', visible: true },
    { key: 'dispositivo', label: 'Dispositivo', visible: true }
  ]
};

const columnConfigTableSelectors = {
  'firmas-individual': '#tab-firmas-individual .data-table',
  'firmas-masiva': '#tab-firmas-masiva .data-table',
  certificados: '#section-certificados .data-table',
  usuarios: '#section-usuarios .data-table',
  actividad: '#section-actividad .data-table'
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

function showUserMenu(event, userId) {
  event.preventDefault();
  const modal = document.getElementById('modal-user-menu');
  const content = modal ? modal.querySelector('.modal-content') : null;
  if (modal && content) {
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

    // Cerrar al hacer clic en una acción
    modal.querySelectorAll('.action-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.textContent.trim();
        alert(`Acción: ${action} para usuario ${userId}`);
        modal.style.display = 'none';
      });
    });
  }
}

// ─────────────────────────────────────────────────────────────────────
// INICIALIZACIÓN
// ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTabs();
  initFilters();
  initFiltersConfig();
  initDateRangePicker();
  initColumnConfig();
  initModals();

  // Mostrar sección inicial
  showSection('firmas');
  populateFiremosTable();
});
