/* رفيق الداعية — المحتوى الإضافي (الإصدار 3): 15 قالب محادثة، و10 تحذيرات، و60 فكرة دعوية، و8 سلاسل رسائل.
 * q = سورة:آية (تُجلب من QuranEnc)، h = رقم الحديث في HadeethEnc. المراجع كلها من docs/REFS.md وبالمعنى نفسه.
 * النصوص المؤلفة مستقلة وتحتاج اعتماد مراجع علمي.
 */
window.RQ = window.RQ || {};

RQ.DLG.push(
  { id: "d31", t: "زميل عمل يسأل عن رمضان", si: ["practicas", "ocasion"], st: ["contacto", "conocer"], au: ["general", "indiferente", "catolico"], goal: "شرح الصيام ببساطة وبفرح دون شكوى، ثم دعوة لطيفة إلى إفطار.", q: ["2:183", "2:185"], h: ["66512"],
    steps: [
      { w: "in", es: "Oye, ¿es verdad que este mes no comes ni bebes nada en todo el día? ¿Ni siquiera agua? ¡Yo no aguantaría!", ar: "اسمع، هل صحيح أنك لا تأكل ولا تشرب شيئًا طوال اليوم هذا الشهر؟ ولا حتى الماء؟ أنا لن أحتمل!" },
      { w: "da", es: "Jaja, es verdad: es el mes de Ramadán. Desde el alba hasta la puesta del sol no comemos ni bebemos, y al anochecer rompemos el ayuno, normalmente con dátiles y agua. Los primeros días cuestan un poco, pero el cuerpo se acostumbra.", ar: "ههه، صحيح: إنه شهر رمضان. من الفجر إلى غروب الشمس لا نأكل ولا نشرب، وعند المغرب نفطر، غالبًا على تمر وماء. الأيام الأولى صعبة قليلًا، لكن الجسم يعتاد.", note: "أجب بخفة وفرح؛ لا تتحدث عن الصيام كأنه عبء ثقيل." },
      { w: "in", es: "¿Y para qué lo hacéis? ¿Es para adelgazar o algo así?", ar: "ولماذا تفعلون ذلك؟ هل هو للتنحيف أو شيء من هذا القبيل؟" },
      { w: "da", es: "No, aunque mucha gente lo cree. Ayunamos porque Dios lo prescribió, como lo prescribió a pueblos anteriores, para que crezcamos en conciencia de Él. Aprendes a dominarte, a valorar lo que tienes y a sentir lo que vive quien pasa hambre.", ar: "لا، وإن ظن ذلك كثيرون. نصوم لأن الله كتب الصيام علينا كما كتبه على الأمم السابقة، لنزداد تقوى له. تتعلم ضبط نفسك، وتقدير ما عندك، والإحساس بمن يعاني الجوع.", note: "هذا معنى البقرة 183؛ اعرض الآية من مصدرها إن سأل عن الدليل." },
      { w: "da", es: "Además, en Ramadán comenzó la revelación del Corán, así que leemos más y procuramos ser mejores personas. ¿Te gustaría acompañarnos un día a romper el ayuno? Es un momento muy bonito.", ar: "ثم إن نزول القرآن بدأ في رمضان، فنكثر فيه من القراءة ونحاول أن نكون أفضل. هل تحب أن تشاركنا الإفطار يومًا؟ إنها لحظة جميلة جدًا.", note: "نسّق الإفطار في بيتك أو في مسجد يرحّب بالزوار، وراعِ الفصل بين الرجال والنساء." }
    ], avoid: ["لا تشتكِ من التعب والجوع أمامه فتنفّره من العبادة.", "لا تطلب من زملائك ألّا يأكلوا أمامك؛ أظهر أن الصيام بينك وبين الله.", "لا تدخل في تفاصيل فقهية كالمفطرات والكفارات."] },

  { id: "d32", t: "جار يشتكي من صوت مقطع الأذان", si: ["practicas", "familia"], st: ["contacto"], au: ["general", "indiferente", "catolico", "ateo"], goal: "الاعتذار عن الإزعاج واحترام حق الجار، ثم شرح معنى كلمات الأذان بهدوء.", q: ["4:36"], h: [],
    steps: [
      { w: "in", es: "Perdona, pero anoche se oía muy alto desde tu piso un vídeo con ese canto en árabe. Y te soy sincero: ese sonido me inquieta un poco.", ar: "عذرًا، لكن البارحة كان يُسمع من شقتك بصوت عالٍ جدًا مقطع فيه ذلك النداء بالعربية. وبصراحة: هذا الصوت يقلقني قليلًا." },
      { w: "da", es: "Tienes toda la razón y te pido disculpas. Era la llamada a la oración en una aplicación del móvil y no me di cuenta del volumen. A partir de hoy la pondré baja o con auriculares.", ar: "معك حق تمامًا، وأعتذر إليك. كان الأذان في تطبيق على الهاتف ولم أنتبه لارتفاع الصوت. من اليوم سأخفضه أو أستعمل السماعات.", note: "اعتذر فورًا دون تبرير؛ حق الجار عظيم في الإسلام، والوفاء بوعدك أبلغ من أي كلام." },
      { w: "in", es: "Gracias. Pero ¿qué dice exactamente? Suena muy serio.", ar: "شكرًا. لكن ماذا يقول بالضبط؟ يبدو جادًّا جدًا." },
      { w: "da", es: "Es la llamada a la oración, el adhán. Dice, más o menos: Dios es el más grande; doy testimonio de que no hay más dios que Allah y de que Muhammad es Su mensajero; venid a la oración, venid al éxito. Es una invitación a dejar un momento lo que haces para recordar a Dios.", ar: "إنه النداء إلى الصلاة، الأذان. يقول تقريبًا: الله أكبر، أشهد أن لا إله إلا الله وأن محمدًا رسول الله، حيّ على الصلاة، حيّ على الفلاح. إنه دعوة إلى أن تترك ما بيدك لحظة لتذكر الله.", note: "هذه معاني جمل الأذان باختصار؛ لا تصفه بالغناء ولا بالأغنية." },
      { w: "da", es: "Para nosotros es un sonido de paz, pero entiendo que, si no lo conoces, pueda chocar. Si algún día quieres, te enseño la mezquita del barrio. Y si algo de mi casa te molesta, dímelo con total confianza.", ar: "هو عندنا صوت سكينة، لكني أفهم أنه قد يكون غريبًا على من لا يعرفه. إن أحببت يومًا أريتك مسجد الحي. وإن أزعجك شيء من بيتي فأخبرني بكل ثقة.", note: "اختم بباب مفتوح؛ فالقرآن أوصى بالجار القريب والبعيد (النساء 36)." }
    ], avoid: ["لا تجادله في حقه في الهدوء ولا تتهمه بكراهية الإسلام.", "لا تشغّل الأذان أو التلاوة بصوت يؤذي الجيران.", "لا تحوّل الحديث إلى نقاش عن قوانين البلد أو حقوق الأقليات."] },

  { id: "d33", t: "ملحد: «التطور يفسّر كل شيء»", si: ["ciencia", "dios"], st: ["dudas"], au: ["ateo", "indiferente"], goal: "الفصل بين سؤال «كيف» العلمي وسؤال «مَن» و«لماذا»، دون جدل تخصصي، مع وضوح عقيدة خلق آدم عليه السلام.", q: ["52:35", "3:190"], h: [],
    steps: [
      { w: "in", es: "La evolución ya explica cómo aparecimos. No hace falta ningún Dios para eso.", ar: "التطور يفسّر بالفعل كيف ظهرنا. لا حاجة إلى إله لذلك." },
      { w: "da", es: "Es un tema interesante. Antes de responder, ¿qué crees que demuestra exactamente: cómo cambian los seres vivos, o que nadie los creó?", ar: "موضوع مثير للاهتمام. قبل أن أجيب: ماذا تظن أنه يثبت بالضبط: كيف تتغير الكائنات الحية، أم أن أحدًا لم يخلقها؟", note: "اسأله ليحدد دعواه؛ كثيرًا ما يُخلط بين وصف التغير ونفي الخالق." },
      { w: "in", es: "Pues que todo surgió por procesos naturales, sin ningún diseñador.", ar: "أن كل شيء نشأ بعمليات طبيعية، دون أي مصمّم." },
      { w: "da", es: "La ciencia describe cómo funcionan las cosas, y eso es valioso; de hecho, el Corán anima a observar la creación. Pero describir un proceso no responde a la pregunta de fondo: ¿de dónde salieron las leyes, la materia y la vida misma? Un proceso, por ordenado que sea, no se explica a sí mismo.", ar: "العلم يصف كيف تعمل الأشياء، وهذا قيّم؛ بل إن القرآن يحث على النظر في الخلق. لكن وصف العملية لا يجيب عن السؤال الأعمق: من أين جاءت القوانين والمادة والحياة نفسها؟ والعملية مهما كانت منتظمة لا تفسّر نفسها.", note: "هذا معنى سؤال الخلق في الطور 35؛ ولا تحتج بنظريات علمية متغيرة." },
      { w: "in", es: "¿Entonces rechazas la ciencia?", ar: "إذن أنت ترفض العلم؟" },
      { w: "da", es: "En absoluto. Pero te digo con sinceridad cuál es mi fe: los musulmanes creemos que Dios creó directamente a Adán, padre de la humanidad, y lo honró. Sobre los detalles de biología no soy especialista, así que no voy a improvisar. Si quieres, te paso un material serio para que lo leas con calma.", ar: "أبدًا. لكني أخبرك بصدق بما أؤمن به: نؤمن نحن المسلمين أن الله خلق آدم أبا البشر خلقًا مباشرًا وكرّمه. أما تفاصيل علم الأحياء فلست متخصصًا فيها، ولن أرتجل. إن أحببت أرسلت لك مادة جادة تقرؤها بهدوء.", note: "صرّح بعقيدة خلق آدم دون حرج، ولا تتصنّع علمًا لا تملكه؛ أحِله إلى كتاب من IslamHouse أو إلى مختص." }
    ], avoid: ["لا تخض في تفاصيل علم الأحياء والحفريات إن لم تكن متخصصًا.", "لا تسخر من العلم أو العلماء، ولا تربط الآيات بنظريات متغيرة.", "لا تتنازل عن عقيدة خلق آدم عليه السلام لإرضاء محاورك."] },

  { id: "d34", t: "صديق كاثوليكي يدعوك إلى عشاء عيد الميلاد", si: ["religiones", "ocasion"], st: ["contacto", "conocer"], au: ["catolico"], goal: "شكره على مودته، والاعتذار بلطف ووضوح عن المشاركة في الاحتفال الديني، مع اقتراح لقاء بديل يحفظ الصداقة.", q: ["60:8", "109:6"], h: [],
    steps: [
      { w: "in", es: "¡Este año quiero que vengas a nuestra cena de Nochebuena con mi familia! Eres como de la casa.", ar: "هذا العام أريدك أن تأتي إلى عشاء ليلة الميلاد مع عائلتي! أنت كواحد من أهل البيت." },
      { w: "da", es: "¡Qué detalle tan bonito! De verdad, me alegra mucho que me consideres parte de tu familia. Gracias por pensar en mí.", ar: "يا لها من لفتة جميلة! حقًا يسعدني كثيرًا أنك تعدّني من عائلتك. شكرًا لأنك فكرت فيّ.", note: "ابدأ بالشكر الصادق؛ فقد أكرمك بدعوته." },
      { w: "da", es: "Te voy a ser sincero, porque eres mi amigo: la Navidad es una fiesta religiosa que celebra a Jesús como Hijo de Dios, una creencia que los musulmanes no compartimos, aunque lo amamos como un gran profeta. Por eso no participo en sus celebraciones, igual que no te pediría a ti que celebraras las nuestras.", ar: "سأكون صريحًا معك لأنك صديقي: عيد الميلاد عيد ديني يحتفل بعيسى على أنه ابن الله، وهي عقيدة لا يشاركها المسلمون، مع أننا نحبه نبيًّا عظيمًا. لذلك لا أشارك في احتفالاته، كما أني لا أطلب منك أن تحتفل بأعيادنا.", note: "اعتذر بوضوح وأدب، دون أن تقول «حرام» بجفاف، ودون الطعن في دينه." },
      { w: "in", es: "Vaya, no lo sabía. ¿Entonces te molesta que nosotros lo celebremos?", ar: "آه، لم أكن أعلم. إذن هل يزعجك أن نحتفل نحن به؟" },
      { w: "da", es: "Para nada; cada uno es libre de vivir su fe. Lo que me encantaría es otra cosa: ¿por qué no venís un día de enero a cenar a mi casa? Así conozco mejor a tu familia y os cuento cómo celebramos nosotros nuestras fiestas.", ar: "أبدًا؛ لكل واحد حريته في أن يعيش دينه. لكن ما أحبه شيء آخر: لماذا لا تأتون يومًا في يناير للعشاء في بيتي؟ فأتعرف إلى عائلتك أكثر، وأحدثكم كيف نحتفل نحن بأعيادنا.", note: "اقترح بديلًا قريبًا في يوم عادي؛ فالإسلام يأمر بالبر والقسط مع المسالمين (الممتحنة 8)." },
      { w: "in", es: "¡Hecho! Me parece una idea genial.", ar: "اتفقنا! فكرة رائعة." }
    ], avoid: ["لا تقبل الدعوة مجاملةً على حساب العقيدة، ولا تهنّئ بالعيد الديني.", "لا تحاضره عن أصول عيد الميلاد التاريخية ولا تسخر منه.", "لا تقطع صداقته بسبب الدعوة؛ ابقَ بارًّا به في سائر الأيام."] },

  { id: "d35", t: "صديق يرسل فيديو إخباريًا ضد الإسلام", si: ["violencia", "curioso"], st: ["contacto", "dudas"], au: ["general", "indiferente", "catolico", "ateo"], goal: "تهدئة الموقف، والتفريق بين الخبر وتعاليم الإسلام، وتعليم التثبت من المصدر دون دخول في السياسة.", q: ["49:6", "5:32"], h: ["2962"],
    steps: [
      { w: "in", es: "Mira este vídeo de las noticias. ¿Esto es lo que enseña el islam? Da miedo.", ar: "انظر إلى هذا المقطع الإخباري. أهذا ما يعلّمه الإسلام؟ إنه مخيف." },
      { w: "da", es: "Gracias por preguntarme directamente en lugar de quedarte con la duda; lo valoro mucho. Déjame verlo con calma y te digo.", ar: "شكرًا لأنك سألتني مباشرة بدل أن تبقى في حيرتك؛ أقدّر ذلك كثيرًا. دعني أشاهده بهدوء وأرد عليك.", note: "اشكره؛ فإرساله إليك فرصة لا هجوم. شاهد المقطع كاملًا قبل الرد." },
      { w: "da", es: "Ya lo he visto. Lo que hace esa gente es terrible y no tiene justificación. Pero el islam enseña justo lo contrario: el Corán dice que matar a un inocente es como matar a toda la humanidad. Los actos de unos pocos no representan a los millones de musulmanes que viven en paz.", ar: "شاهدته. ما يفعله هؤلاء فظيع ولا مبرر له. لكن الإسلام يعلّم عكسه تمامًا: يقرر القرآن أن قتل نفس بريئة كقتل الناس جميعًا. وأفعال قلة لا تمثّل ملايين المسلمين الذين يعيشون في سلام.", note: "لا تبرّر الجريمة ولا تنكر وقوعها؛ أدنها بوضوح ثم بيّن موقف الإسلام (المائدة 32)." },
      { w: "in", es: "Pero en el vídeo dicen que lo hacen en nombre del islam.", ar: "لكنهم في المقطع يقولون إنهم يفعلون ذلك باسم الإسلام." },
      { w: "da", es: "Cualquiera puede usar un nombre para justificar lo que hace; ha pasado en muchas épocas y lugares. La pregunta justa es qué dicen el Corán y el Profeta. Y otra cosa: el Corán nos pide comprobar las noticias antes de difundirlas. ¿Sabes de qué medio es el vídeo y de cuándo?", ar: "يستطيع أي أحد أن يستعمل اسمًا ليبرّر ما يفعل؛ وقد حدث هذا في عصور وأماكن كثيرة. والسؤال المنصف: ماذا يقول القرآن والنبي ﷺ؟ وأمر آخر: القرآن يأمرنا بالتثبت من الأخبار قبل نشرها. هل تعرف من أي وسيلة إعلام هذا المقطع ومتى نُشر؟", note: "علّمه منهج التثبت (الحجرات 6)، ولا تدخل في تحليل سياسي للحدث أو للدول." },
      { w: "da", es: "Si te interesa, te paso un texto breve sobre lo que el islam dice de la violencia, y lo comentamos cuando quieras.", ar: "إن كان يهمك، أرسل لك نصًا قصيرًا عمّا يقوله الإسلام عن العنف، ونتحدث عنه متى شئت.", note: "أرسل مقالة «ماذا يقول الإسلام عن العنف؟» من قسم المقالات." }
    ], avoid: ["لا تغضب ولا تتهمه بالعداء للإسلام.", "لا تبرّر الجريمة ولا تتبنَّ نظريات المؤامرة.", "لا تدخل في السياسة والصراعات بين الدول."] },

  { id: "d36", t: "مسلم جديد: أول صلاة جمعة", si: ["primeros", "practicas"], st: ["nuevo"], au: ["nuevo"], goal: "طمأنة المسلم الجديد، وتعريفه بخطوات الجمعة الأساسية، ومرافقته إليها.", q: ["62:9"], h: ["5795"],
    steps: [
      { w: "in", es: "Este viernes quiero ir a la mezquita por primera vez para la oración del viernes, pero estoy nervioso. No sé qué hacer ni dónde ponerme.", ar: "هذه الجمعة أريد أن أذهب إلى المسجد أول مرة لصلاة الجمعة، لكني متوتر. لا أعرف ماذا أفعل ولا أين أقف." },
      { w: "da", es: "¡Qué alegría, hermano! Es normal estar nervioso; a todos nos ha pasado. Si quieres, paso a recogerte y vamos juntos, así no estarás solo.", ar: "يا لها من فرحة يا أخي! التوتر طبيعي؛ مرّ به كلنا. إن أحببت مررت بك وذهبنا معًا، فلا تكون وحدك.", note: "المرافقة أهم من الشرح؛ لا تتركه يذهب وحده أول مرة." },
      { w: "in", es: "Sí, por favor. ¿Tengo que preparar algo?", ar: "نعم، من فضلك. هل عليّ أن أستعد بشيء؟" },
      { w: "da", es: "Es recomendable darse un baño completo antes, ponerse ropa limpia y algo de perfume, y llegar temprano. Al llegar, si hay tiempo, rezas dos rak'as y te sientas tranquilo.", ar: "يُستحب أن تغتسل قبلها، وتلبس ثيابًا نظيفة، وتتطيب، وتبكّر. وعند وصولك تصلي ركعتين إن اتسع الوقت، ثم تجلس بهدوء.", note: "اذكر الأساسيات فقط: الغسل والطيب والتبكير؛ ولا تُثقل عليه بكل السنن." },
      { w: "da", es: "Después, el imam da un sermón, la jutba, y lo escuchamos en silencio, sin hablar ni mirar el móvil. Luego rezamos dos rak'as en grupo detrás del imam. Tú haz lo mismo que la persona de al lado; nadie te va a juzgar.", ar: "ثم يخطب الإمام الخطبة، فنستمع إليها صامتين دون كلام ولا نظر في الهاتف. ثم نصلي ركعتين جماعة خلف الإمام. افعل مثل من بجانبك؛ ولن يحاسبك أحد.", note: "إن كانت الخطبة بالعربية فطمئنه، وترجم له خلاصتها بعد الصلاة." },
      { w: "in", es: "Me tranquiliza mucho. ¡Gracias, de verdad!", ar: "هذا يطمئنني كثيرًا. شكرًا حقًا!" }
    ], avoid: ["لا تحرجه أمام الناس إن أخطأ في حركة.", "لا تطلب منه أن يتكلم أمام الجمع أو يعلن إسلامه إن كان خجولًا.", "لا تُدخله في خلافات المساجد والجماعات."] },

  { id: "d37", t: "طالب يكتب بحثًا مدرسيًا عن الإسلام", si: ["curioso"], st: ["conocer"], au: ["general", "indiferente"], goal: "مساعدة الطالب بمعلومات صحيحة ومصادر يمكن الاستشهاد بها، مع مراعاة سنّه وإشراك أهله أو معلمه.", q: ["4:136"], h: ["66512"],
    steps: [
      { w: "in", es: "Hola, estoy haciendo un trabajo para clase sobre el islam. ¿Me puedes responder unas preguntas?", ar: "مرحبًا، أُعدّ بحثًا مدرسيًا عن الإسلام. هل تجيبني عن بعض الأسئلة؟" },
      { w: "da", es: "¡Claro, con mucho gusto! ¿Para qué asignatura es y qué te ha pedido exactamente tu profesor? Si eres menor de edad, prefiero que tus padres o tu profesor estén al tanto; podemos hablar con ellos presentes o por el canal del colegio.", ar: "بالتأكيد، بكل سرور! لأي مادة هو؟ وماذا طلب منك معلمك بالضبط؟ وإن كنت دون السن القانونية فأفضّل أن يكون والداك أو معلمك على علم؛ يمكننا أن نتحدث بحضورهم أو عبر قناة المدرسة.", note: "اعرف عمره؛ إن كان قاصرًا فلا تحادثه في الخاص دون علم أهله أو معلمه (التحذير w33)." },
      { w: "in", es: "Es para la asignatura de Religiones. Tengo que explicar en qué creen los musulmanes y qué prácticas tienen.", ar: "هو لمادة الأديان. عليّ أن أشرح بماذا يؤمن المسلمون وما عباداتهم." },
      { w: "da", es: "Perfecto. Te lo resumo en dos partes. Creencias: creemos en un solo Dios, en Sus ángeles, Sus libros, Sus mensajeros —como Abraham, Moisés, Jesús y Muhammad—, en el Último Día y en el decreto divino. Prácticas: los cinco pilares, que son el testimonio de fe, la oración, el azaque, el ayuno de Ramadán y la peregrinación a La Meca.", ar: "ممتاز. ألخّصه لك في قسمين. العقائد: نؤمن بالله الواحد، وملائكته، وكتبه، ورسله كإبراهيم وموسى وعيسى ومحمد، واليوم الآخر، والقدر. والعبادات: أركان الإسلام الخمسة، وهي الشهادتان، والصلاة، والزكاة، وصوم رمضان، وحج البيت في مكة.", note: "أركان الإيمان الستة وأركان الإسلام الخمسة أساس أي بحث؛ اعرضها كما هي دون اجتهاد." },
      { w: "da", es: "Para citar fuentes fiables, te recomiendo una traducción reconocida del sentido del Corán, como la de QuranEnc, y libros de IslamHouse en español; los profesores valoran mucho que cites bien. ¿Quieres que te pase dos enlaces?", ar: "ولتستشهد بمصادر موثوقة، أنصحك بترجمة معتمدة لمعاني القرآن مثل ما في QuranEnc، وبكتب IslamHouse بالإسبانية؛ فالمعلمون يقدّرون التوثيق الجيد. هل أرسل لك رابطين؟", note: "أعطه مصادر يستشهد بها، ولا تكتب البحث عنه." },
      { w: "in", es: "¡Sí, gracias! Me ayudas mucho.", ar: "نعم، شكرًا! أنت تساعدني كثيرًا." }
    ], avoid: ["لا تتواصل مع قاصر في محادثة خاصة دون علم أهله أو معلمه.", "لا تحوّل المساعدة إلى موعظة طويلة؛ أجب عن سؤاله ودع الباب مفتوحًا.", "لا تقدّم آراءك الشخصية على أنها الإسلام."] },

  { id: "d38", t: "زيارة زميل مريض في المستشفى", si: ["enfermedad"], st: ["contacto"], au: ["general", "catolico", "indiferente"], goal: "مواساة المريض والدعاء له بإذنه وإظهار الرحمة، وترك الحديث الديني لما يفتحه هو.", q: ["2:186", "39:10", "94:5-6"], h: ["3553"],
    steps: [
      { w: "in", es: "Gracias por venir. Llevo una semana aquí y ya estoy cansado de todo.", ar: "شكرًا لمجيئك. لي أسبوع هنا وقد تعبت من كل شيء." },
      { w: "da", es: "Me alegro mucho de verte, aunque sea aquí. No vengo a cansarte; solo quería acompañarte un rato. ¿Cómo te encuentras hoy?", ar: "سعيد جدًا برؤيتك ولو هنا. لم آتِ لأتعبك؛ أردت فقط أن أؤنسك قليلًا. كيف حالك اليوم؟", note: "زيارة قصيرة وصوت هادئ، والتزم بتعليمات المستشفى." },
      { w: "in", es: "Con dolor y con miedo. Los médicos todavía no saben bien qué tengo.", ar: "أتألم وأخاف. الأطباء لم يعرفوا بعدُ ما بي على وجه الدقة." },
      { w: "da", es: "Es normal tener miedo cuando no hay respuestas. Si me lo permites, voy a pedirle a Dios por ti: que te cure, te alivie el dolor y te dé tranquilidad.", ar: "الخوف طبيعي حين لا توجد إجابات. إن أذنت لي فسأدعو الله لك: أن يشفيك، ويخفف ألمك، ويرزقك الطمأنينة.", note: "استأذنه قبل الدعاء، وادعُ له بالشفاء بلغته وبصوت لطيف." },
      { w: "in", es: "Sí, gracias. Hace mucho que no rezo, pero se agradece.", ar: "نعم، شكرًا. لم أصلِّ منذ زمن طويل، لكنني أقدّر ذلك." },
      { w: "da", es: "Dios está cerca de quien lo llama, incluso desde una cama de hospital. En el islam aprendemos que la paciencia en la enfermedad no se pierde y que tras la dificultad llega la facilidad. ¿Quieres que te traiga algo o que avise a alguien?", ar: "الله قريب ممن يدعوه، ولو من سرير في المستشفى. نتعلم في الإسلام أن الصبر على المرض لا يضيع، وأن بعد العسر يسرًا. هل تريد أن أحضر لك شيئًا أو أن أخبر أحدًا؟", note: "كلمة قصيرة عن الصبر ثم عرض مساعدة عملية؛ ولا تُطِل الحديث الديني إلا إن طلبه." }
    ], avoid: ["لا تقل إن مرضه عقوبة على ذنوبه.", "لا تعده بالشفاء ولا تقترح علاجات غير طبية.", "لا تُطِل الزيارة ولا تستغل ضعفه للضغط عليه."] },

  { id: "d39", t: "صديق إنجيلي: «اقبل يسوع مخلّصًا»", si: ["jesus", "trinidad", "perdon"], st: ["dudas"], au: ["protestante"], goal: "تقدير حرصه، وعرض التوحيد ورحمة الله المباشرة دون جدال في النصوص.", q: ["19:30", "3:135", "3:64"], h: [],
    steps: [
      { w: "in", es: "Te lo digo porque te aprecio: Jesús murió por tus pecados. Si lo aceptas como tu Señor y Salvador, serás salvo.", ar: "أقول لك هذا لأني أحبك: يسوع مات من أجل خطاياك. إن قبلته ربًّا ومخلّصًا فستخلص." },
      { w: "da", es: "Gracias, de verdad. Veo que me lo dices con cariño y porque te importa mi destino; eso dice mucho de ti. ¿Puedo contarte cómo vemos los musulmanes a Jesús?", ar: "شكرًا حقًا. أرى أنك تقول هذا بمحبة ولأن مصيري يهمك؛ وهذا يدل على طيبك. هل أحدثك كيف يرى المسلمون عيسى؟", note: "قدّر حرصه؛ فهو يدعوك بنية حسنة، والاحترام يفتح قلبه للسماع." },
      { w: "in", es: "Claro, dime.", ar: "بالتأكيد، تفضل." },
      { w: "da", es: "Amamos a Jesús (la paz sea con él): es el Mesías, nacido milagrosamente de la Virgen María, y uno de los más grandes profetas. En el Corán, lo primero que dijo siendo un bebé fue que era siervo de Dios. Nosotros lo seguimos en eso: adoramos solo al Dios al que él adoraba.", ar: "نحن نحب عيسى عليه السلام: هو المسيح، وُلد بمعجزة من مريم العذراء، ومن أعظم الأنبياء. وفي القرآن أول ما قاله وهو رضيع أنه عبد الله. ونحن نتبعه في هذا: نعبد وحده الإلهَ الذي كان يعبده.", note: "اعرض آية مريم 30؛ وابدأ بالمشترك قبل نقطة الخلاف." },
      { w: "da", es: "Y sobre el perdón: el islam enseña que Dios perdona directamente a quien se arrepiente con sinceridad, sin necesidad de sacrificios ni intermediarios, y que nadie carga con el pecado de otro. ¿No te parece que eso también muestra Su misericordia?", ar: "وأما المغفرة: فيعلّم الإسلام أن الله يغفر مباشرة لمن تاب صادقًا، دون حاجة إلى قربان أو وسيط، وأن أحدًا لا يحمل ذنب غيره. ألا ترى أن هذا أيضًا من رحمته؟", note: "اعرض رحمة الله المباشرة (آل عمران 135)، ولا تدخل في جدل تفصيلي حول الصلب في هذا اللقاء." },
      { w: "in", es: "Es interesante. Nunca lo había visto así.", ar: "مثير للاهتمام. لم أنظر إلى الأمر هكذا من قبل." },
      { w: "da", es: "Te propongo algo: tú me cuentas lo que más valoras de tu fe y yo de la mía, y buscamos juntos la verdad con sinceridad. El Corán invita precisamente a eso: a encontrarnos en una palabra común, adorar solo a Dios.", ar: "أقترح عليك شيئًا: تحدثني عمّا تقدّره في دينك وأحدثك عمّا أقدّره في ديني، ونبحث معًا عن الحق بصدق. وإلى هذا يدعو القرآن: أن نلتقي على كلمة سواء، أن نعبد الله وحده.", note: "«كلمة سواء» (آل عمران 64) مدخل لطيف للحوار مع أهل الكتاب." }
    ], avoid: ["لا تسخر من عقيدة الفداء ولا من حماسته.", "لا تقبل حضور طقوس أو صلوات كنسية مجاملةً.", "لا تحوّل اللقاء إلى مناظرة في نصوص الكتاب المقدس."] },

  { id: "d40", t: "«هل سأدخل النار لأني لست مسلمًا؟»", si: ["akhira", "religiones"], st: ["dudas", "cerca"], au: ["general", "catolico", "buscador", "indiferente"], goal: "بيان عدل الله ورحمته دون حكم على شخص بعينه، مع الصدق في أن الإسلام طريق النجاة، وتوجيهه إلى ما يملكه الآن.", q: ["4:40", "17:15", "39:53"], h: [],
    steps: [
      { w: "in", es: "Una pregunta directa: según el islam, ¿yo voy a ir al infierno por no ser musulmán?", ar: "سؤال مباشر: بحسب الإسلام، هل سأدخل النار لأني لست مسلمًا؟" },
      { w: "da", es: "Gracias por preguntarlo con tanta franqueza. Es una pregunta seria y merece una respuesta seria, no una frase hecha.", ar: "شكرًا لأنك سألت بهذه الصراحة. إنه سؤال جاد يستحق جوابًا جادًّا لا عبارة جاهزة.", note: "لا تتعجل الجواب، ولا تجب بجفاف." },
      { w: "da", es: "Lo primero: el destino de cada persona solo lo conoce Dios, y yo no juzgo a nadie. Lo que el islam enseña es que Dios es perfectamente justo: no oprime a nadie ni en el peso de un átomo, y no castiga a un pueblo sin haberle enviado antes un mensajero.", ar: "أولًا: مصير كل إنسان لا يعلمه إلا الله، وأنا لا أحكم على أحد. والذي يعلّمه الإسلام أن الله عدل تام: لا يظلم أحدًا مثقال ذرة، ولا يعذّب قومًا حتى يبعث إليهم رسولًا.", note: "هذا معنى النساء 40 والإسراء 15؛ والحكم على المعيّن ليس من شأنك (التحذير w03)." },
      { w: "in", es: "¿Y entonces qué pasa conmigo?", ar: "إذن ما شأني أنا؟" },
      { w: "da", es: "Te respondo con sinceridad: el islam enseña que el camino de la salvación es creer en el Dios Único y seguir el mensaje de Sus profetas, el último de ellos Muhammad ﷺ. Ahora tú conoces ese mensaje, y lo importante es qué haces con él: buscar la verdad con el corazón abierto. Y la puerta de Dios siempre está abierta: Él, en Su misericordia, perdona todos los pecados de quien vuelve a Él.", ar: "أجيبك بصدق: يعلّم الإسلام أن طريق النجاة هو الإيمان بالله الواحد واتباع رسالة أنبيائه، وآخرهم محمد ﷺ. وأنت الآن تعرف هذه الرسالة، والمهم ماذا ستفعل بها: أن تبحث عن الحق بقلب مفتوح. وباب الله مفتوح دائمًا: فهو برحمته يغفر الذنوب جميعًا لمن رجع إليه.", note: "كن صادقًا في أن الإسلام طريق النجاة دون تهديد، ثم افتح باب الرجاء (الزمر 53)." },
      { w: "in", es: "Lo pensaré. Al menos eres honesto.", ar: "سأفكر في الأمر. على الأقل أنت صادق." }
    ], avoid: ["لا تقل له «أنت في النار»، ولا تحكم على أقاربه المتوفين.", "لا تقل مجاملةً إن كل الأديان تُنجي؛ فهذا خلاف العقيدة.", "لا تستعمل التخويف أسلوبًا للضغط عليه."] },

  { id: "d41", t: "«لماذا أصدّق أن محمدًا نبي؟»", si: ["profeta", "coran"], st: ["dudas"], au: ["general", "catolico", "protestante", "buscador"], goal: "عرض دلائل نبوته ﷺ بهدوء: سيرته وصدقه، والقرآن الذي جاء به، واتصال رسالته برسالة الأنبياء.", q: ["29:48", "68:4", "61:6"], h: ["5803"],
    steps: [
      { w: "in", es: "Respeto a Muhammad como personaje histórico, pero ¿por qué debería creer que era un profeta?", ar: "أحترم محمدًا شخصيةً تاريخية، لكن لماذا ينبغي أن أصدّق أنه كان نبيًّا؟" },
      { w: "da", es: "Buena pregunta; no hay que creerlo sin pensar. Te propongo mirar tres cosas y que tú mismo juzgues: su carácter, el libro que trajo y su mensaje.", ar: "سؤال جيد؛ لا ينبغي أن تصدّق دون تفكير. أقترح أن ننظر في ثلاثة أمور وتحكم بنفسك: أخلاقه، والكتاب الذي جاء به، ورسالته.", note: "قسّم الجواب إلى نقاط واضحة قصيرة." },
      { w: "da", es: "Su carácter: antes de la revelación, su pueblo lo llamaba «el confiable», y hasta quienes lo combatían le dejaban sus bienes en depósito. Una persona así no empieza a mentir sobre Dios a los cuarenta años, sabiendo que eso le traería persecución y no riquezas.", ar: "أخلاقه: قبل الوحي كان قومه يلقبونه «الأمين»، وحتى من حاربوه كانوا يودعون عنده أماناتهم. ومثل هذا لا يبدأ الكذب على الله في الأربعين، وهو يعلم أن ذلك سيجلب له الاضطهاد لا الثروة.", note: "لقب «الأمين» وإيداع قريش أماناتها عنده ثابت في السيرة؛ لا تزد تفاصيل لم تتحقق منها." },
      { w: "in", es: "Vale, era buena persona. ¿Y el libro?", ar: "حسنًا، كان رجلًا طيبًا. وماذا عن الكتاب؟" },
      { w: "da", es: "No sabía leer ni escribir, y aun así trajo el Corán, un texto que los árabes más elocuentes no pudieron imitar y que se ha conservado intacto. Además, su mensaje es el mismo de Abraham, Moisés y Jesús: adorar solo a Dios. El Corán menciona incluso que Jesús anunció a un mensajero que vendría después de él.", ar: "كان لا يقرأ ولا يكتب، ومع ذلك جاء بالقرآن، نصٍّ عجز أفصح العرب عن معارضته، وحُفظ كما هو. ورسالته هي رسالة إبراهيم وموسى وعيسى: عبادة الله وحده. بل يذكر القرآن أن عيسى بشّر برسول يأتي من بعده.", note: "اعرض العنكبوت 48 والصف 6؛ ولا تهاجم الأنبياء الآخرين لتثبت نبوته." },
      { w: "da", es: "¿Qué te parecería leer una biografía breve suya y luego comentarla juntos? Te paso una de IslamHouse en español.", ar: "ما رأيك أن تقرأ سيرة مختصرة له ثم نتناقش فيها معًا؟ أرسل لك واحدة من IslamHouse بالإسبانية.", note: "اختر سيرة مختصرة من «دليل الكتب»، واتفق معه على موعد للنقاش." }
    ], avoid: ["لا تعتمد على قصص ومعجزات غير ثابتة.", "لا تنتقص من الأنبياء الآخرين لتثبت نبوته ﷺ.", "لا تضغط عليه ليقرّ فورًا."] },

  { id: "d42", t: "«أي ترجمة للقرآن أقرأ؟»", si: ["coran", "curioso"], st: ["conocer"], au: ["general", "buscador", "catolico", "indiferente"], goal: "توجيهه إلى ترجمة معتمدة لمعاني القرآن وبداية مناسبة للقراءة، وتعريفه بقارئ القرآن في الموقع.", q: ["38:29", "54:17"], h: [],
    steps: [
      { w: "in", es: "Quiero leer el Corán, pero en internet hay muchas traducciones. ¿Cuál me recomiendas?", ar: "أريد أن أقرأ القرآن، لكن في الإنترنت ترجمات كثيرة. أيّها تنصحني؟" },
      { w: "da", es: "¡Qué buena noticia! Antes de nada, una aclaración: el Corán es el texto árabe, y cualquier traducción es una aproximación a su significado. Por eso conviene elegir una hecha por musulmanes con conocimiento.", ar: "يا له من خبر جميل! قبل كل شيء توضيح: القرآن هو النص العربي، وكل ترجمة تقريب لمعانيه. لذلك ينبغي اختيار ترجمة أعدّها مسلمون أهل علم.", note: "بيّن أن الترجمة ترجمة للمعاني لا القرآن نفسه." },
      { w: "da", es: "Te recomiendo la traducción de Muhammad Isa García, que puedes leer gratis en QuranEnc. Te paso un enlace donde ves el árabe y la traducción, y puedes escuchar la recitación versículo a versículo.", ar: "أنصحك بترجمة محمد عيسى غارسيا، وتقرؤها مجانًا في QuranEnc. أرسل لك رابطًا ترى فيه النص العربي والترجمة، وتستمع إلى التلاوة آيةً آية.", note: "أرسل له رابط السورة من «قارئ القرآن» في الموقع، وتجنّب الترجمات غير المعتمدة (التحذير w13)." },
      { w: "in", es: "¿Y empiezo por el principio?", ar: "وهل أبدأ من البداية؟" },
      { w: "da", es: "Puedes, pero muchos prefieren empezar por suras cortas, como Al-Fátiha (1) y Al-Ijlás (112), o por la sura de María (19), que habla de Jesús y de su madre. Lee poco y con calma, y apunta tus preguntas; me encantará comentarlas contigo.", ar: "يمكنك، لكن كثيرين يفضّلون البدء بسور قصيرة مثل الفاتحة (1) والإخلاص (112)، أو بسورة مريم (19) التي تتحدث عن عيسى وأمه. اقرأ قليلًا وبهدوء، ودوّن أسئلتك؛ ويسعدني أن نتحدث فيها.", note: "اقترح بداية تناسب خلفيته: سورة مريم للمسيحي، وقصار السور للباحث." },
      { w: "in", es: "Me parece un buen plan. ¡Gracias!", ar: "تبدو خطة جيدة. شكرًا!" }
    ], avoid: ["لا ترسل له ترجمات من مواقع مجهولة.", "لا تُغرقه بقوائم طويلة من الكتب والروابط.", "لا تقل إن فهم القرآن مستحيل دون العربية؛ بل شجّعه."] },

  { id: "d43", t: "تعليق مسيء على منشورك الدعوي", si: ["violencia", "curioso"], st: ["contacto", "dudas"], au: ["general", "indiferente", "ateo"], goal: "الرد بحلم مرة واحدة يخاطب القرّاء لا المسيء، وعدم الانجرار إلى معركة تعليقات.", q: ["25:63", "41:34"], h: ["5351"],
    steps: [
      { w: "in", es: "(Comentario público) Menuda religión de odio. Llévate tus cuentos a otra parte.", ar: "(تعليق علني) يا له من دين كراهية. خذ حكاياتك إلى مكان آخر." },
      { w: "da", es: "Siento que tengas esa imagen del islam. Si algún día quieres conocerlo de primera mano, aquí tienes un texto breve y respetuoso. Te deseo un buen día.", ar: "يؤسفني أن هذه صورتك عن الإسلام. إن أردت يومًا أن تعرفه من مصدره، فهذا نص قصير محترم. أتمنى لك يومًا طيبًا.", note: "رد واحد هادئ يكتب للقرّاء الصامتين أكثر من المسيء (فصلت 34)." },
      { w: "in", es: "No me interesa nada que venga de vosotros. Sois todos iguales.", ar: "لا يهمني شيء يأتي منكم. كلكم سواء." },
      { w: "da", es: "Lo respeto. Te deseo lo mejor.", ar: "أحترم ذلك. أتمنى لك الخير.", note: "توقف هنا: «وإذا خاطبهم الجاهلون قالوا سلامًا» (الفرقان 63). لا ترد على الشتائم." },
      { w: "in", es: "(Otro usuario, en privado) Hola, vi tu respuesta en los comentarios y me sorprendió tu calma. ¿De verdad el islam no es lo que dice ese chico?", ar: "(مستخدم آخر في الخاص) مرحبًا، رأيت ردك في التعليقات وأدهشني هدوؤك. هل الإسلام حقًا ليس كما يقول ذلك الشاب؟" },
      { w: "da", es: "¡Gracias por escribir! Entiendo que haya mucha confusión. Encantado de responder a tus preguntas con calma. ¿Qué es lo que más te gustaría saber?", ar: "شكرًا لأنك كتبت! أفهم أن هناك لبسًا كثيرًا. يسعدني أن أجيب عن أسئلتك بهدوء. ما أكثر ما تحب أن تعرفه؟", note: "الحلم في العلن يفتح أبوابًا في الخاص؛ وإن كان المتواصل من الجنس الآخر فأحِله إلى داعية من جنسه (التحذير w11)." }
    ], avoid: ["لا تدخل في سلسلة ردود وشتائم متبادلة.", "لا تنشر لقطات المسيء للتشهير به أو السخرية منه.", "لا تكتب وأنت غاضب؛ انتظر حتى تهدأ."] },

  { id: "d44", t: "«أشعر بالقلق ولا أجد سلامًا داخليًا»", si: ["felicidad", "proposito"], st: ["contacto", "conocer"], au: ["general", "indiferente", "buscador"], goal: "الإصغاء والتعاطف أولًا، ثم عرض ذكر الله والدعاء طريقًا إلى الطمأنينة، مع تشجيعه على المختص عند الحاجة.", q: ["13:28", "2:186"], h: [],
    steps: [
      { w: "in", es: "Últimamente tengo mucha ansiedad. Tengo trabajo, amigos, de todo, pero me siento vacío y no duermo bien.", ar: "في الآونة الأخيرة أعاني قلقًا شديدًا. عندي عمل وأصدقاء وكل شيء، لكني أشعر بالفراغ ولا أنام جيدًا." },
      { w: "da", es: "Siento mucho que estés pasando por esto, y gracias por confiar en mí para contármelo. ¿Desde cuándo te sientes así?", ar: "آسف جدًا لما تمر به، وشكرًا لثقتك بي حين أخبرتني. منذ متى تشعر هكذا؟", note: "استمع أولًا؛ لا تقفز إلى الحل." },
      { w: "in", es: "Desde hace unos meses. No sé qué me pasa.", ar: "منذ بضعة أشهر. لا أعرف ما بي." },
      { w: "da", es: "Primero, algo importante: si la ansiedad no te deja dormir o vivir con normalidad, habla con un médico o un psicólogo. Cuidar la salud forma parte de la fe, no es una falta de ella.", ar: "أولًا أمر مهم: إن كان القلق يمنعك من النوم أو من حياتك الطبيعية فاستشر طبيبًا أو أخصائيًا نفسيًا. العناية بالصحة من الإيمان، وليست نقصًا فيه.", note: "لا تجعل الدعوة بديلًا عن العلاج؛ شجّعه على المختص إن كانت الأعراض شديدة." },
      { w: "da", es: "Y te comparto lo que a mí me ayuda: el Corán dice que los corazones encuentran sosiego en el recuerdo de Dios, y que Él está cerca y responde a quien lo llama. A veces el vacío es la sed del alma por su Creador. ¿Has probado alguna vez a hablar con Dios a solas, con tus propias palabras?", ar: "وأشاركك ما يعينني: يقول القرآن إن القلوب تطمئن بذكر الله، وإنه قريب يجيب من يدعوه. وأحيانًا يكون الفراغ عطشَ الروح إلى خالقها. هل جربت يومًا أن تناجي الله وحدك بكلماتك؟", note: "اعرض الرعد 28 والبقرة 186، واقترح خطوة صغيرة لا محاضرة." },
      { w: "in", es: "No mucho, la verdad. Pero lo intentaré.", ar: "ليس كثيرًا في الحقيقة. لكني سأحاول." },
      { w: "da", es: "Si quieres, otro día te cuento cómo rezamos los musulmanes y por qué para mí son cinco pausas de paz al día. Y aquí estoy para lo que necesites.", ar: "إن أحببت حدثتك يومًا كيف يصلي المسلمون، ولماذا هي عندي خمس استراحات سكينة في اليوم. وأنا هنا لكل ما تحتاجه.", note: "تابعه بعد أيام برسالة اطمئنان من قسم الرسائل." }
    ], avoid: ["لا تقل إن قلقه سببه ضعف إيمانه.", "لا تنصحه بترك العلاج أو الدواء.", "لا تعده بأن الإسلام سيزيل همومه كلها فورًا."] },

  { id: "d45", t: "«لماذا تطوفون حول المكعب الأسود؟»", si: ["practicas", "religiones"], st: ["contacto", "conocer"], au: ["general", "catolico", "indiferente"], goal: "تصحيح فكرة عبادة الكعبة، وربط الحج بإبراهيم عليه السلام وبالمساواة بين الناس.", q: ["2:127", "49:13"], h: [],
    steps: [
      { w: "in", es: "He visto en la tele a millones de personas dando vueltas alrededor de un cubo negro. ¿Adoráis esa piedra?", ar: "رأيت في التلفاز ملايين الناس يدورون حول مكعب أسود. هل تعبدون ذلك الحجر؟" },
      { w: "da", es: "Es una pregunta muy común. No: no adoramos la Kaaba ni ninguna piedra; adoramos solo a Dios. La Kaaba es una casa dedicada a Su adoración, y todos los musulmanes del mundo nos orientamos hacia ella al rezar, como un punto de unidad.", ar: "سؤال شائع جدًا. لا، لا نعبد الكعبة ولا أي حجر؛ نعبد الله وحده. الكعبة بيت لعبادته، ويتجه إليها المسلمون في العالم كله في صلاتهم، فهي نقطة اجتماع ووحدة.", note: "صحّح المفهوم أولًا: العبادة لله وحده، والكعبة قبلة لا معبود." },
      { w: "in", es: "¿Y quién la construyó?", ar: "ومن بناها؟" },
      { w: "da", es: "Según el Corán, Abraham y su hijo Ismael (la paz sea con ellos) levantaron sus cimientos y pidieron a Dios que aceptara su obra. La peregrinación (Hajj) recuerda la fe de Abraham y de su familia.", ar: "بحسب القرآن رفع إبراهيم وابنه إسماعيل عليهما السلام قواعدها، ودعوا الله أن يتقبّل منهما. والحج يذكّر بإيمان إبراهيم وأهل بيته.", note: "اعرض البقرة 127؛ وإبراهيم محل تقدير عند المسيحيين أيضًا." },
      { w: "in", es: "Y todos van vestidos igual, de blanco.", ar: "وكلهم يلبسون الشيء نفسه، الأبيض." },
      { w: "da", es: "Exacto. Los hombres llevan dos telas blancas sencillas, ricos y pobres, de todos los países. Ante Dios no importa tu dinero ni tu color, sino tu piedad. ¿Te gustaría ver un vídeo corto que lo explica en español?", ar: "بالضبط. يلبس الرجال قطعتين بيضاوين بسيطتين، أغنياؤهم وفقراؤهم ومن كل البلدان. فعند الله لا عبرة بمالك ولا بلونك، بل بتقواك. هل تحب أن تشاهد مقطعًا قصيرًا يشرح ذلك بالإسبانية؟", note: "أكرمكم عند الله أتقاكم (الحجرات 13). وأرسل مرئيًا إسبانيًا من IslamHouse من المكتبة." }
    ], avoid: ["لا تدخل في تفاصيل مناسك الحج في أول حديث.", "لا تعده بزيارة مكة؛ فدخولها خاص بالمسلمين، واشرح ذلك بلطف إن سأل.", "لا تنقل أرقامًا وإحصاءات غير موثقة عن أعداد الحجاج."] }
);

