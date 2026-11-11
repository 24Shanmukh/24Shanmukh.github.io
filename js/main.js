(function(){
/* =========================================================
   EDIT YOUR LINKS AND IMAGES HERE
   Leave a link as '' to hide it on the site.
   ========================================================= */
var LINKS={
  linkedin:'https://www.linkedin.com/in/shanmukha-badiger-b72782188',   // e.g. 'https://www.linkedin.com/in/your-name'
  github:'https://github.com/24Shanmukh',
  newsletter:[    // BIRLITES issues: [title, issue, link]. Newest first.
    ['Jul to Sep 2025','Volume 11 · Issue 2','https://mpbim.com/flipbook.html?pdf=%2Fassets%2Fnewsletter%2Fbirlites-jul-sep-2025.pdf&title=BIRLITES+Jul+-+Sep+2025'],
    ['Jun 2025','Volume 11 · Issue 1','https://mpbim.com/flipbook.html?pdf=%2Fassets%2Fnewsletter%2Fbirlites-jun-2025.pdf&title=BIRLITES+Jun+2025'],
    ['Jan to Mar 2025','Volume 10 · Issue 4','https://mpbim.com/flipbook.html?pdf=%2Fassets%2Fnewsletter%2Fbirlites-jan-mar-2025.pdf&title=BIRLITES+Jan+-+Mar+2025']
  ],
  film:'https://www.youtube.com/watch?v=XKI6HGD3ybI',   // college video edit     // e.g. 'https://github.com/your-name'
  resume:''  /* add 'assets/Shanmukha_Badiger_Resume.pdf' back with the Resume button */
};
var IMAGES={
  bw:'images/hero-profile.webp',     // only used by the old card wheel (not on the page)
  color:'images/hero-profile.webp'
};

/* =========================================================
   EDIT YOUR PROJECTS BELOW (the P list)
   k     : short unique id (used in links like #p-pbi)
   c     : card colour  'r' red, 'k' black, 'w' white
   embed : paste your Power BI "Publish to web" link to show the real report
   ========================================================= */
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================= content ================= */
var P=[
 {k:'var',c:'r',eb:'Python · Market risk',mini:'Value at Risk',t:'Value at Risk <span class="o">from scratch</span>',s:'How much could a ₹1 crore Indian portfolio lose on a bad day? Six VaR models, Expected Shortfall, backtests, risk decomposition and stress tests, built in Python on 12 years of NSE data.',tags:['Python','VaR','Expected Shortfall','Backtesting','Streamlit'],
  meta:[['Portfolio','8 NSE stocks, gold ETF, USD'],['Data','2015 to 2026, 3,090 days'],['Methods','Historical, parametric, Monte Carlo, EWMA'],['Tools','pandas, NumPy, SciPy, Streamlit']],
  sec:[],custom:'varp'},
 {k:'avb',c:'k',eb:'Power BI · Featured',mini:'Actual vs Budget',t:'Actual vs Budget <span class="o">sales dashboard</span>',s:'A one-page Power BI report that answers one question fast: are we beating the plan? Revenue, profit, margin and units against budget, by year, quarter, month, segment, country and product.',tags:['Power BI','DAX','Data modelling','Variance analysis'],
  meta:[['Tool','Power BI Desktop'],['Data','2020 to 2021, 8 countries, 5 segments'],['Model','Data, tbl_Budget, METRIC TABLE'],['Measures','9 DAX measures']],
  sec:[['Design choices',['Green for actuals, dashed orange for budget, maroon for the brand; red and green only for variance','Icons on every KPI card so each card reads before its number does','Time and segment slicers on the left and in the header, all charts cross-filter each other']]],
  custom:'avb',pbix:'assets/Actual_vs_Budget_Sales_Dashboard.pbix',repo:'https://github.com/24Shanmukh/Actual-vs-Budget-Financial-Analysis-PowerBI',
  embed:''   // <- optional: paste a Power BI 'Publish to web' URL to show the live report as well
 },
 {k:'sql',c:'k',eb:'MySQL · Sales analysis',mini:'Zepto SQL',t:'Zepto sales <span class="o">performance</span>',s:'Six months of quick-commerce orders across 22 dark stores in 6 cities, taken from messy raw data to cleaning, analysis and business recommendations, in MySQL.',tags:['MySQL','Window functions','CTEs','Joins','Data cleaning'],
  meta:[['Data','Jan to Jun 2025, 34,423 order lines'],['Scope','22 dark stores, 6 cities'],['SQL','12 files, basic to advanced'],['Charts','Python, pandas, Matplotlib']],
  sec:[],custom:'zep',repo:'https://github.com/24Shanmukh/Zepto-Sales-SQL-Analysis'},
 {k:'ta',c:'w',eb:'Python · MBA dissertation',mini:'Technical analysis',t:'Sector technical <span class="o">analysis</span>',s:'Golden and death crosses, MACD and Bollinger Bands on Nifty IT, Healthcare and Bank over one year, and whether trading the crosses beats buy and hold.',tags:['Python','pandas','Moving averages','MACD','Bollinger Bands'],
  meta:[['Indices','Nifty IT, Healthcare, Bank'],['Period','Oct 2024 to Oct 2025'],['Signals','SMA 20/50, MACD, Bollinger'],['Tools','Python, pandas, Matplotlib']],
  sec:[],custom:'tap'},
 {k:'fins',c:'r',eb:'Mechanical engineering · Conference',mini:'Porous fins',t:'Heat transfer through <span class="o">porous fins</span>',s:'My engineering project on heat transfer through porous fins with localized heat sources, presented at the RAMATES conference.',tags:['Heat transfer','Porous fins','Thermal analysis','Conference paper'],
  meta:[['Type','B.E. final project'],['Degree','Mechanical Engineering, VTU'],['Presented at','RAMATES conference'],['Focus','Localized heat sources']],
  sec:[['The problem',['Fins carry heat away from hot surfaces. Porous fins let fluid flow through them, adding surface for heat transfer without adding much weight.','The project studied how heat from localized sources travels through a porous fin and into the surrounding fluid.']],['Why it’s on a finance portfolio',['Same habit, different numbers: build a model of a system, test the assumptions, and explain the result to an audience.']]]}
];
var BY={};P.forEach(function(p,i){p.i=i;BY[p.k]=p});

/* ================= hero wheel ================= */
var BW=IMAGES.bw,COL=IMAGES.color;
var W=[
 {flip:1,front:'<div class="face photo"><img src="'+BW+'" alt="Shanmukha portrait"><div class="tag">BLR<br>2026</div><div class="nm">ME</div></div>',back:'<div class="face back r"><div class="lbl">About</div><div class="big" style="font-size:20px;margin:14px 0 8px">Finance meets ERP</div><div class="sm">MBA in Finance and Business Analytics. I build Power BI MIS dashboards and run Odoo ERP implementations from BRD to go-live.</div></div>'},
 {k:'erp',front:'<div class="face r"><div class="lbl">Experience</div><div class="big" style="font-size:22px;margin:44px 0 8px">Odoo ERP Business Analyst</div><div class="sm">Prime Minds Consulting<br>Mar to Oct 2026</div><span class="open">↗</span></div>'},
 {k:'mis',front:'<div class="face k"><div class="lbl">Skill</div><div class="big" style="font-size:30px;margin-top:60px">Power BI</div><div class="sm" style="margin-top:6px">DAX, star schema, MIS dashboards</div><span class="open">↗</span></div>'},
 {k:'pbi',front:'<div class="face w"><div class="lbl">Project</div><div class="bars4"><span style="height:28px;background:var(--ink)"></span><span style="height:50px;background:var(--red)"></span><span style="height:72px;background:var(--ink)"></span><span style="height:40px;background:var(--line)"></span></div><div style="font-weight:700;font-size:14px;line-height:1.3">Finance analytics dashboard</div><span class="open">↗</span></div>'},
 {k:'ta',front:'<div class="face r"><div class="lbl">Risk</div><div class="big" style="font-size:36px;margin-top:56px">FRM</div><div class="sm">Credit VaR, PD, LGD, EAD<br>Stress testing, Greeks</div><span class="open">↗</span></div>'},
 {k:'api',front:'<div class="face k"><div class="lbl">Integration</div><div class="big" style="font-size:19px;margin:44px 0 8px">HRMS biometric API into Odoo</div><div class="sm">Odoo integration</div><span class="open">↗</span></div>'},
 {flip:1,front:'<div class="face w"><div class="lbl">Education</div><div class="big" style="font-size:36px;margin-top:52px">MBA</div><div class="sm">Finance and Business Analytics<br>MP Birla Institute, 2026</div><span class="corner">FLIP</span></div>',back:'<div class="face back r"><div class="lbl">Also</div><div class="sm" style="margin-top:12px">B.E. Mechanical Engineering, VTU, 2023.<br><br>Engineering intern at Grasim Industries and Harihar Polyfibres, Aditya Birla Group, 2021.</div></div>'},
 {flip:1,front:'<div class="face photo"><img src="'+COL+'" alt="Shanmukha portrait in color"><div class="tag">OPEN TO<br>ROLES</div><div class="nm">HIRE ME</div></div>',back:'<div class="face back k"><div class="lbl">Contact</div><div class="sm" style="margin-top:14px;user-select:all;word-break:break-all">shanmukhbadiger24@gmail.com</div><div class="sm" style="margin-top:8px">Bengaluru, Karnataka</div></div>'},
 {k:'sql',front:'<div class="face r"><div class="lbl">Skill</div><div class="big" style="font-size:28px;margin-top:56px">SQL + Python</div><div class="sm">pandas, NumPy, scikit-learn</div><span class="open">↗</span></div>'},
 {k:'cess',front:'<div class="face k"><div class="lbl">Internship</div><div class="big" style="font-size:20px;margin:44px 0 8px">Research intern, CESS</div><div class="sm">3 research papers<br>Jan to Feb 2025</div><span class="open">↗</span></div>'}
];
if(document.getElementById('wheel')){ /* card wheel: removed from the page, kept here in case you want it back (see extras/) */
var wheel=$('#wheel'),stage=$('#stage');
wheel.innerHTML=W.map(function(c,i){return '<div class="cd" tabindex="0" role="button" data-i="'+i+'" aria-label="'+(c.k?'Open '+BY[c.k].mini:'Flip card')+'"><div class="in">'+c.front+(c.back||'')+'</div></div>'}).join('');
var cs=$$('.cd',wheel),N=cs.length,STEP=14,SPAN=N*STEP,off=0,vel=0,target=null,hover=false,lastTouch=0,drag=null,moved=false;
function R(){return innerWidth<560?380:520}
function wrapA(a){return((a+SPAN/2)%SPAN+SPAN)%SPAN-SPAN/2}
var dots=document.createElement('div');dots.className='dots';cs.forEach(function(){dots.appendChild(document.createElement('i'))});stage.appendChild(dots);
var visible=true;
if('IntersectionObserver' in window)new IntersectionObserver(function(e){visible=e[0].isIntersecting}).observe(stage);
function draw(){var r=R(),best=0,bd=1e9;
  cs.forEach(function(c,i){var a=wrapA(i*STEP+off),h=c.offsetHeight;if(Math.abs(a)<bd){bd=Math.abs(a);best=i}
    var v=Math.max(0,Math.min(1,(SPAN/2-4-Math.abs(a))/14));
    c.style.opacity=v;c.style.pointerEvents=v<.3?'none':'auto';c.style.top=(-h-r)+'px';c.style.transformOrigin='50% '+(h+r)+'px';
    c.style.transform='rotate('+a+'deg)';c.style.zIndex=Math.round(200-Math.abs(a))});
  dots.children.length&&[].forEach.call(dots.children,function(d,i){d.className=i===best?'on':''});}
function idle(){return !drag&&!hover&&Date.now()-lastTouch>3500&&$('#view').hidden}
stage.addEventListener('pointerdown',function(e){if(e.target.closest('button'))return;drag={x:e.clientX,last:e.clientX};moved=false;target=null;vel=0;lastTouch=Date.now()});
addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-drag.last;drag.last=e.clientX;
  if(Math.abs(e.clientX-drag.x)>6&&!moved){moved=true;stage.classList.add('grab')}
  if(moved){var d=dx*(innerWidth<560?.16:.11);off+=d;vel=d}});
addEventListener('pointerup',function(){if(!drag)return;drag=null;stage.classList.remove('grab');lastTouch=Date.now();
  if(moved)target=Math.round(off/STEP)*STEP+Math.round(vel*6/STEP)*STEP});
stage.addEventListener('wheel',function(e){var d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:(e.shiftKey?e.deltaY:0);if(!d)return;
  e.preventDefault();lastTouch=Date.now();off-=d*.06;target=null;clearTimeout(stage._s);stage._s=setTimeout(function(){target=Math.round(off/STEP)*STEP},140)},{passive:false});
stage.addEventListener('mouseenter',function(){hover=true});stage.addEventListener('mouseleave',function(){hover=false});
function spin(d){lastTouch=Date.now();target=Math.round((target===null?off:target)/STEP)*STEP-d*STEP}
$$('[data-spin]').forEach(function(b){b.addEventListener('click',function(){spin(+b.dataset.spin)})});
function loop(){if(visible){
  if(target!==null){off+=(target-off)*.14;if(Math.abs(target-off)<.03){off=target;target=null}}
  else if(idle()&&!reduce)off-=.06;draw()}
  requestAnimationFrame(loop)}
addEventListener('resize',draw);loop();
cs.forEach(function(c,i){var m=W[i];
  function act(force){if(moved&&!force)return;var a=wrapA(i*STEP+off);
    if(!force&&Math.abs(a)>STEP/2){target=off-a;lastTouch=Date.now();return}
    if(m.flip)c.classList.toggle('flip');else openP(m.k)}
  c.addEventListener('click',function(){act(false)});
  c.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();target=off-wrapA(i*STEP+off);act(true)}});
});
addEventListener('keydown',function(e){if(!$('#view').hidden)return;if(document.activeElement&&document.activeElement.closest&&document.activeElement.closest('#stage')){if(e.key==='ArrowLeft')spin(-1);if(e.key==='ArrowRight')spin(1)}});
}

