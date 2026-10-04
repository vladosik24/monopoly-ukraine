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
['🧾 Податкова перевірка: −1000',-1000],['🍀 Знайшов чотирилисник: +300',300],['🏁 Іди на СТАРТ і отримай зарплату',0,'go'],['👮 Лови поліцію! Іди у в\'язницю',0,'jail'],
['⏪ Затор на Столичному: відступи на 3 клітинки',0,'back3'],['🎂 День народження! Кожен гравець дарує тобі 200 ₴',200,'eachget'],['🧱 Скинулись на ремонт у під\'їзді: сплати кожному по 150 ₴',150,'eachpay'],
['🏗 Ремонт у твоїх магазинах: 250 ₴ за кожну ★',250,'repair'],['🚂 Рейс! Їдь до «{n}»',0,'to:1'],['✈️ Лети до «{n}»',0,'to:11'],
['🛒 Акція! Біжи до «{n}»',0,'to:31'],['🏦 Візит до «{n}»',0,'to:16'],['🎰 Ризикни — іди в казино!',0,'to:20']
];
const PC=['#ff4d4d','#3ddc84','#ffd23f','#4aa8ff','#b46bff'];
const pos=i=>i<=10?[1,1+i]:i<=20?[i-9,11]:i<=30?[11,31-i]:[41-i,1];
const side=i=>i<10?'top':i<20?'rt':i<30?'bot':'lf';
const hm=()=>new Date().toTimeString().slice(0,5),fm=n=>n.toLocaleString('uk')+' ₴';
function full(i){return T.every((x,k)=>x[2]!==T[i][2]||typeof x[1]!='number'||own[k]==own[i])}
function rent(i){const b=Math.round(T[i][1]*.1),L=lvl[i],r=L?b*[0,4,8,14][L]:b*(full(i)?2:1),m=S&&S.evt&&S.evt.r===S.round?(S.evt.m||1):1;return Math.round(r*m)}
function tile(b,i){const[r,c]=pos(i),s=side(i%10==0?(i==0?0:i==10?9:i==20?21:31):i),t=b[1];
const tk=P.map(p=>p.alive&&dpos(p)==i?tokn(p):'').join('');
const corner=i%10==0,cls=(corner?'sp ':'')+s;
if(typeof t!='number')return '<div class="t '+cls+'" data-i="'+i+'" onclick="tinfo('+i+')" style="grid-area:'+r+'/'+c+'"><div class="in"><span class="em">'+b[2]+'</span>'+(corner?'':'<span class="nm">'+b[0]+'</span>')+'</div><div class="tk">'+tk+'</div></div>';
const bg=own[i]>=0?P[own[i]].c+'aa':'var(--tile,#fff)';
return '<div class="t '+cls+'" data-i="'+i+'" onclick="tinfo('+i+')" style="grid-area:'+r+'/'+c+';--b:'+bg+'"><div class="in">'+tcont(b)+(lvl[i]?'<div class="st">'+'★'.repeat(lvl[i])+'</div>':'')+'</div><div class="pr" style="--g:'+GC[b[2]]+'">'+t+'</div><div class="tk">'+tk+'</div></div>'}

