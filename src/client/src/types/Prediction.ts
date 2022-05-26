export class Prediction {
  constructor(dalc: string, walc: string) {
    this.Dalc = parseFloat(dalc);
    this.Walc = parseFloat(walc);
  }

  Dalc: number;
  Walc: number;
}
