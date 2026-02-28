import test from "node:test";
import assert from "node:assert/strict";

import { FRAMEWORK_STAGES } from "../lib/framework-data.mjs";
import {
  analyzeAssessment,
  calculateStageScore,
  createEmptyResponses,
  normalizeResponses
} from "../lib/engine.mjs";

test("createEmptyResponses contains every stage and question", () => {
  const empty = createEmptyResponses();

  assert.equal(Object.keys(empty).length, FRAMEWORK_STAGES.length);

  for (const stage of FRAMEWORK_STAGES) {
    assert.ok(stage.id in empty);
    for (const question of stage.questions) {
      assert.equal(empty[stage.id][question.id], 0);
    }
  }
});

test("normalizeResponses clamps values between 0 and 3", () => {
  const normalized = normalizeResponses({
    prep: {
      prep_security_owner: -3,
      prep_budget: 999
    }
  });

  assert.equal(normalized.prep.prep_security_owner, 0);
  assert.equal(normalized.prep.prep_budget, 3);
});

test("calculateStageScore returns 100 for max maturity", () => {
  const stage = FRAMEWORK_STAGES[0];
  const responses = Object.fromEntries(stage.questions.map((q) => [q.id, 3]));
  const score = calculateStageScore(stage, responses);
  assert.equal(score, 100);
});

test("analysis produces MUST findings for weak high-weight controls", () => {
  const responses = createEmptyResponses();
  responses.testing.test_sast = 0;

  const analysis = analyzeAssessment(responses, { projectName: "Test" });

  assert.ok(analysis.findings.length > 0);
  assert.equal(analysis.findings[0].priority, "MUST");
  assert.ok(analysis.recommendedTools.some((tool) => tool.id === "semgrep"));
});
