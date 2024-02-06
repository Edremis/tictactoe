function Player(symbol) {
    this.name;
    this.symbol = symbol;
}

const playerO = new Player("O");
const playerX = new Player("X");

let players = [playerO, playerX];

const info = document.querySelector("#gamestatus");
const infoText = document.createElement("p");
info.appendChild(infoText);

let GameManager = (function () {
    let gameStarted = false;
    let Oturn = false;
    let boardArray = [[, ,], [, ,], [, ,]];

    function restart() {
        infoText.textContent = "Enter the name of the players and press START";
        const board = document.querySelector("#board");
        board.style.display = "grid";
        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
        const startButton = document.createElement("button");
        const p1Name = document.createElement("input");
        const p1Label = document.createElement("label");
        const p2Name = document.createElement("input");
        const p2Label = document.createElement("label");
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        board.appendChild(div1);
        board.appendChild(div2);

        div1.appendChild(p1Label);
        p1Label.textContent = "Nombre de jugador O:";
        div1.appendChild(p1Name);
        p1Name.value = "Player 1";

        div2.appendChild(p2Label);
        p2Label.textContent = "Nombre de jugador X:";
        div2.appendChild(p2Name);
        p2Name.value = "Player 2";

        board.appendChild(startButton);
        startButton.textContent = "START";
        startButton.addEventListener("click", function () {
            playerO.name = p1Name.value;
            playerX.name = p2Name.value;
            console.log(players);
            gameStarted = true;
            GameManager.createBoard();
        });
    }

    function createBoard() {
        let random = Math.round((Math.random()))+1;
        for(let i = random;i>0;i--){
            GameManager.changeTurn();
            console.log("Cambio");
        }
        
        const board = document.querySelector("#board");
        board.style.display = "grid";
        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
        for (let i = 1; i < 10; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.classList.add(i);
            board.appendChild(cell);
            cell.addEventListener("click", (function (index) {
                return function () {
                    let row = Math.floor((index - 1) / 3);
                    let column = (index - 1) % 3;
                    console.log(`Row: ${row} Column: ${column}`);
                    Oturn == true ?
                        (function () {
                            cell.textContent = "O";
                            boardArray[row][column] = playerO.name;
                        })()
                        :
                        (function () {
                            cell.textContent = "X";
                            boardArray[row][column] = playerX.name;
                        })();
                    GameManager.changeTurn();
                    GameManager.checkWinner();
                    console.log(boardArray);
                };


            })(i)


            );
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boardArray[i][j] = "";
            }
        }

    }

    function checkWinner() {
        if (gameStarted == false) {
            return;
        }
        players.forEach(player => {
            if (boardArray[0][0] == player.name && boardArray[1][1] == player.name && boardArray[2][2] == player.name ||
                boardArray[0][2] == player.name && boardArray[1][1] == player.name && boardArray[2][0] == player.name) {
                GameManager.winner(player);
            }
            for (let i = 0; i < 3; i++) {
                if (boardArray[i][0] == player.name && boardArray[i][1] == player.name && boardArray[i][2] == player.name ||
                    boardArray[0][i] == player.name && boardArray[1][i] == player.name && boardArray[2][i] == player.name) {
                    GameManager.winner(player);
                }
            }
            
            if(infoText.textContent !== "GAME OVER"){
                let arrayCheck = boardArray.flat().every(value => value !== "");
            if (arrayCheck == true) {
                GameManager.tie();
            }
            }
            
        });

    }

    function ChangeTurn() {
        Oturn == true ?
            (function () {
                Oturn = false;
                infoText.textContent = "Turno de " + playerX.name + " ("+playerX.symbol+")";
            })()
            :
            (function () {
                Oturn = true;
                infoText.textContent = "Turno de " + playerO.name + " ("+playerO.symbol+")";
            })();
    }

    function Winner(player) {
        const board = document.querySelector("#board");
        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
        board.style.display = "block";
        const message = document.createElement("h2");
        message.classList.add("centered");
        board.appendChild(message);
        infoText.textContent = "GAME OVER";
        message.textContent = player.name + " wins!!!";

    }

    function Tie() {
        const board = document.querySelector("#board");
        board.style.display = "block";
        while (board.firstChild) {
            board.removeChild(board.firstChild);
        }
        const message = document.createElement("h2");
        message.classList.add("centered");
        board.appendChild(message);
        infoText.textContent = "GAME OVER";
        message.textContent = "TIE";
    }

    return {
        createBoard: createBoard,
        checkWinner: checkWinner,
        winner: Winner,
        restart: restart,
        changeTurn: ChangeTurn,
        tie: Tie
    }
})()

GameManager.restart();