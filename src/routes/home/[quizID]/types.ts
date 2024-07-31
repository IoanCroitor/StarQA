export interface QuizQuestion {
  created_at: string
  description: string
  id: string
  media_type: string
  media_url_path: string | null
  quiz_id: string
  response_options: string // Original JSON string
  title: string
  type: string
}

export interface QuizResponse {
  quiz_question_id: string
  answer: string
}

export interface UserResponse {
  question_id: any
  user_answer: any
}
