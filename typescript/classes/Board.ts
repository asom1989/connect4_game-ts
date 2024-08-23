export default class Board {
  matrix: string[][];
  currentPlayerColor: string;

  constructor() {
    this.matrix = [1, 2, 3, 4, 5, 6].map(() =>
      [1, 2, 3, 4, 5, 6, 7].map(() => " ")
    );
    this.currentPlayerColor = "X";
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
    if (this.matrix[0][column] !== " ") {
      console.log("Kolumnen är full, försök igen.");
      return false;
    }

    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === " ") {
        this.matrix[row][column] = color;
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
}
