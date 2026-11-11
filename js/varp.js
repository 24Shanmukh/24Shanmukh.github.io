/* =========================================================
   VALUE AT RISK — project page
   Real charts and numbers from the Python project, a findings
   section and a step-by-step guide built on the actual code.
   Images: images/var/   Downloads: assets/var/
   ========================================================= */
(function(){
var IMG='images/var/';
var GUIDE='assets/var/VaR_from_Scratch_Guide.pdf';
var REPO='https://github.com/24Shanmukh/VaR-Risk-Engine';   // <- paste the GitHub link for this project here when it's uploaded

var HOLD=[['Reliance',12,'s'],['HDFC Bank',12,'s'],['ICICI Bank',10,'s'],['Infosys',10,'s'],['TCS',10,'s'],['ITC',8,'s'],['L&amp;T',8,'s'],['Bharti Airtel',8,'s'],['Gold ETF',12,'g'],['US Dollar',10,'u']];

var CHARTS=[
 {k:'histogram',t:'Where the 1% tail starts',file:'var_basic.py',
  what:'Every trading day since 2015 as a histogram of portfolio returns. The red line is historical 99% VaR (1.90%), the dashed blue line is parametric VaR (1.79%).',
  read:'The bell curve slightly underestimates the tail at 99%: real returns have fatter tails (excess kurtosis of 20).',
  code:'hist_1day = -np.percentile(returns, (1 - cl) * 100)\n\nz = norm.ppf(1 - cl)      # -2.326 at 99%\npara_1day = -(mean + z * std)'},
 {k:'var-es',t:'VaR versus Expected Shortfall',file:'var_advanced.py',
  what:'VaR marks where the bad tail starts. Expected Shortfall (purple) is the average loss once you are inside it.',
  read:'At 97.5% the average bad day costs 2.30%, more than the 99% VaR of 1.90%. That is why Basel moved banks from VaR to ES.',
  code:'cutoff = np.percentile(returns, (1 - cl) * 100)\nvar = -cutoff\nes  = -returns[returns <= cutoff].mean()'},
 {k:'backtest',t:'Backtest: would it have worked?',file:'backtest.py',
  what:'Each day, VaR is calculated from only the past 250 days and compared with the next day’s real return. Red dots are days the loss beat VaR.',
  read:'All three models break VaR more often than the 1% they promise. Historical VaR also stays high for exactly a year after March 2020, then drops overnight when the crash leaves the window.',
  code:'hist_var = -returns.rolling(250).quantile(0.01).shift(1)\n\n# .shift(1): today’s VaR uses data only up to yesterday\nexceptions = actual < -var'},
 {k:'risk-share',t:'Who drives the risk',file:'risk_decomposition.py',
  what:'Grey bars are how much money sits in each asset; red bars are how much of the portfolio’s risk it causes.',
  read:'Gold is 12% of the money but only 1.9% of the risk. The US dollar actually lowers risk (−0.4%). Reliance and the two banks punch above their weight.',
  code:'port_std     = np.sqrt(w @ cov @ w)\nmarginal_var = z * (cov @ w) / port_std\ncomponent    = w * marginal_var   # adds up to total VaR'},
 {k:'stress',t:'Stress tests: real crises and what-ifs',file:'stress_test.py',
  what:'Red bars replay real Indian market crises on today’s portfolio; orange bars are shocks chosen on purpose. The blue lines are 1-day and 10-day VaR.',
  read:'The COVID crash cost ₹27.4 lakh, 4.6× the 10-day VaR. VaR describes normal bad days; stress tests cover the abnormal ones.',
  code:'period = returns.loc["2020-02-20":"2020-03-23"]\nchange = np.exp(period.sum()) - 1\nportfolio_change = (weights * change).sum()'}
];

var METHODS=[['Historical','1.10%','1.90%','2.30%','₹1.90L'],['Parametric (normal)','1.25%','1.79%','1.80%','₹1.79L'],['Monte Carlo (normal)','1.29%','1.81%','1.84%','₹1.81L'],['Monte Carlo (Student-t)','1.14%','2.03%','2.14%','₹2.03L']];
var BT=[['Historical','2,840','44','28','1.55%','Fail','Yellow'],['Parametric','2,840','50','28','1.76%','Fail','Yellow'],['EWMA','3,089','59','31','1.91%','Fail','Yellow']];

var FIND=[
 ['₹1.90 lakh','Headline risk','1-day 99% VaR on ₹1 crore. Over 10 days it grows to ₹6.02 lakh.'],
 ['20.3','Fat tails','Excess kurtosis of daily returns. The bell curve says too little about the worst days.'],
 ['2.03%','Better tail model','Student-t Monte Carlo lands closest to history; the normal models sit near 1.8%.'],
 ['0 of 3','No model passes','Every backtested model fails the Kupiec test and lands in the Basel yellow zone.'],
 ['43.8%','Diversification works','Holding ten assets together cuts VaR from ₹3.26 lakh to ₹1.83 lakh.'],
 ['78% → 98%','Stocks carry the risk','Stocks are 78% of the money but about 98% of the risk.'],
 ['5.7×','Crisis risk','The worst day, 23 March 2020 (−10.85%), was 5.7 times the 1-day VaR.']
];

var STEPS=[
 ['config.py','Set up the portfolio','Ten Yahoo Finance tickers with weights that add to 100%, a ₹1 crore value, the confidence levels and horizons, all in one file so nothing is hard-coded twice.','PORTFOLIO = {\n    "RELIANCE.NS": 0.12,\n    "HDFCBANK.NS": 0.12,\n    ...\n    "GOLDBEES.NS": 0.12,\n    "INR=X":       0.10,\n}\nPORTFOLIO_VALUE = 10_000_000'],
 ['data_loader.py','Download prices, make returns','Adjusted closing prices from Yahoo Finance since 2015, small gaps filled, log returns calculated. Any day that moves more than 20% is removed as a data error or split.','returns = np.log(prices / prices.shift(1)).dropna()\n\nbad = (returns.abs() > 0.20).any(axis=1)\nreturns = returns[~bad]'],
 ['var_basic.py','Historical and parametric VaR','Historical VaR is a percentile of real past days. Parametric VaR assumes a bell curve: mean plus z times the standard deviation. Scale to 10 days with the square root of time.','hist = -np.percentile(r, 1)          # 99%\npara = -(r.mean() + norm.ppf(.01) * r.std())\nten_day = hist * np.sqrt(10)'],
 ['var_advanced.py','Expected Shortfall and Monte Carlo','Simulate 10,000 days from the assets’ means and covariances. A Student-t version with 4 degrees of freedom adds fat tails. ES averages the days beyond VaR.','sims = np.random.multivariate_normal(\n    mean, cov, 10000) @ weights\nes = -sims[sims <= np.percentile(sims, 1)].mean()'],
 ['backtest.py','Backtest every model','Roll a 250-day window through history, compare each day’s VaR with the next day’s loss, and count exceptions. The Kupiec test says whether the count is statistically acceptable; Basel zones grade the last 250 days.','exc = actual < -var\nrate = exc.sum() / len(exc)   # target: 1%\nzone = "Green" if last_250 <= 4 else "Yellow"'],
 ['risk_decomposition.py','Find who drives the risk','Component VaR splits the portfolio’s VaR across assets so the pieces add up exactly. Compare with standalone VaR to measure the diversification benefit.','component = w * z * (cov @ w) / port_std\nshare = component / component.sum()'],
 ['stress_test.py','Stress test it','Replay five real crises (demonetisation, IL&amp;FS, COVID, Russia–Ukraine, election day) and five chosen shocks, then compare each loss with VaR.','"Banking crisis":\n    {banks: -0.30, other_stocks: -0.10}'],
 ['app.py','Wrap it in a dashboard','A Streamlit app where anyone can change the weights, confidence level and horizon and watch VaR, ES and the charts update.','cl = st.sidebar.selectbox(\n    "Confidence level", [0.95, 0.99])\n# streamlit run src/app.py']
];

function esc(s){return s.replace(/&(?!amp;|lt;|gt;)/g,'&amp;').replace(/</g,'&lt;')}
function hl(s){return esc(s).replace(/(#[^\n]*)|("[^"\n]*")|\b(np|pd|norm|st)\./g,function(m,c,q,lib){return c?'<span class="c">'+c+'</span>':q?'<span class="m">'+q+'</span>':'<span class="f">'+lib+'</span>.'})}
function ghIcon(){return '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>'}

function mount(el){
  var tot=HOLD.reduce(function(a,h){return a+h[1]},0);
  el.innerHTML='<div class="vr">'+
   '<div class="vr-port"><div class="vr-ph"><span class="eyebrow">The portfolio · ₹1 crore</span><span class="vr-pl"><i class="s"></i>Stocks 78%<i class="g"></i>Gold 12%<i class="u"></i>USD 10%</span></div>'+
    '<div class="vr-bar">'+HOLD.map(function(h){return '<span class="'+h[2]+'" style="flex:'+h[1]+'" title="'+h[0]+' '+h[1]+'%"><b>'+h[0]+'</b><small>'+h[1]+'%</small></span>'}).join('')+'</div>'+
    '<p class="vr-src">Daily data from Yahoo Finance, January 2015 to November 2026: 3,090 trading days.</p></div>'+
   '<div class="vr-sec"><h3>The analysis, chart by chart</h3><p class="dl-sm">Every chart below is the real output of the Python scripts.</p>'+
    '<div class="vr-tabs" role="tablist">'+CHARTS.map(function(c,i){return '<button role="tab" data-c="'+i+'"><i>'+(i+1)+'</i>'+c.t+'</button>'}).join('')+'</div>'+
    '<div class="vr-stage" id="vrStage"></div></div>'+
   '<div class="vr-sec vr-tables"><div><h3>Four ways to measure the same risk</h3><div class="vr-tw"><table class="vr-t"><thead><tr><th>Method</th><th>VaR 95%</th><th>VaR 99%</th><th>ES 97.5%</th><th>VaR 99% (₹)</th></tr></thead><tbody>'+
     METHODS.map(function(m,i){return '<tr'+(i===3?' class="hi"':'')+'>'+m.map(function(x,k){return k?'<td>'+x+'</td>':'<th scope="row">'+x+'</th>'}).join('')+'</tr>'}).join('')+'</tbody></table></div><p class="dl-sm">1-day figures on ₹1 crore. Student-t, with fat tails, is the most cautious at 99%.</p></div>'+
    '<div><h3>Backtest scorecard</h3><div class="vr-tw"><table class="vr-t"><thead><tr><th>Model</th><th>Days</th><th>Breaks</th><th>Expected</th><th>Rate</th><th>Kupiec</th><th>Basel</th></tr></thead><tbody>'+
     BT.map(function(b){return '<tr><th scope="row">'+b[0]+'</th><td>'+b[1]+'</td><td>'+b[2]+'</td><td>'+b[3]+'</td><td>'+b[4]+'</td><td><span class="pill bad">'+b[5]+'</span></td><td><span class="pill yel">'+b[6]+'</span></td></tr>'}).join('')+'</tbody></table></div><p class="dl-sm">1-day 99% VaR, so about 1 break per 100 days is the target. All three break more often.</p></div></div>'+
   '<div class="vr-sec"><h3>What it found</h3><div class="dl-ins vr-find">'+FIND.map(function(f){return '<div class="dl-in"><b>'+f[0]+'</b><h4>'+f[1]+'</h4><p>'+f[2]+'</p></div>'}).join('')+'</div></div>'+
   '<div class="vr-sec"><div class="dl-learnhead"><div><div class="eyebrow">Learn to build it</div><h3>Value at Risk in eight Python files</h3></div><p>Each step is one file. Run them in order from the project folder.</p></div>'+
    '<div class="dl-steps">'+STEPS.map(function(s,i){return '<details class="dl-step"'+(i===0?' open':'')+'><summary><i>'+(i+1)+'</i><span>'+s[1]+' <code class="vr-fn">'+s[0]+'</code></span><b aria-hidden="true"></b></summary><div class="vr-sb"><p>'+s[2]+'</p><pre class="vr-code"><code>'+hl(s[3])+'</code></pre></div></details>'}).join('')+'</div>'+
    '<p class="dl-sm" style="margin-top:14px">Libraries: pandas, NumPy, SciPy, Matplotlib, yfinance and Streamlit.</p></div>'+
   '<div class="dl-repo"><div><div class="eyebrow">Get the files</div><h3>Learn it from scratch</h3><p>A 51-page guide that explains every idea, walks through every file, lists the errors hit along the way and ends with a formula cheat sheet. The full source code is on GitHub.</p>'+
    (REPO?'<div class="dl-id">'+ghIcon()+'<a href="'+REPO+'" target="_blank" rel="noopener">'+REPO.replace('https://','')+'</a></div>':'')+'</div>'+
    '<div class="vr-dls">'+(GUIDE?'<a class="dl-big" href="'+GUIDE+'" target="_blank" rel="noopener">Read the guide (PDF) <span aria-hidden="true">↗</span></a>':'')+(REPO?'<a class="vr-ghost" href="'+REPO+'" target="_blank" rel="noopener">'+ghIcon()+' Get the code on GitHub</a>':'')+'</div></div>'+'<div class="gh-ask"><span class="gh-star" aria-hidden="true">★</span><div><b>Found this useful?</b><p>Star the repo and follow <a href="https://github.com/24Shanmukh" target="_blank" rel="noopener">@24Shanmukh</a> for more finance and data projects.</p></div><div class="gh-btns"><a href="'+REPO+'" target="_blank" rel="noopener">★ Star on GitHub</a><a href="https://github.com/24Shanmukh" target="_blank" rel="noopener">Follow</a></div></div>'+
   '<div class="dl-lb" id="vrLb" hidden><button class="ph-x" id="vrLbX" aria-label="Close">✕</button><div class="dl-lbin vr-lbin"><img id="vrLbImg" alt=""></div></div>'+
  '</div>';
  var $=function(s){return el.querySelector(s)},tabs=[].slice.call(el.querySelectorAll('.vr-tabs button')),stage=$('#vrStage');
  function show(i){var c=CHARTS[i];tabs.forEach(function(b,k){b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i)});
    stage.innerHTML='<figure class="vr-fig"><button class="vr-img" aria-label="Open the chart full size"><img src="'+IMG+c.k+'.webp" alt="'+c.t+'"></button><figcaption>From <code>'+c.file+'</code> · tap to enlarge</figcaption></figure>'+
     '<div class="vr-side"><small>Chart '+(i+1)+' of '+CHARTS.length+'</small><h4>'+c.t+'</h4><dl><div><dt>What it shows</dt><dd>'+c.what+'</dd></div><div><dt>How to read it</dt><dd>'+c.read+'</dd></div></dl><pre class="vr-code"><code>'+hl(c.code)+'</code></pre>'+
     '<div class="dl-nav"><button data-d="-1" aria-label="Previous chart">←</button><button data-d="1" aria-label="Next chart">→</button></div></div>';
    stage.querySelector('.vr-img').addEventListener('click',function(){$('#vrLbImg').src=IMG+c.k+'.webp';$('#vrLbImg').alt=c.t;$('#vrLb').hidden=false});
    [].forEach.call(stage.querySelectorAll('[data-d]'),function(b){b.addEventListener('click',function(){show((i+(+b.dataset.d)+CHARTS.length)%CHARTS.length)})})}
  tabs.forEach(function(b,i){b.addEventListener('click',function(){show(i)})});show(0);
  $('#vrLbX').addEventListener('click',function(){$('#vrLb').hidden=true});
  $('#vrLb').addEventListener('click',function(e){if(e.target.id==='vrLb')$('#vrLb').hidden=true});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!$('#vrLb').hidden){$('#vrLb').hidden=true;e.stopPropagation()}},true);
}
window.VARP={mount:mount};
})();
