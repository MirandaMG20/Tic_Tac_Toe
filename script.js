const board = document.querySelector(".board");
const boxes = document.querySelectorAll(".board>div"); // 9 boxes 
const round = document.querySelector(".round");
const players = document.querySelectorAll(".players>div");
let currentPlayer = players[0]; // default player

const evalGame = () => { //

    const match = currentPlayer.id + currentPlayer.id + currentPlayer.id;

    if (
        boxes[0].className != "" && boxes[0].className == boxes[1].className == boxes[2].className ||  // 
        boxes[3].className != "" && boxes[3].className == boxes[4].className == boxes[5].className ||
        boxes[6].className != "" && boxes[6].className == boxes[7].className == boxes[8].className ||
        boxes[0].className != "" && boxes[0].className == boxes[3].className == boxes[6].className ||
        boxes[1].className != "" && boxes[1].className == boxes[4].className == boxes[7].className ||
        boxes[2].className != "" && boxes[2].className == boxes[5].className == boxes[8].className ||
        boxes[0].className != "" && boxes[0].className == boxes[4].className == boxes[8].className ||
        boxes[2].className != "" && boxes[2].className == boxes[4].className == boxes[6].className
    ) {
        debugger;
        alert(currentPlayer.innerHTML + " Winner!")
    } else {
        changePlayer();
    }
}

const changePlayer = () => { // switch player
    currentPlayer.className = "";
    currentPlayer = (currentPlayer != players[0]) ? players[0] : players[1];
    currentPlayer.className = "active";
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

