const test = require("node:test");
const assert = require("node:assert/strict");
const { QUESTIONS, GROUPS, computeResults, encodeAnswers, decodeAnswers, summaryText } = require("../app.js");

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
