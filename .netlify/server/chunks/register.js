import { l as languageTag } from "./runtime.js";
const register$3 = /* @__NO_SIDE_EFFECTS__ */ () => `Register`;
const register$2 = /* @__NO_SIDE_EFFECTS__ */ () => `Inregistreaza-te`;
const register$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Registre`;
const register = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: register$3,
    fr: register$1,
    ro: register$2
  }[options.languageTag ?? languageTag()]();
};
export {
  register as r
};
