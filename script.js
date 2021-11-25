// defines needed global variables
var timerInterval, winnerScores;
var x = 0;
var score = 0;
var secondsLeft = 40;
var quizInfo = document.querySelector("#quiz-info")
var olEl = document.querySelector("#multipleChoice");
var scoreEl = document.querySelector("#scoreBoard");
var timeEl = document.querySelector("#time");
var h2El = document.querySelector("#question");
var h3El = document.querySelector("#scores");
var startBtn = document.querySelector("#startBtn");
var submissionForm = document.querySelector("#yourName");
var playAgain = document.querySelector("#playAgain");
var viewHighScores = document.querySelector("#viewHighScores");
var highScoreBoard = document.querySelector("#highScoreCount");
var highScores = [];
var myObj = {};
var nameInput = document.querySelector("#name");
var questionsArray = [
  {
    question: "When was film invented?",
    choices: ["1740s", "1890s", "1910s", "1930s"],
    answer: "1890s"
  },

  {
    question: "What is the slowest speed the human brain can process can process images consecutively?",
    choices: ["2fps", "10fps", "11fps", "19fps"],
    answer: "11fps"
  },

  {
    question: "When was the first feature-length film produced?",
    choices: ["1804", "1892", "1906", "1921"],
    answer: "1906"
  },

  {
    question: "When did the first movie theaters film open?",
    choices: ["1890", "1907", "1911", "1952"],
    answer: "1907"
  },

  {
    question: "Where did the symbols from the famous matrix code come from?",
    choices: ["Hieroglyphs", "Windings", "Bootstrap", "Sushi Cookbook"],
    answer: "Sushi Cookbook"
  },
];

// Clear html elements from screen
playAgain.setAttribute("style", "display:none");
submissionForm.setAttribute("style", "display:none");

// Store high scores to local storage and append to page
function finalHighScores() {
  localStorage.setItem("highScoreLeaders", JSON.stringify(highScores));
  winnerScores = JSON.parse(localStorage.getItem("highScoreLeaders"));
  highScores = winnerScores;
  for (let i = 0; i < highScores.length; i++) {
    var myScoringName = highScores[i].name;
    var myScoringScore = highScores[i].score;
    var liScores = document.createElement("li");
    liScores.textContent = myScoringName + ": " + myScoringScore;
    highScoreBoard.appendChild(liScores);
  }
}

// Save user name and score
submissionForm.addEventListener("submit", function (event) {
  event.preventDefault();
  highScoreBoard.innerHTML = ""
  highScoreBoard.setAttribute("style", "display:block")
  var nameText = nameInput.value.trim();
  if (nameText === "") {
    alert("Please enter your name");
    return;
  } else {
    highScores = JSON.parse(localStorage.getItem("highScoreLeaders")) || [];
    myObj["name"] = nameText;
    myObj["score"] = score;
    highScores.push(myObj);
    finalHighScores();
  }
});

// Clear page and show submission form
function displayScore() {
  clearInterval(timerInterval);
  h2El.textContent = "High Scores";
  h3El.textContent = "Your score: " + score;
  scoreEl.textContent = "";
  olEl.textContent = "";
  submissionForm.setAttribute("style", "display:inline");
  playAgain.setAttribute("style", "display:inline");
}

function userChoice() {
  // Check the user answer
  if (this.innerHTML !== questionsArray[x].answer) {
    secondsLeft -= 5;
  } else {
    score += 20;
    scoreEl.textContent = "Score: " + score;
  }
  if (x < questionsArray.length - 1) {
    x++;
    quizQuestions();
  } else {
    displayScore();
  }
}

// Display quiz questions on page using for loop to loop through questions array
function quizQuestions() {
  startBtn.setAttribute("style", "display:none");
  h2El.textContent = questionsArray[x].question;
  olEl.innerHTML = " ";
  for (let i = 0; i < questionsArray[x].choices.length; i++) {
    var quizChoice = questionsArray[x].choices[i];
    var liEl = document.createElement("li");
    liEl.classList.add("interactive");
    liEl.textContent = quizChoice;
    liEl.addEventListener("click", userChoice);
    olEl.append(liEl);
  }
}

// Listen for button click to start quiz
document.querySelector("#startBtn").addEventListener("click", function () {
  highScoreBoard.setAttribute("style", "display:none")
  quizInfo.setAttribute("style", "display:none")
  timerInterval = setInterval(function () {
    if (secondsLeft > 0) {
      secondsLeft--;
      timeEl.textContent = "Timer: " + secondsLeft + " seconds left";
    } else if (secondsLeft <= 0) {
      displayScore();
    }
  }, 1000);
  quizQuestions();
});

// Listen for button clikc to view high scores
viewHighScores.addEventListener("click", function () {
  highScoreBoard.innerHTML = ""
  quizInfo.setAttribute("style", "display:none")
  playAgain.setAttribute("style", "display:none")
  startBtn.setAttribute("style", "display:inline")
  clearInterval(timerInterval);
  h2El.textContent = "High Scores";
  scoreEl.textContent = " ";
  olEl.textContent = " ";
  if (JSON.parse(localStorage.getItem("highScoreLeaders") !== null)) {
    winnerScores = JSON.parse(localStorage.getItem("highScoreLeaders"));
    highScores = winnerScores;
    for (let i = 0; i < highScores.length; i++) {
      var myScoringName = highScores[i].name;
      var myScoringScore = highScores[i].score;
      var liScores = document.createElement("li");
      liScores.textContent = myScoringName + ": " + myScoringScore;
      highScoreBoard.appendChild(liScores);
    }
  }
});

// Listen for button click to refresh page and play again
playAgain.addEventListener("click", function () {
  window.location.reload();
});