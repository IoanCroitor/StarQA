import { j as setContext, k as hasContext, g as getContext, d as compute_rest_props, o as onDestroy, s as subscribe } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, a as escape_attribute_value, b as escape_object, v as validate_component, e as escape, d as add_attribute, g as add_styles, f as each } from "../../../../chunks/ssr.js";
import { C as Card, a as Card_content } from "../../../../chunks/card-content.js";
import "clsx";
import { w as writable } from "../../../../chunks/index3.js";
import { c as cn } from "../../../../chunks/index2.js";
import { B as Button } from "../../../../chunks/button.js";
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContext(config) {
  setContext(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name} must be used within a <Carousel.Root> component`);
  }
  return getContext(EMBLA_CAROUSEL_CONTEXT);
}
const Carousel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["opts", "plugins", "api", "orientation", "class"]);
  let { opts = {} } = $$props;
  let { plugins = [] } = $$props;
  let { api = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { class: className = void 0 } = $$props;
  const apiStore = writable(void 0);
  const orientationStore = writable(orientation);
  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const optionsStore = writable(opts);
  const pluginStore = writable(plugins);
  const scrollSnapsStore = writable([]);
  const selectedIndexStore = writable(0);
  function scrollPrev() {
    api?.scrollPrev();
  }
  function scrollNext() {
    api?.scrollNext();
  }
  function scrollTo(index, jump) {
    api?.scrollTo(index, jump);
  }
  function onSelect(api2) {
    if (!api2) return;
    canScrollPrev.set(api2.canScrollPrev());
    canScrollNext.set(api2.canScrollNext());
  }
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  }
  setEmblaContext({
    api: apiStore,
    scrollPrev,
    scrollNext,
    orientation: orientationStore,
    canScrollNext,
    canScrollPrev,
    handleKeyDown,
    options: optionsStore,
    plugins: pluginStore,
    onInit,
    scrollSnaps: scrollSnapsStore,
    selectedIndex: selectedIndexStore,
    scrollTo
  });
  function onInit(event) {
    api = event.detail;
    apiStore.set(api);
    scrollSnapsStore.set(api.scrollSnapList());
  }
  onDestroy(() => {
    api?.off("select", onSelect);
  });
  if ($$props.opts === void 0 && $$bindings.opts && opts !== void 0) $$bindings.opts(opts);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0) $$bindings.plugins(plugins);
  if ($$props.api === void 0 && $$bindings.api && api !== void 0) $$bindings.api(api);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  {
    orientationStore.set(orientation);
  }
  {
    pluginStore.set(plugins);
  }
  {
    optionsStore.set(opts);
  }
  {
    if (api) {
      onSelect(api);
      api.on("select", onSelect);
      api.on("reInit", onSelect);
    }
  }
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("relative", className))
      },
      { role: "region" },
      { "aria-roledescription": "carousel" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Carousel_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $$unsubscribe_options;
  let $orientation, $$unsubscribe_orientation;
  let $$unsubscribe_plugins;
  let { class: className = void 0 } = $$props;
  const { orientation, options, plugins, onInit } = getEmblaContext("<Carousel.Content/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_options = subscribe(options, (value) => value);
  $$unsubscribe_plugins = subscribe(plugins, (value) => value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$unsubscribe_options();
  $$unsubscribe_orientation();
  $$unsubscribe_plugins();
  return `<div class="overflow-hidden"><div${spread(
    [
      {
        class: escape_attribute_value(cn(
          "flex",
          $orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ))
      },
      { "data-embla-container": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Carousel_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let $orientation, $$unsubscribe_orientation;
  let { class: className = void 0 } = $$props;
  const { orientation } = getEmblaContext("<Carousel.Item/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  $$unsubscribe_orientation();
  return `<div${spread(
    [
      { role: "group" },
      { "aria-roledescription": "slide" },
      {
        class: escape_attribute_value(cn("min-w-0 shrink-0 grow-0 basis-full", $orientation === "horizontal" ? "pl-4" : "pt-4", className))
      },
      { "data-embla-slide": "" },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const ArrowLeft = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "arrow left," } = $$props;
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor"></path></svg>` : `<svg${spread(
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor"></path></svg>`} `;
});
const Carousel_previous = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size"]);
  let $orientation, $$unsubscribe_orientation;
  let $canScrollPrev, $$unsubscribe_canScrollPrev;
  let { class: className = void 0 } = $$props;
  let { variant = "outline" } = $$props;
  let { size = "icon" } = $$props;
  const { orientation, canScrollPrev, scrollPrev, handleKeyDown } = getEmblaContext("<Carousel.Previous/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_canScrollPrev = subscribe(canScrollPrev, (value) => $canScrollPrev = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  $$unsubscribe_orientation();
  $$unsubscribe_canScrollPrev();
  return `${validate_component(Button, "Button").$$render(
    $$result,
    Object.assign(
      {},
      { variant },
      { size },
      {
        class: cn(
          "absolute h-8 w-8 touch-manipulation rounded-full",
          $orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )
      },
      { disabled: !$canScrollPrev },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${validate_component(ArrowLeft, "ArrowLeft").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-1tx67gn">Previous slide</span>`;
      }
    }
  )}`;
});
const ArrowRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "arrow right," } = $$props;
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path></svg>` : `<svg${spread(
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor"></path></svg>`} `;
});
const Carousel_next = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size"]);
  let $orientation, $$unsubscribe_orientation;
  let $canScrollNext, $$unsubscribe_canScrollNext;
  let { class: className = void 0 } = $$props;
  let { variant = "outline" } = $$props;
  let { size = "icon" } = $$props;
  const { orientation, canScrollNext, scrollNext, handleKeyDown } = getEmblaContext("<Carousel.Next/>");
  $$unsubscribe_orientation = subscribe(orientation, (value) => $orientation = value);
  $$unsubscribe_canScrollNext = subscribe(canScrollNext, (value) => $canScrollNext = value);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  $$unsubscribe_orientation();
  $$unsubscribe_canScrollNext();
  return `${validate_component(Button, "Button").$$render(
    $$result,
    Object.assign(
      {},
      { variant },
      { size },
      {
        class: cn(
          "absolute h-8 w-8 touch-manipulation rounded-full",
          $orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )
      },
      { disabled: !$canScrollNext },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${validate_component(ArrowRight, "ArrowRight").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="sr-only" data-svelte-h="svelte-vmesmf">Next slide</span>`;
      }
    }
  )}`;
});
const score = writable(0);
const Trivia = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options = ["Uniunea Sovietica", "Statele Unite ale Americii", "India", "Franta"] } = $$props;
  let { answer = 1 } = $$props;
  let { intrebare = "Primul animal pe orbita, cainele Laika a fost o misune legata de:" } = $$props;
  let { detalii = "Pe 3 Noiembrie 1957 in cadrul misiunii Sputnik 2 catelul Laika din Uniunea Sovietica a devenit primul animal lansat in spatiu si prima fiinta decedata inafara pamantului. Sputnik 2 nu a fost proiectata pentru intoarcere asfel destinul Laikai a fost decesul. Misiunea a pregatit terenul pentru urmatoarele msisuni spatiale cu subiecti umani. " } = $$props;
  let { source = "/assets/laika.jpg" } = $$props;
  if ($$props.options === void 0 && $$bindings.options && options !== void 0) $$bindings.options(options);
  if ($$props.answer === void 0 && $$bindings.answer && answer !== void 0) $$bindings.answer(answer);
  if ($$props.intrebare === void 0 && $$bindings.intrebare && intrebare !== void 0) $$bindings.intrebare(intrebare);
  if ($$props.detalii === void 0 && $$bindings.detalii && detalii !== void 0) $$bindings.detalii(detalii);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0) $$bindings.source(source);
  return `<div class="bg-card pt-7 pb-2 rounded-xl p-4">${`<h2 class="text-xl ml-4 font-semibold text-slate-200" data-svelte-h="svelte-tjmohz">Alege varianta corecta:</h2> <p class="ml-4 text-slate-100">${escape(intrebare)}</p> <div class="grid grid-flow-row grid-rows-2 grid-cols-2 gap-2 m-4"><button class="text-l font-semibold flex justify-center place-items-center h-16 bg-red-400 hover:bg-red-500 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[0])}</button> <button class="text-l font-semibold flex justify-center place-items-center h-16 bg-purple-400 hover:bg-purple-500 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[1])}</button> <button class="text-l font-semibold flex justify-center place-items-center h-16 bg-yellow-400 hover:bg-yellow-500 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[2])}</button> <button class="text-l font-semibold flex justify-center place-items-center h-16 bg-blue-400 hover:bg-blue-500 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[3])}</button></div>`}</div>`;
});
const css = {
  code: "article.svelte-b4jlk5.svelte-b4jlk5.svelte-b4jlk5{padding:1rem;box-shadow:0 2px 5px hsla(0, 0%, 50%, 0.1),\r\n      0 0 5px hsla(0, 0%, 0%, 0.2)}h2.svelte-b4jlk5.svelte-b4jlk5.svelte-b4jlk5{font-size:1.2rem}article.svelte-b4jlk5>.svelte-b4jlk5+.svelte-b4jlk5{margin-top:0.75em}p.svelte-b4jlk5.svelte-b4jlk5.svelte-b4jlk5{line-height:1.7}svg.svelte-b4jlk5.svelte-b4jlk5.svelte-b4jlk5{display:block}svg.svelte-b4jlk5.svelte-b4jlk5.svelte-b4jlk5,svg.svelte-b4jlk5+.svelte-b4jlk5.svelte-b4jlk5{margin-top:1.5em}button.svelte-b4jlk5.svelte-b4jlk5.svelte-b4jlk5{display:block;background:hsl(205, 79%, 36%);font-weight:700;border:none;padding:0.75rem 0.95rem;color:hsl(0, 0%, 100%)}.focus.svelte-b4jlk5.svelte-b4jlk5.svelte-b4jlk5{transition:transform 0.25s cubic-bezier(0.45, 0, 0.55, 1)}.focusable.svelte-b4jlk5:focus .focus.svelte-b4jlk5.svelte-b4jlk5{transform:scale(1)}.focusable.svelte-b4jlk5:focus:not(:focus-visible) .focus.svelte-b4jlk5.svelte-b4jlk5{transform:scale(0)}",
  map: `{"version":3,"file":"Quiz.svelte","sources":["Quiz.svelte"],"sourcesContent":["<script>\\r\\n  // @ts-nocheck\\r\\n\\r\\n  import { onMount } from 'svelte'\\r\\n  import { fade, scale } from 'svelte/transition'\\r\\n\\r\\n  import { incrementscore, score } from './scorestore'\\r\\n  export let title = 'Timpul conteaza'\\r\\n  export let question = 'Pe ce data a fost lansat Yuzu (2013)'\\r\\n  export let answer = 2013\\r\\n  export let details =\\r\\n    \\"Yutu was a robotic lunar rover that formed part of the Chinese Chang'e 3 mission to the Moon. It was launched at 17:30 UTC on 1 December 2013\\"\\r\\n\\r\\n  export let min = 2000\\r\\n  export let max = 2022\\r\\n  export let value = 2010\\r\\n  export let precision = 0\\r\\n\\r\\n  const x0 = (1 / (max - min)) * (answer - min) * 300\\r\\n  let x1 = (1 / (max - min)) * (value - min) * 300\\r\\n\\r\\n  let hasStarted = false\\r\\n  let isRevealed = false\\r\\n\\r\\n  let svg\\r\\n  let g\\r\\n  let sl, l, w\\r\\n\\r\\n  onMount(() => {\\r\\n    handleSize()\\r\\n  })\\r\\n\\r\\n  const handleSize = () => {\\r\\n    if (isRevealed === true) return\\r\\n\\r\\n    const { left: sleft } = svg.getBoundingClientRect()\\r\\n    const { left, width } = g.getBoundingClientRect()\\r\\n    sl = sleft\\r\\n    l = left\\r\\n    w = width\\r\\n  }\\r\\n\\r\\n  const handleStart = (e) => {\\r\\n    hasStarted = true\\r\\n    handleIng(e)\\r\\n  }\\r\\n  const handleEnd = () => (hasStarted = false)\\r\\n  const handleIng = ({ offsetX }) => {\\r\\n    if (hasStarted === false) return\\r\\n\\r\\n    const p = (offsetX - (l - sl)) / w\\r\\n    x1 = p * 300\\r\\n    value = min === 0 ? max * p : min + (max - min) * p\\r\\n  }\\r\\n\\r\\n  const handleKeydown = (e) => {\\r\\n    const { code } = e\\r\\n    if (code === 'ArrowLeft' || code === 'ArrowRight') {\\r\\n      e.preventDefault()\\r\\n\\r\\n      const increment = precision === 0 ? 1 : 1 / 10 ** precision\\r\\n      if (code === 'ArrowLeft') value = Math.max(min, value - increment)\\r\\n      if (code === 'ArrowRight') value = Math.min(max, value + increment)\\r\\n\\r\\n      x1 = (1 / (max - min)) * (value - min) * 300\\r\\n    }\\r\\n  }\\r\\n\\r\\n  const durations = {\\r\\n    out: 500,\\r\\n    in: 400,\\r\\n  }\\r\\n\\r\\n  const delays = {\\r\\n    out: 0,\\r\\n    inGuess: 500,\\r\\n    inAnswer: 2000,\\r\\n    details: 2700,\\r\\n  }\\r\\n\\r\\n  function handleScore() {\\r\\n    if (value.toFixed(precision).toString() === answer.toString()) {\\r\\n      incrementscore()\\r\\n      console.log(\\r\\n        value.toFixed(precision).toString() === answer.toString()\\r\\n          ? 'a functionat incrementarea scorului'\\r\\n          : 'OOPS',\\r\\n      )\\r\\n    }\\r\\n  }\\r\\n<\/script>\\r\\n\\r\\n<article class=\\"bg-card pt-7 pb-2 rounded-xl h-full w-full\\">\\r\\n  {#if title}\\r\\n    <h2 class=\\"text-xl font-semibold text-slate-200\\">\\r\\n      {title}\\r\\n    </h2>\\r\\n  {/if}\\r\\n\\r\\n  <p class=\\" text-slate-100\\">\\r\\n    {question}\\r\\n  </p>\\r\\n\\r\\n  <svg bind:this={svg} viewBox=\\"-24 -50 348 100\\">\\r\\n    <g>\\r\\n      <rect y=\\"-3.5\\" width=\\"300\\" height=\\"7\\" rx=\\"3.5\\" fill=\\"hsl(0, 0%, 85%)\\" />\\r\\n\\r\\n      {#if isRevealed}\\r\\n        <g transform=\\"translate({x0} 0)\\">\\r\\n          <g style:color=\\"hsl(185, 62%, 45%)\\">\\r\\n            <g fill=\\"currentColor\\">\\r\\n              <g\\r\\n                in:scale={{\\r\\n                  duration: durations.in,\\r\\n                  delay: delays.inAnswer,\\r\\n                }}\\r\\n              >\\r\\n                <circle r=\\"6\\" />\\r\\n              </g>\\r\\n            </g>\\r\\n            <g fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\">\\r\\n              <g\\r\\n                in:scale={{\\r\\n                  duration: durations.in,\\r\\n                  delay: delays.inAnswer + 100,\\r\\n                }}\\r\\n              >\\r\\n                <circle r=\\"9\\" />\\r\\n              </g>\\r\\n            </g>\\r\\n\\r\\n            <g\\r\\n              in:fade={{\\r\\n                duration: durations.in,\\r\\n                delay: delays.inAnswer + durations.in,\\r\\n              }}\\r\\n            >\\r\\n              <g>\\r\\n                <g fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\">\\r\\n                  <path d=\\"M 0 9 v 11\\" />\\r\\n                </g>\\r\\n                <g fill=\\"currentColor\\">\\r\\n                  <g\\r\\n                    transform=\\"translate(0 34)\\"\\r\\n                    font-size=\\"12\\"\\r\\n                    text-anchor={x0 > 150 ? 'end' : 'start'}\\r\\n                  >\\r\\n                    <text class=\\" text-slate-200\\"> Raspunsul corect </text>\\r\\n                    <text\\r\\n                      class=\\"text-slate-200\\"\\r\\n                      y=\\"12\\"\\r\\n                      font-size=\\"10\\"\\r\\n                      font-weight=\\"700\\"\\r\\n                    >\\r\\n                      {answer}\\r\\n                    </text>\\r\\n                  </g>\\r\\n                </g>\\r\\n              </g>\\r\\n            </g>\\r\\n          </g>\\r\\n        </g>\\r\\n\\r\\n        <g transform=\\"translate({x1} 0)\\">\\r\\n          <g style:color=\\"hsl(205, 87%, 29%)\\">\\r\\n            <g fill=\\"currentColor\\">\\r\\n              <g\\r\\n                in:scale={{\\r\\n                  duration: durations.in,\\r\\n                  delay: delays.inGuess,\\r\\n                }}\\r\\n              >\\r\\n                <circle r=\\"6\\" />\\r\\n              </g>\\r\\n            </g>\\r\\n            <g fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\">\\r\\n              <g\\r\\n                in:scale={{\\r\\n                  duration: durations.in,\\r\\n                  delay: delays.inGuess + 100,\\r\\n                }}\\r\\n              >\\r\\n                <circle r=\\"9\\" />\\r\\n              </g>\\r\\n            </g>\\r\\n            <g\\r\\n              in:fade={{\\r\\n                duration: durations.in,\\r\\n                delay: delays.inGuess + durations.in,\\r\\n              }}\\r\\n            >\\r\\n              <g fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\">\\r\\n                <path d=\\"M 0 -9 v -11\\" />\\r\\n              </g>\\r\\n              <g fill=\\"currentColor\\">\\r\\n                <g\\r\\n                  transform=\\"translate(0 -38)\\"\\r\\n                  font-size=\\"12\\"\\r\\n                  text-anchor={x1 > 150 ? 'end' : 'start'}\\r\\n                >\\r\\n                  <text class=\\"text-blue-200\\"> Tu ai raspuns... </text>\\r\\n                  <text\\r\\n                    class=\\"text-blue-200\\"\\r\\n                    y=\\"12\\"\\r\\n                    font-size=\\"10\\"\\r\\n                    font-weight=\\"700\\">{value.toFixed(precision)}</text\\r\\n                  >\\r\\n                </g>\\r\\n              </g>\\r\\n            </g>\\r\\n          </g>\\r\\n        </g>\\r\\n        <!-- svelte-ignore a11y-no-static-element-interactions -->\\r\\n      {:else}\\r\\n        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->\\r\\n        <!-- svelte-ignore a11y-no-static-element-interactions -->\\r\\n        <g\\r\\n          style:cursor=\\"pointer\\"\\r\\n          on:mousedown={handleStart}\\r\\n          on:mouseup={handleEnd}\\r\\n          on:mouseleave={handleEnd}\\r\\n          on:mousemove={handleIng}\\r\\n          style:outline=\\"none\\"\\r\\n          tabindex=\\"0\\"\\r\\n          aria-label=\\"Schimba valoarea cu tastele de stanga si dreapta.\\"\\r\\n          class=\\"focusable\\"\\r\\n          on:keydown={handleKeydown}\\r\\n        >\\r\\n          <g style:pointer-events=\\"none\\">\\r\\n            <g transform=\\"translate({x1} 0)\\">\\r\\n              <g style:color=\\"hsl(205, 87%, 29%)\\">\\r\\n                <g out:scale={{ duration: durations.out }}>\\r\\n                  <g transform=\\"translate(0 -28)\\">\\r\\n                    <g\\r\\n                      fill=\\"currentColor\\"\\r\\n                      font-size=\\"11\\"\\r\\n                      font-weight=\\"700\\"\\r\\n                      text-anchor=\\"middle\\"\\r\\n                    >\\r\\n                      <text>{value.toFixed(precision)}</text>\\r\\n                    </g>\\r\\n                  </g>\\r\\n\\r\\n                  <g transform=\\"scale(0)\\" class=\\"focus\\">\\r\\n                    <circle\\r\\n                      r=\\"23.5\\"\\r\\n                      fill=\\"none\\"\\r\\n                      stroke=\\"currentColor\\"\\r\\n                      stroke-width=\\"1\\"\\r\\n                    />\\r\\n                  </g>\\r\\n\\r\\n                  <circle\\r\\n                    r=\\"18.5\\"\\r\\n                    fill=\\"hsl(0, 0%, 100%)\\"\\r\\n                    stroke=\\"currentColor\\"\\r\\n                    stroke-width=\\"3\\"\\r\\n                  />\\r\\n                  <g fill=\\"currentColor\\">\\r\\n                    <path d=\\"M 2 -5 l 5 5 -5 5z\\" />\\r\\n                    <path transform=\\"scale(-1 1)\\" d=\\"M 2 -5 l 5 5 -5 5z\\" />\\r\\n                  </g>\\r\\n                </g>\\r\\n              </g>\\r\\n            </g>\\r\\n          </g>\\r\\n          <g bind:this={g}>\\r\\n            <rect opacity=\\"0\\" y=\\"-50\\" width=\\"300\\" height=\\"100\\" />\\r\\n          </g>\\r\\n        </g>\\r\\n      {/if}\\r\\n    </g>\\r\\n  </svg>\\r\\n\\r\\n  {#if isRevealed}\\r\\n    <p class=\\"text-slate-200\\" in:fade={{ delay: delays.details }}>\\r\\n      {details}\\r\\n    </p>\\r\\n  {:else}\\r\\n    <button\\r\\n      class=\\"text-slate-200 rounded-xl\\"\\r\\n      on:click|once={() => {\\r\\n        isRevealed = true\\r\\n        handleScore()\\r\\n      }}\\r\\n    >\\r\\n      Arata raspunsul!\\r\\n    </button>\\r\\n  {/if}\\r\\n</article>\\r\\n\\r\\n<style>\\r\\n  article {\\r\\n    padding: 1rem;\\r\\n    box-shadow:\\r\\n      0 2px 5px hsla(0, 0%, 50%, 0.1),\\r\\n      0 0 5px hsla(0, 0%, 0%, 0.2);\\r\\n  }\\r\\n\\r\\n  h2 {\\r\\n    font-size: 1.2rem;\\r\\n  }\\r\\n\\r\\n  article > * + * {\\r\\n    margin-top: 0.75em;\\r\\n  }\\r\\n\\r\\n  p {\\r\\n    line-height: 1.7;\\r\\n  }\\r\\n\\r\\n  svg {\\r\\n    display: block;\\r\\n  }\\r\\n\\r\\n  svg,\\r\\n  svg + * {\\r\\n    margin-top: 1.5em;\\r\\n  }\\r\\n\\r\\n  button {\\r\\n    display: block;\\r\\n    background: hsl(205, 79%, 36%);\\r\\n    font-weight: 700;\\r\\n    border: none;\\r\\n    padding: 0.75rem 0.95rem;\\r\\n    color: hsl(0, 0%, 100%);\\r\\n  }\\r\\n\\r\\n  .focus {\\r\\n    transition: transform 0.25s cubic-bezier(0.45, 0, 0.55, 1);\\r\\n  }\\r\\n\\r\\n  .focusable:focus .focus {\\r\\n    transform: scale(1);\\r\\n  }\\r\\n\\r\\n  .focusable:focus:not(:focus-visible) .focus {\\r\\n    transform: scale(0);\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAoSE,iDAAQ,CACN,OAAO,CAAE,IAAI,CACb,UAAU,CACR,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC;AACtC,MAAM,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,GAAG,CAC/B,CAEA,4CAAG,CACD,SAAS,CAAE,MACb,CAEA,qBAAO,CAAG,cAAC,CAAG,cAAE,CACd,UAAU,CAAE,MACd,CAEA,2CAAE,CACA,WAAW,CAAE,GACf,CAEA,6CAAI,CACF,OAAO,CAAE,KACX,CAEA,6CAAG,CACH,iBAAG,CAAG,4BAAE,CACN,UAAU,CAAE,KACd,CAEA,gDAAO,CACL,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,IAAI,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC9B,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,OAAO,CAAC,OAAO,CACxB,KAAK,CAAE,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CACxB,CAEA,gDAAO,CACL,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,aAAa,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAC3D,CAEA,wBAAU,MAAM,CAAC,kCAAO,CACtB,SAAS,CAAE,MAAM,CAAC,CACpB,CAEA,wBAAU,MAAM,KAAK,cAAc,CAAC,CAAC,kCAAO,CAC1C,SAAS,CAAE,MAAM,CAAC,CACpB"}`
};
const Quiz = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Timpul conteaza" } = $$props;
  let { question = "Pe ce data a fost lansat Yuzu (2013)" } = $$props;
  let { answer = 2013 } = $$props;
  let { details = "Yutu was a robotic lunar rover that formed part of the Chinese Chang'e 3 mission to the Moon. It was launched at 17:30 UTC on 1 December 2013" } = $$props;
  let { min = 2e3 } = $$props;
  let { max = 2022 } = $$props;
  let { value = 2010 } = $$props;
  let { precision: precision2 = 0 } = $$props;
  let x1 = 1 / (max - min) * (value - min) * 300;
  let svg;
  let g;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.question === void 0 && $$bindings.question && question !== void 0) $$bindings.question(question);
  if ($$props.answer === void 0 && $$bindings.answer && answer !== void 0) $$bindings.answer(answer);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0) $$bindings.details(details);
  if ($$props.min === void 0 && $$bindings.min && min !== void 0) $$bindings.min(min);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0) $$bindings.max(max);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.precision === void 0 && $$bindings.precision && precision2 !== void 0) $$bindings.precision(precision2);
  $$result.css.add(css);
  return `<article class="bg-card pt-7 pb-2 rounded-xl h-full w-full svelte-b4jlk5">${title ? `<h2 class="text-xl font-semibold text-slate-200 svelte-b4jlk5">${escape(title)}</h2>` : ``} <p class="text-slate-100 svelte-b4jlk5">${escape(question)}</p> <svg viewBox="-24 -50 348 100" class="svelte-b4jlk5"${add_attribute("this", svg, 0)}><g><rect y="-3.5" width="300" height="7" rx="3.5" fill="hsl(0, 0%, 85%)"></rect>${`  <g tabindex="0" aria-label="Schimba valoarea cu tastele de stanga si dreapta." class="focusable svelte-b4jlk5"${add_styles({ "cursor": `pointer`, "outline": `none` })}><g${add_styles({ "pointer-events": `none` })}><g transform="${"translate(" + escape(x1, true) + " 0)"}"><g${add_styles({ "color": `hsl(205, 87%, 29%)` })}><g><g transform="translate(0 -28)"><g fill="currentColor" font-size="11" font-weight="700" text-anchor="middle"><text>${escape(value.toFixed(precision2))}</text></g></g><g transform="scale(0)" class="focus svelte-b4jlk5"><circle r="23.5" fill="none" stroke="currentColor" stroke-width="1"></circle></g><circle r="18.5" fill="hsl(0, 0%, 100%)" stroke="currentColor" stroke-width="3"></circle><g fill="currentColor"><path d="M 2 -5 l 5 5 -5 5z"></path><path transform="scale(-1 1)" d="M 2 -5 l 5 5 -5 5z"></path></g></g></g></g></g><g${add_attribute("this", g, 0)}><rect opacity="0" y="-50" width="300" height="100"></rect></g></g>`}</g></svg> ${`<button class="text-slate-200 rounded-xl svelte-b4jlk5" data-svelte-h="svelte-1h41jhn">Arata raspunsul!</button>`} </article>`;
});
const TruthFalse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let options = ["Adevarat", "Fals"];
  let { answer = 3 } = $$props;
  let { intrebare = "Primul animal pe orbita, cainele Laika a fost o misune legata de:" } = $$props;
  let { detalii = "Pe 3 Noiembrie 1957 in cadrul misiunii Sputnik 2 catelul Laika din Uniunea Sovietica a devenit primul animal lansat in spatiu si prima fiinta decedata inafara pamantului. Sputnik 2 nu a fost proiectata pentru intoarcere asfel destinul Laikai a fost decesul. Misiunea a pregatit terenul pentru urmatoarele msisuni spatiale cu subiecti umani. " } = $$props;
  let { source = "/assets/laika.jpg" } = $$props;
  if ($$props.answer === void 0 && $$bindings.answer && answer !== void 0) $$bindings.answer(answer);
  if ($$props.intrebare === void 0 && $$bindings.intrebare && intrebare !== void 0) $$bindings.intrebare(intrebare);
  if ($$props.detalii === void 0 && $$bindings.detalii && detalii !== void 0) $$bindings.detalii(detalii);
  if ($$props.source === void 0 && $$bindings.source && source !== void 0) $$bindings.source(source);
  return `<div class="bg-black/50 pb-2 rounded-xl p-4">${`<h2 class="text-xl ml-4 font-semibold text-slate-200" data-svelte-h="svelte-p5wl5u">Adevarat sau fals?</h2> <p class="ml-4 text-slate-100">${escape(intrebare)}</p> <div class="grid grid-flow-row grid-rows-2 grid-cols-2 gap-2 m-4"><button class="text-l font-semibold flex justify-center place-items-center h-16 bg-green-400 hover:bg-green-500 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[0])}</button> <button class="text-l font-semibold flex justify-center place-items-center h-16 bg-red-400 hover:bg-red-500 hover:rounded-2xl hover:text-white transition-all rounded-md">${escape(options[1])}</button></div>`}</div>`;
});
const ScorCurent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $score, $$unsubscribe_score;
  $$unsubscribe_score = subscribe(score, (value) => $score = value);
  let { nrq = 1 } = $$props;
  let procentage = 0;
  if ($$props.nrq === void 0 && $$bindings.nrq && nrq !== void 0) $$bindings.nrq(nrq);
  procentage = Math.round($score / nrq * 100);
  $$unsubscribe_score();
  return `<div class="p-4 bg-gray-800/10 rounded-xl mb-2 flex flex-col items-center"><p class="text-lg font-semibold text-primary/80">Scor: ${escape($score)}
    Procentaj: ${escape(procentage)}%, in alte cuvinte ai raspuns corect la ${escape($score)} intrebari
    din ${escape(nrq)}</p></div>`;
});
let precision = 0;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $questions, $$unsubscribe_questions;
  let { data } = $$props;
  const questions = writable([]);
  $$unsubscribe_questions = subscribe(questions, (value) => $questions = value);
  let nrq;
  const questionTypeStore = writable("trivia");
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.questions === void 0 && $$bindings.questions && questions !== void 0) $$bindings.questions(questions);
  if ($$props.questionTypeStore === void 0 && $$bindings.questionTypeStore && questionTypeStore !== void 0) $$bindings.questionTypeStore(questionTypeStore);
  nrq = $questions.length;
  $$unsubscribe_questions();
  return `<div class="flex flex-col items-center justify-center relative">${validate_component(ScorCurent, "ScorCurent").$$render($$result, { nrq }, {}, {})} ${validate_component(Carousel, "Carousel.Root").$$render(
    $$result,
    {
      class: "w-full max-w-xs md:max-w-lg 2xl:max-w-xl"
    },
    {},
    {
      default: () => {
        return `${validate_component(Carousel_content, "Carousel.Content").$$render($$result, {}, {}, {
          default: () => {
            return `${each($questions, (q) => {
              return ` ${validate_component(Carousel_item, "Carousel.Item").$$render($$result, {}, {}, {
                default: () => {
                  return `<div class="p-1">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Card_content, "Card.Content").$$render(
                        $$result,
                        {
                          class: "flex aspect-square items-center justify-center p-6"
                        },
                        {},
                        {
                          default: () => {
                            return `${q.type === "trivia" ? `${validate_component(Trivia, "Trivia").$$render(
                              $$result,
                              {
                                answer: Number(q.response_options.response),
                                options: q.response_options.options,
                                source: `https://starqa.pockethost.io/api/files/${q.collectionId}/${q.id}/${q.image}`,
                                detalii: q.description,
                                intrebare: q.question
                              },
                              {},
                              {}
                            )}` : `${q.type === "quiz" ? `${validate_component(Quiz, "Quiz").$$render(
                              $$result,
                              {
                                title: "Selecteaza corect",
                                question: q.question,
                                answer: q.response_options.response,
                                details: q.description,
                                min: Number(q.min),
                                max: Number(q.max),
                                value: Number(q.value),
                                precision
                              },
                              {},
                              {}
                            )}` : `${q.type === "truthfalse" ? `${validate_component(TruthFalse, "TruthFalse").$$render(
                              $$result,
                              {
                                answer: Number(q.response_options.response),
                                source: `https://starqa.pockethost.io/api/files/${q.collectionId}/${q.id}/${q.image}`,
                                detalii: q.description,
                                intrebare: q.question
                              },
                              {},
                              {}
                            )}` : ``}`}`} `;
                          }
                        }
                      )} `;
                    }
                  })}</div> `;
                }
              })}`;
            })}`;
          }
        })} ${validate_component(Carousel_previous, "Carousel.Previous").$$render($$result, {}, {}, {})} ${validate_component(Carousel_next, "Carousel.Next").$$render($$result, {}, {}, {})}`;
      }
    }
  )}</div>`;
});
export {
  Page as default
};
