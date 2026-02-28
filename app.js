import {
  DEFAULT_LANG,
  DEFAULT_TEAM_PROFILE,
  DEFAULT_THEME,
  FRAMEWORK_STAGES,
  PROFILE_FIELDS,
  RESPONSE_SCALE,
  UI_TEXT,
  localize
} from "./lib/framework-data.mjs";
import {
  analyzeAssessment,
  createEmptyResponses,
  normalizeResponses,
  toMarkdownReport
} from "./lib/engine.mjs";

const STORAGE_KEY = "continuous-security-navigator-v3";
const ROUTES = ["overview", "assessment", "insights", "tools"];

const EXTRA_TEXT = {
  routeOverview: { en: "Overview", pl: "Przegląd" },
  routeAssessment: { en: "Assessment", pl: "Ocena" },
  routeInsights: { en: "Insights", pl: "Wnioski" },
  routeTools: { en: "Tools", pl: "Narzędzia" },
  overviewTitle: {
    en: "What this app does and where to start",
    pl: "Co robi aplikacja i od czego zacząć"
  },
  startAssessment: { en: "Start assessment", pl: "Zacznij ocenę" },
  overviewStep1Title: {
    en: "Set your project context",
    pl: "Ustaw kontekst projektu"
  },
  overviewStep1Body: {
    en: "Define project profile and pick a baseline preset to start quickly.",
    pl: "Uzupełnij profil projektu i wybierz preset startowy."
  },
  overviewStep2Title: {
    en: "Score process maturity",
    pl: "Oceń dojrzałość procesu"
  },
  overviewStep2Body: {
    en: "Assess each control from 0 to 3. The model computes weighted risk automatically.",
    pl: "Oceń każdą kontrolę w skali 0-3. Model automatycznie liczy ryzyko ważone."
  },
  overviewStep3Title: {
    en: "Execute prioritized improvements",
    pl: "Wdrażaj priorytetowe usprawnienia"
  },
  overviewStep3Body: {
    en: "Open any gap card to see cause → effect → action → outcome and recommended tools.",
    pl: "Kliknij kartę luki, aby zobaczyć: przyczyna → skutek → działanie → rezultat i narzędzia."
  },
  helpTitle: { en: "How it works", pl: "Jak to działa" },
  helpGoAssessment: { en: "Go to assessment", pl: "Przejdź do oceny" },
  helpStep1Title: { en: "1. Baseline", pl: "1. Baseline" },
  helpStep1Body: {
    en: "Use the profile section and presets to set your team context.",
    pl: "Użyj sekcji profilu i presetów, aby ustawić kontekst zespołu."
  },
  helpStep2Title: { en: "2. Score controls", pl: "2. Oceń kontrole" },
  helpStep2Body: {
    en: "In Assessment, rate each item. Use visual maturity chips as guidance.",
    pl: "W zakładce Ocena oceń każdy element. Pomagają w tym wizualne poziomy dojrzałości."
  },
  helpStep3Title: { en: "3. Read insights", pl: "3. Przejrzyj wnioski" },
  helpStep3Body: {
    en: "In Insights, click cards to inspect root causes and mitigation path.",
    pl: "W zakładce Wnioski klikaj kafelki, by prześledzić przyczyny i ścieżkę mitigacji."
  },
  helpStep4Title: { en: "4. Use tool cards", pl: "4. Używaj kart narzędzi" },
  helpStep4Body: {
    en: "Every tool card is clickable and opens official documentation.",
    pl: "Każda karta narzędzia jest klikalna i otwiera oficjalną dokumentację."
  },
  maturityScaleTitle: { en: "Maturity scale", pl: "Skala dojrzałości" },
  priorityInfoTitle: { en: "Priority meaning", pl: "Znaczenie priorytetu" },
  priorityMust: {
    en: "MUST: Immediate risk reduction required before scaling delivery.",
    pl: "MUST: Wymagana natychmiastowa redukcja ryzyka przed skalowaniem dostarczania."
  },
  priorityShould: {
    en: "SHOULD: Important medium-term hardening and process stabilization.",
    pl: "SHOULD: Istotne działania średnioterminowe dla stabilizacji procesu."
  },
  priorityCould: {
    en: "COULD: Optimization with lower urgency; improves resilience and efficiency.",
    pl: "COULD: Optymalizacja o niższej pilności; poprawia odporność i efektywność."
  },
  stageGuidance: { en: "Stage guidance", pl: "Wskazówki dla etapu" },
  openDocs: { en: "Open docs", pl: "Otwórz dokumentację" },
  roadmapClickHint: {
    en: "Click roadmap cards to open full gap details.",
    pl: "Kliknij kafelek roadmapy, aby otworzyć szczegóły luki."
  },
  jumpToAssessment: {
    en: "Click cards to jump into stage controls.",
    pl: "Klikaj kafelki, aby przejść do kontrolek etapu."
  },
  done: { en: "Done", pl: "Gotowe" }
};

