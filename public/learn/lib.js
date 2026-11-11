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
  /* ===== جداول الشواذ (ما لا تغطيه القواعد الصرفية العامة أدناه) ===== */
  // تغيّر الجذر في المضارع والاحتمال: e→ie / o→ue (u→ue في jugar) / e→i. أفعال ‑ir منها تأخذ جذرًا ضعيفًا (i/u) في ماضي الغائب وفي nosotros/vosotros الاحتمال
  const STEM = {
    pensar: "ie", querer: "ie", empezar: "ie", comenzar: "ie", sentir: "ie", venir: "ie", tener: "ie", perder: "ie", entender: "ie", convertir: "ie",
    poder: "ue", dormir: "ue", morir: "ue", volver: "ue", encontrar: "ue", recordar: "ue", jugar: "ue",
    pedir: "i", decir: "i", seguir: "i", servir: "i", repetir: "i"
  };
  // صيغة yo الشاذة (‑go وغيرها). ‑zco و‑jo و‑yo تُستنتج من القواعد العامة
  const YO = { tener: "tengo", hacer: "hago", decir: "digo", venir: "vengo", poner: "pongo", salir: "salgo", valer: "valgo", traer: "traigo", caer: "caigo", oír: "oigo", saber: "sé", dar: "doy", ver: "veo", caber: "quepo" };
  const FULL = {
    pres: { ser: "soy eres es somos sois son", estar: "estoy estás está estamos estáis están", ir: "voy vas va vamos vais van", haber: "he has ha hemos habéis han", oír: "oigo oyes oye oímos oís oyen", dar: "doy das da damos dais dan", ver: "veo ves ve vemos veis ven" },
    pret: { ser: "fui fuiste fue fuimos fuisteis fueron", ir: "fui fuiste fue fuimos fuisteis fueron", dar: "di diste dio dimos disteis dieron", ver: "vi viste vio vimos visteis vieron" },
    impf: { ser: "era eras era éramos erais eran", ir: "iba ibas iba íbamos ibais iban", ver: "veía veías veía veíamos veíais veían" },
    subj: { ser: "sea seas sea seamos seáis sean", ir: "vaya vayas vaya vayamos vayáis vayan", estar: "esté estés esté estemos estéis estén", dar: "dé des dé demos deis den", saber: "sepa sepas sepa sepamos sepáis sepan", haber: "haya hayas haya hayamos hayáis hayan" }
  };
  // الماضي القوي (بلا نبر على النهاية): جذر + e/iste/o/imos/isteis/ieron (‑eron بعد j، ‑zo بعد c: hizo). أفعال ‑ducir تُستنتج (produj…)
  const STRONG = { tener: "tuv", estar: "estuv", poder: "pud", poner: "pus", saber: "sup", caber: "cup", querer: "quis", venir: "vin", decir: "dij", traer: "traj", hacer: "hic", haber: "hub" };
  const FSTEM = { tener: "tendr", poder: "podr", querer: "querr", decir: "dir", hacer: "har", saber: "sabr", caber: "cabr", poner: "pondr", salir: "saldr", valer: "valdr", venir: "vendr", haber: "habr" };
  // اسم المفعول الشاذ. leído/caído/oído/construido تُستنتج من القاعدة
  const PART = { hacer: "hecho", decir: "dicho", ver: "visto", poner: "puesto", volver: "vuelto", escribir: "escrito", abrir: "abierto", cubrir: "cubierto", romper: "roto", morir: "muerto" };
  // الأفعال المركّبة ترث شواذ أصلها: mantener←tener، suponer←poner، conseguir←seguir، descubrir←cubrir…
  const BASES = ["tener", "poner", "venir", "hacer", "traer", "caer", "salir", "valer", "seguir", "volver", "pedir", "sentir", "dormir", "cubrir", "abrir", "escribir"];
  const split = verb => { for (const b of BASES) if (verb.length > b.length && verb.endsWith(b)) return [verb.slice(0, -b.length), b]; return null; };
  const kind = verb => { if (STEM[verb]) return STEM[verb]; const c = split(verb); return c ? STEM[c[1]] : undefined; };
  const form = (T, verb) => { if (T[verb]) return T[verb]; const c = split(verb); return c && T[c[1]] ? c[0] + T[c[1]] : undefined; };
  const strong = verb => form(STRONG, verb) || (/ducir$/.test(verb) ? verb.replace(/ducir$/, "duj") : undefined);
  const inf = verb => verb.replace("ír", "ir");

  const lastIdx = (s, v) => s.lastIndexOf(v);
  function changeStem(stem, k) { // الجذر القوي (المنبور): pens→piens، dorm→duerm، jug→jueg، ped→pid
    const v = k === "ue" ? (stem.includes("o") ? "o" : "u") : "e"; const i = lastIdx(stem, v); if (i < 0) return stem;
    return stem.slice(0, i) + k + stem.slice(i + 1);
  }
  const weakIr = (stem, verb) => { // e→i / o→u للأفعال ‑ir المتغيرة الجذر (sintió، durmamos، sigamos)
    const k = kind(verb); if (!inf(verb).endsWith("ir") || !k) return stem;
    const v = k === "ue" ? "o" : "e"; const i = lastIdx(stem, v); if (i < 0) return stem;
    return stem.slice(0, i) + (v === "o" ? "u" : "i") + stem.slice(i + 1);
  };
  /* ضمّ الجذر إلى النهاية مع التغييرات الإملائية حسب صنف الفعل */
  function join(stem, e, verb) {
    const v = inf(verb);
    if (/^[eé]/.test(e) && v.endsWith("ar")) { // ‑car/‑gar/‑zar أمام e: busqué، pague، empiece
      if (stem.endsWith("c")) return stem.slice(0, -1) + "qu" + e;
      if (stem.endsWith("g")) return stem + "u" + e;
      if (stem.endsWith("z")) return stem.slice(0, -1) + "c" + e;
    }
    if (/^[oaóá]/.test(e) && /[ei]r$/.test(v)) {
      if (/g[ei]r$/.test(v) && stem.endsWith("g")) return stem.slice(0, -1) + "j" + e; // ‑ger/‑gir: dirijo، dirija
      if (/gu[ei]r$/.test(v) && stem.endsWith("gu")) return stem.slice(0, -1) + e; // ‑guir: sigo، consiga
      if (/[aeiou]c[ei]r$/.test(v) && /[aeiou]c$/.test(stem)) return stem.slice(0, -1) + "zc" + e; // ‑cer/‑cir بعد حرف علة: conozco، produzca
      if (/[^aeiou]c[ei]r$/.test(v) && stem.endsWith("c")) return stem.slice(0, -1) + "z" + e; // vencer → venzo
    }
    if (/^[oeaóéá]/.test(e) && /[^gq]uir$/.test(v) && stem.endsWith("u")) return stem + "y" + e; // ‑uir: construyo، construya
    return stem + e;
  }
  function participle(verb) {
    verb = inf(verb.trim().toLowerCase());
    const p = form(PART, verb); if (p) return p;
    const t = verb.slice(-2), st = verb.slice(0, -2);
    return st + (t === "ar" ? "ado" : (/[aeo]$/.test(st) ? "ído" : "ido")); // leído، caído، oído؛ construido
  }
  function conj(verb, tense) {
    verb = verb.trim().toLowerCase(); const t = inf(verb.slice(-2)), st = verb.slice(0, -2);
    if (FULL[tense] && FULL[tense][verb]) return FULL[tense][verb].split(" ");
    if (tense === "perf") return FULL.pres.haber.split(" ").map(h => h + " " + participle(verb));
    if (tense === "fut" || tense === "cond") { const s = form(FSTEM, verb) || inf(verb); return (tense === "fut" ? FUT : COND).map(e => s + e); }
    if (tense === "impf") return END.impf[t].map(e => st + e);
    const k = kind(verb), yo = form(YO, verb);
    if (tense === "pres") {
      return END.pres[t].map((e, i) => {
        if (i === 0 && yo) return yo;
        const s = k && i !== 3 && i !== 4 ? changeStem(st, k) : st; return join(s, e, verb);
      });
    }
    if (tense === "pret") {
      const s = strong(verb);
      if (s) return ["e", "iste", "o", "imos", "isteis", s.endsWith("j") ? "eron" : "ieron"].map((e, i) => i === 2 && s.endsWith("c") ? s.slice(0, -1) + "zo" : s + e);
      return END.pret[t].map((e, i) => {
        const stem = (i === 2 || i === 5) ? weakIr(st, verb) : st;
        if (t !== "ar") {
          const vowel = /[aeiouáéíóú]$/.test(stem) && !/[gq]u$/.test(stem); // جذر ينتهي بحرف علة (le‑, ca‑, o‑, constru‑) وليس gu/qu
          if (vowel && (i === 2 || i === 5)) e = e.replace(/^i/, "y"); // leyó، cayeron، construyó
          if (/[aeo]$/.test(stem) && /^i[sm]/.test(e)) e = "í" + e.slice(1); // leíste، caímos، oísteis
        }
        return join(stem, e, verb);
      });
    }
    if (tense === "subj") {
      const base = yo || conj(verb, "pres")[0]; const b = base.endsWith("o") ? base.slice(0, -1) : st;
      return END.subj[t].map((e, i) => {
        let s = b;
        if ((i === 3 || i === 4) && k && !yo) s = t === "ir" ? weakIr(st, verb) : st; // pensemos، durmamos، sigamos — لكن tengamos
        return join(s, e, verb);
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
