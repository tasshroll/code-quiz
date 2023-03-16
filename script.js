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

//Global variables


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

var acceptingChoices;
var end;

var choiceBtn = document.querySelector('.game-choice-class');
var startBtn = document.querySelector("#start");


startBtn.addEventListener("click", function () {
    console.log("AcceptingChoices is", acceptingChoices);
    console.log("End is", end);
    timer = 75;
    acceptingChoices = true;
    end = false;
    console.log("AcceptingChoices is", acceptingChoices);
    console.log("End is", end);
    displayQuestion();
});
//* This is the MIDDLE part of appp *//



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


// function getNextQuestion {
//     qCounter++
//     playGame;
// }



// function checkAnswer(event) {
//     console.log("User picked ", event.target.value, "availableQuestions[qCounter] is", availableQuestions[qCounter].correctAnswer);
//     event.preventDefault();
//     if (event.target.value === availableQuestions[qCounter].correctAnswer) {
//         responseEl.innerText = "Correct";
//     } else {
//         responseEl.innerHTML = "Wrong";
//         //* A wrong answer causes 10 seconds off timer
//         timer = timer - 10;
//     }
// }

choiceBtn.addEventListener("click", function (event) {
    //Check if user choice is correct
    var choice = event.target;
    var userAnswer = choice.innerHTML;
    console.log("choice clicked is ", userAnswer);

    if (userAnswer === availableQuestions[qCounter].correctAnswer) {
        console.log("CORRECT answer!!!")
        responseEl.innerText = "Correct";
    } else {
        console.log("Wrong answer")
        responseEl.innerText = "Wrong";
        timer = timer - 10;
    }


    //* While game is in progress, Decrement timer every second
    var timerInterval = setInterval(function () {
        timer--;
        timerEl.innerText = timer;
        console.log("Timer El is ", timerEl);
        //stop game if timer reaches 0
        if (timer <= 0) {
            clearInterval(timerInterval);
            end = true;
            acceptingChoices = false;
            endGame;
        }
    }, 1000)
    
    // Display next question if there are more
    if (qCounter < maxQs - 1) {
        qCounter++;
        displayQuestion();
    } else {
        acceptingChoices = false;
        end = true;
        endGame();
    }

});


if (end) {
    endGame;
} else if (acceptingChoices) {
    console.log("TIMER is ", timer);

    //* While game is in progress, Decrement timer every second
    var timerInterval = setInterval(function () {
        timer--;
        timerEl.innerText = timer;
        //stop game if timer reaches 0
        if (timer <= 0) {
            clearInterval(timerInterval);
            end = true;
            acceptingChoices = false;
            endGame;
        }
    }, 1000)

}

// choice1El.addEventListener("click", function (event) {
//     console.log("Event is", event.target.innerHTML);
//     var choice = event.target.innerHTML;
//     var correctAnswer = availableQuestions[qCounter].correctAnswer;
//     console.log("User picked ", choice1El.innerHTML, "availableQuestions[qCounter] is", availableQuestions[qCounter].correctAnswer);
//     debugger;
//     event.preventDefault();
//     if (choice === correctAnswer) {
//         console.log("CORRECT answer!!!")
//         responseEl.innerText = "Correct";
//         $('#response').css('border-bottom', 'bold 10px');
//     } else {
//         console.log("Wrong answer")
//         responseEl.innerText = "Wrong";
//         $('#response').css('border-bottom', 'bold 10px');
//         timer = timer - 10;
//     }
//     console.log("responseEl is", responseEl.innerText);
//     // renderLastRegistered();
// });
//2:45 3-13 ZOOM    21 iNS local storage  8:45pm
// JSON.stringify(highschores)
// Will need this for high scores
//JSON is very impportant to being a developer
//

// highscores is dynamic array appending user initials and highscores
function endGame() {
    console.log("end game")
    // debugger;
    console.log("Your Score is ", timer);
    timeLeftEl.innerHTML = timer;

    let highscores = [
        {
            initials: "",
            score: 0,
        }
    ]

    // Retreive high scores from prior games
    var data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
        data = {
            initials: "John Doe",
            score: 44,
        }
    }

}

// function displayStartPage() {
//     console.log('Display Start Page');
//     middle = true;
//     start = false;
// }




//Receive users input and check if it is correct answer to question
// choices(1).addEventListener ('click', e => {
//     const selectedChoice = e.target
//     if (e.target == availableQuestions(qCounter).correctAnswer) {
//         null;
//     } else
//      null;
// })


//* Start is the initial display - TRUE to begin
//* Middle is the code-Quiz with questions
//* End is the time results & initials


// if (start) {
//     console.log("Start is", start);
//     console.log("AcceptingChoices is", acceptingChoices);
//     console.log("Middle is", middle);
//     console.log("End is", end);

//     timer = 75;
//     start = false;
//     middle = true;
//     end = false;
//     acceptingChoices = false;
// }

// } else if (acceptingChoices) {
//     console.log("AcceptingChoices and playing game");
//     debugger;
//     playGame;
// } else if (end) {
//     acceptingChoices = false;
//     start = false;
//     middle = false;
//     end = true;
//     endGame;
// }

// $('#start-page').show;

// Use jQuery to show/hide each section of the game
// if (start) {
    // $('#middle-page').hide;
    // $('#end-page').hide;

    // startPage.setAttribute("class", "show");
//     displayStartPage();
// }

// } else if (middle) {
    // $('#start-page').hide;
        // $('#middle-page').show;

//     debugger;
//     playGame();
// } else if (end) {
// $('#middle-page').hide;
// $('#end-page').show;

//     endGame();
// }

