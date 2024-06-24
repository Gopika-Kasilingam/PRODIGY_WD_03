let currentPlayer = '';
let player1 = '';
let player2 = '';
let board = ['', '', '', '', '', '', '', '', ''];
let player1Wins = 0;
let player2Wins = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const boardContainer = document.getElementById('boardContainer');
const myForm = document.getElementById('myForm');
const result = document.getElementById('result');
const turn = document.getElementById('turn');
const player1NameDisplay = document.getElementById('player1Score');
const player2NameDisplay = document.getElementById('player2Score');
const gameAndScore = document.getElementById('gameAndScore');

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    gameAndScore.style.display = 'flex';
    myForm.style.display = 'none';
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    currentPlayer = 'X';
    updateTurn();
    // Set player names on scoreboard
    player1NameDisplay.innerText = `${player1}: 0`;
    player2NameDisplay.innerText = `${player2}: 0`;
});

function updateTurn() {
    turn.innerText = `Turn: ${currentPlayer === 'X' ? player1 : player2}`;
}

function playerMove(cellIndex) {
    if (!currentPlayer || isGameOver() || board[cellIndex] !== '') {
        return;
    }

    board[cellIndex] = currentPlayer;
    document.getElementsByClassName('cell')[cellIndex].innerText = currentPlayer;
    if (isGameOver()) {
        result.innerText = `Player ${currentPlayer === 'X' ? player1 : player2} wins!`;
        turn.innerText = '';
        highlightWinningCells();
        updateScore();
    } else if (board.every(cell => cell !== '')) {
        result.innerText = "It's a draw!";
        turn.innerText = '';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurn();
    }
}

function isGameOver() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function highlightWinningCells() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementsByClassName('cell')[a].classList.add('winning-cell');
            document.getElementsByClassName('cell')[b].classList.add('winning-cell');
            document.getElementsByClassName('cell')[c].classList.add('winning-cell');
        }
    }
}

function updateScore() {
    if (currentPlayer === 'X') {
        player1Wins++;
        player1NameDisplay.innerText = `${player1}: ${player1Wins}`;
    } else {
        player2Wins++;
        player2NameDisplay.innerText = `${player2}: ${player2Wins}`;
    }
}

function refreshBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    result.innerText = '';
    updateTurn();
    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.innerText = '';
        cell.classList.remove('winning-cell');
    }
}

function resetGame() {
    refreshBoard();
    player1Wins = 0;
    player2Wins = 0;
    player1NameDisplay.innerText = `${player1}: 0`;
    player2NameDisplay.innerText = `${player2}: 0`;
    gameAndScore.style.display = 'none';
    myForm.style.display = 'block';
}

function resetScoreboard() {
    player1Wins = 0;
    player2Wins = 0;
    player1NameDisplay.innerText = `${player1}: 0`;
    player2NameDisplay.innerText = `${player2}: 0`;
}
