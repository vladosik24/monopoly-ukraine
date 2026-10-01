import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, set, onValue, update, get, onDisconnect, push, query, limitToLast } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyByYh0VOBkFvPcQYRzabrt8sfj32gpbsWQ",
  authDomain: "monopoly-ukraine.firebaseapp.com",
  databaseURL: "https://monopoly-ukraine-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "monopoly-ukraine",
  storageBucket: "monopoly-ukraine.firebasestorage.app",
  messagingSenderId: "1046709502750",
  appId: "1:1046709502750:web:ba8ad3c1f11780d1a6bf0f"
};

const db = getDatabase(initializeApp(firebaseConfig));
const GC=['#f5b800','#e53935','#f2d000','#2e9e4f','#12b5cb','#2aa8e0','#7b3ff2','#2e9e4f','#f57c00','#8b5cf6','#d63384'];
const T=[['СТАРТ','s','🏁'],['Нова Пошта',3200,0,'✚','#e1251b'],['Шанс','c','❓'],['Укрпошта',4500,0,'📮','#d90'],['Податок','x','💰'],['monobank',2500,1,'🅼','#000'],['Adidas',5500,2,'👟','#000'],['Шанс','c','❓'],['Nike',5500,2,'✔️','#000'],['Puma',5000,2,'🐆','#000'],
['В\'язниця','j','⛓️'],['Telegram',4500,3,'✈️','#27a'],['Kyivstar',4000,3,'✳️','#09f'],['TikTok',4500,3,'🎵','#000'],['YouTube',3500,4,'▶️','#d00'],['Google',3500,4,'🔍','#48f'],['ПриватБанк',2000,1,'🏦','#2a3'],['Шанс','c','❓'],['Живчик',5500,5,'🍋','#2a8'],['Моршинська',5500,5,'⛰️','#d32'],
['Казино','k','🎰'],['АТБ',2200,6,'🛒','#17b'],['Шанс','c','❓'],['justin',1800,6,'🟦','#16f'],['Епіцентр',2400,7,'🔧','#14a'],['Ощадбанк',2400,7,'💚','#052'],['McDonald\'s',2600,8,'Ⓜ️','#e90'],['KFC',2600,8,'🍗','#c00'],['ДТЕК',2000,7,'⚡','#fc0'],['Burger King',2800,8,'🍔','#d62'],
['Іди в в\'язницю','g','👮'],['Rozetka',3000,9,'😄','#2a8'],['OLX',3000,9,'⭕','#0a7'],['Шанс','c','❓'],['prom',3200,4,'🟪','#60c'],['Райффайзен',3000,1,'✖️','#fc0'],['Податок','x','💰'],['Apple',3500,10,'🍏','#000'],['Шанс','c','❓'],['Samsung',4000,10,'📱','#14a']];
const LG={'Нова Пошта':'novaposhta','Укрпошта':'ukrposhta','monobank':'monobank','Adidas':'adidas','Nike':'nike','Puma':'puma','Telegram':'telegram','TikTok':'tiktok','Google':'google','ПриватБанк':'privatbank','Живчик':'zhyvchyk','АТБ':'atb','Ощадбанк':'oschadbank',"McDonald's":'mcdonalds','KFC':'kfc','Burger King':'burgerking','Rozetka':'rozetka','OLX':'olx','prom':'prom','Райффайзен':'raiffeisen','Apple':'apple','Samsung':'samsung','Kyivstar':'kyivstar','YouTube':'youtube','Моршинська':'morshynska','justin':'justin','ДТЕК':'dtek'};
const CARDS=[['Знайшов гаманець: +500',500],['Штраф за паркування: −400',-400],['Лотерея: +1000',1000],['Ремонт авто: −800',-800],['Бабусин подарунок: +300',300],['Іди на СТАРТ',0,'go'],['Лови поліцію! В\'язниця',0,'jail']];
const PC=['#ff4d4d','#3ddc84','#ffd23f','#4aa8ff','#b46bff'];
const pos=i=>i<=10?[1,1+i]:i<=20?[i-9,11]:i<=30?[11,31-i]:[41-i,1];
const side=i=>i<10?'top':i<20?'rt':i<30?'bot':'lf';
const hm=()=>new Date().toTimeString().slice(0,5),fm=n=>n.toLocaleString('uk')+' ₴';
function full(i){return T.every((x,k)=>x[2]!==T[i][2]||typeof x[1]!='number'||own[k]==own[i])}
function rent(i){const b=Math.round(T[i][1]*.1),L=lvl[i];return L?b*[0,4,8,14][L]:b*(full(i)?2:1)}
function tile(b,i){const[r,c]=pos(i),s=side(i%10==0?(i==0?0:i==10?9:i==20?21:31):i),t=b[1];
const tk=P.map(p=>p.alive&&dpos(p)==i?tokn(p):'').join('');
const corner=i%10==0,cls=(corner?'sp ':'')+s;
if(typeof t!='number')return '<div class="t '+cls+'" data-i="'+i+'" style="grid-area:'+r+'/'+c+'"><div class="in"><span class="em">'+b[2]+'</span>'+(corner?'':'<span class="nm">'+b[0]+'</span>')+'</div><div class="tk">'+tk+'</div></div>';
const bg=own[i]>=0?P[own[i]].c+'aa':'#fff';
return '<div class="t '+cls+'" data-i="'+i+'" style="grid-area:'+r+'/'+c+';--b:'+bg+'"><div class="in">'+(LG[b[0]]?'<img class="lg" src="logos/'+LG[b[0]]+'.png" alt="'+b[0]+'" onerror="this.outerHTML=\'<span class=nm>\'+this.alt+\'</span>\'">':'<span class="em" style="color:'+b[4]+'">'+b[3]+'</span><span class="nm" style="color:'+b[4]+'">'+b[0]+'</span>')+(lvl[i]?'<div class="st">'+'★'.repeat(lvl[i])+'</div>':'')+'</div><div class="pr" style="--g:'+GC[b[2]]+'">'+t+'</div><div class="tk">'+tk+'</div></div>'}

