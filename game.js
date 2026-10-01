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
const SAY=['Повезло','Ну ладно','Фух','Я навіть не здивована','Зараз до Мар\'яни стану','Хто купить Nike?'];
const NM=['Катерина','Manwol🤍','katya.ali','Вілка🖤'],AV=['😎','👩','🧑‍🎤','🦊'],PC=['#ff4d4d','#3ddc84','#ffd23f','#4aa8ff','#b46bff'],DF=['⚀','⚁','⚂','⚃','⚄','⚅'];
const pos=i=>i<=10?[1,1+i]:i<=20?[i-9,11]:i<=30?[11,31-i]:[41-i,1];
const side=i=>i<10?'top':i<20?'rt':i<30?'bot':'lf';
const hm=()=>new Date().toTimeString().slice(0,5),fm=n=>n.toLocaleString('uk')+' ₴';
function full(i){return T.every((x,k)=>x[2]!==T[i][2]||typeof x[1]!='number'||own[k]==own[i])}
function rent(i){const b=Math.round(T[i][1]*.1),L=lvl[i];return L?b*[0,4,8,14][L]:b*(full(i)?2:1)}
function tile(b,i){const[r,c]=pos(i),s=side(i%10==0?(i==0?0:i==10?9:i==20?21:31):i),t=b[1];
const tk=P.map(p=>p.alive&&p.pos==i?tokn(p):'').join('');
const corner=i%10==0,cls=(corner?'sp ':'')+s;
if(typeof t!='number')return '<div class="t '+cls+'" style="grid-area:'+r+'/'+c+'"><div class="in"><span class="em">'+b[2]+'</span>'+(corner?'':'<span class="nm">'+b[0]+'</span>')+'</div><div class="tk">'+tk+'</div></div>';
const bg=own[i]>=0?P[own[i]].c+'aa':'#fff';
return '<div class="t '+cls+'" style="grid-area:'+r+'/'+c+';--b:'+bg+'"><div class="in">'+(LG[b[0]]?'<img class="lg" src="logos/'+LG[b[0]]+'.png" alt="'+b[0]+'" onerror="this.outerHTML=\'<span class=nm>\'+this.alt+\'</span>\'">':'<span class="em" style="color:'+b[4]+'">'+b[3]+'</span><span class="nm" style="color:'+b[4]+'">'+b[0]+'</span>')+(lvl[i]?'<div class="st">'+'★'.repeat(lvl[i])+'</div>':'')+'</div><div class="pr" style="--g:'+GC[b[2]]+'">'+t+'</div><div class="tk">'+tk+'</div></div>'}

