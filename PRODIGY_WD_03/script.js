document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("resetButton");
    const messageDisplay = document.getElementById("message");
    let isXTurn = true;
    let board = Array(9).fill(null);

    cells.forEach(cell => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    resetButton.addEventListener("click", resetGame);

    function handleCellClick(cell) {
        const index = cell.getAttribute("data-index");

        if (board[index] || checkWinner()) {
            return;
        }

        board[index] = isXTurn ? "X" : "O";
        cell.classList.add(isXTurn ? "x" : "o");
        cell.textContent = isXTurn ? "X" : "O";

        if (checkWinner()) {
            messageDisplay.textContent = `Congratulations! Player ${isXTurn ? "X" : "O"} wins the game!`;
        } else if (board.every(cell => cell)) {
            messageDisplay.textContent = "It's a draw! Try again!";
        }

        isXTurn = !isXTurn;
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

    function resetGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("x", "o");
        });
        messageDisplay.textContent = "";
        isXTurn = true;
    }
});
