/* All-in-One Personality Test
   One 60-question quiz scored simultaneously for:
   MBTI (16 types + Assertive/Turbulent = 32), Big Five OCEAN,
   Enneagram (9 + wing), Socionics (16, derived from MBTI),
   DISC (4), SLOAN/RCIE (5).
   Pure scoring logic is exported for node:test when run under Node. */

const QUESTIONS = [
  { q: "I feel energized after spending time with a large group of people.", w: { mbti: { EI: 1 }, ocean: { E: 1 }, disc: { I: 1 }, sloan: { E: 1 } } },
  { q: "I prefer deep one-on-one conversations over big parties.", w: { mbti: { EI: -1 }, ocean: { E: -1 }, disc: { S: 1 }, sloan: { R: 1 } } },
  { q: "I often start conversations with strangers.", w: { mbti: { EI: 1 }, ocean: { E: 1 }, disc: { I: 1 } } },
  { q: "I need quiet time alone to recharge my energy.", w: { mbti: { EI: -1 }, ocean: { E: -1 }, sloan: { R: 1 } } },
  { q: "I focus on the big picture rather than small details.", w: { mbti: { SN: 1 }, ocean: { O: 1 } } },
  { q: "I trust practical experience and proven methods.", w: { mbti: { SN: -1 }, ocean: { C: 1, O: -1 } } },
  { q: "I enjoy exploring abstract theories and possibilities.", w: { mbti: { SN: 1 }, ocean: { O: 1 } } },
  { q: "I pay close attention to concrete facts and details.", w: { mbti: { SN: -1 }, ocean: { C: 1, O: -1 }, disc: { C: 1 } } },
  { q: "I make decisions based on logic and objective analysis.", w: { mbti: { TF: -1 }, ocean: { C: 1 }, disc: { C: 1 } } },
  { q: "I make decisions based on how they affect people's feelings.", w: { mbti: { TF: 1 }, ocean: { A: 1 }, ennea: { 2: 1 } } },
  { q: "I value group harmony over winning an argument.", w: { mbti: { TF: 1 }, ocean: { A: 1 }, ennea: { 9: 1 } } },
  { q: "I can be blunt and direct when giving feedback.", w: { mbti: { TF: -1 }, disc: { D: 1 } } },
  { q: "I prefer to plan and schedule things in advance.", w: { mbti: { JP: -1 }, ocean: { C: 1 }, ennea: { 1: 1 } } },
  { q: "I like keeping my options open and staying flexible.", w: { mbti: { JP: 1 }, ocean: { O: 1, C: -1 }, sloan: { A: 1 } } },
  { q: "I feel stressed when plans change at the last minute.", w: { mbti: { JP: -1 }, ocean: { N: 1 }, ennea: { 1: 1 } } },
  { q: "I enjoy trying new things and taking risks.", w: { mbti: { JP: 1 }, ocean: { O: 1 }, ennea: { 7: 1 } } },
  { q: "I stick to routines that already work for me.", w: { mbti: { SN: -1 }, ocean: { C: 1, O: -1 }, ennea: { 1: 1 } } },
  { q: "I often worry about what could go wrong.", w: { ocean: { N: 1 }, ennea: { 6: 1 } } },
  { q: "I usually stay calm under pressure.", w: { ocean: { N: -1 }, at: { AT: 1 }, ennea: { 9: 1 } } },
  { q: "I get upset easily when things don't go as expected.", w: { ocean: { N: 1 }, mbti: { TF: 1 } } },
  { q: "I am very organized and like things in their place.", w: { ocean: { C: 1 }, disc: { C: 1 }, ennea: { 1: 1 } } },
  { q: "My workspace and schedule are usually tidy.", w: { ocean: { C: 1 }, disc: { C: 1 } } },
  { q: "I tend to procrastinate on tasks I find boring.", w: { ocean: { C: -1 }, mbti: { JP: 1 } } },
  { q: "I finish what I start, even when it gets difficult.", w: { ocean: { C: 1 }, ennea: { 3: 1 } } },
  { q: "I am open to unconventional ideas and new perspectives.", w: { ocean: { O: 1 }, ennea: { 4: 1 } } },
  { q: "I express my emotions openly with others.", w: { ocean: { E: 1 }, mbti: { TF: 1 }, sloan: { E: 1 }, ennea: { 4: 1 } } },
  { q: "I keep my feelings and personal matters to myself.", w: { sloan: { R: 1 }, ennea: { 5: 1 } } },
  { q: "I care deeply about helping and supporting others.", w: { ocean: { A: 1 }, ennea: { 2: 1 }, disc: { S: 1 } } },
  { q: "I am competitive and enjoy winning.", w: { disc: { D: 1 }, ennea: { 3: 1 }, sloan: { I: 1 } } },
  { q: "I naturally take charge in group situations.", w: { disc: { D: 1 }, mbti: { EI: 1 }, ennea: { 8: 1 } } },
  { q: "I prefer following clear instructions over leading.", w: { disc: { S: 1 }, sloan: { C: 1 } } },
  { q: "I enjoy being the center of attention.", w: { mbti: { EI: 1 }, ocean: { E: 1 }, disc: { I: 1 }, sloan: { E: 1 }, ennea: { 3: 1 } } },
  { q: "I adapt quickly to unexpected changes.", w: { sloan: { A: 1 }, ocean: { O: 1 }, mbti: { JP: 1 } } },
  { q: "I prefer stability and predictability over surprises.", w: { sloan: { C: 1 }, ocean: { C: 1, O: -1 }, ennea: { 6: 1 } } },
  { q: "I often analyze my own motives and inner world.", w: { ennea: { 4: 1, 5: 1 }, ocean: { O: 1 } } },
  { q: "I want to be seen as successful and admired.", w: { ennea: { 3: 1 }, disc: { D: 1 } } },
  { q: "I dislike being controlled or limited by others.", w: { ennea: { 8: 1, 7: 1 }, mbti: { JP: 1 } } },
  { q: "I fear being unloved or left out.", w: { ennea: { 2: 1 }, mbti: { TF: 1 }, ocean: { A: 1 } } },
  { q: "I fear being incompetent or a failure.", w: { ennea: { 5: 1, 3: 1 }, ocean: { C: 1 } } },
  { q: "I fear chaos and losing control.", w: { ennea: { 1: 1 }, mbti: { JP: -1 }, ocean: { C: 1 } } },
  { q: "I avoid getting trapped in pain or negative emotions.", w: { ennea: { 7: 1, 4: 1 } } },
  { q: "I avoid conflict and try to keep the peace.", w: { ennea: { 9: 1 }, ocean: { A: 1 }, disc: { S: 1 } } },
  { q: "I question authority and challenge unfair rules.", w: { mbti: { SN: 1 }, ennea: { 8: 1, 6: 1 }, ocean: { O: 1 } } },
  { q: "I am highly self-disciplined and reliable.", w: { ocean: { C: 1 }, ennea: { 1: 1 }, at: { AT: 1 } } },
  { q: "I often doubt myself and my abilities.", w: { ocean: { N: 1 }, ennea: { 4: 1, 6: 1 }, at: { AT: -1 } } },
  { q: "I don't mind bending rules when they seem unnecessary.", w: { mbti: { JP: 1 }, ocean: { C: -1 }, ennea: { 1: -1, 8: 1 }, sloan: { A: 1 } } },
  { q: "I put my own needs ahead of others' when I have to.", w: { mbti: { EI: -1, TF: -1 }, ocean: { A: -1 }, ennea: { 2: -1 }, sloan: { I: 1 } } },
  { q: "I rarely compare myself to other people.", w: { ennea: { 3: -1, 4: -1 } } },
  { q: "I don't need praise or recognition to feel good about my work.", w: { ennea: { 2: -1, 3: -1 } } },
  { q: "I am not easily hurt by criticism.", w: { ocean: { N: -1 }, ennea: { 4: -1, 8: -1 } } },
  { q: "I share my inner thoughts and feelings openly.", w: { ocean: { E: 1 }, mbti: { TF: 1 }, ennea: { 5: -1 }, sloan: { E: 1 } } },
  { q: "I trust easily that things will work out fine.", w: { ocean: { N: -1 }, ennea: { 6: -1, 9: 1 }, disc: { S: 1 }, sloan: { R: 1 } } },
  { q: "I am happy with a simple, predictable routine.", w: { ocean: { C: 1, O: -1 }, ennea: { 7: -1, 9: 1, 6: 1 }, sloan: { C: 1 } } },
  { q: "I let others take charge without minding.", w: { mbti: { EI: -1, JP: -1 }, disc: { D: -1 }, ennea: { 8: -1, 9: 1 } } },
  { q: "I push assertively to get what I want.", w: { disc: { D: 1 }, ennea: { 9: -1, 8: 1, 3: 1 }, mbti: { TF: -1 }, sloan: { C: -1, A: -1 } } },
  { q: "I prefer working independently rather than in a team.", w: { sloan: { I: 1, E: -1 }, disc: { S: -1, I: -1 }, ocean: { E: -1 } } },
  { q: "I enjoy collaborating closely with others.", w: { mbti: { EI: 1 }, sloan: { E: 1, I: -1 }, disc: { S: 1, I: 1 }, ocean: { E: 1 } } },
  { q: "I double-check details to avoid mistakes.", w: { disc: { C: 1 }, ocean: { C: 1 }, ennea: { 1: 1 }, mbti: { SN: -1, JP: -1 }, sloan: { C: 1 } } },
  { q: "I am comfortable with vague or changing instructions.", w: { sloan: { A: 1, C: -1 }, ocean: { O: 1, C: -1 }, mbti: { SN: 1 }, disc: { C: -1 }, ennea: { 6: -1 } } },
  { q: "I speak up immediately when I disagree.", w: { disc: { D: 1 }, ennea: { 8: 1 }, mbti: { TF: -1, SN: 1 }, sloan: { R: -1 }, ocean: { A: -1 } } }
];