let code='',R=null,S=null,LOGS=[],showAll=true,busy=false,started=false,P,own,lvl,prevPos={};
const $=id=>document.getElementById(id);
function toast(msg,ms=2800){
  let t=$('toast');
  if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t)}
  t.textContent=msg;t.className='toast show';
  clearTimeout(t._h);t._h=setTimeout(()=>t.className='toast',ms);
}

const tg=window.Telegram&&Telegram.WebApp;let tu=null;
if(tg){try{tg.ready();tg.expand();tg.setHeaderColor('#070f22');tg.setBackgroundColor('#070f22');tu=tg.initDataUnsafe&&tg.initDataUnsafe.user||null}catch(e){}}
if(!tu){const q=new URLSearchParams(location.search);if(q.get('name')||q.get('id'))tu={id:q.get('id')||'',first_name:q.get('name')||'',username:q.get('u')||'',photo_url:q.get('photo')||''}}
if(!tu){try{const d=new URLSearchParams(location.hash.slice(1)).get('tgWebAppData');if(d)tu=JSON.parse(new URLSearchParams(d).get('user'))}catch(e){}}

let myId=null;if(tu&&tu.id)myId='tg_'+tu.id;else{try{myId=localStorage.getItem('mid')}catch(e){}}
if(!myId){myId='p_'+Math.random().toString(36).slice(2,10);try{localStorage.setItem('mid',myId)}catch(e){}}

// Ім'я ТІЛЬКИ з Telegram (без поля вводу)
const tname=tu?[tu.first_name,tu.last_name].filter(Boolean).join(' ')||tu.username||'Гравець':'Гравець';
const myPh=okp(tu&&(tu.photo_url||(tu.username?'https://t.me/i/userpic/320/'+tu.username+'.jpg':'')));
const nm=()=>tname.slice(0,24)||'Гравець';

$('src').textContent='';$('src').style.display='none';
$('meName').textContent=nm();
$('meUser').textContent=tu&&tu.username?'@'+tu.username:'';
$('meAv').innerHTML=avh({ph:myPh,a:nm()[0].toUpperCase()});

// Лобі ЗАВЖДИ видиме — не блокуємо на "Підключення…"
$('lobbyContent').style.display='block';

