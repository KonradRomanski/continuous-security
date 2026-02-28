import {
  DEFAULT_LANG,
  FRAMEWORK_STAGES,
  RESPONSE_SCALE,
  TOOL_CATALOG,
  UI_TEXT,
  localize
} from "./framework-data.mjs";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const RISK_CLASSES = {
  low: { en: "Low", pl: "Niskie" },
  medium: { en: "Medium", pl: "Średnie" },
  elevated: { en: "Elevated", pl: "Podwyższone" },
  high: { en: "High", pl: "Wysokie" }
};

export function createEmptyResponses() {
  const responses = {};
  for (const stage of FRAMEWORK_STAGES) {
    responses[stage.id] = {};
    for (const question of stage.questions) {
      responses[stage.id][question.id] = 0;
    }
  }
  return responses;
}

export function normalizeResponses(input) {
  const base = createEmptyResponses();
  if (!input || typeof input !== "object") {
    return base;
  }

  for (const stage of FRAMEWORK_STAGES) {
    if (!input[stage.id] || typeof input[stage.id] !== "object") {
      continue;
    }
    for (const question of stage.questions) {
      const raw = Number(input[stage.id][question.id]);
      if (Number.isFinite(raw)) {
        base[stage.id][question.id] = clamp(Math.round(raw), 0, 3);
      }
    }
  }

  return base;
}

export function calculateStageScore(stage, stageResponses) {
  let weightedScore = 0;
  let weightedMax = 0;

  for (const question of stage.questions) {
    const value = clamp(Number(stageResponses?.[question.id] ?? 0), 0, 3);
    weightedScore += value * question.weight;
    weightedMax += 3 * question.weight;
  }

  if (weightedMax === 0) {
    return 0;
  }

  return Math.round((weightedScore / weightedMax) * 100);
}

function classifyRisk(score, lang) {
  if (score >= 80) return localize(RISK_CLASSES.low, lang);
  if (score >= 60) return localize(RISK_CLASSES.medium, lang);
  if (score >= 40) return localize(RISK_CLASSES.elevated, lang);
  return localize(RISK_CLASSES.high, lang);
}

function classifyPriority(value, weight) {
  if (value <= 1 && weight >= 4) return "MUST";
  if (value <= 1) return "SHOULD";
  if (value === 2) return "COULD";
  return null;
}

function maturityLabel(value, lang) {
  const level = RESPONSE_SCALE.find((item) => item.value === value);
  return level ? `${value} - ${localize(level.label, lang)}` : String(value);
}

export function analyzeAssessment(responses, profile = {}, options = {}) {
  const lang = options.lang || DEFAULT_LANG;
  const normalized = normalizeResponses(responses);
  const stageResults = [];
  const findings = [];

  let scoreSum = 0;

  for (const stage of FRAMEWORK_STAGES) {
    const stageScore = calculateStageScore(stage, normalized[stage.id]);
    const stageRisk = 100 - stageScore;

    scoreSum += stageScore;

    stageResults.push({
      id: stage.id,
      title: localize(stage.title, lang),
      objective: localize(stage.objective, lang),
      links: (stage.links || []).map((link) => ({
        label: localize(link.label, lang),
        url: link.url
      })),
      score: stageScore,
      risk: stageRisk,
      riskClass: classifyRisk(stageScore, lang)
    });

    for (const question of stage.questions) {
      const value = normalized[stage.id][question.id];
      const priority = classifyPriority(value, question.weight);
      if (!priority) continue;

      findings.push({
        id: question.id,
        stageId: stage.id,
        stageTitle: localize(stage.title, lang),
        question: localize(question.text, lang),
        currentLevel: value,
        currentLevelLabel: maturityLabel(value, lang),
        priority,
        cause: localize(question.cause, lang),
        effect: localize(question.effect, lang),
        action: localize(question.action, lang),
        kpi: localize(question.kpi, lang),
        weight: question.weight,
        stageLinks: (stage.links || []).map((link) => ({
          label: localize(link.label, lang),
          url: link.url
        })),
        tools: (question.tools || []).map((toolId) => ({
          id: toolId,
          name: TOOL_CATALOG[toolId].name,
          url: TOOL_CATALOG[toolId].url,
          category: localize(TOOL_CATALOG[toolId].category, lang),
          note: localize(TOOL_CATALOG[toolId].note, lang)
        }))
      });
    }
  }

  findings.sort((a, b) => {
    const p = { MUST: 0, SHOULD: 1, COULD: 2 };
    if (p[a.priority] !== p[b.priority]) return p[a.priority] - p[b.priority];
    return b.weight - a.weight;
  });

  const overallScore = Math.round(scoreSum / FRAMEWORK_STAGES.length);
  const overallRisk = 100 - overallScore;

  const roadmap = findings.slice(0, 12).map((finding, index) => ({
    order: index + 1,
    priority: finding.priority,
    stage: finding.stageTitle,
    action: finding.action,
    kpi: finding.kpi,
    owner: suggestOwner(finding.stageId, lang)
  }));

  const recommendedTools = summarizeTools(findings);

  return {
    profile,
    lang,
    generatedAt: new Date().toISOString(),
    overallScore,
    overallRisk,
    overallRiskClass: classifyRisk(overallScore, lang),
    stageResults,
    findings,
    roadmap,
    recommendedTools
  };
}

