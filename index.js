// PLAYER FACTORY FUNCTION
const createPlayer = (name, marker) => ({ name, marker });

// GAMEBOARD OBJECT
const gameBoard = (() => {
  const display = document.querySelector("#gameboard");

  const boardArray = Array.from({ length: 9 }, () => "");
  boardArray.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.setAttribute("data-index", index);
    display.appendChild(cell);
  });

  Array.from(display.children).forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (game.gameOver) return;
      cell.classList.add(game.activePlayer.marker);
      cell.setAttribute("data", game.activePlayer.marker);
      boardArray[index] = game.activePlayer.marker;
      cell.style.pointerEvents = "none";
      game.movesRemaining -= 1;
      game.checkGameOver();
      if (game.movesRemaining === 0 && game.gameOver === false) {
        game.endGame("It's a tie!");
      } else {
        game.nextPlayer();
      }
    });
  });

  return {
    boardArray,
  };
})();

// GAME OBJECT
const game = (() => {
  const playerOne = createPlayer("Player 1", "x");
  const playerTwo = createPlayer("Player 2", "o");
  const activePlayer = playerOne;
  const textDisplay = document.querySelector("#text-display");

  let gameOver = false;
  const movesRemaining = 9;
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
    if (gameOver) return;
    this.activePlayer = this.activePlayer === playerOne ? playerTwo : playerOne;
    textDisplay.textContent = `${this.activePlayer.name}, make your move.`;
  }

  function endGame(string) {
    gameOver = true;
    textDisplay.textContent = string;
  }

  function checkGameOver() {
    const hasWon = winConditions.some(
      ([a, b, c]) =>
        gameBoard.boardArray[a] === this.activePlayer.marker &&
        gameBoard.boardArray[b] === this.activePlayer.marker &&
        gameBoard.boardArray[c] === this.activePlayer.marker
    );
    if (hasWon) {
      endGame(`${this.activePlayer.name} wins!`);
    }
  }

  return {
    activePlayer,
    nextPlayer,
    movesRemaining,
    checkGameOver,
    endGame,
    get gameOver() {
      return gameOver;
    },
  };
})();
