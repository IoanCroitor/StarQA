import { e as setContext, g as getContext, b as compute_rest_props, s as subscribe, n as noop } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, f as escape_object, b as add_attribute, d as escape_attribute_value, v as validate_component } from "./ssr.js";
import "dequal";
import { o as omit, e as effect, m as makeElement, s as styleToString, d as isBrowser } from "./index3.js";
import { c as cn } from "./utils.js";
import { t as toWritableStores, o as overridable, r as removeUndefined, g as getOptionUpdater } from "./updater.js";
import { w as writable } from "./index6.js";
import { c as createBitAttrs } from "./attrs.js";
import { h as handleToast } from "./handleToast.js";
import "./supabaseClient.js";
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
async function getFieldnameByUserIdInTable(userId, field, table, supabase2) {
  let { data: user_data, error } = await supabase2.from(table).select(field).eq("user_id", userId);
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
async function getProfilePictureByUserId(userId, supabase2) {
  const profilePictureName = await getFieldnameByUserIdInTable(
    userId,
    "profile_picture",
    "user_data",
    supabase2
  );
  if (!profilePictureName)
    return "https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/profile_pictures/user.png";
  const profilePictureUrl = `https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/profile_pictures/${profilePictureName}`;
  return profilePictureUrl;
}
async function getUsernameByUserId(userId, supabase2) {
  return await getFieldnameByUserIdInTable(
    userId,
    "username",
    "user_data",
    supabase2
  );
}
function getNameById(id, supabase2) {
  return getFieldnameByUserIdInTable(id, "name", "user_data", supabase2);
}
async function fetchLeaderboardData(supabase2) {
  const { data, error } = await supabase2.from("leaderboard").select(
    `
      rank,
      score,
      user_data (username)
    `
  ).order("rank", { ascending: true });
  if (error) {
    handleToast("error", Number(error.code), error.message);
    return { data: null, error };
  }
  return { data, error: null };
}
export {
  Avatar as A,
  getUsernameByUserId as a,
  getProfilePictureByUserId as b,
  getNameById as c,
  Avatar_image as d,
  fetchLeaderboardData as f,
  getCtx as g
};
