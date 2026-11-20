(()=>{const h=document.querySelector('.site-header'),b=document.querySelector('.menu-btn'),n=document.getElementById('nav'),links=[...n.querySelectorAll('a')];
const sc=()=>h.classList.toggle('scrolled',scrollY>40);sc();addEventListener('scroll',sc,{passive:true});
const set=o=>{n.classList.toggle('open',o);b.setAttribute('aria-expanded',o)};
b.addEventListener('click',()=>set(!n.classList.contains('open')));
links.forEach(a=>a.addEventListener('click',()=>set(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>{const on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('active',on);on?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')})}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section[id]').forEach(s=>io.observe(s))}})();
