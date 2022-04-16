class Matrix extends Array {
  constructor(rows, cols) {
    super(rows);
    for (const i of this.keys())
      this[i] = new Array(cols);

    this.#rows = rows;
    this.#cols = cols;
  }

  get rows() {
    return this.#rows;
  }

  get cols() {
    return this.#cols;
  }

  swap(row1, row2) {
    for (let i = 0; i < this.#cols; i++)
      [this[row1][i], this[row2][i]] = [this[row2][i], this[row1][i]];
  }

  scale(row, factor) {
    this[row].forEach((x, i) => {this[row][i] *= factor;});
  }

  addToRow(srcRow, destRow, factor) {
    for (let i = 0; i < this.#cols; i++)
      this[destRow][i] += factor * this[srcRow][i];
  }

  #rows;
  #cols;
}
