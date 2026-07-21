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
      estado: 'exitosa',
      certificado: 'CN=Isaac Meneses',
      hash: '3a7b2c8f...'
    },
    {
      id: 2,
      fecha: '2026-07-20 13:45:20',
      documento: 'Factura_2026_001.pdf',
      estado: 'exitosa',
      certificado: 'CN=María González',
      hash: '5d9e4a1c...'
    },
    {
      id: 3,
      fecha: '2026-07-20 12:15:45',
      documento: 'Acuerdo_confidencialidad.pdf',
      estado: 'pendiente',
      certificado: 'CN=Carlos López',
      hash: '7f2b6c8a...'
    },
    {
      id: 4,
      fecha: '2026-07-19 16:20:10',
      documento: 'Poder_notarial.pdf',
      estado: 'error',
      certificado: 'CN=Isaac Meneses',
      hash: '9c3d7e1f...'
    },
    {
      id: 5,
      fecha: '2026-07-19 15:10:30',
      documento: 'Testamento.pdf',
      estado: 'exitosa',
      certificado: 'CN=Ana Rodríguez',
      hash: '2e4a8b5c...'
    }
  ],

  firmasMasivas: [
    {
      id: 'LOTE-2026-001',
      fecha: '2026-07-20 10:00:00',
      total: 50,
      exitosos: 48,
      errores: 2,
      estado: 'parcial'
    },
    {
      id: 'LOTE-2026-002',
      fecha: '2026-07-19 09:30:00',
      total: 100,
      exitosos: 100,
      errores: 0,
      estado: 'completado'
    },
    {
      id: 'LOTE-2026-003',
      fecha: '2026-07-18 14:15:00',
      total: 75,
      exitosos: 70,
      errores: 5,
      estado: 'parcial'
    }
  ],

  certificados: [
    {
      id: 1,
      persona: 'Isaac Cristian Meneses',
      resultado: 'exito',
      idCert: 'CERT-2026-001',
      motivo: '-',
      alertas: 'Ninguna'
    },
    {
      id: 2,
      persona: 'María González',
      resultado: 'error',
      idCert: 'CERT-2026-002',
      motivo: 'Datos inconsistentes',
      alertas: 'Error crítico'
    },
    {
      id: 3,
      persona: 'Carlos López',
      resultado: 'exito',
      idCert: 'CERT-2026-003',
      motivo: '-',
      alertas: 'Ninguna'
    },
    {
      id: 4,
      persona: 'Ana Rodríguez',
      resultado: 'exito',
      idCert: 'CERT-2026-004',
      motivo: '-',
      alertas: 'Advertencia: vencimiento en 30 días'
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

  data.forEach(item => {
    const row = document.createElement('tr');

    const estadoBadgeClass = item.estado === 'exitosa' ? 'success' : item.estado === 'error' ? 'error' : 'info';

    row.innerHTML = `
      <td>${item.fecha}</td>
      <td>${item.documento}</td>
      <td><span class="badge ${estadoBadgeClass}">${capitalize(item.estado)}</span></td>
      <td>${item.certificado}</td>
      <td>${item.hash}</td>
      <td>
        <div class="table-actions">
          <button class="btn-action">Ver detalles</button>
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

  data.forEach(item => {
    const row = document.createElement('tr');

    const estadoBadgeClass = item.estado === 'completado' ? 'success' : 'warning';

    row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.fecha}</td>
      <td>${item.total}</td>
      <td><span class="badge success">${item.exitosos}</span></td>
      <td><span class="badge error">${item.errores}</span></td>
      <td><span class="badge ${estadoBadgeClass}">${capitalize(item.estado)}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-action">Ver lote</button>
          <button class="btn-action">Reintentar</button>
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
    const alertaBadgeClass = item.alertas.includes('crítico') ? 'error' : item.alertas.includes('Advertencia') ? 'warning' : 'info';

    row.innerHTML = `
      <td>${item.persona}</td>
      <td><span class="badge ${resultadoBadgeClass}">${capitalize(item.resultado)}</span></td>
      <td>${item.idCert}</td>
      <td>${item.motivo}</td>
      <td><span class="badge ${alertaBadgeClass}">${item.alertas}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-action">Ver certificado</button>
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
          <button class="btn-action-menu" onclick="showUserMenu(event, ${item.id})">
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
          <button class="btn-action">Ver detalles</button>
        </div>
      </td>
    `;

    tbody.appendChild(row);
  });
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
  if (modal) {
    // Posicionar modal cerca del botón
    const rect = event.target.closest('button').getBoundingClientRect();
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.top = rect.bottom + 'px';
    modal.style.left = rect.left + 'px';

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
// UTILIDADES
// ─────────────────────────────────────────────────────────────────────

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