RQ.WARN.push(
  { id: "w31", lvl: "red", t: "لا تشارك في أعيادهم وشعائرهم الدينية مجاملةً", why: "الاحتفال بالأعياد الدينية لغير المسلمين كعيد الميلاد مشاركة في شعيرة تعبّر عن عقيدة يخالفها التوحيد، والمجاملة على حساب العقيدة تربك المحاور في فهم الإسلام نفسه.", instead: "اشكره على دعوته واعتذر بلطف وصدق، واقترح لقاءً بديلًا في يوم عادي، وابقَ بارًّا به في سائر الأيام. واستعمل قالب «صديق كاثوليكي يدعوك إلى عشاء عيد الميلاد».", q: ["109:6", "60:8"], h: [], kw: ["navidad", "nochebuena", "semana santa", "ir a misa", "pascua"] },
  { id: "w32", lvl: "amber", t: "لا تعظ المريض أو المحزون في غير وقته", why: "المريض في المستشفى والمحزون في أيام المصيبة يحتاجان الرحمة والحضور قبل الكلام، والموعظة الطويلة أو الجدال في تلك اللحظة تُشعره بالاستغلال.", instead: "زيارة قصيرة، ودعاء بإذنه، وعون عملي. واترك الحديث عن الإيمان لما يفتحه هو، ثم تابعه بعد تعافيه. واستعمل قالب «زيارة زميل مريض في المستشفى».", q: [], h: [], kw: ["hospital", "ingresado", "ingresada", "quimioterapia", "cuidados intensivos", "tanatorio", "velatorio"] },
  { id: "w33", lvl: "red", t: "لا تحادث قاصرًا في الخاص دون علم أهله", why: "التواصل الخاص مع من هم دون السن القانونية دون علم والديهم يعرّضك والجهة التي تمثلها لتهم خطيرة ومساءلة قانونية، ويسيء إلى صورة الدعوة.", instead: "اجعل التواصل مع القاصرين عبر المدرسة أو المعلم أو بحضور الأهل وفي أماكن عامة، وأحِل الفتيات إلى الداعيات.", q: [], h: [], kw: ["tengo 13 años", "tengo 14 años", "tengo 15 años", "tengo 16 años", "tengo 17 años", "mis padres no saben", "del instituto"] },
  { id: "w34", lvl: "amber", t: "لا ترسل ترجمة آلية دون مراجعة", why: "الترجمة الآلية قد تقلب المعنى في ألفاظ العقيدة كالألوهية والعبادة والشفاعة، أو تخرج بأسلوب جاف يُفهم على غير وجهه.", instead: "راجع الترجمة قبل الإرسال، واستعمل الرسائل الجاهزة ما أمكن، ولا تترجم الآيات آليًا أبدًا؛ انسخها من QuranEnc عبر الموقع.", q: [], h: [], kw: [] },
  { id: "w35", lvl: "amber", t: "لا تنشر القصص والصور «المعجزة» غير الموثقة", why: "صور كتابة اسم الله على السحاب أو الثمار، وأخبار «إسلام المشاهير» المختلقة، تنتشر بسرعة ثم يتبيّن كذبها، فتسقط ثقة الناس بالداعية وبكل ما ينقله.", instead: "انشر ما ثبت من مصدره فقط، واسأل قبل النشر: من المصدر؟ ومتى؟ فإن لم تعرف فلا تنشر.", q: ["49:6"], h: [], kw: ["video viral", "famoso se convirtio", "famosos musulmanes", "nombre de allah en"] },
  { id: "w36", lvl: "amber", t: "لا تنجرّ إلى معارك التعليقات", why: "الجدال العلني مع المسيء يمنحه منبرًا ويستفزك إلى ألفاظ لا تليق، والقارئ الصامت يحكم على الإسلام من أسلوبك قبل حجتك.", instead: "رد مرة واحدة بهدوء ورابط موثوق، ثم قل «سلامًا» وتوقف، وتابع في الخاص من يسأل بصدق. واستعمل قالب «تعليق مسيء على منشورك الدعوي».", q: ["25:63", "41:34"], h: ["5351"], kw: ["vete a tu pais", "vuelve a tu pais", "iros de nuestro pais", "religion de odio", "invasores"] },
  { id: "w37", lvl: "amber", t: "لا تُثقل على المسلم الجديد بتغيير كل شيء دفعة واحدة", why: "مطالبة المسلم الجديد فورًا بتغيير اسمه ولباسه وعاداته وتعلّم العربية وقطع صداقاته القديمة ترهقه، وقد تدفعه إلى النفور والانتكاس، والإسلام جاء باليسر والتدرج.", instead: "ابدأ بالتوحيد والطهارة والصلاة، وبيّن أن تغيير الاسم لا يلزم إلا إن كان معناه مخالفًا للتوحيد أو قبيحًا، وأن العربية تأتي بالتدريج. وللتفاصيل أحِله إلى إمام موثوق.", q: ["2:286"], h: ["5795"], kw: ["cambiar mi nombre", "nombre musulman", "nombre islamico", "dejar a mis amigos"] },
  { id: "w38", lvl: "amber", t: "لا تختفِ بعد إسلامه", why: "قد يضعف إيمان المسلم الجديد ويشعر بالغربة إذا تُرك وحده بعد الشهادة: بلا صحبة ولا معلّم ولا من يسأل عنه، وخاصة إن خسر بعض علاقاته بسبب إسلامه.", instead: "ضع خطة متابعة أسبوعية لثلاثة أشهر على الأقل، واربطه بمسجد ورفيق من جنسه، وسجّل مواعيده في «متابعة المحاورين».", q: [], h: ["5866"], kw: ["me siento solo", "me siento sola", "no tengo a nadie", "nadie me ayuda", "me dejaron solo"] },
  { id: "w39", lvl: "red", t: "لا تصوّر أحدًا ولا تنشر قصته ومحادثاته دون إذنه", why: "نشر صورة المسلم الجديد أو مقطع شهادته أو لقطات محادثاته دون إذن صريح قد يعرّضه للأذى من أهله أو في عمله، وهو خيانة للأمانة.", instead: "استأذن صراحةً قبل أي تصوير أو نشر، وأخفِ الأسماء والوجوه عند الشك، واحترم رغبته إن رفض.", q: ["4:58"], h: [], kw: ["sin mi permiso", "no quiero salir en", "captura de pantalla", "me grabaste", "grabarme"] },
  { id: "w40", lvl: "amber", t: "لا تخض في الجدل العلمي التخصصي كالتطور بغير علم", why: "الدخول في تفاصيل علم الأحياء أو الفيزياء دون تخصص يوقعك في أخطاء يستغلها المحاور، ويصرف الحوار عن أصله: من الخالق؟ ولماذا خلقنا؟", instead: "فرّق بين وصف العلم لكيفية الأشياء وسؤال الخالق والغاية، وصرّح بعقيدتك في خلق آدم عليه السلام، وأحِل التفاصيل إلى مختص أو كتاب موثوق. واستعمل قالب «ملحد: التطور يفسّر كل شيء».", q: ["17:36", "52:35"], h: [], kw: ["evolucion", "darwin", "descendemos del mono", "venimos del mono", "seleccion natural"] }
);

