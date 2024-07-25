"use stricts";
const options = ["rock", "paper", "scissors"];
const images = document.querySelectorAll(".imgs");
const play = document.querySelector(".play");
const playAgain = document.querySelector(".restart");
const cancel = document.querySelector(".cancel");
const message = document.querySelector(".message");

let curPlayer = "p1";
let userChoice = {
  p1: "",
  p2: "",
};

let playGame = false;

function onPlayAgain() {
  reset();
  play.classList.add("hidden");

  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove("hidden");
  }
}
function onCancel() {
  reset();
  play.classList.remove("hidden");

  for (let i = 0; i < images.length; i++) {
    images[i].classList.add("hidden");
  }
}

function reset() {
  playAgain.classList.add("hidden");
  cancel.classList.add("hidden");
  message.classList.add("hidden");

  curPlayer = "p1";
  userChoice.p1 = "";
  userChoice.p2 = "";
}

function checkWinner(p1choice, p2choice) {
  message.classList.remove("hidden");
  playAgain.classList.remove("hidden");
  cancel.classList.remove("hidden");

  if (p1choice === p2choice) {
    message.textContent = "It is a Draw !";
    return;
  }

  if (
    (p1choice === "rock" && p2choice === "scissor") ||
    (p1choice === "scissor" && p2choice === "paper") ||
    (p1choice === "paper" && p2choice === "rock")
  ) {
    message.textContent = "Player 1 wins";
    return;
  }

  message.textContent = "Player 2 wins";
  return;
}
function game() {
  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", function () {
      if (!userChoice.p1 || !userChoice.p2) {
        const elPlayer = images[i].dataset.player;
        if (elPlayer === curPlayer) {
          userChoice[elPlayer] = images[i].dataset.itemName;
          for (let j = 0; j < images.length; j++) {
            if (
              images[j].dataset.player === curPlayer &&
              images[j].dataset.itemName !== userChoice[curPlayer]
            ) {
              images[j].classList.add("hidden");
            }
          }
          if (userChoice.p1 && userChoice.p2) {
            checkWinner(userChoice.p1, userChoice.p2);
            return;
          }
          curPlayer = curPlayer === "p1" ? "p2" : "p1";
        }
      }
    });
  }
}

play.addEventListener("click", () => {
  play.classList.add("hidden");

  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove("hidden");
  }
  game();
});

cancel.addEventListener("click", onCancel);
playAgain.addEventListener("click", onPlayAgain);