const TOOL_ICONS = {
  jira: "🗂️",
  githubProjects: "📋",
  threatModeling: "🧠",
  owaspAsvs: "🛡️",
  owaspCheatSheets: "📚",
  nistRmf: "🏛️",
  semgrep: "🔎",
  codeql: "🧬",
  zap: "⚡",
  cypress: "🧪",
  playwright: "🎭",
  githubActions: "⚙️",
  gitlabCI: "🚀",
  trivy: "🔐",
  docker: "🐳",
  vault: "🗝️",
  sentry: "📈",
  prometheus: "📊",
  grafana: "📉",
  runbooks: "📕"
};

let latestAnalysis = null;

let state = {
  lang: DEFAULT_LANG,
  theme: DEFAULT_THEME,
  route: "overview",
  profile: { ...DEFAULT_TEAM_PROFILE },
  responses: createEmptyResponses(),
  activeFindingId: null
};

const refs = {
  html: document.documentElement,
  profileForm: document.querySelector("#profile-form"),
  frameworkForm: document.querySelector("#framework-form"),
  scaleLegend: document.querySelector("#scale-legend"),
  overallSummary: document.querySelector("#overall-summary"),
  stageResults: document.querySelector("#stage-results"),
  findings: document.querySelector("#findings"),
  roadmap: document.querySelector("#roadmap"),
  tools: document.querySelector("#tools"),
  saveBtn: document.querySelector("#btn-save"),
  exportBtn: document.querySelector("#btn-export"),
  resetBtn: document.querySelector("#btn-reset"),
  langButtons: [...document.querySelectorAll("[data-lang]")],
  themeButtons: [...document.querySelectorAll("[data-theme]")],
  routeTabs: [...document.querySelectorAll(".route-tab")],
  routePanels: [...document.querySelectorAll(".route-panel")],
  presetStartup: document.querySelector("#preset-startup"),
  presetScaleup: document.querySelector("#preset-scaleup"),
  presetMature: document.querySelector("#preset-mature"),
  detailPanel: document.querySelector("#detail-panel"),
  detailHeading: document.querySelector("#detail-heading"),
  detailContent: document.querySelector("#detail-content"),
  detailHint: document.querySelector("#detail-open-hint"),
  closeDetailBtn: document.querySelector("#btn-close-detail"),
  helpButton: document.querySelector("#help-button"),
  helpModal: document.querySelector("#help-modal"),
  helpClose: document.querySelector("#help-close"),
  helpBody: document.querySelector("#help-body"),
  helpGoAssessment: document.querySelector("#help-go-assessment"),
  startAssessmentBtn: document.querySelector("#start-assessment-btn"),
  howWorksCard: document.querySelector("#how-works-card"),
  priorityModal: document.querySelector("#priority-modal"),
  priorityClose: document.querySelector("#priority-close"),
  priorityTitle: document.querySelector("#priority-title"),
  priorityBody: document.querySelector("#priority-body")
};

init();

function init() {
  loadState();
  applyTheme(state.theme);
  renderStaticTexts();
  renderScaleLegend();
  renderHelpModal();
  renderProfileForm();
  renderFrameworkForm();
  bindEvents();
  recalculate();
  applyRouteFromHash();
}

