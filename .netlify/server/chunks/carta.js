import { o as onDestroy, f as createEventDispatcher } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, b as escape_object, d as add_attribute, a as escape_attribute_value, e as escape, f as each, v as validate_component, m as missing_component } from "./ssr.js";
import "diff";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
let simpleNames = false;
function allowSimpleNames(allow) {
  {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
const browserCacheVersion = "iconify2";
const browserCachePrefix = "iconify";
const browserCacheCountKey = browserCachePrefix + "-count";
const browserCacheVersionKey = browserCachePrefix + "-version";
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;
function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
const browserStorageConfig = {
  local: true,
  session: true
};
const browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
let _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
const defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
const commonProps = {
  display: "inline-block"
};
const monotoneProps = {
  "background-color": "currentColor"
};
const coloredProps = {
  "background-color": "transparent"
};
const propsToAdd = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
};
const propsToAddTo = {
  "-webkit-mask": monotoneProps,
  "mask": monotoneProps,
  "background": coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + "-" + prop] = propsToAdd[prop];
  }
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const mode = props.mode || "svg";
  const componentProps = mode === "svg" ? { ...svgDefaults } : {};
  if (icon.body.indexOf("xlink:") === -1) {
    delete componentProps["xmlns:xlink"];
  }
  let style = typeof props.style === "string" ? props.style : "";
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key.slice(0, 3) === "on:") {
          break;
        }
        if (defaultExtendedIconCustomisations[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (mode === "svg") {
    Object.assign(componentProps, renderAttribs);
    if (style !== "") {
      componentProps.style = style;
    }
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    return {
      svg: true,
      attributes: componentProps,
      body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
    };
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  const url = svgToURL(html);
  const styles = {
    "--svg": url
  };
  const size = (prop) => {
    const value = renderAttribs[prop];
    if (value) {
      styles[prop] = fixSize(value);
    }
  };
  size("width");
  size("height");
  Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
  let customStyle = "";
  for (const key in styles) {
    customStyle += key + ": " + styles[key] + ";";
  }
  componentProps.style = customStyle + style;
  return {
    svg: false,
    attributes: componentProps
  };
}
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  initBrowserStorage();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (
            // Check if item is an object and not null/array
            typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
            typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
            !addCollection(item)
          ) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
function checkIconState(icon, state, mounted, callback, onload) {
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    return { data: { ...defaultIconProps, ...icon } };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    return null;
  }
  const data = getIconData(iconName);
  if (!data) {
    return null;
  }
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render({
    ...defaultIconProps,
    ...icon
  }, props) : null;
}
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const state = {
    // Last icon name
    name: "",
    // Loading status
    loading: null,
    // Destroyed status
    destroyed: false
  };
  let mounted = false;
  let data;
  const onLoad = (icon) => {
    if (typeof $$props.onLoad === "function") {
      $$props.onLoad(icon);
    }
    const dispatch = createEventDispatcher();
    dispatch("load", { icon });
  };
  function loaded() {
  }
  onDestroy(() => {
    state.destroyed = true;
  });
  {
    {
      const iconData = checkIconState($$props.icon, state, mounted, loaded, onLoad);
      data = iconData ? generateIcon(iconData.data, $$props) : null;
      if (data && iconData.classes) {
        data.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
      }
    }
  }
  return `${data ? `${data.svg ? `<svg${spread([escape_object(data.attributes)], {})}><!-- HTML_TAG_START -->${data.body}<!-- HTML_TAG_END --></svg>` : `<span${spread([escape_object(data.attributes)], {})}></span>`}` : ``}`;
});
function debounce(cb, wait = 1e3) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), wait);
  };
}
function areEqualSets(a, b) {
  if (a.size !== b.size)
    return false;
  const aClone = new Set(a);
  const bClone = new Set(b);
  for (const elem of aClone) {
    bClone.add(elem);
    if (bClone.size !== b.size)
      return false;
  }
  for (const elem of bClone) {
    aClone.add(elem);
    if (aClone.size !== a.size)
      return false;
  }
  return true;
}
function mergeDefaultInterface(partial, def) {
  if (!partial)
    return def;
  const final = { ...def };
  Object.entries(partial).forEach(([key, value]) => {
    final[key] = value;
  });
  return final;
}
class CustomEvent extends Event {
  detail;
  constructor(message, data) {
    super(message, data);
    this.detail = data.detail;
  }
}
const css$3 = {
  code: ".carta-renderer.svelte-r6n2gn{position:relative;word-wrap:break-word;word-break:break-word}",
  map: '{"version":3,"file":"Renderer.svelte","sources":["Renderer.svelte"],"sourcesContent":["<!--\\n\\t@component\\n\\tThis component wraps the Carta renderer and provides a debounced rendering\\n\\tfor the editor.\\n-->\\n\\n<script>import { createEventDispatcher, onMount } from \\"svelte\\";\\nimport { debounce } from \\"../utils\\";\\nexport let carta;\\nexport let value;\\nexport let elem;\\nlet mounted = false;\\nlet renderedHtml = carta.renderSSR(value);\\nconst debouncedRenderer = debounce((value2) => {\\n  carta.render(value2).then((rendered) => renderedHtml = rendered).then(() => events(\\"render\\", void 0));\\n}, carta.rendererDebounce ?? 300);\\nconst onValueChange = (value2) => {\\n  debouncedRenderer(value2);\\n};\\n$:\\n  if (mounted)\\n    onValueChange(value);\\nonMount(() => carta.$setRenderer(elem));\\nonMount(() => mounted = true);\\nconst events = createEventDispatcher();\\n<\/script>\\n\\n<div bind:this={elem} on:scroll class=\\"carta-renderer markdown-body\\">\\n\\t<!-- eslint-disable-next-line svelte/no-at-html-tags -->\\n\\t{@html renderedHtml}\\n\\t{#if mounted}\\n\\t\\t<slot />\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.carta-renderer {\\n\\t\\tposition: relative;\\n\\t\\tword-wrap: break-word;\\n\\t\\tword-break: break-word;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoCC,6BAAgB,CACf,QAAQ,CAAE,QAAQ,CAClB,SAAS,CAAE,UAAU,CACrB,UAAU,CAAE,UACb"}'
};
const Renderer$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  $$result.css.add(css$3);
  return `  <div class="carta-renderer markdown-body svelte-r6n2gn"${add_attribute("this", elem, 0)}> <!-- HTML_TAG_START -->${renderedHtml}<!-- HTML_TAG_END --> ${``} </div>`;
});
const css$2 = {
  code: ".carta-input.svelte-ymdneo{position:relative}.carta-input-wrapper.svelte-ymdneo{position:relative;font-family:monospace}textarea.svelte-ymdneo{position:relative;width:100%;max-width:100%;min-height:100%;overflow-y:hidden;resize:none;padding:0;margin:0;border:0;color:transparent;background:transparent;outline:none;-moz-tab-size:4;-o-tab-size:4;tab-size:4}.carta-highlight.svelte-ymdneo{position:absolute;left:0;right:0;top:0;bottom:0;margin:0;-webkit-user-select:none;-moz-user-select:none;user-select:none;height:-moz-fit-content;height:fit-content;padding:inherit;margin:inherit;word-wrap:break-word;white-space:pre-wrap;word-break:break-word}.carta-highlight .shiki{margin:0;-moz-tab-size:4;-o-tab-size:4;tab-size:4;background-color:transparent !important}.carta-highlight *{font-family:inherit;font-size:inherit;word-wrap:break-word;white-space:pre-wrap;word-break:break-word}#editor-unfocus-suggestion.svelte-ymdneo{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}",
  map: '{"version":3,"file":"Input.svelte","sources":["Input.svelte"],"sourcesContent":["<!--\\n\\t@component\\n\\tA wrapped textarea component integrated with Carta. It handles the highlighting\\n\\tand propagates events to the Carta instance.\\t\\n-->\\n\\n<script>import { onMount } from \\"svelte\\";\\nimport { debounce } from \\"../utils\\";\\nimport { BROWSER } from \\"esm-env\\";\\nimport { removeTemporaryNodes, speculativeHighlightUpdate } from \\"../speculative\\";\\nexport let carta;\\nexport let value = \\"\\";\\nexport let placeholder = \\"\\";\\nexport let elem;\\nexport let props = {};\\nlet textarea;\\nlet highlightElem;\\nlet highlighted = value;\\nlet mounted = false;\\nlet prevValue = value;\\nexport const resize = () => {\\n  if (!mounted || !textarea)\\n    return;\\n  textarea.style.height = \\"0\\";\\n  textarea.style.height = textarea.scrollHeight + \\"px\\";\\n  textarea.scrollTop = 0;\\n  const isFocused = document.activeElement === textarea;\\n  if (!isFocused)\\n    return;\\n  if (!carta.input)\\n    return;\\n  const coords = carta.input.getCursorXY();\\n  if (!coords)\\n    return;\\n  if (coords.top < 0 || coords.top + carta.input.getRowHeight() >= elem.scrollTop + elem.clientHeight)\\n    elem.scrollTo({ top: coords?.top, behavior: \\"instant\\" });\\n};\\nconst focus = () => {\\n  const selectedText = window.getSelection()?.toString();\\n  if (selectedText)\\n    return;\\n  textarea?.focus();\\n};\\nconst highlight = async (text) => {\\n  const highlighter = await carta.highlighter();\\n  if (!highlighter)\\n    return;\\n  let html;\\n  const hl = await import(\\"../highlight\\");\\n  const { isSingleTheme } = hl;\\n  if (isSingleTheme(highlighter.theme)) {\\n    html = highlighter.codeToHtml(text, {\\n      lang: highlighter.lang,\\n      theme: highlighter.theme\\n    });\\n  } else {\\n    html = highlighter.codeToHtml(text, {\\n      lang: highlighter.lang,\\n      themes: highlighter.theme\\n    });\\n  }\\n  removeTemporaryNodes(highlightElem);\\n  if (carta.sanitizer) {\\n    highlighted = carta.sanitizer(html);\\n  } else {\\n    highlighted = html;\\n  }\\n  requestAnimationFrame(resize);\\n};\\nconst debouncedHighlight = debounce(highlight, 250);\\nconst highlightNestedLanguages = debounce(async (text) => {\\n  const highlighter = await carta.highlighter();\\n  const hl = await import(\\"../highlight\\");\\n  const { loadNestedLanguages } = hl;\\n  if (!highlighter)\\n    return;\\n  const { updated } = await loadNestedLanguages(highlighter, text);\\n  if (updated)\\n    debouncedHighlight(text);\\n}, 300);\\nconst onValueChange = (value2) => {\\n  if (highlightElem) {\\n    speculativeHighlightUpdate(highlightElem, prevValue, value2);\\n    requestAnimationFrame(resize);\\n  }\\n  debouncedHighlight(value2);\\n  highlightNestedLanguages(value2);\\n};\\n$:\\n  if (BROWSER)\\n    onValueChange(value);\\nonMount(() => {\\n  mounted = true;\\n  requestAnimationFrame(resize);\\n});\\nonMount(() => {\\n  carta.$setInput(textarea, elem, () => {\\n    value = textarea.value;\\n  });\\n});\\n<\/script>\\n\\n<div role=\\"tooltip\\" id=\\"editor-unfocus-suggestion\\">\\n\\tPress ESC then TAB to move the focus off the field\\n</div>\\n<div\\n\\ton:click={focus}\\n\\ton:keydown={focus}\\n\\ton:scroll\\n\\trole=\\"textbox\\"\\n\\ttabindex=\\"-1\\"\\n\\tclass=\\"carta-input\\"\\n\\tbind:this={elem}\\n>\\n\\t<div class=\\"carta-input-wrapper\\">\\n\\t\\t<div\\n\\t\\t\\tclass=\\"carta-highlight carta-font-code\\"\\n\\t\\t\\ttabindex=\\"-1\\"\\n\\t\\t\\taria-hidden=\\"true\\"\\n\\t\\t\\tbind:this={highlightElem}\\n\\t\\t>\\n\\t\\t\\t<!-- eslint-disable-line svelte/no-at-html-tags -->{@html highlighted}\\n\\t\\t</div>\\n\\n\\t\\t<textarea\\n\\t\\t\\tspellcheck=\\"false\\"\\n\\t\\t\\tclass=\\"carta-font-code\\"\\n\\t\\t\\taria-multiline=\\"true\\"\\n\\t\\t\\taria-describedby=\\"editor-unfocus-suggestion\\"\\n\\t\\t\\ttabindex=\\"0\\"\\n\\t\\t\\t{placeholder}\\n\\t\\t\\t{...props}\\n\\t\\t\\tbind:value\\n\\t\\t\\tbind:this={textarea}\\n\\t\\t\\ton:scroll={() => (textarea.scrollTop = 0)}\\n\\t\\t\\ton:keydown={() => (prevValue = value)}\\n\\t\\t/>\\n\\t</div>\\n\\n\\t{#if mounted}\\n\\t\\t<slot />\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.carta-input {\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\t.carta-input-wrapper {\\n\\t\\tposition: relative;\\n\\t\\tfont-family: monospace;\\n\\t}\\n\\n\\ttextarea {\\n\\t\\tposition: relative;\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 100%;\\n\\t\\tmin-height: 100%;\\n\\n\\t\\toverflow-y: hidden;\\n\\t\\tresize: none;\\n\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\tborder: 0;\\n\\n\\t\\tcolor: transparent;\\n\\t\\tbackground: transparent;\\n\\n\\t\\toutline: none;\\n\\t\\t-moz-tab-size: 4;\\n\\t\\t  -o-tab-size: 4;\\n\\t\\t     tab-size: 4;\\n\\t}\\n\\n\\t.carta-highlight {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\tright: 0;\\n\\t\\ttop: 0;\\n\\t\\tbottom: 0;\\n\\t\\tmargin: 0;\\n\\t\\t-webkit-user-select: none;\\n\\t\\t   -moz-user-select: none;\\n\\t\\t        user-select: none;\\n\\t\\theight: -moz-fit-content;\\n\\t\\theight: fit-content;\\n\\n\\t\\tpadding: inherit;\\n\\t\\tmargin: inherit;\\n\\n\\t\\tword-wrap: break-word;\\n\\t\\twhite-space: pre-wrap;\\n\\t\\tword-break: break-word;\\n\\t}\\n\\n\\t:global(.carta-highlight .shiki) {\\n\\t\\tmargin: 0;\\n\\t\\t-moz-tab-size: 4;\\n\\t\\t  -o-tab-size: 4;\\n\\t\\t     tab-size: 4;\\n\\t\\tbackground-color: transparent !important;\\n\\t}\\n\\n\\t:global(.carta-highlight *) {\\n\\t\\tfont-family: inherit;\\n\\t\\tfont-size: inherit;\\n\\n\\t\\tword-wrap: break-word;\\n\\t\\twhite-space: pre-wrap;\\n\\t\\tword-break: break-word;\\n\\t}\\n\\n\\t#editor-unfocus-suggestion {\\n\\t\\tposition: absolute;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: -1px;\\n\\t\\toverflow: hidden;\\n\\t\\tclip: rect(0, 0, 0, 0);\\n\\t\\tborder: 0;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiJC,0BAAa,CACZ,QAAQ,CAAE,QACX,CAEA,kCAAqB,CACpB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,SACd,CAEA,sBAAS,CACR,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAAI,CAEhB,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,IAAI,CAEZ,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,CAAC,CAET,KAAK,CAAE,WAAW,CAClB,UAAU,CAAE,WAAW,CAEvB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,CAAC,CACd,WAAW,CAAE,CAAC,CACX,QAAQ,CAAE,CAChB,CAEA,8BAAiB,CAChB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,CAAC,CACT,mBAAmB,CAAE,IAAI,CACtB,gBAAgB,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CACzB,MAAM,CAAE,gBAAgB,CACxB,MAAM,CAAE,WAAW,CAEnB,OAAO,CAAE,OAAO,CAChB,MAAM,CAAE,OAAO,CAEf,SAAS,CAAE,UAAU,CACrB,WAAW,CAAE,QAAQ,CACrB,UAAU,CAAE,UACb,CAEQ,uBAAyB,CAChC,MAAM,CAAE,CAAC,CACT,aAAa,CAAE,CAAC,CACd,WAAW,CAAE,CAAC,CACX,QAAQ,CAAE,CAAC,CAChB,gBAAgB,CAAE,WAAW,CAAC,UAC/B,CAEQ,kBAAoB,CAC3B,WAAW,CAAE,OAAO,CACpB,SAAS,CAAE,OAAO,CAElB,SAAS,CAAE,UAAU,CACrB,WAAW,CAAE,QAAQ,CACrB,UAAU,CAAE,UACb,CAEA,wCAA2B,CAC1B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACtB,MAAM,CAAE,CACT"}'
};
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  $$result.css.add(css$2);
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
const css$1 = {
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
  $$result.css.add(css$1);
  iconsHidden = visibleIcons.length !== carta.icons.length;
  return `   <div class="carta-toolbar svelte-1c77udu" role="toolbar"${add_attribute("this", toolbar, 0)}><div class="carta-toolbar-left svelte-1c77udu">${mode == "tabs" ? `<button type="button"${add_attribute("tabindex", 0, 0)}${add_attribute("class", tab === "write" ? "carta-active" : "", 0)}>${escape(labels.writeTab)}</button> <button type="button"${add_attribute("tabindex", -1, 0)}${add_attribute("class", tab === "preview" ? "carta-active" : "", 0)}>${escape(labels.previewTab)}</button>` : ``}</div> <div class="carta-filler svelte-1c77udu"></div> <div class="carta-toolbar-right svelte-1c77udu"${add_attribute("this", iconsContainer, 0)}>${!(mode === "tabs" && tab === "preview") ? `${each(visibleIcons, (icon, index) => {
    let label = labels.iconsLabels[icon.id] ?? icon.label;
    return ` <button class="carta-icon svelte-1c77udu"${add_attribute("tabindex", index == 0 ? 0 : -1, 0)}${add_attribute("title", label, 0)}${add_attribute("aria-label", label, 0)}>${validate_component(icon.component || missing_component, "svelte:component").$$render($$result, {}, {}, {})} </button>`;
  })} ${iconsHidden ? (() => {
    let label = labels.iconsLabels["menu"] ?? "Menu";
    return ` <button class="carta-icon svelte-1c77udu"${add_attribute("tabindex", -1, 0)}${add_attribute("title", label, 0)}${add_attribute("aria-label", label, 0)}>${validate_component(MenuIcon, "MenuIcon").$$render($$result, {}, {}, {})}</button>`;
  })() : ``}` : ``}</div></div> ${``}`;
});
const css = {
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
  $$result.css.add(css);
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
    )}` : ``} <div class="carta-wrapper"><div class="${"carta-container mode-" + escape(windowMode, true) + " svelte-11jlii3"}">${windowMode == "split" || selectedTab == "write" ? `${validate_component(Input, "Input").$$render(
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
    )}` : ``} ${windowMode == "split" || selectedTab == "preview" ? `${validate_component(Renderer$1, "Renderer").$$render(
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
const defaultHistoryOptions = {
  minInterval: 300,
  maxSize: 1e6
};
class TextAreaHistory {
  states = [];
  currentIndex = -1;
  // Only <= 0 numbers
  options;
  constructor(options) {
    this.options = mergeDefaultInterface(options, defaultHistoryOptions);
  }
  /**
   * Rollback to the previous state.
   * @returns The previous state, if any.
   */
  undo() {
    if (-this.currentIndex > this.states.length)
      return;
    const prev = this.states.at(this.currentIndex - 1);
    if (!prev)
      return void 0;
    this.currentIndex--;
    return prev;
  }
  /**
   * Move forward one state.
   * @returns The successive value, if any.
   */
  redo() {
    if (this.currentIndex >= -1)
      return;
    const next = this.states.at(this.currentIndex + 1);
    if (!next)
      return void 0;
    this.currentIndex++;
    return next;
  }
  /**
   * Get current stored history in bytes.
   */
  getSize = () => this.states.reduce((acc, curr) => acc + curr.value.length * 2, 0);
  /**
   * Save a value into history.
   * @param value The value to save.
   * @param cursor Cursor position.
   */
  saveState(value, cursor) {
    const latest = this.states.at(-1);
    if (latest?.value === value)
      return;
    if (this.currentIndex < -1) {
      this.states = this.states.slice(0, this.currentIndex + 1);
    }
    this.currentIndex = -1;
    if (latest && Date.now() - latest.timestamp.getTime() <= (this.options.minInterval ?? 300)) {
      this.states.pop();
    }
    let size = this.getSize();
    this.states.push({
      timestamp: /* @__PURE__ */ new Date(),
      cursor,
      value
    });
    size += value.length * 2;
    while (size > (this.options.maxSize ?? 1e6)) {
      const removed = this.states.shift();
      if (!removed)
        break;
      size -= removed.value.length * 2;
    }
  }
}
class InputEnhancer {
  textarea;
  container;
  settings;
  pressedKeys;
  escapePressed = false;
  // Used to detect keys that actually changed the textarea value
  onKeyDownValue;
  history;
  events = new EventTarget();
  constructor(textarea, container, settings) {
    this.textarea = textarea;
    this.container = container;
    this.settings = settings;
    this.pressedKeys = /* @__PURE__ */ new Set();
    textarea.addEventListener("keydown", this.handleKeyDown.bind(this));
    textarea.addEventListener("keyup", this.handleKeyUp.bind(this));
    textarea.addEventListener("focus", () => {
      this.pressedKeys.clear();
      this.escapePressed = false;
    });
    textarea.addEventListener("blur", () => {
      this.pressedKeys.clear();
    });
    textarea.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.history = new TextAreaHistory(settings.historyOpts);
    this.history.saveState(this.textarea.value, this.textarea.selectionStart);
    for (const listener of settings.listeners)
      textarea.addEventListener(...listener);
  }
  isWordCharacter(char) {
    return new RegExp(/^[a-zA-Z0-9_\-']*$/).test(char);
  }
  handleMouseDown(e) {
    const cursor = this.getSelection().start;
    const currentChar = this.textarea.value.at(cursor);
    if (e.detail == 2 && currentChar != "\n" && currentChar != " ") {
      e.preventDefault();
      const isWordChar = this.isWordCharacter(this.textarea.value[cursor]);
      let startPosition = cursor, endPosition = cursor;
      while (startPosition >= 0 && this.isWordCharacter(this.textarea.value[startPosition]) == isWordChar && this.textarea.value[startPosition] != " ")
        startPosition--;
      while (endPosition < this.textarea.value.length && this.isWordCharacter(this.textarea.value[endPosition]) == isWordChar && this.textarea.value[endPosition] != " ")
        endPosition++;
      this.textarea.setSelectionRange(startPosition + 1, endPosition);
    }
  }
  handleKeyDown(e) {
    const key = e.key.toLowerCase();
    this.pressedKeys.add(key);
    const shortcuts = this.settings.shortcuts.filter((shortcut) => areEqualSets(this.pressedKeys, shortcut.combination));
    if (shortcuts.length > 0) {
      e.preventDefault();
      if (shortcuts.length > 1) {
        console.warn(`[carta] Multiple keyboard shortcuts have the same the combination: ${this.pressedKeys}`);
      }
      for (const shortcut of shortcuts) {
        shortcut.action(this);
        if (!shortcut.preventSave)
          this.history.saveState(this.textarea.value, this.textarea.selectionStart);
        this.update();
      }
      this.onKeyDownValue = void 0;
      return;
    }
    if (key === "enter") {
      this.handleNewLine(e);
    } else if (key == "tab" && !this.escapePressed) {
      e.preventDefault();
      let matchedDelimiter = null;
      const tabOutsDelimiters = this.settings.tabOuts.map((tabOut) => tabOut.delimiter).flat();
      for (const delimiter of tabOutsDelimiters) {
        if (this.textarea.value.slice(this.textarea.selectionEnd, this.textarea.selectionEnd + delimiter.length) === delimiter) {
          matchedDelimiter = delimiter;
          break;
        }
      }
      if (matchedDelimiter) {
        const cursor = this.textarea.selectionEnd + matchedDelimiter.length;
        this.textarea.setSelectionRange(cursor, cursor);
      } else {
        if (e.shiftKey) {
          const line = this.getLine();
          const lineStart = line.start;
          const lineContent = line.value;
          const position = this.textarea.selectionStart;
          if (lineContent.startsWith("	")) {
            this.removeAt(lineStart, 1);
            this.textarea.selectionStart = position - 1;
            this.textarea.selectionEnd = position - 1;
          }
        } else {
          const position = this.textarea.selectionStart;
          this.insertAt(this.textarea.selectionStart, "	");
          this.textarea.selectionStart = position + 1;
          this.textarea.selectionEnd = position + 1;
        }
        this.update();
      }
    } else if (key === "escape") {
      this.escapePressed = true;
    }
    this.onKeyDownValue = this.textarea.value;
  }
  handleKeyUp(e) {
    const key = e.key.toLowerCase();
    this.pressedKeys.delete(key);
    if (this.onKeyDownValue !== void 0 && this.textarea.value != this.onKeyDownValue) {
      this.history.saveState(this.textarea.value, this.textarea.selectionStart);
    }
  }
  handleNewLine(e) {
    const cursor = this.textarea.selectionStart;
    let lineStartingIndex;
    for (lineStartingIndex = cursor; lineStartingIndex > 0 && this.textarea.value.at(lineStartingIndex - 1) !== "\n"; lineStartingIndex--)
      ;
    const line = this.textarea.value.slice(lineStartingIndex, cursor);
    for (const prefix of this.settings.prefixes) {
      const match = prefix.match(line);
      if (match) {
        e.preventDefault();
        const strMatch = Array.isArray(match) ? match[0] : match;
        const content = line.slice(strMatch.length).trim();
        if (content === "") {
          const line2 = this.getLine(lineStartingIndex);
          this.removeAt(lineStartingIndex, line2.value.length);
          this.textarea.setSelectionRange(line2.start, line2.start);
          this.update();
          return;
        }
        const newPrefix = prefix.maker(match, line);
        this.insertAt(cursor, "\n" + newPrefix);
        this.update();
        const newCursorPosition = cursor + newPrefix.length + 1;
        this.textarea.setSelectionRange(newCursorPosition, newCursorPosition);
        break;
      }
    }
  }
  /**
   * Get the selected text data.
   * @returns The selection text data.
   */
  getSelection() {
    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    return {
      start,
      end,
      direction: this.textarea.selectionDirection,
      slice: this.textarea.value.slice(start, end)
    };
  }
  /**
   * Get the current line, along with indices information.
   * @returns Current line info.
   */
  getLine(index = this.textarea.selectionStart) {
    let lineStartingIndex, lineEndingIndex;
    for (lineStartingIndex = index; lineStartingIndex > 0 && this.textarea.value.at(lineStartingIndex - 1) !== "\n"; lineStartingIndex--)
      ;
    for (lineEndingIndex = index; lineEndingIndex < this.textarea.value.length - 1 && this.textarea.value.at(lineEndingIndex) !== "\n"; lineEndingIndex++)
      ;
    return {
      start: lineStartingIndex,
      end: lineEndingIndex,
      value: this.textarea.value.slice(lineStartingIndex, lineEndingIndex)
    };
  }
  /**
   * Insert a string at a specific index.
   * @param position The position at which to insert the string.
   * @param string The string to insert.
   */
  insertAt(position, string) {
    const value = this.textarea.value;
    this.textarea.value = value.slice(0, position) + string + value.slice(position);
  }
  /**
   * Remove `count` characters at the provided position.
   * @param position The position to remove characters at.
   * @param count The number of characters to remove.
   */
  removeAt(position, count = 1) {
    const value = this.textarea.value;
    this.textarea.value = value.slice(0, position) + value.slice(position + count);
  }
  /**
   * Surround the current selection with a delimiter.
   * @param delimiter The string delimiter.
   */
  toggleSelectionSurrounding(delimiter) {
    const selection = this.getSelection();
    const delimiterLeft = Array.isArray(delimiter) ? delimiter[0] : delimiter;
    const delimiterRight = Array.isArray(delimiter) ? delimiter[1] : delimiter;
    const prevSection = this.textarea.value.slice(selection.start - delimiterLeft.length, selection.start);
    const nextSection = this.textarea.value.slice(selection.end, selection.end + delimiterRight.length);
    if (prevSection === delimiterLeft && nextSection === delimiterRight) {
      this.removeAt(selection.end, delimiterRight.length);
      this.removeAt(selection.start - delimiterLeft.length, delimiterLeft.length);
      this.textarea.setSelectionRange(selection.start - delimiterRight.length, selection.end - delimiterRight.length);
    } else {
      this.insertAt(selection.end, delimiterRight);
      this.insertAt(selection.start, delimiterLeft);
      this.textarea.setSelectionRange(selection.start + delimiterLeft.length, selection.end + delimiterLeft.length);
    }
  }
  /**
   * Toggle a prefix for the current line.
   * @param prefix The string prefix.
   * @param whitespace Whether to handle whitespace separations.
   */
  toggleLinePrefix(prefix, whitespace = "attach") {
    const selection = this.getSelection();
    let index = selection.start;
    while (index > 0 && this.textarea.value.at(index - 1) !== "\n")
      index--;
    let furtherLinesExist = true;
    const startLocation = selection.start;
    let endLocation = selection.end;
    while (furtherLinesExist) {
      const currentPrefix = this.textarea.value.slice(index, index + prefix.length);
      if (currentPrefix === prefix) {
        if (whitespace === "attach" && this.textarea.value.at(index + prefix.length) === " ") {
          this.removeAt(index, prefix.length + 1);
          endLocation -= prefix.length + 1;
        } else {
          this.removeAt(index, prefix.length);
          endLocation -= prefix.length;
        }
      } else {
        if (whitespace === "attach") {
          this.insertAt(index, prefix + " ");
          endLocation += prefix.length + 1;
        } else {
          this.insertAt(index, prefix);
          endLocation += prefix.length;
        }
      }
      while (index < this.textarea.value.length && this.textarea.value.at(index) !== "\n")
        index++;
      if (this.textarea.value.at(index) == "\n")
        index++;
      furtherLinesExist = index < endLocation;
    }
    this.textarea.setSelectionRange(startLocation, endLocation);
  }
  /**
   * Update the textarea.
   */
  update = () => this.events.dispatchEvent(new Event("update"));
  /**
   * Returns x, y coordinates for absolute positioning of a span within a given text input
   * at a given selection point. [Source](https://jh3y.medium.com/how-to-where-s-the-caret-getting-the-xy-position-of-the-caret-a24ba372990a)
   * @param selectionPoint The selection point for the input. Defaults at current cursor position.
   */
  getCursorXY(selectionPoint = this.textarea.selectionStart) {
    const { offsetLeft: inputX, offsetTop: inputY } = this.textarea;
    const div = document.createElement("div");
    const copyStyle = getComputedStyle(this.textarea);
    for (const prop of copyStyle) {
      div.style[prop] = copyStyle[prop];
    }
    const swap = ".";
    const inputValue = this.textarea.tagName === "INPUT" ? this.textarea.value.replace(/ /g, swap) : this.textarea.value;
    const textContent = inputValue.substr(0, selectionPoint);
    div.textContent = textContent;
    if (this.textarea.tagName === "TEXTAREA")
      div.style.height = "auto";
    if (this.textarea.tagName === "INPUT")
      div.style.width = "auto";
    const span = document.createElement("span");
    span.className += "carta-font-code";
    span.textContent = inputValue.substr(selectionPoint) || ".";
    div.appendChild(span);
    document.body.appendChild(div);
    const { offsetLeft: spanX, offsetTop: spanY } = span;
    document.body.removeChild(div);
    return {
      x: inputX + spanX,
      y: inputY + spanY,
      left: inputX + spanX,
      top: inputY + spanY,
      right: this.textarea.clientWidth - inputX,
      bottom: this.textarea.clientHeight - inputY
    };
  }
  /**
   * Moves an element next to the caret. Shall be called every time the element
   * changes width, height or the caret position changes. Consider using `bindToCaret` instead.
   *
   * @example
   * ```svelte
   * <script>
   *   // ...
   *
   *   export let carta;
   *
   *   let caretPosition;
   *   let elem;
   *
   *   onMount(() => {
   *     carta.input.addEventListener('input', handleInput);
   *   });
   *
   *   onDestroy(() => {
   *     carta.input.removeEventListener('input', handleInput);
   *   });
   *
   *   function handleInput() {
   *   	 caretPosition = carta.input.getCursorXY();
   *   }
   *
   *   $: {
   *     caretPosition, elem.clientWidth, elem.clientHeight;
   *     carta.input.moveElemToCaret(elem);
   *   }
   * <\/script>
   *
   * <div bind:this={elem}>
   *   <!-- My stuff -->
   * </div>
   * ```
   *
   * @param elem The element to move.
   */
  moveElemToCaret(elem) {
    const elemWidth = elem.clientWidth;
    const elemHeight = elem.clientHeight;
    const caretPosition = this.getCursorXY();
    const fontSize = this.getRowHeight();
    let left = caretPosition.left;
    let right;
    if (elemWidth < this.container.clientWidth && left + elemWidth - this.container.scrollLeft >= this.container.clientWidth) {
      right = this.container.clientWidth - left;
      left = void 0;
    }
    let top = caretPosition.top;
    let bottom;
    if (elemHeight < this.container.clientHeight && top + elemHeight - this.container.scrollTop >= this.container.clientHeight) {
      bottom = this.container.clientHeight - top;
      top = void 0;
    }
    elem.style.left = left !== void 0 ? left + "px" : "unset";
    elem.style.right = right !== void 0 ? right + "px" : "unset";
    elem.style.top = top !== void 0 ? top + fontSize + "px" : "unset";
    elem.style.bottom = bottom !== void 0 ? bottom + "px" : "unset";
  }
  /**
   * **Internal**: Svelte action to bind an element to the caret position.
   * Use `bindToCaret` from the `carta` instance instead.
   * @param elem The element to position.
   * @param portal The portal to append the element to. Defaults to `document.body`.
   */
  $bindToCaret(elem, data) {
    data.portal.appendChild(elem);
    const themeClass = Array.from(data.editorElement?.classList ?? []).find((c) => c.startsWith("carta-theme__"));
    elem.classList.add(themeClass ?? "carta-theme__default");
    elem.style.position = "fixed";
    const callback = () => {
      const relativePosition = this.getCursorXY();
      const absolutePosition = {
        x: relativePosition.x + this.textarea.getBoundingClientRect().left,
        y: relativePosition.y + this.textarea.getBoundingClientRect().top
      };
      const fontSize = this.getRowHeight();
      const width = elem.clientWidth;
      const height = elem.clientHeight;
      let left = absolutePosition.x;
      let right;
      if (left + width >= window.innerWidth) {
        right = window.innerWidth - left;
        left = void 0;
      }
      let top = absolutePosition.y;
      let bottom;
      if (top + height >= window.innerHeight) {
        bottom = window.innerHeight - top;
        top = void 0;
      }
      elem.style.left = left !== void 0 ? left + "px" : "unset";
      elem.style.right = right !== void 0 ? right + "px" : "unset";
      elem.style.top = top !== void 0 ? top + fontSize + "px" : "unset";
      elem.style.bottom = bottom !== void 0 ? bottom + "px" : "unset";
    };
    this.textarea.addEventListener("input", callback);
    window.addEventListener("resize", callback);
    window.addEventListener("scroll", callback);
    callback();
    return {
      destroy: () => {
        try {
          data.portal.removeChild(elem);
        } catch (e) {
        }
        this.textarea.removeEventListener("input", callback);
        window.removeEventListener("resize", callback);
        window.removeEventListener("scroll", callback);
      }
    };
  }
  /**
   * Get rough value for a row of the textarea.
   */
  getRowHeight() {
    const rawLineHeight = getComputedStyle(this.container).lineHeight;
    const lineHeight = parseFloat(rawLineHeight);
    const fontSize = parseFloat(getComputedStyle(this.container).fontSize);
    if (isNaN(lineHeight)) {
      return Math.ceil(fontSize * 1.2);
    }
    if (rawLineHeight.endsWith("em")) {
      return Math.ceil(lineHeight * fontSize);
    }
    if (rawLineHeight.endsWith("%")) {
      return Math.ceil(lineHeight / 100 * fontSize);
    }
    if (rawLineHeight.endsWith("px")) {
      return Math.ceil(lineHeight);
    }
    return Math.ceil(fontSize * lineHeight);
  }
}
const defaultKeyboardShortcuts = [
  // Bold text
  {
    id: "bold",
    combination: /* @__PURE__ */ new Set(["control", "b"]),
    action: (input) => input.toggleSelectionSurrounding("**")
  },
  // Italic text
  {
    id: "italic",
    combination: /* @__PURE__ */ new Set(["control", "i"]),
    action: (input) => input.toggleSelectionSurrounding("*")
  },
  // Quote
  {
    id: "quote",
    combination: /* @__PURE__ */ new Set(["control", "shift", ","]),
    action: (input) => input.toggleLinePrefix(">")
  },
  // Link
  {
    id: "link",
    combination: /* @__PURE__ */ new Set(["control", "k"]),
    action: (input) => {
      input.toggleSelectionSurrounding(["[", "]"]);
      const position = input.getSelection().end + 1;
      input.insertAt(position, "(url)");
      input.textarea.setSelectionRange(position + 1, position + 4);
    }
  },
  // Strikethrough
  {
    id: "strikethrough",
    combination: /* @__PURE__ */ new Set(["control", "shift", "x"]),
    action: (input) => input.toggleSelectionSurrounding("~~")
  },
  // Code
  {
    id: "code",
    combination: /* @__PURE__ */ new Set(["control", "e"]),
    action: (input) => input.toggleSelectionSurrounding("`")
  },
  // Undo
  {
    id: "undo",
    combination: /* @__PURE__ */ new Set(["control", "z"]),
    preventSave: true,
    action: (input) => {
      const previousState = input.history.undo();
      if (!previousState)
        return;
      input.textarea.value = previousState.value;
      input.textarea.selectionStart = previousState.cursor;
      input.textarea.selectionEnd = previousState.cursor;
    }
  },
  // Redo
  {
    id: "redo",
    combination: /* @__PURE__ */ new Set(["control", "y"]),
    preventSave: true,
    action: (input) => {
      const successiveValue = input.history.redo();
      if (!successiveValue)
        return;
      input.textarea.value = successiveValue.value;
      input.textarea.selectionStart = successiveValue.cursor;
      input.textarea.selectionEnd = successiveValue.cursor;
    }
  }
];
const HeadingIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M4.5 2.75a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0v-4.5h7v4.5a.75.75 0 0 0 1.5 0V2.75a.75.75 0 0 0-1.5 0v4.5h-7v-4.5Z" clip-rule="evenodd"></path></svg>`;
});
const ItalicIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M6.5 2a.75.75 0 0 0 0 1.5h1.93l-2.412 9H4A.75.75 0 0 0 4 14h5.5a.75.75 0 0 0 0-1.5H7.57l2.412-9H12A.75.75 0 0 0 12 2H6.5Z" clip-rule="evenodd"></path></svg>`;
});
const BoldIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M4 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5a3.5 3.5 0 0 0 1.852-6.47A3.5 3.5 0 0 0 8.5 2H4Zm4.5 5a1.5 1.5 0 1 0 0-3H5v3h3.5ZM5 9v3h4.5a1.5 1.5 0 0 0 0-3H5Z" clip-rule="evenodd"></path></svg>`;
});
const QuoteIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M1.5 3.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0v-8.5ZM4.75 3a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Zm0 4.25a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H4.75Zm-.75 5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"></path></svg>`;
});
const LinkIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M9.929 3.132a2.078 2.078 0 1 1 2.94 2.94l-.65.648a.75.75 0 0 0 1.061 1.06l.649-.648a3.579 3.579 0 0 0-5.06-5.06L6.218 4.72a3.578 3.578 0 0 0 0 5.06a.75.75 0 0 0 1.061-1.06a2.078 2.078 0 0 1 0-2.94L9.93 3.132Zm-.15 3.086a.75.75 0 0 0-1.057 1.064c.816.81.818 2.13.004 2.942l-2.654 2.647a2.08 2.08 0 0 1-2.94-2.944l.647-.647a.75.75 0 0 0-1.06-1.06l-.648.647a3.58 3.58 0 0 0 5.06 5.066l2.654-2.647a3.575 3.575 0 0 0-.007-5.068Z" clip-rule="evenodd"></path></svg>`;
});
const ListBulletedIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M1 4.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2ZM4.75 3a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H4.75Zm0 4.25a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H4.75Zm-.75 5a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.75-.75ZM2 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-1 5.25a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z" clip-rule="evenodd"></path></svg>`;
});
const ListNumberedIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M0 2h2v4H1V3H0V2Zm1.637 9.008H0v-1h1.637a1.382 1.382 0 0 1 .803 2.506L1.76 13H3v1H0v-.972L1.859 11.7a.382.382 0 0 0-.222-.693ZM4.75 3a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H4.75Zm0 4.25a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H4.75Zm-.75 5a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"></path></svg>`;
});
const ListTaskIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M4.78 3.28a.75.75 0 0 0-1.06-1.06L1.75 4.19l-.47-.47A.75.75 0 0 0 .22 4.78l1 1a.75.75 0 0 0 1.06 0l2.5-2.5ZM6 3.75A.75.75 0 0 1 6.75 3h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 6 3.75ZM6 8a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 6 8Zm.75 3.5a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Zm-1.97-1.28a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-1-1a.75.75 0 1 1 1.06-1.06l.47.47l1.97-1.97a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd"></path></svg>`;
});
const CodeIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M9.424 2.023a.75.75 0 0 1 .556.904L7.48 13.42a.75.75 0 0 1-1.46-.348L8.52 2.58a.75.75 0 0 1 .904-.556ZM11.16 4.22a.75.75 0 0 1 1.06 0l3.25 3.25L16 8l-.53.53l-3.25 3.25a.75.75 0 1 1-1.06-1.06L13.88 8l-2.72-2.72a.75.75 0 0 1 0-1.06ZM4.84 5.28a.75.75 0 1 0-1.06-1.06L.53 7.47L0 8l.53.53l3.25 3.25a.75.75 0 0 0 1.06-1.06L2.12 8l2.72-2.72Z" clip-rule="evenodd"></path></svg>`;
});
const StrikethroughIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="0" y="0" width="16" height="16" fill="none" stroke="none"></rect><path fill="currentColor" fill-rule="evenodd" d="M7.886 1a3.136 3.136 0 0 0-2.41 5.144L6.4 7.25H2.75a.75.75 0 0 0 0 1.5h4.899l1.722 2.066A1.636 1.636 0 0 1 8.114 13.5H8a1.75 1.75 0 0 1-1.75-1.75a.75.75 0 0 0-1.5 0A3.25 3.25 0 0 0 8 15h.114a3.136 3.136 0 0 0 2.41-5.144L9.6 8.75h3.649a.75.75 0 0 0 0-1.5H8.351L6.63 5.184A1.636 1.636 0 0 1 7.886 2.5H8c.966 0 1.75.784 1.75 1.75a.75.75 0 0 0 1.5 0A3.25 3.25 0 0 0 8 1h-.114Z" clip-rule="evenodd"></path></svg>`;
});
const defaultIcons = [
  {
    id: "heading",
    action: (input) => input.toggleLinePrefix("###"),
    component: HeadingIcon,
    label: "Heading"
  },
  {
    id: "bold",
    action: (input) => input.toggleSelectionSurrounding("**"),
    component: BoldIcon,
    label: "Bold"
  },
  {
    id: "italic",
    action: (input) => input.toggleSelectionSurrounding("*"),
    component: ItalicIcon,
    label: "Italic"
  },
  {
    id: "strikethrough",
    action: (input) => input.toggleSelectionSurrounding("~~"),
    component: StrikethroughIcon,
    label: "Strikethrough"
  },
  {
    id: "quote",
    action: (input) => input.toggleLinePrefix(">"),
    component: QuoteIcon,
    label: "Quote"
  },
  {
    id: "code",
    action: (input) => input.toggleSelectionSurrounding("`"),
    component: CodeIcon,
    label: "Code"
  },
  {
    id: "link",
    action: (input) => {
      input.toggleSelectionSurrounding(["[", "]"]);
      const position = input.getSelection().end + 1;
      input.insertAt(position, "(url)");
      input.textarea.setSelectionRange(position + 1, position + 4);
    },
    component: LinkIcon,
    label: "Link"
  },
  {
    id: "bulletedList",
    action: (input) => input.toggleLinePrefix("- ", "detach"),
    component: ListBulletedIcon,
    label: "Bulleted list"
  },
  {
    id: "numberedList",
    action: (input) => input.toggleLinePrefix("1. ", "detach"),
    component: ListNumberedIcon,
    label: "Numbered list"
  },
  {
    id: "taskList",
    action: (input) => input.toggleLinePrefix("- [ ] ", "detach"),
    component: ListTaskIcon,
    label: "Task list"
  }
];
const matchRegexs = {
  taskList: /^(\s*)(-\s+\[)[ xX]?(\]\s+)/,
  bulletedList: /^(\s*)([-*]\s+)/,
  numberedList: /^(\s*)(\d+)(\.\s+)/,
  blockquote: /^(\s*)([> ]*[>]\s+)/
};
const defaultPrefixes = [
  {
    id: "taskList",
    match: (line) => matchRegexs.taskList.exec(line),
    maker: (prev) => `${prev[1]}${prev[2]} ${prev[3]}`
  },
  {
    id: "bulletedList",
    match: (line) => matchRegexs.bulletedList.exec(line),
    maker: (prev) => `${prev[1]}${prev[2]}`
  },
  {
    id: "numberedList",
    match: (line) => matchRegexs.numberedList.exec(line),
    maker: (prev) => `${prev[1]}${Number(prev[2]) + 1}${prev[3]}`
  },
  {
    id: "blockquote",
    match: (line) => matchRegexs.blockquote.exec(line),
    maker: (prev) => `${prev[1]}${prev[2]}`
  }
];
class Renderer {
  container;
  constructor(container) {
    this.container = container;
  }
}
const defaultTabOuts = [
  {
    id: "bold",
    delimiter: "**"
  },
  {
    id: "italic",
    delimiter: ["*", "_"]
  },
  {
    id: "link",
    delimiter: ")"
  },
  {
    id: "strikethrough",
    delimiter: "~~"
  },
  {
    id: "inline-code",
    delimiter: "`"
  },
  {
    id: "block-code",
    delimiter: "\n```"
  }
];
const cartaEvents = ["carta-render", "carta-render-ssr"];
class Carta {
  sanitizer;
  historyOptions;
  theme;
  shikiOptions;
  rendererDebounce;
  keyboardShortcuts;
  icons;
  prefixes;
  tabOuts;
  grammarRules;
  highlightingRules;
  textareaListeners;
  cartaListeners;
  components;
  dispatcher = new EventTarget();
  gfmOptions;
  syncProcessor;
  asyncProcessor;
  mElement;
  mInput;
  mRenderer;
  mHighlighter;
  mSyncTransformers = [];
  mAsyncTransformers = [];
  get element() {
    return this.mElement;
  }
  get input() {
    return this.mInput;
  }
  get renderer() {
    return this.mRenderer;
  }
  async highlighter() {
    if (this.mHighlighter)
      return this.mHighlighter;
    if (
      // Replaced at build time to tree-shake shiki on the server, if specified
      typeof __ENABLE_CARTA_SSR_HIGHLIGHTER__ !== "undefined" && __ENABLE_CARTA_SSR_HIGHLIGHTER__ === false
    )
      return;
    this.mHighlighter = (async () => {
      const hl = await import("./highlight.js");
      const { loadHighlighter, loadDefaultTheme } = hl;
      return loadHighlighter({
        theme: this.theme ?? await loadDefaultTheme(),
        grammarRules: this.grammarRules,
        highlightingRules: this.highlightingRules,
        shiki: this.shikiOptions
      });
    })();
    return this.mHighlighter;
  }
  elementsToBind = [];
  constructor(options) {
    this.sanitizer = options?.sanitizer || void 0;
    this.historyOptions = options?.historyOptions;
    this.theme = options?.theme;
    this.shikiOptions = options?.shikiOptions;
    this.rendererDebounce = options?.rendererDebounce ?? 300;
    this.keyboardShortcuts = [];
    this.icons = [];
    this.prefixes = [];
    this.tabOuts = [];
    this.textareaListeners = [];
    this.cartaListeners = [];
    this.components = [];
    this.grammarRules = [];
    this.highlightingRules = [];
    const listeners = [];
    for (const ext of options?.extensions ?? []) {
      this.keyboardShortcuts.push(...ext.shortcuts ?? []);
      this.icons.push(...ext.icons ?? []);
      this.prefixes.push(...ext.prefixes ?? []);
      this.tabOuts.push(...ext.tabOuts ?? []);
      this.components.push(...ext.components ?? []);
      this.grammarRules.push(...ext.grammarRules ?? []);
      this.highlightingRules.push(...ext.highlightingRules ?? []);
      listeners.push(...ext.listeners ?? []);
    }
    this.textareaListeners = listeners.filter((it) => !cartaEvents.includes(it[0]));
    this.cartaListeners = listeners.filter((it) => cartaEvents.includes(it[0]));
    this.cartaListeners.forEach((it) => {
      this.dispatcher.addEventListener(...it);
    });
    this.keyboardShortcuts.push(...defaultKeyboardShortcuts.filter((shortcut) => options?.disableShortcuts === true ? false : !options?.disableShortcuts?.includes(shortcut.id)));
    this.icons.unshift(...defaultIcons.filter((icon) => options?.disableIcons === true ? false : !options?.disableIcons?.includes(icon.id)));
    this.prefixes.push(...defaultPrefixes.filter((prefix) => options?.disablePrefixes === true ? false : !options?.disablePrefixes?.includes(prefix.id)));
    this.tabOuts.push(...defaultTabOuts.filter((tabOut) => options?.disableTabOuts === true ? false : !options?.disableTabOuts?.includes(tabOut.id)));
    this.mSyncTransformers = [];
    this.mAsyncTransformers = [];
    for (const ext of options?.extensions ?? []) {
      for (const transformer of ext.transformers ?? []) {
        if (transformer.execution === "sync") {
          this.mSyncTransformers.push(transformer);
        } else {
          this.mAsyncTransformers.push(transformer);
        }
      }
    }
    this.gfmOptions = options?.gfmOptions;
    this.syncProcessor = this.setupSynchronousProcessor({ gfmOptions: this.gfmOptions });
    this.asyncProcessor = this.setupAsynchronousProcessor({ gfmOptions: this.gfmOptions });
    for (const ext of options?.extensions ?? []) {
      if (ext.onLoad) {
        ext.onLoad({
          carta: this
        });
      }
    }
  }
  setupSynchronousProcessor({ gfmOptions }) {
    const syncProcessor = unified();
    const remarkPlugins = this.mSyncTransformers.filter((it) => it.type === "remark");
    const rehypePlugins = this.mSyncTransformers.filter((it) => it.type === "rehype");
    syncProcessor.use(remarkParse);
    syncProcessor.use(remarkGfm, gfmOptions);
    for (const plugin of remarkPlugins) {
      plugin.transform({ processor: syncProcessor, carta: this });
    }
    syncProcessor.use(remarkRehype);
    for (const plugin of rehypePlugins) {
      plugin.transform({ processor: syncProcessor, carta: this });
    }
    syncProcessor.use(rehypeStringify);
    return syncProcessor;
  }
  async setupAsynchronousProcessor({ gfmOptions }) {
    const asyncProcessor = unified();
    const remarkPlugins = [...this.mSyncTransformers, ...this.mAsyncTransformers].filter((it) => it.type === "remark");
    const rehypePlugins = [...this.mSyncTransformers, ...this.mAsyncTransformers].filter((it) => it.type === "rehype");
    asyncProcessor.use(remarkParse);
    asyncProcessor.use(remarkGfm, gfmOptions);
    for (const plugin of remarkPlugins) {
      await plugin.transform({ processor: asyncProcessor, carta: this });
    }
    asyncProcessor.use(remarkRehype);
    for (const plugin of rehypePlugins) {
      await plugin.transform({ processor: asyncProcessor, carta: this });
    }
    asyncProcessor.use(rehypeStringify);
    return asyncProcessor;
  }
  /**
   * Render markdown to html asynchronously.
   * @param markdown Markdown input.
   * @returns Rendered html.
   */
  async render(markdown) {
    if (
      // Replaced at build time to tree-shake shiki on the server, if specified
      typeof __ENABLE_CARTA_SSR_HIGHLIGHTER__ === "undefined" || __ENABLE_CARTA_SSR_HIGHLIGHTER__ === true
    ) {
      const hl = await import("./highlight.js");
      const { loadNestedLanguages } = hl;
      const highlighter = await this.highlighter();
      await loadNestedLanguages(highlighter, markdown);
    }
    const processor = await this.asyncProcessor;
    const result = await processor.process(markdown);
    if (!result)
      return "";
    const dirty = String(result);
    this.dispatcher.dispatchEvent(new CustomEvent("carta-render", { detail: { carta: this } }));
    return (this.sanitizer && this.sanitizer(dirty)) ?? dirty;
  }
  /**
   * Render markdown, excluding syntax highlighting (SSR).
   * @param markdown Markdown input.
   * @returns Rendered html.
   */
  renderSSR(markdown) {
    const dirty = String(this.syncProcessor.processSync(markdown));
    if (typeof dirty != "string")
      return "";
    this.dispatcher.dispatchEvent(new CustomEvent("carta-render-ssr", { detail: { carta: this } }));
    if (this.sanitizer)
      return this.sanitizer(dirty);
    return dirty;
  }
  /**
   * **Internal**: set the editor element.
   * @param element The editor element.
   */
  $setElement(element) {
    this.mElement = element;
  }
  /**
   * **Internal**: set the input element.
   * @param textarea The input textarea element.
   * @param callback Update callback.
   */
  $setInput(textarea, container, callback) {
    const previousInput = this.input;
    this.mInput = new InputEnhancer(textarea, container, {
      shortcuts: this.keyboardShortcuts,
      prefixes: this.prefixes,
      tabOuts: this.tabOuts,
      listeners: this.textareaListeners,
      historyOpts: this.historyOptions
    });
    if (previousInput) {
      previousInput.events.removeEventListener("update", callback);
      this.mInput.history = previousInput.history;
    }
    this.mInput.events.addEventListener("update", callback);
    this.elementsToBind.forEach((it) => {
      it.callback = this.input?.$bindToCaret(it.elem, {
        portal: it.portal,
        editorElement: this.element
      }).destroy;
    });
  }
  /**
   * **Internal**: set the renderer element.
   * @param container Div container of the rendered element.
   */
  $setRenderer(container) {
    this.mRenderer = new Renderer(container);
  }
  /**
   * Bind an element to the caret position.
   * @param element The element to bind.
   * @param portal The portal element.
   * @returns The unbind function.
   *
   * @example
   * ```svelte
   * <script>
   *   export let carta;
   * <\/script>
   *
   * <div use:carta.bindToCaret>
   *   <!-- Stuff here -->
   * </div>
   *
   * ```
   */
  bindToCaret(element, portal = document.querySelector("body")) {
    let callback;
    if (this.input)
      callback = this.input.$bindToCaret(element, { portal, editorElement: this.element }).destroy;
    this.elementsToBind.push({ elem: element, portal, callback });
    return {
      destroy: () => {
        callback && callback();
        this.elementsToBind = this.elementsToBind.filter((it) => it.elem != element);
      }
    };
  }
}
export {
  Carta as C,
  Icon as I,
  MarkdownEditor as M
};
