import {
  DEFAULT_TEAM_PROFILE,
  FRAMEWORK_STAGES,
  RESPONSE_SCALE
} from "./lib/framework-data.mjs";
import {
  analyzeAssessment,
  createEmptyResponses,
  normalizeResponses,
  toMarkdownReport
} from "./lib/engine.mjs";

const STORAGE_KEY = "continuous-security-navigator-v1";

const profileFields = [
  { key: "projectName", label: "Nazwa projektu", type: "text" },
  {
    key: "teamSize",
    label: "Wielkosc zespolu",
    type: "select",
    options: ["1-5", "6-10", "11-25", "26+"]
  },
  {
    key: "deliveryModel",
    label: "Model pracy",
    type: "select",
    options: ["Agile", "Kanban", "Scrum", "Hybrid"]
  },
  {
    key: "releaseCadence",
    label: "Cadence release",
    type: "select",
    options: ["Codziennie", "Co tydzien", "Co 2 tygodnie", "Co miesiac"]
  }
];

let state = {
  profile: { ...DEFAULT_TEAM_PROFILE },
  responses: createEmptyResponses()
};

const refs = {
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
  presetStartup: document.querySelector("#preset-startup"),
  presetScaleup: document.querySelector("#preset-scaleup"),
  presetMature: document.querySelector("#preset-mature")
};

init();

function init() {
  loadState();
  renderProfileForm();
  renderFrameworkForm();
  bindEvents();
  recalculate();
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    state.profile = {
      ...DEFAULT_TEAM_PROFILE,
      ...(parsed.profile || {})
    };
    state.responses = normalizeResponses(parsed.responses);
  } catch (error) {
    console.warn("Nie udalo sie wczytac stanu:", error);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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

  refs.saveBtn.addEventListener("click", () => {
    saveState();
    refs.saveBtn.textContent = "Zapisano";
    setTimeout(() => {
      refs.saveBtn.textContent = "Zapisz lokalnie";
    }, 1200);
  });

  refs.resetBtn.addEventListener("click", () => {
    state = {
      profile: { ...DEFAULT_TEAM_PROFILE },
      responses: createEmptyResponses()
    };
    localStorage.removeItem(STORAGE_KEY);
    renderProfileForm();
    renderFrameworkForm();
    recalculate();
  });

  refs.exportBtn.addEventListener("click", () => {
    const analysis = analyzeAssessment(state.responses, state.profile);
    const report = toMarkdownReport(analysis);
    downloadText(
      report,
      `${slugify(state.profile.projectName || "projekt")}-continuous-security-report.md`,
      "text/markdown"
    );
  });

  refs.presetStartup.addEventListener("click", () => applyPreset("startup"));
  refs.presetScaleup.addEventListener("click", () => applyPreset("scaleup"));
  refs.presetMature.addEventListener("click", () => applyPreset("mature"));
}

