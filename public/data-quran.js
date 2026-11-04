/* القرآن الكريم: فهرس السور (الاسم العربي، الاسم اللاتيني، عدد الآيات، مكية m / مدنية d حسب مصحف المدينة)، والترجمات، والقراء، وكتاب تفسير العشر الأخير بالإسبانية. */
window.RQ = window.RQ || {};
RQ.SURAS = [
  ["الفاتحة", "Al-Fátiha", 7, "m"], ["البقرة", "Al-Baqara", 286, "d"], ["آل عمران", "Al Imrán", 200, "d"], ["النساء", "An-Nisá", 176, "d"], ["المائدة", "Al-Má'ida", 120, "d"],
  ["الأنعام", "Al-An'ám", 165, "m"], ["الأعراف", "Al-A'ráf", 206, "m"], ["الأنفال", "Al-Anfál", 75, "d"], ["التوبة", "At-Tawba", 129, "d"], ["يونس", "Yúnus", 109, "m"],
  ["هود", "Hud", 123, "m"], ["يوسف", "Yúsuf", 111, "m"], ["الرعد", "Ar-Ra'd", 43, "d"], ["إبراهيم", "Ibrahím", 52, "m"], ["الحجر", "Al-Hiyr", 99, "m"],
  ["النحل", "An-Nahl", 128, "m"], ["الإسراء", "Al-Isrá", 111, "m"], ["الكهف", "Al-Kahf", 110, "m"], ["مريم", "Maryam", 98, "m"], ["طه", "Ta Ha", 135, "m"],
  ["الأنبياء", "Al-Anbiyá", 112, "m"], ["الحج", "Al-Hayy", 78, "d"], ["المؤمنون", "Al-Mu'minún", 118, "m"], ["النور", "An-Nur", 64, "d"], ["الفرقان", "Al-Furqán", 77, "m"],
  ["الشعراء", "Ash-Shu'ará", 227, "m"], ["النمل", "An-Naml", 93, "m"], ["القصص", "Al-Qasas", 88, "m"], ["العنكبوت", "Al-'Ankabút", 69, "m"], ["الروم", "Ar-Rum", 60, "m"],
  ["لقمان", "Luqmán", 34, "m"], ["السجدة", "As-Sayda", 30, "m"], ["الأحزاب", "Al-Ahzáb", 73, "d"], ["سبأ", "Saba", 54, "m"], ["فاطر", "Fátir", 45, "m"],
  ["يس", "Ya Sin", 83, "m"], ["الصافات", "As-Sáffát", 182, "m"], ["ص", "Sad", 88, "m"], ["الزمر", "Az-Zumar", 75, "m"], ["غافر", "Gáfir", 85, "m"],
  ["فصلت", "Fussilat", 54, "m"], ["الشورى", "Ash-Shura", 53, "m"], ["الزخرف", "Az-Zujruf", 89, "m"], ["الدخان", "Ad-Dujan", 59, "m"], ["الجاثية", "Al-Yáziya", 37, "m"],
  ["الأحقاف", "Al-Ahqáf", 35, "m"], ["محمد", "Muhámmad", 38, "d"], ["الفتح", "Al-Fath", 29, "d"], ["الحجرات", "Al-Huyurát", 18, "d"], ["ق", "Qaf", 45, "m"],
  ["الذاريات", "Ad-Dáriyát", 60, "m"], ["الطور", "At-Tur", 49, "m"], ["النجم", "An-Naym", 62, "m"], ["القمر", "Al-Qamar", 55, "m"], ["الرحمن", "Ar-Rahmán", 78, "d"],
  ["الواقعة", "Al-Wáqi'a", 96, "m"], ["الحديد", "Al-Hadíd", 29, "d"], ["المجادلة", "Al-Muyádala", 22, "d"], ["الحشر", "Al-Hashr", 24, "d"], ["الممتحنة", "Al-Mumtahana", 13, "d"],
  ["الصف", "As-Saff", 14, "d"], ["الجمعة", "Al-Yumu'a", 11, "d"], ["المنافقون", "Al-Munáfiqún", 11, "d"], ["التغابن", "At-Tagábun", 18, "d"], ["الطلاق", "At-Talaq", 12, "d"],
  ["التحريم", "At-Tahrím", 12, "d"], ["الملك", "Al-Mulk", 30, "m"], ["القلم", "Al-Qalam", 52, "m"], ["الحاقة", "Al-Háqqa", 52, "m"], ["المعارج", "Al-Ma'áriy", 44, "m"],
  ["نوح", "Nuh", 28, "m"], ["الجن", "Al-Yinn", 28, "m"], ["المزمل", "Al-Muzzammil", 20, "m"], ["المدثر", "Al-Muddazzir", 56, "m"], ["القيامة", "Al-Qiyáma", 40, "m"],
  ["الإنسان", "Al-Insán", 31, "d"], ["المرسلات", "Al-Mursalát", 50, "m"], ["النبأ", "An-Naba", 40, "m"], ["النازعات", "An-Názi'át", 46, "m"], ["عبس", "'Abasa", 42, "m"],
  ["التكوير", "At-Takwír", 29, "m"], ["الانفطار", "Al-Infitár", 19, "m"], ["المطففين", "Al-Mutaffifín", 36, "m"], ["الانشقاق", "Al-Inshiqáq", 25, "m"], ["البروج", "Al-Burúy", 22, "m"],
  ["الطارق", "At-Táriq", 17, "m"], ["الأعلى", "Al-A'la", 19, "m"], ["الغاشية", "Al-Gáshiya", 26, "m"], ["الفجر", "Al-Fayr", 30, "m"], ["البلد", "Al-Balad", 20, "m"],
  ["الشمس", "Ash-Shams", 15, "m"], ["الليل", "Al-Lail", 21, "m"], ["الضحى", "Ad-Duha", 11, "m"], ["الشرح", "Ash-Sharh", 8, "m"], ["التين", "At-Tin", 8, "m"],
  ["العلق", "Al-'Alaq", 19, "m"], ["القدر", "Al-Qadr", 5, "m"], ["البينة", "Al-Bayyina", 8, "d"], ["الزلزلة", "Az-Zalzala", 8, "d"], ["العاديات", "Al-'Ádiyát", 11, "m"],
  ["القارعة", "Al-Qári'a", 11, "m"], ["التكاثر", "At-Takázur", 8, "m"], ["العصر", "Al-'Asr", 3, "m"], ["الهمزة", "Al-Humaza", 9, "m"], ["الفيل", "Al-Fil", 5, "m"],
  ["قريش", "Quraish", 4, "m"], ["الماعون", "Al-Má'ún", 7, "m"], ["الكوثر", "Al-Kawzar", 3, "m"], ["الكافرون", "Al-Káfirún", 6, "m"], ["النصر", "An-Nasr", 3, "d"],
  ["المسد", "Al-Masad", 5, "m"], ["الإخلاص", "Al-Ijlás", 4, "m"], ["الفلق", "Al-Falaq", 5, "m"], ["الناس", "An-Nas", 6, "m"]
];
/* الترجمات المتاحة عبر QuranEnc (موسوعة القرآن الكريم) */
RQ.QTR = [
  ["spanish_garcia", "ترجمة محمد عيسى غارسيا", "Muhammad Isa García"],
  ["spanish_montada_latin", "ترجمة مركز نور الدولي (أمريكا اللاتينية)", "Noor International · Latinoamérica"],
  ["spanish_montada_eu", "ترجمة مركز نور الدولي (إسبانيا)", "Noor International · España"],
  ["spanish_mokhtasar", "المختصر في تفسير القرآن (مركز تفسير)", "Al-Mujtasar · Centro Tafsir"]
];
/* القراء (everyayah.com) — المعلّم للحصري مفيد للمتعلمين لأنه يقرأ ببطء وتكرار */
RQ.RECITERS = [
  ["Husary_Muallim_128kbps", "الحصري (المصحف المعلّم)"], ["Alafasy_128kbps", "مشاري العفاسي"], ["Husary_128kbps", "محمود خليل الحصري"],
  ["Minshawy_Murattal_128kbps", "محمد صديق المنشاوي"], ["Abdul_Basit_Murattal_192kbps", "عبد الباسط عبد الصمد"], ["Hudhaify_128kbps", "علي الحذيفي"],
  ["Abdurrahmaan_As-Sudais_192kbps", "عبد الرحمن السديس"], ["MaherAlMuaiqly128kbps", "ماهر المعيقلي"]
];
/* كتاب «تفسير العشر الأخير من القرآن الكريم» بالإسبانية — بيانات IslamHouse.com كما هي (المادة رقم 314960) */
RQ.TAFSIR10 = {
  id: 314960,
  title: "Exégesis del último décimo del sagrado Corán. Continuado por: Reglamentaciones islámicas que interesan a todo musulmán",
  ar: "تفسير العشر الأخير من القرآن الكريم، ويليه أحكام تهم المسلم",
  by: "Grupo de Sabios (مجموعة من العلماء) · المصدر: www.tafseer.info",
  basis: "القسم الأول: تفسير الأجزاء الثلاثة الأخيرة وسورة الفاتحة من «زبدة التفسير» للشيخ محمد بن سليمان الأشقر. القسم الثاني: أحكام التجويد، و62 سؤالًا في العقيدة في صورة حوار، وأحكام الشهادتين والطهارة والصلاة والزكاة والحج، والأذكار والأدعية.",
  page: "https://islamhouse.com/es/books/314960/",
  files: [
    ["الكتاب كاملًا (PDF · 22.8 MB)", "https://d1.islamhouse.com/data/es/ih_books/single/es_Explanation_of_the_Last_Tenth_of_the_Quran.pdf"],
    ["الجزء الثاني: الأحكام (PDF · 2.5 MB)", "https://d1.islamhouse.com/data/es/ih_books/single/es_Explanation_of_the_Last_Tenth_of_the_Quran_p2.pdf"],
    ["نسخة الطباعة (PDF · 69.7 MB)", "https://d1.islamhouse.com/data/es/ih_books/single/es_Explanation_of_the_Last_Tenth_of_the_Quran2.pdf"],
    ["الغلاف (PDF · 12 MB)", "https://d1.islamhouse.com/data/es/ih_books/single/es_Explanation_of_the_Last_Tenth_of_the_Quran_Cover.pdf"]
  ]
};
/* المصادر الرسمية لنص المصحف وترجماته */
RQ.QSRC = [
  ["مجمع الملك فهد لطباعة المصحف الشريف", "يطبع مصحف المدينة برواية حفص وترجمات معانيه إلى عشرات اللغات، ومنها الإسبانية.", "https://qurancomplex.gov.sa/"],
  ["موسوعة القرآن الكريم QuranEnc", "ترجمات معانٍ وتفاسير موثوقة مُراجَعة، ومنها الترجمات الإسبانية والمختصر في التفسير.", "https://quranenc.com/es/"],
  ["دار الإسلام IslamHouse", "مصدر كتاب تفسير العشر الأخير بالإسبانية وعشرات الكتب الدعوية المجانية.", "https://islamhouse.com/es/"],
  ["EveryAyah", "تلاوات آية بآية لكبار القراء.", "https://everyayah.com/"]
];