function t(key) {
  return localize(UI_TEXT[key], state.lang) || localize(EXTRA_TEXT[key], state.lang) || key;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    state.lang = parsed.lang || DEFAULT_LANG;
    state.theme = parsed.theme || DEFAULT_THEME;
    state.route = ROUTES.includes(parsed.route) ? parsed.route : "overview";
    state.profile = {
      ...DEFAULT_TEAM_PROFILE,
      ...(parsed.profile || {})
    };
    state.responses = normalizeResponses(parsed.responses);
    state.activeFindingId = parsed.activeFindingId || null;
  } catch (error) {
    console.warn("Could not load saved state", error);
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      lang: state.lang,
      theme: state.theme,
      route: state.route,
      profile: state.profile,
      responses: state.responses,
      activeFindingId: state.activeFindingId
    })
  );
}

function applyTheme(theme) {
  state.theme = theme;
  refs.html.dataset.theme = theme;
  syncSegmentButtons(refs.themeButtons, theme, "theme");
}

function applyLanguage(lang) {
  state.lang = lang;
  refs.html.lang = lang;
  syncSegmentButtons(refs.langButtons, lang, "lang");
  renderStaticTexts();
  renderScaleLegend();
  renderHelpModal();
  renderProfileForm();
  renderFrameworkForm();
  recalculate();
  if (state.activeFindingId) {
    openFindingDetail(state.activeFindingId, { scroll: false, updateHash: false });
  }
}

function bindEvents() {
  refs.langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.lang;
      if (!lang || lang === state.lang) return;
      applyLanguage(lang);
      saveState();
    });
  });

  refs.themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.dataset.theme;
      if (!theme || theme === state.theme) return;
      applyTheme(theme);
      saveState();
    });
  });

  refs.routeTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const route = tab.dataset.route;
      if (!ROUTES.includes(route)) return;
      setRoute(route, { pushHash: true });
    });
  });

  window.addEventListener("hashchange", applyRouteFromHash);

  refs.startAssessmentBtn.addEventListener("click", () => {
    setRoute("assessment", { pushHash: true });
  });

  document.querySelector("#onboarding-card")?.addEventListener("click", (event) => {
    const step = event.target.closest(".onboarding-step");
    if (step) {
      openHelpModal();
    }
  });

  refs.howWorksCard.addEventListener("click", openHelpModal);
  refs.helpButton.addEventListener("click", openHelpModal);
  refs.helpClose.addEventListener("click", closeHelpModal);
  refs.helpGoAssessment.addEventListener("click", () => {
    closeHelpModal();
    setRoute("assessment", { pushHash: true });
  });

  refs.helpModal.addEventListener("cancel", () => closeHelpModal());
  refs.priorityModal.addEventListener("cancel", () => closePriorityModal());
  refs.priorityClose.addEventListener("click", closePriorityModal);

  refs.profileForm.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
      return;
    }

    const key = target.dataset.key;
    if (!key) return;

    state.profile[key] = target.value;
    recalculate();
    saveState();
  });

  refs.frameworkForm.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;

    const stageId = target.dataset.stage;
    const questionId = target.dataset.question;

    if (!stageId || !questionId) return;

    state.responses[stageId][questionId] = Number(target.value);
    recalculate();
    saveState();
  });

  refs.frameworkForm.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-stage-toggle]");
    if (!toggle) return;

    const stageId = toggle.dataset.stageToggle;
    if (!stageId) return;

    const content = document.querySelector(`[data-stage-questions=\"${stageId}\"]`);
    if (!content) return;

    const nextHidden = !content.hidden;
    content.hidden = nextHidden;
    toggle.setAttribute("aria-expanded", String(!nextHidden));
  });

  refs.findings.addEventListener("click", (event) => {
    const badge = event.target.closest("[data-priority]");
    if (badge) {
      openPriorityModal(badge.dataset.priority);
      return;
    }

    const card = event.target.closest("[data-finding-id]");
    if (!card) return;

    const findingId = card.dataset.findingId;
    if (!findingId) return;
    openFindingDetail(findingId);
  });

  refs.roadmap.addEventListener("click", (event) => {
    const badge = event.target.closest("[data-priority]");
    if (badge) {
      openPriorityModal(badge.dataset.priority);
      return;
    }

    const card = event.target.closest("[data-finding-id]");
    if (!card) return;

    const findingId = card.dataset.findingId;
    if (!findingId) return;
    openFindingDetail(findingId);
  });

  refs.tools.addEventListener("click", (event) => {
    const badge = event.target.closest("[data-priority]");
    if (badge) {
      event.preventDefault();
      openPriorityModal(badge.dataset.priority);
    }
  });

  refs.stageResults.addEventListener("click", (event) => {
    const card = event.target.closest("[data-stage-id]");
    if (!card) return;

    const stageId = card.dataset.stageId;
    const stageEl = document.querySelector(`#stage-card-${stageId}`);
    if (!stageEl) return;

    setRoute("assessment", { pushHash: true });
    setTimeout(() => {
      stageEl.scrollIntoView({ behavior: "smooth", block: "center" });
      stageEl.classList.add("focus-flash");
      setTimeout(() => stageEl.classList.remove("focus-flash"), 1200);
    }, 150);
  });

  refs.saveBtn.addEventListener("click", () => {
    saveState();
    refs.saveBtn.textContent = t("saved");
    setTimeout(() => {
      refs.saveBtn.textContent = t("save");
    }, 1200);
  });

  refs.resetBtn.addEventListener("click", () => {
    state.profile = { ...DEFAULT_TEAM_PROFILE };
    state.responses = createEmptyResponses();
    state.activeFindingId = null;
    localStorage.removeItem(STORAGE_KEY);

    renderProfileForm();
    renderFrameworkForm();
    closeDetail({ updateHash: false });
    recalculate();
  });

  refs.exportBtn.addEventListener("click", () => {
    const analysis = analyzeAssessment(state.responses, state.profile, { lang: state.lang });
    const report = toMarkdownReport(analysis, state.lang);
    const projectSlug = slugify(state.profile.projectName || "project");
    downloadText(report, `${projectSlug}-continuous-security-report.md`, "text/markdown");
  });

  refs.closeDetailBtn.addEventListener("click", () => closeDetail());

  refs.presetStartup.addEventListener("click", () => applyPreset("startup"));
  refs.presetScaleup.addEventListener("click", () => applyPreset("scaleup"));
  refs.presetMature.addEventListener("click", () => applyPreset("mature"));
}

