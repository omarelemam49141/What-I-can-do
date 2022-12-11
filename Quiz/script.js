let qNumber = 0,
    rightAnswersCount = 0,
    counter = 3,
    countSpan = document.querySelector('.header .count span'),
    spans = document.querySelector('.footer .bullets .spans'),
    qHeader = document.querySelector('.question'),
    answers = document.querySelector('.options'),
    submitButton = document.querySelector('input[type="submit"]'),
    quizResult = document.querySelector('.footer .bullets .result'),
    counterContainer = document.querySelector('.timer');

let data = [
    {
        "title" : "What is 4 X 4 ?",
        "answer_1" : "17",
        "answer_2" : "16",
        "answer_3" : "18",
        "answer_4" : "19",
        "right_answer" : "16"
    },

    {
        "title" : "What is 4 / 4 ?",
        "answer_1" : "2",
        "answer_2" : "3",
        "answer_3" : "1",
        "answer_4" : "0",
        "right_answer" : "1"
    },

    {
        "title" : "What is 5 X 4 ?",
        "answer_1" : "20",
        "answer_2" : "19",
        "answer_3" : "25",
        "answer_4" : "24",
        "right_answer" : "20"
    },

    {
        "title" : "What is 4 X 3 ?",
        "answer_1" : "12",
        "answer_2" : "13",
        "answer_3" : "14",
        "answer_4" : "11",
        "right_answer" : "12"
    },

    {
        "title" : "What is 2 + 3 ?",
        "answer_1" : "6",
        "answer_2" : "7",
        "answer_3" : "5",
        "answer_4" : "8",
        "right_answer" : "5"
    },

    {
        "title" : "What is 6 X 6 ?",
        "answer_1" : "36",
        "answer_2" : "30",
        "answer_3" : "35",
        "answer_4" : "34",
        "right_answer" : "36"
    },

    {
        "title" : "What is 6 / 2 ?",
        "answer_1" : "4",
        "answer_2" : "3",
        "answer_3" : "2",
        "answer_4" : "1.5",
        "right_answer" : "3"
    },

    {
        "title" : "What is 16 / 2 ?",
        "answer_1" : "4",
        "answer_2" : "8",
        "answer_3" : "7",
        "answer_4" : "5",
        "right_answer" : "8"
    },

    {
        "title" : "What is 18 / 2 ?",
        "answer_1" : "9",
        "answer_2" : "8",
        "answer_3" : "7",
        "answer_4" : "10",
        "right_answer" : "9"
    }
];

function getRequest () {
    dataLength = data.length;

    //questionCount
    questionsCount(dataLength);

    //fetchQuestion
    fetchQuestion(data, qNumber);

    //counter
    downCounter();

    //on click the submit button
    submitButton.onclick = () => {
        //check the right answer
        checkAnswer(data[qNumber], dataLength);

        //increase the questions number
        qNumber++;

        //reset counter
        clearInterval(countDownInterval);
        if (qNumber < dataLength) {
            downCounter();
        }

        if (qNumber < dataLength) {
            //Handling Bullets
            handlingBullets(qNumber);

            //empty data
            qHeader.innerHTML = "";
            answers.innerHTML = "";

            //next question
            fetchQuestion(data, qNumber);
        } else {
            //result
            result(dataLength);
        }  
    }
}

//add questions count & create bullets
function questionsCount (num) {
    //the questions number
    countSpan.innerHTML = num;

    //create bullets
    for (let i = 1; i <= num; i++) {
        let span = document.createElement('span');
        if (i === 1) {
            span.className = "on";
        }
        spans.appendChild(span);
    }
}

//Create the qustion with its possible answers
function fetchQuestion(data, qNum) {
    //get question content
    let questionContent = data[qNum].title;
    
    //create the text for the question
    qHeader.innerHTML = questionContent;

    //create the answers
    for (let i = 1; i <= 4; i++) {
        //create answer div
        let answer = document.createElement('div');
        answer.className = "answer";
        //create radio input and append it to the answer div
        let radioInput = document.createElement('input');
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', 'answer');
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = data[qNum][`answer_${i}`];
        answer.appendChild(radioInput);
        //create the label and append it to the answer div
        let label = document.createElement('label');
        label.setAttribute ('for', `answer_${i}`);
        let answerTitle = `answer_${i}`;
        label.innerHTML = data[qNum][answerTitle];
        answer.appendChild(label);
        //append the answer div to the answers
        answers.appendChild(answer);

        //check the first answer
        if (i === 1) {
            radioInput.checked = true;
        }
    }
}

//check answer
function checkAnswer (answer, dataLength) {
    //get the right answer
    let rightAnswer = answer.right_answer;
    
    //get all answers
    let allAnswers = document.querySelectorAll('input[type="radio"]');

    //get the checked answers
    let checkedAnswer;
    for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].checked) {
            checkedAnswer = allAnswers[i].dataset.answer;
        }
    }

    //check if the answer is right
    if (checkedAnswer.toString() === rightAnswer) {
        rightAnswersCount++;
    }
}

//handling bullets
function handlingBullets(num) {
    bullets = document.querySelectorAll('.footer .bullets .spans span');
    bullets[num].className = "on";
}

//result
function result(dataLength) {
    //remove the elements
    qHeader.remove();
    spans.remove();
    answers.remove();
    submitButton.remove(),
    counterContainer.remove();

    //add the result content
    let resultMessage;
    if (rightAnswersCount > (dataLength/2) && rightAnswersCount < dataLength) {
        resultMessage = `<div><span class="good">Good</span>, ${rightAnswersCount} are right</div>`;
    } else if (rightAnswersCount === dataLength) {
        resultMessage = `<div><span class="perfect">Perfect</span>, all answers are right</div>`;
    } else {
        resultMessage = `<div><span class="bad">Bad</span>, only ${rightAnswersCount} are right</div>`;
    }

    //append the result
    quizResult.innerHTML = resultMessage;
}

//counter
function downCounter() {
    counter = 3;
    let minutes, seconds;
    countDownInterval = setInterval(() => {
        minutes = parseInt(counter / 60);
        seconds = parseInt(counter % 60)
        
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        counterContainer.innerHTML = `${minutes}:${seconds}`;

        if (--counter < 0) {
            clearInterval(countDownInterval);
            submitButton.click();
        }
    }, 1000);
}

getRequest();