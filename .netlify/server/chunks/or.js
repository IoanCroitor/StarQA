import { l as languageTag } from "./runtime.js";
const join_a_quiz_to_rank_higher_in_the_leaderboards$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Join a quiz to test your knowledge and rank higher in the leaderboards`;
const join_a_quiz$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Join a quiz!`;
const join$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Join`;
const create$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Create`;
const or$1 = /* @__NO_SIDE_EFFECTS__ */ () => `or`;
const join_a_quiz_to_rank_higher_in_the_leaderboards = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: join_a_quiz_to_rank_higher_in_the_leaderboards$1,
    fr: join_a_quiz_to_rank_higher_in_the_leaderboards$1,
    ro: join_a_quiz_to_rank_higher_in_the_leaderboards$1
  }[options.languageTag ?? languageTag()]();
};
const join_a_quiz = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: join_a_quiz$1,
    fr: join_a_quiz$1,
    ro: join_a_quiz$1
  }[options.languageTag ?? languageTag()]();
};
const join = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: join$1,
    fr: join$1,
    ro: join$1
  }[options.languageTag ?? languageTag()]();
};
const create = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: create$1,
    fr: create$1,
    ro: create$1
  }[options.languageTag ?? languageTag()]();
};
const or = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: or$1,
    fr: or$1,
    ro: or$1
  }[options.languageTag ?? languageTag()]();
};
export {
  join_a_quiz_to_rank_higher_in_the_leaderboards as a,
  join as b,
  create as c,
  join_a_quiz as j,
  or as o
};
