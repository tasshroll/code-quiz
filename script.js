// ## User Story

// ```
// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers
// ```

// ## Acceptance Criteria

// ```
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score


// Questions with choices and correct answer in an object property
let questions = [
    {
        question: 'Commonly used data types do NOT Include:',
        choice1: 'Strings',
        choice2: 'Booleans',
        choice3: 'Alerts',
        choice4: 'numbers',
        correctAnswer: 'Alerts',
    },
    {
        question: 'The condition of an if then else statement is enclosed with _______.',
        choice1: 'Quotes',
        choice2: 'Curley brackets',
        choice3: 'Parenthesis',
        choice4: 'square brackets',
        correctAnswer: 'Curley brackets',
    },
    {
        question: 'Arrays in JavaScript can be used to store:',
        choice1: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'Booleans',
        choice4: 'All of the above',
        correctAnswer: 'All of the above',
    },
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        choice1: 'Commas',
        choice2: 'Curley brackets',
        choice3: 'Quotes',
        choice4: 'parenthesis',
        correctAnswer: 'Quotes',
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choice1: 'JavaScript',
        choice2: 'terminal/Bash',
        choice3: 'for Loops',
        choice4: 'console.log',
        correctAnswer: 'console.log',
    }
]

//GLOBALS
let availableQuestions = [...questions]; //arrray of all questions
let currentQuestion = {};
let qCounter = 0
let timer = 75;
const maxQs = availableQuestions.length;
const startPage = document.querySelector('#start-page');
const middlePage = document.querySelector('#middle-page');
const endPage = document.querySelector('#end-page');
const highScorePage = document.querySelector('#high-score-page');
const scoreTimer = document.querySelector('#score-timer');


const questionEl = document.querySelector('#current-question');
const choices = Array.from(document.querySelectorAll('choice-text'));
// 4 choices are storred in array
const choice1El = document.querySelector('#choice-1');
const choice2El = document.querySelector('#choice-2');
const choice3El = document.querySelector('#choice-3');
const choice4El = document.querySelector('#choice-4');
const responseEl = document.querySelector('#response');
var timerEl = document.querySelector('#timer');
var timeLeftEl = document.querySelector('#time-left');
const initialsEl = document.querySelector('#initials2');
const scoreEl = document.querySelector('#score');
const resultEl = document.querySelector('#result');


var acceptingChoices;
var end;

var choiceBtn = document.querySelector('.game-choice-class');
var startBtn = document.querySelector("#start");
var saveBtn = document.querySelector("#save");
var resetBtn = document.querySelector("#re-set");



function init() {
    startBtn.disabled = false;
    startPage.setAttribute("class", "show");
    middlePage.setAttribute("class", "hide");
    endPage.setAttribute("class", "hide");
    highScorePage.setAttribute("class", "hide");
    scoreTimer.setAttribute("class", "show");
    scoreTimer.setAttribute("class", "header-class");
    qCounter = 0;
    end = false;
    timer = 75;
}

startBtn.addEventListener("click", function () {
    event.preventDefault();
    console.log("AcceptingChoices is", acceptingChoices);
    console.log("End is", end);
    acceptingChoices = true;
    displayQuestion();
    //* While game is in progress, Decrement timer every second
    startTimer();
    startPage.setAttribute("class", "hide");
    middlePage.setAttribute("class", "show");


});

function startTimer() {
    startBtn.disabled = true;
    choiceBtn.disabled = false;

    var timerInterval = setInterval(function () {
        timer--;
        timerEl.innerText = "Timer: " + timer;
        console.log("Timer El is ", timerEl);
        //stop game if timer reaches 0
        if (timer <= 0 || end) {
            clearInterval(timerInterval);
            end = true;
            acceptingChoices = false;
            middlePage.setAttribute("class", "hide");
            endGame;
        }
    }, 1000)
}

// displayQuestion
function displayQuestion() {
    console.log("playing game")
    // Cycle through all questions - Display Question and its Choices
    console.log("Question Count is ", qCounter);
    questionEl.innerHTML = availableQuestions[qCounter].question;
    choice1El.textContent = availableQuestions[qCounter].choice1;
    choice2El.innerText = availableQuestions[qCounter].choice2;
    choice3El.innerText = availableQuestions[qCounter].choice3;
    choice4El.innerText = availableQuestions[qCounter].choice4;
}

