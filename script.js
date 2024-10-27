function GameBoard() {
    let isPlayersTurn = true;

    let board = [
        
        ["_","_","_"],
        ["_","_","_"],
        ["_","_","_"],
    ];

    let playerSymbol = "X";

    const stringToRowCol = {
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

        const getGameBoardPos = (row, col) => {
            return board[row][col];
        }

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

        let [row, col] = stringToRowCol[position]

        if (board[row][col]!="_") {
            console.log("Position is already taken!");
            return;
        }

        board[row][col] = symbol
    }

    const checkForThrees = (rowOrCol) => {
        //4 Human
        if (rowOrCol === "XXX" && gameBoard.getPlayerSymbol() === "X") {
            console.log(`You (${gameBoard.getPlayerSymbol()}) win!`);
            return true;
        }
        if (rowOrCol === "OOO" && gameBoard.getPlayerSymbol() === "O") {
            console.log(`You (${gameBoard.getPlayerSymbol()}) win!`);
            return true;
        } 

        //4 Bot
        if (rowOrCol === "OOO" && bot.getBotSymbol() === "O") {
            console.log(`Bot (${bot.getBotSymbol()}) wins!`);
            return true;
        }
        if (rowOrCol === "XXX" && bot.getBotSymbol() === "X") {
            console.log(`Bot (${bot.getBotSymbol()}) wins!`);
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

    return { stringToRowCol, setPlayerSymbol, getPlayerSymbol, getGameBoardPos, logGameBoard, getGameBoard, resetGameBoard, updateBoard, checkWinner, getIsPlayerTurn, setIsPlayerTurn };
}

const gameBoard = GameBoard();


function DisplayManager() {
    const squares = Array.from(document.querySelectorAll('.square'));

    //Handle Player Clicks + Bot Move
    const collectHumanInput = () => {
        const squaresContainer = document.querySelector('.container');

        squaresContainer.addEventListener('click', (e) => {
            const eleClassList = e.target.classList.value

            if (!eleClassList.includes("square"),
                e.target.innerHTML
            ) 
            {
                return;
            }

            if (!scoreBoardText.classList.contains("hidden")) {
                scoreBoardText.classList.toggle("hidden")
            }

            //Player Check
            if (!gameBoard.getIsPlayerTurn()) {
                return;
            }

            const squarePos = eleClassList.replace("square ","")
            
            showOnDOM(gameBoard.getPlayerSymbol(), squarePos)

            //Player Lock
            gameBoard.setIsPlayerTurn(false);

            bot.getMove()
        });
    }
    
    //Player and Bot are both using this
    const showOnDOM = (symbol, position) => {//both string
       
        //Prevent Unwanted DOM change
        if (gameBoard.checkWinner()) {//Fix to real logic
            return;
        }

        const squares = Array.from(document.querySelectorAll('.square'));

        const stringToNum = {
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
        const XorO = {
            "X": `<img src="assets/icons/x-symbol.svg" alt="X" class="x" draggable="false">`,
            "O": `<div class="o"></div>`
        };

        const index = stringToNum[position]
        //Prevent DOM Overwrite
        if (!(squares[index].innerHTML)) {
            squares[index].innerHTML = XorO[symbol]
        }

        gameBoard.updateBoard(symbol, position)
    }

    return { squares, collectHumanInput, showOnDOM }
}

const displayManager = DisplayManager()
displayManager.collectHumanInput()


function TTTBot() {
    let mySymbol = ""

    const numToString = {
        0: "one",
        1: "two",
        2: "three",
        3: "four",
        4: "five",
        5: "six",
        6: "seven",
        7: "eight",
        8: "nine"
    };

    let botMode = "easy"

    const getBotMode = () => {
        return botMode;
    }

    const setBotMode = (newMode) => {
        botMode = newMode;
    }

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

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const randomMove = () => {//str
        let attempts = 0;
        while (attempts < 9) {
          const randomPosition = numToString[getRandomInt(9)];
          let [row, col] = gameBoard.stringToRowCol[randomPosition];

          if (gameBoard.getGameBoardPos(row, col)==="_") {
            return randomPosition;
          }

          attempts++;
        }
    }

    const getMove = () => {//Fix to add real logic
        
        setTimeout(() => {
            let randomBotMove = randomMove()

            if (randomBotMove) {
                displayManager.showOnDOM(getBotSymbol(), randomBotMove);
            }
            
            //Player Unlocked
            gameBoard.setIsPlayerTurn(true);
        }, 500);

    }

    return { getBotSymbol, setBotSymbol, getMove, getBotMode, setBotMode }
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

//Handle Modal Continue
modalContinueBtn.addEventListener('click', () => {
    if (!playerTeamText.textContent) {
        return;
    }

    scoreBoardText.textContent = "START!"

    //Set Bot's symbol here
    bot.setBotSymbol()

    modal.classList.toggle("hidden")
    overlay.classList.toggle("hidden")
});