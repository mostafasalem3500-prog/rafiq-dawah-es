# Spec — short dawah messages (RQ.MSG) for «رفيق الداعية»

Audience of the site: Arabic-speaking Muslim callers (Ahl al-Sunnah wal-Jamaʿah) who talk with Spanish speakers (non-Muslims and new Muslims) on WhatsApp/Telegram or face to face. Each message is a ready-to-send Spanish text + its faithful Arabic meaning.

## File format
```js
/* <one line Arabic comment about the batch> */
RQ.MSG.push(...[
  { id: "ma001", t: "عنوان عربي قصير", es: "Texto en español…", ar: "المعنى العربي…", q: ["2:186"], h: [], au: ["general"], st: ["contacto", "conocer"], si: ["curioso"] },
]);
```
- `id`: your assigned prefix + 3 digits, unique.
- `t`: short Arabic title (2–6 words), unique across the whole site (read existing titles in public/data-core.js, data-more.js, data-trust.js, data-cards.js and the other data-msg-*.js files if present).
- `es`: 30–90 words, warm, natural, respectful Spanish (neutral; tú by default). Correct tildes and ¿¡. Written by a Muslim friend, never preachy, never aggressive, never mocking other religions. End often with a gentle open question or invitation.
- `ar`: faithful MSA meaning of `es` (not a summary).
- `au` ⊂ general, catolico, protestante, ateo, indiferente, buscador, nuevo
- `st` ⊂ contacto, conocer, dudas, cerca, nuevo
- `si` ⊂ curioso, proposito, dios, jesus, trinidad, coran, profeta, mujer, violencia, duelo, enfermedad, perdon, listo, primeros, presion, sufrimiento, religiones, practicas, ocasion (Ramadán/Eid/greetings/condolences on occasions), ciencia (reason, science, creation), familia (family, parents, ethics, manners), akhira (death, the Hereafter, Paradise/Hell), felicidad (anxiety, stress, happiness, inner peace)

## References — the most important rule
- Prefer references from docs/REFS.md (already verified), used ONLY for the same meaning.
- You may add a NEW Quran reference only after verifying it with WebFetch on `https://quranenc.com/api/v1/translation/aya/spanish_garcia/<surah>/<ayah>` and confirming the Spanish text says what your message claims. At most ~25 new refs per batch. Ranges like "2:255" or "93:3-5" (max 10 ayahs).
- Hadith: use ONLY HadeethEnc ids from docs/REFS.md, or a new id verified with WebFetch on `https://hadeethenc.com/api/v1/hadeeths/one/?language=es&id=<id>` (check the text AND that the grade is authentic: صحيح/حسن). Never cite a hadith by memory.
- Many messages need no reference: use `q: [], h: []`. Never put a verse or hadith text inside `es` in your own translation; paraphrase the meaning in one clause ("El Corán enseña que…") and let `q`/`h` carry the source (the site shows the approved translation).
- Never invent quotes of scholars, statistics, studies or historical claims. If unsure, leave it out.

## Creed and method
- Sunni creed: Allah is One, no partner, nothing is like Him; Jesus (ʿĪsā) is a noble prophet and Messiah, born of the virgin Mary, not divine, not crucified in Islamic belief (be gentle, don't attack); Muhammad ﷺ is the final Messenger (write "el Profeta Muhammad (la paz y las bendiciones de Allah sean con él)" at most once per message, or "el Profeta Muhammad ﷺ").
- Use "Allah" (optionally "Dios" in first contact messages to non-Muslims, as existing messages do). Islamic terms as QuranEnc/IslamHouse Spanish: la oración, el ayuno, el azaque, la peregrinación, la mezquita, el Corán.
- Do not give fatwas or detailed rulings; for practice messages stay at the level of basics everyone agrees on, and suggest asking a trusted imam for details.
- No content about politics, sects, takfir, violence glorification; no romance; nothing a family audience shouldn't read.
- Honesty: never promise worldly rewards, never pressure; respect the person's freedom ("no hay coacción en la religión" — 2:256 if cited).

## Variety (avoid repetition)
Mix formats: a question that opens dialogue, a mini-story or analogy, a reflection, a gentle reminder, an invitation (iftar, visiting a mosque, reading a short text), a follow-up after silence, a thank-you, a congratulation on an occasion, a condolence, encouragement for a new Muslim, a short answer to a common doubt. No two messages may share the same idea and opening; read the existing ones first.

## Verification before you finish
From /home/claude/rafiq run `node -e "global.window=global;require('./public/data-core.js');require('./public/data-more.js');require('./public/YOURFILE.js');console.log(RQ.MSG.length)"` and `npm run -s check`. Then re-read your whole file once for Spanish grammar/accents and Arabic accuracy and fix issues.
