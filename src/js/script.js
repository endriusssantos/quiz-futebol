const btnStart = document.getElementById("btn-start");
const intro = document.getElementById("quiz-intro");
const questionsContainer = document.querySelector(".questions-container");
const questions = document.querySelectorAll(".quiz-question");
const radios = document.querySelectorAll('input[type="radio"]');
const btnNext = document.getElementById("btn-next");
const btnFinish = document.getElementById("btn-finish");
const btnReset = document.getElementById("btn-reset");
const result = document.getElementById("result");
const progressBar = document.getElementById("quiz-progress-bar");

let currentQuestionIndex = 0;

btnStart.addEventListener("click", () => {
  intro.style.display = "none";
  questionsContainer.style.display = "flex";
  showQuestion(currentQuestionIndex);
  updateProgressBar();
});

btnNext.addEventListener("click", () => {
  hideQuestion(currentQuestionIndex);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
    updateProgressBar();
  }
});

btnFinish.addEventListener("click", () => {
  btnNext.style.display = "none";
  btnFinish.style.display = "none";
  checkAnswers();
  btnReset.style.display = "block";
  questions.forEach((question) => {
    question.classList.remove("show");
  });
});

btnReset.addEventListener("click", resetQuiz);

function showQuestion(index) {
  questions[index].classList.add("show");
  btnNext.style.display = "none";
  btnFinish.style.display = "none";
}

function hideQuestion(index) {
  questions[index].classList.remove("show");
}

function updateProgressBar() {
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    const currentGroup = radio.name;
    const currentIndex = parseInt(currentGroup.replace("quest", "")) - 1;

    if (
      document.querySelector(`input[name="${currentGroup}"]:checked`) &&
      currentIndex === currentQuestionIndex
    ) {
      if (currentIndex === questions.length - 1) {
        btnNext.style.display = "none";
        btnFinish.style.display = "block";
      } else {
        btnNext.style.display = "block";
        btnFinish.style.display = "none";
      }
    }
  });
});

function checkAnswers() {
  const groups = [
    "quest1",
    "quest2",
    "quest3",
    "quest4",
    "quest5",
    "quest6",
    "quest7",
    "quest8",
    "quest9",
    "quest10",
  ];

  const questionTitles = [
    "Em que país o futebol moderno foi inventado?",
    "Qual seleção venceu a primeira Copa do Mundo da FIFA em 1930?",
    "Quem é conhecido como o 'Rei do Futebol'?",
    "Quantas vezes a seleção brasileira venceu a Copa do Mundo?",
    "Em que ano a Copa foi sediada no Brasil antes de 2014?",
    "Qual país sediará a Copa de 2026 (junto com outros dois)?",
    "Qual clube brasileiro é conhecido como 'Mengão'?",
    "Qual destes times joga na Premier League?",
    "Quem é o maior artilheiro da Champions League?",
    "Qual jogador argentino é famoso pela 'Mão de Deus'?",
  ];

  const correctAnswers = {
    quest1: "b",
    quest2: "c",
    quest3: "d",
    quest4: "c",
    quest5: "a",
    quest6: "b",
    quest7: "c",
    quest8: "c",
    quest9: "d",
    quest10: "b",
  };

  let score = 0;
  const wrongQuestions = [];

  groups.forEach((group, index) => {
    const checked = document.querySelector(`input[name="${group}"]:checked`);
    if (checked && checked.value === correctAnswers[group]) {
      score++;
    } else {
      wrongQuestions.push(questionTitles[index]);
    }
  });

  result.innerHTML = `
    <p class="answers-corrects">Você acertou ${score} de ${
    groups.length
  } perguntas.</p>
    ${
      wrongQuestions.length
        ? `<p>Você errou as seguintes perguntas:</p>
           <ul>${wrongQuestions.map((q) => `<li>${q}</li>`).join("")}</ul>`
        : `<p class="answers-corrects">Parabéns! Você acertou todas as perguntas!</p>`
    }
  `;
}

function resetQuiz() {
  result.innerHTML = "";
  btnReset.style.display = "none";
  btnFinish.style.display = "none";
  btnNext.style.display = "none";

  questions.forEach((q) => q.classList.remove("show"));

  currentQuestionIndex = 0;
  progressBar.style.width = "0%";

  radios.forEach((radio) => {
    radio.checked = false;
  });

  questionsContainer.style.display = "flex";
  showQuestion(currentQuestionIndex);
}
