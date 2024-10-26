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
        if (element===null) {
            return;
        }

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
        //if row is the same to player
        if (rowOrCol === "XXX" && gameBoard.getPlayer() === "X") {
            return true;
        }
        if (rowOrCol === "OOO" && gameBoard.getPlayer() === "O") {
            return true;
        }
        return false;
    }

    const checkWinner = () => {
        //Horizontal Row Check
        for (const row of board) {
            const finalRow = row.join("")
            if (checkForThrees(finalRow)) {
                return true;
            }
        };

        //Vertical Col Check
        let firstCol = "";
        for (let i = 0; i < 3; i++) {
            firstCol += board[i][0]
        }
        if (checkForThrees(firstCol)) {
            return true;
        };

        let secCol = "";
        for (let i = 0; i < 3; i++) {
            secCol += board[i][1]
        };
        if (checkForThrees(secCol)) {
            return true;
        }

        let thirdCol = "";
        for (let i = 0; i < 3; i++) {
            thirdCol += board[i][2]
        };
        if (checkForThrees(thirdCol)) {
            return true;
        }

        //Diag col checks
        let firstDiagCol = ""
        firstDiagCol = board[0][0] + board[1][1] + board[2][2]

        let secDiagCol = ""
        secDiagCol = board[0][2] + board[1][1] + board[2][0]

        if (checkForThrees(firstDiagCol) || checkForThrees(secDiagCol)) {
            return true;
        }

        //No winner
        return false;
    }

    const playGame = () => {
        
    }

    return { logGameBoard, setPlayer, getPlayer, getGameBoard, resetGameBoard, addInput, playGame, checkWinner };
}

const gameBoard = GameBoard();



function DisplayManager() {

    const renderSymbol = (clickedElement, symbol) => {
        if (clickedElement===null) {
            return;
        }
        
        if (clickedElement.innerHTML) {
            return;
        }

        if (symbol==="X") {
            clickedElement.innerHTML = `
                <img src="assets/icons/x-symbol.svg" alt="X" class="x"
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

    return { addListener }
}

const displayManager = DisplayManager()
displayManager.addListener()


// MODAL
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const playerTeamText = document.querySelector('.player-team');
const modalContinueBtn = document.querySelector('.continue-btn');

modal.addEventListener('click', (e) => {
    if (e.target.classList.value.includes("continue")) {
        return;
    }

    //Bundled event listener
    const clickedBtnClassList = e.target.closest(".btn").classList.value

    if (clickedBtnClassList.includes("x-team")) {
        gameBoard.setPlayer("X")
        playerTeamText.textContent = "You Chose Team X"

        return;
    }
    if (clickedBtnClassList.includes("o-team")) {
        gameBoard.setPlayer("O")
        playerTeamText.textContent = "You Chose Team O"

        return;
    }
});

modalContinueBtn.addEventListener('click', () => {
    if (!playerTeamText.textContent) {
        return;
    }

    modal.classList.toggle("hidden")
    overlay.classList.toggle("hidden")
});