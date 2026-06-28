const toAr = s => String(s).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);

/* ── SIDEBAR ── */
const ham=document.getElementById('ham'), sb=document.getElementById('sidebar'),
      mainEl=document.getElementById('main'), ov=document.getElementById('overlay');
let mob=window.innerWidth<=640;
ham.addEventListener('click',()=>{
  if(mob){sb.classList.toggle('mob-open');ov.classList.toggle('show')}
  else{sb.classList.toggle('hide');mainEl.classList.toggle('expand')}
});
ov.addEventListener('click',()=>{sb.classList.remove('mob-open');ov.classList.remove('show')});
window.addEventListener('resize',()=>{mob=window.innerWidth<=640});
document.querySelectorAll('.sb-item').forEach(el=>{
  el.addEventListener('click',()=>{
    document.querySelectorAll('.sb-item').forEach(i=>i.classList.remove('active'));
    el.classList.add('active');
    if(mob){sb.classList.remove('mob-open');ov.classList.remove('show')}
    if(el.dataset.p!=='home') openPage(el.dataset.p);
  });
});

/* ── CLOCK ── */
function tick(){
  const d=new Date();
  document.getElementById('clock').textContent=
    toAr(String(d.getHours()).padStart(2,'0'))+':'+
    toAr(String(d.getMinutes()).padStart(2,'0'))+':'+
    toAr(String(d.getSeconds()).padStart(2,'0'));
}
setInterval(tick,1000);tick();

/* ── DATES ── */
const MONTHS=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const now=new Date();
document.getElementById('gregDate').textContent='م '+toAr(now.getDate())+' '+MONTHS[now.getMonth()]+' '+toAr(now.getFullYear());
const COP_M=['توت','بابه','هاتور','كيهك','طوبه','أمشير','برمهات','برموده','بشنس','بؤونة','أبيب','مسرى','نسيء'];
(function(){
  const jd=d=>Math.floor(365.25*(d.getFullYear()+4716))+Math.floor(30.6001*(d.getMonth()+2))+d.getDate()-1524.5;
  const days=Math.floor(jd(now)-1825029.5);
  const cY=Math.floor(days/365.25)+1, doy=Math.floor(days%365);
  const cM=Math.min(Math.floor(doy/30),12), cD=(doy%30)+1;
  document.getElementById('copticDate').textContent=toAr(cD)+' '+COP_M[cM]+' '+toAr(cY)+' ش';
})();

/* ── PROGRESS BAR ── */
setTimeout(()=>{
  const done=12,total=365,pct=Math.round(done/total*100);
  document.getElementById('barFill').style.width=pct+'%';
  document.getElementById('planPct').textContent=toAr(pct)+'%';
  document.getElementById('barLbl').textContent=toAr(done)+' / '+toAr(total)+' يوم';
},700);

/* ── CHECKBOX ── */
function togChk(row){row.querySelector('.chk').classList.toggle('done')}

/* ── ROSARY STATE ── */
let rCount=0;
function updateRosary(){
  const el=document.getElementById('rCount');
  if(el) el.textContent=toAr(rCount);
  document.querySelectorAll('.bead').forEach((b,i)=>b.classList.toggle('done',i<rCount));
}
function incRosary(){if(rCount<41){rCount++;updateRosary()}}
function decRosary(){if(rCount>0){rCount--;updateRosary()}}
function rstRosary(){rCount=0;updateRosary()}

/* ── RADIO ── */
let playing=false;
function togglePlay(){
  playing=!playing;
  const btn=document.querySelector('.btn-play i');
  if(btn) btn.className=playing?'fas fa-pause':'fas fa-play';
  const sn=document.getElementById('stationNow');
  if(sn) sn.textContent=playing?'▶ الآن: تسبحة "كيرياليسون"':'⏸ متوقف — اضغط للتشغيل';
  document.querySelectorAll('.wave-bar').forEach(b=>{
    if(playing) b.classList.add('playing'); else b.classList.remove('playing');
  });
}