const MBTI_INFO = {
  ISTJ: ["The Logistician", "Quiet, practical and reliable; values tradition, duty and responsibility."],
  ISFJ: ["The Defender", "Caring, loyal and protective; quietly notices what others need."],
  INFJ: ["The Advocate", "Idealistic and insightful; driven by meaning and helping others grow."],
  INTJ: ["The Architect", "Strategic, independent and analytical; loves complex systems and long-term plans."],
  ISTP: ["The Virtuoso", "Curious, hands-on and adaptable; a calm problem-solver."],
  ISFP: ["The Adventurer", "Gentle, artistic and present-focused; lives by personal values."],
  INFP: ["The Mediator", "Empathetic and idealistic; guided by deeply held values."],
  INTP: ["The Logician", "Innovative and logical; endlessly curious about ideas and theories."],
  ESTP: ["The Entrepreneur", "Energetic, bold and spontaneous; thrives on action and risk."],
  ESFP: ["The Entertainer", "Enthusiastic, playful and warm; loves people and the moment."],
  ENFP: ["The Campaigner", "Warm, creative and full of possibilities; inspires others easily."],
  ENTP: ["The Debater", "Quick-witted and curious; loves challenging ideas and debates."],
  ESTJ: ["The Executive", "Organized, direct and decisive; a natural leader and planner."],
  ESFJ: ["The Consul", "Warm, helpful and community-focused; keeps harmony in groups."],
  ENFJ: ["The Protagonist", "Charismatic and inspiring; a natural mentor and motivator."],
  ENTJ: ["The Commander", "Decisive, strategic and ambitious; drives toward big goals."]
};

