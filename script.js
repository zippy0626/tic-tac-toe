function GameBoard() {
    let board = [
        ["_","_","_"],
        ["_","_","_"],
        ["_","_","_"],
    ];

    let player = "X";

    const colPositions = {
        1:0,
        4:0,
        7:0,
        2:1,
        5:1,
        8:1,
        3:2,
        6:2,
        9:2,
    }

    const showGameBoard = () => {
        console.log("        Tic Tac Toe");
        board.forEach(row => {
            console.log(row);
        });
    };

    const resetGameBoard = () => {
        board = [
            ["_","_","_"],
            ["_","_","_"],
            ["_","_","_"],
        ];
    };

    const addInput = () => {
        let userInputPosition = prompt("Enter a number between 1-9");

        if (
            userInputPosition < 1 || 
            userInputPosition > 9 || 
            userInputPosition===null || 
            userInputPosition===undefined
        ) {
            return console.log("Please enter within the specified range.");
        };

        // Calculate row directly
        let row = Math.floor((userInputPosition - 1) / 3); //GPT
        let col = colPositions[userInputPosition];

        if (board[row][col] != "_") {
            return console.log("Position is already taken! Try again.");
        }

        board[row][col] = player;

        showGameBoard()
    }

    const checkWinner = () => {
        for (const row of board) {
            for (let i = 0; i < row.length; i++) {
                console.log(row[i]);
            };
        }
    }

    return { player, showGameBoard, resetGameBoard, addInput, checkWinner };
}

const gameBoard = GameBoard();
gameBoard.addInput()
gameBoard.addInput()
gameBoard.addInput()
// gameBoard.checkWinner()