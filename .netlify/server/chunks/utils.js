import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const scaleConversion = (valueA, scaleA, scaleB) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;
    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;
    return valueB;
  };
  const styleToString = (style2) => {
    return Object.keys(style2).reduce((str, key) => {
      if (style2[key] === void 0) return str;
      return str + `${key}:${style2[key]};`;
    }, "");
  };
  return {
    duration: params.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
      const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
      const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
      return styleToString({
        transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};
function splitBySpaces(input) {
  return input.split(" ").filter((word) => word.length > 0);
}
function getAcceptType(type) {
  switch (type) {
    case "image":
      return "image/*";
    case "model":
      return ".obj,.fbx,.dae";
    case "video":
      return "video/*";
    case "music":
      return "audio/*";
    default:
      return "";
  }
}
function generate8DigitCode() {
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}
function generateRandomBinary() {
  return Math.floor(Math.random() * 2);
}
function swapElements(arr, index1, index2) {
  if (index1 >= arr.length || index2 < 0 || index2 >= arr.length) {
    throw new Error("Index out of bounds");
  }
  const temp = String(arr[index1]);
  arr[index1] = String(arr[index2]);
  arr[index2] = String(temp);
}
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  };
  return new Date(dateString).toLocaleString("en-US", options);
}
export {
  flyAndScale as a,
  cubicOut as b,
  cn as c,
  getAcceptType as d,
  splitBySpaces as e,
  formatDate as f,
  generateRandomBinary as g,
  generate8DigitCode as h,
  swapElements as s
};
