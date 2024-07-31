import { C as Carta, m as math } from "./carta2.js";
import { tikz } from "@cartamd/plugin-tikz";
import "diff";
const carta = new Carta({
  sanitizer: false,
  extensions: [
    math(),
    tikz({
      postProcessing: (html) => {
        return html.replaceAll("#000000", "~~~").replaceAll("#000", "~~~").replaceAll("black", "~~~").replaceAll("#ffffff", "#000").replaceAll("#fff", "#000").replaceAll("white", "#000").replaceAll("~~~", "#fff");
      }
    })
  ]
});
export {
  carta as c
};
