(function(){
  // ── Custom cursor (real pointer only) ──
  if(window.matchMedia('(hover:hover)and(pointer:fine)').matches){
    const C=document.getElementById('C'),CR=document.getElementById('CR');
    let mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;C.style.left=mx+'px';C.style.top=my+'px';});
    (function t(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;CR.style.left=rx+'px';CR.style.top=ry+'px';requestAnimationFrame(t);if(false)t;})();
    document.querySelectorAll('a,button,.card,.p-row').forEach(el=>{
      el.addEventListener('mouseenter',()=>{C.style.width='18px';C.style.height='18px';CR.style.width='46px';CR.style.height='46px';});
      el.addEventListener('mouseleave',()=>{C.style.width='10px';C.style.height='10px';CR.style.width='34px';CR.style.height='34px';});
    });
  }

  // ── "Aktuelt"-stripe (rediger STATUS for å oppdatere alle sider) ──
  var STATUS = {
    show: true,
    from:  '',            // valgfri: vis FRA og med denne datoen (ÅÅÅÅ-MM-DD). Tom = vis med en gang.
    until: '2026-08-02',  // valgfri: vis TIL og med denne datoen, skjules dagen etter. Tom = ingen utløp.
    no: 'Sommerferie 13. juli til 2. august. Book gjerne time før eller etter!',
    en: 'Summer holiday 13 July to 2 August. Feel free to book before or after!'
  };
  (function(){
    if(!STATUS.show) return;
    function parseDate(s){var p=String(s).split('-');return new Date(+p[0],+p[1]-1,+p[2]);}
    var now=new Date();
    if(STATUS.from && now < parseDate(STATUS.from)) return;            // ikke startet ennå
    if(STATUS.until){ var u=parseDate(STATUS.until); u.setHours(23,59,59,999); if(now > u) return; } // utløpt
    var KEY='gv-status-dismissed';
    try{ if(localStorage.getItem(KEY)===STATUS.no) return; }catch(e){}
    var bar=document.createElement('div');
    bar.className='status-bar';
    bar.setAttribute('role','status');
    var msg=document.createElement('span');
    msg.className='status-msg';
    msg.setAttribute('data-en',STATUS.en);
    msg.innerHTML=STATUS.no;
    var btn=document.createElement('button');
    btn.type='button';
    btn.className='status-close';
    btn.setAttribute('aria-label','Lukk');
    btn.innerHTML='&times;';
    btn.addEventListener('click',function(){
      try{localStorage.setItem(KEY,STATUS.no);}catch(e){}
      bar.remove();
      document.documentElement.classList.remove('has-status');
      document.documentElement.style.removeProperty('--status-h');
    });
    bar.appendChild(msg);
    bar.appendChild(btn);
    document.body.insertBefore(bar,document.body.firstChild);
    document.documentElement.classList.add('has-status');
    var setH=function(){document.documentElement.style.setProperty('--status-h',bar.offsetHeight+'px');};
    setH();
    window.addEventListener('resize',setH,{passive:true});
  })();

  // ── Language toggle (NO / EN) ──
  (function(){
    var KEY='gv-lang';
    function apply(lang){
      document.documentElement.lang=lang;
      document.querySelectorAll('[data-en]').forEach(function(el){
        if(el.getAttribute('data-no')===null) el.setAttribute('data-no',el.innerHTML);
        el.innerHTML = lang==='en' ? el.getAttribute('data-en') : el.getAttribute('data-no');
      });
      document.querySelectorAll('[data-en-ph]').forEach(function(el){
        if(el.getAttribute('data-no-ph')===null) el.setAttribute('data-no-ph',el.getAttribute('placeholder')||'');
        el.setAttribute('placeholder', lang==='en' ? el.getAttribute('data-en-ph') : el.getAttribute('data-no-ph'));
      });
      document.querySelectorAll('.lang-btn').forEach(function(b){
        var on=b.getAttribute('data-lang')===lang;
        b.classList.toggle('active',on);
        b.setAttribute('aria-pressed',on?'true':'false');
      });
      try{localStorage.setItem(KEY,lang);}catch(e){}
    }
    var init='no';
    try{var s=localStorage.getItem(KEY); if(s==='en'||s==='no') init=s;}catch(e){}
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.addEventListener('click',function(){apply(b.getAttribute('data-lang'));});
    });
    apply(init);
  })();

  // ── Nav scroll + progress bar ──
  const nav=document.getElementById('nav'),sp=document.getElementById('SP');
  const onScroll=()=>{
    nav.classList.toggle('scrolled',scrollY>60);
    if(sp){const h=document.documentElement.scrollHeight-innerHeight;sp.style.width=(h>0?scrollY/h*100:0)+'%';}
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll,{passive:true});
  onScroll();

  // ── Hamburger ──
  const HB=document.getElementById('HB'),DW=document.getElementById('DW');
  HB.addEventListener('click',()=>{
    const open=DW.classList.toggle('open');
    HB.setAttribute('aria-expanded',open);
    const b=HB.querySelectorAll('span');
    if(open){b[0].style.transform='translateY(7px) rotate(45deg)';b[1].style.opacity='0';b[2].style.transform='translateY(-7px) rotate(-45deg)';}
    else{b[0].style.transform='';b[1].style.opacity='';b[2].style.transform='';}
  });
  DW.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    DW.classList.remove('open');HB.setAttribute('aria-expanded','false');
    const b=HB.querySelectorAll('span');b[0].style.transform='';b[1].style.opacity='';b[2].style.transform='';
  }));

  // ── Particles (sand/dust drifting up) ──
  const pe=document.getElementById('P');
  const types=['p-purple','p-purple','p-light','p-dust','p-dust'];
  for(let i=0;i<32;i++){
    const p=document.createElement('div');
    const t=types[Math.floor(Math.random()*types.length)];
    p.className='particle '+t;
    const size=1.2+Math.random()*2.3;
    p.style.cssText=`left:${Math.random()*100}%;animation-duration:${10+Math.random()*14}s;animation-delay:${Math.random()*20}s;width:${size}px;height:${size}px`;
    pe.appendChild(p);
  }

  // ── Scroll reveal ──
  const io=new IntersectionObserver(entries=>entries.forEach((e,i)=>{
    if(e.isIntersecting)setTimeout(()=>e.target.classList.add('in'),i*65);
  }),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(r=>io.observe(r));

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  }));
})();
