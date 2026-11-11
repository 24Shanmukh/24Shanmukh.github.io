/* =========================================================
   ACTUAL vs BUDGET — project page
   The real dashboard screenshot with numbered hotspots, plus a
   learning guide for anyone who wants to build one like it.
   (The old interactive replica is kept in extras/.)
   ========================================================= */
(function(){
var IMG='images/pbi/dashboard.webp',FULL='images/pbi/dashboard-full.png';
var REPO='https://github.com/24Shanmukh/Actual-vs-Budget-Financial-Analysis-PowerBI',GH='https://github.com/24Shanmukh',GHID='24Shanmukh';

/* hotspots: x/y are % positions on the screenshot */
var HS=[
 {x:1.6,y:12.6,t:'Year slicer',v:'Tile slicer',f:['Data[Year]'],how:'Insert a Slicer, add Year, then Format → Slicer settings → Style: Tile. One click filters the whole page.',see:'Two years of data: 2020 and 2021.'},
 {x:1.6,y:44,t:'Month slicer',v:'Slicer (list)',f:['tbl_Budget[Month]'],how:'Use Month from the budget table, not the sales table, so one click filters actuals and budget together.',see:'Pick several months to compare a season against plan.'},
 {x:1.6,y:84,t:'Segment slicer',v:'Slicer (list)',f:['Data[Segment]'],how:'A second list slicer, styled in navy so it reads as a different kind of filter from the months.',see:'Five segments, from Channel Partners to Small Business.'},
 {x:75.6,y:8,t:'Quarter slicer',v:'Tile slicer',f:['tbl_Budget[Quarter]'],how:'Placed in the header so the time filters sit together at the top of the page.',see:'Jump straight to Q1–Q4.'},
 {x:37.7,y:14.6,t:'KPI cards',v:'Card × 4',f:['[ACTUAL REVENUE]','[ACTUAL PROFIT]','[PROFIT %]','[ACTUAL UNITS]','Reference label: variance %'],how:'New card visual → Reference labels → add the variance measure, label it “COMPARED TO BUDGET”, then use conditional formatting: green if ≥ 0, red if < 0.',see:'Revenue beat budget (+1.83%), but profit (−6.62%), margin (−2.39%) and units (−4.93%) fell short.'},
 {x:64.6,y:34.6,t:'Actual vs budget line',v:'Line chart',f:['X: tbl_Budget[Month]','Y: [ACTUAL REVENUE]','Y: [BUDGET] (dashed)'],how:'Two measures on one axis. Format → Lines: smooth interpolation; set the Budget series to a dashed orange line.',see:'Actuals dipped below plan in Feb and Oct and peaked in July.'},
 {x:98.4,y:34.6,t:'Profit by product',v:'Donut chart',f:['Legend: Data[Product_Name]','Values: [ACTUAL PROFIT]'],how:'Sort by profit descending and put total profit in the centre with a card placed on top of the donut.',see:'City Cruiser is the largest slice of profit.'},
 {x:44,y:69.8,t:'Revenue by country',v:'Column chart',f:['X: Data[Country]','Y: [ACTUAL REVENUE]'],how:'Sort by revenue descending and turn on data labels so nobody has to read the axis.',see:'Japan leads at £33M; Canada is lowest at £19M.'},
 {x:74.8,y:69.8,t:'Revenue by segment',v:'Treemap',f:['Category: Data[Segment]','Values: [ACTUAL REVENUE]'],how:'Area equals share, so the biggest segment is obvious. Keep the colours consistent with the rest of the page.',see:'Government (£95M) and Small Business (£76M) bring most of the revenue.'},
 {x:98.4,y:69.8,t:'Units by product',v:'Bar chart',f:['Y: Data[Product_Name]','X: [ACTUAL UNITS]'],how:'Horizontal bars make long product names easy to read. Sorted by units, largest first.',see:'City Cruiser sold 405.89K units, about twice any other product.'}
];
var INS=[
 ['£213.98M','Revenue beat the budget','+1.83% against plan.','up'],
 ['£56.43M','Profit missed it','−6.62% against plan, so margin slipped to 26.37%. Costs ran ahead of plan.','dn'],
 ['1.35M units','Volume fell short','−4.93% against plan. The revenue beat came from price and mix, not from selling more.','dn'],
 ['405.89K','One product carries volume','City Cruiser sold about twice as many units as any other product.','']
];
var STEPS=[
 ['Load and clean the data',['Get Data → load the sales file as a table called Data.','In Power Query, set data types, trim text and remove blank rows before you load.','Keep one row per sale: product, segment, country, date and the sales figures.']],
 ['Add a budget table',['Load the plan as tbl_Budget with Month, Quarter and the budget figures.','Model view → drag Month from tbl_Budget onto Month in Data to create the relationship.','Now one Month or Quarter slicer filters actuals and budget together.']],
 ['Create a measure table',['Home → Enter data → name the table METRIC TABLE and load it empty.','Create every measure inside it, then delete the placeholder column. The table moves to the top of the field list.','Nine measures: four actuals, BUDGET, and four variances.']],
 ['Write the variance measures',['Each variance is (actual − budget) ÷ budget.','Use DIVIDE instead of “/” so a filter with no budget shows blank instead of an error.','Profit % variance is a difference in percentage points, not a percent of a percent.']],
 ['Design the page',['Set the canvas to 1340 × 789 and lay out a grid: slicers left, header and KPIs top, charts below.','Use one colour per meaning: green for actual, orange for budget, red and green only for variance.','Add small icons to the KPI cards so each card reads before its number does.']],
 ['Make it explorable',['Keep the default cross-filtering on: clicking a country or product filters everything else.','Check Format → Edit interactions so each visual filters the others the way you expect.','Test every slicer combination before you publish.']]
];
var DAX=[
 ['ACTUAL REVENUE','SUM ( Data[Revenue] )','Total sales for whatever is filtered.'],
 ['PROFIT %','DIVIDE ( [ACTUAL PROFIT], [ACTUAL REVENUE] )','Margin. DIVIDE returns blank instead of an error when revenue is zero.'],
 ['REVENUE VAR %','DIVIDE ( [ACTUAL REVENUE] - [BUDGET], [BUDGET] )','How far revenue is above or below plan.'],
 ['PROFIT % VAR','[PROFIT %] - [BUDGET PROFIT %]','Margin compared in percentage points.']
];
function code(s){return s.replace(/(\[[^\]]+\])/g,'<span class="m">$1</span>').replace(/\b(SUM|DIVIDE)\b/g,'<span class="f">$1</span>')}

function mount(el){
  el.innerHTML=
  '<div class="dl">'+
   '<div class="dl-bar"><span><b class="av-live"></b>The original report, built in Power BI Desktop</span><span class="dl-acts"><a class="dl-gh" href="'+REPO+'" target="_blank" rel="noopener"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>View on GitHub</a><button class="dl-zoom" id="dlZoom">Full size ↗</button></span></div>'+
   '<figure class="dl-fig"><div class="dl-shot" id="dlShot"><img src="'+IMG+'" alt="Shanmukha Badiger’s Power BI sales dashboard: actual versus budget revenue, profit, margin and units, with charts by month, product, country and segment" width="2930" height="1724">'+
    HS.map(function(h,i){return '<button class="dl-hs" style="left:'+h.x+'%;top:'+h.y+'%" data-i="'+i+'" aria-label="'+(i+1)+': '+h.t+'"><span>'+(i+1)+'</span></button>'}).join('')+
   '</div><figcaption>Tap a number to see how that part was built.</figcaption></figure>'+
   '<div class="dl-panel" id="dlPanel" aria-live="polite"></div>'+
   '<div class="dl-sec"><h3>What the dashboard says</h3><div class="dl-ins">'+INS.map(function(x){return '<div class="dl-in '+x[3]+'"><b>'+x[0]+'</b><h4>'+x[1]+'</h4><p>'+x[2]+'</p></div>'}).join('')+'</div></div>'+
   '<div class="dl-sec"><div class="dl-learnhead"><div><div class="eyebrow">Learn to build it</div><h3>Six steps from a spreadsheet to this page</h3></div><p>Follow along with the .pbix from GitHub open next to you.</p></div>'+
    '<div class="dl-steps">'+STEPS.map(function(s,i){return '<details class="dl-step"'+(i===0?' open':'')+'><summary><i>'+(i+1)+'</i><span>'+s[0]+'</span><b aria-hidden="true"></b></summary><ul>'+s[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></details>'}).join('')+'</div></div>'+
   '<div class="dl-sec"><h3>The DAX behind the cards</h3><p class="dl-sm">The pattern behind measures like these. Column names are illustrative.</p><div class="dl-dax">'+DAX.map(function(d){return '<div class="dl-dx"><pre><code><span class="n">'+d[0]+'</span> =\n    '+code(d[1])+'</code></pre><p>'+d[2]+'</p></div>'}).join('')+'</div></div>'+
   '<div class="dl-repo"><div><div class="eyebrow">Get the files</div><h3>Open it, take it apart, build your own</h3><p>The full .pbix, the dashboard image and a README with the KPIs and insights are on GitHub.</p><div class="dl-id"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg><a href="'+GH+'" target="_blank" rel="noopener">github.com/'+GHID+'</a></div></div>'+
    '<div class="dl-rbtn"><a class="dl-big" href="'+REPO+'" target="_blank" rel="noopener">Open the repository <span aria-hidden="true">↗</span></a></div></div>'+
   '<div class="gh-ask"><span class="gh-star" aria-hidden="true">★</span><div><b>Found this useful?</b><p>Star the repo and follow <a href="https://github.com/24Shanmukh" target="_blank" rel="noopener">@24Shanmukh</a> for more finance and data projects.</p></div><div class="gh-btns"><a href="'+REPO+'" target="_blank" rel="noopener">★ Star on GitHub</a><a href="https://github.com/24Shanmukh" target="_blank" rel="noopener">Follow</a></div></div>'+
   '<div class="dl-lb" id="dlLb" hidden><button class="ph-x" id="dlLbX" aria-label="Close">✕</button><div class="dl-lbin"><img id="dlLbImg" alt="Sales dashboard at full size"></div></div>'+
  '</div>';
  var $=function(s){return el.querySelector(s)},$$=function(s){return [].slice.call(el.querySelectorAll(s))};
  var panel=$('#dlPanel'),hs=$$('.dl-hs');
  function pick(i){var h=HS[i];hs.forEach(function(b,k){b.classList.toggle('on',k===i)});
    panel.innerHTML='<div class="dl-pn"><span>'+(i+1)+'</span><div><small>'+h.v+'</small><h4>'+h.t+'</h4></div><div class="dl-nav"><button data-d="-1" aria-label="Previous">←</button><button data-d="1" aria-label="Next">→</button></div></div>'+
     '<div class="dl-pg"><div><dt>Fields</dt><dd>'+h.f.map(function(f){return '<code>'+f+'</code>'}).join('')+'</dd></div><div><dt>How it’s built</dt><dd>'+h.how+'</dd></div><div><dt>What it shows</dt><dd>'+h.see+'</dd></div></div>';
    panel.querySelectorAll('[data-d]').forEach(function(b){b.addEventListener('click',function(){pick((i+(+b.dataset.d)+HS.length)%HS.length)})})}
  hs.forEach(function(b){b.addEventListener('click',function(){pick(+b.dataset.i)})});
  pick(4);
  var lb=$('#dlLb');
  $('#dlZoom').addEventListener('click',function(){$('#dlLbImg').src=FULL;lb.hidden=false});
  $('#dlLbX').addEventListener('click',function(){lb.hidden=true});
  lb.addEventListener('click',function(e){if(e.target===lb)lb.hidden=true});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden){lb.hidden=true;e.stopPropagation()}},true);
}
window.AVB={mount:mount,IMG:IMG,REPO:REPO};
})();
