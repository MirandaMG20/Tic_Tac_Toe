
// TicTacToe class with methods that call on each other 
class TicTacToe {
    static board = document.querySelector(".board"); // selects the class board and assigns it to board
    static boxes = document.querySelectorAll(".board>div"); // selects all the div children of the class board: 9 boxes [div, div, div, div, div, div, div, div, div]: 0 to 8 Index 
    static round = document.querySelector(".round>span"); // selects the class round and assigns it to round
    static players = document.querySelectorAll(".players>div"); // selects all the div children of the class players
    static games = [];
    static currentPlayer; // equals to null

    static currentGame() {
        return TicTacToe.games[TicTacToe.games.length - 1];
    }

    static saveGame() { // method that saves the game state in the local browser storage
        TicTacToe.currentGame().boxClasses = TicTacToe.getBoxClasses();
        localStorage.setItem("TicTacToe-game" + TicTacToe.games.length, JSON.stringify(TicTacToe.currentGame()));
    }

    static resetGame() { //
        TicTacToe.setBoxClasses(true);

        TicTacToe.currentGame().turn = 0;
        TicTacToe.changePlayer(TicTacToe.players[TicTacToe.currentGame().turn]);
        TicTacToe.saveGame();
    }

    static newGame() { //
        TicTacToe.deleteGames();
        TicTacToe.nextRound();
    }

    static nextRound() { //
        let winner = document.querySelector('.winner');
        if (winner) {
            winner.remove();
        }
        TicTacToe.games.push(new Game());
        TicTacToe.resetGame();
        TicTacToe.round.innerText = TicTacToe.games.length;
    }

    static getGames() { //
        let i = 1;
        let savedGame = localStorage.getItem("TicTacToe-game" + i);
        if (savedGame) {
            while (savedGame) {
                TicTacToe.games.push(new Game(JSON.parse(savedGame)));
                i++;
                savedGame = localStorage.getItem("TicTacToe-game" + i);
            }
            if (TicTacToe.length > 3) {
                TicTacToe.newGame();
            }
            TicTacToe.round.innerText = TicTacToe.games.length;
            TicTacToe.setBoxClasses();
            TicTacToe.changePlayer(TicTacToe.players[TicTacToe.currentGame().turn]);
            TicTacToe.evalGame(true);
        } else {
            TicTacToe.newGame();
        }
    }

    static deleteGames() {
        TicTacToe.games = [];
        let i = 1;
        while (localStorage.getItem("TicTacToe-game" + i)) {
            localStorage.removeItem("TicTacToe-game" + i);
            i++;
        }
    }

    static getBoxClasses() { // gets the class names of the boxes and returns as an array
        const boxClasses = [];
        TicTacToe.boxes.forEach((box) => {
            boxClasses.push(box.className);
        });
        return boxClasses;
    }

    static setBoxClasses(reset) {
        TicTacToe.currentGame().boxClasses.forEach((className, i) => {
            TicTacToe.boxes[i].className = (reset) ? "" : className;
        });
    }

    static changePlayer(player) { // switch player
        document.querySelector(".active").className = "";
        if (player) {
            TicTacToe.currentPlayer = player; // 
        } else {
            TicTacToe.currentGame().turn = (TicTacToe.currentPlayer != TicTacToe.players[0]) ? 0 : 1;
            TicTacToe.currentPlayer = TicTacToe.players[TicTacToe.currentGame().turn];
        }

        TicTacToe.currentPlayer.className = "active";
        TicTacToe.saveGame();
    }

    static evalGame(noChangePlayer) { //

        const match = TicTacToe.currentPlayer.id + TicTacToe.currentPlayer.id + TicTacToe.currentPlayer.id;

        if (
            TicTacToe.boxes[0].className + TicTacToe.boxes[1].className + TicTacToe.boxes[2].className == match ||  // 
            TicTacToe.boxes[3].className + TicTacToe.boxes[4].className + TicTacToe.boxes[5].className == match ||
            TicTacToe.boxes[6].className + TicTacToe.boxes[7].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[0].className + TicTacToe.boxes[3].className + TicTacToe.boxes[6].className == match ||
            TicTacToe.boxes[1].className + TicTacToe.boxes[4].className + TicTacToe.boxes[7].className == match ||
            TicTacToe.boxes[2].className + TicTacToe.boxes[5].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[0].className + TicTacToe.boxes[4].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[2].className + TicTacToe.boxes[4].className + TicTacToe.boxes[6].className == match
        ) {
            TicTacToe.winner();
        } else if (!document.querySelector(".board>div:not(.X):not(.O)")) {// Give me a box that don't have X or O
            TicTacToe.winner(true);
        } else if (!noChangePlayer) {
            TicTacToe.changePlayer();
        }
    }

    static winner(draw) {
        const message = draw ? "It's a Draw!" : TicTacToe.currentPlayer.id + ' Wins!';
        const div = document.createElement('div'); // creates a div in the void/document  
        div.className = "winner"; // assigning multiple classes to that div
        div.innerHTML = '<div><span>' + message + '</span>'
            + (TicTacToe.round.innerText >= 3 ? '<button onclick="TicTacToe.newGame()">New Game</button>' : "") // show the button in the game on the 3rd round
            + '</div>';
        if (TicTacToe.round.innerText < 3) {
            setTimeout(() => {

                TicTacToe.nextRound();
            }, 3000);
        }
        document.querySelector('body').appendChild(div);

    }

    static selectBox(clickEvent) {
        const selectedBox = clickEvent.target; // equals the current box selected
        if (selectedBox.className) {  // if selected box already has a class, return 
            return;
        }
        selectedBox.className = TicTacToe.currentPlayer.id; // setting the class name of the box to the current player id
        TicTacToe.evalGame(); // see if the current player won 
        TicTacToe.saveGame();
    }
}

class Game {
    constructor(game) {
        this.round = game ? game.round : 1; // if the value from localStorage is true, it's assigned to rounds, otherwise it assigned the value of  1
        this.turn = game ? game.turn : 0; // if the value from localStorage is true, it's assigned to turn, otherwise it assigned the value of  0

        this.boxClasses = game ? game.boxClasses : TicTacToe.getBoxClasses();
    }
}

TicTacToe.boxes.forEach((box) => {
    box.addEventListener("click", TicTacToe.selectBox);
});

TicTacToe.getGames();  //recovers game when reload