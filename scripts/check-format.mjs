import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trimEnd();
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

function getLocalRange() {
  let baseRef = null;

  for (const ref of ["origin/main", "main"]) {
    try {
      git(["rev-parse", "--verify", `${ref}^{commit}`]);
      baseRef = ref;
      break;
    } catch {
      // Try the next local base reference.
    }
  }

  if (!baseRef) {
    return null;
  }

  return {
    base: git(["merge-base", baseRef, "HEAD"]),
    head: "HEAD",
  };
}

function lineOffset(lines, lineNumber) {
  let offset = 0;

  for (let index = 0; index < lineNumber - 1; index += 1) {
    offset += (lines[index] ?? "").length + 1;
  }

  return offset;
}

function checkWholeFile(file) {
  if (file === "scripts/check-format.mjs") {
    const formatted = execFileSync("npx", ["prettier", file], {
      encoding: "utf8",
    });
    console.log("FORMAT_OUTPUT_START");
    process.stdout.write(formatted);
    console.log("FORMAT_OUTPUT_END");
  }

  const args = [
    "prettier",
    "--check",
    "--ignore-unknown",
    "--",
    file,
  ];

  execFileSync("npx", args, { stdio: "inherit" });
}

function checkLegacyChanges(file, range) {
  const diffArgs = ["diff", "--no-ext-diff", "--unified=0"];

  diffArgs.push(range ? `${range.base}...${range.head}` : "HEAD");
  diffArgs.push("--", file);

  const patch = git(diffArgs);
  const content = readFileSync(file, "utf8");
  const lines = content.split("\n");
  const header = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm;
  let match;

  while ((match = header.exec(patch)) !== null) {
    const startLine = Number(match[1]);
    const lineCount = Number(match[2] ?? 1);

    if (lineCount === 0) {
      continue;
    }

    const start = lineOffset(lines, startLine);
    const end = lineOffset(lines, startLine + lineCount);

    if (end <= start) {
      continue;
    }

    const args = [
      "prettier",
      "--check",
      "--range-start",
      String(start),
      "--range-end",
      String(end),
      "--ignore-unknown",
      "--",
      file,
    ];

    execFileSync("npx", args, { stdio: "inherit" });
  }
}

const range = getCiRange() ?? getLocalRange();
const diffArgs = [
  "diff",
  "--name-only",
  "--diff-filter=ACMR",
  range ? `${range.base}...${range.head}` : "HEAD",
];

const changedFiles = git(diffArgs)
  .split(/\r?\n/)
  .filter(Boolean);

if (!range) {
  const untracked = git([
    "ls-files",
    "--others",
    "--exclude-standard",
  ])
    .split(/\r?\n/)
    .filter(Boolean);

  changedFiles.push(...untracked);
}

const legacyFormattingDebt = new Set([
  "src/pages/cause.astro",
  "src/pages/contact.astro",
  "src/pages/index.astro",
]);

if (changedFiles.length === 0) {
  console.log("No changed files to format-check.");
  process.exit(0);
}

for (const file of new Set(changedFiles)) {
  if (legacyFormattingDebt.has(file)) {
    checkLegacyChanges(file, range);
  } else {
    checkWholeFile(file);
  }
}
