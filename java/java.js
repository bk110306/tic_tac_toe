const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-game-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector(".msg");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
}

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
}

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

const showWinner = (winner) => {
  if (msg) {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
}

const showDraw = () => {
  if (msg) {
    msg.innerText = "No Winner! Game Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
}

const checkWinner = () => {
  let isDraw = true;

  winPatterns.forEach((pattern) => {
    const position1 = boxes[pattern[0]].innerText;
    const position2 = boxes[pattern[1]].innerText;
    const position3 = boxes[pattern[2]].innerText;

    if (position1 !== "" && position2 !== "" && position3 !== "") {
      if (position1 === position2 && position2 === position3) {
        showWinner(position1);
        isDraw = false;
      }
    }
  });

  if (isDraw) {
    let allFilled = true;

    boxes.forEach((box) => {
      if (box.innerText === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      showDraw();
    }
  }
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);