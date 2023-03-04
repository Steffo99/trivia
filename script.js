const questionElement = document.getElementById("question");
let correctAnswerNumber = null;

async function fetchQuestion() {
    r = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    j = await r.json();
    d = j["results"][0];
    questionElement.innerHTML = d["question"];
    correctAnswerNumber = Math.floor(Math.random() * 4);
    for(let i = 0; i < 4; i++) {
        if(i === correctAnswerNumber) {
            document.getElementById("answer-" + String(i)).innerHTML = d["correct_answer"];
        }
        else {
            document.getElementById("answer-" + String(i)).innerHTML = d["incorrect_answers"].pop();
        }
    }
}

function colorAnswers() {
    for(let i = 0; i < 4; i++) {
        if(i === correctAnswerNumber) {
            document.getElementById("answer-" + String(i)).className += " correct";
        }
        else {
            document.getElementById("answer-" + String(i)).className += " incorrect";
        }
    }
    correctAnswerNumber = null;
}

function cleanup() {
    for(let i = 0; i < 4; i++) {
        let answerElement = document.getElementById("answer-" + String(i));
        answerElement.className = answerElement.className.replace(" correct", "");
        answerElement.className = answerElement.className.replace(" incorrect", "");
    }
}

document.onkeypress = async function(e) {
    if(correctAnswerNumber == null) {
        await fetchQuestion();
        await cleanup();
    }
    else {
        await colorAnswers();
    }
};
document.onclick = document.onkeypress;
