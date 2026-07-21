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
    pendiente: 'Firma pendiente',
    error: 'Error'
  };

  data.forEach(item => {
    const row = document.createElement('tr');

    const estadoBadgeClass = item.estado === 'firmado' ? 'success' : item.estado === 'error' ? 'error' : 'info';

    row.innerHTML = `
      <td>${item.fecha}</td>
      <td>${item.documento}</td>
      <td><span class="badge ${estadoBadgeClass}">${estadoFirmaLabels[item.estado]}</span></td>
      <td>${item.certificado}</td>
      <td>${item.hash}</td>
      <td>
        <div class="table-actions">
          <button class="btn-action" onclick="showFirmaDetalle(${item.id})">Ver detalles</button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
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
      <td>${item.id}</td>
      <td>${item.fecha}</td>
      <td>${item.total}</td>
      <td><span class="badge success">${item.exitosos}</span></td>
      <td><span class="badge error">${item.errores}</span></td>
      <td><span class="badge ${estadoBadgeClass}">${estadoLoteLabels[item.estado]}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-action" onclick="showLoteDetalle('${item.id}')">Ver lote</button>
          ${item.errores > 0 ? `<button class="btn-action" onclick="reintentarLote('${item.id}')">Reintentar</button>` : ''}
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
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
      <td>${item.persona}</td>
      <td><span class="badge ${resultadoBadgeClass}">${resultadoLabel}</span></td>
      <td>${item.idCert}</td>
      <td>${item.motivo}</td>
      <td>${alertaCell}</td>
      <td>
        <div class="table-actions">
          <button class="btn-action" onclick="showCertificadoDetalle(${item.id})">Ver certificado</button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function populateUsuariosTable() {
  const tbody = document.querySelector('#section-usuarios .data-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const data = demoData.usuarios;

  data.forEach(item => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.apellido}</td>
      <td>${item.email}</td>
      <td>${item.auth}</td>
      <td><span class="badge info">${item.rol}</span></td>
      <td>
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
      <td>${item.usuario}</td>
      <td>${item.fecha}</td>
      <td>${item.ip}</td>
      <td>${item.origen}</td>
      <td>${item.dispositivo}</td>
      <td>
        <div class="table-actions">
          <button class="btn-action" onclick="showActividadDetalle(${item.id})">Ver detalles</button>
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

  const estadoFirmaLabels = { firmado: 'Firmado', pendiente: 'Firma pendiente', error: 'Error' };
  const estadoBadgeClass = item.estado === 'firmado' ? 'success' : item.estado === 'error' ? 'error' : 'info';

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
  const toggleBtns = document.querySelectorAll('.btn-filters-toggle');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filtersPanel = btn.closest('.table-toolbar').parentElement.querySelector('.filters-panel');
      if (filtersPanel) {
        const isHidden = filtersPanel.style.display === 'none';
        filtersPanel.style.display = isHidden ? 'block' : 'none';
      }
    });
  });

  // Clear filters
  const clearBtns = document.querySelectorAll('.btn-clear-filters');
  clearBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filtersPanel = btn.closest('.table-toolbar').parentElement.querySelector('.filters-panel');
      if (filtersPanel) {
        filtersPanel.querySelectorAll('.filter-input').forEach(input => {
          input.value = '';
        });
        btn.style.display = 'none';
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// COLUMNAS CONFIGURABLES
// ─────────────────────────────────────────────────────────────────────

function initColumnConfig() {
  const btns = document.querySelectorAll('.btn-column-config');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById('modal-columns');
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  });
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
  initColumnConfig();
  initModals();

  // Mostrar sección inicial
  showSection('firmas');
  populateFiremosTable();
});