/* ================= sections ================= */
var tk=['Power BI','Odoo ERP','FP&amp;A reporting','SQL','Python','Variance analysis','DAX','Credit risk','UAT','MIS reporting','Financial modelling','Tableau'];
if($('#trk'))$('#trk').innerHTML=tk.concat(tk).map(function(x){return '<span>'+x+'</span>'}).join('');
var span={var:'span4',sql:'span2',ta:'span2',avb:'span4w',fins:'span2'};
$('#bento').innerHTML=P.map(function(p){
  var viz=p.k==='ta'?'<div class="viz-shot vz-var" aria-hidden="true"><img src="images/ta/growth.webp" alt="" loading="lazy"></div>':p.k==='var'?'<div class="viz-shot vz-var" aria-hidden="true"><img src="images/var/var-es.webp" alt="" loading="lazy"></div>':p.k==='avb'?'<div class="viz-shot" aria-hidden="true"><img src="images/pbi/dashboard.webp" alt="" loading="lazy"></div>':p.k==='pbi'?'<div class="viz" aria-hidden="true"><span style="height:38%"></span><span style="height:52%"></span><span style="height:46%"></span><span style="height:64%"></span><span style="height:58%"></span><span style="height:78%"></span><span class="hi" style="height:96%"></span></div>':'';
  return '<button class="tile '+p.c+' '+(span[p.k]||'span2')+' reveal" data-p="'+p.k+'"><div class="t-top"><div class="lbl">'+p.eb+'</div><span class="arrow" aria-hidden="true">↗</span></div>'+viz+'<div><h3>'+p.t.replace(/<span class="o">|<\/span>/g,'')+'</h3><p>'+p.s+'</p></div><div class="tags">'+p.tags.map(function(t){return '<span>'+t+'</span>'}).join('')+'</div></button>'}).join('');
