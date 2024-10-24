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

    const addInput = (player) => {
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

    const checkWinner = (rowOrCol) => {
        if (rowOrCol==="XXX") {
            console.log("You Win!");
            return;
        } else if (rowOrCol==="OOO") {
            console.log("You Lose!");
            return;
        } 
    }

    const checkSpaces = () => {

        //Horizontal Row Check
        for (const row of board) {
            const finalRow = row.reduce((total, currentPlace) => 
                total + currentPlace
            ,"")

            checkWinner(finalRow)
        };

        //Vertical Col Check
        let firstCol = "";
        for (let i = 0; i < 3; i++) {
            firstCol += board[i][0]

            checkWinner(firstCol)
        };

        let secCol = "";
        for (let i = 0; i < 3; i++) {
            secCol += board[i][1]

            checkWinner(secCol)
        };

        let thirdCol = "";
        for (let i = 0; i < 3; i++) {
            thirdCol += board[i][2]

            checkWinner(thirdCol)
        };

        //Diag col checks
        let firstDiagCol = ""
        firstDiagCol = board[0][0] + board[1][1] + board[2][2]
            checkWinner(firstDiagCol)

        let secDiagCol = ""
        secDiagCol = board[0][2] + board[1][1] + board[2][0]
            checkWinner(secDiagCol)
    }

    return { player, showGameBoard, resetGameBoard, addInput, checkSpaces };
}

const gameBoard = GameBoard();
gameBoard.addInput(gameBoard.player)
gameBoard.addInput(gameBoard.player)
gameBoard.addInput(gameBoard.player)
gameBoard.checkSpaces()