# R38: Let the AI interview you before it plans your week

**Video:** 2026-11-17 · English voice

Ask an AI for a plan without context, and apparently you have free afternoons. The fix is to
let it interview you first. This note is the three steps from the video and both prompts.

## The three steps

1. **Paste the interview prompt.** It asks one question at a time and waits for your answer.
2. **Answer with your real week:** sleep, commitments, the hours you actually have.
3. **Paste the plan prompt:** three goals and a weekly plan that uses only those hours, with a
   plan B for bad days.

Then, every Sunday, tell it how the week went and ask it to adjust.

## What happened in my demo session

A demo persona on the free plans of ChatGPT and Claude, recorded on 2026-10-28, in Spanish.

- **Without the interview,** ChatGPT's plan was: pick your 3 most important tasks, spend 15
  minutes organizing them, book a 30 to 45 minute block to focus. Fine for anyone. Which is the
  problem.
- **With the interview,** both asked one question at a time ("Question 1 of 8: how have you
  been sleeping lately?"), then wrote a five-point summary and asked what was wrong.
- **The plan prompt** gave three goals (sleep 7 hours, 10 minutes of English a day, move 10
  minutes three times a week), a weekly table that used only the free time from the interview
  (20 minutes before the baby wakes up, 30 minutes after 9 pm, 1 hour on Saturday) and a plan B
  for each day ("walk 5 minutes").

## Cost (prices as of Nov 2026)

$0 on the free plans. Limits checked 2026-10-28: Claude's free plan allows up to 5 projects and
its usage resets every 5 hours, with no fixed message count. ChatGPT's free plan includes
projects and memory with limited messages, files and memory; OpenAI does not publish the number.

## Try it

Both prompts ran in Spanish on 2026-10-28, on the free plans of Claude and ChatGPT. These are
their English translations; the Spanish originals are at the end.

**Prompt 1: the interview.**

```text
I want you to interview me to get to know me, and then help me plan my week.
Ask me one question at a time and wait for my answer before moving on.
Ask at most 8 questions: about my sleep, my real free time, what I want to learn and my money habits (without asking for amounts).
If an answer is vague, ask me once more.
When you finish, write a five-point summary of what you learned and ask me if anything is wrong.
```

**Prompt 2: the plan.** Paste it in the same chat, after you confirm the summary.

```text
Using the summary of my interview:
1. Suggest exactly three goals for the next four weeks, one sentence each.
2. For each goal, a first step of 15 minutes or less.
3. Make a weekly plan as a table: day, what I do, how long. Use only the free time I told you about.
4. For each day, a plan B if that day goes wrong.
5. End with three questions to review the plan on Sunday.
```

Done when: you have a table with one row per day, every row fits the free time you gave, and
every day has a plan B.

## Gotchas

- **Read the summary before you say yes.** The plan is built only from it. If it got your free
  time wrong, every row of the table will be wrong too.
- **Waits are not errors.** In the ChatGPT session one answer was still loading after 40
  seconds. Wait for it before you send the prompt again.
- **Money without amounts.** The prompt asks about money habits but tells it not to ask for
  figures. You don't need to give a chatbot your salary to plan a week.
- **The Sunday review is the step people skip.** A plan nobody reviews is a wish with formatting.

---

**En español:** pídele a la IA que te entreviste antes de hacer tu plan. Tres pasos: pega el
prompt de entrevista (una pregunta a la vez), responde con tu semana real, y pega el prompt del
plan (tres metas, una tabla con solo tus horas libres y un plan B por día). Probado el
2026-10-28 en los planes gratis de Claude y ChatGPT. Costo: $0 (precios a nov 2026). Los
prompts originales:

```text
Quiero que me entrevistes para conocerme y después ayudarme a planear mi semana.
Hazme una sola pregunta a la vez y espera mi respuesta antes de seguir.
Haz como máximo 8 preguntas: sobre mi sueño, mi tiempo libre real, lo que quiero aprender y mis hábitos con el dinero (sin pedirme montos).
Si una respuesta es vaga, pregúntame una vez más.
Al terminar, escribe un resumen de lo que aprendiste en cinco puntos y pregúntame si algo está mal.
```

```text
Con el resumen de mi entrevista:
1. Propón exactamente tres metas para las próximas cuatro semanas, una frase cada una.
2. Para cada meta, un primer paso de 15 minutos o menos.
3. Arma un plan semanal en una tabla: día, qué hago, cuánto tiempo. Usa solo el tiempo libre que te dije.
4. Para cada día, un plan B si ese día falla.
5. Termina con tres preguntas para revisar el plan el domingo.
```
