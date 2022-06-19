let square = document.querySelectorAll("[data-square]");
let board = document.querySelector("[data-board]");
let restart = document.getElementById("restart");

let isCircleTurn;

let winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start Game
let startGame = () => {
  for (let cell of square) {
    isCircleTurn = false;
    cell.classList.remove("O");
    cell.classList.remove("X");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
};

// End Game
let endGame = (isDraw) => {
  if (isDraw) {
    window.alert("Empate!");
  } else {
    window.alert(isCircleTurn ? "O Venceu!" : "X Venceu!");
  }
};

// Check if is a win
let checkForWin = (currentPlayer) => {
  return winningCombination.some((combination) => {
    return combination.every((index) => {
      return square[index].classList.contains(currentPlayer);
    });
  });
};

let checkForDraw = () => {
  return [...square].every((cell) => {
    return cell.classList.contains("X") || cell.classList.contains("O");
  });
};

// Add a class to the board (X or O) depends who is playing
let placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

let setBoardHoverClass = () => {
  board.classList.remove("O");
  board.classList.remove("X");

  if (isCircleTurn) {
    board.classList.add("O");
  } else {
    board.classList.add("X");
  }
};

// Change the turn
let swapTurn = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

// Game functionality
let handleClick = (e) => {
  //Put de mark X or O
  let cell = e.target;
  let classToAdd = isCircleTurn ? "O" : "X";

  placeMark(cell, classToAdd);

  // check for victory
  let isWin = checkForWin(classToAdd);

  // check for draw
  let isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    //change symbol
    swapTurn();
  }
};

startGame();

restart.addEventListener("click", startGame);
