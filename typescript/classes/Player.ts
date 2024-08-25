import Board from "./Board.js";

export default class Player {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

export class DumBot extends Player {
  constructor(name: string, color: string) {
    super(name, color);
  }
  makeMove(board: Board): number {
    let validMoves = [];
    for (let col = 0; col < board.matrix[0].length; col++) {
      if (board.matrix[0][col] === " ") {
        validMoves.push(col);
      }
    }
    return validMoves[Math.floor(Math.random() * validMoves.length)];
  }
}

export class SmartBot extends Player {
  constructor(name: string, color: string) {
    super(name, color);
  }
}
