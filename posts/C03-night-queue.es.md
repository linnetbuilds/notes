# C03: 1,000 corridas, una por una

**Carrusel:** 2026-11-12

Una recolección de datos de unas 1,000 corridas que toma días, en un solo equipo, sin nadie
mirando. El patrón, sin los detalles de mi investigación:

1. **Un solo equipo, así que una corrida a la vez.** Una cola le pasa al equipo una corrida,
   espera a que termine y luego le pasa la siguiente.
2. **Cada corrida se guarda apenas termina.** Si algo se cae, solo se puede perder la
   corrida en curso.
3. **Si algo se muere, se reinicia solo:** el simulador, el contenedor, o la computadora
   entera después de un corte de luz. Se salta las corridas ya hechas.
4. **Ver el avance es un solo comando:** `tail -n 1 progress.log` imprime la última línea
   del log, por ejemplo `413/1000 done`. No hace falta IA.

La parte del reinicio es la misma idea de [R02](R02-power-cuts.md). Su código,
`resume-runner`, se publica aquí en diciembre.

Costo: **$0.** Scripts simples, Docker Engine (código abierto) y `tail`. Nada de IA en
ningún paso.

---

**In English:** about 1,000 runs over several days on one setup, nobody watching: a queue
runs them one at a time, saves each as it finishes, restarts itself after a crash or power
cut, and one `tail` command shows progress. Cost: $0, no AI.
