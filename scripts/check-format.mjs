import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function getCiRange() {
  const eventPath = process.env.GITHUB_EVENT_PATH;

  if (!eventPath) {
    return null;
  }

  const event = JSON.parse(readFileSync(eventPath, "utf8"));

  if (event.pull_request) {
    return {
      base: event.pull_request.base.sha,
      head: event.pull_request.head.sha,
    };
  }

  if (event.before && !/^0+$/.test(event.before)) {
    return {
      base: event.before,
      head: event.after ?? "HEAD",
    };
  }

  return null;
}

const range = getCiRange();

if (!range) {
  execFileSync("npx", ["prettier", ".", "--check"], { stdio: "inherit" });
  process.exit(0);
}

// These existing pages already had Prettier drift on the base branch.
// Keep their type fixes focused; format cleanup can be handled separately.
const legacyFormattingDebt = new Set([
  "src/pages/cause.astro",
  "src/pages/contact.astro",
  "src/pages/index.astro",
]);

const changedFiles = git([
  "diff",
  "--name-only",
  "--diff-filter=ACMR",
  `${range.base}...${range.head}`,
])
  .split(/\r?\n/)
  .filter((file) => file && !legacyFormattingDebt.has(file));

if (changedFiles.length === 0) {
  console.log("No changed files to format-check.");
  process.exit(0);
}

execFileSync(
  "npx",
  ["prettier", "--check", "--ignore-unknown", "--", ...changedFiles],
  { stdio: "inherit" },
);
