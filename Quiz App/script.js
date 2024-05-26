let start = document.querySelector('.start-btn');
let land = document.querySelector('.landingcontainer');
let quiz = document.querySelector('.quizcontainer');
let end = document.querySelector('.endcontainer');
let playAgainBtn = document.querySelector('.play-again');
let homeBtn = document.querySelector('.go-home');
let currentQuestionIndex = 0;
let score = 0;

let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let questionNumberElement = document.querySelector('.question-number');
let scoreElement = document.querySelector('.score');
let finalScoreElement = document.querySelector('.final-score');

start.addEventListener('click', startQuiz);
playAgainBtn.addEventListener('click', startQuiz);
homeBtn.addEventListener('click', () => {
    end.style.display = 'none';
    land.style.display = 'flex';
});
let count;
function startQuiz() {
    land.style.display = 'none';
    quiz.style.display = 'flex';
    end.style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    count = 0;
    updateQuestionNumber();
    updateScore();
    updateProgressBar();

    const questionContainers = document.getElementsByClassName('question-container');
    for (let i = 0; i < questionContainers.length; i++) {
        questionContainers[i].style.display = 'none';
        let options = questionContainers[i].getElementsByClassName('option');
        for (let j = 0; j < options.length; j++) {
            options[j].style.backgroundColor = '';
            options[j].getElementsByClassName('optiontext')[0].style.backgroundColor = '';
            options[j].getElementsByClassName('optionnumber')[0].style.backgroundColor = '';
        }
    }

    if (questionContainers.length > 0) {
        questionContainers[0].style.display = 'block';
    }
}

function updateQuestionNumber() {
    questionNumberElement.textContent = `Question: ${currentQuestionIndex + 1}`;
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

questions.forEach((q, index) => {
    let questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';
    questionContainer.style.display = index === 0 ? 'block' : 'none';

    let question = document.createElement('div');
    question.className = 'question';
    question.textContent = q.question;
    questionContainer.appendChild(question);

    let optionsContainer = document.createElement('div');
    optionsContainer.className = 'optioncontainer';

    for (let i = 1; i <= 4; i++) {
        let option = document.createElement('div');
        option.className = 'option';

        let optionNumber = document.createElement('span');
        optionNumber.className = 'optionnumber';
        optionNumber.textContent = String.fromCharCode(64 + i);

        let optionText = document.createElement('div');
        optionText.className = 'optiontext';
        optionText.textContent = q['choice' + i];

        option.appendChild(optionNumber);
        option.appendChild(optionText);
        //count = 0;

        option.addEventListener('click', function () {
            if (count == 0) {
                if (i === q.answer) {
                    option.style.setProperty('background-color', 'green', 'important');
                    optionText.style.setProperty('background-color', 'green', 'important');
                    optionNumber.style.setProperty('background-color', 'green', 'important');
                    score += 10;
                    updateScore();
                    updateProgressBar();
                } else {
                    option.style.setProperty('background-color', 'red', 'important');
                    optionText.style.setProperty('background-color', 'red', 'important');
                    optionNumber.style.setProperty('background-color', 'red', 'important');
                }
            }


            count++;
            setTimeout(function () {
                questionContainer.style.display = 'none';

                if (index < questions.length - 1) {
                    currentQuestionIndex++;
                    updateQuestionNumber();
                    updateProgressBar();
                    document.getElementsByClassName('question-container')[index + 1].style.display = 'block';
                } else {
                    quiz.style.display = 'none';
                    end.style.display = 'flex';
                    finalScoreElement.textContent = `Final Score: ${score}`;
                }
            }, 1000);
        });

        optionsContainer.appendChild(option);
    }

    questionContainer.appendChild(optionsContainer);

    quiz.appendChild(questionContainer);
});
function updateProgressBar() {
    count=0;
    const progressBar = document.querySelector('.progress-bar');
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}
