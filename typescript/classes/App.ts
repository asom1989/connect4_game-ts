import Board from "./Board.js";

export default class App {
  board: Board;

  constructor() {
    this.board = new Board();
    this.start();
  }

  start() {
    this.board.render();
  }
}
