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
const LG={'Нова Пошта':'novaposhta','Укрпошта':'ukrposhta','monobank':'monobank','Adidas':'adidas','Nike':'nike','Puma':'puma','Telegram':'telegram','TikTok':'tiktok','Google':'google','ПриватБанк':'privatbank','Живчик':'zhyvchyk','АТБ':'atb','Ощадбанк':'oschadbank',"McDonald's":'mcdonalds','KFC':'kfc','Burger King':'burgerking','Rozetka':'rozetka','OLX':'olx','prom':'prom','Райффайзен':'raiffeisen','Apple':'apple','Samsung':'samsung','Kyivstar':'kyivstar','YouTube':'youtube','Моршинська':'morshynska','justin':'justin','ДТЕК':'dtek','Епіцентр':'epicentr'};
const CARDS=[
['💸 Знайшов гаманець на Хрещатику: +500',500],['🚓 Штраф за паркування: −400',-400],['🎟 Лотерея «Мегалот»: +2000',2000],['🔧 Ремонт авто: −800',-800],
['👵 Бабуся передала 500 ₴ та банку варення',500],['☕ Кава у Львові для всієї компанії: −200',-200],['💙 Кешбек від monobank: +400',400],['📦 Нова Пошта загубила посилку — компенсація +700',700],
['🧾 Податкова перевірка: −1000',-1000],['🍀 Знайшов чотирилисник: +300',300],['🏁 Іди на СТАРТ і отримай 1200 ₴',0,'go'],['👮 Лови поліцію! Іди у в\'язницю',0,'jail'],
['⏪ Затор на Столичному: відступи на 3 клітинки',0,'back3'],['🎂 День народження! Кожен гравець дарує тобі 200 ₴',200,'eachget'],['🧱 Скинулись на ремонт у під\'їзді: сплати кожному по 150 ₴',150,'eachpay'],
['🏗 Ремонт у твоїх магазинах: 250 ₴ за кожну ★',250,'repair'],['🚂 Рейс! Їдь до «{n}»',0,'to:1'],['✈️ Лети до «{n}»',0,'to:11'],
['🛒 Акція! Біжи до «{n}»',0,'to:31'],['🏦 Візит до «{n}»',0,'to:16'],['🎰 Ризикни — іди в казино!',0,'to:20']
];
const PC=['#ff4d4d','#3ddc84','#ffd23f','#4aa8ff','#b46bff'];
const pos=i=>i<=10?[1,1+i]:i<=20?[i-9,11]:i<=30?[11,31-i]:[41-i,1];
const side=i=>i<10?'top':i<20?'rt':i<30?'bot':'lf';
const hm=()=>new Date().toTimeString().slice(0,5),fm=n=>n.toLocaleString('uk')+' ₴';
function full(i){return T.every((x,k)=>x[2]!==T[i][2]||typeof x[1]!='number'||own[k]==own[i])}
function rent(i){const b=Math.round(T[i][1]*.1),L=lvl[i];return L?b*[0,4,8,14][L]:b*(full(i)?2:1)}
function tile(b,i){const[r,c]=pos(i),s=side(i%10==0?(i==0?0:i==10?9:i==20?21:31):i),t=b[1];
const tk=P.map(p=>p.alive&&dpos(p)==i?tokn(p):'').join('');
const corner=i%10==0,cls=(corner?'sp ':'')+s;
if(typeof t!='number')return '<div class="t '+cls+'" data-i="'+i+'" onclick="tinfo('+i+')" style="grid-area:'+r+'/'+c+'"><div class="in"><span class="em">'+b[2]+'</span>'+(corner?'':'<span class="nm">'+b[0]+'</span>')+'</div><div class="tk">'+tk+'</div></div>';
const bg=own[i]>=0?P[own[i]].c+'aa':'var(--tile,#fff)';
return '<div class="t '+cls+'" data-i="'+i+'" onclick="tinfo('+i+')" style="grid-area:'+r+'/'+c+';--b:'+bg+'"><div class="in">'+tcont(b)+(lvl[i]?'<div class="st">'+'★'.repeat(lvl[i])+'</div>':'')+'</div><div class="pr" style="--g:'+GC[b[2]]+'">'+t+'</div><div class="tk">'+tk+'</div></div>'}

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
    await set(ref(db,'rooms/'+code),{code,status:'waiting',map:selMap(),players:{[myId]:{id:myId,name:nm(),ph:myPh,dk:SK.d,fr:SK.f,j:Date.now(),online:true}}});
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
      await set(ref(db,`rooms/${c}/players/${myId}`),{id:myId,name:nm(),ph:myPh,dk:SK.d,fr:SK.f,j:Date.now(),online:true});
    } else await update(ref(db,`rooms/${c}/players/${myId}`),{online:true,name:nm(),ph:myPh,dk:SK.d,fr:SK.f});
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
      $('playersList').innerHTML=a.map(p=>'<div class="pi"><span class="av">'+avh({ph:p.ph,a:Array.from(p.name||'?')[0].toUpperCase()})+'</span> '+esc(p.name)+' '+(p.bot?'🤖':p.online?'🟢':'🔴')+'</div>').join('');
      $('startGameBtn').style.display=a[0]&&a[0].id==myId?'block':'none';$('addBotBtn').style.display=a[0]&&a[0].id==myId&&a.length<5?'block':'none';
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
function fresh(ps,map){return{map:map||'brands',players:ps.map((p,i)=>({id:p.id,n:p.n,ph:p.ph||'',c:PC[i],a:p.bot?'🤖':(Array.from(p.n||'?')[0]||'?').toUpperCase(),bot:!!p.bot,dk:p.dk||'classic',fr:p.fr||'none',m:10000,pos:0,jail:0,alive:true})),own:Array(40).fill(-1),lvl:Array(40).fill(0),cur:0,ph:'roll',tend:Date.now()+30000}}
async function startGame(){
  const ps=Object.values((await get(ref(db,'rooms/'+code+'/players'))).val()||{}).sort((a,b)=>a.j-b.j);
  if(ps.length<2)return;const mp=(await get(ref(db,'rooms/'+code+'/map'))).val()||'brands';
  await update(ref(db,'rooms/'+code),{state:fresh(ps.map(p=>({id:p.id,n:p.name,ph:p.ph||'',bot:!!p.bot,dk:p.dk,fr:p.fr})),mp),status:'playing'});
  ev(0,'Гра почалась! Капітал '+fm(10000));
}
async function newGame(){if(!S||S.players[0].id!=myId)return;S=fresh(S.players.map(p=>({id:p.id,n:p.n,ph:p.ph||'',bot:!!p.bot,dk:p.dk,fr:p.fr})),S.map);await save();ev(0,'Нова гра! Капітал '+fm(10000))}
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
function driver(){const c=S.players[S.cur];if(c.bot){const h=S.players.find(p=>!p.bot&&p.alive&&on(p.id));return !!h&&h.id==myId}if(on(c.id))return c.id==myId;const h=S.players.find(p=>!p.bot&&p.alive&&on(p.id));return !!h&&h.id==myId}
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
  S.rid=Date.now()+Math.random();S.dsk=p.dk||'classic';
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
    if(drawCard(k)){await save();setTimeout(()=>{land()},900);return}
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
if(al.length<2||!al.some(p=>!p.bot)){S.ph='over';S.dice=null;ev(P.indexOf(al[0]),al.length<2?'🏆 переміг!':'🏆 боти перемогли');await save();busy=false;return}
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
function render(){if(!S)return;useMap(S.map||'brands');sync();trNotify();const k=S.cur,c=P[k],mine=c.id==myId,ph=S.ph,pb=T[c.pos];
const spec=!P.some(p=>p.id==myId);const isB=typeof pb[1]=='number'&&own[c.pos]==k;
const pn=P.map((p,i)=>'<div class="pl'+(i==k?' on':'')+(p.alive?'':' dead')+'" style="--c:'+p.c+'" onclick="prof('+i+')">'+(i==k&&p.alive&&ph!='over'?'<i class="tm" id="tm">30 c</i>':'')+'<div class="av'+frc(p)+'"'+fra(p)+'>'+avh(p)+'</div><div><b>'+esc(p.n)+(p.id==myId?' (ти)':'')+'</b><span>'+(p.alive?fm(p.m):'БАНКРУТ')+'</span></div></div>').join('');
const ac=ph=='over'&&P[0].id==myId?'<div class="ac"><button onclick="newGame()">Нова гра</button></div>':'';
const buyFab=mine&&ph=='buy'?'<div class="buybar"><button class="y" onclick="buy()">'+(isB?'⭐ Покращити за '+Math.round(pb[1]/2):'🛒 Купити «'+pb[0]+'» за '+pb[1])+' ₴</button><button class="n" onclick="skip()">Пас</button></div>':'';
const sub=ph=='over'?'Гру завершено':mine&&ph=='buy'?(isB?'Покращити ділянку?':'Купити '+pb[0]+'?'):mine&&ph=='roll'?'Твій хід — кидай кубики.':'Очікуйте завершення ходу.';
const L=LOGS;
let h='<div id="top">'+pn+'<button class="mn" onclick="if(confirm(\'Вийти з гри?\'))location.reload()">⋮</button></div>'+tbar()+'<div id="bd">'+T.map(tile).join('');
h+='<div id="mid"><h3>Події гри <span class="hb"><span class="ib">👁 '+LOGS.length+'</span></span></h3><div id="log">'+L.map(e=>{const q=P[e.p]||{c:'#888',n:''};return e.c?'<div class="ev c" style="--c:'+q.c+'"><b>'+esc(q.n)+'</b> '+esc(e.t)+'</div>':'<div class="ev" style="--c:'+q.c+'"><b>'+esc(q.n)+'</b> '+esc(e.t)+'</div>'}).join('')+'</div><div class="row"><input id="ci" '+(spec?'disabled placeholder="Ви спостерігаєте"':'placeholder="Написати повідомлення…"')+' onkeydown="if(event.key===\'Enter\'){event.preventDefault();say()}"><button type="button" onclick="say()">➤</button></div><div id="sc"><b>'+(ph=='over'?'Кінець гри':'Хід гравця '+esc(c.n))+'</b><small>'+sub+'</small>'+ac+'</div></div>';
h+='</div>'+(mine&&ph=='roll'&&!spec?'<button class="fab" onclick="roll()">🎲 Кинути кубики</button>':'')+buyFab+modalHtml()+tradeUI()+tileModal();
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
function tokn(p){const u=okp(p.ph);return `<s class="tkn${frc(p)}${hopId===p.id?' hop':''}" style="--c:${p.c}${u?`;background:url('${u}') center/cover`:''}">${u?'':esc(p.a)}</s>`}
let ROOMS=[],modal=null,stats=false;
onValue(ref(db,'rooms'),s=>{
  ROOMS=[];s.forEach(c=>{const r=c.val();if(!r||!r.players)return;const ps=Object.values(r.players).sort((a,b)=>a.j-b.j);if(!ps.some(p=>p.online&&!p.bot))return;const mine=ps.some(p=>p.id==myId);if(r.state&&r.state.ph=='over'&&!mine)return;ROOMS.push({code:c.key,st:r.status,ps,mine,map:r.map})});
  if(!code)renderLobby();
},e=>{
  $('roomList').innerHTML='<p class="mut">⚠️ Немає доступу до списку кімнат.<br>Firebase → Realtime Database → Rules:<br><code>{ "rules": { ".read": true, ".write": true } }</code><br>(або обмеж лише /rooms)</p>';
  console.error(e);
});
function renderLobby(){$('roomCount').textContent='Знайдено: '+ROOMS.length;
$('roomList').innerHTML=ROOMS.map(r=>{const h=r.ps[0],pl=r.st=='playing',q="'"+r.code+"'";
const btn=r.mine?`<button class="y" onclick="joinRoom(${q})">Продовжити</button>`:pl?`<button class="n" onclick="watch(${q})">Дивитися</button>`:r.ps.length>=5?'<button class="n" disabled>Повна</button>':`<button onclick="joinRoom(${q})">Приєднатися</button>`;
return `<div class="rm"><div class="av">${avh({ph:h.ph,a:Array.from(h.name||'?')[0].toUpperCase()})}</div><div class="ri"><b>${esc(h.name)}</b><span class="bd ${pl?'pg':'wt'}">${pl?'Гра триває':'Очікування'}</span><small class="mut">${r.ps.length}/5 гравців · ${(MAPS[r.map]||MAPS.brands).ico} ${(MAPS[r.map]||MAPS.brands).n}</small></div>${btn}</div>`}).join('')||'<p class="mut">Кімнат поки немає — створи свою!</p>'}
function watch(c){code=c;enter(true)}
function prof(i){modal=i;stats=false;render()}
function closeProf(){modal=null;render()}
function tgs(){stats=!stats;render()}
function modalHtml(){if(modal==null||!S)return '';const p=P[modal];if(!p)return '';
const me=p.id==myId,my=me&&S.cur==modal&&driver()&&(S.ph=='roll'||S.ph=='buy'),ls=T.map((b,i)=>own[i]==modal?i:-1).filter(i=>i>=0),val=ls.reduce((s,i)=>s+T[i][1],0),st=ls.reduce((s,i)=>s+lvl[i],0);
let h=`<div class="ov" onclick="closeProf()"><div class="md" onclick="event.stopPropagation()">
<div class="mh"><div class="av big${frc(p)}"${fra(p,'--c:'+p.c)}>${avh(p)}</div><div><small class="gd">ПРОФІЛЬ ГРАВЦЯ</small><h2>${esc(p.n)}</h2><span class="mm">${fm(p.m)}</span></div><button class="x" onclick="closeProf()">✕</button></div>
<div class="stats-row">
  <div class="stat-card"><div class="si">🏠</div><div class="sv">${ls.length}</div><div class="sl">ДІЛЯНОК</div></div>
  <div class="stat-card"><div class="si">⭐</div><div class="sv">${st}</div><div class="sl">ЗІРОК</div></div>
  <div class="stat-card"><div class="si">💰</div><div class="sv">${fm(val)}</div><div class="sl">ВАРТІСТЬ</div></div>
</div>`;
if(ls.length){h+=`<div class="stt" style="max-height:120px;overflow:auto">${ls.map(i=>esc(T[i][0])+(lvl[i]?' ★'+lvl[i]:'')).join(' · ')}</div>`}
if(me){h+=`<div class="mi grn"><i>🏦</i><div><b>Кредит</b><small>${my?'Борг: '+fm(p.debt||0):'Лише під час вашого ходу'}</small>${my?'<div class="cb"><button onclick="credit(1)">Взяти 2 000 ₴</button><button class="n" onclick="credit(0)">Повернути</button></div>':''}</div></div>`;
h+=`<div class="mi red"${my?' onclick="surr()"':' style="opacity:.55"'}><i>🏳️</i><div><b>Здатися</b><small>${my?'Вийти з гри':'Лише під час вашого ходу'}</small></div></div>`}
if(!me&&p.alive&&P.some(q=>q.id==myId&&q.alive))h+=`<div class="mi gold" onclick="openTrade(${modal})"><i>🤝</i><div><b>Обмін</b><small>Запропонувати обмін ділянками та грошима</small></div></div>`;
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
function playDice(d){const z=$('dz');applyDie(z);clearInterval(dzt);clearTimeout(dzh);
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

// ===== ТОРГИ =====
let tr=null,trSeen=null;
const myIdx=()=>P.findIndex(p=>p.id==myId);
const trList=()=>Object.values((R&&R.trades)||{});
const trOut=()=>trList().find(t=>t.fromId==myId&&(t.status=='pending'||t.status=='accepted'));
const trIn=()=>trList().find(t=>t.toId==myId&&t.status=='pending');
const pname=id=>{const p=(S&&S.players||[]).find(x=>x.id==id);return p?p.n:'?'};
function openTrade(i){if(!S)return;if(trOut())return toast('Спочатку дочекайся відповіді на попередню пропозицію');tr={to:i,give:[],ask:[],gc:0,ac:0};modal=null;render()}
function closeTrade(){tr=null;render()}
function tgp(side,i){if(!tr)return;const a=side=='g'?tr.give:tr.ask,j=a.indexOf(i);j<0?a.push(i):a.splice(j,1);render()}
function adj(side,d){if(!tr)return;const me=P[myIdx()],o=P[tr.to];if(side=='g')tr.gc=Math.max(0,Math.min(me.m,tr.gc+d));else tr.ac=Math.max(0,Math.min(o.m,tr.ac+d));render()}
async function sendTrade(){if(!tr||!S)return;sync();if(myIdx()<0)return;if(!tr.give.length&&!tr.ask.length&&!tr.gc&&!tr.ac)return toast('Додай щось до обміну');
const id='t'+Date.now(),d=tr;for(const t of trList().filter(t=>t.fromId==myId&&t.status!='pending'&&t.status!='accepted'))await set(ref(db,`rooms/${code}/trades/${t.id}`),null);
await set(ref(db,`rooms/${code}/trades/${id}`),{id,fromId:myId,toId:P[d.to].id,give:d.give,ask:d.ask,gc:d.gc,ac:d.ac,status:'pending',ts:Date.now()});tr=null;toast('🤝 Пропозицію надіслано');render()}
const setTr=(id,st)=>update(ref(db,`rooms/${code}/trades/${id}`),{status:st});
const answerTrade=(id,yes)=>setTr(id,yes?'accepted':'declined');
const cancelTrade=id=>setTr(id,'cancelled');
function trNotify(){const L=trList();if(trSeen===null){trSeen={};L.forEach(t=>trSeen[t.id]=t.status);return}
L.forEach(t=>{if(trSeen[t.id]===t.status)return;trSeen[t.id]=t.status;if(t.fromId!=myId&&t.toId!=myId)return;
if(t.status=='done')toast('🤝 Обмін завершено: '+pname(t.fromId)+' ↔ '+pname(t.toId));
else if(t.status=='declined'&&t.fromId==myId)toast(pname(t.toId)+' відхилив обмін');
else if(t.status=='failed')toast('Обмін не вдався: умови змінились');
else if(t.status=='pending'&&t.toId==myId)toast('🤝 Пропозиція обміну від '+pname(t.fromId))})}
const chip=(i,on,dis,fn)=>`<span class="chip${on?' on':''}${dis?' dis':''}"${dis?'':` onclick="${fn}"`}><i style="color:${GC[T[i][2]]}">●</i> ${esc(T[i][0])} · ${T[i][1]}${lvl[i]?' ★'+lvl[i]:''}</span>`;
const desc=(a,c)=>(a||[]).map(i=>T[i]?esc(T[i][0]):'').filter(Boolean).concat(c?[fm(c)]:[]).join(', ')||'—';
function tbar(){const t=trOut();if(!t)return '';const o=P.find(p=>p.id==t.toId);return `<div class="tbar"><span>🤝 Обмін: очікуємо ${esc(o?o.n:'')}</span>${t.status=='pending'?`<button class="n" onclick="cancelTrade('${t.id}')">Скасувати</button>`:''}</div>`}
function tradeUI(){if(!S)return '';sync();const me=myIdx();
if(tr&&me>=0){const o=P[tr.to],mp=T.map((b,i)=>own[i]===me?i:-1).filter(i=>i>=0),tp=T.map((b,i)=>own[i]===tr.to?i:-1).filter(i=>i>=0),none='<small class="mut">Немає ділянок</small>';
return `<div class="ov" onclick="closeTrade()"><div class="md" onclick="event.stopPropagation()"><div class="mh"><div><small class="gd">ОБМІН</small><h2>🤝 ${esc(o.n)}</h2></div><button class="x" onclick="closeTrade()">✕</button></div><div class="tc"><div class="tcol"><b>Ти віддаєш</b><div class="chips">${mp.map(i=>chip(i,tr.give.includes(i),lvl[i]>0,`tgp('g',${i})`)).join('')||none}</div><div class="cash"><button onclick="adj('g',-500)">−</button><b>${fm(tr.gc)}</b><button onclick="adj('g',500)">+</button></div></div><div class="tcol"><b>Ти просиш</b><div class="chips">${tp.map(i=>chip(i,tr.ask.includes(i),lvl[i]>0,`tgp('a',${i})`)).join('')||none}</div><div class="cash"><button onclick="adj('a',-500)">−</button><b>${fm(tr.ac)}</b><button onclick="adj('a',500)">+</button></div></div></div><small class="mut">Ділянки із зірочками ★ обмінювати не можна</small><div class="cb"><button class="y" onclick="sendTrade()">Запропонувати</button></div></div></div>`}
const t=trIn();if(t)return `<div class="ov"><div class="md"><small class="gd">ПРОПОЗИЦІЯ ОБМІНУ</small><h2>🤝 ${esc(pname(t.fromId))}</h2><div class="stt"><b>Віддає тобі:</b> ${desc(t.give,t.gc)}</div><div class="stt"><b>Просить у тебе:</b> ${desc(t.ask,t.ac)}</div><div class="cb"><button class="y" onclick="answerTrade('${t.id}',true)">Прийняти</button><button class="n" onclick="answerTrade('${t.id}',false)">Відхилити</button></div></div></div>`;
return ''}
async function applyTrades(){if(!S||busy||!R||!R.trades||!driver()||!(S.ph=='roll'||S.ph=='buy'))return;
const t=trList().find(x=>x.status=='accepted');if(!t)return;busy=true;sync();
const a=P.findIndex(p=>p.id==t.fromId),b=P.findIndex(p=>p.id==t.toId),give=t.give||[],ask=t.ask||[],gc=+t.gc||0,ac=+t.ac||0;
const ok=a>=0&&b>=0&&a!=b&&P[a].alive&&P[b].alive&&give.every(i=>own[i]===a&&!lvl[i])&&ask.every(i=>own[i]===b&&!lvl[i])&&P[a].m>=gc&&P[b].m>=ac;
if(ok){give.forEach(i=>{own[i]=b});ask.forEach(i=>{own[i]=a});P[a].m+=ac-gc;P[b].m-=ac-gc;ev(a,'обмінявся з '+P[b].n+': віддав '+desc(give,gc)+', отримав '+desc(ask,ac));await save()}
await setTr(t.id,ok?'done':'failed');busy=false}
setInterval(()=>{applyTrades().catch(e=>{busy=false;console.error(e)})},500);
Object.assign(window,{openTrade,closeTrade,tgp,adj,sendTrade,answerTrade,cancelTrade});

// ===== БОТИ =====
const BOTN=['Тарас','Оля','Іван','Марина','Богдан'];
async function addBot(){if(!R||!R.players)return;const ps=Object.values(R.players);if(ps.length>=5)return;const n=ps.filter(p=>p.bot).length,id='bot_'+Date.now()+n;
await set(ref(db,`rooms/${code}/players/${id}`),{id,name:'🤖 '+BOTN[n%5],ph:'',dk:rnd(DICE),fr:rnd(FRAMES),j:Date.now(),online:true,bot:true})}
async function startSolo(){try{const n=Math.max(1,Math.min(4,+$('botN').value||3));code='GAME-'+Math.random().toString(36).slice(2,6).toUpperCase();
const players={[myId]:{id:myId,name:nm(),ph:myPh,dk:SK.d,fr:SK.f,j:Date.now(),online:true}};for(let i=0;i<n;i++){const id='bot_'+i;players[id]={id,name:'🤖 '+BOTN[i],ph:'',dk:rnd(DICE),fr:rnd(FRAMES),j:Date.now()+1+i,online:true,bot:true}}
await set(ref(db,'rooms/'+code),{code,status:'waiting',map:selMap(),players});enter();await startGame()}catch(e){alert('Не вдалося почати гру: '+e.message)}}
$('botBtn').onclick=startSolo;$('addBotBtn').onclick=addBot;
const isHost=()=>{if(!S||!R)return false;const h=S.players.find(p=>!p.bot&&p.alive&&on(p.id));return !!h&&h.id==myId};
function botTick(){if(!S||!R||busy||S.ph=='over'||S.ph=='wait')return;sync();const k=S.cur,p=P[k];
if(p&&p.bot&&p.alive&&driver()&&Date.now()>S.tend-30000+1300){
 if(S.ph=='roll')return void roll();
 if(S.ph=='buy'){const b=T[p.pos],up=own[p.pos]===k,cost=up?Math.round(b[1]/2):b[1],grp=T.every((x,i)=>x[2]!==b[2]||typeof x[1]!='number'||own[i]===k||i===p.pos);return void(p.m>=cost+(grp?600:1500)?buy():skip())}}
if(isHost()){const t=trList().find(x=>x.status=='pending'&&P.some(q=>q.id==x.toId&&q.bot&&q.alive));
 if(t){const val=(a,c)=>(a||[]).reduce((s,i)=>s+(T[i]?T[i][1]:0),0)+(+c||0);setTr(t.id,val(t.give,t.gc)>=val(t.ask,t.ac)*1.15?'accepted':'declined')}}}
setInterval(()=>{try{botTick()}catch(e){console.error(e)}},500);

// ===== КАРТИ «ШАНС» =====
function drawCard(k){const p=P[k],c=CARDS[Math.random()*CARDS.length|0],sp=c[2]||'';let tx=c[0];if(sp.indexOf('to:')==0){const q=T[+sp.slice(3)];tx=tx.replace('{n}',q?q[0]:'')}ev(k,'🎴 '+tx);toast(tx);
if(sp=='go'){p.pos=0;p.m+=1200;return false}
if(sp=='jail'){p.pos=10;p.jail=1;return false}
if(sp=='back3'){p.pos=(p.pos+37)%40;return true}
if(sp.indexOf('to:')==0){const i=+sp.slice(3);if(!(i>=0))return false;if(i<p.pos)p.m+=1200;p.pos=i;return true}
if(sp=='eachget'){P.forEach((q,i)=>{if(i!=k&&q.alive){const a=Math.min(q.m,c[1]);q.m-=a;p.m+=a}});return false}
if(sp=='eachpay'){P.forEach((q,i)=>{if(i!=k&&q.alive){const a=Math.min(p.m,c[1]);p.m-=a;q.m+=a}});return false}
if(sp=='repair'){const n=lvl.reduce((s,l,i)=>s+(own[i]===k?l:0),0);if(n)pay(k,n*c[1]);else ev(k,'зірок немає — платити нічого');return false}
if(c[1]>0)p.m+=c[1];else pay(k,-c[1]);return false}

// ===== СКІНИ =====
const DICE=[{id:'classic',n:'Класика',bg:'#fff',pip:'#111'},{id:'gold',n:'Золото',bg:'linear-gradient(135deg,#ffe27a,#e0a800)',pip:'#3a2600'},{id:'neon',n:'Неон',bg:'#0b1230',pip:'#38f2ff',glow:'0 0 8px #38f2ff'},
{id:'carbon',n:'Карбон',bg:'#15171c',pip:'#ffd23f',glow:'0 0 6px #ffd23f'},{id:'emerald',n:'Смарагд',bg:'linear-gradient(135deg,#46f08c,#0e7a45)',pip:'#022'},{id:'ruby',n:'Рубін',bg:'linear-gradient(135deg,#ff7a7a,#a00020)',pip:'#fff'},{id:'ua',n:'Жовто-блакитні',bg:'#ffd23f',pip:'#1f4fb8'}];
const FRAMES=[{id:'none',n:'Без рамки'},{id:'gold',n:'Золото',b:'👑'},{id:'neon',n:'Неон',b:'⚡'},{id:'fire',n:'Вогонь',b:'🔥'},{id:'ua',n:'Тризуб',b:'🔱'},{id:'royal',n:'Діамант',b:'💎'}];
const rnd=a=>a[Math.random()*a.length|0].id;
const lsg=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lss=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const SK={d:lsg('sk_d')||'classic',f:lsg('sk_f')||'none',t:lsg('sk_t')||'neon'};
const dsk=id=>DICE.find(x=>x.id==id)||DICE[0],frm=id=>FRAMES.find(x=>x.id==id)||FRAMES[0];
const frc=p=>p&&p.fr&&p.fr!='none'?' fr-'+p.fr:'';
function fra(p,ex){const f=p&&frm(p.fr),on=f&&f.id!='none',st=(ex?ex+';':'')+(on?"--fi:url('skins/frame-"+f.id+".png')":'');return (on&&f.b?' data-b="'+f.b+'"':'')+(st?' style="'+st+'"':'')}
function applyDie(z){const s=dsk(S&&S.dsk);z.style.setProperty('--dbg',s.bg);z.style.setProperty('--dpip',s.pip);z.style.setProperty('--dglow',s.glow||'inset 0 -2px 3px rgba(255,255,255,.35)');z.style.setProperty('--dimg',"url('skins/dice-"+s.id+".png')")}
function skinUI(){const z=$('skm');
const dices=DICE.map(s=>`<div class="sk${SK.d==s.id?' on':''}" onclick="pickSk('d','${s.id}')"><div class="die mini" style="--dbg:${s.bg};--dpip:${s.pip};--dglow:${s.glow||'none'};--dimg:url('skins/dice-${s.id}.png')">${pips(5)}</div><small>${s.n}</small></div>`).join('');
const frames=FRAMES.map(f=>`<div class="sk${SK.f==f.id?' on':''}" onclick="pickSk('f','${f.id}')"><div class="av big${f.id=='none'?'':' fr-'+f.id}"${f.b?` data-b="${f.b}"`:''} style="--c:#4aa8ff;--fi:url('skins/frame-${f.id}.png')">${avh({ph:myPh,a:(Array.from(nm())[0]||'?').toUpperCase()})}</div><small>${f.n}</small></div>`).join('');
const themes=THEMES.map(t=>`<div class="sk${SK.t==t.id?' on':''}" onclick="pickSk('t','${t.id}')"><div class="thm" style="background:${t.bdbg}"><span style="background:${t.tile}"></span><span style="background:${t.tile}"></span><span style="background:${t.tile}"></span></div><small>${t.n}</small></div>`).join('');
z.innerHTML=`<div class="md" onclick="event.stopPropagation()"><div class="mh"><h2>🎨 Скіни</h2><button class="x" onclick="closeSk()">✕</button></div><b>Кубики</b><div class="skg">${dices}</div><b>Рамки аватарки</b><div class="skg">${frames}</div><b>Стиль поля</b><div class="skg">${themes}</div></div>`;z.style.display='grid'}
function closeSk(){$('skm').style.display='none'}
function hdrFrame(){const a=$('meAv'),f=frm(SK.f);a.className='av big'+(f.id=='none'?'':' fr-'+f.id);if(f.id!='none'&&f.b)a.dataset.b=f.b;else delete a.dataset.b}
function pickSk(kind,id){SK[kind]=id;lss('sk_'+kind,id);if(kind=='t')applyTheme();hdrFrame();skinUI()}
$('skinBtn').onclick=skinUI;hdrFrame();
Object.assign(window,{pickSk,closeSk});
const MAPS={
brands:{n:'Бренди України',ico:'🏷',list:null},
cities:{n:'Міста України',ico:'🏙',list:[["Харків", "kharkiv", "🏗", "#c0392b"],["Київ", "kyiv", "🏛", "#2980b9"],["Полтава", "poltava", "🏙", "#27ae60"],["Львів", "lviv", "☕", "#8e44ad"],["Одеса", "odesa", "⚓", "#d35400"],["Дніпро", "dnipro", "🌉", "#16a085"],["Ужгород", "uzhhorod", "🏙", "#2c3e50"],["Мукачево", "mukachevo", "🏙", "#e67e22"],["Чернівці", "chernivtsi", "🏙", "#c0392b"],["Вінниця", "vinnytsia", "🏙", "#2980b9"],["Житомир", "zhytomyr", "🏙", "#27ae60"],["Суми", "sumy", "🏙", "#8e44ad"],["Яремче", "iaremche", "⛰", "#d35400"],["Буковель", "bukovel", "🎿", "#16a085"],["Херсон", "kherson", "🏙", "#2c3e50"],["Миколаїв", "mykolaiv", "🏙", "#e67e22"],["Черкаси", "cherkasy", "🏙", "#c0392b"],["Кропивницький", "kropyvnytskyi", "🏙", "#2980b9"],["Луцьк", "lutsk", "🏙", "#27ae60"],["Тернопіль", "ternopil", "🏙", "#8e44ad"],["Рівне", "rivne", "🏙", "#d35400"],["Кам'янець-Подільський", "kamianets-podilskyi", "🏙", "#16a085"],["Запоріжжя", "zaporizhzhia", "🏙", "#2c3e50"],["Маріуполь", "mariupol", "🏙", "#e67e22"],["Хмельницький", "khmelnytskyi", "🏙", "#c0392b"],["Чернігів", "chernihiv", "🏙", "#2980b9"],["Умань", "uman", "🏙", "#27ae60"],["Біла Церква", "bila-tserkva", "🏙", "#8e44ad"]]},
food:{n:'Смаки України',ico:'🍲',list:[["Борщ", "borshch", "🍲", "#c0392b"],["Вареники", "varenyky", "🥟", "#2980b9"],["Сало", "salo", "🥓", "#27ae60"],["Котлета по-київськи", "kotleta-po-kyivsky", "🍲", "#8e44ad"],["Київський торт", "kyivskyi-tort", "🍰", "#d35400"],["Львівський сирник", "lvivskyi-syrnyk", "🍲", "#16a085"],["Голубці", "holubtsi", "🍲", "#2c3e50"],["Налисники", "nalysnyky", "🍲", "#e67e22"],["Пампушки", "pampushky", "🍲", "#c0392b"],["Холодець", "kholodets", "🍲", "#2980b9"],["Кутя", "kutia", "🍲", "#27ae60"],["Галушки", "halushky", "🍲", "#8e44ad"],["Узвар", "uzvar", "🍐", "#d35400"],["Квас", "kvas", "🥤", "#16a085"],["Сирники", "syrnyky", "🍲", "#2c3e50"],["Кисіль", "kysil", "🍲", "#e67e22"],["Паска", "paska", "🍞", "#c0392b"],["Книш", "knysh", "🍲", "#2980b9"],["Банош", "banosh", "🍲", "#27ae60"],["Куліш", "kulish", "🍲", "#8e44ad"],["Лемішка", "lemishka", "🍲", "#d35400"],["Крученики", "kruchenyky", "🍲", "#16a085"],["Деруни", "deruny", "🍲", "#2c3e50"],["Вертута", "vertuta", "🍲", "#e67e22"],["Мамалига", "mamalyha", "🍲", "#c0392b"],["Капусняк", "kapusniak", "🍲", "#2980b9"],["Горілка з перцем", "horilka-z-pertsem", "🍲", "#27ae60"],["Мед з горіхами", "med-z-horikhamy", "🍯", "#8e44ad"]]},
places:{n:'Мандрівка Україною',ico:'🏰',list:[["Хортиця", "khortytsia", "🏞", "#c0392b"],["Софія Київська", "sofiia-kyivska", "🏰", "#2980b9"],["Софіївка", "sofiivka", "🏰", "#27ae60"],["Києво-Печерська лавра", "kyievo-pecherska-lavra", "🏰", "#8e44ad"],["Хотинська фортеця", "khotynska-fortetsia", "🏰", "#d35400"],["Говерла", "hoverla", "⛰", "#16a085"],["Олеський замок", "oleskyi-zamok", "🏰", "#2c3e50"],["Замок Паланок", "zamok-palanok", "🏰", "#e67e22"],["Синевир", "synevyr", "🏰", "#c0392b"],["Шацькі озера", "shatski-ozera", "🌊", "#2980b9"],["Асканія-Нова", "askaniia-nova", "🏰", "#27ae60"],["Дніпрогес", "dniprohes", "⚡", "#8e44ad"],["Мармурова печера", "marmurova-pechera", "🏰", "#d35400"],["Тунель кохання", "tunel-kokhannia", "🏰", "#16a085"],["Кам'янець-Подільський замок", "kamianets-podilskyi-zamok", "🏰", "#2c3e50"],["Одеська опера", "odeska-opera", "🎭", "#e67e22"],["Львівська опера", "lvivska-opera", "🎭", "#c0392b"],["Золоті ворота", "zoloti-vorota", "🏰", "#2980b9"],["Андріївський узвіз", "andriivskyi-uzviz", "🏰", "#27ae60"],["Майдан Незалежності", "maidan-nezalezhnosti", "🏰", "#8e44ad"],["Пирогів", "pyrohiv", "🏰", "#d35400"],["Підгорецький замок", "pidhoretskyi-zamok", "🏰", "#16a085"],["Тростянець", "trostianets", "🏰", "#2c3e50"],["Бакота", "bakota", "🏰", "#e67e22"],["Ворохта", "vorokhta", "🏰", "#c0392b"],["Острозький замок", "ostrozkyi-zamok", "🏰", "#2980b9"],["Спаський собор", "spaskyi-sobor", "🏰", "#27ae60"],["Софійський собор", "sofiiskyi-sobor", "🏰", "#8e44ad"]]}};

// ===== КАРТИ ПОЛЯ, СТИЛІ, ІНФО ПРО КЛІТИНКУ =====
const BASE=T.map(x=>x.slice()),OK={};let curMap=null,ti=null;
function useMap(id){if(!MAPS[id])id='brands';if(curMap===id)return;curMap=id;const list=MAPS[id].list;let k=0;
BASE.forEach((b,i)=>{if(typeof b[1]=='number'){let e;if(!list){const f=LG[b[0]];e=b.slice(0,5);e[5]=f?'logos/'+f+'.png':''}else{const m=list[k++];e=[m[0],b[1],b[2],m[2],m[3],'maps/'+id+'/'+m[1]+'.png']}T[i]=e}else T[i]=b.slice()})}
function tcont(b){const p=b[5],fb='<span class="em" style="color:'+b[4]+'">'+b[3]+'</span><span class="nm" style="color:'+b[4]+'">'+esc(b[0])+'</span>';
if(p&&OK[p]!==0)return '<img class="lg" src="'+p+'" alt="'+esc(b[0])+'" data-p="'+p+'" data-e="'+esc(b[3])+'" data-c="'+b[4]+'" onerror="imgFail(this)">';return fb}
function imgFail(el){OK[el.dataset.p]=0;el.outerHTML='<span class="em" style="color:'+el.dataset.c+'">'+el.dataset.e+'</span><span class="nm" style="color:'+el.dataset.c+'">'+el.alt+'</span>'}
const SPEC={s:'🏁 СТАРТ — проходячи його, отримуєш 1200 ₴.',c:'❓ Шанс — витягни картку: бонус, штраф, переміщення або гроші від гравців.',x:'💰 Податок — сплати 800 ₴.',j:'⛓ В\'язниця — тут лише відвідини. Сюди потрапляють за карткою або з клітинки «Іди в в\'язницю».',k:'🎰 Казино — 40% шанс виграти 1000 ₴, інакше втрачаєш 600 ₴.',g:'👮 Іди в в\'язницю — пропустиш наступний хід.'};
function tinfo(i){ti=i;render()}
function closeTi(){ti=null;render()}
function ticon(b){const p=b[5];return p&&OK[p]!==0?'<img src="'+p+'" alt="" data-p="'+p+'" data-e="'+esc(b[3])+'" onerror="OK[this.dataset.p]=0;this.outerHTML=\'<b>\'+this.dataset.e+\'</b>\'">':'<b>'+esc(b[3])+'</b>'}
function tileModal(){if(ti==null||!S||!T[ti])return '';sync();const b=T[ti],o=own[ti],pr=typeof b[1]=='number';
let h=`<div class="ov" onclick="closeTi()"><div class="md" onclick="event.stopPropagation()"><div class="mh"><div class="ticon">${pr?ticon(b):'<b>'+esc(b[2])+'</b>'}</div><div><small class="gd">${pr?'ДІЛЯНКА':'ПОЛЕ'} №${ti}</small><h2>${esc(b[0])}</h2></div><button class="x" onclick="closeTi()">✕</button></div>`;
if(pr){const base=Math.round(b[1]*.1),ow=o>=0?P[o]:null,grp=T.map((x,i)=>x[2]===b[2]&&typeof x[1]=='number'?i:-1).filter(i=>i>=0);
h+=`<div class="stt"><span class="dotg" style="background:${GC[b[2]]}"></span> Група: ${grp.map(i=>esc(T[i][0])+(own[i]>=0?` <i style="color:${P[own[i]].c}">●</i>`:'')).join(' · ')}</div>`;
h+=`<table class="rtb"><tr><td>Ціна</td><td>${fm(b[1])}</td></tr><tr><td>Оренда</td><td>${fm(base)}</td></tr><tr><td>Уся група в одного власника</td><td>${fm(base*2)}</td></tr><tr><td>★ рівень 1</td><td>${fm(base*4)}</td></tr><tr><td>★★ рівень 2</td><td>${fm(base*8)}</td></tr><tr><td>★★★ рівень 3</td><td>${fm(base*14)}</td></tr><tr><td>Покращення (за ★)</td><td>${fm(Math.round(b[1]/2))}</td></tr></table>`;
h+=`<div class="stt">${ow?`Власник: <b style="color:${ow.c}">${esc(ow.n)}</b> · ★ ${lvl[ti]||0} · оренда зараз: <b>${fm(rent(ti))}</b>`:'Вільна ділянка — її можна купити'}</div>`}
else h+=`<div class="stt">${SPEC[b[1]]||''}</div>`;
return h+'</div></div>'}
const THEMES=[{id:'neon',n:'Неон',bg:'#070f22',pn:'#0e1a36',ln:'#1c2c52',bdbg:'#0a1530',tile:'#ffffff'},{id:'gold',n:'Золото',bg:'#14100a',pn:'#241b0e',ln:'#5a4617',bdbg:'linear-gradient(135deg,#2b210f,#14100a)',tile:'#fff3d1'},
{id:'classic',n:'Класика',bg:'#0d1f14',pn:'#14301f',ln:'#2c6b40',bdbg:'#2f7a4a',tile:'#fff7e6'},{id:'ocean',n:'Океан',bg:'#041a2b',pn:'#0a2a44',ln:'#1d5a85',bdbg:'linear-gradient(160deg,#0b4f7a,#062a45)',tile:'#eaf6ff'},
{id:'sunset',n:'Захід',bg:'#1a0b24',pn:'#2a1238',ln:'#6a2f78',bdbg:'linear-gradient(160deg,#7a2f5a,#2a1238)',tile:'#fff0e6'},{id:'forest',n:'Ліс',bg:'#08170d',pn:'#10301a',ln:'#2c6b40',bdbg:'linear-gradient(160deg,#1f5a2e,#0b2412)',tile:'#eaf7e6'}];
function applyTheme(){const t=THEMES.find(x=>x.id==SK.t)||THEMES[0],s=document.documentElement&&document.documentElement.style;if(!s)return;
s.setProperty('--bg',t.bg);s.setProperty('--pn',t.pn);s.setProperty('--ln',t.ln);s.setProperty('--bdbg',t.bdbg);s.setProperty('--tile',t.tile);s.setProperty('--bdimg',"url('styles/"+t.id+".jpg')")}
const mapSel=$('mapSel');mapSel.innerHTML=Object.keys(MAPS).map(k=>`<option value="${k}">${MAPS[k].ico} ${MAPS[k].n}</option>`).join('');mapSel.value=lsg('sk_m')||'brands';mapSel.onchange=()=>lss('sk_m',mapSel.value);
function selMap(){return MAPS[mapSel.value]?mapSel.value:'brands'}
applyTheme();
Object.assign(window,{tinfo,closeTi,imgFail,OK});
