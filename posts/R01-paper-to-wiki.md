# R01: Parser reads, AI writes

**Video:** 2026-10-26 · English voice

My papers are read by a parser on my own computer, not by the AI I pay for. That AI only
writes the wiki page.

## What it does

1. **Send.** I send a PDF (or an arXiv link) to a private Telegram bot from my phone. A
   short tag in the caption, like `#llm-agents`, says which part of the wiki it belongs to.
2. **File.** On my computer, the bot saves the PDF in a folder of raw sources, next to a
   small note on where it came from (when, how it arrived, the caption). The original file
   is never edited.
3. **Parse.** A PDF parser pulls out the text, tables, equations and figures. It keeps
   diagrams and leaves out logos and photos.
4. **Write.** An AI agent reads the paper and writes its wiki page: the citation, a
   one-line takeaway, and the key claims, each tied back to the paper. It links the page
   to concept pages already in the wiki and updates them.
5. **Reply.** The bot sends a short summary back to my phone.

The wiki is a folder of plain Markdown files, opened in Obsidian.

## Measured

Recording run, 2026-10-18: PDF sent from the phone at 17:20, ingest finished at 17:24:27,
so **4 min 9 s** from phone to page, including the parser.

![The Telegram bot chat on the recording run: the PDF sent at 17:20, the bot's reply that it filed the paper, and at 17:24:27 a summary of the new wiki page and the pages it linked](img/R01-bot-reply.jpg)

The parser found 174 text
blocks, 20 tables, 1 equation and 21 figures and charts in the paper (Wu et al. 2023,
AutoGen, arXiv:2308.08155), and the new page linked to 12 pages already in the wiki.

The parser runs on my own GPU, so reading the PDF spends no AI tokens.

Earlier test without the parser, 2026-10-16: **2 min 40 s**.

## Tools

| Piece | Tool |
|---|---|
| Phone inbox | A Telegram bot (Telegram Bot API) |
| PDF parser | MinerU (open source) |
| Agent | Claude Code, run without a terminal (`claude -p`) |
| Wiki | Markdown files, viewed in Obsidian |

## Cost (prices as of Oct 2026)

- Telegram bot: free.
- MinerU and Obsidian: free (Obsidian is free for personal use).
- Claude Code: included from Claude Pro, **$20/month**, which has usage limits. I use Max ($200/month) for
  everything I build, not just this.

## On screen

A demo vault with open-access papers.

## Try it

Builds a small local version of steps 2 and 4. A script files a PDF in `raw/` next to a
`.source.md` note on where it came from. Then the agent writes the paper's wiki page: the
citation, a one-line takeaway, and key claims, each with its page number. Needs Claude Code
(or Codex), Python 3 and `pdftotext` (poppler-utils), run in an empty folder with one
open-access PDF in it. It leaves out the Telegram inbox and the MinerU parser; add those once
this works. Tested on 2026-10-16 with Claude Code 2.1.301. It passed on the first run in about
2 minutes, on an open-access arXiv paper, and I checked the cited pages against the PDF.

```text
Build a tiny "paper inbox -> wiki" in this folder. Needs Python 3; to read PDFs use your own PDF reading or `pdftotext` (poppler-utils). I have put one open-access PDF in this folder.

1. Create `raw/` (filed sources, never edited after filing), `wiki/sources/` and `wiki/concepts/`. Add two short concept pages to `wiki/concepts/`: `multi-agent-systems.md` and `tool-use.md` (title + two lines each).
2. Write `file_paper.py PDF --tag TAG [--note TEXT]` (standard library only): copy (never move) the PDF to `raw/<tag>/`, refuse to overwrite, and write `<file>.source.md` next to it with: filed_at (ISO time), original path, sha256, tag, note.
3. Write `SOURCE_PAGE.md`: instructions an agent follows to turn one filed PDF into `wiki/sources/<file stem>.md` with exactly these sections:
   - `## Citation`: authors, year, title, venue or arXiv id, as printed on the paper
   - `## Takeaway`: one line
   - `## Key claims`: 3-7 bullets, each ending with its PDF page number, like `(p. 4)`
   - `## Concepts`: [[wikilinks]] only to pages that exist in `wiki/concepts/`, and add a backlink line to each linked concept page
   - `## Source`: relative links to the raw PDF and its .source.md
   Rules: use only the PDF (no memory, no web); every claim must be on the page it cites; if unsure, leave it out.
4. File the PDF in this folder with tag `test`, then follow SOURCE_PAGE.md yourself to write its page.

Done when: the sha256 of `raw/test/<file>.pdf` matches the one in its .source.md, the source page has all five sections, every key claim ends with a page number, and every [[link]] has a file in `wiki/concepts/`.
Left out on purpose: the phone inbox (e.g. a Telegram bot) and a full PDF parser for tables, equations and figures (e.g. MinerU).
```

## Gotchas

- **MinerU 3.4 labels plots `chart`, not `image`.** A bridge that only copies `image` blocks
  silently drops every plot.
- **`pdftext` 0.7.1 crashed MinerU 3.4.0** on one paper. Pinning `pdftext` below 0.7 fixed it.
- **Without Pillow, the logo/photo size filter saw every image as 0x0**, so it skipped nothing.
- **A size/shape "is it a headshot?" filter caught only 5 of 13 author photos** in one paper,
  because taller portraits pass as figures. Never trust it without checking.
- **Rename the PDF before filing it** (e.g. `author-year-topic.pdf`). The page is named after
  the file, so two files called `paper.pdf` would collide. (Found while testing the prompt.)
- **"(p. 4)" means the PDF's 4th page.** In a journal reprint, that may not be the number
  printed on the page. (Found while testing the prompt.)

---

**En español:** le mando un paper a un bot de Telegram; en mi computadora se guarda con una
nota de origen, un parser saca texto, tablas, ecuaciones y figuras, y un agente escribe la
página de la wiki y la conecta con lo que ya sé. El parser corre en mi computadora, así que
leer el PDF no gasta tokens. Medido en la grabación: 4 min 9 s. Costo
mínimo: Claude Pro, $20/mes, con límites de uso (precios a oct 2026).

**Pruébalo:** el prompt de "Try it" (en inglés) arma una versión pequeña: archiva el
PDF con su nota de origen y escribe la página con cada afirmación atada a su página. Probado
el 2026-10-16.
