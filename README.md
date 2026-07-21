# Panel de Gestión FID by Lakaut

Prototipo navegable del panel de gestión de FID (Firma Digital) by Lakaut en HTML + CSS + JS vanilla, sin frameworks.

## 🎯 Características

### Módulos Implementados

1. **Firmas**
   - Vista Individual: tabla con firmas 1 a 1
   - Firma Masiva: agrupación de lotes con estado general
   - Columnas: Fecha/Hora, Documento, Estado, Certificado, Hash

2. **Emisión de Certificados**
   - Tabla con persona, resultado (éxito/fallo), ID del certificado
   - Motivo de fallo y tags de alerta
   - Estados con badges de color

3. **Administración de Usuarios**
   - Tabla: Nombre, Apellido, Email, Método de Autenticación, Rol
   - Modal para invitar usuarios (rol: Admin o Colaborador)
   - Menú de acciones (⋯) por usuario

4. **Seguridad y Actividad**
   - Logs de inicio de sesión
   - Columnas: Usuario, Fecha/Hora, IP, Origen, Dispositivo

5. **Mi Perfil**
   - Tarjeta de perfil con avatar
   - Información básica (CUIL, email, método de autenticación)
   - Lista de permisos asignados

### Componentes Transversales

- **Filtros**: Panel de filtros por columna (expandible)
- **Columnas Configurables**: Modal para mostrar/ocultar columnas
- **Paginación**: Navegación por páginas
- **Badges de Estado**: Colores para éxito (verde), error (rojo), advertencia (amarillo), info (azul)
- **Sidebar de Navegación**: Acceso a todas las secciones
- **Modales**: Invitar usuario, configurar columnas, acciones de usuario

## 🎨 Diseño

### Stack de Tecnologías

- **HTML5**: Semántico, accesible
- **CSS3 vanilla**: Sin preprocesadores
- **JavaScript vanilla**: Sin frameworks ni librerías
- **Iconos**: Material Symbols Outlined (Google Fonts)
- **Tipografía**: Inter + Open Sans (Google Fonts)

### Sistema de Diseño

Reutiliza tokens y componentes CSS del proyecto "Flujo Jurídica Renovado":

```
Color primario: #2A39D0 (--blue)
Texto oscuro: #0b0c0e
Texto principal: #3b3a45
Texto secundario: #6c757d
Fondos: #fcfcfd (página), #f0f2f4 (sidebar)
```

### Archivos CSS

- `tokens.css`: Variables de color y espaciado
- `base.css`: Reset global, tipografía
- `buttons.css`: Variantes de botones (primary, outline, ghost, etc.)
- `inputs.css`: Inputs, selects, form groups
- `header.css`: Estilos del header
- `panel.css`: Estilos específicos del panel (tablas, sidebar, etc.)

## 📊 Datos de Demostración

### Usuario Principal

- **Nombre**: Isaac Cristian Meneses
- **Email**: isacris23@gmail.com
- **CUIL**: 20-96081435-2
- **Avatar**: https://randomuser.me/api/portraits/men/32.jpg

### Usuarios Adicionales

- María González (Colaborador)
- Carlos López (Colaborador)
- Ana Rodríguez (Administrador)

## 🚀 Cómo Ejecutar

### Servidor Local

El proyecto incluye un servidor HTTP (http-server) configurado en `.claude/launch.json`:

```bash
# Con Claude Code CLI:
claude preview panel-dev

# O manualmente con http-server:
npx http-server . -p 8000

# O con Python:
python3 -m http.server 8000
```

Luego abre: `http://localhost:8000`

### Archivos Principales

```
index.html          # HTML principal
assets/
  css/
    tokens.css      # Variables de diseño
    base.css        # Estilos base
    buttons.css     # Componentes de botón
    inputs.css      # Componentes de formulario
    header.css      # Header y layout
    panel.css       # Estilos del panel
  icons/
    logo-fid.svg    # Logo de FID
js/
  app.js            # Lógica de la aplicación
```

## 🎯 Funcionalidades Implementadas

### Navegación

- [x] Sidebar con 5 secciones (Firmas, Certificados, Usuarios, Actividad, Mi Perfil)
- [x] Tabs dentro de secciones (ej: Vista Individual / Firma Masiva)
- [x] Indicador visual de sección activa

### Tablas

- [x] Datos poblados dinámicamente desde JS
- [x] Headers con identificación de columnas
- [x] Badges de estado con colores
- [x] Botones de acción en filas
- [x] Paginación (anterior/siguiente)

### Filtros

- [x] Panel expandible de filtros
- [x] Inputs de fecha, text, select
- [x] Botón "Clear all" (UI lista, lógica pendiente de refinar)

### Modales

- [x] Modal de "Invitar Usuario" (email + rol)
- [x] Modal de "Configurar Columnas"
- [x] Modal de "Acciones de Usuario" (resetear 2FA, editar login, bloquear)
- [x] Cerrar con X o overlay

### Responsive

- [x] Desktop: Sidebar 240px + contenido full
- [x] Mobile (<768px): Sidebar achicado a 64px (solo iconos)
- [x] Tablas: Scroll horizontal en móvil

## 🔒 No Incluido (Según PRD)

- ❌ KYC / Verificación de identidad
- ❌ Reporting / Gráficos Power BI
- ❌ Equipos personalizados (solo Admin/Colaborador)
- ❌ SSO / Integraciones externas

## 📝 Próximos Pasos (Sugerencias)

1. **Backend**: Conectar a API para datos dinámicos
2. **Filtros**: Implementar lógica de filtrado real
3. **Paginación**: Lógica completa de navegación
4. **Columnas**: Guardar preferencias de usuario
5. **Exportación**: Botones para descargar datos (CSV, PDF)
6. **Búsqueda**: Campo de búsqueda global
7. **Animations**: Transiciones suaves entre secciones
8. **Dark Mode**: Toggle para tema oscuro

## 📦 Estructura del Proyecto

```
Panel integradores/
├── index.html
├── README.md
├── .claude/
│   └── launch.json
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── buttons.css
│   │   ├── inputs.css
│   │   ├── header.css
│   │   └── panel.css
│   └── icons/
│       └── logo-fid.svg
└── js/
    └── app.js
```

## 🎪 Notas de Diseño

- El color azul primario (#2A39D0) se usa en:
  - Links activos, botones primarios, badges de rol
- Material Symbols Outlined se usa para:
  - Iconos en navegación, botones, inputs (select)
- Tipografía:
  - Headings: Open Sans (600-700 weight)
  - Body text: Inter (400-500 weight)
- Espaciado:
  - Gaps de 8px, 12px, 16px, 24px (múltiplos de 4)
- Border radius:
  - Buttons: 20px (pill-shaped)
  - Cards/inputs: 8-12px
  - Avatar: 50% (circular)

## ✅ Validación Visual

- [x] Colores FID respetados
- [x] Tipografía correcta
- [x] Padding/margin consistente
- [x] Badges legibles y diferenciados
- [x] Botones con hover states
- [x] Responsive en mobile/tablet/desktop
- [x] Accesibilidad básica (labels, alt text)

---

**Última actualización**: 2026-07-21  
**Creado para**: FID by Lakaut  
**Stack**: HTML5 + CSS3 + JavaScript ES6
