// PLAYER FACTORY FUNCTION
const createPlayer = (name, marker) => ({ name, marker });

// GAMEBOARD OBJECT
const gameBoard = (() => {
  const boardArray = ["", "", "", "", "", "", "", "", ""];
  const board = document.querySelector("#gameboard");
  boardArray.forEach((_, index) => {
    const square = document.createElement("div");
    square.className = "square";
    square.setAttribute("data-index", index);
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
  const movesRemaining = 9;
  let gameOver = false;
  const textDisplay = document.querySelector("#text-display");
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
