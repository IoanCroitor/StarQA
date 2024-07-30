import { PUBLIC_UPLOAD_BUCKET } from '$env/static/public'
import { handleToast } from '@/handleToast'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { QuestionComponentInterface } from './types'

export async function uploadFile(
  file: File,
  path: string,
  supabase: SupabaseClient,
): Promise<string> {
  if (!file) return ''

  const { data, error } = await supabase.storage
    .from(PUBLIC_UPLOAD_BUCKET)
    .upload(path, file)

  if (error) {
    handleToast('Error Uploading file', 400, error.message)
    throw error
  }

  handleToast(
    'success',
    200,
    `File with path ${data.path} uploaded successfully`,
  )
  return data.path
}

export async function saveQuiz(
  quiz_title: string,
  quiz_description: string,
  quiz_code: string,
  quiz_tags_array: string[],
  quiz_cover_picture: File | undefined,
  questions: QuestionComponentInterface[],
  user_id: string,
  supabase: SupabaseClient,
) {
  try {
    let coverPictureUrl = ''
    if (quiz_cover_picture) {
      const path = `quiz_covers/${quiz_code}/${quiz_cover_picture.name}`
      coverPictureUrl = await uploadFile(quiz_cover_picture, path, supabase)
    }

    const { data: quizData, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        quiz_name: quiz_title,
        description: quiz_description,
        join_code: quiz_code,
        tags: quiz_tags_array,
        thumbnail_url_path: coverPictureUrl,
        created_by: user_id,
      })
      .select()
      .single()

    if (quizError) {
      handleToast(
        'error',
        400,
        `Error while processing quiz header: ${quizError.message}`,
      )
      throw quizError
    }

    for (const question of questions) {
      let questionFileUrl = ''
      if (question.file) {
        const path = `quiz_files/${quiz_code}/${question.file.name}`
        questionFileUrl = await uploadFile(question.file, path, supabase)
      }

      const responseOptions =
        typeof question.response_options_values === 'string'
          ? `{${question.response_options_values}}`
          : question.response_options_values

      const { data: questionData, error: questionError } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quizData.id,
          title: question.title,
          description: question.description,
          media_url_path: questionFileUrl,
          response_options: responseOptions,
          type: question.response_option_type,
          media_type: question.file_type,
        })
        .select()
        .single()

      if (questionError) {
        handleToast(
          'error',
          400,
          `Error while processing question: ${questionError.message}`,
        )
        throw questionError
      }

      const { error: answerError } = await supabase
        .from('quiz_answers')
        .insert({
          quiz_question_id: questionData.id,
          answer: question.response_option_corect,
          quiz_id: quizData.id,
        })

      if (answerError) {
        handleToast(
          'error',
          400,
          `Error while processing answer: ${answerError.message}`,
        )
        throw answerError
      }
    }

    console.log('Quiz saved successfully')
    handleToast('success', 200, 'Quiz uploaded successfully ;)')
  } catch (error) {
    handleToast('error', 400, `Error uploading quiz: ${error}`)
    console.error('Error uploading quiz:', error)
  }
}
