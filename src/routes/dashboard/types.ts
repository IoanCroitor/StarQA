export type AnswerComponent = {
  truth_or_false: {
    truth: string
    false: string
  }
  slider: {
    minValue: number
    maxValue: number
    desiredValue: number
  }
  trivia: {
    options: string[]
    answer: string
  }
}
