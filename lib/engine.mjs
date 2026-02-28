import { FRAMEWORK_STAGES, TOOL_CATALOG } from "./framework-data.mjs";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

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

function classifyRisk(score) {
  if (score >= 80) return "Niskie";
  if (score >= 60) return "Srednie";
  if (score >= 40) return "Podwyzszone";
  return "Wysokie";
}

function classifyPriority(value, weight) {
  if (value <= 1 && weight >= 4) return "MUST";
  if (value <= 1) return "SHOULD";
  if (value === 2) return "COULD";
  return null;
}

export function analyzeAssessment(responses, profile = {}) {
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
      title: stage.title,
      articleAnchor: stage.articleAnchor,
      objective: stage.objective,
      score: stageScore,
      risk: stageRisk,
      riskClass: classifyRisk(stageScore)
    });

    for (const question of stage.questions) {
      const value = normalized[stage.id][question.id];
      const priority = classifyPriority(value, question.weight);
      if (!priority) continue;

      findings.push({
        id: question.id,
        stageId: stage.id,
        stageTitle: stage.title,
        question: question.text,
        currentLevel: value,
        priority,
        action: question.action,
        kpi: question.kpi,
        weight: question.weight,
        tools: (question.tools || []).map((toolId) => ({
          id: toolId,
          ...TOOL_CATALOG[toolId]
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
    owner: suggestOwner(finding.stageId)
  }));

  const recommendedTools = summarizeTools(findings);

  return {
    profile,
    generatedAt: new Date().toISOString(),
    overallScore,
    overallRisk,
    overallRiskClass: classifyRisk(overallScore),
    stageResults,
    findings,
    roadmap,
    recommendedTools
  };
}

function suggestOwner(stageId) {
  if (["prep", "authorise"].includes(stageId)) return "Engineering Manager + Security Lead";
  if (["requirements", "design"].includes(stageId)) return "Product Manager + Tech Lead";
  if (["implementation", "testing"].includes(stageId)) return "Tech Lead + Developers";
  if (stageId === "deployment") return "DevOps / Platform";
  return "Security Lead + Operations";
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

export function toMarkdownReport(analysis) {
  const date = new Date(analysis.generatedAt).toLocaleString("pl-PL");
  const lines = [];

  lines.push(`# Raport Continuous Security - ${analysis.profile.projectName || "Projekt"}`);
  lines.push("");
  lines.push(`- Wygenerowano: ${date}`);
  lines.push(`- Wynik laczny: **${analysis.overallScore}/100**`);
  lines.push(`- Poziom ryzyka: **${analysis.overallRiskClass}** (risk=${analysis.overallRisk})`);
  lines.push("");

  lines.push("## Wyniki etapow");
  lines.push("");
  for (const stage of analysis.stageResults) {
    lines.push(`- ${stage.title}: ${stage.score}/100, ryzyko ${stage.riskClass}`);
  }

  lines.push("");
  lines.push("## Najwazniejsze luki");
  lines.push("");
  for (const finding of analysis.findings.slice(0, 10)) {
    lines.push(`- [${finding.priority}] ${finding.stageTitle} -> ${finding.question}`);
    lines.push(`  - Dzialanie: ${finding.action}`);
    lines.push(`  - KPI: ${finding.kpi}`);
  }

  lines.push("");
  lines.push("## Plan usprawnien");
  lines.push("");
  for (const item of analysis.roadmap) {
    lines.push(`${item.order}. [${item.priority}] ${item.action} (${item.owner})`);
    lines.push(`   KPI: ${item.kpi}`);
  }

  lines.push("");
  lines.push("## Rekomendowane narzedzia");
  lines.push("");
  for (const tool of analysis.recommendedTools) {
    lines.push(`- [${tool.name}](${tool.url}) - ${tool.category} - ${tool.note}`);
  }

  return lines.join("\n");
}