let code='',R=null,S=null,LOGS=[],showAll=false,busy=false,started=false,P,own,lvl;
const $=id=>document.getElementById(id);
const tg=window.Telegram&&Telegram.WebApp;let tu=null;
if(tg){try{tg.ready();tg.expand();tg.setHeaderColor('#070f22');tg.setBackgroundColor('#070f22');tu=tg.initDataUnsafe&&tg.initDataUnsafe.user||null}catch(e){}}
if(!tu){const q=new URLSearchParams(location.search);if(q.get('name')||q.get('id'))tu={id:q.get('id')||'',first_name:q.get('name')||'',username:q.get('u')||'',photo_url:q.get('photo')||''}}
if(!tu){try{const d=new URLSearchParams(location.hash.slice(1)).get('tgWebAppData');if(d)tu=JSON.parse(new URLSearchParams(d).get('user'))}catch(e){}}
let myId=null;if(tu&&tu.id)myId='tg_'+tu.id;else{try{myId=localStorage.getItem('mid')}catch(e){}}
if(!myId){myId='p_'+Math.random().toString(36).slice(2,10);try{localStorage.setItem('mid',myId)}catch(e){}}
const tname=tu?[tu.first_name,tu.last_name].filter(Boolean).join(' ')||tu.username||'':'';
if(tname)$('playerName').value=tname;else{try{const s=localStorage.getItem('pname');if(s)$('playerName').value=s}catch(e){}}
const myPh=okp(tu&&(tu.photo_url||(tu.username?'https://t.me/i/userpic/320/'+tu.username+'.jpg':'')));
$('src').textContent=tname?'✅ Telegram: '+tname+(myPh?' · фото є':' · фото немає'):'⚠️ Дані Telegram не отримано — введи ім\'я вручну';
const nm=()=>$('playerName').value.trim().slice(0,24)||'Гравець';
const hdr=()=>{$('meName').textContent=nm();$('meUser').textContent=tu&&tu.username?'@'+tu.username:'';$('meAv').innerHTML=avh({ph:myPh,a:nm()[0].toUpperCase()})};hdr();$('playerName').oninput=()=>{hdr();try{localStorage.setItem('pname',$('playerName').value)}catch(e){}};
onValue(ref(db,'.info/connected'),s=>{const c=$('connectionStatus');if(s.val()===true){c.textContent='✅ Підключено';setTimeout(()=>{c.style.display='none';if(!code)$('lobbyContent').style.display='block'},600)}else{c.style.display='block';c.textContent='❌ Не підключено'}});
$('createBtn').onclick=createRoom;$('joinBtn').onclick=()=>{const c=$('roomCodeInput').value.trim().toUpperCase();if(c)joinRoom(c)};$('startGameBtn').onclick=startGame;
async function createRoom(){code='GAME-'+Math.random().toString(36).slice(2,6).toUpperCase();
await set(ref(db,'rooms/'+code),{code,status:'waiting',players:{[myId]:{id:myId,name:nm(),ph:myPh,j:Date.now(),online:true}}});enter()}
async function joinRoom(c){
const r=(await get(ref(db,'rooms/'+c))).val();if(!r)return alert('Кімнату не знайдено!');const ps=r.players||{};
if(!ps[myId]){if(r.status!='waiting')return alert('Гра вже почалась!');if(Object.keys(ps).length>=5)return alert('Кімната повна!');
await set(ref(db,`rooms/${c}/players/${myId}`),{id:myId,name:nm(),ph:myPh,j:Date.now(),online:true})}
else await update(ref(db,`rooms/${c}/players/${myId}`),{online:true,name:nm(),ph:myPh});code=c;enter()}
function enter(spec){if(!spec)onDisconnect(ref(db,`rooms/${code}/players/${myId}`)).update({online:false});
$('lobbyContent').style.display='none';$('roomCodeDisplay').textContent=code;$('waitingRoom').style.display='block';listen()}
function listen(){
onValue(ref(db,'rooms/'+code),s=>{R=s.val();if(!R)return;
if(R.status=='waiting'){const a=Object.values(R.players||{}).sort((x,y)=>x.j-y.j);$('playersList').innerHTML=a.map(p=>'<div class="pi"><span class="av">'+avh({ph:p.ph,a:(p.name||'?')[0].toUpperCase()})+'</span> '+esc(p.name)+' '+(p.online?'🟢':'🔴')+'</div>').join('');$('startGameBtn').style.display=a[0]&&a[0].id==myId?'block':'none';$('startGameBtn').disabled=a.length<2;$('startGameBtn').textContent='Почати гру ('+a.length+' гравців)'}
else if(R.state){S=R.state;if(!started){started=true;$('lobby').style.display='none';$('gameBoard').style.display='block'}render()}});
onValue(query(ref(db,'rooms/'+code+'/log'),limitToLast(60)),s=>{LOGS=[];s.forEach(c=>{LOGS.push(c.val())});if(S)render()})}
function fresh(ps){return{players:ps.map((p,i)=>({id:p.id,n:p.n,ph:p.ph||'',c:PC[i],a:((p.n||'?')[0]||'?').toUpperCase(),m:10000,pos:0,jail:0,alive:true})),own:Array(40).fill(-1),lvl:Array(40).fill(0),cur:0,ph:'roll',tend:Date.now()+30000}}
async function startGame(){const ps=Object.values((await get(ref(db,'rooms/'+code+'/players'))).val()||{}).sort((a,b)=>a.j-b.j);if(ps.length<2)return;
await update(ref(db,'rooms/'+code),{state:fresh(ps.map(p=>({id:p.id,n:p.name,ph:p.ph||''}))),status:'playing'});ev(0,'Гра почалась! Капітал '+fm(10000))}
async function newGame(){if(!S||S.players[0].id!=myId)return;S=fresh(S.players.map(p=>({id:p.id,n:p.n,ph:p.ph||''})));await save();ev(0,'Нова гра! Капітал '+fm(10000))}
const ev=(p,t,c)=>push(ref(db,'rooms/'+code+'/log'),{p,t,c:c?1:0,h:hm()});
const save=()=>set(ref(db,'rooms/'+code+'/state'),S);
function sync(){P=S.players;own=S.own;lvl=S.lvl}
const on=id=>!(R&&R.players&&R.players[id]&&R.players[id].online===false);
function driver(){const c=S.players[S.cur];if(on(c.id))return c.id==myId;const h=S.players.find(p=>p.alive&&on(p.id));return !!h&&h.id==myId}
function pay(k,a,to){const p=S.players[k];p.m-=a;if(to!=null)S.players[to].m+=a;if(p.m<0){p.m=0;p.alive=false;S.own.forEach((o,j)=>{if(o==k){S.own[j]=-1;S.lvl[j]=0}});ev(k,'збанкрутував 💥')}}
async function roll(){if(!S||S.ph!='roll'||busy||!driver())return;busy=true;sync();const k=S.cur,p=P[k],d1=1+Math.random()*6|0,d2=1+Math.random()*6|0;S.dice=[d1,d2];S.ph='wait';ev(k,'викидає '+d1+':'+d2);
if(p.jail>0){p.jail--;ev(k,'у в\'язниці, пропускає хід');await save();return setTimeout(()=>{S.dice=null;end()},1800)}
const np=p.pos+d1+d2;if(np>=40){p.m+=1200;ev(k,'отримав зарплату +1200 ₴')}p.pos=np%40;await save();setTimeout(land,1800)}
async function land(){sync();const k=S.cur,p=P[k],b=T[p.pos],t=b[1];S.dice=null;
if(typeof t=='number'){const o=own[p.pos];
if(o==-1){S.ph='buy';S.tend=Date.now()+30000;await save();busy=false;return}
if(o!=k){const r=rent(p.pos);ev(k,'платить оренду '+r+' ₴ → '+P[o].n);pay(k,r,o)}
else if(full(p.pos)&&lvl[p.pos]<3){S.ph='buy';S.tend=Date.now()+30000;await save();busy=false;return}}
else if(t=='c'){const c=CARDS[Math.random()*CARDS.length|0];ev(k,'🎴 '+c[0]);if(c[2]=='go'){p.pos=0;p.m+=1200}else if(c[2]=='jail'){p.pos=10;p.jail=1}else if(c[1]>0)p.m+=c[1];else pay(k,-c[1])}
else if(t=='x'){ev(k,'сплатив податок 800 ₴');pay(k,800)}
else if(t=='g'){p.pos=10;p.jail=1;ev(k,'іде у в\'язницю')}
else if(t=='k'){if(Math.random()<.4){p.m+=1000;ev(k,'виграв у казино +1000 ₴')}else{ev(k,'програв у казино −600 ₴');pay(k,600)}}
await save();setTimeout(end,1500)}
async function buy(){if(!S||S.ph!='buy'||busy||!driver())return;busy=true;sync();const k=S.cur,p=P[k],b=T[p.pos];
if(own[p.pos]==k){const c=Math.round(b[1]/2);if(p.m>=c){p.m-=c;lvl[p.pos]++;ev(k,'покращив '+b[0]+' до рівня '+lvl[p.pos]+' за '+c+' ₴')}else ev(k,'не вистачає коштів')}
else if(p.m>=b[1]){p.m-=b[1];own[p.pos]=k;ev(k,'купує філію '+b[0]+' за '+b[1]+'₴')}else ev(k,'не вистачає коштів')
S.ph='wait';await save();setTimeout(end,900)}
async function skip(){if(!S||S.ph!='buy'||busy||!driver())return;busy=true;S.ph='wait';await save();end()}
async function end(){sync();const al=P.filter(p=>p.alive);
if(al.length<2){S.ph='over';S.dice=null;ev(P.indexOf(al[0]),'🏆 переміг!');await save();busy=false;return}
let n=S.cur;do{n=(n+1)%P.length}while(!P[n].alive);S.cur=n;S.ph='roll';S.dice=null;S.tend=Date.now()+30000;await save();busy=false}
function say(){const i=$('ci');if(!S||!i||!i.value.trim())return;const m=P.findIndex(p=>p.id==myId);ev(m<0?0:m,i.value.trim().slice(0,80),1);i.value=''}
function render(){if(!S)return;sync();const k=S.cur,c=P[k],mine=c.id==myId,ph=S.ph,dice=S.dice,pb=T[c.pos];
const spec=!P.some(p=>p.id==myId);const isB=typeof pb[1]=='number'&&own[c.pos]==k;
const pn=P.map((p,i)=>'<div class="pl'+(i==k?' on':'')+(p.alive?'':' dead')+'" style="--c:'+p.c+'" onclick="prof('+i+')">'+(i==k&&p.alive&&ph!='over'?'<i class="tm" id="tm">30 c</i>':'')+'<div class="av">'+avh(p)+'</div><div><b>'+esc(p.n)+(p.id==myId?' (ти)':'')+'</b><span>'+(p.alive?fm(p.m):'БАНКРУТ')+'</span></div></div>').join('');
const ac=mine&&ph=='roll'?'<div class="ac"><button onclick="roll()">🎲 Кинути кубики</button></div>':mine&&ph=='buy'?'<div class="ac"><button class="y" onclick="buy()">'+(isB?'Покращити '+Math.round(pb[1]/2):'Купити '+pb[1])+' ₴</button><button class="n" onclick="skip()">Пас</button></div>':ph=='over'&&P[0].id==myId?'<div class="ac"><button onclick="newGame()">Нова гра</button></div>':'';
const sub=ph=='over'?'Гру завершено':mine&&ph=='buy'?(isB?'Покращити ділянку?':'Купити '+pb[0]+'?'):mine&&ph=='roll'?'Твій хід — кидай кубики.':'Очікуйте завершення ходу.';
const L=showAll?LOGS:LOGS.slice(-4);
let h='<div id="top">'+pn+'<button class="mn" onclick="if(confirm(\'Вийти з гри?\'))location.reload()">⋮</button></div><div id="bd">'+T.map(tile).join('');
h+='<div id="mid"><h3>Події гри <span class="hb"><span class="ib">👁 '+P.length+'</span><button class="ib" onclick="tgl()">'+(showAll?'Менше':'Усі')+'</button></span></h3><div id="log">'+L.map(e=>{const q=P[e.p]||{c:'#888',n:''};return e.c?'<div class="ev c" style="--c:'+q.c+'"><b>'+esc(q.n)+'</b>'+esc(e.t)+'</div>':'<div class="ev" style="--c:'+q.c+'"><b>'+esc(q.n)+'</b> '+esc(e.t)+'</div>'}).join('')+'</div><div class="row"><input id="ci" '+(spec?'disabled placeholder="Ви спостерігаєте"':'placeholder="Написати повідомлення…"')+' onkeydown="if(event.key==\'Enter\')say()"><button onclick="say()">➤</button></div><div id="sc"><b>'+(ph=='over'?'Кінець гри':'Хід гравця '+esc(c.n))+'</b><small>'+sub+'</small>'+ac+'</div></div>';
if(dice)h+='<div id="dice"><span>'+DF[dice[0]-1]+'</span><span>'+DF[dice[1]-1]+'</span></div>';
h+='</div>'+modalHtml();const o=$('ci'),v=o?o.value:'',f=o&&document.activeElement===o;
$('app').innerHTML=h;const n=$('ci');if(n){n.value=v;if(f)n.focus()}const lg=$('log');if(lg)lg.scrollTop=lg.scrollHeight}
setInterval(()=>{if(!S||!R||S.ph=='over')return;const tm=$('tm');if(tm)tm.textContent=Math.max(0,Math.ceil((S.tend-Date.now())/1000))+' c';
if(!busy&&Date.now()>S.tend+800&&driver()){S.ph=='roll'?roll():S.ph=='buy'?skip():0}},500);
Object.assign(window,{roll,buy,skip,say,newGame,tgl:()=>{showAll=!showAll;render()}});

