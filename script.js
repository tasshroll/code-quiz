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

const questionEl = document.querySelectorAll('current-question');
const choices = Array.from(document.querySelectorAll('choice-text'));
// 4 choices are storred in array
const choice1El = document.querySelectorAll('choice-1');
const choice2El = document.querySelectorAll('choice-2');
const choice3El = document.querySelectorAll('choice-3');
const choice4El = document.querySelectorAll('choice-4');
const responseEl = document.querySelectorAll('response');


//* This is the MIDDLE part of appp *//
function playGame() {


    console.log("playing game")
    console.log("choice1El is ", choice1El);
    debugger;
    // Display a Question and Choices
    if (timer === 0 || qCounter > maxQs) {
        start = false;
        middle = false;
        end = true;
        endGame();
    } else {
        qCounter++;
        console.log("Question Count is ", qCounter);
        console.log(availableQuestions[0].question);
        console.log(availableQuestions[0].choice1);
        questionEl.innerHTML = availableQuestions[qCounter].question;
        choice1El.innerHTML = availableQuestions[qCounter].choice1;
        choice2El.innerText = availableQuestions[qCounter].choice2;
        choice3El.innerText = availableQuestions[qCounter].choice3;
        choice4El.innerText = availableQuestions[qCounter].choice4;
    }

    function checkAnswer(e) {
        console.log("e is ", e, "availableQuestions[qCounter] is", availableQuestions[qCounter]);
        if (e === availableQuestions[qCounter].correctAnswer) {
            responseEl.textContent = "Correct";
        } else {
            responseEl.textContent = "Wrong";
        }
    }

    // choice1El.addEventListener('click', checkAnswer(choice1El));
    // choice2El.addEventListener('click', checkAnswer(choice2El));
    // choice3El.addEventListener('click', checkAnswer(choice3El));
    // choice4El.addEventListener('click', checkAnswer(choice4El));


    // choice1El.addEventListener('click', e => {
    //     if (e.target === availableQuestions(qCounter).correctAnswer) {
    //         responseEl.innertext = "Correct";
    //     } else {
    //         responseEl.innertext = "Wrong";
    //     }
    // });
    // choice2El.addEventListener('click', e => {
    //     if (e.target === availableQuestions(qCounter).correctAnswer) {
    //         responseEl.innertext = "Correct";
    //     } else {
    //         responseEl.innertext = "Wrong";
    //     }
    // });
    // choice3El.addEventListener('click', e => {
    //     if (e.target === availableQuestions(qCounter).correctAnswer) {
    //         responseEl.innertext = "Correct";
    //     } else {
    //         responseEl.innertext = "Wrong";
    //     }
    // });
    // choice4El.addEventListener('click', e => {
    //     if (e.target === availableQuestions(qCounter).correctAnswer) {
    //         responseEl.innertext = "Correct";
    //     } else {
    //         responseEl.innertext = "Wrong";
    //     }
    // });
}



// var generateBtn = document.querySelector("#generate");

// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;
// }

// generateBtn.addEventListener("click", writePassword);






function displayStartPage() {
    console.log('Display Start Page');
    middle = true;
    start = false;
    var startBtn = document.querySelector("#start");
    startBtn.addEventListener("click", playGame);
}

function endGame() {
    console.log('Ending game');
}



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
var start = true;
var middle = false;
var end = true;

if (start) {
    displayStartPage();
}

// } else if (middle) {
//     debugger;
//     playGame();
// } else if (end) {
//     endGame();
// }

