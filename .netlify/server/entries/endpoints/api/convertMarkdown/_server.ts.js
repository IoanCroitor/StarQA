import { C as Carta, m as math } from "../../../../chunks/carta.js";
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
const POST = async ({ request }) => {
  try {
    const { markdown } = await request.json();
    if (typeof markdown !== "string") {
      return new Response("Invalid markdown input", { status: 400 });
    }
    const html = await carta.render(markdown);
    return new Response(JSON.stringify({ html }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error converting Markdown:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
export {
  POST
};
