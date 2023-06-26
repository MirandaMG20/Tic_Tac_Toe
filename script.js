const board = document.querySelector(".board");
const boxes = document.querySelectorAll(".board>div");
const round = document.querySelector(".round");
const players = document.querySelectorAll(".players>div");
let currentPlayer = players[0]; //default to first player

const changePlayer = () => { //switch to 
    currentPlayer = (currentPlayer != players[0]) ? players[0] : players[1];
}

const selectBox = (clickEvent) => {
    const box = clickEvent.target; // = the current box selected
    box.className = currentPlayer.id;
    changePlayer();
}

const deselectBox = () => {

}

const deselectAllBox = () => {

}

boxes.forEach((box) => {
    box.addEventListener("click", selectBox);
});

