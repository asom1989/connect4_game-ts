import Board from "./Board.js";

export default class Player {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

// export class DumBot extends Player {
//   constructor(name: string, color: string) {
//     super(name, color);
//   }

//   makeMove(board: Board): number {
//     const availableColumns = board.matrix[0]
//       .map((cell, col) => (cell === " " ? col : null))
//       .filter((col) => col !== null);

//     return availableColumns[
//       Math.floor(Math.random() * availableColumns.length)
//     ];
//   }
// }

// DumbBot class that makes random moves
export class DumBot extends Player {
  constructor(name: string, color: string) {
    super(name, color);
  }

  // Make a move by choosing a random column that is not full
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

// SmartBot class that makes strategic moves
export class SmartBot extends Player {
  constructor(name: string, color: string) {
    super(name, color);
  }
  makeMove(board: Board): number {
    for (let col = 0; col < board.matrix[0].length; col++) {
      if (board.matrix[0][col] === " ") {
        // Create a temporary board to simulate the move
        const tempBoard = new Board();
        tempBoard.matrix = board.matrix.map((row) => [...row]);

        tempBoard.makeMove(this.color, col);

        // Check if this move would result in a win
        if (tempBoard.winCheck() === this.color) {
          return col;
        }
      }
    }
    // If no winning move is found, use DumBot to make a random move
    return new DumBot(this.name, this.color).makeMove(board);
  }
}
