import { c as create_ssr_component, s as spread, b as escape_object, d as add_attribute, e as escape, a as escape_attribute_value, v as validate_component, f as each, m as missing_component } from "../../../../chunks/ssr.js";
import { l as get_store_value, d as setContext, g as getContext, c as compute_rest_props, s as subscribe, f as createEventDispatcher } from "../../../../chunks/lifecycle.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card-title.js";
import { c as cn, f as flyAndScale, g as getAcceptType, s as splitBySpaces, b as generate8DigitCode } from "../../../../chunks/utils.js";
import { I as Input$1 } from "../../../../chunks/input.js";
import { c as createLabel, L as Label } from "../../../../chunks/label.js";
import { C as Carta, M as MarkdownEditor, I as Icon } from "../../../../chunks/carta.js";
import { dequal } from "dequal";
import { f as isHTMLElement, v as getElementByMeltId, r as isElement, x as isHTMLLabelElement, w as withGet, o as omit, c as createElHelpers, y as isObject, z as stripValues, m as makeElement, q as disabledAttr, g as executeCallbacks, a as addMeltEventListener, k as kbd, A as isHTMLButtonElement, F as FIRST_LAST_KEYS, h as isElementDisabled, u as useEscapeKeydown, s as styleToString, e as effect, B as createHiddenInput, j as safeOnMount, i as isBrowser, C as isHTMLInputElement, n as noop, l as addEventListener, D as getDirectionalKeys } from "../../../../chunks/index2.js";
import { w as writable, d as derived, r as readonly } from "../../../../chunks/index4.js";
import { c as createTypeaheadSearch, d as derivedVisible, n as last, o as back, p as forward, q as prev, t as next, u as usePopper, g as getPortalDestination, i as addHighlight, r as removeHighlight, b as removeScroll, v as toggle, h as handleRovingFocus, j as generateId$1, k as getPositioningUpdater } from "../../../../chunks/helpers.js";
import { o as overridable, t as toWritableStores, r as removeUndefined, g as getOptionUpdater } from "../../../../chunks/updater.js";
import { g as generateIds, a as generateId } from "../../../../chunks/id.js";
import { t as tick } from "../../../../chunks/scheduler.js";
import { c as createBitAttrs, a as createDispatcher } from "../../../../chunks/events.js";
import "clsx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { tikz } from "@cartamd/plugin-tikz";
import { tv } from "tailwind-variants";
import { g as getTranslationFunctions } from "../../../../chunks/index3.js";
import { s as scale, B as Badge } from "../../../../chunks/index5.js";
import { B as Button } from "../../../../chunks/button.js";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../../chunks/client.js";
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
const MathIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg class="math-icon" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 5h-7L8 19l-3-6H3m11 0l6 6m-6 0l6-6"></path></svg>`;
});
const math = (options) => {
  return {
    onLoad: async ({ carta }) => {
      const highlighter = await carta.highlighter();
      if (!highlighter)
        return;
      await highlighter.loadLanguage("tex");
      carta.input?.update();
    },
    transformers: [
      {
        execution: "sync",
        type: "remark",
        transform({ processor }) {
          processor.use(remarkMath, options?.remarkMath);
        }
      },
      {
        execution: "sync",
        type: "rehype",
        transform({ processor }) {
          processor.use(rehypeKatex, options?.rehypeKatex);
        }
      }
    ],
    shortcuts: [
      {
        id: "inlineKatex",
        combination: options?.block?.shortcut ?? /* @__PURE__ */ new Set(["control", "m"]),
        action: (input) => input.toggleSelectionSurrounding("$")
      },
      {
        id: "blockKatex",
        combination: options?.block?.shortcut ?? /* @__PURE__ */ new Set(["control", "shift", "m"]),
        action: (input) => input.toggleSelectionSurrounding(["$$\n", "\n$$"])
      }
    ],
    grammarRules: [
      {
        name: "inline_math",
        type: "inline",
        definition: {
          match: "(\\$+)((?:[^\\$]|(?!(?<!\\$)\\1(?!\\$))\\$)*+)(\\1)",
          name: "markup.inline.math.markdown",
          captures: {
            "1": { name: "punctuation.definition.latex.inline" },
            "2": { name: "meta.embedded.block.latex", patterns: [{ include: "text.tex" }] },
            "3": { name: "punctuation.definition.latex.inline" }
          }
        }
      },
      {
        name: "block_math",
        type: "block",
        definition: {
          begin: "(^|\\G)(\\s*)(\\${2,})\\s*(?=([^$]*)?$)",
          beginCaptures: {
            "3": { name: "punctuation.definition.latex.block" }
          },
          endCaptures: { "3": { name: "punctuation.definition.latex.block" } },
          end: "(^|\\G)(\\2|\\s{0,3})(\\3)\\s*$",
          name: "markup.block.math.markdown",
          patterns: [
            {
              begin: "(^|\\G)(\\s*)(.*)",
              contentName: "meta.embedded.block.latex",
              patterns: [{ include: "text.tex" }],
              while: "(^|\\G)(?!\\s*([$]{2,})\\s*$)"
            }
          ]
        }
      }
    ],
    highlightingRules: [
      {
        light: {
          scope: "punctuation.definition.latex",
          settings: {
            foreground: "#5AF"
          }
        },
        dark: {
          scope: "punctuation.definition.latex",
          settings: {
            foreground: "#4DACFA"
          }
        }
      }
    ],
    tabOuts: options?.disableTabOuts ? [] : [
      {
        id: "inline-math",
        delimiter: "$"
      },
      {
        id: "block-math",
        delimiter: "\n$$"
      }
    ],
    icons: options?.disableIcon ? [] : [
      {
        id: "math",
        component: MathIcon,
        action: (input) => input.toggleSelectionSurrounding("$")
      }
    ]
  };
};
const css = {
  code: '.carta-font-code{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-size:1.125rem}.carta-theme__default{--border-color:hsl(var(--muted) / 1);--selection-color:hsl(var(--muted) / 1);--focus-outline:hsl(var(--muted) / 1);--hover-color:hsl(var(--secondary) / 1);--caret-color:var(--pop);--text-color:hsl(var(--primary) / 1)}html.dark .shiki,html.dark .shiki span{color:#e5e7eb !important}',
  map: `{"version":3,"file":"MarkdownWYSIWYG.svelte","sources":["MarkdownWYSIWYG.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { math } from \\"@cartamd/plugin-math\\";\\nimport { tikz } from \\"@cartamd/plugin-tikz\\";\\nimport { Carta, MarkdownEditor } from \\"carta-md\\";\\nconst carta = new Carta({\\n  sanitizer: false,\\n  extensions: [\\n    math(),\\n    tikz({\\n      postProcessing: (html) => {\\n        return html.replaceAll(\\"#000000\\", \\"~~~\\").replaceAll(\\"#000\\", \\"~~~\\").replaceAll(\\"black\\", \\"~~~\\").replaceAll(\\"#ffffff\\", \\"#000\\").replaceAll(\\"#fff\\", \\"#000\\").replaceAll(\\"white\\", \\"#000\\").replaceAll(\\"~~~\\", \\"#fff\\");\\n      }\\n    })\\n  ],\\n  theme: \\"github-dark\\"\\n});\\nexport let value = \\"\\";\\n<\/script>\\r\\n\\r\\n<MarkdownEditor theme=\\"default\\" {carta} bind:value />\\r\\n\\r\\n<style>\\r\\n  /* Set monospace font (Required to have the editor working correctly!) */\\r\\n  :global(.carta-font-code) {\\r\\n    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \\"Liberation Mono\\", \\"Courier New\\", monospace;\\r\\n    font-size: 1.125rem;\\r\\n  }\\r\\n\\r\\n  /* using adaptive theme */\\r\\n\\r\\n  :global(.carta-theme__default) {\\r\\n    --border-color: hsl(var(--muted) / 1);\\r\\n    --selection-color: hsl(var(--muted) / 1);\\r\\n    --focus-outline: hsl(var(--muted) / 1);\\r\\n    --hover-color: hsl(var(--secondary) / 1);\\r\\n    --caret-color: var(--pop);\\r\\n    --text-color: hsl(var(--primary) / 1);\\r\\n  }\\r\\n\\r\\n  /* Code dark mode */\\r\\n  /* Only if you didn't specify a custom code theme */\\r\\n  :global(html.dark .shiki),\\r\\n  :global(html.dark .shiki span) {\\r\\n    color: #e5e7eb !important;\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAsBU,gBAAkB,CACxB,WAAW,CAAE,YAAY,CAAC,CAAC,cAAc,CAAC,CAAC,KAAK,CAAC,CAAC,MAAM,CAAC,CAAC,QAAQ,CAAC,CAAC,iBAAiB,CAAC,CAAC,aAAa,CAAC,CAAC,SAAS,CAC/G,SAAS,CAAE,QACb,CAIQ,qBAAuB,CAC7B,cAAc,CAAE,qBAAqB,CACrC,iBAAiB,CAAE,qBAAqB,CACxC,eAAe,CAAE,qBAAqB,CACtC,aAAa,CAAE,yBAAyB,CACxC,aAAa,CAAE,UAAU,CACzB,YAAY,CAAE,uBAChB,CAIQ,gBAAiB,CACjB,qBAAuB,CAC7B,KAAK,CAAE,OAAO,CAAC,UACjB"}`
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
  let correct_answer;
  if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        if (correct_answer) {
          const tindex = correct_answer;
          const truthy = options[tindex];
          component.truth_or_false.truth = truthy;
          const findex = tindex === 1 ? 0 : 1;
          const falsey = options[findex];
          component.truth_or_false.false = falsey;
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
          })} <div class=""></div> <div class="flex flex-row items-center gap-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "0", id: "0" }, {}, {})} ${validate_component(Input$1, "Input").$$render(
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
          )}</div> <div class="flex flex-col gap-2">${validate_component(Label, "Label").$$render($$result, { for: `option-2` }, {}, {
            default: () => {
              return `Option 2`;
            }
          })} <div class=""></div> <div class="flex flex-row items-center gap-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "1", id: "1" }, {}, {})} ${validate_component(Input$1, "Input").$$render(
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
          )}</div></div></div>`;
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
            })} <div class=""></div> <div class="flex flex-row items-center gap-2">${validate_component(Radio_group_item, "RadioGroup.Item").$$render($$result, { value: "q" + index, id: "q" + index }, {}, {})} ${validate_component(Input$1, "Input").$$render(
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
    component.slider.minValue = minValue;
    component.slider.maxValue = maxValue;
    component.slider.desiredValue = desiredValue;
    $$rendered = `<div class="flex flex-col gap-2 mb-3">${validate_component(Label, "Label").$$render($$result, { for: "min-value" }, {}, {
      default: () => {
        return `Desired Value`;
      }
    })} ${validate_component(Input$1, "Input").$$render(
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
    })} ${validate_component(Input$1, "Input").$$render(
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
    })} ${validate_component(Input$1, "Input").$$render(
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
      minValue: 0,
      maxValue: 100,
      desiredValue: 50
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
    dispatch("update", question_data);
  }
  function getComponentByType(action_type) {
    const found = answers_type.find((answer) => answer.value === action_type);
    return found ? found.component : null;
  }
  let answer_component = null;
  let response_options_values;
  let response_option_corect;
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
            response_options_values = [question_childern_data.truth_or_false.false];
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
        question_data.file = file, sendDataToParent();
      }
    }
    answer_component = getComponentByType(answer_type.value);
    {
      console.log(question_data);
    }
    $$rendered = `${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="flex flex-row justify-between"><div class="bg-primary-foreground rounded-lg p-2 w-fit">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Question ${escape(index + 1)}`;
              }
            })}</div></div>`;
          }
        })}  ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="grid gap-6"><div class="grid gap-3">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
              default: () => {
                return `Name`;
              }
            })} ${validate_component(Input$1, "Input").$$render(
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
                      "aria-label": "Toggle 3D model"
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
                        )}CG Model`;
                      }
                    }
                  )} ${validate_component(Toggle_group_item, "ToggleGroup.Item").$$render(
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
                  )}`;
                }
              }
            )} <div class="mx-auto max-w-xs p-4 rounded-lg outline-dashed outline-2 outline-muted-foreground my-2"><label for="example1" class="mb-1 block text-sm font-medium text-muted-foreground/80">Upload ${escape(description_upload ? `${description_upload}` : ``)} file</label> <input id="example1" type="file" class="mt-2 block w-full text-secondary-foreground file:text-primary/90 file:hover:text-primary text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary-foreground file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-muted transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-60"${add_attribute("accept", description_upload_type, 0)}></div></div>  <div class="flex flex-col gap-3">${validate_component(Label, "Label").$$render($$result, { for: "Answer" }, {}, {
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
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { supabase, user } = data;
  user?.id;
  let quiz_title = "";
  let quiz_description = "";
  let quiz_code = generate8DigitCode();
  let quiz_tags = "";
  let quiz_tags_array = [];
  let questions = [];
  let uploading = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    quiz_tags_array = splitBySpaces(quiz_tags);
    $$rendered = `<div class="py-6 gap-2" data-svelte-h="svelte-rcpaht"><h1 class="text-3xl md:font-4xl font-semibold text-primary">StarQA question editor</h1> <p class="text-muted-foreground">This is where the magic happens</p></div> <div class="grid gap-3 transition-all duration-150">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
      default: () => {
        return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="flex flex-row justify-between"><div class="bg-primary-foreground rounded-lg p-2 w-fit">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Quiz details:`;
              }
            })}</div> <div class="bg-primary rounded-lg p-2 w-fit">${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-primary-foreground" }, {}, {
              default: () => {
                return `Quiz code: ${escape(quiz_code)}`;
              }
            })}</div></div>`;
          }
        })}  ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
          default: () => {
            return `<div class="grid gap-6"><div class="flex flex-row items-center gap-3">${validate_component(Label, "Label").$$render($$result, { for: "name" }, {}, {
              default: () => {
                return `Name:`;
              }
            })} ${validate_component(Input$1, "Input").$$render(
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
            })}` : ``}</div> ${validate_component(Input$1, "Input").$$render(
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
            })} ${validate_component(Input$1, "Input").$$render(
              $$result,
              {
                id: "picture",
                class: "file:bg-primary-foreground file:text-primary file:p-1 file:rounded-lg ",
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
        disabled: uploading,
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