function renderStaticTexts() {
  setText("#hero-kicker", t("kicker"));
  setText("#app-title", t("appTitle"));
  setText("#hero-lead", t("lead"));

  setText("#route-overview", t("routeOverview"));
  setText("#route-assessment", t("routeAssessment"));
  setText("#route-insights", t("routeInsights"));
  setText("#route-tools", t("routeTools"));

  refs.saveBtn.textContent = t("save");
  refs.exportBtn.textContent = t("export");
  refs.resetBtn.textContent = t("reset");

  setText("#lang-label", t("language"));
  setText("#theme-label", t("theme"));
  setText("#theme-dark-btn", t("themeDark"));
  setText("#theme-light-btn", t("themeLight"));

  setText("#overview-title", t("overviewTitle"));
  setText("#start-assessment-btn", t("startAssessment"));
  setText("#overview-step1-title", t("overviewStep1Title"));
  setText("#overview-step1-body", t("overviewStep1Body"));
  setText("#overview-step2-title", t("overviewStep2Title"));
  setText("#overview-step2-body", t("overviewStep2Body"));
  setText("#overview-step3-title", t("overviewStep3Title"));
  setText("#overview-step3-body", t("overviewStep3Body"));

  setText("#section-profile-title", t("projectProfile"));
  setText("#preset-label", t("starterPresets"));
  refs.presetStartup.textContent = t("presetStartup");
  refs.presetScaleup.textContent = t("presetScaleup");
  refs.presetMature.textContent = t("presetMature");

  setText("#framework-title", t("frameworkTitle"));

  setText("#results-title", t("results"));
  setText("#findings-title", t("findingsAndRoadmap"));
  setText("#findings-subtitle", t("topGaps"));
  setText("#roadmap-subtitle", t("roadmap"));

  setText("#tools-title", t("toolsTitle"));
  setText("#tools-lead", t("toolsLead"));

  setText("#approach-title", t("approachTitle"));
  setText("#approach-b1", t("approachBullet1"));
  setText("#approach-b2", t("approachBullet2"));
  setText("#approach-b3", t("approachBullet3"));

  setText("#detail-open-hint", t("detailOpenHint"));
  refs.closeDetailBtn.textContent = t("detailClose");

  syncSegmentButtons(refs.langButtons, state.lang, "lang");
  syncSegmentButtons(refs.themeButtons, state.theme, "theme");
}

