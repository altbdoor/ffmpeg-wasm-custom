import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));

// copy umd files to test folder
const distDir = join(__dirname, "dist");
if (!existsSync(distDir)) {
  mkdirSync(distDir);
}

const buildOutputDir = join(__dirname, "..", "packages", "core", "dist", "umd");
cpSync(buildOutputDir, distDir, {
  recursive: true,
});

// create local umd ffmpeg core files
const ffmpegDir = join(__dirname, "ffmpeg");
if (!existsSync(ffmpegDir)) {
  mkdirSync(ffmpegDir);
  const base = "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.15";
  const jsFiles = ["814.ffmpeg.js", "ffmpeg.js"];

  for (const jsFile of jsFiles) {
    const jsPath = join(ffmpegDir, jsFile);

    if (existsSync(jsPath)) {
      return;
    }

    const res = await fetch(`${base}/dist/umd/${jsFile}`);
    writeFileSync(jsPath, Buffer.from(await res.arrayBuffer()));
  }
}

// prepare http server
const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".wasm": "application/wasm",
};

const server = createServer((req, res) => {
  const filePath = join(__dirname, req.url);
  const ext = extname(filePath);

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end();
    return;
  }

  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  res.end(readFileSync(filePath));
});

await new Promise((backlog) => server.listen(8000, "127.0.0.1", backlog));

// run chromium to test
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_BIN,
  headless: true,
});
const page = await browser.newPage();

await page.goto("http://127.0.0.1:8000/test.html");

await page.waitForFunction(() => {
  const el = document.getElementById("log");
  return el && el.textContent.includes("===END===");
});

// extract log
const output = await page.$eval("#log", (el) => el.textContent);
const logPath = join(__dirname, "log.txt");
writeFileSync(logPath, output.trim());

// cleanup
await browser.close();
server.close();
