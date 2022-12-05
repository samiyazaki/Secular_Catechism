const question = document.querySelector('#question');// Calls the item with the CSS title question as a constant. I wish my friends called me this much. Or at all. Am I a shitty friend?
const choices = Array.from(document.querySelectorAll('.choice-text'));//Created an array from all of the CSS items labeled .choice-text, which were the questions in the game.js file. This was a neat trick, thank you Youtube.
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var correctSound;

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

var correctAudio = new Audio("../assets/sounds/Correct.mp3")
var incorrectAudio = new Audio("../assets/sounds/Incorrect.mp3")

function playAudio(correct) {
   if(correct) {
    correctAudio.play();
    return;
   }
   incorrectAudio.play();
   return;
  }
var timeLeft = 30; // I set this timer to 30 seconds because I wanted a sense of urgency. It's definitely not because I'm unoriginal.
var elem = document.getElementById('timer');

var timerId = setInterval(countdown, 1000);
console.log();
function countdown() {
  if (timeLeft <= 0) {
    window.location.href="end.html" // This sends the user to the end.html page where the score is displayed and they can enter their name.
    localStorage.setItem('mostRecentScore', score) // This saves the score at end of timer so that it doesn't default to 400. Thank you to my study group for telling me why I was wrong to not include this.
  } else {
    elem.innerHTML = timeLeft + '';
    timeLeft--; //This continues to subtract time as long as the time left is greater than or equal to 0.
  }
}

let questions = [
    {
        question: 'What percent of developers use JavaScript?', // This is probably not correct but that's what google told me. And the internet never lies. right?
        choice1: '42',
        choice2: '12%',
        choice3: '78%',
        choice4: 'console.log("Hello world!")',
        answer: 3, 
    }, 
    {
        question: 'Which of the following is NOT a way to declare a variable in JavaScript?',
        choice1: 'var',
        choice2: 'I DECLARE BANKRUPTCY!!!', // Sorry Michael, I don't think that's how it works.
        choice3: 'let',
        choice4: 'const',
        answer: 2, 
    }, 
    {
        question: 'Who created JavaScript?',
        choice1: 'Brendan Eich',
        choice2: 'You did, you genius.',
        choice3: 'Al Gore',
        choice4: 'It has existed since the dawn of time',
        answer: 1, 
    }, 
    {
        question: 'Which of the following is NOT a type of pop up box in JavaScript?',
        choice1: 'Alert',
        choice2: 'Confirm',
        choice3: 'Prompt',
        choice4: 'Amazon',
        answer: 4, 
    }, 
    {
        question: 'What are escape characters for?', // I used escapes in this question just for you, dear grader.
        choice1: 'When you\'re on a bad date and need to get away',
        choice2: 'When a writer needs to increase the drama but couldn\'t let a main character expire',
        choice3: 'They are placed to allow special characters to display when they normally wouldn\'t',
        choice4: 'They\'re used as placeholders for potty words',
        answer: 3,
    }, 
]


const getPoints = 100 //sets the amount of points added per correct answer
const numQuestions = 5 // sets the number of questions asked. I would put more but I'm out of time, not lazy.

startGame = () => { //This is the start of the game
    questionCounter = 0 // The amount of questions asked. For the progress bar which I think was a cool addition
    score = 0 //Your starting score. You can increase it by answering questions correctly. Or just change this number to whatever you want.
    availableQuestions = [...questions]
    getNewQuestion()//This loads the question at start and then also after you finish another question
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter> numQuestions) { // This keeps track of the number of questions left or if you somehow managed to go past the numQuestions variable. Probably through magic.
        localStorage.setItem('mostRecentScore', score) // Sets your score to local storage
        return window.location.assign('end.html') // Sends you to the end.html page
    }
    questionCounter++ // Increases the questions
    progressText.innerText = `Question ${questionCounter} of ${numQuestions}` // This is the display at the top of the page that tells you how many questions of the total
    progressBarFull.style.width = `${(questionCounter/numQuestions) * 100}%` // This is the fractional calculation for the progress bar

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice=> {
        //choice.parentElement.classList.add('hover-add') This lets me add a class to the item. I was attempting to remove the glow button hover effect and then add it back. It doesn't work. I tried.
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' //Sets a variable to each question to determine if the answer is correct or not. 
        //selectedChoice.parentElement.classList.add('hover-none') This was all part of the earlier attempt to remove the hover effect so you could see the question change color when selected. This worked but removed the class entirely resulting in the app breaking.
        if(classToApply === 'correct') {
            incrementScore(getPoints); // This adds 100 points on a correct answer
            playAudio(true);
        } 
        
        if(classToApply === 'incorrect'){
          timeLeft -=5; //This subtracts 5 seconds on an incorrect answer.
            playAudio(false);
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()