function renderProfileForm() {
  refs.profileForm.textContent = "";

  for (const field of profileFields) {
    const wrapper = document.createElement("div");
    wrapper.className = "field";

    const label = document.createElement("label");
    label.textContent = field.label;

    const input =
      field.type === "select"
        ? document.createElement("select")
        : document.createElement("input");

    input.dataset.key = field.key;

    if (field.type === "select") {
      for (const option of field.options) {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        if (state.profile[field.key] === option) {
          opt.selected = true;
        }
        input.appendChild(opt);
      }
    } else {
      input.type = "text";
      input.value = state.profile[field.key] || "";
      input.placeholder = "Np. Platforma platnosci";
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

    const header = document.createElement("header");
    const title = document.createElement("h3");
    title.textContent = stage.title;

    const objective = document.createElement("p");
    objective.textContent = stage.objective;

    const anchor = document.createElement("p");
    anchor.className = "muted";
    anchor.textContent = `Referencja w artykule: ${stage.articleAnchor}`;

    header.append(title, objective, anchor);

    const questionGrid = document.createElement("div");
    questionGrid.className = "question-grid";

    for (const question of stage.questions) {
      const row = document.createElement("div");
      row.className = "question-row";

      const textWrap = document.createElement("div");
      const questionTitle = document.createElement("div");
      questionTitle.className = "question-title";
      questionTitle.textContent = question.text;

      const meta = document.createElement("div");
      meta.className = "question-meta";
      meta.textContent = `Waga ryzyka: ${question.weight} | KPI docelowe: ${question.kpi}`;

      textWrap.append(questionTitle, meta);

      const select = document.createElement("select");
      select.className = "score-select";
      select.dataset.stage = stage.id;
      select.dataset.question = question.id;

      for (const level of RESPONSE_SCALE) {
        const opt = document.createElement("option");
        opt.value = String(level.value);
        opt.textContent = `${level.value} - ${level.label}`;
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
  const analysis = analyzeAssessment(state.responses, state.profile);
  renderSummary(analysis);
  renderStageResults(analysis);
  renderFindings(analysis);
  renderRoadmap(analysis);
  renderTools(analysis);
}

function renderSummary(analysis) {
  refs.overallSummary.textContent = "";

  const summaryMetrics = [
    { label: "Wynik laczny", value: `${analysis.overallScore}/100` },
    { label: "Poziom ryzyka", value: analysis.overallRiskClass },
    { label: "Liczba luk", value: String(analysis.findings.length) },
    {
      label: "Liczba rekom. narzedzi",
      value: String(analysis.recommendedTools.length)
    }
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
    card.className = "stage-result";

    const title = document.createElement("strong");
    title.textContent = stage.title;

    const desc = document.createElement("p");
    desc.className = "muted";
    desc.textContent = `${stage.score}/100 | Ryzyko: ${stage.riskClass}`;

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
    refs.findings.textContent = "Brak wykrytych luk. Proces jest bardzo dojrzaly.";
    return;
  }

  for (const finding of topFindings) {
    const item = document.createElement("article");
    item.className = "list-item";

    const badge = document.createElement("span");
    badge.className = `badge ${finding.priority.toLowerCase()}`;
    badge.textContent = finding.priority;

    const title = document.createElement("p");
    title.innerHTML = `<strong>${finding.stageTitle}</strong>: ${escapeHtml(
      finding.question
    )}`;

    const action = document.createElement("p");
    action.textContent = `Dzialanie: ${finding.action}`;

    const kpi = document.createElement("p");
    kpi.className = "muted";
    kpi.textContent = `KPI: ${finding.kpi}`;

    item.append(badge, title, action, kpi);
    refs.findings.appendChild(item);
  }
}

function renderRoadmap(analysis) {
  refs.roadmap.textContent = "";

  if (analysis.roadmap.length === 0) {
    refs.roadmap.textContent = "Brak elementow roadmapy.";
    return;
  }

  for (const task of analysis.roadmap) {
    const item = document.createElement("article");
    item.className = "list-item";

    const top = document.createElement("p");
    top.innerHTML = `<strong>#${task.order} [${task.priority}]</strong> ${escapeHtml(
      task.action
    )}`;

    const owner = document.createElement("p");
    owner.textContent = `Owner: ${task.owner}`;

    const kpi = document.createElement("p");
    kpi.className = "muted";
    kpi.textContent = `KPI: ${task.kpi}`;

    item.append(top, owner, kpi);
    refs.roadmap.appendChild(item);
  }
}

function renderTools(analysis) {
  refs.tools.textContent = "";

  if (analysis.recommendedTools.length === 0) {
    refs.tools.textContent =
      "Brak dodatkowych rekomendacji narzedzi. Zespol osiagnal wysoki poziom dojrzalosci.";
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
    category.textContent = `Kategoria: ${tool.category}`;

    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = tool.note;

    const usedFor = document.createElement("p");
    usedFor.className = "muted";
    usedFor.textContent = `Dla etapow: ${tool.usedFor.join(", ")}`;

    card.append(badge, name, category, note, usedFor);
    refs.tools.appendChild(card);
  }
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
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "projekt";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
