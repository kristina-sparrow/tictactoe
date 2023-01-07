// player factory function
const createPlayer = (name, marker) => {
  return { name, marker };
};

// gameboard object
const gameBoard = () => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return {
    board,
  };
};

//game object
