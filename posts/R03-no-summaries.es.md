# R03: Claude Code puede recibir un resumen en lugar de la página

**Video:** 2026-10-30 · voz en inglés

## El problema

Cuando Claude Code usa WebFetch para leer una página web, normalmente no recibe la página
completa, sino lo que devuelve un paso aparte de extracción hecho por otra IA. Eso puede ser
un resumen o una respuesta al prompt de extracción. O sea, el prompt influye en lo que el
agente recibe. Ese paso escondido es el hallazgo que el video explica primero.

Después, el video usa una recreación con una fecha equivocada, marcada como recreación, para
mostrar por qué busco el registro original de la publicación antes de citar una fecha. Otras
herramientas pueden devolver contenido más completo; esto describe WebFetch, no todos los
navegadores con IA.

Documentación revisada el 2026-10-26: https://code.claude.com/docs/en/tools-reference#webfetch-tool-behavior

## La regla

Ningún número, fecha, identificador, cita textual o estado en mis notas puede salir de un
resumen.

- Un resumen puede decirle al agente **qué** páginas vale la pena leer.
- Para todo lo que importa, el agente trae el registro original y lo guarda. Para un
  paper, eso es su entrada en Crossref (u OpenAlex), leída directamente, por ejemplo:

  ```
  curl -s https://api.crossref.org/works/10.1007/s11704-024-40231-1
  ```

- Las notas citan el registro guardado, nunca el resumen.

## En pantalla

El video usa una **recreación**, marcada como tal: un resumen que da como fecha de
publicación del paper diciembre de 2023. Luego la comparación usa el registro real de
Crossref para el mismo DOI, que dice **2024-03-22**.

![Misma pregunta, dos respuestas: el resumen web dice diciembre de 2023, tachado; el registro de Crossref dice 2024-03-22. Gana el registro](img/R03-record-wins.jpg)

## Costo (precios a oct 2026)

- API de Crossref: gratis, sin clave.
- Claude Code: incluido desde Claude Pro, **$20/mes**, que tiene límites de uso. Yo uso Max ($200/mes).

## Pruébalo

El prompt escribe la regla en `CLAUDE.md`, con el mismo texto en `AGENTS.md` para Codex.
También escribe `fetch_record.py`, un script pequeño que:
- trae el registro de Crossref de un paper a partir de su DOI;
- guarda el registro en `records/` sin su lista de referencias;
- imprime la fecha de publicación.

Necesita Claude Code (o Codex), Python 3 e internet; no necesita clave de API. Deja fuera
OpenAlex, arXiv y registros que no sean de papers. Probado el 2026-10-16 con Claude Code
2.1.301. Pasó a la primera, en 34 s. El DOI del video imprimió 2024-03-22, y el registro
guardado no tenía lista de referencias.

El prompt va en inglés, que es como lo probé.

```text
Set up a "no numbers from summaries" rule and a record fetcher in this folder. Needs Python 3 and internet.

1. Create `CLAUDE.md` and `AGENTS.md` (same text, so Claude Code and Codex both read it) containing exactly this rule:

   ## Records, not summaries
   - No number, date, identifier (DOI, ISBN, ID), quotation or status (published, retracted, accepted) in these notes may come from a web search result or a page summary.
   - A summary may only decide which sources are worth reading.
   - For anything that matters, fetch the record itself, save it under `records/`, and cite the saved file.
   - For a paper, the record is its Crossref entry: run `python3 fetch_record.py <DOI>`.

2. Write `fetch_record.py DOI` (standard library only): GET `https://api.crossref.org/works/<DOI>` with a User-Agent that includes `mailto:you@example.org`; save the `message` object as `records/<DOI with / replaced by _>.json`, without its `reference` list (it is full of other people's names); print the DOI, the title, and the `published` date as YYYY-MM-DD (or YYYY-MM / YYYY if that is all the record has). Exit with a clear message on a 404 or network error.

Done when: `python3 fetch_record.py 10.1007/s11704-024-40231-1` prints the date 2024-03-22, the saved JSON has no `reference` key, and both CLAUDE.md and AGENTS.md contain the rule.
Left out on purpose: OpenAlex, arXiv and non-paper records; add a fetcher per source the same way.
```

## Ojo con esto

- **El resumen suena igual de seguro esté o no el número en la página.** Su tono no te dice
  nada; solo el registro te lo dice.
- **Un mismo paper puede tener varias fechas.** El registro de Crossref de este DOI dice
  publicado en línea el 2024-03-22 y publicado en papel en 2024-12 (volumen 18, número 6).
  Di qué campo quieres decir. El prompt usa `published`, que aquí es la fecha en línea.
  (Lo encontré al probar el prompt.)
- **Un registro de Crossref trae la lista completa de referencias del paper**, con nombres
  de otras personas. Si los nombres importan en tus notas, déjala fuera del registro
  guardado, como hace el prompt.

---

**In English:** WebFetch can hand Claude Code a summary instead of the page, so before citing
a date or number my agent fetches the real record (for a paper, Crossref) and cites that.
Minimum cost: Claude Pro, $20/month, with usage limits (prices as of Oct 2026).
