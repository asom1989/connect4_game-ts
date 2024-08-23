import readlineSync from "readline-sync";
import Board from "./Board.js";
import Player from "./Player.js";

export default class App {
  board: Board;
  playerX!: Player;
  playerO!: Player;

  constructor() {
    this.board = new Board();
    this.createPlayers();
    this.startGame();
  }

  createPlayers() {
    console.clear();
    console.log("Connect 4 Game\n");
    const playerXName = readlineSync.question("Spelare X namn: ") || "X";
    const playerOName = readlineSync.question("Spelare O namn: ") || "O";
    this.playerX = new Player(playerXName, "X");
    this.playerO = new Player(playerOName, "O");
  }

  startGame() {
    while (true) {
      // console.clear();
      this.board.render();
      let player =
        this.board.currentPlayerColor === "X" ? this.playerX : this.playerO;
      let move = readlineSync.question(
        `Ange ditt drag ${player.color} ${player.name} - skriv in kolumn (1-7): `
      );
      let column = parseInt(move.trim()) - 1;

      // Check if the move is valid
      if (isNaN(column) || column < 0 || column >= 7) {
        console.log("Ogiltigt drag, försök igen.");
        continue;
      }

      // Make the move and check for win or full column
      if (this.board.makeMove(player.color, column)) {
        // Check if the board is full
        if (this.board.isBoardFull()) {
          this.board.render();
          console.log("\n Spelet är oavgjort! Alla kolumner är fulla \n");
          break;
        }
      } else {
        console.log("Kolumnen är full, försök igen.");
      }
    }
  }
}