// Статус Firebase з таймаутом
let connectedOnce=false;
onValue(ref(db,'.info/connected'),s=>{
  const c=$('connectionStatus');
  if(s.val()===true){
    connectedOnce=true;
    c.style.display='none';
  } else if(connectedOnce){
    c.style.display='block';
    c.className='cs err';
    c.textContent='Немає зв\'язку';
  }
},err=>{
  const c=$('connectionStatus');
  c.style.display='block';
  c.className='cs err';
  c.textContent='Помилка з\'єднання';
  console.error(err);
});
setTimeout(()=>{
  if(!connectedOnce){
    const c=$('connectionStatus');
    c.style.display='block';
    c.className='cs err';
    c.textContent='Немає зв\'язку з сервером';
  }
},5000);

$('createBtn').onclick=createRoom;
$('joinBtn').onclick=()=>{const c=$('roomCodeInput').value.trim().toUpperCase();if(c)joinRoom(c)};
$('startGameBtn').onclick=startGame;

async function createRoom(){
  try{
    code='GAME-'+Math.random().toString(36).slice(2,6).toUpperCase();
    await set(ref(db,'rooms/'+code),{code,status:'waiting',players:{[myId]:{id:myId,name:nm(),ph:myPh,j:Date.now(),online:true}}});
    enter();
  }catch(e){alert('Не вдалося створити кімнату. Перевір Firebase Rules.\n'+e.message);console.error(e)}
}
async function joinRoom(c){
  try{
    const r=(await get(ref(db,'rooms/'+c))).val();
    if(!r)return alert('Кімнату не знайдено!');
    const ps=r.players||{};
    if(!ps[myId]){
      if(r.status!='waiting')return alert('Гра вже почалась!');
      if(Object.keys(ps).length>=5)return alert('Кімната повна!');
      await set(ref(db,`rooms/${c}/players/${myId}`),{id:myId,name:nm(),ph:myPh,j:Date.now(),online:true});
    } else await update(ref(db,`rooms/${c}/players/${myId}`),{online:true,name:nm(),ph:myPh});
    code=c;enter();
  }catch(e){alert('Помилка входу.\n'+e.message);console.error(e)}
}
function enter(spec){
  if(!spec)onDisconnect(ref(db,`rooms/${code}/players/${myId}`)).update({online:false});
  $('lobbyContent').style.display='none';
  $('roomCodeDisplay').textContent=code;
  $('waitingRoom').style.display='block';
  listen();
}
function listen(){
  onValue(ref(db,'rooms/'+code),s=>{
    R=s.val();if(!R)return;
    if(R.status=='waiting'){
      const a=Object.values(R.players||{}).sort((x,y)=>x.j-y.j);
      $('playersList').innerHTML=a.map(p=>'<div class="pi"><span class="av">'+avh({ph:p.ph,a:(p.name||'?')[0].toUpperCase()})+'</span> '+esc(p.name)+' '+(p.online?'🟢':'🔴')+'</div>').join('');
      $('startGameBtn').style.display=a[0]&&a[0].id==myId?'block':'none';
      $('startGameBtn').disabled=a.length<2;
      $('startGameBtn').textContent='Почати гру ('+a.length+' гравців)';
    } else if(R.state){
      if(!busy||!S)S=R.state; // поки ходить цей клієнт — не підміняємо стан застарілим знімком
      if(!started){started=true;$('lobby').style.display='none';$('gameBoard').style.display='block'}
      render();
    }
  });
  onValue(query(ref(db,'rooms/'+code+'/log'),limitToLast(60)),s=>{
    LOGS=[];s.forEach(c=>{LOGS.push(c.val())});if(S)render();
  });
}
function fresh(ps){return{players:ps.map((p,i)=>({id:p.id,n:p.n,ph:p.ph||'',c:PC[i],a:((p.n||'?')[0]||'?').toUpperCase(),m:10000,pos:0,jail:0,alive:true})),own:Array(40).fill(-1),lvl:Array(40).fill(0),cur:0,ph:'roll',tend:Date.now()+30000}}
async function startGame(){
  const ps=Object.values((await get(ref(db,'rooms/'+code+'/players'))).val()||{}).sort((a,b)=>a.j-b.j);
  if(ps.length<2)return;
  await update(ref(db,'rooms/'+code),{state:fresh(ps.map(p=>({id:p.id,n:p.name,ph:p.ph||''}))),status:'playing'});
  ev(0,'Гра почалась! Капітал '+fm(10000));
}
async function newGame(){if(!S||S.players[0].id!=myId)return;S=fresh(S.players.map(p=>({id:p.id,n:p.n,ph:p.ph||''})));await save();ev(0,'Нова гра! Капітал '+fm(10000))}
const ev=(p,t,c)=>push(ref(db,'rooms/'+code+'/log'),{p,t,c:c?1:0,h:hm()});
const save=()=>set(ref(db,'rooms/'+code+'/state'),S);
function sync(){
  if(!S)return;
  // Firebase іноді віддає масиви як об'єкти — нормалізуємо
  if(!Array.isArray(S.players)){
    S.players=Object.keys(S.players||{}).sort((a,b)=>a-b).map(k=>S.players[k]);
  }
  S.players.forEach(pl=>{pl.pos=Number(pl.pos)||0;pl.m=Number(pl.m)||0;pl.jail=Number(pl.jail)||0});
  if(!Array.isArray(S.own)){
    const o=S.own||{};S.own=Array.from({length:40},(_,i)=>o[i]!==undefined?Number(o[i]):-1);
  }
  if(!Array.isArray(S.lvl)){
    const l=S.lvl||{};S.lvl=Array.from({length:40},(_,i)=>l[i]!==undefined?Number(l[i]):0);
  }
  P=S.players;own=S.own;lvl=S.lvl;
}
const on=id=>!(R&&R.players&&R.players[id]&&R.players[id].online===false);
function driver(){const c=S.players[S.cur];if(on(c.id))return c.id==myId;const h=S.players.find(p=>p.alive&&on(p.id));return !!h&&h.id==myId}
function pay(k,a,to){const p=S.players[k];p.m-=a;if(to!=null)S.players[to].m+=a;if(p.m<0){p.m=0;p.alive=false;S.own.forEach((o,j)=>{if(o==k){S.own[j]=-1;S.lvl[j]=0}});ev(k,'збанкрутував 💥')}}
async function roll(){
  if(!S||S.ph!='roll'||busy||!driver())return;
  busy=true;
  sync();
  const k=S.cur;
  const p=P[k];
  if(!p||!p.alive){busy=false;return}
  const d1=1+Math.floor(Math.random()*6);
  const d2=1+Math.floor(Math.random()*6);
  S.dice=[d1,d2];
  S.rid=Date.now()+Math.random();
  S.ph='wait';
  ev(k,'викидає '+d1+':'+d2);
  toast(p.n+' кидає '+d1+':'+d2);

  if(p.jail>0){
    p.jail--;
    ev(k,'у в\'язниці, пропускає хід');
    toast(p.n+' у в\'язниці');
    S.dice=null;
    await save();
    setTimeout(()=>{end()},1200);
    return;
  }

  let pos=Number(p.pos)||0;
  let np=pos+d1+d2;
  if(np>=40){
    p.m=(Number(p.m)||0)+1200;
    ev(k,'отримав зарплату +1200 ₴');
    toast(p.n+' +1200 ₴ зарплата');
    np=np%40;
  }
  p.pos=np;
  // Зберігаємо НОВУ позицію — фішки мають переїхати
  await save();

  setTimeout(()=>land(),1700+(d1+d2)*170);
}

