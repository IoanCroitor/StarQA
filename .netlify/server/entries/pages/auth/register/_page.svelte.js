import { c as create_ssr_component, b as compute_rest_props, a as subscribe, d as spread, h as escape_object, i as add_attribute, v as validate_component, f as escape_attribute_value, e as escape } from "../../../../chunks/ssr.js";
import { w as withGet, o as omit, m as makeElement, c as createElHelpers } from "../../../../chunks/index3.js";
import { c as createBitAttrs, L as Label, I as Input } from "../../../../chunks/label.js";
import "dequal";
import { w as writable } from "../../../../chunks/index2.js";
import { c as cn } from "../../../../chunks/utils.js";
import "../../../../chunks/pocketbase.js";
import "../../../../chunks/client.js";
import { B as Button } from "../../../../chunks/button.js";
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
const defaults = {
  defaultValue: 0,
  max: 100
};
const { name } = createElHelpers("progress");
const createProgress = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value"));
  const { max } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const root = makeElement(name(), {
    stores: [value, max],
    returned: ([$value, $max]) => {
      return {
        value: $value,
        max: $max,
        role: "meter",
        "aria-valuemin": 0,
        "aria-valuemax": $max,
        "aria-valuenow": $value,
        "data-value": $value,
        "data-state": $value === null ? "indeterminate" : $value === $max ? "complete" : "loading",
        "data-max": $max
      };
    }
  });
  return {
    elements: {
      root
    },
    states: {
      value
    },
    options
  };
};
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function getOptionUpdater(options) {
  return function(key, value) {
    if (value === void 0)
      return;
    const store = options[key];
    if (store) {
      store.set(value);
    }
  };
}
function getProgressData() {
  const NAME = "progress";
  const PARTS = ["root"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getProgressData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const progress = { ...createProgress(removeUndefined(props)), getAttrs };
  return {
    ...progress,
    updateOption: getOptionUpdater(progress.options)
  };
}
const Progress$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["max", "value", "onValueChange", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { max = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs } = setCtx({
    max,
    defaultValue: value,
    onValueChange: ({ next }) => {
      onValueChange?.(next);
      value = next;
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  const attrs = getAttrs("root");
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0)
    $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("max", max);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Progress = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "max", "value"]);
  let { class: className = void 0 } = $$props;
  let { max = 100 } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(Progress$1, "ProgressPrimitive.Root").$$render(
    $$result,
    {
      class: "relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
    },
    {},
    {
      default: () => {
        return `<div${spread(
          [
            {
              class: escape_attribute_value(cn("relative w-full overflow-hidden rounded-full bg-primary/20 h-full flex-1  transition-all", className))
            },
            escape_object($$restProps),
            {
              style: escape_attribute_value(`transform: translateX(-${100 - 100 * (value ?? 0) / (max ?? 1)}%)`)
            }
          ],
          {}
        )}></div>`;
      }
    }
  )}`;
});
function calculateStrength(password) {
  let score = 0;
  if (!password)
    return 0;
  if (password.length >= 8)
    score += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password))
    score += 20;
  if (/\d/.test(password))
    score += 20;
  if (/[\W_]/.test(password))
    score += 20;
  if (password.length >= 12)
    score += 15;
  return score;
}
function progressColorFunction(arePasswordsMathing, passwordConfirm, strength) {
  if (passwordConfirm === "") {
    return "bg-primary";
  } else if (!arePasswordsMathing) {
    return "bg-red-400";
  }
  if (strength === 100)
    return "bg-green-400";
  return "bg-primary";
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let arePasswordsMathing;
  let email = "";
  let password = "";
  let passwordConfirm = "";
  let strength = 0;
  let progressColor = "";
  let errorMessage = "";
  let passwordFormatted, passwordConfirmFormatted;
  let isLoading = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    passwordFormatted = password;
    passwordConfirmFormatted = passwordConfirm;
    arePasswordsMathing = passwordFormatted === passwordConfirmFormatted;
    strength = calculateStrength(passwordFormatted);
    progressColor = progressColorFunction(arePasswordsMathing, passwordConfirmFormatted, strength);
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1hsbyuy_START -->${$$result.title = `<title>Register an account</title>`, ""}<!-- HEAD_svelte-1hsbyuy_END -->`, ""} <div class=""><h2 class="text-sm font-bold text-red-500 mx-auto">${escape(errorMessage)}</h2> <form><div class="grid gap-2"><div class="grid gap-1"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
      default: () => {
        return `Email`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "email",
        placeholder: "ioan@example.com",
        type: "email",
        autocapitalize: "none",
        autocomplete: "email",
        autocorrect: "off",
        disabled: isLoading,
        value: email
      },
      {
        value: ($$value) => {
          email = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid gap-2 pt-2">${validate_component(Label, "Label").$$render($$result, { for: "password" }, {}, {
      default: () => {
        return `Password`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "password",
        type: "password",
        placeholder: "Password",
        disabled: isLoading,
        value: password
      },
      {
        value: ($$value) => {
          password = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "password", class: "sr-only" }, {}, {
      default: () => {
        return `Confirm Password`;
      }
    })} ${validate_component(Input, "Input").$$render(
      $$result,
      {
        id: "passwordconfirm",
        type: "password",
        placeholder: "Confirm Password",
        disabled: isLoading,
        value: passwordConfirm
      },
      {
        value: ($$value) => {
          passwordConfirm = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="w-full mx-1 mt-2 mb-1">${validate_component(Progress, "Progress").$$render(
      $$result,
      {
        value: strength,
        max: 100,
        class: ` ${progressColor} `
      },
      {},
      {}
    )}</div></div> ${validate_component(Button, "Button").$$render($$result, { type: "submit", disabled: isLoading }, {}, {
      default: () => {
        return `${``}
        Sign Up with Email`;
      }
    })}</div></form></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
