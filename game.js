import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, set, onValue, push, update, remove } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "ТУТ_ВСТАВЬТЕ_ВАШ_API_KEY",
    authDomain: "ВАШ_ДОМЕН.firebaseapp.com",
    databaseURL: "ВАШ_URL",
    projectId: "ВАШ_PROJECT_ID",
    storageBucket: "ВАШ_BUCKET",
    messagingSenderId: "ВАШ_SENDER_ID",
    appId: "ВАШ_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let myPlayerId = 'player_' + Date.now();
let myPlayerName = '';
let currentRoomCode = '';
let lastPositions = {};

function generateRoomCode(){ return 'GAME-' + Math.random().toString(36).substr(2,4).toUpperCase(); }

window.createRoom = async function(){
    myPlayerName = document.getElementById('playerName').value || 'Гравець';
    currentRoomCode = generateRoomCode();
    const roomData = {
        code: currentRoomCode,
        status:'waiting',
        players:{[myPlayerId]: {id:myPlayerId,name:myPlayerName,pos:0,money:15000,alive:true,color:'#4caf50'}},
    };
    await set(ref(db,'rooms/'+currentRoomCode),roomData);
    document.getElementById('roomCodeDisplay').textContent = currentRoomCode;
    document.getElementById('waitingRoom').style.display='block';
    listenToRoom();
};

window.joinRoom = async function(){
    myPlayerName = document.getElementById('playerName').value || 'Гравець';
    const code = document.getElementById('roomCodeInput').value.trim().toUpperCase();
    if(!code){ alert('Введіть код!'); return; }
    currentRoomCode = code;
    await set(ref(db, `rooms/${code}/players/${myPlayerId}`), {id:myPlayerId,name:myPlayerName,pos:0,money:15000,alive:true,color:'#ff5722'});
    document.getElementById('roomCodeDisplay').textContent = code;
    document.getElementById('waitingRoom').style.display='block';
    listenToRoom();
};

function listenToRoom(){
    onValue(ref(db,'rooms/'+currentRoomCode),snap=>{
        const room = snap.val();
        if(!room) return;
        if(room.status==='waiting'){ updatePlayersList(room.players); }
        else if(room.status==='playing'){ showGameScreen(); renderGame(room.players); }
    });
}

function updatePlayersList(players){
    const list = document.getElementById('playersList');
    const arr = Object.values(players);
    list.innerHTML = arr.map(p=>`<div class="player-item">${p.name} ${p.alive?'🟢':'🔴'}</div>`).join('');
    const startBtn = document.getElementById('startGameBtn');
    startBtn.disabled = arr.length<2;
    startBtn.textContent = `Почати гру (${arr.length} гравців)`;
}

window.startGame = async function(){
    await update(ref(db,'rooms/'+currentRoomCode),{status:'playing'});
};

function showGameScreen(){
    document.getElementById('lobbyScreen').style.display='none';
    document.getElementById('gameScreen').style.display='block';
    document.getElementById('gameRoomCode').textContent=currentRoomCode;
}

window.rollDice = async function(){
    const d1=Math.floor(Math.random()*6)+1;
    const d2=Math.floor(Math.random()*6)+1;
    const playersSnap = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js').then(({get,ref})=>get(ref(db,'rooms/'+currentRoomCode+'/players')));
    const players = playersSnap.val();
    const me = players[myPlayerId];
    const newPos = (me.pos + d1 + d2)%40;
    await update(ref(db,`rooms/${currentRoomCode}/players/${myPlayerId}`),{pos:newPos});
    checkBankruptcy();
    checkWinner();
};

function renderGame(players){
    const board = document.getElementById('board');
    board.innerHTML='';
    for(let i=0;i<40;i++){
        const div = document.createElement('div');
        div.className='space';
        div.textContent=i;
        board.appendChild(div);
    }
    Object.values(players).forEach(p=>{
        const token = document.createElement('div');
        token.className='token';
        token.style.background=p.color;
        token.id='token-'+p.id;
        const cell = board.children[p.pos];
        cell.appendChild(token);
        lastPositions[p.id]=p.pos;
    });
    document.getElementById('onlineCount').textContent=`🟢 ${Object.values(players).filter(p=>p.alive).length} онлайн`;
}

function checkBankruptcy(){
    const playersRef = ref(db,'rooms/'+currentRoomCode+'/players');
    onValue(playersRef,snap=>{
        snap.forEach(p=>{
            if(p.val().money<=0 && p.val().alive){
                update(ref(db,`rooms/${currentRoomCode}/players/${p.key}`),{alive:false});
            }
        });
    });
}

function checkWinner(){
    const playersRef = ref(db,'rooms/'+currentRoomCode+'/players');
    onValue(playersRef,snap=>{
        const alive = Object.values(snap.val()).filter(p=>p.alive);
        if(alive.length===1) alert('🏆 Переміг: '+alive[0].name);
    });
}

window.sendMessage = async function(){
    const msg = document.getElementById('chatInput').value.trim();
    if(!msg) return;
    await push(ref(db,'rooms/'+currentRoomCode+'/chat'),{author:myPlayerName,msg:msg});
    document.getElementById('chatInput').value='';
};
onValue(ref(db,'rooms/'+currentRoomCode+'/chat'),snap=>{
    const chatDiv=document.getElementById('chatMessages');
    chatDiv.innerHTML='';
    snap.forEach(m=>{
        chatDiv.innerHTML+=`<div class="chat-message"><b>${m.val().author}:</b> ${m.val().msg}</div>`;
    });
});