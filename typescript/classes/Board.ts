export default class Board {
  matrix: string[][];
  currentPlayerColor: string;

  constructor() {
    this.matrix = [1, 2, 3, 4, 5, 6].map(() =>
      [1, 2, 3, 4, 5, 6, 7].map(() => " ")
    );
    this.currentPlayerColor = "X";
  }

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

  makeMove(color: string, column: number): boolean {
    for (let row = this.matrix.length - 1; row >= 0; row--) {
      if (this.matrix[row][column] === " ") {
        this.matrix[row][column] = color;
        return true;
      }
    }
    return false;
  }
}
