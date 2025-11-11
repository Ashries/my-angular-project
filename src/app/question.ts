export class Question {
  constructor(
    public questionText: string,
    public feedbackTexts: string[],
    public currentFeedback: string = ''
  ) {}

  setFeedback(value: number): void {
    if (value >= 0 && value < this.feedbackTexts.length) {
      this.currentFeedback = this.feedbackTexts[value];
    }
  }

  getFeedbackValue(): number {
    return this.feedbackTexts.indexOf(this.currentFeedback);
  }
}