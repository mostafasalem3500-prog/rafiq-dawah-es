/* تعلّم الإسبانية — المستوى A1 (مبتدئ). الصيغ: كلمة "es|ar|emoji"، جملة "es|ar"، حوار "A:es|ar". */
window.LEARN = window.LEARN || {};
LEARN.UNITS = (LEARN.UNITS || []).concat([
{
  id: "a1-01", lv: "A1", ic: "👋", t: "Saludos y despedidas", tar: "التحية والوداع",
  goal: "أن تُحيّي وتودّع وتشكر بأدب في أي وقت من اليوم.",
  w: ["hola|مرحبًا|👋", "buenos días|صباح الخير|🌅", "buenas tardes|مساء الخير (بعد الظهر)|🌇", "buenas noches|مساء الخير / تصبح على خير|🌙", "adiós|مع السلامة|🙋", "hasta luego|إلى اللقاء|🔜", "gracias|شكرًا|🙏", "de nada|عفوًا|😊", "por favor|من فضلك|🤲", "perdón|عذرًا|🙇", "sí|نعم|✅", "no|لا|❌"],
  g: { t: "علامتا السؤال والتعجب المقلوبتان، وtú وusted", b: ["في الإسبانية تبدأ الجملة الاستفهامية بعلامة مقلوبة ¿ وتنتهي بـ ?، وكذلك التعجب ¡ ... !", "tú للمخاطب القريب (صديق، طفل، زميل)، وusted للاحترام (كبير السن، شخص لا تعرفه، موظف).", "في أمريكا اللاتينية يُستعمل ustedes للجمع دائمًا، وفي إسبانيا vosotros للجمع القريب."], ex: ["¿Cómo estás?|كيف حالك؟ (لصديق)", "¿Cómo está usted?|كيف حالك؟ (باحترام)", "¡Hola! ¡Buenos días!|مرحبًا! صباح الخير!"] },
  s: ["Hola, ¿qué tal?|مرحبًا، كيف الحال؟", "Muy bien, gracias.|بخير جدًا، شكرًا.", "Buenos días, señor.|صباح الخير يا سيدي.", "Hasta mañana.|إلى الغد.", "Mucho gusto.|تشرفت بمعرفتك.", "Perdón, ¿habla usted árabe?|عذرًا، هل تتكلم العربية؟"],
  d: ["A:¡Hola! ¿Qué tal?|مرحبًا! كيف الحال؟", "B:Muy bien, ¿y tú?|بخير جدًا، وأنت؟", "A:Bien, gracias.|بخير، شكرًا.", "B:¡Qué bueno! Hasta luego.|جميل! إلى اللقاء.", "A:Adiós, hasta mañana.|مع السلامة، إلى الغد."],
  tip: "يُحيّي الإسبان غالبًا بقبلتين على الخد بين الرجال والنساء؛ ويكفيك أن تقول بلطف: «Perdón, por mi religión saludo así» وتضع يدك على صدرك مبتسمًا."
},
{
  id: "a1-02", lv: "A1", ic: "🪪", t: "Presentarse", tar: "التعريف بنفسك",
  goal: "أن تقول اسمك وبلدك ولغتك وتسأل الآخر عنها.",
  w: ["el nombre|الاسم|🏷️", "me llamo|اسمي|🙋", "soy|أنا (أكون)|👤", "el país|البلد|🗺️", "la ciudad|المدينة|🏙️", "el idioma|اللغة|🗣️", "árabe|عربي / العربية|📜", "español|إسباني / الإسبانية|💬", "Egipto|مصر|🏜️", "Arabia Saudí|السعودية|🌴", "México|المكسيك|🌮", "hablar|يتكلم|💬"],
  g: { t: "الفعل ser (يكون) للهوية والأصل", b: ["ser فعل شاذ مهم جدًا: yo soy، tú eres، él/ella/usted es، nosotros somos، vosotros sois، ellos/ustedes son.", "يُستعمل للاسم والجنسية والأصل والمهنة: Soy Ahmed. Soy de Egipto.", "للسؤال عن الأصل: ¿De dónde eres? والجواب: Soy de...", "الضمير غالبًا يُحذف لأن نهاية الفعل تدل عليه: Soy egipcio = Yo soy egipcio."], ex: ["Soy Fátima y soy de Marruecos.|أنا فاطمة ومن المغرب.", "¿De dónde es usted?|من أين حضرتك؟", "Somos estudiantes.|نحن طلاب."] },
  s: ["Me llamo Ahmed.|اسمي أحمد.", "¿Cómo te llamas?|ما اسمك؟", "Soy de Arabia Saudí.|أنا من السعودية.", "Vivo en Makkah.|أعيش في مكة.", "Hablo árabe y un poco de español.|أتكلم العربية وقليلًا من الإسبانية.", "Encantado de conocerte.|سعيد بمعرفتك."],
  d: ["A:Hola, me llamo Lucía. ¿Y tú?|مرحبًا، اسمي لوثيا. وأنت؟", "B:Me llamo Omar. Encantado.|اسمي عمر. تشرفت.", "A:¿De dónde eres, Omar?|من أين أنت يا عمر؟", "B:Soy de Egipto, pero vivo en Madrid.|أنا من مصر، لكني أعيش في مدريد.", "A:¡Hablas español muy bien!|تتكلم الإسبانية جيدًا جدًا!", "B:Gracias, estudio todos los días.|شكرًا، أدرس كل يوم."],
  tip: "Encantado يقولها الرجل، وEncantada تقولها المرأة؛ لأن الصفة تتبع جنس المتكلم."
},
{
  id: "a1-03", lv: "A1", ic: "🔢", t: "Los números y la edad", tar: "الأرقام والعمر",
  goal: "أن تعدّ من 0 إلى 20 وتسأل عن العمر ورقم الهاتف.",
  w: ["cero|صفر|0️⃣", "uno|واحد|1️⃣", "dos|اثنان|2️⃣", "tres|ثلاثة|3️⃣", "cuatro|أربعة|4️⃣", "cinco|خمسة|5️⃣", "seis|ستة|6️⃣", "siete|سبعة|7️⃣", "ocho|ثمانية|8️⃣", "nueve|تسعة|9️⃣", "diez|عشرة|🔟", "veinte|عشرون|2️⃣0️⃣"],
  g: { t: "العمر بالفعل tener (يملك)", b: ["في الإسبانية تقول «عندي سنوات» لا «عمري»: Tengo 25 años.", "tener: tengo، tienes، tiene، tenemos، tenéis، tienen.", "الأرقام 11–15: once، doce، trece، catorce، quince؛ و16–19: dieciséis، diecisiete، dieciocho، diecinueve.", "uno يصير un قبل الاسم المذكر: un libro، ويصير una قبل المؤنث: una casa."], ex: ["¿Cuántos años tienes?|كم عمرك؟", "Tengo treinta años.|عمري ثلاثون سنة.", "Mi hijo tiene doce años.|ابني عمره اثنتا عشرة سنة."] },
  s: ["Tengo dos hermanos.|عندي أخوان.", "¿Cuál es tu número de teléfono?|ما رقم هاتفك؟", "Es el cinco, cinco, cero, uno.|إنه خمسة خمسة صفر واحد.", "Tengo veinte años.|عمري عشرون سنة.", "Hay diez libros en la mesa.|توجد عشرة كتب على الطاولة.", "Mi abuela tiene ochenta años.|جدتي عمرها ثمانون سنة."],
  d: ["A:¿Cuántos años tienes?|كم عمرك؟", "B:Tengo dieciocho años. ¿Y tú?|عمري ثماني عشرة سنة. وأنت؟", "A:Yo tengo quince.|وأنا عمري خمس عشرة سنة.", "B:¿Tienes hermanos?|هل عندك إخوة؟", "A:Sí, tengo tres hermanos.|نعم، عندي ثلاثة إخوة."],
  tip: "لا تخلط بين año (سنة) وano (كلمة غير لائقة)؛ علامة ñ تغيّر المعنى تمامًا."
},
{
  id: "a1-04", lv: "A1", ic: "👨‍👩‍👧", t: "La familia", tar: "العائلة",
  goal: "أن تتحدث عن أفراد أسرتك وتستعمل ضمائر الملكية.",
  w: ["el padre|الأب|👨", "la madre|الأم|👩", "el hermano|الأخ|👦", "la hermana|الأخت|👧", "el hijo|الابن|🧒", "la hija|البنت|👧", "el abuelo|الجد|👴", "la abuela|الجدة|👵", "el esposo|الزوج|🤵", "la esposa|الزوجة|👰", "el tío|العم / الخال|🧔", "el primo|ابن العم / ابن الخال|🧑"],
  g: { t: "ضمائر الملكية mi، tu، su", b: ["mi = ـي (mi padre أبي)، tu = ـك (tu madre أمك)، su = ـه/ـها/ـك باحترام/ـهم (su hijo).", "في الجمع تضيف s: mis padres (والداي)، tus hermanos (إخوتك).", "nuestro/nuestra = ـنا ويتبع جنس الشيء المملوك: nuestra casa، nuestro padre.", "los padres تعني «الوالدان» وليس «الآباء» فقط."], ex: ["Mi madre se llama Aisha.|أمي اسمها عائشة.", "¿Cómo se llama tu hermano?|ما اسم أخيك؟", "Nuestros abuelos viven en Asuán.|أجدادنا يعيشون في أسوان."] },
  s: ["Tengo una familia grande.|عندي عائلة كبيرة.", "Mi padre es profesor.|أبي معلم.", "Mis padres viven en Jeddah.|والداي يعيشان في جدة.", "Mi hermana tiene dos hijos.|أختي عندها ولدان.", "Quiero mucho a mi abuela.|أحب جدتي كثيرًا.", "¿Estás casado?|هل أنت متزوج؟"],
  d: ["A:¿Tienes una familia grande?|هل عائلتك كبيرة؟", "B:Sí, tengo cuatro hermanos y dos hermanas.|نعم، عندي أربعة إخوة وأختان.", "A:¡Qué bien! ¿Estás casado?|رائع! هل أنت متزوج؟", "B:Sí, mi esposa se llama Mariam.|نعم، زوجتي اسمها مريم.", "A:¿Tenéis hijos?|هل عندكما أولاد؟", "B:Sí, una hija pequeña.|نعم، بنت صغيرة."],
  tip: "الأسرة عند الناطقين بالإسبانية مهمة جدًا؛ والسؤال عن العائلة مدخل لطيف لأي حديث."
},
{
  id: "a1-05", lv: "A1", ic: "📚", t: "Las cosas: género y número", tar: "الأشياء: التذكير والتأنيث والجمع",
  goal: "أن تسمّي الأشياء حولك مع أداة التعريف والتنكير الصحيحة.",
  w: ["el libro|الكتاب|📖", "la mesa|الطاولة|🪑", "la silla|الكرسي|💺", "la puerta|الباب|🚪", "la ventana|النافذة|🪟", "el coche|السيارة|🚗", "el teléfono|الهاتف|📱", "la llave|المفتاح|🔑", "el bolígrafo|القلم|🖊️", "la casa|البيت|🏠", "el reloj|الساعة|⌚", "la bolsa|الحقيبة|👜"],
  g: { t: "el / la / los / las — un / una / unos / unas", b: ["كل اسم في الإسبانية مذكر أو مؤنث. غالبًا ما ينتهي بـ ‑o مذكر، وما ينتهي بـ ‑a مؤنث. ومن الاستثناءات: el día، el mapa، la mano.", "أداة التعريف: el (مذكر مفرد)، la (مؤنث مفرد)، los (مذكر جمع)، las (مؤنث جمع).", "أداة التنكير: un، una، unos، unas.", "الجمع: نضيف ‑s بعد الحرف الصوتي (libro → libros)، و‑es بعد الساكن (reloj → relojes)."], ex: ["el libro → los libros|الكتاب ← الكتب", "una mesa → unas mesas|طاولة ← بعض الطاولات", "el día, la mano|اليوم، اليد (استثناءان)"] },
  s: ["El libro está en la mesa.|الكتاب على الطاولة.", "Tengo un coche blanco.|عندي سيارة بيضاء.", "¿Dónde están las llaves?|أين المفاتيح؟", "La puerta está abierta.|الباب مفتوح.", "Necesito un bolígrafo, por favor.|أحتاج قلمًا من فضلك.", "Hay tres sillas en la clase.|توجد ثلاثة كراسٍ في الفصل."],
  d: ["A:Perdón, ¿tienes un bolígrafo?|عذرًا، هل عندك قلم؟", "B:Sí, aquí tienes.|نعم، تفضل.", "A:Gracias. ¿Y un papel?|شكرًا. وورقة؟", "B:Lo siento, no tengo papel.|آسف، ليس عندي ورق.", "A:No pasa nada.|لا بأس."],
  tip: "احفظ كل اسم مع أداته (la mesa وليس mesa فقط)؛ فهذا يوفر عليك أخطاء كثيرة لاحقًا."
},
{
  id: "a1-06", lv: "A1", ic: "🎨", t: "Colores y descripciones", tar: "الألوان والوصف",
  goal: "أن تصف الأشياء والأشخاص بالألوان والصفات البسيطة.",
  w: ["rojo|أحمر|🔴", "azul|أزرق|🔵", "verde|أخضر|🟢", "amarillo|أصفر|🟡", "blanco|أبيض|⚪", "negro|أسود|⚫", "grande|كبير|🐘", "pequeño|صغير|🐭", "bonito|جميل|🌸", "nuevo|جديد|✨", "viejo|قديم / كبير السن|🏚️", "alto|طويل|🦒"],
  g: { t: "الصفة تأتي بعد الاسم وتطابقه", b: ["الصفة غالبًا بعد الاسم: una casa blanca (بيت أبيض).", "تطابق الصفة الاسم في التذكير والتأنيث والجمع: el coche rojo، la flor roja، los coches rojos، las flores rojas.", "الصفات المنتهية بـ ‑e أو بحرف ساكن لا تتغير بين المذكر والمؤنث: un hombre grande، una mujer grande؛ un coche azul، una camisa azul."], ex: ["Mi casa es pequeña y bonita.|بيتي صغير وجميل.", "Los ojos de mi hijo son negros.|عينا ابني سوداوان.", "Quiero una camisa verde.|أريد قميصًا أخضر."] },
  s: ["El cielo es azul.|السماء زرقاء.", "Mi coche es viejo pero bueno.|سيارتي قديمة لكنها جيدة.", "La manzana es roja.|التفاحة حمراء.", "Mi hermano es alto.|أخي طويل.", "Es una ciudad muy bonita.|إنها مدينة جميلة جدًا.", "¿De qué color es tu bolsa?|ما لون حقيبتك؟"],
  d: ["A:¿De qué color es tu coche nuevo?|ما لون سيارتك الجديدة؟", "B:Es blanco.|بيضاء.", "A:¿Es grande?|هل هي كبيرة؟", "B:No, es pequeño, pero muy cómodo.|لا، صغيرة لكنها مريحة جدًا.", "A:¡Qué bien!|رائع!"],
  tip: "viejo عن الأشخاص قد تكون جارحة؛ قل mayor: Mi abuelo es mayor."
},
{
  id: "a1-07", lv: "A1", ic: "📍", t: "¿Dónde está?", tar: "أين يوجد؟ الأماكن",
  goal: "أن تسأل عن مكان وتصف الموقع بالقرب والبعد.",
  w: ["la mezquita|المسجد|🕌", "la escuela|المدرسة|🏫", "el hospital|المستشفى|🏥", "el mercado|السوق|🛒", "la calle|الشارع|🛣️", "el banco|البنك|🏦", "la farmacia|الصيدلية|💊", "el parque|الحديقة العامة|🌳", "cerca|قريب|📏", "lejos|بعيد|🛤️", "aquí|هنا|👇", "allí|هناك|👉"],
  g: { t: "الفعل estar للموقع والحالة، وhay للوجود", b: ["estar: estoy، estás، está، estamos، estáis، están.", "نستعمل estar للموقع: La mezquita está cerca. وللحالة المؤقتة: Estoy cansado.", "نستعمل ser للصفات الثابتة والهوية: La mezquita es grande.", "hay = يوجد/توجد (للمفرد والجمع): Hay un banco en esta calle."], ex: ["¿Dónde está el hospital?|أين المستشفى؟", "Está a la derecha del banco.|إنه على يمين البنك.", "¿Hay una farmacia por aquí?|هل توجد صيدلية هنا قريبًا؟"] },
  s: ["La mezquita está cerca de mi casa.|المسجد قريب من بيتي.", "El mercado está lejos.|السوق بعيد.", "Estoy en la escuela.|أنا في المدرسة.", "Hay un parque grande aquí.|توجد حديقة كبيرة هنا.", "¿Está abierto el banco?|هل البنك مفتوح؟", "Mis amigos están allí.|أصدقائي هناك."],
  d: ["A:Perdón, ¿hay una mezquita por aquí?|عذرًا، هل يوجد مسجد هنا قريبًا؟", "B:Sí, está en la calle Mayor.|نعم، في شارع مايور.", "A:¿Está lejos?|هل هو بعيد؟", "B:No, está muy cerca, a cinco minutos.|لا، قريب جدًا، على بعد خمس دقائق.", "A:Muchas gracias.|شكرًا جزيلًا.", "B:De nada.|عفوًا."],
  tip: "الفرق بين ser وestar من أهم دروس الإسبانية: es aburrido (مملّ بطبعه) و está aburrido (يشعر بالملل الآن)."
},
{
  id: "a1-08", lv: "A1", ic: "🍽️", t: "Comida y bebida", tar: "الطعام والشراب",
  goal: "أن تسمّي الأطعمة وتصرّف الأفعال المنتظمة في المضارع.",
  w: ["el agua|الماء|💧", "el pan|الخبز|🍞", "el arroz|الأرز|🍚", "el pollo|الدجاج|🍗", "el pescado|السمك (طعامًا)|🐟", "la fruta|الفاكهة|🍇", "la manzana|التفاحة|🍎", "la leche|الحليب|🥛", "el café|القهوة|☕", "el té|الشاي|🍵", "comer|يأكل|🍴", "beber|يشرب|🥤"],
  g: { t: "تصريف الأفعال المنتظمة في المضارع (-ar، -er، -ir)", b: ["احذف النهاية وأضف: ‑ar (hablar): hablo، hablas، habla، hablamos، habláis، hablan.", "‑er (comer): como، comes، come، comemos، coméis، comen.", "‑ir (vivir): vivo، vives، vive، vivimos، vivís، viven.", "el agua مؤنثة رغم el؛ لأنها تبدأ بـ a منبورة: el agua fría."], ex: ["Como arroz con pollo.|آكل أرزًا بالدجاج.", "¿Bebes café o té?|هل تشرب قهوة أم شايًا؟", "No comemos cerdo.|لا نأكل لحم الخنزير."] },
  s: ["Bebo agua todos los días.|أشرب الماء كل يوم.", "Me gusta la fruta.|أحب الفاكهة.", "¿Qué comes en el desayuno?|ماذا تأكل في الفطور؟", "Mi madre cocina muy bien.|أمي تطبخ جيدًا جدًا.", "Un té con leche, por favor.|شاي بالحليب من فضلك.", "No como carne de cerdo; soy musulmán.|لا آكل لحم الخنزير؛ أنا مسلم."],
  d: ["A:¿Qué quieres comer?|ماذا تريد أن تأكل؟", "B:Arroz con pescado. ¿Tiene cerdo?|أرز بالسمك. هل فيه خنزير؟", "A:No, no tiene cerdo.|لا، ليس فيه خنزير.", "B:Perfecto. Y un agua, por favor.|ممتاز. وماء من فضلك.", "A:¿Fría o natural?|باردة أم عادية؟", "B:Fría, gracias.|باردة، شكرًا."],
  tip: "عبارات مفيدة للمسلم: ¿Tiene cerdo? (فيه خنزير؟)، ¿Lleva alcohol? (فيه كحول؟)، carne halal (لحم حلال)."
},
{
  id: "a1-09", lv: "A1", ic: "⚽", t: "Me gusta", tar: "ما أحبه: الهوايات",
  goal: "أن تعبّر عما تحب وما لا تحب وتسأل الآخرين عن هواياتهم.",
  w: ["gustar|يُعجِب|❤️", "el deporte|الرياضة|🏅", "el fútbol|كرة القدم|⚽", "leer|يقرأ|📖", "nadar|يسبح|🏊", "viajar|يسافر|✈️", "cocinar|يطبخ|👨‍🍳", "la música|الموسيقى|🎵", "dibujar|يرسم|✏️", "caminar|يمشي|🚶", "el libro|الكتاب|📚", "la naturaleza|الطبيعة|🏞️"],
  g: { t: "الفعل gustar", b: ["gustar يعني «يُعجِب»، فالشيء المحبوب هو الفاعل: Me gusta el fútbol = تعجبني كرة القدم.", "الضمائر قبله: me (لي)، te (لك)، le (له/لها/لحضرتك)، nos، os، les.", "إذا كان المحبوب جمعًا: Me gustan los libros. وإن كان فعلًا: Me gusta leer.", "للنفي: No me gusta. وللتأكيد: A mí me gusta mucho."], ex: ["Me gusta viajar.|أحب السفر.", "¿Te gustan los gatos?|هل تحب القطط؟", "A mi padre le gusta caminar.|أبي يحب المشي."] },
  s: ["Me gusta mucho leer.|أحب القراءة كثيرًا.", "No me gusta el frío.|لا أحب البرد.", "¿Qué te gusta hacer?|ماذا تحب أن تفعل؟", "Nos gusta la naturaleza.|نحب الطبيعة.", "Me encanta cocinar.|أعشق الطبخ.", "A mi hija le gustan los colores.|ابنتي تحب الألوان."],
  d: ["A:¿Qué te gusta hacer los fines de semana?|ماذا تحب أن تفعل في عطلة الأسبوع؟", "B:Me gusta jugar al fútbol y leer.|أحب لعب كرة القدم والقراءة.", "A:¿Qué libros te gustan?|أي الكتب تحب؟", "B:Me gustan los libros de historia.|أحب كتب التاريخ.", "A:¡A mí también!|وأنا أيضًا!"],
  tip: "للموافقة: A mí también (وأنا أيضًا) بعد الإثبات، وA mí tampoco (ولا أنا) بعد النفي."
},
{
  id: "a1-10", lv: "A1", ic: "🕒", t: "La hora y los días", tar: "الساعة وأيام الأسبوع",
  goal: "أن تسأل عن الوقت وتحدد موعدًا بالأيام والساعات.",
  w: ["lunes|الاثنين|1️⃣", "martes|الثلاثاء|2️⃣", "miércoles|الأربعاء|3️⃣", "jueves|الخميس|4️⃣", "viernes|الجمعة|🕌", "sábado|السبت|6️⃣", "domingo|الأحد|7️⃣", "la hora|الساعة (الوقت)|🕒", "hoy|اليوم|📅", "mañana|غدًا / الصباح|🌄", "la semana|الأسبوع|🗓️", "temprano|مبكرًا|⏰"],
  g: { t: "¿Qué hora es? — Es la una / Son las dos", b: ["للساعة الواحدة: Es la una. ولما بعدها: Son las dos، Son las tres...", "y cuarto (وربع)، y media (ونصف)، menos cuarto (إلا ربعًا): Son las cuatro y media.", "للموعد: ¿A qué hora...? — A las ocho.", "de la mañana (صباحًا)، de la tarde (بعد الظهر)، de la noche (ليلًا).", "أيام الأسبوع تُكتب بحروف صغيرة: el lunes (يوم الاثنين)، los lunes (كل اثنين)."], ex: ["Son las diez y cuarto.|الساعة العاشرة والربع.", "La clase es a las cinco de la tarde.|الدرس في الخامسة مساءً.", "Los viernes voy a la mezquita.|أذهب إلى المسجد كل جمعة."] },
  s: ["¿Qué hora es?|كم الساعة؟", "Es la una y media.|الساعة الواحدة والنصف.", "Hoy es jueves.|اليوم الخميس.", "Mañana trabajo temprano.|غدًا أعمل مبكرًا.", "¿A qué hora abre la tienda?|متى يفتح المتجر؟", "Nos vemos el sábado.|نلتقي يوم السبت."],
  d: ["A:¿Qué hora es, por favor?|كم الساعة من فضلك؟", "B:Son las once menos cuarto.|الحادية عشرة إلا ربعًا.", "A:¡Uy! Tengo una cita a las once.|أوه! عندي موعد في الحادية عشرة.", "B:¿Dónde es la cita?|أين الموعد؟", "A:Aquí cerca. Gracias.|قريب من هنا. شكرًا."],
  tip: "mañana تعني «غدًا» و«الصباح»: mañana por la mañana = غدًا صباحًا."
},
{
  id: "a1-11", lv: "A1", ic: "🛏️", t: "La rutina diaria", tar: "الروتين اليومي",
  goal: "أن تصف يومك من الاستيقاظ إلى النوم بالأفعال الانعكاسية.",
  w: ["levantarse|يستيقظ / ينهض|🛏️", "ducharse|يستحم|🚿", "desayunar|يفطر|🥐", "trabajar|يعمل|💼", "estudiar|يدرس|📝", "almorzar|يتغدى|🍲", "cenar|يتعشى|🍽️", "dormir|ينام|😴", "rezar|يصلي|🤲", "volver|يرجع|🔙", "siempre|دائمًا|♾️", "a veces|أحيانًا|🔁"],
  g: { t: "الأفعال الانعكاسية وتغيّر الجذر", b: ["الفعل الانعكاسي ينتهي بـ ‑se ويأخذ ضميرًا قبله: me levanto، te levantas، se levanta، nos levantamos، os levantáis، se levantan.", "بعض الأفعال يتغير جذرها في المضارع: dormir → duermo، almorzar → almuerzo، volver → vuelvo (o → ue).", "يبقى الجذر دون تغيير مع nosotros وvosotros: dormimos، volvemos.", "لترتيب الأحداث: primero (أولًا)، después (بعد ذلك)، luego (ثم)، por último (أخيرًا)."], ex: ["Me levanto a las cinco para rezar.|أستيقظ في الخامسة لأصلي.", "Después desayuno con mi familia.|بعد ذلك أفطر مع عائلتي.", "Duermo ocho horas.|أنام ثماني ساعات."] },
  s: ["Me levanto temprano.|أستيقظ مبكرًا.", "Me ducho por la mañana.|أستحم في الصباح.", "Trabajo de nueve a cinco.|أعمل من التاسعة إلى الخامسة.", "Almuerzo a las dos.|أتغدى في الثانية.", "Rezo cinco veces al día.|أصلي خمس مرات في اليوم.", "A veces ceno tarde.|أحيانًا أتعشى متأخرًا."],
  d: ["A:¿A qué hora te levantas?|متى تستيقظ؟", "B:A las cinco, para la oración del alba.|في الخامسة، لصلاة الفجر.", "A:¡Qué temprano! ¿Y después?|مبكرًا جدًا! وبعد ذلك؟", "B:Desayuno y voy al trabajo.|أفطر وأذهب إلى العمل.", "A:¿Y por la noche?|وفي الليل؟", "B:Ceno con mi familia y leo un poco.|أتعشى مع عائلتي وأقرأ قليلًا."],
  tip: "في إسبانيا الغداء متأخر (2–3 ظهرًا) والعشاء متأخر (9–10 ليلًا)."
},
{
  id: "a1-12", lv: "A1", ic: "🛍️", t: "De compras", tar: "التسوق",
  goal: "أن تسأل عن السعر والمقاس وتدفع بطريقة مهذبة.",
  w: ["¿cuánto cuesta?|كم السعر؟|💲", "el euro|اليورو|💶", "barato|رخيص|🏷️", "caro|غالٍ|💎", "la tienda|المتجر|🏪", "la camisa|القميص|👔", "el pantalón|البنطال|👖", "los zapatos|الحذاء|👞", "la talla|المقاس|📏", "pagar|يدفع|💳", "en efectivo|نقدًا|💵", "con tarjeta|بالبطاقة|💳"],
  g: { t: "أسماء الإشارة: este، ese، aquel", b: ["este/esta (هذا/هذه — قريب منك)، ese/esa (ذلك/تلك — قريب من المخاطب)، aquel/aquella (ذاك — بعيد عنكما).", "الجمع: estos/estas، esos/esas، aquellos/aquellas.", "الأرقام بالعشرات: treinta (30)، cuarenta، cincuenta، sesenta، setenta، ochenta، noventa، cien (100).", "بين العشرات والآحاد نضع y: treinta y cinco (35)."], ex: ["¿Cuánto cuesta esta camisa?|كم سعر هذا القميص؟", "Esos zapatos son muy caros.|ذلك الحذاء غالٍ جدًا.", "Cuesta cuarenta y nueve euros.|سعره تسعة وأربعون يورو."] },
  s: ["¿Cuánto cuesta este pantalón?|كم سعر هذا البنطال؟", "Es muy caro. ¿Tiene algo más barato?|غالٍ جدًا. هل عندك شيء أرخص؟", "¿Tiene la talla M?|هل عندك المقاس M؟", "¿Puedo probármelo?|هل أستطيع تجربته؟", "¿Puedo pagar con tarjeta?|هل أستطيع الدفع بالبطاقة؟", "Me lo llevo.|سآخذه."],
  d: ["A:Buenos días. ¿Puedo ayudarle?|صباح الخير. هل أستطيع مساعدتك؟", "B:Sí, busco una camisa blanca.|نعم، أبحث عن قميص أبيض.", "A:¿Qué talla usa?|ما مقاسك؟", "B:La talla L. ¿Cuánto cuesta esta?|المقاس L. كم سعر هذا؟", "A:Veinticinco euros.|خمسة وعشرون يورو.", "B:Perfecto, me la llevo. ¿Puedo pagar en efectivo?|ممتاز، سآخذه. هل أدفع نقدًا؟", "A:Claro que sí.|بالتأكيد."],
  tip: "في متاجر إسبانيا لا تُعدّ المساومة عادة؛ لكنها مقبولة في الأسواق الشعبية (el mercadillo)."
}
]);