async function land(){
  if(!S){busy=false;return}
  sync();
  const k=S.cur;
  const p=P[k];
  if(!p){busy=false;return}
  const pos=Number(p.pos)||0;
  const b=T[pos];
  if(!b){console.error('bad pos',pos);S.ph='roll';await save();busy=false;return}
  S.dice=null;
  const t=b[1];
  ev(k,'потрапляє на '+b[0]);
  toast(p.n+' → '+b[0]);

  if(typeof t==='number'){
    const o=own[pos];
    if(o===-1||o===null||o===undefined){
      S.ph='buy';
      S.tend=Date.now()+30000;
      await save();
      busy=false;
      toast('Вільне поле! Купити '+b[0]+'?');
      return;
    }
    if(o!==k){
      const r=rent(pos);
      ev(k,'платить оренду '+r+' ₴ → '+(P[o]?P[o].n:'?'));
      pay(k,r,o);
      toast(p.n+' оренда '+r+' ₴');
    }else if(full(pos)&&lvl[pos]<3){
      S.ph='buy';
      S.tend=Date.now()+30000;
      await save();
      busy=false;
      toast('Покращити '+b[0]+'?');
      return;
    }
  }else if(t==='c'){
    const c=CARDS[Math.floor(Math.random()*CARDS.length)];
    ev(k,'🎴 '+c[0]);
    toast(c[0]);
    if(c[2]==='go'){p.pos=0;p.m=(Number(p.m)||0)+1200}
    else if(c[2]==='jail'){p.pos=10;p.jail=1}
    else if(c[1]>0)p.m=(Number(p.m)||0)+c[1]
    else pay(k,-c[1]);
  }else if(t==='x'){
    ev(k,'сплатив податок 800 ₴');
    pay(k,800);
    toast('Податок −800 ₴');
  }else if(t==='g'){
    p.pos=10;p.jail=1;
    ev(k,'іде у в\'язницю');
    toast('У в\'язницю!');
  }else if(t==='k'){
    if(Math.random()<0.4){p.m=(Number(p.m)||0)+1000;ev(k,'виграв у казино +1000 ₴');toast('Казино +1000 ₴')}
    else{ev(k,'програв у казино −600 ₴');pay(k,600);toast('Казино −600 ₴')}
  }
  // СТАРТ (s) та в'язниця-відвідини (j) — просто зупинка
  await save();
  setTimeout(()=>end(),1200);
}

