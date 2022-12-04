const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

var timeLeft = 30;
var elem = document.getElementById('timer');

var timerId = setInterval(countdown, 1000);
console.log();
function countdown() {
  if (timeLeft <= 0) {
    window.location.href="end.html"
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


const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter> MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    choices.forEach(choice=> {
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

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)

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