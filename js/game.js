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

let questions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'How To Make Lasagna',
        choice2: 'Happy Time Make Laugh',
        choice3: 'Hyper Text Markup Language',
        choice4: 'Hippie Todd Misses London',
        answer: 3, 
    }, 
    {
        question: 'What does CSS stand for?',
        choice1: 'Chancho, Stop Stalling!',
        choice2: 'Cascading Style Sheets',
        choice3: 'Call Saul`s Stupid',
        choice4: 'Chinese Soup Stall',
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
        question: 'What is Camel Case?',
        choice1: 'How you keep your Camel clean',
        choice2: 'An unfortunate incident where a Camel stampede resulted in the stomping of many sandaled toes',
        choice3: 'Hyper Text Markup Language',
        choice4: 'A naming convention in which you capitalize the second word when combined',
        answer: 4, 
    }, 
]
function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        seconds = (diff % 60) | 0;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent =":" + seconds; 

        if (diff <= 0) {
            window.location.href="./end.html"
            localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
        }
    };
    timer();
    setInterval(timer, 1000);
}

window.onload = function () {
    var thirtySeconds = 30,
        display = document.querySelector('#time');
    startTimer(thirtySeconds, display);
};

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter> MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
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