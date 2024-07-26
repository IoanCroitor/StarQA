import { d as compute_rest_props, s as subscribe } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_object, d as add_attribute, v as validate_component, a as escape_attribute_value } from "./ssr.js";
import "dequal";
import { o as omit, m as makeElement, a as createElHelpers, c as cn } from "./index2.js";
import { t as toWritableStores, o as overridable, r as removeUndefined, g as getOptionUpdater } from "./updater.js";
import { w as writable } from "./index3.js";
import { c as createBitAttrs } from "./input.js";
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
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
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
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
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
  if (!password) return 0;
  if (password.length >= 8) score += 25;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
  if (/\d/.test(password)) score += 20;
  if (/[\W_]/.test(password)) score += 20;
  if (password.length >= 12) score += 15;
  return score;
}
function progressColorFunction(arePasswordsMathing, passwordConfirm, strength) {
  if (passwordConfirm === "") {
    return "bg-primary";
  } else if (!arePasswordsMathing) {
    return "bg-red-400";
  }
  if (strength === 100) return "bg-green-400";
  return "bg-primary";
}
export {
  Progress as P,
  calculateStrength as c,
  progressColorFunction as p
};