const SOC_MAP = {
  ISTJ: "SLI", ISFJ: "SEI", INFJ: "EII", INTJ: "ILI",
  ISTP: "LSI", ISFP: "ESI", INFP: "IEI", INTP: "LII",
  ESTP: "SLE", ESFP: "SEE", ENFP: "IEE", ENTP: "ILE",
  ESTJ: "LSE", ESFJ: "ESE", ENFJ: "EIE", ENTJ: "LIE"
};
const SOC_INFO = {
  SLI: ["The Inspector", "Practical, detail-oriented, reliable."],
  SEI: ["The Caregiver", "Warm, attentive to others' comfort and needs."],
  EII: ["The Humanist", "Ethical, empathetic, drawn to depth in relationships."],
  ILI: ["The Analyst", "Theoretical, strategic, systems thinker."],
  LSI: ["The Administrator", "Methodical, dutiful, keeps order."],
  ESI: ["The Enthusiast", "Sensory, lively, enjoys life's pleasures."],
  IEI: ["The Mediator", "Idealistic, harmony-seeking, poetic."],
  LII: ["The Scientist", "Logical, curious, builds theories."],
  SLE: ["The Operator", "Energetic, pragmatic, gets things done."],
  SEE: ["The Performer", "Expressive, spontaneous, charming."],
  IEE: ["The Innovator", "Imaginative, idea-generating, optimistic."],
  ILE: ["The Critic", "Sharp, analytical, debates ideas."],
  LSE: ["The Manager", "Organized, directive, efficient."],
  ESE: ["The Ambassador", "Sociable, warm, keeps group harmony."],
  EIE: ["The Mentor", "Inspiring, emotionally intelligent leader."],
  LIE: ["The Strategist", "Bold, decisive, long-range planner."]
};

const ENNEA_INFO = {
  1: ["The Reformer", "Principled, purposeful, self-controlled; fears being corrupt."],
  2: ["The Helper", "Generous and warm; fears being unloved."],
  3: ["The Achiever", "Success-driven and adaptive; fears being worthless."],
  4: ["The Individualist", "Sensitive and expressive; fears having no identity."],
  5: ["The Investigator", "Cerebral and perceptive; fears being incompetent."],
  6: ["The Loyalist", "Committed and security-oriented; fears abandonment."],
  7: ["The Enthusiast", "Spontaneous and versatile; fears being trapped."],
  8: ["The Challenger", "Confident and decisive; fears being controlled."],
  9: ["The Peacemaker", "Receptive and reassuring; fears conflict and loss."]
};

const DISC_INFO = {
  D: ["Dominance", "Direct, results-focused, takes charge."],
  I: ["Influence", "Outgoing, enthusiastic, persuasive."],
  S: ["Steadiness", "Patient, supportive, reliable team player."],
  C: ["Conscientiousness", "Careful, accurate, quality-focused."]
};

const SLOAN_INFO = {
  R: ["Reserved", "Quiet, thoughtful, observes before acting."],
  C: ["Cautious", "Careful, risk-aware, prefers proven approaches."],
  I: ["Individualistic", "Independent, self-reliant, works alone well."],
  E: ["Expressive", "Outgoing, energetic, enjoys social interaction."],
  A: ["Adaptive", "Flexible, easygoing, adjusts quickly to change."]
};

const GROUPS = {
  mbti: ["EI", "SN", "TF", "JP"],
  at: ["AT"],
  ocean: ["O", "C", "E", "A", "N"],
  ennea: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  disc: ["D", "I", "S", "C"],
  sloan: ["R", "C", "I", "E", "A"]
};
const OCEAN_LABELS = { O: "Openness", C: "Conscientiousness", E: "Extraversion", A: "Agreeableness", N: "Neuroticism" };
const ANSWER_LABELS = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
const STORE_KEY = "allinone-personality-v1";

let answers = new Array(QUESTIONS.length).fill(null);
let idx = 0;
let reviewReturn = "start";