RQ.IDEAS.push(
  /* الطلاب والجامعات */
  { t: "طاولة تعريفية في الجامعة", body: "بالتنسيق مع إدارة الجامعة وجمعية الطلاب المسلمين، طاولة في يوم الأنشطة عليها كتيّبات IslamHouse الإسبانية وكتابة الأسماء بالعربية، مع إخوة للطلاب وأخوات للطالبات.", tag: "طلاب", link: "#libros" },
  { t: "شريك تبادل لغوي", body: "تعلّم الإسبانية مع زميل يتعلم العربية: نصف ساعة لكل لغة. اللقاءات المنتظمة تبني صداقة يأتي فيها الحديث عن الإسلام طبيعيًا. ودرّب نفسك من قسم «تعلّم الإسبانية».", tag: "طلاب", link: "#aprender" },
  { t: "عون في بحث عن الإسلام", body: "إن احتاج زميل أو طالب مصادر عن الإسلام فأرشده إلى ترجمة QuranEnc وكتب IslamHouse ليستشهد بها، ولا تكتب البحث عنه. تدرّب على قالب «طالب يكتب بحثًا مدرسيًا».", tag: "طلاب", link: "#conversaciones/d37" },
  { t: "ندوة طلابية قصيرة", body: "بإذن الجامعة، ندوة نصف ساعة بعنوان واحد واضح مثل «عيسى في القرآن» أو «ما الإسلام؟» يقدّمها متحدث متمكن، تليها أسئلة مفتوحة وتوزيع كتيّب واحد.", tag: "طلاب" },
  { t: "المصلّى بأبواب مفتوحة", body: "ادعُ زملاءك ليشاهدوا صلاة الظهر في مصلى الجامعة من الخلف بهدوء، ثم أجب عن أسئلتهم بعدها في دقائق.", tag: "طلاب" },
  { t: "الأمانة في الامتحان دعوة صامتة", body: "كن الزميل الذي يشارك ملخصاته، ويفي بمواعيد العمل الجماعي، ويرفض الغش بلطف. سيسألونك يومًا: لماذا أنت هكذا؟ فيكون الجواب عن الإسلام.", tag: "طلاب" },
  { t: "إهداء لمكتبة الكلية", body: "اقترح على مكتبة الجامعة أو المدرسة قبول إهداء رسمي من ترجمات معاني القرآن الإسبانية وكتب IslamHouse المطبوعة، عبر مركز إسلامي معروف.", tag: "طلاب", link: "#biblioteca/ih-books" },

  /* العمل والزملاء */
  { t: "استراحة الشاي بالتمر", body: "أحضر تمرًا أو حلوى لزملائك بعد العيد أو في يوم عادي، مع جملة لطيفة تشرح المناسبة. الكرم البسيط يفتح باب الأسئلة.", tag: "ثقة" },
  { t: "جملة واحدة عند الاستئذان للصلاة", body: "حين تستأذن للصلاة قل لزميلك: «أعود بعد خمس دقائق، هي استراحتي مع الله». جملة قصيرة تثير الفضول دون وعظ.", tag: "بداية" },
  { t: "إتقان العمل رسالة", body: "الدقة في المواعيد، والأمانة في المال، وجودة العمل، تجعل زملاءك يسألون عمّا يدفعك. وإذا سألوا فأرسل رسالة «العمل عبادة» من قسم الرسائل.", tag: "ثقة", link: "#mensajes" },
  { t: "غداء حلال مع الفريق", body: "ادعُ زملاءك إلى غداء في مطعم حلال، واشرح معنى «حلال» في جملتين: الطيب من الطعام وما أذن الله فيه.", tag: "ثقة" },
  { t: "رسالة قبل رمضان لفريق العمل", body: "قبل رمضان بيومين أرسل لزملائك رسالة قصيرة تشرح الصيام، وأنك لا تحتاج معاملة خاصة، وأن بإمكانهم أن يأكلوا أمامك براحتهم.", tag: "رمضان", link: "#mensajes" },
  { t: "رسالة مواساة في وقتها", body: "حين يمرض زميل أو يفقد عزيزًا، أرسل له رسالة مواساة أو دعاء من قسم الرسائل؛ الحضور في الشدة يبني ثقة لا تُنسى.", tag: "ثقة", link: "#mensajes" },

  /* الداعيات والنساء */
  { t: "حلقة نسائية للمهتمات", body: "داعيات يلتقين المهتمات في مركز إسلامي أو مكان عام على منهج «اكتشف الإسلام في 12 لقاءً»، في جلسة خاصة بالنساء.", tag: "نساء", link: "#curso" },
  { t: "أخت متابِعة لكل مسلمة جديدة", body: "اربطي كل مسلمة جديدة بأخت تتابعها ثلاثة أشهر على «منهج المسلم الجديد»، ولا يتولى الرجال متابعتها في الخاص.", tag: "نساء", link: "#curso/nuevo" },
  { t: "ركن الحجاب في اليوم المفتوح", body: "تشرح فيه الأخوات معنى الحجاب ويُجبن عن أسئلة الزائرات بهدوء، دون إلزام أحد أو تصوير الزائرات.", tag: "نساء" },
  { t: "مجموعة أسئلة نسائية", body: "مجموعة واتساب أو تيليجرام للمهتمات تديرها داعية موثوقة، بقواعد واضحة: سؤال وجواب موثّق، ولا رجال فيها.", tag: "نساء" },
  { t: "صداقة أمهات المدرسة", body: "لقاءات الأمهات عند المدرسة فرصة طبيعية للصداقة؛ ادعي إحداهن لقهوة أو لإفطار رمضاني نسائي في بيتك.", tag: "نساء" },
  { t: "نساء صنعن التاريخ", body: "شاركي سيرة خديجة وعائشة وأم سلمة رضي الله عنهن من كتب IslamHouse الموثوقة؛ فهي تكشف مكانة المرأة في الإسلام دون جدال.", tag: "نساء", link: "#biblioteca/ih-books" },

  /* الأسرة */
  { t: "عشاء عائلي مع الجيران", body: "ادعُ عائلة جارة إلى عشاء بسيط في بيتك؛ يرى الضيوف حياة الأسرة المسلمة ورحمتها، وهذا أبلغ من أي شرح.", tag: "أسرة" },
  { t: "هدية من يد طفلك", body: "في العيد يحمل طفلك حلوى لزملائه في الصف مع بطاقة إسبانية لطيفة من «صانع البطاقات»، بإذن المدرسة.", tag: "أسرة", link: "#tarjetas" },
  { t: "نزهة عائلية مشتركة", body: "نزهة في حديقة مع عائلة صديقة وطعام حلال؛ وحين يحين وقت الصلاة صلِّ بهدوء قريبًا منهم، فيرون الصلاة جزءًا طبيعيًا من الحياة.", tag: "أسرة" },
  { t: "زيارة أهل المسلم الجديد", body: "بإذن المسلم الجديد، زر والديه مع هدية بسيطة، ليطمئنوا أن ابنهم ازداد برًّا بهم ولم يبتعد عنهم. وتدرّب قبلها على قالب «مسلم جديد وأهله يرفضون».", tag: "أسرة", link: "#conversaciones/d09" },
  { t: "ركن الأطفال في المسجد المفتوح", body: "تلوين وكتابة الأسماء بالعربية لأطفال الزوار بحضور أهلهم؛ فالأهل يطمئنون حين يُكرَم أطفالهم.", tag: "أسرة" },

  /* وسائل التواصل */
  { t: "سؤال وجواب أسبوعي", body: "اختر كل أسبوع سؤالًا من «أسئلة الباحثين» وانشر جوابه القصير بالإسبانية مع مرجعه، بلا جدال في التعليقات.", tag: "رقمي", link: "#preguntas" },
  { t: "مقتطف موثّق في قصة", body: "اختر مقتطفًا حرفيًّا من كتب IslamHouse وحوّله إلى بطاقة تحمل اسم الكتاب، ثم انشره في قصتك.", tag: "رقمي", link: "#citas" },
  { t: "يوم في حياة مسلم", body: "مقطع قصير هادئ بلا موسيقى عن الصلاة والعمل والأسرة في يومك، دون تصوير أحد بغير إذنه.", tag: "رقمي" },
  { t: "بث أسئلة مع متمكن", body: "بث مباشر شهري يجيب فيه طالب علم متمكن، ويقتصر دور الداعية المبتدئ على جمع الأسئلة وإدارتها.", tag: "رقمي" },
  { t: "سلسلة بطاقات بدل منشور طويل", body: "حوّل فكرة واحدة إلى خمس بطاقات متتابعة (كاروسيل) من رسائل الموقع، لكل بطاقة جملة واحدة ومرجع.", tag: "رقمي", link: "#tarjetas" },
  { t: "آية اليوم من القارئ", body: "انسخ آية مع مرجعها وترجمتها المعتمدة من «قارئ القرآن» وضعها في حالتك، واختم بسؤال قصير.", tag: "رقمي", link: "#quran" },
  { t: "قائمة مرئيات إسبانية", body: "اجمع من مكتبة IslamHouse خمسة مرئيات إسبانية قصيرة في قائمة واحدة، وأرسل منها مقطعًا واحدًا لكل محاور بحسب سؤاله.", tag: "رقمي", link: "#biblioteca/ih-videos" },
  { t: "رسالة صوتية دافئة", body: "بعض المحاورين يتأثرون بالصوت أكثر من النص؛ سجّل رسالة قصيرة بالإسبانية بعد التدرب عليها، ولا تتجاوز دقيقة.", tag: "رقمي" },

  /* أدوات الموقع ومهارات الداعية */
  { t: "تدرّب على النطق قبل التسجيل", body: "الصق رسالتك في «مختبر النطق» واسمعها بالإسبانية مرتين قبل أن تسجلها أو تقولها وجهًا لوجه.", tag: "مهارة", link: "#pronunciar" },
  { t: "حلّل قبل أن ترد", body: "الصق رسالة محاورك في «حلّل رسالة المحاور» لترى موضوعها والتحذيرات المناسبة قبل أن تكتب ردك.", tag: "مهارة", link: "#analizar" },
  { t: "خطة قبل اللقاء المهم", body: "قبل لقاء مهم اجمع خطة من «المُركِّب»: رسالة، وقالب، ومقالة، وتحذيرات تناسب محاورك ومرحلته.", tag: "تنظيم", link: "#componer" },
  { t: "افهم رسالته الطويلة", body: "إن أرسل لك محاورك رسالة طويلة صعبة فاستعمل «مترجم الداعية» لتفهمها، وراجع أي ترجمة قبل أن ترسل ردك.", tag: "مهارة", link: "#traducir" },
  { t: "لعب الأدوار مع زميل", body: "تدرب مع أخ داعية: يقوم أحدكما بدور المحاور من «قوالب المحادثات» والآخر يرد، ثم تتبادلان الأدوار.", tag: "مهارة", link: "#conversaciones" },
  { t: "مراجعة التحذيرات قبل الحملة", body: "قبل أي حملة ميدانية أو رقمية اقرأ مع فريقك صفحة التحذيرات في عشر دقائق؛ الخطأ الواحد قد يهدم جهد شهر.", tag: "تنظيم", link: "#avisos" },
  { t: "عرض النصوص على طالب علم", body: "قبل أن تعتمد نصوصًا جديدة لفريقك، اعرضها على طالب علم من صفحة «المراجعة العلمية» ليعلّم عليها.", tag: "أمانة", link: "#revision" },
  { t: "مكتبة الهاتف الجاهزة", body: "اختر من «دليل الكتب» خمسة كتب لخمسة أنواع من المحاورين، واحفظ روابطها في ملاحظة واحدة لترسل المناسب فورًا.", tag: "تنظيم", link: "#libros" },
  { t: "فقرة من الكتاب جوابًا لسؤاله", body: "افتح الكتاب في قارئ IslamHouse داخل الموقع، وابحث عن الفقرة التي تجيب سؤال محاورك، وأرسلها مع اسم الكتاب ورابطه.", tag: "عمق", link: "#citas" },
  { t: "سورة قصيرة مع تفسيرها", body: "اقرأ مع المهتم سورة الإخلاص مع «المختصر في التفسير» بالإسبانية من قارئ القرآن، واسأله: ما الذي لفت انتباهك؟", tag: "عمق", link: "#quran/112" },
  { t: "مبدأ ثقة كل أسبوع", body: "اختر كل أسبوع مبدأً واحدًا من «بناء الثقة» وطبّقه عمليًا مع محاوريك، ثم قيّم نفسك في آخر الأسبوع.", tag: "ثقة", link: "#confianza" },

  /* اليوم المفتوح والمسجد */
  { t: "لوحة معاني الأذان", body: "في اليوم المفتوح ضع لوحة كبيرة بجمل الأذان ومعانيها بالإسبانية، وأسمِع الزوار الأذان ثم اشرحه في دقيقة.", tag: "مجتمع" },
  { t: "محطة الوضوء", body: "اشرح للزوار الوضوء عمليًا عند الميضأة: لماذا نتطهر قبل الصلاة؟ ثم ادعهم لمشاهدة الصلاة من الخلف.", tag: "مجتمع" },
  { t: "صندوق الأسئلة المجهولة", body: "صندوق يضع فيه الزوار أسئلتهم دون أسماء، ويجيب عنها إمام متمكن في نهاية الزيارة؛ فيسأل الخجول ما لا يجرؤ على قوله.", tag: "مجتمع" },
  { t: "يوم مفتوح لجيران المسجد", body: "ادعُ سكان الشارع المحيط بالمسجد، واعتذر لهم عن زحام الجمعة ومواقف السيارات، واسمع ملاحظاتهم. حسن الجوار دعوة.", tag: "مجتمع", link: "#conversaciones/d32" },
  { t: "استقبال الزيارات المدرسية", body: "زيارات مدرسية منظمة بإذن الإدارة وحضور المعلمين، بشرح مبسط يناسب الأعمار، ومرشدة للطالبات.", tag: "مجتمع" },
  { t: "هدية عند باب الخروج", body: "عند الخروج أهدِ الزائر ترجمة لمعاني القرآن أو كتيّبًا من IslamHouse، مع بطاقة تواصل رسمية للمسجد لا أرقام شخصية.", tag: "متابعة" },

  /* رمضان */
  { t: "تمرة عند الغروب", body: "بإذن الجهات المختصة، وزّع تمرًا وماءً على المارّة قرب المسجد عند المغرب، مع بطاقة صغيرة تشرح الصيام بالإسبانية.", tag: "رمضان", link: "#tarjetas" },
  { t: "تقويم رمضان للزملاء", body: "أهدِ زملاءك تقويمًا بأوقات الإفطار، مع جملة يومية قصيرة عن معنى الصيام من رسائل الموقع.", tag: "رمضان" },
  { t: "سلسلة «زميل في رمضان»", body: "أرسل لزميلك المهتم رسالة يومية من سلسلة رمضان الجاهزة، واختم كل رسالة بسؤال.", tag: "رمضان", link: "#ideas/series" },
  { t: "ليلة سورة القدر", body: "في العشر الأواخر اقرأ مع المهتمين سورة القدر مع ترجمة معانيها وتفسيرها المختصر من قارئ القرآن.", tag: "رمضان", link: "#quran/97" },
  { t: "سلال رمضان مع الزملاء", body: "ادعُ زملاءك للمشاركة في تجهيز سلال غذائية للمحتاجين عبر جمعية موثوقة؛ رمضان شهر العطاء، والعمل المشترك يقرّب القلوب.", tag: "رمضان" },
  { t: "أول عيد للمسلم الجديد", body: "لا تترك المسلم الجديد وحده في أول عيد: اصطحبه إلى صلاة العيد وادعه إلى بيتك أو إلى أسرة من جنسه.", tag: "متابعة" },

  /* المستشفيات والمجتمع */
  { t: "عيادة المريض الذي تعرفه", body: "زر زميلًا أو جارًا مريضًا زيارة قصيرة بدعاء وهدية بسيطة، دون وعظ. وتدرّب قبلها على قالب «زيارة زميل مريض».", tag: "ميداني", link: "#conversaciones/d38" },
  { t: "التطوع في برامج المستشفى", body: "انضم إلى برامج التطوع الرسمية في المستشفى كمرافقة المرضى، والتزم بأنظمته؛ ولا تتحدث عن الدين إلا مع من يسألك.", tag: "ميداني" },
  { t: "بطاقة دعاء للمريض", body: "اصنع من «صانع البطاقات» بطاقة بالإسبانية «أسأل الله أن يشفيك» مع رسالة «الصبر على المرض»، وأرسلها له.", tag: "ثقة", link: "#tarjetas" },
  { t: "رفّ كتيبات في المتجر", body: "إن كان لك متجر أو مطعم حلال فضع رفًّا صغيرًا لكتيّبات IslamHouse الإسبانية المجانية مع لافتة «خذ واحدًا».", tag: "ميداني" },
  { t: "اربط المهتم بمركز قريب", body: "احفظ عنوان أقرب مركز إسلامي أو مكتب لتوعية الجاليات قرب محاورك، لتحيله إليه حين يحتاج لقاءً أو معلّمًا.", tag: "تنظيم" }
);

