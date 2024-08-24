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
    // if (this.matrix[0][column] !== " ") {
    //   console.log("Kolumnen är full, försök igen.");
    //   return false;
    // }

    // Drop the piece in the lowest available row in the selected column
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === " ") {
        this.matrix[row][column] = color;
        this.winner = this.winCheck();
        //Player toggle
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
    const directions = [
      { r: 0, c: 1 }, // Horizontal
      { r: 1, c: 0 }, // Vertical
      { r: 1, c: 1 }, // Diagonal down-right
      { r: 1, c: -1 }, // Diagonal down-left
    ];

    for (const color of "XO") {
      for (let row = 0; row < m.length; row++) {
        for (let col = 0; col < m[0].length; col++) {
          if (m[row][col] !== color) continue;

          for (const { r: dRow, c: dCol } of directions) {
            let inARow = 0;

            for (let i = 0; i < 4; i++) {
              const rr = row + dRow * i;
              const cc = col + dCol * i;
              if (m[rr] && m[rr][cc] === color) {
                inARow++;
              } else {
                break;
              }
            }

            if (inARow === 4) {
              return color;
            }
          }
        }
      }
    }

    return false;
  }
}
