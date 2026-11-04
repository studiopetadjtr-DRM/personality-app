/* All-in-One Personality Test — landing page behavior.
   Progressive enhancement only: the page is fully readable without this file. */

(function () {
  "use strict";

  var STORE_KEY = "allinone-personality-v1";
  var QUESTION_COUNT = 60;

  /* Fill the signal field with one tile per question. */
  var grid = document.querySelector(".answer-grid");
  if (grid) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < QUESTION_COUNT; i++) {
      var tile = document.createElement("i");
      tile.style.animationDelay = (i * 18) + "ms";
      frag.appendChild(tile);
    }
    grid.appendChild(frag);
  }

  /* If this browser already has answers, point the primary action at the
     first unanswered question and label it as a resume. */
  function savedProgress() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return null;
      var answers = JSON.parse(raw);
      if (!Array.isArray(answers) || answers.length !== QUESTION_COUNT) return null;
      var answered = answers.filter(function (a) { return a !== null; }).length;
      if (!answered) return null;
      var next = answers.findIndex(function (a) { return a === null; });
      return { answered: answered, next: next === -1 ? QUESTION_COUNT : next + 1 };
    } catch (e) {
      return null;
    }
  }

  var progress = savedProgress();
  if (progress) {
    var label = progress.next > QUESTION_COUNT ? "View Results" : "Resume the Quiz";
    document.querySelectorAll("[data-quiz-label]").forEach(function (el) {
      el.textContent = label;
    });
    document.querySelectorAll("[data-quiz-link]").forEach(function (el) {
      el.setAttribute("href", "index.html?q=" + progress.next);
    });
  }
})();
