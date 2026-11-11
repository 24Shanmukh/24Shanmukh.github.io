/* =========================================================
   RESEARCH — three papers from the CESS internship
   Edit the papers below: titles, summaries, findings and the
   "Then / Now" pairs. Full papers are not offered for download.
   ========================================================= */
(function(){
var PAPERS=[
 {k:'ashoka',c:'r',word:'Dharma',motif:'chakra',
  title:'Ethical Governance and Sustainability: Ashoka’s Legacy in Management',short:'Ashoka’s legacy in management',
  sum:'How Emperor Ashoka’s turn from conquest to Dharma after the Kalinga War gives today’s leaders a working model for ethical governance and sustainability.',
  pages:18,words:'5,000',method:'Thematic analysis of literature and Ashoka’s edicts',
  pdf:'',
  quote:['Amidst the tens of thousands of names of monarchs that crowd the columns of history… the name of Ashoka shines, and shines, almost alone, a star.','H. G. Wells, quoted in the paper'],
  obj:['Analyse Ashoka’s ethical governance principles as reflected in his edicts and administrative policies.','Examine how those principles affected the stability and prosperity of the Mauryan Empire.','Evaluate the role of Ashoka’s Dharma in social, economic and environmental sustainability.','Recommend ways to bring Ashoka’s principles into today’s corporate practice.'],
  find:[['Values became policy','Non-violence, compassion and justice were written into rock and pillar edicts and enforced by Dharma officers.'],
        ['Welfare built stability','Hospitals, rest houses, water conservation and fair administration earned trust and held a vast empire together.'],
        ['Sustainability, 2,000 years early','Care for animals and nature, alongside support for farming and trade, covered all three pillars of sustainability.'],
        ['Tolerance reduced conflict','Respect across faiths and cultures kept internal discord low and the empire united.']],
  pairs:[['Rock and pillar edicts','Sustainability reports and public disclosure'],['Dharma officers','Ethics and compliance teams'],['Hospitals, wells, rest houses','Corporate social responsibility'],['Respect for every faith','Diversity and inclusion'],['The turn after Kalinga','Reflective leadership after a crisis'],['Trade with ethics','Profit with purpose']]},
 {k:'ravana',c:'k',word:'Hubris',motif:'heads',
  title:'Ravana: Strategic Yet Flawed Leader',short:'Ravana’s leadership',
  sum:'A leadership reading of Ravana from the Ramayana: a brilliant strategist and administrator undone by pride, ignored counsel and poor emotional control.',
  pages:21,words:'6,900',method:'Thematic and comparative analysis',
  pdf:'',
  quote:['Leadership needs both vision and emotional intelligence, with ethics to ensure sustainable success.','From the paper’s findings'],
  obj:['Examine Ravana’s leadership qualities and strategic thinking.','Compare Ravana’s leadership with Rama’s.','Explore how Ravana’s leadership led to his downfall.','Add to the understanding of leadership in mythological contexts.'],
  find:[['Real strengths','He built Lanka’s prosperity, planned military campaigns well and combined scholarship with rule.'],
        ['Pride as a blind spot','Arrogance stopped him from seeing any view but his own.'],
        ['Counsel ignored','He rejected Vibhishana’s advice and lost a key ally when it mattered most.'],
        ['An emotional intelligence gap','Vendettas and impulsive decisions replaced judgement.'],
        ['Ethics decides how long success lasts','Early achievements were overshadowed by moral transgressions.']],
  vs:[['Decisions','Duty over desire: accepts exile to keep his father’s word.','Ambition over ethics: the abduction of Sita.'],
      ['Ethics','Holds to dharma even when it costs him.','Disregards the dharma and rights of others.'],
      ['Emotions','Patient and calm under personal pain.','Anger and pride cloud judgement, as with Hanuman.'],
      ['Legacy','A symbol of righteous leadership.','A warning: brilliance without restraint falls.']],
  pairs:[['Ignoring Vibhishana','Leaders who silence dissent'],['Ten heads of learning','Expertise without humility'],['The pursuit of Sita','Personal agenda over company goals'],['Golden Lanka','Strong vision and execution'],['Rash revenge','Decisions made in anger'],['The fall of Lanka','Why ethics sustains success']]},
 {k:'spirit',c:'w',word:'Purpose',motif:'rings',
  title:'Spirituality in the Workplace: Unlocking Self-Motivation for Corporate Success',short:'Spirituality at work',
  sum:'How purpose, mindfulness, values alignment and reflection at work turn into self-motivation, better well-being and stronger organisations.',
  pages:34,words:'10,900',method:'Review of literature and published studies',
  pdf:'',
  quote:['The most beautiful moments in life are moments when you are expressing your joy, not when you are seeking it.','Sadhguru, quoted in the paper'],
  obj:['Explore the relationship between workplace spirituality and self-motivation.','Examine its impact on employee well-being and productivity.','Understand how employees perceive spirituality at work.','Identify the challenges of bringing spirituality into diverse workplaces.'],
  find:[['Work starts to mean something','Values like integrity and compassion in management give people a purpose beyond the paycheck.'],
        ['Motivation moves inside','People act because the work matters to them, not because they are told to.'],
        ['Well-being improves','Mindfulness and reflection lower stress and burnout and raise emotional intelligence.'],
        ['Organisations get stronger','Better ethical decisions, more trust between colleagues, more cooperation.'],
        ['It has to stay inclusive','Practices must respect every background, or they exclude people instead.']],
  pairs:[['Mindfulness','Lower stress and burnout'],['Purpose','Self-motivation'],['Values alignment','Engagement and commitment'],['Reflective practice','Better ethical decisions'],['Shared meaning','Trust and cooperation'],['Flexible, inclusive policy','No one left out']]}
];
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* motifs: Ashoka chakra (24 spokes), ten heads, breathing rings */
function motif(m,big){
  if(m==='chakra'){var s='';for(var i=0;i<24;i++){var a=i*15*Math.PI/180;s+='<line x1="'+(100+18*Math.cos(a)).toFixed(1)+'" y1="'+(100+18*Math.sin(a)).toFixed(1)+'" x2="'+(100+78*Math.cos(a)).toFixed(1)+'" y2="'+(100+78*Math.sin(a)).toFixed(1)+'"/>'}
    return '<svg viewBox="0 0 200 200" class="rs-m rs-chakra" aria-hidden="true"><g class="rs-spin"><circle cx="100" cy="100" r="86" fill="none" stroke-width="6"/><circle cx="100" cy="100" r="16" fill="none" stroke-width="5"/>'+s+'</g></svg>'}
  if(m==='heads'){var h='',n=0;for(var k=0;k<10;k++){var ang=(196+k*(148/9))*Math.PI/180,x=100+74*Math.cos(ang),y=122+74*Math.sin(ang);
      h+='<circle class="rs-head" style="--k:'+k+'" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="9"/>'}
    return '<svg viewBox="0 0 200 200" class="rs-m rs-heads" aria-hidden="true">'+h+'<circle cx="100" cy="104" r="20" class="rs-crown"/><path d="M48 186 C58 150 80 134 100 134 C120 134 142 150 152 186" fill="none"/></svg>'}
  var r='';for(var j=0;j<5;j++)r+='<circle class="rs-ring" style="--j:'+j+'" cx="100" cy="100" r="'+(18+j*16)+'" fill="none"/>';
  return '<svg viewBox="0 0 200 200" class="rs-m rs-rings" aria-hidden="true">'+r+'<circle cx="100" cy="100" r="6" class="rs-core"/></svg>'}

/* section cards */
var grid=$('#rsGrid');if(!grid)return;
grid.innerHTML=PAPERS.map(function(p,i){return '<button class="rs-card '+p.c+' reveal" data-rs="'+i+'"><div class="rs-top"><span class="lbl">Paper 0'+(i+1)+'</span><span class="rs-word">'+p.word+'</span></div>'+motif(p.motif)+
  '<div class="rs-bot"><h3>'+p.title+'</h3><div class="rs-meta"><span>'+p.pages+' pages</span><span>'+p.method.split(' of ')[0]+'</span></div><span class="rs-open">Read the paper <b aria-hidden="true">→</b></span></div></button>'}).join('');
var cards=$$('.rs-card',grid);
if(matchMedia('(hover:hover)').matches&&!reduce)cards.forEach(function(c){
  c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateY('+(x*8)+'deg) rotateX('+(-y*8)+'deg) translateY(-6px)'});
  c.addEventListener('mouseleave',function(){c.style.transform=''})});
cards.forEach(function(c){c.addEventListener('click',function(){openPaper(+c.dataset.rs)})});

/* reader */
var box=$('#rsView'),body=$('#rsBody'),cur=0,back=null;
function render(p,i){
  var nx=PAPERS[(i+1)%PAPERS.length];
  var h='<div class="rs-hero '+p.c+'"><div class="rs-htxt"><div class="eyebrow">Research paper 0'+(i+1)+' · CESS, Bengaluru</div><h2 class="rs-ht" id="rsTitle">'+p.title+'</h2><p class="lede">'+p.sum+'</p>'+
    '<div class="rs-stats"><div><b>'+p.pages+'</b><span>pages</span></div><div><b>'+p.words+'</b><span>words</span></div><div><b>Qualitative</b><span>'+p.method+'</span></div></div>'+
    (p.pdf?'<a class="rs-pdf" href="'+p.pdf+'" target="_blank" rel="noopener">Read the full paper (PDF) <span aria-hidden="true">↗</span></a>':'')+'</div><div class="rs-hm">'+motif(p.motif,true)+'</div></div>';
  h+='<blockquote class="rs-quote"><p>“'+p.quote[0]+'”</p><cite>'+p.quote[1]+'</cite></blockquote>';
  h+='<div class="rs-sec"><h3>What it set out to do</h3><ol class="rs-obj">'+p.obj.map(function(o){return '<li>'+o+'</li>'}).join('')+'</ol></div>';
  h+='<div class="rs-sec"><h3>What it found</h3><div class="rs-find">'+p.find.map(function(f,k){return '<div class="rs-f" style="--d:'+(k*70)+'ms"><span>0'+(k+1)+'</span><h4>'+f[0]+'</h4><p>'+f[1]+'</p></div>'}).join('')+'</div></div>';
  if(p.vs)h+='<div class="rs-sec"><h3>Rama or Ravana?</h3><div class="rs-vs"><div class="rs-tog" role="tablist"><button class="on" data-side="1" role="tab" aria-selected="true">Rama</button><button data-side="2" role="tab" aria-selected="false">Ravana</button><i aria-hidden="true"></i></div><div class="rs-vrows">'+
    p.vs.map(function(v){return '<div class="rs-vr"><b>'+v[0]+'</b><p data-a="'+v[1].replace(/"/g,'&quot;')+'" data-b="'+v[2].replace(/"/g,'&quot;')+'">'+v[1]+'</p></div>'}).join('')+'</div></div></div>';
  h+='<div class="rs-sec"><h3>Then, and now</h3><p class="rs-hint">Tap a card to see its modern counterpart.</p><div class="rs-pairs">'+p.pairs.map(function(q){return '<button class="rs-pair"><span class="rs-pin"><span class="rs-face rs-then"><small>Then</small>'+q[0]+'</span><span class="rs-face rs-now"><small>Now</small>'+q[1]+'</span></span></button>'}).join('')+'</div></div>';
  h+='<div class="rs-sec rs-end">'+(p.pdf?'<a class="rs-pdf" href="'+p.pdf+'" target="_blank" rel="noopener">Read the full paper (PDF) <span aria-hidden="true">↗</span></a>':'')+'<button class="back-b" data-rsn="'+((i+1)%PAPERS.length)+'"><span aria-hidden="true">→</span>Next: '+nx.short+'</button></div>';
  return h}
function show(i){cur=(i+PAPERS.length)%PAPERS.length;var p=PAPERS[cur];body.innerHTML=render(p,cur);box.scrollTop=0;$('#rsCount').textContent='0'+(cur+1)+' / 0'+PAPERS.length;
  $$('.rs-pair',body).forEach(function(b){b.addEventListener('click',function(){b.classList.toggle('flip')})});
  $$('[data-rsn]',body).forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.rsn)})});
  $$('.rs-tog button',body).forEach(function(b){b.addEventListener('click',function(){var side=b.dataset.side,t=b.parentNode;
    $$('button',t).forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});t.classList.toggle('two',side==='2');
    $$('.rs-vr p',body).forEach(function(q,k){q.classList.add('swap');setTimeout(function(){q.textContent=side==='2'?q.dataset.b:q.dataset.a;q.classList.remove('swap')},180+k*40)})})});
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{root:box,threshold:.2});$$('.rs-f',body).forEach(function(f){io.observe(f)})}else $$('.rs-f',body).forEach(function(f){f.classList.add('in')})}
function openPaper(i){back=document.activeElement;box.hidden=false;document.documentElement.style.overflow='hidden';show(i);$('#rsBack').focus({preventScroll:true})}
function close(){box.hidden=true;document.documentElement.style.overflow='';if(back&&back.focus)back.focus({preventScroll:true})}
$('#rsBack').addEventListener('click',close);
addEventListener('keydown',function(e){if(box.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
window.RS={open:openPaper};
})();
