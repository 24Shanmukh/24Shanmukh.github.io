/* =========================================================
   ZEPTO SALES ANALYSIS (SQL) — project page
   Charts: images/zepto/  (built by scripts/make_charts.py)
   Reuses the VaR / technical-analysis page styles (vr-*, dl-*).
   REPO: paste the GitHub link once the repository is public.
   ========================================================= */
(function(){
var IMG='images/zepto/';
var REPO='https://github.com/24Shanmukh/Zepto-Sales-SQL-Analysis';

var CHARTS=[
 {k:'monthly',t:'Revenue grew every month',file:'make_charts.py · Chart 1',
  what:'Revenue from delivered orders for each month, January to June 2025.',
  read:'Revenue rose 64%, from ₹5.35 lakh to ₹8.76 lakh. Average order value stayed flat at about ₹475, so all the growth came from more orders, not bigger baskets.',
  code:'-- vw_monthly_kpis (12_views_and_report.sql)\nSELECT sales_month, revenue, orders\nFROM vw_monthly_kpis\nORDER BY sales_month;'},
 {k:'category',t:'Revenue leaders are not profit leaders',file:'make_charts.py · Chart 2',
  what:'Revenue (blue) and gross margin (orange) for all 12 categories, sorted by revenue.',
  read:'Atta, Rice & Dal is #2 in revenue at only a 9.4% margin. Personal Care, Snacks and Home & Cleaning earn 28–33% on much smaller sales.',
  code:'SELECT category_name, revenue, margin_pct\nFROM vw_category_performance\nORDER BY revenue;'},
 {k:'hourly',t:'Two daily peaks, and slower delivery',file:'make_charts.py · Chart 3',
  what:'Delivered orders by hour of day, with the peak hours highlighted.',
  read:'Orders peak at 8–9 AM and 7–9 PM (7 PM is the busiest hour). In those hours delivery slows from about 11.5 to 14.5 minutes.',
  code:'SELECT order_hour,\n       COUNT(DISTINCT order_id) AS orders\nFROM vw_sales\nGROUP BY order_hour\nORDER BY order_hour;'},
 {k:'season',t:'Summer triples ice cream demand',file:'make_charts.py · Chart 4',
  what:'Units sold each month, indexed so January = 100, for ice creams, cold drinks and everything else.',
  read:'From January to May, ice cream units grew 3.6× and cold drinks 2.6×, while all other categories grew 1.3×, in line with overall growth.',
  code:"SELECT sales_month,\n  SUM(CASE WHEN category_name = 'Ice Creams & Frozen'\n      THEN quantity ELSE 0 END) AS ice\nFROM vw_sales\nGROUP BY sales_month;"},
 {k:'city',t:'Chennai and Pune stores are under-used',file:'make_charts.py · Chart 5',
  what:'Revenue per dark store and average delivery time for each city.',
  read:'Bengaluru earns ₹2.58 lakh per store; Chennai only ₹0.93 lakh, although it delivers just as fast. Mumbai and Delhi NCR sell well but deliver about 2 minutes slower.',
  code:'SELECT v.city, v.revenue_per_store, d.avg_del\nFROM vw_city_performance AS v\nJOIN (SELECT s.city, AVG(o.delivery_time_mins) AS avg_del\n      FROM orders o JOIN dark_stores s USING (store_id)\n      GROUP BY s.city) AS d ON v.city = d.city;'}
];
var KPI=[['₹42.76 L','Revenue','Delivered orders only'],['20.3%','Gross margin','₹8.69 lakh gross profit'],['8,990','Delivered orders','of 9,723 placed'],['₹475.7','Average order value',''],['12.6 min','Average delivery',''],['82.9%','Repeat customers','ordered more than once']];
var CLEAN=[['16 spellings of 6 city names','GROUP BY BINARY city','TRIM() and UPDATE to standard names'],['8 duplicate customers','GROUP BY … HAVING COUNT(*) > 1','Rebuilt with SELECT DISTINCT, added a primary key'],['15 duplicated order lines','GROUP BY order_id, product_id','Deleted the later copy with a self-join DELETE'],['6 lines with quantity 0 or −1','WHERE quantity <= 0','Deleted as invalid'],['3 products with no brand','WHERE brand IS NULL','Filled from the product name'],['602 orders with no delivery time','WHERE delivery_time_mins IS NULL','506 were cancelled (blank is correct); kept the rest']];
var CITY=[['Bengaluru','5','₹12.92 L','₹2.58 L','11.7 min','36.3%',''],['Mumbai','4','₹10.19 L','₹2.55 L','13.7 min','16.5%','dn'],['Delhi NCR','4','₹8.23 L','₹2.06 L','13.6 min','17.9%','dn'],['Hyderabad','3','₹5.05 L','₹1.68 L','11.7 min','38.0%',''],['Pune','3','₹3.57 L','₹1.19 L','11.7 min','37.1%',''],['Chennai','3','₹2.80 L','₹0.93 L','11.8 min','33.6%','']];
var FIND=[
 ['+64%','Growth from more orders','Revenue grew every month while order value stayed flat at about ₹475.'],
 ['9.4%','Staples earn the least','Atta, Rice & Dal is #2 in revenue but has the thinnest margin.'],
 ['~17%','Within 10 min in Mumbai and Delhi','Against 34–38% in other cities: the 10-minute promise slips where demand is highest.'],
 ['54.5%','From the top 20% of customers','66 loyal customers alone bring about 20% of revenue.'],
 ['3.6×','Summer ice cream demand','Cold drinks 2.6×; other categories only 1.3×.'],
 ['0','Extra units from deeper discounts','About 1.43 units per line at any discount; 21%+ discounts earn the lowest margin.']
];
var RECS=['Add rider and picker capacity in Mumbai and Delhi NCR for 8–10 AM and 7–10 PM.','Grow demand in Chennai and Pune before opening more stores, starting with the 109 sign-ups who never ordered.','Nudge carts between ₹150 and ₹198 (7.4% of orders) to add one more high-margin item.','Replace blanket 20%+ discounts with targeted acquisition offers.','Bundle low-margin staples with high-margin snacks and personal care.','Stock ice creams and cold drinks from March for the summer peak.','Start a loyalty programme for the top 20% of customers.'];
var STEPS=[
 ['01_zepto_sales_setup.sql','Build the database','Six related tables with primary and foreign keys: categories, products, dark stores, customers, orders and order items (34,423 order lines).','CREATE TABLE orders (\n  order_id INT PRIMARY KEY,\n  customer_id INT,\n  store_id INT,\n  FOREIGN KEY (customer_id)\n    REFERENCES customers(customer_id)\n);'],
 ['05_cleaning.sql','Clean the messy data','Find each problem with a query first, then fix it. For example, 16 different spellings of six cities.','SELECT BINARY city, COUNT(*)\nFROM customers\nGROUP BY BINARY city;\n\nUPDATE customers SET city = TRIM(city);\nUPDATE customers SET city = \'Bengaluru\'\nWHERE city IN (\'Bangalore\', \'bengaluru\');'],
 ['06–08 aggregation and joins','Answer the business questions','KPIs with GROUP BY and HAVING, then joins across up to five tables. A LEFT JOIN finds customers who signed up but never ordered.','SELECT c.customer_id, c.customer_name\nFROM customers AS c\nLEFT JOIN orders AS o\n  ON c.customer_id = o.customer_id\nWHERE o.order_id IS NULL;'],
 ['10_ctes.sql','Segment the customers','A CTE counts each customer\'s orders, then CASE WHEN groups them into one-time, occasional, regular and loyal.','WITH customer_orders AS (\n  SELECT customer_id,\n         COUNT(DISTINCT order_id) AS orders\n  FROM orders GROUP BY customer_id\n)\nSELECT CASE WHEN orders = 1 THEN \'One-time\'\n            WHEN orders <= 5 THEN \'Occasional\'\n            ELSE \'Regular or loyal\' END AS segment\nFROM customer_orders;'],
 ['11_window_functions.sql','Rank, compare and split','RANK for the top 3 products in each category, LAG for month-on-month growth and NTILE(5) for the Pareto check.','RANK() OVER (PARTITION BY category_name\n             ORDER BY revenue DESC)\n\nLAG(revenue) OVER (ORDER BY sales_month)\n\nNTILE(5) OVER (ORDER BY spend DESC)'],
 ['12_views_and_report.sql','Save reusable views','Four views (sales, monthly KPIs, category and city performance) feed the executive summary and the charts.','CREATE OR REPLACE VIEW vw_city_performance AS\nSELECT city,\n  COUNT(DISTINCT store_code) AS stores,\n  ROUND(SUM(revenue) / COUNT(DISTINCT store_code))\n    AS revenue_per_store\nFROM vw_sales GROUP BY city;']
];
var CHARTCODE='def q(sql):\n    # run a query with the mysql client, read the result as a table\n    r = subprocess.run(["mysql", "-u", "root", "zepto_sales",\n                        "-B", "-e", sql], capture_output=True, text=True)\n    return pd.read_csv(io.StringIO(r.stdout), sep="\\t")\n\nm = q("SELECT sales_month, revenue FROM vw_monthly_kpis")\nax.bar(m.label, m.revenue / 1e5, color=BLUE)\nfig.savefig("reports/charts/01_monthly_revenue.png", dpi=160)';

function esc(s){return s.replace(/&(?!amp;|lt;|gt;)/g,'&amp;').replace(/</g,'&lt;')}
function hl(s){return esc(s).replace(/(--[^\n]*|#[^\n]*)|('[^'\n]*'|"[^"\n]*")|\b(SELECT|FROM|WHERE|JOIN|LEFT|ON|GROUP BY|ORDER BY|HAVING|AS|WITH|CASE|WHEN|THEN|ELSE|END|COUNT|SUM|AVG|ROUND|DISTINCT|UPDATE|SET|IN|IS NULL|CREATE|OR REPLACE|VIEW|TABLE|PRIMARY KEY|FOREIGN KEY|REFERENCES|INT|RANK|LAG|NTILE|OVER|PARTITION BY|DESC|USING|BINARY|TRIM|def|return)\b/g,function(m,c,q,k){return c?'<span class="c">'+c+'</span>':q?'<span class="m">'+q+'</span>':'<span class="f">'+k+'</span>'})}
function tbl(head,rows,fn){return '<div class="vr-tw"><table class="vr-t"><thead><tr>'+head.map(function(h){return '<th>'+h+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(fn).join('')+'</tbody></table></div>'}

function mount(el){
  el.innerHTML='<div class="vr ta zp">'+
   '<div class="vr-port"><div class="vr-ph"><span class="eyebrow">The question</span></div>'+
    '<p class="ta-q">Where does a quick-commerce business make its money, where is it losing speed, and what should it change next?</p>'+
    '<div class="ta-idx"><span><b>6 months</b>Jan to Jun 2025</span><span><b>22 dark stores</b>6 Indian cities</span><span><b>34,423</b>order lines</span></div>'+
    '<p class="vr-src"><b>Data note:</b> real Zepto sales data is not public, so the dataset is simulated with a Python script, with realistic Indian products, MRPs and built-in data-quality problems. All cleaning, SQL analysis and findings are my own work.</p></div>'+
   '<div class="vr-sec"><h3>Headline numbers</h3><div class="zp-kpis">'+KPI.map(function(k){return '<div><b>'+k[0]+'</b><span>'+k[1]+'</span>'+(k[2]?'<small>'+k[2]+'</small>':'')+'</div>'}).join('')+'</div></div>'+
   '<div class="vr-sec"><h3>The analysis, chart by chart</h3><p class="dl-sm">Each chart is drawn from the cleaned database; the query behind it is shown alongside.</p>'+
    '<div class="vr-tabs" role="tablist">'+CHARTS.map(function(c,i){return '<button role="tab" data-c="'+i+'"><i>'+(i+1)+'</i>'+c.t+'</button>'}).join('')+'</div>'+
    '<div class="vr-stage" id="zpStage"></div></div>'+
   '<div class="vr-sec zp-how"><div class="dl-learnhead"><div><div class="eyebrow">How the charts were made</div><h3>From SQL views to charts in Python</h3></div><p>scripts/make_charts.py</p></div>'+
    '<ol class="zp-flow"><li><b>SQL views</b><span>The final SQL file saves four views: <code>vw_sales</code>, <code>vw_monthly_kpis</code>, <code>vw_category_performance</code> and <code>vw_city_performance</code>. Every chart reads from these, so its numbers match the report exactly.</span></li>'+
    '<li><b>Query from Python</b><span>A small helper runs each query through the MySQL command-line client and loads the result into a pandas table.</span></li>'+
    '<li><b>Draw with Matplotlib</b><span>Bar charts for revenue, hours and cities; side-by-side bars so revenue and margin share one category order; a line chart indexed to January = 100 so categories of different sizes compare fairly.</span></li>'+
    '<li><b>Make them readable</b><span>The title of each chart states the finding, not just the topic. Blue for the main measure, orange for the second, grey for context; peak hours highlighted; values labelled on the bars; saved as PNG at 160 dpi.</span></li></ol>'+
    '<pre class="vr-code"><code>'+hl(CHARTCODE)+'</code></pre></div>'+
   '<div class="vr-sec"><h3>Cleaning the raw data</h3><p class="dl-sm">Each problem was found with a query before it was fixed. Missing emails and phone numbers were also documented but not needed for sales analysis.</p>'+tbl(['Problem','Found with','Fix'],CLEAN,function(r){return '<tr><th scope="row">'+r[0]+'</th><td><code>'+esc(r[1])+'</code></td><td>'+r[2]+'</td></tr>'})+'</div>'+
    '<div class="vr-sec"><h3>City and store performance</h3>'+tbl(['City','Stores','Revenue','Per store','Avg delivery','In 10 min'],CITY,function(r){return '<tr><th scope="row">'+r[0]+'</th><td>'+r[1]+'</td><td>'+r[2]+'</td><td><b>'+r[3]+'</b></td><td class="ta-'+r[6]+'">'+r[4]+'</td><td class="ta-'+r[6]+'">'+r[5]+'</td></tr>'})+'<p class="dl-sm">Red: delivery slower than the other cities.</p></div>'+
   '<div class="vr-sec"><h3>What it found</h3><div class="dl-ins vr-find">'+FIND.map(function(f){return '<div class="dl-in"><b>'+f[0]+'</b><h4>'+f[1]+'</h4><p>'+f[2]+'</p></div>'}).join('')+'</div></div>'+
   '<div class="vr-sec"><h3>Recommendations</h3><ol class="zp-recs">'+RECS.map(function(r){return '<li>'+r+'</li>'}).join('')+'</ol>'+
    '<p class="ta-concl"><b>Limits:</b> <span>simulated data, a single cost price per product (so margin is product gross margin, not net profit), and six months only.</span></p></div>'+
   '<div class="vr-sec"><div class="dl-learnhead"><div><div class="eyebrow">Learn to build it</div><h3>Twelve SQL files, basic to advanced</h3></div><p>MySQL 8 · run in order</p></div>'+
    '<div class="dl-steps">'+STEPS.map(function(s,i){return '<details class="dl-step"'+(i===0?' open':'')+'><summary><i>'+(i+1)+'</i><span>'+s[1]+' <code class="vr-fn">'+s[0]+'</code></span><b aria-hidden="true"></b></summary><div class="vr-sb"><p>'+s[2]+'</p><pre class="vr-code"><code>'+hl(s[3])+'</code></pre></div></details>'}).join('')+'</div>'+
    '<p class="dl-sm" style="margin-top:14px">Business rule used throughout: revenue = quantity × selling price, for delivered orders only.</p></div>'+
   (REPO?'<div class="dl-repo"><div><div class="eyebrow">Get the files</div><h3>Run it yourself</h3><p>All 12 SQL files, the data and the report are on GitHub.</p><div class="dl-id"><a href="'+REPO+'" target="_blank" rel="noopener">'+REPO.replace('https://','')+'</a></div></div><div class="vr-dls"><a class="dl-big" href="'+REPO+'" target="_blank" rel="noopener">Open the repository ↗</a></div></div>'+
   '<div class="gh-ask"><span class="gh-star" aria-hidden="true">★</span><div><b>Found this useful?</b><p>Star the repo and follow <a href="https://github.com/24Shanmukh" target="_blank" rel="noopener">@24Shanmukh</a> for more finance and data projects.</p></div><div class="gh-btns"><a href="'+REPO+'" target="_blank" rel="noopener">★ Star on GitHub</a><a href="https://github.com/24Shanmukh" target="_blank" rel="noopener">Follow</a></div></div>':'')+
   '<div class="dl-lb" id="zpLb" hidden><button class="ph-x" id="zpLbX" aria-label="Close">✕</button><div class="dl-lbin vr-lbin"><img id="zpLbImg" alt=""></div></div>'+
  '</div>';
  var $=function(s){return el.querySelector(s)},tabs=[].slice.call(el.querySelectorAll('.vr-tabs button')),stage=$('#zpStage');
  function src(k){return (window.ZP_IMGS&&ZP_IMGS[k])||IMG+k+'.webp'}
  function show(i){var c=CHARTS[i];tabs.forEach(function(b,k){b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i)});
    stage.innerHTML='<figure class="vr-fig"><button class="vr-img" aria-label="Open the chart full size"><img src="'+src(c.k)+'" alt="'+c.t+'"></button><figcaption>From <code>'+c.file+'</code> · tap to enlarge</figcaption></figure>'+
     '<div class="vr-side"><small>Chart '+(i+1)+' of '+CHARTS.length+'</small><h4>'+c.t+'</h4><dl><div><dt>What it shows</dt><dd>'+c.what+'</dd></div><div><dt>How to read it</dt><dd>'+c.read+'</dd></div></dl><pre class="vr-code"><code>'+hl(c.code)+'</code></pre>'+
     '<div class="dl-nav"><button data-d="-1" aria-label="Previous chart">←</button><button data-d="1" aria-label="Next chart">→</button></div></div>';
    stage.querySelector('.vr-img').addEventListener('click',function(){$('#zpLbImg').src=src(c.k);$('#zpLbImg').alt=c.t;$('#zpLb').hidden=false});
    [].forEach.call(stage.querySelectorAll('[data-d]'),function(b){b.addEventListener('click',function(){show((i+(+b.dataset.d)+CHARTS.length)%CHARTS.length)})})}
  tabs.forEach(function(b,i){b.addEventListener('click',function(){show(i)})});show(0);
  $('#zpLbX').addEventListener('click',function(){$('#zpLb').hidden=true});
  $('#zpLb').addEventListener('click',function(e){if(e.target.id==='zpLb')$('#zpLb').hidden=true});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!$('#zpLb').hidden){$('#zpLb').hidden=true;e.stopPropagation()}},true);
}
window.ZEP={mount:mount};
})();
