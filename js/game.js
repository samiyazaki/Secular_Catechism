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

var timeLeft = 30; // I set this timer to 30 seconds because I wanted a sense of urgency. It's definitely not because I'm unoriginal.
var elem = document.getElementById('timer');

var timerId = setInterval(countdown, 1000);
console.log();
function countdown() {
  if (timeLeft <= 0) {
    window.location.href="end.html" // This sends the user to the end.html page where the score is displayed and they can enter their name.
    localStorage.setItem('mostRecentScore', score)
  } else {
    elem.innerHTML = timeLeft + '';
    timeLeft--;
  }
}

let questions = [
    {
        question: 'What percent of developers use JavaScript?',
        choice1: '42',
        choice2: '12%',
        choice3: '78%',
        choice4: 'console.log("Hello world!")',
        answer: 3, 
    }, 
    {
        question: 'Which of the following is NOT a way to declare a variable in JavaScript?',
        choice1: 'var',
        choice2: 'I DECLARE BANKRUPTCY!!!',
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
        question: 'What are escape characters for?',
        choice1: 'When you\'re on a bad date and need to get away',
        choice2: 'When a writer needs to increase the drama but couldn\'t let a main character expire',
        choice3: 'They are placed to allow special characters to display when they normally wouldn\'t',
        choice4: 'They\'re used as placeholders for potty words',
        answer: 3,
    }, 
]


const getPoints = 100
const numQuestions = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter> numQuestions) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${numQuestions}`
    progressBarFull.style.width = `${(questionCounter/numQuestions) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice=> {
        //choice.parentElement.classList.add('hover-add')
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

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        //selectedChoice.parentElement.classList.add('hover-none')
        if(classToApply === 'correct') {
            incrementScore(getPoints);
        } 
        
        if(classToApply === 'incorrect'){
          timeLeft -=5;
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