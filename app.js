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

const STORAGE_KEY = "continuous-security-navigator-v2";

let latestAnalysis = null;

let state = {
  lang: DEFAULT_LANG,
  theme: DEFAULT_THEME,
  profile: { ...DEFAULT_TEAM_PROFILE },
  responses: createEmptyResponses(),
  activeFindingId: null
};

const refs = {
  html: document.documentElement,
  profileForm: document.querySelector("#profile-form"),
  frameworkForm: document.querySelector("#framework-form"),
  overallSummary: document.querySelector("#overall-summary"),
  stageResults: document.querySelector("#stage-results"),
  findings: document.querySelector("#findings"),
  roadmap: document.querySelector("#roadmap"),
  tools: document.querySelector("#tools"),
  saveBtn: document.querySelector("#btn-save"),
  exportBtn: document.querySelector("#btn-export"),
  resetBtn: document.querySelector("#btn-reset"),
  langSwitch: document.querySelector("#lang-switch"),
  themeSwitch: document.querySelector("#theme-switch"),
  presetStartup: document.querySelector("#preset-startup"),
  presetScaleup: document.querySelector("#preset-scaleup"),
  presetMature: document.querySelector("#preset-mature"),
  detailPanel: document.querySelector("#detail-panel"),
  detailHeading: document.querySelector("#detail-heading"),
  detailContent: document.querySelector("#detail-content"),
  detailHint: document.querySelector("#detail-open-hint"),
  closeDetailBtn: document.querySelector("#btn-close-detail")
};

init();

function init() {
  loadState();
  applyTheme(state.theme);
  renderStaticTexts();
  renderProfileForm();
  renderFrameworkForm();
  bindEvents();
  recalculate();
}

function t(key) {
  return localize(UI_TEXT[key], state.lang);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);

    state = {
      ...state,
      lang: parsed.lang || DEFAULT_LANG,
      theme: parsed.theme || DEFAULT_THEME,
      profile: {
        ...DEFAULT_TEAM_PROFILE,
        ...(parsed.profile || {})
      },
      responses: normalizeResponses(parsed.responses),
      activeFindingId: parsed.activeFindingId || null
    };
  } catch (error) {
    console.warn(`${t("savedStateError")}:`, error);
  }
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      lang: state.lang,
      theme: state.theme,
      profile: state.profile,
      responses: state.responses,
      activeFindingId: state.activeFindingId
    })
  );
}

function applyTheme(theme) {
  state.theme = theme;
  refs.html.dataset.theme = theme;
}

function bindEvents() {
  refs.profileForm.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) {
      return;
    }

    const key = target.dataset.key;
    if (!key) return;

    state.profile[key] = target.value;
    recalculate();
  });

  refs.frameworkForm.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;

    const stageId = target.dataset.stage;
    const questionId = target.dataset.question;

    if (!stageId || !questionId) return;

    state.responses[stageId][questionId] = Number(target.value);
    recalculate();
  });

  refs.findings.addEventListener("click", (event) => {
    const card = event.target.closest("[data-finding-id]");
    if (!card) return;

    const findingId = card.dataset.findingId;
    openFindingDetail(findingId);
  });

  refs.stageResults.addEventListener("click", (event) => {
    const card = event.target.closest("[data-stage-id]");
    if (!card) return;

    const stageId = card.dataset.stageId;
    const stageEl = document.querySelector(`#stage-card-${stageId}`);
    if (!stageEl) return;

    stageEl.scrollIntoView({ behavior: "smooth", block: "center" });
    stageEl.classList.add("focus-flash");
    setTimeout(() => stageEl.classList.remove("focus-flash"), 1200);
  });

  refs.saveBtn.addEventListener("click", () => {
    saveState();
    refs.saveBtn.textContent = t("saved");
    setTimeout(() => {
      refs.saveBtn.textContent = t("save");
    }, 1200);
  });

  refs.resetBtn.addEventListener("click", () => {
    state = {
      lang: state.lang,
      theme: state.theme,
      profile: { ...DEFAULT_TEAM_PROFILE },
      responses: createEmptyResponses(),
      activeFindingId: null
    };
    localStorage.removeItem(STORAGE_KEY);
    renderProfileForm();
    renderFrameworkForm();
    closeDetail();
    recalculate();
  });

  refs.exportBtn.addEventListener("click", () => {
    const analysis = analyzeAssessment(state.responses, state.profile, { lang: state.lang });
    const report = toMarkdownReport(analysis, state.lang);
    const projectSlug = slugify(state.profile.projectName || "project");
    downloadText(report, `${projectSlug}-continuous-security-report.md`, "text/markdown");
  });

  refs.langSwitch.addEventListener("change", () => {
    state.lang = refs.langSwitch.value;
    refs.html.lang = state.lang;
    renderStaticTexts();
    renderProfileForm();
    renderFrameworkForm();
    recalculate();
    if (state.activeFindingId) {
      openFindingDetail(state.activeFindingId);
    }
  });

  refs.themeSwitch.addEventListener("change", () => {
    applyTheme(refs.themeSwitch.value);
  });

  refs.closeDetailBtn.addEventListener("click", closeDetail);

  refs.presetStartup.addEventListener("click", () => applyPreset("startup"));
  refs.presetScaleup.addEventListener("click", () => applyPreset("scaleup"));
  refs.presetMature.addEventListener("click", () => applyPreset("mature"));

  window.addEventListener("hashchange", () => {
    syncHashToDetail();
  });
}

