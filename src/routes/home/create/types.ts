export type AnswerComponent = {
  question_answer: string
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

export type QuestionComponent = {
  response_options_values: string[]
  response_option_corect: string
  response_option_type: string
  title: string
  description: string
  description_upload: string | undefined
  file: File | undefined
  file_type: string | undefined
}

export type MediaType = 'image' | 'model' | 'video' | 'music'

export interface QuestionChildrenData {
  question_answer: string
  slider: {
    minValue: number
    maxValue: number
    desiredValue: number
  }
  truth_or_false: {
    truth: string
    false: string
  }
  trivia: {
    options: string[]
    answer: string
  }
}

export interface QuestionComponentInterface {
  response_options_values: string[]
  response_option_corect: string
  response_option_type: string
  title: string
  description: string
  description_upload: string
  file: File | undefined
  file_type: string | undefined
}
