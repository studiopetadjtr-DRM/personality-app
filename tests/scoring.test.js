const test = require("node:test");
const assert = require("node:assert/strict");
const { QUESTIONS, GROUPS, computeResults, computeOverview, computeSwot, buildOverview, encodeAnswers, decodeAnswers, summaryText } = require("../app.js");

test("60 questions, all weights reference valid groups/keys", () => {
  assert.equal(QUESTIONS.length, 60);
  for (const q of QUESTIONS) {
    for (const g in q.w) {
      assert.ok(GROUPS[g], `unknown group ${g}`);
      for (const k in q.w[g]) {
        assert.ok(GROUPS[g].includes(k), `unknown key ${g}.${k}`);
        assert.ok([-1, 1].includes(q.w[g][k]), `weight must be ±1: ${g}.${k}`);
      }
    }
  }
});

test("every scored key has both positive and negative weights (no degenerate poles)", () => {
  for (const g in GROUPS) {
    for (const k of GROUPS[g]) {
      let pos = 0, neg = 0;
      for (const q of QUESTIONS) {
        const w = q.w[g] && q.w[g][k];
        if (w > 0) pos++;
        if (w < 0) neg++;
      }
      assert.ok(pos > 0 && neg > 0, `${g}.${k} pos=${pos} neg=${neg}`);
    }
  }
});

test("all-5 answers give ENFP-A", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(5));
  assert.equal(r.mbti.type, "ENFP-A");
});

test("all-1 answers give ISTJ-T", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(1));
  assert.equal(r.mbti.type, "ISTJ-T");
});

test("all-neutral answers give 50% on every OCEAN trait", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(3));
  for (const k of GROUPS.ocean) assert.equal(r.ocean[k], 50);
});

test("percentages stay within 0..100 for arbitrary answers", () => {
  const ans = Array.from({ length: QUESTIONS.length }, () => 1 + Math.floor(Math.random() * 5));
  const r = computeResults(ans);
  for (const k of GROUPS.ocean) assert.ok(r.ocean[k] >= 0 && r.ocean[k] <= 100, `ocean.${k}=${r.ocean[k]}`);
  for (const k of GROUPS.disc) assert.ok(r.disc.scores[k] >= 0 && r.disc.scores[k] <= 100);
  for (const k of GROUPS.sloan) assert.ok(r.sloan.scores[k] >= 0 && r.sloan.scores[k] <= 100);
  for (const k of GROUPS.ennea) assert.ok(r.ennea.scores[k] >= 0 && r.ennea.scores[k] <= 100);
});

test("share encode/decode round-trips, rejects garbage", () => {
  const ans = new Array(QUESTIONS.length).fill(null);
  ans[0] = 5; ans[3] = 1; ans[59] = 3;
  assert.deepEqual(decodeAnswers(encodeAnswers(ans)), ans);
  assert.equal(decodeAnswers("xyz"), null);
  assert.equal(decodeAnswers("123"), null);
});

test("drivers reference real question indices", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(4));
  for (const g in r.drivers) {
    for (const k in r.drivers[g]) {
      for (const i of r.drivers[g][k]) assert.ok(i >= 0 && i < QUESTIONS.length);
    }
  }
});

test("partial answers: nulls are ignored and results stay in range", () => {
  const ans = new Array(QUESTIONS.length).fill(null);
  ans[0] = 5; ans[9] = 1; ans[59] = 3;
  const r = computeResults(ans);
  assert.match(r.mbti.type, /^[EI][SN][TF][JP]-[AT]$/);
  for (const k of GROUPS.ocean) assert.ok(r.ocean[k] >= 0 && r.ocean[k] <= 100);
  for (const k of GROUPS.ennea) assert.ok(r.ennea.scores[k] >= 0 && r.ennea.scores[k] <= 100);
  for (const g in r.drivers) for (const k in r.drivers[g]) for (const i of r.drivers[g][k]) assert.ok(i >= 0 && i < QUESTIONS.length);
});

test("summaryText mentions all six models", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(4));
  const s = summaryText(r);
  for (const needle of ["MBTI:", "Socionics:", "Enneagram:", "DISC:", "SLOAN:", "OCEAN:"]) {
    assert.ok(s.includes(needle), `missing ${needle}`);
  }
  assert.ok(s.includes(r.mbti.type));
});

test("enneagram wing is always adjacent to the top type", () => {
  for (const v of [1, 2, 3, 4, 5]) {
    const r = computeResults(new Array(QUESTIONS.length).fill(v));
    const top = Number(r.ennea.top);
    const wing = Number(r.ennea.wing);
    const diff = Math.min((wing - top + 9) % 9, (top - wing + 9) % 9);
    assert.equal(diff, 1, `top=${top} wing=${wing}`);
  }
});

