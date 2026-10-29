#!/usr/bin/env python3
"""Flag banned words the moment a file is written (PostToolUse hook, shared by both tools).

As a hook it reads the tool call as JSON on stdin and checks tool_input.file_path.
By hand:  python3 hooks/banned_words.py <file> [<file> ...]

Exit 0 when clean. Exit 2 with the hits on stderr, which Claude Code feeds straight back
to the session that wrote the file, so it rewrites the sentence before moving on.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORDS = [w.strip() for w in (ROOT / "hooks/banned_words.txt").read_text("utf-8").splitlines()
         if w.strip() and not w.startswith("#")]
CHECKED = {".md", ".tex", ".txt"}


def pattern(word: str) -> re.Pattern:
    body = re.escape(word)
    return re.compile(body if not word[0].isalnum() else rf"\b{body}\b", re.I)


RULES = [(w, pattern(w)) for w in WORDS]


def check(path: Path) -> list[str]:
    if path.suffix.lower() not in CHECKED or not path.is_file():
        return []
    hits = []
    for n, line in enumerate(path.read_text("utf-8", "replace").splitlines(), 1):
        line = re.sub(r'"[^"]*"', "", line)   # a quoted phrase is a mention (the rules name them)
        for word, rx in RULES:
            if rx.search(line):
                hits.append(f"{path.relative_to(ROOT) if ROOT in path.parents else path}:{n}: "
                            f"banned word '{word}'")
    return hits


def main() -> int:
    if len(sys.argv) > 1:
        files = [Path(a).resolve() for a in sys.argv[1:]]
    else:
        call = json.load(sys.stdin)
        fp = (call.get("tool_input") or {}).get("file_path")
        files = [Path(fp).resolve()] if fp else []
    hits = [h for f in files for h in check(f)]
    if not hits:
        return 0
    print("Wording check failed. Rewrite these lines without the banned words "
          "(list: hooks/banned_words.txt):", file=sys.stderr)
    for h in hits:
        print(f"  {h}", file=sys.stderr)
    return 2


if __name__ == "__main__":
    sys.exit(main())
