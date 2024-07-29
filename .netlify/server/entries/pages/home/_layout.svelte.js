import { c as create_ssr_component, s as spread, b as escape_object, d as add_attribute, a as escape_attribute_value, v as validate_component, e as escape } from "../../../chunks/ssr.js";
import { g as getTranslationFunctions } from "../../../chunks/index3.js";
import { d as setContext, g as getContext, c as compute_rest_props, s as subscribe, n as noop } from "../../../chunks/lifecycle.js";
import "dequal";
import { o as omit, e as effect, m as makeElement, s as styleToString, i as isBrowser } from "../../../chunks/index2.js";
import { t as toWritableStores, o as overridable, r as removeUndefined, g as getOptionUpdater } from "../../../chunks/updater.js";
import { w as writable } from "../../../chunks/index4.js";
import { c as createBitAttrs, a as createDispatcher, d as disabledAttrs } from "../../../chunks/events.js";
import { c as cn, f as flyAndScale } from "../../../chunks/utils.js";
import { g as getSubmenuCtx, u as updateSubPositioning, a as getSubTrigger, R as Root, T as Trigger, D as Dropdown_menu_content, b as Dropdown_menu_label, c as Dropdown_menu_separator, G as Group, d as Dropdown_menu_item, S as Sub } from "../../../chunks/index7.js";
import { B as Button } from "../../../chunks/button.js";
const defaults = {
  src: "",
  delayMs: 0,
  onLoadingStatusChange: void 0
};
const createAvatar = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "loadingStatus", "onLoadingStatusChange"));
  const { src, delayMs } = options;
  const loadingStatusWritable = withDefaults.loadingStatus ?? writable("loading");
  const loadingStatus = overridable(loadingStatusWritable, withDefaults?.onLoadingStatusChange);
  effect([src, delayMs], ([$src, $delayMs]) => {
    if (isBrowser) {
      const image2 = new Image();
      image2.src = $src;
      image2.onload = () => {
        if (delayMs !== void 0) {
          const timerId = window.setTimeout(() => {
            loadingStatus.set("loaded");
          }, $delayMs);
          return () => window.clearTimeout(timerId);
        } else {
          loadingStatus.set("loaded");
        }
      };
      image2.onerror = () => {
        loadingStatus.set("error");
      };
    }
  });
  const image = makeElement("avatar-image", {
    stores: [src, loadingStatus],
    returned: ([$src, $loadingStatus]) => {
      const imageStyles = styleToString({
        display: $loadingStatus === "loaded" ? "block" : "none"
      });
      return {
        src: $src,
        style: imageStyles
      };
    }
  });
  const fallback = makeElement("avatar-fallback", {
    stores: [loadingStatus],
    returned: ([$loadingStatus]) => {
      return {
        style: $loadingStatus === "loaded" ? styleToString({
          display: "none"
        }) : void 0,
        hidden: $loadingStatus === "loaded" ? true : void 0
      };
    }
  });
  return {
    elements: {
      image,
      fallback
    },
    states: {
      loadingStatus
    },
    options
  };
};
function getAvatarData() {
  const NAME = "avatar";
  const PARTS = ["root", "image", "fallback"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getAvatarData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const avatar = { ...createAvatar(removeUndefined(props)), getAttrs };
  setContext(NAME, avatar);
  return {
    ...avatar,
    updateOption: getOptionUpdater(avatar.options)
  };
}
function getImage(src = "") {
  const { NAME } = getAvatarData();
  const avatar = getContext(NAME);
  if (!src) {
    avatar.options.src.set("");
  } else {
    avatar.options.src.set(src);
  }
  return avatar;
}
function getCtx() {
  const { NAME } = getAvatarData();
  return getContext(NAME);
}
const Avatar$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["delayMs", "loadingStatus", "onLoadingStatusChange", "asChild", "el"]);
  let { delayMs = void 0 } = $$props;
  let { loadingStatus = void 0 } = $$props;
  let { onLoadingStatusChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { states: { loadingStatus: localLoadingStatus }, updateOption, getAttrs } = setCtx({
    src: "",
    delayMs,
    onLoadingStatusChange: ({ next }) => {
      loadingStatus = next;
      onLoadingStatusChange?.(next);
      return next;
    }
  });
  const attrs = getAttrs("root");
  if ($$props.delayMs === void 0 && $$bindings.delayMs && delayMs !== void 0) $$bindings.delayMs(delayMs);
  if ($$props.loadingStatus === void 0 && $$bindings.loadingStatus && loadingStatus !== void 0) $$bindings.loadingStatus(loadingStatus);
  if ($$props.onLoadingStatusChange === void 0 && $$bindings.onLoadingStatusChange && onLoadingStatusChange !== void 0) $$bindings.onLoadingStatusChange(onLoadingStatusChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  loadingStatus !== void 0 && localLoadingStatus.set(loadingStatus);
  {
    updateOption("delayMs", delayMs);
  }
  return `${asChild ? `${slots.default ? slots.default({ attrs }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ attrs }) : ``}</div>`}`;
});
const Avatar_image$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let image;
  let builder;
  let $$restProps = compute_rest_props($$props, ["src", "alt", "asChild", "el"]);
  let $image, $$unsubscribe_image = noop, $$subscribe_image = () => ($$unsubscribe_image(), $$unsubscribe_image = subscribe(image, ($$value) => $image = $$value), image);
  let { src = void 0 } = $$props;
  let { alt = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const attrs = { "data-bits-avatar-image": "" };
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  $$subscribe_image(image = getImage(src).elements.image);
  builder = $image;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_image();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<img${spread(
    [
      escape_object(builder),
      { alt: escape_attribute_value(alt) },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("this", el, 0)}>`}`;
});
const Avatar_fallback$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $fallback, $$unsubscribe_fallback;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { fallback }, getAttrs } = getCtx();
  $$unsubscribe_fallback = subscribe(fallback, (value) => $fallback = value);
  const attrs = getAttrs("fallback");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $fallback;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_fallback();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<span${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</span>`}`;
});
const Menu_sub_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el"
  ]);
  let $subMenu, $$unsubscribe_subMenu;
  let $subOpen, $$unsubscribe_subOpen;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "right" } = $$props;
  let { align = "start" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = false } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { subMenu }, states: { subOpen }, ids, getAttrs } = getSubmenuCtx();
  $$unsubscribe_subMenu = subscribe(subMenu, (value) => $subMenu = value);
  $$unsubscribe_subOpen = subscribe(subOpen, (value) => $subOpen = value);
  createDispatcher();
  const attrs = getAttrs("sub-content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.side === void 0 && $$bindings.side && side !== void 0) $$bindings.side(side);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0) $$bindings.align(align);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.alignOffset === void 0 && $$bindings.alignOffset && alignOffset !== void 0) $$bindings.alignOffset(alignOffset);
  if ($$props.collisionPadding === void 0 && $$bindings.collisionPadding && collisionPadding !== void 0) $$bindings.collisionPadding(collisionPadding);
  if ($$props.avoidCollisions === void 0 && $$bindings.avoidCollisions && avoidCollisions !== void 0) $$bindings.avoidCollisions(avoidCollisions);
  if ($$props.collisionBoundary === void 0 && $$bindings.collisionBoundary && collisionBoundary !== void 0) $$bindings.collisionBoundary(collisionBoundary);
  if ($$props.sameWidth === void 0 && $$bindings.sameWidth && sameWidth !== void 0) $$bindings.sameWidth(sameWidth);
  if ($$props.fitViewport === void 0 && $$bindings.fitViewport && fitViewport !== void 0) $$bindings.fitViewport(fitViewport);
  if ($$props.strategy === void 0 && $$bindings.strategy && strategy !== void 0) $$bindings.strategy(strategy);
  if ($$props.overlap === void 0 && $$bindings.overlap && overlap !== void 0) $$bindings.overlap(overlap);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.menu.set(id);
    }
  }
  builder = $subMenu;
  {
    Object.assign(builder, attrs);
  }
  {
    updateSubPositioning({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
  $$unsubscribe_subMenu();
  $$unsubscribe_subOpen();
  return `${asChild && $subOpen ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$subOpen ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Menu_sub_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let attrs;
  let $$restProps = compute_rest_props($$props, ["disabled", "asChild", "id", "el"]);
  let $disabledStore, $$unsubscribe_disabledStore;
  let $subTrigger, $$unsubscribe_subTrigger;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { subTrigger }, ids, getAttrs, options } = getSubTrigger();
  $$unsubscribe_subTrigger = subscribe(subTrigger, (value) => $subTrigger = value);
  const { disabled: disabledStore } = options;
  $$unsubscribe_disabledStore = subscribe(disabledStore, (value) => $disabledStore = value);
  createDispatcher();
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder = $subTrigger;
  attrs = {
    ...getAttrs("sub-trigger"),
    ...disabledAttrs(disabled || $disabledStore)
  };
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_disabledStore();
  $$unsubscribe_subTrigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Avatar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "delayMs"]);
  let { class: className = void 0 } = $$props;
  let { delayMs = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.delayMs === void 0 && $$bindings.delayMs && delayMs !== void 0) $$bindings.delayMs(delayMs);
  return `${validate_component(Avatar$1, "AvatarPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      { delayMs },
      {
        class: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Avatar_image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "src", "alt"]);
  let { class: className = void 0 } = $$props;
  let { src = void 0 } = $$props;
  let { alt = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0) $$bindings.alt(alt);
  return `${validate_component(Avatar_image$1, "AvatarPrimitive.Image").$$render(
    $$result,
    Object.assign(
      {},
      { src },
      { alt },
      {
        class: cn("aspect-square h-full w-full", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Avatar_fallback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Avatar_fallback$1, "AvatarPrimitive.Fallback").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Dropdown_menu_shortcut = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<span${spread(
    [
      {
        class: escape_attribute_value(cn("ml-auto text-xs tracking-widest opacity-60", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</span>`;
});
const Dropdown_menu_sub_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = { x: -10, y: 0 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0) $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0) $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Menu_sub_content, "DropdownMenuPrimitive.SubContent").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      {
        class: cn("bg-popover text-popover-foreground z-50 min-w-[8rem] rounded-md border p-1 shadow-lg focus:outline-none", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const ChevronRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "chevron right," } = $$props;
  let { withEvents = false } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0) $$bindings.role(role);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.withEvents === void 0 && $$bindings.withEvents && withEvents !== void 0) $$bindings.withEvents(withEvents);
  return `${withEvents ? `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object($$restProps),
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 15 15" },
      { fill: escape_attribute_value(color) },
      { xmlns: "http://www.w3.org/2000/svg" }
    ],
    {}
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor"></path></svg>` : `<svg${spread(
    [
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object($$restProps),
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 15 15" },
      { fill: escape_attribute_value(color) },
      { xmlns: "http://www.w3.org/2000/svg" }
    ],
    {}
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="currentColor"></path></svg>`} `;
});
const Dropdown_menu_sub_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "inset"]);
  let { class: className = void 0 } = $$props;
  let { inset = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.inset === void 0 && $$bindings.inset && inset !== void 0) $$bindings.inset(inset);
  return `${validate_component(Menu_sub_trigger, "DropdownMenuPrimitive.SubTrigger").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("data-[highlighted]:bg-accent data-[state=open]:bg-accent data-[highlighted]:text-accent-foreground data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none", inset && "pl-8", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``} ${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "ml-auto h-4 w-4" }, {}, {})}`;
      }
    }
  )}`;
});
async function getFieldnameByUserIdInTable(userId, field, table, supabase) {
  let { data: user_data, error } = await supabase.from(table).select(field).eq("user_id", userId);
  if (error) {
    console.error("Error:", error);
    return null;
  }
  if (user_data === null || user_data === void 0 || user_data.length === 0) {
    console.log("No data was found with the specified user ID.");
    return null;
  }
  return user_data[0]?.[field];
}
async function getProfilePictureByUserId(userId, supabase) {
  const profilePictureName = await getFieldnameByUserIdInTable(
    userId,
    "profile_picture",
    "user_data",
    supabase
  );
  if (!profilePictureName)
    return "https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/profile_pictures/user.png";
  const profilePictureUrl = `https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/profile_pictures/${profilePictureName}`;
  return profilePictureUrl;
}
function getUsernameByUserId(userId, supabase) {
  return getFieldnameByUserIdInTable(userId, "username", "user_data", supabase);
}
function getNameById(id, supabase) {
  return getFieldnameByUserIdInTable(id, "name", "user_data", supabase);
}
function getFirstCharacters(str) {
  if (str && typeof str === "string") {
    const words = str.trim().split(/\s+/);
    return words.map((word) => word.charAt(0).toUpperCase()).join(" ");
  }
  return "";
}
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let user_username, user_name, user_name_avatar_fallback;
  let profile_picture;
  const { supabase, user } = data;
  const specificUserId = user?.id;
  getUsernameByUserId(specificUserId, supabase).then((username) => {
    if (username) {
      user_username = username;
    }
  });
  getProfilePictureByUserId(specificUserId, supabase).then((profilePictureUrl) => {
    if (profilePictureUrl) {
      profile_picture = profilePictureUrl;
    }
  });
  getNameById(specificUserId, supabase).then((name) => {
    if (name) {
      user_name = name;
    }
  });
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  user_name_avatar_fallback = getFirstCharacters(user_name);
  return `<nav class="bg-muted/40 backdrop-blur-lg w-full fixed z-40"><div class="flex gap-4 top-0 h-14 items-center text-slate-200 px-4 justify-between max-w-[100rem] mx-auto"><a class="hover:underline font-semibold decoration-wavy"${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/home`, void 0), 0)}>StarQA</a> <div class="flex flex-row gap-2">${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "ghost",
      class: "hidden sm:block",
      href: "/home"
    },
    {},
    {
      default: () => {
        return `Explore`;
      }
    }
  )} ${validate_component(Button, "Button").$$render($$result, { variant: "ghost", href: "/home/create" }, {}, {
    default: () => {
      return `Create a quiz`;
    }
  })} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      variant: "ghost",
      href: "/home/my-quizzes"
    },
    {},
    {
      default: () => {
        return `My quizzes`;
      }
    }
  )}</div> ${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
        default: ({ builder }) => {
          return `${validate_component(Button, "Button").$$render(
            $$result,
            {
              builders: [builder],
              variant: "ghost",
              class: "h-6 w-6"
            },
            {},
            {
              default: () => {
                return `${validate_component(Avatar, "Avatar.Root").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Avatar_image, "Avatar.Image").$$render(
                      $$result,
                      {
                        src: profile_picture,
                        alt: `@${user_username}`
                      },
                      {},
                      {}
                    )} ${validate_component(Avatar_fallback, "Avatar.Fallback").$$render($$result, {}, {}, {
                      default: () => {
                        return `${escape(user_name_avatar_fallback)}`;
                      }
                    })}`;
                  }
                })}`;
              }
            }
          )}`;
        }
      })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, { class: "w-56" }, {}, {
        default: () => {
          return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(user?.email)}`;
            }
          })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Group, "DropdownMenu.Group").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, { href: "/home" }, {}, {
                default: () => {
                  return `Home
            ${validate_component(Dropdown_menu_shortcut, "DropdownMenu.Shortcut").$$render($$result, {}, {}, {
                    default: () => {
                      return `⇧H`;
                    }
                  })}`;
                }
              })}`;
            }
          })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Group, "DropdownMenu.Group").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, { href: "/home/profile" }, {}, {
                default: () => {
                  return `Profile`;
                }
              })} ${validate_component(Sub, "DropdownMenu.Sub").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Dropdown_menu_sub_trigger, "DropdownMenu.SubTrigger").$$render($$result, {}, {}, {
                    default: () => {
                      return `Invite users`;
                    }
                  })} ${validate_component(Dropdown_menu_sub_content, "DropdownMenu.SubContent").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render(
                        $$result,
                        {
                          href: "mailto:?subject=Join%20Me%20on%20StarQA&body=Hey!%20I'm%20on%20StarQA%20and%20I%20think%20you%20should%20try%20it%20too.%20Come%20join%20me%20at:%20starqa.org/auth/register\r\n"
                        },
                        {},
                        {
                          default: () => {
                            return `Email`;
                          }
                        }
                      )} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render(
                        $$result,
                        {
                          target: "_blank",
                          href: "https://wa.me/?text=Hey!%20I'm%20on%20StarQA%20and%20I%20think%20you%20should%20try%20it%20too.%20Come%20join%20me%20at:%20starqa.org/auth/register\r\n"
                        },
                        {},
                        {
                          default: () => {
                            return `Whatsapp`;
                          }
                        }
                      )} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})}`;
                    }
                  })}`;
                }
              })}`;
            }
          })} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render(
            $$result,
            {
              href: "https://github.com/IoanCroitor/StarQA"
            },
            {},
            {
              default: () => {
                return `GitHub`;
              }
            }
          )} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render(
            $$result,
            {
              href: "https://github.com/IoanCroitor/StarQA/issues"
            },
            {},
            {
              default: () => {
                return `Support`;
              }
            }
          )} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render(
            $$result,
            {
              href: "https://github.com/IoanCroitor/StarQA"
            },
            {},
            {
              default: () => {
                return `Documentation`;
              }
            }
          )} ${validate_component(Dropdown_menu_separator, "DropdownMenu.Separator").$$render($$result, {}, {}, {})} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, { href: "/logout" }, {}, {
            default: () => {
              return `Log out
          ${validate_component(Dropdown_menu_shortcut, "DropdownMenu.Shortcut").$$render($$result, {}, {}, {
                default: () => {
                  return `⇧Q`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}</div></nav> <div class="h-14 w-full"></div> <div class="max-w-6xl mx-auto px-4">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
