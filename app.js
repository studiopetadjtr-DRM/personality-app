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

/* SWOT rules. Each rule maps one scored dimension to a quadrant.
   dir: "high" fires when the dimension scores >= 60, "low" when <= 40,
   "top" fires for the model's primary type. {v} is replaced by the score. */
const SWOT_RULES = [
  /* ---- Strengths: internal, helpful ---- */
  { id: "s-ocean-o", dim: "ocean", key: "O", dir: "high", q: "strengths", title: "Open to new ideas", detail: "Openness {v}% — you actively seek unfamiliar angles and enjoy exploring possibilities.", action: "Give one project a month a deliberately unfamiliar brief." },
  { id: "s-ocean-c", dim: "ocean", key: "C", dir: "high", q: "strengths", title: "Reliable and organized", detail: "Conscientiousness {v}% — you plan, follow through, and finish what you start.", action: "Own one recurring process end to end and document it." },
  { id: "s-ocean-e", dim: "ocean", key: "E", dir: "high", q: "strengths", title: "Energized by people", detail: "Extraversion {v}% — social contact gives you energy instead of draining it.", action: "Put yourself in the room where decisions actually get made." },
  { id: "s-ocean-a", dim: "ocean", key: "A", dir: "high", q: "strengths", title: "Cooperative and empathetic", detail: "Agreeableness {v}% — you read people well and build trust quickly.", action: "Be the person who checks in on the people nobody asks about." },
  { id: "s-ocean-n", dim: "ocean", key: "N", dir: "low", q: "strengths", title: "Steady under pressure", detail: "Neuroticism {v}% — low reactivity means you stay composed when things go wrong.", action: "Take the high-stakes task other people are avoiding." },
  { id: "s-disc-d", dim: "disc", key: "D", dir: "top", q: "strengths", title: "Decisive and results-focused", detail: "Your primary DISC style is D — you move fast and own the outcome.", action: "Lead the stalled initiative nobody wants to touch." },
  { id: "s-disc-i", dim: "disc", key: "I", dir: "top", q: "strengths", title: "Persuasive and enthusiastic", detail: "Your primary DISC style is I — you energize people and sell ideas.", action: "Represent the idea in the room where it needs a champion." },
  { id: "s-disc-s", dim: "disc", key: "S", dir: "top", q: "strengths", title: "Patient and supportive", detail: "Your primary DISC style is S — you steady the team and keep trust.", action: "Be the steady hand on a team that changes direction often." },
  { id: "s-disc-c", dim: "disc", key: "C", dir: "top", q: "strengths", title: "Accurate and quality-focused", detail: "Your primary DISC style is C — you catch errors and protect standards.", action: "Own the quality bar on one deliverable everyone else rushes." },
  { id: "s-sloan-r", dim: "sloan", key: "R", dir: "top", q: "strengths", title: "Observant and thoughtful", detail: "Your SLOAN profile is R — you think before you act and notice what others miss.", action: "Write up the pattern you keep noticing but nobody has written down." },
  { id: "s-sloan-c", dim: "sloan", key: "C", dir: "top", q: "strengths", title: "Risk-aware and careful", detail: "Your SLOAN profile is C — you spot hazards early and prefer proven routes.", action: "Take the role that reviews risk before it becomes a problem." },
  { id: "s-sloan-i", dim: "sloan", key: "I", dir: "top", q: "strengths", title: "Independent and self-reliant", detail: "Your SLOAN profile is I — you do your best work without supervision.", action: "Claim a piece of work that needs deep, uninterrupted focus." },
  { id: "s-sloan-e", dim: "sloan", key: "E", dir: "top", q: "strengths", title: "Outgoing and energetic", detail: "Your SLOAN profile is E — you bring energy and presence to a room.", action: "Host the gathering instead of attending it." },
  { id: "s-sloan-a", dim: "sloan", key: "A", dir: "top", q: "strengths", title: "Flexible and adaptable", detail: "Your SLOAN profile is A — you adjust quickly when plans change.", action: "Be the person who keeps a shifting project moving." },
  { id: "s-mbti-n", dim: "mbti", key: "N", dir: "high", q: "strengths", title: "Sees patterns and possibilities", detail: "Intuition {v}% — you connect ideas that look unrelated.", action: "Spend an hour mapping a problem you have not solved yet." },
  { id: "s-mbti-s", dim: "mbti", key: "S", dir: "high", q: "strengths", title: "Practical and concrete", detail: "Sensing {v}% — you prefer what works over what sounds good.", action: "Turn one abstract debate into a testable next step." },
  { id: "s-mbti-t", dim: "mbti", key: "T", dir: "high", q: "strengths", title: "Logical and objective", detail: "Thinking {v}% — you reason through decisions without sentiment.", action: "Bring the decision criteria to a conversation that is drifting." },
  { id: "s-mbti-f", dim: "mbti", key: "F", dir: "high", q: "strengths", title: "People-centered judgment", detail: "Feeling {v}% — you weigh decisions by their effect on people.", action: "Name the human cost of a decision before it is made." },
  { id: "s-mbti-j", dim: "mbti", key: "J", dir: "high", q: "strengths", title: "Plans and closes", detail: "Judging {v}% — you like a clear finish line and a schedule.", action: "Set the deadline and the definition of done for one project." },
  { id: "s-mbti-p", dim: "mbti", key: "P", dir: "high", q: "strengths", title: "Flexible and open", detail: "Perceiving {v}% — you keep options alive and adapt quickly.", action: "Keep one decision deliberately open longer than feels comfortable." },
  { id: "s-mbti-e", dim: "mbti", key: "E", dir: "high", q: "strengths", title: "Natural initiator", detail: "Extraversion {v}% — you start things without waiting to be asked.", action: "Open the meeting with the proposal instead of waiting for consensus." },
  { id: "s-mbti-i", dim: "mbti", key: "I", dir: "high", q: "strengths", title: "Independent and deep", detail: "Introversion {v}% — you do your sharpest thinking alone.", action: "Protect two hours a week of uninterrupted thinking time." },
  { id: "s-en-1", dim: "ennea", key: "1", dir: "top", q: "strengths", title: "Principled and purposeful", detail: "Type 1 — you hold a clear standard and act on it.", action: "Set the standard once, in writing, so it stops being personal." },
  { id: "s-en-2", dim: "ennea", key: "2", dir: "top", q: "strengths", title: "Generous and attentive", detail: "Type 2 — you notice what people need before they ask.", action: "Ask for one thing you need, without over-explaining." },
  { id: "s-en-3", dim: "ennea", key: "3", dir: "top", q: "strengths", title: "Adaptive and goal-driven", detail: "Type 3 — you adapt and drive toward visible results.", action: "Define success once, then protect the focus that gets you there." },
  { id: "s-en-4", dim: "ennea", key: "4", dir: "top", q: "strengths", title: "Expressive and authentic", detail: "Type 4 — you bring a distinct, honest point of view.", action: "Turn one personal insight into something other people can use." },
  { id: "s-en-5", dim: "ennea", key: "5", dir: "top", q: "strengths", title: "Perceptive and cerebral", detail: "Type 5 — you see what most people miss and think it through.", action: "Publish one piece of analysis instead of hoarding it." },
  { id: "s-en-6", dim: "ennea", key: "6", dir: "top", q: "strengths", title: "Committed and dependable", detail: "Type 6 — you commit hard and make other people feel safe.", action: "Name the worst case once, then commit to a plan." },
  { id: "s-en-7", dim: "ennea", key: "7", dir: "top", q: "strengths", title: "Versatile and optimistic", detail: "Type 7 — you stay flexible and keep options alive.", action: "Finish one thing this month before starting the next." },
  { id: "s-en-8", dim: "ennea", key: "8", dir: "top", q: "strengths", title: "Confident and decisive", detail: "Type 8 — you hold your nerve when the pressure is on.", action: "Use your directness to unblock a decision, not to win an argument." },
  { id: "s-en-9", dim: "ennea", key: "9", dir: "top", q: "strengths", title: "Receptive and reassuring", detail: "Type 9 — you listen well and keep teams calm.", action: "State your own preference first, before the group does." },

  /* ---- Weaknesses: internal, harmful ---- */
  { id: "w-ocean-o", dim: "ocean", key: "O", dir: "low", q: "weaknesses", title: "Prefers proven ground", detail: "Openness {v}% — low curiosity about novelty means unfamiliar methods feel like friction.", action: "Try one new tool or process for a month before judging it." },
  { id: "w-ocean-c", dim: "ocean", key: "C", dir: "low", q: "weaknesses", title: "Follow-through can slip", detail: "Conscientiousness {v}% — low structure means tasks drift when nobody is watching.", action: "Use a visible checklist and a weekly review to close open loops." },
  { id: "w-ocean-e", dim: "ocean", key: "E", dir: "low", q: "weaknesses", title: "Works best alone", detail: "Extraversion {v}% — long stretches of social work drain you.", action: "Batch your meetings and protect two solo blocks a week." },
  { id: "w-ocean-a", dim: "ocean", key: "A", dir: "low", q: "weaknesses", title: "Direct and skeptical", detail: "Agreeableness {v}% — low accommodation means you can come across as blunt.", action: "Lead with the intent before the critique." },
  { id: "w-ocean-n", dim: "ocean", key: "N", dir: "high", q: "weaknesses", title: "Stress-sensitive", detail: "Neuroticism {v}% — pressure pulls attention away from the work itself.", action: "Name the pressure early and split the load before it peaks." },
  { id: "w-mbti-i", dim: "mbti", key: "I", dir: "high", q: "weaknesses", title: "Ideas stay internal", detail: "Introversion {v}% — your best thinking can stay private.", action: "Share one unfinished idea a week with someone who can build on it." },
  { id: "w-mbti-p", dim: "mbti", key: "P", dir: "high", q: "weaknesses", title: "Open loops accumulate", detail: "Perceiving {v}% — new options can outnumber finished work.", action: "Cap active projects at three and archive the rest." },
  { id: "w-mbti-t", dim: "mbti", key: "T", dir: "high", q: "weaknesses", title: "Logic can outrun people", detail: "Thinking {v}% — the right answer can land as a cold one.", action: "Explain the reasoning before you present the conclusion." },
  { id: "w-mbti-s", dim: "mbti", key: "S", dir: "high", q: "weaknesses", title: "Misses what is unsaid", detail: "Sensing {v}% — you notice the facts, not always the subtext.", action: "Ask one open question when a conversation feels off." },
  { id: "w-mbti-e", dim: "mbti", key: "E", dir: "high", q: "weaknesses", title: "Can crowd the room", detail: "Extraversion {v}% — your energy can take over the discussion.", action: "Invite the quietest person in before you add your point." },
  { id: "w-mbti-j", dim: "mbti", key: "J", dir: "high", q: "weaknesses", title: "Closes too early", detail: "Judging {v}% — a decided plan can harden before it is tested.", action: "Run one decision past a deliberate stress test." },
  { id: "w-mbti-f", dim: "mbti", key: "F", dir: "high", q: "weaknesses", title: "Agreement can cost clarity", detail: "Feeling {v}% — harmony can blur the hard message.", action: "State the disagreement once, clearly, then move on." },
  { id: "w-en-1", dim: "ennea", key: "1", dir: "top", q: "weaknesses", title: "Self-critical and rigid", detail: "Type 1 — the standard you hold others can become the standard you hold yourself.", action: "Separate the standard from your self-worth before you enforce it." },
  { id: "w-en-2", dim: "ennea", key: "2", dir: "top", q: "weaknesses", title: "Overextends for others", detail: "Type 2 — you give more than you ask for and notice late.", action: "Cap the help you give this month and watch what happens." },
  { id: "w-en-3", dim: "ennea", key: "3", dir: "top", q: "weaknesses", title: "Impatient with slow progress", detail: "Type 3 — progress that is not visible can read as no progress.", action: "Measure one slow-moving project by a metric nobody else sees." },
  { id: "w-en-4", dim: "ennea", key: "4", dir: "top", q: "weaknesses", title: "Mood-driven consistency", detail: "Type 4 — output can track your mood more than your plan.", action: "Build a routine that survives a bad day." },
  { id: "w-en-5", dim: "ennea", key: "5", dir: "top", q: "weaknesses", title: "Withdraws instead of asking", detail: "Type 5 — you research the problem instead of requesting what you need.", action: "Ask one direct question this week instead of researching it." },
  { id: "w-en-6", dim: "ennea", key: "6", dir: "top", q: "weaknesses", title: "Doubt stalls decisions", detail: "Type 6 — you can hold a decision open long past the point of usefulness.", action: "Set a decision deadline and honour it." },
  { id: "w-en-7", dim: "ennea", key: "7", dir: "top", q: "weaknesses", title: "Avoids hard endings", detail: "Type 7 — the closing step is the one you keep deferring.", action: "Close one open loop before opening another." },
  { id: "w-en-8", dim: "ennea", key: "8", dir: "top", q: "weaknesses", title: "Can dominate the room", detail: "Type 8 — your force can steamroll quieter views.", action: "Ask the last person to speak before you respond." },
  { id: "w-en-9", dim: "ennea", key: "9", dir: "top", q: "weaknesses", title: "Avoids necessary conflict", detail: "Type 9 — the disagreement stays unspoken until it becomes resentment.", action: "Raise one disagreement while it is still small." },

  /* ---- Opportunities: external, helpful ---- */
  { id: "o-ocean-e", dim: "ocean", key: "E", dir: "high", q: "opportunities", title: "Lead people-facing work", detail: "Extraversion {v}% — client, team, and community roles are where you perform best.", action: "Take the role that puts you in front of people." },
  { id: "o-ocean-o", dim: "ocean", key: "O", dir: "high", q: "opportunities", title: "Prototype the unfamiliar", detail: "Openness {v}% — you are the person who tests new tools and ideas early.", action: "Run one small experiment instead of waiting for consensus." },
  { id: "o-ocean-c", dim: "ocean", key: "C", dir: "high", q: "opportunities", title: "Own a system or process", detail: "Conscientiousness {v}% — quality and deadline ownership is yours to claim.", action: "Volunteer to own the process everyone else complains about." },
  { id: "o-ocean-a", dim: "ocean", key: "A", dir: "high", q: "opportunities", title: "Mediate and mentor", detail: "Agreeableness {v}% — people bring their conflicts to you first.", action: "Offer to facilitate one meeting that keeps stalling." },
  { id: "o-ocean-n", dim: "ocean", key: "N", dir: "low", q: "opportunities", title: "Take the high-stakes seat", detail: "Neuroticism {v}% — emotional steadiness lets you work where others buckle.", action: "Sign up for the assignment with the most pressure." },
  { id: "o-disc-d", dim: "disc", key: "D", dir: "top", q: "opportunities", title: "Lead a turnaround", detail: "D thrives on owning a stalled initiative and giving it direction.", action: "Pick the project everyone has quietly given up on." },
  { id: "o-disc-i", dim: "disc", key: "I", dir: "top", q: "opportunities", title: "Represent and sell", detail: "I thrives on persuading an audience and energizing a room.", action: "Present the idea yourself rather than sending a document." },
  { id: "o-disc-s", dim: "disc", key: "S", dir: "top", q: "opportunities", title: "Be the team's anchor", detail: "S thrives on keeping a team steady through change.", action: "Stay visibly on the team that is restructuring." },
  { id: "o-disc-c", dim: "disc", key: "C", dir: "top", q: "opportunities", title: "Own quality and compliance", detail: "C thrives on standards, audit, and detail-heavy work.", action: "Take the review that nobody signs off on." },
  { id: "o-sloan-r", dim: "sloan", key: "R", dir: "top", q: "opportunities", title: "Go deep on analysis", detail: "R thrives on research, writing, and long-form thinking.", action: "Claim one question that deserves a real answer." },
  { id: "o-sloan-c", dim: "sloan", key: "C", dir: "top", q: "opportunities", title: "Own risk and governance", detail: "C thrives on spotting what others miss before it costs them.", action: "Write the pre-mortem for one upcoming project." },
  { id: "o-sloan-i", dim: "sloan", key: "I", dir: "top", q: "opportunities", title: "Take on solo deep work", detail: "I thrives on independent, specialist projects.", action: "Negotiate for a block of uninterrupted, solo work." },
  { id: "o-sloan-e", dim: "sloan", key: "E", dir: "top", q: "opportunities", title: "Build the network", detail: "E thrives on events, outreach, and advocacy.", action: "Organise the gathering instead of attending it." },
  { id: "o-sloan-a", dim: "sloan", key: "A", dir: "top", q: "opportunities", title: "Lead through change", detail: "A thrives on ambiguous, shifting projects.", action: "Step in where the brief is still being written." },
  { id: "o-mbti-n", dim: "mbti", key: "N", dir: "high", q: "opportunities", title: "Strategy and ideation", detail: "Intuition {v}% — roles that reward seeing the next move are open to you.", action: "Apply for one role that is still being invented." },
  { id: "o-mbti-j", dim: "mbti", key: "J", dir: "high", q: "opportunities", title: "Delivery ownership", detail: "Judging {v}% — projects stall without someone who closes them.", action: "Take delivery ownership of one stalled project." },
  { id: "o-mbti-t", dim: "mbti", key: "T", dir: "high", q: "opportunities", title: "Objective analysis", detail: "Thinking {v}% — decisions made on evidence need someone who will insist on it.", action: "Offer to review one decision with clear criteria." },
  { id: "o-mbti-f", dim: "mbti", key: "F", dir: "high", q: "opportunities", title: "Team harmony", detail: "Feeling {v}% — groups move faster when someone is holding the room together.", action: "Take responsibility for one team's morale." },
  { id: "o-mbti-s", dim: "mbti", key: "S", dir: "high", q: "opportunities", title: "Practical execution", detail: "Sensing {v}% — plans become real when someone turns them into steps.", action: "Convert one strategy document into a dated checklist." },
  { id: "o-mbti-p", dim: "mbti", key: "P", dir: "high", q: "opportunities", title: "Ambiguous projects", detail: "Perceiving {v}% — unclear briefs suit people who can hold several options.", action: "Volunteer for the project with no written brief." },
  { id: "o-en-1", dim: "ennea", key: "1", dir: "top", q: "opportunities", title: "Build standards others trust", detail: "Type 1 — quality systems, checklists, and principles are your territory.", action: "Publish a standard other people will actually adopt." },
  { id: "o-en-2", dim: "ennea", key: "2", dir: "top", q: "opportunities", title: "Support and grow people", detail: "Type 2 — people development and care roles reward what you notice.", action: "Mentor one person who is early in their role." },
  { id: "o-en-3", dim: "ennea", key: "3", dir: "top", q: "opportunities", title: "Lead on visible outcomes", detail: "Type 3 — results that get reported upward are where you compound.", action: "Take the project that gets reported upward." },
  { id: "o-en-4", dim: "ennea", key: "4", dir: "top", q: "opportunities", title: "Creative and emotional depth", detail: "Type 4 — work that needs a distinct voice gives you an edge.", action: "Join one project that needs an original point of view." },
  { id: "o-en-5", dim: "ennea", key: "5", dir: "top", q: "opportunities", title: "Deep expertise and analysis", detail: "Type 5 — specialist tracks reward depth over breadth.", action: "Claim a specialist track and go three levels deeper." },
  { id: "o-en-6", dim: "ennea", key: "6", dir: "top", q: "opportunities", title: "Build trust and safety", detail: "Type 6 — teams that feel safe move faster and stay longer.", action: "Own the risk review for one initiative." },
  { id: "o-en-7", dim: "ennea", key: "7", dir: "top", q: "opportunities", title: "Connect ideas and people", detail: "Type 7 — cross-disciplinary work rewards the person who bridges groups.", action: "Host one session that mixes disciplines." },
  { id: "o-en-8", dim: "ennea", key: "8", dir: "top", q: "opportunities", title: "Lead through hard calls", detail: "Type 8 — decisions that have been waiting for months need your nerve.", action: "Take the decision nobody wants to sign." },
  { id: "o-en-9", dim: "ennea", key: "9", dir: "top", q: "opportunities", title: "Hold teams together", detail: "Type 9 — the person who bridges two disagreeing groups is rare.", action: "Be the bridge between two groups that do not talk." },

  /* ---- Threats: external, harmful ---- */
  { id: "t-ocean-c", dim: "ocean", key: "C", dir: "low", q: "threats", title: "Deadlines and follow-through", detail: "Conscientiousness {v}% — commitments slip when no external structure holds them.", action: "Put every commitment in one place you check weekly." },
  { id: "t-ocean-n", dim: "ocean", key: "N", dir: "high", q: "threats", title: "Burnout under sustained pressure", detail: "Neuroticism {v}% — long high-pressure stretches get expensive.", action: "Set a hard stop before the pressure peaks, not after." },
  { id: "t-ocean-e", dim: "ocean", key: "E", dir: "low", q: "threats", title: "Visibility and advocacy", detail: "Extraversion {v}% — your wins are less visible to the people who decide.", action: "Send a short written update on your work every fortnight." },
  { id: "t-ocean-a", dim: "ocean", key: "A", dir: "low", q: "threats", title: "Friction with peers", detail: "Agreeableness {v}% — directness can turn into conflict with people you need.", action: "Check one assumption with a colleague before you act on it." },
  { id: "t-ocean-o", dim: "ocean", key: "O", dir: "low", q: "threats", title: "Being outpaced by change", detail: "Openness {v}% — new approaches can pass you by while you keep the old one working.", action: "Spend one hour a month on what changed in your field." },
  { id: "t-mbti-i", dim: "mbti", key: "I", dir: "high", q: "threats", title: "Ideas go unshared", detail: "Introversion {v}% — the thinking that would change the plan stays private.", action: "Put one idea in writing where decision-makers can see it." },
  { id: "t-mbti-p", dim: "mbti", key: "P", dir: "high", q: "threats", title: "Open loops accumulate", detail: "Perceiving {v}% — too many live options quietly become unfinished work.", action: "Finish or formally drop one project this week." },
  { id: "t-mbti-t", dim: "mbti", key: "T", dir: "high", q: "threats", title: "Friction with people", detail: "Thinking {v}% — the correct call can cost you the room.", action: "Pair one hard decision with a conversation about how it lands." },
  { id: "t-mbti-s", dim: "mbti", key: "S", dir: "high", q: "threats", title: "Missed cues", detail: "Sensing {v}% — what people do not say can matter more than what they do.", action: "Ask one open question when a meeting ends early." },
  { id: "t-mbti-e", dim: "mbti", key: "E", dir: "high", q: "threats", title: "Overcommitting", detail: "Extraversion {v}% — saying yes quickly can outpace your capacity.", action: "Delay one commitment by a day before accepting it." },
  { id: "t-mbti-j", dim: "mbti", key: "J", dir: "high", q: "threats", title: "Plans harden too early", detail: "Judging {v}% — a settled plan can stop absorbing new information.", action: "Schedule one review point before a decision is locked." },
  { id: "t-mbti-f", dim: "mbti", key: "F", dir: "high", q: "threats", title: "The hard message stays unsaid", detail: "Feeling {v}% — conflict avoided now can cost more later.", action: "Say the uncomfortable thing once, plainly." },
  { id: "t-en-1", dim: "ennea", key: "1", dir: "top", q: "threats", title: "Perfectionism stalls decisions", detail: "Type 1 — work that is good enough can wait forever for the last fix.", action: "Set a 'good enough' threshold before you review the work." },
  { id: "t-en-2", dim: "ennea", key: "2", dir: "top", q: "threats", title: "Unnoticed effort turns to resentment", detail: "Type 2 — giving without asking can sour quietly.", action: "Make one contribution visible without complaining about it." },
  { id: "t-en-3", dim: "ennea", key: "3", dir: "top", q: "threats", title: "Identity tied to achievement", detail: "Type 3 — a slow quarter can feel like a personal verdict.", action: "Keep one part of your life that has no scoreboard." },
  { id: "t-en-4", dim: "ennea", key: "4", dir: "top", q: "threats", title: "Self-absorption narrows the work", detail: "Type 4 — your perspective can become the only one in the room.", action: "Check one assumption with someone outside your point of view." },
  { id: "t-en-5", dim: "ennea", key: "5", dir: "top", q: "threats", title: "Isolation and overthinking", detail: "Type 5 — analysis can quietly replace action.", action: "Set a deadline to act on one thing you have only analysed." },
  { id: "t-en-6", dim: "ennea", key: "6", dir: "top", q: "threats", title: "Second-guessing blocks momentum", detail: "Type 6 — anxiety can reopen decisions that were already sound.", action: "Adopt a 'no re-opening' rule for decisions you have made." },
  { id: "t-en-7", dim: "ennea", key: "7", dir: "top", q: "threats", title: "Avoidance of necessary endings", detail: "Type 7 — work stays open because closing it feels like loss.", action: "Finish one thing before you start the next." },
  { id: "t-en-8", dim: "ennea", key: "8", dir: "top", q: "threats", title: "Power struggles", detail: "Type 8 — force applied to the wrong person becomes a personal fight.", action: "Give one decision away instead of winning it." },
  { id: "t-en-9", dim: "ennea", key: "9", dir: "top", q: "threats", title: "Delayed decisions build resentment", detail: "Type 9 — the quiet path can turn into a slow conflict.", action: "Say the decision out loud, even if it is not perfect." }
];

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
  const art = (w) => (/^[aeiou]/i.test(w) ? "an" : "a");
  return `You come across as ${r.mbti.type} (${r.mbti.info[0]}), motivated by Enneagram ${r.ennea.top}w${r.ennea.wing} (${ENNEA_INFO[r.ennea.top][0]}), with ${art(DISC_INFO[r.disc.top][0])} ${DISC_INFO[r.disc.top][0]} workplace style and ${art(SLOAN_INFO[r.sloan.top][0])} ${SLOAN_INFO[r.sloan.top][0]} team profile. ` +
    `Your standout Big Five trait is ${OCEAN_LABELS[top]} (${p(r.ocean[top])}) and your lowest is ${OCEAN_LABELS[low]} (${p(r.ocean[low])}) — overall, ${archetype}.`;
}

