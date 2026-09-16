import { readFileSync, writeFileSync } from "node:fs";
import { messages } from "../src/i18n/messages.js";
import { messages as pages } from "../src/i18n/pages.js";

const homeDict = messages.en;
const pageDict = { ...messages.en, ...pages.en };
const files = [
  ["index.html", homeDict],
  ["about/index.html", pageDict],
  ["agriculture/index.html", pageDict],
  ["agriculture/avocado/index.html", pageDict],
  ["livestock/index.html", pageDict],
  ["livestock/dairy/index.html", pageDict],
  ["livestock/beef/index.html", pageDict],
  ["sustainability/index.html", pageDict],
  ["future/index.html", pageDict],
  ["insights/index.html", pageDict],
  ["contact/index.html", pageDict],
];

for (const [file, dict] of files) {
  let html = readFileSync(file, "utf8");
  html = html.replace(/data-i18n="([^"]+)"([^>]*)>([^<]*)<\/([a-z0-9]+)>/gi, (match, key, attrs, current, tag) => {
    const text = dict[key];
    if (!text) return match;
    return `data-i18n="${key}"${attrs}>${text}</${tag}>`;
  });
  writeFileSync(file, html);
  console.log("filled", file);
}
