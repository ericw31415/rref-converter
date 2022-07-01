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

  copy() {
    const ret = new Matrix(this.#rows, this.#cols);
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++)
        ret[i][j] = this[i][j];
    }
    return ret;
  }

  swap(row1, row2) {
    for (let i = 0; i < this.#cols; i++)
      [this[row1][i], this[row2][i]] = [this[row2][i], this[row1][i]];
  }

  scale(row, factor) {
    this[row].forEach((_, i) => {
      this[row][i] = Fraction.mult(this[row][i], factor);
    });
  }

  addToRow(srcRow, destRow, factor) {
    for (let i = 0; i < this.#cols; i++) {
      this[destRow][i] = Fraction.add(
        this[destRow][i],
        Fraction.mult(this[srcRow][i], factor));
    }
  }

  rref() {
    const matrix = this.copy();

    // Gaussian elimination
    let i = 0;
    let j = 0;
    while (j < this.#cols) {
      const nonZero = matrix.#firstNonZero(i, j);
      if (nonZero !== null) {
        if (nonZero !== i)
          matrix.swap(i, nonZero);
        matrix.scale(i, matrix[i][j].recip());

        // Clear column
        for (let row = 0; row < this.#rows; row++) {
          if (row !== i) {
            matrix.addToRow(i, row,
              Fraction.mult(matrix[row][j], new Fraction(-1, 1)));
          }
        }
        i++;
      }
      j++;
    }
    return matrix;
  }

  #rows;
  #cols;

  #firstNonZero(start, col) {
    for (let i = start; i < this.#rows; i++) {
      if (this[i][col].num !== 0)
        return i;
    }
    return null;
  }
}