test("encode/decode round-trips all-null answers", () => {
  const ans = new Array(QUESTIONS.length).fill(null);
  assert.deepEqual(decodeAnswers(encodeAnswers(ans)), ans);
});

test("computeSwot returns 4 quadrants with titled, detailed items", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(5));
  const sw = computeSwot(r);
  for (const q of ["strengths", "weaknesses", "opportunities", "threats"]) {
    assert.ok(Array.isArray(sw[q]) && sw[q].length >= 1 && sw[q].length <= 3, q);
    for (const item of sw[q]) {
      assert.equal(typeof item.title, "string");
      assert.ok(item.title.length > 0);
      assert.ok(item.detail.includes("%"), `detail should cite a score: ${item.detail}`);
    }
  }
});

test("computeSwot is deterministic and reacts to answers", () => {
  const hi = computeResults(new Array(QUESTIONS.length).fill(5));
  const lo = computeResults(new Array(QUESTIONS.length).fill(1));
  assert.deepEqual(computeSwot(hi), computeSwot(hi));
  assert.notDeepEqual(computeSwot(hi).strengths, computeSwot(lo).strengths);
  assert.notDeepEqual(computeSwot(hi).threats, computeSwot(lo).threats);
});

test("all-neutral answers fall back to a balanced SWOT", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(3));
  const sw = computeSwot(r);
  for (const q of ["strengths", "weaknesses", "opportunities", "threats"]) {
    assert.equal(sw[q][0].title, "Balanced profile", q);
  }
});

test("computeOverview mentions MBTI type, Enneagram and top OCEAN trait", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(4));
  const ov = computeOverview(r);
  assert.ok(ov.includes(r.mbti.type));
  assert.ok(ov.includes(`${r.ennea.top}w${r.ennea.wing}`));
  const top = Object.keys(r.ocean).sort((a, b) => r.ocean[b] - r.ocean[a])[0];
  const labels = { O: "Openness", C: "Conscientiousness", E: "Extraversion", A: "Agreeableness", N: "Neuroticism" };
  assert.ok(ov.includes(labels[top]));
  assert.ok(ov.includes("%"));
});

test("summaryText includes overview and SWOT lines", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(4));
  const s = summaryText(r);
  assert.ok(s.includes("Overview: "));
  assert.ok(s.includes("SWOT — Strengths:"));
  assert.ok(s.includes("Threats:"));
});

test("buildOverview returns summary, balance, four stats and up to three moves", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(4));
  const ov = buildOverview(r, computeSwot(r));
  assert.equal(typeof ov.summary, "string");
  assert.ok(ov.summary.length > 0);
  assert.equal(typeof ov.balance, "string");
  assert.ok(ov.balance.length > 0);
  assert.equal(ov.stats.length, 4);
  for (const s of ov.stats) {
    assert.equal(typeof s.label, "string");
    assert.equal(typeof s.value, "string");
    assert.ok(s.value.length > 0);
    assert.equal(typeof s.note, "string");
  }
  assert.ok(ov.moves.length >= 1 && ov.moves.length <= 3);
  for (const m of ov.moves) {
    assert.equal(typeof m.tag, "string");
    assert.equal(typeof m.text, "string");
    assert.ok(m.text.length > 0);
  }
});

test("buildOverview stat notes are trait-agnostic", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(4));
  const ov = buildOverview(r, computeSwot(r));
  const top = ov.stats.find(s => s.label === "Top trait");
  assert.match(top.note, /^\d+% on this trait$/);
  assert.ok(!top.note.includes("openness to experience"));
});

test("buildOverview never emits an undefined move", () => {
  for (const v of [1, 2, 3, 4, 5]) {
    const r = computeResults(new Array(QUESTIONS.length).fill(v));
    const ov = buildOverview(r, computeSwot(r));
    for (const m of ov.moves) {
      assert.ok(m.text && !m.text.includes("undefined"), `v=${v} move=${JSON.stringify(m)}`);
    }
  }
});

test("buildOverview reports no watch-out on a flat profile", () => {
  const r = computeResults(new Array(QUESTIONS.length).fill(3));
  const ov = buildOverview(r, computeSwot(r));
  const watch = ov.stats.find(s => s.label === "Watch-out");
  assert.equal(watch.value, "None");
  assert.ok(!ov.summary.includes("most likely to cost you"));
  assert.ok(ov.summary.includes("no clear watch-out"));
});
