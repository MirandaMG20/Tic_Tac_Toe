// TicTacToe class with methods that call on each other to controls the game
class TicTacToe { 
    
    // Selecting DOM elements and assigning them to static properties

    // It allows access and manipulate the game board element 
    static board = document.querySelector(".board"); // selects the class board and assigns it to the method board 

    // It represents the individual cells or boxes of the game board.
    static boxes = document.querySelectorAll(".board>div"); // selects all the div children of the class board: 9 boxes [div, div, div, div, div, div, div, div, div]: 0 to 8 Index 

    // Responsible for displaying the current round number in the game
    static round = document.querySelector(".round>span"); // selects the class round and assigns it to round

    // Represents the player elements in the game, "X" and "O"
    static players = document.querySelectorAll(".players>div"); // selects all the div children of the class players

    // Used to store the game instances/occurrence 
    static games = []; 

    // Keeps track of the current player during the game
    static currentPlayer; // Equals to null

    // Returns most recent game instance 
    static currentGame() {
        return TicTacToe.games[TicTacToe.games.length - 1]; // gives the number of game stored, calculates the index of the last game, gets and returns the last game at the actual index
    }

    // Method that saves the game state in the local browser storage
    static saveGame() {
        TicTacToe.currentGame().boxClasses = TicTacToe.getBoxClasses(); // saves the current game state by storing the box classes
        // JSON.stringify to convert the game object into a JSON string before saving it 
        localStorage.setItem("TicTacToe-game" + TicTacToe.games.length, JSON.stringify(TicTacToe.currentGame()));
    }

    // Resets the game 
    static resetGame() {
        TicTacToe.setBoxClasses(true); // resets the game board
        TicTacToe.currentGame().turn = 0; // resets current turn 
        TicTacToe.changePlayer(TicTacToe.players[TicTacToe.currentGame().turn]); // changes the player
        TicTacToe.saveGame(); // saves the game state 
    }

    // Starts a new game
    static newGame() {
        TicTacToe.deleteGames(); // deletes(clear the board) existing games
        TicTacToe.nextRound(); // starts a new round and reset the game
    }

    //  Prepares the game for the next round
    static nextRound() {
        let winner = document.querySelector(".winner");
        if (winner) {
            winner.remove(); // removes the winner message 
        }
        TicTacToe.games.push(new Game()); // creates a new game instance
        TicTacToe.resetGame(); // resetting the game
        TicTacToe.round.innerText = TicTacToe.games.length; // updating the round number 
    }

