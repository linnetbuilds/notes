## Rules

- **Fetch the record itself.** Never take a number, date, identifier, quotation or status
  from a page summary. A summary may say which pages are worth reading; for anything that
  matters, fetch the source record (for a paper, its Crossref or OpenAlex entry) and cite it.
- **Answer first.** No openers that praise the question. Do not narrate the method; give
  the result, then the detail if it is needed.
- **Confess once.** If something was wrong, say so in one clause, then give the correct
  value. No paragraph of apologies.
- **Cut every draft in half.** Before handing over a draft, do one deletion pass aiming at
  half its length.
- **Banned words are checked on write.** A hook scans every file the moment it is written
  (list in `hooks/banned_words.txt`). When it flags a line, rewrite the sentence.
- **Unsure means unwritten.** Every match is AUTO (exact: write it), REVIEW (fuzzy: wait
  for a human) or NONE (no match: write nothing). An unattended run never writes a fuzzy
  match.
