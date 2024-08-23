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
    this.board.render();
  }
}
