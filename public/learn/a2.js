/* تعلّم الإسبانية — المستوى A2 (أساسي) */
window.LEARN = window.LEARN || {};
LEARN.UNITS = (LEARN.UNITS || []).concat([
{
  id: "a2-01", lv: "A2", ic: "🩺", t: "El cuerpo y la salud", tar: "الجسم والصحة",
  goal: "أن تصف ما يؤلمك عند الطبيب أو في الصيدلية.",
  w: ["la cabeza|الرأس|🧠", "la mano|اليد|✋", "el pie|القدم|🦶", "el estómago|المعدة|🫃", "la espalda|الظهر|🧍", "los ojos|العينان|👀", "el médico|الطبيب|🧑‍⚕️", "la fiebre|الحُمّى|🤒", "la pastilla|الحبّة (دواء)|💊", "enfermo|مريض|🤧", "la cita|الموعد|📅", "doler|يؤلم|🤕"],
  g: { t: "الفعل doler (يؤلم) مثل gustar", b: ["doler يعمل مثل gustar: Me duele la cabeza = يؤلمني رأسي.", "إذا كان العضو جمعًا: Me duelen los pies.", "يتغير جذره o → ue: duele، duelen.", "مع أعضاء الجسم نستعمل أداة التعريف لا الملكية: Me duele la espalda (لا mi espalda).", "tener + اسم: tengo fiebre، tengo tos (سعال)، tengo gripe (زكام)."], ex: ["Me duele mucho el estómago.|تؤلمني معدتي كثيرًا.", "A mi hijo le duelen los oídos.|ابني تؤلمه أذناه.", "Tengo fiebre desde ayer.|عندي حمى منذ أمس."] },
  s: ["No me siento bien.|لا أشعر أنني بخير.", "Necesito ver a un médico.|أحتاج أن أرى طبيبًا.", "¿Tiene algo para el dolor de cabeza?|هل عندك شيء لصداع الرأس؟", "Tome una pastilla cada ocho horas.|خذ حبة كل ثماني ساعات.", "¿Es usted alérgico a algo?|هل لديك حساسية من شيء؟", "Quiero pedir una cita.|أريد أن أحجز موعدًا."],
  d: ["A:Buenos días, ¿qué le pasa?|صباح الخير، ما بك؟", "B:Me duele la garganta y tengo fiebre.|يؤلمني حلقي وعندي حمى.", "A:¿Desde cuándo?|منذ متى؟", "B:Desde hace dos días.|منذ يومين.", "A:Es una gripe. Beba mucha agua y descanse.|إنه زكام. اشرب ماءً كثيرًا واسترح.", "B:¿Necesito alguna medicina?|هل أحتاج دواءً؟", "A:Sí, tome este jarabe tres veces al día.|نعم، خذ هذا الشراب ثلاث مرات يوميًا."],
  tip: "رقم الطوارئ في إسبانيا ودول الاتحاد الأوروبي 112، وفي المكسيك 911."
},
{
  id: "a2-02", lv: "A2", ic: "🌦️", t: "El tiempo y las estaciones", tar: "الطقس والفصول",
  goal: "أن تتحدث عن الطقس والفصول وتخطط وفقها.",
  w: ["el sol|الشمس|☀️", "la lluvia|المطر|🌧️", "la nieve|الثلج|❄️", "el viento|الريح|💨", "la nube|الغيمة|☁️", "el calor|الحر|🥵", "el frío|البرد|🥶", "el verano|الصيف|🏖️", "el invierno|الشتاء|⛄", "la primavera|الربيع|🌷", "el otoño|الخريف|🍂", "llover|يمطر|☔"],
  g: { t: "hace / hay / está للطقس", b: ["hace + اسم: hace calor، hace frío، hace sol، hace viento، hace buen tiempo.", "أفعال الطقس: llueve (تمطر)، nieva (تثلج).", "está + صفة: está nublado (غائم)، está despejado (صافٍ).", "muy مع الصفات والظروف: muy frío؛ وmucho مع الأسماء: hace mucho calor."], ex: ["Hoy hace mucho calor.|اليوم الجو حار جدًا.", "En invierno llueve mucho en Galicia.|في الشتاء تمطر كثيرًا في غاليسيا.", "El cielo está nublado.|السماء غائمة."] },
  s: ["¿Qué tiempo hace hoy?|كيف الطقس اليوم؟", "Hace buen tiempo.|الجو جميل.", "En Makkah hace calor casi todo el año.|في مكة الجو حار تقريبًا طوال العام.", "Mi estación favorita es la primavera.|فصلي المفضل الربيع.", "Lleva un paraguas, va a llover.|خذ مظلة، ستمطر.", "Hace demasiado frío para salir.|الجو بارد جدًا للخروج."],
  d: ["A:¿Qué tiempo hace en tu ciudad?|كيف الطقس في مدينتك؟", "B:Ahora hace mucho calor, unos cuarenta grados.|الآن حار جدًا، نحو أربعين درجة.", "A:¡Cuarenta! Aquí estamos a diez grados.|أربعون! نحن هنا عشر درجات.", "B:¿Nieva en tu ciudad?|هل يثلج في مدينتك؟", "A:Sí, a veces nieva en enero.|نعم، أحيانًا يثلج في يناير."],
  tip: "الفصول في أمريكا الجنوبية معكوسة: ديسمبر صيف في الأرجنتين وتشيلي."
},
{
  id: "a2-03", lv: "A2", ic: "🧭", t: "Direcciones y transporte", tar: "الاتجاهات والمواصلات",
  goal: "أن تسأل عن الطريق وتفهم الإرشادات وتستعمل المواصلات.",
  w: ["a la derecha|إلى اليمين|➡️", "a la izquierda|إلى اليسار|⬅️", "todo recto|إلى الأمام مباشرة|⬆️", "la esquina|الزاوية / الناصية|📐", "el semáforo|إشارة المرور|🚦", "el autobús|الحافلة|🚌", "el metro|المترو|🚇", "el tren|القطار|🚆", "el avión|الطائرة|✈️", "el billete|التذكرة|🎫", "la estación|المحطة|🚉", "girar|ينعطف|↪️"],
  g: { t: "صيغة الأمر للإرشاد (tú وusted)", b: ["أمر tú للأفعال المنتظمة = صيغة él في المضارع: gira، sigue، toma، cruza.", "أمر usted: نعكس الحرف الصوتي: ‑ar → ‑e (gire، tome، cruce)، و‑er/‑ir → ‑a (siga، suba).", "أوامر شاذة مهمة لـ tú: ve (اذهب)، ven (تعال)، haz (افعل)، pon (ضع)، sal (اخرج)، di (قل).", "حروف الجر: al lado de (بجانب)، enfrente de (مقابل)، entre (بين)، detrás de (خلف)."], ex: ["Gire a la derecha en el semáforo.|انعطف يمينًا عند الإشارة.", "Sigue todo recto y cruza la calle.|استمر مستقيمًا واعبر الشارع.", "La parada está enfrente del banco.|المحطة مقابل البنك."] },
  s: ["¿Cómo llego a la estación?|كيف أصل إلى المحطة؟", "Tome el metro, línea dos.|خذ المترو، الخط الثاني.", "¿Cuánto cuesta un billete de ida y vuelta?|كم سعر تذكرة ذهاب وعودة؟", "¿Este autobús va al centro?|هل هذه الحافلة تذهب إلى وسط المدينة؟", "Bájese en la tercera parada.|انزل في المحطة الثالثة.", "Está a diez minutos a pie.|على بعد عشر دقائق مشيًا."],
  d: ["A:Perdone, ¿cómo llego a la Mezquita de Córdoba?|عذرًا، كيف أصل إلى جامع قرطبة؟", "B:Siga todo recto y gire a la izquierda en la segunda calle.|استمر مستقيمًا وانعطف يسارًا في الشارع الثاني.", "A:¿Está lejos?|هل هو بعيد؟", "B:No, unos quince minutos andando.|لا، نحو ربع ساعة مشيًا.", "A:¿Y hay autobús?|وهل توجد حافلة؟", "B:Sí, el número tres para enfrente del parque.|نعم، رقم ثلاثة يقف مقابل الحديقة."],
  tip: "في إسبانيا «coger el autobús» عادية، لكن تجنّب الفعل coger في المكسيك والأرجنتين واستعمل tomar."
},
{
  id: "a2-04", lv: "A2", ic: "🏠", t: "En casa", tar: "في البيت",
  goal: "أن تصف بيتك وغرفه وتتحدث عن أعمال المنزل.",
  w: ["la cocina|المطبخ|🍳", "el dormitorio|غرفة النوم|🛏️", "el baño|الحمّام|🛁", "el salón|غرفة المعيشة|🛋️", "la cama|السرير|🛌", "la nevera|الثلاجة|🧊", "el sofá|الأريكة|🛋️", "la lavadora|الغسالة|🧺", "limpiar|ينظّف|🧽", "ordenar|يرتّب|🗂️", "el piso|الشقة / الطابق|🏢", "el alquiler|الإيجار|🔑"],
  g: { t: "hay مقابل está/están", b: ["hay للحديث عن وجود شيء غير معروف (مع un/una أو الأعداد أو بلا أداة): En la cocina hay una nevera.", "está/están لمكان شيء محدد معروف (مع el/la/mi): La nevera está en la cocina.", "لا تقل «hay la nevera» ✗.", "تعبير الالتزام: tener que + مصدر = يجب عليّ: Tengo que limpiar mi cuarto."], ex: ["En mi piso hay dos dormitorios.|في شقتي غرفتا نوم.", "El sofá está en el salón.|الأريكة في غرفة المعيشة.", "Tengo que ordenar la cocina.|يجب أن أرتب المطبخ."] },
  s: ["Mi piso es pequeño pero cómodo.|شقتي صغيرة لكنها مريحة.", "¿Cuántas habitaciones tiene la casa?|كم غرفة في البيت؟", "Hay una lavadora en el baño.|توجد غسالة في الحمّام.", "Los sábados limpiamos la casa.|ننظّف البيت كل سبت.", "¿Cuánto es el alquiler al mes?|كم الإيجار في الشهر؟", "Mi dormitorio tiene mucha luz.|غرفة نومي فيها ضوء كثير."],
  d: ["A:Hola, llamo por el piso del anuncio.|مرحبًا، أتصل بخصوص الشقة في الإعلان.", "B:Sí, dígame.|نعم، تفضل.", "A:¿Cuántos dormitorios tiene?|كم غرفة نوم فيها؟", "B:Tiene dos dormitorios, un baño y una cocina grande.|فيها غرفتا نوم وحمّام ومطبخ كبير.", "A:¿Y cuánto es el alquiler?|وكم الإيجار؟", "B:Ochocientos euros al mes.|ثمانمائة يورو في الشهر.", "A:¿Puedo verlo mañana?|هل أستطيع رؤيتها غدًا؟"],
  tip: "piso في إسبانيا = شقة، وفي أمريكا اللاتينية يقولون departamento أو apartamento."
},
{
  id: "a2-05", lv: "A2", ic: "🧳", t: "¿Qué hiciste? (pretérito indefinido)", tar: "ماذا فعلت؟ الماضي التام",
  goal: "أن تحكي ما فعلته أمس أو في رحلة سابقة.",
  w: ["ayer|أمس|⏮️", "anoche|ليلة أمس|🌃", "la semana pasada|الأسبوع الماضي|🗓️", "el año pasado|العام الماضي|📆", "hace dos días|منذ يومين|⏳", "viajar|يسافر|🧳", "visitar|يزور|🏛️", "comprar|يشتري|🛍️", "conocer|يتعرّف على|🤝", "llegar|يصل|🛬", "salir|يخرج / يغادر|🚪", "el viaje|الرحلة|🗺️"],
  g: { t: "الماضي البسيط (indefinido) لحدث منتهٍ", b: ["‑ar (viajar): viajé، viajaste، viajó، viajamos، viajasteis، viajaron.", "‑er/‑ir (comer/salir): comí، comiste، comió، comimos، comisteis، comieron.", "شواذ مهمة: ir وser لهما الصيغة نفسها: fui، fuiste، fue، fuimos، fuisteis، fueron.", "hacer: hice، hiciste، hizo، hicimos، hicisteis، hicieron. tener: tuve... estar: estuve...", "انتبه للنبرة: hablo (أتكلم) ≠ habló (تكلّم)."], ex: ["Ayer visité a mis abuelos.|أمس زرت جدّيّ.", "El año pasado fuimos a Granada.|العام الماضي ذهبنا إلى غرناطة.", "¿Qué hiciste el fin de semana?|ماذا فعلت في عطلة الأسبوع؟"] },
  s: ["Llegué a Madrid el lunes.|وصلت إلى مدريد يوم الاثنين.", "Compré un regalo para mi madre.|اشتريت هدية لأمي.", "Anoche cené con unos amigos.|ليلة أمس تعشيت مع بعض الأصدقاء.", "Fue un viaje fantástico.|كانت رحلة رائعة.", "Conocí a mucha gente.|تعرفت على أناس كثيرين.", "¿A qué hora saliste de casa?|في أي ساعة خرجت من البيت؟"],
  d: ["A:¿Qué hiciste en las vacaciones?|ماذا فعلت في الإجازة؟", "B:Fui a Andalucía con mi familia.|ذهبت إلى الأندلس مع عائلتي.", "A:¡Qué bonito! ¿Qué visitaste?|جميل! ماذا زرت؟", "B:Visité la Alhambra y la Mezquita de Córdoba.|زرت قصر الحمراء وجامع قرطبة.", "A:¿Te gustó?|هل أعجبك؟", "B:Me encantó. Aprendí mucho sobre la historia de al-Ándalus.|أعجبني جدًا. تعلمت الكثير عن تاريخ الأندلس."],
  tip: "الأفعال المنتهية بـ ‑car/‑gar/‑zar تتغير كتابتها مع yo: busqué، llegué، empecé."
},
{
  id: "a2-06", lv: "A2", ic: "🧸", t: "Cuando era niño (imperfecto)", tar: "عندما كنت صغيرًا: الماضي المستمر",
  goal: "أن تصف عاداتك في الماضي وكيف كانت الأشياء.",
  w: ["el niño|الطفل|🧒", "la infancia|الطفولة|🍼", "el pueblo|القرية / البلدة|🏘️", "jugar|يلعب|🪀", "el juguete|اللعبة|🧸", "el colegio|المدرسة الابتدائية|🏫", "a menudo|غالبًا|🔁", "todos los días|كل يوم|📅", "antes|في السابق|⏪", "ahora|الآن|⏺️", "recordar|يتذكّر|💭", "el vecino|الجار|🏡"],
  g: { t: "الماضي الناقص (imperfecto) للعادات والوصف", b: ["‑ar (jugar): jugaba، jugabas، jugaba، jugábamos، jugabais، jugaban.", "‑er/‑ir (vivir): vivía، vivías، vivía، vivíamos، vivíais، vivían.", "ثلاثة شواذ فقط: ser (era...)، ir (iba...)، ver (veía...).", "يُستعمل للعادات المتكررة (كنت ألعب) ولوصف الماضي (كان الجو جميلًا، كنت سعيدًا)."], ex: ["Cuando era niño, vivía en un pueblo.|عندما كنت صغيرًا كنت أعيش في قرية.", "Jugábamos al fútbol todos los días.|كنا نلعب كرة القدم كل يوم.", "Mi abuelo era muy simpático.|كان جدي لطيفًا جدًا."] },
  s: ["Antes no hablaba español.|في السابق لم أكن أتكلم الإسبانية.", "Mi madre me contaba historias.|كانت أمي تحكي لي قصصًا.", "Íbamos al mar en verano.|كنا نذهب إلى البحر في الصيف.", "La casa tenía un jardín grande.|كان للبيت حديقة كبيرة.", "Recuerdo que siempre llovía.|أتذكر أنها كانت تمطر دائمًا.", "¿Qué querías ser de pequeño?|ماذا كنت تريد أن تصبح في صغرك؟"],
  d: ["A:¿Dónde vivías cuando eras pequeño?|أين كنت تعيش في صغرك؟", "B:Vivía en un pueblo cerca del Nilo.|كنت أعيش في قرية قرب النيل.", "A:¿Y qué hacías después del colegio?|وماذا كنت تفعل بعد المدرسة؟", "B:Jugaba con mis primos y ayudaba a mi padre.|كنت ألعب مع أبناء عمومتي وأساعد أبي.", "A:¡Qué infancia tan bonita!|يا لها من طفولة جميلة!"],
  tip: "قاعدة سهلة: إن صحّ أن تقول بالعربية «كنتُ أفعل» فاستعمل imperfecto."
},
{
  id: "a2-07", lv: "A2", ic: "🗓️", t: "Planes y futuro", tar: "الخطط والمستقبل",
  goal: "أن تتحدث عن خططك القريبة والبعيدة.",
  w: ["el plan|الخطة|📋", "el próximo año|العام القادم|➡️", "el fin de semana|عطلة الأسبوع|🎉", "las vacaciones|الإجازة|🏝️", "pensar|يفكّر / ينوي|🤔", "esperar|يأمل / ينتظر|🙏", "quizás|ربما|🤷", "seguro|بالتأكيد|✔️", "aprender|يتعلّم|🎓", "empezar|يبدأ|🚀", "terminar|ينهي|🏁", "el sueño|الحلم|🌠"],
  g: { t: "ir a + مصدر، والمستقبل البسيط", b: ["ir a + مصدر لخطة قريبة مؤكدة: Voy a estudiar esta noche.", "المستقبل البسيط: نضيف إلى المصدر كاملًا: ‑é، ‑ás، ‑á، ‑emos، ‑éis، ‑án: hablaré، comerás، vivirá.", "جذور شاذة: tener → tendré، hacer → haré، poder → podré، salir → saldré، decir → diré، venir → vendré.", "pensar + مصدر = ينوي: Pienso viajar en julio. ومع ojalá نعبّر عن الأمل."], ex: ["Voy a aprender español este año.|سأتعلم الإسبانية هذا العام.", "El próximo verano iremos a México.|الصيف القادم سنذهب إلى المكسيك.", "Mañana tendré más tiempo.|غدًا سيكون عندي وقت أكثر."] },
  s: ["¿Qué vas a hacer este fin de semana?|ماذا ستفعل في عطلة الأسبوع؟", "Voy a visitar a mi familia.|سأزور عائلتي.", "Pienso hacer la Umrah en Ramadán, si Dios quiere.|أنوي أداء العمرة في رمضان إن شاء الله.", "Quizás estudie en España.|ربما أدرس في إسبانيا.", "Te llamaré esta noche.|سأتصل بك الليلة.", "Mi sueño es hablar español con fluidez.|حلمي أن أتكلم الإسبانية بطلاقة."],
  d: ["A:¿Tienes planes para el verano?|هل عندك خطط للصيف؟", "B:Sí, voy a hacer un curso de español en Salamanca.|نعم، سألتحق بدورة إسبانية في سلامنكا.", "A:¡Genial! ¿Cuánto tiempo vas a estar allí?|رائع! كم ستبقى هناك؟", "B:Un mes. Después viajaré a Granada.|شهرًا. بعدها سأسافر إلى غرناطة.", "A:Seguro que aprenderás mucho.|بالتأكيد ستتعلم الكثير."],
  tip: "«Si Dios quiere» و«Ojalá» (من «لو شاء الله») مستعملتان بكثرة في الإسبانية، فكلمة ojalá أصلها عربي."
},
{
  id: "a2-08", lv: "A2", ic: "💼", t: "Trabajo y profesiones", tar: "العمل والمهن",
  goal: "أن تتحدث عن عملك ومهنتك ومكان عملك.",
  w: ["el trabajo|العمل|💼", "la oficina|المكتب|🏢", "la empresa|الشركة|🏭", "el profesor / la profesora|المعلم / المعلمة|👩‍🏫", "el ingeniero|المهندس|👷", "el enfermero|الممرض|🧑‍⚕️", "el contable|المحاسب|🧮", "el conductor|السائق|🚕", "el jefe|المدير / الرئيس|🧑‍💼", "el sueldo|الراتب|💰", "la reunión|الاجتماع|👥", "el horario|جدول الدوام|🕘"],
  g: { t: "المهن بين التذكير والتأنيث، وsoy بلا أداة", b: ["‑o → ‑a: el médico / la médica، el abogado / la abogada.", "‑or → ‑ora: el profesor / la profesora، el conductor / la conductora.", "‑ista و‑e غالبًا لا تتغير: el/la periodista، el/la estudiante.", "مع ser نذكر المهنة دون أداة: Soy enfermero (لا «soy un enfermero»).", "للسؤال: ¿A qué te dedicas? = ما عملك؟"], ex: ["¿A qué te dedicas?|ما عملك؟", "Soy contable en una empresa de transporte.|أنا محاسب في شركة نقل.", "Mi hermana es ingeniera.|أختي مهندسة."] },
  s: ["Trabajo en una oficina en el centro.|أعمل في مكتب في وسط المدينة.", "Mi horario es de ocho a tres.|دوامي من الثامنة إلى الثالثة.", "Tengo una reunión a las diez.|عندي اجتماع في العاشرة.", "Me gusta mi trabajo porque ayudo a la gente.|أحب عملي لأنني أساعد الناس.", "Busco trabajo de conductor.|أبحث عن عمل سائق.", "Mi jefe es muy amable.|مديري لطيف جدًا."],
  d: ["A:¿A qué te dedicas?|ما عملك؟", "B:Soy enfermero en un hospital.|أنا ممرض في مستشفى.", "A:¡Qué interesante! ¿Trabajas de noche?|مثير! هل تعمل ليلًا؟", "B:A veces. Tengo turnos de mañana y de noche.|أحيانًا. عندي مناوبات صباحية وليلية.", "A:¿Te gusta?|هل تحبه؟", "B:Sí, es cansado, pero me gusta ayudar.|نعم، متعب لكني أحب المساعدة."],
  tip: "عند السؤال المهذب عن العمل في سياق رسمي: ¿A qué se dedica usted?"
}
]);
