// import type { PageServerLoad } from './$types'
// import { error } from '@sveltejs/kit'
// import { Carta } from 'carta-md'

// interface Params {
//   quizId: string
//   questionId: string
// }

// export const load: PageServerLoad = async ({ params, parent }) => {
//   const { quizId, questionId } = params as unknown as Params

//   // Find the specific answer for this question
//   const answer = answers.find((a) => a.question_id === questionId)

//   if (!answer) {
//     throw error(404, 'Answer not found')
//   }

//   // Prerender markdown
//   const carta = new Carta()
//   const prerenderedMarkdown = carta.render(answer.markdown_content)

//   return {
//     answer,
//     prerenderedMarkdown,
//   }
// }
