import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "_site");
const base = "/LiFR_Anything/";

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, "dist/client"), output, { recursive: true });

const workerUrl = pathToFileURL(path.join(root, "dist/server/index.js"));
workerUrl.searchParams.set("pages-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render failed: ${response.status}`);
let html = await response.text();
html = html
  .replaceAll('href="/', `href="${base}`)
  .replaceAll('src="/', `src="${base}`)
  .replaceAll('href="#', 'href="#')
  .replaceAll(`${base}${base.slice(1)}`, base);

await writeFile(path.join(output, "index.html"), html);
await writeFile(path.join(output, ".nojekyll"), "");

const manifest = JSON.parse(
  await readFile(path.join(root, "dist/client/.vite/manifest.json"), "utf8"),
);
if (!Object.keys(manifest).length) throw new Error("Client manifest is empty");
console.log(`Exported GitHub Pages site to ${output}`);
