import { l as languageTag } from "./runtime.js";
const login$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Login`;
const login$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Log in`;
const login$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Se connecter`;
const login = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: login$3,
    fr: login$1,
    ro: login$2
  }[options.languageTag ?? languageTag()]();
};
export {
  login as l
};