function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function okp(u){return /^https:\/\/[^\s"'()<>\\]+$/.test(u||'')?u:''}
function avh(p){const u=okp(p.ph),a=esc(p.a||'?');return u?`<img src="${u}" alt="" onerror="this.parentNode.textContent='${a}'">`:a}
function tokn(p){const u=okp(p.ph);return `<s style="--c:${p.c}${u?`;background:url('${u}') center/cover`:''}">${u?'':esc(p.a)}</s>`}
let ROOMS=[],modal=null,stats=false;
onValue(ref(db,'rooms'),s=>{ROOMS=[];s.forEach(c=>{const r=c.val();if(!r||!r.players)return;const ps=Object.values(r.players).sort((a,b)=>a.j-b.j);if(!ps.some(p=>p.online))return;const mine=ps.some(p=>p.id==myId);if(r.state&&r.state.ph=='over'&&!mine)return;ROOMS.push({code:c.key,st:r.status,ps,mine})});if(!code)renderLobby()},e=>{$('roomList').innerHTML='<p class="mut">⚠️ Немає доступу до списку кімнат. У Firebase → Realtime Database → Rules дозволь читання вузла rooms.</p>'});
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
let h=`<div class="ov" onclick="closeProf()"><div class="md" onclick="event.stopPropagation()"><div class="mh"><div class="av big" style="--c:${p.c}">${avh(p)}</div><div><small class="gd">${me?'ВАШ ГРАВЕЦЬ':'ГРАВЕЦЬ'}</small><h2>${esc(p.n)}</h2><span class="mm">${fm(p.m)}</span></div><button class="x" onclick="closeProf()">✕</button></div>`;
h+=`<div class="mi gold" onclick="tgs()"><i>👤</i><div><b>Профіль</b><small>Переглянути статистику гравця</small></div></div>`;
if(stats)h+=`<div class="stt">Ділянок: <b>${ls.length}</b> · Вартість: <b>${fm(val)}</b> · Зірок: <b>${st}</b>${p.debt?' · Кредит: <b>'+fm(p.debt)+'</b>':''}</div>`;
if(me){h+=`<div class="mi grn"><i>🏦</i><div><b>Кредит</b><small>${my?'Борг: '+fm(p.debt||0):'Доступно лише під час вашого ходу'}</small>${my?'<div class="cb"><button onclick="credit(1)">Взяти 2 000 ₴</button><button class="n" onclick="credit(0)">Повернути</button></div>':''}</div></div>`;
h+=`<div class="mi red"${my?' onclick="surr()"':' style="opacity:.55"'}><i>🏳️</i><div><b>Здатися</b><small>${my?'Вийти з гри, програвши':'Доступно лише під час вашого ходу'}</small></div></div>`}
return h+'</div></div>'}
async function credit(t){if(!S||busy||!driver()||!(S.ph=='roll'||S.ph=='buy'))return;sync();const k=S.cur,p=P[k];if(p.id!=myId)return;busy=true;
if(t){if((p.debt||0)>=4800){busy=false;return alert('Ліміт кредиту досягнуто')}p.m+=2000;p.debt=(p.debt||0)+2400;ev(k,'взяв кредит 2000 ₴ (повернути 2400 ₴)')}
else{const x=Math.min(p.m,p.debt||0);if(x<=0){busy=false;return}p.m-=x;p.debt-=x;ev(k,'повернув кредит '+x+' ₴')}
await save();busy=false}
async function surr(){if(!S||busy||!driver()||!(S.ph=='roll'||S.ph=='buy'))return;sync();const k=S.cur,p=P[k];if(p.id!=myId||!confirm('Здатися?'))return;busy=true;modal=null;
p.m=0;p.alive=false;S.own.forEach((o,j)=>{if(o==k){S.own[j]=-1;S.lvl[j]=0}});ev(k,'здався 🏳️');S.ph='wait';await save();end()}
Object.assign(window,{joinRoom,watch,prof,closeProf,tgs,credit,surr});
