import { d as setContext, g as getContext, c as compute_rest_props, s as subscribe, f as createEventDispatcher, o as onDestroy } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_object, d as add_attribute, a as escape_attribute_value, e as escape, v as validate_component, f as each, m as missing_component } from "../../../../chunks/ssr.js";
import "dequal";
import { o as omit, w as withGet, m as makeElement, q as disabledAttr, s as styleToString, t as makeElementArray, e as effect, i as isBrowser, g as executeCallbacks, l as addEventListener, c as createElHelpers, v as getElementByMeltId, f as isHTMLElement, a as addMeltEventListener, k as kbd } from "../../../../chunks/index2.js";
import { t as toWritableStores, o as overridable, r as removeUndefined, g as getOptionUpdater } from "../../../../chunks/updater.js";
import { g as generateIds } from "../../../../chunks/id.js";
import { w as writable, d as derived } from "../../../../chunks/index4.js";
import { c as createBitAttrs, a as createDispatcher } from "../../../../chunks/events.js";
import { c as cn } from "../../../../chunks/utils.js";
import { B as Button } from "../../../../chunks/button.js";
import { g as getTranslationFunctions } from "../../../../chunks/index3.js";
import { C as Carta, M as MarkdownEditor, I as Icon } from "../../../../chunks/carta.js";
import { b as PUBLIC_BUCKET_PATH } from "../../../../chunks/public.js";
import "clsx";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card-title.js";
import { C as Card_description } from "../../../../chunks/card-description.js";
import { p as page } from "../../../../chunks/stores.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
function snapValueToStep(value, min, max, step) {
  const remainder = (value - (isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;
  if (!isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor((max - min) / step) * step;
    }
  } else if (!isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(max / step) * step;
  }
  const string = step.toString();
  const index = string.indexOf(".");
  const precision = index >= 0 ? string.length - index : 0;
  if (precision > 0) {
    const pow = Math.pow(10, precision);
    snappedValue = Math.round(snappedValue * pow) / pow;
  }
  return snappedValue;
}
const defaults = {
  defaultValue: [],
  min: 0,
  max: 100,
  step: 1,
  orientation: "horizontal",
  dir: "ltr",
  disabled: false
};
const { name } = createElHelpers("slider");
const createSlider = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value", "onValueChange", "defaultValue"));
  const { min, max, step, orientation, dir, disabled } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const isActive = withGet(writable(false));
  const currentThumbIndex = withGet(writable(0));
  const activeThumb = withGet(writable(null));
  const meltIds = generateIds(["root"]);
  const updatePosition = (val, index) => {
    value.update((prev) => {
      if (!prev)
        return [val];
      if (prev[index] === val)
        return prev;
      const newValue = [...prev];
      const direction2 = newValue[index] > val ? -1 : 1;
      function swap() {
        newValue[index] = newValue[index + direction2];
        newValue[index + direction2] = val;
        const thumbs2 = getAllThumbs();
        if (thumbs2) {
          thumbs2[index + direction2].focus();
          activeThumb.set({ thumb: thumbs2[index + direction2], index: index + direction2 });
        }
      }
      if (direction2 === -1 && val < newValue[index - 1]) {
        swap();
        return newValue;
      } else if (direction2 === 1 && val > newValue[index + 1]) {
        swap();
        return newValue;
      }
      const $min = min.get();
      const $max = max.get();
      const $step = step.get();
      newValue[index] = snapValueToStep(val, $min, $max, $step);
      return newValue;
    });
  };
  const getAllThumbs = () => {
    const root2 = getElementByMeltId(meltIds.root);
    if (!root2)
      return null;
    return Array.from(root2.querySelectorAll('[data-melt-part="thumb"]')).filter((thumb) => isHTMLElement(thumb));
  };
  const position = derived([min, max], ([$min, $max]) => {
    return (val) => {
      const pos = (val - $min) / ($max - $min) * 100;
      return pos;
    };
  });
  const direction = withGet.derived([orientation, dir], ([$orientation, $dir]) => {
    if ($orientation === "horizontal") {
      return $dir === "rtl" ? "rl" : "lr";
    } else {
      return $dir === "rtl" ? "tb" : "bt";
    }
  });
  const root = makeElement(name(), {
    stores: [disabled, orientation, dir],
    returned: ([$disabled, $orientation, $dir]) => {
      return {
        dir: $dir,
        disabled: disabledAttr($disabled),
        "data-disabled": disabledAttr($disabled),
        "data-orientation": $orientation,
        style: $disabled ? void 0 : `touch-action: ${$orientation === "horizontal" ? "pan-y" : "pan-x"}`,
        "data-melt-id": meltIds.root
      };
    }
  });
  const range = makeElement(name("range"), {
    stores: [value, direction, position],
    returned: ([$value, $direction, $position]) => {
      const minimum = $value.length > 1 ? $position(Math.min(...$value) ?? 0) : 0;
      const maximum = 100 - $position(Math.max(...$value) ?? 0);
      const style = {
        position: "absolute"
      };
      switch ($direction) {
        case "lr": {
          style.left = `${minimum}%`;
          style.right = `${maximum}%`;
          break;
        }
        case "rl": {
          style.right = `${minimum}%`;
          style.left = `${maximum}%`;
          break;
        }
        case "bt": {
          style.bottom = `${minimum}%`;
          style.top = `${maximum}%`;
          break;
        }
        case "tb": {
          style.top = `${minimum}%`;
          style.bottom = `${maximum}%`;
          break;
        }
      }
      return {
        style: styleToString(style)
      };
    }
  });
  const thumbs = makeElementArray(name("thumb"), {
    stores: [value, position, min, max, disabled, orientation, direction],
    returned: ([$value, $position, $min, $max, $disabled, $orientation, $direction]) => {
      const result = Array.from({ length: $value.length || 1 }, (_, i) => {
        const currentThumb = currentThumbIndex.get();
        if (currentThumb < $value.length) {
          currentThumbIndex.update((prev) => prev + 1);
        }
        const thumbValue = $value[i];
        const thumbPosition = `${$position(thumbValue)}%`;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = thumbPosition;
            style.translate = "-50% 0";
            break;
          }
          case "rl": {
            style.right = thumbPosition;
            style.translate = "50% 0";
            break;
          }
          case "bt": {
            style.bottom = thumbPosition;
            style.translate = "0 50%";
            break;
          }
          case "tb": {
            style.top = thumbPosition;
            style.translate = "0 -50%";
            break;
          }
        }
        return {
          role: "slider",
          "aria-valuemin": $min,
          "aria-valuemax": $max,
          "aria-valuenow": thumbValue,
          "aria-disabled": disabledAttr($disabled),
          "aria-orientation": $orientation,
          "data-melt-part": "thumb",
          "data-value": thumbValue,
          style: styleToString(style),
          tabindex: $disabled ? -1 : 0
        };
      });
      return result;
    },
    action: (node) => {
      const unsub = addMeltEventListener(node, "keydown", (event) => {
        if (disabled.get())
          return;
        const target = event.currentTarget;
        if (!isHTMLElement(target))
          return;
        const thumbs2 = getAllThumbs();
        if (!thumbs2?.length)
          return;
        const index = thumbs2.indexOf(target);
        currentThumbIndex.set(index);
        if (![
          kbd.ARROW_LEFT,
          kbd.ARROW_RIGHT,
          kbd.ARROW_UP,
          kbd.ARROW_DOWN,
          kbd.HOME,
          kbd.END
        ].includes(event.key)) {
          return;
        }
        event.preventDefault();
        const $min = min.get();
        const $max = max.get();
        const $step = step.get();
        const $value = value.get();
        const $orientation = orientation.get();
        const $direction = direction.get();
        const thumbValue = $value[index];
        switch (event.key) {
          case kbd.HOME: {
            updatePosition($min, index);
            break;
          }
          case kbd.END: {
            updatePosition($max, index);
            break;
          }
          case kbd.ARROW_LEFT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction === "lr" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
          case kbd.ARROW_RIGHT: {
            if ($orientation !== "horizontal")
              break;
            if (event.metaKey) {
              const newValue = $direction === "rl" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "rl" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction === "lr" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_UP: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $min : $max;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            } else if ($direction !== "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            }
            break;
          }
          case kbd.ARROW_DOWN: {
            if (event.metaKey) {
              const newValue = $direction === "tb" ? $max : $min;
              updatePosition(newValue, index);
            } else if ($direction === "tb" && thumbValue < $max) {
              updatePosition(thumbValue + $step, index);
            } else if ($direction !== "tb" && thumbValue > $min) {
              updatePosition(thumbValue - $step, index);
            }
            break;
          }
        }
      });
      return {
        destroy: unsub
      };
    }
  });
  const ticks = makeElementArray(name("tick"), {
    stores: [value, min, max, step, direction],
    returned: ([$value, $min, $max, $step, $direction]) => {
      const difference = $max - $min;
      let count = Math.ceil(difference / $step);
      if (difference % $step == 0) {
        count++;
      }
      return Array.from({ length: count }, (_, i) => {
        const tickPosition = `${i * ($step / ($max - $min)) * 100}%`;
        const isFirst = i === 0;
        const isLast = i === count - 1;
        const offsetPercentage = isFirst ? 0 : isLast ? -100 : -50;
        const style = {
          position: "absolute"
        };
        switch ($direction) {
          case "lr": {
            style.left = tickPosition;
            style.translate = `${offsetPercentage}% 0`;
            break;
          }
          case "rl": {
            style.right = tickPosition;
            style.translate = `${-offsetPercentage}% 0`;
            break;
          }
          case "bt": {
            style.bottom = tickPosition;
            style.translate = `0 ${-offsetPercentage}%`;
            break;
          }
          case "tb": {
            style.top = tickPosition;
            style.translate = `0 ${offsetPercentage}%`;
            break;
          }
        }
        const tickValue = $min + i * $step;
        const bounded = $value.length === 1 ? tickValue <= $value[0] : $value[0] <= tickValue && tickValue <= $value[$value.length - 1];
        return {
          "data-bounded": bounded ? true : void 0,
          "data-value": tickValue,
          style: styleToString(style)
        };
      });
    }
  });
  effect([root, min, max, disabled, orientation, direction, step], ([$root, $min, $max, $disabled, $orientation, $direction, $step]) => {
    if (!isBrowser || $disabled)
      return;
    const applyPosition = (clientXY, activeThumbIdx, start, end) => {
      const percent = (clientXY - start) / (end - start);
      const val = percent * ($max - $min) + $min;
      if (val < $min) {
        updatePosition($min, activeThumbIdx);
      } else if (val > $max) {
        updatePosition($max, activeThumbIdx);
      } else {
        const step2 = $step;
        const min2 = $min;
        const currentStep = Math.floor((val - min2) / step2);
        const midpointOfCurrentStep = min2 + currentStep * step2 + step2 / 2;
        const midpointOfNextStep = min2 + (currentStep + 1) * step2 + step2 / 2;
        const newValue = val >= midpointOfCurrentStep && val < midpointOfNextStep ? (currentStep + 1) * step2 + min2 : currentStep * step2 + min2;
        if (newValue <= $max) {
          updatePosition(newValue, activeThumbIdx);
        }
      }
    };
    const getClosestThumb = (e) => {
      const thumbs2 = getAllThumbs();
      if (!thumbs2)
        return;
      thumbs2.forEach((thumb2) => thumb2.blur());
      const distances = thumbs2.map((thumb2) => {
        if ($orientation === "horizontal") {
          const { left, right } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientX - (left + right) / 2);
        } else {
          const { top, bottom } = thumb2.getBoundingClientRect();
          return Math.abs(e.clientY - (top + bottom) / 2);
        }
      });
      const thumb = thumbs2[distances.indexOf(Math.min(...distances))];
      const index = thumbs2.indexOf(thumb);
      return { thumb, index };
    };
    const pointerMove = (e) => {
      if (!isActive.get())
        return;
      e.preventDefault();
      e.stopPropagation();
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = activeThumb.get();
      if (!sliderEl || !closestThumb)
        return;
      closestThumb.thumb.focus();
      const { left, right, top, bottom } = sliderEl.getBoundingClientRect();
      switch ($direction) {
        case "lr": {
          applyPosition(e.clientX, closestThumb.index, left, right);
          break;
        }
        case "rl": {
          applyPosition(e.clientX, closestThumb.index, right, left);
          break;
        }
        case "bt": {
          applyPosition(e.clientY, closestThumb.index, bottom, top);
          break;
        }
        case "tb": {
          applyPosition(e.clientY, closestThumb.index, top, bottom);
          break;
        }
      }
    };
    const pointerDown = (e) => {
      if (e.button !== 0)
        return;
      const sliderEl = getElementByMeltId($root["data-melt-id"]);
      const closestThumb = getClosestThumb(e);
      if (!closestThumb || !sliderEl)
        return;
      const target = e.target;
      if (!isHTMLElement(target) || !sliderEl.contains(target)) {
        return;
      }
      e.preventDefault();
      activeThumb.set(closestThumb);
      closestThumb.thumb.focus();
      isActive.set(true);
      pointerMove(e);
    };
    const pointerUp = () => {
      isActive.set(false);
    };
    const unsub = executeCallbacks(addEventListener(document, "pointerdown", pointerDown), addEventListener(document, "pointerup", pointerUp), addEventListener(document, "pointerleave", pointerUp), addEventListener(document, "pointermove", pointerMove));
    return () => {
      unsub();
    };
  });
  effect([step, min, max, value], function fixValue([$step, $min, $max, $value]) {
    const isValidValue = (v) => {
      const snappedValue = snapValueToStep(v, $min, $max, $step);
      return snappedValue === v;
    };
    const gcv = (v) => {
      return snapValueToStep(v, $min, $max, $step);
    };
    if ($value.some((v) => !isValidValue(v))) {
      value.update((prev) => {
        return prev.map(gcv);
      });
    }
  });
  return {
    elements: {
      root,
      thumbs,
      range,
      ticks
    },
    states: {
      value
    },
    options
  };
};
function getSliderData() {
  const NAME = "slider";
  const PARTS = ["root", "input", "range", "thumb", "tick"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSliderData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const slider = { ...createSlider(removeUndefined(props)), getAttrs };
  setContext(NAME, slider);
  return {
    ...slider,
    updateOption: getOptionUpdater(slider.options)
  };
}
function getCtx() {
  const { NAME } = getSliderData();
  return getContext(NAME);
}
const Slider$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "disabled",
    "min",
    "max",
    "step",
    "orientation",
    "dir",
    "value",
    "onValueChange",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let $ticks, $$unsubscribe_ticks;
  let $thumbs, $$unsubscribe_thumbs;
  let { disabled = void 0 } = $$props;
  let { min = void 0 } = $$props;
  let { max = void 0 } = $$props;
  let { step = void 0 } = $$props;
  let { orientation = void 0 } = $$props;
  let { dir = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root, ticks, thumbs }, states: { value: localValue }, updateOption, getAttrs } = setCtx({
    disabled,
    dir,
    min,
    max,
    step,
    orientation,
    defaultValue: value,
    onValueChange: ({ next }) => {
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  $$unsubscribe_ticks = subscribe(ticks, (value2) => $ticks = value2);
  $$unsubscribe_thumbs = subscribe(thumbs, (value2) => $thumbs = value2);
  const attrs = getAttrs("root");
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.step === void 0 && $$bindings.step && step !== void 0) $$bindings.step(step);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.dir === void 0 && $$bindings.dir && dir !== void 0) $$bindings.dir(dir);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("min", min);
  }
  {
    updateOption("max", max);
  }
  {
    updateOption("step", step);
  }
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("dir", dir);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  $$unsubscribe_ticks();
  $$unsubscribe_thumbs();
  return `${asChild ? `${slots.default ? slots.default({ builder, ticks: $ticks, thumbs: $thumbs }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, ticks: $ticks, thumbs: $thumbs }) : ``}</span>`}`;
});
const Slider_range = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $range, $$unsubscribe_range;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { range }, getAttrs } = getCtx();
  $$unsubscribe_range = subscribe(range, (value) => $range = value);
  const attrs = getAttrs("range");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $range;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_range();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
