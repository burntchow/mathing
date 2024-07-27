let currentOperation = '';
let currentProblem = {};
let attempts = 0;
let correctAnswers = 0;
let totalAttempts = 0;
let timer;

function startGame(operation) {
    currentOperation = operation;
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
    document.getElementById('operation-title').innerText = `Practice ${operation.charAt(0).toUpperCase() + operation.slice(1)}`;
    startTimer();
    generateProblem();
}

function startTimer() {
    setTimeout(endGame, 120000); // 2 minutes
}

function generateProblem() {
    let num1 = Math.floor(Math.random() * 99) + 1;
    let num2 = Math.floor(Math.random() * 99) + 1;

    switch (currentOperation) {
        case 'add':
            currentProblem = {num1, num2, answer: num1 + num2};
            break;
        case 'subtract':
            currentProblem = {num1, num2, answer: num1 - num2};
            break;
        case 'multiply':
            currentProblem = {num1, num2, answer: num1 * num2};
            break;
        case 'divide':
            currentProblem = {num1, num2, answer: Math.floor(num1 / num2)};
            break;
    }

    document.getElementById('problem').innerText = `${currentProblem.num1} ${operationSymbol()} ${currentProblem.num2} =`;
    document.getElementById('answer').value = '';
}

function operationSymbol() {
    switch (currentOperation) {
        case 'add': return '+';
        case 'subtract': return '-';
        case 'multiply': return '*';
        case 'divide': return '/';
    }
}

function enterNumber(number) {
    document.getElementById('answer').value += number;
}

function clearAnswer() {
    document.getElementById('answer').value = '';
}

function submitAnswer() {
    let userAnswer = parseInt(document.getElementById('answer').value, 10);
    if (userAnswer === currentProblem.answer) {
        correctAnswers++;
        document.getElementById('feedback').innerText = 'Correct!';
        generateProblem();
    } else {
        attempts++;
        if (attempts >= 3) {
            document.getElementById('feedback').innerText = `Wrong! The correct answer was ${currentProblem.answer}`;
            generateProblem();
            attempts = 0;
        } else {
            document.getElementById('feedback').innerText = 'Wrong! Try again.';
        }
    }
    totalAttempts++;
}

function endGame() {
    alert(`Time's up! You attempted ${totalAttempts} problems and got ${correctAnswers} correct.`);
    location.reload();
}