function checkAnswer() {
    var choice = event.target;
    var userAnswer = choice.innerHTML;
    console.log("choice clicked is ", userAnswer);
    if (userAnswer === availableQuestions[qCounter].correctAnswer) {
        console.log("CORRECT answer!!!")
        responseEl.innerText = "Correct!";
    } else {
        console.log("Wrong answer")
        responseEl.innerText = "Wrong!";
        timer = timer - 10;
    }
}


choiceBtn.addEventListener("click", function (event) {
    event.preventDefault();

    //Check if user choice is correct

    checkAnswer();
    // Display next question
    if (qCounter < maxQs - 1) {
        qCounter++;
        displayQuestion();
    } else {
        middlePage.setAttribute("class", "hide");
        acceptingChoices = false;
        end = true;
        choiceBtn.disabled = true;
        saveBtn.disabled = false;
        resetBtn.disabled = false;
        endGame();
    }
});


function endGame() {
    //Display the ending page with score/timer and prompt for user to enter their initials
    endPage.setAttribute("class", "show");
    highScorePage.setAttribute("class", "hide");
    console.log("end game")
    console.log("Your Score is ", timer);
    timeLeftEl.innerHTML = timer;
}


function saveData() {
    // Look at saved scores from prior games
    var lastScore = JSON.parse(localStorage.getItem("quizData"));
    // Print data if it exists
    if (lastScore !== null) {
        console.log("Stored initials is", lastScore[0].initials);
        console.log("Stored score is", lastScore[0].score);
    }
    // Save scores from this recent Game
    const initials = document.getElementById("initials").value;
    const score = timer; // Highscore for this game

    // recentScorre is an object - highscoresArr is a dynamic array appending user initials and highscores
    const recentScore =
    {
        initials: initials,
        score: score
    };

    var highscoresArr = JSON.parse(window.localStorage.getItem('quizData')) || [];
    highscoresArr.push(recentScore);

    const jsonData = JSON.stringify(highscoresArr);
    console.log("Setting localStorage now look at debugger for key", jsonData)
    localStorage.setItem("quizData", jsonData);
}

saveBtn.addEventListener("click", function (event) {
    event.preventDefault();

    // User has entered  initials and clicked "submit" 
    // store their data
    saveBtn.disabled = true;
    saveData();
    displayHighScores();
});

function displayHighScores() {
    endPage.setAttribute("class", "hide");
    highScorePage.setAttribute("class", "show");
    scoreTimer.setAttribute("class", "hide");

    // Get data from localStorage
    const jsonData = localStorage.getItem("quizData");
    console.log("jsonData quizData is ", jsonData)

    // Convert the JSON string to an object
    const data = JSON.parse(jsonData);
    resultEl.innerHTML = "";
    // If there is data to display, retreive it and append to resultEl
    if (data) {
        // Sort the ddata from highest score to lowest
        const sortedData = data.sort(function (a, b) {
            return b.score - a.score;
        });
        debugger;
        // Output initials and score to web page
        for (let i = 0; i < sortedData.length; i++) {
            const initials = document.createElement("span");
            const score = document.createElement("span");

            initials.innerText = (i + 1) + ". " + sortedData[i].initials + " - ";
            score.innerText = sortedData[i].score;
            resultEl.appendChild(initials);
            resultEl.appendChild(score);
            resultEl.appendChild(document.createElement("br"));
            resultEl.setAttribute("class", "flexrow result");

        }

    } else {
        // No data to display, remove all children under resultEl
        while (resultEl.firstChild) {
            resultEl.removeChild(resultEl.firstChild);
        }
    }
}




resetBtn.addEventListener("click", function (event) {
    event.preventDefault();

    resetBtn.disabled = true;
    //User has clicked either GO BACK or CLEAR HIGH SCORES
    var choice = event.target;
    var userAction = choice.innerHTML;
    console.log("User wants to ", userAction);
    highScorePage.setAttribute("class", "hide");
    debugger;
    if (userAction === "Go Back") {
        console.log("Go Back to start of game")
        init();
    } else if (userAction === "Clear High Scores") {
        //CLEAR HIGH SCORES
        console.log("Add code to clear high scores")
        window.localStorage.clear();
        displayHighScores();
    }
});


init();

