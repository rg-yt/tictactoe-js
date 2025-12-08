const gameboard = (function () {
  const board = [];
  return { board };
})();

const Player = function (name, marker) {
  return { name, marker };
};

const game = (function () {
  let player1 = Player("Tyler", "X");
  let player2 = Player("Katie", "O");
  let currentPlayer = player1;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;
  return { getCurrentPlayer, switchPlayer };
})();