async function buy(){if(!S||S.ph!='buy'||busy||!driver())return;busy=true;sync();const k=S.cur,p=P[k];const pos=Number(p.pos)||0;const b=T[pos];
if(!b||typeof b[1]!=='number'){S.ph='wait';await save();busy=false;return end()}
if(own[pos]==k){const c=Math.round(b[1]/2);if(p.m>=c){p.m-=c;lvl[pos]++;ev(k,'покращив '+b[0]+' до рівня '+lvl[pos]+' за '+c+' ₴');toast('Покращено '+b[0])}else {ev(k,'не вистачає коштів');toast('Не вистачає коштів')}}
else if(p.m>=b[1]){p.m-=b[1];own[pos]=k;ev(k,'купує філію '+b[0]+' за '+b[1]+'₴');toast('Куплено '+b[0]+'!')}else {ev(k,'не вистачає коштів');toast('Не вистачає коштів')}
S.ph='wait';await save();setTimeout(end,900)}
async function skip(){if(!S||S.ph!='buy'||busy||!driver())return;busy=true;S.ph='wait';await save();end()}
async function end(){sync();const al=P.filter(p=>p.alive);
if(al.length<2){S.ph='over';S.dice=null;ev(P.indexOf(al[0]),'🏆 переміг!');await save();busy=false;return}
let n=S.cur;do{n=(n+1)%P.length}while(!P[n].alive);S.cur=n;S.ph='roll';S.dice=null;S.tend=Date.now()+30000;await save();busy=false}
let sayBusy=false;
function say(){
  const i=$('ci');
  if(!S||!i||sayBusy)return;
  const t=i.value.trim().slice(0,80);
  if(!t)return;
  sayBusy=true;
  i.value='';
  const m=P.findIndex(p=>p.id==myId);
  try{ev(m<0?0:m,t,1)}catch(e){console.error(e)}
  setTimeout(()=>{sayBusy=false},300);
}
function render(){if(!S)return;sync();const k=S.cur,c=P[k],mine=c.id==myId,ph=S.ph,pb=T[c.pos];
const spec=!P.some(p=>p.id==myId);const isB=typeof pb[1]=='number'&&own[c.pos]==k;
const pn=P.map((p,i)=>'<div class="pl'+(i==k?' on':'')+(p.alive?'':' dead')+'" style="--c:'+p.c+'" onclick="prof('+i+')">'+(i==k&&p.alive&&ph!='over'?'<i class="tm" id="tm">30 c</i>':'')+'<div class="av">'+avh(p)+'</div><div><b>'+esc(p.n)+(p.id==myId?' (ти)':'')+'</b><span>'+(p.alive?fm(p.m):'БАНКРУТ')+'</span></div></div>').join('');
const ac=mine&&ph=='buy'?'<div class="ac"><button class="y" onclick="buy()">'+(isB?'⭐ Покращити '+Math.round(pb[1]/2):'🛒 Купити '+pb[0]+' · '+pb[1])+' ₴</button><button class="n" onclick="skip()">Пас</button></div>':ph=='over'&&P[0].id==myId?'<div class="ac"><button onclick="newGame()">Нова гра</button></div>':'';
const buyFab=mine&&ph=='buy'?'<div class="buybar"><button class="y" onclick="buy()">'+(isB?'⭐ Покращити за '+Math.round(pb[1]/2):'🛒 Купити «'+pb[0]+'» за '+pb[1])+' ₴</button><button class="n" onclick="skip()">Пас</button></div>':'';
const sub=ph=='over'?'Гру завершено':mine&&ph=='buy'?(isB?'Покращити ділянку?':'Купити '+pb[0]+'?'):mine&&ph=='roll'?'Твій хід — кидай кубики.':'Очікуйте завершення ходу.';
const L=LOGS;
let h='<div id="top">'+pn+'<button class="mn" onclick="if(confirm(\'Вийти з гри?\'))location.reload()">⋮</button></div><div id="bd">'+T.map(tile).join('');
h+='<div id="mid"><h3>Події гри <span class="hb"><span class="ib">👁 '+LOGS.length+'</span></span></h3><div id="log">'+L.map(e=>{const q=P[e.p]||{c:'#888',n:''};return e.c?'<div class="ev c" style="--c:'+q.c+'"><b>'+esc(q.n)+'</b> '+esc(e.t)+'</div>':'<div class="ev" style="--c:'+q.c+'"><b>'+esc(q.n)+'</b> '+esc(e.t)+'</div>'}).join('')+'</div><div class="row"><input id="ci" '+(spec?'disabled placeholder="Ви спостерігаєте"':'placeholder="Написати повідомлення…"')+' onkeydown="if(event.key===\'Enter\'){event.preventDefault();say()}"><button type="button" onclick="say()">➤</button></div><div id="sc"><b>'+(ph=='over'?'Кінець гри':'Хід гравця '+esc(c.n))+'</b><small>'+sub+'</small>'+ac+'</div></div>';
h+='</div>'+(mine&&ph=='roll'&&!spec?'<button class="fab" onclick="roll()">🎲 Кинути кубики</button>':'')+buyFab+modalHtml();
const o=$('ci'),v=o?o.value:'',f=o&&document.activeElement===o;
$('app').innerHTML=h;const n=$('ci');if(n){n.value=v;if(f)n.focus()}const lg=$('log');if(lg)lg.scrollTop=lg.scrollHeight;if(S.dice&&S.rid&&S.rid!==lastRid){lastRid=S.rid;playDice(S.dice)}
  // запам'ятати позиції для анімації фішок
  syncTokens();}