const MBTI_POLES = { E: ["EI", 1], I: ["EI", -1], N: ["SN", 1], S: ["SN", -1], F: ["TF", 1], T: ["TF", -1], J: ["JP", 1], P: ["JP", -1] };

function swotRaw(r, rule) {
  if (rule.dim === "ocean") return r.ocean[rule.key];
  if (rule.dim === "disc") return r.disc.scores[rule.key];
  if (rule.dim === "sloan") return r.sloan.scores[rule.key];
  if (rule.dim === "ennea") return r.ennea.scores[rule.key];
  if (rule.dim === "mbti") {
    const [dim, sign] = MBTI_POLES[rule.key];
    const v = r.mbti.dich[dim];
    return sign > 0 ? v : 100 - v;
  }
  return 50;
}

function swotStrength(r, rule) {
  if (rule.dir === "top") return swotRaw(r, rule);
  const raw = swotRaw(r, rule);
  return rule.dir === "low" ? 100 - raw : raw;
}

function swotActive(r, rule) {
  if (rule.dir === "top") {
    const top = rule.dim === "disc" ? r.disc.top : rule.dim === "sloan" ? r.sloan.top : rule.dim === "ennea" ? r.ennea.top : null;
    if (top !== rule.key) return false;
    return swotRaw(r, rule) > 50;
  }
  return swotStrength(r, rule) >= 60;
}