function computeResults(ans) {
  const acc = {};
  for (const g in GROUPS) {
    acc[g] = {};
    for (const k of GROUPS[g]) acc[g][k] = { raw: 0, pos: 0, neg: 0, list: [] };
  }
  QUESTIONS.forEach((q, i) => {
    const a = ans[i];
    if (a === null) return;
    const c = a - 3;
    for (const g in q.w) {
      for (const k in q.w[g]) {
        const w = q.w[g][k];
        acc[g][k].raw += c * w;
        if (w > 0) acc[g][k].pos += w * 2; else acc[g][k].neg += -w * 2;
        acc[g][k].list.push({ i, c: c * w });
      }
    }
  });
  const pct = (g, k) => {
    const s = acc[g][k];
    const tot = s.pos + s.neg;
    return tot === 0 ? 50 : Math.max(0, Math.min(100, 50 + (s.raw / tot) * 50));
  };
  const drivers = {};
  for (const g in GROUPS) {
    drivers[g] = {};
    for (const k of GROUPS[g]) {
      drivers[g][k] = acc[g][k].list
        .filter(x => x.c !== 0)
        .sort((a, b) => Math.abs(b.c) - Math.abs(a.c))
        .slice(0, 3)
        .map(x => x.i);
    }
  }
  const mbtiRaw = { EI: acc.mbti.EI.raw, SN: acc.mbti.SN.raw, TF: acc.mbti.TF.raw, JP: acc.mbti.JP.raw };
  const letters =
    (mbtiRaw.EI > 0 ? "E" : "I") + (mbtiRaw.SN > 0 ? "N" : "S") +
    (mbtiRaw.TF > 0 ? "F" : "T") + (mbtiRaw.JP > 0 ? "P" : "J");
  const at = acc.at.AT.raw > 0 ? "A" : "T";
  const enneaScores = {};
  for (const k of GROUPS.ennea) enneaScores[k] = pct("ennea", k);
  const enneaTop = Object.keys(enneaScores).sort((a, b) => enneaScores[b] - enneaScores[a]);
  const top = enneaTop[0];
  const wing = enneaScores[String((Number(top) % 9) + 1)] >= enneaScores[String((Number(top) + 7) % 9 + 1)] ? (Number(top) % 9) + 1 : (Number(top) + 7) % 9 + 1;
  const discScores = {}; for (const k of GROUPS.disc) discScores[k] = pct("disc", k);
  const sloanScores = {}; for (const k of GROUPS.sloan) sloanScores[k] = pct("sloan", k);
  const oceanScores = {}; for (const k of GROUPS.ocean) oceanScores[k] = pct("ocean", k);
  const topOf = (o) => Object.keys(o).sort((a, b) => o[b] - o[a])[0];
  return {
    mbti: { letters, at, type: letters + "-" + at, info: MBTI_INFO[letters], dich: { EI: pct("mbti", "EI"), SN: pct("mbti", "SN"), TF: pct("mbti", "TF"), JP: pct("mbti", "JP") } },
    ocean: oceanScores,
    ennea: { scores: enneaScores, top, wing, top3: enneaTop.slice(0, 3) },
    soc: { code: SOC_MAP[letters], info: SOC_INFO[SOC_MAP[letters]] },
    disc: { scores: discScores, top: topOf(discScores) },
    sloan: { scores: sloanScores, top: topOf(sloanScores) },
    drivers
  };
}

function computeOverview(r) {
  const p = (v) => Math.round(v) + "%";
  const ranked = Object.keys(r.ocean).sort((a, b) => r.ocean[b] - r.ocean[a]);
  const top = ranked[0], low = ranked[ranked.length - 1];
  const e = r.mbti.letters[0] === "E";
  const open = r.ocean.O >= 60;
  const archetype = e && open ? "an idea-driven collaborator" : e ? "a practical networker" : open ? "a reflective innovator" : "a steady specialist";
  return `You come across as ${r.mbti.type} (${r.mbti.info[0]}), motivated by Enneagram ${r.ennea.top}w${r.ennea.wing} (${ENNEA_INFO[r.ennea.top][0]}), with a ${DISC_INFO[r.disc.top][0]} workplace style and a ${SLOAN_INFO[r.sloan.top][0]} team profile. ` +
    `Your standout Big Five trait is ${OCEAN_LABELS[top]} (${p(r.ocean[top])}) and your lowest is ${OCEAN_LABELS[low]} (${p(r.ocean[low])}) — overall, ${archetype}.`;
}