var jobs=[
  {when:'Mar to Oct 2026',kind:'Work',title:'Business Analyst (Odoo ERP)',org:'Prime Minds Consulting Pvt. Ltd., Bengaluru',pts:[
    'Worked on Odoo ERP implementation projects: gathering requirements, documenting processes and testing before go-live.',
    'Worked closely with finance data: Power BI dashboards for revenue, margin and receivables, project profitability analysis in Excel, and support for invoicing and month-end close.']},
  {when:'Feb 2026',kind:'Education',title:'MBA, Finance and Business Analytics',org:'MP Birla Institute of Management, Bengaluru · CGPA 7.18',pts:[]},
  {when:'Jan to Feb 2025',kind:'Research',title:'Research Intern',org:'Centre for Educational and Social Studies (CESS), Bengaluru',pts:['Wrote three research papers on ethical governance, leadership and workplace spirituality.'],go:'#research',goT:'Read the papers'},
  {when:'Jul 2023',kind:'Education',title:'B.E. Mechanical Engineering',org:'Visvesvaraya Technological University · CGPA 7.2',pts:['Final project on heat transfer through porous fins with localized heat sources, presented at the RAMATES conference.'],p:'fins',goT:'See the project'},
  {when:'Jun to Jul 2021',kind:'Internship',title:'Intern, Engineering Division',org:'Grasim Industries and Harihar Polyfibres, Aditya Birla Group',pts:['Studied viscose-fibre manufacturing, workforce management and production planning.']}
];
$('#tl').innerHTML=jobs.map(function(j,i){var more=j.pts.length||j.go||j.p;
  return '<div class="job tl-row reveal'+(i===0?' tl-open':'')+'"><button class="tl-head"'+(more?' aria-expanded="'+(i===0)+'"':' disabled')+'><span class="when">'+j.when+'</span><span class="tl-main"><span class="tl-kind">'+j.kind+'</span><b>'+j.title+'</b><small>'+j.org+'</small></span>'+(more?'<span class="tl-plus" aria-hidden="true"></span>':'<span></span>')+'</button>'+
  (more?'<div class="tl-body"><div>'+(j.pts.length?'<ul>'+j.pts.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>':'')+(j.go?'<a class="tl-link" href="'+j.go+'">'+j.goT+' →</a>':'')+(j.p?'<button class="tl-link" data-p="'+j.p+'">'+j.goT+' →</button>':'')+'</div></div>':'')+'</div>'}).join('');
$$('.tl-head').forEach(function(b){b.addEventListener('click',function(){var r=b.parentNode,o=r.classList.toggle('tl-open');b.setAttribute('aria-expanded',o)})});
var SK=[
  ['Finance and risk',['Financial analysis','Variance analysis','Financial modelling','Valuation','VaR and Expected Shortfall','Stress testing','Credit risk: PD, LGD, EAD']],
  ['Analytics',['Power BI (DAX)','SQL','Python: pandas, NumPy, SciPy','Advanced Excel','Power Query','Tableau']],
  ['Business',['Requirement gathering','Process mapping','Odoo ERP','QuickBooks']],
  ['Creative',['DaVinci Resolve','Premiere Pro','Photography','Editorial design']]];
$('#sk').innerHTML=SK.map(function(s){return '<div class="tk-row"><span class="tk-l">'+s[0]+'</span><div class="chipset">'+s[1].map(function(x){return '<span>'+x+'</span>'}).join('')+'</div></div>'}).join('');
$$('[data-p]').forEach(function(b){b.addEventListener('click',function(){openP(b.dataset.p)})});

/* links from LINKS config */
var cg=$('#cgrid');
[['LinkedIn',LINKS.linkedin,'View profile ↗'],['GitHub',LINKS.github,'@24Shanmukh ↗']].forEach(function(l){if(l[1])cg.insertAdjacentHTML('beforeend','<div class="cbox"><div class="l">'+l[0]+'</div><div class="v"><a href="'+l[1]+'" target="_blank" rel="noopener">'+(l[2]||l[1].replace(/^https?:\/\/(www\.)?/,''))+'</a></div></div>')});
var crI=$('#crIssues');if(crI&&LINKS.newsletter&&LINKS.newsletter.length)crI.innerHTML='<span class="cr-il">Read the issues</span><p class="cr-credit"><b>Find my name:</b> it’s in the credits on the last page of each issue.</p>'+LINKS.newsletter.map(function(n){return '<a href="'+n[2]+'" target="_blank" rel="noopener"><b>'+n[0]+'</b><small>'+n[1]+'</small><i aria-hidden="true">↗</i></a>'}).join('');
/* films on the creative card: [title, note, video file, poster, shape] or a YouTube link */
var FILMS=[
  {t:'Ramadevarabetta',n:'Temple film · Ramanagara',src:'assets/video/ramadevarabetta.mp4',poster:'assets/video/ramadevarabetta-poster.jpg'},
  {t:'The gauge',n:'Motorcycle detail',src:'assets/video/gauge.mp4',poster:'assets/video/gauge-poster.jpg',tall:1},
  {t:'College edit',n:'On YouTube',yt:LINKS.film}
];
(function(){var pl=$('#crPlayer'),tabs=$('#crTabs');if(!pl||!tabs)return;
  tabs.innerHTML=FILMS.map(function(f,i){return '<button role="tab" data-f="'+i+'"><b>'+f.t+'</b><small>'+f.n+'</small></button>'}).join('');
  var btns=[].slice.call(tabs.children);
  function show(i,play){var f=FILMS[i];btns.forEach(function(b,k){b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i)});
    pl.className='cr-player'+(f.tall?' tall':'');pl.style.setProperty('--poster','none');
    var yid=f.yt&&(f.yt.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)||[])[1];
    var bg=f.poster||(yid&&!window.PREVIEW_MODE?'https://i.ytimg.com/vi/'+yid+'/hqdefault.jpg':'');
    if(bg)pl.style.setProperty('--poster','url("'+(bg.indexOf('data:')===0?bg:new URL(bg,location.href).href)+'")');
    var tc='<div class="cr-tc" aria-hidden="true"><b>●</b> REC <span class="crTc">00:00:00:00</span></div>';
    if(play&&f.src){pl.classList.add('playing');pl.innerHTML='<video src="'+f.src+'" controls autoplay playsinline poster="'+f.poster+'"></video>';return}
    if(play&&yid&&!window.PREVIEW_MODE){pl.classList.add('playing');pl.innerHTML='<iframe src="https://www.youtube-nocookie.com/embed/'+yid+'?autoplay=1&rel=0&modestbranding=1" title="'+f.t+'" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';return}
    var lab='Play “'+f.t+'”';
    pl.innerHTML=(yid&&window.PREVIEW_MODE?'<a class="cr-play" href="'+f.yt+'" target="_blank" rel="noopener" aria-label="Watch '+f.t+' on YouTube">':'<button class="cr-play" aria-label="'+lab+'">')+'<span class="cr-pbtn" aria-hidden="true"></span><span class="cr-pl">'+lab+'</span>'+(yid&&window.PREVIEW_MODE?'</a>':'</button>')+tc;
    var b=pl.querySelector('button.cr-play');if(b)b.addEventListener('click',function(){show(i,true)})}
  btns.forEach(function(b,i){b.addEventListener('click',function(){show(i,false)})});show(0,false);
})();
var crF=$('#crFilm');if(crF&&LINKS.film){crF.href=LINKS.film;crF.textContent='Watch my college video edit on YouTube ↗'}
(function(){if(reduce)return;var tc={set textContent(v){$$('.crTc').forEach(function(x){x.textContent=v})}};var f=0,t0=performance.now();setInterval(function(){var s=(performance.now()-t0)/1000,fr=Math.floor(s*25)%25,ss=Math.floor(s)%60,mm=Math.floor(s/60)%60;tc.textContent='00:'+String(mm).padStart(2,'0')+':'+String(ss).padStart(2,'0')+':'+String(fr).padStart(2,'0')},40)})();
var rb=$('#resumeBtn');if(rb){if(LINKS.resume)rb.href=LINKS.resume;else rb.remove()}

/* nav state, reveals, copy */
var nav=$('#nav');addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>20)},{passive:true});
if('IntersectionObserver' in window){
  var secs=$$('main section'),links=$$('.links a');
  var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){so.observe(s)});
  if(!reduce){var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');ro.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    $$('.reveal').forEach(function(el,i){var r=el.getBoundingClientRect();if(r.top>innerHeight){el.classList.add('pre');el.style.transitionDelay=(i%3)*80+'ms';ro.observe(el)}})}
}
$$('[data-copy]').forEach(function(b){b.addEventListener('click',function(){var el=document.getElementById(b.dataset.copy),t=el.textContent,o=b.textContent;
  function ok(){b.textContent='Copied';setTimeout(function(){b.textContent=o},1500)}
  function sel(){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Selected, press copy'}
  try{navigator.clipboard.writeText(t).then(ok,sel)}catch(e){sel()}})});

/* cursor */
var cur=$('#cur'),cx=0,cy=0,tx=0,ty=0;
if(matchMedia('(hover:hover)').matches&&!reduce){
  addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;cur.style.opacity=cur.classList.contains('big')?'':'1'});
  document.addEventListener('mouseover',function(e){cur.classList.toggle('big',!!e.target.closest('.cd,.tile,.job,.mini,.lh-chip,.ph-frame'))});
  (function f(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(f)})();
}