function renderScaleLegend() {
  refs.scaleLegend.textContent = "";

  const titleChip = document.createElement("div");
  titleChip.className = "scale-chip";
  titleChip.innerHTML = `<strong>${escapeHtml(t("maturityScaleTitle"))}</strong>`;
  refs.scaleLegend.appendChild(titleChip);

  for (const level of RESPONSE_SCALE) {
    const chip = document.createElement("article");
    chip.className = "scale-chip clickable-card";
    chip.title = localize(level.hint, state.lang);

    const dot = document.createElement("span");
    dot.className = `scale-dot level-${level.value}`;

    const text = document.createElement("span");
    text.textContent = `${level.value} - ${localize(level.label, state.lang)}`;

    chip.append(dot, text);
    refs.scaleLegend.appendChild(chip);
  }
}

function renderHelpModal() {
  setText("#help-title", t("helpTitle"));
  refs.helpGoAssessment.textContent = t("helpGoAssessment");

  refs.helpBody.textContent = "";

  const steps = [
    ["helpStep1Title", "helpStep1Body"],
    ["helpStep2Title", "helpStep2Body"],
    ["helpStep3Title", "helpStep3Body"],
    ["helpStep4Title", "helpStep4Body"]
  ];

  for (const [titleKey, bodyKey] of steps) {
    const card = document.createElement("article");
    card.className = "help-step";

    const title = document.createElement("p");
    title.innerHTML = `<strong>${escapeHtml(t(titleKey))}</strong>`;

    const body = document.createElement("p");
    body.className = "muted";
    body.textContent = t(bodyKey);

    card.append(title, body);
    refs.helpBody.appendChild(card);
  }
}

function renderProfileForm() {
  refs.profileForm.textContent = "";

  for (const field of PROFILE_FIELDS) {
    const wrapper = document.createElement("div");
    wrapper.className = "field";

    const label = document.createElement("label");
    label.textContent = localize(field.label, state.lang);

    const input =
      field.type === "select"
        ? document.createElement("select")
        : document.createElement("input");

    input.dataset.key = field.key;

    if (field.type === "select") {
      for (const option of field.options) {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = localize(option.label, state.lang);
        if ((state.profile[field.key] || "") === option.value) {
          opt.selected = true;
        }
        input.appendChild(opt);
      }
    } else {
      input.type = "text";
      input.value = state.profile[field.key] || "";
      input.placeholder = localize(field.placeholder, state.lang);
    }

    wrapper.append(label, input);
    refs.profileForm.appendChild(wrapper);
  }
}

function renderFrameworkForm() {
  refs.frameworkForm.textContent = "";

  for (const stage of FRAMEWORK_STAGES) {
    const card = document.createElement("article");
    card.className = "stage-card clickable-card";
    card.id = `stage-card-${stage.id}`;

    const header = document.createElement("header");
    header.dataset.stageToggle = stage.id;
    header.setAttribute("aria-expanded", "true");
    header.className = "stage-header";
    const title = document.createElement("h3");
    title.textContent = localize(stage.title, state.lang);

    const objective = document.createElement("p");
    objective.textContent = localize(stage.objective, state.lang);

    const links = document.createElement("div");
    links.className = "stage-links";

    for (const linkDef of stage.links || []) {
      const link = document.createElement("a");
      link.className = "stage-link-chip clickable-card";
      link.href = linkDef.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.innerHTML = `<span aria-hidden="true">↗</span> ${escapeHtml(localize(linkDef.label, state.lang))}`;
      links.appendChild(link);
    }

    header.append(title, objective, links);

    const questionGrid = document.createElement("div");
    questionGrid.className = "question-grid";
    questionGrid.dataset.stageQuestions = stage.id;

    for (const question of stage.questions) {
      const row = document.createElement("div");
      row.className = "question-row";

      const textWrap = document.createElement("div");
      const questionTitle = document.createElement("div");
      questionTitle.className = "question-title";
      questionTitle.textContent = localize(question.text, state.lang);

      const meta = document.createElement("div");
      meta.className = "question-meta";
      meta.textContent = `${localize({ en: "Risk weight", pl: "Waga ryzyka" }, state.lang)}: ${
        question.weight
      } | ${t("kpiLabel")}: ${localize(question.kpi, state.lang)}`;

      textWrap.append(questionTitle, meta);

      const select = document.createElement("select");
      select.className = "score-select";
      select.dataset.stage = stage.id;
      select.dataset.question = question.id;

      for (const level of RESPONSE_SCALE) {
        const opt = document.createElement("option");
        opt.value = String(level.value);
        opt.textContent = `${level.value} - ${localize(level.label, state.lang)}`;
        if (state.responses[stage.id][question.id] === level.value) {
          opt.selected = true;
        }
        select.appendChild(opt);
      }

      row.append(textWrap, select);
      questionGrid.appendChild(row);
    }

    card.append(header, questionGrid);
    refs.frameworkForm.appendChild(card);
  }
}

