export default class Board {
  matrix: string[][];
  currentPlayerColor: string;
  winner: string | false;

  constructor() {
    this.matrix = [1, 2, 3, 4, 5, 6].map(() =>
      [1, 2, 3, 4, 5, 6, 7].map(() => " ")
    );
    this.currentPlayerColor = "X";
    this.winner = false;
  }

  //game board
  render() {
    let line = "\n" + "+---".repeat(7) + "+" + "\n";
    let numColumns = 7;
    let columnNumbers = Array.from(
      { length: numColumns },
      (_, i) => `  ${i + 1}`
    ).join(" ");

    console.log(
      columnNumbers +
        line +
        this.matrix
          .map((row) => row.map((column) => `| ${column} `).join("") + "|")
          .join(line) +
        line
    );
  }

  // Make the move
  makeMove(color: string, column: number): boolean {
    // Drop the piece in the lowest available row in the selected column
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === " ") {
        this.matrix[row][column] = color;
        this.winner = this.winCheck();
        this.currentPlayerColor = this.currentPlayerColor === "X" ? "O" : "X";
        return true;
      }
    }
    return false;
  }

  // Check if the board is full
  isBoardFull(): boolean {
    return this.matrix[0].every((cell) => cell !== " ");
  }

  // Check for a winning move
  winCheck(): string | false {
    const m = this.matrix;
    const numRows = m.length;
    const numCols = m[0].length;

    // Loop through both colors
    for (const color of "XO") {
      // Check all cells
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          if (m[row][col] !== color) continue;

          // Check horizontal
          if (
            col + 3 < numCols &&
            m[row][col] === m[row][col + 1] &&
            m[row][col] === m[row][col + 2] &&
            m[row][col] === m[row][col + 3]
          ) {
            return color;
          }

          // Check vertical
          if (
            row + 3 < numRows &&
            m[row][col] === m[row + 1][col] &&
            m[row][col] === m[row + 2][col] &&
            m[row][col] === m[row + 3][col]
          ) {
            return color;
          }

          // Check diagonal down-right
          if (
            row + 3 < numRows &&
            col + 3 < numCols &&
            m[row][col] === m[row + 1][col + 1] &&
            m[row][col] === m[row + 2][col + 2] &&
            m[row][col] === m[row + 3][col + 3]
          ) {
            return color;
          }

          // Check diagonal up-right
          if (
            row - 3 >= 0 &&
            col + 3 < numCols &&
            m[row][col] === m[row - 1][col + 1] &&
            m[row][col] === m[row - 2][col + 2] &&
            m[row][col] === m[row - 3][col + 3]
          ) {
            return color;
          }
        }
      }
    }

    return false;
  }
}
