function GameBoard() {
    let board = [
        
        ["_","_","_"],
        ["_","_","_"],
        ["_","_","_"],
    ];

    let player = "X";

    const colPositions = {
        "one": 0,
        "four": 0,
        "seven": 0,
        "two": 1,
        "five": 1,
        "eight": 1,
        "three": 2,
        "six": 2,
        "nine": 2,
    }

    const setPlayer = (symbol) => {
        player = symbol;
    }

    const getPlayer = () => {
        return player;
    }

    const logGameBoard = () => {
        
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

    const getGameBoard = () => {
        return board;
    }

    const addInput = (element) => {

        //Get number word only
        let elementClass = element.classList.value.replace("square ", "")

        //Make row, col
        let row;
        if (elementClass==="one" || elementClass==="two" || elementClass==="three") {
            row = 0;
        }
        if (elementClass==="four" || elementClass==="five" || elementClass==="six") {
            row = 1;
        }
        if (elementClass==="seven" || elementClass==="eight" || elementClass==="nine") {
            row = 2;
        }
        
        let col = colPositions[elementClass]

        if (board[row][col] != "_") {
            return console.log("Position is already taken! Try again.");
        }

        board[row][col] = player;

        logGameBoard()
    }

    const checkForThrees = (rowOrCol) => {
        if (rowOrCol==="XXX") {
            console.log("You Win!");
            return;
        } else if (rowOrCol==="OOO") {
            console.log("You Lose!");
            return;
        } 
    }

    const checkWinner = () => {
        //Horizontal Row Check
        for (const row of board) {
            const finalRow = row.reduce((total, currentPlace) => 
                total + currentPlace
            ,"")

            checkForThrees(finalRow)
        };

        //Vertical Col Check
        let firstCol = "";
        for (let i = 0; i < 3; i++) {
            firstCol += board[i][0]

            checkForThrees(firstCol)
        };

        let secCol = "";
        for (let i = 0; i < 3; i++) {
            secCol += board[i][1]

            checkForThrees(secCol)
        };

        let thirdCol = "";
        for (let i = 0; i < 3; i++) {
            thirdCol += board[i][2]

            checkForThrees(thirdCol)
        };

        //Diag col checks
        let firstDiagCol = ""
        firstDiagCol = board[0][0] + board[1][1] + board[2][2]
            checkForThrees(firstDiagCol)

        let secDiagCol = ""
        secDiagCol = board[0][2] + board[1][1] + board[2][0]
            checkForThrees(secDiagCol)
    }

    return { player, logGameBoard, setPlayer, getPlayer, getGameBoard, resetGameBoard, addInput, checkWinner };
}

const gameBoard = GameBoard();
// gameBoard.setPlayer("O")


function DisplayManager() {

    const getCurrentSquares = () => {
        const squares = document.querySelectorAll('.square');

        return squares;
    }

    const renderSymbol = (clickedElement, symbol) => {
        if (clickedElement.innerHTML) {
            return;
        }

        if (symbol==="X") {
            clickedElement.innerHTML = `
                <img src="assets/icons/x-symbol.svg" alt="X"
                draggable="false">
            `
            return;
        }

        if (symbol==="O") {
            clickedElement.innerHTML = `
                <div class="o"></div>
            `
            return;
        }
    }

    const addListener = () => {
        document.querySelector('.container').addEventListener('click', (e) => {
            const square = e.target.closest(".square")
            
            //Update actual user display based on symbol
            renderSymbol(square, gameBoard.getPlayer())

            //Update gameBoard representation
            gameBoard.addInput(square)
        });
    }

    return { getCurrentSquares, addListener }
}

const displayManager = DisplayManager()
displayManager.addListener()