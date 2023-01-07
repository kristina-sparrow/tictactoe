// player factory function
const createPlayer = (name, marker) => {
  return { name, marker };
};

// gameBoard object
const gameBoard = (() => {
  let boardArray = ["", "", "", "", "", "", "", "", ""];
  const board = document.querySelector("#gameboard");
  boardArray.forEach((item, index) => {
    const square = document.createElement("div");
    square.className = "square";
    board.appendChild(square);
  });

  Array.from(board.children).forEach((square, index) => {
    square.addEventListener("click", () => {
      if (game.gameOver) return;
      square.classList.add(game.activePlayer.marker);
      square.setAttribute("data", game.activePlayer.marker);
      boardArray[index] = game.activePlayer.marker;
      square.style.pointerEvents = "none";
      game.movesRemaining -= 1;
      game.checkGameOver();
      game.nextPlayer();
    });
  });

  return {
    boardArray,
  };
})();

//game object
const game = (() => {
  const playerOne = createPlayer("Player 1", "x");
  const playerTwo = createPlayer("Player 2", "o");
  let activePlayer = playerOne;
  let movesRemaining = 9;
  let gameOver = false;
  let result = "";
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function nextPlayer() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
  }

  function checkGameOver() {
    winConditions.forEach((item, index) => {
      if (
        gameBoard.boardArray[item[0]] === this.activePlayer.marker &&
        gameBoard.boardArray[item[1]] === this.activePlayer.marker &&
        gameBoard.boardArray[item[2]] === this.activePlayer.marker
      ) {
        result = `${this.activePlayer.name} wins!`;
        endGame(result);
      }
    });
    if (movesRemaining === 0) {
      result = "It's a tie!";
      endGame(result);
    }
  }

  function endGame(result) {
    gameOver = true;
    let winnerDisplay = document.querySelector("#text-display");
    winnerDisplay.textContent = result;
  }

  return {
    activePlayer,
    nextPlayer,
    movesRemaining,
    checkGameOver,
    gameOver,
  };
})();
