import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const root = process.cwd();
const skip = new Set(["node_modules", ".git", "dist", ".astro"]);
const ok = new Set([".js", ".mjs", ".html", ".css", ".md", ".mdc", ".ts", ".txt", ".xml"]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) walk(path, files);
    else if (ok.has(extname(name))) files.push(path);
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  const before = readFileSync(file, "utf8");
  if (!before.includes("\u2014")) continue;
  writeFileSync(file, before.replaceAll("\u2014", "\u2013"));
  changed += 1;
  console.log(file.replace(root + "\\", ""));
}
console.log(`updated ${changed} files`);
