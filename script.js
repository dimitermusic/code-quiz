// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// TODO: create a function that hides quiz start page and adds an html title and list of buttons using DOM node methods on button click.
var startBtn = document.querySelector(".button")
var timerEl = document.querySelector("#timer");
var secondsLeft = 75;
var firstPage = document.querySelector(".content")
var quizContainer = ("#quiz")
var questionEL = document.querySelector("#quiz-question")
var choicesEl = document.querySelector("#quiz-choices")
var displayResult = document.querySelector("#answer-result")
var questionOne =
    {
    question: "When was film invented?",
    choices: ["1740s", "1890s", "1910s", "1930s"],
    answer: 2
    }
var questionTwo =
    {
    question: "What is the slowest speed the human brain can process can process images consecutively?",
    choices: ["2fps", "10fps", "11fps", "19fps"],
    answer: 3
    }
var questionThree = 
    {
    question: "When was the first feature-length film produced?",
    choices: ["1804", "1892", "1906", "1921"],
    answer: 3
    }
var questionFour = 
    {
    question: "When did the first movie theaters film open?",
    choices: ["1890", "1907", "1911", "1952"],
    answer: 2
    }
var questionFive = 
    {
    question: "Where did the symbols from the famous matrix code come from?",
    choices: ["Hieroglyphs", "Windings", "Bootstrap", "Sushi Cookbook"],
    answer: 4
    }

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = "Time: " + secondsLeft;
  
      if(secondsLeft <1) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Ends game
        return
      }
    }, 1000);
  }

function displayCorrect() {
    displayResult.textContent = "CORRECT!";
    displayResult.style.display = "block";
    displayResult.style.display = "block";
}

function displayIncorrect() {
    displayResult.textContent = "INCORRECT!";
    displayResult.style.display = "block";
}
console.log(displayCorrect);


function quizQ1() {
    var quizQuestion = document.createElement("h1");
    quizQuestion.innerHTML = questionOne.question;
    questionEL.append(quizQuestion);
    var choice1 = document.createElement("button");
    choice1.className = "choices-button";
    choice1.innerHTML = questionOne.choices[0];
    choicesEl.append(choice1);
    var choice2 = document.createElement("button");
    choice2.className = "choices-button";
    choice2.innerHTML = questionOne.choices[1];
    choicesEl.append(choice2);
    var choice3 = document.createElement("button");
    choice3.className = "choices-button";
    choice3.innerHTML = questionOne.choices[2];
    choicesEl.append(choice3);
    var choice4 = document.createElement("button");
    choice4.className = "choices-button";
    choice4.innerHTML = questionOne.choices[3];
    choicesEl.append(choice4);
    
    choice2.addEventListener("click", displayCorrect)
    choice2.addEventListener("click", quizQ2)
    choice1.addEventListener("click", displayIncorrect)
    choice1.addEventListener("click", quizQ2)
    choice3.addEventListener("click", displayIncorrect)
    choice3.addEventListener("click", quizQ2)
    choice4.addEventListener("click", displayIncorrect)
    choice4.addEventListener("click", quizQ2)
    }

function quizQ2 () {
    console.log("q2 is working")
}

function quizRun () {
    firstPage.style.display = "none";
    setTime();
    quizQ1();
}

startBtn.addEventListener("click", quizRun)

// WHEN I answer a question
// THEN I am presented with another question
// TODO: create condition in function that when a button is clicked, the current html is hidden and a new function with the next question is called.
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// TODO: create a timer using the setInterval method that subtracts 1 second off the clock with a conditional statement that if the current question is false, 10 seconds is subtracted instead.
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// TODO: create a conditional statement in the timer function that if the timer html is === 0 || the last question is answered, hide the game and show that state page with a new function.
// WHEN the game is over
// THEN I can save my initials and my score
// TODO: collect html inputs of initials and score using DOM and store in variables. This variable must then be stored and appended to page using setitem and getitem methods.