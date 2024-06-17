let inpField = document.querySelector(".input-field");
let time = document.querySelector(".inner span");
let mistake = document.querySelector(".mistake span");
let cpm = document.querySelector(".cpm span");
let wpm = document.querySelector(".wpm span");
const text = document.querySelector(".typing-text p");
let button = document.querySelector(".button");
// let circle = document.querySelector("svg circle");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;


function loadParagraph() {
    const index = Math.floor(Math.random() * paragraphs.length);
    text.innerHTML = "";
    paragraphs[index].split("").forEach((char) => {
        let span = `<span>${char}</span>`
        text.innerHTML += span;
    });

    text.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    text.addEventListener("click", () => inpField.focus());

}

function startTyping() {
    let characters = text.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    document.querySelector("circle").classList.add("start");


    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            isTyping = true;
            timer = setInterval(initTimer, 1000);

        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        }
        else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm2 = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm2 = wpm2 < 0 || !wpm2 || wpm2 === Infinity ? 0 : wpm2;

        wpm.innerText = wpm2;
        mistake.innerText = mistakes;
        cpm.innerText = charIndex - mistakes;
    }
    else{
        clearInterval(timer);
        inpField.value = "";
    }
}


function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpm1 = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerHTML = wpm1;
    } else {
        clearInterval(timer);
    }
}

function resetGame(){
    loadParagraph();
    clearInterval(timer);
    document.querySelector("circle").classList.remove("start");
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    time.innerText = timeLeft;
    wpm.innerText = 0;
    mistake.innerText = 0;
    cpm.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", startTyping);
button.addEventListener("click",resetGame);