// References
let timerLeft = document.querySelector(".timer-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

// Questions and Options array
const quizArray = [
  {
    id: 0,
    question:
      "Ramadan is mentioned in which of the following Surahs in the Quran?",
    options: [
      "Surah Al-Baqarah",
      "Surah al-Nisa",
      "Surah Ali Imran",
      "Surah al-Hijr",
    ],
    correct: "Surah Al-Baqarah",
  },
  {
    id: 1,
    question: "Fasting during Ramadan is which of the 5 pillars in Islam?",
    options: ["First", "Second", "Third", "Fourth"],
    correct: "Fourth",
  },
  {
    id: 2,
    question: "On which day does Eid ul-Fitr occur?",
    options: [
      "On the final day of Ramadan",
      "On the first day of Shawwal",
      "Nobody knows",
      "During the full moon",
    ],
    correct: "On the first day of Shawwal",
  },
  {
    id: 3,
    question: "Which famous battle took place during the month of Ramadan?",
    options: [
      "The Battle of Badr",
      "The Battle of the Trench",
      "The Battle of Uhud",
      "The Battle of Khaybar",
    ],
    correct: "The Battle of Badr",
  },
  {
    id: 4,
    question: "Laylatul-Qadr is a night greater than:",
    options: ["1000 weeks", "1000 months", "1000 years", "1000 lifetimes"],
    correct: "1000 months",
  },
  {
    id: 5,
    question:
      "On the Day of Judgement, those who fasted Ramadan will be told to enter paradise through which gate",
    options: ["Baab al-Iman", "Baab al-Hajj", "Baab as-Sadaqah", "Baab al-Rayyan"],
    correct: "Baab al-Rayyan",
  },
];

// Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    // Incremennt questionCount
    questionCount += 1;
    // If last question
    if (questionCount == quizArray.length) {
      // Hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      // User score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      // Display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      // Display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

// Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timerLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

// Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  // Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  // Display current question card
  quizCards[questionCount].classList.remove("hide");
};

// Quiz Creation
function quizCreator() {
  // Randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  // Generate quiz
  for (let i of quizArray) {
    // Randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    // Quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    // Question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    // Question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    // Options
    div.innerHTML += `
    <button class='option-div' onclick='checker(this)'>${i.options[0]}</button>
    <button class='option-div' onclick='checker(this)'>${i.options[1]}</button>
    <button class='option-div' onclick='checker(this)'>${i.options[2]}</button>
    <button class='option-div' onclick='checker(this)'>${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

// Checker Function to check if option if correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  // If user clicked answer == correct option stored in object
  if (userSolution == quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    // For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  // Clear interval(stop timer)
  clearInterval(countdown);
  // Disabled all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

// Initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

// When user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// Hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
