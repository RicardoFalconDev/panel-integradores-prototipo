/* ─── Branding del SDK — Panel de Gestión FID by Lakaut ──────────────
   Personalización de logo, color principal, tipografía y espaciado, con
   vista previa en vivo. Los valores se guardan en localStorage.
──────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var STORAGE_KEY = 'fid-panel-branding';
  // Personalización del logo activa. Con false se ignora cualquier logo guardado y se usa el de FID.
  var LOGO_ENABLED = true;
  var MAX_LOGO_BYTES = 50 * 1024;
  var MIN_CONTRAST = 4.5; // WCAG 2.0 AA, texto normal

  var DEFAULTS = {
    primary: '#2A39D0',
    primaryText: '#FFFFFF',
    logo: null,
    logoName: '',
    font: 'Inter',
    radius: 'full',
    radiusCustom: null // sin valor por defecto: lo escribe quien configura
  };

  // Escala de 8 px para el redondeado de los botones
  var RADII = { xs: 4, s: 8, m: 16, full: 999 };
  var RADIUS_CUSTOM_MIN = 0; // sin tope: con botones de 48 px de alto, desde 24 px ya es píldora

  var FONTS = [
    { id: 'Inter', label: 'Inter (predeterminada)', google: null },
    { id: 'Open Sans', label: 'Open Sans', google: null },
    { id: 'Roboto', label: 'Roboto', google: 'Roboto:wght@400;500;700' },
    { id: 'Montserrat', label: 'Montserrat', google: 'Montserrat:wght@400;500;600;700' },
    { id: 'Poppins', label: 'Poppins', google: 'Poppins:wght@400;500;600;700' },
    { id: 'Lato', label: 'Lato', google: 'Lato:wght@400;700' },
    { id: 'Nunito Sans', label: 'Nunito Sans', google: 'Nunito+Sans:wght@400;600;700' },
    { id: 'system', label: 'Fuente del sistema', google: null }
  ];

  var saved = loadSaved();
  var draft = clone(saved);
  var loadedFonts = {};
  var statusTimer = null;
  var lastPresetPx = RADII.full; // radio que se muestra mientras "Otro" no tiene valor

  var el = {};

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    el.section = document.getElementById('section-branding');
    if (!el.section) return;

    [
      'frame', 'logo-card', 'logo-box', 'logo-thumb', 'logo-file', 'logo-remove', 'logo-error',
      'color-picker', 'color-hex', 'color-error', 'contrast', 'contrast-icon', 'contrast-title', 'contrast-text',
      'text-picker', 'text-hex', 'text-error',
      'font', 'save', 'reset', 'status',
      'radius-custom', 'radius-custom-row', 'radius-error'
    ].forEach(function (id) {
      el[id] = document.getElementById(id === 'frame' ? 'sdk-frame' : 'branding-' + id);
    });

    el['logo-card'].hidden = !LOGO_ENABLED;
    buildFonts();
    bindEvents();
    initAnimations();
    render();
    fitFrame();
    if (window.ResizeObserver) new ResizeObserver(fitFrame).observe(document.querySelector('.branding-stage'));
    else window.addEventListener('resize', fitFrame);
  }

  /* ── Escala del SDK ───────────────────────────────────────────── */

  // El SDK se dibuja a su tamaño real (--frame-w × --frame-h) y se reduce con
  // transform para que quepa en el escenario: así conserva sus proporciones
  // y el texto no se reacomoda al cambiar el ancho de la columna.
  function fitFrame() {
    var stage = document.querySelector('.branding-stage');
    var scaler = document.getElementById('sdk-scaler');
    if (!stage || !scaler) return;
    var cs = getComputedStyle(stage);
    var avail = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var fcs = getComputedStyle(el.frame);
    var w = parseFloat(fcs.width), h = parseFloat(fcs.height);
    if (!avail || !w || !h) return;
    var scale = Math.min(1, avail / w);
    el.frame.style.transform = 'scale(' + scale + ')';
    scaler.style.width = Math.round(w * scale) + 'px';
    scaler.style.height = Math.round(h * scale) + 'px';
  }

  /* ── Animaciones Lottie del SDK ───────────────────────────────── */

  var animations = {}; // pantalla → animación

  function initAnimations() {
    if (!window.lottie) return;
    document.querySelectorAll('.sdk-screen').forEach(function (screen) {
      var holder = screen.querySelector('[data-lottie]');
      if (!holder) return;
      // Con los datos embebidos (assets/sdk/lottie-data.js) funciona también al abrir el archivo sin servidor.
      var embedded = window.FID_LOTTIE && window.FID_LOTTIE[holder.dataset.lottie];
      var opts = {
        container: holder,
        renderer: 'svg',
        loop: holder.dataset.loop === 'true',
        autoplay: false
      };
      if (embedded) opts.animationData = embedded; else opts.path = holder.dataset.lottie;
      var anim = window.lottie.loadAnimation(opts);
      animations[screen.dataset.for] = anim;
      if (holder.hasAttribute('data-lottie-primary')) {
        // lottie-web asigna algunos colores recién al animar: se clasifica en cada cuadro.
        anim.addEventListener('DOMLoaded', function () { tintLottie(holder); });
        anim.addEventListener('enterFrame', function () { tintLottie(holder); });
      }
    });
    replayAnimations(el.frame.dataset.screen);
  }

  // Clasifica el color original de un trazo/relleno del Lottie: los azules de
  // marca pasan a clase CSS (.lt-primary / .lt-primary-50, que usan --accent-9 y
  // --accent-8 como los vectores estáticos); grises y blancos no se tocan.
  function lottiePrimaryClass(value) {
    var m = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(value || '');
    if (!m) return null;
    var r = +m[1], g = +m[2], b = +m[3];
    if (b - r < 60) return null;       // gris, blanco o negro: neutro
    return r > 120 ? 'lt-primary-50' : 'lt-primary'; // azul claro vs. azul fuerte
  }

  function tintLottie(holder) {
    holder.querySelectorAll('[fill], [stroke]').forEach(function (node) {
      ['fill', 'stroke'].forEach(function (prop) {
        var cls = lottiePrimaryClass(node.getAttribute(prop));
        if (cls) node.classList.add(cls, 'lt-' + prop);
      });
    });
  }

  // Cada animación arranca de cero al abrir su pantalla, como en el SDK.
  function replayAnimations(screen) {
    Object.keys(animations).forEach(function (name) {
      if (name === screen) {
        animations[name].goToAndPlay(0, true);
        var holder = animations[name].wrapper;
        if (holder && holder.hasAttribute('data-lottie-primary')) tintLottie(holder);
      } else animations[name].stop();
    });
  }

  /* ── Utilidades ───────────────────────────────────────────────── */

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function loadSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULTS);
      var parsed = JSON.parse(raw);
      var merged = Object.assign(clone(DEFAULTS), parsed);
      delete merged.spacing; // ajuste eliminado: descarta valores guardados antes
      if (!LOGO_ENABLED) { merged.logo = null; merged.logoName = ''; }
      return merged;
    } catch (e) {
      return clone(DEFAULTS);
    }
  }

  function normalizeHex(value) {
    var v = String(value).trim().replace(/^#?/, '#');
    if (/^#[0-9a-f]{3}$/i.test(v)) {
      v = '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
    }
    return /^#[0-9a-f]{6}$/i.test(v) ? v.toUpperCase() : null;
  }

  function luminance(hex) {
    var channels = [1, 3, 5].map(function (i) {
      var c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }

  // Razón de contraste WCAG entre dos colores HEX.
  function contrastBetween(a, b) {
    var la = luminance(a), lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  }

  // Contraste del color contra blanco (links y texto de marca sobre fondo claro).
  function contrastOnWhite(hex) {
    return contrastBetween(hex, '#FFFFFF');
  }

  // Contraste del texto del botón contra el color principal (el fondo del botón).
  function contrastButton() {
    return contrastBetween(draft.primaryText, draft.primary);
  }

  function isDirty() {
    return JSON.stringify(draft) !== JSON.stringify(saved);
  }

  // El contraste es solo una advertencia y nunca impide guardar. Solo falta un valor si se eligió "Otro" sin radio.
  function isValid() {
    return draft.radius !== 'custom' || draft.radiusCustom !== null;
  }

  /* ── Construcción de controles ────────────────────────────────── */

  function buildFonts() {
    FONTS.forEach(function (f) {
      var opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.label;
      el.font.appendChild(opt);
    });
  }

  /* ── Eventos ──────────────────────────────────────────────────── */

  function bindEvents() {
    el['color-picker'].addEventListener('input', function (e) {
      setPrimary(e.target.value);
    });


    el['color-hex'].addEventListener('input', function (e) {
      var hex = normalizeHex(e.target.value);
      if (hex) {
        hideError(el['color-error']);
        el['color-hex'].removeAttribute('aria-invalid');
        setPrimary(hex, true);
      }
    });

    el['color-hex'].addEventListener('blur', function () {
      var hex = normalizeHex(el['color-hex'].value);
      if (hex) {
        setPrimary(hex);
      } else {
        el['color-hex'].setAttribute('aria-invalid', 'true');
        showError(el['color-error'], 'Ingresá un color HEX válido, ejemplo: #2A39D0');
      }
    });

    el['text-picker'].addEventListener('input', function (e) {
      setPrimaryText(e.target.value);
    });

    el['text-hex'].addEventListener('input', function (e) {
      var hex = normalizeHex(e.target.value);
      if (hex) {
        hideError(el['text-error']);
        el['text-hex'].removeAttribute('aria-invalid');
        setPrimaryText(hex, true);
      }
    });

    el['text-hex'].addEventListener('blur', function () {
      var hex = normalizeHex(el['text-hex'].value);
      if (hex) {
        setPrimaryText(hex);
      } else {
        el['text-hex'].setAttribute('aria-invalid', 'true');
        showError(el['text-error'], 'Ingresá un color HEX válido, ejemplo: #FFFFFF');
      }
    });

    el.font.addEventListener('change', function () {
      draft.font = el.font.value;
      render();
    });

    document.querySelectorAll('input[name="branding-radius"]').forEach(function (input) {
      input.addEventListener('change', function () {
        if (input.value === 'custom' && draft.radius !== 'custom') lastPresetPx = radiusPx();
        draft.radius = input.value;
        render();
        if (input.value === 'custom') el['radius-custom'].focus();
      });
    });

    el['radius-custom'].addEventListener('input', function () {
      var value = parseRadius(el['radius-custom'].value);
      if (value === null) {
        if (String(el['radius-custom'].value).trim() === '') {
          draft.radiusCustom = null;
          hideError(el['radius-error']);
          el['radius-custom'].removeAttribute('aria-invalid');
          render(true);
        } else {
          showRadiusError();
        }
      } else {
        hideError(el['radius-error']);
        el['radius-custom'].removeAttribute('aria-invalid');
        draft.radiusCustom = value;
        render(true);
      }
    });

    el['radius-custom'].addEventListener('blur', function () {
      if (draft.radius === 'custom' && parseRadius(el['radius-custom'].value) === null) showRadiusError();
    });

    document.querySelectorAll('input[name="branding-screen"]').forEach(function (input) {
      input.addEventListener('change', function () {
        el.frame.dataset.screen = input.value;
        replayAnimations(input.value);
      });
    });

    el['logo-file'].addEventListener('change', onLogoSelected);
    document.getElementById('branding-logo-change').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el['logo-file'].click(); }
    });
    el['logo-remove'].addEventListener('click', function () {
      draft.logo = null;
      draft.logoName = '';
      hideError(el['logo-error']);
      render();
    });

    el.save.addEventListener('click', save);
    el.reset.addEventListener('click', function () {
      draft = clone(DEFAULTS);
      hideError(el['logo-error']);
      hideError(el['color-error']);
      hideError(el['text-error']);
      el['color-hex'].removeAttribute('aria-invalid');
      el['text-hex'].removeAttribute('aria-invalid');
      render();
    });

    window.addEventListener('beforeunload', function (e) {
      if (isDirty()) { e.preventDefault(); e.returnValue = ''; }
    });
  }

  // Devuelve el número (px) si es válido: cualquier valor mayor o igual a 0, con o sin decimales.
  function parseRadius(raw) {
    var text = String(raw).trim().replace(',', '.');
    if (!/^\d+(\.\d+)?$/.test(text)) return null;
    var n = parseFloat(text);
    return isFinite(n) && n >= RADIUS_CUSTOM_MIN ? n : null;
  }

  function showRadiusError() {
    el['radius-custom'].setAttribute('aria-invalid', 'true');
    showError(el['radius-error'], 'Ingresá un número desde ' + RADIUS_CUSTOM_MIN + '.');
  }

  function radiusPx() {
    if (draft.radius !== 'custom') return RADII[draft.radius];
    return draft.radiusCustom === null ? lastPresetPx : draft.radiusCustom;
  }

  function setPrimary(hex, fromTyping) {
    draft.primary = normalizeHex(hex);
    render(fromTyping);
  }

  function setPrimaryText(hex, fromTyping) {
    draft.primaryText = normalizeHex(hex);
    render(fromTyping, true);
  }

  var loadingLogo = false;

  function onLogoSelected(e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;

    hideError(el['logo-error']);

    // Los errores solo existen con el campo vacío (estados definidos en Figma):
    // si ya hay un logo y el archivo nuevo no sirve, se conserva el actual.
    function logoError(msg) { if (!draft.logo) showError(el['logo-error'], msg); }

    var looksLikeSvg = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name);
    if (!looksLikeSvg) {
      logoError('El formato del archivo debe ser en SVG');
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      logoError('El archivo supera el tamaño máximo');
      return;
    }

    // Con el campo vacío se muestra el spinner mientras se lee el archivo (mínimo 500 ms para que se perciba).
    var startedAt = Date.now();
    var hadLogo = !!draft.logo;
    function finish(fn) {
      var wait = hadLogo ? 0 : Math.max(0, 500 - (Date.now() - startedAt));
      setTimeout(function () { loadingLogo = false; fn(); render(); }, wait);
    }
    if (!hadLogo) { loadingLogo = true; render(); }

    var reader = new FileReader();
    reader.onload = function () {
      var text = String(reader.result);
      finish(function () {
        if (!/<svg[\s>]/i.test(text)) { logoError('El formato del archivo debe ser en SVG'); return; }
        // Se muestra con <img>: el navegador no ejecuta scripts de un SVG cargado así.
        draft.logo = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text);
        draft.logoName = file.name;
      });
    };
    reader.onerror = function () {
      finish(function () { logoError('El formato del archivo debe ser en SVG'); });
    };
    reader.readAsText(file);
  }

  /* ── Guardado ─────────────────────────────────────────────────── */

  function save() {
    if (!isDirty() || !isValid()) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      setStatus('error', 'error', 'No pudimos guardar. Probá con un logo más liviano.');
      return;
    }
    saved = clone(draft);
    render();
    setStatus('saved', 'check_circle', 'Cambios guardados');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { if (!isDirty()) setStatus('', '', ''); }, 3500);
  }

  // Estado del guardado, al lado de los botones. Siempre lleva texto (el color no es el único aviso):
  // "dot" = punto de estado (cambios pendientes); otro valor = ícono Material (guardado / error).
  function setStatus(kind, icon, text) {
    el.status.className = 'branding-status' + (kind ? ' is-' + kind : '');
    el.status.innerHTML = '';
    if (!text) return;
    var mark = document.createElement('span');
    if (icon === 'dot') {
      mark.className = 'branding-status-dot';
    } else {
      mark.className = 'icon';
      mark.textContent = icon;
    }
    mark.setAttribute('aria-hidden', 'true');
    el.status.appendChild(mark);
    var label = document.createElement('span');
    label.textContent = text;
    el.status.appendChild(label);
  }

  /* ── Render ───────────────────────────────────────────────────── */

  function render(fromTyping, textTyping) {
    var fontDef = FONTS.filter(function (f) { return f.id === draft.font; })[0] || FONTS[0];
    ensureFont(fontDef);

    // Vista previa
    var frame = el.frame;
    frame.style.setProperty('--accent-9', draft.primary);
    frame.style.setProperty('--button-primary-text', draft.primaryText);
    frame.style.setProperty('--font-family-default', fontDef.id === 'system' ? 'system-ui' : "'" + fontDef.id + "'");
    frame.style.setProperty('--radius-button', radiusPx() + 'px');

    // Logo (controles)
    // Por defecto el campo está vacío: sin miniatura y sin nombre de archivo.
    var hasLogo = LOGO_ENABLED && !!draft.logo;
    if (hasLogo) el['logo-thumb'].src = draft.logo; else el['logo-thumb'].removeAttribute('src');
    el['logo-thumb'].hidden = !hasLogo;
    document.getElementById('branding-logo-empty').hidden = hasLogo || loadingLogo;
    document.getElementById('branding-logo-overlay').hidden = !hasLogo;
    document.getElementById('branding-logo-spinner').hidden = !loadingLogo;
    el['logo-box'].dataset.state = loadingLogo ? 'loading' : (hasLogo ? 'filled' : 'empty');
    document.getElementById('branding-logo-btn-label').textContent = hasLogo ? 'Cambiar logo' : 'Subir logo';

    // Color (controles)
    el['color-picker'].value = draft.primary.toLowerCase();
    if (!(fromTyping && !textTyping)) {
      el['color-hex'].value = draft.primary;
      el['color-hex'].removeAttribute('aria-invalid');
      hideError(el['color-error']);
    }
    renderContrast();

    // Texto del botón (controles)
    el['text-picker'].value = draft.primaryText.toLowerCase();
    if (!(fromTyping && textTyping)) {
      el['text-hex'].value = draft.primaryText;
      el['text-hex'].removeAttribute('aria-invalid');
      hideError(el['text-error']);
    }

    // Redondeado de botones
    document.querySelectorAll('input[name="branding-radius"]').forEach(function (input) {
      input.checked = input.value === draft.radius;
    });
    el['radius-custom-row'].hidden = draft.radius !== 'custom';
    if (!fromTyping) {
      el['radius-custom'].value = draft.radiusCustom === null ? '' : draft.radiusCustom;
      el['radius-custom'].removeAttribute('aria-invalid');
      hideError(el['radius-error']);
    }

    // Tipografía
    el.font.value = draft.font;
    // Estado del guardado
    var dirty = isDirty();
    var valid = isValid();
    el.save.classList.toggle('active', dirty && valid);
    el.save.setAttribute('aria-disabled', String(!(dirty && valid)));
    if (dirty && !el.status.classList.contains('is-error')) {
      setStatus('dirty', 'dot', valid ? 'Cambios sin guardar' : 'Ingresá el radio para guardar');
    } else if (!dirty && el.status.classList.contains('is-dirty')) {
      setStatus('', '', '');
    }
  }

  // Un solo aviso de accesibilidad: contraste del color del texto contra el color principal.
  // Siempre se muestra (correcto o bajo) y nunca bloquea el guardado.
  function renderContrast() {
    var ratio = contrastButton();
    var pass = ratio >= MIN_CONTRAST;
    var box = el.contrast;
    var text = el['contrast-text'];
    box.hidden = false;
    box.classList.toggle('is-warning', !pass);
    el['contrast-icon'].textContent = pass ? 'info' : 'error';
    el['contrast-title'].hidden = false;
    text.textContent = '';
    if (pass) {
      var lvl = document.createElement('span');
      lvl.className = 'branding-contrast-level';
      lvl.textContent = wcagLevel(ratio) + '✓';
      text.appendChild(document.createTextNode('WCAG '));
      text.appendChild(lvl);
      text.appendChild(document.createTextNode(' (' + ratioText(ratio) + ') Calificación aprobada.'));
    } else {
      var mark = document.createElement('span');
      mark.className = 'branding-contrast-fail';
      mark.textContent = '×';
      text.appendChild(document.createTextNode('WCAG AA '));
      text.appendChild(mark);
      text.appendChild(document.createTextNode(' (' + ratioText(ratio) + ') Calificación no aprobada. El texto puede ser difícil de leer.'));
    }
    box.querySelector('.branding-contrast-link').hidden = false;
  }

  // Nivel WCAG de contraste para texto normal: AAA ≥ 7:1, AA ≥ 4.5:1 (estándar habitual). Por debajo, no se aprueba.
  function wcagLevel(ratio) {
    return ratio >= 7 ? 'AAA' : 'AA';
  }

  function ratioText(ratio) {
    return (Math.floor(ratio * 10) / 10).toFixed(1) + ':1';
  }

  function ensureFont(fontDef) {
    if (!fontDef.google || loadedFonts[fontDef.id]) return;
    loadedFonts[fontDef.id] = true;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + fontDef.google + '&display=swap';
    document.head.appendChild(link);
  }

  // El mensaje de error reemplaza al texto de ayuda del campo (en rojo); el <p role="alert"> queda solo para lectores de pantalla.
  var helperFor = {
    'branding-color-error': 'label[for="branding-color-hex"]',
    'branding-text-error': 'label[for="branding-text-hex"]'
  };

  function helperNode(node) {
    var sel = helperFor[node.id];
    return sel ? document.querySelector(sel) : null;
  }

  function showError(node, message) {
    node.textContent = message;
    node.hidden = false;
    var h = helperNode(node);
    if (h) {
      if (h.dataset.default === undefined) h.dataset.default = h.textContent;
      h.textContent = message;
      h.classList.add('is-error');
    }
  }

  function hideError(node) {
    node.textContent = '';
    node.hidden = true;
    var h = helperNode(node);
    if (h && h.dataset.default !== undefined) {
      h.textContent = h.dataset.default;
      h.classList.remove('is-error');
    }
  }
})();
