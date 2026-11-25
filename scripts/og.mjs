// Social cards (og:image) for the site, taken as screenshots of an HTML page
// with headless Chrome, so that they look exactly like the HTML.
//
//   npm run og
//
// writes public/og/default.png and public/og/blog/<post>.png for every post
// that is not a draft.  Run it after adding a post or changing its title, and
// commit the images with the post.  Pages without a card of their own use
// default.png (see src/components/Head.astro).
//
// Chrome is looked up in the usual places; set CHROME to use another one.

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const blogDir = join(root, "src/content/blog");
const outDir = join(root, "public/og");

const SITE_TITLE = "analytical engines";
const SITE_DESCRIPTION =
  "I'm an imaginary programmable computing machine powered by a steam engine.";
const SITE_HOST = "analytical-engines.com";

function findChrome() {
  const candidates = [
    process.env.CHROME,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((path) => existsSync(path));
  if (!found) throw new Error("Chrome not found; set CHROME to its path");
  return found;
}

// Just enough YAML for our frontmatter: title, date, draft and a tag list.
function frontmatter(file) {
  const text = readFileSync(file, "utf8");
  const block = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
  const scalar = (key) => block.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, "m"))?.[1];
  const tags = [...(block.match(/^tags:\n((?:\s+- .*\n?)*)/m)?.[1] ?? "").matchAll(/- (.*)/g)]
    .map((m) => m[1].trim());
  return { title: scalar("title"), date: scalar("date"), draft: scalar("draft") === "true", tags };
}

const escape = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const fileURL = (path) => pathToFileURL(path).href;

function cardHTML({ meta, heading, headingSize }) {
  const serif = fileURL(join(root, "node_modules/@fontsource-variable/noto-serif-jp/index.css"));
  const mono = fileURL(join(root, "node_modules/@fontsource/geist-mono/400.css"));
  const plan = fileURL(join(root, "scripts/og/general-plan.jpg"));
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="${serif}"><link rel="stylesheet" href="${mono}">
<style>
html,body{margin:0;width:1200px;height:630px}
body{background:#efe7d6 url("${plan}") no-repeat right -60px center/auto 120%}
.card{box-sizing:border-box;width:1200px;height:630px;padding:84px 96px;
  display:flex;flex-direction:column;justify-content:space-between;color:#2b2118;
  background:linear-gradient(90deg,#efe7d6 0%,#efe7d6 52%,rgba(239,231,214,.55) 72%,rgba(239,231,214,.15) 100%)}
.meta{font-family:"Geist Mono",monospace;font-size:26px;color:#6b5a48;letter-spacing:.02em}
h1{font-family:"Noto Serif JP Variable",serif;font-weight:600;font-size:${headingSize}px;
  line-height:1.18;margin:0;max-width:740px}
.foot{display:flex;justify-content:space-between;align-items:baseline;
  border-top:2px solid rgba(80,60,40,.35);padding-top:28px}
.name{font-family:"Noto Serif JP Variable",serif;font-weight:500;font-size:36px}
.host{font-family:"Geist Mono",monospace;font-size:24px;color:#6b5a48}
</style></head><body><div class="card">
<div class="meta">${escape(meta)}</div>
<h1>${escape(heading)}</h1>
<div class="foot"><div class="name">${SITE_TITLE} ⚙️</div><div class="host">${SITE_HOST}</div></div>
</div></body></html>`;
}

function shoot(chrome, html, out) {
  const dir = mkdtempSync(join(tmpdir(), "og-"));
  const page = join(dir, "card.html");
  writeFileSync(page, html);
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars",
    "--allow-file-access-from-files", "--force-device-scale-factor=1",
    "--window-size=1200,630", "--virtual-time-budget=8000",
    `--screenshot=${out}`, fileURL(page),
  ], { stdio: "ignore" });
  console.log(`wrote ${out.replace(root + "/", "")}`);
}

const chrome = findChrome();
mkdirSync(join(outDir, "blog"), { recursive: true });

shoot(chrome, cardHTML({ meta: "", heading: SITE_DESCRIPTION, headingSize: 54 }),
      join(outDir, "default.png"));

for (const id of readdirSync(blogDir)) {
  const file = ["index.md", "index.mdx"].map((f) => join(blogDir, id, f)).find(existsSync);
  if (!file) continue;
  const post = frontmatter(file);
  if (post.draft) continue;
  const meta = [post.date, ...post.tags].filter(Boolean).join(" · ");
  shoot(chrome, cardHTML({ meta, heading: post.title, headingSize: 60 }),
        join(outDir, "blog", `${id}.png`));
}