function computeSwot(r) {
  const p = (v) => Math.round(v) + "%";
  const hi = (v) => v >= 65, lo = (v) => v <= 35;
  const o = r.ocean, d = r.disc.scores, sl = r.sloan.scores, en = r.ennea.scores;
  const strengths = [
    { s: hi(o.E) ? o.E : 0, t: "Social energy & influence", d: `Extraversion ${p(o.E)} and DISC ${r.disc.top} ${p(d[r.disc.top])} — you energize groups and speak up.` },
    { s: hi(o.C) ? o.C : 0, t: "Reliability & discipline", d: `Conscientiousness ${p(o.C)} — others can count on you to follow through.` },
    { s: hi(o.O) ? o.O : 0, t: "Creativity & openness", d: `Openness ${p(o.O)} — you generate ideas and embrace the unconventional.` },
    { s: hi(o.A) ? o.A : 0, t: "Empathy & collaboration", d: `Agreeableness ${p(o.A)} — you build trust and keep harmony.` },
    { s: lo(o.N) ? 100 - o.N : 0, t: "Emotional stability", d: `Neuroticism ${p(o.N)} — you stay calm under pressure.` },
    { s: hi(d.D) ? d.D : 0, t: "Decisiveness", d: `DISC Dominance ${p(d.D)} — you take charge and drive outcomes.` },
    { s: hi(sl.E) ? sl.E : 0, t: "Expressive communication", d: `SLOAN Expressive ${p(sl.E)} — you share enthusiasm openly.` },
    { s: hi(en[3]) ? en[3] : 0, t: "Drive for achievement", d: `Enneagram 3 ${p(en[3])} — you set goals and deliver results.` }
  ];
  const weaknesses = [
    { s: hi(o.N) ? o.N : 0, t: "Stress sensitivity", d: `Neuroticism ${p(o.N)} — pressure and uncertainty can rattle you.` },
    { s: lo(o.C) ? 100 - o.C : 0, t: "Follow-through risk", d: `Conscientiousness ${p(o.C)} — boring or open-ended tasks may slip.` },
    { s: lo(o.A) ? 100 - o.A : 0, t: "Bluntness in feedback", d: `Agreeableness ${p(o.A)} — directness can read as harsh.` },
    { s: lo(o.O) ? 100 - o.O : 0, t: "Resistance to change", d: `Openness ${p(o.O)} — new or vague approaches may frustrate you.` },
    { s: hi(d.D) && lo(o.A) ? d.D : 0, t: "Can dominate discussions", d: `DISC D ${p(d.D)} with low agreeableness — you may override quieter voices.` },
    { s: lo(o.E) ? 100 - o.E : 0, t: "Under-communicates in groups", d: `Extraversion ${p(o.E)} — your contributions may go unheard in big meetings.` },
    { s: hi(en[6]) ? en[6] : 0, t: "Overthinking worst cases", d: `Enneagram 6 ${p(en[6])} — you may dwell on what could go wrong.` }
  ];
  const opportunities = [
    { s: hi(o.O) && hi(o.E) ? Math.min(o.O, o.E) : 0, t: "Innovation & brainstorming roles", d: `Openness ${p(o.O)} + Extraversion ${p(o.E)} — you thrive where new ideas are welcome.` },
    { s: hi(o.A) && hi(o.E) ? Math.min(o.A, o.E) : 0, t: "Mentoring & community roles", d: `Agreeableness ${p(o.A)} + Extraversion ${p(o.E)} — a natural fit for coaching and teamwork.` },
    { s: hi(o.C) && hi(o.O) ? Math.min(o.C, o.O) : 0, t: "Structured innovation", d: `Conscientiousness ${p(o.C)} + Openness ${p(o.O)} — you can turn ideas into working systems.` },
    { s: hi(sl.A) ? sl.A : 0, t: "Adaptable in changing environments", d: `SLOAN Adaptive ${p(sl.A)} — change is an opportunity, not a threat.` },
    { s: hi(en[7]) ? en[7] : 0, t: "Exploring new ventures", d: `Enneagram 7 ${p(en[7])} — variety and novelty keep you engaged.` },
    { s: hi(d.I) ? d.I : 0, t: "Persuasive, client-facing work", d: `DISC Influence ${p(d.I)} — you can rally others around a vision.` }
  ];
  const threats = [
    { s: hi(o.N) ? o.N : 0, t: "Burnout under sustained pressure", d: `Neuroticism ${p(o.N)} — watch workload and recovery.` },
    { s: lo(o.C) && hi(o.N) ? Math.min(100 - o.C, o.N) : 0, t: "Deadlines slip when stressed", d: `Conscientiousness ${p(o.C)} with Neuroticism ${p(o.N)} — stress can derail plans.` },
    { s: hi(d.D) && lo(d.S) ? Math.min(d.D, 100 - d.S) : 0, t: "Friction with collaborative cultures", d: `D ${p(d.D)} vs S ${p(d.S)} — a pace-first style may clash with team-first teams.` },
    { s: lo(o.O) && hi(o.C) ? Math.min(100 - o.O, o.C) : 0, t: "Entrenchment in proven methods", d: `Openness ${p(o.O)} with Conscientiousness ${p(o.C)} — you may resist new tools.` },
    { s: hi(en[6]) ? en[6] : 0, t: "Needs reassurance in uncertainty", d: `Enneagram 6 ${p(en[6])} — ambiguous situations may drain you.` },
    { s: lo(o.E) && hi(sl.I) ? Math.min(100 - o.E, sl.I) : 0, t: "Visibility risk in large organizations", d: `Extraversion ${p(o.E)}, SLOAN Individualistic ${p(sl.I)} — your work may stay invisible.` }
  ];
  const pick = (list) => {
    const items = list.filter(x => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 3)
      .map(({ t, d }) => ({ title: t, detail: d }));
    return items.length ? items : [{ title: "Balanced profile", detail: "No extreme scores — nothing dominates this quadrant." }];
  };
  return { strengths: pick(strengths), weaknesses: pick(weaknesses), opportunities: pick(opportunities), threats: pick(threats) };
}

function encodeAnswers(ans) {
  return btoa(ans.map(a => (a === null ? 0 : a)).join(""));
}
function decodeAnswers(s) {
  if (typeof s !== "string" || !s) return null;
  let raw;
  try { raw = atob(s); } catch (e) { return null; }
  if (!/^[0-5]+$/.test(raw) || raw.length !== QUESTIONS.length) return null;
  return [...raw].map(ch => { const n = Number(ch); return n === 0 ? null : n; });
}

function summaryText(r) {
  const sw = computeSwot(r);
  const titles = (q) => sw[q].map(i => i.title).join("; ");
  return [
    "All-in-One Personality Test — results",
    `MBTI: ${r.mbti.type} (${r.mbti.info[0]})`,
    `Socionics: ${r.soc.code} — ${r.soc.info[0]}`,
    `Enneagram: ${r.ennea.top}w${r.ennea.wing} — ${ENNEA_INFO[r.ennea.top][0]}`,
    `DISC: ${r.disc.top} — ${DISC_INFO[r.disc.top][0]}`,
    `SLOAN: ${r.sloan.top} — ${SLOAN_INFO[r.sloan.top][0]}`,
    "OCEAN: " + GROUPS.ocean.map(k => `${k} ${r.ocean[k].toFixed(0)}%`).join(", "),
    "Overview: " + computeOverview(r),
    `SWOT — Strengths: ${titles("strengths")} | Weaknesses: ${titles("weaknesses")} | Opportunities: ${titles("opportunities")} | Threats: ${titles("threats")}`
  ].join("\n");
}

