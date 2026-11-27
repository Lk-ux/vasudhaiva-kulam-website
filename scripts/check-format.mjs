import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function git(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trimEnd();
}

function canResolve(ref) {
  try {
    git(["rev-parse", "--verify", `${ref}^{commit}`]);
    return true;
  } catch {
    return false;
  }
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
  const baseRef = ["origin/main", "main"].find(canResolve);

  if (!baseRef) {
    return null;
  }

  return {
    base: git(["merge-base", baseRef, "HEAD"]),
    head: "HEAD",
  };
}

function getChangedFiles(range) {
  const changed = git([
    "diff",
    "--name-only",
    "--diff-filter=ACMR",
    ...(range ? [`${range.base}...${range.head}`] : ["HEAD"]),
  ])
    .split(/\r?\n/)
    .filter(Boolean);

  if (range) {
    return changed;
  }

  const untracked = git(["ls-files", "--others", "--exclude-standard"])
    .split(/\r?\n/)
    .filter(Boolean);

  return [...new Set([...changed, ...untracked])];
}

function getAddedRanges(patch, content) {
  const lines = content.split("\n");
  const offsetForLine = (lineNumber) =>
    lines
      .slice(0, lineNumber - 1)
      .reduce((offset, line) => offset + line.length + 1, 0);

  return [...patch.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)]
    .map((match) => {
      const startLine = Number(match[1]);
      const lineCount = Number(match[2] ?? 1);

      if (lineCount === 0) {
        return null;
      }

      return {
        start: Math.min(offsetForLine(startLine), content.length),
        end: Math.min(offsetForLine(startLine + lineCount), content.length),
      };
    })
    .filter((range) => range && range.end > range.start);
}

function checkWholeFile(file) {
  execFileSync(
    "npx",
    ["prettier", "--check", "--ignore-unknown", "--", file],
    { stdio: "inherit" },
  );
}

function checkChangedRanges(file, patch) {
  const content = readFileSync(file, "utf8");
  const ranges = getAddedRanges(patch, content);

  if (ranges.length === 0) {
    return;
  }

  for (const range of ranges) {
    execFileSync(
      "npx",
      [
        "prettier",
        "--check",
        "--range-start",
        String(range.start),
        "--range-end",
        String(range.end),
        "--ignore-unknown",
        "--",
        file,
      ],
      { stdio: "inherit" },
    );
  }
}

const range = getCiRange() ?? getLocalRange();
const changedFiles = getChangedFiles(range);

// These pages predate the repository-wide Prettier cleanup. Check their
// changed regions without making unrelated legacy formatting block CI.
const legacyFormattingDebt = new Set([
  "src/pages/cause.astro",
  "src/pages/contact.astro",
  "src/pages/index.astro",
]);

if (changedFiles.length === 0) {
  console.log("No changed files to format-check.");
  process.exit(0);
}

for (const file of changedFiles) {
  if (legacyFormattingDebt.has(file)) {
    const diffArgs = [
      "diff",
      "--no-ext-diff",
      "--unified=0",
      ...(range ? [`${range.base}...${range.head}`] : ["HEAD"]),
      "--",
      file,
    ];
    checkChangedRanges(file, git(diffArgs));
  } else {
    checkWholeFile(file);
  }
}
