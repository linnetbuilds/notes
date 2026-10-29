## Reglas

- **Trae el registro original.** Nunca tomes un número, fecha, identificador, cita o estado
  del resumen de una página. El resumen sirve para saber qué páginas leer; para lo que
  importa, trae el registro de la fuente (para un paper, su entrada en Crossref u OpenAlex)
  y cítalo.
- **Primero la respuesta.** Nada de elogiar la pregunta al empezar. No narres el método:
  da el resultado y luego el detalle, si hace falta.
- **Admite el error una vez.** Si algo estaba mal, dilo en una frase corta y da el valor
  correcto. Sin párrafos de disculpas.
- **Corta cada borrador a la mitad.** Antes de entregar un borrador, haz una pasada solo
  para borrar, con la meta de dejarlo a la mitad.
- **Las palabras prohibidas se revisan al guardar.** Un hook revisa cada archivo apenas se
  escribe (lista en `hooks/banned_words.txt`). Si marca una línea, reescribe la frase.
- **Si hay duda, no se escribe.** Cada coincidencia es AUTO (exacta: se escribe), REVIEW
  (dudosa: espera a una persona) o NONE (sin coincidencia: no se escribe nada). Un proceso
  sin supervisión nunca escribe una coincidencia dudosa.
