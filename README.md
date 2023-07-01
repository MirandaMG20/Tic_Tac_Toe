## Tic-Tac-Toe
This is a Tic-Tac-Toe game using HTML, CSS, and JavaScript. It allows two players to take turns marking X and O on a 3x3 game board until a player wins 2 out of 3 rounds or the game ends in a draw.


# Technologies Used
- HTML: For creating the game board structure and UI elements.
- CSS: For styling the game board and adding design.
- JavaScript: For the game logic, handling player turns, checking win/lose/draw, and updating the UI.


# Game Approach
1. The game board is represented as an array of nine elements, initially empty.
2. Each cell on the game board is clickable, and when clicked, a move is made by the current player.
3. The logic checks for win/lose after each move using winning combinations.
4. If a winning combination is found, the game ends, and a message appears with the winner's name.
5. If all cells are filled and no winning combination is found, the game ends in a draw.
6. Players can restart the game after completing the three rounds.


# How to Play
1. Open the index.html file in a web browser.
2. The game board will be displayed with an empty board.
3. Players can take turns by clicking on the empty boxes.
4. After each move, The game will check for a win or a draw.
5. If the game ends, the winning player will appear in a displayed message on the screen for three seconds.
6. After completing a round and the three seconds message disappears, the next round starts.
7. At the end of the third round, the New Game button can be clicked to restart the game.


## CSS 
:nth-child [w3schools.com]https://www.w3schools.com/cssref/sel_nth-child.php
::after [w3schools.com]https://www.w3schools.com/cssref/sel_after.php 
!important [w3schools.com]https://www.w3schools.com/css/css_important.asp