function swotValues(r) {
  return [
    ...Object.values(r.ocean),
    ...Object.values(r.disc.scores),
    ...Object.values(r.sloan.scores),
    ...Object.values(r.ennea.scores),
    ...Object.values(r.mbti.dich)
  ];
}

function swotIsFlat(r) {
  return swotValues(r).every(v => v >= SWOT_FLAT_BAND && v <= 100 - SWOT_FLAT_BAND);
}

function swotBalancedItem(q) {
  return {
    id: "balanced",
    title: "Balanced profile",
    detail: "No score in this quadrant crossed the 60% / 40% threshold — nothing dominates it.",
    action: SWOT_BALANCED_ACTION[q],
    strength: 50,
    primary: false
  };
}

function swotSelect(items) {
  const sorted = items.slice().sort((a, b) => b.strength - a.strength);
  const picked = [];
  const push = (i) => { if (i && picked.length < SWOT_MAX_ITEMS && !picked.includes(i)) picked.push(i); };
  sorted.filter(i => i.primary).slice(0, 2).forEach(push);
  sorted.filter(i => !i.primary).forEach(push);
  sorted.forEach(push);
  return picked.sort((a, b) => b.strength - a.strength);
}

function computeSwot(r) {
  const out = { strengths: [], weaknesses: [], opportunities: [], threats: [] };
  for (const rule of SWOT_RULES) {
    if (!swotActive(r, rule)) continue;
    const raw = swotRaw(r, rule);
    out[rule.q].push({
      id: rule.id,
      title: rule.title,
      detail: rule.detail.replace("{v}", Math.round(raw)),
      action: rule.action,
      strength: Math.round(swotStrength(r, rule)),
      primary: rule.dir === "top"
    });
  }
  for (const q of Object.keys(out)) {
    const list = out[q].sort((a, b) => b.strength - a.strength);
    const traits = list.filter(i => !i.primary);
    const primaries = list.filter(i => i.primary);
    const picked = traits.slice(0, 2).concat(primaries.slice(0, 2));
    for (const item of list) {
      if (picked.length >= 4) break;
      if (!picked.includes(item)) picked.push(item);
    }
    out[q] = picked.sort((a, b) => b.strength - a.strength);
  }
  return out;
}

