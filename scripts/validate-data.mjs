import { FRAMEWORK_STAGES, TOOL_CATALOG } from "../lib/framework-data.mjs";

const urlErrors = [];
const missingToolErrors = [];

for (const [toolId, tool] of Object.entries(TOOL_CATALOG)) {
  try {
    const url = new URL(tool.url);
    if (url.protocol !== "https:") {
      urlErrors.push(`${toolId}: URL must use https`);
    }
  } catch {
    urlErrors.push(`${toolId}: Invalid URL (${tool.url})`);
  }
}

for (const stage of FRAMEWORK_STAGES) {
  for (const question of stage.questions) {
    for (const toolId of question.tools || []) {
      if (!TOOL_CATALOG[toolId]) {
        missingToolErrors.push(
          `${stage.id}/${question.id}: unknown tool id '${toolId}'`
        );
      }
    }
  }
}

if (urlErrors.length || missingToolErrors.length) {
  const all = [...urlErrors, ...missingToolErrors].join("\n");
  console.error(all);
  process.exit(1);
}

console.log("Data validation passed.");
