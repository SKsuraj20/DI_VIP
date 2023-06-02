const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "IPL was started in which year?",
    choice1: "2007",
    choice2: "2009",
    choice3: "2006",
    choice4: "2008",
    answer: 4
  },
  {
    question:
      "Which Team won 0 times the Title?",
    choice1: "MI",
    choice2: "CSK",
    choice3: "RCB",
    choice4: "KKR",
    answer: 3
  },
  {
    question: "Who was the Man of the Match in the IPL 2022 final?",
    choice1: "David Miller",
    choice2: "Shubman Gill",
    choice3: "Rashid Khan",
    choice4: "Hardik Pandya",
    answer: 4
  },

  {
    question: "Who recorded the highest individual score in IPL 2022?",
    choice1: "KL Rahul",
    choice2: "Jos Butler",
    choice3: "Rajat Patidar",
    choice4: "Quinton de Kock",
    answer: 4
  },
  {
    question: "Which two teams lost the most games in IPL 2022?",
    choice1: "MI, SRH",
    choice2: "MI, CSK",
    choice3: "CSK, SRH",
    choice4: "KKR, CSK",
    answer: 2
  },
  {
    question: "Who became only the second player after Shikhar Dhawan to score two consecutive hundreds in the IPL",
    choice1: "KL Rahul",
    choice2: "Rajat Patidar",
    choice3: "Jos Buttler",
    choice4: "Quinton de Kock",
    answer: 3
  },
  {
    question: "Who was the most expensive player of IPL 2022?",
    choice1: "Liam Livingstone",
    choice2: "Ishan Kishan",
    choice3: "Deepak Chahar",
    choice4: "Shreyas Iyer",
    answer: 2
  },
  {
    question: "Who won the Emerging player of the season award for IPL 2022?",
    choice1: "Tilak Verma",
    choice2: "Abhishek Sharma",
    choice3: "Mohsin Khan",
    choice4: "Umran Malik",
    answer: 4
  },
  {
    question: "Which Indian uncapped player scored the fastest IPL century during the 2022 season?",
    choice1: "Tilak Verma",
    choice2: "Devdutt Padikkal",
    choice3: "Rajat Patidar",
    choice4: "Manish Pandey",
    answer: 3
  },
  {
    question: "Which player scored the most hundreds in IPL 2022?",
    choice1: "Jos Buttler",
    choice2: "KL Rahul",
    choice3: "Quinton de Kock",
    choice4: "Virat Kohli",
    answer: 1
  },
  {
    question: "Who hit the longest six of IPL 2022?",
    choice1: "Marcus Stoinis",
    choice2: "Jos Buttler",
    choice3: "Dewald Brevis",
    choice4: "Liam Livingstone",
    answer: 4
  },
  {
    question: "Which were the two teams who won fairplay award in IPL 2022?",
    choice1: "CSK, GT",
    choice2: "RR, GT",
    choice3: "CSK, RR",
    choice4: "CSK, SRH",
    answer: 2
  },

  {
    question: "Which player scored the most fifties in IPL 2022?",
    choice1: "Jos Buttler",
    choice2: "David Warner",
    choice3: "KL Rahul",
    choice4: "Shubman Gill",
    answer: 2
  },
  {
    question: "Lowest score in history of IPL is?",
    choice1: "CSK",
    choice2: "RR",
    choice3: "RCB",
    choice4: "SRH",
    answer: 3
  },
  {
    question: "Which player became the first to cross 700 fours in the IPL during the 2022 season?",
    choice1: "Shikhar Dhawan",
    choice2: "Jos Buttler",
    choice3: "David Warner",
    choice4: "Rohit Sharma",
    answer: 1
  },

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();