function GameBoard() {
    let isPlayersTurn = true;

    let playerScore = 0;
    let botScore = 0;

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

    //
        const getIsPlayerTurn = () => {
            return isPlayersTurn;
        }
        const setIsPlayerTurn = (bool) => {
            isPlayersTurn=bool;
        }

        const getPlayerScore = () => {
            return playerScore;
        }
        const addPlayerScore = (increment) => {
            playerScore+=increment;
        }

        const getBotScore = () => {
            return botScore;
        }
        const addBotScore = (increment) => {
            botScore+=increment;
        }

        const resetAllScores = () => {
            playerScore=0;
            botScore=0;
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

        const isGameBoardFull = () => {
            return board.every((row) => 
                row.every(
                    (space) => space!=="_"
                )
            );
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

        let [row, col] = stringToRowCol[position]

        if (board[row][col]!="_") {
            console.log("Position is already taken!");
            return;
        }

        board[row][col] = symbol
    }

    const checkForThrees = (rowOrCol) => {
        const TIMEOUTMS = 700;

        //4 Human
        if (rowOrCol === "XXX" && gameBoard.getPlayerSymbol() === "X") {
            setTimeout(() => {
                displayManager.showContinueGameOverlay("player");
            }, TIMEOUTMS);

            addPlayerScore(1)
            return true;
        }
        if (rowOrCol === "OOO" && gameBoard.getPlayerSymbol() === "O") {
            setTimeout(() => {
                displayManager.showContinueGameOverlay("player");
            }, TIMEOUTMS);

            addPlayerScore(1)
            return true;
        } 

        //4 Bot
        if (rowOrCol === "OOO" && bot.getBotSymbol() === "O") {
            setTimeout(() => {
                displayManager.showContinueGameOverlay("bot");
            }, TIMEOUTMS);

            addBotScore(1)
            return true;
        }
        if (rowOrCol === "XXX" && bot.getBotSymbol() === "X") {
            setTimeout(() => {
                displayManager.showContinueGameOverlay("bot");
            }, TIMEOUTMS);

            addBotScore(1)
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

        return false;
    }

    return { stringToRowCol, stringToNum, numToString, setPlayerSymbol, getPlayerSymbol, getGameBoardPos, logGameBoard, getGameBoard, resetGameBoard, updateBoard, checkWinner, getIsPlayerTurn, setIsPlayerTurn, getPlayerScore, addPlayerScore, getBotScore, addBotScore, resetAllScores, isGameBoardFull };
}
const gameBoard = GameBoard();

const bot = TTTBot()

function DisplayManager() {
    const squares = Array.from(document.querySelectorAll('.square'));

    const getHumanClick = () => {
        const squaresContainer = document.querySelector('.container');
        let randNum = bot.getRandomInt(2);//O or 1

        squaresContainer.addEventListener('click', (e) => {
            const clickedEleClassList = e.target.classList.value

            if (!clickedEleClassList.includes("square") ||e.target.innerHTML) {
                return;
            }
            //Player Check
            if (!gameBoard.getIsPlayerTurn()) {
                return;
            }

            //Show Scoreboard info's
            scoreBoardText.classList.add("hidden")
            scoreBoardResetBtn.classList.remove("hidden")
            scoreBoardInfo.classList.remove("hidden")

            const squarePosition = clickedEleClassList.replace("square ","")
            
            showOnDOM(gameBoard.getPlayerSymbol(), squarePosition)

            //Player Lock
            gameBoard.setIsPlayerTurn(false);

            if (gameBoard.checkWinner()) {//Fix this to handle when either player wins
                updateScores()
                return;
            }

            //Check for Tie logic
            setTimeout(() => {
                if (gameBoard.isGameBoardFull()) {
                    showContinueGameOverlay("tie")
                }
            }, 550);

            bot.doMove()
        });
    }
    
    const showOnDOM = (symbol, position) => {//both string

        const squares = Array.from(document.querySelectorAll('.square'));

        const XorO = {
            "X": `<img src="assets/icons/x-symbol.svg" alt="X" class="x" draggable="false">`,
            "O": `<div class="o"></div>`
        };

        const index = gameBoard.stringToNum[position]

        //Prevent DOM Overwrite
        if (!(squares[index].innerHTML)) {
            squares[index].innerHTML = XorO[symbol]
        }

        gameBoard.updateBoard(symbol, position)
    }

    const showContinueGameOverlay = (winner) => {//str
        const message = document.querySelector(".msg")
        const containerOverlay = document.querySelector('.container-overlay');

        message.textContent = `
            ${winner === "player" ? "You Win!" : (winner === "tie" ? "Tie!" : "You Lost!")}
            Continue game?
        `

        containerOverlay.classList.remove("hidden")
    }

    const resetSquares = () => {
        squares.forEach((square) => {
            square.innerHTML=""
        });
    }

    const updateScores = () => {
        const botScore = document.querySelector('.bot-score').querySelector(".score");
        const youScore = document.querySelector('.you-score').querySelector(".score");

        botScore.textContent = gameBoard.getBotScore()
        youScore.textContent = gameBoard.getPlayerScore()
    }

    return { squares, getHumanClick, showOnDOM, updateScores, resetSquares, showContinueGameOverlay }
}

const displayManager = DisplayManager()
displayManager.getHumanClick()


function TTTBot() {
    let mySymbol = ""
    const DELAYMS = 550

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

    const getRandomInt = (max) => {//max is exclusive
        return Math.floor(Math.random() * max);
    }

    const doRandomMove = (customDelay) => {//str
        let attempts = 0;
        while (attempts < 9) {
          const randomPosition = gameBoard.numToString[getRandomInt(9)];
          let [row, col] = gameBoard.stringToRowCol[randomPosition];

          if (gameBoard.getGameBoardPos(row, col)==="_" && randomPosition) {
            setTimeout(() => {
                displayManager.showOnDOM(getBotSymbol(), randomPosition);
                gameBoard.setIsPlayerTurn(true)
    
            }, customDelay);
            return;
          }

          attempts++;
        }
    }

    const doMove = () => {
        
        let board = gameBoard.getGameBoard()

        setTimeout(() => {
            
            if ( 
                board[1][1]==="_" && 
                (
                    (board[0][0]!="_") || 
                    (board[0][2]!="_") || 
                    (board[2][0]!="_") || 
                    (board[2][2]!="_")
                )
            ) {
                displayManager.showOnDOM(getBotSymbol(), "five")
                gameBoard.setIsPlayerTurn(true);
                gameBoard.checkWinner()
                return;
            }

            //
            if (board[0][0] !== "_" && board[0][2] !== "_" && board[0][1]==="_") {
                displayManager.showOnDOM(getBotSymbol(), "two");
                gameBoard.setIsPlayerTurn(true);
                gameBoard.checkWinner()
                return;
            }
            if (board[0][0] !== "_" && board[2][0] !== "_" && board[1][0]==="_") {
                displayManager.showOnDOM(getBotSymbol(), "four");
                gameBoard.setIsPlayerTurn(true);
                gameBoard.checkWinner()
                return;
            }
            if (board[2][0] !== "_" && board[2][2] !== "_" && board[2][1]==="_") {
                displayManager.showOnDOM(getBotSymbol(), "eight");
                gameBoard.setIsPlayerTurn(true);
                gameBoard.checkWinner()
                return;
            }
            if (board[0][2] !== "_" && board[2][2] !== "_" && board[1][2]==="_") {
                displayManager.showOnDOM(getBotSymbol(), "six");
                gameBoard.setIsPlayerTurn(true);
                gameBoard.checkWinner()
                return;
            }
            //

            if (
                (
                    (board[0][0]!="_" && board[2][2]!="_") || //diags
                    (board[0][2]!="_" && board[2][0]!="_") //diags
                )
            ) {
                
            }

            //else
            bot.doRandomMove()

            if (gameBoard.checkWinner()) {
                displayManager.updateScores()
                return;
            }
        }, DELAYMS);
    }

    return { getBotSymbol, setBotSymbol, doMove, doRandomMove, getRandomInt }
}



// MODAL + SCOREBOARD STUFF
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const playerTeamText = document.querySelector('.player-team');
const modalContinueBtn = document.querySelector('.continue-btn');

const scoreBoardText = document.querySelector('.scoreboard-text');
const scoreBoardInfo = document.querySelector('.scoreboard-info');
const scoreBoardResetBtn = document.querySelector('.scoreboard-reset-btn');

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

    scoreBoardInfo.classList.add("hidden")
    scoreBoardResetBtn.classList.add("hidden")
    scoreBoardText.classList.remove("hidden")
    scoreBoardText.textContent = "START!"

    //Set Bot's symbol here
    bot.setBotSymbol()

    modal.classList.toggle("hidden")
    overlay.classList.toggle("hidden")
});