    // Gets saved games from the browser local storage
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
            TicTacToe.evalGame(true); // evaluate the game for a winner
        } else {
            TicTacToe.newGame(); // starts a new game, if no game was found saved
        }
    }

    // Deletes all saved games from the local storage 
    static deleteGames() {
        TicTacToe.games = []; // resets the games array, assigning an empty array removes all game stored
        let i = 1;
        while (localStorage.getItem("TicTacToe-game" + i)) { // loop checks if there is a game saved, if there is a game, it continues
            localStorage.removeItem("TicTacToe-game" + i); // removes the saved game from the local storage
            i++; // increase the value by 1 to move to the next game or round 
        }
    }

    // Gets the class name of the boxes and returns them as an array
    static getBoxClasses() {
        const boxClasses = []; // empty array named to store the class names
        TicTacToe.boxes.forEach((box) => { // forEach is to go over each box in the boxes array
            boxClasses.push(box.className); // gets each className of each box and it gets push to the boxClasses array
        });
        return boxClasses; // after going through all the box, returns to boxClasses array with the class names of the boxes
    }

    // Sets the class names of the boxes based on the game status 
    static setBoxClasses(reset) {
        TicTacToe.currentGame().boxClasses.forEach((className, i) => { // goes over each box class name in the boxClasses array of the current game
            // If reset is true ? it clears the class names : otherwise, it assigns the saved class names from the boxClasses array
            TicTacToe.boxes[i].className = reset ? "" : className; // Conditional operator assigns a value to a variable based on a condition. Example: condition ? exprIfTrue : exprIfFalse 
        });
    }

    // Changes the current player and updates the active player
    static changePlayer(player) {
        document.querySelector(".active").className = ""; // selects the element with the class "active" and clears the class name, removes the "active" class from the previous player
        if (player) {
            TicTacToe.currentPlayer = player; // if player is provided, it sets currentPlayer to that player
        } else {
            TicTacToe.currentGame().turn = TicTacToe.currentPlayer != TicTacToe.players[0] ? 0 : 1; // checks if the current player is not (!) equal to the 1st player in the players array, if so, it sets the turn to 0 :  otherwise, set to 1
            TicTacToe.currentPlayer = TicTacToe.players[TicTacToe.currentGame().turn]; // assigns the right player from the players array to the currentPlayer var, sets the current player to the next player based on the turn 
        }

        TicTacToe.currentPlayer.className = "active"; // adds the "active" class to the element that is the current player, shows the player is active
        TicTacToe.saveGame(); // saves the current game state
    }

    // Evaluates the game state to check for a winner or a draw
    static evalGame(noChangePlayer) {

        const match = TicTacToe.currentPlayer.id + TicTacToe.currentPlayer.id + TicTacToe.currentPlayer.id;

        if ( // if there is a winner 
            TicTacToe.boxes[0].className + TicTacToe.boxes[1].className + TicTacToe.boxes[2].className == match ||
            TicTacToe.boxes[3].className + TicTacToe.boxes[4].className + TicTacToe.boxes[5].className == match ||
            TicTacToe.boxes[6].className + TicTacToe.boxes[7].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[0].className + TicTacToe.boxes[3].className + TicTacToe.boxes[6].className == match ||
            TicTacToe.boxes[1].className + TicTacToe.boxes[4].className + TicTacToe.boxes[7].className == match ||
            TicTacToe.boxes[2].className + TicTacToe.boxes[5].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[0].className + TicTacToe.boxes[4].className + TicTacToe.boxes[8].className == match ||
            TicTacToe.boxes[2].className + TicTacToe.boxes[4].className + TicTacToe.boxes[6].className == match
        ) {
            TicTacToe.winner(); // it calls the winner method
        } else if (!document.querySelector(".board>div:not(.X):not(.O)")) { // if it's a draw (Checks the empty boxes, ! negates the query, Give me a box that don't have X or O)
            TicTacToe.winner(true); // calls winner method with the draw parameter set to true
        } else if (!noChangePlayer) { // ! checks if noChangePlayer is false or not provided, 
            TicTacToe.changePlayer(); // it calls changePlayer method to switch to the next player
        }
    }

    // Draw method 
    static winner(draw) {
        const message = draw ? "It's a Draw!" : TicTacToe.currentPlayer.id + " Wins!"; // if draw is true, draw massage is display, otherwise, display message with currentPlayer.id wins
        const div = document.createElement("div"); // creates a div in the document(the void)
        div.className = "winner"; // assigning multiple classes to the div

        div.innerHTML = '<div><span>' + message + '</span>'
            + (TicTacToe.round.innerText >= 3 ? '<button onclick="TicTacToe.newGame()">New Game</button>' : "") // show the button in the game at the end of the 3rd round
            + '</div>';
        if (TicTacToe.round.innerText < 3) { // if the round number is less than 3, it automatically starts a new round
            setTimeout(() => { // a delay with the display message between round 
                TicTacToe.nextRound(); // calls nextRound method
            }, 3000); // Message display for 3s
        }

        document.querySelector("body").appendChild(div); // append div as a child of the body
    }

    // Click event on the box elements
    static selectBox(clickEvent) {
        const selectedBox = clickEvent.target; // the click event on the box elements, equals the current box selected
        if (selectedBox.className) {  // if selected box already has a class, return 
            return;
        }
        selectedBox.className = TicTacToe.currentPlayer.id; // setting the class name of the box to the current player id / assigns the current player's class name to the selected box
        TicTacToe.evalGame(); // evaluates the game state, see if the current player won 
        TicTacToe.saveGame(); // saves the game 
    }
}


// It stores the round number, turn, and box classes for a game.
class Game {
    constructor(game) {
        this.round = game ? game.round : 1; // If the value from localStorage is true, it's assigned to rounds, otherwise it assigned the value of  1 
        this.turn = game ? game.turn : 0; // If the value from localStorage is true, it's assigned to turn, otherwise it assigned the value of  0 
        this.boxClasses = game ? game.boxClasses : TicTacToe.getBoxClasses(); // If game is true, otherwise assign getBoxClasses method
    }
}

TicTacToe.boxes.forEach((box) => { // adds a click event listener to each box element on the game board 
    box.addEventListener("click", TicTacToe.selectBox); // When a box is clicked, it calls the selectBox method to handle the event
});

TicTacToe.getGames();  // recovers game from local storage when reload and start the game state

