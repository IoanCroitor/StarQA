import { l as languageTag } from "./runtime.js";
const email$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Email`;
const email = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: email$1,
    fr: email$1,
    ro: email$1
  }[options.languageTag ?? languageTag()]();
};
export {
  email as e
};
