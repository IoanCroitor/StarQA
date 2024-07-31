import { l as languageTag } from './runtime.js'
import { t as toast } from './Toaster.svelte_svelte_type_style_lang.js'
const enter_your_password$1 = /* @__NO_SIDE_EFFECTS__ */ () =>
  `Enter your password`
const password$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Password`
const error_code$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Error Code`
const close$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Close`
const closed_error_message$1 = /* @__NO_SIDE_EFFECTS__ */ () =>
  `Closed error message`
const with_the_status$1 = /* @__NO_SIDE_EFFECTS__ */ () => `with the status`
const enter_your_password = /* @__NO_SIDE_EFFECTS__ */ (
  params = {},
  options = {},
) => {
  return {
    en: enter_your_password$1,
    fr: enter_your_password$1,
    ro: enter_your_password$1,
  }[options.languageTag ?? languageTag()]()
}
const password = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: password$1,
    fr: password$1,
    ro: password$1,
  }[options.languageTag ?? languageTag()]()
}
const error_code = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: error_code$1,
    fr: error_code$1,
    ro: error_code$1,
  }[options.languageTag ?? languageTag()]()
}
const close = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: close$1,
    fr: close$1,
    ro: close$1,
  }[options.languageTag ?? languageTag()]()
}
const closed_error_message = /* @__NO_SIDE_EFFECTS__ */ (
  params = {},
  options = {},
) => {
  return {
    en: closed_error_message$1,
    fr: closed_error_message$1,
    ro: closed_error_message$1,
  }[options.languageTag ?? languageTag()]()
}
const with_the_status = /* @__NO_SIDE_EFFECTS__ */ (
  params = {},
  options = {},
) => {
  return {
    en: with_the_status$1,
    fr: with_the_status$1,
    ro: with_the_status$1,
  }[options.languageTag ?? languageTag()]()
}
function handleErrorToast(status, error) {
  toast.error(error, {
    description: /* @__PURE__ */ error_code() + status,
    action: {
      label: /* @__PURE__ */ close(),
      onClick: () =>
        console.info(
          /* @__PURE__ */ closed_error_message() +
            ': ' +
            error +
            ' ' +
            /* @__PURE__ */ with_the_status() +
            ' ' +
            status,
        ),
    },
  })
}
function handleToast(type, status, message) {
  {
    handleErrorToast(status, message)
  }
}
export { enter_your_password as e, handleToast as h, password as p }
