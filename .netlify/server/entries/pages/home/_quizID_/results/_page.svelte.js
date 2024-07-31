import { b as compute_rest_props, s as subscribe } from "../../../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, d as escape_attribute_value, f as escape_object, v as validate_component, e as escape, a as each } from "../../../../../chunks/ssr.js";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../../../chunks/table-row.js";
import { c as cn } from "../../../../../chunks/utils.js";
import "clsx";
import { p as page } from "../../../../../chunks/stores.js";
import { h as handleToast } from "../../../../../chunks/handleToast.js";
import { S as Spinner } from "../../../../../chunks/Spinner.js";
const Table_caption = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<caption${spread(
    [
      {
        class: escape_attribute_value(cn("text-muted-foreground mt-4 text-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</caption>`;
});
async function getQuizUUID(quizId, supabase) {
  let { data: quiz, error } = await supabase.from("quizzes").select("id").eq("join_code", quizId).single();
  if (error) handleToast("error", Number(error.code), error.message);
  return quiz ? quiz.id : null;
}
async function getQuizQuestions(uuid, supabase) {
  let { data: quiz_questions, error } = await supabase.from("quiz_questions").select("*").eq("quiz_id", uuid);
  if (error) handleToast("error", Number(error.code), error.message);
  console.log("quiz_questions", quiz_questions);
  return quiz_questions ? quiz_questions : null;
}
async function getQuestionArrayByQuizCode(quizId, supabase) {
  const uuid = await getQuizUUID(quizId, supabase);
  if (!uuid) return null;
  const questions = await getQuizQuestions(uuid, supabase);
  if (!questions) return null;
  return questions;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let quiz_code;
  let question_array;
  let quizuuid;
  let userResponses = [];
  let correctAnswers = [];
  let { data } = $$props;
  const { supabase, user } = data;
  let user_id = user?.id;
  async function getCorectAnswers() {
    try {
      quiz_code = Number($page.url.pathname.split("/")[2]);
      quizuuid = await getQuizUUID(quiz_code, supabase);
      console.log(quizuuid);
      const [correctAnswersData, userResponsesData] = await Promise.all([
        supabase.from("quiz_answers").select("quiz_question_id, answer").eq("quiz_id", quizuuid),
        supabase.from("user_responses").select("question_id, user_answer").eq("user_id", user_id).eq("quiz_id", quizuuid)
      ]);
      if (correctAnswersData.error) {
        throw new Error(correctAnswersData.error.message);
      }
      if (userResponsesData.error) {
        throw new Error(userResponsesData.error.message);
      }
      correctAnswers = correctAnswersData.data;
      userResponses = userResponsesData.data;
      console.log(correctAnswers, userResponses);
      calculateScore();
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }
  }
  let score = 0;
  function calculateScore() {
    correctAnswers.forEach((correctAnswer) => {
      const userAnswer = userResponses.find((response) => response.question_id === correctAnswer.quiz_question_id);
      if (userAnswer && userAnswer.user_answer === correctAnswer.answer) {
        score++;
      }
    });
  }
  async function getQuestionArray() {
    try {
      const { error } = await getQuestionArrayByQuizCode(quiz_code, supabase).then((res) => question_array = res);
      if (error) {
        throw new Error(error?.message);
      }
    } catch (error) {
      handleToast("error", 400, "Failed to load questions: " + error);
    }
  }
  async function updateUserScore(user_id2, score2) {
    console.log("passed userid", user_id2);
    let { data: data2, error } = await supabase.rpc("update_user_score", {
      p_user_id: user_id2,
      p_increment_value: score2
    });
    if (error) handleToast("error", 400, "Failed to update score: " + error.message);
  }
  getCorectAnswers();
  getQuestionArray();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  {
    updateUserScore(user_id, score);
  }
  $$unsubscribe_page();
  return `<div class="my-2 bg-muted-foreground/30 px-2 py-1 w-fit rounded-lg flex flex-row" data-svelte-h="svelte-8d0bwt"><h1 class="text-primary text-lg">Results:</h1></div> <div class="p-4 rounded-lg border">${question_array && correctAnswers.length > 0 && userResponses.length > 0 ? `<p class="px-2 py-2">You answered corectly to ${escape(score)} out of ${escape(correctAnswers.length)} questions</p> <div class="">${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Table_caption, "Table.Caption").$$render($$result, {}, {}, {
        default: () => {
          return `A list of your answered questions`;
        }
      })} ${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Table_head, "Table.Head").$$render($$result, { class: "w-[100px]" }, {}, {
                default: () => {
                  return `Question`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Answer`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Your answer`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-right" }, {}, {
                default: () => {
                  return `Points gained`;
                }
              })}`;
            }
          })}`;
        }
      })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
        default: () => {
          return `${each(question_array, (question, _i) => {
            return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                  default: () => {
                    return `${escape(_i + 1)}. ${escape(question.title)}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(correctAnswers[_i]?.answer)}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${escape(userResponses[_i]?.user_answer)}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-right" }, {}, {
                  default: () => {
                    return `${escape(correctAnswers[_i]?.answer === userResponses[_i]?.user_answer ? 1 : 0)}`;
                  }
                })} `;
              }
            })}`;
          })}`;
        }
      })}`;
    }
  })}</div>` : `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}`}</div>`;
});
export {
  Page as default
};