function buildOverview(r, swot) {
  const oceanTop = Object.keys(r.ocean).sort((a, b) => r.ocean[b] - r.ocean[a])[0];
  const risk = { O: 100 - r.ocean.O, C: 100 - r.ocean.C, E: 100 - r.ocean.E, A: 100 - r.ocean.A, N: r.ocean.N };
  const oceanRisk = Object.keys(risk).sort((a, b) => risk[b] - risk[a])[0];
  const avg = list => (list.length ? list.reduce((s, i) => s + i.strength, 0) / list.length : 0);
  const sAvg = avg(swot.strengths);
  const wAvg = avg(swot.weaknesses);
  let balance;
  if (sAvg - wAvg >= 8) balance = "Strengths outweigh weaknesses in this profile.";
  else if (wAvg - sAvg >= 8) balance = "Weaknesses outweigh strengths — the growth edge sits in the lower-left quadrant.";
  else balance = "Strengths and weaknesses are close to balanced.";
  const summary =
    `You read as ${r.mbti.type} — ${r.mbti.info[0]}. ${r.mbti.info[1]} ` +
    `Your clearest signal is ${OCEAN_LABELS[oceanTop]} at ${Math.round(r.ocean[oceanTop])}%, and your watch-out is ${OCEAN_LABELS[oceanRisk]} at ${Math.round(r.ocean[oceanRisk])}%. ` +
    `At work you come across as ${DISC_INFO[r.disc.top][0]} (${r.disc.top}), your team profile is ${SLOAN_INFO[r.sloan.top][0]} (${r.sloan.top}), and your core drive is Enneagram ${r.ennea.top}w${r.ennea.wing} — ${ENNEA_INFO[r.ennea.top][0]}.`;
  const stats = [
    { label: "Top trait", value: OCEAN_LABELS[oceanTop], note: `${Math.round(r.ocean[oceanTop])}% openness to experience` },
    { label: "Watch-out", value: OCEAN_LABELS[oceanRisk], note: `${Math.round(r.ocean[oceanRisk])}% — most likely to cost you` },
    { label: "Work style", value: `${r.disc.top} · ${DISC_INFO[r.disc.top][0]}`, note: DISC_INFO[r.disc.top][1] },
    { label: "Core drive", value: `${r.ennea.top}w${r.ennea.wing} · ${ENNEA_INFO[r.ennea.top][0]}`, note: ENNEA_INFO[r.ennea.top][1] }
  ];
  const moves = [];
  const pushMove = (q, tag) => { const it = swot[q][0]; if (it) moves.push({ tag, text: it.action }); };
  pushMove("opportunities", "Opportunity");
  pushMove("weaknesses", "Weakness");
  pushMove("threats", "Threat");
  if (moves.length < 3) pushMove("strengths", "Strength");
  return { summary, balance, stats, moves };
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

const PCT_FMT = new Intl.NumberFormat(undefined, { style: "percent", maximumFractionDigits: 0 });
function barRow(label, p, cls) {
  return `<div class="bar-row"><span>${label}</span><div class="bar ${cls || ""}"><div data-w="${p.toFixed(1)}" style="--w:${(p / 100).toFixed(4)}"></div></div><span>${PCT_FMT.format(p / 100)}</span></div>`;
}

function focusTop() {
  const el = document.querySelector("#app .qtext") || document.querySelector("#app h1");
  if (el) { el.tabIndex = -1; el.focus({ preventScroll: true }); }
}

function announce(msg) {
  const el = document.getElementById("appStatus");
  if (el) el.textContent = msg;
}

function renderStart() {
  history.replaceState(null, "", location.pathname + location.search + location.hash);
  const saved = answers.some(a => a !== null);
  document.getElementById("app").innerHTML = `
    <div class="hero">
      <span class="emoji" aria-hidden="true">🧠</span>
      <h1 translate="no">All-in-One Personality Test</h1>
      <p class="muted" style="margin-top:8px">Answer ${QUESTIONS.length} questions once — get results for all six models at the same time.</p>
    </div>
    <div class="card">
      <h2>What You’ll Get</h2>
      <div class="models">
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🧭</span><span translate="no">MBTI ×32</span></b>16 types + Assertive/Turbulent (e.g. ESFJ-A)</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🌊</span><span translate="no">Big Five (OCEAN)</span></b>5 trait scores as percentages</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🔢</span><span translate="no">Enneagram</span></b>9 types with wing (e.g. 4w5)</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🤝</span><span translate="no">Socionics</span></b>16 types derived from your MBTI</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">💼</span><span translate="no">DISC</span></b>4 workplace styles</div>
        <div class="model-chip"><b><span class="icon" aria-hidden="true">🧩</span><span translate="no">SLOAN / RCIE</span></b>5 team-profile styles</div>
      </div>
      <div class="btnrow">
        <button class="btn" id="startBtn">${saved ? "View Results" : "Start Quiz"} (${QUESTIONS.length} Questions)</button>
        ${saved ? '<button class="btn ghost" id="resetBtn">Reset</button>' : ""}
        <label class="btn ghost" for="importFile" style="margin:0"><span class="btn-ico" aria-hidden="true">⬆</span> Import JSON<input type="file" id="importFile" name="import" accept="application/json,.json" hidden></label>
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
      <div class="muted" id="qCounter">Question ${idx + 1} / ${QUESTIONS.length} · ${answers.filter(a => a !== null).length} answered</div>
      <progress class="progress" max="${QUESTIONS.length}" value="${idx + 1}" aria-label="Quiz progress: question ${idx + 1} of ${QUESTIONS.length}"></progress>
      <div class="qtext" aria-describedby="qCounter">${q.q}</div>
      <div class="answers" role="group" aria-label="Answer options">
        ${ANSWER_LABELS.map((l, i) => `<button class="ans ${answers[idx] === i + 1 ? "selected" : ""}" data-v="${i + 1}" aria-pressed="${answers[idx] === i + 1}">${i + 1}<small>${l}</small></button>`).join("")}
      </div>
      <div class="navrow">
        <button class="btn ghost" id="backBtn" ${idx === 0 ? "disabled" : ""}><span class="btn-ico" aria-hidden="true">←</span> Back</button>
        <span class="navrow-actions">
          <button class="btn ghost" id="reviewBtn"><span class="btn-ico" aria-hidden="true">☰</span> All Questions</button>
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
  announce(`Question ${idx + 1} of ${QUESTIONS.length}`);
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
        <button class="btn ghost" id="backBtn"><span class="btn-ico" aria-hidden="true">←</span> Back</button>
        <button class="btn" id="resultsBtn">View Results <span class="btn-ico" aria-hidden="true">→</span></button>
      </div>
    </div>`;
  document.querySelectorAll(".rev-row").forEach(b => b.onclick = () => { idx = Number(b.dataset.i); renderQuestion(); });
  document.getElementById("backBtn").onclick = () => { if (reviewReturn === "results") renderResults(); else renderQuestion(); };
  document.getElementById("resultsBtn").onclick = () => renderResults();
  focusTop();
  announce(`Review answers: ${answered} of ${QUESTIONS.length} answered`);
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
    return `<details class="drivers"><summary>Driven by ${ids.map(i => "Q" + (i + 1)).join(" · ")} — See the Questions</summary><ul>${items}</ul></details>`;
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
  const swot = computeSwot(r);
  const ov = typeof buildOverview === "function"
    ? buildOverview(r, swot)
    : { summary: computeOverview(r), balance: "", stats: [], moves: [] };
  const overview = ov.summary || computeOverview(r);
  const strengthMeter = (v) => {
    const n = Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : 0;
    return `<div class="swot-meter"><div class="bar pct"><div data-w="${n.toFixed(1)}" style="--w:${(n / 100).toFixed(4)}"></div></div><span class="swot-meter-val">${PCT_FMT.format(n / 100)}</span></div>`;
  };
  const quad = (cls, icon, title, items) => `<div class="swot ${cls}"><h3><span aria-hidden="true">${icon}</span> ${title}</h3><ul>${items.map(i => `<li><b>${i.title}</b><span>${i.detail}</span>${strengthMeter(i.strength)}${i.action ? `<em class="next-step">Next step: ${i.action}</em>` : ""}</li>`).join("")}</ul></div>`;
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
      ${ov.balance ? `<p class="ov-balance">${ov.balance}</p>` : ""}
      ${(ov.stats || []).length ? `<div class="ov-stats">${ov.stats.map(s => `<div class="ov-stat"><span class="ov-stat-label">${s.label}</span><b class="ov-stat-value">${s.value}</b>${s.note ? `<span class="ov-stat-note">${s.note}</span>` : ""}</div>`).join("")}</div>` : ""}
      ${(ov.moves || []).length ? `<h2 style="margin-top:18px">Next Moves</h2><ul class="ov-moves">${ov.moves.map(m => `<li><span class="move-tag move-${String(m.tag || "").toLowerCase()}">${m.tag}</span><span>${m.text}</span></li>`).join("")}</ul>` : ""}
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
      <button class="btn" id="againBtn"><span class="btn-ico" aria-hidden="true">↻</span><span class="btn-label">Retake Quiz</span></button>
      <button class="btn secondary" id="reviewBtn"><span class="btn-ico" aria-hidden="true">📝</span><span class="btn-label">Review Answers</span></button>
      <button class="btn secondary" id="copyLinkBtn"><span class="btn-ico" aria-hidden="true">🔗</span><span class="btn-label">Copy Link</span></button>
      <button class="btn secondary" id="copySumBtn"><span class="btn-ico" aria-hidden="true">📋</span><span class="btn-label">Copy Summary</span></button>
      <button class="btn secondary" id="exportBtn"><span class="btn-ico" aria-hidden="true">⬇</span><span class="btn-label">Export JSON</span></button>
      <button class="btn secondary" id="printBtn"><span class="btn-ico" aria-hidden="true">🖨</span><span class="btn-label">Print</span></button>
    </div>`;
  requestAnimationFrame(() => {
    document.querySelectorAll(".bar > div").forEach(d => { d.style.transform = "scaleX(" + (Number(d.dataset.w) / 100) + ")"; });
  });
  document.getElementById("againBtn").onclick = () => { if (confirm("Retake the quiz? Your saved answers will be cleared.")) { answers = new Array(QUESTIONS.length).fill(null); idx = 0; localStorage.removeItem(STORE_KEY); renderStart(); } };
  const flash = (btn, msg) => {
    const label = btn.querySelector(".btn-label");
    const original = label ? label.textContent : "";
    if (label) label.textContent = msg;
    announce(msg);
    setTimeout(() => {
      if (label) label.textContent = original;
      announce("");
    }, 1500);
  };
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
    const fail = () => flash(btn, "Copy Failed");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => legacyCopy(txt) ? done() : fail());
    else legacyCopy(txt) ? done() : fail();
  };
  document.getElementById("copyLinkBtn").onclick = (e) => copyText(location.href, e.currentTarget);
  document.getElementById("copySumBtn").onclick = (e) => copyText(summaryText(r), e.currentTarget);
  document.getElementById("reviewBtn").onclick = () => { reviewReturn = "results"; renderReview(); };
  document.getElementById("printBtn").onclick = () => window.print();
  document.getElementById("exportBtn").onclick = () => {
    const data = { date: new Date().toISOString(), answers, results: r, overview, overviewDetail: ov, swot, summary: summaryText(r) };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "personality-results.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  focusTop();
  announce(`Results ready: ${r.mbti.type}, based on ${answered} of ${QUESTIONS.length} answers`);
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
  module.exports = { QUESTIONS, GROUPS, computeResults, computeOverview, computeSwot, buildOverview, encodeAnswers, decodeAnswers, summaryText };
}
