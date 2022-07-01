class Fraction {
  constructor(num, denom) {
    if (denom === 0)
      throw Error("Fraction with 0 denominator is illegal");

    this.#num = num;
    this.#denom = denom;
  }

  static add(a, b) {
    return new Fraction(a.#num * b.#denom + b.#num * a.#denom,
                        a.#denom * b.#denom);
  }

  static mult(a, b) {
    return new Fraction(a.#num * b.#num, a.#denom * b.#denom);
  }

  get num() {
    return this.#num;
  }

  get denom() {
    return this.#denom;
  }

  toJSON() {
    const f = this.reduce();
    if (f.#denom === 1)
      return f.#num.toString();
    return `${f.#num}/${f.#denom}`;
  }

  recip() {
    return new Fraction(this.#denom, this.#num);
  }

  reduce() {
    const factor = Fraction.#gcd(this.#num, this.#denom);
    const f = new Fraction(this.#num / factor, this.#denom / factor);
    if (f.#denom < 0) {
      f.#num *= -1;
      f.#denom *= -1;
    }
    return f;
  }

  #num;
  #denom;

  static #gcd(a, b) {
    if (b === 0)
      return a;
    return Fraction.#gcd(b, a % b);
  }
}