/* ================= project view + dock ================= */
var view=$('#view'),vbody=$('#vbody'),dock=$('#dock'),dockIn=$('#dockIn'),cur_k=null,lastFocus=null;
dockIn.innerHTML=P.map(function(p){return '<button class="mini '+p.c+'" data-m="'+p.k+'" aria-label="Open '+p.mini+'"><div class="lbl">'+String(p.i+1).padStart(2,'0')+'</div><div class="big">'+p.mini+'</div></button>'}).join('');
var minis={};$$('.mini',dockIn).forEach(function(m){minis[m.dataset.m]=m;m.addEventListener('click',function(){if(m.dataset.m!==cur_k)show(m.dataset.m,true)})});
function render(p){
  var h='<div class="vhero '+p.c+' v-in"><div class="eyebrow" style="'+(p.c!=='w'?'color:#fff;opacity:.85':'')+'">'+p.eb+'</div><h2 class="h2" id="vTitle">'+p.t+'</h2><p class="lede">'+p.s+'</p>'+
    '<div class="vmeta">'+p.meta.map(function(m){return '<div><b>'+m[0]+'</b><span>'+m[1]+'</span></div>'}).join('')+'</div></div>';
  if(p.custom==='zep')h+='<div class="repwrap v-in" style="animation-delay:.08s;border:0"><div id="zpMount"></div></div>';
  if(p.custom==='tap')h+='<div class="repwrap v-in" style="animation-delay:.08s;border:0"><div id="taMount"></div></div>';
  if(p.custom==='varp')h+='<div class="repwrap v-in" style="animation-delay:.08s;border:0"><div id="varMount"></div></div>';
  if(p.custom==='avb')h+='<div class="repwrap v-in" style="animation-delay:.08s"><div class="eyebrow" style="margin-bottom:12px">The dashboard</div><div id="avMount"></div>'+(p.pbix?'<a class="av-dl" href="'+p.pbix+'" download>Download the .pbix <span aria-hidden="true">↓</span></a>':'')+'</div>';
  if(p.embed)h+='<div class="repwrap v-in"><div class="eyebrow" style="margin-bottom:12px">Live report</div><div class="embed"><iframe title="'+p.mini+' report" src="'+p.embed+'" allowfullscreen loading="lazy"></iframe></div></div>';
  else if(p.report)h+='<div class="repwrap v-in" style="animation-delay:.08s"><div class="eyebrow" style="margin-bottom:12px">Live report</div>'+reportHTML()+'</div>';
  h+=p.sec.map(function(s,i){return '<div class="vsec v-in" style="animation-delay:'+(.12+i*.06)+'s"><h3>'+s[0]+'</h3><ul>'+s[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}).join('');
  var nx=P[(p.i+1)%P.length];
  h+='<div class="vsec v-in" style="border:0;animation-delay:.3s"><h3>Next project</h3><div><button class="back-b" data-next="'+nx.k+'"><span aria-hidden="true">→</span>'+nx.mini+'</button></div></div>';
  return h}
function show(k,anim){var p=BY[k];cur_k=k;vbody.innerHTML=render(p);view.scrollTop=0;
  $('#vcount').textContent=String(p.i+1).padStart(2,'0')+' / '+String(P.length).padStart(2,'0');
  $$('.mini',dockIn).forEach(function(m){m.classList.toggle('on',m.dataset.m===k)});
  var m=minis[k];dockIn.scrollLeft=Math.max(0,m.offsetLeft-dockIn.clientWidth/2+m.offsetWidth/2);
  var nb=$('[data-next]',vbody);nb.addEventListener('click',function(){show(nb.dataset.next,true)});
  if(p.report&&!p.embed)bindReport();
  if(p.custom==='avb'&&window.AVB)AVB.mount($('#avMount'));
  if(p.custom==='varp'&&window.VARP)VARP.mount($('#varMount'));
  if(p.custom==='zep'&&window.ZEP)ZEP.mount($('#zpMount'));
  if(p.custom==='tap'&&window.TAP)TAP.mount($('#taMount'));
  try{history.replaceState(null,'','#p-'+k)}catch(e){}
}
function openP(k){if(!BY[k])return;lastFocus=document.activeElement;
  if(stage)stage.classList.add('project-open');
  view.hidden=false;dock.classList.remove('dismiss');dock.hidden=false;document.documentElement.style.overflow='hidden';
  show(k);$('#vback').focus({preventScroll:true});
  requestAnimationFrame(function(){dock.classList.add('dismiss')});
}
function closeV(){view.hidden=true;dock.hidden=true;dock.classList.remove('dismiss');if(stage)stage.classList.remove('project-open');document.documentElement.style.overflow='';cur_k=null;try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}if(lastFocus&&lastFocus.focus)lastFocus.focus({preventScroll:true})}
$('#vback').addEventListener('click',closeV);
addEventListener('keydown',function(e){if(view.hidden)return;if(e.key==='Escape')closeV();
  if((e.key==='ArrowRight'||e.key==='ArrowLeft')&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){var i=BY[cur_k].i+(e.key==='ArrowRight'?1:-1);show(P[(i+P.length)%P.length].k,true)}});
