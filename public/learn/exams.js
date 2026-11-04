/* تعلّم الإسبانية — التحضير للاختبارات الدولية: DELE (معهد ثربانتس، A1–C2) وSIELE
   البيانات الرسمية مأخوذة من أدلة معهد ثربانتس وموقع SIELE (انظر sources وsrc لكل مستوى).
   ملاحظة (نوفمبر 2026): موقع examenes.cervantes.es يُحوِّل حاليًّا إلى cervantes.org/es/examenes/dele
   (الموقع قيد إعادة البناء)، لذا اعتمدنا على نسخ الأدلة الرسمية المنشورة على agenda.cervantes.es
   وformacion.icervantes.org. الحقول التي لم نتمكن من التحقق منها في المصدر الرسمي الحالي مُعلَّمة بـ unverified: true.
   جميع نصوص التدريب (mocks) ونماذج الكتابة مؤلَّفة خصيصًا لهذا الموقع وليست منقولة من امتحانات رسمية. */
window.LEARN = window.LEARN || {};
LEARN.EXAMS = {
  updated: "2026-11",
  sources: [
    "https://cervantes.org/es/examenes/dele",
    "https://agenda.cervantes.es/sites/default/files/DELE_A1_v2020_Guia-de-examen.pdf",
    "https://agenda.cervantes.es/es/node/27166871",
    "https://agenda.cervantes.es/sites/default/files/DELE_A2_v2020_Gu%C3%ADa_de_examen_0.pdf",
    "https://agenda.cervantes.es/sites/default/files/guia_examen_dele_b1_1.pdf",
    "https://agenda.cervantes.es/sites/default/files/guia_examen_dele_b2_0.pdf",
    "https://formacion.icervantes.org/pluginfile.php/2524474/mod_resource/content/8/Cuadro%20de%20especificaciones%20DELE%20C1%20%282024%29.pdf",
    "https://adelante.jp/pdf/dele/c1/guia-del-examen.pdf",
    "https://formacion.icervantes.org/pluginfile.php/2524552/mod_resource/content/17/C1-C2.%20M%C3%B3dulo%20IV.%20DELE%20C2.pdf",
    "https://agenda.cervantes.es/sites/default/files/guia_examen_dele_c2.pdf",
    "https://adelante.jp/pdf/dele/c2/especificaciones.pdf",
    "https://blogs.cervantes.es/nyork/tag/dele/",
    "https://siele.org/examen",
    "https://siele.org/examenes",
    "https://siele.org/conoce-siele"
  ],
  intro: "DELE شهادة رسمية يمنحها معهد ثربانتس باسم وزارة التعليم الإسبانية، لكل مستوى امتحان مستقل ونتيجته «ناجح Apto» أو «غير ناجح No apto»، وصلاحيتها غير محدودة المدة. أما SIELE فامتحان رقمي واحد متعدد المستويات، لا رسوب فيه، يعطيك درجة من 0 إلى 1000 ومستوى يعادل الإطار الأوروبي من A1 إلى C1، وصلاحيته خمس سنوات.",
  validity: { dele: "غير محددة المدة (لا تنتهي ولا تحتاج إلى تجديد).", siele: "خمس سنوات.", src: ["https://blogs.cervantes.es/nyork/tag/dele/", "https://siele.org/examenes"] },

  /* ======================= DELE ======================= */
  dele: [
    {
      lv: "A1", title: "DELE A1",
      parts: [
        { name: "Comprensión de lectura", tasks: 4, items: 25, minutes: 45, ar: "فهم المقروء: نصوص قصيرة جدًّا (رسائل، إعلانات، لافتات، قوائم) و25 سؤالًا. لكل إجابة صحيحة نقطة ولا يُخصم شيء على الخطأ." },
        { name: "Comprensión auditiva", tasks: 4, items: 25, minutes: 25, ar: "فهم المسموع: حوارات وإعلانات قصيرة بطيئة وواضحة، تُسمع مرتين عادة، و25 سؤالًا." },
        { name: "Expresión e interacción escritas", tasks: 2, minutes: 25, words: "15–25 + 30–40", ar: "الكتابة: ملء استمارة بإجابات قصيرة (15–25 كلمة)، ثم كتابة بطاقة أو رسالة أو بريد قصير (30–40 كلمة). المجموع 45–65 كلمة." },
        { name: "Expresión e interacción orales", tasks: 3, minutes: 10, prep: 10, ar: "المحادثة: تقديم نفسك (1–2 دقيقة)، ثم الحديث عن موضوع من محيطك القريب (2–3 دقائق)، ثم محادثة مع الممتحِن تطرح فيها سؤالين حضّرتهما (3–4 دقائق). يمكن أن تُعقد في يوم قبل الموعد الرسمي أو بعده." }
      ],
      total: "4 اختبارات، لكل اختبار 25 نقطة (المجموع 100). مدة الاختبارات 105 دقائق، يُضاف إليها 10 دقائق تحضير للمحادثة (المجموع من حسابنا بناءً على أرقام الدليل).",
      pass: "للحصول على «Apto» يجب نيل 30 نقطة على الأقل من 50 في كل مجموعة: المجموعة 1 = فهم المقروء + الكتابة، والمجموعة 2 = فهم المسموع + المحادثة. لا تعوِّض مجموعةٌ عن الأخرى.",
      tips: [
        "احفظ جيدًا مفردات الحياة اليومية: الأرقام، الساعة، الأيام، العائلة، الطعام، الأماكن في المدينة.",
        "في الاستمارة اكتب بيانات بسيطة وصحيحة؛ لا تُطِل، والتزم بعدد الكلمات المطلوب.",
        "في الرسالة القصيرة لا تنسَ التحية والختام (Hola… / Un saludo) وأجب عن كل نقطة في التعليمات.",
        "حضّر تقديمًا شخصيًّا جاهزًا: الاسم، العمر، البلد، اللغات، العمل أو الدراسة، الهوايات.",
        "لا تترك أي سؤال اختيار من متعدد بلا إجابة؛ فالخطأ لا يُخصم منه شيء."
      ],
      src: "https://agenda.cervantes.es/sites/default/files/DELE_A1_v2020_Guia-de-examen.pdf"
    },
    {
      lv: "A2", title: "DELE A2",
      parts: [
        { name: "Comprensión de lectura", tasks: 4, items: 25, minutes: 60, ar: "فهم المقروء: رسائل، إعلانات، نصوص إعلامية قصيرة عن موضوعات مألوفة، و25 سؤالًا." },
        { name: "Comprensión auditiva", tasks: 4, items: 25, minutes: 40, ar: "فهم المسموع: محادثات يومية وإعلانات ورسائل صوتية، و25 سؤالًا." },
        { name: "Expresión e interacción escritas", tasks: 2, minutes: 45, words: "60–70 + 70–80", ar: "الكتابة: الرد على رسالة أو بريد (60–70 كلمة)، ثم نص تختاره من خيارين: موضوع من حياتك اليومية أو نص سردي/سيرة من صور أو معطيات (70–80 كلمة)." },
        { name: "Expresión e interacción orales", tasks: 3, minutes: 12, prep: 12, ar: "المحادثة: عرض قصير عن موضوع تختاره من اثنين (2–3 دقائق)، ثم وصف صورة (2–3 دقائق)، ثم محادثة في موقف مُتخيَّل مرتبط بالصورة (3–4 دقائق)." }
      ],
      total: "4 اختبارات × 25 نقطة = 100. مدة الاختبارات 157 دقيقة + 12 دقيقة تحضير للمحادثة (المجموع من حسابنا).",
      pass: "30 نقطة على الأقل من 50 في كل مجموعة: (المقروء + الكتابة) و(المسموع + المحادثة).",
      tips: [
        "أتقن الماضي (pretérito indefinido وimperfecto) لأنك ستحتاجه في وصف التجارب والرحلات.",
        "في الكتابة استعمل روابط بسيطة: y، pero، porque، después، al final.",
        "في وصف الصورة اتبع ترتيبًا: المكان، الأشخاص، ماذا يفعلون، ماذا تتخيل أنهم يشعرون.",
        "تدرّب على مواقف الخدمات: الشراء، المطعم، المواصلات، حجز موعد.",
        "في المسموع اقرأ الأسئلة قبل التشغيل وحدِّد الكلمة المفتاحية في كل سؤال."
      ],
      src: "https://agenda.cervantes.es/sites/default/files/DELE_A2_v2020_Gu%C3%ADa_de_examen_0.pdf"
    },
    {
      lv: "B1", title: "DELE B1",
      parts: [
        { name: "Comprensión de lectura", tasks: 5, items: 30, minutes: 70, ar: "فهم المقروء: 5 مهام في كل منها 6 أسئلة، تشمل الربط بين نصوص وأشخاص، ونصوصًا إعلامية، وإكمال نص بجمل أو كلمات." },
        { name: "Comprensión auditiva", tasks: 5, items: 30, minutes: 40, ar: "فهم المسموع: 5 مهام × 6 أسئلة: رسائل قصيرة، مونولوج، أخبار إذاعية، ومحادثة." },
        { name: "Expresión e interacción escritas", tasks: 2, minutes: 60, words: "100–120 + 130–150", ar: "الكتابة: رسالة أو بريد أو مشاركة في منتدى ردًّا على نص (100–120 كلمة)، ثم نص تختاره من خيارين مثل يوميات أو مقال قصير (130–150 كلمة)." },
        { name: "Expresión e interacción orales", tasks: 4, minutes: 15, prep: 15, ar: "المحادثة: عرض قصير عن موضوع (2–3 دقائق)، ثم حوار مع الممتحِن حوله (3–4 دقائق)، ثم وصف صورة والحديث عنها (2–3 دقائق)، ثم حوار في موقف يومي مُتخيَّل (2–3 دقائق)." }
      ],
      total: "4 اختبارات × 25 نقطة = 100. مدة الاختبارات 185 دقيقة + 15 دقيقة تحضير (المجموع من حسابنا؛ الدليل لا يذكر مدة إجمالية).",
      pass: "30 نقطة على الأقل من 50 في كل مجموعة: (المقروء + الكتابة) و(المسموع + المحادثة).",
      tips: [
        "B1 هو أكثر المستويات طلبًا للإقامة والعمل والدراسة؛ ركِّز على التعبير عن الرأي والتجارب والخطط.",
        "راجع صيغة المضارع الشرطي (subjuntivo) في أبسط استعمالاتها: quiero que، espero que، es importante que.",
        "في الكتابة نظِّم النص في فقرات: مقدمة، أفكار، خاتمة، وراجع العدد بدقة.",
        "في المحادثة لا بأس أن تطلب التوضيح: ¿Puede repetir, por favor?",
        "مهمة الربط في القراءة تحتاج تدريبًا على المرادفات؛ فالسؤال نادرًا ما يكرر كلمات النص نفسها."
      ],
      src: "https://agenda.cervantes.es/sites/default/files/guia_examen_dele_b1_1.pdf"
    },
    {
      lv: "B2", title: "DELE B2",
      parts: [
        { name: "Comprensión de lectura", tasks: 4, items: 36, minutes: 70, ar: "فهم المقروء: 4 مهام (6 و10 و6 و14 سؤالًا): نص طويل، ربط آراء بأشخاص، إعادة وضع جمل محذوفة في نص، وإكمال فراغات لغوية." },
        { name: "Comprensión auditiva", tasks: 5, items: 30, minutes: 40, ar: "فهم المسموع: 5 مهام × 6 أسئلة: حوارات، مقابلات، محاضرات، ونشرات أخبار بسرعة طبيعية." },
        { name: "Expresión e interacción escritas", tasks: 2, minutes: 80, words: "150–180 + 150–180", ar: "الكتابة: رسالة رسمية أو غير رسمية مبنية على ملاحظات من تسجيل صوتي (150–180 كلمة)، ثم مقال رأي أو تعليق على رسم بياني أو مدونة/مراجعة (150–180 كلمة)." },
        { name: "Expresión e interacción orales", tasks: 3, minutes: 20, prep: 20, ar: "المحادثة: تقييم مقترحات حول مشكلة ومناقشتها (6–7 دقائق)، ثم وصف موقف مُتخيَّل من صورة ومناقشته (5–6 دقائق)، ثم إبداء الرأي في نتائج استبيان (3–4 دقائق، بلا تحضير). التحضير 20 دقيقة للمهمتين الأولى والثانية." }
      ],
      total: "4 اختبارات × 25 نقطة = 100. مدة الاختبارات 210 دقائق + 20 دقيقة تحضير (المجموع من حسابنا).",
      pass: "30 نقطة على الأقل من 50 في كل مجموعة: (المقروء + الكتابة) و(المسموع + المحادثة).",
      tips: [
        "المطلوب في B2 أن تدافع عن رأيك بحجج وتقارن بين الخيارات: en mi opinión، por un lado… por otro، sin embargo.",
        "أتقن subjuntivo بعد أفعال الرأي المنفية والعواطف والشرط: no creo que، me sorprende que، si tuviera.",
        "في الكتابة الأولى ستستمع إلى تسجيل وتدوّن ملاحظات؛ تدرّب على الكتابة السريعة بالاختصارات.",
        "في المحادثة أظهر أنك تتفاعل: وافق جزئيًّا، اعترض بلباقة، اسأل الممتحِن عن رأيه.",
        "إدارة الوقت حاسمة في القراءة: 70 دقيقة لـ36 سؤالًا، فلا تتوقف طويلًا عند سؤال واحد."
      ],
      src: "https://agenda.cervantes.es/sites/default/files/guia_examen_dele_b2_0.pdf"
    },
    {
      lv: "C1", title: "DELE C1 (نموذج 2024)",
      parts: [
        { name: "Comprensión de lectura y uso de la lengua", tasks: 5, items: 40, minutes: 90, ar: "فهم المقروء واستعمال اللغة: 5 مهام (6+6+6+8+14 سؤالًا) بنصوص أكاديمية وصحفية وأدبية، مع أسئلة نحوية ومعجمية داخل النص." },
        { name: "Comprensión auditiva y uso de la lengua", tasks: 4, items: 30, minutes: 50, ar: "فهم المسموع واستعمال اللغة: 4 مهام (6+8+6+10 أسئلة): محاضرات، مقابلات، نقاشات، ومقاطع متنوعة." },
        { name: "Expresión, mediación e interacción escritas", tasks: 2, minutes: 80, words: "220–250 + 180–220", ar: "الكتابة والوساطة: المهمة 1 تلخيص مونولوج مسموع وتقييمه (220–250 كلمة)، والمهمة 2 نص رسمي انطلاقًا من محفّز مكتوب أو رسم بياني (180–220 كلمة)." },
        { name: "Expresión, mediación e interacción orales", tasks: 3, minutes: 20, prep: 20, ar: "المحادثة والوساطة: المهمة 1 عرض ملخّص لنص وتعليق عليه (3–5 دقائق)، والمهمة 2 مقابلة مع الممتحِن حول الموضوع (4–6 دقائق)، والمهمة 3 حوار تلقائي للوصول إلى اتفاق (4–6 دقائق)." }
      ],
      total: "4 اختبارات × 25 نقطة = 100. مدة الاختبارات 240 دقيقة + 20 دقيقة تحضير (المجموع من حسابنا).",
      pass: "وفق دليل C1 الرسمي (طبعة 2014): 30 نقطة على الأقل في كل مجموعة، (المجموعة 1 = الاختبار 1 + الاختبار 3، والمجموعة 2 = الاختبار 2 + الاختبار 4). لم نتمكن من الاطلاع على نص دليل 2024 نفسه لتأكيد بقاء القاعدة كما هي.",
      unverified: true,
      note: "البنية (أسماء الاختبارات، المهام، الأسئلة، المدد، عدد الكلمات) مُتحقَّق منها من «جدول مواصفات DELE C1 (2024)» على formacion.icervantes.org. شرط النجاح منقول من دليل 2014 ولم يُتحقَّق منه في دليل 2024 (الرابط الرسمي على examenes.cervantes.es يُحوِّل حاليًّا).",
      tips: [
        "منذ 2024 صار للوساطة (mediación) دور أساسي: تدرّب على تلخيص نص أو تسجيل بكلماتك ثم تقييمه دون نسخ عباراته.",
        "استعمل روابط متقدمة: no obstante، en cambio، cabe señalar que، de ahí que، a fin de que.",
        "في الكتابة الرسمية راعِ السجلّ: مخاطبة بـ usted، صيغ مهذبة، فقرات واضحة.",
        "في فهم المسموع تُسأل عن آراء المتحدثين ومواقفهم الضمنية، لا عن المعلومات المباشرة فقط.",
        "اقرأ يوميًّا مقالات رأي من الصحف الإسبانية واللاتينية ولخّص كل مقال في خمس جمل."
      ],
      src: "https://formacion.icervantes.org/pluginfile.php/2524474/mod_resource/content/8/Cuadro%20de%20especificaciones%20DELE%20C1%20%282024%29.pdf"
    },
    {
      lv: "C2", title: "DELE C2 (نموذج 2024)",
      parts: [
        { name: "Uso de la lengua, comprensión de lectura y auditiva", tasks: 6, items: 52, minutes: 105, unverified: true, ar: "استعمال اللغة وفهم المقروء والمسموع: نصوص مكتوبة ومسموعة طويلة مع أسئلة نحوية ومعجمية. عدد المهام (6) والأسئلة (52) من مواصفات 2018؛ لم نتحقق من بقائهما في نموذج 2024." },
        { name: "Expresión, mediación e interacción escritas", tasks: 3, minutes: 150, unverified: true, ar: "الكتابة والوساطة: نصوص انطلاقًا من مصادر مكتوبة ومسموعة، وإعادة صياغة نص بتغيير سجلّه. المدة 150 دقيقة مؤكدة؛ عدد المهام (3) وأطوالها من مواصفات 2018 (400–450، 150–250، 200–250 كلمة) ولم يُتحقق منها في نموذج 2024." },
        { name: "Expresión, mediación e interacción orales", tasks: 3, minutes: 20, prep: 30, ar: "المحادثة والوساطة: المهمة 1 عرض مُحضَّر من عدة نصوص (5–6 دقائق)، والمهمة 2 مقابلة غير مُحضَّرة حول الموضوع نفسه (5–6 دقائق)، والمهمة 3 محادثة تلقائية يتفق فيها المرشح والممتحِن على عنوان خبر صحفي ويناقشانه. التحضير 30 دقيقة." }
      ],
      total: "3 اختبارات فقط (C2 هو المستوى الوحيد بثلاثة اختبارات). مدة الاختبارات 275 دقيقة + 30 دقيقة تحضير (المجموع من حسابنا). في دليل 2014: الاختبار 1 = 33.33 نقطة، والاختبار 2 = 33.33، والاختبار 3 = 33.34، والمجموع 100.",
      pass: "وفق دليل C2 الرسمي (طبعة 2014): يجب نيل 20 نقطة على الأقل في كل اختبار من الاختبارات الثلاثة على حدة. لم نتمكن من التحقق من هذه القاعدة في دليل 2024.",
      unverified: true,
      note: "أسماء الاختبارات الثلاثة ومددها ومهام الاختبار الشفهي مُتحقَّق منها من مادة تدريب رسمية لمعهد ثربانتس (formacion.icervantes.org، 2023) تصف النموذج الجديد. عدد مهام الاختبارين 1 و2 وشرط النجاح منقولة من وثائق أقدم (2014/2018) ولم يُتحقق منها في دليل 2024.",
      tips: [
        "C2 يقيس الدقة والثراء والسجلّ: تدرّب على إعادة كتابة نص من عامّي إلى رسمي والعكس.",
        "اقرأ نصوصًا أدبية ومقالات فكرية، واجمع التعابير الاصطلاحية مع أمثلة من سياقها.",
        "في العرض الشفهي من عدة نصوص لا تلخّص كل نص منفصلًا؛ اربط بينها واستخرج الفكرة الجامعة.",
        "كل اختبار يجب أن يُجتاز وحده، فلا تُهمِل أي مهارة اعتمادًا على قوتك في غيرها.",
        "تدرّب على قراءة عناوين الصحف اليومية ومناقشتها دقيقتين دون تحضير."
      ],
      src: "https://formacion.icervantes.org/pluginfile.php/2524552/mod_resource/content/17/C1-C2.%20M%C3%B3dulo%20IV.%20DELE%20C2.pdf"
    }
  ],

  /* ======================= SIELE ======================= */
  siele: {
    title: "SIELE — Servicio Internacional de Evaluación de la Lengua Española",
    by: "يروّج له معهد ثربانتس، والجامعة الوطنية المستقلة في المكسيك (UNAM)، وجامعة سلامنكا، وجامعة بوينس آيرس.",
    modules: [
      { name: "Comprensión de Lectura", tasks: 5, q: 38, minutes: 60, points: 250, ar: "فهم المقروء: 5 مهام و38 سؤالًا، تُصحَّح آليًّا وفوريًّا." },
      { name: "Comprensión Auditiva", tasks: 6, q: 38, minutes: 55, points: 250, ar: "فهم المسموع: 6 مهام و38 سؤالًا، تُصحَّح آليًّا وفوريًّا." },
      { name: "Expresión e Interacción Escritas", tasks: 2, minutes: 50, points: 250, ar: "الكتابة: مهمتان، يصحّحهما خبراء لغويون من SIELE." },
      { name: "Expresión e Interacción Orales", tasks: 5, minutes: 15, points: 250, ar: "المحادثة: 5 مهام تُسجَّل، ويصحّحها خبراء لغويون من SIELE." }
    ],
    score: "لكل اختبار 250 نقطة، والدرجة الكلية في SIELE Global من 0 إلى 1000 (مجموع الاختبارات الأربعة). لا يوجد نجاح أو رسوب: يحصل المرشح دائمًا على مستوى يعادل الإطار الأوروبي من A1 إلى C1 لكل اختبار (لا يشمل SIELE مستوى C2).",
    bands: {
      head: ["المستوى", "Lectura", "Auditiva", "Escritas", "Orales"],
      rows: [
        ["C1", "217–250", "211–250", "215–250", "215–250"],
        ["B2", "178–216,99", "164–210,99", "167–214,99", "176–214,99"],
        ["B1", "118–177,99", "112–163,99", "104–166,99", "125–175,99"],
        ["A2", "66–117,99", "66–111,99", "69–103,99", "76–124,99"],
        ["A1", "33–65,99", "33–65,99", "34–68,99", "40–75,99"],
        ["< A1", "0–32,99", "0–32,99", "0–33,99", "0–39,99"]
      ],
      src: "https://siele.org/examenes"
    },
    validity: "صلاحية الشهادة خمس سنوات.",
    results: "تُعلَن النتائج خلال ثلاثة أسابيع كحد أقصى وتُنزَّل من الصفحة الشخصية للمرشح. يُؤدّى الامتحان رقميًّا في أكثر من 1000 مركز معتمد في أكثر من 85 دولة، مع اختيار اليوم والساعة.",
    variants: "SIELE Global: الاختبارات الأربعة معًا (درجة من 1000، وبين المسموع والكتابة استراحة 15 دقيقة). S1: القراءة + الاستماع. S2: القراءة + الكتابة. S3: الاستماع + المحادثة. S4: المحادثة وحدها. S5: الكتابة + المحادثة.",
    variantList: [
      { id: "Global", parts: ["Comprensión de Lectura", "Comprensión Auditiva", "Expresión e Interacción Escritas", "Expresión e Interacción Orales"] },
      { id: "S1", parts: ["Comprensión de Lectura", "Comprensión Auditiva"] },
      { id: "S2", parts: ["Comprensión de Lectura", "Expresión e Interacción Escritas"] },
      { id: "S3", parts: ["Comprensión Auditiva", "Expresión e Interacción Orales"] },
      { id: "S4", parts: ["Expresión e Interacción Orales"] },
      { id: "S5", parts: ["Expresión e Interacción Escritas", "Expresión e Interacción Orales"] }
    ],
    vsDele: "اختر DELE إن أردت شهادة دائمة لمستوى محدد، واختر SIELE إن أردت نتيجة سريعة ومرونة في الموعد، أو إن كانت الجهة التي تطلب الشهادة تقبل صلاحية خمس سنوات.",
    tips: [
      "الامتحان واحد لكل المستويات، فتأتي الأسئلة من الأسهل إلى الأصعب؛ لا تُحبَط إن صعبت الأسئلة الأخيرة.",
      "اقرأ تعليمات كل مهمة على الشاشة جيدًا، وراقب العدّاد الزمني الظاهر أمامك.",
      "في المحادثة يُسجَّل صوتك على الحاسوب بلا محاور حيّ: تدرّب على الكلام أمام الميكروفون بوقت محدد.",
      "في الكتابة اكتب على لوحة المفاتيح؛ تدرّب على كتابة الحروف الإسبانية (ñ، á، ¿، ¡) بسرعة.",
      "اعرف المستوى الذي تطلبه الجامعة أو الجهة (غالبًا B1 أو B2) واختر الصيغة المناسبة بدل SIELE Global إن كفاك ذلك.",
      "يقدّم الموقع الرسمي مواد تحضير باسم «Objetivo SIELE»."
    ],
    src: "https://siele.org/examen"
  },

  /* ======================= MOCKS (نصوص أصلية مؤلفة لهذا الموقع) ======================= */
  mocks: [
    /* ---------- A1 ---------- */
    {
      id: "mk-a1-r1", lv: "A1", type: "lectura", title: "Un correo de Amina",
      ar: "اقرأ البريد الذي كتبته أمينة ثم اختر الإجابة الصحيحة.",
      text: `¡Hola, Lucía!

Me llamo Amina y tengo doce años. Soy de Marruecos, pero ahora vivo en Granada con mi familia. Mi padre es médico y trabaja en un hospital grande. Mi madre es profesora de árabe. Tengo dos hermanos: Omar, de ocho años, y Sara, de cuatro. Vivimos en un piso pequeño cerca del centro.

Por la mañana voy al colegio en autobús. Mis clases favoritas son Matemáticas y Ciencias. Por la tarde hago los deberes y juego al fútbol con mi hermano en el parque. Los viernes vamos todos a la mezquita y después comemos en casa de mis abuelos. Mi abuela cocina un cuscús muy rico.

¿Y tú? ¿Cuántos hermanos tienes? ¿Qué haces los fines de semana? Escríbeme pronto.

Un abrazo,
Amina`,
      q: [
        ["¿De dónde es Amina?", ["De Granada", "De Marruecos", "De Argentina"], 1],
        ["¿Qué hace la madre de Amina?", ["Es médica", "Es profesora", "Trabaja en un hospital"], 1],
        ["¿Cuántos años tiene Sara?", ["Cuatro", "Ocho", "Doce"], 0],
        ["¿Cómo va Amina al colegio?", ["Andando", "En coche", "En autobús"], 2],
        ["¿Qué hace la familia los viernes?", ["Va a la mezquita y come con los abuelos", "Juega al fútbol en el parque", "Cocina cuscús en su piso"], 0]
      ]
    },
    {
      id: "mk-a1-r2", lv: "A1", type: "lectura", title: "Anuncios del centro cultural",
      ar: "اقرأ الإعلانات ثم أجب عن الأسئلة.",
      text: `A. Biblioteca municipal. Horario: de lunes a viernes, de 9:00 a 20:00. Los sábados, de 10:00 a 14:00. Los domingos está cerrada. El carné es gratis.

B. Clases de natación para niños de 6 a 12 años. Martes y jueves, de 17:00 a 18:00. Precio: 20 euros al mes. Información en la recepción.

C. Se vende bicicleta azul, casi nueva, para niños de 8 a 10 años. Precio: 60 euros. Llamar a Pedro: 612 345 789 (solo por la tarde).

D. Curso de español para extranjeros. Nivel inicial. Lunes y miércoles, de 19:00 a 20:30. Es gratis. Hay que traer el pasaporte o la tarjeta de residencia.

E. Mercado de frutas y verduras en la plaza todos los sábados por la mañana. Productos frescos del campo.`,
      q: [
        ["¿Qué día está cerrada la biblioteca?", ["El sábado", "El domingo", "El lunes"], 1],
        ["¿Cuánto cuestan las clases de natación?", ["20 euros al mes", "60 euros", "Son gratis"], 0],
        ["¿Cuándo se puede llamar a Pedro?", ["Por la mañana", "Por la noche", "Por la tarde"], 2],
        ["Para el curso de español es necesario llevar…", ["una foto", "el pasaporte o la tarjeta de residencia", "20 euros"], 1],
        ["¿Qué día hay mercado en la plaza?", ["El sábado", "El martes", "Todos los días"], 0]
      ]
    },
    {
      id: "mk-a1-l1", lv: "A1", type: "auditiva", audio: true, title: "Un mensaje del tío Karim",
      ar: "استمع إلى الرسالة الصوتية (أو اقرأ نصها) ثم اختر الإجابة الصحيحة.",
      text: `Hola, Yusuf. Soy tu tío Karim. Te llamo porque el sábado es el cumpleaños de tu prima Laila. Hacemos una pequeña fiesta en nuestra casa a las cinco de la tarde. Nuestra nueva dirección es calle Real, número catorce, segundo piso. Está al lado de la farmacia, enfrente del parque. Puedes venir en el autobús número siete; la parada está muy cerca. A Laila le gustan mucho los libros de animales, sobre todo de caballos. Tu tía prepara pasteles de chocolate y zumo de naranja. Por favor, llama a tu madre y dile que también está invitada, porque su teléfono no funciona. Si tienes alguna pregunta, mi número es el seis, cinco, cero, dos, tres, uno, ocho, cuatro, nueve. ¡Hasta el sábado!`,
      q: [
        ["¿Por qué hay una fiesta?", ["Es el cumpleaños de Laila", "Es el cumpleaños de Karim", "La familia tiene casa nueva"], 0],
        ["¿A qué hora es la fiesta?", ["A las siete", "A las cinco", "A las dos"], 1],
        ["¿Dónde está la casa?", ["Al lado del parque", "Enfrente de la farmacia", "Al lado de la farmacia"], 2],
        ["¿Qué regalo le gusta a Laila?", ["Un libro de animales", "Un caballo", "Pasteles de chocolate"], 0],
        ["¿Por qué tiene que llamar Yusuf a su madre?", ["Porque ella no tiene la dirección", "Porque el teléfono de ella no funciona", "Porque ella prepara los pasteles"], 1]
      ]
    },
    {
      id: "mk-a1-l2", lv: "A1", type: "auditiva", audio: true, title: "En el supermercado",
      ar: "استمع إلى الإعلان في السوق ثم أجب.",
      text: `Atención, señores clientes. Bienvenidos al supermercado Sol. Hoy, miércoles, tenemos ofertas especiales. En la sección de frutas, el kilo de manzanas cuesta solo un euro. Las naranjas y los plátanos tienen un descuento del veinte por ciento. También hay una oferta en la leche: si compran dos botellas, la tercera es gratis. En la panadería, al fondo a la derecha, hay pan recién hecho todas las mañanas a las ocho. Recuerden: el supermercado abre todos los días de ocho de la mañana a diez de la noche, también los domingos. El aparcamiento es gratis durante dos horas. Si necesitan ayuda, nuestros empleados llevan una camiseta verde. Y para los niños, en la entrada hay un regalo: un libro para pintar. Muchas gracias y buenas compras.`,
      q: [
        ["¿Qué día es hoy?", ["Domingo", "Miércoles", "Lunes"], 1],
        ["¿Cuánto cuesta el kilo de manzanas?", ["Un euro", "Dos euros", "Veinte euros"], 0],
        ["¿Dónde está la panadería?", ["En la entrada", "A la izquierda", "Al fondo a la derecha"], 2],
        ["¿A qué hora cierra el supermercado?", ["A las ocho de la tarde", "A las diez de la noche", "A las nueve de la noche"], 1],
        ["¿Qué reciben los niños?", ["Una camiseta verde", "Una manzana", "Un libro para pintar"], 2]
      ]
    },

    /* ---------- A2 ---------- */
    {
      id: "mk-a2-r1", lv: "A2", type: "lectura", title: "Un fin de semana en Córdoba",
      ar: "اقرأ نص المدوّنة عن رحلة إلى قرطبة ثم اختر الإجابة الصحيحة.",
      text: `El fin de semana pasado fui a Córdoba con mi familia. Salimos de Madrid el viernes por la tarde en tren y llegamos en menos de dos horas. Nos quedamos en un hotel pequeño en el barrio de la Judería, con calles estrechas y patios llenos de flores.

El sábado por la mañana visitamos la Mezquita-Catedral. Es enorme y tiene cientos de columnas y arcos de color rojo y blanco. Mi padre nos explicó que se empezó a construir en el siglo VIII, cuando Córdoba era una de las ciudades más importantes del mundo. Por la tarde fuimos a Medina Azahara, los restos de una ciudad palacio que está a unos ocho kilómetros. Hacía mucho calor y bebimos mucha agua.

El domingo paseamos por el puente romano y compramos regalos para mis abuelos: un plato de cerámica y unas cajas de dulces. Fue un viaje corto, pero muy interesante. Me gustaría volver en primavera, porque dicen que es la mejor época para ver los patios.`,
      q: [
        ["¿Cómo viajó la familia a Córdoba?", ["En coche", "En tren", "En avión"], 1],
        ["¿Cómo era el barrio del hotel?", ["Con calles estrechas y patios con flores", "Moderno y con edificios altos", "Lejos del centro y sin tiendas"], 0],
        ["Según el padre, la Mezquita…", ["se construyó en el siglo XX", "se empezó a construir en el siglo VIII", "tiene columnas de color verde"], 1],
        ["¿Qué tiempo hizo en Medina Azahara?", ["Llovió", "Hizo frío", "Hizo calor"], 2],
        ["¿Qué compraron para los abuelos?", ["Un plato y dulces", "Flores", "Un libro de historia"], 0],
        ["¿Por qué quiere volver en primavera?", ["Porque hace menos calor", "Porque es la mejor época para ver los patios", "Porque hay menos turistas"], 1]
      ]
    },
    {
      id: "mk-a2-r2", lv: "A2", type: "lectura", title: "Campamento de verano «Sierra Verde»",
      ar: "اقرأ المعلومات الموجهة للأسر عن المخيم الصيفي ثم أجب.",
      text: `Información para las familias

El campamento empieza el lunes 7 de julio y termina el domingo 20. Los autobuses salen a las nueve de la mañana desde la estación norte; por favor, lleguen media hora antes.

Cada niño necesita traer ropa cómoda, una gorra, crema para el sol, una linterna y un saco de dormir. No es necesario llevar toallas, porque el campamento las tiene.

Los teléfonos móviles no están permitidos durante las actividades, pero los niños pueden llamar a casa todos los días de siete a ocho de la tarde.

La comida es casera y hay menús especiales: vegetariano, sin gluten y halal. Si su hijo tiene alguna alergia, deben escribirlo en la ficha de inscripción.

Las actividades incluyen senderismo, natación en el lago, talleres de manualidades y observación de estrellas. El último día, a las cinco de la tarde, hay una fiesta de despedida y las familias están invitadas.`,
      q: [
        ["¿A qué hora deben llegar las familias a la estación?", ["A las nueve", "A las ocho y media", "A las siete"], 1],
        ["¿Qué NO es necesario llevar?", ["Una linterna", "Una gorra", "Toallas"], 2],
        ["¿Cuándo pueden los niños llamar a casa?", ["Por la tarde, de siete a ocho", "Durante las actividades", "Solo el último día"], 0],
        ["Si un niño tiene una alergia, la familia tiene que…", ["llamar al campamento cada día", "escribirlo en la ficha de inscripción", "traer su propia comida"], 1],
        ["¿Qué pasa el último día?", ["Hay una fiesta con las familias", "Los niños nadan en el mar", "Los autobuses salen a las nueve"], 0]
      ]
    },
    {
      id: "mk-a2-l1", lv: "A2", type: "auditiva", audio: true, title: "En la estación de tren",
      ar: "استمع إلى الحوار في مكتب الاستعلامات بمحطة القطار ثم أجب.",
      text: `—Buenos días. ¿Me puede ayudar? Quiero ir a Toledo.
—Claro. Hay trenes cada hora. El próximo sale a las diez y cuarto del andén tres.
—¿Y cuánto tarda?
—Unos treinta y cinco minutos.
—Perfecto. ¿Cuánto cuesta el billete de ida y vuelta?
—Para adultos, veinte euros. Los niños menores de cuatro años no pagan, y de cuatro a trece años tienen un cuarenta por ciento de descuento.
—Somos dos adultos y mi hijo, que tiene seis años.
—Entonces son cincuenta y dos euros en total. ¿Quiere pagar con tarjeta?
—Sí, con tarjeta. Otra pregunta: la semana que viene voy a viajar con mi madre, que usa silla de ruedas. ¿Hay espacio para ella?
—Sí, todos los trenes tienen espacios adaptados, pero es mejor reservarlo con cuarenta y ocho horas de antelación.
—Muchas gracias. Ah, ¿dónde puedo comprar agua?
—Hay una máquina al lado de la salida, a la izquierda.`,
      q: [
        ["¿A qué hora sale el próximo tren?", ["A las diez y cuarto", "A las diez menos cuarto", "A las tres"], 0],
        ["¿Cuánto dura el viaje?", ["Una hora", "Unos treinta y cinco minutos", "Cuarenta y ocho minutos"], 1],
        ["¿Cuánto paga el hijo de seis años?", ["Nada", "Veinte euros", "Doce euros"], 2],
        ["Para el espacio de la silla de ruedas es mejor…", ["reservar con dos días de antelación", "llegar una hora antes", "comprar el billete en el tren"], 0],
        ["¿Dónde está la máquina de agua?", ["En el andén tres", "Al lado de la salida, a la izquierda", "Dentro del tren"], 1]
      ]
    },
    {
      id: "mk-a2-l2", lv: "A2", type: "auditiva", audio: true, title: "El tiempo del fin de semana",
      ar: "استمع إلى نشرة الطقس ثم اختر الإجابة الصحيحة.",
      text: `Buenas tardes. Este es el tiempo para el fin de semana. El sábado por la mañana va a llover en el norte del país, sobre todo en Galicia y Asturias, y las temperaturas van a bajar hasta los doce grados. Por la tarde, la lluvia va a parar y va a salir el sol. En el centro, en Madrid y alrededores, el sábado va a hacer buen tiempo, con unos veinticuatro grados y poco viento. En el sur, en Andalucía, va a hacer mucho calor: en Sevilla y Córdoba las temperaturas van a llegar a los treinta y seis grados. Recomendamos beber agua y no salir a las horas centrales del día. El domingo va a haber viento fuerte en la costa del Mediterráneo, así que no es un buen día para ir a la playa en Valencia. En las islas Canarias, como siempre, el tiempo va a ser agradable, con unos veintidós grados. Les deseamos un buen fin de semana.`,
      q: [
        ["¿Dónde va a llover el sábado por la mañana?", ["En el sur", "En el norte", "En las islas Canarias"], 1],
        ["¿Qué tiempo va a hacer el sábado por la tarde en el norte?", ["Va a salir el sol", "Va a nevar", "Va a hacer viento fuerte"], 0],
        ["¿Qué temperatura va a hacer en Madrid?", ["Doce grados", "Treinta y seis grados", "Unos veinticuatro grados"], 2],
        ["¿Qué recomiendan en Andalucía?", ["Ir a la playa", "Beber agua y no salir en las horas centrales", "Llevar paraguas"], 1],
        ["¿Por qué no es buen día para ir a la playa en Valencia el domingo?", ["Porque va a llover", "Porque va a hacer frío", "Porque va a haber viento fuerte"], 2]
      ]
    },

    /* ---------- B1 ---------- */
    {
      id: "mk-b1-r1", lv: "B1", type: "lectura", title: "Huertos en los tejados",
      ar: "اقرأ المقال عن حدائق الخضار فوق أسطح المباني ثم أجب.",
      text: `En muchas ciudades españolas está creciendo una costumbre que hace unos años parecía imposible: cultivar verduras en los tejados de los edificios. En Barcelona, por ejemplo, varios bloques de pisos han transformado sus azoteas en pequeños huertos comunitarios donde los vecinos plantan tomates, lechugas, pimientos y hierbas aromáticas.

La idea nació en un barrio con pocas zonas verdes. «Queríamos un lugar para que los niños vieran cómo crece la comida», explica Teresa Molina, una de las organizadoras. Al principio solo participaban cinco familias; hoy son más de cuarenta. Cada familia se encarga de una parcela, pero las tareas más pesadas, como preparar la tierra o reparar el sistema de riego, se hacen entre todos los sábados por la mañana.

Los beneficios no son solo para la alimentación. Los vecinos de los pisos superiores dicen que en verano notan menos calor desde que hay plantas en el tejado. Además, muchas personas que antes no se conocían ahora comparten recetas y se ayudan en otras cosas, como acompañar a los vecinos mayores al médico.

Sin embargo, no todo es fácil. Antes de empezar, es necesario que un técnico compruebe si el tejado puede soportar el peso de la tierra y del agua. También hay que ponerse de acuerdo sobre el uso del agua, que se paga entre todos. Aun así, Teresa lo tiene claro: «Ha sido la mejor decisión de la comunidad. Ahora el tejado es el lugar más vivo del edificio».`,
      q: [
        ["¿Por qué empezó el proyecto?", ["Porque los vecinos querían vender verduras", "Porque en el barrio había pocas zonas verdes y querían enseñar a los niños", "Porque el ayuntamiento lo exigió"], 1],
        ["¿Cuántas familias participan ahora?", ["Cinco", "Unas quince", "Más de cuarenta"], 2],
        ["Las tareas más pesadas…", ["las hace un técnico", "se hacen en grupo los sábados", "las hace cada familia en su parcela"], 1],
        ["Según el texto, ¿qué otro beneficio tiene el huerto?", ["Los vecinos se conocen y se ayudan más", "El agua es gratis", "Los pisos son más baratos"], 0],
        ["Antes de empezar un huerto en el tejado hay que…", ["comprar un sistema de riego nuevo", "comprobar que el tejado soporta el peso", "pedir permiso a todos los barrios"], 1],
        ["¿Qué opina Teresa del proyecto?", ["Que fue un error", "Que es demasiado caro", "Que fue la mejor decisión"], 2]
      ]
    },
    {
      id: "mk-b1-r2", lv: "B1", type: "lectura", title: "Tres maneras de aprender español",
      ar: "اقرأ شهادات ثلاثة طلاب، ثم حدِّد مَن يقول كل عبارة.",
      text: `KHADIJA (Túnez): Llegué a Valencia hace dos años sin saber casi nada de español. Lo que más me ayudó fue trabajar como voluntaria en un comedor social: allí tenía que hablar todo el día y no podía usar el árabe ni el francés. Al principio me daba vergüenza equivocarme, pero la gente era muy paciente conmigo.

MARCOS (Brasil): Para mí, el español fue fácil al principio porque se parece al portugués, pero precisamente por eso cometía muchos errores sin darme cuenta. Mi profesora me recomendó grabarme hablando y escucharme después. Fue duro, pero así descubrí mis fallos más frecuentes.

LI (China): Yo soy muy organizada. Cada día estudio veinte palabras nuevas con tarjetas y las repaso al día siguiente y una semana después. También veo series españolas con subtítulos en español. Lo que todavía me cuesta es entender a la gente cuando habla rápido por la calle.`,
      q: [
        ["¿Quién aprendió sobre todo hablando con otras personas en un trabajo voluntario?", ["Khadija", "Marcos", "Li"], 0],
        ["¿Quién tuvo problemas porque su lengua materna se parece al español?", ["Khadija", "Marcos", "Li"], 1],
        ["¿Quién tiene dificultades para comprender a la gente que habla deprisa?", ["Khadija", "Marcos", "Li"], 2],
        ["¿Quién sentía vergüenza al cometer errores?", ["Khadija", "Marcos", "Li"], 0],
        ["¿Quién repasa el vocabulario en días diferentes?", ["Khadija", "Marcos", "Li"], 2],
        ["¿Quién siguió un consejo de su profesora?", ["Khadija", "Marcos", "Li"], 1]
      ]
    },
    {
      id: "mk-b1-l1", lv: "B1", type: "auditiva", audio: true, title: "La panadería de Bilal",
      ar: "استمع إلى بلال وهو يحكي كيف فتح مخبزه، ثم أجب.",
      text: `Me llamo Bilal y tengo una panadería en un pueblo de Toledo desde hace seis años. Antes trabajaba en una oficina en Madrid, pero no era feliz: pasaba diez horas delante del ordenador y casi no veía a mi familia. Un día mi abuelo, que había sido panadero en Marruecos, me enseñó a hacer el pan que preparaba cuando era joven, y descubrí que me encantaba trabajar con las manos.

Al principio solo hacía pan para mis amigos los fines de semana. Luego empecé a venderlo en el mercado del pueblo y, como se vendía muy bien, decidí dejar la oficina. No fue fácil: el banco no quería darme un préstamo y tuve que pedir ayuda a mi familia.

Ahora trabajo desde las cuatro de la mañana, pero termino a mediodía y puedo recoger a mis hijas del colegio. Lo que más vendo es el pan de centeno y unas tortas con anís, una receta de mi abuelo. Mi consejo para quien quiera cambiar de vida es que no lo haga de repente: primero hay que probar la idea poco a poco y ver si funciona.`,
      q: [
        ["¿Por qué no estaba contento Bilal en su antiguo trabajo?", ["Porque ganaba poco dinero", "Porque pasaba muchas horas en la oficina y veía poco a su familia", "Porque no le gustaban sus compañeros"], 1],
        ["¿Quién le enseñó a hacer pan?", ["Su padre", "Un panadero de Toledo", "Su abuelo"], 2],
        ["Además de a sus amigos, ¿dónde vendió su pan al principio?", ["En el mercado del pueblo", "En una tienda de Madrid", "En el colegio de sus hijas"], 0],
        ["¿Qué problema tuvo al principio?", ["El banco no le dio un préstamo", "No encontraba un local", "Sus hijas no querían mudarse"], 0],
        ["¿Qué ventaja tiene su horario actual?", ["Puede dormir hasta tarde", "Puede recoger a sus hijas del colegio", "Trabaja solo los fines de semana"], 1],
        ["¿Qué aconseja Bilal?", ["Cambiar de vida rápidamente", "Pedir un préstamo al banco", "Probar la idea poco a poco"], 2]
      ]
    },
    {
      id: "mk-b1-l2", lv: "B1", type: "auditiva", audio: true, title: "La recogida de alimentos",
      ar: "استمع إلى حوار سميرة وخافيير حول يوم التطوع ثم أجب.",
      text: `SAMIRA: Javier, ¿al final vienes el sábado a la recogida de alimentos?
JAVIER: Sí, pero no puedo llegar a las nueve. Tengo que llevar a mi hermano al dentista, así que llegaré sobre las once.
SAMIRA: No pasa nada. Por la mañana estaremos en la puerta del supermercado de la avenida, y por la tarde llevaremos todo al almacén del banco de alimentos.
JAVIER: ¿Y qué tengo que hacer exactamente?
SAMIRA: Primero, explicar a la gente qué productos necesitamos: sobre todo leche, aceite y conservas. La pasta y el arroz ya los tenemos de sobra. Luego hay que separar las cajas por tipos.
JAVIER: Vale. ¿Hace falta llevar algo?
SAMIRA: El chaleco naranja nos lo dan allí. Tú trae ropa cómoda y, si puedes, el coche de tu padre, porque la furgoneta está estropeada.
JAVIER: Se lo pregunto esta noche y te digo algo mañana.
SAMIRA: Genial. Ah, y comeremos juntos en el parque: cada uno trae algo para compartir.
JAVIER: Pues yo llevo una tortilla de patatas, que me sale muy bien.`,
      q: [
        ["¿Por qué llegará Javier más tarde?", ["Porque trabaja por la mañana", "Porque tiene que acompañar a su hermano al dentista", "Porque su coche está estropeado"], 1],
        ["¿Dónde estarán por la mañana?", ["En el almacén", "En el parque", "En la puerta de un supermercado"], 2],
        ["¿Qué productos necesitan más?", ["Leche, aceite y conservas", "Pasta y arroz", "Fruta y verdura"], 0],
        ["¿Qué tiene que llevar Javier, si es posible?", ["Un chaleco naranja", "El coche de su padre", "Cajas vacías"], 1],
        ["¿Cuándo le dará Javier una respuesta sobre el coche?", ["Mañana", "El sábado", "Esta noche"], 0],
        ["¿Qué va a llevar Javier para la comida?", ["Bocadillos", "Una tortilla de patatas", "Ensalada"], 1]
      ]
    },

    /* ---------- B2 ---------- */
    {
      id: "mk-b2-r1", lv: "B2", type: "lectura", title: "Teletrabajo y vida rural",
      ar: "اقرأ المقال عن العمل عن بُعد وإعادة إعمار القرى، ثم اختر الإجابة الصحيحة.",
      text: `Durante décadas, la llamada «España vaciada» ha visto cómo sus jóvenes se marchaban a las grandes ciudades en busca de oportunidades. Sin embargo, en los últimos años algunos pueblos han empezado a recuperar habitantes gracias a un fenómeno inesperado: el teletrabajo. Profesionales que antes no podían plantearse vivir lejos de una oficina descubren ahora que basta con una buena conexión a internet para mantener su empleo.

No obstante, los expertos advierten de que no conviene caer en un optimismo excesivo. Por un lado, la llegada de nuevos vecinos suele concentrarse en localidades cercanas a capitales de provincia o bien comunicadas por tren, mientras que las aldeas más aisladas siguen perdiendo población. Por otro, muchos recién llegados se encuentran con carencias que no habían previsto: la falta de pediatras, el cierre de escuelas por falta de alumnos o la ausencia de transporte público.

Algunos ayuntamientos han reaccionado con iniciativas creativas. Hay municipios que ofrecen viviendas de alquiler a precios simbólicos a familias con hijos, con el fin de mantener abierta la escuela, y otros que han habilitado antiguos edificios como espacios de trabajo compartido. En estos lugares, los teletrabajadores no solo disponen de una conexión estable, sino que también pueden relacionarse con otros profesionales y evitar el aislamiento.

Para los sociólogos, la clave está en que la repoblación no dependa exclusivamente de quienes trabajan a distancia. «Si no se crean empleos locales y servicios básicos, estos nuevos habitantes se irán en cuanto cambien sus circunstancias», señala una investigadora. A su juicio, el teletrabajo es una oportunidad valiosa, pero no una solución mágica: debe ir acompañado de políticas que hagan atractiva la vida rural a largo plazo.`,
      q: [
        ["Según el texto, el teletrabajo ha permitido que…", ["todos los pueblos recuperen población", "algunos profesionales vivan en pueblos sin perder su empleo", "las empresas abran oficinas en el campo"], 1],
        ["Los nuevos habitantes se instalan sobre todo en…", ["pueblos cercanos a capitales o bien comunicados", "las aldeas más aisladas", "zonas de costa"], 0],
        ["Entre las dificultades de los recién llegados se menciona…", ["el precio elevado de la vivienda", "la falta de servicios como pediatras o transporte", "el rechazo de los vecinos"], 1],
        ["Algunos ayuntamientos ofrecen viviendas baratas a familias con hijos para…", ["evitar que cierre la escuela", "atraer turistas", "construir espacios de trabajo"], 0],
        ["Los espacios de trabajo compartido sirven, además, para…", ["ahorrar en el alquiler de la vivienda", "que los teletrabajadores no se sientan aislados", "formar a los jóvenes del pueblo"], 1],
        ["La investigadora considera que el teletrabajo…", ["es la solución definitiva a la despoblación", "no tiene ningún efecto positivo", "es útil pero insuficiente sin empleo y servicios locales"], 2]
      ]
    },
    {
      id: "mk-b2-u1", lv: "B2", type: "uso", title: "Carta al director: la biblioteca del barrio",
      ar: "اقرأ رسالة القارئة واختر الكلمة أو العبارة المناسبة لكل فراغ (1–6).",
      text: `Me dirijo a ustedes para expresar mi preocupación por el posible cierre de la biblioteca del barrio de San Isidro. Aunque el ayuntamiento afirma que se trata de una medida temporal, muchos vecinos tememos que (1) ___ definitiva. Esta biblioteca no es solo un lugar donde se prestan libros: es el único espacio público y gratuito en el que los estudiantes pueden preparar sus exámenes con tranquilidad, (2) ___ en muchas casas no hay sitio para estudiar.

Además, cada semana se organizan talleres de lectura para niños, clases de informática para personas mayores y actividades en varios idiomas para las familias recién llegadas. Si la biblioteca cerrara, todas estas actividades (3) ___. Me parece injusto que, (4) ___ tanto se habla de fomentar la lectura, se recorten precisamente los servicios que la hacen posible.

Por ello, les pido que publiquen esta carta y que el ayuntamiento reconsidere su decisión. (5) ___ el problema sea económico, estoy convencida de que existen alternativas, como compartir el edificio con otras asociaciones. Los vecinos estamos dispuestos a colaborar, siempre que se nos (6) ___ en cuenta.`,
      q: [
        ["(1)", ["se convierta en", "se convierte en", "se convertirá en"], 0],
        ["(2)", ["aunque", "ya que", "sin embargo"], 1],
        ["(3)", ["desaparecen", "desaparecieran", "desaparecerían"], 2],
        ["(4)", ["para que", "en un momento en que", "con tal de que"], 1],
        ["(5)", ["Porque", "Si", "Aunque"], 2],
        ["(6)", ["tenga", "tiene", "tuviera"], 0]
      ]
    },
    {
      id: "mk-b2-l1", lv: "B2", type: "auditiva", audio: true, title: "Podcast: el sueño de los adolescentes",
      ar: "استمع إلى حلقة البودكاست عن نوم المراهقين ثم أجب.",
      text: `Bienvenidos a «Salud en familia». Hoy hablamos del sueño de los adolescentes, un tema que preocupa a muchos padres. Los especialistas coinciden en que, entre los trece y los dieciocho años, se necesitan entre ocho y diez horas de sueño, pero muchos jóvenes duermen bastante menos. ¿Por qué? En parte, por razones biológicas: durante la adolescencia, el reloj interno se retrasa y los chicos tienden a sentir sueño más tarde por la noche. Si a eso le sumamos que las clases empiezan temprano, el resultado es una falta de descanso acumulada a lo largo de la semana.

Pero no todo es biología. El uso de pantallas antes de dormir empeora la situación, no solo por la luz que emiten, sino porque las redes sociales y los videojuegos mantienen el cerebro activo justo cuando debería relajarse. Por eso, muchos pediatras recomiendan dejar el móvil fuera del dormitorio al menos una hora antes de acostarse.

¿Qué pueden hacer las familias? Lo primero, dar ejemplo: es difícil pedir a un hijo que deje el móvil si los adultos no lo hacen. También ayuda mantener horarios parecidos todos los días, incluidos los fines de semana, porque dormir hasta mediodía el domingo desajusta el reloj interno y hace que el lunes sea todavía más duro. Por último, conviene no convertir el tema en una batalla: es más eficaz explicar a los jóvenes cómo afecta el sueño a su rendimiento deportivo o a su memoria que imponer normas sin más.`,
      q: [
        ["Según el programa, los adolescentes necesitan…", ["menos horas de sueño que los adultos", "entre ocho y diez horas de sueño", "dormir siempre antes de las diez"], 1],
        ["Una de las causas biológicas es que…", ["el reloj interno se retrasa durante la adolescencia", "los jóvenes tienen más energía", "las clases empiezan tarde"], 0],
        ["Las pantallas perjudican el sueño porque…", ["solo emiten luz", "mantienen el cerebro activo, además de por la luz", "producen dolor de cabeza"], 1],
        ["¿Qué recomiendan muchos pediatras?", ["Apagar la luz a las nueve", "Hacer deporte por la noche", "Dejar el móvil fuera del dormitorio una hora antes de acostarse"], 2],
        ["Dormir hasta muy tarde el domingo…", ["ayuda a recuperar el sueño perdido", "no tiene consecuencias", "hace más difícil el lunes"], 2],
        ["Para convencer a los jóvenes, según el programa, es mejor…", ["imponer normas estrictas", "explicarles cómo influye el sueño en su rendimiento y su memoria", "quitarles el móvil todas las noches"], 1]
      ]
    },
    {
      id: "mk-b2-l2", lv: "B2", type: "auditiva", audio: true, title: "¿Semana de cuatro días?",
      ar: "استمع إلى حوار روثيو وآدم حول أسبوع العمل من أربعة أيام، ثم حدِّد مَن يقول كل فكرة: روثيو، أم آدم، أم لا أحد منهما.",
      text: `ROCÍO: ¿Has leído la propuesta de la dirección? Quieren probar la semana de cuatro días durante seis meses.
ADAM: Sí, y la verdad es que tengo dudas. Me parece bien descansar más, pero si tenemos que hacer el mismo trabajo en menos días, las jornadas van a ser agotadoras.
ROCÍO: Bueno, la idea no es trabajar más horas al día, sino reducir reuniones innecesarias. Yo pierdo casi una mañana entera cada semana en reuniones que podrían ser un correo.
ADAM: En eso te doy la razón. Pero en atención al cliente no es tan sencillo: alguien tiene que contestar el teléfono los cinco días.
ROCÍO: Se podrían organizar turnos, ¿no? Unos libran el lunes y otros el viernes.
ADAM: Puede ser. Lo que no me convence es que lo decidan sin preguntarnos. Me gustaría que hicieran una encuesta antes.
ROCÍO: Precisamente eso dice el último punto: habrá una consulta a la plantilla el mes que viene.
ADAM: Ah, no había llegado hasta ahí. Entonces lo veo con mejores ojos. Si además miden los resultados de forma objetiva, me parece una prueba razonable.
ROCÍO: A mí lo que más me ilusiona es poder pasar un día entero con mis padres, que viven en otra ciudad.`,
      q: [
        ["Teme que las jornadas sean demasiado largas.", ["Rocío", "Adam", "Ninguno de los dos"], 1],
        ["Pierde mucho tiempo en reuniones.", ["Rocío", "Adam", "Ninguno de los dos"], 0],
        ["Propone organizar turnos.", ["Rocío", "Adam", "Ninguno de los dos"], 0],
        ["Cree que la empresa debería contratar a más personas.", ["Rocío", "Adam", "Ninguno de los dos"], 2],
        ["Desconocía una parte de la propuesta.", ["Rocío", "Adam", "Ninguno de los dos"], 1],
        ["Quiere usar el día libre para visitar a su familia.", ["Rocío", "Adam", "Ninguno de los dos"], 0]
      ]
    },

    /* ---------- C1 ---------- */
    {
      id: "mk-c1-r1", lv: "C1", type: "lectura", title: "¿Externalizamos la memoria?",
      ar: "اقرأ المقال عن الذاكرة في عصر الأجهزة الرقمية ثم اختر الإجابة الصحيحة.",
      text: `Hace apenas veinte años, la mayoría de las personas era capaz de recitar de memoria una decena de números de teléfono. Hoy, muchos no recuerdan ni el de sus familiares más cercanos. Este cambio, que a primera vista podría interpretarse como un síntoma de deterioro cognitivo, ha suscitado un intenso debate entre neurocientíficos y pedagogos.

Para algunos, delegar en los dispositivos la tarea de almacenar datos no es más que la continuación de un proceso tan antiguo como la escritura. Ya en la Antigüedad hubo quien advirtió de que los textos escritos debilitarían la memoria de quienes confiaran en ellos, y sin embargo nadie defendería hoy que la escritura nos ha hecho menos inteligentes. Desde esta perspectiva, liberar al cerebro de información rutinaria le permitiría concentrarse en tareas de mayor complejidad, como relacionar ideas o resolver problemas.

Otros especialistas, en cambio, matizan este optimismo. Recuerdan que la memoria no es un simple almacén, sino la base sobre la que se construye el pensamiento crítico: difícilmente podrá uno establecer conexiones originales entre conceptos que no conoce. Si cada dato se consulta en el momento y se olvida al instante, el conocimiento corre el riesgo de volverse superficial y fragmentario.

Entre ambas posturas, cada vez más voces abogan por un uso consciente de la tecnología. No se trata de renunciar a las herramientas digitales, sino de decidir qué merece la pena retener. Memorizar un poema, una lista de vocabulario en otro idioma o los pasos de un razonamiento no es un ejercicio anticuado, sino una forma de entrenar la atención, una capacidad que, paradójicamente, es la más amenazada por la sobreabundancia de estímulos. En última instancia, la cuestión no sería tanto cuánto recordamos, sino qué hemos elegido olvidar.`,
      q: [
        ["Según el texto, que la gente ya no recuerde números de teléfono…", ["demuestra un deterioro cognitivo generalizado", "ha generado un debate entre especialistas", "preocupa únicamente a los pedagogos"], 1],
        ["Quienes ven el cambio con optimismo lo comparan con…", ["la aparición de la escritura", "la invención de la imprenta", "el desarrollo de la radio"], 0],
        ["Para los críticos, la memoria es importante porque…", ["permite recordar fechas con exactitud", "es la base del pensamiento crítico y de las conexiones entre ideas", "evita cualquier dependencia de los dispositivos"], 1],
        ["El autor sugiere que memorizar ciertos contenidos…", ["sirve para entrenar la atención", "es un ejercicio anticuado", "solo es útil para aprender idiomas"], 0],
        ["Según el texto, la capacidad más amenazada por el exceso de estímulos es…", ["la memoria a largo plazo", "la creatividad", "la atención"], 2],
        ["La conclusión del texto plantea que lo esencial es…", ["recordar la mayor cantidad posible de datos", "elegir conscientemente qué retener y qué olvidar", "abandonar las herramientas digitales"], 1]
      ]
    },
    {
      id: "mk-c1-u1", lv: "C1", type: "uso", title: "Toledo, ciudad de traductores",
      ar: "اقرأ النص عن الترجمة في طليطلة واختر الخيار المناسب لكل فراغ (1–6).",
      text: `Durante los siglos XII y XIII, Toledo se convirtió en uno de los principales focos de transmisión del saber en Europa. Tras su incorporación al reino de Castilla en 1085, la ciudad conservó una población diversa (1) ___ convivían cristianos, musulmanes y judíos, y en la que el árabe seguía siendo una lengua de cultura. (2) ___ esa circunstancia, numerosos sabios llegados de distintos puntos del continente se instalaron allí con el propósito de acceder a obras de astronomía, medicina, matemáticas y filosofía que (3) ___ desconocidas en el resto de Europa.

El método de trabajo solía ser colectivo: un intérprete que dominaba el árabe vertía oralmente el texto a la lengua romance y, a continuación, otro colaborador lo trasladaba al latín. Con el tiempo, especialmente bajo el reinado de Alfonso X, se impulsó la traducción directa al castellano, lo que (4) ___ decisivamente a consolidar esta lengua como vehículo de conocimiento científico.

Aunque a menudo se habla de una «Escuela de Traductores», los historiadores advierten de que no existió una institución formal (5) ___ tal, sino más bien una tradición sostenida durante generaciones. (6) ___, su legado resulta innegable: gracias a aquellas traducciones, autores como Avicena o Averroes llegaron a las universidades europeas.`,
      q: [
        ["(1)", ["en la que", "la cual", "donde que"], 0],
        ["(2)", ["A pesar de", "Gracias a", "En lugar de"], 1],
        ["(3)", ["fueran", "serían", "eran"], 2],
        ["(4)", ["contribuyó", "contribuyera", "contribuyendo"], 0],
        ["(5)", ["por", "como", "en"], 1],
        ["(6)", ["Es decir", "En cualquier caso", "Por consiguiente"], 1]
      ]
    },
    {
      id: "mk-c1-l1", lv: "C1", type: "auditiva", audio: true, title: "Conferencia: el agua que no vemos",
      ar: "استمع إلى المحاضرة عن «الماء الافتراضي» ثم أجب.",
      text: `Buenas tardes. Cuando pensamos en el consumo de agua, solemos imaginar el grifo de la cocina, la ducha o el riego del jardín. Sin embargo, esa es solo una pequeña parte del agua que utilizamos. A principios de los años noventa, el geógrafo británico John Anthony Allan propuso el concepto de «agua virtual» para referirse al volumen de agua necesario para producir un bien o un servicio. Desde ese punto de vista, una camiseta de algodón o un kilo de carne llevan incorporados miles de litros, aunque no los veamos.

¿Por qué es relevante esta idea? En primer lugar, porque permite entender el comercio internacional de otra manera. Un país con escasez de agua que importa cereales está, en cierto modo, importando el agua que se empleó para cultivarlos. Esto explica que algunas regiones áridas hayan podido alimentar a su población sin agotar por completo sus recursos hídricos.

Ahora bien, el concepto tiene sus limitaciones, y conviene no simplificarlo. No es lo mismo un litro de agua de lluvia que cae sobre un pasto que un litro extraído de un acuífero que tarda siglos en recargarse. Por eso, los especialistas distinguen entre distintos tipos de agua según su origen, y advierten de que comparar cifras totales sin más puede llevar a conclusiones engañosas.

Para terminar, me gustaría subrayar que el objetivo no es culpabilizar al consumidor, sino ofrecer información para tomar decisiones más sensatas, tanto en el ámbito doméstico como en las políticas agrarias. Reducir el desperdicio de alimentos, por ejemplo, es una de las formas más eficaces de ahorrar agua, aunque rara vez se perciba así.`,
      q: [
        ["El concepto de «agua virtual» se refiere a…", ["el agua que se pierde en las tuberías", "el agua necesaria para producir un bien o un servicio", "el agua que se consume en casa"], 1],
        ["Según el conferenciante, un país árido que importa cereales…", ["importa indirectamente agua", "agota sus acuíferos", "depende solo del agua de lluvia"], 0],
        ["¿Qué limitación del concepto se menciona?", ["Que es imposible de medir", "Que las cifras totales no distinguen el origen del agua", "Que solo sirve para la agricultura"], 1],
        ["Los especialistas advierten que comparar cifras totales…", ["es la mejor forma de evaluar el consumo", "solo es útil en el comercio", "puede conducir a conclusiones engañosas"], 2],
        ["El objetivo del concepto, según el ponente, es…", ["culpabilizar al consumidor", "prohibir ciertas importaciones", "ofrecer información para decidir mejor"], 2],
        ["Según el conferenciante, reducir el desperdicio de alimentos…", ["ahorra agua, aunque no se suela percibir así", "no tiene relación con el agua", "solo importa en las políticas agrarias"], 0]
      ]
    },
    {
      id: "mk-c1-l2", lv: "C1", type: "auditiva", audio: true, title: "Entrevista a una traductora literaria",
      ar: "استمع إلى المقابلة مع مترجمة أدبية من العربية إلى الإسبانية، ثم أجب.",
      text: `ENTREVISTADORA: Hoy nos acompaña Leila Haddad, traductora literaria del árabe al español. Leila, ¿cómo llegaste a esta profesión?
LEILA: Casi por casualidad. Estudié Filología Árabe pensando en dedicarme a la enseñanza, pero en el último curso un profesor me propuso colaborar en la traducción de una colección de cuentos. Aquel encargo me hizo descubrir que traducir es, ante todo, una forma de leer con extrema atención.
ENTREVISTADORA: ¿Qué es lo más difícil de traducir del árabe?
LEILA: Más que las palabras, el ritmo. El árabe literario admite frases larguísimas encadenadas con conjunciones que, trasladadas literalmente, resultarían pesadas en español. Hay que reconstruir la respiración del texto sin traicionar su sentido. Y luego están los referentes culturales: un plato, un refrán, una fórmula de cortesía… A veces una nota a pie de página es la solución, pero procuro no abusar de ellas, porque interrumpen la lectura.
ENTREVISTADORA: Se dice a menudo que el traductor es invisible. ¿Estás de acuerdo?
LEILA: Solo en parte. Es cierto que si el lector nota constantemente la traducción, algo ha fallado. Pero cada decisión que tomo deja una huella, y me parece justo que se reconozca, por ejemplo, incluyendo el nombre del traductor en la portada.
ENTREVISTADORA: ¿Y la inteligencia artificial? ¿Te preocupa?
LEILA: Me preocupa más el uso que se haga de ella que la herramienta en sí. Para textos técnicos puede ser útil, pero la literatura exige interpretar ironías, silencios, dobles sentidos. Lo que sí temo es que las editoriales la utilicen para abaratar costes y que el resultado sea una literatura más plana.`,
      q: [
        ["Leila empezó a traducir…", ["porque siempre había querido ser traductora", "a raíz de una propuesta de un profesor", "después de muchos años como profesora"], 1],
        ["Para Leila, traducir es sobre todo…", ["una forma de leer con mucha atención", "un trabajo puramente técnico", "una actividad muy solitaria"], 0],
        ["¿Cuál es, según ella, la mayor dificultad del árabe literario?", ["El vocabulario", "La gramática", "El ritmo de las frases"], 2],
        ["Sobre las notas a pie de página, Leila opina que…", ["son siempre necesarias", "deben evitarse por completo", "conviene no abusar de ellas"], 2],
        ["Respecto a la invisibilidad del traductor, Leila…", ["está totalmente de acuerdo", "cree que su trabajo debería reconocerse más", "piensa que el lector debe notar la traducción"], 1],
        ["Lo que más le preocupa de la inteligencia artificial es…", ["que las editoriales la usen para reducir costes y empobrecer la literatura", "que traduzca mejor que ella", "que no sirva para textos técnicos"], 0]
      ]
    },

    /* ---------- C2 ---------- */
    {
      id: "mk-c2-r1", lv: "C2", type: "lectura", title: "El arte de discrepar",
      ar: "اقرأ المقال الفكري عن فن الاختلاف في الرأي ثم اختر الإجابة الصحيحة.",
      text: `Pocas habilidades sociales gozan de tan mala prensa y, a la vez, resultan tan imprescindibles como la de discrepar. En una época en la que las redes tienden a agrupar a los usuarios en comunidades de afines, la experiencia de toparse con una opinión contraria se vive cada vez con mayor frecuencia como una agresión antes que como una oportunidad. No es de extrañar, pues, que proliferen los diagnósticos alarmistas sobre la supuesta incapacidad contemporánea para el diálogo.

Conviene, sin embargo, desconfiar de la nostalgia. Sería ingenuo suponer que en otros tiempos el desacuerdo se ejercía con una cortesía ejemplar; basta con hojear las polémicas literarias de cualquier siglo para comprobar que el insulto ingenioso tiene una larga tradición. Lo novedoso no es, por tanto, la aspereza del debate, sino la escala y la velocidad a la que se difunde, así como la facilidad con la que una réplica improvisada queda registrada para siempre.

Discrepar con provecho exige, en primer lugar, distinguir entre las ideas y quienes las sostienen. Quien rebate un argumento atacando a la persona no solo incurre en una falacia de manual, sino que clausura de antemano cualquier posibilidad de que el otro rectifique sin sentirse humillado. En segundo lugar, requiere una dosis de humildad epistémica: admitir que uno podría estar equivocado no equivale a renunciar a las propias convicciones, sino a someterlas a prueba.

Por último, y quizá sea lo más difícil, el buen desacuerdo reclama tiempo. Las razones complejas rara vez caben en unas pocas líneas, y la prisa favorece la consigna sobre el matiz. De ahí que algunos educadores reivindiquen la vieja práctica del debate reglado, en la que cada participante debe exponer con fidelidad la postura contraria antes de refutarla. El ejercicio, lejos de ser un mero entrenamiento retórico, obliga a habitar por un momento el punto de vista ajeno, que es, en definitiva, la condición de toda convivencia.`,
      q: [
        ["Según el autor, hoy en día encontrarse con una opinión contraria…", ["se considera una oportunidad de aprendizaje", "se percibe a menudo como un ataque", "es cada vez menos frecuente"], 1],
        ["El autor desconfía de la nostalgia porque…", ["en el pasado el desacuerdo tampoco era siempre cortés", "antes no existían polémicas literarias", "la cortesía actual es mayor que nunca"], 0],
        ["Lo verdaderamente nuevo del debate actual es…", ["su dureza", "su escala, su velocidad y su permanencia", "el uso del ingenio"], 1],
        ["Atacar a la persona en lugar del argumento…", ["es una estrategia eficaz para convencer", "es aceptable en ciertas polémicas", "dificulta que el otro rectifique sin sentirse humillado"], 2],
        ["Para el autor, la «humildad epistémica» implica…", ["renunciar a las propias convicciones", "someter las propias ideas a prueba", "evitar los debates difíciles"], 1],
        ["El debate reglado que reivindican algunos educadores consiste en…", ["exponer fielmente la postura contraria antes de refutarla", "limitar el tiempo de cada intervención", "votar al final quién tiene razón"], 0]
      ]
    },
    {
      id: "mk-c2-u1", lv: "C2", type: "uso", title: "El papel que llegó de Oriente",
      ar: "اقرأ النص عن انتقال صناعة الورق إلى أوروبا عبر الأندلس، واختر الخيار المناسب لكل فراغ (1–6).",
      text: `Pocos inventos han transformado tan profundamente la transmisión del saber como el papel, y pocos lugares (1) ___ un papel tan destacado en su difusión por Europa como al-Ándalus. Originario de China, el procedimiento para fabricarlo llegó al mundo islámico hacia el siglo VIII y, desde allí, fue extendiéndose hacia occidente (2) ___ las rutas comerciales. En la península ibérica, la ciudad de Xàtiva alcanzó tal renombre que el geógrafo al-Idrisi, en el siglo XII, (3) ___ la calidad de su papel, del que se decía que no tenía parangón.

Frente al pergamino, elaborado con pieles de animales y, por tanto, costoso y escaso, el nuevo soporte ofrecía una alternativa más asequible, (4) ___ no exenta de recelos: durante algún tiempo, ciertas cancillerías cristianas desconfiaron de su durabilidad y se resistieron a emplearlo en documentos oficiales.

Con todo, su abaratamiento progresivo acabó por imponerse, y no (5) ___ exagerado afirmar que sin él la posterior revolución de la imprenta habría tenido un alcance mucho más limitado. Que hoy apenas reparemos en su origen no hace sino confirmar hasta qué punto (6) ___ en nuestra vida cotidiana.`,
      q: [
        ["(1)", ["desempeñaron", "desempeñaran", "desempeñarían"], 0],
        ["(2)", ["a raíz de", "a través de", "a fuerza de"], 1],
        ["(3)", ["elogie", "haya elogiado", "elogió"], 2],
        ["(4)", ["aunque", "sino", "por más que"], 0],
        ["(5)", ["resulte", "resulta", "resultase"], 1],
        ["(6)", ["se integrara", "se ha integrado", "se haya integrado"], 1]
      ]
    },
    {
      id: "mk-c2-l1", lv: "C2", type: "auditiva", audio: true, title: "Ponencia: la ciudad de los quince minutos",
      ar: "استمع إلى المداخلة عن نموذج «مدينة الخمس عشرة دقيقة» ثم أجب.",
      text: `Muchas gracias por la invitación. Me han pedido que hable de la llamada «ciudad de los quince minutos», un modelo urbanístico que ha pasado en pocos años de los círculos académicos a los programas electorales, lo cual, dicho sea de paso, no siempre le ha hecho un favor. La idea, formulada por el urbanista Carlos Moreno, es en apariencia sencilla: que cualquier vecino pueda satisfacer sus necesidades cotidianas —trabajar, comprar, estudiar, recibir atención sanitaria o disfrutar del ocio— a un máximo de quince minutos a pie o en bicicleta de su casa.

Lo que me interesa subrayar es que no estamos ante una invención absoluta. Los barrios tradicionales de muchas ciudades mediterráneas, con sus mercados, sus plazas y sus comercios en planta baja, funcionaban ya de ese modo mucho antes de que nadie le pusiera nombre. Lo que el modelo propone, en realidad, es corregir una tendencia del siglo XX: la zonificación estricta, que separó las viviendas de los lugares de trabajo y de consumo y convirtió el automóvil en una necesidad.

Ahora bien, sería un error presentarlo como una panacea. En primer lugar, existe el riesgo de que los barrios que mejoran sus servicios se encarezcan y expulsen precisamente a quienes más se beneficiarían de ellos. En segundo lugar, no todos los empleos pueden acercarse a la vivienda, y una ciudad no deja de ser un sistema interconectado: aislar los barrios sería tan perjudicial como el modelo que se pretende superar.

Por último, permítanme referirme a la polémica. En algunos lugares se ha difundido la idea de que el modelo pretende restringir la libertad de movimiento. Nada en su formulación original apunta en esa dirección: se trata de ampliar las opciones, no de suprimirlas. Que ese malentendido haya prosperado dice más de nuestra conversación pública que del urbanismo.`,
      q: [
        ["Según el ponente, la popularidad política del modelo…", ["no siempre lo ha beneficiado", "ha sido la clave de su éxito", "ha permitido aplicarlo en todas partes"], 0],
        ["¿Qué afirma sobre los barrios mediterráneos tradicionales?", ["Que impiden aplicar el modelo", "Que ya funcionaban de forma parecida", "Que fueron diseñados por Carlos Moreno"], 1],
        ["Según el ponente, el modelo busca corregir…", ["la falta de zonas verdes", "el exceso de comercios en planta baja", "la zonificación estricta del siglo XX"], 2],
        ["Uno de los riesgos mencionados es que…", ["los barrios mejorados se encarezcan y expulsen a sus vecinos", "los comercios tradicionales cierren", "aumente el uso del coche"], 0],
        ["¿Por qué no conviene aislar los barrios?", ["Porque los vecinos lo rechazan", "Porque la ciudad es un sistema interconectado", "Porque resulta demasiado caro"], 1],
        ["Respecto a la polémica sobre la libertad de movimiento, el ponente sostiene que…", ["tiene fundamento en la formulación original", "refleja más bien un problema del debate público", "obliga a revisar el modelo"], 1]
      ]
    },
    {
      id: "mk-c2-l2", lv: "C2", type: "auditiva", audio: true, title: "Debate: ¿papel o pantalla?",
      ar: "استمع إلى النقاش بين مارتا وإبراهيم حول القراءة الورقية والرقمية، ثم حدِّد مَن يعبّر عن كل فكرة: مارتا، أم إبراهيم، أم لا أحد منهما.",
      text: `MODERADOR: Hoy debatimos sobre la lectura en pantalla frente a la lectura en papel. Marta, usted es pedagoga. ¿Qué dicen los estudios?
MARTA: Varios metaanálisis recientes coinciden en una tendencia: cuando se trata de textos largos y complejos, la comprensión suele ser algo mejor en papel. Lo curioso es que los lectores en pantalla tienden a sobrestimar lo que han entendido. Leen más deprisa y se sienten más seguros, pero luego responden peor.
IBRAHIM: No discuto los datos, pero sí su interpretación. Buena parte de esa diferencia no se debe al soporte en sí, sino a los hábitos: en pantalla estamos acostumbrados a leer mensajes breves y a saltar de un enlace a otro. Si se enseñara a leer en pantalla con la misma exigencia que en papel, la brecha se reduciría.
MARTA: Es posible, aunque eso está por demostrar. Y, mientras tanto, las escuelas están digitalizándose a toda prisa sin esperar a saberlo.
IBRAHIM: En eso coincido con usted: se ha confundido modernizar con comprar dispositivos. Pero no olvidemos lo que aporta la pantalla: un estudiante con dislexia puede ajustar la tipografía o escuchar el texto mientras lo sigue. Para él, el papel no es neutral.
MARTA: Totalmente de acuerdo. Mi propuesta no es prohibir, sino elegir el soporte según el objetivo: papel para el estudio profundo y pantalla para la búsqueda de información o la adaptación a necesidades concretas.
IBRAHIM: Yo añadiría algo que rara vez se menciona: el cansancio visual depende mucho más de la pantalla concreta que del hecho de leer en digital. Una tinta electrónica no tiene nada que ver con un teléfono antiguo.`,
      q: [
        ["Afirma que quienes leen en pantalla creen haber entendido más de lo que realmente han entendido.", ["Marta", "Ibrahim", "Ninguno de los dos"], 0],
        ["Atribuye las diferencias de comprensión, sobre todo, a los hábitos de lectura.", ["Marta", "Ibrahim", "Ninguno de los dos"], 1],
        ["Considera que aún no se ha demostrado que enseñar a leer en pantalla reduzca la diferencia.", ["Marta", "Ibrahim", "Ninguno de los dos"], 0],
        ["Defiende que la pantalla facilita la lectura a algunos estudiantes con dificultades.", ["Marta", "Ibrahim", "Ninguno de los dos"], 1],
        ["Propone prohibir los dispositivos digitales en clase.", ["Marta", "Ibrahim", "Ninguno de los dos"], 2],
        ["Señala que la fatiga visual depende del tipo de pantalla.", ["Marta", "Ibrahim", "Ninguno de los dos"], 1]
      ]
    }
  ],

  /* ======================= WRITING (نماذج إجابة أصلية) ======================= */
  writing: [
    {
      lv: "A1",
      prompt: "Completa este formulario para inscribirte en un curso de cocina: nombre, nacionalidad, profesión y por qué quieres hacer el curso.",
      ar: "املأ استمارة للتسجيل في دورة طبخ: الاسم، الجنسية، المهنة، ولماذا تريد الالتحاق بالدورة.",
      words: "15–25",
      model: `Nombre: Ali Hassan.
Nacionalidad: egipcia.
Profesión: ingeniero.
¿Por qué quieres hacer el curso?: Vivo en Sevilla y quiero aprender a cocinar platos españoles.`
    },
    {
      lv: "A1",
      prompt: "Escribe un correo a Pablo, tu nuevo compañero de clase. Preséntate, di dónde vives, qué estudias o en qué trabajas y qué te gusta hacer.",
      ar: "اكتب بريدًا إلى بابلو، زميلك الجديد في الصف: قدّم نفسك، وقل أين تسكن، وماذا تدرس أو تعمل، وماذا تحب أن تفعل.",
      words: "30–40",
      model: `Hola, Pablo:
Me llamo Yasmin y tengo veinte años. Vivo en Alicante con mis padres y mis dos hermanas. Estudio Enfermería en la universidad. Me gusta leer, cocinar y pasear por la playa. ¿Y a ti?
Un saludo,
Yasmin`
    },
    {
      lv: "A2",
      prompt: "Tu amiga Clara te invita a cenar en su casa el viernes. Responde a su mensaje: dale las gracias, explica que no puedes ir y por qué, y propón otro día y otro plan.",
      ar: "صديقتك كلارا تدعوك إلى العشاء في بيتها يوم الجمعة. ردّ على رسالتها: اشكرها، واعتذر مع ذكر السبب، واقترح يومًا آخر ونشاطًا آخر.",
      words: "60–70",
      model: `¡Hola, Clara!
Muchas gracias por la invitación. Me encantaría ir, pero el viernes no puedo, porque mis tíos llegan de Túnez esa tarde y tengo que ir a buscarlos al aeropuerto. ¿Qué te parece el domingo? Podemos ir al parque del río por la mañana y después tomar un chocolate en la cafetería de la plaza. Yo te invito.
Un beso,
Nora`
    },
    {
      lv: "A2",
      prompt: "Escribe un texto sobre tu último viaje: adónde fuiste, con quién, cómo viajaste, qué hiciste y qué te gustó más.",
      ar: "اكتب نصًّا عن آخر رحلة قمت بها: إلى أين ذهبت، ومع مَن، وكيف سافرت، وماذا فعلت، وما الذي أعجبك أكثر.",
      words: "70–80",
      model: `El verano pasado fui a Estambul con mi hermano mayor. Viajamos en avión desde Madrid y el vuelo duró unas cuatro horas. Nos quedamos cinco días en un hotel cerca del mar. Visitamos mezquitas preciosas, paseamos por el Gran Bazar y probamos muchos dulces típicos. Una tarde hicimos un paseo en barco por el Bósforo. Lo que más me gustó fue la vista de la ciudad desde el agua al atardecer. ¡Quiero volver pronto!`
    },
    {
      lv: "B1",
      prompt: "Una amiga española va a visitar tu ciudad el mes que viene y te ha pedido consejos. Escríbele un correo: salúdala, recomiéndale dos o tres lugares, háblale de la comida típica y propón un día para veros.",
      ar: "صديقة إسبانية ستزور مدينتك الشهر القادم وطلبت نصائحك. اكتب لها بريدًا: حيِّها، وأوصِها بمكانين أو ثلاثة، وحدّثها عن الطعام المحلي، واقترح يومًا للقاء.",
      words: "100–120",
      model: `Querida Marta:
¡Qué alegría saber que vienes a Amán! Te van a encantar la ciudad y su gente.
Te recomiendo visitar la Ciudadela por la tarde, porque desde allí se ve toda la ciudad. También tienes que ir al Teatro Romano, que está muy bien conservado, y pasear por la calle Rainbow, donde hay cafeterías y tiendas de artesanía.
En cuanto a la comida, no te puedes ir sin probar el mansaf, el plato más típico de Jordania, ni el knafeh, un dulce de queso riquísimo.
Si te parece bien, el sábado podemos comer juntas en casa de mis padres. ¡Mi madre cocina de maravilla!
Escríbeme pronto.
Un abrazo,
Huda`
    },
    {
      lv: "B1",
      prompt: "Escribe una entrada para un blog sobre una persona que ha sido importante en tu vida: quién es, cómo la conociste, por qué es importante para ti y qué has aprendido de ella.",
      ar: "اكتب تدوينة عن شخص كان له أثر مهم في حياتك: مَن هو، وكيف تعرّفت إليه، ولماذا هو مهم لك، وماذا تعلّمت منه.",
      words: "130–150",
      model: `La persona que más me ha influido es mi profesor de Matemáticas del instituto, don Ahmed. Lo conocí cuando tenía catorce años, en un momento en que yo odiaba los números y sacaba muy malas notas.
Desde el primer día me sorprendió su paciencia. Nunca se enfadaba cuando alguien no entendía algo; al contrario, buscaba otra forma de explicarlo, con ejemplos de la vida real: el precio del pan, los goles de un partido o el tiempo que tardábamos en llegar al colegio.
Gracias a él, empecé a ver las matemáticas como un juego y, al final de ese curso, aprobé con buena nota. Hoy estudio Ingeniería, y estoy seguro de que no habría elegido esta carrera sin su ayuda.
De don Ahmed aprendí que nadie es «malo» en algo para siempre: a veces solo necesitamos a alguien que crea en nosotros.`
    },
    {
      lv: "B2",
      prompt: "En tu barrio no hay carriles para bicicletas y el tráfico es cada vez más peligroso. Escribe un correo formal al ayuntamiento: describe la situación, explica sus consecuencias y propón al menos dos soluciones concretas.",
      ar: "لا توجد في حيّك مسارات للدراجات وأصبحت حركة السير أخطر. اكتب بريدًا رسميًّا إلى البلدية: صِف الوضع، واشرح عواقبه، واقترح حلّين محددين على الأقل.",
      words: "150–180",
      model: `Estimados señores:
Me dirijo a ustedes como vecina del barrio de La Estación para trasladarles una preocupación compartida por muchas familias.
En los últimos años, el número de personas que se desplazan en bicicleta ha aumentado notablemente, sobre todo entre los estudiantes. Sin embargo, el barrio no cuenta con ningún carril bici, por lo que los ciclistas se ven obligados a circular entre coches y autobuses. Solo este curso se han producido varios accidentes leves cerca del instituto, y muchos padres ya no permiten que sus hijos vayan en bicicleta, lo que a su vez incrementa el tráfico en horas punta.
Por ello, me permito proponerles dos medidas. En primer lugar, la construcción de un carril bici protegido en la avenida principal, que conecta el barrio con el centro. En segundo lugar, la reducción de la velocidad máxima a 30 km/h en las calles próximas a los centros escolares.
Quedo a su disposición para colaborar en lo que consideren oportuno.
Atentamente,
Salma Benali`
    },
    {
      lv: "B2",
      prompt: "Una revista juvenil pide a sus lectores su opinión sobre esta pregunta: ¿deberían los colegios prohibir el uso del móvil durante toda la jornada escolar? Escribe un artículo de opinión con argumentos a favor y en contra y tu postura final.",
      ar: "تطلب مجلة شبابية رأي قرّائها: هل ينبغي للمدارس منع الهاتف المحمول طوال اليوم الدراسي؟ اكتب مقال رأي يعرض حججًا مؤيدة ومعارضة ثم موقفك النهائي.",
      words: "150–180",
      model: `¿Móviles en el colegio? Sí, pero con normas
Pocas cuestiones generan tanto debate entre padres y profesores como el uso del móvil en las aulas. Quienes defienden la prohibición total argumentan, con razón, que el teléfono es una fuente constante de distracciones y que, además, puede favorecer situaciones de acoso entre compañeros.
No obstante, prohibirlo por completo también tiene inconvenientes. El móvil puede ser una herramienta educativa muy útil: permite consultar diccionarios, grabar experimentos o usar aplicaciones para aprender idiomas. Por otra parte, muchos alumnos lo necesitan para avisar a sus familias en caso de urgencia.
En mi opinión, la solución no es elegir entre todo o nada, sino establecer normas claras. Los teléfonos podrían guardarse durante las clases y utilizarse solo cuando el profesor lo indique para una actividad concreta. Así, los estudiantes aprenderían a usar la tecnología de forma responsable, algo que, sin duda, necesitarán en su vida adulta.`
    },
    {
      lv: "C1",
      prompt: "Has escuchado una conferencia sobre el voluntariado juvenil. Ideas principales de la conferenciante: (1) el número de jóvenes voluntarios ha crecido en la última década; (2) el voluntariado desarrolla habilidades como el trabajo en equipo y la empatía; (3) algunas organizaciones abusan de los voluntarios para cubrir puestos que deberían ser remunerados; (4) propone una regulación que garantice la formación y los derechos de los voluntarios. Escribe un texto en el que resumas las ideas principales y expreses tu valoración personal de forma argumentada.",
      ar: "سمعت محاضرة عن تطوع الشباب، وأفكارها الرئيسة: ازدياد عدد المتطوعين الشباب في العقد الأخير، وتنمية التطوع لمهارات كالعمل الجماعي والتعاطف، واستغلال بعض المنظمات للمتطوعين في وظائف ينبغي أن تكون مدفوعة الأجر، واقتراح تنظيم قانوني يضمن تدريب المتطوعين وحقوقهم. اكتب نصًّا تلخّص فيه الأفكار ثم تقدّم تقييمك الشخصي بحجج (هذه مهمة وساطة كما في نموذج 2024).",
      words: "220–250",
      model: `En su intervención, la conferenciante analizó la evolución del voluntariado juvenil y sus luces y sombras. Comenzó señalando que el número de jóvenes que dedican parte de su tiempo a causas sociales ha aumentado de forma notable en los últimos diez años, y atribuyó este crecimiento a una mayor sensibilidad hacia los problemas colectivos. A continuación, destacó los beneficios personales de esta experiencia, entre los que mencionó el desarrollo de la empatía y la capacidad de trabajar en equipo. Sin embargo, también advirtió de un riesgo preocupante: algunas entidades recurren a voluntarios para cubrir tareas que deberían desempeñar profesionales remunerados. Por ello, concluyó proponiendo una regulación que garantice tanto la formación como los derechos de quienes colaboran de manera altruista.

En mi opinión, el análisis resulta acertado y equilibrado. Comparto plenamente la idea de que el voluntariado es una escuela de valores: quien ha acompañado a personas mayores o ha repartido alimentos difícilmente vuelve a mirar su entorno con indiferencia. Ahora bien, considero que la denuncia del uso abusivo de voluntarios es la aportación más valiosa de la conferencia, pues se trata de un problema del que apenas se habla. Si la generosidad de los jóvenes sustituye empleos estables, se desvirtúa el sentido mismo de la ayuda. Una regulación clara, por tanto, no limitaría el voluntariado, sino que lo protegería y lo haría más sostenible.`
    },
    {
      lv: "C1",
      prompt: "Trabajas en un centro cultural municipal. La dirección te pide un informe con una propuesta de actividades para integrar a las familias recién llegadas al barrio. Datos de una encuesta reciente: al 68 % de esas familias le interesan las clases de español; al 45 %, las actividades para niños; al 30 %, la orientación laboral. Redacta el informe: presenta los datos, propón actividades concretas y justifica tu propuesta.",
      ar: "تعمل في مركز ثقافي بلدي، وطلبت منك الإدارة تقريرًا يقترح أنشطة لدمج الأسر الوافدة حديثًا إلى الحي، مع بيانات استبيان (68% مهتمون بدروس الإسبانية، 45% بأنشطة الأطفال، 30% بالتوجيه المهني). اكتب التقرير: اعرض البيانات، واقترح أنشطة محددة، وعلّل اقتراحك. (البيانات افتراضية لغرض التدريب.)",
      words: "180–220",
      model: `Informe: propuesta de actividades para familias recién llegadas

1. Objetivo
El presente informe tiene como finalidad proponer un programa de actividades que facilite la integración de las familias que se han instalado recientemente en el barrio.

2. Análisis de los datos
Según la encuesta realizada el pasado trimestre, la principal demanda es el aprendizaje del idioma: el 68 % de las familias se muestra interesado en recibir clases de español. Les siguen las actividades infantiles, señaladas por el 45 %, y la orientación laboral, mencionada por el 30 %.

3. Propuesta
En consecuencia, se recomienda:
– Organizar cursos de español en dos horarios, de mañana y de tarde, para adaptarse a las distintas jornadas laborales.
– Ofrecer, en paralelo a dichos cursos, talleres de lectura y juegos para niños, de modo que los padres puedan asistir a clase sin problemas de conciliación.
– Celebrar una sesión mensual de orientación laboral en colaboración con la oficina de empleo.

4. Conclusión
Este programa responde directamente a las necesidades expresadas por las propias familias y aprovecha los recursos con los que ya cuenta el centro. Asimismo, favorecería el contacto entre vecinos de distintos orígenes, lo que constituye el primer paso hacia una convivencia plena.`
    },
    {
      lv: "C2",
      prompt: "Una revista cultural te invita a escribir una columna de opinión con el siguiente título: «¿Tiene sentido aprender idiomas en la era de la traducción automática?». Defiende tu postura con argumentos sólidos, matices y un registro culto.",
      ar: "تدعوك مجلة ثقافية إلى كتابة عمود رأي بعنوان: «هل ما زال لتعلّم اللغات معنى في عصر الترجمة الآلية؟». دافِع عن موقفك بحجج متينة وتمييزات دقيقة وبأسلوب راقٍ. (طول النص مأخوذ من مواصفات 2018 للمهمة 3 ولم يُتحقق منه في نموذج 2024.)",
      words: "200–250",
      model: `Aprender idiomas cuando las máquinas traducen

Cada vez que un traductor automático resuelve en segundos lo que antes exigía horas de diccionario, resurge la misma pregunta: ¿para qué seguir aprendiendo idiomas? La respuesta, a mi juicio, depende de lo que entendamos por hablar una lengua.

Si se trata únicamente de descifrar un menú o de redactar un correo rutinario, la tecnología ha ganado la partida, y sería absurdo negarlo. Pero una lengua no es un código que se intercambia por otro sin pérdida alguna. Es, ante todo, una manera de ordenar el mundo: sus refranes, sus silencios y sus fórmulas de cortesía encierran una historia que ninguna herramienta transmite por completo. Quien aprende árabe o español no adquiere solo vocabulario, sino la posibilidad de entender a otros desde dentro.

Hay, además, un argumento que suele pasarse por alto: el esfuerzo mismo de aprender. Enfrentarse a una gramática ajena obliga a tolerar la incertidumbre, a equivocarse en público y a escuchar con atención, virtudes que escasean en una época de respuestas instantáneas.

No pretendo demonizar la traducción automática, que derriba barreras y presta servicios valiosísimos. Sencillamente, conviene no confundir el atajo con el camino. La máquina nos ayuda a llegar; aprender el idioma es lo que nos permite, una vez allí, quedarnos.`
    },
    {
      lv: "C2",
      prompt: "Reelabora el siguiente mensaje informal, escrito por un vecino en un grupo de mensajería, para convertirlo en un aviso formal de la junta de la comunidad de propietarios que se colgará en el portal. Corrige los errores, mejora la organización y adapta el registro: «ojo q el martes cortan el agua d 9 a 2 x obras, lo dijo el d la empresa. llenad cubos o algo. y q el ascensor tb lo paran xq van a tocar algo d la luz. si alguien mayor necesita ayuda q avise a la presi. ah y no dejeis bicis en el portal q estorban mucho a los obreros».",
      ar: "أعِد صياغة رسالة غير رسمية كتبها جار في مجموعة دردشة، لتصبح إعلانًا رسميًّا من إدارة اتحاد الملاك يُعلَّق في مدخل العمارة: صحّح الأخطاء ونظّم المعلومات وغيّر السجلّ إلى الرسمي. (نوع مهمة «إعادة الصياغة» في C2؛ الطول من مواصفات 2018 ولم يُتحقق منه في نموذج 2024.)",
      words: "150–250",
      model: `AVISO A LOS VECINOS

La junta de la comunidad de propietarios informa de que, con motivo de las obras de mantenimiento que se realizarán en el edificio, el próximo martes se producirán las siguientes interrupciones del servicio:

– Suministro de agua: quedará cortado de 9:00 a 14:00, según ha comunicado la empresa responsable. Se recomienda a los vecinos que dispongan con antelación de una reserva de agua suficiente para ese periodo.
– Ascensor: permanecerá fuera de servicio durante la misma franja horaria, ya que será necesario intervenir en la instalación eléctrica.

Aquellos vecinos de edad avanzada o con movilidad reducida que puedan necesitar ayuda durante la jornada deberán ponerlo en conocimiento de la presidenta de la comunidad con la mayor antelación posible, a fin de organizar el apoyo necesario.

Asimismo, se ruega encarecidamente que no se dejen bicicletas ni otros objetos en el portal, con el fin de facilitar el trabajo de los operarios y garantizar la seguridad de todos.

Agradecemos de antemano su colaboración y lamentamos las molestias que estas obras puedan ocasionar.

La junta de la comunidad`
    }
  ],

  /* ======================= SPEAKING ======================= */
  speaking: [
    {
      lv: "A1",
      prompt: "Preséntate: di tu nombre, tu edad, tu nacionalidad, dónde vives, qué idiomas hablas y a qué te dedicas.",
      ar: "قدّم نفسك (1–2 دقيقة): اسمك، عمرك، جنسيتك، أين تسكن، ما اللغات التي تتحدثها، وما عملك أو دراستك.",
      useful: ["Me llamo… y tengo… años.", "Soy de… / Soy marroquí, egipcio, saudí…", "Vivo en… con mi familia.", "Hablo árabe, inglés y un poco de español.", "Trabajo en… / Estudio…", "En mi tiempo libre me gusta…"]
    },
    {
      lv: "A1",
      prompt: "Habla de tu casa y de tu familia: cómo es tu casa, cuántas habitaciones tiene, con quién vives y cómo son las personas de tu familia.",
      ar: "تحدّث عن بيتك وعائلتك (2–3 دقائق): كيف بيتك، كم غرفة فيه، مع مَن تسكن، وكيف هم أفراد عائلتك.",
      useful: ["Vivo en un piso / una casa…", "Tiene tres habitaciones, una cocina y un salón.", "En mi familia somos cinco.", "Mi padre es alto y muy simpático.", "Mi hermana pequeña se llama…", "Me gusta mucho mi casa porque…"]
    },
    {
      lv: "A2",
      prompt: "Describe una fotografía: una familia hace la compra en un mercado al aire libre. ¿Dónde están? ¿Quiénes son? ¿Qué hacen? ¿Qué crees que van a comprar?",
      ar: "صِف صورة (2–3 دقائق): عائلة تتسوّق في سوق مفتوح. أين هم؟ مَن هم؟ ماذا يفعلون؟ ماذا تظن أنهم سيشترون؟",
      useful: ["En la foto hay… / Se ve…", "A la izquierda / a la derecha / en el centro…", "Parece que están en…", "Creo que son una madre y sus dos hijos.", "Están comprando fruta y verdura.", "Seguramente van a preparar una comida especial."]
    },
    {
      lv: "A2",
      prompt: "Situación: estás en una tienda de ropa y quieres comprar un regalo para un familiar. Habla con el dependiente (el examinador): explica qué buscas, pregunta por tallas, colores y precios, y decide.",
      ar: "موقف (3–4 دقائق): أنت في متجر ملابس وتريد شراء هدية لأحد أقاربك. تحدّث مع البائع (الممتحِن): اشرح ما تبحث عنه، واسأل عن المقاسات والألوان والأسعار، ثم قرّر.",
      useful: ["Buenos días, estoy buscando un regalo para…", "¿Tiene esta camisa en otro color?", "¿Qué talla es? Necesito una mediana.", "¿Cuánto cuesta?", "Es un poco cara. ¿Tiene algo más barato?", "Me lo llevo. ¿Puedo pagar con tarjeta?"]
    },
    {
      lv: "B1",
      prompt: "Presentación breve: habla de un viaje o de una experiencia que recuerdas especialmente. Cuenta cuándo fue, qué pasó, cómo te sentiste y por qué es importante para ti. Después, responde a las preguntas del examinador.",
      ar: "عرض قصير (2–3 دقائق) ثم حوار (3–4 دقائق): تحدّث عن رحلة أو تجربة تتذكرها بشكل خاص: متى كانت، وماذا حدث، وبماذا شعرت، ولماذا هي مهمة لك، ثم أجب عن أسئلة الممتحِن.",
      useful: ["Voy a hablar de… / Quiero contaros…", "Hace dos años, cuando tenía…", "Lo que más me impresionó fue…", "Al principio estaba nervioso, pero luego…", "Para mí fue importante porque…", "Si pudiera, volvería a…"]
    },
    {
      lv: "B1",
      prompt: "Situación: llamas a un centro de salud para pedir una cita. El examinador es el recepcionista. Explica qué te pasa, desde cuándo, elige el día y la hora, y pregunta qué documentos necesitas.",
      ar: "موقف (2–3 دقائق): تتصل بمركز صحي لحجز موعد، والممتحِن هو موظف الاستقبال. اشرح ما تشكو منه ومنذ متى، واختر اليوم والساعة، واسأل عن الوثائق المطلوبة.",
      useful: ["Buenos días, llamo para pedir una cita con el médico.", "Desde hace tres días me duele mucho la garganta.", "¿Tienen algún hueco esta semana?", "Por la mañana me viene mejor.", "¿Tengo que llevar la tarjeta sanitaria?", "Perdone, ¿me lo puede repetir más despacio?"]
    },
    {
      lv: "B2",
      prompt: "El ayuntamiento de tu ciudad quiere reducir el tráfico en el centro y estudia estas propuestas: cobrar una tasa a los coches que entren en el centro; ampliar el transporte público nocturno; crear más aparcamientos para bicicletas; cerrar algunas calles al tráfico los fines de semana. Valora las propuestas, di cuáles te parecen mejores y por qué, y conversa con el examinador.",
      ar: "تقييم مقترحات (6–7 دقائق): تريد بلدية مدينتك تقليل حركة السيارات في المركز وتدرس: فرض رسم على السيارات الداخلة إلى المركز، وتوسيع النقل العام الليلي، وإنشاء مواقف للدراجات، وإغلاق بعض الشوارع في عطلة نهاية الأسبوع. قيّم المقترحات وبيّن أفضلها ولماذا، ثم ناقش الممتحِن.",
      useful: ["La propuesta que me parece más acertada es…, ya que…", "No estoy del todo de acuerdo con…, porque podría…", "Por un lado…, pero por otro…", "Habría que tener en cuenta que…", "Yo añadiría que…", "Depende de cómo se aplique."]
    },
    {
      lv: "B2",
      prompt: "Observa la fotografía: varias personas esperan en la sala de un aeropuerto; en la pantalla aparece «Retrasado». Imagina la situación: quiénes son, qué ha pasado, cómo se sienten, qué van a hacer y cómo terminará. Después, comenta con el examinador si has vivido algo parecido.",
      ar: "صورة وموقف مُتخيَّل (5–6 دقائق): أشخاص ينتظرون في صالة مطار والشاشة تقول «متأخر». تخيّل: مَن هم، وماذا حدث، وبماذا يشعرون، وماذا سيفعلون، وكيف ستنتهي القصة، ثم تحدّث مع الممتحِن عن تجربة مشابهة.",
      useful: ["Me imagino que estas personas…", "Es posible que el vuelo se haya retrasado por…", "Se les ve cansados / preocupados.", "Supongo que la señora del fondo estará llamando a…", "Al final, seguramente…", "A mí me pasó algo parecido cuando…"]
    },
    {
      lv: "C1",
      prompt: "Lee un breve texto sobre la llamada «economía de los cuidados» (el trabajo, muchas veces no remunerado, de atender a niños, mayores y enfermos). Presenta al examinador las ideas principales del texto con tus propias palabras, da tu opinión y, después, mantén una conversación sobre el tema.",
      ar: "وساطة شفهية (المهمة 1، 3–5 دقائق) ثم مقابلة (4–6 دقائق): اقرأ نصًّا قصيرًا عن «اقتصاد الرعاية» (العمل غير المأجور غالبًا في رعاية الأطفال والمسنين والمرضى)، ثم اعرض أفكاره الرئيسة بكلماتك، وأبدِ رأيك، وتحاور مع الممتحِن.",
      useful: ["El texto plantea que…", "En términos generales, el autor sostiene que…", "Cabe destacar que…", "Desde mi punto de vista, este planteamiento…", "No obstante, echo en falta…", "Si lo trasladamos a mi país, habría que matizar que…"]
    },
    {
      lv: "C1",
      prompt: "Negociación: el examinador y tú organizáis una jornada cultural para el barrio con un presupuesto limitado. Opciones: un concierto de música andalusí, una feria gastronómica, talleres para niños o una exposición de fotografía. Defended vuestras preferencias y llegad a un acuerdo.",
      ar: "تفاوض (المهمة 3، 4–6 دقائق): أنت والممتحِن تنظّمان يومًا ثقافيًّا للحي بميزانية محدودة. الخيارات: حفل موسيقى أندلسية، معرض أطعمة، ورش للأطفال، أو معرض صور. دافِع عن اختيارك وتوصّلا إلى اتفاق.",
      useful: ["Yo me inclinaría por…, sobre todo porque…", "Entiendo tu postura, pero ¿no crees que…?", "¿Y si combinamos ambas opciones?", "Estaría dispuesto a ceder en…, siempre que…", "Con el presupuesto que tenemos, lo más sensato sería…", "Entonces, quedamos en que…"]
    },
    {
      lv: "C2",
      prompt: "Prepara una presentación a partir de varios textos breves con posturas distintas sobre el turismo masivo (beneficios económicos, encarecimiento de la vivienda, pérdida de identidad de los barrios, propuestas de regulación). Expón una síntesis coherente que relacione las fuentes y, después, responde a las preguntas del examinador.",
      ar: "عرض مُحضَّر من عدة نصوص (المهمة 1، 5–6 دقائق) ثم مقابلة (5–6 دقائق): نصوص قصيرة بمواقف مختلفة عن السياحة الجماعية (الفوائد الاقتصادية، غلاء السكن، فقدان الأحياء هويتها، مقترحات التنظيم). قدّم خلاصة مترابطة تربط بين المصادر ثم أجب عن أسئلة الممتحِن.",
      useful: ["Los textos coinciden en señalar que…", "Mientras que el primero pone el acento en…, el segundo…", "Ninguno de ellos, sin embargo, aborda…", "Todo ello apunta a un dilema de fondo:…", "Me atrevería a afirmar que…", "Valga como ejemplo el caso de…"]
    },
    {
      lv: "C2",
      prompt: "Conversación sobre titulares de prensa: el examinador te muestra varios titulares (por ejemplo, «Las bibliotecas registran récord de visitas de jóvenes», «Crece el número de personas que viven solas», «Los pueblos ofrecen casas gratis a cambio de empadronarse»). Elegid uno de mutuo acuerdo y conversad sobre él de forma espontánea.",
      ar: "محادثة حول عناوين الصحف (المهمة 3): يعرض عليك الممتحِن عدة عناوين صحفية، فتتفقان على أحدها وتتناقشان فيه بشكل تلقائي دون تحضير. (العناوين المذكورة أمثلة للتدريب.)",
      useful: ["Si le parece, podríamos comentar el titular sobre…", "Lo que me llama la atención es que…", "Habría que ver qué hay detrás de esa cifra.", "No me extraña en absoluto, dado que…", "Discrepo en parte: a mi modo de ver…", "En resumidas cuentas, se trata de…"]
    }
  ]
};
