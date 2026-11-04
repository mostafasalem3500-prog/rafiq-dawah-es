/* أدوات لغوية: التصريف، النطق التقريبي بالحروف العربية، المقارنة المتسامحة. تعمل في المتصفح وفي Node للاختبار. */
(function (root) {
  const L = root.LEARN = root.LEARN || {};
  const PERSONS = ["yo", "tú", "él / ella / usted", "nosotros", "vosotros", "ellos / ustedes"];
  const TENSES = [
    ["pres", "المضارع (Presente)"], ["pret", "الماضي البسيط (Indefinido)"], ["impf", "الماضي الناقص (Imperfecto)"], ["perf", "الماضي القريب (Perfecto)"],
    ["fut", "المستقبل (Futuro)"], ["cond", "الشرطي (Condicional)"], ["subj", "مضارع صيغة الاحتمال (Subjuntivo)"]
  ];
  const END = {
    pres: { ar: ["o", "as", "a", "amos", "áis", "an"], er: ["o", "es", "e", "emos", "éis", "en"], ir: ["o", "es", "e", "imos", "ís", "en"] },
    pret: { ar: ["é", "aste", "ó", "amos", "asteis", "aron"], er: ["í", "iste", "ió", "imos", "isteis", "ieron"], ir: ["í", "iste", "ió", "imos", "isteis", "ieron"] },
    impf: { ar: ["aba", "abas", "aba", "ábamos", "abais", "aban"], er: ["ía", "ías", "ía", "íamos", "íais", "ían"], ir: ["ía", "ías", "ía", "íamos", "íais", "ían"] },
    subj: { ar: ["e", "es", "e", "emos", "éis", "en"], er: ["a", "as", "a", "amos", "áis", "an"], ir: ["a", "as", "a", "amos", "áis", "an"] }
  };
  const FUT = ["é", "ás", "á", "emos", "éis", "án"], COND = ["ía", "ías", "ía", "íamos", "íais", "ían"];
  const STEM = { pensar: "ie", querer: "ie", empezar: "ie", sentir: "ie", venir: "ie", tener: "ie", poder: "ue", dormir: "ue", volver: "ue", jugar: "ue", pedir: "i", decir: "i" };
  const YO = { tener: "tengo", hacer: "hago", decir: "digo", venir: "vengo", poner: "pongo", salir: "salgo", traer: "traigo", oír: "oigo", conocer: "conozco", saber: "sé", dar: "doy", ver: "veo", caber: "quepo" };
  const FULL = {
    pres: { ser: "soy eres es somos sois son", estar: "estoy estás está estamos estáis están", ir: "voy vas va vamos vais van", haber: "he has ha hemos habéis han", oír: "oigo oyes oye oímos oís oyen", dar: "doy das da damos dais dan", ver: "veo ves ve vemos veis ven" },
    pret: { ser: "fui fuiste fue fuimos fuisteis fueron", ir: "fui fuiste fue fuimos fuisteis fueron", dar: "di diste dio dimos disteis dieron", ver: "vi viste vio vimos visteis vieron", hacer: "hice hiciste hizo hicimos hicisteis hicieron", leer: "leí leíste leyó leímos leísteis leyeron", oír: "oí oíste oyó oímos oísteis oyeron", creer: "creí creíste creyó creímos creísteis creyeron" },
    impf: { ser: "era eras era éramos erais eran", ir: "iba ibas iba íbamos ibais iban", ver: "veía veías veía veíamos veíais veían" },
    subj: { ser: "sea seas sea seamos seáis sean", ir: "vaya vayas vaya vayamos vayáis vayan", estar: "esté estés esté estemos estéis estén", dar: "dé des dé demos deis den", saber: "sepa sepas sepa sepamos sepáis sepan", haber: "haya hayas haya hayamos hayáis hayan" }
  };
  const STRONG = { tener: "tuv", estar: "estuv", poder: "pud", poner: "pus", saber: "sup", querer: "quis", venir: "vin", decir: "dij", traer: "traj", conducir: "conduj", haber: "hub" };
  const FSTEM = { tener: "tendr", poder: "podr", querer: "querr", decir: "dir", hacer: "har", saber: "sabr", poner: "pondr", salir: "saldr", venir: "vendr", haber: "habr" };
  const PART = { hacer: "hecho", decir: "dicho", ver: "visto", poner: "puesto", volver: "vuelto", escribir: "escrito", abrir: "abierto", romper: "roto", morir: "muerto", leer: "leído", oír: "oído", creer: "creído", traer: "traído" };
  const lastIdx = (s, v) => s.lastIndexOf(v);
  function changeStem(stem, kind, verb) {
    if (verb === "jugar") return stem.replace(/u(?=[^u]*$)/, "ue");
    const v = kind === "ue" ? "o" : "e"; const i = lastIdx(stem, v); if (i < 0) return stem;
    return stem.slice(0, i) + kind + stem.slice(i + 1);
  }
  const weakIr = (stem, verb) => { // e→i / o→u للأفعال ‑ir المتغيرة الجذر
    if (!verb.endsWith("ir") || !STEM[verb]) return stem;
    const v = STEM[verb] === "ue" ? "o" : "e"; const i = lastIdx(stem, v); if (i < 0) return stem;
    return stem.slice(0, i) + (v === "o" ? "u" : "i") + stem.slice(i + 1);
  };
  const spell = (stem, ending) => { // ‑car/‑gar/‑zar أمام e
    if (!/^[eé]/.test(ending)) return stem + ending;
    if (stem.endsWith("c")) return stem.slice(0, -1) + "qu" + ending;
    if (stem.endsWith("g")) return stem + "u" + ending;
    if (stem.endsWith("z")) return stem.slice(0, -1) + "c" + ending;
    return stem + ending;
  };
  function participle(verb) {
    if (PART[verb]) return PART[verb];
    const t = verb.slice(-2), st = verb.slice(0, -2);
    return st + (t === "ar" ? "ado" : "ido");
  }
  function conj(verb, tense) {
    verb = verb.trim().toLowerCase(); const t = verb.slice(-2).replace("ír", "ir"), st = verb.slice(0, -2);
    if (FULL[tense] && FULL[tense][verb]) return FULL[tense][verb].split(" ");
    if (tense === "perf") return FULL.pres.haber.split(" ").map(h => h + " " + participle(verb));
    if (tense === "fut" || tense === "cond") { const s = FSTEM[verb] || verb.replace("ír", "ir"); return (tense === "fut" ? FUT : COND).map(e => s + e); }
    if (tense === "impf") return END.impf[t].map(e => st + e);
    if (tense === "pres") {
      return END.pres[t].map((e, i) => {
        if (i === 0 && YO[verb]) return YO[verb];
        const s = STEM[verb] && i !== 3 && i !== 4 ? changeStem(st, STEM[verb], verb) : st; return s + e;
      });
    }
    if (tense === "pret") {
      if (STRONG[verb]) { const s = STRONG[verb]; const j = s.endsWith("j"); return ["e", "iste", "o", "imos", "isteis", j ? "eron" : "ieron"].map(e => s + e); }
      return END.pret[t].map((e, i) => {
        if (t === "ar" && i === 0) return spell(st, "é");
        const s = (i === 2 || i === 5) ? weakIr(st, verb) : st; return s + e;
      });
    }
    if (tense === "subj") {
      const yo = conj(verb, "pres")[0]; let base = yo.endsWith("o") ? yo.slice(0, -1) : st;
      return END.subj[t].map((e, i) => {
        let s = base;
        if (i === 3 || i === 4) { s = YO[verb] ? base : st; if (t === "ir" && STEM[verb] && !YO[verb]) s = weakIr(st, verb); }
        else if (t === "ir" && STEM[verb] === "i" && !YO[verb]) s = weakIr(st, verb);
        return t === "ar" ? spell(s, e) : s + e;
      });
    }
    return [];
  }

  const EXC = { allah: "الله", muhammad: "محمد", corán: "كوران", islam: "إسلام", ramadán: "رمضان", umrah: "عمرة", shahada: "شهادة", salah: "صلاة", hajj: "حج", zakat: "زكاة", tawhid: "توحيد", kaaba: "كعبة", meca: "ميكا", jeddah: "جدة", makkah: "مكة", wifi: "وايفاي", y: "إي" };
  /* نطق تقريبي بالحروف العربية (نطق أمريكا اللاتينية: c/z = س) */
  function translit(text) {
    return String(text).split(/(\s+|[.,;:!?¡¿«»"()…—-]+)/).map(w => /^[a-záéíóúüñ]+$/i.test(w) ? word(w.toLowerCase()) : w.replace(/[¡¿]/g, "").replace(/\?/g, "؟").replace(/,/g, "،")).join("");
    function word(w) {
      if (EXC[w]) return EXC[w];
      const s = w.normalize("NFC"); let o = "", i = 0; const V = "aeiouáéíóú";
      const at = k => s[k] || ""; const isV = c => V.includes(c);
      while (i < s.length) {
        const c = s[i], n = at(i + 1), n2 = at(i + 2), first = o === "";
        const plain = c.normalize("NFD")[0];
        if (isV(c)) {
          const m = { a: "ا", e: "ي", i: "ي", o: "و", u: "و" }[plain];
          if (first) o += { a: "أ", e: "إي", i: "إي", o: "أو", u: "أو" }[plain];
          else if (plain === "a" && i === s.length - 1) o += "ا";
          else o += m;
          i++; continue;
        }
        if (c === "c" && n === "h") { o += "تش"; i += 2; continue; }
        if (c === "l" && n === "l") { o += "ي"; i += 2; continue; }
        if (c === "r" && n === "r") { o += "رّ"; i += 2; continue; }
        if (c === "q" && n === "u") { o += "ك"; i += 2; continue; }
        if (c === "g" && n === "u" && "eéií".includes(n2)) { o += "غ"; i += 2; continue; }
        if (c === "g" && n === "ü") { o += "غو"; i += 2; continue; }
        if (c === "y") { o += (i === s.length - 1 && !first) ? "ي" : (s.length === 1 ? "إي" : "ي"); i++; continue; }
        const soft = "eéií".includes(n);
        const map = { b: "ب", v: "ب", c: soft ? "س" : "ك", d: "د", f: "ف", g: soft ? "خ" : "غ", h: "", j: "خ", k: "ك", l: "ل", m: "م", n: "ن", ñ: "نْي", p: "ب", r: i === 0 ? "رّ" : "ر", s: "س", t: "ت", w: "و", x: "كس", z: "س", ü: "و" };
        o += map[c] !== undefined ? map[c] : c; i++;
      }
      return o;
    }
  }

  /* مقارنة متسامحة: تتجاهل الحالة والعلامات وعلامات الترقيم، وتعيد نسبة التشابه */
  const norm = (s, keepAcc) => { let t = String(s).toLowerCase().replace(/[¿¡?!.,;:«»"()…—\-]/g, " ").replace(/\s+/g, " ").trim(); if (!keepAcc) t = t.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ñ/g, "n"); return t; };
  function lev(a, b) { const m = a.length, n = b.length; if (!m) return n; if (!n) return m; let p = Array.from({ length: n + 1 }, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
  function similar(a, b) { const x = norm(a), y = norm(b); if (!x && !y) return 1; return 1 - lev(x, y) / Math.max(x.length, y.length); }
  function exact(a, b) { return norm(a) === norm(b); }
  function accentsOk(a, b) { return norm(a, true) === norm(b, true); }

  Object.assign(L, { PERSONS, TENSES, conj, participle, translit, similar, exact, accentsOk, norm });
  if (typeof module !== "undefined") module.exports = L;
})(typeof window !== "undefined" ? window : globalThis);
