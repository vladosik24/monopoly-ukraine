import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, set, onValue, update } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyByYh0VOBkFvPcQYRzabrt8sfj32gpbsWQ",
    authDomain: "monopoly-ukraine.firebaseapp.com",
    databaseURL: "https://monopoly-ukraine-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "monopoly-ukraine",
    storageBucket: "monopoly-ukraine.firebasestorage.app",
    messagingSenderId: "1046709502750",
    appId: "1:1046709502750:web:ba8ad3c1f11780d1a6bf0f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let myPlayerId = 'player_' + Date.now();
let myPlayerName = '';
let currentRoomCode = '';
let COLORS = ['#FF6B6B','#4ECDC4','#FFE66D','#A8E6CF'];

const connectionStatus = document.getElementById('connectionStatus');
const lobbyContent = document.getElementById('lobbyContent');

const testRef = ref(db, '.info/connected');
onValue(testRef, (snap) => {
    if (snap.val() === true) {
        connectionStatus.className = 'connection-status status-connected';
        connectionStatus.innerHTML = '<div>✅ Підключено!</div>';
        setTimeout(() => {
            connectionStatus.style.display = 'none';
            lobbyContent.style.display = 'block';
        }, 1000);
    } else {
        connectionStatus.className = 'connection-status status-error';
        connectionStatus.innerHTML = '<div>❌ Не підключено</div>';
    }
});

// --- ЛОБІ ---
document.getElementById('createBtn').addEventListener('click', createRoom);
document.getElementById('joinBtn').addEventListener('click', joinRoom);

function generateRoomCode() {
    return 'GAME-' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

async function createRoom() {
    myPlayerName = document.getElementById('playerName').value.trim() || 'Гравець';
    currentRoomCode = generateRoomCode();

    const roomData = {
        code: currentRoomCode,
        status: 'waiting',
        players: {
            [myPlayerId]: { id: myPlayerId, name: myPlayerName, pos: 0, money: 15000, props: [], color: COLORS[0], online: true }
        },
        game: { currentPlayer: 0, dice1: 1, dice2: 1, started: false }
    };

    await set(ref(db, 'rooms/' + currentRoomCode), roomData);

    document.getElementById('roomCodeDisplay').textContent = currentRoomCode;
    document.getElementById('waitingRoom').style.display = 'block';
    listenToRoom();
}

async function joinRoom() {
    myPlayerName = document.getElementById('playerName').value.trim() || 'Гравець';
    const code = document.getElementById('roomCodeInput').value.trim().toUpperCase();
    if (!code) return alert('Введіть код кімнати!');

    const roomRef = ref(db, 'rooms/' + code);
    onValue(roomRef, async (snapshot) => {
        const room = snapshot.val();
        if (!room) return alert('Кімнату не знайдено!');
        const playerCount = Object.keys(room.players || {}).length;
        if (playerCount >= 4) return alert('Кімната повна!');

        await set(ref(db, `rooms/${code}/players/${myPlayerId}`), {
            id: myPlayerId,
            name: myPlayerName,
            pos: 0,
            money: 15000,
            props: [],
            color: COLORS[playerCount],
            online: true
        });

        currentRoomCode = code;
        document.getElementById('roomCodeDisplay').textContent = code;
        document.getElementById('waitingRoom').style.display = 'block';
        listenToRoom();
    }, { onlyOnce: true });
}

function listenToRoom() {
    const roomRef = ref(db, 'rooms/' + currentRoomCode);
    onValue(roomRef, (snapshot) => {
        const room = snapshot.val();
        if (!room) return;
        updatePlayersList(room.players);
    });
}

function updatePlayersList(players) {
    const list = document.getElementById('playersList');
    const playerArray = Object.values(players || {});
    list.innerHTML = playerArray.map(p => `
        <div class="player-item">${p.name} ${p.online ? '🟢' : '🔴'}</div>
    `).join('');
    const startBtn = document.getElementById('startGameBtn');
    startBtn.disabled = playerArray.length < 2;
    startBtn.textContent = `Почати гру (${playerArray.length} гравців)`;
}