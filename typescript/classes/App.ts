import readlineSync from "readline-sync";
import Board from "./Board.js";
import Player, { DumBot, SmartBot } from "./Player.js";

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

    const playerXType = this.choosePlayerType("X");
    const playerOType = this.choosePlayerType("O");

    this.playerX = this.createPlayer(playerXType, "X");
    this.playerO = this.createPlayer(playerOType, "O");
  }

  // choose player type
  choosePlayerType(playerSymbol: string): string {
    const playerType = readlineSync
      .question(
        `\n Ange vilken typ av spelare ${playerSymbol} \n Person=> P, Dum Bot=> D Smart Bot=> S: `
      )
      .toLowerCase();

    if (playerType !== "p" && playerType !== "d" && playerType !== "s") {
      console.log("Ogiltigt drag, försök igen.");
      return this.choosePlayerType(playerSymbol);
    }

    switch (playerType) {
      case "d":
        return "dum";
      case "s":
        return "smart";
      default:
        return "human";
    }
  }

  createPlayer(type: string, color: string): Player {
    const playerName =
      readlineSync.question(`\n Spelare ${color} namn: `) || color;

    if (type === "dum") {
      return new DumBot(playerName, color);
    } else if (type === "smart") {
      return new SmartBot(playerName, color);
    } else {
      return new Player(playerName, color);
    }
  }

  startGame() {
    while (true) {
      // console.clear();
      this.board.render();
      let player =
        this.board.currentPlayerColor === "X" ? this.playerX : this.playerO;

      let column: number;

      if (player instanceof DumBot || player instanceof SmartBot) {
        column = player.makeMove(this.board);
      } else {
        let move = readlineSync.question(
          `Ange ditt drag ${player.color} ${player.name} - skriv in kolumn (1-7): `
        );
        column = parseInt(move.trim()) - 1; //index
      }

      // Check if the move is valid
      if (isNaN(column) || column < 0 || column >= 7) {
        console.log("Ogiltigt drag, försök igen.");
        continue;
      }

      // Make the move and check for win or full column
      if (this.board.makeMove(player.color, column)) {
        // Check for a winning move
        if (this.board.winner) {
          this.whoHasWon();
          break;
        }

        // Check if the board is full or column is full
        if (this.board.isBoardFull()) {
          console.clear();
          this.board.render();
          console.log("\n Spelet är oavgjort! Alla kolumner är fulla \n");
          break;
        }
      } else {
        console.log("Kolumnen är full, försök igen.");
      }
    }

    // Check if players want to play again
    let playAgain = readlineSync.question("Vill ni spela igen? (Y/N)? \n");
    if (playAgain.toLowerCase() === "y") {
      this.board = new Board();
      this.startGame();
    } else {
      console.log("Tack för att ni spelade!");
    }
  }

  whoHasWon() {
    console.clear();
    this.board.render();
    if (this.board.winner) {
      let winningPlayer =
        this.board.winner === "X" ? this.playerX : this.playerO;
      console.log(
        `Grattis ${winningPlayer.color}: ${winningPlayer.name} du vann!`
      );
    } else {
      console.log("Tyvärr det blev oavgjort...");
    }
  }
}