var h0=(location.hash||'').replace('#p-','');if(BY[h0])openP(h0);

/* ================= report (sample data) ================= */
var months=['Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],base=[42,45,48,44,51,55,53,58,62,60,66,71];
var SEG={All:{f:1,avg:2450,sh:[1,1,1,1,1,1,1,1,1,1,1,1]},Retail:{f:.48,avg:1180,sh:[1.05,1.12,1,.95,1,1.02,.98,1,1.03,.97,1.04,1.1]},SME:{f:.32,avg:5200,sh:[.96,.94,1.02,1.05,1,1,1.03,1,.98,1.04,.99,.97]},Corporate:{f:.2,avg:18400,sh:[.92,.9,1.01,1.1,1.02,.97,1.04,1.02,.96,1.05,.95,.9]}};
var STATES=[['Karnataka',.31],['Maharashtra',.24],['Tamil Nadu',.17],['Delhi',.15],['Gujarat',.13]];
function inr(l){return l>=100?'₹'+(l/100).toFixed(2)+' Cr':'₹'+l.toFixed(1)+' L'}
function reportHTML(){return '<div class="seg" id="seg">'+Object.keys(SEG).map(function(s,i){return '<button class="'+(i?'':'on')+'" data-s="'+s+'">'+s+'</button>'}).join('')+'</div><div class="kpis" id="kpis"></div><div class="grid2"><div class="panel"><h4>Monthly transaction value</h4><div id="line"></div></div><div class="panel"><h4>Value by state</h4><div id="bars"></div></div></div><div class="panel" style="margin-top:10px;overflow-x:auto"><h4>By transaction status</h4><table class="tbl" id="tbl"></table></div><p class="note">Sample figures for preview. Replace this panel with your published Power BI report when the site goes live.</p>'}
function bindReport(){$$('#seg button').forEach(function(b){b.addEventListener('click',function(){$$('#seg button').forEach(function(x){x.classList.toggle('on',x===b)});paint(b.dataset.s)})});paint('All')}
function paint(s){var g=SEG[s],v=base.map(function(x,i){return x*g.f*g.sh[i]}),tot=v.reduce(function(a,b){return a+b},0),vol=Math.round(tot*1e5/g.avg),fees=tot*.012,tax=fees*.18,mom=(v[11]/v[10]-1)*100;
  $('#kpis').innerHTML=[['Transaction value',inr(tot),mom],['Volume',vol.toLocaleString('en-IN'),mom-1.4],['Avg transaction','₹'+g.avg.toLocaleString('en-IN'),1.2],['Fees',inr(fees),mom],['Taxes',inr(tax),mom]].map(function(k){return '<div class="kpi"><div class="l">'+k[0]+'</div><div class="v">'+k[1]+'</div><div class="d '+(k[2]>=0?'up':'dn')+'">'+(k[2]>=0?'▲ ':'▼ ')+Math.abs(k[2]).toFixed(1)+'% vs last month</div></div>'}).join('');
  var Wd=560,H=230,pl=44,pr=14,pt=14,pb=28,mx=Math.ceil(Math.max.apply(0,v)/10)*10||10,st=mx/4,X=function(i){return pl+i*(Wd-pl-pr)/11},Y=function(y){return pt+(H-pt-pb)*(1-y/mx)},grid='',pts=v.map(function(y,i){return X(i).toFixed(1)+','+Y(y).toFixed(1)}).join(' ');
  for(var t=0;t<=4;t++){var yy=Y(t*st);grid+='<line x1="'+pl+'" x2="'+(Wd-pr)+'" y1="'+yy+'" y2="'+yy+'" stroke="#E3E2DE"/><text x="'+(pl-8)+'" y="'+(yy+4)+'" text-anchor="end" font-size="11" fill="#74736F">'+(+(t*st).toFixed(1))+'L</text>'}
  var lab=months.map(function(m,i){return i%2?'':'<text x="'+X(i)+'" y="'+(H-8)+'" text-anchor="middle" font-size="11" fill="#74736F">'+m+'</text>'}).join('');
  $('#line').innerHTML='<svg viewBox="0 0 '+Wd+' '+H+'" role="img" aria-label="Monthly transaction value, sample data">'+grid+lab+'<polygon points="'+X(0)+','+Y(0)+' '+pts+' '+X(11)+','+Y(0)+'" fill="#E0442F" fill-opacity=".1"/><polyline points="'+pts+'" fill="none" stroke="#E0442F" stroke-width="2.5" stroke-linejoin="round"/><circle cx="'+X(11)+'" cy="'+Y(v[11])+'" r="5" fill="#E0442F" stroke="#F8F7F4" stroke-width="2"/></svg>';
  var bw=300,rh=34,bh='<svg viewBox="0 0 '+bw+' '+(STATES.length*rh)+'" role="img" aria-label="Value by state, sample data">';
  STATES.forEach(function(x,i){var val=tot*x[1],w=(bw-150)*x[1]/STATES[0][1];bh+='<text x="0" y="'+(i*rh+21)+'" font-size="12" fill="#141414">'+x[0]+'</text><rect x="86" y="'+(i*rh+8)+'" width="'+w+'" height="18" rx="4" fill="'+(i?'#141414':'#E0442F')+'"/><text x="'+(92+w)+'" y="'+(i*rh+21)+'" font-size="11" fill="#74736F">'+inr(val)+'</text>'});
  $('#bars').innerHTML=bh+'</svg>';
  var rows=[['Success',.91,'ok'],['Pending',.06,'ok'],['Failed',.03,'bad']];
  $('#tbl').innerHTML='<tr><th>Status</th><th>Transactions</th><th>Value</th><th>Share</th></tr>'+rows.map(function(r){return '<tr><td><span class="pill '+r[2]+'">'+r[0]+'</span></td><td>'+Math.round(vol*r[1]).toLocaleString('en-IN')+'</td><td>'+inr(tot*r[1])+'</td><td>'+(r[1]*100).toFixed(0)+'%</td></tr>'}).join('');
}

/* =========================================================
   PROFILE HERO ("line of sight")
   Photo: images/hero-profile.webp (transparent cut-out).
   EYE = where the eye sits in that image (0-1), used for the
   dotted line from the eye to the name on desktop.
   ========================================================= */
(function(){
  var hero=$('#lhHero');if(!hero)return;
  var stage=$('#lhStage'),fig=$('#lhFig'),chart=$('#lhChart'),sight=$('#lhSight'),name=$('#lhName');
  var NS='http://www.w3.org/2000/svg',EYE={x:.166,y:.287};
  var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var pts=[],s=7;function rnd(){s=(s*9301+49297)%233280;return s/233280}
  for(var i=0;i<46;i++){var dd=Math.exp(-Math.pow((i-20)/4,2))*16;pts.push(40+i*.9-dd+(rnd()-.5)*6)}
  function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e}
  function drawChart(anim){
    var W=chart.clientWidth,H=chart.clientHeight;if(!W)return;
    chart.setAttribute('viewBox','0 0 '+W+' '+H);
    chart.innerHTML='<defs><linearGradient id="lhCg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".16"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>';
    var mn=Math.min.apply(0,pts),mx=Math.max.apply(0,pts),d='',xy=[];
    pts.forEach(function(p,i){var x=W*i/(pts.length-1),y=H-H*(p-mn)/(mx-mn);xy.push([x,y]);d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)});
    chart.appendChild(el('line',{x1:0,x2:W,y1:H*.82,y2:H*.82,'class':'base'}));
    var area=el('path',{d:d+'L'+W+' '+H+'L0 '+H+'Z','class':'area'}),ln=el('path',{d:d,'class':'ln'}),last=xy[xy.length-1],dot=el('circle',{cx:last[0],cy:last[1],r:4.5,'class':'dot'});
    chart.appendChild(area);chart.appendChild(ln);chart.appendChild(dot);
    if(anim&&!reduce){
      var L=ln.getTotalLength();ln.style.strokeDasharray=L;ln.style.strokeDashoffset=L;area.style.opacity=0;dot.style.opacity=0;
      requestAnimationFrame(function(){ln.style.transition='stroke-dashoffset 1.6s .7s cubic-bezier(.4,0,.2,1)';ln.style.strokeDashoffset=0;area.style.transition='opacity .8s 1.9s';area.style.opacity='';dot.style.transition='opacity .3s 2.2s';dot.style.opacity=1});
    }
  }
  function drawSight(){
    sight.innerHTML='';
    if(innerWidth<=900||!fig.complete||!fig.naturalWidth)return;
    var hr=hero.getBoundingClientRect(),fr=fig.getBoundingClientRect(),rg=document.createRange();rg.selectNodeContents(name.querySelector('span'));var nr=rg.getBoundingClientRect();
    var ex=fr.left+fr.width*EYE.x-hr.left-10,ey=fr.top+fr.height*EYE.y-hr.top,tx=nr.right-hr.left+18,ty=nr.top+nr.height*.45-hr.top;
    if(ex-tx<60)return;
    sight.setAttribute('viewBox','0 0 '+hr.width+' '+hr.height);
    sight.appendChild(el('path',{d:'M'+ex+' '+ey+' Q'+((ex+tx)/2)+' '+(Math.min(ey,ty)-18)+' '+tx+' '+ty}));
    sight.appendChild(el('circle',{cx:tx,cy:ty,r:5}));
  }
  var layers=[].slice.call(stage.querySelectorAll('[data-d]')),raf=0,mxp=0,myp=0;
  function par(){raf=0;layers.forEach(function(l){var d=+l.dataset.d;l.style.translate=(mxp*d).toFixed(1)+'px '+(myp*d*.6).toFixed(1)+'px'})}
  if(matchMedia('(pointer:fine)').matches&&!reduce){
    hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();mxp=(e.clientX-r.left)/r.width-.5;myp=(e.clientY-r.top)/r.height-.5;if(!raf)raf=requestAnimationFrame(par)});
    hero.addEventListener('pointerleave',function(){mxp=myp=0;if(!raf)raf=requestAnimationFrame(par)});
  }
  function all(anim){drawChart(anim);drawSight();setTimeout(drawSight,1600)}
  if(fig.complete)all(true);else fig.addEventListener('load',function(){all(true)});
  var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(function(){all(false)},150)});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(drawSight);
})();

