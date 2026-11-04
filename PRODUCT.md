# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Inferred from the repository and the approved landing-page direction:** People curious about personality and self-discovery who want to understand themselves through familiar frameworks without completing several separate quizzes.
- Secondary use cases include workplace and team reflection, but the public landing page should lead with personal self-discovery.

## Product Purpose

The product provides one 60-question Likert-style quiz that produces results across six personality frameworks at once: MBTI-32, Big Five (OCEAN), Enneagram, Socionics, DISC, and SLOAN/RCIE. Success means a visitor can understand the offer, begin the quiz, and receive a coherent, shareable set of results without creating an account.

## Positioning

One answer set, six complementary views. The product removes the need to repeat substantially similar questions for each personality framework.

## Operating Context

- The quiz is a browser-based, single-page experience.
- Answers auto-save locally in the browser and can be resumed.
- Results can be reviewed, printed, exported as JSON, and shared through encoded links or copied summaries.
- The project is intended to remain easy to host and open directly, without a build step.

## Capabilities and Constraints

- Static HTML, CSS, and JavaScript with no runtime dependencies or build step.
- The landing page is a separate public surface; the quiz remains in `index.html`.
- The landing page has one primary action that starts or resumes the quiz.
- No analytics or visitor tracking in the initial landing-page release.
- Landing-page copy must not present results as clinical diagnoses or as validated hiring assessments.
- The landing page should include search and social-sharing metadata and meet the quiz's responsive and accessibility standards.
- English is the initial language; localization remains undecided.

## Brand Commitments

- Product name: **All-in-One Personality Test**.
- The existing dark visual identity, purple and teal accents, and direct, plain-language voice should carry into the landing page.
- The landing page should feel like a confident extension of the quiz rather than a separate marketing brand.

## Evidence on Hand

- The working quiz and its six result models in `app.js`.
- The incumbent visual system in `style.css`.
- Product and feature documentation in `README.md`.
- No testimonials, customer logos, usage statistics, scientific citations, or other external proof assets are available; future work must not fabricate them.

## Product Principles

1. One clear action should be obvious within seconds.
2. Explain the product through its real six-model output, not vague personality-test claims.
3. Keep the experience private and dependency-free by default.
4. Make every result useful enough to review, share, and revisit.
5. Treat personality results as reflection tools, not diagnoses or hiring verdicts.

## Accessibility & Inclusion

The product should support keyboard navigation, visible focus, semantic structure, sufficient contrast, reduced-motion preferences, and responsive layouts across mobile and desktop. The landing page should meet the same standard as the quiz.
