// player factory function
const createPlayer = (name, marker) => {
  return { name, marker };
};

// gameboard object
const gameBoard = (() => {
  let boardArray = ["", "", "", "", "", "", "", "", ""];

  let board = document.querySelector("#gameboard");
  boardArray.forEach((item, index) => {
    const square = document.createElement("div");
    square.className = "square";
    board.appendChild(square);
  });

  Array.from(board.children).forEach((square, index) => {
    square.addEventListener("click", () => {
      square.classList.add(game.activePlayer.marker);
      square.setAttribute("data", game.activePlayer.marker);
      board[index] = game.activePlayer.marker;
      square.style.pointerEvents = "none";
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

  function nextPlayer() {
    this.activePlayer === playerOne
      ? (this.activePlayer = playerTwo)
      : (this.activePlayer = playerOne);
  }

  return {
    activePlayer,
    nextPlayer,
  };
})();
