const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkGameStatus();
    togglePlayer();
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkGameStatus() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      message.textContent = `${currentPlayer} wins!`;
      return;
    }
  }

  if (!gameBoard.includes('')) {
    gameActive = false;
    message.textContent = "It's a draw!";
    return;
  }
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
  });
}
