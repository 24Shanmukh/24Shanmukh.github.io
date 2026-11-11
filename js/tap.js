/* =========================================================
   TECHNICAL ANALYSIS — project page
   Moving averages, MACD and Bollinger Bands on Nifty IT,
   Nifty Healthcare and Nifty Bank. Charts: images/ta/
   Reuses the VaR page styles (vr-*, dl-*).
   ========================================================= */
(function(){
var IMG='images/ta/';
var REPO='https://github.com/24Shanmukh/Technical-Analysis-IT-Healthcare';

var CHARTS=[
 {k:'growth',t:'Three sectors, three different years',file:'analysis.py · Part 1',
  what:'₹100 invested in each index on 17 Oct 2024, tracked for a year.',
  read:'Nifty Bank rose 12.5% with the lowest volatility, Healthcare finished flat (+1.2%), and IT fell 18.2% with a 29.3% drawdown.',
  code:'growth = data / data.iloc[0] * 100\nvol = returns.std() * np.sqrt(252)\ndrawdown = (data / data.cummax() - 1).min()'},
 {k:'it',t:'Nifty IT: crosses in a falling market',file:'analysis.py · Part 3',
  what:'Price with the 20-day and 50-day moving averages, Bollinger Bands shaded, golden (▲) and death (▼) crosses, and MACD below.',
  read:'The 17 Jan death cross came before the slide to the April low. In September–October the price went sideways and produced four crosses in four weeks: classic whipsaws.',
  code:'sma20 = close.rolling(20).mean()\nsma50 = close.rolling(50).mean()\nchange = (sma20 > sma50).astype(int).diff()\n# +1 = golden cross, -1 = death cross'},
 {k:'health',t:'Nifty Healthcare: the best trade',file:'analysis.py · Part 4',
  what:'The same chart for Healthcare, the defensive sector.',
  read:'Buying the 7 Apr golden cross and selling the 29 Aug death cross returned +9.97%, turning a flat year into +10.5% for the strategy.',
  code:'if row["Signal"] == "Golden cross (buy)":\n    buy_price = row["Price"]\nelif buy_price:\n    profit = row["Price"] / buy_price - 1'},
 {k:'bank',t:'Nifty Bank: where lag costs',file:'analysis.py · Part 4',
  what:'The same chart for Bank, the rate-sensitive sector.',
  read:'The 27 Mar golden cross caught the rally, but in a steady uptrend the strategy entered late and exited early: +10.9% against +13.3% for buy and hold.',
  code:'upper = sma20 + 2 * close.rolling(20).std()\nlower = sma20 - 2 * close.rolling(20).std()\nmacd = close.ewm(span=12).mean() - close.ewm(span=26).mean()'}
];
var RISK=[['Nifty Bank','+12.53%','13.97%','−10.73%','up'],['Nifty Healthcare','+1.23%','16.09%','−15.85%',''],['Nifty IT','−18.21%','22.03%','−29.30%','dn']];
var STRAT=[['Nifty Healthcare','2','+10.52%','−0.53%','Strategy +11.1 pts','win'],['Nifty IT','3','−7.45%','−20.52%','Lost 13.1 pts less','win'],['Nifty Bank','2','+10.91%','+13.27%','Buy and hold +2.4 pts','lose']];
var SIG=[['MACD bullish cross (buy)','33.3% (7)','60.0% (11)','57.1% (8)'],['MACD bearish cross (sell)','50.0% (7)','50.0% (11)','28.6% (8)'],['Close below lower band (buy)','42.9% (8)','50.0% (5)','33.3% (6)'],['Close above upper band (sell)','100.0% (5)','60.0% (5)','40.0% (7)']];
var FIND=[
 ['8 of 9','Crosses caught the trend','Checkable golden and death crosses moved the expected way within 20 trading days.'],
 ['2 of 3','Strategy beat buy and hold','In IT and Healthcare, by staying out of the big falls.'],
 ['+9.97%','Best single trade','Nifty Healthcare, bought 7 Apr 2025 and sold 29 Aug 2025.'],
 ['Lag','Weak in steady uptrends','Moving averages confirm a trend late, so Bank lagged buy and hold.'],
 ['29–60%','MACD alone is a coin toss','Best used as confirmation of the moving-average trend.'],
 ['5 of 5','Bands work with the trend','In falling IT, every close above the upper band was followed by a fall.']
];
var STEPS=[
 ['download_data.py','Get and clean the prices','Nifty IT and Nifty Bank from Yahoo Finance, Nifty Healthcare from NSE data. Sort by date, drop duplicates and zero prices, fill single missing days, and flag daily moves above 10%.','data = data.sort_index()\ndata = data[~data.index.duplicated()]\ndata = data.where(data > 0).ffill()'],
 ['analysis.py · 1','Measure return and risk','Total return, yearly volatility and maximum drawdown for each index, plus a growth-of-100 chart.','vol = returns.std() * np.sqrt(252)\ndd = (data / data.cummax() - 1).min()'],
 ['analysis.py · 2','Find golden and death crosses','A golden cross is SMA 20 crossing above SMA 50; a death cross is the opposite. Record each one and the price move over the next 20 trading days.','above = sma20 > sma50\nchange = above.astype(int).diff()\nlater = close.shift(-20)[date]'],
 ['analysis.py · 3','Chart every index','Price, both moving averages, Bollinger Bands (20 days, ±2 standard deviations), the crosses, and MACD (12, 26, 9) underneath.','upper = sma20 + 2 * close.rolling(20).std()\nsignal = macd.ewm(span=9).mean()'],
 ['analysis.py · 4','Test the strategy','Buy at each golden cross, sell at the next death cross, value any open trade at the last price, and compare with buy and hold from day 50.','strategy = (1 + profits).prod() - 1\nhold = close.iloc[-1] / close.iloc[49] - 1'],
 ['analysis.py · 5','Score MACD and Bollinger signals','For every MACD crossover and band break, check whether the price moved the right way over the next 20 days.','right = moves > 0 if "buy" in label else moves < 0\nworked = right.mean()']
];

function esc(s){return s.replace(/&(?!amp;|lt;|gt;)/g,'&amp;').replace(/</g,'&lt;')}
function hl(s){return esc(s).replace(/(#[^\n]*)|("[^"\n]*")|\b(np|pd)\./g,function(m,c,q,lib){return c?'<span class="c">'+c+'</span>':q?'<span class="m">'+q+'</span>':'<span class="f">'+lib+'</span>.'})}
function tbl(head,rows,fn){return '<div class="vr-tw"><table class="vr-t"><thead><tr>'+head.map(function(h){return '<th>'+h+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(fn).join('')+'</tbody></table></div>'}

function mount(el){
  el.innerHTML='<div class="vr ta">'+
   '<div class="vr-port"><div class="vr-ph"><span class="eyebrow">The question</span></div>'+
    '<p class="ta-q">Do golden and death crosses, MACD and Bollinger Bands give useful signals, and does trading the crosses beat simply holding the index?</p>'+
    '<div class="ta-idx"><span><b>Nifty IT</b>Export-driven</span><span><b>Nifty Healthcare</b>Defensive</span><span><b>Nifty Bank</b>Rate-sensitive</span></div>'+
    '<p class="vr-src">Daily closing prices, 17 Oct 2024 to 17 Oct 2025. Yahoo Finance and NSE.</p></div>'+
   '<div class="vr-sec"><h3>The analysis, chart by chart</h3><p class="dl-sm">Every chart below is the real output of the Python scripts.</p>'+
    '<div class="vr-tabs" role="tablist">'+CHARTS.map(function(c,i){return '<button role="tab" data-c="'+i+'"><i>'+(i+1)+'</i>'+c.t+'</button>'}).join('')+'</div>'+
    '<div class="vr-stage" id="taStage"></div></div>'+
   '<div class="vr-sec vr-tables"><div><h3>Return and risk</h3>'+tbl(['Index','Return','Volatility','Max drawdown'],RISK,function(r){return '<tr><th scope="row">'+r[0]+'</th><td class="ta-'+r[4]+'">'+r[1]+'</td><td>'+r[2]+'</td><td>'+r[3]+'</td></tr>'})+'<p class="dl-sm">One year, yearly volatility.</p></div>'+
    '<div><h3>Golden-cross strategy vs buy and hold</h3>'+tbl(['Index','Trades','Strategy','Buy and hold','Result'],STRAT,function(r){return '<tr><th scope="row">'+r[0]+'</th><td>'+r[1]+'</td><td><b>'+r[2]+'</b></td><td>'+r[3]+'</td><td><span class="pill '+(r[5]==='win'?'ok':'yel')+'">'+r[4]+'</span></td></tr>'})+'<p class="dl-sm">Trading costs not included.</p></div></div>'+
   '<div class="vr-sec"><h3>How often each signal was right</h3>'+tbl(['Signal','Nifty IT','Nifty Healthcare','Nifty Bank'],SIG,function(r){return '<tr><th scope="row">'+r[0]+'</th>'+r.slice(1).map(function(x){var v=parseFloat(x);return '<td class="'+(v>=60?'ta-up':v<40?'ta-dn':'')+'">'+x+'</td>'}).join('')+'</tr>'})+'<p class="dl-sm">Share of signals followed by a move in the right direction within 20 trading days (number of signals in brackets).</p></div>'+
   '<div class="vr-sec"><h3>What it found</h3><div class="dl-ins vr-find">'+FIND.map(function(f){return '<div class="dl-in"><b>'+f[0]+'</b><h4>'+f[1]+'</h4><p>'+f[2]+'</p></div>'}).join('')+'</div>'+
    '<p class="ta-concl"><b>Conclusion:</b> moving averages were the most reliable tool and worked best as risk control. MACD is best as confirmation, and Bollinger Bands for short-term extremes in the direction of the trend. <span>Limits: one year of data, few trades, no costs, price indices exclude dividends.</span></p></div>'+
   '<div class="vr-sec"><div class="dl-learnhead"><div><div class="eyebrow">Learn to build it</div><h3>Technical analysis in two Python files</h3></div><p>Run download_data.py, then analysis.py.</p></div>'+
    '<div class="dl-steps">'+STEPS.map(function(s,i){return '<details class="dl-step"'+(i===0?' open':'')+'><summary><i>'+(i+1)+'</i><span>'+s[1]+' <code class="vr-fn">'+s[0]+'</code></span><b aria-hidden="true"></b></summary><div class="vr-sb"><p>'+s[2]+'</p><pre class="vr-code"><code>'+hl(s[3])+'</code></pre></div></details>'}).join('')+'</div>'+
    '<p class="dl-sm" style="margin-top:14px">Libraries: pandas, NumPy, Matplotlib, yfinance and openpyxl.</p></div>'+
   (REPO?'<div class="dl-repo"><div><div class="eyebrow">Get the files</div><h3>Run it yourself</h3><p>The full code, data and results are on GitHub.</p><div class="dl-id"><a href="'+REPO+'" target="_blank" rel="noopener">'+REPO.replace('https://','')+'</a></div></div><div class="vr-dls"><a class="dl-big" href="'+REPO+'" target="_blank" rel="noopener">Open the repository ↗</a></div></div>'+
   '<div class="gh-ask"><span class="gh-star" aria-hidden="true">★</span><div><b>Found this useful?</b><p>Star the repo and follow <a href="https://github.com/24Shanmukh" target="_blank" rel="noopener">@24Shanmukh</a> for more finance and data projects.</p></div><div class="gh-btns"><a href="'+REPO+'" target="_blank" rel="noopener">★ Star on GitHub</a><a href="https://github.com/24Shanmukh" target="_blank" rel="noopener">Follow</a></div></div>':'')+
   '<div class="dl-lb" id="taLb" hidden><button class="ph-x" id="taLbX" aria-label="Close">✕</button><div class="dl-lbin vr-lbin"><img id="taLbImg" alt=""></div></div>'+
  '</div>';
  var $=function(s){return el.querySelector(s)},tabs=[].slice.call(el.querySelectorAll('.vr-tabs button')),stage=$('#taStage');
  function src(k){return (window.TA_IMGS&&TA_IMGS[k])||IMG+k+'.webp'}
  function show(i){var c=CHARTS[i];tabs.forEach(function(b,k){b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i)});
    stage.innerHTML='<figure class="vr-fig"><button class="vr-img" aria-label="Open the chart full size"><img src="'+src(c.k)+'" alt="'+c.t+'"></button><figcaption>From <code>'+c.file+'</code> · tap to enlarge</figcaption></figure>'+
     '<div class="vr-side"><small>Chart '+(i+1)+' of '+CHARTS.length+'</small><h4>'+c.t+'</h4><dl><div><dt>What it shows</dt><dd>'+c.what+'</dd></div><div><dt>How to read it</dt><dd>'+c.read+'</dd></div></dl><pre class="vr-code"><code>'+hl(c.code)+'</code></pre>'+
     '<div class="dl-nav"><button data-d="-1" aria-label="Previous chart">←</button><button data-d="1" aria-label="Next chart">→</button></div></div>';
    stage.querySelector('.vr-img').addEventListener('click',function(){$('#taLbImg').src=src(c.k);$('#taLbImg').alt=c.t;$('#taLb').hidden=false});
    [].forEach.call(stage.querySelectorAll('[data-d]'),function(b){b.addEventListener('click',function(){show((i+(+b.dataset.d)+CHARTS.length)%CHARTS.length)})})}
  tabs.forEach(function(b,i){b.addEventListener('click',function(){show(i)})});show(0);
  $('#taLbX').addEventListener('click',function(){$('#taLb').hidden=true});
  $('#taLb').addEventListener('click',function(e){if(e.target.id==='taLb')$('#taLb').hidden=true});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!$('#taLb').hidden){$('#taLb').hidden=true;e.stopPropagation()}},true);
}
window.TAP={mount:mount};
})();
