import { handleToast } from '@/handleToast'

export async function getQuizUUID(quizId: number, supabase: any) {
  let { data: quiz, error } = await supabase
    .from('quizzes')
    .select('id')
    .eq('join_code', quizId)
    .single()
  if (error) handleToast('error', Number(error.code), error.message)
  return quiz ? quiz.id : null
}

async function getQuizQuestions(uuid: string, supabase: any) {
  let { data: quiz_questions, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', uuid)

  if (error) handleToast('error', Number(error.code), error.message)
  console.log('quiz_questions', quiz_questions)
  return quiz_questions ? quiz_questions : null
}

export async function getQuestionArrayByQuizId(quizId: number, supabase: any) {
  const uuid = await getQuizUUID(quizId, supabase)
  if (!uuid) return null
  const questions = await getQuizQuestions(uuid, supabase)
  if (!questions) return null
  return questions
}