setInterval(()=>{if(!S||!R||S.ph=='over')return;const tm=$('tm');if(tm)tm.textContent=Math.max(0,Math.ceil((S.tend-Date.now())/1000))+' c';
if(!busy&&Date.now()>S.tend+800&&driver()){S.ph=='roll'?roll():S.ph=='buy'?skip():0}},500);
Object.assign(window,{roll,buy,skip,say,newGame,tgl:()=>{showAll=!showAll;render()}});

function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function okp(u){return /^https:\/\/[^\s"'()<>\\]+$/.test(u||'')?u:''}
function avh(p){const u=okp(p.ph),a=esc(p.a||'?');return u?`<img src="${u}" alt="" onerror="this.parentNode.textContent='${a}'">`:a}
function tokn(p){const u=okp(p.ph);return `<s class="st${hopId===p.id?' hop':''}" style="--c:${p.c}${u?`;background:url('${u}') center/cover`:''}">${u?'':esc(p.a)}</s>`}
let ROOMS=[],modal=null,stats=false;
onValue(ref(db,'rooms'),s=>{
  ROOMS=[];s.forEach(c=>{const r=c.val();if(!r||!r.players)return;const ps=Object.values(r.players).sort((a,b)=>a.j-b.j);if(!ps.some(p=>p.online))return;const mine=ps.some(p=>p.id==myId);if(r.state&&r.state.ph=='over'&&!mine)return;ROOMS.push({code:c.key,st:r.status,ps,mine})});
  if(!code)renderLobby();
},e=>{
  $('roomList').innerHTML='<p class="mut">⚠️ Немає доступу до списку кімнат.<br>Firebase → Realtime Database → Rules:<br><code>{ "rules": { ".read": true, ".write": true } }</code><br>(або обмеж лише /rooms)</p>';
  console.error(e);
});
function renderLobby(){$('roomCount').textContent='Знайдено: '+ROOMS.length;
$('roomList').innerHTML=ROOMS.map(r=>{const h=r.ps[0],pl=r.st=='playing',q="'"+r.code+"'";
const btn=r.mine?`<button class="y" onclick="joinRoom(${q})">Продовжити</button>`:pl?`<button class="n" onclick="watch(${q})">Дивитися</button>`:r.ps.length>=5?'<button class="n" disabled>Повна</button>':`<button onclick="joinRoom(${q})">Приєднатися</button>`;
return `<div class="rm"><div class="av">${avh({ph:h.ph,a:(h.name||'?')[0].toUpperCase()})}</div><div class="ri"><b>${esc(h.name)}</b><span class="bd ${pl?'pg':'wt'}">${pl?'Гра триває':'Очікування'}</span><small class="mut">${r.ps.length}/5 гравців</small></div>${btn}</div>`}).join('')||'<p class="mut">Кімнат поки немає — створи свою!</p>'}
function watch(c){code=c;enter(true)}
function prof(i){modal=i;stats=false;render()}
function closeProf(){modal=null;render()}
function tgs(){stats=!stats;render()}
function modalHtml(){if(modal==null||!S)return '';const p=P[modal];if(!p)return '';
const me=p.id==myId,my=me&&S.cur==modal&&driver()&&(S.ph=='roll'||S.ph=='buy'),ls=T.map((b,i)=>own[i]==modal?i:-1).filter(i=>i>=0),val=ls.reduce((s,i)=>s+T[i][1],0),st=ls.reduce((s,i)=>s+lvl[i],0);
let h=`<div class="ov" onclick="closeProf()"><div class="md" onclick="event.stopPropagation()">
<div class="mh"><div class="av big" style="--c:${p.c}">${avh(p)}</div><div><small class="gd">ПРОФІЛЬ ГРАВЦЯ</small><h2>${esc(p.n)}</h2><span class="mm">${fm(p.m)}</span></div><button class="x" onclick="closeProf()">✕</button></div>
<div class="stats-row">
  <div class="stat-card"><div class="si">🏠</div><div class="sv">${ls.length}</div><div class="sl">ДІЛЯНОК</div></div>
  <div class="stat-card"><div class="si">⭐</div><div class="sv">${st}</div><div class="sl">ЗІРОК</div></div>
  <div class="stat-card"><div class="si">💰</div><div class="sv">${fm(val)}</div><div class="sl">ВАРТІСТЬ</div></div>
</div>`;
if(ls.length){h+=`<div class="stt" style="max-height:120px;overflow:auto">${ls.map(i=>esc(T[i][0])+(lvl[i]?' ★'+lvl[i]:'')).join(' · ')}</div>`}
if(me){h+=`<div class="mi grn"><i>🏦</i><div><b>Кредит</b><small>${my?'Борг: '+fm(p.debt||0):'Лише під час вашого ходу'}</small>${my?'<div class="cb"><button onclick="credit(1)">Взяти 2 000 ₴</button><button class="n" onclick="credit(0)">Повернути</button></div>':''}</div></div>`;
h+=`<div class="mi red"${my?' onclick="surr()"':' style="opacity:.55"'}><i>🏳️</i><div><b>Здатися</b><small>${my?'Вийти з гри':'Лише під час вашого ходу'}</small></div></div>`}
return h+'</div></div>'}
async function credit(t){if(!S||busy||!driver()||!(S.ph=='roll'||S.ph=='buy'))return;sync();const k=S.cur,p=P[k];if(p.id!=myId)return;busy=true;
if(t){if((p.debt||0)>=4800){busy=false;return alert('Ліміт кредиту досягнуто')}p.m+=2000;p.debt=(p.debt||0)+2400;ev(k,'взяв кредит 2000 ₴ (повернути 2400 ₴)')}
else{const x=Math.min(p.m,p.debt||0);if(x<=0){busy=false;return}p.m-=x;p.debt-=x;ev(k,'повернув кредит '+x+' ₴')}
await save();busy=false}
async function surr(){if(!S||busy||!driver()||!(S.ph=='roll'||S.ph=='buy'))return;sync();const k=S.cur,p=P[k];if(p.id!=myId||!confirm('Здатися?'))return;busy=true;modal=null;
p.m=0;p.alive=false;S.own.forEach((o,j)=>{if(o==k){S.own[j]=-1;S.lvl[j]=0}});ev(k,'здався 🏳️');S.ph='wait';await save();end()}
Object.assign(window,{joinRoom,watch,prof,closeProf,tgs,credit,surr});

let lastRid=null,dzt=null,dzh=null;
const PIPS=[[],[5],[1,9],[1,5,9],[1,3,7,9],[1,3,5,7,9],[1,3,4,6,7,9]];
const pips=n=>{let s='';for(let i=1;i<=9;i++)s+='<i'+(PIPS[n].includes(i)?' class="p"':'')+'></i>';return s};
function playDice(d){const z=$('dz');clearInterval(dzt);clearTimeout(dzh);
z.innerHTML='<div class="dw"><div class="dd roll"><div class="die"></div></div><div class="dd d2 roll"><div class="die"></div></div></div><div class="sum"></div>';z.style.display='grid';
const set=(a,b)=>z.querySelectorAll('.die').forEach((e,i)=>e.innerHTML=pips(i?b:a));
const r=()=>1+Math.random()*6|0;set(r(),r());dzt=setInterval(()=>set(r(),r()),90);
dzh=setTimeout(()=>{clearInterval(dzt);set(d[0],d[1]);z.querySelectorAll('.dd').forEach(e=>{e.classList.remove('roll');e.classList.add('pop')});const s=z.querySelector('.sum');if(s){s.textContent='';s.classList.remove('on')}
try{tg&&tg.HapticFeedback&&tg.HapticFeedback.impactOccurred('medium')}catch(e){}
dzh=setTimeout(()=>{z.style.display='none'},650)},1000)}

// ===== покрокове пересування фішок =====
let vis={},stepping=false,hopId=null,wt=null;
function dpos(p){return vis[p.id]===undefined?p.pos:vis[p.id]}
function drawTokens(){if(!S)return;document.querySelectorAll('#bd .t').forEach(el=>{const i=+el.dataset.i,tk=el.querySelector('.tk');if(tk)tk.innerHTML=S.players.map(p=>p.alive&&dpos(p)==i?tokn(p):'').join('')})}
function syncTokens(){if(!S)return;S.players.forEach(p=>{if(vis[p.id]===undefined)vis[p.id]=p.pos});if(stepping)return;
const dz=$('dz');if(dz&&dz.style.display=='grid'){clearTimeout(wt);wt=setTimeout(syncTokens,200);return}
const m=S.players.find(p=>p.alive&&vis[p.id]!==p.pos);if(!m)return;
const dist=(m.pos-vis[m.id]+40)%40;if(dist>12){vis[m.id]=m.pos;drawTokens();return syncTokens()}
stepping=true;const id=m.id;
const tick=()=>{const q=S&&S.players.find(x=>x.id==id);if(!q||!q.alive||vis[id]===q.pos||(q.pos-vis[id]+40)%40>12){if(q)vis[id]=q.pos;stepping=false;hopId=null;drawTokens();return syncTokens()}
vis[id]=(vis[id]+1)%40;hopId=id;drawTokens();setTimeout(tick,160)};
tick()}
