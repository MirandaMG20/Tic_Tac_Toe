// class Book {
//     constructor(title, author, isbn) {
//         this.title = title;
//         this.author = author;
//         this.isbn = isbn;
//     }
// }

class ticTacToe {
    const board = document.querySelector(".board");
    const boxes = document.querySelectorAll(".board>div"); // 9 boxes [div, div, div, div, div, div, div, div, div]: 0 to 8 Index 
    const round = document.querySelector(".round");
    const players = document.querySelectorAll(".players>div");
    let currentPlayer = players[0]; // default     

    
}


const changePlayer = () => { // switch player
    currentPlayer.className = "";
    currentPlayer = (currentPlayer != players[0]) ? players[0] : players[1]; // current is not equal  player [0] ? 
    currentPlayer.className = "active";
}

static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.style.zIndex = 100;
    div.style.position = "fixed";
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

const evalGame = () => { //

    const match = currentPlayer.id + currentPlayer.id + currentPlayer.id;

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
        alert(currentPlayer.innerHTML + " Winner!")
    } else {
        changePlayer();
    }
}


const selectBox = (clickEvent) => {
    const selectedBox = clickEvent.target; // equals the current box selected
    if (selectedBox.className) {  // if selected box already has a class, return 
        return;
    }
    selectedBox.className = currentPlayer.id; // setting the class name of the box to the current player id
    evalGame(); // see if the current player won 
}

const deselectBox = () => {

}

const deselectAllBox = () => {

}

boxes.forEach((box) => {
    box.addEventListener("click", selectBox);
});

