(()=>{const f=document.getElementById('inquiry');if(!f)return;const st=document.getElementById('status');
const KEY=f.dataset.key,EMAIL='info@amkconsultants.com';
const rules={name:v=>v.trim().length>1||'Enter your full name.',org:v=>v.trim().length>1||'Enter your organisation.',email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||'Enter a valid business email address.',country:v=>v.trim().length>1||'Enter your country.',type:v=>!!v||'Choose the nature of your inquiry.',msg:v=>v.trim().length>=20||'Describe your inquiry in at least 20 characters.',consent:(v,el)=>el.checked||'Please accept the Privacy Notice to continue.'};
const check=el=>{const r=rules[el.name](el.value,el),e=document.getElementById('e-'+el.name),bad=r!==true;el.setAttribute('aria-invalid',bad);if(e)e.textContent=bad?r:'';return !bad};
const fields=()=>[...f.querySelectorAll('input,select,textarea')].filter(el=>rules[el.name]);
fields().forEach(el=>el.addEventListener('blur',()=>check(el)));
f.addEventListener('submit',async ev=>{ev.preventDefault();st.className='status';st.textContent='';
if(f.website.value)return;
const ok=fields().map(check).every(Boolean);
if(!ok){f.querySelector('[aria-invalid=true]').focus();st.classList.add('bad');st.textContent='Please correct the highlighted fields.';return}
const d=Object.fromEntries(new FormData(f));delete d.website;
if(!KEY||KEY==='YOUR_WEB3FORMS_ACCESS_KEY'){const body=`Name: ${d.name}\nOrganisation: ${d.org}\nEmail: ${d.email}\nCountry: ${d.country}\nType: ${d.type}\n\n${d.msg}`;
location.href=`mailto:${EMAIL}?subject=${encodeURIComponent('Website inquiry: '+d.type)}&body=${encodeURIComponent(body)}`;st.classList.add('ok');st.textContent='Your email app should open with the message ready to send.';return}
try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:KEY,subject:'AMK website inquiry: '+d.type,...d})});
if(!r.ok)throw 0;f.reset();st.classList.add('ok');st.textContent='Thank you. We have received your inquiry and will respond within two working days.'}
catch{st.classList.add('bad');st.textContent=`We could not send your message. Please email ${EMAIL} directly.`}});})();
