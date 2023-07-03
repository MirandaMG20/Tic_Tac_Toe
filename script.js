
// TicTacToe class with methods that call on each other 
class TicTacToe {
    // Selecting DOM elements and assigning them to static properties
    static board = document.querySelector(".board"); // selects the class board and assigns it to the method board
    static boxes = document.querySelectorAll(".board>div"); // selects all the div children of the class board: 9 boxes [div, div, div, div, div, div, div, div, div]: 0 to 8 Index 
    static round = document.querySelector(".round>span"); // selects the class round and assigns it to round
    static players = document.querySelectorAll(".players>div"); // selects all the div children of the class players
    static games = [];
    static currentPlayer; // Equals to null

    // Returns the current game
    static currentGame() {
        return TicTacToe.games[TicTacToe.games.length - 1];
    }

    // Method that saves the game state in the local browser storage
    static saveGame() {
        TicTacToe.currentGame().boxClasses = TicTacToe.getBoxClasses();
        localStorage.setItem("TicTacToe-game" + TicTacToe.games.length, JSON.stringify(TicTacToe.currentGame()));
    }

    // Resets the game 
    static resetGame() {
        TicTacToe.setBoxClasses(true);

        TicTacToe.currentGame().turn = 0;
        TicTacToe.changePlayer(TicTacToe.players[TicTacToe.currentGame().turn]);
        TicTacToe.saveGame();
    }

    // Starts a new game
    static newGame() {
        TicTacToe.deleteGames();
        TicTacToe.nextRound();
    }

    // Continues to the next round
    static nextRound() {
        let winner = document.querySelector(".winner");
        if (winner) {
            winner.remove();
        }
        TicTacToe.games.push(new Game());
        TicTacToe.resetGame();
        TicTacToe.round.innerText = TicTacToe.games.length;
    }

    // Gets saved games from the browser storage
    static getGames() {
        let i = 1; // starts counting from 1 to get saved games from local storage
        let savedGame = localStorage.getItem("TicTacToe-game" + i); // gets value(games played) of TicTacToe-game from local storage, if none = null 
        if (savedGame) { 
            while (savedGame) {  // if there are games saved to retrieve from local storage
                TicTacToe.games.push(new Game(JSON.parse(savedGame))); // parse: gets games saved and push: add them to the list of games
                i++; // increase the count by 1, preparing the next loop 
                savedGame = localStorage.getItem("TicTacToe-game" + i); // checks if there is another saved game 
            }
            if (TicTacToe.length > 3) { // if the saved games are greater than 3, a new game should start
                TicTacToe.newGame(); // method call for a new game
            }
            TicTacToe.round.innerText = TicTacToe.games.length; // sets round counter with the length of TicTacToe-game array, update round to show saved games
            TicTacToe.setBoxClasses(); // sets class names of the boxes on the board according to the current game
            TicTacToe.changePlayer(TicTacToe.players[TicTacToe.currentGame().turn]); // sets current player based on saved game
            TicTacToe.evalGame(true);
        } else {
            TicTacToe.newGame(); // if no game was found saved
        }
    }

    // Deletes all saved games previously stored 
    static deleteGames() {
        TicTacToe.games = [];
        let i = 1;
        while (localStorage.getItem("TicTacToe-game" + i)) {
            localStorage.removeItem("TicTacToe-game" + i);
            i++;
        }
    }

    // Gets the class name of the boxes and returns them as an array
    static getBoxClasses() {
        const boxClasses = [];
        TicTacToe.boxes.forEach((box) => {
            boxClasses.push(box.className);
        });
        return boxClasses;
    }

    // Sets the class names of the boxes based on the game status 
    static setBoxClasses(reset) {
        TicTacToe.currentGame().boxClasses.forEach((className, i) => {
            TicTacToe.boxes[i].className = reset ? "" : className;
        });
    }

    // Switch player
    static changePlayer(player) {
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

    // Check if the game is over
    static evalGame(noChangePlayer) {

        const match = TicTacToe.currentPlayer.id + TicTacToe.currentPlayer.id + TicTacToe.currentPlayer.id;

        if (
            TicTacToe.boxes[0].className + TicTacToe.boxes[1].className + TicTacToe.boxes[2].className == match ||
            TicTacToe.boxes[3].className + TicTacToe.boxes[4].className + TicTacToe.boxes[5].className == match ||
            TicTacToe.boxes[6].className + TicTacToe.boxes[7].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[0].className + TicTacToe.boxes[3].className + TicTacToe.boxes[6].className == match ||
            TicTacToe.boxes[1].className + TicTacToe.boxes[4].className + TicTacToe.boxes[7].className == match ||
            TicTacToe.boxes[2].className + TicTacToe.boxes[5].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[0].className + TicTacToe.boxes[4].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[2].className + TicTacToe.boxes[4].className + TicTacToe.boxes[6].className == match
        ) {
            TicTacToe.winner();
        } else if (!document.querySelector(".board>div:not(.X):not(.O)")) { // Checks the empty boxes, ! negates the query, Give me a box that don't have X or O
            TicTacToe.winner(true);
        } else if (!noChangePlayer) { // ! checks if noChangePlayer is false
            TicTacToe.changePlayer();
        }
    }

    static winner(draw) {
        const message = draw ? "It's a Draw!" : TicTacToe.currentPlayer.id + " Wins!";
        const div = document.createElement("div"); // creates a div in the document(the void)
        div.className = "winner"; // assigning multiple classes to the div
        div.innerHTML = '<div><span>' + message + '</span>'
            + (TicTacToe.round.innerText >= 3 ? '<button onclick="TicTacToe.newGame()">New Game</button>' : "") // show the button in the game at the end of the 3rd round
            + '</div>';
        if (TicTacToe.round.innerText < 3) {
            setTimeout(() => {
                TicTacToe.nextRound();
            }, 3000);
        }
        document.querySelector("body").appendChild(div);
    }

    static selectBox(clickEvent) {
        const selectedBox = clickEvent.target; // equals the current box selected
        if (selectedBox.className) {  // if selected box already has a class, return 
            return;
        }
        selectedBox.className = TicTacToe.currentPlayer.id; // setting the class name of the box to the current player id
        TicTacToe.evalGame(); // see if the current player won 
        TicTacToe.saveGame(); //
    }
}

class Game {
    constructor(game) {
        this.round = game ? game.round : 1; // if the value from localStorage is true, it's assigned to rounds, otherwise it assigned the value of  1
        this.turn = game ? game.turn : 0; // if the value from localStorage is true, it's assigned to turn, otherwise it assigned the value of  0

        this.boxClasses = game ? game.boxClasses : TicTacToe.getBoxClasses(); // if game is true, otherwise assign getBoxClasses
    }
}

// Set up event listener for each box click 
TicTacToe.boxes.forEach((box) => {
    box.addEventListener("click", TicTacToe.selectBox); // associate with the selectBox function
});

TicTacToe.getGames();  //recovers game from local storage when reload