function barRow(label, p, cls) {
  return `<div class="bar-row"><span>${label}</span><div class="bar ${cls || ""}"><div data-w="${p.toFixed(1)}"></div></div><span>${p.toFixed(0)}%</span></div>`;
}

function focusTop() {
  const el = document.querySelector("#app h1, #app .qtext");
  if (el) { el.tabIndex = -1; el.focus({ preventScroll: true }); }
}

function renderStart() {
  history.replaceState(null, "", location.pathname + location.search + location.hash);
  const saved = answers.some(a => a !== null);
  document.getElementById("app").innerHTML = `
    <div class="hero">
      <span class="emoji" aria-hidden="true">🧠</span>
      <h1>All-in-One Personality Test</h1>
      <p class="muted" style="margin-top:8px">Answer ${QUESTIONS.length} questions once — get results for all six models at the same time.</p>
    </div>
    <div class="card">
      <h2>What You'll Get</h2>
      <div class="models">
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🧭</span><span translate="no">MBTI ×32</span></b>16 types + Assertive/Turbulent (e.g. ESFJ-A)</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🌊</span><span translate="no">Big Five (OCEAN)</span></b>5 trait scores as percentages</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🔢</span><span translate="no">Enneagram</span></b>9 types with wing (e.g. 4w5)</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🤝</span><span translate="no">Socionics</span></b>16 types derived from your MBTI</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">💼</span><span translate="no">DISC</span></b>4 workplace styles</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🧩</span><span translate="no">SLOAN / RCIE</span></b>5 team-profile styles</div>
      </div>
      <div class="btnrow">
        <button class="btn" id="startBtn">${saved ? "View Results" : "Start Quiz"} (${QUESTIONS.length} questions)</button>
        ${saved ? '<button class="btn ghost" id="resetBtn">Reset</button>' : ""}
        <label class="btn ghost" for="importFile" style="margin:0">⬆ Import JSON<input type="file" id="importFile" name="import" accept="application/json,.json" hidden></label>
      </div>
      <p class="kbd center">Tip: use keys 1–5 to answer, Backspace to go back. Answers auto-save in this browser.</p>
    </div>`;
  document.getElementById("startBtn").onclick = () => {
    if (saved && answers.every(a => a !== null)) { renderResults(); return; }
    const qp = Number(new URLSearchParams(location.search).get("q"));
    idx = Number.isInteger(qp) && qp >= 1 && qp <= QUESTIONS.length ? qp - 1 : answers.findIndex(a => a === null);
    if (idx === -1) idx = 0;
    renderQuestion();
  };
  const rb = document.getElementById("resetBtn");
  if (rb) rb.onclick = () => { if (confirm("Clear saved answers and reset the quiz?")) { answers = new Array(QUESTIONS.length).fill(null); localStorage.removeItem(STORE_KEY); renderStart(); } };
  document.getElementById("importFile").addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const d = JSON.parse(rd.result);
        const arr = Array.isArray(d) ? d : d.answers;
        if (Array.isArray(arr) && arr.length === QUESTIONS.length && arr.every(v => v === null || (Number.isInteger(v) && v >= 1 && v <= 5))) {
          answers = arr.map(v => (v === null ? null : v));
          save();
          renderStart();
        } else {
          alert(`Invalid file: expected an answers array of length ${QUESTIONS.length} with values 1–5.`);
        }
      } catch (err) {
        alert("Could not parse that file as JSON.");
      }
      e.target.value = "";
    };
    rd.readAsText(f);
  });
  focusTop();
}

