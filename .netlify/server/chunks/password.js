import { l as languageTag } from "./runtime.js";
const enter_your_password$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Enter your password`;
const password$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Password`;
const enter_your_password = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: enter_your_password$1,
    fr: enter_your_password$1,
    ro: enter_your_password$1
  }[options.languageTag ?? languageTag()]();
};
const password = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: password$1,
    fr: password$1,
    ro: password$1
  }[options.languageTag ?? languageTag()]();
};
export {
  enter_your_password as e,
  password as p
};
