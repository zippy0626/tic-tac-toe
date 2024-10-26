function GameBoard() {
    let isPlayersTurn = true;

    let board = [
        
        ["_","_","_"],
        ["_","_","_"],
        ["_","_","_"],
    ];

    let playerSymbol = "X";

    const positionMapper = {
        "one": [0, 0],
        "two": [0, 1],
        "three": [0, 2],
        "four": [1, 0],
        "five": [1, 1],
        "six": [1, 2],
        "seven": [2, 0],
        "eight": [2, 1],
        "nine": [2, 2]
    };

    //
        const getIsPlayerTurn = () => {
            return isPlayersTurn;
        }
        const setIsPlayerTurn = (bool) => {
            isPlayersTurn=bool;
        }

        const setPlayerSymbol = (symbol) => {
            playerSymbol = symbol;
        }

        const getPlayerSymbol = () => {
            return playerSymbol;
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
    //    
    
    // ADD MOVES TO BOARD REPRESENTATION
    const updateBoard = (symbol, position) => {//both str
        let [row, col] = positionMapper[position]

        if (board[row][col]!="_") {
            console.log("Position is already taken!");
            return;
        }

        board[row][col] = symbol

        console.table(board);
    }
    //

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

    const checkWinner = () => {//
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

    return { logGameBoard, setPlayerSymbol, getPlayerSymbol, getGameBoard, resetGameBoard, updateBoard, checkWinner, getIsPlayerTurn, setIsPlayerTurn };
}

const gameBoard = GameBoard();


function DisplayManager() {
    const squares = Array.from(document.querySelectorAll('.square'));

    const collectHumanInput = () => {
        const squaresContainer = document.querySelector('.container');

        squaresContainer.addEventListener('click', (e) => {
            
            if (!scoreBoardText.classList.contains("hidden")) {
                scoreBoardText.classList.toggle("hidden")
            }

            const squarePos = e.target.classList.value.replace("square ","")
            
            showOnDOM(gameBoard.getPlayerSymbol(), squarePos)
        });
    }
    
    //Player and Bot Using this
    const showOnDOM = (symbol, position) => {
       
        const squares = Array.from(document.querySelectorAll('.square'));

        //Mapping Approach with Obj's
        const positionIndex = {
            "one": 0,
            "two": 1,
            "three": 2,
            "four": 3,
            "five": 4,
            "six": 5,
            "seven": 6,
            "eight": 7,
            "nine": 8
        };

        const symbolHTML = {
            "X": `<img src="assets/icons/x-symbol.svg" alt="X" class="x" draggable="false">`,
            "O": `<div class="o"></div>`
        };

        const index = positionIndex[position]
        squares[index].innerHTML = symbolHTML[symbol]

        gameBoard.updateBoard(symbol, position)
    }

    return { squares, collectHumanInput, showOnDOM }
}

const displayManager = DisplayManager()
displayManager.collectHumanInput()


function TTTBot() {
    let mySymbol = ""

    const getBotSymbol = () => {
        return mySymbol;
    }

    const setBotSymbol = () => {
        if (gameBoard.getPlayerSymbol()==="X") {
            mySymbol = "O"
        } else if (gameBoard.getPlayerSymbol()==="O") {
            mySymbol = "X"
        }
    }

    const getMove = () => {//
        let board = gameBoard.getGameBoard()
        console.table(board);


    }

    return { getBotSymbol, setBotSymbol, getMove }
}

const bot = TTTBot()


// MODAL + SCOREBOARD STUFF
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const playerTeamText = document.querySelector('.player-team');
const modalContinueBtn = document.querySelector('.continue-btn');
const scoreBoardText = document.querySelector('.scoreboard-text');

//Bundled event listener
modal.addEventListener('click', (e) => {
    const targetEle = e.target

    if (targetEle.classList.value.includes("continue")) {
        return;
    }
    if (targetEle.closest(".btn")===null) {
        return;
    }
    
    const clickedBtnClassList = targetEle.closest(".btn").classList.value

    //Set player here
    if (clickedBtnClassList.includes("x-team")) {
        gameBoard.setPlayerSymbol("X")
        playerTeamText.textContent = "You Chose Team X"

        return;
    }
    if (clickedBtnClassList.includes("o-team")) {
        gameBoard.setPlayerSymbol("O")
        playerTeamText.textContent = "You Chose Team O"

        return;
    }
});

modalContinueBtn.addEventListener('click', () => {
    if (!playerTeamText.textContent) {
        return;
    }

    scoreBoardText.textContent = "START!"

    //Update Bot's symbol
    bot.setBotSymbol()

    modal.classList.toggle("hidden")
    overlay.classList.toggle("hidden")
});