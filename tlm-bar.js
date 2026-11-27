/* TLM FOR ALL – always-visible clock + class timer bar.
   Add to every page once:  <script src="tlm-bar.js"></script>  (just before </body>) */
(function(){
  if(window.__tlmBar)return;window.__tlmBar=1;try{if(window.top!==window.self)return}catch(e){}
  var KEY='tlm-timer',H=44,$=function(s,r){return(r||document).querySelector(s)};
  var cs=document.currentScript,HOME;try{HOME=new URL('index.html',(cs&&cs.src)||location.href).href}catch(e){HOME='index.html'}
  function lang(){try{return localStorage.getItem('tlm-lang')||'te'}catch(e){return'te'}}
  var T={te:{timer:'⏱️ టైమర్',min:'ని.',done:'⏰ సమయం అయింది!',ok:'సరే',stop:'ఆపు',pause:'ఆపి ఉంచు',go:'కొనసాగించు',set:'ఎంత సేపు?',custom:'ఇతర'},en:{timer:'⏱️ Timer',min:'min',done:'⏰ Time is up!',ok:'OK',stop:'Stop',pause:'Pause',go:'Resume',set:'How long?',custom:'Other'}};
  var css='#tlmbar{position:fixed;top:0;left:0;right:0;z-index:99998;height:'+H+'px;padding-top:env(safe-area-inset-top,0);box-sizing:content-box;display:flex;align-items:center;justify-content:space-between;gap:8px;padding-left:12px;padding-right:12px;background:#1f2a5a;color:#fff;font:600 15px/1.2 "Noto Sans Telugu","Nirmala UI",Gautami,system-ui,sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.25)}'
   +'#tlmbar .c{display:flex;align-items:baseline;gap:10px;white-space:nowrap;overflow:hidden}#tlmbar .t{font-size:20px;font-weight:800;color:#ffc93c}#tlmbar .d{font-size:13px;opacity:.9;overflow:hidden;text-overflow:ellipsis}'
   +'#tlmbar button{font:inherit;border:0;border-radius:999px;padding:6px 12px;cursor:pointer;background:#ffc93c;color:#1f2a5a;font-weight:800;touch-action:manipulation;min-height:34px}'
   +'#tlmbar .r{display:flex;align-items:center;gap:6px}#tlmbar .tm{font-size:20px;font-weight:800;font-variant-numeric:tabular-nums}#tlmbar .tm.low{color:#ff8a7a}'
   +'#tlmpop{position:fixed;z-index:99999;right:8px;top:calc('+H+'px + env(safe-area-inset-top,0) + 6px);background:#fff;color:#1f2a5a;border-radius:16px;padding:12px;box-shadow:0 8px 24px rgba(0,0,0,.3);display:none;font:600 15px "Noto Sans Telugu","Nirmala UI",system-ui,sans-serif}'
   +'#tlmpop b{display:block;margin-bottom:8px}#tlmpop .g{display:flex;gap:8px;flex-wrap:wrap}#tlmpop button{font:inherit;font-weight:800;border:2px solid #1f2a5a;background:#fff;color:#1f2a5a;border-radius:12px;padding:8px 14px;cursor:pointer;min-height:42px}'
   +'#tlmbar.alarm{animation:tlmflash .6s infinite}@keyframes tlmflash{50%{background:#d93f3f}}'
   +'#tlmbar .l{display:flex;align-items:center;gap:10px;min-width:0}#tlmbar #tlmhome{background:#fff;color:#1f2a5a;flex:none}'
   +'@media (max-width:420px){#tlmbar .d{display:none}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var bar=document.createElement('div');bar.id='tlmbar';bar.setAttribute('role','timer');
  var pop=document.createElement('div');pop.id='tlmpop';
  function mount(){document.documentElement.style.setProperty('--tlmbar','calc('+H+'px + env(safe-area-inset-top,0px))');document.body.appendChild(bar);document.body.appendChild(pop);
    var sp=parseFloat(getComputedStyle(document.body).paddingTop)||0;document.body.style.paddingTop='calc('+(sp+H)+'px + env(safe-area-inset-top,0px))';render()}
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}}
  function save(s){try{if(s)localStorage.setItem(KEY,JSON.stringify(s));else localStorage.removeItem(KEY)}catch(e){}}
  var AC;function beep(){try{if(localStorage.getItem('tlm-snd')==='0')return}catch(e){}
    try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();var t=AC.currentTime;
      for(var i=0;i<6;i++){var o=AC.createOscillator(),g=AC.createGain();o.frequency.value=i%2?880:660;g.gain.setValueAtTime(.2,t+i*.25);g.gain.exponentialRampToValueAtTime(.001,t+i*.25+.22);o.connect(g);g.connect(AC.destination);o.start(t+i*.25);o.stop(t+i*.25+.23)}}catch(e){}}
  function fmt(ms){var s=Math.max(0,Math.ceil(ms/1000)),m=Math.floor(s/60);s=s%60;return(m<10?'0':'')+m+':'+(s<10?'0':'')+s}
  var lastBeep=0;
  function render(){
    var L=T[lang()]||T.te,n=new Date(),s=load();
    var time=n.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true}).toUpperCase();
    var date='';try{date=n.toLocaleDateString(lang()==='te'?'te-IN':'en-IN',{weekday:'short',day:'numeric',month:'short'})}catch(e){}
    var right='';bar.classList.remove('alarm');
    if(!s){right='<button id="tlmset">'+L.timer+'</button>'}
    else{
      var rem=s.paused!=null?s.paused:s.end-Date.now();
      if(rem<=0){bar.classList.add('alarm');right='<span class="tm">'+L.done+'</span><button id="tlmok">'+L.ok+'</button>';
        if(Date.now()-lastBeep>4000){lastBeep=Date.now();beep()}}
      else right='<span class="tm'+(rem<60000?' low':'')+'">'+fmt(rem)+'</span><button id="tlmpz">'+(s.paused!=null?'▶':'⏸')+'</button><button id="tlmst" aria-label="'+L.stop+'">⏹</button>'}
    var h='<div class="l"><button id="tlmhome" aria-label="Home">🏠 Home</button><div class="c"><span class="t">'+time+'</span><span class="d">'+date+'</span></div></div><div class="r">'+right+'</div>';
    if(bar.__h!==h){bar.innerHTML=h;bar.__h=h;bind()}
  }
  /* Home: opens the home page in a second tab (reused every time, never reloaded), so the current tab keeps its slide. */
  function openHome(){
    if(window.name==='tlm-home'){location.href=HOME;return}
    var w=null;try{w=window.open('','tlm-home')}catch(e){}
    if(!w){location.href=HOME;return}
    try{if(!w.location.href||w.location.href==='about:blank')w.location.href=HOME}catch(e){}
    try{w.focus()}catch(e){}
  }
  function bind(){
    var L=T[lang()]||T.te,a=$('#tlmset',bar),ok=$('#tlmok',bar),pz=$('#tlmpz',bar),sp=$('#tlmst',bar),hm=$('#tlmhome',bar);
    if(hm)hm.onclick=openHome;
    if(a)a.onclick=function(){pop.style.display=pop.style.display==='block'?'none':'block';
      pop.innerHTML='<b>'+L.set+'</b><div class="g">'+[30,40,45,60].map(function(m){return'<button data-m="'+m+'">'+m+' '+L.min+'</button>'}).join('')+'<button id="tlmc">'+L.custom+'</button></div>';
      pop.querySelectorAll('[data-m]').forEach(function(b){b.onclick=function(){start(+b.dataset.m)}});
      $('#tlmc',pop).onclick=function(){var v=parseInt(prompt(L.set+' ('+L.min+')','25'),10);if(v>0&&v<600)start(v)}};
    if(ok)ok.onclick=function(){save(null);render()};
    if(sp)sp.onclick=function(){save(null);render()};
    if(pz)pz.onclick=function(){var s=load();if(!s)return;if(s.paused!=null){s.end=Date.now()+s.paused;s.paused=null}else{s.paused=s.end-Date.now()}save(s);render()};
  }
  function start(m){pop.style.display='none';save({end:Date.now()+m*60000,paused:null});lastBeep=0;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)()}catch(e){}render()}
  document.addEventListener('click',function(e){if(pop.style.display==='block'&&!pop.contains(e.target)&&e.target.id!=='tlmset')pop.style.display='none'});
  document.addEventListener('visibilitychange',render);
  if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount);
  setInterval(function(){if(bar.parentNode)render()},1000);
})();