function renderStaticTexts() {
  refs.html.lang = state.lang;

  setText("#hero-kicker", t("kicker"));
  setText("#app-title", t("appTitle"));
  setText("#hero-lead", t("lead"));

  refs.saveBtn.textContent = t("save");
  refs.exportBtn.textContent = t("export");
  refs.resetBtn.textContent = t("reset");

  setText("#lang-label", t("language"));
  setText("#theme-label", t("theme"));

  refs.langSwitch.value = state.lang;
  refs.themeSwitch.value = state.theme;
  setText("#theme-option-dark", t("themeDark"));
  setText("#theme-option-light", t("themeLight"));

  setText("#section-profile-title", t("projectProfile"));
  setText("#preset-label", t("starterPresets"));
  refs.presetStartup.textContent = t("presetStartup");
  refs.presetScaleup.textContent = t("presetScaleup");
  refs.presetMature.textContent = t("presetMature");

  setText("#framework-title", t("frameworkTitle"));
  setText("#framework-scale", t("frameworkScale"));

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
    card.className = "stage-card";
    card.id = `stage-card-${stage.id}`;

    const header = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = localize(stage.title, state.lang);

    const objective = document.createElement("p");
    objective.textContent = localize(stage.objective, state.lang);

    const stageLinks = document.createElement("div");
    stageLinks.className = "stage-links";

    for (const linkDef of stage.links || []) {
      const link = document.createElement("a");
      link.href = linkDef.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = localize(linkDef.label, state.lang);
      stageLinks.appendChild(link);
    }

    header.append(title, objective, stageLinks);

    const questionGrid = document.createElement("div");
    questionGrid.className = "question-grid";

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
  syncHashToDetail();
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
    card.className = "metric";

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

  for (const stage of analysis.stageResults) {
    const card = document.createElement("div");
    card.className = "stage-result clickable-card";
    card.dataset.stageId = stage.id;

    const title = document.createElement("strong");
    title.textContent = stage.title;

    const desc = document.createElement("p");
    desc.className = "muted";
    desc.textContent = `${stage.score}/100 | ${t("summaryRisk")}: ${stage.riskClass}`;

    const hint = document.createElement("p");
    hint.className = "muted small";
    hint.textContent = t("clickForDetails");

    const bar = document.createElement("div");
    bar.className = "scorebar";
    const fill = document.createElement("span");
    fill.style.width = `${stage.score}%`;
    bar.appendChild(fill);

    card.append(title, desc, hint, bar);
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
    badge.textContent = finding.priority;

    const title = document.createElement("p");
    title.innerHTML = `<strong>${finding.stageTitle}</strong>: ${escapeHtml(finding.question)}`;

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

  if (analysis.roadmap.length === 0) {
    refs.roadmap.textContent = t("noRoadmap");
    return;
  }

  for (const task of analysis.roadmap) {
    const item = document.createElement("article");
    item.className = "list-item";

    const top = document.createElement("p");
    top.innerHTML = `<strong>#${task.order} [${task.priority}]</strong> ${escapeHtml(task.action)}`;

    const owner = document.createElement("p");
    owner.textContent = `${t("ownerLabel")}: ${task.owner}`;

    const kpi = document.createElement("p");
    kpi.className = "muted";
    kpi.textContent = `${t("kpiLabel")}: ${task.kpi}`;

    item.append(top, owner, kpi);
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
    const card = document.createElement("article");
    card.className = "tool-card";

    const badge = document.createElement("span");
    badge.className = `badge ${tool.highestPriority.toLowerCase()}`;
    badge.textContent = tool.highestPriority;

    const name = document.createElement("p");
    const link = document.createElement("a");
    link.href = tool.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = tool.name;
    name.appendChild(link);

    const category = document.createElement("p");
    category.textContent = `${t("categoryLabel")}: ${tool.category}`;

    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = tool.note;

    const usedFor = document.createElement("p");
    usedFor.className = "muted";
    usedFor.textContent = `${t("stagesLabel")}: ${tool.usedFor.join(", ")}`;

    card.append(badge, name, category, note, usedFor);
    refs.tools.appendChild(card);
  }
}

function openFindingDetail(findingId, options = {}) {
  const shouldScroll = options.scroll ?? true;
  if (!latestAnalysis) return;
  const finding = latestAnalysis.findings.find((item) => item.id === findingId);
  if (!finding) return;

  state.activeFindingId = findingId;

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

  const stageLinksLabel = document.createElement("p");
  stageLinksLabel.className = "muted";
  stageLinksLabel.textContent = t("detailStageLinks");
  linksWrap.appendChild(stageLinksLabel);

  for (const linkDef of finding.stageLinks) {
    linksWrap.appendChild(makeExternalLink(linkDef.url, linkDef.label));
  }

  for (const tool of finding.tools) {
    linksWrap.appendChild(makeExternalLink(tool.url, `${tool.name} - ${tool.note}`));
  }

  refs.detailContent.append(title, current, cause, effect, action, outcome, linksTitle, linksWrap);
  refs.detailPanel.hidden = false;
  if (shouldScroll) {
    refs.detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (location.hash !== `#finding-${findingId}`) {
    history.replaceState(null, "", `#finding-${findingId}`);
  }
}

function closeDetail() {
  state.activeFindingId = null;
  refs.detailPanel.hidden = true;
  if (location.hash.startsWith("#finding-")) {
    history.replaceState(null, "", location.pathname + location.search);
  }
}

function syncHashToDetail() {
  if (!latestAnalysis) return;
  if (!location.hash.startsWith("#finding-")) {
    if (state.activeFindingId && refs.detailPanel.hidden) {
      openFindingDetail(state.activeFindingId, { scroll: false });
    }
    return;
  }

  const findingId = location.hash.replace("#finding-", "");
  if (!latestAnalysis.findings.some((item) => item.id === findingId)) {
    closeDetail();
    return;
  }

  openFindingDetail(findingId, { scroll: false });
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

function makeExternalLink(url, label) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "detail-link";
  link.textContent = label;
  return link;
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
