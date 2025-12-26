const error = document.getElementById('err');
const input = document.getElementById('inp');
const btn = document.getElementById('btn');
const chances = document.getElementById('chance');
const loseStat = document.getElementById('lose');
const point = document.getElementById('points');

let array = [];
function* randomNumber() {
    let n1 = 0;

    while (true) {
        yield n1;
        const temp = n1;
        n1 = temp + 1;
    }
}

let number = randomNumber();

for (let value of number) {

    if (value >= 101) {
        break;
    }
    const random = Math.floor(Math.random() * value) + 1;
    array.push(random);
}

const guessingNumber = array[100];

let counter = 0;
let guessCount = 5;
btn.addEventListener('click', () => {
    guessCount--;
    chances.innerHTML = `You have ${guessCount} chance left`
    if (guessCount <= 0) {
        loseStat.innerHTML = `YOU LOSE`;
        error.remove();
        btn.remove();
        setTimeout(() => {
            location.reload(true)
        }, 3000)
    }
    const guessedNumber = input.value;

    if (guessingNumber < guessedNumber) {
        error.innerHTML = `you're too high`
    } else if (guessingNumber > guessedNumber) {
        error.innerHTML = `you're too low`
    } else if (guessingNumber == guessedNumber) {
        error.innerHTML = ` Congrats you won`;
        counter++;
        localStorage.setItem("lastAnswerCorrect", "true")
        setTimeout(() => {
            location.reload(true)
        }, 3000);
    } else {
        localStorage.setItem("lastAnswerCorrect", "false");
    }
});

window.addEventListener("load", () => {
    let score = Number(localStorage.getItem("score")) || 0;
    const wasCorrect = localStorage.getItem("lastAnswerCorrect");

    if (wasCorrect === "true") {
        score += 1;
        point.innerHTML = `You have ${score}/5 points`;
        localStorage.setItem("score", score);
        localStorage.removeItem("lastAnswerCorrect")
    } 
    
    if (score === 5) {
        score = 0;
        localStorage.setItem("score", score);
    }
})
