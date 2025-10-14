// index.js (reemplazar completamente con este contenido)
// Multi-report + multilingual + animations + interactivity
document.addEventListener('DOMContentLoaded', () => {
  console.log('[index.js] DOMContentLoaded');

  // ---------- Report definitions (ejemplo) ----------
  const reports = [
    {
      id: 'report-1',
      title_en: 'World Population Indicators',
      title_es: 'Indicadores de poblacion mundial',
      desc_en: 'Summary of population density by region.',
      desc_es: 'Resumen de la densidad demografica por region.',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiZjYxMGRjNmItYzljMi00ZjQ4LWFkZGEtOWRkNTM4OTZiOG JlIiwidCI6ImYwZTYwZDk5LWEzMzMtNGQxNy1iMGJiLThkNTFhYWE2ZTRiMCIsImMiOjJ9'
    },
    {
      id: 'report-2',
      title_en: 'Video game sales history',
      title_es: 'Historico de ventas de videojuegos',
      desc_en: 'Sales of consoles and different genres of video games over the years',
      desc_es: 'ventas de consolas y distintos genero de viejuegos atravez de los años',
      url: 'https://app.powerbi.com/view?r=eyJrIjoiMTc3NzZiMmYtM2Y4MC00ODBhLWEzZDQtYTY4NDI3ZmMxMDNmIiwidCI6ImYwZTYwZDk5LWEzMzMtNGQxNy1iMGJiLThkNTFhYWE2ZTRiMCIsImMiOjJ9'
    }
  ];

  // --- Traducciones completas, incluyendo experience ---
  const translations = {
    en: {
      langLabel: "Language",
      heroSub: "Data Analyst | Automation Specialist",
      aboutTitle: "About Me",
      aboutText: "Hello! I am a forward-thinking professional dedicated to building sustainable and innovative solutions. My expertise lies in data management, visualization, and creating impactful systems for efficient decision-making.",
      expTitle: "Experience",
      exp1Title: "Cargill Animal Nutrition",
      exp1Date: "October 2023 - August 2024",
      exp1List: [
        "Managed regional data systems.",
        "Developed Power BI dashboards.",
        "Automated workflows with Power Automate."
      ],
      exp2Title: "Hanes Brands Inc. Choloma",
      exp2Date: "August 2022 - August 2023",
      exp2List: [
        "Developed supply chain tracking tools.",
        "Integrated Power Apps for business solutions.",
        "Optimized IT hardware inventory."
      ],
      pbTitle: "Power BI Reports",
      pbDesc: "Choose a report to view below.",
      skillsTitle: "Skills",
      contactTitle: "Contact Me",
      contactDesc: "Let’s connect and collaborate for a brighter future!",
      footerText: "© 2025 Mauricio Bonilla. Building a sustainable future.",
      reportsOpen: "Open selected report in Power BI"
    },
    es: {
      langLabel: "Idioma",
      heroSub: "Analista de Datos | Especialista en Automatización",
      aboutTitle: "Sobre mí",
      aboutText: "¡Hola! Soy un profesional con visión de futuro dedicado a construir soluciones sostenibles e innovadoras. Mi experiencia incluye gestión de datos, visualización y creación de sistemas que facilitan la toma de decisiones.",
      expTitle: "Experiencia",
      exp1Title: "Cargill Animal Nutrition",
      exp1Date: "Octubre 2023 - Agosto 2024",
      exp1List: [
        "Gestión de sistemas regionales de datos.",
        "Desarrollo de dashboards en Power BI.",
        "Automatización de flujos con Power Automate."
      ],
      exp2Title: "Hanes Brands Inc. Choloma",
      exp2Date: "Agosto 2022 - Agosto 2023",
      exp2List: [
        "Desarrollo de herramientas de seguimiento de la cadena de suministro.",
        "Integración de Power Apps para soluciones de negocio.",
        "Optimización del inventario de hardware de TI."
      ],
      pbTitle: "Informes Power BI",
      pbDesc: "Elige un informe para ver a continuación.",
      skillsTitle: "Habilidades",
      contactTitle: "Contacto",
      contactDesc: "¡Conectemos y colaboremos por un futuro más brillante!",
      footerText: "© 2025 Mauricio Bonilla. Construyendo un futuro sostenible.",
      reportsOpen: "Abrir informe seleccionado en Power BI"
    }
  };

  // ---------- Helpers ----------
  function setText(id, text) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`[i18n] setText: elemento con id "${id}" no existe.`);
      return;
    }
    el.textContent = text;
  }

  function setList(id, items) {
    const ul = document.getElementById(id);
    if (!ul) {
      console.warn(`[i18n] setList: elemento UL con id "${id}" no existe.`);
      return;
    }
    ul.innerHTML = '';
    items.forEach(it => {
      const li = document.createElement('li');
      li.textContent = it;
      ul.appendChild(li);
    });
  }

  // ---------- Gallery (reports) ----------
  const galleryEl = document.getElementById('reports-gallery');
  const iframeEl = document.getElementById('report-iframe');
  const viewerTitle = document.getElementById('viewer-title');
  const viewerDesc = document.getElementById('viewer-desc');
  const openReportBtn = document.getElementById('open-report-btn');

  let selectedReportId = localStorage.getItem('selected-report-id') || reports[0].id;

  function renderGallery(lang) {
    if (!galleryEl) {
      console.error('[gallery] reports-gallery no encontrado en el DOM.');
      return;
    }
    galleryEl.innerHTML = '';
    reports.forEach(rep => {
      const card = document.createElement('button');
      card.className = 'report-card text-left';
      card.type = 'button';
      card.dataset.id = rep.id;

      if (rep.id === selectedReportId) card.classList.add('active');

      const thumb = document.createElement('div');
      thumb.className = 'report-thumb';
      thumb.textContent = 'PB';

      const txt = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'font-semibold text-gray-800';
      title.textContent = (lang === 'es') ? rep.title_es : rep.title_en;
      const subtitle = document.createElement('div');
      subtitle.className = 'text-xs text-gray-500';
      subtitle.textContent = (lang === 'es') ? rep.desc_es : rep.desc_en;

      txt.appendChild(title);
      txt.appendChild(subtitle);

      card.appendChild(thumb);
      card.appendChild(txt);

      card.addEventListener('click', () => {
        selectReport(rep.id, lang);
        document.querySelectorAll('.report-card').forEach(rc => rc.classList.remove('active'));
        card.classList.add('active');
      });

      galleryEl.appendChild(card);
    });

    // Ensure viewer shows current selected
    const current = reports.find(r => r.id === selectedReportId) || reports[0];
    updateViewer(current, lang);
    iframeEl.src = current.url;
  }

  function selectReport(id, lang) {
    selectedReportId = id;
    localStorage.setItem('selected-report-id', id);
    const rep = reports.find(r => r.id === id);
    if (!rep) {
      console.warn('[selectReport] report no encontrado:', id);
      return;
    }
    updateViewer(rep, lang);
    iframeEl.src = rep.url;
  }

  function updateViewer(rep, lang) {
    if (viewerTitle) viewerTitle.textContent = (lang === 'es') ? rep.title_es : rep.title_en;
    if (viewerDesc) viewerDesc.textContent = (lang === 'es') ? rep.desc_es : rep.desc_en;
    if (openReportBtn) openReportBtn.dataset.url = rep.url;
  }

  // ---------- i18n: applyLanguage ----------
  function applyLanguage(lang) {
    console.log('[i18n] applyLanguage ->', lang);
    const t = translations[lang] || translations.en;

    // General texts
    setText('lang-label', t.langLabel);
    setText('hero-sub', t.heroSub);
    setText('about-title', t.aboutTitle);
    setText('about-text', t.aboutText);

    // Experience (titles, dates, lists)
    setText('exp-title', t.expTitle || '');
    setText('exp1-title', t.exp1Title || '');
    setText('exp1-date', t.exp1Date || '');
    setList('exp1-list', t.exp1List || []);
    setText('exp2-title', t.exp2Title || '');
    setText('exp2-date', t.exp2Date || '');
    setList('exp2-list', t.exp2List || []);

    // Reports & others
    setText('reports-title', t.pbTitle || '');
    setText('reports-desc', t.pbDesc || '');
    setText('skills-title', t.skillsTitle || '');
    setText('contact-title', t.contactTitle || '');
    setText('contact-desc', t.contactDesc || '');
    setText('footer-text', t.footerText || '');

    // Open button label
    if (openReportBtn) openReportBtn.textContent = t.reportsOpen || 'Open selected report';

    // Update language buttons aria-pressed
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');
    if (btnEn) btnEn.setAttribute('aria-pressed', lang === 'en');
    if (btnEs) btnEs.setAttribute('aria-pressed', lang === 'es');

    // Re-render gallery (titles/descriptions)
    renderGallery(lang);
  }

  // ---------- Init language ----------
  const savedLang = localStorage.getItem('site-lang');
  let lang = savedLang || ((navigator.language && navigator.language.startsWith('es')) ? 'es' : 'en');
  console.log('[i18n] initial language ->', lang);
  applyLanguage(lang);

  // Language buttons
  const btnEn = document.getElementById('btn-en');
  const btnEs = document.getElementById('btn-es');
  if (btnEn) btnEn.addEventListener('click', () => { localStorage.setItem('site-lang','en'); lang='en'; applyLanguage('en'); });
  if (btnEs) btnEs.addEventListener('click', () => { localStorage.setItem('site-lang','es'); lang='es'; applyLanguage('es'); });

  // Open selected report in new tab
  if (openReportBtn) {
    openReportBtn.addEventListener('click', () => {
      const url = openReportBtn.dataset.url || reports[0].url;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // ---------- UI interactions (skills hover, profile click, fade-in) ----------
  // Skills hover
  document.querySelectorAll('.skill-hover').forEach(skill => {
    skill.addEventListener('mouseover', () => skill.classList.add('scale-110','shadow-lg','bg-emerald-500','text-white'));
    skill.addEventListener('mouseout', () => skill.classList.remove('scale-110','shadow-lg','bg-emerald-500','text-white'));
  });

  // Profile rotation
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    profileImg.addEventListener('click', () => {
      profileImg.classList.add('rotate');
      setTimeout(() => profileImg.classList.remove('rotate'), 600);
    });
  }

  // Fade-in intersection observer
  const fadeEls = document.querySelectorAll('.fade-in');
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0','translate-y-5');
        entry.target.classList.add('opacity-100','translate-y-0','transition-all','duration-700');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => {
    el.classList.add('opacity-0','translate-y-5');
    io.observe(el);
  });

  // Keyboard shortcuts for language (E / S)
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e') { localStorage.setItem('site-lang','en'); lang='en'; applyLanguage('en'); }
    if (e.key.toLowerCase() === 's') { localStorage.setItem('site-lang','es'); lang='es'; applyLanguage('es'); }
  });

  // Log final status
  console.log('[index.js] initialized successfully');
  console.log('[index.js] selectedReportId ->', selectedReportId);
});
