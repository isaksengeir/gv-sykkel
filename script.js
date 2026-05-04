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

  // ── Nav scroll ──
  const nav=document.getElementById('nav');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60),{passive:true});

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