//Handle Reset Button Click
const resetBtn = document.querySelector('.scoreboard-reset-btn');

resetBtn.addEventListener('click', () => {
    const containerOverlay = document.querySelector('.container-overlay');
    const message = document.querySelector('.msg');

    message.textContent="Reset Game?"
    containerOverlay.classList.remove('hidden')
});

function resetEverything() {
    const containerOverlay = document.querySelector('.container-overlay');

    displayManager.resetSquares()
    gameBoard.resetGameBoard()
    gameBoard.resetAllScores()
    displayManager.updateScores()

    gameBoard.setIsPlayerTurn(true)

    containerOverlay.classList.add("hidden")
    modal.classList.remove("hidden")
    overlay.classList.remove("hidden")
}

//Handle Container Overlay Reset Buttons
const yesBtn = document.querySelector('.yes');
const noBtn = document.querySelector('.no');

noBtn.addEventListener('click', () => {
    const message = document.querySelector(".msg")
    const containerOverlay = document.querySelector('.container-overlay');

    if (message.textContent==="Reset Game?") {
        containerOverlay.classList.add("hidden")
        gameBoard.setIsPlayerTurn(true)
        return;
    }

    if (message.textContent.includes("Continue game?")) {
        resetEverything()
        return;
    }
});

yesBtn.addEventListener('click', () => {
    const message = document.querySelector(".msg")
    const containerOverlay = document.querySelector('.container-overlay');

    if (message.textContent==="Reset Game?") {
        resetEverything()
        return;
    }

    if (message.textContent.includes("Continue game?")) {
        displayManager.resetSquares()
        gameBoard.resetGameBoard()
        displayManager.updateScores()
        gameBoard.setIsPlayerTurn(true)
        containerOverlay.classList.add("hidden")
        return;
    }
});