function recalculate() {
  latestAnalysis = analyzeAssessment(state.responses, state.profile, { lang: state.lang });
  renderSummary(latestAnalysis);
  renderStageResults(latestAnalysis);
  renderFindings(latestAnalysis);
  renderRoadmap(latestAnalysis);
  renderTools(latestAnalysis);

  if (state.activeFindingId) {
    const exists = latestAnalysis.findings.some((item) => item.id === state.activeFindingId);
    if (exists) {
      openFindingDetail(state.activeFindingId, { scroll: false, updateHash: false });
    } else {
      closeDetail({ updateHash: false });
    }
  }
}

function renderSummary(analysis) {
  refs.overallSummary.textContent = "";

  const summaryMetrics = [
    { label: t("summaryScore"), value: `${analysis.overallScore}/100` },
    { label: t("summaryRisk"), value: analysis.overallRiskClass },
    { label: t("summaryGaps"), value: String(analysis.findings.length) },
    { label: t("summaryTools"), value: String(analysis.recommendedTools.length) }
  ];

  for (const metric of summaryMetrics) {
    const card = document.createElement("div");
    card.className = "metric clickable-card";

    const label = document.createElement("div");
    label.className = "label";
    label.textContent = metric.label;

    const value = document.createElement("div");
    value.className = "value";
    value.textContent = metric.value;

    card.append(label, value);
    refs.overallSummary.appendChild(card);
  }
}

function renderStageResults(analysis) {
  refs.stageResults.textContent = "";

  const hint = document.createElement("p");
  hint.className = "muted small";
  hint.textContent = t("jumpToAssessment");
  refs.stageResults.appendChild(hint);

  for (const stage of analysis.stageResults) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "stage-result clickable-card";
    card.dataset.stageId = stage.id;

    const title = document.createElement("strong");
    title.textContent = stage.title;

    const desc = document.createElement("p");
    desc.className = "muted";
    desc.textContent = `${stage.score}/100 | ${t("summaryRisk")}: ${stage.riskClass}`;

    const bar = document.createElement("div");
    bar.className = "scorebar";
    const fill = document.createElement("span");
    fill.style.width = `${stage.score}%`;
    bar.appendChild(fill);

    card.append(title, desc, bar);
    refs.stageResults.appendChild(card);
  }
}

function renderFindings(analysis) {
  refs.findings.textContent = "";

  const topFindings = analysis.findings.slice(0, 10);

  if (topFindings.length === 0) {
    refs.findings.textContent = t("noGaps");
    return;
  }

  for (const finding of topFindings) {
    const item = document.createElement("article");
    item.className = "list-item clickable-card";
    item.dataset.findingId = finding.id;

    const badge = document.createElement("span");
    badge.className = `badge ${finding.priority.toLowerCase()}`;
    badge.dataset.priority = finding.priority;
    badge.textContent = finding.priority;

    const title = document.createElement("p");
    title.innerHTML = `<strong>${escapeHtml(finding.stageTitle)}</strong>: ${escapeHtml(finding.question)}`;

    const effect = document.createElement("p");
    effect.className = "muted";
    effect.textContent = `${t("detailEffect")}: ${finding.effect}`;

    const hint = document.createElement("p");
    hint.className = "muted small";
    hint.textContent = t("clickForDetails");

    item.append(badge, title, effect, hint);
    refs.findings.appendChild(item);
  }
}

