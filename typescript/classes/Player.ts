import Board from "./Board.js";

export default class Player {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

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
    // check for a winning move
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

    // prevent the opponent from winning
    const opponentColor = this.color === "X" ? "O" : "X";
    for (let col = 0; col < board.matrix[0].length; col++) {
      if (board.matrix[0][col] === " ") {
        const tempBoard = new Board();
        tempBoard.matrix = board.matrix.map((row) => [...row]);

        tempBoard.makeMove(opponentColor, col);

        if (tempBoard.winCheck() === opponentColor) {
          return col;
        }
      }
    }

    // Consider future moves and ensure it's a safe move
    for (let col = 0; col < board.matrix[0].length; col++) {
      if (board.matrix[0][col] === " ") {
        const tempBoard = new Board();
        tempBoard.matrix = board.matrix.map((row) => [...row]);

        tempBoard.makeMove(this.color, col);

        // Check if this move will allow the opponent to win the next round
        let isSafeMove = true;
        for (let oppCol = 0; oppCol < tempBoard.matrix[0].length; oppCol++) {
          if (tempBoard.matrix[0][oppCol] === " ") {
            tempBoard.makeMove(opponentColor, oppCol);
            if (tempBoard.winCheck() === opponentColor) {
              isSafeMove = false;
              break;
            }
          }
        }

        if (isSafeMove) {
          return col;
        }
      }
    }
    // If no winning move is found and is safe move, use DumBot to make a random move
    return new DumBot(this.name, this.color).makeMove(board);
  }
}
