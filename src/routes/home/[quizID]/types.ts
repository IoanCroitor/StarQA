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