RQ.SERIES.push(
  { id: "s31", t: "زميل في رمضان — 5 أيام", au: "general", days: ["m49", "m63", "m111", "m113", "m72"] },
  { id: "s32", t: "صديق كاثوليكي: عيسى ومريم — 7 أيام", au: "catolico", days: ["m95", "m98", "m96", "m45", "m97", "m87", "m77"] },
  { id: "s33", t: "صديق إنجيلي — 5 أيام", au: "protestante", days: ["m91", "m78", "m107", "m127", "m34"] },
  { id: "s34", t: "ملحد: العقل والكون — 7 أيام", au: "ateo", days: ["m129", "m90", "m121", "m125", "m82", "m104", "m131"] },
  { id: "s35", t: "صديق مريض — 5 أيام", au: "general", days: ["m04", "m94", "m103", "m122", "m79"] },
  { id: "s36", t: "صديق قلق أو مضغوط — 5 أيام", au: "buscador", days: ["m128", "m93", "m92", "m99", "m100"] },
  { id: "s37", t: "المسلم الجديد: الشهر الأول — 7 أيام", au: "nuevo", days: ["m108", "m88", "m109", "m110", "m126", "m133", "m134"] },
  { id: "s38", t: "من هو النبي محمد ﷺ؟ — 7 أيام", au: "general", days: ["m62", "m105", "m106", "m33", "m107", "m36", "m56"] }
);