const Slider_thumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el", "thumb"]);
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  let { thumb } = $$props;
  const { getAttrs } = getCtx();
  createDispatcher();
  const attrs = getAttrs("thumb");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  if ($$props.thumb === void 0 && $$bindings.thumb && thumb !== void 0) $$bindings.thumb(thumb);
  builder = thumb;
  {
    Object.assign(builder, attrs);
  }
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></span>`}`;
});
const Card_footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex items-center p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Markdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { carta } = $$props;
  let { value } = $$props;
  let { theme = "default" } = $$props;
  let elem;
  let rendered = carta.renderSSR(value);
  if ($$props.carta === void 0 && $$bindings.carta && carta !== void 0) $$bindings.carta(carta);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  return `  <div class="${"carta-viewer carta-theme__" + escape(theme, true) + " markdown-body"}"${add_attribute("this", elem, 0)}> <!-- HTML_TAG_START -->${rendered}<!-- HTML_TAG_END --></div>`;
});
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = [0] } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Slider$1, "SliderPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn("relative flex w-full touch-none select-none items-center", className)
        },
        $$restProps,
        { value }
      ),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: ({ thumbs }) => {
          return `<span class="bg-primary/20 relative h-1.5 w-full grow overflow-hidden rounded-full">${validate_component(Slider_range, "SliderPrimitive.Range").$$render($$result, { class: "bg-primary absolute h-full" }, {}, {})}</span> ${each(thumbs, (thumb) => {
            return `${validate_component(Slider_thumb, "SliderPrimitive.Thumb").$$render(
              $$result,
              {
                thumb,
                class: "border-primary/50 bg-background focus-visible:ring-ring block h-4 w-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              },
              {},
              {}
            )}`;
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Slider_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options } = $$props;
  const minValue = Number(options[0]);
  const maxValue = Number(options[1]);
  let response;
  let startingValue = (maxValue - minValue) / 2;
  let slider_value = [startingValue];
  createEventDispatcher();
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (slider_value[0]) response = slider_value[0].toString();
        else response = startingValue.toString();
      }
    }
    $$rendered = `<div class="flex flex-col p-6 border border-muted rounded-lg"><h2 class="mx-auto text-6xl font-bold pb-4">${escape(response)}</h2> <div class="flex gap-2 justify-between content-center"><p class="text-lg">${escape(startingValue)}</p> ${validate_component(Slider, "Slider").$$render(
      $$result,
      {
        min: minValue,
        max: maxValue,
        step: 1,
        class: "max-w-full",
        value: slider_value
      },
      {
        value: ($$value) => {
          slider_value = $$value;
          $$settled = false;
        }
      },
      {}
    )} <p class="text-lg">${escape(maxValue)}</p></div> ${validate_component(Button, "Button").$$render($$result, { class: "my-2 w-min mx-auto" }, {}, {
      default: () => {
        return `Submit`;
      }
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Trivia = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options = ["Uniunea Sovietica", "Statele Unite ale Americii", "India", "Franta"] } = $$props;
  createEventDispatcher();
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  return `<div class="bg-card p-4 border border-muted rounded-lg"><div class="grid grid-flow-row grid-rows-2 grid-cols-2 gap-2 m-4"><button class="text-l font-semibold flex justify-center place-items-center h-16 bg-red-500/80 hover:bg-red-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[0])}</button> <button class="text-l font-semibold flex justify-center place-items-center h-16 bg-purple-500/80 hover:bg-purple-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[1])}</button> <button class="text-l font-semibold flex justify-center place-items-center h-16 bg-yellow-500/80 hover:bg-yellow-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[2])}</button> <button class="text-l font-semibold flex justify-center place-items-center h-16 bg-blue-500/80 hover:bg-blue-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[3])}</button></div></div>`;
});
const TruthFalse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options = ["Adevarat", "Fals"] } = $$props;
  createEventDispatcher();
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  return `<div class="bg-card p-4 border border-muted rounded-lg"><div class="grid grid-flow-col grid-rows-1 grid-cols-2 gap-2 m-4"><button class="text-l font-semibold flex justify-center place-items-center h-16 bg-green-500/80 hover:bg-green-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[0])}</button> <button class="text-l font-semibold flex justify-center place-items-center h-16 bg-red-500/80 hover:bg-red-600/80 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[1])}</button></div></div>`;
});
const css$2 = {
  code: ".plyr.svelte-1now27s{width:100%;height:auto}",
  map: `{"version":3,"file":"AudioPlayer.svelte","sources":["AudioPlayer.svelte"],"sourcesContent":["<!-- PlyrAudio.svelte -->\\r\\n<script lang=\\"ts\\">\\nimport { getTranslationFunctions as paraglide_sveltekit_translate_attribute_pass_getTranslationFunctions } from '@inlang/paraglide-sveltekit/internal';\\nimport { onMount, onDestroy } from \\"svelte\\";\\nexport let src = \\"https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/public_quiz_uploads/quiz_files/17983428/One%20SATISFYING%20Minute%20of%20Trees%20Falling!%20(Sound%20ON!!!).mp3\\";\\nexport let type = \\"audio/mp3\\";\\nlet player;\\nlet Plyr;\\nonMount(async () => {\\n  const module = await import(\\"plyr\\");\\n  Plyr = module.default;\\n  player = new Plyr(\\"#plyr-audio\\", {\\n    controls: [\\"play\\", \\"progress\\", \\"current-time\\", \\"mute\\", \\"volume\\"]\\n  });\\n});\\nonDestroy(() => {\\n  if (player) {\\n    player.destroy();\\n  }\\n});\\n\\nconst paraglide_sveltekit_translate_attribute_pass_translationFunctions = paraglide_sveltekit_translate_attribute_pass_getTranslationFunctions();\\nconst [ paraglide_sveltekit_translate_attribute_pass_translateAttribute, paraglide_sveltekit_translate_attribute_pass_handle_attributes ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <link rel=\\"stylesheet\\" href=\\"https://cdn.plyr.io/3.7.8/plyr.css\\" />\\r\\n</svelte:head>\\r\\n\\r\\n<!-- svelte-ignore a11y-media-has-caption -->\\r\\n<div class=\\"rounded-lg overflow-hidden\\">\\r\\n  <audio id=\\"plyr-audio\\" class=\\"plyr\\" playsinline>\\r\\n    <source {src} {type} />\\r\\n  </audio>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .plyr {\\r\\n    width: 100%;\\r\\n    height: auto;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAqCE,oBAAM,CACJ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV"}`
};
const AudioPlayer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src = "https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/public_quiz_uploads/quiz_files/17983428/One%20SATISFYING%20Minute%20of%20Trees%20Falling!%20(Sound%20ON!!!).mp3" } = $$props;
  let { type = "audio/mp3" } = $$props;
  onDestroy(() => {
  });
  getTranslationFunctions();
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  $$result.css.add(css$2);
  return `  ${$$result.head += `<!-- HEAD_svelte-1eb3yf2_START --><link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css"><!-- HEAD_svelte-1eb3yf2_END -->`, ""}  <div class="rounded-lg overflow-hidden"><audio id="plyr-audio" class="plyr svelte-1now27s" playsinline><source${add_attribute("src", src, 0)}${add_attribute("type", type, 0)}></audio> </div>`;
});
const css$1 = {
  code: ".plyr.svelte-1now27s{width:100%;height:auto}",
  map: '{"version":3,"file":"VideoPlayer.svelte","sources":["VideoPlayer.svelte"],"sourcesContent":["<!-- PlyrVideo.svelte -->\\r\\n<script lang=\\"ts\\">import { onMount, onDestroy } from \\"svelte\\";\\nexport let src = \\"https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/public_quiz_uploads/quiz_files/23783779/m2-res_4asDCA80p.mp4\\";\\nexport let type = \\"video/mp4\\";\\nlet player;\\nlet Plyr;\\nonMount(async () => {\\n  const module = await import(\\"plyr\\");\\n  Plyr = module.default;\\n  player = new Plyr(\\"#plyr-video\\", {\\n    controls: [\\n      \\"play\\",\\n      \\"progress\\",\\n      \\"current-time\\",\\n      \\"mute\\",\\n      \\"volume\\",\\n      \\"fullscreen\\"\\n    ]\\n  });\\n});\\nonDestroy(() => {\\n  if (player) {\\n    player.destroy();\\n  }\\n});\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <link rel=\\"stylesheet\\" href=\\"https://cdn.plyr.io/3.7.8/plyr.css\\" />\\r\\n</svelte:head>\\r\\n\\r\\n<!-- svelte-ignore a11y-media-has-caption -->\\r\\n\\r\\n<div class=\\"rounded-xl overflow-hidden\\">\\r\\n  <video id=\\"plyr-video\\" class=\\"plyr\\" playsinline>\\r\\n    <source {src} {type} />\\r\\n  </video>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .plyr {\\r\\n    width: 100%;\\r\\n    height: auto;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAwCE,oBAAM,CACJ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV"}'
};
const VideoPlayer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src = "https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/public_quiz_uploads/quiz_files/23783779/m2-res_4asDCA80p.mp4" } = $$props;
  let { type = "video/mp4" } = $$props;
  onDestroy(() => {
  });
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  $$result.css.add(css$1);
  return `  ${$$result.head += `<!-- HEAD_svelte-1eb3yf2_START --><link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css"><!-- HEAD_svelte-1eb3yf2_END -->`, ""}  <div class="rounded-xl overflow-hidden"><video id="plyr-video" class="plyr svelte-1now27s" playsinline><source${add_attribute("src", src, 0)}${add_attribute("type", type, 0)}></video> </div>`;
});
const css = {
  code: ".image-container.svelte-u41itk{position:relative;width:100%;max-width:100%}img.svelte-u41itk{width:100%;height:auto;display:block}",
  map: '{"version":3,"file":"ImageViewer.svelte","sources":["ImageViewer.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let src = \\"https://via.placeholder.com/800x600\\";\\nexport let alt = \\"Image\\";\\nexport let type;\\ntype = \\"\\";\\n<\/script>\\r\\n\\r\\n<div class=\\"image-container overflow-hidden rounded-lg\\">\\r\\n  <img {src} {alt} />\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .image-container {\\r\\n    position: relative;\\r\\n    width: 100%;\\r\\n    max-width: 100%;\\r\\n  }\\r\\n\\r\\n  img {\\r\\n    width: 100%;\\r\\n    height: auto;\\r\\n    display: block;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAWE,8BAAiB,CACf,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IACb,CAEA,iBAAI,CACF,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,KACX"}'
};
const ImageViewer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src = "https://via.placeholder.com/800x600" } = $$props;
  let { alt = "Image" } = $$props;
  let { type } = $$props;
  type = "";
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  $$result.css.add(css);
  return `<div class="image-container overflow-hidden rounded-lg svelte-u41itk"><img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} class="svelte-u41itk"> </div>`;
});
const QuestionRender = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { question } = $$props;
  const carta = new Carta();
  createEventDispatcher();
  let media_type = question.media_type;
  let description = question.description;
  let options = JSON.parse(question.response_options);
  const components = {
    slider: Slider_1,
    trivia: Trivia,
    truth_false: TruthFalse
  };
  const mediaComponents = {
    audio: AudioPlayer,
    video: VideoPlayer,
    image: ImageViewer
  };
  let url;
  let Src;
  let Alt;
  let selectedComponent = question.type;
  let selectedMedia = media_type;
  if (question.media_url_path) {
    url = `${PUBLIC_BUCKET_PATH}${question.media_url_path}`;
    Src = url;
    Alt = `image ${question.type} question`;
  }
  const CurrentComponent = components[selectedComponent] || null;
  const CurrentMediaComponent = mediaComponents[selectedMedia] || null;
  if ($$props.question === void 0 && $$bindings.question && question !== void 0) $$bindings.question(question);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="p-2 md:p-4 gap-2 flex flex-col"><h1 class="text-xl font-semibold bg-primary-foreground text-primary w-fit p-2 rounded-lg">${escape(question.title)}</h1> ${validate_component(MarkdownEditor, "MarkdownEditor").$$render(
      $$result,
      { carta, value: description },
      {
        value: ($$value) => {
          description = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Markdown, "Markdown").$$render($$result, { carta, value: description }, {}, {})} ${CurrentMediaComponent && question.media_url_path && media_type ? `${validate_component(CurrentMediaComponent || missing_component, "svelte:component").$$render($$result, { src: Src, alt: Alt, type: media_type }, {}, {})}` : ``} ${CurrentComponent ? `${validate_component(CurrentComponent || missing_component, "svelte:component").$$render($$result, { options }, {}, {})}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let question_array = [];
  let currentQuestionIndex = 0;
  let question;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  Number($page.url.pathname.split("/").filter(Boolean).pop());
  {
    console.log(question_array);
  }
  {
    {
      if (question_array.length > 0) {
        question = question_array[currentQuestionIndex];
      }
    }
  }
  $$unsubscribe_page();
  return `<div class="py-2">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "border-b" }, {}, {
        default: () => {
          return `<div class="flex flex-row gap-2 items-center">${validate_component(Card_title, "Card.Title").$$render($$result, { class: "bg-secondary p-2 rounded-lg" }, {}, {
            default: () => {
              return `Question ${escape(currentQuestionIndex + 1)}`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, { class: "text-muted-foreground/50" }, {}, {
            default: () => {
              return `Carefully read the description and answer the question.`;
            }
          })}</div>`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${question !== void 0 ? `${validate_component(QuestionRender, "QuestionRender").$$render($$result, { question }, {}, {})}` : `<p data-svelte-h="svelte-ypm6p2">Loading question...</p>`}`;
        }
      })} ${validate_component(Card_footer, "Card.Footer").$$render(
        $$result,
        {
          class: "border-t px-6 flex flex-row justify-between pt-6"
        },
        {},
        {
          default: () => {
            return `${validate_component(Button, "Button").$$render(
              $$result,
              {
                variant: "secondary",
                disabled: currentQuestionIndex === 0
              },
              {},
              {
                default: () => {
                  return `${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:chevron-left" }, {}, {})}
        Previous`;
                }
              }
            )} ${validate_component(Button, "Button").$$render(
              $$result,
              {
                variant: "secondary",
                disabled: currentQuestionIndex >= question_array.length - 1
              },
              {},
              {
                default: () => {
                  return `Next
        ${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:chevron-right" }, {}, {})}`;
                }
              }
            )}`;
          }
        }
      )}`;
    }
  })}</div>`;
});
export {
  Page as default
};
