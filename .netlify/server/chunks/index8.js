import {
  c as create_ssr_component,
  s as spread,
  b as escape_object,
  d as add_attribute,
  f as each,
  e as escape,
  v as validate_component,
  a as escape_attribute_value,
} from './ssr.js'
import {
  m as hasContext,
  g as getContext,
  d as setContext,
  s as subscribe,
  n as noop,
  c as compute_rest_props,
} from './lifecycle.js'
import { L as Label } from './label.js'
import { c as cn } from './utils.js'
import { w as writable } from './index5.js'
import './index2.js'
import { B as Button } from './button.js'
import { nanoid } from 'nanoid/non-secure'
import 'clsx'
import 'dequal'
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg aria-hidden="true" aria-label="Loading..." class="w-4 h-4 text-muted/40 animate-spin dark:text-muted/40 fill-blue-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg>`
})
const FORM_FIELD = Symbol('FORM_FIELD_CTX')
function setFormField(props) {
  setContext(FORM_FIELD, props)
  return props
}
function getFormField() {
  if (!hasContext(FORM_FIELD)) {
    ctxError('Form.Field')
  }
  return getContext(FORM_FIELD)
}
const FORM_CONTROL = Symbol('FORM_CONTROL_CTX')
function setFormControl(props) {
  setContext(FORM_CONTROL, props)
  return props
}
function getFormControl() {
  if (!hasContext(FORM_CONTROL)) {
    ctxError('<Control />')
  }
  return getContext(FORM_CONTROL)
}
function ctxError(ctx) {
  throw new Error(
    `Unable to find \`${ctx}\` context. Did you forget to wrap the component in a \`${ctx}\`?`,
  )
}
function getAriaDescribedBy({
  fieldErrorsId = void 0,
  descriptionId = void 0,
  errors,
}) {
  let describedBy = ''
  if (descriptionId) {
    describedBy += descriptionId + ' '
  }
  if (errors.length && fieldErrorsId) {
    describedBy += fieldErrorsId
  }
  return describedBy ? describedBy.trim() : void 0
}
function getAriaRequired(constraints) {
  if (!('required' in constraints)) return void 0
  return constraints.required ? 'true' : void 0
}
function getAriaInvalid(errors) {
  return errors && errors.length ? 'true' : void 0
}
function getDataFsError(errors) {
  return errors && errors.length ? '' : void 0
}
function generateId() {
  return nanoid(5)
}
function extractErrorArray(errors) {
  if (Array.isArray(errors)) return errors
  if (typeof errors === 'object' && '_errors' in errors) {
    if (errors._errors !== void 0) return errors._errors
  }
  return []
}
function getValueAtPath(path, obj) {
  const keys = path.split(/[[\].]/).filter(Boolean)
  let value = obj
  for (const key of keys) {
    if (typeof value !== 'object' || value === null) {
      return void 0
    }
    value = value[key]
  }
  return value
}
const Field = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let formErrors
  let formConstraints
  let formTainted
  let formData
  let $formTainted,
    $$unsubscribe_formTainted = noop,
    $$subscribe_formTainted = () => (
      $$unsubscribe_formTainted(),
      ($$unsubscribe_formTainted = subscribe(
        formTainted,
        ($$value) => ($formTainted = $$value),
      )),
      formTainted
    )
  let $formConstraints,
    $$unsubscribe_formConstraints = noop,
    $$subscribe_formConstraints = () => (
      $$unsubscribe_formConstraints(),
      ($$unsubscribe_formConstraints = subscribe(
        formConstraints,
        ($$value) => ($formConstraints = $$value),
      )),
      formConstraints
    )
  let $formErrors,
    $$unsubscribe_formErrors = noop,
    $$subscribe_formErrors = () => (
      $$unsubscribe_formErrors(),
      ($$unsubscribe_formErrors = subscribe(
        formErrors,
        ($$value) => ($formErrors = $$value),
      )),
      formErrors
    )
  let $formData,
    $$unsubscribe_formData = noop,
    $$subscribe_formData = () => (
      $$unsubscribe_formData(),
      ($$unsubscribe_formData = subscribe(
        formData,
        ($$value) => ($formData = $$value),
      )),
      formData
    )
  let $errors, $$unsubscribe_errors
  let $tainted, $$unsubscribe_tainted
  let { form } = $$props
  let { name } = $$props
  const field = {
    name: writable(name),
    errors: writable([]),
    constraints: writable({}),
    tainted: writable(false),
    fieldErrorsId: writable(),
    descriptionId: writable(),
    form,
  }
  const { tainted, errors } = field
  $$unsubscribe_tainted = subscribe(tainted, (value) => ($tainted = value))
  $$unsubscribe_errors = subscribe(errors, (value) => ($errors = value))
  setFormField(field)
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form)
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name)
  $$subscribe_formErrors(
    ({
      errors: formErrors,
      constraints: formConstraints,
      tainted: formTainted,
      form: formData,
    } = form),
    $$subscribe_formConstraints(),
    $$subscribe_formTainted(),
    $$subscribe_formData(),
  )
  {
    field.name.set(name)
  }
  {
    field.errors.set(extractErrorArray(getValueAtPath(name, $formErrors)))
  }
  {
    field.constraints.set(getValueAtPath(name, $formConstraints) ?? {})
  }
  {
    field.tainted.set(
      $formTainted ? getValueAtPath(name, $formTainted) === true : false,
    )
  }
  $$unsubscribe_formTainted()
  $$unsubscribe_formConstraints()
  $$unsubscribe_formErrors()
  $$unsubscribe_formData()
  $$unsubscribe_errors()
  $$unsubscribe_tainted()
  return ` ${
    slots.default
      ? slots.default({
          value: $formData[name],
          errors: $errors,
          tainted: $tainted,
          constraints: $formConstraints[name],
        })
      : ``
  }`
})
const Control$1 = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let errorAttr
    let attrs
    let labelAttrs
    let $idStore, $$unsubscribe_idStore
    let $constraints, $$unsubscribe_constraints
    let $errors, $$unsubscribe_errors
    let $descriptionId, $$unsubscribe_descriptionId
    let $fieldErrorsId, $$unsubscribe_fieldErrorsId
    let $name, $$unsubscribe_name
    let { id = generateId() } = $$props
    const { name, fieldErrorsId, descriptionId, errors, constraints } =
      getFormField()
    $$unsubscribe_name = subscribe(name, (value) => ($name = value))
    $$unsubscribe_fieldErrorsId = subscribe(
      fieldErrorsId,
      (value) => ($fieldErrorsId = value),
    )
    $$unsubscribe_descriptionId = subscribe(
      descriptionId,
      (value) => ($descriptionId = value),
    )
    $$unsubscribe_errors = subscribe(errors, (value) => ($errors = value))
    $$unsubscribe_constraints = subscribe(
      constraints,
      (value) => ($constraints = value),
    )
    const controlContext = {
      id: writable(id),
      attrs: writable(),
      labelAttrs: writable(),
    }
    const { id: idStore } = controlContext
    $$unsubscribe_idStore = subscribe(idStore, (value) => ($idStore = value))
    setFormControl(controlContext)
    if ($$props.id === void 0 && $$bindings.id && id !== void 0)
      $$bindings.id(id)
    {
      controlContext.id.set(id)
    }
    errorAttr = getDataFsError($errors)
    attrs = {
      name: $name,
      id: $idStore,
      'data-fs-error': errorAttr,
      'aria-describedby': getAriaDescribedBy({
        fieldErrorsId: $fieldErrorsId,
        descriptionId: $descriptionId,
        errors: $errors,
      }),
      'aria-invalid': getAriaInvalid($errors),
      'aria-required': getAriaRequired($constraints),
      'data-fs-control': '',
    }
    labelAttrs = {
      for: $idStore,
      'data-fs-label': '',
      'data-fs-error': errorAttr,
    }
    {
      controlContext.attrs.set(attrs)
    }
    {
      controlContext.labelAttrs.set(labelAttrs)
    }
    $$unsubscribe_idStore()
    $$unsubscribe_constraints()
    $$unsubscribe_errors()
    $$unsubscribe_descriptionId()
    $$unsubscribe_fieldErrorsId()
    $$unsubscribe_name()
    return ` ${slots.default ? slots.default({ attrs }) : ``}`
  },
)
const Field_errors = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let errorAttr
    let fieldErrorsAttrs
    let errorAttrs
    let $$restProps = compute_rest_props($$props, ['id', 'asChild', 'el'])
    let $fieldErrorsId, $$unsubscribe_fieldErrorsId
    let $errors, $$unsubscribe_errors
    const { fieldErrorsId, errors } = getFormField()
    $$unsubscribe_fieldErrorsId = subscribe(
      fieldErrorsId,
      (value) => ($fieldErrorsId = value),
    )
    $$unsubscribe_errors = subscribe(errors, (value) => ($errors = value))
    let { id = generateId() } = $$props
    let { asChild = false } = $$props
    let { el = void 0 } = $$props
    if ($$props.id === void 0 && $$bindings.id && id !== void 0)
      $$bindings.id(id)
    if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
      $$bindings.asChild(asChild)
    if ($$props.el === void 0 && $$bindings.el && el !== void 0)
      $$bindings.el(el)
    errorAttr = getDataFsError($errors)
    {
      fieldErrorsId.set(id)
    }
    fieldErrorsAttrs = {
      id: $fieldErrorsId,
      'data-fs-error': errorAttr,
      'data-fs-field-errors': '',
      'aria-live': 'assertive',
      ...$$restProps,
    }
    errorAttrs = {
      'data-fs-field-error': '',
      'data-fs-error': errorAttr,
    }
    $$unsubscribe_fieldErrorsId()
    $$unsubscribe_errors()
    return ` ${
      asChild
        ? `${
            slots.default
              ? slots.default({
                  errors: $errors,
                  fieldErrorsAttrs,
                  errorAttrs,
                })
              : ``
          }`
        : `<div${spread([escape_object(fieldErrorsAttrs)], {})}${add_attribute('this', el, 0)}>${
            slots.default
              ? slots.default({
                  errors: $errors,
                  fieldErrorsAttrs,
                  errorAttrs,
                })
              : ` ${each($errors, (error) => {
                  return `<div${spread([escape_object(errorAttrs)], {})}>${escape(error)}</div>`
                })} `
          }</div>`
    }`
  },
)
const Form_label = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ['class'])
    let $labelAttrs, $$unsubscribe_labelAttrs
    let { class: className = void 0 } = $$props
    const { labelAttrs } = getFormControl()
    $$unsubscribe_labelAttrs = subscribe(
      labelAttrs,
      (value) => ($labelAttrs = value),
    )
    if ($$props.class === void 0 && $$bindings.class && className !== void 0)
      $$bindings.class(className)
    $$unsubscribe_labelAttrs()
    return `${validate_component(Label, 'Label').$$render(
      $$result,
      Object.assign(
        {},
        $labelAttrs,
        {
          class: cn('data-[fs-error]:text-destructive', className),
        },
        $$restProps,
      ),
      {},
      {
        default: () => {
          return `${slots.default ? slots.default({ labelAttrs }) : ``}`
        },
      },
    )}`
  },
)
const Form_field_errors = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, ['class', 'errorClasses'])
    let { class: className = void 0 } = $$props
    let { errorClasses = void 0 } = $$props
    if ($$props.class === void 0 && $$bindings.class && className !== void 0)
      $$bindings.class(className)
    if (
      $$props.errorClasses === void 0 &&
      $$bindings.errorClasses &&
      errorClasses !== void 0
    )
      $$bindings.errorClasses(errorClasses)
    return `${validate_component(
      Field_errors,
      'FormPrimitive.FieldErrors',
    ).$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn('text-[0.8rem] font-medium text-destructive', className),
        },
        $$restProps,
      ),
      {},
      {
        default: ({ errors, fieldErrorsAttrs, errorAttrs }) => {
          return `${
            slots.default
              ? slots.default({ errors, fieldErrorsAttrs, errorAttrs })
              : ` ${each(errors, (error) => {
                  return `<div${spread(
                    [
                      escape_object(errorAttrs),
                      {
                        class: escape_attribute_value(cn(errorClasses)),
                      },
                    ],
                    {},
                  )}>${escape(error)}</div>`
                })} `
          }`
        },
      },
    )}`
  },
)
const Form_field = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let { form } = $$props
    let { name } = $$props
    let { class: className = void 0 } = $$props
    if ($$props.form === void 0 && $$bindings.form && form !== void 0)
      $$bindings.form(form)
    if ($$props.name === void 0 && $$bindings.name && name !== void 0)
      $$bindings.name(name)
    if ($$props.class === void 0 && $$bindings.class && className !== void 0)
      $$bindings.class(className)
    return `${validate_component(Field, 'FormPrimitive.Field').$$render(
      $$result,
      { form, name },
      {},
      {
        default: ({ constraints, errors, tainted, value }) => {
          return `<div${add_attribute('class', cn('space-y-2', className), 0)}>${slots.default ? slots.default({ constraints, errors, tainted, value }) : ``}</div>`
        },
      },
    )}`
  },
)
const Form_button = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let $$restProps = compute_rest_props($$props, [])
    return `${validate_component(Button, 'Button.Root').$$render(
      $$result,
      Object.assign({}, { type: 'submit' }, $$restProps),
      {},
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`
        },
      },
    )}`
  },
)
const Control = Control$1
export {
  Control as C,
  Form_field as F,
  Spinner as S,
  Form_label as a,
  Form_field_errors as b,
  Form_button as c,
}