function renderRoadmap(analysis) {
  refs.roadmap.textContent = "";

  const hint = document.createElement("p");
  hint.className = "muted small";
  hint.textContent = t("roadmapClickHint");
  refs.roadmap.appendChild(hint);

  if (analysis.roadmap.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = t("noRoadmap");
    refs.roadmap.appendChild(empty);
    return;
  }

  for (const task of analysis.roadmap) {
    const item = document.createElement("article");
    item.className = "list-item clickable-card";
    item.dataset.findingId = task.findingId;

    const badge = document.createElement("span");
    badge.className = `badge ${task.priority.toLowerCase()}`;
    badge.dataset.priority = task.priority;
    badge.textContent = task.priority;

    const top = document.createElement("p");
    top.innerHTML = `<strong>#${task.order}</strong> ${escapeHtml(task.action)}`;

    const owner = document.createElement("p");
    owner.textContent = `${t("ownerLabel")}: ${task.owner}`;

    const kpi = document.createElement("p");
    kpi.className = "muted";
    kpi.textContent = `${t("kpiLabel")}: ${task.kpi}`;

    item.append(badge, top, owner, kpi);
    refs.roadmap.appendChild(item);
  }
}

function renderTools(analysis) {
  refs.tools.textContent = "";

  if (analysis.recommendedTools.length === 0) {
    refs.tools.textContent = t("noTools");
    return;
  }

  for (const tool of analysis.recommendedTools) {
    const card = document.createElement("a");
    card.className = "tool-card clickable-card";
    card.href = tool.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const badge = document.createElement("span");
    badge.className = `badge ${tool.highestPriority.toLowerCase()}`;
    badge.dataset.priority = tool.highestPriority;
    badge.textContent = tool.highestPriority;

    const title = document.createElement("div");
    title.className = "tool-title";

    const icon = document.createElement("span");
    icon.className = "tool-icon";
    icon.textContent = TOOL_ICONS[tool.id] || "🧩";

    const text = document.createElement("span");
    text.textContent = tool.name;

    title.append(icon, text);

    const category = document.createElement("p");
    category.textContent = `${t("categoryLabel")}: ${tool.category}`;

    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = tool.note;

    const usedFor = document.createElement("p");
    usedFor.className = "muted";
    usedFor.textContent = `${t("stagesLabel")}: ${tool.usedFor.join(", ")}`;

    const open = document.createElement("p");
    open.className = "muted small";
    open.textContent = `↗ ${t("openDocs")}`;

    card.append(badge, title, category, note, usedFor, open);
    refs.tools.appendChild(card);
  }
}

