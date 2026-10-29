# 6 rules my AI agents follow

From the carousel C01 (2026-10-29). Each rule exists because something went wrong.
Works with any coding agent that reads an instruction file: Claude Code reads `CLAUDE.md`,
Codex reads `AGENTS.md`.

Del carrusel C01. Las reglas en español están en [`RULES.es.md`](RULES.es.md).

## Use it

1. Paste [`RULES.md`](RULES.md) (or `RULES.es.md`) at the end of your `CLAUDE.md` or
   `AGENTS.md`.
2. Optional, for rule 5: copy the `hooks/` folder into your project. For Claude Code, merge
   `hooks/claude-code-settings.json` into `.claude/settings.json`. Every `.md`, `.txt` or
   `.tex` file the agent writes is then checked against `hooks/banned_words.txt`, and a hit
   goes straight back to the agent so it rewrites the line.
3. Edit `hooks/banned_words.txt` with your own pet hates, one per line. The last line is
   the em dash character, on purpose.

Check a file by hand: `python3 hooks/banned_words.py draft.md`.

## Cost

The rules and the hook are plain text and Python: $0. Needs Python 3. The agent itself:
Claude Code works on Claude Pro, $20/mo, with usage limits (prices as of Oct 2026).

## Same setup in two tools

To keep these rules in one file for both Claude Code and Codex, see
[`../two-tools-setup`](../two-tools-setup) (video R05).
