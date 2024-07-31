import { c as create_ssr_component, b as add_attribute, s as spread, d as escape_attribute_value, f as escape_object, e as escape, a as each, v as validate_component, m as missing_component } from "../../../../chunks/ssr.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card-title.js";
import { c as cn, b as cubicOut, a as flyAndScale, s as swapElements, g as generateRandomBinary, d as getAcceptType, e as splitBySpaces, h as generate8DigitCode } from "../../../../chunks/utils.js";
import { I as Input$2 } from "../../../../chunks/input.js";
import { c as createLabel, L as Label } from "../../../../chunks/label.js";
import { d as createEventDispatcher, h as get_store_value, e as setContext, g as getContext, b as compute_rest_props, s as subscribe } from "../../../../chunks/lifecycle.js";
import { b as badgeVariants } from "../../../../chunks/index2.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { B as Button } from "../../../../chunks/button.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
import { dequal } from "dequal";
import { g as isHTMLElement, v as getElementByMeltId, t as isElement, x as isHTMLLabelElement, w as withGet, o as omit, c as createElHelpers, y as isObject, z as stripValues, m as makeElement, r as disabledAttr, h as executeCallbacks, a as addMeltEventListener, k as kbd, A as isHTMLButtonElement, F as FIRST_LAST_KEYS, j as isElementDisabled, u as useEscapeKeydown, s as styleToString, e as effect, B as createHiddenInput, l as safeOnMount, d as isBrowser, C as isHTMLInputElement, n as noop, q as addEventListener, D as getDirectionalKeys, i as is_void } from "../../../../chunks/index3.js";
import { w as writable, d as derived, r as readonly } from "../../../../chunks/index6.js";
import { g as generateIds, c as createTypeaheadSearch, d as derivedVisible, m as last, n as back, o as forward, p as prev, q as next, u as usePopper, a as getPortalDestination, t as generateId, j as addHighlight, r as removeHighlight, e as removeScroll, v as toggle, h as handleRovingFocus, k as generateId$1, l as getPositioningUpdater } from "../../../../chunks/helpers.js";
import { o as overridable, t as toWritableStores, r as removeUndefined, g as getOptionUpdater } from "../../../../chunks/updater.js";
import { t as tick } from "../../../../chunks/scheduler.js";
import { c as createBitAttrs } from "../../../../chunks/attrs.js";
import "clsx";
import { d as debounce, C as Carta, m as math } from "../../../../chunks/carta2.js";
import { tikz } from "@cartamd/plugin-tikz";
import "diff";
import { tv } from "tailwind-variants";
import { g as getTranslationFunctions } from "../../../../chunks/index5.js";
import { c as createDispatcher } from "../../../../chunks/events.js";
const css$4 = {
  code: ".carta-renderer.svelte-r6n2gn{position:relative;word-wrap:break-word;word-break:break-word}",
  map: '{"version":3,"file":"Renderer.svelte","sources":["Renderer.svelte"],"sourcesContent":["<!--\\n\\t@component\\n\\tThis component wraps the Carta renderer and provides a debounced rendering\\n\\tfor the editor.\\n-->\\n\\n<script>import { createEventDispatcher, onMount } from \\"svelte\\";\\nimport { debounce } from \\"../utils\\";\\nexport let carta;\\nexport let value;\\nexport let elem;\\nlet mounted = false;\\nlet renderedHtml = carta.renderSSR(value);\\nconst debouncedRenderer = debounce((value2) => {\\n  carta.render(value2).then((rendered) => renderedHtml = rendered).then(() => events(\\"render\\", void 0));\\n}, carta.rendererDebounce ?? 300);\\nconst onValueChange = (value2) => {\\n  debouncedRenderer(value2);\\n};\\n$:\\n  if (mounted)\\n    onValueChange(value);\\nonMount(() => carta.$setRenderer(elem));\\nonMount(() => mounted = true);\\nconst events = createEventDispatcher();\\n<\/script>\\n\\n<div bind:this={elem} on:scroll class=\\"carta-renderer markdown-body\\">\\n\\t<!-- eslint-disable-next-line svelte/no-at-html-tags -->\\n\\t{@html renderedHtml}\\n\\t{#if mounted}\\n\\t\\t<slot />\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.carta-renderer {\\n\\t\\tposition: relative;\\n\\t\\tword-wrap: break-word;\\n\\t\\tword-break: break-word;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoCC,6BAAgB,CACf,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,UAAU,CACrB,UAAU,CAAE,UACb"}'
};
const Renderer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { carta } = $$props;
  let { value } = $$props;
  let { elem } = $$props;
  let renderedHtml = carta.renderSSR(value);
  debounce(
    (value2) => {
      carta.render(value2).then((rendered) => renderedHtml = rendered).then(() => events("render", void 0));
    },
    carta.rendererDebounce ?? 300
  );
  const events = createEventDispatcher();
  if ($$props.carta === void 0 && $$bindings.carta && carta !== void 0) $$bindings.carta(carta);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.elem === void 0 && $$bindings.elem && elem !== void 0) $$bindings.elem(elem);
  $$result.css.add(css$4);
  return `  <div class="carta-renderer markdown-body svelte-r6n2gn"${add_attribute("this", elem, 0)}> <!-- HTML_TAG_START -->${renderedHtml}<!-- HTML_TAG_END --> ${``} </div>`;
});
const css$3 = {
  code: ".carta-input.svelte-ymdneo{position:relative}.carta-input-wrapper.svelte-ymdneo{position:relative;font-family:monospace}textarea.svelte-ymdneo{position:relative;width:100%;max-width:100%;min-height:100%;overflow-y:hidden;resize:none;padding:0;margin:0;border:0;color:transparent;background:transparent;outline:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4}.carta-highlight.svelte-ymdneo{position:absolute;left:0;right:0;top:0;bottom:0;margin:0;-webkit-user-select:none;-moz-user-select:none;user-select:none;height:-moz-fit-content;height:fit-content;padding:inherit;margin:inherit;word-wrap:break-word;white-space:pre-wrap;word-break:break-word}.carta-highlight .shiki{margin:0;-moz-tab-size:4;-o-tab-size:4;tab-size:4;background-color:transparent !important}.carta-highlight *{font-family:inherit;font-size:inherit;word-wrap:break-word;white-space:pre-wrap;word-break:break-word}#editor-unfocus-suggestion.svelte-ymdneo{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}",
  map: '{"version":3,"file":"Input.svelte","sources":["Input.svelte"],"sourcesContent":["<!--\\n\\t@component\\n\\tA wrapped textarea component integrated with Carta. It handles the highlighting\\n\\tand propagates events to the Carta instance.\\t\\n-->\\n\\n<script>import { onMount } from \\"svelte\\";\\nimport { debounce } from \\"../utils\\";\\nimport { BROWSER } from \\"esm-env\\";\\nimport { removeTemporaryNodes, speculativeHighlightUpdate } from \\"../speculative\\";\\nexport let carta;\\nexport let value = \\"\\";\\nexport let placeholder = \\"\\";\\nexport let elem;\\nexport let props = {};\\nlet textarea;\\nlet highlightElem;\\nlet highlighted = value;\\nlet mounted = false;\\nlet prevValue = value;\\nexport const resize = () => {\\n  if (!mounted || !textarea)\\n    return;\\n  textarea.style.height = \\"0\\";\\n  textarea.style.height = textarea.scrollHeight + \\"px\\";\\n  textarea.scrollTop = 0;\\n  const isFocused = document.activeElement === textarea;\\n  if (!isFocused)\\n    return;\\n  if (!carta.input)\\n    return;\\n  const coords = carta.input.getCursorXY();\\n  if (!coords)\\n    return;\\n  if (coords.top < 0 || coords.top + carta.input.getRowHeight() >= elem.scrollTop + elem.clientHeight)\\n    elem.scrollTo({ top: coords?.top, behavior: \\"instant\\" });\\n};\\nconst focus = () => {\\n  const selectedText = window.getSelection()?.toString();\\n  if (selectedText)\\n    return;\\n  textarea?.focus();\\n};\\nconst highlight = async (text) => {\\n  const highlighter = await carta.highlighter();\\n  if (!highlighter)\\n    return;\\n  let html;\\n  const hl = await import(\\"../highlight\\");\\n  const { isSingleTheme } = hl;\\n  if (isSingleTheme(highlighter.theme)) {\\n    html = highlighter.codeToHtml(text, {\\n      lang: highlighter.lang,\\n      theme: highlighter.theme\\n    });\\n  } else {\\n    html = highlighter.codeToHtml(text, {\\n      lang: highlighter.lang,\\n      themes: highlighter.theme\\n    });\\n  }\\n  removeTemporaryNodes(highlightElem);\\n  if (carta.sanitizer) {\\n    highlighted = carta.sanitizer(html);\\n  } else {\\n    highlighted = html;\\n  }\\n  requestAnimationFrame(resize);\\n};\\nconst debouncedHighlight = debounce(highlight, 250);\\nconst highlightNestedLanguages = debounce(async (text) => {\\n  const highlighter = await carta.highlighter();\\n  const hl = await import(\\"../highlight\\");\\n  const { loadNestedLanguages } = hl;\\n  if (!highlighter)\\n    return;\\n  const { updated } = await loadNestedLanguages(highlighter, text);\\n  if (updated)\\n    debouncedHighlight(text);\\n}, 300);\\nconst onValueChange = (value2) => {\\n  if (highlightElem) {\\n    speculativeHighlightUpdate(highlightElem, prevValue, value2);\\n    requestAnimationFrame(resize);\\n  }\\n  debouncedHighlight(value2);\\n  highlightNestedLanguages(value2);\\n};\\n$:\\n  if (BROWSER)\\n    onValueChange(value);\\nonMount(() => {\\n  mounted = true;\\n  requestAnimationFrame(resize);\\n});\\nonMount(() => {\\n  carta.$setInput(textarea, elem, () => {\\n    value = textarea.value;\\n  });\\n});\\n<\/script>\\n\\n<div role=\\"tooltip\\" id=\\"editor-unfocus-suggestion\\">\\n\\tPress ESC then TAB to move the focus off the field\\n</div>\\n<div\\n\\ton:click={focus}\\n\\ton:keydown={focus}\\n\\ton:scroll\\n\\trole=\\"textbox\\"\\n\\ttabindex=\\"-1\\"\\n\\tclass=\\"carta-input\\"\\n\\tbind:this={elem}\\n>\\n\\t<div class=\\"carta-input-wrapper\\">\\n\\t\\t<div\\n\\t\\t\\tclass=\\"carta-highlight carta-font-code\\"\\n\\t\\t\\ttabindex=\\"-1\\"\\n\\t\\t\\taria-hidden=\\"true\\"\\n\\t\\t\\tbind:this={highlightElem}\\n\\t\\t>\\n\\t\\t\\t<!-- eslint-disable-line svelte/no-at-html-tags -->{@html highlighted}\\n\\t\\t</div>\\n\\n\\t\\t<textarea\\n\\t\\t\\tspellcheck=\\"false\\"\\n\\t\\t\\tclass=\\"carta-font-code\\"\\n\\t\\t\\taria-multiline=\\"true\\"\\n\\t\\t\\taria-describedby=\\"editor-unfocus-suggestion\\"\\n\\t\\t\\ttabindex=\\"0\\"\\n\\t\\t\\t{placeholder}\\n\\t\\t\\t{...props}\\n\\t\\t\\tbind:value\\n\\t\\t\\tbind:this={textarea}\\n\\t\\t\\ton:scroll={() => (textarea.scrollTop = 0)}\\n\\t\\t\\ton:keydown={() => (prevValue = value)}\\n\\t\\t/>\\n\\t</div>\\n\\n\\t{#if mounted}\\n\\t\\t<slot />\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.carta-input {\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.carta-input-wrapper {\\n\\t\\tposition: relative;\\n\\t\\tfont-family: monospace;\\n\\t}\\n\\n\\ttextarea {\\n\\t\\tposition: relative;\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 100%;\\n\\t\\tmin-height: 100%;\\n\\n\\t\\toverflow-y: hidden;\\n\\t\\tresize: none;\\n\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tborder: 0;\\n\\n\\t\\tcolor: transparent;\\n\\t\\tbackground: transparent;\\n\\n\\t\\toutline: none;\\n\\t\\t-moz-tab-size: 4;\\n\\t\\t  -o-tab-size: 4;\\n\\t\\t     tab-size: 4;\\n\\t}\\n\\n\\t.carta-highlight {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\ttop: 0;\\n\\t\\tbottom: 0;\\n\\t\\tmargin: 0;\\n\\t\\t-webkit-user-select: none;\\n\\t\\t   -moz-user-select: none;\\n\\t\\t        user-select: none;\\n\\t\\theight: -moz-fit-content;\\n\\t\\theight: fit-content;\\n\\n\\t\\tpadding: inherit;\\n\\t\\tmargin: inherit;\\n\\n\\t\\tword-wrap: break-word;\\n\\t\\twhite-space: pre-wrap;\\n\\t\\tword-break: break-word;\\n\\t}\\n\\n\\t:global(.carta-highlight .shiki) {\\n\\t\\tmargin: 0;\\n\\t\\t-moz-tab-size: 4;\\n\\t\\t  -o-tab-size: 4;\\n\\t\\t     tab-size: 4;\\n\\t\\tbackground-color: transparent !important;\\n\\t}\\n\\n\\t:global(.carta-highlight *) {\\n\\t\\tfont-family: inherit;\\n\\t\\tfont-size: inherit;\\n\\n\\t\\tword-wrap: break-word;\\n\\t\\twhite-space: pre-wrap;\\n\\t\\tword-break: break-word;\\n\\t}\\n\\n\\t#editor-unfocus-suggestion {\\n\\t\\tposition: absolute;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: -1px;\\n\\t\\toverflow: hidden;\\n\\t\\tclip: rect(0, 0, 0, 0);\\n\\t\\tborder: 0;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiJC,0BAAa,CACZ,QAAQ,CAAE,QACX,CAEA,kCAAqB,CACpB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,SACd,CAEA,sBAAS,CACR,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,CAEhB,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,IAAI,CAEZ,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,CAAC,CAET,KAAK,CAAE,WAAW,CAClB,UAAU,CAAE,WAAW,CAEvB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,CAAC,CACd,WAAW,CAAE,CAAC,CACX,QAAQ,CAAE,CAChB,CAEA,8BAAiB,CAChB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,CAAC,CACT,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CACzB,MAAM,CAAE,gBAAgB,CACxB,MAAM,CAAE,WAAW,CAEnB,OAAO,CAAE,OAAO,CAChB,MAAM,CAAE,OAAO,CAEf,SAAS,CAAE,UAAU,CACrB,WAAW,CAAE,QAAQ,CACrB,UAAU,CAAE,UACb,CAEQ,uBAAyB,CAChC,MAAM,CAAE,CAAC,CACT,aAAa,CAAE,CAAC,CACd,WAAW,CAAE,CAAC,CACX,QAAQ,CAAE,CAAC,CAChB,gBAAgB,CAAE,WAAW,CAAC,UAC/B,CAEQ,kBAAoB,CAC3B,WAAW,CAAE,OAAO,CACpB,SAAS,CAAE,OAAO,CAElB,SAAS,CAAE,UAAU,CACrB,WAAW,CAAE,QAAQ,CACrB,UAAU,CAAE,UACb,CAEA,wCAA2B,CAC1B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACtB,MAAM,CAAE,CACT"}'
};
const Input$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { carta } = $$props;
  let { value = "" } = $$props;
  let { placeholder = "" } = $$props;
  let { elem } = $$props;
  let { props = {} } = $$props;
  let textarea;
  let highlightElem;
  let highlighted = value;
  const resize = () => {
    return;
  };
  if ($$props.carta === void 0 && $$bindings.carta && carta !== void 0) $$bindings.carta(carta);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.elem === void 0 && $$bindings.elem && elem !== void 0) $$bindings.elem(elem);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0) $$bindings.props(props);
  if ($$props.resize === void 0 && $$bindings.resize && resize !== void 0) $$bindings.resize(resize);
  $$result.css.add(css$3);
  return `  <div role="tooltip" id="editor-unfocus-suggestion" class="svelte-ymdneo" data-svelte-h="svelte-167gk2c">Press ESC then TAB to move the focus off the field</div> <div role="textbox" tabindex="-1" class="carta-input svelte-ymdneo"${add_attribute("this", elem, 0)}><div class="carta-input-wrapper svelte-ymdneo"><div class="carta-highlight carta-font-code svelte-ymdneo" tabindex="-1" aria-hidden="true"${add_attribute("this", highlightElem, 0)}><!-- HTML_TAG_START -->${highlighted}<!-- HTML_TAG_END --></div> <textarea${spread(
    [
      { spellcheck: "false" },
      { class: "carta-font-code" },
      { "aria-multiline": "true" },
      {
        "aria-describedby": "editor-unfocus-suggestion"
      },
      { tabindex: "0" },
      {
        placeholder: escape_attribute_value(placeholder)
      },
      escape_object(props)
    ],
    { classes: "svelte-ymdneo" }
  )}${add_attribute("this", textarea, 0)}>${escape(value || "")}</textarea></div> ${``} </div>`;
});
const defaultLabels = {
  writeTab: "Write",
  previewTab: "Preview",
  iconsLabels: {}
};
const MenuIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="M4 8a2 2 0 1 1-3.999.001A2 2 0 0 1 4 8m6 0a2 2 0 1 1-3.999.001A2 2 0 0 1 10 8m6 0a2 2 0 1 1-3.999.001A2 2 0 0 1 16 8"></path></svg>`;
});
const css$2 = {
  code: ".carta-toolbar.svelte-1c77udu{height:2rem;display:flex;flex-shrink:0;overflow-x:auto;overflow-y:hidden}.carta-toolbar-left.svelte-1c77udu{display:flex;align-items:center;flex-wrap:nowrap;height:100%}.carta-filler.svelte-1c77udu{flex:1}.carta-toolbar-right.svelte-1c77udu{height:100%;display:flex;align-items:center;justify-content:flex-end}.carta-icon.svelte-1c77udu{display:flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:3px;cursor:pointer;margin-left:4px}.carta-icon-full.svelte-1c77udu{display:flex;align-items:center;border-radius:3px;cursor:pointer}.carta-icons-menu.svelte-1c77udu{position:absolute;top:100%;right:0;display:flex;flex-direction:column;margin-right:0.5rem;z-index:1}",
  map: `{"version":3,"file":"Toolbar.svelte","sources":["Toolbar.svelte"],"sourcesContent":["<!--\\n\\t@component\\n\\tDisplays the buttons to switch tabs and the icons to interact with the editor.\\n-->\\n\\n<script>import { handleArrowKeysNavigation } from \\"../accessibility\\";\\nimport MenuIcon from \\"./icons/MenuIcon.svelte\\";\\nimport { onMount } from \\"svelte\\";\\nimport { debounce } from \\"../utils\\";\\nexport let carta;\\nexport let mode;\\nexport let tab;\\nexport let labels;\\nlet toolbar;\\nlet menu;\\nlet iconsContainer;\\nlet visibleIcons = [...carta.icons];\\nlet availableWidth = 0;\\nlet iconWidth = 0;\\nlet toolbarHeight = 0;\\nlet iconsHidden = false;\\nlet showMenu = false;\\nconst IconPadding = 8;\\nconst waitForDOMUpdate = () => new Promise(requestAnimationFrame);\\nconst onResize = debounce(async () => {\\n  if (!toolbar || !iconsContainer)\\n    return;\\n  const overflowing = () => toolbar.scrollWidth - toolbar.clientWidth > 0;\\n  while (overflowing()) {\\n    visibleIcons.pop();\\n    visibleIcons = visibleIcons;\\n    await waitForDOMUpdate();\\n  }\\n  const fitting = () => availableWidth > 2 * iconWidth + IconPadding;\\n  while (visibleIcons.length < carta.icons.length && fitting()) {\\n    visibleIcons.push(carta.icons[visibleIcons.length]);\\n    visibleIcons = visibleIcons;\\n    await waitForDOMUpdate();\\n  }\\n}, 100);\\nfunction onClick(event) {\\n  const target = event.target;\\n  if (menu && !menu.contains(target)) {\\n    showMenu = false;\\n  }\\n}\\nonMount(onResize);\\n$:\\n  iconsHidden = visibleIcons.length !== carta.icons.length;\\n<\/script>\\n\\n<svelte:window on:resize={onResize} on:click={onClick} />\\n\\n<div class=\\"carta-toolbar\\" role=\\"toolbar\\" bind:clientHeight={toolbarHeight} bind:this={toolbar}>\\n\\t<div class=\\"carta-toolbar-left\\">\\n\\t\\t{#if mode == 'tabs'}\\n\\t\\t\\t<button\\n\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\ttabindex={0}\\n\\t\\t\\t\\tclass={tab === 'write' ? 'carta-active' : ''}\\n\\t\\t\\t\\ton:click={() => (tab = 'write')}\\n\\t\\t\\t\\ton:keydown={handleArrowKeysNavigation}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{labels.writeTab}\\n\\t\\t\\t</button>\\n\\t\\t\\t<button\\n\\t\\t\\t\\ttype=\\"button\\"\\n\\t\\t\\t\\ttabindex={-1}\\n\\t\\t\\t\\tclass={tab === 'preview' ? 'carta-active' : ''}\\n\\t\\t\\t\\ton:click={() => (tab = 'preview')}\\n\\t\\t\\t\\ton:keydown={handleArrowKeysNavigation}\\n\\t\\t\\t>\\n\\t\\t\\t\\t{labels.previewTab}\\n\\t\\t\\t</button>\\n\\t\\t{/if}\\n\\t</div>\\n\\n\\t<div class=\\"carta-filler\\" bind:clientWidth={availableWidth} />\\n\\n\\t<div class=\\"carta-toolbar-right\\" bind:this={iconsContainer}>\\n\\t\\t{#if !(mode === 'tabs' && tab === 'preview')}\\n\\t\\t\\t{#each visibleIcons as icon, index}\\n\\t\\t\\t\\t{@const label = labels.iconsLabels[icon.id] ?? icon.label}\\n\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\tclass=\\"carta-icon\\"\\n\\t\\t\\t\\t\\ttabindex={index == 0 ? 0 : -1}\\n\\t\\t\\t\\t\\ttitle={label}\\n\\t\\t\\t\\t\\taria-label={label}\\n\\t\\t\\t\\t\\tbind:clientWidth={iconWidth}\\n\\t\\t\\t\\t\\ton:click|preventDefault|stopPropagation={() => {\\n\\t\\t\\t\\t\\t\\tcarta.input && icon.action(carta.input);\\n\\t\\t\\t\\t\\t\\tcarta.input?.update();\\n\\t\\t\\t\\t\\t\\tcarta.input?.textarea.focus();\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\ton:keydown={handleArrowKeysNavigation}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<svelte:component this={icon.component} />\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t{/each}\\n\\t\\t\\t{#if iconsHidden}\\n\\t\\t\\t\\t{@const label = labels.iconsLabels['menu'] ?? 'Menu'}\\n\\t\\t\\t\\t<button\\n\\t\\t\\t\\t\\tclass=\\"carta-icon\\"\\n\\t\\t\\t\\t\\ttabindex={-1}\\n\\t\\t\\t\\t\\ttitle={label}\\n\\t\\t\\t\\t\\taria-label={label}\\n\\t\\t\\t\\t\\ton:keydown={handleArrowKeysNavigation}\\n\\t\\t\\t\\t\\ton:click|preventDefault|stopPropagation={() => (showMenu = !showMenu)}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<MenuIcon />\\n\\t\\t\\t\\t</button>\\n\\t\\t\\t{/if}\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n{#if showMenu && iconsHidden}\\n\\t<div class=\\"carta-icons-menu\\" style=\\"top: {toolbarHeight}px;\\" bind:this={menu}>\\n\\t\\t{#each carta.icons.filter((icon) => !visibleIcons.includes(icon)) as icon}\\n\\t\\t\\t{@const label = labels.iconsLabels[icon.id] ?? icon.label}\\n\\n\\t\\t\\t<button\\n\\t\\t\\t\\tclass=\\"carta-icon-full\\"\\n\\t\\t\\t\\taria-label={label}\\n\\t\\t\\t\\ton:click|preventDefault|stopPropagation={() => {\\n\\t\\t\\t\\t\\tcarta.input && icon.action(carta.input);\\n\\t\\t\\t\\t\\tcarta.input?.update();\\n\\t\\t\\t\\t\\tcarta.input?.textarea.focus();\\n\\t\\t\\t\\t\\tshowMenu = false;\\n\\t\\t\\t\\t}}\\n\\t\\t\\t\\ton:keydown={handleArrowKeysNavigation}\\n\\t\\t\\t>\\n\\t\\t\\t\\t<svelte:component this={icon.component} />\\n\\t\\t\\t\\t<span>{label}</span>\\n\\t\\t\\t</button>\\n\\t\\t{/each}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t.carta-toolbar {\\n\\t\\theight: 2rem;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-shrink: 0;\\n\\t\\toverflow-x: auto;\\n\\t\\toverflow-y: hidden;\\n\\t}\\n\\n\\t.carta-toolbar-left {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tflex-wrap: nowrap;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\t.carta-filler {\\n\\t\\tflex: 1;\\n\\t}\\n\\n\\t.carta-toolbar-right {\\n\\t\\theight: 100%;\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: flex-end;\\n\\t}\\n\\n\\t.carta-icon {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\twidth: 1.5rem;\\n\\t\\theight: 1.5rem;\\n\\t\\tborder-radius: 3px;\\n\\t\\tcursor: pointer;\\n\\t\\tmargin-left: 4px;\\n\\t}\\n\\n\\t.carta-icon-full {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tborder-radius: 3px;\\n\\t\\tcursor: pointer;\\n\\t}\\n\\n\\t.carta-icons-menu {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 100%;\\n\\t\\tright: 0;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tmargin-right: 0.5rem;\\n\\t\\tz-index: 1;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA4IC,6BAAe,CACd,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,CAAC,CACd,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,MACb,CAEA,kCAAoB,CACnB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IACT,CAEA,4BAAc,CACb,IAAI,CAAE,CACP,CAEA,mCAAqB,CACpB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,QAClB,CAEA,0BAAY,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,MAAM,CACd,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OAAO,CACf,WAAW,CAAE,GACd,CAEA,+BAAiB,CAChB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OACT,CAEA,gCAAkB,CACjB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,YAAY,CAAE,MAAM,CACpB,OAAO,CAAE,CACV"}`
};
const Toolbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { carta } = $$props;
  let { mode } = $$props;
  let { tab } = $$props;
  let { labels } = $$props;
  let toolbar;
  let iconsContainer;
  let visibleIcons = [...carta.icons];
  let iconsHidden = false;
  if ($$props.carta === void 0 && $$bindings.carta && carta !== void 0) $$bindings.carta(carta);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
  if ($$props.tab === void 0 && $$bindings.tab && tab !== void 0) $$bindings.tab(tab);
  if ($$props.labels === void 0 && $$bindings.labels && labels !== void 0) $$bindings.labels(labels);
  $$result.css.add(css$2);
  iconsHidden = visibleIcons.length !== carta.icons.length;
  return `   <div class="carta-toolbar svelte-1c77udu" role="toolbar"${add_attribute("this", toolbar, 0)}><div class="carta-toolbar-left svelte-1c77udu">${mode == "tabs" ? `<button type="button"${add_attribute("tabindex", 0, 0)}${add_attribute("class", tab === "write" ? "carta-active" : "", 0)}>${escape(labels.writeTab)}</button> <button type="button"${add_attribute("tabindex", -1, 0)}${add_attribute("class", tab === "preview" ? "carta-active" : "", 0)}>${escape(labels.previewTab)}</button>` : ``}</div> <div class="carta-filler svelte-1c77udu"></div> <div class="carta-toolbar-right svelte-1c77udu"${add_attribute("this", iconsContainer, 0)}>${!(mode === "tabs" && tab === "preview") ? `${each(visibleIcons, (icon, index) => {
    let label = labels.iconsLabels[icon.id] ?? icon.label;
    return ` <button class="carta-icon svelte-1c77udu"${add_attribute("tabindex", index == 0 ? 0 : -1, 0)}${add_attribute("title", label, 0)}${add_attribute("aria-label", label, 0)}>${validate_component(icon.component || missing_component, "svelte:component").$$render($$result, {}, {}, {})} </button>`;
  })} ${iconsHidden ? (() => {
    let label = labels.iconsLabels["menu"] ?? "Menu";
    return ` <button class="carta-icon svelte-1c77udu"${add_attribute("tabindex", -1, 0)}${add_attribute("title", label, 0)}${add_attribute("aria-label", label, 0)}>${validate_component(MenuIcon, "MenuIcon").$$render($$result, {}, {}, {})}</button>`;
  })() : ``}` : ``}</div></div> ${``}`;
});
const css$1 = {
  code: ".carta-editor.svelte-11jlii3{position:relative;display:flex;flex-direction:column}.carta-container.mode-split > *{width:50%}.carta-container.mode-tabs > *{width:100%}.carta-container.svelte-11jlii3{display:flex;position:relative}",
  map: `{"version":3,"file":"MarkdownEditor.svelte","sources":["MarkdownEditor.svelte"],"sourcesContent":["<!--\\n\\t@component\\n\\tThis is the main editor component that combines the input and renderer\\n\\tcomponents. It also handles the scroll synchronization between the input and renderer\\n\\tcomponents (if set to sync), and the window mode management (tabs or split).\\n-->\\n\\n<script>import { onMount } from \\"svelte\\";\\nimport Renderer from \\"./internal/components/Renderer.svelte\\";\\nimport Input from \\"./internal/components/Input.svelte\\";\\nimport { debounce } from \\"./internal/utils\\";\\nimport { defaultLabels } from \\"./internal/labels\\";\\nimport Toolbar from \\"./internal/components/Toolbar.svelte\\";\\nexport let carta;\\nexport let theme = \\"default\\";\\nexport let value = \\"\\";\\nexport let mode = \\"auto\\";\\nexport let scroll = \\"sync\\";\\nexport let disableToolbar = false;\\nexport let placeholder = \\"\\";\\nexport let textarea = {};\\nexport let selectedTab = \\"write\\";\\nlet userLabels = {};\\nexport { userLabels as labels };\\nconst labels = {\\n  ...defaultLabels,\\n  ...userLabels\\n};\\nlet width;\\nlet windowMode;\\nlet mounted = false;\\nlet resizeInput;\\nlet editorElem;\\nlet inputElem;\\nlet rendererElem;\\nlet currentlyScrolling;\\nlet currentScrollPercentage = 0;\\n$: {\\n  windowMode = mode === \\"auto\\" ? width > 768 ? \\"split\\" : \\"tabs\\" : mode;\\n}\\n$: {\\n  windowMode;\\n  resizeInput && resizeInput();\\n}\\n$: {\\n  inputElem, rendererElem;\\n  loadScrollPosition(selectedTab);\\n}\\nfunction calculateScrollPercentage(elem) {\\n  const scrolledAvbSpace = elem.scrollHeight - elem.clientHeight;\\n  const scrolledAmount = elem.scrollTop * (1 + elem.clientHeight / scrolledAvbSpace);\\n  return scrolledAmount / elem.scrollHeight;\\n}\\nconst clearCurrentlyScrolling = debounce(() => {\\n  currentlyScrolling = null;\\n}, 1e3);\\nfunction handleScroll(e) {\\n  const [scrolled, target] = e.target == inputElem ? [inputElem, rendererElem] : [rendererElem, inputElem];\\n  if (windowMode != \\"split\\")\\n    return;\\n  if (scroll != \\"sync\\")\\n    return;\\n  synchronizeScroll(scrolled, target);\\n}\\nfunction synchronizeScroll(scrolled, target) {\\n  const percentage = calculateScrollPercentage(scrolled);\\n  currentScrollPercentage = percentage;\\n  if (currentlyScrolling && currentlyScrolling != scrolled)\\n    return;\\n  currentlyScrolling = scrolled;\\n  const targetAvbSpace = target.scrollHeight - target.clientHeight;\\n  target.scrollTo({ top: percentage * targetAvbSpace, behavior: \\"smooth\\" });\\n  clearCurrentlyScrolling();\\n}\\nfunction loadScrollPosition(tab) {\\n  if (windowMode !== \\"tabs\\")\\n    return;\\n  const elem = tab === \\"write\\" ? inputElem : rendererElem;\\n  if (!elem)\\n    return;\\n  const avbSpace = elem.scrollHeight - elem.clientHeight;\\n  elem.scroll({ top: avbSpace * currentScrollPercentage, behavior: \\"instant\\" });\\n}\\nonMount(() => carta.$setElement(editorElem));\\nonMount(() => mounted = true);\\n<\/script>\\n\\n<div bind:this={editorElem} bind:clientWidth={width} class=\\"carta-editor carta-theme__{theme}\\">\\n\\t{#if !disableToolbar}\\n\\t\\t<Toolbar {carta} {labels} mode={windowMode} bind:tab={selectedTab} />\\n\\t{/if}\\n\\n\\t<div class=\\"carta-wrapper\\">\\n\\t\\t<div class=\\"carta-container mode-{windowMode}\\">\\n\\t\\t\\t{#if windowMode == 'split' || selectedTab == 'write'}\\n\\t\\t\\t\\t<Input\\n\\t\\t\\t\\t\\t{carta}\\n\\t\\t\\t\\t\\t{placeholder}\\n\\t\\t\\t\\t\\tprops={textarea}\\n\\t\\t\\t\\t\\tbind:value\\n\\t\\t\\t\\t\\tbind:resize={resizeInput}\\n\\t\\t\\t\\t\\tbind:elem={inputElem}\\n\\t\\t\\t\\t\\ton:scroll={handleScroll}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<!-- Input extensions components -->\\n\\t\\t\\t\\t\\t{#if mounted}\\n\\t\\t\\t\\t\\t\\t{#each carta.components.filter(({ parent }) => [parent]\\n\\t\\t\\t\\t\\t\\t\\t\\t.flat()\\n\\t\\t\\t\\t\\t\\t\\t\\t.includes('input')) as { component, props }}\\n\\t\\t\\t\\t\\t\\t\\t<svelte:component this={component} {carta} {...props} />\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</Input>\\n\\t\\t\\t{/if}\\n\\t\\t\\t{#if windowMode == 'split' || selectedTab == 'preview'}\\n\\t\\t\\t\\t<Renderer\\n\\t\\t\\t\\t\\t{carta}\\n\\t\\t\\t\\t\\t{value}\\n\\t\\t\\t\\t\\tbind:elem={rendererElem}\\n\\t\\t\\t\\t\\ton:scroll={handleScroll}\\n\\t\\t\\t\\t\\ton:render={() => {\\n\\t\\t\\t\\t\\t\\tif (windowMode != 'split') return;\\n\\t\\t\\t\\t\\t\\tif (scroll != 'sync') return;\\n\\t\\t\\t\\t\\t\\tsynchronizeScroll(inputElem, rendererElem);\\n\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<!-- Renderer extensions components -->\\n\\t\\t\\t\\t\\t{#if mounted}\\n\\t\\t\\t\\t\\t\\t{#each carta.components.filter(({ parent }) => [parent]\\n\\t\\t\\t\\t\\t\\t\\t\\t.flat()\\n\\t\\t\\t\\t\\t\\t\\t\\t.includes('renderer')) as { component, props }}\\n\\t\\t\\t\\t\\t\\t\\t<svelte:component this={component} {carta} {...props} />\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</Renderer>\\n\\t\\t\\t{/if}\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t<!-- Editor extensions components -->\\n\\t<!-- prevent loading components on ssr renderings -->\\n\\t{#if mounted}\\n\\t\\t{#each carta.components.filter(({ parent }) => [parent]\\n\\t\\t\\t\\t.flat()\\n\\t\\t\\t\\t.includes('editor')) as { component, props }}\\n\\t\\t\\t<svelte:component this={component} {carta} {...props} />\\n\\t\\t{/each}\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.carta-editor {\\n\\t\\tposition: relative;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t}\\n\\n\\t:global(.carta-container.mode-split > *) {\\n\\t\\twidth: 50%;\\n\\t}\\n\\n\\t:global(.carta-container.mode-tabs > *) {\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t.carta-container {\\n\\t\\tdisplay: flex;\\n\\t\\tposition: relative;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAuJC,4BAAc,CACb,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MACjB,CAEQ,+BAAiC,CACxC,KAAK,CAAE,GACR,CAEQ,8BAAgC,CACvC,KAAK,CAAE,IACR,CAEA,+BAAiB,CAChB,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,QACX"}`
};
const MarkdownEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { carta } = $$props;
  let { theme = "default" } = $$props;
  let { value = "" } = $$props;
  let { mode = "auto" } = $$props;
  let { scroll = "sync" } = $$props;
  let { disableToolbar = false } = $$props;
  let { placeholder = "" } = $$props;
  let { textarea = {} } = $$props;
  let { selectedTab = "write" } = $$props;
  let { labels: userLabels = {} } = $$props;
  const labels = { ...defaultLabels, ...userLabels };
  let windowMode;
  let resizeInput;
  let editorElem;
  let inputElem;
  let rendererElem;
  let currentScrollPercentage = 0;
  function loadScrollPosition(tab) {
    if (windowMode !== "tabs") return;
    const elem = tab === "write" ? inputElem : rendererElem;
    if (!elem) return;
    const avbSpace = elem.scrollHeight - elem.clientHeight;
    elem.scroll({
      top: avbSpace * currentScrollPercentage,
      behavior: "instant"
    });
  }
  if ($$props.carta === void 0 && $$bindings.carta && carta !== void 0) $$bindings.carta(carta);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0) $$bindings.theme(theme);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0) $$bindings.mode(mode);
  if ($$props.scroll === void 0 && $$bindings.scroll && scroll !== void 0) $$bindings.scroll(scroll);
  if ($$props.disableToolbar === void 0 && $$bindings.disableToolbar && disableToolbar !== void 0) $$bindings.disableToolbar(disableToolbar);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.textarea === void 0 && $$bindings.textarea && textarea !== void 0) $$bindings.textarea(textarea);
  if ($$props.selectedTab === void 0 && $$bindings.selectedTab && selectedTab !== void 0) $$bindings.selectedTab(selectedTab);
  if ($$props.labels === void 0 && $$bindings.labels && userLabels !== void 0) $$bindings.labels(userLabels);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        windowMode = mode === "auto" ? "tabs" : mode;
      }
    }
    {
      {
        resizeInput && resizeInput();
      }
    }
    {
      {
        loadScrollPosition(selectedTab);
      }
    }
    $$rendered = `  <div class="${"carta-editor carta-theme__" + escape(theme, true) + " svelte-11jlii3"}"${add_attribute("this", editorElem, 0)}>${!disableToolbar ? `${validate_component(Toolbar, "Toolbar").$$render(
      $$result,
      {
        carta,
        labels,
        mode: windowMode,
        tab: selectedTab
      },
      {
        tab: ($$value) => {
          selectedTab = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} <div class="carta-wrapper"><div class="${"carta-container mode-" + escape(windowMode, true) + " svelte-11jlii3"}">${windowMode == "split" || selectedTab == "write" ? `${validate_component(Input$1, "Input").$$render(
      $$result,
      {
        carta,
        placeholder,
        props: textarea,
        value,
        resize: resizeInput,
        elem: inputElem
      },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        },
        resize: ($$value) => {
          resizeInput = $$value;
          $$settled = false;
        },
        elem: ($$value) => {
          inputElem = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return ` ${``}`;
        }
      }
    )}` : ``} ${windowMode == "split" || selectedTab == "preview" ? `${validate_component(Renderer, "Renderer").$$render(
      $$result,
      { carta, value, elem: rendererElem },
      {
        elem: ($$value) => {
          rendererElem = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return ` ${``}`;
        }
      }
    )}` : ``}</div></div>   ${``} </div>`;
  } while (!$$settled);
  return $$rendered;
});
function getOptions(el) {
  return Array.from(el.querySelectorAll('[role="option"]:not([data-disabled])')).filter((el2) => isHTMLElement(el2));
}
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function createClickOutsideIgnore(meltId) {
  return (e) => {
    const target = e.target;
    const triggerEl = getElementByMeltId(meltId);
    if (!triggerEl || !isElement(target))
      return false;
    const id = triggerEl.id;
    if (isHTMLLabelElement(target) && id === target.htmlFor) {
      return true;
    }
    if (target.closest(`label[for="${id}"]`)) {
      return true;
    }
    return false;
  };
}
const INTERACTION_KEYS = [kbd.ARROW_LEFT, kbd.ESCAPE, kbd.ARROW_RIGHT, kbd.SHIFT, kbd.CAPS_LOCK, kbd.CONTROL, kbd.ALT, kbd.META, kbd.ENTER, kbd.F1, kbd.F2, kbd.F3, kbd.F4, kbd.F5, kbd.F6, kbd.F7, kbd.F8, kbd.F9, kbd.F10, kbd.F11, kbd.F12];
const defaults$2 = {
  positioning: {
    placement: "bottom",
    sameWidth: true
  },
  scrollAlignment: "nearest",
  loop: true,
  defaultOpen: false,
  closeOnOutsideClick: true,
  preventScroll: true,
  closeOnEscape: true,
  forceVisible: false,
  portal: void 0,
  builder: "listbox",
  disabled: false,
  required: false,
  name: void 0,
  typeahead: true,
  highlightOnHover: true,
  onOutsideClick: void 0
};
const listboxIdParts = ["trigger", "menu", "label"];
function createListbox(props) {
  const withDefaults = { ...defaults$2, ...props };
  const activeTrigger = withGet(writable(null));
  const highlightedItem = withGet(writable(null));
  const selectedWritable = withDefaults.selected ?? writable(withDefaults.defaultSelected);
  const selected = overridable(selectedWritable, withDefaults?.onSelectedChange);
  const highlighted = derived(highlightedItem, ($highlightedItem) => $highlightedItem ? getOptionProps($highlightedItem) : void 0);
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const options = toWritableStores({
    ...omit(withDefaults, "open", "defaultOpen", "builder", "ids"),
    multiple: withDefaults.multiple ?? false
  });
  const { scrollAlignment, loop, closeOnOutsideClick, closeOnEscape, preventScroll, portal, forceVisible, positioning, multiple, arrowSize, disabled, required, typeahead, name: nameProp, highlightOnHover, onOutsideClick } = options;
  const { name: name2, selector: selector2 } = createElHelpers(withDefaults.builder);
  const ids = toWritableStores({ ...generateIds(listboxIdParts), ...withDefaults.ids });
  const { handleTypeaheadSearch } = createTypeaheadSearch({
    onMatch: (element) => {
      highlightedItem.set(element);
      element.scrollIntoView({ block: scrollAlignment.get() });
    },
    getCurrentItem() {
      return highlightedItem.get();
    }
  });
  function getOptionProps(el) {
    const value = el.getAttribute("data-value");
    const label2 = el.getAttribute("data-label");
    const disabled2 = el.hasAttribute("data-disabled");
    return {
      value: value ? JSON.parse(value) : value,
      label: label2 ?? el.textContent ?? void 0,
      disabled: disabled2 ? true : false
    };
  }
  const setOption = (newOption) => {
    selected.update(($option) => {
      const $multiple = multiple.get();
      if ($multiple) {
        const optionArr = Array.isArray($option) ? [...$option] : [];
        return toggle(newOption, optionArr, (itemA, itemB) => dequal(itemA.value, itemB.value));
      }
      return newOption;
    });
  };
  function selectItem(item) {
    const props2 = getOptionProps(item);
    setOption(props2);
  }
  async function openMenu() {
    open.set(true);
    const triggerEl = document.getElementById(ids.trigger.get());
    if (!triggerEl)
      return;
    if (triggerEl !== activeTrigger.get())
      activeTrigger.set(triggerEl);
    await tick();
    const menuElement = document.getElementById(ids.menu.get());
    if (!isHTMLElement(menuElement))
      return;
    const selectedItem = menuElement.querySelector("[aria-selected=true]");
    if (!isHTMLElement(selectedItem))
      return;
    highlightedItem.set(selectedItem);
  }
  function closeMenu() {
    open.set(false);
    highlightedItem.set(null);
  }
  const isVisible = derivedVisible({ open, forceVisible, activeTrigger });
  const isSelected = derived([selected], ([$selected]) => {
    return (value) => {
      if (Array.isArray($selected)) {
        return $selected.some((o) => dequal(o.value, value));
      }
      if (isObject(value)) {
        return dequal($selected?.value, stripValues(value, void 0));
      }
      return dequal($selected?.value, value);
    };
  });
  const isHighlighted = derived([highlighted], ([$value]) => {
    return (item) => {
      return dequal($value?.value, item);
    };
  });
  const trigger = makeElement(name2("trigger"), {
    stores: [open, highlightedItem, disabled, ids.menu, ids.trigger, ids.label],
    returned: ([$open, $highlightedItem, $disabled, $menuId, $triggerId, $labelId]) => {
      return {
        "aria-activedescendant": $highlightedItem?.id,
        "aria-autocomplete": "list",
        "aria-controls": $menuId,
        "aria-expanded": $open,
        "aria-labelledby": $labelId,
        // autocomplete: 'off',
        id: $triggerId,
        role: "combobox",
        disabled: disabledAttr($disabled),
        type: withDefaults.builder === "select" ? "button" : void 0
      };
    },
    action: (node) => {
      const isInput = isHTMLInputElement(node);
      const unsubscribe = executeCallbacks(
        addMeltEventListener(node, "click", () => {
          node.focus();
          const $open = open.get();
          if ($open) {
            closeMenu();
          } else {
            openMenu();
          }
        }),
        // Handle all input key events including typing, meta, and navigation.
        addMeltEventListener(node, "keydown", (e) => {
          const $open = open.get();
          if (!$open) {
            if (INTERACTION_KEYS.includes(e.key)) {
              return;
            }
            if (e.key === kbd.TAB) {
              return;
            }
            if (e.key === kbd.BACKSPACE && isInput && node.value === "") {
              return;
            }
            if (e.key === kbd.SPACE && isHTMLButtonElement(node)) {
              return;
            }
            openMenu();
            tick().then(() => {
              const $selectedItem = selected.get();
              if ($selectedItem)
                return;
              const menuEl = document.getElementById(ids.menu.get());
              if (!isHTMLElement(menuEl))
                return;
              const enabledItems = Array.from(menuEl.querySelectorAll(`${selector2("item")}:not([data-disabled]):not([data-hidden])`)).filter((item) => isHTMLElement(item));
              if (!enabledItems.length)
                return;
              if (e.key === kbd.ARROW_DOWN) {
                highlightedItem.set(enabledItems[0]);
                enabledItems[0].scrollIntoView({ block: scrollAlignment.get() });
              } else if (e.key === kbd.ARROW_UP) {
                highlightedItem.set(last(enabledItems));
                last(enabledItems).scrollIntoView({ block: scrollAlignment.get() });
              }
            });
          }
          if (e.key === kbd.TAB) {
            closeMenu();
            return;
          }
          if (e.key === kbd.ENTER && !e.isComposing || e.key === kbd.SPACE && isHTMLButtonElement(node)) {
            e.preventDefault();
            const $highlightedItem = highlightedItem.get();
            if ($highlightedItem) {
              selectItem($highlightedItem);
            }
            if (!multiple.get()) {
              closeMenu();
            }
          }
          if (e.key === kbd.ARROW_UP && e.altKey) {
            closeMenu();
          }
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.preventDefault();
            const menuElement = document.getElementById(ids.menu.get());
            if (!isHTMLElement(menuElement))
              return;
            const itemElements = getOptions(menuElement);
            if (!itemElements.length)
              return;
            const candidateNodes = itemElements.filter((opt) => !isElementDisabled(opt) && opt.dataset.hidden === void 0);
            const $currentItem = highlightedItem.get();
            const currentIndex = $currentItem ? candidateNodes.indexOf($currentItem) : -1;
            const $loop = loop.get();
            const $scrollAlignment = scrollAlignment.get();
            let nextItem;
            switch (e.key) {
              case kbd.ARROW_DOWN:
                nextItem = next(candidateNodes, currentIndex, $loop);
                break;
              case kbd.ARROW_UP:
                nextItem = prev(candidateNodes, currentIndex, $loop);
                break;
              case kbd.PAGE_DOWN:
                nextItem = forward(candidateNodes, currentIndex, 10, $loop);
                break;
              case kbd.PAGE_UP:
                nextItem = back(candidateNodes, currentIndex, 10, $loop);
                break;
              case kbd.HOME:
                nextItem = candidateNodes[0];
                break;
              case kbd.END:
                nextItem = last(candidateNodes);
                break;
              default:
                return;
            }
            highlightedItem.set(nextItem);
            nextItem?.scrollIntoView({ block: $scrollAlignment });
          } else if (typeahead.get()) {
            const menuEl = document.getElementById(ids.menu.get());
            if (!isHTMLElement(menuEl))
              return;
            handleTypeaheadSearch(e.key, getOptions(menuEl));
          }
        })
      );
      let unsubEscapeKeydown = noop;
      const escape2 = useEscapeKeydown(node, {
        handler: closeMenu,
        enabled: derived([open, closeOnEscape], ([$open, $closeOnEscape]) => {
          return $open && $closeOnEscape;
        })
      });
      if (escape2 && escape2.destroy) {
        unsubEscapeKeydown = escape2.destroy;
      }
      return {
        destroy() {
          unsubscribe();
          unsubEscapeKeydown();
        }
      };
    }
  });
  const menu = makeElement(name2("menu"), {
    stores: [isVisible, ids.menu],
    returned: ([$isVisible, $menuId]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        id: $menuId,
        role: "listbox",
        style: styleToString({ display: $isVisible ? void 0 : "none" })
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubscribe = executeCallbacks(
        // Bind the popper portal to the input element.
        effect([isVisible, portal, closeOnOutsideClick, positioning, activeTrigger], ([$isVisible, $portal, $closeOnOutsideClick, $positioning, $activeTrigger]) => {
          unsubPopper();
          if (!$isVisible || !$activeTrigger)
            return;
          tick().then(() => {
            unsubPopper();
            const ignoreHandler = createClickOutsideIgnore(ids.trigger.get());
            unsubPopper = usePopper(node, {
              anchorElement: $activeTrigger,
              open,
              options: {
                floating: $positioning,
                focusTrap: null,
                modal: {
                  closeOnInteractOutside: $closeOnOutsideClick,
                  onClose: closeMenu,
                  open: $isVisible,
                  shouldCloseOnInteractOutside: (e) => {
                    onOutsideClick.get()?.(e);
                    if (e.defaultPrevented)
                      return false;
                    const target = e.target;
                    if (!isElement(target))
                      return false;
                    if (target === $activeTrigger || $activeTrigger.contains(target)) {
                      return false;
                    }
                    if (ignoreHandler(e))
                      return false;
                    return true;
                  }
                },
                escapeKeydown: null,
                portal: getPortalDestination(node, $portal)
              }
            }).destroy;
          });
        })
      );
      return {
        destroy: () => {
          unsubscribe();
          unsubPopper();
        }
      };
    }
  });
  const { elements: { root: labelBuilder } } = createLabel();
  const { action: labelAction } = get_store_value(labelBuilder);
  const label = makeElement(name2("label"), {
    stores: [ids.label, ids.trigger],
    returned: ([$labelId, $triggerId]) => {
      return {
        id: $labelId,
        for: $triggerId
      };
    },
    action: labelAction
  });
  const option = makeElement(name2("option"), {
    stores: [isSelected],
    returned: ([$isSelected]) => (props2) => {
      const selected2 = $isSelected(props2.value);
      return {
        "data-value": JSON.stringify(props2.value),
        "data-label": props2.label,
        "data-disabled": disabledAttr(props2.disabled),
        "aria-disabled": props2.disabled ? true : void 0,
        "aria-selected": selected2,
        "data-selected": selected2 ? "" : void 0,
        id: generateId(),
        role: "option"
      };
    },
    action: (node) => {
      const unsubscribe = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        if (isElementDisabled(node)) {
          e.preventDefault();
          return;
        }
        selectItem(node);
        if (!multiple.get()) {
          closeMenu();
        }
      }), effect(highlightOnHover, ($highlightOnHover) => {
        if (!$highlightOnHover)
          return;
        const unsub = executeCallbacks(addMeltEventListener(node, "mouseover", () => {
          highlightedItem.set(node);
        }), addMeltEventListener(node, "mouseleave", () => {
          highlightedItem.set(null);
        }));
        return unsub;
      }));
      return { destroy: unsubscribe };
    }
  });
  const group = makeElement(name2("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = makeElement(name2("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const hiddenInput = createHiddenInput({
    value: derived([selected], ([$selected]) => {
      const value = Array.isArray($selected) ? $selected.map((o) => o.value) : $selected?.value;
      return typeof value === "string" ? value : JSON.stringify(value);
    }),
    name: readonly(nameProp),
    required,
    prefix: withDefaults.builder
  });
  const arrow = makeElement(name2("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  safeOnMount(() => {
    if (!isBrowser)
      return;
    const menuEl = document.getElementById(ids.menu.get());
    const triggerEl = document.getElementById(ids.trigger.get());
    if (triggerEl) {
      activeTrigger.set(triggerEl);
    }
    if (!menuEl)
      return;
    const selectedEl = menuEl.querySelector("[data-selected]");
    if (!isHTMLElement(selectedEl))
      return;
  });
  effect([highlightedItem], ([$highlightedItem]) => {
    if (!isBrowser)
      return;
    const menuElement = document.getElementById(ids.menu.get());
    if (!isHTMLElement(menuElement))
      return;
    getOptions(menuElement).forEach((node) => {
      if (node === $highlightedItem) {
        addHighlight(node);
      } else {
        removeHighlight(node);
      }
    });
  });
  effect([open], ([$open]) => {
    if (!isBrowser)
      return;
    let unsubScroll = noop;
    if (preventScroll.get() && $open) {
      unsubScroll = removeScroll();
    }
    return () => {
      unsubScroll();
    };
  });
  return {
    ids,
    elements: {
      trigger,
      group,
      option,
      menu,
      groupLabel,
      label,
      hiddenInput,
      arrow
    },
    states: {
      open,
      selected,
      highlighted,
      highlightedItem
    },
    helpers: {
      isSelected,
      isHighlighted,
      closeMenu
    },
    options
  };
}
const defaults$1 = {
  orientation: "vertical",
  loop: true,
  disabled: false,
  required: false,
  defaultValue: void 0
};
const prefix = "radio-group";
const { name: name$1, selector: selector$1 } = createElHelpers(prefix);
function createRadioGroup(props) {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores(omit(withDefaults, "value"));
  const { disabled, required, loop, orientation } = options;
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  safeOnMount(() => {
    return addEventListener(document, "focus", (e) => {
      const focusedItem = e.target;
      if (!isHTMLElement(focusedItem))
        return;
    });
  });
  let hasActiveTabIndex = false;
  effect(value, ($value) => {
    if ($value === void 0) {
      hasActiveTabIndex = false;
    } else {
      hasActiveTabIndex = true;
    }
  });
  const selectItem = (item2) => {
    const disabled2 = item2.dataset.disabled === "true";
    const itemValue = item2.dataset.value;
    if (disabled2 || itemValue === void 0)
      return;
    value.set(itemValue);
  };
  const root = makeElement(name$1(), {
    stores: [required, orientation],
    returned: ([$required, $orientation]) => {
      return {
        role: "radiogroup",
        "aria-required": $required,
        "data-orientation": $orientation
      };
    }
  });
  const item = makeElement(name$1("item"), {
    stores: [value, orientation, disabled],
    returned: ([$value, $orientation, $disabled]) => {
      return (props2) => {
        const itemValue = typeof props2 === "string" ? props2 : props2.value;
        const argDisabled = typeof props2 === "string" ? false : !!props2.disabled;
        const disabled2 = $disabled || argDisabled;
        const checked = $value === itemValue;
        const tabindex = !hasActiveTabIndex ? 0 : checked ? 0 : -1;
        hasActiveTabIndex = true;
        return {
          disabled: disabled2,
          "data-value": itemValue,
          "data-orientation": $orientation,
          "data-disabled": disabledAttr(disabled2),
          "data-state": checked ? "checked" : "unchecked",
          "aria-checked": checked,
          type: "button",
          role: "radio",
          tabindex
        };
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        selectItem(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        const el = e.currentTarget;
        if (!isHTMLElement(el))
          return;
        const root2 = el.closest(selector$1());
        if (!isHTMLElement(root2))
          return;
        const items = Array.from(root2.querySelectorAll(selector$1("item"))).filter((el2) => isHTMLElement(el2) && !el2.hasAttribute("data-disabled"));
        const currentIndex = items.indexOf(el);
        const dir = getElemDirection(root2);
        const { nextKey, prevKey } = getDirectionalKeys(dir, orientation.get());
        const $loop = loop.get();
        let itemToFocus = null;
        if (e.key === nextKey) {
          e.preventDefault();
          const nextIndex = currentIndex + 1;
          if (nextIndex >= items.length && $loop) {
            itemToFocus = items[0];
          } else {
            itemToFocus = items[nextIndex];
          }
        } else if (e.key === prevKey) {
          e.preventDefault();
          const prevIndex = currentIndex - 1;
          if (prevIndex < 0 && $loop) {
            itemToFocus = items[items.length - 1];
          } else {
            itemToFocus = items[prevIndex];
          }
        } else if (e.key === kbd.HOME) {
          e.preventDefault();
          itemToFocus = items[0];
        } else if (e.key === kbd.END) {
          e.preventDefault();
          itemToFocus = items[items.length - 1];
        }
        if (itemToFocus) {
          itemToFocus.focus();
          selectItem(itemToFocus);
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const hiddenInput = createHiddenInput({
    value,
    disabled,
    required
  });
  const isChecked = derived(value, ($value) => {
    return (itemValue) => {
      return $value === itemValue;
    };
  });
  return {
    elements: {
      root,
      item,
      hiddenInput
    },
    states: {
      value
    },
    helpers: {
      isChecked
    },
    options
  };
}
function createSelect(props) {
  const listbox = createListbox({ ...props, builder: "select" });
  const selectedLabel = derived(listbox.states.selected, ($selected) => {
    if (Array.isArray($selected)) {
      return $selected.map((o) => o.label).join(", ");
    }
    return $selected?.label ?? "";
  });
  return {
    ...listbox,
    elements: {
      ...listbox.elements
    },
    states: {
      ...listbox.states,
      selectedLabel
    }
  };
}
const defaults = {
  type: "single",
  orientation: "horizontal",
  loop: true,
  rovingFocus: true,
  disabled: false,
  defaultValue: ""
};
const { name, selector } = createElHelpers("toggle-group");
const createToggleGroup = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(omit(withDefaults, "value"));
  const { type, orientation, loop, rovingFocus, disabled } = options;
  const defaultValue = withDefaults.defaultValue ? withDefaults.defaultValue : withDefaults.type === "single" ? void 0 : [];
  const valueWritable = withDefaults.value ?? writable(defaultValue);
  const value = overridable(valueWritable, withDefaults?.onValueChange);
  const root = makeElement(name(), {
    stores: orientation,
    returned: ($orientation) => {
      return {
        role: "group",
        "data-orientation": $orientation
      };
    }
  });
  const item = makeElement(name("item"), {
    stores: [value, disabled, orientation, type],
    returned: ([$value, $disabled, $orientation, $type]) => {
      return (props2) => {
        const itemValue = typeof props2 === "string" ? props2 : props2.value;
        const argDisabled = typeof props2 === "string" ? false : !!props2.disabled;
        const disabled2 = $disabled || argDisabled;
        const pressed = Array.isArray($value) ? $value.includes(itemValue) : $value === itemValue;
        const isSingle = $type === "single";
        const isMultiple = $type === "multiple" || $type === void 0;
        return {
          disabled: disabledAttr(disabled2),
          pressed,
          "data-orientation": $orientation,
          "data-disabled": disabledAttr(disabled2),
          "data-state": pressed ? "on" : "off",
          "data-value": itemValue,
          "aria-pressed": isMultiple ? pressed : void 0,
          "aria-checked": isSingle ? pressed : void 0,
          type: "button",
          role: isSingle ? "radio" : void 0,
          tabindex: pressed ? 0 : -1
        };
      };
    },
    action: (node) => {
      let unsub = noop;
      const parentGroup = node.closest(selector());
      if (!isHTMLElement(parentGroup))
        return {};
      const items = Array.from(parentGroup.querySelectorAll(selector("item")));
      const $value = value.get();
      const anyPressed = Array.isArray($value) ? $value.length > 0 : $value ? true : false;
      if (!anyPressed && items[0] === node) {
        node.tabIndex = 0;
      }
      function getNodeProps() {
        const itemValue = node.dataset.value;
        const disabled2 = node.dataset.disabled === "true";
        return { value: itemValue, disabled: disabled2 };
      }
      function handleValueUpdate() {
        const { value: itemValue, disabled: disabled2 } = getNodeProps();
        if (itemValue === void 0 || disabled2)
          return;
        value.update(($value2) => {
          if (Array.isArray($value2)) {
            if ($value2.includes(itemValue)) {
              return $value2.filter((i) => i !== itemValue);
            }
            return [...$value2, itemValue];
          }
          return $value2 === itemValue ? void 0 : itemValue;
        });
      }
      unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        handleValueUpdate();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
          e.preventDefault();
          handleValueUpdate();
          return;
        }
        if (!rovingFocus.get())
          return;
        const el = e.currentTarget;
        if (!isHTMLElement(el))
          return;
        const root2 = el.closest(selector());
        if (!isHTMLElement(root2))
          return;
        const items2 = Array.from(root2.querySelectorAll(selector("item") + ":not([data-disabled])")).filter((item2) => isHTMLElement(item2));
        const currentIndex = items2.indexOf(el);
        const dir = getElemDirection(el);
        const $orientation = orientation.get();
        const nextKey = {
          horizontal: dir === "rtl" ? kbd.ARROW_LEFT : kbd.ARROW_RIGHT,
          vertical: kbd.ARROW_DOWN
        }[$orientation ?? "horizontal"];
        const prevKey = {
          horizontal: dir === "rtl" ? kbd.ARROW_RIGHT : kbd.ARROW_LEFT,
          vertical: kbd.ARROW_UP
        }[$orientation ?? "horizontal"];
        const $loop = loop.get();
        if (e.key === nextKey) {
          e.preventDefault();
          const nextIndex = currentIndex + 1;
          if (nextIndex >= items2.length && $loop) {
            handleRovingFocus(items2[0]);
          } else {
            handleRovingFocus(items2[nextIndex]);
          }
        } else if (e.key === prevKey) {
          e.preventDefault();
          const prevIndex = currentIndex - 1;
          if (prevIndex < 0 && $loop) {
            handleRovingFocus(items2[items2.length - 1]);
          } else {
            handleRovingFocus(items2[prevIndex]);
          }
        } else if (e.key === kbd.HOME) {
          e.preventDefault();
          handleRovingFocus(items2[0]);
        } else if (e.key === kbd.END) {
          e.preventDefault();
          handleRovingFocus(items2[items2.length - 1]);
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const isPressed = derived(value, ($value) => {
    return (itemValue) => {
      return Array.isArray($value) ? $value.includes(itemValue) : $value === itemValue;
    };
  });
  return {
    elements: {
      root,
      item
    },
    states: {
      value
    },
    helpers: {
      isPressed
    },
    options
  };
};
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
function getRadioGroupData() {
  const NAME = "radio-group";
  const ITEM_NAME = "radio-group-item";
  const PARTS = ["root", "item", "input", "item-indicator"];
  return {
    NAME,
    ITEM_NAME,
    PARTS
  };
}
function setCtx$2(props) {
  const { NAME, PARTS } = getRadioGroupData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const radioGroup = { ...createRadioGroup(removeUndefined(props)), getAttrs };
  setContext(NAME, radioGroup);
  return {
    ...radioGroup,
    updateOption: getOptionUpdater(radioGroup.options)
  };
}
function getCtx$2() {
  const { NAME } = getRadioGroupData();
  return getContext(NAME);
}
function setItemCtx$1(value) {
  const { ITEM_NAME } = getRadioGroupData();
  const radioGroup = { ...getCtx$2(), value };
  setContext(ITEM_NAME, radioGroup);
  return radioGroup;
}
function getRadioIndicator() {
  const { ITEM_NAME } = getRadioGroupData();
  return getContext(ITEM_NAME);
}
const Radio_group$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "required",
    "disabled",
    "value",
    "onValueChange",
    "loop",
    "orientation",
    "asChild",
    "el"
  ]);
  let $root, $$unsubscribe_root;
  let { required = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { orientation = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs } = setCtx$2({
    required,
    disabled,
    defaultValue: value,
    loop,
    orientation,
    onValueChange: ({ next: next2 }) => {
      if (value !== next2) {
        onValueChange?.(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  const attrs = getAttrs("root");
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  value !== void 0 && localValue.set(value);
  {
    updateOption("required", required);
  }
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("orientation", orientation);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Radio_group_item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, getAttrs } = setItemCtx$1(value);
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  createDispatcher();
  const attrs = getAttrs("item");
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $item({ value, disabled });
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread(
    [
      escape_object(paraglide_sveltekit_translate_attribute_pass_handle_attributes(
        {
          ...builder,
          "type": `button`,
          ...$$restProps
        },
        [{ attribute_name: "formaction" }]
      ))
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Radio_group_item_indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let checked;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $isChecked, $$unsubscribe_isChecked;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { helpers: { isChecked }, value, getAttrs } = getRadioIndicator();
  $$unsubscribe_isChecked = subscribe(isChecked, (value2) => $isChecked = value2);
  const attrs = getAttrs("item-indicator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  checked = $isChecked(value);
  $$unsubscribe_isChecked();
  return `${asChild ? `${slots.default ? slots.default({ checked, attrs }) : ``}` : `<div${spread([escape_object(attrs), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${checked ? `${slots.default ? slots.default({ checked, attrs }) : ``}` : ``}</div>`}`;
});
function getSelectData() {
  const NAME = "select";
  const GROUP_NAME = "select-group";
  const ITEM_NAME = "select-item";
  const PARTS = [
    "arrow",
    "content",
    "group",
    "item",
    "indicator",
    "input",
    "label",
    "trigger",
    "value"
  ];
  return {
    NAME,
    GROUP_NAME,
    ITEM_NAME,
    PARTS
  };
}
function getCtx$1() {
  const { NAME } = getSelectData();
  return getContext(NAME);
}
function setCtx$1(props) {
  const { NAME, PARTS } = getSelectData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const select = {
    ...createSelect({ ...removeUndefined(props), forceVisible: true }),
    getAttrs
  };
  setContext(NAME, select);
  return {
    ...select,
    updateOption: getOptionUpdater(select.options)
  };
}
function setGroupCtx() {
  const { GROUP_NAME } = getSelectData();
  const id = generateId$1();
  setContext(GROUP_NAME, id);
  const { elements: { group }, getAttrs } = getCtx$1();
  return { group, id, getAttrs };
}
function setItemCtx(value) {
  const { ITEM_NAME } = getSelectData();
  const select = getCtx$1();
  setContext(ITEM_NAME, value);
  return select;
}
function getGroupLabel() {
  const { GROUP_NAME } = getSelectData();
  const id = getContext(GROUP_NAME);
  const { elements: { groupLabel }, getAttrs } = getCtx$1();
  return { groupLabel, id, getAttrs };
}
function getItemIndicator() {
  const { ITEM_NAME } = getSelectData();
  const { helpers: { isSelected }, getAttrs } = getCtx$1();
  const value = getContext(ITEM_NAME);
  return {
    value,
    isSelected,
    getAttrs
  };
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center",
    sameWidth: true
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx$1();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { required = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  let { preventScroll = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = void 0 } = $$props;
  let { portal = void 0 } = $$props;
  let { name: name2 = void 0 } = $$props;
  let { multiple = false } = $$props;
  let { selected = void 0 } = $$props;
  let { onSelectedChange = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { items = [] } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen, selected: localSelected }, updateOption, ids } = setCtx$1({
    required,
    disabled,
    preventScroll,
    loop,
    closeOnEscape,
    closeOnOutsideClick,
    portal,
    name: name2,
    onOutsideClick,
    multiple,
    forceVisible: true,
    defaultSelected: Array.isArray(selected) ? [...selected] : selected,
    defaultOpen: open,
    onSelectedChange: ({ next: next2 }) => {
      if (Array.isArray(next2)) {
        if (!Array.isArray(selected) || !arraysAreEqual(selected, next2)) {
          onSelectedChange?.(next2);
          selected = next2;
          return next2;
        }
        return next2;
      }
      if (selected !== next2) {
        onSelectedChange?.(next2);
        selected = next2;
      }
      return next2;
    },
    onOpenChange: ({ next: next2 }) => {
      if (open !== next2) {
        onOpenChange?.(next2);
        open = next2;
      }
      return next2;
    },
    items
  });
  const idValues = derived([ids.menu, ids.trigger, ids.label], ([$menuId, $triggerId, $labelId]) => ({
    menu: $menuId,
    trigger: $triggerId,
    label: $labelId
  }));
  $$unsubscribe_idValues = subscribe(idValues, (value) => $idValues = value);
  if ($$props.required === void 0 && $$bindings.required && required !== void 0) $$bindings.required(required);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0) $$bindings.preventScroll(preventScroll);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0) $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0) $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0) $$bindings.portal(portal);
  if ($$props.name === void 0 && $$bindings.name && name2 !== void 0) $$bindings.name(name2);
  if ($$props.multiple === void 0 && $$bindings.multiple && multiple !== void 0) $$bindings.multiple(multiple);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0) $$bindings.selected(selected);
  if ($$props.onSelectedChange === void 0 && $$bindings.onSelectedChange && onSelectedChange !== void 0) $$bindings.onSelectedChange(onSelectedChange);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0) $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0) $$bindings.onOpenChange(onOpenChange);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0) $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  selected !== void 0 && localSelected.set(Array.isArray(selected) ? [...selected] : selected);
  {
    updateOption("required", required);
  }
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("name", name2);
  }
  {
    updateOption("multiple", multiple);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Select_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let $open, $$unsubscribe_open;
  let $menu, $$unsubscribe_menu;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { side = "bottom" } = $$props;
  let { align = "center" } = $$props;
  let { sideOffset = 0 } = $$props;
  let { alignOffset = 0 } = $$props;
  let { collisionPadding = 8 } = $$props;
  let { avoidCollisions = true } = $$props;
  let { collisionBoundary = void 0 } = $$props;
  let { sameWidth = true } = $$props;
  let { fitViewport = false } = $$props;
  let { strategy = "absolute" } = $$props;
  let { overlap = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { menu }, states: { open }, ids, getAttrs } = getCtx$1();
  $$unsubscribe_menu = subscribe(menu, (value) => $menu = value);
  $$unsubscribe_open = subscribe(open, (value) => $open = value);
  createDispatcher();
  const attrs = getAttrs("content");
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
  builder = $menu;
  {
    Object.assign(builder, attrs);
  }
  {
    if ($open) {
      updatePositioning({
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
  }
  $$unsubscribe_open();
  $$unsubscribe_menu();
  return ` ${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Select_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $group, $$unsubscribe_group;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { group, id, getAttrs } = setGroupCtx();
  $$unsubscribe_group = subscribe(group, (value) => $group = value);
  const attrs = getAttrs("group");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $group(id);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_group();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Select_input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let attrs;
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $hiddenInput, $$unsubscribe_hiddenInput;
  let $disabled, $$unsubscribe_disabled;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { hiddenInput }, options: { disabled }, getAttrs } = getCtx$1();
  $$unsubscribe_hiddenInput = subscribe(hiddenInput, (value) => $hiddenInput = value);
  $$unsubscribe_disabled = subscribe(disabled, (value) => $disabled = value);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  attrs = {
    ...getAttrs("input"),
    disabled: $disabled ? true : void 0
  };
  builder = $hiddenInput;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_hiddenInput();
  $$unsubscribe_disabled();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<input${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>`}`;
});
const Select_item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let isSelected;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "label", "asChild", "el"]);
  let $isSelectedStore, $$unsubscribe_isSelectedStore;
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = void 0 } = $$props;
  let { label = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { option: item }, helpers: { isSelected: isSelectedStore }, getAttrs } = setItemCtx(value);
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  $$unsubscribe_isSelectedStore = subscribe(isSelectedStore, (value2) => $isSelectedStore = value2);
  createDispatcher();
  const attrs = getAttrs("item");
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $item({ value, disabled, label });
  {
    Object.assign(builder, attrs);
  }
  isSelected = $isSelectedStore(value);
  $$unsubscribe_isSelectedStore();
  $$unsubscribe_item();
  return ` ${asChild ? `${slots.default ? slots.default({ builder, isSelected }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder, isSelected }) : ` ${escape(label || value)} `}</div>`}`;
});
const Select_item_indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $isSelected, $$unsubscribe_isSelected;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { isSelected, value, getAttrs } = getItemIndicator();
  $$unsubscribe_isSelected = subscribe(isSelected, (value2) => $isSelected = value2);
  const attrs = getAttrs("indicator");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  $$unsubscribe_isSelected();
  return `${asChild ? `${slots.default ? slots.default({ attrs, isSelected: $isSelected(value) }) : ``}` : `<div${spread([escape_object($$restProps), escape_object(attrs)], {})}${add_attribute("this", el, 0)}>${$isSelected(value) ? `${slots.default ? slots.default({ attrs, isSelected: $isSelected(value) }) : ``}` : ``}</div>`}`;
});
const Select_label$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $groupLabel, $$unsubscribe_groupLabel;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { ids, getAttrs } = getCtx$1();
  const { groupLabel, id: groupId } = getGroupLabel();
  $$unsubscribe_groupLabel = subscribe(groupLabel, (value) => $groupLabel = value);
  const attrs = getAttrs("label");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.label.set(id);
    }
  }
  builder = $groupLabel(groupId);
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_groupLabel();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Select_trigger$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, ids, getAttrs } = getCtx$1();
  $$unsubscribe_trigger = subscribe(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0) $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  {
    if (id) {
      ids.trigger.set(id);
    }
  }
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread(
    [
      escape_object(paraglide_sveltekit_translate_attribute_pass_handle_attributes(
        {
          ...builder,
          "type": `button`,
          ...$$restProps
        },
        [{ attribute_name: "formaction" }]
      ))
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Select_value = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let label;
  let $$restProps = compute_rest_props($$props, ["placeholder", "asChild", "el"]);
  let $selectedLabel, $$unsubscribe_selectedLabel;
  let { placeholder = "" } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { states: { selectedLabel }, getAttrs } = getCtx$1();
  $$unsubscribe_selectedLabel = subscribe(selectedLabel, (value) => $selectedLabel = value);
  const attrs = getAttrs("value");
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0) $$bindings.placeholder(placeholder);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  label = $selectedLabel;
  $$unsubscribe_selectedLabel();
  return `${asChild ? `${slots.default ? slots.default({ label, attrs }) : ``}` : `<span${spread(
    [
      escape_object($$restProps),
      escape_object(attrs),
      {
        "data-placeholder": escape_attribute_value(!label ? "" : void 0)
      }
    ],
    {}
  )}${add_attribute("this", el, 0)}>${escape(label || placeholder)}</span>`}`;
});
function getToggleGroupData() {
  const NAME = "toggle-group";
  const PARTS = ["root", "item"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getToggleGroupData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const toggleGroup = { ...createToggleGroup(removeUndefined(props)), getAttrs };
  setContext(NAME, toggleGroup);
  return {
    ...toggleGroup,
    updateOption: getOptionUpdater(toggleGroup.options)
  };
}
function getCtx() {
  const { NAME } = getToggleGroupData();
  return getContext(NAME);
}
const Toggle_group$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["type", "disabled", "loop", "value", "orientation", "onValueChange", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { type = "single" } = $$props;
  let { disabled = void 0 } = $$props;
  let { loop = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { orientation = void 0 } = $$props;
  let { onValueChange = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, states: { value: localValue }, updateOption, getAttrs } = setCtx({
    disabled,
    type,
    defaultValue: value,
    loop,
    orientation,
    onValueChange: ({ next: next2 }) => {
      if (Array.isArray(next2)) {
        if (!Array.isArray(value) || !arraysAreEqual(value, next2)) {
          onValueChange?.(next2);
          value = next2;
          return next2;
        }
        return next2;
      }
      if (value !== next2) {
        onValueChange?.(next2);
        value = next2;
      }
      return next2;
    }
  });
  $$unsubscribe_root = subscribe(root, (value2) => $root = value2);
  const attrs = getAttrs("root");
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.loop === void 0 && $$bindings.loop && loop !== void 0) $$bindings.loop(loop);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0) $$bindings.orientation(orientation);
  if ($$props.onValueChange === void 0 && $$bindings.onValueChange && onValueChange !== void 0) $$bindings.onValueChange(onValueChange);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  value !== void 0 && localValue.set(Array.isArray(value) ? [...value] : value);
  {
    updateOption("disabled", disabled);
  }
  {
    updateOption("loop", loop);
  }
  {
    updateOption("type", type);
  }
  {
    updateOption("orientation", orientation);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Toggle_group_item$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["value", "disabled", "asChild", "el"]);
  let $item, $$unsubscribe_item;
  let { value } = $$props;
  let { disabled = false } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { item }, getAttrs } = getCtx();
  $$unsubscribe_item = subscribe(item, (value2) => $item = value2);
  createDispatcher();
  const attrs = getAttrs("item");
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0) $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0) $$bindings.el(el);
  builder = $item({ value, disabled });
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_item();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread(
    [
      escape_object(paraglide_sveltekit_translate_attribute_pass_handle_attributes({ ...builder, ...$$restProps }, [{ attribute_name: "formaction" }]))
    ],
    {}
  )}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "check," } = $$props;
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor"></path></svg>` : `<svg${spread(
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor"></path></svg>`} `;
});
const Badge = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "href", "variant"]);
  let { class: className = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { variant = "default" } = $$props;
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  return `${((tag) => {
    return tag ? `<${href ? "a" : "span"}${spread(
      [
        escape_object(`${href ? "a" : "span"}` === "button" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            href,
            "class": cn(badgeVariants({ variant, className })),
            ...$$restProps
          },
          [{ attribute_name: "formaction" }]
        ) : `${href ? "a" : "span"}` === "form" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            href,
            "class": cn(badgeVariants({ variant, className })),
            ...$$restProps
          },
          [{ attribute_name: "action" }]
        ) : `${href ? "a" : "span"}` === "a" ? paraglide_sveltekit_translate_attribute_pass_handle_attributes(
          {
            href,
            "class": cn(badgeVariants({ variant, className })),
            ...$$restProps
          },
          [
            {
              attribute_name: "href",
              lang_attribute_name: "hreflang"
            }
          ]
        ) : {
          href,
          "class": cn(badgeVariants({ variant, className })),
          ...$$restProps
        })
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "span")}`;
});
function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
  };
}
const Textarea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "readonly"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  let { readonly: readonly2 = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.readonly === void 0 && $$bindings.readonly && readonly2 !== void 0) $$bindings.readonly(readonly2);
  return `<textarea${spread(
    [
      {
        class: escape_attribute_value(cn("border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      { readonly: readonly2 || null },
      escape_object($$restProps)
    ],
    {}
  )}>${escape(value || "")}</textarea>`;
});
const Select_label = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Select_label$1, "SelectPrimitive.Label").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("px-2 py-1.5 text-sm font-semibold", className)
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
const Select_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value", "label", "disabled"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  let { label = void 0 } = $$props;
  let { disabled = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0) $$bindings.label(label);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0) $$bindings.disabled(disabled);
  return `${validate_component(Select_item$1, "SelectPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      { value },
      { disabled },
      { label },
      {
        class: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">${validate_component(Select_item_indicator, "SelectPrimitive.ItemIndicator").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Check, "Check").$$render($$result, { class: "h-4 w-4" }, {}, {})}`;
          }
        })}</span> ${slots.default ? slots.default({}) : ` ${escape(label || value)} `}`;
      }
    }
  )}`;
});
const Select_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "class",
    "sideOffset",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig"
  ]);
  let { class: className = void 0 } = $$props;
  let { sideOffset = 4 } = $$props;
  let { inTransition = flyAndScale } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = scale } = $$props;
  let { outTransitionConfig = { start: 0.95, opacity: 0, duration: 50 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.sideOffset === void 0 && $$bindings.sideOffset && sideOffset !== void 0) $$bindings.sideOffset(sideOffset);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0) $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0) $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0) $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0) $$bindings.outTransitionConfig(outTransitionConfig);
  return `${validate_component(Select_content$1, "SelectPrimitive.Content").$$render(
    $$result,
    Object.assign(
      {},
      { inTransition },
      { inTransitionConfig },
      { outTransition },
      { outTransitionConfig },
      { sideOffset },
      {
        class: cn("relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md focus:outline-none", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<div class="w-full p-1">${slots.default ? slots.default({}) : ``}</div>`;
      }
    }
  )}`;
});
const CaretSort = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "color", "ariaLabel", "withEvents"]);
  const ctx = getContext("iconCtx") ?? {};
  let { size = ctx.size || "24" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { color = ctx.color || "currentColor" } = $$props;
  let { ariaLabel = "caret sort," } = $$props;
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor"></path></svg>` : `<svg${spread(
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
  )}><path fill-rule="evenodd" clip-rule="evenodd" d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor"></path></svg>`} `;
});
const Select_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `${validate_component(Select_trigger$1, "SelectPrimitive.Trigger").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-destructive [&>span]:line-clamp-1 data-[placeholder]:[&>span]:text-muted-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``} <div>${validate_component(CaretSort, "CaretSort").$$render($$result, { class: "h-4 w-4 opacity-50" }, {}, {})}</div>`;
      }
    }
  )}`;
});
const Root = Select;
const Group = Select_group;
const Input = Select_input;
const Value = Select_value;
const css = {
  code: '.carta-font-code{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-size:1.125rem}.carta-theme__default{--border-color:hsl(var(--muted) / 1);--selection-color:hsl(var(--muted) / 1);--focus-outline:hsl(var(--muted) / 1);--hover-color:hsl(var(--secondary) / 1);--caret-color:var(--pop);--text-color:hsl(var(--primary) / 1)}html.dark .shiki,html.dark .shiki span{color:#e5e7eb !important}',
  map: '{"version":3,"file":"MarkdownWYSIWYG.svelte","sources":["MarkdownWYSIWYG.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { math } from \\"@cartamd/plugin-math\\";\\nimport { tikz } from \\"@cartamd/plugin-tikz\\";\\nimport { Carta, MarkdownEditor } from \\"carta-md\\";\\nconst carta = new Carta({\\n  sanitizer: false,\\n  extensions: [\\n    math(),\\n    tikz({\\n      postProcessing: (html) => {\\n        return html.replaceAll(\\"#000000\\", \\"~~~\\").replaceAll(\\"#000\\", \\"~~~\\").replaceAll(\\"black\\", \\"~~~\\").replaceAll(\\"#ffffff\\", \\"#000\\").replaceAll(\\"#fff\\", \\"#000\\").replaceAll(\\"white\\", \\"#000\\").replaceAll(\\"~~~\\", \\"#fff\\");\\n      }\\n    })\\n  ],\\n  theme: \\"github-dark\\"\\n});\\nexport let value = \\"\\";\\n<\/script>\\n\\n<MarkdownEditor theme=\\"default\\" {carta} bind:value />\\n\\n<style>\\n  /* Set monospace font (Required to have the editor working correctly!) */\\n  :global(.carta-font-code) {\\n    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\"Liberation Mono\\", \\"Courier New\\", monospace;\\n    font-size: 1.125rem;\\n  }\\n\\n  /* using adaptive theme */\\n\\n  :global(.carta-theme__default) {\\n    --border-color: hsl(var(--muted) / 1);\\n    --selection-color: hsl(var(--muted) / 1);\\n    --focus-outline: hsl(var(--muted) / 1);\\n    --hover-color: hsl(var(--secondary) / 1);\\n    --caret-color: var(--pop);\\n    --text-color: hsl(var(--primary) / 1);\\n  }\\n\\n  /* Code dark mode */\\n  :global(html.dark .shiki),\\n  :global(html.dark .shiki span) {\\n    color: #e5e7eb !important;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAsBU,gBAAkB,CACxB,WAAW,CAAE,YAAY,CAAC,CAAC,cAAc,CAAC,CAAC,KAAK,CAAC,CAAC,MAAM,CAAC,CAAC,QAAQ,CAAC,CAAC,iBAAiB,CAAC,CAAC,aAAa,CAAC,CAAC,SAAS,CAC/G,SAAS,CAAE,QACb,CAIQ,qBAAuB,CAC7B,cAAc,CAAE,qBAAqB,CACrC,iBAAiB,CAAE,qBAAqB,CACxC,eAAe,CAAE,qBAAqB,CACtC,aAAa,CAAE,yBAAyB,CACxC,aAAa,CAAE,UAAU,CACzB,YAAY,CAAE,uBAChB,CAGQ,gBAAiB,CACjB,qBAAuB,CAC7B,KAAK,CAAE,OAAO,CAAC,UACjB"}'
};
const MarkdownWYSIWYG = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const carta = new Carta({
    sanitizer: false,
    extensions: [
      math(),
      tikz({
        postProcessing: (html) => {
          return html.replaceAll("#000000", "~~~").replaceAll("#000", "~~~").replaceAll("black", "~~~").replaceAll("#ffffff", "#000").replaceAll("#fff", "#000").replaceAll("white", "#000").replaceAll("~~~", "#fff");
        }
      })
    ],
    theme: "github-dark"
  });
  let { value = "" } = $$props;
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(MarkdownEditor, "MarkdownEditor").$$render(
      $$result,
      { theme: "default", carta, value },
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Toggle_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "value"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  let { value = void 0 } = $$props;
  setToggleGroupCtx({ variant, size });
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Toggle_group$1, "ToggleGroupPrimitive.Root").$$render(
      $$result,
      Object.assign(
        {},
        {
          class: cn("flex items-center gap-1", className)
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
        default: ({ builder }) => {
          return `${slots.default ? slots.default({ builder }) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const toggleVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
    },
    size: {
      default: "h-9 px-3",
      sm: "h-8 px-2",
      lg: "h-10 px-3"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const Toggle_group_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "variant", "size", "value"]);
  let { class: className = void 0 } = $$props;
  let { variant = "default" } = $$props;
  let { size = "default" } = $$props;
  let { value } = $$props;
  const ctx = getToggleGroupCtx();
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0) $$bindings.size(size);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `${validate_component(Toggle_group_item$1, "ToggleGroupPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(
          toggleVariants({
            variant: ctx.variant || variant,
            size: ctx.size || size
          }),
          className
        )
      },
      { value },
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
function setToggleGroupCtx(props) {
  setContext("toggleGroup", props);
}
function getToggleGroupCtx() {
  return getContext("toggleGroup");
}
const Radio_group = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Radio_group$1, "RadioGroupPrimitive.Root").$$render(
      $$result,
      Object.assign({}, { class: cn("grid gap-2", className) }, $$restProps, { value }),
      {
        value: ($$value) => {
          value = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${slots.default ? slots.default({}) : ``}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Radio_group_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  return `${validate_component(Radio_group_item$1, "RadioGroupPrimitive.Item").$$render(
    $$result,
    Object.assign(
      {},
      { value },
      {
        class: cn("border-primary text-primary focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border shadow focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `<div class="flex items-center justify-center">${validate_component(Radio_group_item_indicator, "RadioGroupPrimitive.ItemIndicator").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Check, "Check").$$render($$result, { class: "fill-primary h-3.5 w-3.5" }, {}, {})}`;
          }
        })}</div>`;
      }
    }
  )}`;
});
const TruthFalse_editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { component } = $$props;
  let options = ["", ""];
  let correct_answer = "";
  if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (correct_answer !== null) {
          const tindex = Number(correct_answer);
          if (tindex >= 0 && tindex < options.length) {
            const truthy = options[tindex];
            component.truth_or_false.truth = String(truthy);
            const findex = tindex === 1 ? 0 : 1;
            const falsey = options[findex];
            component.truth_or_false.false = String(falsey);
          } else {
            component.truth_or_false.truth = "";
            component.truth_or_false.false = "";
          }
        }
      }
    }
    $$rendered = `${validate_component(Radio_group, "RadioGroup.Root").$$render(
      $$result,
      { value: correct_answer },
      {
        value: ($$value) => {
          correct_answer = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `<div class="flex flex-col gap-2">${validate_component(Label, "Label").$$render($$result, { for: `option-1` }, {}, {
            default: () => {
              return `Option 1`;
            }
          })} <div class="flex flex-row items-center gap-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "0", id: "0" }, {}, {})} ${validate_component(Input$2, "Input").$$render(
            $$result,
            {
              id: `option-1`,
              type: "text",
              class: "w-full",
              placeholder: `Enter option 1`,
              value: options[0]
            },
            {
              value: ($$value) => {
                options[0] = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div> ${validate_component(Label, "Label").$$render($$result, { for: `option-2` }, {}, {
            default: () => {
              return `Option 2`;
            }
          })} <div class="flex flex-row items-center gap-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "1", id: "1" }, {}, {})} ${validate_component(Input$2, "Input").$$render(
            $$result,
            {
              id: `option-2`,
              type: "text",
              class: "w-full",
              placeholder: `Enter option 2`,
              value: options[1]
            },
            {
              value: ($$value) => {
                options[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}</div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
function removeFirstCharacter(str) {
  if (str.length > 0) {
    return str.substring(1);
  }
  return str;
}
const Trivia_editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { component } = $$props;
  let options = ["", "", "", ""];
  let correct_question;
  if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (correct_question) {
          const qindex = removeFirstCharacter(correct_question);
          component.trivia.answer = options[qindex];
        }
      }
    }
    component.trivia.options = options;
    $$rendered = `<div class="grid gap-4">${validate_component(Radio_group, "RadioGroup.Root").$$render(
      $$result,
      { value: correct_question },
      {
        value: ($$value) => {
          correct_question = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${each(options, (option, index) => {
            return `<div class="flex flex-col gap-2">${validate_component(Label, "Label").$$render($$result, { for: `option-${index}` }, {}, {
              default: () => {
                return `Option ${escape(index + 1)}`;
              }
            })} <div class=""></div> <div class="flex flex-row items-center gap-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "q" + index, id: "q" + index }, {}, {})} ${validate_component(Input$2, "Input").$$render(
              $$result,
              {
                id: `option-${index}`,
                type: "text",
                class: "w-full",
                placeholder: `Enter option ${index + 1}`,
                value: options[index]
              },
              {
                value: ($$value) => {
                  options[index] = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> </div>`;
          })}`;
        }
      }
    )}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Slider_editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { component } = $$props;
  let minValue = 0;
  let maxValue = 100;
  let desiredValue = 50;
  if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    component.slider.minValue = minValue.toString();
    component.slider.maxValue = maxValue.toString();
    component.slider.desiredValue = desiredValue.toString();
    $$rendered = `<div class="flex flex-col gap-2 mb-3">${validate_component(Label, "Label").$$render($$result, { for: "min-value" }, {}, {
      default: () => {
        return `Desired Value`;
      }
    })} ${validate_component(Input$2, "Input").$$render(
      $$result,
      {
        id: "min-value",
        type: "number",
        class: "w-full",
        placeholder: "Enter desired value",
        value: desiredValue
      },
      {
        value: ($$value) => {
          desiredValue = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-row gap-4"><div class="flex flex-col gap-2">${validate_component(Label, "Label").$$render($$result, { for: "min-value" }, {}, {
      default: () => {
        return `Minimum Value`;
      }
    })} ${validate_component(Input$2, "Input").$$render(
      $$result,
      {
        id: "min-value",
        type: "number",
        class: "w-full",
        placeholder: "Enter minimum value",
        value: minValue
      },
      {
        value: ($$value) => {
          minValue = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> <div class="flex flex-col gap-2">${validate_component(Label, "Label").$$render($$result, { for: "max-value" }, {}, {
      default: () => {
        return `Maximum Value`;
      }
    })} ${validate_component(Input$2, "Input").$$render(
      $$result,
      {
        id: "max-value",
        type: "number",
        class: "w-full",
        placeholder: "Enter maximum value",
        value: maxValue
      },
      {
        value: ($$value) => {
          maxValue = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const Question = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  let question_childern_data = {
    question_answer: "",
    slider: {
      minValue: "0",
      maxValue: "100",
      desiredValue: "50"
    },
    truth_or_false: { truth: "", false: "" },
    trivia: { options: ["", "", "", ""], answer: "" }
  };
  const answers_type = [
    {
      value: "truth_false",
      label: "Truth or False",
      component: TruthFalse_editor
    },
    {
      value: "trivia",
      label: "Trivia (4 options)",
      component: Trivia_editor
    },
    {
      value: "slider",
      label: "Slider",
      component: Slider_editor
    }
  ];
  let answer_type = {
    value: "truth_false",
    label: "Truth or False"
  };
  let title = "";
  let file = void 0;
  let description = "";
  let description_upload = void 0;
  let description_upload_type = "";
  let showQuestionError = false;
  let showFileError = false;
  const question_data = {
    response_options_values: [],
    response_option_corect: "",
    response_option_type: "",
    title,
    description,
    description_upload,
    file,
    file_type: ""
  };
  const dispatch = createEventDispatcher();
  function sendDataToParent() {
    showQuestionError = !validateQuestion();
    showFileError = !validateFile();
    if (!showQuestionError && !showFileError) {
      dispatch("update", question_data);
    }
  }
  function validateQuestion() {
    return response_option_corect.trim() !== "" && title.trim() !== "" && description.trim() !== "" && response_option_corect.trim() !== "" && response_options_values.every((option) => option.trim() !== "");
  }
  function validateFile() {
    if (description_upload) {
      return file !== void 0;
    }
    return true;
  }
  function getComponentByType(action_type) {
    const found = answers_type.find((answer) => answer.value === action_type);
    return found ? found.component : null;
  }
  let answer_component = null;
  let response_options_values;
  let response_option_corect;
  const random_bit = generateRandomBinary();
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (description_upload) {
          description_upload_type = getAcceptType(description_upload);
        }
      }
    }
    {
      {
        switch (answer_type.value) {
          case "truth_false":
            question_childern_data.question_answer = question_childern_data.truth_or_false.truth;
            response_options_values = [
              question_childern_data.truth_or_false.false,
              question_childern_data.truth_or_false.truth
            ];
            if (random_bit === 0) {
              swapElements(response_options_values, 0, 1);
            }
            break;
          case "trivia":
            question_childern_data.question_answer = question_childern_data.trivia.answer;
            response_options_values = question_childern_data.trivia.options;
            break;
          case "slider":
            question_childern_data.question_answer = question_childern_data.slider.desiredValue;
            response_options_values = [
              question_childern_data.slider.minValue,
              question_childern_data.slider.maxValue
            ];
            break;
          default:
            question_childern_data.question_answer = "";
            response_options_values = [];
            break;
        }
        response_option_corect = question_childern_data.question_answer;
      }
    }
    {
      {
        question_data.response_option_type = answer_type.value;
        question_data.response_options_values = response_options_values;
        question_data.response_option_corect = response_option_corect;
        question_data.file_type = description_upload_type;
        question_data.title = title;
        question_data.description = description;
        question_data.description_upload = description_upload;
        question_data.file = file;
        sendDataToParent();
      }
    }
    answer_component = getComponentByType(answer_type.value);
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="flex flex-row justify-start gap-2"><div class="bg-primary-foreground rounded-lg p-2 w-fit">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Question ${escape(index + 1)}`;
              }
            })}</div> ${showQuestionError ? `<div class="bg-red-500/20 text-red-500/80 rounded-lg p-2 w-fit flex flex-row">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                icon: "mdi:warning-box",
                width: "1.2rem",
                height: "1.2rem"
              },
              {},
              {}
            )} ${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Incomplete question`;
              }
            })}</div>` : ``} ${showFileError ? `<div class="bg-red-500/20 text-red-500/80 rounded-lg p-2 w-fit flex flex-row">${validate_component(Icon, "Icon").$$render(
              $$result,
              {
                icon: "mdi:folder-warning",
                width: "1.2rem",
                height: "1.2rem"
              },
              {},
              {}
            )} ${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Select a file`;
              }
            })}</div>` : ``}</div>`;
          }
        })}  ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="grid gap-6"><div class="grid gap-3">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
              default: () => {
                return `Name`;
              }
            })} ${validate_component(Input$2, "Input").$$render(
              $$result,
              {
                id: "name",
                type: "text",
                class: "w-full",
                placeholder: "Enter your question title",
                value: title
              },
              {
                value: ($$value) => {
                  title = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="grid gap-3 z-10">${validate_component(Label, "Label").$$render($$result, { for: "description" }, {}, {
              default: () => {
                return `Description`;
              }
            })} ${validate_component(MarkdownWYSIWYG, "MarkdownWysiwyg").$$render(
              $$result,
              { value: description },
              {
                value: ($$value) => {
                  description = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div></div>  <div class="flex flex-col pt-4 gap-3">${validate_component(Label, "Label").$$render($$result, { for: "Toggle group" }, {}, {
              default: () => {
                return `Additional media`;
              }
            })} ${validate_component(Toggle_group, "ToggleGroup.Root").$$render(
              $$result,
              {
                size: "lg",
                type: "single",
                variant: "outline",
                value: description_upload
              },
              {
                value: ($$value) => {
                  description_upload = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(Toggle_group_item, "ToggleGroup.Item").$$render(
                    $$result,
                    {
                      value: "image",
                      "aria-label": "Toggle image"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Icon, "Icon").$$render(
                          $$result,
                          {
                            icon: "mdi:image",
                            width: "1.2rem",
                            height: "1.2rem"
                          },
                          {},
                          {}
                        )}Image`;
                      }
                    }
                  )} ${validate_component(Toggle_group_item, "ToggleGroup.Item").$$render(
                    $$result,
                    {
                      value: "music",
                      "aria-label": "Toggle music"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Icon, "Icon").$$render(
                          $$result,
                          {
                            icon: "mdi:music-note",
                            width: "1.2rem",
                            height: "1.2rem"
                          },
                          {},
                          {}
                        )}
          Music`;
                      }
                    }
                  )} ${validate_component(Toggle_group_item, "ToggleGroup.Item").$$render(
                    $$result,
                    {
                      value: "video",
                      "aria-label": "Toggle video"
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Icon, "Icon").$$render(
                          $$result,
                          {
                            icon: "mdi:video",
                            width: "1.2rem",
                            height: "1.2rem"
                          },
                          {},
                          {}
                        )}Video`;
                      }
                    }
                  )} ${validate_component(Toggle_group_item, "ToggleGroup.Item").$$render(
                    $$result,
                    {
                      value: "model",
                      "aria-label": "Toggle 3D model",
                      disabled: true
                    },
                    {},
                    {
                      default: () => {
                        return `${validate_component(Icon, "Icon").$$render(
                          $$result,
                          {
                            icon: "mdi:video-3d",
                            width: "1.2rem",
                            height: "1.2rem"
                          },
                          {},
                          {}
                        )}3D Model`;
                      }
                    }
                  )}`;
                }
              }
            )} ${description_upload ? `<div class="mx-auto max-w-xs p-4 rounded-lg outline-dashed outline-2 outline-muted-foreground mt-2"><label for="example1" class="mb-1 block text-sm font-medium text-muted-foreground/80">Upload ${escape(description_upload ? `${description_upload}` : ``)} file</label> <input id="example1" type="file" class="mt-2 block w-full text-secondary-foreground file:text-primary/90 file:hover:text-primary text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary-foreground file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-muted transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-60"${add_attribute("accept", description_upload_type, 0)}></div>` : ``}</div>  <div class="flex flex-col gap-3 mt-2">${validate_component(Label, "Label").$$render($$result, { for: "Answer" }, {}, {
              default: () => {
                return `Answer`;
              }
            })} ${validate_component(Root, "Select.Root").$$render(
              $$result,
              { selected: answer_type },
              {
                selected: ($$value) => {
                  answer_type = $$value;
                  $$settled = false;
                }
              },
              {
                default: () => {
                  return `${validate_component(Select_trigger, "Select.Trigger").$$render($$result, { class: "w-[180px]" }, {}, {
                    default: () => {
                      return `${validate_component(Value, "Select.Value").$$render($$result, { placeholder: "Select an answer type" }, {}, {})}`;
                    }
                  })} ${validate_component(Select_content, "Select.Content").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Group, "Select.Group").$$render($$result, {}, {}, {
                        default: () => {
                          return `${validate_component(Select_label, "Select.Label").$$render($$result, {}, {}, {
                            default: () => {
                              return `Answer type`;
                            }
                          })} ${each(answers_type, (answer) => {
                            return `${validate_component(Select_item, "Select.Item").$$render($$result, { value: answer.value, label: answer.label }, {}, {
                              default: () => {
                                return `${escape(answer.label)}`;
                              }
                            })}`;
                          })}`;
                        }
                      })}`;
                    }
                  })} ${validate_component(Input, "Select.Input").$$render($$result, { name: "answer_type" }, {}, {})}`;
                }
              }
            )}</div> ${answer_component ? `<div class="p-4 border border-muted rounded-lg mt-2">${validate_component(answer_component || missing_component, "svelte:component").$$render(
              $$result,
              { component: question_childern_data },
              {
                component: ($$value) => {
                  question_childern_data = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div>` : ``}`;
          }
        })}`;
      }
    })}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isFormIncomplete;
  let { data } = $$props;
  const { supabase, user } = data;
  user?.id;
  let quiz_title = "";
  let quiz_description = "";
  let quiz_code = generate8DigitCode();
  let quiz_tags = "";
  let quiz_tags_array = [];
  let questions = [];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    quiz_tags_array = splitBySpaces(quiz_tags);
    isFormIncomplete = !quiz_title || !quiz_description || questions.length === 0;
    $$rendered = `<div class="py-6 gap-2" data-svelte-h="svelte-rcpaht"><h1 class="text-3xl md:font-4xl font-semibold text-primary">StarQA question editor</h1> <p class="text-muted-foreground">This is where the magic happens</p></div> <div class="grid gap-3 transition-all duration-150">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="flex flex-row justify-between"><div class="bg-primary-foreground rounded-lg p-2 w-fit">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Quiz details:`;
              }
            })}</div> <button class="bg-primary rounded-lg p-2 w-fit">${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-primary-foreground" }, {}, {
              default: () => {
                return `Quiz code: ${escape(quiz_code)}`;
              }
            })}</button></div>`;
          }
        })}  ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="grid gap-6"><div class="flex flex-row items-center gap-3">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
              default: () => {
                return `Name:`;
              }
            })} ${validate_component(Input$2, "Input").$$render(
              $$result,
              {
                id: "name",
                type: "text",
                class: "w-full",
                placeholder: "Enter your quiz name",
                value: quiz_title
              },
              {
                value: ($$value) => {
                  quiz_title = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div>  <div class="grid gap-3">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
              default: () => {
                return `Description:`;
              }
            })} ${validate_component(Textarea, "Textarea").$$render(
              $$result,
              {
                id: "description",
                class: "w-full",
                placeholder: "Enter a quiz description",
                value: quiz_description
              },
              {
                value: ($$value) => {
                  quiz_description = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div>  <div class="grid gap-3"><div class="flex flex-row items-center h-5 gap-1">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
              default: () => {
                return `Tags:`;
              }
            })} ${quiz_tags_array.length > 0 ? `${each(quiz_tags_array, (tag) => {
              return `${validate_component(Badge, "Badge").$$render($$result, { variant: "secondary" }, {}, {
                default: () => {
                  return `${escape(tag)}`;
                }
              })}`;
            })}` : ``}</div> ${validate_component(Input$2, "Input").$$render(
              $$result,
              {
                id: "tags",
                type: "text",
                class: "w-full",
                placeholder: "Enter tags separated by spaces",
                value: quiz_tags
              },
              {
                value: ($$value) => {
                  quiz_tags = $$value;
                  $$settled = false;
                }
              },
              {}
            )}</div> <div class="grid gap-3"><div class="grid w-full max-w-sm items-center gap-1.5">${validate_component(Label, "Label").$$render($$result, { for: "picture" }, {}, {
              default: () => {
                return `Cover image:`;
              }
            })} ${validate_component(Input$2, "Input").$$render(
              $$result,
              {
                id: "picture",
                class: "file:bg-primary-foreground file:text-primary file:p-1 file:rounded-lg",
                type: "file",
                accept: "image/*"
              },
              {},
              {}
            )}</div></div></div>`;
          }
        })}`;
      }
    })} ${each(questions, (_, index) => {
      return `<div class="relative">${validate_component(Question, "Question").$$render($$result, { index }, {}, {})} <button class="absolute top-0 right-0 p-2 bg-red-500/90 hover:bg-destructive text-white rounded">${validate_component(Icon, "Icon").$$render(
        $$result,
        {
          icon: "mdi:delete",
          width: "1.2rem",
          height: "1.2rem"
        },
        {},
        {}
      )}</button> </div>`;
    })} <div class="w-full flex flex-row justify-between mt-2 mb-24"> ${validate_component(Button, "Button").$$render($$result, { class: "w-min font-semibold" }, {}, {
      default: () => {
        return `${validate_component(Icon, "Icon").$$render(
          $$result,
          {
            icon: "mdi:plus",
            width: "1.2rem",
            height: "1.2rem"
          },
          {},
          {}
        )}
      Add Question`;
      }
    })} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        disabled: isFormIncomplete,
        class: "bg-violet-600 hover:bg-violet-700 font-semibold text-primary"
      },
      {},
      {
        default: () => {
          return `${`${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              icon: "mdi:publish",
              width: "1.2rem",
              height: "1.2rem"
            },
            {},
            {}
          )}
        Publish`}`;
        }
      }
    )}</div></div>`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