function renderQuestion() {
  const q = QUESTIONS[idx];
  const p = ((idx + 1) / QUESTIONS.length) * 100;
  history.replaceState(null, "", "?q=" + (idx + 1));
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h1 class="sr-only">Question ${idx + 1} of ${QUESTIONS.length}</h1>
      <div class="muted">Question ${idx + 1} / ${QUESTIONS.length} · ${answers.filter(a => a !== null).length} answered</div>
      <progress class="progress" max="${QUESTIONS.length}" value="${idx + 1}" aria-label="Quiz progress: question ${idx + 1} of ${QUESTIONS.length}"></progress>
      <div class="qtext">${q.q}</div>
      <div class="answers">
        ${ANSWER_LABELS.map((l, i) => `<button class="ans ${answers[idx] === i + 1 ? "selected" : ""}" data-v="${i + 1}">${i + 1}<small>${l}</small></button>`).join("")}
      </div>
      <div class="navrow">
        <button class="btn ghost" id="backBtn" ${idx === 0 ? "disabled" : ""}>← Back</button>
        <span style="display:flex;gap:10px">
          <button class="btn ghost" id="reviewBtn">☰ All questions</button>
          <button class="btn secondary" id="skipBtn">Skip</button>
        </span>
      </div>
      <p class="kbd">Keys 1–5 = answer · Backspace = back</p>
    </div>`;
  document.querySelectorAll(".ans").forEach(b => b.onclick = () => answer(Number(b.dataset.v)));
  document.getElementById("backBtn").onclick = () => { if (idx > 0) { idx--; renderQuestion(); } };
  document.getElementById("skipBtn").onclick = () => advance();
  document.getElementById("reviewBtn").onclick = () => { reviewReturn = "question"; renderReview(); };
  focusTop();
}

function renderReview() {
  const answered = answers.filter(a => a !== null).length;
  const rows = QUESTIONS.map((q, i) => {
    const a = answers[i];
    return `<button class="rev-row${a === null ? "" : " answered"}" data-i="${i}">
      <span class="rev-num">${i + 1}</span>
      <span class="rev-q">${q.q}</span>
      <span class="rev-a">${a === null ? "— skipped" : a + " · " + ANSWER_LABELS[a - 1]}</span>
    </button>`;
  }).join("");
  document.getElementById("app").innerHTML = `
    <div class="card">
      <h1>Review Answers</h1>
      <p class="muted" style="margin:6px 0 14px">${answered} of ${QUESTIONS.length} answered — tap a question to change it.</p>
      <div class="rev-list">${rows}</div>
      <div class="navrow">
        <button class="btn ghost" id="backBtn">← Back</button>
        <button class="btn" id="resultsBtn">View Results →</button>
      </div>
    </div>`;
  document.querySelectorAll(".rev-row").forEach(b => b.onclick = () => { idx = Number(b.dataset.i); renderQuestion(); });
  document.getElementById("backBtn").onclick = () => { if (reviewReturn === "results") renderResults(); else renderQuestion(); };
  document.getElementById("resultsBtn").onclick = () => renderResults();
  focusTop();
}

function answer(v) {
  answers[idx] = v;
  save();
  advance();
}
function advance() {
  if (idx < QUESTIONS.length - 1) { idx++; renderQuestion(); }
  else renderResults();
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(answers)); }

function renderResults() {
  history.replaceState(null, "", "#a=" + encodeAnswers(answers));
  const r = computeResults(answers);
  const answered = answers.filter(a => a !== null).length;
  const drv = (g, keys) => {
    const set = new Set();
    keys.forEach(k => (r.drivers[g][k] || []).forEach(i => set.add(i)));
    const ids = [...set].sort((a, b) => a - b).slice(0, 3);
    if (!ids.length) return "";
    const items = ids.map(i => `<li><b>Q${i + 1}</b> — ${QUESTIONS[i].q}</li>`).join("");
    return `<details class="drivers"><summary>Driven by ${ids.map(i => "Q" + (i + 1)).join(" · ")} — tap to see the questions</summary><ul>${items}</ul></details>`;
  };
  const enneaTop3 = r.ennea.top3.map(k => barRow(`${k} — ${ENNEA_INFO[k][0]}`, r.ennea.scores[k], "pct")).join("");
  const discBars = GROUPS.disc.map(k => barRow(`${k} — ${DISC_INFO[k][0]}`, r.disc.scores[k], "pct")).join("");
  const sloanBars = GROUPS.sloan.map(k => barRow(`${k} — ${SLOAN_INFO[k][0]}`, r.sloan.scores[k], "pct")).join("");
  const oceanBars = GROUPS.ocean.map(k => barRow(OCEAN_LABELS[k], r.ocean[k], "pct")).join("");
  const dichBars = [
    barRow("E ←→ I", r.mbti.dich.EI), barRow("N ←→ S", r.mbti.dich.SN),
    barRow("F ←→ T", r.mbti.dich.TF), barRow("P ←→ J", r.mbti.dich.JP)
  ].join("");
  const oceanTop = Object.keys(r.ocean).sort((a, b) => r.ocean[b] - r.ocean[a])[0];
  const overview = computeOverview(r);
  const swot = computeSwot(r);
  const quad = (cls, icon, title, items) => `<div class="swot ${cls}"><h3><span aria-hidden="true">${icon}</span> ${title}</h3><ul>${items.map(i => `<li><b>${i.title}</b><span>${i.detail}</span></li>`).join("")}</ul></div>`;
  document.getElementById("app").innerHTML = `
    <div class="hero">
      <span class="emoji" aria-hidden="true">🎉</span>
      <h1>Your Results</h1>
      <p class="muted" style="margin-top:6px">All six models from one quiz · based on ${answered}/${QUESTIONS.length} answers${answered < QUESTIONS.length ? " (some skipped)" : ""}</p>
    </div>
    <div class="card center">
      <div class="bigtype" translate="no">${r.mbti.type}</div>
      <h2 style="margin-top:6px">${r.mbti.info[0]}</h2>
      <p class="muted">${r.mbti.info[1]}</p>
      <div style="margin-top:10px">
        <span class="tag">Socionics: <span translate="no">${r.soc.code}</span> — ${r.soc.info[0]}</span>
        <span class="tag">Enneagram: <span translate="no">${r.ennea.top}w${r.ennea.wing}</span> — ${ENNEA_INFO[r.ennea.top][0]}</span>
        <span class="tag">DISC: <span translate="no">${r.disc.top}</span> — ${DISC_INFO[r.disc.top][0]}</span>
        <span class="tag">SLOAN: <span translate="no">${r.sloan.top}</span> — ${SLOAN_INFO[r.sloan.top][0]}</span>
      </div>
    </div>
    <div class="card">
      <h2>Overview</h2>
      <p>${overview}</p>
      <h2 style="margin-top:16px">SWOT Snapshot</h2>
      <p class="muted" style="font-size:.82rem;margin-bottom:6px">Internal factors on top, external below · helpful left, harmful right. Derived from your six model scores.</p>
      <div class="swot-matrix">
        <div class="swot-corner" aria-hidden="true"></div>
        <div class="swot-axis">Helpful</div>
        <div class="swot-axis">Harmful</div>
        <div class="swot-axis">Internal</div>
        ${quad("s", "💪", "Strengths", swot.strengths)}
        ${quad("w", "⚠️", "Weaknesses", swot.weaknesses)}
        <div class="swot-axis">External</div>
        ${quad("o", "🚀", "Opportunities", swot.opportunities)}
        ${quad("t", "⚡", "Threats", swot.threats)}
      </div>
    </div>
    <div class="result-grid">
      <div class="card"><h2><span translate="no">MBTI</span> — ${r.mbti.letters} (${r.mbti.at === "A" ? "Assertive" : "Turbulent"})</h2>${dichBars}${drv("mbti", GROUPS.mbti)}</div>
      <div class="card"><h2><span translate="no">Big Five (OCEAN)</span></h2>${oceanBars}${drv("ocean", [oceanTop])}</div>
      <div class="card"><h2><span translate="no">Enneagram</span> — top: ${r.ennea.top}w${r.ennea.wing} (${ENNEA_INFO[r.ennea.top][0]})</h2><p class="muted" style="margin-bottom:8px">${ENNEA_INFO[r.ennea.top][1]}</p>${enneaTop3}${drv("ennea", [r.ennea.top])}</div>
      <div class="card"><h2><span translate="no">Socionics</span> — ${r.soc.code} (${r.soc.info[0]})</h2><p class="muted">${r.soc.info[1]} Derived from MBTI ${r.mbti.letters}.</p></div>
      <div class="card"><h2><span translate="no">DISC</span> — primary: ${r.disc.top} (${DISC_INFO[r.disc.top][0]})</h2><p class="muted" style="margin-bottom:8px">${DISC_INFO[r.disc.top][1]}</p>${discBars}${drv("disc", [r.disc.top])}</div>
      <div class="card"><h2><span translate="no">SLOAN / RCIE</span> — primary: ${r.sloan.top} (${SLOAN_INFO[r.sloan.top][0]})</h2><p class="muted" style="margin-bottom:8px">${SLOAN_INFO[r.sloan.top][1]}</p>${sloanBars}${drv("sloan", [r.sloan.top])}</div>
    </div>
    <div class="btnrow">
      <button class="btn" id="againBtn">↻ Retake Quiz</button>
      <button class="btn secondary" id="reviewBtn">📝 Review Answers</button>
      <button class="btn secondary" id="copyLinkBtn">🔗 Copy Link</button>
      <button class="btn secondary" id="copySumBtn">📋 Copy Summary</button>
      <button class="btn secondary" id="exportBtn">⬇ Export JSON</button>
      <button class="btn secondary" id="printBtn">🖨 Print</button>
    </div>`;
  requestAnimationFrame(() => {
    document.querySelectorAll(".bar > div").forEach(d => { d.style.width = d.dataset.w + "%"; });
  });
  document.getElementById("againBtn").onclick = () => { if (confirm("Retake the quiz? Your saved answers will be cleared.")) { answers = new Array(QUESTIONS.length).fill(null); idx = 0; localStorage.removeItem(STORE_KEY); renderStart(); } };
  const flash = (btn, msg) => { const t = btn.textContent; btn.textContent = msg; setTimeout(() => { btn.textContent = t; }, 1500); };
  const legacyCopy = (txt) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch (e) { return false; }
  };
  const copyText = (txt, btn) => {
    const done = () => flash(btn, "Copied ✓");
    const fail = () => flash(btn, "Copy failed");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => legacyCopy(txt) ? done() : fail());
    else legacyCopy(txt) ? done() : fail();
  };
  document.getElementById("copyLinkBtn").onclick = (e) => copyText(location.href, e.target);
  document.getElementById("copySumBtn").onclick = (e) => copyText(summaryText(r), e.target);
  document.getElementById("reviewBtn").onclick = () => { reviewReturn = "results"; renderReview(); };
  document.getElementById("printBtn").onclick = () => window.print();
  document.getElementById("exportBtn").onclick = () => {
    const data = { date: new Date().toISOString(), answers, results: r, overview, swot, summary: summaryText(r) };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "personality-results.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  focusTop();
}

function init() {
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const screen = document.querySelector(".qtext") ? "quiz" : (document.querySelector(".bigtype") ? "results" : "start");
    if (screen === "quiz") {
      if (["1", "2", "3", "4", "5"].includes(e.key)) answer(Number(e.key));
      if (e.key === "Backspace") { e.preventDefault(); if (idx > 0) { idx--; renderQuestion(); } }
    }
  });
  const shared = decodeAnswers(new URLSearchParams(location.hash.slice(1)).get("a") || "");
  if (shared && shared.some(a => a !== null)) {
    answers = shared;
  } else {
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) { try { const a = JSON.parse(saved); if (Array.isArray(a) && a.length === QUESTIONS.length) answers = a; } catch (e) {} }
  }
  renderStart();
}

if (typeof document !== "undefined") init();
if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTIONS, GROUPS, computeResults, computeOverview, computeSwot, encodeAnswers, decodeAnswers, summaryText };
}