/* ── BIBLE HELPERS ── */
const OT=['التكوين','الخروج','اللاويين','العدد','التثنية','يشوع','القضاة','راعوث','صموئيل الأول','صموئيل الثاني','الملوك الأول','الملوك الثاني','المزامير','الأمثال','أيوب','إشعياء','إرميا','حزقيال','دانيال'];
const NT=['متى','مرقس','لوقا','يوحنا','أعمال الرسل','رومية','كورنثوس الأول','كورنثوس الثاني','غلاطية','أفسس','فيلبي','كولوسي','عبرانيين','يعقوب','بطرس الأول','يوحنا الأول','رؤيا يوحنا'];
const BTXT={
  'التكوين':[{n:1,t:'في البدء خلق الله السماوات والأرض.'},{n:2,t:'وكانت الأرض خربةً وخاليةً، وعلى وجه الغمر ظلمة، وروح الله يرفّ على وجه المياه.'},{n:3,t:'وقال الله: يكن نور. فكان نور.'},{n:4,t:'ورأى الله النور أنه حسن. وفصل الله بين النور والظلمة.'},{n:5,t:'ودعا الله النور نهاراً والظلمة دعاها ليلاً. وكان مساء وكان صباح: يوماً واحداً.'},{n:26,t:'وقال الله: نعمل الإنسان على صورتنا كشبهنا، فيتسلّطون على سمك البحر وعلى طير السماء وعلى كل الأرض.'},{n:27,t:'فخلق الله الإنسان على صورته، على صورة الله خلقه، ذكراً وأنثى خلقهم.'}],
  'المزامير':[{n:1,t:'الرب راعيَّ فلا يعوزني شيء.'},{n:2,t:'في مراعٍ خضراء يُربضني، إلى مياه الراحة يوردني.'},{n:3,t:'يردُّ نفسي. يهديني في سبل البرّ من أجل اسمه.'},{n:4,t:'أيضاً إن سلكت في وادي ظل الموت لا أخاف شرّاً، لأنك أنت معي. عصاك وعكازك هما يعزّيانني.'},{n:5,t:'تُعدُّ قُدّامي مائدةً في حضرة مُضايقيّ. مسحتَ بالدهن رأسي. كأسي ريّا.'},{n:6,t:'إنما خيراً ورحمةً يتبعانني كل أيام حياتي، وأسكن في بيت الرب إلى مدى الأيام.'}],
  'يوحنا':[{n:1,t:'في البدء كان الكلمة، والكلمة كان عند الله، وكان الكلمة الله.'},{n:2,t:'هذا كان في البدء عند الله.'},{n:3,t:'كل شيء به كان، وبغيره لم يكن شيء مما كان.'},{n:14,t:'والكلمة صار جسداً وحلّ بيننا، ورأينا مجده، مجداً كما لوحيدٍ من الآب، مملوءاً نعمةً وحقاً.'},{n:16,t:'لأنه هكذا أحبّ الله العالم حتى بذل ابنه الوحيد، لكي لا يهلك كل من يؤمن به بل تكون له الحياة الأبدية.'},{n:17,t:'لأنه لم يُرسل الله ابنه إلى العالم ليدين العالم بل ليخلص به العالم.'}],
  'متى':[{n:3,t:'طوبى للمساكين بالروح لأن لهم ملكوت السماوات.'},{n:4,t:'طوبى للحزانى لأنهم يتعزّون.'},{n:5,t:'طوبى للودعاء لأنهم يرثون الأرض.'},{n:6,t:'طوبى للجياع والعطاش إلى البر لأنهم يشبعون.'},{n:7,t:'طوبى للرحماء لأنهم يُرحَمون.'},{n:8,t:'طوبى للأنقياء القلب لأنهم يعاينون الله.'},{n:9,t:'طوبى لصانعي السلام لأنهم أبناء الله يُدعَون.'}],
};
function showBibleBooks(tab){
  document.querySelectorAll('.bible-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  const books=tab==='OT'?OT:NT;
  document.getElementById('booksGrid').innerHTML=books.map(b=>`<div class="book-btn" onclick="showBibleText('${b}')">${b}</div>`).join('');
  showBibleText(books[tab==='OT'?4:3]);
}
function showBibleText(book){
  document.querySelectorAll('.book-btn').forEach(b=>b.classList.toggle('active',b.textContent===book));
  const v=BTXT[book];
  document.getElementById('bibleText').innerHTML=v
    ?v.map(x=>`<div class="verse"><span class="v-num">${toAr(x.n)}</span>${x.t}</div>`).join('')
    :`<div style="color:var(--t3);text-align:center;padding:30px">سيُضاف هذا الكتاب قريباً…</div>`;
}
function togHour(h){h.classList.toggle('open');h.nextElementSibling.classList.toggle('show')}

/* ── PAGES ── */
function buildCalendar(){
  const jd=d=>Math.floor(365.25*(d.getFullYear()+4716))+Math.floor(30.6001*(d.getMonth()+2))+d.getDate()-1524.5;
  const days=Math.floor(jd(now)-1825029.5);
  const cY=Math.floor(days/365.25)+1,doy=Math.floor(days%365);
  const cM=Math.min(Math.floor(doy/30),12),cD=(doy%30)+1;
  let html=`<p style="font-size:11.5px;color:var(--t3);margin-bottom:14px">السنة القبطية ${toAr(cY)} ش</p>`;
  for(let m=0;m<13;m++){
    const dm=m===12?5:30,isCur=m===cM;
    html+=`<div style="margin-bottom:14px"><div style="font-size:12px;font-weight:800;color:${isCur?'var(--ac)':'var(--t2)'};margin-bottom:7px;display:flex;align-items:center;gap:7px">${COP_M[m]}${isCur?'<span style="background:var(--ac);color:var(--bg0);font-size:9px;padding:1.5px 8px;border-radius:8px;font-weight:800">الشهر الحالي</span>':''}</div><div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px">`;
    for(let i=1;i<=dm;i++){
      const isTd=isCur&&i===cD;
      html+=`<div style="text-align:center;padding:5px 2px;border-radius:6px;font-size:11px;background:${isTd?'var(--ac)':'var(--bg2)'};color:${isTd?'var(--bg0)':'var(--t2)'};font-weight:${isTd?'900':'500'};border:1px solid ${isTd?'var(--ac)':'var(--bd)'}">${toAr(i)}</div>`;
    }
    html+=`</div></div>`;
  }
  return html;
}
function buildAlmanac(){
  const y=now.getFullYear(),m=now.getMonth(),d=now.getDate();
  const DAYS=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const fd=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate();
  let cells=DAYS.map(x=>`<div style="text-align:center;font-size:9px;color:var(--t3);padding:4px 2px;font-weight:700">${x}</div>`).join('');
  for(let i=0;i<fd;i++) cells+=`<div></div>`;
  for(let i=1;i<=dim;i++){
    const it=i===d;
    cells+=`<div class="cal-cell" style="background:${it?'var(--ac)':'transparent'};color:${it?'var(--bg0)':'var(--t2)'};font-weight:${it?900:500};border-radius:6px">${toAr(i)}</div>`;
  }
  return `<div style="font-size:16px;font-weight:800;text-align:center;margin-bottom:14px">${MONTHS[m]} ${toAr(y)}</div><div class="cal-grid">${cells}</div>`;
}

const PAGES={
  bible:{title:'الكتاب المقدس',icon:'fas fa-book-bible',
    html:`<div class="bible-tabs"><button class="bible-tab active" data-tab="OT" onclick="showBibleBooks('OT')">العهد القديم</button><button class="bible-tab" data-tab="NT" onclick="showBibleBooks('NT')">العهد الجديد</button></div><div class="books-grid" id="booksGrid"></div><div class="bible-text" id="bibleText"></div>`,
    init:()=>showBibleBooks('OT')},

  prayers:{title:'الصلوات والأجبية',icon:'fas fa-hands-praying',
    html:`<p style="font-size:11.5px;color:var(--t3);margin-bottom:14px;line-height:1.7">أجبية الساعات السبع للكنيسة القبطية الأرثوذكسية</p>`+
    [['باكر — الصلاة الأولى','٥:٠٠ ص','مز ٦٣','بِاسمِ الآبِ والابنِ والرُّوحِ القُدُسِ، إلهٌ واحد. آمين.<br><br>«يا الله إلهي إليكَ أُبكِّرُ. عَطِشَت إليكَ نفسي واشتاقَ إليكَ جَسَدي، في أرضٍ قفرٍ وخرابٍ لا ماءَ فيها.» (مز ٦٣:١)'],
    ['الثالثة','٩:٠٠ ص','مز ١٩','ساعة الثالثة: فيها حُكِم على الرب وأُنزل عليه الروح القدس على الرسل.<br><br>«السَّمَاوَاتُ تُحَدِّثُ بِمَجدِ اللهِ، والفَلَكُ يُخبِرُ بِعَمَلِ يَدَيهِ.» (مز ١٩:١)'],
    ['السادسة','١٢:٠٠ م','مز ٥١','ساعة السادسة: الساعة التي صُلب فيها ربنا يسوع المسيح من أجل خلاصنا.<br><br>«ارحَمني يا الله كمِثل رَحمَتِكَ. كَكَثرَة رأفَتِكَ امحُ مَعَاصِيَّ.» (مز ٥١:١)'],
    ['التاسعة','٣:٠٠ م','مز ٦٦','ساعة التاسعة: فيها أسلم ربنا روحه على الصليب.<br><br>«هَلِّلُوا للهِ يا جَميعَ الأرضِ. رَنِّمُوا لِمَجدِ اسمِهِ. اجعَلُوا مَجدَهُ تَسبِيحاً.» (مز ٦٦:١-٢)'],
    ['الغروب','٦:٤٥ م','مز ٤١','صلاة غروب الشمس — شكر لله على نعمه التي أحاطت بنا طوال اليوم.<br><br>«طُوبَى للمُتَفَكِّرِ في المِسكينِ. في يَومِ الشَّرِّ يُنَجِّيهِ الرَّبُّ.» (مز ٤١:١)'],
    ['النوم','١٠:٠٠ م','مز ٤','صلاة قبل النوم — تسليم للنفس والجسد في يد الله الأمين.<br><br>«بِالسَّلامَةِ أنامُ وأرقُدُ في الحالِ، لأنَّكَ أنتَ يا ربُّ مُنفَرِداً تُسكِنُني بِاطمِئنَان.» (مز ٤:٨)'],
    ['نصف الليل — التسبحة','١٢:٠٠ م','مز ١١٩','يستيقظ المؤمنون للتسبيح والصلاة في نصف الليل على مثال الملائكة.<br><br>«في نِصفِ اللَّيلِ أقُومُ لأَحمَدَكَ عَلى أحكَامِ بِرِّكَ.» (مز ١١٩:٦٢)']
    ].map(h=>`<div class="hour-card"><div class="hour-head" onclick="togHour(this)"><div><div class="h-name">☩ ${h[0]}</div><div class="h-time">المزمور: ${h[2]}</div></div><div style="display:flex;align-items:center;gap:10px"><span class="h-time">${h[1]}</span><i class="fas fa-chevron-down h-ico"></i></div></div><div class="hour-body"><div class="prayer-text">${h[3]}</div></div></div>`).join('')},

  fathers:{title:'آباء الكنيسة القبطية',icon:'fas fa-comment-dots',
    html:`<p style="font-size:11.5px;color:var(--t3);margin-bottom:14px;line-height:1.7">صنوف الآباء الذين صانوا الإيمان القبطي الأرثوذكسي عبر القرون</p>`+
    [['☩','القديس مرقس الرسول','مؤسس الكنيسة القبطية في الإسكندرية. أحد الإنجيليين الأربعة. استشهد في الإسكندرية عام ٦٨م وقبره يقع في كنيسة مرقوسية بالإسكندرية.'],
    ['☩','القديس أثناسيوس الرسولي','بطريرك الإسكندرية (٣٢٨-٣٧٣م). المدافع الكبير عن الإيمان ضد هرطقة أريوس. ينسب له المقولة الشهيرة: "أثناسيوس ضد العالم".'],
    ['☩','القديس كيرلس الأول عمود الدين','بطريرك الإسكندرية (٤١٢-٤٤٤م). ترأس مجمع أفسس ٤٣١م الذي أثبت أن السيدة مريم هي "والدة الإله" (ثيوتوكوس).'],
    ['✝','القديس أنطونيوس الكبير','أبو الرهبانية المسيحية (٢٥١-٣٥٦م). ترك كل شيء وذهب إلى صحراء مصر. أسّس أول نظام رهباني منظم في تاريخ المسيحية.'],
    ['✝','القديس بولا الأول الناسك','أول ناسك مسيحي (نحو ٢٢٨-٣٤١م). عاش في كهف بصحراء مصر أكثر من تسعين سنة في صوم وصلاة مستمرة.'],
    ['✞','البابا شنوده الثالث','البطريرك ١١٧ (١٩٧١-٢٠١٢م). مجدّد الكنيسة القبطية في العصر الحديث. له مئات المؤلفات اللاهوتية والروحية.']
    ].map(f=>`<div class="father-card"><div class="father-ico">${f[0]}</div><div class="father-info"><div class="father-name">${f[1]}</div><div class="father-desc">${f[2]}</div></div></div>`).join('')},

  hymns:{title:'الترانيم الكنسية القبطية',icon:'fas fa-headphones',
    html:`<p style="font-size:11.5px;color:var(--t3);margin-bottom:14px">تراث موسيقي قبطي يمتد لأكثر من ألفي سنة</p>`+
    [['كيرياليسون (يا رب ارحم)','طقس قبطي • عام'],['أسباسمس آدام — تحية الصليب','طقس قبطي • قداسي'],['تينوبشت (نسجد لك يا رب)','تسبحة نصف الليل • ليلي'],['بيك إتشوس (بكِ أبتهج يا مريم)','تسبحة العذراء • مريمي'],['سيمي ماريا (اسم مريم)','تسبحة العذراء • مريمي'],['أفي إبيشويس (أبي إله الصبوات)','طقس الفصح • فصحي'],['أريبانوس تيروس (قوم يا يسوع)','رفعة عيد القيامة • قياماتي'],['بريسفيا (بشفاعة العذراء)','طقس عام • يومي'],['ترنيمة مار جرجس الشهيد','تذكار الشهداء • كيهك'],['بيشوس إبيرات (الله إله الآباء)','تسبيح الآباء • صباحي']
    ].map((h,i)=>`<div class="hymn-card"><div class="hymn-num">${toAr(i+1)}</div><div class="hymn-info"><div class="hymn-name">${h[0]}</div><div class="hymn-cat">${h[1]}</div></div><i class="fas fa-circle-play hymn-play"></i></div>`).join('')},

  radio:{title:'إذاعة مسيحية',icon:'fas fa-tower-broadcast',
    html:`<div class="radio-station"><div class="station-logo">☩</div><div><div class="station-name">إذاعة الحياة المسيحية</div><div class="station-now" id="stationNow">⏸ متوقف — اضغط للتشغيل</div></div></div>
    <div class="waveform" id="waveform">${Array.from({length:28},(_,i)=>`<div class="wave-bar" style="animation-delay:${(i*0.05).toFixed(2)}s;height:${6+Math.abs(Math.sin(i)*24)}px"></div>`).join('')}</div>
    <div class="player-ctrl">
      <button class="btn-skip" title="السابق"><i class="fas fa-backward-step"></i></button>
      <button class="btn-play" onclick="togglePlay()"><i class="fas fa-play"></i></button>
      <button class="btn-skip" title="التالي"><i class="fas fa-forward-step"></i></button>
    </div>
    <div style="margin-top:18px;font-size:11px;color:var(--t3);margin-bottom:8px;padding:0 2px">المحطات المتاحة</div>
    ${[['إذاعة الحياة المسيحية',true],['راديو الإيمان القبطي',false],['إذاعة النور والحق',false],['تلاوات إنجيلية قبطية',false]]
    .map(s=>`<div class="stn-row" style="${s[1]?'color:var(--t1)':''}"><i class="fas fa-${s[1]?'volume-high':'radio'}"></i><span style="flex:1">${s[0]}</span><span style="font-size:10px;color:${s[1]?'var(--ac)':'var(--t3)'}">مباشر ▶</span></div>`).join('')}`},

  mass:{title:'مواعيد القداسات',icon:'fas fa-church',
    html:`<p style="font-size:11.5px;color:var(--t3);margin-bottom:16px">كنيسة مار جرجس القبطية الأرثوذكسية — القاهرة</p>`+
    [['الأحد','fas fa-sun',[['التسبحة والقداس الكبير','٦:٠٠ ص — ١٢:٠٠ م'],['قداس المغترب','٤:٠٠ م']]],
    ['الاثنين','fas fa-calendar-day',[['التسبحة','١١:٠٠ م'],['القداس الإلهي','٦:٠٠ ص']]],
    ['الثلاثاء','fas fa-calendar-day',[['القداس الإلهي','٦:٠٠ ص']]],
    ['الأربعاء (صوم)','fas fa-calendar-day',[['التسبحة','١٠:٠٠ م'],['القداس الإلهي','٦:٠٠ ص']]],
    ['الخميس','fas fa-calendar-day',[['القداس الإلهي','٦:٠٠ ص']]],
    ['الجمعة (صوم)','fas fa-calendar-day',[['القداس الإلهي','٦:٠٠ ص']]],
    ['السبت','fas fa-star',[['التسبحة','١١:٠٠ م'],['القداس الإلهي','٦:٠٠ ص']]]
    ].map(d=>`<div style="margin-bottom:12px"><div class="day-head"><i class="${d[1]}"></i>${d[0]}</div>${d[2].map(m=>`<div class="mass-row"><span class="mn">${m[0]}</span><span class="mt">${m[1]}</span></div>`).join('')}</div>`).join('')},

  rosary:{title:'المسبحة الإلكترونية',icon:'fas fa-circle-dot',
    html:`<div class="rosary-wrap"><div style="font-size:11.5px;color:var(--t3);margin-bottom:14px">٤١ حبة · كل حبة: «يا ربُّ ارحَمني»</div>
    <div class="rosary-count" id="rCount">٠</div>
    <div class="rosary-prayer">يا ربُّ ارحَمني</div>
    <div class="rosary-btns">
      <button class="btn-side" onclick="decRosary()"><i class="fas fa-minus"></i></button>
      <button class="btn-plus" onclick="incRosary()"><i class="fas fa-plus"></i></button>
      <button class="btn-side" onclick="rstRosary()"><i class="fas fa-rotate-left"></i></button>
    </div>
    <div class="beads-row" id="beadsRow">${Array.from({length:41},()=>'<div class="bead"></div>').join('')}</div>
    <div style="margin-top:16px;font-size:10.5px;color:var(--t3)">اضغط + لكل تسبيحة &nbsp;•&nbsp; ↺ للإعادة</div></div>`,
    init:()=>updateRosary()},

  saints:{title:'قديسو الكنيسة القبطية',icon:'fas fa-star',
    html:`<p style="font-size:11.5px;color:var(--t3);margin-bottom:14px">قديسو وشهداء الكنيسة القبطية الأرثوذكسية الأطهار</p>
    <div class="saints-grid">`+
    [['✝','السيدة العذراء مريم','٢١ كيهك'],['☩','القديس مرقس الرسول','٣٠ برموده'],['✝','الشهيد مار جرجس','٢٤ برموده'],['✝','الشهيدة دميانة','١٣ طوبه'],['☩','القديس أنطونيوس الكبير','٢٢ طوبه'],['✝','القديس بولا الأول','٢ أمشير'],['☩','البابا أثناسيوس الرسولي','٧ بشنس'],['✝','الشهيد أبيفانيوس','٢٥ بؤونة'],['☩','الشهيد الأمير تادرس','١٢ أمشير'],['✝','القديسة بربارة','٨ كيهك'],['☩','القديس سمعان الخراز','١٥ بابه'],['✞','البابا شنوده الثالث','٢٩ أمشير']
    ].map(s=>`<div class="saint-card"><div class="saint-ico">${s[0]}</div><div class="saint-name">${s[1]}</div><div class="saint-date">${s[2]}</div></div>`).join('')+`</div>`},

  tafsir:{title:'التفسير والتأمل',icon:'fas fa-book-open-reader',
    html:`<input type="text" placeholder="أدخل آية مثال: يوحنا ٣:١٦" style="width:100%;background:var(--bg2);border:1px solid var(--bd);border-radius:9px;padding:9px 14px;color:var(--t1);font-family:Cairo,sans-serif;font-size:13px;outline:none;margin-bottom:16px">
    <div style="background:var(--bg2);border:1px solid rgba(0,200,150,.15);border-radius:10px;padding:16px;margin-bottom:12px">
      <div style="font-size:11px;color:var(--ac);font-weight:800;margin-bottom:8px">يوحنا ٣ : ١٦</div>
      <div style="font-size:15px;color:var(--t1);line-height:2.1;margin-bottom:12px">«لأنه هكذا أحبّ الله العالم حتى بذل ابنه الوحيد، لكي لا يهلك كل من يؤمن به بل تكون له الحياة الأبدية.»</div>
      <div style="font-size:12px;color:var(--t3);line-height:1.9"><span style="color:var(--gold);font-weight:700">✦ التفسير: </span>هذه الآية تُسمى «الإنجيل في كلمة واحدة». «هكذا» تعبّر عن عظمة المحبة الإلهية التي لا تُقاس. «بذل» تعني قدّم هدية كاملة لا رُجعة فيها. الابن «الوحيد» يحمل الطبيعة الإلهية ذاتها. من يؤمن بالمسيح ينتقل من الدينونة إلى الحياة الأبدية.</div>
    </div>
    <div style="background:var(--bg2);border:1px solid var(--bd);border-radius:10px;padding:16px">
      <div style="font-size:11px;color:var(--gold);font-weight:800;margin-bottom:8px">✦ القديس كيرلس الأول</div>
      <div style="font-size:12px;color:var(--t2);line-height:1.9">«محبة الله للبشر ليست مجرد عاطفة، بل هي فعل إلهي انعكس في إرسال الابن متجسِّداً ليفدي الخليقة من عبودية الخطيئة والموت الأبدي.»</div>
    </div>`},

  encyclopedia:{title:'الموسوعة القبطية',icon:'fas fa-landmark',
    html:`<p style="font-size:11.5px;color:var(--t3);margin-bottom:14px">تراث الكنيسة القبطية الأرثوذكسية عبر عشرين قرناً</p>
    <div class="enc-grid">`+
    [['⛪','تاريخ الكنيسة القبطية','من مرقس الرسول حتى اليوم'],['📖','الطقوس القبطية','اللغة والألحان والسنة الطقسية'],['☩','اللاهوت القبطي','عقيدة الطبيعة الواحدة للمسيح'],['🏛','مدرسة الإسكندرية','أعظم مدرسة لاهوتية في التاريخ'],['✝','الرهبانية القبطية','أنطونيوس وبولا وأديرة مصر'],['🎵','الموسيقى القبطية','أقدم موسيقى دينية على الأرض'],['📅','الأعياد والصوميات','السنة الطقسية القبطية كاملة'],['👑','قائمة البطاركة','١١٨ بطريركاً من مرقس الرسول']
    ].map(c=>`<div class="enc-card"><div class="enc-ico">${c[0]}</div><div class="enc-name">${c[1]}</div><div class="enc-sub">${c[2]}</div></div>`).join('')+`</div>`},

  calendar:{title:'التقويم القبطي',icon:'fas fa-calendar-days',html:buildCalendar()},
  almanac:{title:'التقويم الميلادي',icon:'fas fa-calendar',html:buildAlmanac()},
};

/* ── MODAL ── */
function openPage(id){
  const p=PAGES[id]; if(!p) return;
  document.getElementById('mbox').innerHTML=
    `<div class="m-head"><div class="m-ttl"><i class="${p.icon}"></i>${p.title}</div>
     <button class="m-close" onclick="closeModal()"><i class="fas fa-xmark"></i></button></div>
     <div class="m-body">${p.html}</div>`;
  document.getElementById('mbak').classList.add('show');
  if(p.init) p.init();
}


function closeModal(){document.getElementById('mbak').classList.remove('show')}
function mbakClick(e){if(e.target===document.getElementById('mbak')) closeModal()}