# Content spec — Spanish course data files (public/learn/*.js)

All files are plain browser scripts:
```js
window.LEARN = window.LEARN || {};
LEARN.X = (LEARN.X || []).concat([ ... ]);
```
String formats (pipe-separated, no extra pipes inside):
- word:     "español|العربية|emoji"   e.g. "la mezquita|المسجد|🕌"  (emoji may be "" when no natural one exists; never use flag emoji 🇪🇸 etc.)
- sentence: "Español completo.|الترجمة العربية."
- dialogue line: "A:Español|العربية" or "B:Español|العربية" (alternate speakers, start with A)

Quality rules (mandatory):
1. Spanish must be correct, natural, standard (neutral; Spain/Latin America both acceptable), with all tildes (á é í ó ú ñ ü) and opening marks ¿ ¡. Nouns in word lists carry their article (el/la/los/las).
2. Arabic is clear Modern Standard Arabic, faithful to the Spanish meaning, correctly spelled. No transliteration in the Arabic field.
3. Every item unique within the file. No offensive, romantic/dating, alcohol-promoting, pork-promoting, or haram-promoting content; examples suit a Muslim family audience of all ages. Use "Allah" or "Dios" naturally (Muslim speaker → Allah usually).
4. Islamic content: Ahl al-Sunnah wal-Jamaʿah creed; Spanish Islamic terms as used by QuranEnc.com and IslamHouse.com Spanish (e.g. la oración, el ayuno, la peregrinación (Hajj), el azaque (zakat), el Profeta Muhammad ﷺ written in text as "el Profeta Muhammad"). NEVER write your own translation of a Quran verse in quotes; refer to verses only by reference (e.g. "(Corán 112:1-4)") or by paraphrased meaning without quotation marks. No fatwas, no judging individuals, no sectarian polemics, no disputed fiqh details.
5. Levels: A1, A2, B1, B2, C1 (CEFR). Match vocabulary and grammar to the level.
6. After writing, verify with: `node -e "global.window=global;require('./public/learn/FILE.js');console.log('ok')"` run from /home/claude/rafiq, and fix any syntax error.