let code='',R=null,S=null,LOGS=[],showAll=true,busy=false,started=false,P,own,lvl,prevPos={};
const $=id=>document.getElementById(id);
function toast(){} // повідомлення дублювали журнал подій — окремої смуги більше немає

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
    await set(ref(db,'rooms/'+code),{code,status:'waiting',ts:Date.now(),map:selMap(),cfg:selCfg(),players:{[myId]:{id:myId,name:nm(),ph:myPh,dk:SK.d,fr:SK.f,j:Date.now(),ts:Date.now(),online:true}}});
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
      await set(ref(db,`rooms/${c}/players/${myId}`),{id:myId,name:nm(),ph:myPh,dk:SK.d,fr:SK.f,j:Date.now(),ts:Date.now(),online:true});
    } else await update(ref(db,`rooms/${c}/players/${myId}`),{online:true,name:nm(),ph:myPh,dk:SK.d,fr:SK.f});
    code=c;enter();
  }catch(e){alert('Помилка входу.\n'+e.message);console.error(e)}
}
function enter(spec){
  if(!spec){dc=onDisconnect(ref(db,`rooms/${code}/players/${myId}`));dc.update({online:false})}
  $('lobbyContent').style.display='none';
  $('roomCodeDisplay').textContent=code;
  $('waitingRoom').style.display='block';
  listen();
}
function listen(){
  const myCode=code;lastLogKey=null;lastCur=null;lastBid=null;
  unsubs.push(onValue(ref(db,'rooms/'+code),s=>{
    if(myCode!==code)return;R=s.val();if(!R){alert('Кімнату закрито');toLobby();return}
    if(R.status=='waiting'){
      const a=Object.values(R.players||{}).sort((x,y)=>x.j-y.j);
      $('playersList').innerHTML=a.map(p=>'<div class="pi"><span class="av">'+avh({ph:p.ph,a:Array.from(p.name||'?')[0].toUpperCase()})+'</span> '+esc(p.name)+' '+(p.bot?'🤖':p.online?'🟢':'🔴')+'</div>').join('');
      $('startGameBtn').style.display=isH(a)?'block':'none';$('leaveBtn').textContent=(a[0]&&a[0].id==myId)?'🗑 Видалити кімнату':'Вийти';$('addBotBtn').style.display=isH(a)&&a.length<5?'block':'none';
      $('startGameBtn').disabled=a.length<2;
      $('startGameBtn').textContent='Почати гру ('+a.length+' гравців)';
    } else if(R.state){
      if(!busy||!S)S=R.state; // поки ходить цей клієнт — не підміняємо стан застарілим знімком
      if(!started){started=true;if(S.players.some(p=>p.id==myId))bumpGames();$('lobby').style.display='none';$('gameBoard').style.display='block'}
      render();
    }
  }));
  unsubs.push(onValue(query(ref(db,'rooms/'+code+'/log'),limitToLast(60)),s=>{
    if(myCode!==code)return;LOGS=[];const ks=[];s.forEach(c=>{LOGS.push(c.val());ks.push(c.key)});logSounds(ks);if(S)render();
  }));
}
function fresh(ps,map,cfg){cfg=cfg||{};const o={};['auc','team','hard','short','shuf','evt'].forEach(k=>{o[k]=cfg[k]?1:0});if(ps.length<4)o.team=0;
const st=o.short?6000:10000;let perm=null;if(o.shuf){perm=Array.from({length:28},(_,i)=>i);for(let i=27;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=perm[i];perm[i]=perm[j];perm[j]=t}}
const r={t0:Date.now(),round:1,map:map||'brands',cfg:o,players:ps.map((p,i)=>Object.assign({id:p.id,n:p.n,ph:p.ph||'',c:PC[i],a:p.bot?'🤖':(Array.from(p.n||'?')[0]||'?').toUpperCase(),bot:!!p.bot,dk:p.dk||'classic',fr:p.fr||'none',m:st,pos:0,jail:0,alive:true},o.team?{tm:i%2}:{})),own:Array(40).fill(-1),lvl:Array(40).fill(0),cur:0,ph:'roll',tend:Date.now()+30000};
if(perm)r.perm=perm;return r}
async function startGame(){
  const ps=Object.values((await get(ref(db,'rooms/'+code+'/players'))).val()||{}).sort((a,b)=>a.j-b.j);
  if(ps.length<2)return;const mp=(await get(ref(db,'rooms/'+code+'/map'))).val()||'brands',cf=(await get(ref(db,'rooms/'+code+'/cfg'))).val()||{};
  await update(ref(db,'rooms/'+code),{state:fresh(ps.map(p=>({id:p.id,n:p.name,ph:p.ph||'',bot:!!p.bot,dk:p.dk,fr:p.fr})),mp,cf),status:'playing'});
  ev(0,'Гра почалась! Капітал '+fm(cf.short?6000:10000)+modeText(cf));
}
async function newGame(){if(!S||S.players[0].id!=myId)return;S=fresh(S.players.map(p=>({id:p.id,n:p.n,ph:p.ph||'',bot:!!p.bot,dk:p.dk,fr:p.fr})),S.map,S.cfg);await save();ev(0,'Нова гра! Капітал '+fm(S.cfg&&S.cfg.short?6000:10000))}
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
    p.m=(Number(p.m)||0)+SAL();
    p.laps=(p.laps||0)+1;ev(k,'отримав зарплату +'+SAL()+' ₴');
    
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
    if(o!==k&&CF().team&&P[o]&&P[o].tm===p.tm){ev(k,'у союзника — оренди немає')}else if(o!==k){
      if(p.res){p.res=0;p.rs=(p.rs||0)+1;ev(k,'🛟 рятувальна карта скасувала оренду')}else{const r=rent(pos);ev(k,'платить оренду '+r+' ₴ → '+(P[o]?P[o].n:'?'));pay(k,r,o)}
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
  }else if(t==='l'){
    if(p.m<300){ev(k,'не вистачає на квиток лотереї')}
    else{p.m-=300;const r=Math.random();let w=0;if(r<.04)w=5000;else if(r<.15)w=1500;else if(r<.4)w=500;
      if(w){p.m+=w;if(w>=1500)p.lk=(p.lk||0)+1;ev(k,'🎟 виграв у лотерею +'+w+' ₴ (квиток −300 ₴)')}else ev(k,'🎟 лотерея: без виграшу (квиток −300 ₴)')}
  }else if(t==='t'){
    const cand=[];for(let i=0;i<40;i++)if(i!==pos&&i!==30&&i!==10)cand.push(i);const to=cand[Math.floor(Math.random()*cand.length)];
    ev(k,'🌀 телепорт на «'+T[to][0]+'»');if(to<pos)p.m+=SAL();p.pos=to;await save();setTimeout(()=>{land()},900);return;
  }else if(t==='r'){
    if(p.res){ev(k,'вже має рятувальну карту')}else{p.res=1;ev(k,'🛟 отримав рятувальну карту (скасує оренду або в\'язницю)')}
  }else if(t==='x'){
    const tx=TAX();ev(k,tx?'сплатив податок '+tx+' ₴':'податок скасовано подією');if(tx)pay(k,tx);
  }else if(t==='g'){
    if(p.res){p.res=0;p.rs=(p.rs||0)+1;ev(k,'🛟 рятувальна карта врятувала від в\'язниці')}else{p.pos=10;p.jail=1;ev(k,'іде у в\'язницю')}
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
async function skip(){if(!S||S.ph!='buy'||busy||!driver())return;busy=true;sync();const k=S.cur,p=P[k],pos=Number(p.pos)||0,b=T[pos];
if(CF().auc&&b&&typeof b[1]=='number'&&own[pos]===-1){S.ph='auc';S.auc={i:pos,end:Date.now()+15000,min:Math.max(50,Math.round(b[1]*.3))};S.tend=Date.now()+60000;
ev(k,'відмовився купувати — «'+b[0]+'» іде на аукціон');try{await set(ref(db,'rooms/'+code+'/bids'),null)}catch(e){}await save();busy=false;return}
S.ph='wait';await save();end()}
function assets(i){let s=P[i].m-(P[i].debt||0);T.forEach((b,k)=>{if(own[k]===i&&typeof b[1]=='number')s+=b[1]+(lvl[k]||0)*Math.round(b[1]/2)});return s}
async function end(){sync();const al=P.filter(p=>p.alive),tm=CF().team,sides=new Set(al.map(p=>tm?p.tm:p.id));
if(sides.size<2||!al.some(p=>!p.bot)){S.ph='over';S.dice=null;if(sides.size<2)S.win=P.indexOf(al[0]);ev(P.indexOf(al[0]),sides.size<2?(tm?'🏆 команда перемогла!':'🏆 переміг!'):'🏆 боти перемогли');await save();busy=false;return}
let n=S.cur;do{n=(n+1)%P.length}while(!P[n].alive);let wrap=false;if(n<=S.cur){S.round=(S.round||1)+1;wrap=true}
if(wrap&&CF().short&&S.round>ROUNDS){const a=P.map((p,i)=>({i,v:assets(i)})).filter(x=>P[x.i].alive).sort((x,y)=>y.v-x.v)[0];S.ph='over';S.dice=null;S.win=a.i;ev(a.i,'🏆 переміг за активами після '+ROUNDS+' раундів ('+fm(a.v)+')');await save();busy=false;return}
if(wrap&&CF().evt)roundEvent();
S.cur=n;S.ph='roll';S.dice=null;S.tend=Date.now()+30000;await save();busy=false}
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
function render(){if(!S)return;useMap(S.map||'brands',S.perm);sync();trNotify();checkWin();checkAch();sndRender();const k=S.cur,c=P[k],mine=c.id==myId,ph=S.ph,pb=T[c.pos];
const spec=!P.some(p=>p.id==myId);const isB=typeof pb[1]=='number'&&own[c.pos]==k;
const pn=P.map((p,i)=>'<div class="pl'+(i==k?' on':'')+(p.alive?'':' dead')+'" style="--c:'+p.c+'" onclick="prof('+i+')">'+(i==k&&p.alive&&ph!='over'?'<i class="tm" id="tm">30 c</i>':'')+'<div class="av'+frc(p)+'"'+fra(p)+'>'+avh(p)+'</div><div><b>'+esc(p.n)+(p.id==myId?' (ти)':'')+(CF().team&&p.tm!=null?' <span class="tmk t'+p.tm+'">'+(p.tm?'Б':'А')+'</span>':'')+'</b><span>'+(p.alive?fm(p.m):'БАНКРУТ')+'</span></div></div>').join('');
const ac=ph=='over'&&P[0].id==myId?'<div class="ac"><button onclick="newGame()">Нова гра</button></div>':'';
const buyFab=mine&&ph=='buy'?'<div class="buybar"><button class="y" onclick="buy()">'+(isB?'⭐ Покращити за '+Math.round(pb[1]/2):'🛒 Купити «'+pb[0]+'» за '+pb[1])+' ₴</button><button class="n" onclick="skip()">Пас</button></div>':'';
const sub=ph=='over'?'Гру завершено':mine&&ph=='buy'?(isB?'Покращити ділянку?':'Купити '+pb[0]+'?'):mine&&ph=='roll'?'Твій хід — кидай кубики.':'Очікуйте завершення ходу.';
const L=LOGS;
let h='<div id="top">'+pn+'<button class="mn" onclick="lvOpen()">⋮</button></div>'+tbar()+'<div id="bd">'+T.map(tile).join('');
h+='<div id="mid"><h3>Події гри <span class="hb"><span class="ib">👁 '+viewerCount()+'</span><button class="ib'+(SND_ON?'':' off')+'" onclick="tgSnd();render()">🔊</button><button class="ib'+(MUS_ON?'':' off')+'" onclick="tgMus();render()">🎵</button><button class="ib" onclick="stOpen()">📊</button><button class="ib" onclick="hpOpen()">❓</button></span></h3><div id="log">'+L.map(e=>{const q=P[e.p]||{c:'#888',n:''};return e.c?'<div class="ev c" style="--c:'+q.c+'"><b>'+esc(q.n)+'</b> '+esc(e.t)+'</div>':'<div class="ev" style="--c:'+q.c+'"><b>'+esc(q.n)+'</b> '+esc(e.t)+'</div>'}).join('')+'</div><div class="row"><input id="ci" '+(spec?'disabled placeholder="Ви спостерігаєте"':'placeholder="Написати повідомлення…"')+' onkeydown="if(event.key===\'Enter\'){event.preventDefault();say()}"><button type="button" onclick="say()">➤</button></div><div id="sc"><b>'+(ph=='over'?'Кінець гри':'Хід гравця '+esc(c.n))+'</b>'+evb()+ac+'</div></div>';
h+='</div><div id="acts">'+(mine&&ph=='roll'&&!spec?'<button class="fab" onclick="roll()">🎲 Кинути кубики</button>':'')+buyFab+aucBar()+'</div>'+modalHtml()+tradeUI()+tileModal()+statsModal()+helpModal()+leaveModal();
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
function tokn(p){const u=okp(p.ph);return `<s class="tkn${frc(p)}${hopId===p.id?' hop':''}" style="--c:${p.c};${frs(p)}${u?`;background:url('${u}') center/cover`:''}">${u?'':esc(p.a)}</s>`}
let ROOMS=[],modal=null,stats=false;
onValue(ref(db,'rooms'),s=>{
  cleanRooms(s);ROOMS=[];s.forEach(c=>{const r=c.val();if(!r||!r.players)return;const ps=Object.values(r.players).filter(p=>p&&p.name).sort((a,b)=>a.j-b.j);const mine=ps.some(p=>p.id==myId&&!p.left);if(!mine&&!ps.some(p=>p.online&&!p.bot))return;if(r.state&&r.state.ph=='over'&&!mine)return;ROOMS.push({code:c.key,st:r.status,ps,mine,map:r.map,cfg:r.cfg})});
  if(!code)renderLobby();
},e=>{
  $('roomList').innerHTML='<p class="mut">⚠️ Немає доступу до списку кімнат.<br>Firebase → Realtime Database → Rules:<br><code>{ "rules": { ".read": true, ".write": true } }</code><br>(або обмеж лише /rooms)</p>';
  console.error(e);
});
function renderLobby(){$('roomCount').textContent='Знайдено: '+ROOMS.length;
$('roomList').innerHTML=ROOMS.map(r=>{const h=r.ps[0],pl=r.st=='playing',q="'"+r.code+"'";
const isHost=r.ps[0]&&r.ps[0].id===myId,mgmt=r.mine?(isHost?`<button class="ico" title="Видалити кімнату" onclick="askDel(${q})">🗑</button>`:`<button class="ico" title="Покинути гру" onclick="askLeave(${q})">🚪</button>`):'';
const btn=r.mine?`<button class="y" onclick="joinRoom(${q})">Продовжити</button>`:pl?`<button class="n" onclick="watch(${q})">Дивитися</button>`:r.ps.length>=5?'<button class="n" disabled>Повна</button>':`<button onclick="joinRoom(${q})">Приєднатися</button>`;
return `<div class="rm"><div class="av">${avh({ph:h.ph,a:Array.from(h.name||'?')[0].toUpperCase()})}</div><div class="ri"><b>${esc(h.name)}</b><span class="bd ${pl?'pg':'wt'}">${pl?'Гра триває':'Очікування'}</span><small class="mut">${r.ps.length}/5 гравців · ${(MAPS[r.map]||MAPS.brands).ico} ${(MAPS[r.map]||MAPS.brands).n} ${cfgIcons(r.cfg)}</small></div>${btn}${mgmt}</div>`}).join('')||'<p class="mut">Кімнат поки немає — створи свою!</p>'}
function watch(c){code=c;enter(true);try{const vr=ref(db,`rooms/${c}/viewers/${myId}`);set(vr,{name:nm(),ts:Date.now()});onDisconnect(vr).remove()}catch(e){}}
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
async function credit(t){if(!S||busy||!driver()||!(S.ph=='roll'||S.ph=='buy'))return;if(CF().hard)return alert('У хардкорі кредит недоступний');sync();const k=S.cur,p=P[k];if(p.id!=myId)return;busy=true;
if(t){if((p.debt||0)>=4800){busy=false;return alert('Ліміт кредиту досягнуто')}p.m+=2000;p.debt=(p.debt||0)+2400;ev(k,'взяв кредит 2000 ₴ (повернути 2400 ₴)')}
else{const x=Math.min(p.m,p.debt||0);if(x<=0){busy=false;return}p.m-=x;p.debt-=x;ev(k,'повернув кредит '+x+' ₴')}
await save();busy=false}
async function surr(){if(!S||busy||!driver()||!(S.ph=='roll'||S.ph=='buy'))return;sync();const k=S.cur,p=P[k];if(p.id!=myId||!confirm('Здатися?'))return;busy=true;modal=null;
p.m=0;p.alive=false;S.own.forEach((o,j)=>{if(o==k){S.own[j]=-1;S.lvl[j]=0}});ev(k,'здався 🏳️');S.ph='wait';await save();end()}
Object.assign(window,{joinRoom,watch,prof,closeProf,tgs,credit,surr});

let lastRid=null,dzt=null,dzh=null;
const PIPS=[[],[5],[1,9],[1,5,9],[1,3,7,9],[1,3,5,7,9],[1,3,4,6,7,9]];
const pips=n=>{let s='';for(let i=1;i<=9;i++)s+='<i'+(PIPS[n].includes(i)?' class="p"':'')+'></i>';return s};
function playDice(d){const z=$('dz');applyDie(z);play('dice');clearInterval(dzt);clearTimeout(dzh);
z.innerHTML='<div class="dw"><div class="dd roll"><div class="die"></div></div><div class="dd d2 roll"><div class="die"></div></div></div><div class="sum"></div>';z.style.display='grid';
const set=(a,b)=>z.querySelectorAll('.die').forEach((e,i)=>e.innerHTML=pips(i?b:a));
const r=()=>1+Math.random()*6|0;set(r(),r());dzt=setInterval(()=>set(r(),r()),90);
dzh=setTimeout(()=>{clearInterval(dzt);set(d[0],d[1]);z.querySelectorAll('.dd').forEach(e=>{e.classList.remove('roll');e.classList.add('pop')});const s=z.querySelector('.sum');if(s){s.textContent='';s.classList.remove('on')}
play('dicestop');try{tg&&tg.HapticFeedback&&tg.HapticFeedback.impactOccurred('medium')}catch(e){}
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
vis[id]=(vis[id]+1)%40;hopId=id;play('step');drawTokens();setTimeout(tick,160)};
tick()}

// ===== ТОРГИ =====
let tr=null,trSeen=null;
const myIdx=()=>P.findIndex(p=>p.id==myId);
const trList=()=>Object.values((R&&R.trades)||{});
const trOut=()=>trList().find(t=>t.fromId==myId&&(t.status=='pending'||t.status=='accepted'));
const trIn=()=>trList().find(t=>t.toId==myId&&t.status=='pending');
const pname=id=>{const p=(S&&S.players||[]).find(x=>x.id==id);return p?p.n:'?'};
function openTrade(i){if(!S)return;if(trOut())return alert('Спочатку дочекайся відповіді на попередню пропозицію');tr={to:i,give:[],ask:[],gc:0,ac:0};modal=null;render()}
function closeTrade(){tr=null;render()}
function tgp(side,i){if(!tr)return;const a=side=='g'?tr.give:tr.ask,j=a.indexOf(i);j<0?a.push(i):a.splice(j,1);render()}
function adj(side,d){if(!tr)return;const me=P[myIdx()],o=P[tr.to];if(side=='g')tr.gc=Math.max(0,Math.min(me.m,tr.gc+d));else tr.ac=Math.max(0,Math.min(o.m,tr.ac+d));render()}
async function sendTrade(){if(!tr||!S)return;sync();if(myIdx()<0)return;if(!tr.give.length&&!tr.ask.length&&!tr.gc&&!tr.ac)return alert('Додай щось до обміну');
const id='t'+Date.now(),d=tr;for(const t of trList().filter(t=>t.fromId==myId&&t.status!='pending'&&t.status!='accepted'))await set(ref(db,`rooms/${code}/trades/${t.id}`),null);
await set(ref(db,`rooms/${code}/trades/${id}`),{id,fromId:myId,toId:P[d.to].id,give:d.give,ask:d.ask,gc:d.gc,ac:d.ac,status:'pending',ts:Date.now()});tr=null;ev(myIdx(),'пропонує обмін: '+pname(P[d.to].id));render()}
const setTr=(id,st)=>update(ref(db,`rooms/${code}/trades/${id}`),{status:st});
const answerTrade=(id,yes)=>{if(!yes)ev(myIdx(),'відхилив пропозицію обміну');return setTr(id,yes?'accepted':'declined')};
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
if(ok){give.forEach(i=>{own[i]=b});ask.forEach(i=>{own[i]=a});P[a].m+=ac-gc;P[b].m-=ac-gc;P[a].tr=(P[a].tr||0)+1;P[b].tr=(P[b].tr||0)+1;ev(a,'обмінявся з '+P[b].n+': віддав '+desc(give,gc)+', отримав '+desc(ask,ac));await save()}
if(!ok)ev(a>=0?a:0,'обмін не вдався: умови змінились');await setTr(t.id,ok?'done':'failed');busy=false}
setInterval(()=>{applyTrades().catch(e=>{busy=false;console.error(e)})},500);
Object.assign(window,{openTrade,closeTrade,tgp,adj,sendTrade,answerTrade,cancelTrade});

// ===== БОТИ =====
const BOTN=['Тарас','Оля','Іван','Марина','Богдан'];
async function addBot(){if(!R||!R.players)return;const ps=Object.values(R.players);if(ps.length>=5)return;const n=ps.filter(p=>p.bot).length,id='bot_'+Date.now()+n;
await set(ref(db,`rooms/${code}/players/${id}`),{id,name:'🤖 '+BOTN[n%5],ph:'',dk:rnd(DICE),fr:rnd(FRAMES),j:Date.now(),ts:Date.now(),online:true,bot:true})}
async function startSolo(){try{const n=Math.max(1,Math.min(4,+$('botN').value||3));code='GAME-'+Math.random().toString(36).slice(2,6).toUpperCase();
const players={[myId]:{id:myId,name:nm(),ph:myPh,dk:SK.d,fr:SK.f,j:Date.now(),ts:Date.now(),online:true}};for(let i=0;i<n;i++){const id='bot_'+i;players[id]={id,name:'🤖 '+BOTN[i],ph:'',dk:rnd(DICE),fr:rnd(FRAMES),j:Date.now()+1+i,online:true,bot:true}}
await set(ref(db,'rooms/'+code),{code,status:'waiting',ts:Date.now(),map:selMap(),cfg:selCfg(),players});enter();await startGame()}catch(e){alert('Не вдалося почати гру: '+e.message)}}
$('botBtn').onclick=startSolo;$('addBotBtn').onclick=addBot;
const isHost=()=>{if(!S||!R)return false;const h=S.players.find(p=>!p.bot&&p.alive&&on(p.id));return !!h&&h.id==myId};
function botTick(){if(!S||!R||busy||S.ph=='over'||S.ph=='wait')return;sync();if(S.ph=='auc'){if(isHost())botBids();return}const k=S.cur,p=P[k];
if(p&&p.bot&&p.alive&&driver()&&Date.now()>S.tend-30000+1300){
 if(S.ph=='roll')return void roll();
 if(S.ph=='buy'){const b=T[p.pos],up=own[p.pos]===k,cost=up?Math.round(b[1]/2):b[1],grp=T.every((x,i)=>x[2]!==b[2]||typeof x[1]!='number'||own[i]===k||i===p.pos);return void(p.m>=cost+(grp?600:1500)?buy():skip())}}
if(isHost()){const t=trList().find(x=>x.status=='pending'&&P.some(q=>q.id==x.toId&&q.bot&&q.alive));
 if(t){const val=(a,c)=>(a||[]).reduce((s,i)=>s+(T[i]?T[i][1]:0),0)+(+c||0);{const ok=val(t.give,t.gc)>=val(t.ask,t.ac)*1.15;if(!ok)ev(P.findIndex(q=>q.id==t.toId),'відхилив пропозицію обміну');setTr(t.id,ok?'accepted':'declined')}}}}
setInterval(()=>{try{botTick()}catch(e){console.error(e)}},500);

// ===== КАРТИ «ШАНС» =====
function drawCard(k){const p=P[k],c=CARDS[Math.random()*CARDS.length|0],sp=c[2]||'';let tx=c[0];if(sp.indexOf('to:')==0){const q=T[+sp.slice(3)];tx=tx.replace('{n}',q?q[0]:'')}ev(k,'🎴 '+tx);toast(tx);
if(sp=='go'){p.pos=0;p.m+=SAL();return false}
if(sp=='jail'){if(p.res){p.res=0;p.rs=(p.rs||0)+1;ev(k,'🛟 рятувальна карта врятувала від в\'язниці')}else{p.pos=10;p.jail=1}return false}
if(sp=='back3'){p.pos=(p.pos+37)%40;return true}
if(sp.indexOf('to:')==0){const i=+sp.slice(3);if(!(i>=0))return false;if(i<p.pos)p.m+=SAL();p.pos=i;return true}
if(sp=='eachget'){P.forEach((q,i)=>{if(i!=k&&q.alive){const a=Math.min(q.m,c[1]);q.m-=a;p.m+=a}});return false}
if(sp=='eachpay'){P.forEach((q,i)=>{if(i!=k&&q.alive){const a=Math.min(p.m,c[1]);p.m-=a;q.m+=a}});return false}
if(sp=='repair'){const n=lvl.reduce((s,l,i)=>s+(own[i]===k?l:0),0);if(n)pay(k,n*c[1]);else ev(k,'зірок немає — платити нічого');return false}
if(c[1]>0)p.m+=c[1];else pay(k,-c[1]);return false}

// ===== СКІНИ =====
const DICE=[{id:'classic',n:'Класика',bg:'#fff',pip:'#111'},{id:'gold',n:'Золото',bg:'linear-gradient(135deg,#ffe27a,#e0a800)',pip:'#3a2600'},{id:'neon',n:'Неон',bg:'#0b1230',pip:'#38f2ff',glow:'0 0 8px #38f2ff'},
{id:'carbon',n:'Карбон',bg:'#15171c',pip:'#ffd23f',glow:'0 0 6px #ffd23f'},{id:'emerald',n:'Смарагд',bg:'linear-gradient(135deg,#46f08c,#0e7a45)',pip:'#022'},{id:'ruby',n:'Рубін',bg:'linear-gradient(135deg,#ff7a7a,#a00020)',pip:'#fff'},{id:'ua',n:'Жовто-блакитні',bg:'#ffd23f',pip:'#1f4fb8'}];
const FRAMES=[{id:'none',n:'Без рамки'},{id:'gold',n:'Золото',b:'👑'},{id:'neon',n:'Неон',b:'⚡'},{id:'fire',n:'Вогонь',b:'🔥'},{id:'ua',n:'Тризуб',b:'🔱'},{id:'royal',n:'Діамант',b:'💎'},{id:'red',n:'Червона',c:'#ff4d4d'},{id:'orange',n:'Помаранчева',c:'#ff9f1c'},{id:'yellow',n:'Жовта',c:'#ffd23f'},{id:'green',n:'Зелена',c:'#3ddc84'},{id:'mint',n:'М\'ятна',c:'#2ee6c4'},{id:'sky',n:'Блакитна',c:'#4aa8ff'},{id:'blue',n:'Синя',c:'#2f6fe0'},{id:'purple',n:'Фіолетова',c:'#b46bff'},{id:'pink',n:'Рожева',c:'#ff6bb5'},{id:'white',n:'Біла',c:'#ffffff'}];
(function(){let s='';FRAMES.forEach(f=>{if(f.c)s+='.fr-'+f.id+'{box-shadow:0 0 0 2px '+f.c+',0 0 12px '+f.c+'}'});if(document.head){const e=document.createElement('style');e.textContent=s;document.head.appendChild(e)}})();
const isHex=s=>/^#[0-9a-fA-F]{6}$/.test(s||'');
const rnd=a=>a[Math.random()*a.length|0].id;
const lsg=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lss=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const SK={d:lsg('sk_d')||'classic',f:lsg('sk_f')||'none',t:lsg('sk_t')||'neon'};
const dsk=id=>DICE.find(x=>x.id==id)||DICE[0],frm=id=>isHex(id)?{id:id,n:'Свій колір',c:id,custom:1}:(FRAMES.find(x=>x.id==id)||FRAMES[0]);
const frc=p=>p&&p.fr&&p.fr!='none'&&/^[a-z0-9_-]+$/i.test(p.fr)?' fr-'+p.fr:'';
const frs=p=>p&&isHex(p.fr)?'box-shadow:0 0 0 2px '+p.fr+',0 0 12px '+p.fr+';':'';
function fra(p,ex){const f=p&&frm(p.fr),on=f&&f.id!='none',st=(ex?ex+';':'')+frs(p)+(on&&!f.custom?"--fi:url('skins/frame-"+f.id+".png')":'');return (on&&f.b&&!f.custom?' data-b="'+f.b+'"':'')+(st?' style="'+st+'"':'')}
function applyDie(z){const s=dsk(S&&S.dsk);z.style.setProperty('--dbg',s.bg);z.style.setProperty('--dpip',s.pip);z.style.setProperty('--dglow',s.glow||'inset 0 -2px 3px rgba(255,255,255,.35)');z.style.setProperty('--dimg',"url('skins/dice-"+s.id+".png')")}
function skinUI(){const z=$('skm');
const dices=DICE.map(s=>`<div class="sk${SK.d==s.id?' on':''}" onclick="pickSk('d','${s.id}')"><div class="die mini" style="--dbg:${s.bg};--dpip:${s.pip};--dglow:${s.glow||'none'};--dimg:url('skins/dice-${s.id}.png')">${pips(5)}</div><small>${s.n}</small></div>`).join('');
const frames=FRAMES.map(f=>`<div class="sk${SK.f==f.id?' on':''}" onclick="pickSk('f','${f.id}')"><div class="av big${f.id=='none'?'':' fr-'+f.id}"${f.b?` data-b="${f.b}"`:''} style="--c:#4aa8ff;--fi:url('skins/frame-${f.id}.png')">${avh({ph:myPh,a:(Array.from(nm())[0]||'?').toUpperCase()})}</div><small>${f.n}</small></div>`).join('');
const themes=THEMES.map(t=>`<div class="sk${SK.t==t.id?' on':''}" onclick="pickSk('t','${t.id}')"><div class="thm" style="background:${t.bdbg}"><span style="background:${t.tile}"></span><span style="background:${t.tile}"></span><span style="background:${t.tile}"></span></div><small>${t.n}</small></div>`).join('');
z.innerHTML=`<div class="md" onclick="event.stopPropagation()"><div class="mh"><h2>🎨 Скіни</h2><button class="x" onclick="closeSk()">✕</button></div><b>Звук</b><div class="chips2" style="margin:8px 0 14px"><button class="cc${SND_ON?' on':''}" onclick="tgSnd();skinUI()">🔊 Звуки</button><button class="cc${MUS_ON?' on':''}" onclick="tgMus();skinUI()">🎵 Музика</button></div><b>Кубики</b><div class="skg">${dices}</div><b>Рамки аватарки</b><div class="skg">${frames}</div><b>Свій колір рамки</b><div class="cust"><input type="color" id="fcol" value="${isHex(SK.f)?SK.f:'#ff4d4d'}" onchange="pickSk('f',this.value)"><small>обери будь-який колір</small></div><b>Стиль поля</b><div class="skg">${themes}</div></div>`;z.style.display='grid'}
function closeSk(){$('skm').style.display='none'}
function hdrFrame(){const a=$('meAv'),f=frm(SK.f);a.className='av big'+(f.id=='none'||f.custom?'':' fr-'+f.id);a.style.boxShadow=f.custom?'0 0 0 2px '+f.c+',0 0 12px '+f.c:'';if(f.id!='none'&&f.b)a.dataset.b=f.b;else delete a.dataset.b}
function pickSk(kind,id){SK[kind]=id;lss('sk_'+kind,id);if(kind=='t')applyTheme();hdrFrame();skinUI()}
$('skinBtn').onclick=skinUI;hdrFrame();
Object.assign(window,{pickSk,closeSk});
const MAPS={
brands:{n:'Бренди України',ico:'🏷',list:null},
cities:{n:'Міста України',ico:'🏙',list:[["Харків", "kharkiv", "🏗", "#c0392b"],["Київ", "kyiv", "🏛", "#2980b9"],["Полтава", "poltava", "🏙", "#27ae60"],["Львів", "lviv", "☕", "#8e44ad"],["Одеса", "odesa", "⚓", "#d35400"],["Дніпро", "dnipro", "🌉", "#16a085"],["Ужгород", "uzhhorod", "🏙", "#2c3e50"],["Мукачево", "mukachevo", "🏙", "#e67e22"],["Чернівці", "chernivtsi", "🏙", "#c0392b"],["Вінниця", "vinnytsia", "🏙", "#2980b9"],["Житомир", "zhytomyr", "🏙", "#27ae60"],["Суми", "sumy", "🏙", "#8e44ad"],["Яремче", "iaremche", "⛰", "#d35400"],["Буковель", "bukovel", "🎿", "#16a085"],["Херсон", "kherson", "🏙", "#2c3e50"],["Миколаїв", "mykolaiv", "🏙", "#e67e22"],["Черкаси", "cherkasy", "🏙", "#c0392b"],["Кропивницький", "kropyvnytskyi", "🏙", "#2980b9"],["Луцьк", "lutsk", "🏙", "#27ae60"],["Тернопіль", "ternopil", "🏙", "#8e44ad"],["Рівне", "rivne", "🏙", "#d35400"],["Кам'янець-Подільський", "kamianets-podilskyi", "🏙", "#16a085"],["Запоріжжя", "zaporizhzhia", "🏙", "#2c3e50"],["Маріуполь", "mariupol", "🏙", "#e67e22"],["Хмельницький", "khmelnytskyi", "🏙", "#c0392b"],["Чернігів", "chernihiv", "🏙", "#2980b9"],["Умань", "uman", "🏙", "#27ae60"],["Біла Церква", "bila-tserkva", "🏙", "#8e44ad"]]},
food:{n:'Смаки України',ico:'🍲',list:[["Борщ", "borshch", "🍲", "#c0392b"],["Вареники", "varenyky", "🥟", "#2980b9"],["Сало", "salo", "🥓", "#27ae60"],["Котлета по-київськи", "kotleta-po-kyivsky", "🍲", "#8e44ad"],["Київський торт", "kyivskyi-tort", "🍰", "#d35400"],["Львівський сирник", "lvivskyi-syrnyk", "🍲", "#16a085"],["Голубці", "holubtsi", "🍲", "#2c3e50"],["Налисники", "nalysnyky", "🍲", "#e67e22"],["Пампушки", "pampushky", "🍲", "#c0392b"],["Холодець", "kholodets", "🍲", "#2980b9"],["Кутя", "kutia", "🍲", "#27ae60"],["Галушки", "halushky", "🍲", "#8e44ad"],["Узвар", "uzvar", "🍐", "#d35400"],["Квас", "kvas", "🥤", "#16a085"],["Сирники", "syrnyky", "🍲", "#2c3e50"],["Кисіль", "kysil", "🍲", "#e67e22"],["Паска", "paska", "🍞", "#c0392b"],["Книш", "knysh", "🍲", "#2980b9"],["Банош", "banosh", "🍲", "#27ae60"],["Куліш", "kulish", "🍲", "#8e44ad"],["Лемішка", "lemishka", "🍲", "#d35400"],["Крученики", "kruchenyky", "🍲", "#16a085"],["Деруни", "deruny", "🍲", "#2c3e50"],["Вертута", "vertuta", "🍲", "#e67e22"],["Мамалига", "mamalyha", "🍲", "#c0392b"],["Капусняк", "kapusniak", "🍲", "#2980b9"],["Горілка з перцем", "horilka-z-pertsem", "🍲", "#27ae60"],["Мед з горіхами", "med-z-horikhamy", "🍯", "#8e44ad"]]},
places:{n:'Мандрівка Україною',ico:'🏰',list:[["Хортиця", "khortytsia", "🏞", "#c0392b"],["Софія Київська", "sofiia-kyivska", "🏰", "#2980b9"],["Софіївка", "sofiivka", "🏰", "#27ae60"],["Києво-Печерська лавра", "kyievo-pecherska-lavra", "🏰", "#8e44ad"],["Хотинська фортеця", "khotynska-fortetsia", "🏰", "#d35400"],["Говерла", "hoverla", "⛰", "#16a085"],["Олеський замок", "oleskyi-zamok", "🏰", "#2c3e50"],["Замок Паланок", "zamok-palanok", "🏰", "#e67e22"],["Синевир", "synevyr", "🏰", "#c0392b"],["Шацькі озера", "shatski-ozera", "🌊", "#2980b9"],["Асканія-Нова", "askaniia-nova", "🏰", "#27ae60"],["Дніпрогес", "dniprohes", "⚡", "#8e44ad"],["Мармурова печера", "marmurova-pechera", "🏰", "#d35400"],["Тунель кохання", "tunel-kokhannia", "🏰", "#16a085"],["Кам'янець-Подільський замок", "kamianets-podilskyi-zamok", "🏰", "#2c3e50"],["Одеська опера", "odeska-opera", "🎭", "#e67e22"],["Львівська опера", "lvivska-opera", "🎭", "#c0392b"],["Золоті ворота", "zoloti-vorota", "🏰", "#2980b9"],["Андріївський узвіз", "andriivskyi-uzviz", "🏰", "#27ae60"],["Майдан Незалежності", "maidan-nezalezhnosti", "🏰", "#8e44ad"],["Пирогів", "pyrohiv", "🏰", "#d35400"],["Підгорецький замок", "pidhoretskyi-zamok", "🏰", "#16a085"],["Тростянець", "trostianets", "🏰", "#2c3e50"],["Бакота", "bakota", "🏰", "#e67e22"],["Ворохта", "vorokhta", "🏰", "#c0392b"],["Острозький замок", "ostrozkyi-zamok", "🏰", "#2980b9"],["Спаський собор", "spaskyi-sobor", "🏰", "#27ae60"],["Софійський собор", "sofiiskyi-sobor", "🏰", "#8e44ad"]]}};

// ===== КАРТИ ПОЛЯ, СТИЛІ, ІНФО ПРО КЛІТИНКУ =====
const BASE=T.map(x=>x.slice()),OK={};BASE[7]=['Лотерея','l','🎟'];BASE[22]=['Телепорт','t','🌀'];BASE[33]=['Рятувальна карта','r','🛟'];let curMap=null,ti=null;
function useMap(id,perm){if(!MAPS[id])id='brands';const key=id+'|'+(perm?perm.join(','):'');if(curMap===key)return;curMap=key;const list=MAPS[id].list,slots=[];
BASE.forEach((b,i)=>{if(typeof b[1]=='number')slots.push(i)});
const items=slots.map((i,k)=>{const b=BASE[i];if(!list){const f=LG[b[0]];return{n:b[0],ic:b[3],c:b[4],p:f?'logos/'+f+'.png':''}}const m=list[k];return{n:m[0],ic:m[2],c:m[3],p:'maps/'+id+'/'+m[1]+'.png'}});
BASE.forEach((b,i)=>{const k=slots.indexOf(i);if(k<0){T[i]=b.slice();return}const it=items[perm&&perm.length==items.length?perm[k]:k];T[i]=[it.n,b[1],b[2],it.ic,it.c,it.p]})}
function tcont(b){const p=b[5],fb='<span class="em" style="color:'+b[4]+'">'+b[3]+'</span><span class="nm" style="color:'+b[4]+'">'+esc(b[0])+'</span>';
if(p&&OK[p]!==0)return '<img class="lg" src="'+p+'" alt="'+esc(b[0])+'" data-p="'+p+'" data-e="'+esc(b[3])+'" data-c="'+b[4]+'" onerror="imgFail(this)">';return fb}
function imgFail(el){OK[el.dataset.p]=0;el.outerHTML='<span class="em" style="color:'+el.dataset.c+'">'+el.dataset.e+'</span><span class="nm" style="color:'+el.dataset.c+'">'+el.alt+'</span>'}
const SPEC={s:'🏁 СТАРТ — проходячи його, отримуєш {SAL}.',c:'❓ Шанс — витягни картку: бонус, штраф, переміщення або гроші від гравців.',x:'💰 Податок — сплати {TAX}.',l:'🎟 Лотерея — квиток 300 ₴, виграш до 5000 ₴.',t:'🌀 Телепорт — перенесе на випадкову клітинку.',r:'🛟 Рятувальна карта — отримай карту, що скасує одну оренду або в\'язницю.',j:'⛓ В\'язниця — тут лише відвідини. Сюди потрапляють за карткою або з клітинки «Іди в в\'язницю».',k:'🎰 Казино — 40% шанс виграти 1000 ₴, інакше втрачаєш 600 ₴.',g:'👮 Іди в в\'язницю — пропустиш наступний хід.'};
function tinfo(i){ti=i;render()}
function closeTi(){ti=null;render()}
function ticon(b){const p=b[5];return p&&OK[p]!==0?'<img src="'+p+'" alt="" data-p="'+p+'" data-e="'+esc(b[3])+'" onerror="OK[this.dataset.p]=0;this.outerHTML=\'<b>\'+this.dataset.e+\'</b>\'">':'<b>'+esc(b[3])+'</b>'}
function tileModal(){if(ti==null||!S||!T[ti])return '';sync();const b=T[ti],o=own[ti],pr=typeof b[1]=='number';
let h=`<div class="ov" onclick="closeTi()"><div class="md" onclick="event.stopPropagation()"><div class="mh"><div class="ticon">${pr?ticon(b):'<b>'+esc(b[2])+'</b>'}</div><div><small class="gd">${pr?'ДІЛЯНКА':'ПОЛЕ'} №${ti}</small><h2>${esc(b[0])}</h2></div><button class="x" onclick="closeTi()">✕</button></div>`;
if(pr){const base=Math.round(b[1]*.1),ow=o>=0?P[o]:null,grp=T.map((x,i)=>x[2]===b[2]&&typeof x[1]=='number'?i:-1).filter(i=>i>=0);
h+=`<div class="stt"><span class="dotg" style="background:${GC[b[2]]}"></span> Група: ${grp.map(i=>esc(T[i][0])+(own[i]>=0?` <i style="color:${P[own[i]].c}">●</i>`:'')).join(' · ')}</div>`;
h+=`<table class="rtb"><tr><td>Ціна</td><td>${fm(b[1])}</td></tr><tr><td>Оренда</td><td>${fm(base)}</td></tr><tr><td>Уся група в одного власника</td><td>${fm(base*2)}</td></tr><tr><td>★ рівень 1</td><td>${fm(base*4)}</td></tr><tr><td>★★ рівень 2</td><td>${fm(base*8)}</td></tr><tr><td>★★★ рівень 3</td><td>${fm(base*14)}</td></tr><tr><td>Покращення (за ★)</td><td>${fm(Math.round(b[1]/2))}</td></tr></table>`;
h+=`<div class="stt">${ow?`Власник: <b style="color:${ow.c}">${esc(ow.n)}</b> · ★ ${lvl[ti]||0} · оренда зараз: <b>${fm(rent(ti))}</b>`:'Вільна ділянка — її можна купити'}</div>`}
else h+=`<div class="stt">${(SPEC[b[1]]||'').replace('{SAL}',fm(SAL())).replace('{TAX}',fm(TAXB()))}</div>`;
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

// ===== ЛОБІ: рівень, перемоги, топ гравців, швидка гра =====
const gi=k=>+(lsg(k)||0);
function statsUI(){const gm=gi('st_g'),w=gi('st_w'),xp=gm*100+w*300+gi('st_b'),lv=Math.floor(xp/1000)+1,cur=xp%1000;
$('lvTxt').textContent='Рівень '+lv;$('xpBar').style.width=cur/10+'%';$('xpTxt').textContent=cur+' / 1000';$('winChip').textContent='🏆 '+w}
function bumpGames(){lss('st_g',gi('st_g')+1);statsUI()}
const won={};
function checkWin(){if(!S||S.ph!='over'||won[code]||S.win==null||S.win<0)return;const mi=P.findIndex(p=>p.id==myId);if(mi<0)return;const me=P[mi],w=P[S.win];const ok=CF().team?me.tm===w.tm:mi===S.win;if(ok){won[code]=1;lss('st_w',gi('st_w')+1);statsUI();recWin(me)}}
async function recWin(p){try{const r=ref(db,'leaderboard/'+myId),o=(await get(r)).val()||{};await set(r,{name:p.n,ph:p.ph||'',wins:(o.wins||0)+1})}catch(e){}}
onValue(ref(db,'leaderboard'),s=>{const a=Object.values(s.val()||{}).filter(x=>x&&x.wins).sort((x,y)=>y.wins-x.wins).slice(0,5);
$('topList').innerHTML=a.map((x,i)=>`<div class="tr"><span>${i==0?'👑':i+1}</span><b>${esc(x.name)}</b><em>${x.wins} 🏆</em></div>`).join('')||'<small class="mut">Поки порожньо — стань першим!</small>'},
()=>{$('topList').innerHTML='<small class="mut">Топ недоступний: у правилах Firebase дозволь читання leaderboard</small>'});
async function quickPlay(){const r=ROOMS.find(x=>x.st=='waiting'&&!x.mine&&x.ps.length<5);if(r)return joinRoom(r.code);return createRoom()}
$('quickBtn').onclick=quickPlay;
$('joinToggle').onclick=()=>{const j=$('joinRow');j.style.display=j.style.display=='none'?'flex':'none'};
statsUI();

// якщо є справжня картинка лобі — прибираємо намальований силует
{const _i=new Image();_i.onload=()=>{const s=document.querySelector('.scene');if(s)s.style.display='none'};_i.src='styles/lobby.jpg'}

// ===== СТАТИСТИКА ТА ПРАВИЛА =====
let stm=false,hpm=false;
function stOpen(){stm=true;render()}function stClose(){stm=false;render()}
function hpOpen(){hpm=true;render()}function hpClose(){hpm=false;render()}
function statsModal(){if(!stm||!S)return '';sync();
const sec=Math.max(0,Math.floor((Date.now()-(S.t0||Date.now()))/1000)),mm=String(Math.floor(sec/60)).padStart(2,'0'),ss=String(sec%60).padStart(2,'0');
const rows=P.map((p,i)=>{let mine=0,cnt=0;T.forEach((b,k)=>{if(own[k]===i&&typeof b[1]=='number'){cnt++;mine+=b[1]+(lvl[k]||0)*Math.round(b[1]/2)}});return{p,cnt,assets:p.m+mine-(p.debt||0)}}).sort((a,b)=>b.assets-a.assets);
return `<div class="ov" onclick="stClose()"><div class="md" onclick="event.stopPropagation()"><div class="mh"><h2>Статистика гри</h2><button class="x" onclick="stClose()">✕</button></div>
<div class="stg"><div><b>${mm}:${ss}</b><small>Час гри</small></div><div><b>${S.round||1}${CF().short?' / '+ROUNDS:''}</b><small>Раунд</small></div><div><b class="gn">${fm(SAL())}</b><small>Дохід за коло</small></div></div>
<table class="stt2"><tr><th></th><th>Гравець</th><th>Активи</th><th>Гроші</th><th>Майно</th><th>Кола</th></tr>${rows.map((r,k)=>`<tr class="${r.p.alive?'':'dd'}"><td>${k+1}</td><td><div class="pn"><span class="av" style="--c:${r.p.c}">${avh(r.p)}</span><b>${esc(r.p.n)}</b></div></td><td>${fm(r.assets)}</td><td>${fm(r.p.m)}</td><td>${r.cnt}</td><td>${r.p.laps||0}</td></tr>`).join('')}</table>
<small class="mut">Активи: гроші + вартість ділянок і ★ − кредит.</small></div></div>`}
function helpModal(){if(!hpm)return '';
return `<div class="ov" onclick="hpClose()"><div class="md" onclick="event.stopPropagation()"><div class="mh"><h2>Як грати</h2><button class="x" onclick="hpClose()">✕</button></div>
<div class="stt">🎲 Кидай кубики й ходь по полю.<br>🏷 Вільну ділянку можна купити, на чужій платиш оренду.<br>🎨 Збери всі ділянки одного кольору — оренда ×2, далі їх можна покращувати зірками ★.<br>🏁 Пройшов СТАРТ — отримай зарплату.<br>❓ Шанс — випадкові бонуси, штрафи й переміщення.<br>🎟 Лотерея, 🌀 Телепорт, 🛟 Рятувальна карта — особливі клітинки (тап по клітинці — опис).<br>🔨 Аукціон: відмовився купувати — ділянку продають усім, ставки до кінця таймера.<br>👥 Команди: союзники не платять оренду одне одному.<br>🎖 Досягнення дають XP (кнопка в лобі).<br>🤝 Тап по гравцю — обмін ділянками, кредит або здача.<br>👆 Тап по клітинці — повна інформація про неї.</div></div></div>`}
Object.assign(window,{stOpen,stClose,hpOpen,hpClose});
if(/debug/.test(location.search)){const v=document.querySelector('.ver');if(v)v.style.display='block'}

// ===== ГЛЯДАЧІ: 👁 показує скільки людей дивиться гру =====
function viewerCount(){const v=(R&&R.viewers)||{},ids=new Set((S&&S.players||[]).map(p=>p.id));return Object.keys(v).filter(k=>!ids.has(k)).length}

// ===== АВТО-ПРИБИРАННЯ КІМНАТ =====
let dc=null,lastClean=0,unsubs=[];
const isH=a=>{const h=a.find(p=>!p.bot&&p.online);return !!h&&h.id==myId};
// кімнати без живих людей видаляються: очікування — через 2 хв, ігри — через 60 хв (старі без позначки часу — одразу)
function cleanRooms(s){const now=Date.now();if(now-lastClean<20000)return;lastClean=now;
s.forEach(c=>{const r=c.val();if(!r)return;const hs=Object.values(r.players||{}).filter(p=>p&&!p.bot);if(hs.some(p=>p.online))return;
const seen=Math.max(r.ts||0,...hs.map(p=>p.ts||0)),limit=r.status=='waiting'?120000:3600000;
if(!seen||now-seen>limit)set(ref(db,'rooms/'+c.key),null).catch(()=>{})})}
// «серцебиття»: поки гравець у кімнаті — оновлюємо ts та online
setInterval(()=>{if(code&&R&&R.players&&R.players[myId])update(ref(db,`rooms/${code}/players/${myId}`),{ts:Date.now(),online:true}).catch(()=>{})},30000);
function toLobby(){
  try{unsubs.splice(0).forEach(f=>{try{f&&f()}catch(e){}})}catch(e){}
  code='';R=null;S=null;LOGS=[];lastLogKey=null;lastCur=null;lastBid=null;started=false;busy=false;tr=null;modal=null;ti=null;stm=false;hpm=false;lvm=false;trSeen=null;
  $('gameBoard').style.display='none';$('waitingRoom').style.display='none';$('lobby').style.display='block';$('lobbyContent').style.display='block';
  const dz=$('dz');if(dz)dz.style.display='none';renderLobby();statsUI();
}
async function leaveRoom(){const c=code,r=R;try{dc&&dc.cancel()}catch(e){}toLobby();
  try{if(r&&r.status=='waiting'){const ps=Object.values(r.players||{}).filter(p=>p&&p.name&&!p.bot).sort((a,b)=>a.j-b.j);
    if(ps[0]&&ps[0].id==myId)await set(ref(db,'rooms/'+c),null);else await set(ref(db,`rooms/${c}/players/${myId}`),null)}}catch(e){}}
async function leaveGame(){const c=code,isP=!!(R&&R.players&&R.players[myId]);try{dc&&dc.cancel()}catch(e){}toLobby();
  try{if(c){if(isP)await update(ref(db,`rooms/${c}/players/${myId}`),{online:false});else await set(ref(db,`rooms/${c}/viewers/${myId}`),null)}}catch(e){}}
let lvm=false;
function lvOpen(){lvm=true;render()}function lvClose(){lvm=false;render()}
function leaveModal(){if(!lvm)return '';const host=R&&R.players&&Object.values(R.players).filter(p=>p&&p.name&&!p.bot).sort((a,b)=>a.j-b.j)[0],isH0=host&&host.id==myId;
return `<div class="ov" onclick="lvClose()"><div class="md" onclick="event.stopPropagation()"><div class="mh"><h2>Вийти з гри?</h2><button class="x" onclick="lvClose()">✕</button></div><div class="stt">«Вийти в лобі» — можна повернутися кнопкою «Продовжити».<br>«Покинути назавжди» — ти вибуваєш, ділянки повертаються банку.</div><div class="cb cbc"><button class="y" style="background:#2f6fe0;color:#fff" onclick="leaveGame()">↩ Вийти в лобі</button><button class="y" style="background:#e5484d;color:#fff" onclick="leaveForeverGame()">🚪 Покинути назавжди</button>${isH0?'<button class="y" style="background:#7a2040;color:#fff" onclick="closeRoomGame()">🗑 Закрити кімнату для всіх</button>':''}<button class="n" onclick="lvClose()">Лишитись</button></div></div></div>`}
window.leaveRoom=leaveRoom;Object.assign(window,{leaveGame,lvOpen,lvClose});

// ===== РЕЖИМИ, АУКЦІОН, ПОДІЇ, ДОСЯГНЕННЯ =====
const CF=()=>(S&&S.cfg)||{};
const ROUNDS=12,SAL=()=>CF().hard?1000:1200,TAXB=()=>CF().hard?1600:800,TAX=()=>(S&&S.evt&&S.evt.r===S.round&&S.evt.k=='tax')?0:TAXB();
const CFGDEF=[['auc','🔨 Аукціон'],['team','👥 Команди 2×2'],['hard','🔥 Хардкор'],['short','⚡ Коротка гра'],['shuf','🎲 Випадкова карта'],['evt','🎉 Події раунду']];
let CFG={};try{CFG=JSON.parse(lsg('sk_cfg')||'{}')||{}}catch(e){CFG={}}
function cfgUI(){$('cfgRow').innerHTML=CFGDEF.map(([k,n])=>`<button class="cc${CFG[k]?' on':''}" onclick="tgCfg('${k}')">${n}</button>`).join('')}
function tgCfg(k){CFG[k]=CFG[k]?0:1;lss('sk_cfg',JSON.stringify(CFG));cfgUI()}
const selCfg=()=>{const o={};CFGDEF.forEach(([k])=>{o[k]=CFG[k]?1:0});return o};
const cfgIcons=c=>c?CFGDEF.filter(([k])=>c[k]).map(([k,n])=>n.split(' ')[0]).join(''):'';
const modeText=c=>{const t=CFGDEF.filter(([k])=>c&&c[k]).map(([k,n])=>n).join(', ');return t?' · '+t:''};
const EVTS=[{k:'party',t:'🎉 Свято в країні! Кожен гравець отримує 300 ₴'},{k:'flood',t:'🌊 Повінь! Кожен платить 100 ₴ за ділянку (до 500 ₴)'},{k:'sale',t:'🏷 Розпродаж! Оренда цього раунду −50%',m:.5},{k:'boom',t:'📈 Економічний бум! Оренда цього раунду +50%',m:1.5},{k:'tax',t:'🧾 Податкова знижка! У цьому раунді без податків'},{k:'grant',t:'🎁 Грант! Випадковий гравець отримує 1000 ₴'}];
function roundEvent(){if(Math.random()>.5){S.evt=null;return}const e=EVTS[Math.floor(Math.random()*EVTS.length)];S.evt={r:S.round,k:e.k,m:e.m||1};ev(-1,e.t);
if(e.k=='party')P.forEach(p=>{if(p.alive)p.m+=300});
if(e.k=='flood')P.forEach((p,i)=>{if(p.alive){const n=own.filter(o=>o===i).length,a=Math.min(500,n*100);if(a)pay(i,a)}});
if(e.k=='grant'){const al=[];P.forEach((p,i)=>{if(p.alive)al.push(i)});const w=al[Math.floor(Math.random()*al.length)];P[w].m+=1000;ev(w,'отримав грант +1000 ₴')}}
function evb(){let s='';if(CF().short)s+='<span class="evb">⚡ Раунд '+Math.min(S.round||1,ROUNDS)+'/'+ROUNDS+'</span>';
if(S.evt&&S.evt.r===S.round){const e=EVTS.find(x=>x.k===S.evt.k);if(e)s+='<span class="evb">'+e.t.split('!')[0]+'</span>'}return s?'<div class="evr">'+s+'</div>':''}
// --- аукціон ---
function aucInfo(){const a=S&&S.auc;if(!a)return null;const bs=Object.keys((R&&R.bids)||{}).map(id=>({id,amt:+R.bids[id].amt||0,ts:+R.bids[id].ts||0})).filter(b=>b.amt>0).sort((x,y)=>y.amt-x.amt||x.ts-y.ts);
return{a,top:bs[0],last:bs.reduce((m,b)=>Math.max(m,b.ts),0),b:T[a.i]}}
function aucLeft(){const f=aucInfo();if(!f)return 0;return Math.max(0,Math.ceil((Math.max(f.a.end,f.last+4000)-Date.now())/1000))}
function aucBar(){if(S.ph!='auc'||!S.auc)return '';const f=aucInfo(),me=P.find(p=>p.id==myId),can=me&&me.alive,hn=f.top?(P.find(p=>p.id==f.top.id)||{}).n:'';
return `<div class="aucbar"><div class="al"><b>🔨 Аукціон: ${esc(f.b[0])}</b><small>${f.top?'Ставка '+fm(f.top.amt)+' — '+esc(hn):'Старт від '+fm(f.a.min)}</small></div><span id="aucT">${aucLeft()}с</span>${can?'<div class="aucbtn"><button onclick="bid(100)">+100</button><button onclick="bid(500)">+500</button><button onclick="bid(1000)">+1000</button></div>':''}</div>`}
function bid(d){if(!S||S.ph!='auc'||!S.auc)return;sync();const me=P.find(p=>p.id==myId);if(!me||!me.alive)return;const f=aucInfo(),base=f.top?f.top.amt:f.a.min-1;let amt=base+d;if(amt>me.m)amt=me.m;
if(amt<=base||amt<f.a.min)return alert('Не вистачає грошей на ставку');set(ref(db,`rooms/${code}/bids/${myId}`),{amt,ts:Date.now()})}
function botBids(){const f=aucInfo();if(!f)return;P.forEach(p=>{if(!p.bot||!p.alive||Math.random()>.2||(f.top&&f.top.id===p.id))return;const price=f.b[1],base=f.top?f.top.amt:f.a.min-1,lim=Math.min(p.m,Math.round(price*(.55+Math.random()*.3))),amt=base+50*(1+Math.floor(Math.random()*3));
if(amt<=lim)set(ref(db,`rooms/${code}/bids/${p.id}`),{amt,ts:Date.now()})})}
async function aucResolve(){busy=true;sync();const a=S.auc;
const bs=Object.keys((R&&R.bids)||{}).map(id=>({k:P.findIndex(p=>p.id==id),amt:+R.bids[id].amt||0,ts:+R.bids[id].ts||0})).filter(b=>b.k>=0&&P[b.k].alive&&b.amt>=a.min&&P[b.k].m>=b.amt).sort((x,y)=>y.amt-x.amt||x.ts-y.ts);
if(bs[0]&&own[a.i]===-1){const w=bs[0];P[w.k].m-=w.amt;own[a.i]=w.k;P[w.k].aw=(P[w.k].aw||0)+1;ev(w.k,'виграв аукціон: «'+T[a.i][0]+'» за '+w.amt+' ₴')}else ev(S.cur,'аукціон без ставок — ділянка лишається вільною');
S.auc=null;try{await set(ref(db,'rooms/'+code+'/bids'),null)}catch(e){}S.ph='wait';await save();end()}
setInterval(()=>{try{if(!S||!R||S.ph!='auc')return;const at=$('aucT');if(at)at.textContent=aucLeft()+'с';if(!busy&&driver()&&aucLeft()<=0)aucResolve()}catch(e){console.error(e)}},500);
// --- досягнення ---
const ACH=[{id:'first',ic:'🎮',n:'Новачок',d:'Зіграй першу гру',xp:100},{id:'win1',ic:'🏆',n:'Переможець',d:'Виграй гру',xp:300},{id:'owner5',ic:'🏠',n:'Власник',d:'Май 5 ділянок одночасно',xp:150},{id:'mono',ic:'🎨',n:'Монополіст',d:'Збери всі ділянки одного кольору',xp:250},
{id:'rich',ic:'💰',n:'Багач',d:'Май 20 000 ₴',xp:250},{id:'build',ic:'⭐',n:'Забудовник',d:'Доведи ділянку до ★★★',xp:250},{id:'trader',ic:'🤝',n:'Торговець',d:'Заверши обмін',xp:150},{id:'auction',ic:'🔨',n:'Аукціоніст',d:'Виграй аукціон',xp:150},
{id:'lucky',ic:'🍀',n:'Везунчик',d:'Виграй у лотерею 1500+ ₴',xp:200},{id:'rescue',ic:'🛟',n:'Врятований',d:'Використай рятувальну карту',xp:150},{id:'laps',ic:'🏃',n:'Мандрівник',d:'Пройди 5 кіл за гру',xp:150}];
function achGet(){try{return JSON.parse(lsg('ach')||'[]')||[]}catch(e){return[]}}
function checkAch(){if(!S)return;const mi=P.findIndex(p=>p.id==myId);if(mi<0)return;const p=P[mi],have=achGet(),cnt=own.filter(o=>o===mi).length,grp={};
T.forEach((b,i)=>{if(typeof b[1]=='number')(grp[b[2]]=grp[b[2]]||[]).push(i)});
const cond={first:gi('st_g')>=1,win1:gi('st_w')>=1,owner5:cnt>=5,mono:Object.keys(grp).some(k=>grp[k].every(i=>own[i]===mi)),rich:p.m>=20000,build:own.some((o,i)=>o===mi&&lvl[i]>=3),trader:(p.tr||0)>=1,auction:(p.aw||0)>=1,lucky:(p.lk||0)>=1,rescue:(p.rs||0)>=1,laps:(p.laps||0)>=5};
ACH.forEach(a=>{if(cond[a.id]&&have.indexOf(a.id)<0){have.push(a.id);lss('ach',JSON.stringify(have));lss('st_b',gi('st_b')+a.xp);statsUI();ev(mi,'🎖 досягнення «'+a.n+'» (+'+a.xp+' XP)')}})}
function achUI(){const have=achGet();$('skm').innerHTML=`<div class="md" onclick="event.stopPropagation()"><div class="mh"><h2>🎖 Досягнення ${have.length}/${ACH.length}</h2><button class="x" onclick="closeSk()">✕</button></div>${ACH.map(a=>{const ok=have.indexOf(a.id)>=0;return `<div class="mi ${ok?'grn':'gold'}" style="${ok?'':'opacity:.55'}"><i>${a.ic}</i><div><b>${a.n}</b><small>${a.d} · +${a.xp} XP</small></div></div>`}).join('')}</div>`;$('skm').style.display='grid'}
cfgUI();$('achBtn').onclick=achUI;
Object.assign(window,{bid,tgCfg,achUI});

// ===== ЗВУКИ (синтез у браузері; свої файли — у папці sounds/) =====
let AC=null,SND_ON=lsg('snd')!=='0',MUS_ON=lsg('mus')==='1',VOL=.6,lastLogKey=null,lastCur=null,lastBid=null,musT=null;const CUSTOM={},lastPl={};
function ac(){if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;try{AC=new C()}catch(e){return null}}if(AC.state=='suspended'){try{AC.resume()}catch(e){}}return AC}
function tone(f,t0,d,type,v,f2){const a=ac();if(!a)return;const o=a.createOscillator(),gn=a.createGain(),t=a.currentTime+t0;o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
gn.gain.setValueAtTime(.0001,t);gn.gain.exponentialRampToValueAtTime(Math.max(.0002,(v||.15)*VOL),t+.012);gn.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(gn);gn.connect(a.destination);o.start(t);o.stop(t+d+.05)}
function noise(t0,d,v,f1,f2){const a=ac();if(!a)return;const n=Math.max(1,Math.floor(a.sampleRate*d)),b=a.createBuffer(1,n,a.sampleRate),ch=b.getChannelData(0);for(let i=0;i<n;i++)ch[i]=Math.random()*2-1;
const s=a.createBufferSource();s.buffer=b;const fl=a.createBiquadFilter(),gn=a.createGain(),t=a.currentTime+t0;fl.type='bandpass';fl.frequency.setValueAtTime(f1||1500,t);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+d);fl.Q.value=1.2;
gn.gain.setValueAtTime(Math.max(.0002,(v||.15)*VOL),t);gn.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(gn);gn.connect(a.destination);s.start(t)}
const SFX={click:()=>tone(900,0,.04,'square',.05),step:()=>tone(380+Math.random()*80,0,.05,'triangle',.09),
dice:()=>{for(let i=0;i<9;i++)noise(i*.1+Math.random()*.04,.06,.2,1800+Math.random()*1500)},dicestop:()=>{tone(170,0,.14,'triangle',.28,80);noise(0,.08,.18,900)},
buy:()=>{tone(1250,0,.07,'square',.1);tone(1850,.07,.3,'sine',.16);tone(2500,.15,.25,'sine',.09)},rent:()=>{tone(1500,0,.06,'square',.08);tone(1100,.08,.06,'square',.08);tone(800,.16,.12,'square',.08)},
salary:()=>{[523,659,784,1047].forEach((f,i)=>tone(f,i*.08,.18,'triangle',.14))},card:()=>{noise(0,.28,.16,700,3200);tone(1320,.22,.2,'sine',.1)},
jackpot:()=>{[523,659,784,1047,1319,1047,1319,1568].forEach((f,i)=>tone(f,i*.09,.2,'square',.09))},lose:()=>{[392,330,262].forEach((f,i)=>tone(f,i*.16,.22,'sawtooth',.08))},
teleport:()=>{tone(300,0,.5,'sine',.14,1800);noise(.1,.4,.07,3000,6000)},rescue:()=>{tone(880,0,.25,'sine',.14);tone(1320,.14,.4,'sine',.14)},
gavel:()=>{[0,.2].forEach(t=>{tone(190,t,.09,'square',.25,70);noise(t,.05,.2,1200)})},whoosh:()=>noise(0,.3,.14,600,2800),
bankrupt:()=>{[330,262,196,131].forEach((f,i)=>tone(f,i*.2,.3,'sawtooth',.1))},win:()=>{[523,659,784,1047,784,1047,1319].forEach((f,i)=>tone(f,i*.13,.28,'square',.1))},
ach:()=>{[1047,1319,1568,2093].forEach((f,i)=>tone(f,i*.07,.3,'sine',.12))},upgrade:()=>{[0,.12,.24].forEach((t,i)=>{noise(t,.05,.2,1500);tone(500+i*120,t,.1,'triangle',.12)})},
tax:()=>{tone(150,0,.18,'sine',.3,90);tone(120,.2,.2,'sine',.3,70)},jail:()=>{tone(220,0,.35,'square',.14,110);noise(0,.15,.15,2500)},trade:()=>{tone(660,0,.1,'triangle',.12);tone(880,.1,.2,'triangle',.12)},
event:()=>{tone(784,0,.15,'sine',.12);tone(988,.12,.15,'sine',.12);tone(1175,.24,.3,'sine',.12)},yourturn:()=>{tone(880,0,.2,'sine',.14);tone(660,.16,.3,'sine',.14)},bid:()=>tone(720,0,.07,'square',.09),chat:()=>tone(620,0,.07,'sine',.1)};
function play(n){if(!SND_ON)return;const now=Date.now();if(lastPl[n]&&now-lastPl[n]<60)return;lastPl[n]=now;
try{if(CUSTOM[n]){const a=new Audio('sounds/'+n+'.mp3');a.volume=VOL;a.play().catch(()=>{});return}if(SFX[n])SFX[n]()}catch(e){}}
function sfxFor(e){const t=e.t||'';if(e.c)return 'chat';
if(/досягнення «/.test(t))return 'ach';if(/🏆/.test(t))return 'win';if(/збанкрутував/.test(t))return 'bankrupt';if(/виграв аукціон/.test(t))return 'gavel';if(/на аукціон/.test(t))return 'whoosh';
if(/купує філію/.test(t))return 'buy';if(/покращив/.test(t))return 'upgrade';if(/платить оренду/.test(t))return 'rent';if(/рятувальн/.test(t))return 'rescue';
if(/виграв у лотерею|виграв у казино|отримав грант/.test(t))return 'jackpot';if(/програв у казино|лотерея: без/.test(t))return 'lose';if(/телепорт/.test(t))return 'teleport';
if(/🎴/.test(t))return 'card';if(/податок/.test(t))return 'tax';if(/зарплат/.test(t))return 'salary';if(/в.язниц/.test(t)&&/іде|пропускає/.test(t))return 'jail';if(/обмінявся/.test(t))return 'trade';
if(/Свято|Повінь|Розпродаж|бум|Податкова|Грант/.test(t))return 'event';return null}
function logSounds(ks){if(lastLogKey===null){lastLogKey=ks.length?ks[ks.length-1]:'';return}const q=[];LOGS.forEach((e,i)=>{if(ks[i]>lastLogKey){const n=sfxFor(e);if(n)q.push(n)}});if(ks.length)lastLogKey=ks[ks.length-1];q.slice(0,3).forEach((n,i)=>setTimeout(()=>play(n),i*180))}
function sndRender(){if(S.cur!==lastCur){lastCur=S.cur;if(P[S.cur]&&P[S.cur].id==myId&&S.ph=='roll')play('yourturn')}
if(S.ph=='auc'){const f=aucInfo(),top=f&&f.top?f.top.amt:0;if(lastBid!==null&&top>lastBid)play('bid');lastBid=top}else lastBid=null}
const SCALE=[261.6,293.7,329.6,392,440,523.3,587.3];
function musStart(){if(musT||!MUS_ON)return;musT=setInterval(()=>{if(!MUS_ON||!ac())return;const f=SCALE[Math.floor(Math.random()*SCALE.length)]*(Math.random()<.3?.5:1);tone(f,0,1.8,'sine',.05);if(Math.random()<.4)tone(f*1.5,.3,1.3,'sine',.03)},900)}
function musStop(){clearInterval(musT);musT=null}
function tgSnd(){SND_ON=!SND_ON;lss('snd',SND_ON?'1':'0');if(SND_ON)play('click')}
function tgMus(){MUS_ON=!MUS_ON;lss('mus',MUS_ON?'1':'0');if(MUS_ON){ac();musStart()}else musStop()}
// свої звуки: поклади sounds/<назва>.mp3 — вони замінять синтезовані
Object.keys(SFX).forEach(n=>{try{fetch('sounds/'+n+'.mp3',{method:'HEAD'}).then(r=>{if(r&&r.ok)CUSTOM[n]=1}).catch(()=>{})}catch(e){}});
if(document.addEventListener){document.addEventListener('click',e=>{ac();const b=e.target&&e.target.closest&&e.target.closest('button');if(b)play('click');if(MUS_ON)musStart()})}
Object.assign(window,{tgSnd,tgMus});

// ===== ВИДАЛЕННЯ КІМНАТ ТА ВИХІД З ГРИ =====
function cbox(title,text,yes,fn){window._cfn=fn;const z=$('skm');z.innerHTML=`<div class="md" onclick="event.stopPropagation()"><div class="mh"><h2>${title}</h2><button class="x" onclick="closeSk()">✕</button></div><div class="stt">${text}</div><div class="cb"><button class="y" style="background:#e5484d;color:#fff" onclick="closeSk();_cfn()">${yes}</button><button class="n" onclick="closeSk()">Скасувати</button></div></div>`;z.style.display='grid'}
async function delRoom(c){try{await set(ref(db,'rooms/'+c),null)}catch(e){alert('Не вдалося видалити: '+e.message)}}
function askDel(c){cbox('Видалити кімнату?','Кімната зникне для всіх гравців, гру не можна буде продовжити.','🗑 Видалити',()=>delRoom(c))}
async function leaveForever(c){try{const r=(await get(ref(db,'rooms/'+c))).val();if(!r)return;const ps=Object.values(r.players||{}).filter(p=>p&&p.name&&!p.bot).sort((a,b)=>a.j-b.j);
if(r.status=='waiting'){if(ps[0]&&ps[0].id==myId)await set(ref(db,'rooms/'+c),null);else await set(ref(db,`rooms/${c}/players/${myId}`),null)}
else if(!ps.some(p=>p.id!==myId&&!p.left))await set(ref(db,'rooms/'+c),null);else await update(ref(db,`rooms/${c}/players/${myId}`),{left:true,online:false})}catch(e){alert('Не вдалося покинути: '+e.message)}}
function askLeave(c){cbox('Покинути гру?','Ти вибудеш з гри назавжди, а твої ділянки повернуться банку.','🚪 Покинути',()=>leaveForever(c))}
function leaveForeverGame(){const c=code;lvm=false;try{dc&&dc.cancel()}catch(e){}toLobby();leaveForever(c)}
function closeRoomGame(){const c=code;lvm=false;try{dc&&dc.cancel()}catch(e){}toLobby();delRoom(c)}
// драйвер вилучає гравців, які покинули гру назавжди
async function applyLeaves(){if(!S||busy||!R||!R.players||!driver()||!(S.ph=='roll'||S.ph=='buy'))return;sync();
const i=P.findIndex(p=>p.alive&&R.players[p.id]&&R.players[p.id].left);if(i<0)return;busy=true;const p=P[i];
p.alive=false;p.m=0;own.forEach((o,j)=>{if(o===i){own[j]=-1;lvl[j]=0}});ev(i,'покинув гру 🚪');
const al=P.filter(q=>q.alive),sides=new Set(al.map(q=>CF().team?q.tm:q.id));
if(S.cur===i||sides.size<2||!al.some(q=>!q.bot)){S.ph='wait';await save();return end()}await save();busy=false}
setInterval(()=>{applyLeaves().catch(e=>{busy=false;console.error(e)})},700);
Object.assign(window,{askDel,askLeave,leaveForeverGame,closeRoomGame,delRoom,leaveForever});
