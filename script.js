
const board = document.querySelector(".board"); // selects the class board and assigns it to board
const boxes = document.querySelectorAll(".board>div"); // selects all the div children of the class board: 9 boxes [div, div, div, div, div, div, div, div, div]: 0 to 8 Index 
const round = document.querySelector(".round"); // selects the class round and assigns it to round
const players = document.querySelectorAll(".players>div"); // selects all the div children of the class players


class TicTacToe {
    constructor() {
        this.rounds = (localStorage.getItem("rounds")) ? localStorage.getItem("rounds") : 1; // if the value from localStorage is true, it's assigned to rounds, otherwise it assigned the value of  1
        this.turn = (localStorage.getItem("turn")) ? localStorage.getItem("turn") : 0; // if the value from localStorage is true, it's assigned to turn, otherwise it assigned the value of  0
        this.changePlayer(players[this.turn]);
        this.boxClasses = (localStorage.getItem("boxClasses")) ? localStorage.getItem("boxClasses").split(",") : this.getBoxClasses();
        this.setBoxClasses(); 
    }

    static saveGame() { // method that saves the game state in the local browser storage
        this.boxClasses = this.getBoxClasses();
        localStorage.setItem("rounds", this.rounds);
        localStorage.setItem("turn", this.turn);
        localStorage.setItem("boxClasses", this.boxClasses.join(","));
    }

    static resetGame() { //
        this.setBoxClasses(true);
        this.turn = 0;
        this.changePlayer(players[this.turn]);
        this.saveGame();
    }

    static newGame() { //
        this.rounds = 1;
        this.resetGame();
    }

    static getBoxClasses() { // gets the class names of the boxes and returns as an array
        const boxClasses = [];
        boxes.forEach((box) => {
            boxClasses.push(box.className);
        });
        return boxClasses;
    }

    static setBoxClasses(reset) {
        this.boxClasses.forEach((className, i) => {
            boxes[i].className = (reset) ? "" : className;
        });
    }

    static changePlayer(player) { // switch player
        this.currentPlayer.className = "";
        if (player) {
            this.currentPlayer = player; // 
        } else {
            this.turn = (this.currentPlayer != players[0]) ? 0 : 1;
            this.currentPlayer = players[this.turn];
        }

        this.currentPlayer.className = "active";
        this.saveGame();
    }
}

const game = new TicTacToe();

const showAlert = (message) => {
    const div = document.createElement('div'); // creates a div in the void/document  
    div.className = "alert alert-danger winner"; // assigning multiple classes to that div
    div.appendChild(document.createTextNode(message)); // create a text element appended to that div
    board.appendChild(div);

    setTimeout(() => document.querySelector('.alert').remove(), 3000); // Vanish in 3 seconds
}

const evalGame = () => { //

    const match = game.currentPlayer.id + game.currentPlayer.id + game.currentPlayer.id;

    if (
        boxes[0].className + boxes[1].className + boxes[2].className == match ||  // 
        boxes[3].className + boxes[4].className + boxes[5].className == match ||
        boxes[6].className + boxes[7].className + boxes[8].className == match ||
        boxes[0].className + boxes[3].className + boxes[6].className == match ||
        boxes[1].className + boxes[4].className + boxes[7].className == match ||
        boxes[2].className + boxes[5].className + boxes[8].className == match ||
        boxes[0].className + boxes[4].className + boxes[8].className == match ||
        boxes[2].className + boxes[4].className + boxes[6].className == match
    ) {
        showAlert(game.currentPlayer.innerHTML + " Winner!")
    } else {
        game.changePlayer();
    }
}

const selectBox = (clickEvent) => {
    const selectedBox = clickEvent.target; // equals the current box selected
    if (selectedBox.className) {  // if selected box already has a class, return 
        return;
    }
    selectedBox.className = game.currentPlayer.id; // setting the class name of the box to the current player id
    evalGame(); // see if the current player won 
    game.saveGame();
}

boxes.forEach((box) => {
    box.addEventListener("click", selectBox);
});

















