const board = document.querySelector(".board");
const boxes = document.querySelectorAll(".board>div");
const round = document.querySelector(".round");
const players = document.querySelectorAll(".players>div");
let currentPlayer = players[0]; //default player

const evalGame = () => {
    if (boxes[0].className != "" && boxes[0].className == boxes[1].className == boxes[2].className ||
    boxes[3].className != "" && boxes[3].className == boxes[4].className == boxes[5].className ||
    boxes[6].className != "" && boxes[6].className == boxes[7].className == boxes[8].className ||
    boxes[0].className != "" && boxes[0].className == boxes[3].className == boxes[6].className ||
    boxes[1].className != "" && boxes[1].className == boxes[4].className == boxes[7].className ||
    boxes[2].className != "" && boxes[2].className == boxes[5].className == boxes[8].className ||
    boxes[0].className != "" && boxes[0].className == boxes[4].className == boxes[8].className ||
    boxes[2].className != "" && boxes[2].className == boxes[4].className == boxes[6].className
    ) {
        alert(currentPlayer.innerHTML + " Winner!")
    }
}

const changePlayer = () => { //switch player
    currentPlayer.className = "";
    currentPlayer = (currentPlayer != players[0]) ? players[0] : players[1];
    currentPlayer.className = "active";
}

const selectBox = (clickEvent) => {
    const box = clickEvent.target; // = the current box selected
    box.className = currentPlayer.id;
    evalGame();
    changePlayer();
}

const deselectBox = () => {

}

const deselectAllBox = () => {

}

boxes.forEach((box) => {
    box.addEventListener("click", selectBox);
});

