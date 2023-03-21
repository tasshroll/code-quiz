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
let qCounter = 0
let timeForQuiz = 75;
let timer = timeForQuiz;
const maxQs = availableQuestions.length;

// variables to SHOW and HIDE display pages
const startPage = document.querySelector('#start-page');
const middlePage = document.querySelector('#middle-page');
const endPage = document.querySelector('#end-page');
const highScorePage = document.querySelector('#high-score-page');
const scoreTimer = document.querySelector('#score-timer');

// Vars to select HTML elements
const questionEl = document.querySelector('#current-question');
const choices = Array.from(document.querySelectorAll('choice-text'));
// 4 choices for each question
const choice1El = document.querySelector('#choice-1');
const choice2El = document.querySelector('#choice-2');
const choice3El = document.querySelector('#choice-3');
const choice4El = document.querySelector('#choice-4');

// User resonse is either choice1, choice2, choice3, or choice4
const responseEl = document.querySelector('#response');

// Timer
var timerEl = document.querySelector('#timer');
var timeLeftEl = document.querySelector('#time-left');

const initialsEl = document.querySelector('#initials');
const scoreEl = document.querySelector('#score');
const resultEl = document.querySelector('#result');

// Set true when end of quiz is reached
var end;

// Buttons to trigger functions
var choiceBtn = document.querySelector('.game-choice-class');
var startBtn = document.querySelector("#start");
var saveBtn = document.querySelector("#save");
var resetBtn = document.querySelector("#re-set");
const highScoresLink = document.getElementById("high-scores");


function init() {
    startBtn.disabled = false;
    // Hide all pages except startPage
    startPage.setAttribute("class", "show");
    scoreTimer.setAttribute("class", "show");
    middlePage.setAttribute("class", "hide");
    endPage.setAttribute("class", "hide");
    highScorePage.setAttribute("class", "hide");

    //Display ViewHighScores link and Timer at top of page
    scoreTimer.setAttribute("class", "header-class show");

    //Reset question counter, end, and timer
    qCounter = 0;
    end = false;
    timer = timeForQuiz;
}


// Listen for "View High Scores" to be clicked
highScoresLink.addEventListener("click", function (event) {
    event.preventDefault();
    startPage.setAttribute("class", "hide");
    displayHighScores();
});


// Button to start quiz
startBtn.addEventListener("click", function () {
    event.preventDefault();
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
        //stop game if timer reaches 0 or end of game
        if (timer <= 0) {
            clearInterval(timerInterval);
            end = true;
            middlePage.setAttribute("class", "hide");
            // endGame;
            displayHighScores();
        } else if (timer >0 && end) {
            clearInterval(timerInterval);
            endGame;
        }
    }, 1000)
}

// display a Question and its Choices
function displayQuestion() {
    console.log("Question Count is ", qCounter);
    questionEl.innerHTML = availableQuestions[qCounter].question;
    choice1El.textContent = availableQuestions[qCounter].choice1;
    choice2El.innerText = availableQuestions[qCounter].choice2;
    choice3El.innerText = availableQuestions[qCounter].choice3;
    choice4El.innerText = availableQuestions[qCounter].choice4;
}

function checkAnswer() {
    // var choice = event.target;
    var choice = event.target.closest('.button-choices')

    var userAnswer = choice.innerHTML;
    console.log("choice clicked is ", userAnswer);
    if (userAnswer === availableQuestions[qCounter].correctAnswer) {
        console.log("CORRECT answer!!!")
        responseEl.innerText = "Correct!";
    } else {
        console.log("Wrong answer")
        responseEl.innerText = "Wrong!";
        // Take off 10 seconds for wrong answer
        timer = timer - 10;
    }
}

// Button to retreive the user choice
choiceBtn.addEventListener("click", function (event) {
    event.preventDefault();

    //Check if user choice is correct
    checkAnswer();
    // Display next question
    if (qCounter < maxQs - 1) {
        qCounter++;
        displayQuestion();
    } else {
        // All questions answered, end Quiz
        middlePage.setAttribute("class", "hide");
        end = true;
        choiceBtn.disabled = true;
        saveBtn.disabled = false;
        resetBtn.disabled = false;
        endGame();
    }
});


function endGame() {
    //Display the ending page with score/timer 
    endPage.setAttribute("class", "show");
    highScorePage.setAttribute("class", "hide");
    console.log("end game")
    console.log("Your Score is ", timer);
    timeLeftEl.innerHTML = timer;
}


function saveData() {
    const initials = document.getElementById("initials").value;
    const score = timer;
    // recentScore is an object with user initials and score from this quiz
    const recentScore =
    {
        initials: initials,
        score: score,
    };

    // highscoresArr is a dynamic array containing user initials and highscores from PRIOR games
    // Retreive local storage into highscoresArr and push the user initials and score from this quiz to end of array
    var highscoresArr = JSON.parse(window.localStorage.getItem('quizData')) || [];
    highscoresArr.push(recentScore);

    const jsonData = JSON.stringify(highscoresArr);
    localStorage.setItem("quizData", jsonData);
    console.log("Setting localStorage, look at debugger for key and new data", jsonData)
    // clear user input text area
    initialsEl.innerHTML = "";
}


// Button "Submit" that triggers a save
saveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    saveBtn.disabled = true;
    // User has entered  initials and clicked "submit" 
    // Save data and display scores
    saveData();
    displayHighScores();
    initialsEl.innerHTML = "";

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
        // Sort the data from highest score to lowest
        const sortedData = data.sort(function (a, b) {
            return b.score - a.score;
        });
        // Output the sortedData initials and score to web page
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
        // User has cleared high scores, so no data to display, 
        // Remove all children under resultEl
        while (resultEl.firstChild) {
            resultEl.removeChild(resultEl.firstChild);
        }
    }
}

// Buttons to 
// GO BACK - play game again or 
// CLEAR HIGH SCORES - clear out local storage
resetBtn.addEventListener("click", function (event) {
    event.preventDefault();

    resetBtn.disabled = true;
    //User has clicked either GO BACK or CLEAR HIGH SCORES
    var choice = event.target.closest('.end-quiz-button')
    var userAction = choice.innerHTML;
    console.log("User wants to ", userAction);
    highScorePage.setAttribute("class", "hide");

    if (userAction === "Go Back") {
        console.log("Go Back to start of game")
        init();
    } else if (userAction === "Clear High Scores") {
        //CLEAR HIGH SCORES
        window.localStorage.clear();
        displayHighScores();
    }
});


init();

