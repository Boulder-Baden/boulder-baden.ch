// Builds a JSON list of photos for each live gallery in public/live/<event>/.
// Output: public/live/<event>.json, newest upload first.
// Photos are ordered by the time they were committed (falls back to file time).
import { execFileSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = "public/live";
const imageFile = /\.(jpe?g|png|webp|gif|avif)$/i;

function addedAt(file) {
  try {
    const out = execFileSync(
      "git",
      ["log", "--diff-filter=A", "--format=%ct", "-1", "--", file],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    if (out) return Number(out) * 1000;
  } catch {}
  return Math.round(statSync(file).mtimeMs);
}

if (existsSync(root)) {
  for (const event of readdirSync(root)) {
    const dir = join(root, event);
    if (!statSync(dir).isDirectory()) continue;

    const photos = readdirSync(dir)
      .filter((name) => imageFile.test(name))
      .map((name) => ({
        src: `/live/${event}/${encodeURIComponent(name)}`,
        added: addedAt(join(dir, name)),
      }))
      .sort((a, b) => b.added - a.added || b.src.localeCompare(a.src));

    writeFileSync(join(root, `${event}.json`), JSON.stringify(photos));
    console.log(`live gallery "${event}": ${photos.length} photos`);
  }
}