/* =========================================================
   PHOTOGRAPHY (new)
   Files live in images/photos/ (large) and images/photos/thumbs/.
   SERIES: the featured monastery set (first frame is the cover).
   PHOTOS: the reel. [file, caption, note, category, triptych? 1/0]
   Categories: people, nature, still
   ========================================================= */
var PH_DIR='images/photos/';
var SERIES={title:'Sannati',desc:'<em>Sannati.</em> Eight frames from a monastery: gold on the rooftops, maroon robes, and the people who gather there.',frames:[
  ['wheel','The wheel','Rooftop · gold and deer'],
  ['monk','Walking away','Portrait'],
  ['hope','Hope','Portrait'],
  ['gathering','Gathering','Street'],
  ['elders','Elders','Street'],
  ['held','Held','Portrait'],
  ['roof','Rooftop','Architecture'],
  ['clouds','Weather','Sky']
]};
var PHOTOS=[
  ['paradise','Paradise','undiscovered place','people',0],
  ['fern','All we have is now','Nature','nature',0],
  ['red-curve','Edge of red','Abstract','still',0],
  ['half-light','Half light','Portrait','people',1],
  ['fungus','Timeless moments','Nature','nature',0],
  ['stillness','Moments of stillness','Still life','still',0],
  ['bulbul','Red-whiskered bulbul','Wildlife','nature',0],
  ['embrace','Embrace challenges','Nature','nature',0],
  ['bangles','Bangles','Portrait','people',0],
  ['smoke','Smoke','Abstract','still',0],
  ['bougainvillea','Magic happens only when you believe','Nature','nature',0],
  ['macaque','The watcher','Wildlife','nature',0]
];
/* More photos, not shown. Move any line up into PHOTOS to add it to the reel. */
var PHOTOS_MORE=[
  ['vine','Reaching','Nature','nature',1],
  ['time','Time','Still life','still',0],
  ['hibiscus','White hibiscus','Nature','nature',0],
  ['jhumka','Jhumka','Still life','still',0],
  ['leaves','Backlit','Nature','nature',0],
  ['stream','Anklet','Still life','still',0],
  ['frond','Frond','Nature','nature',0],
  ['first-steps','Tiny steps','Portrait','people',0],
  ['grass','Single stem','Nature','nature',0]
];
(function(){
  var reel=$('#phReel');if(!reel)return;
  var pad=function(n){return String(n).padStart(2,'0')},big=function(f){return PH_DIR+f+'.jpg'},th=function(f){return PH_DIR+'thumbs/'+f+'.jpg'};
  /* series */
  var S=SERIES.frames;
  $('#phCoverImg').src=big(S[0][0]);$('#phSeriesT').textContent=SERIES.title;$('#phSeriesN').textContent=pad(S.length);$('#phSeriesD').innerHTML=SERIES.desc;
  $('#phContact').innerHTML=S.map(function(p,i){return '<button data-si="'+i+'" aria-label="View '+p[1]+'"><img src="'+th(p[0])+'" alt="" loading="lazy"><span>'+pad(i+1)+'</span></button>'}).join('');
  $('#phCover').addEventListener('click',function(){openBox(S,0)});
  $$('#phContact button').forEach(function(b){b.addEventListener('click',function(){openBox(S,+b.dataset.si)})});
  /* reel */
  reel.innerHTML=PHOTOS.map(function(p,i){
    var u=th(p[0]),inner=p[4]?'<div class="ph-tri"><span style="background-image:url(\''+u+'\');background-position:0 50%"></span><span style="background-image:url(\''+u+'\');background-position:50% 50%"></span><span style="background-image:url(\''+u+'\');background-position:100% 50%"></span></div>':'<img src="'+u+'" alt="'+p[1]+'" loading="lazy">';
    return '<button class="ph-frame" data-ph-i="'+i+'" data-cat="'+p[3]+'" aria-label="View '+p[1]+'">'+inner+'<span class="no">'+pad(i+1)+'</span><span class="cap">'+p[1]+'</span></button>'}).join('');
  var frames=$$('.ph-frame',reel),count=$('#phCount'),vis=frames.slice();
  function centre(f,smooth){if(f)reel.scrollTo({left:f.offsetLeft-(reel.clientWidth-f.offsetWidth)/2,behavior:smooth?'smooth':'auto'})}
  function focus(){var mid=reel.scrollLeft+reel.clientWidth/2,best=null,bd=1e9;
    vis.forEach(function(f){var c=f.offsetLeft+f.offsetWidth/2,d=Math.abs(c-mid);if(d<bd){bd=d;best=f}});
    frames.forEach(function(f){f.classList.toggle('focus',f===best)});
    count.textContent='Frame '+pad(vis.indexOf(best)+1)+' / '+pad(vis.length);}
  reel.addEventListener('scroll',function(){requestAnimationFrame(focus)},{passive:true});
  addEventListener('resize',focus);
  setTimeout(function(){centre(frames[Math.min(3,frames.length-1)]);focus()},60);
  /* filters */
  var cats=[['all','All'],['people','People'],['nature','Nature'],['still','Still life']];
  $('#phFilters').innerHTML=cats.map(function(c,i){var n=c[0]==='all'?PHOTOS.length:PHOTOS.filter(function(p){return p[3]===c[0]}).length;return '<button class="'+(i?'':'on')+'" data-cat="'+c[0]+'">'+c[1]+'<i>'+n+'</i></button>'}).join('');
  $$('#phFilters button').forEach(function(b){b.addEventListener('click',function(){
    $$('#phFilters button').forEach(function(x){x.classList.toggle('on',x===b)});
    frames.forEach(function(f){f.hidden=!(b.dataset.cat==='all'||f.dataset.cat===b.dataset.cat)});
    vis=frames.filter(function(f){return !f.hidden});centre(vis[Math.min(1,vis.length-1)]);focus()})});
  /* drag with a mouse */
  var d=null,dragged=false;
  reel.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;d={x:e.clientX,s:reel.scrollLeft};dragged=false});
  addEventListener('pointermove',function(e){if(!d)return;var dx=e.clientX-d.x;if(Math.abs(dx)>5){dragged=true;reel.classList.add('drag')}if(dragged)reel.scrollLeft=d.s-dx});
  addEventListener('pointerup',function(){if(!d)return;d=null;reel.classList.remove('drag');if(dragged)centre($('.ph-frame.focus',reel),true)});
  reel.addEventListener('keydown',function(e){if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;e.preventDefault();
    var i=vis.indexOf($('.ph-frame.focus',reel));centre(vis[Math.max(0,Math.min(vis.length-1,i+(e.key==='ArrowRight'?1:-1)))],true)});
  /* viewer (works for the series and for the reel) */
  var box=$('#phBox'),img=$('#phImg'),cap=$('#phCap'),bc=$('#phBoxCount'),dockEl=$('#phDock'),list=[],cur=0,back=null;
  function show(i){cur=(i+list.length)%list.length;var p=list[cur];
    img.style.animation='none';img.offsetHeight;img.style.animation='';
    img.src=big(p[0]);img.alt=p[1];cap.innerHTML=p[1]+'<em>'+p[2]+'</em>';bc.textContent=(list===S?SERIES.title+' · ':'')+'Frame '+pad(cur+1)+' / '+pad(list.length);
    var t=$$('button',dockEl);t.forEach(function(x,k){x.classList.toggle('on',k===cur)});
    if(t[cur])dockEl.scrollLeft=Math.max(0,t[cur].offsetLeft-dockEl.clientWidth/2+t[cur].offsetWidth/2)}
  function openBox(l,i){back=document.activeElement;list=l;
    dockEl.innerHTML=l.map(function(p,k){return '<button data-pd="'+k+'" aria-label="'+p[1]+'"><img src="'+th(p[0])+'" alt=""></button>'}).join('');
    $$('button',dockEl).forEach(function(t){t.addEventListener('click',function(){show(+t.dataset.pd)})});
    box.hidden=false;document.documentElement.style.overflow='hidden';show(i);$('#phClose').focus()}
  function closeBox(){box.hidden=true;document.documentElement.style.overflow='';if(back&&back.focus)back.focus({preventScroll:true})}
  frames.forEach(function(f){f.addEventListener('click',function(){if(dragged)return;var l=vis.map(function(x){return PHOTOS[+x.dataset.phI]});openBox(l,vis.indexOf(f))})});
  $$('[data-ph]').forEach(function(b){b.addEventListener('click',function(){show(cur+(+b.dataset.ph))})});
  $('#phClose').addEventListener('click',closeBox);
  addEventListener('keydown',function(e){if(box.hidden)return;if(e.key==='Escape')closeBox();if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
  var sx=null;box.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  box.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1));sx=null});
})();
})();
