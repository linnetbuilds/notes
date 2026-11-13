# Two AI coding tools, one setup

From the video R05 (2026-11-13). One rules file, written out for each tool, so either
Claude Code or Codex can open the project tomorrow and follow the same rules.

Del video R05: un solo archivo de reglas, escrito para cada herramienta.

## What is here

| File | What it does |
|---|---|
| `rules/RULES.md` | The rules. **Edit only this file.** |
| `rules/claude-code.header.md`, `rules/codex.header.md` | The few lines that differ per tool (where its skills and hooks live) |
| `targets.json` | Tool names, output files and skill folders |
| `generate.py` | Writes `CLAUDE.md` and `AGENTS.md` from the rules, and links each tool's skill folder to the shared `skills/` |
| `skills/handoff/SKILL.md` | A shared skill: update `HANDOFF.md` at the end of every session |

## Use it

```
python3 generate.py           # writes CLAUDE.md and AGENTS.md, links the skills
python3 generate.py --check   # exit 1 if a generated file is out of date
```

Skills are linked, not copied: `.claude/skills` and `.agents/skills` both point to
`skills/`. Two copies drift apart within a week. On Windows, run it in WSL (or enable
Developer Mode) so the links can be created.

Start a `HANDOFF.md` with three headings, "Current state", "Next" and "Decisions"; the
handoff skill keeps the first two up to date, so whichever tool opens next knows where the
last session stopped.

Want rules to start from? [`../agent-rules`](../agent-rules) (carousel C01).

## What does not move

Not everything has an equivalent. In the video every piece has a status: direct,
converted, workaround or none. Recurring prompts, for example, have no Codex equivalent,
so they run from cron. Hooks need a small adapter per tool; the Codex side was tested with
a sample payload, not in a live session.

## Cost

$0 for the files. Claude Code works on Claude Pro, $20/mo, with usage limits. Codex comes with ChatGPT Plus,
$20/mo (prices as of Oct 2026).