function openFindingDetail(findingId, options = {}) {
  const shouldScroll = options.scroll ?? true;
  const updateHash = options.updateHash ?? true;

  if (!latestAnalysis) return;
  const finding = latestAnalysis.findings.find((item) => item.id === findingId);
  if (!finding) return;

  state.activeFindingId = findingId;
  setRoute("insights", { pushHash: false });

  refs.detailHeading.textContent = `[${finding.priority}] ${finding.stageTitle}`;
  refs.detailContent.textContent = "";

  const title = document.createElement("p");
  title.className = "detail-question";
  title.textContent = finding.question;

  const current = detailChainCard(t("detailCurrent"), finding.currentLevelLabel);
  const cause = detailChainCard(t("detailCause"), finding.cause);
  const effect = detailChainCard(t("detailEffect"), finding.effect);
  const action = detailChainCard(t("detailAction"), finding.action);
  const outcome = detailChainCard(t("detailOutcome"), finding.kpi);

  const linksTitle = document.createElement("h4");
  linksTitle.textContent = t("detailLinks");

  const linksWrap = document.createElement("div");
  linksWrap.className = "detail-links";

  linksWrap.appendChild(makeExternalLinkBlock("📌", t("stageGuidance"), ""));

  for (const linkDef of finding.stageLinks) {
    linksWrap.appendChild(makeExternalLinkBlock("↗", linkDef.label, linkDef.url));
  }

  for (const tool of finding.tools) {
    const icon = TOOL_ICONS[tool.id] || "🧩";
    linksWrap.appendChild(makeExternalLinkBlock(icon, `${tool.name} - ${tool.note}`, tool.url));
  }

  refs.detailContent.append(title, current, cause, effect, action, outcome, linksTitle, linksWrap);
  refs.detailPanel.hidden = false;

  if (shouldScroll) {
    refs.detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (updateHash) {
    history.replaceState(null, "", `#finding-${findingId}`);
  }

  saveState();
}

function closeDetail(options = {}) {
  const updateHash = options.updateHash ?? true;
  state.activeFindingId = null;
  refs.detailPanel.hidden = true;

  if (updateHash && location.hash.startsWith("#finding-")) {
    history.replaceState(null, "", `#${state.route}`);
  }

  saveState();
}

function applyPreset(type) {
  const next = createEmptyResponses();

  for (const stage of FRAMEWORK_STAGES) {
    for (const question of stage.questions) {
      const w = question.weight;
      let value = 0;

      if (type === "startup") {
        value = w >= 4 ? 0 : 1;
      } else if (type === "scaleup") {
        value = w >= 4 ? 1 : 2;
      } else {
        value = w >= 4 ? 2 : 3;
      }

      next[stage.id][question.id] = value;
    }
  }

  state.responses = next;
  renderFrameworkForm();
  recalculate();
  saveState();
}

function applyRouteFromHash() {
  const hash = location.hash.replace("#", "");

  if (!hash) {
    setRoute(state.route, { pushHash: false });
    return;
  }

  if (hash.startsWith("finding-")) {
    const findingId = hash.replace("finding-", "");
    setRoute("insights", { pushHash: false });
    if (latestAnalysis?.findings.some((item) => item.id === findingId)) {
      openFindingDetail(findingId, { scroll: false, updateHash: false });
    }
    return;
  }

  if (ROUTES.includes(hash)) {
    setRoute(hash, { pushHash: false });
    return;
  }

  setRoute("overview", { pushHash: false });
}

function setRoute(route, options = {}) {
  const pushHash = options.pushHash ?? false;
  if (!ROUTES.includes(route)) return;

  state.route = route;

  for (const tab of refs.routeTabs) {
    tab.classList.toggle("is-active", tab.dataset.route === route);
  }

  for (const panel of refs.routePanels) {
    panel.classList.toggle("is-active", panel.dataset.routePanel === route);
  }

  if (pushHash) {
    history.replaceState(null, "", `#${route}`);
  }

  saveState();
}

function openHelpModal() {
  refs.helpModal.showModal();
}

function closeHelpModal() {
  if (refs.helpModal.open) refs.helpModal.close();
}

function openPriorityModal(priority) {
  if (!priority) return;

  refs.priorityTitle.textContent = `${t("priorityInfoTitle")}: ${priority}`;

  const key =
    priority === "MUST"
      ? "priorityMust"
      : priority === "SHOULD"
        ? "priorityShould"
        : "priorityCould";

  refs.priorityBody.textContent = t(key);
  refs.priorityModal.showModal();
}

function closePriorityModal() {
  if (refs.priorityModal.open) refs.priorityModal.close();
}

function syncSegmentButtons(buttons, activeValue, attrKey) {
  buttons.forEach((button) => {
    const value = button.dataset[attrKey];
    button.classList.toggle("is-active", value === activeValue);
  });
}

function detailChainCard(label, content) {
  const card = document.createElement("article");
  card.className = "detail-chain-card";

  const heading = document.createElement("p");
  heading.className = "detail-label";
  heading.textContent = label;

  const body = document.createElement("p");
  body.textContent = content;

  card.append(heading, body);
  return card;
}

function makeExternalLinkBlock(icon, label, url) {
  const isLink = Boolean(url);
  const element = isLink ? document.createElement("a") : document.createElement("div");
  element.className = "detail-link clickable-card";

  if (isLink) {
    element.href = url;
    element.target = "_blank";
    element.rel = "noopener noreferrer";
  }

  const iconSpan = document.createElement("span");
  iconSpan.textContent = icon;

  const text = document.createElement("span");
  text.textContent = label;

  element.append(iconSpan, text);
  return element;
}

function downloadText(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";
}

function setText(selector, text) {
  const element = document.querySelector(selector);
  if (element) element.textContent = text;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