function suggestOwner(stageId, lang) {
  const labels = {
    prep: {
      en: "Engineering Manager + Security Lead",
      pl: "Engineering Manager + Security Lead"
    },
    requirements: {
      en: "Product Manager + Tech Lead",
      pl: "Product Manager + Tech Lead"
    },
    design: {
      en: "Product Manager + Tech Lead",
      pl: "Product Manager + Tech Lead"
    },
    implementation: {
      en: "Tech Lead + Developers",
      pl: "Tech Lead + Developerzy"
    },
    testing: {
      en: "Tech Lead + QA/Security",
      pl: "Tech Lead + QA/Security"
    },
    deployment: {
      en: "DevOps / Platform",
      pl: "DevOps / Platform"
    },
    authorise: {
      en: "Engineering Manager + Security Lead",
      pl: "Engineering Manager + Security Lead"
    },
    monitoring: {
      en: "Security Lead + Operations",
      pl: "Security Lead + Operations"
    }
  };

  return localize(labels[stageId] || labels.monitoring, lang);
}

function summarizeTools(findings) {
  const byTool = new Map();

  for (const finding of findings) {
    for (const tool of finding.tools) {
      if (!tool?.id || !tool.url) continue;
      if (!byTool.has(tool.id)) {
        byTool.set(tool.id, {
          ...tool,
          usedFor: new Set(),
          priorities: new Set()
        });
      }
      const agg = byTool.get(tool.id);
      agg.usedFor.add(finding.stageTitle);
      agg.priorities.add(finding.priority);
    }
  }

  return [...byTool.values()]
    .map((entry) => ({
      id: entry.id,
      name: entry.name,
      url: entry.url,
      category: entry.category,
      note: entry.note,
      usedFor: [...entry.usedFor],
      highestPriority: entry.priorities.has("MUST")
        ? "MUST"
        : entry.priorities.has("SHOULD")
          ? "SHOULD"
          : "COULD"
    }))
    .sort((a, b) => {
      const p = { MUST: 0, SHOULD: 1, COULD: 2 };
      if (p[a.highestPriority] !== p[b.highestPriority]) {
        return p[a.highestPriority] - p[b.highestPriority];
      }
      return a.name.localeCompare(b.name);
    });
}

export function toMarkdownReport(analysis, lang = analysis.lang || DEFAULT_LANG) {
  const date = new Date(analysis.generatedAt).toLocaleString(lang === "pl" ? "pl-PL" : "en-US");
  const lines = [];

  lines.push(`# ${localize(UI_TEXT.reportTitle, lang)} - ${analysis.profile.projectName || "Project"}`);
  lines.push("");
  lines.push(`- ${localize(UI_TEXT.generated, lang)}: ${date}`);
  lines.push(`- ${localize(UI_TEXT.summaryScore, lang)}: **${analysis.overallScore}/100**`);
  lines.push(`- ${localize(UI_TEXT.summaryRisk, lang)}: **${analysis.overallRiskClass}** (risk=${analysis.overallRisk})`);
  lines.push("");

  lines.push(`## ${localize(UI_TEXT.stageResultsTitle, lang)}`);
  lines.push("");
  for (const stage of analysis.stageResults) {
    lines.push(`- ${stage.title}: ${stage.score}/100, ${localize(UI_TEXT.summaryRisk, lang).toLowerCase()} ${stage.riskClass}`);
  }

  lines.push("");
  lines.push(`## ${localize(UI_TEXT.topGapsTitle, lang)}`);
  lines.push("");
  for (const finding of analysis.findings.slice(0, 10)) {
    lines.push(`- [${finding.priority}] ${finding.stageTitle} -> ${finding.question}`);
    lines.push(`  - ${localize(UI_TEXT.detailCause, lang)}: ${finding.cause}`);
    lines.push(`  - ${localize(UI_TEXT.detailEffect, lang)}: ${finding.effect}`);
    lines.push(`  - ${localize(UI_TEXT.actionLabel, lang)}: ${finding.action}`);
    lines.push(`  - ${localize(UI_TEXT.kpiLabel, lang)}: ${finding.kpi}`);
  }

  lines.push("");
  lines.push(`## ${localize(UI_TEXT.improvementPlanTitle, lang)}`);
  lines.push("");
  for (const item of analysis.roadmap) {
    lines.push(`${item.order}. [${item.priority}] ${item.action} (${item.owner})`);
    lines.push(`   ${localize(UI_TEXT.kpiLabel, lang)}: ${item.kpi}`);
  }

  lines.push("");
  lines.push(`## ${localize(UI_TEXT.toolsSectionTitle, lang)}`);
  lines.push("");
  for (const tool of analysis.recommendedTools) {
    lines.push(`- [${tool.name}](${tool.url}) - ${tool.category} - ${tool.note}`);
  }

  return lines.join("\n");
}
