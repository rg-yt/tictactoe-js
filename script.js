const gameboard = (function () {
  let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const updateBoard = (index, currentPlayer) => {
    if (typeof board[index] === "number" && index >= 0 && index <= 8) {
      board[index] = currentPlayer.marker;
      return true;
    } else {
      console.log(`Move at ${index} is invalid. Must make a valid move!"`);
      return false;
    }
  };

  const resetBoard = () => {
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  };

  const valuesAt = (array) => {
    const newArray = [];
    array.forEach((element) => {
      newArray.push(board[element]);
    });
    return newArray;
  };
  return { updateBoard, valuesAt, resetBoard };
})();

const Player = function (name, marker) {
  return { name, marker };
};

const game = (function () {
  let player1 = Player("Tyler", "X");
  let player2 = Player("Katie", "O");
  let currentPlayer = player1;

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const round = (box) => {
    if (gameboard.updateBoard(box.textContent, getCurrentPlayer())) {
      box.textContent = currentPlayer.marker;
      if (checkWin(currentPlayer)) {
        console.log(`${currentPlayer.name} wins!`);
      } else if (checkDraw()) {
        console.log(`It's a tie!`);
      } else {
        switchPlayer();
      }
    }
  };

  const checkDraw = () => {
    return gameboard
      .valuesAt([0, 1, 2, 3, 4, 5, 6, 7, 8])
      .every((value) => typeof value === "string");
  };

  const checkWin = (player) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let hasWon = false;
    winningCombos.forEach((combo) => {
      if (
        gameboard
          .valuesAt(combo)
          .every((value) => value === getCurrentPlayer().marker)
      ) {
        hasWon = true;
      }
    });

    return hasWon;
  };

  return { getCurrentPlayer, switchPlayer, checkDraw, round };
})();

const gameDisplay = (function () {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.addEventListener("click", function () {
      game.round(box);
    });
  });
})();
