import { l as languageTag } from './runtime.js'
const enter_your_email$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Enter your email`
const enter_your_email = /* @__NO_SIDE_EFFECTS__ */ (
  params = {},
  options = {},
) => {
  return {
    en: enter_your_email$1,
    fr: enter_your_email$1,
    ro: enter_your_email$1,
  }[options.languageTag ?? languageTag()]()
}
export { enter_your_email as e }
