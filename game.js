import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';

import {
    getDatabase,
    ref,
    set,
    onValue,
    update,
    get,
    onDisconnect,
    push,
    query,
    limitToLast
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';


// ============================================================
// FIREBASE
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyByh0YVOBkFvPcQYRzabrt8sfj32gpbsWQ",
    authDomain: "monopoly-ukraine.firebaseapp.com",
    databaseURL: "https://monopoly-ukraine-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "monopoly-ukraine",
    storageBucket: "monopoly-ukraine.firebasestorage.app",
    messagingSenderId: "1046709502750",
    appId: "1:1046709502750:web:ba8ad3c1f11780d1a6bf0f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// ============================================================
// TELEGRAM
// ============================================================

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}


// ============================================================
// КОРИСТУВАЧ
// ============================================================

const tgUser = tg?.initDataUnsafe?.user || {
    id: Math.floor(Math.random() * 999999999),
    first_name: 'Гравець',
    username: ''
};

const UID = String(tgUser.id);

const USER_NAME =
    tgUser.first_name ||
    tgUser.username ||
    'Гравець';


// ============================================================
// URL / КІМНАТА
// ============================================================

const params = new URLSearchParams(location.search);

let ROOM_ID =
    params.get('room') ||
    params.get('game') ||
    localStorage.getItem('monopoly_room');

if (!ROOM_ID) {
    ROOM_ID = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    localStorage.setItem('monopoly_room', ROOM_ID);
}


// ============================================================
// CONSTANTS
// ============================================================

const MAX_PLAYERS = 6;

const START_MONEY = 10000;

const SALARY = 1200;

const JAIL_FINE = 500;

const MAX_HOUSES = 4;

const ROOM_REF = ref(db, `rooms/${ROOM_ID}`);


// ============================================================
// КОЛЬОРИ ГРАВЦІВ
// ============================================================

const PLAYER_COLORS = [
    '#00e5ff',
    '#ff3b81',
    '#7cff4f',
    '#ffd23f',
    '#a970ff',
    '#ff8b3d'
];


// ============================================================
// КАРТА
// ============================================================

const T = [

    // 0
    {
        n: 'СТАРТ',
        type: 'start',
        icon: '🏁'
    },

    // 1
    {
        n: 'Нова Пошта',
        type: 'property',
        group: 'orange',
        price: 600,
        icon: '📦'
    },

    // 2
    {
        n: 'ШАНС',
        type: 'chance',
        icon: '❓'
    },

    // 3
    {
        n: 'Укрпошта',
        type: 'property',
        group: 'orange',
        price: 600,
        icon: '📮'
    },

    // 4
    {
        n: 'ПОДАТОК',
        type: 'tax',
        price: 800,
        icon: '💸'
    },

    // 5
    {
        n: 'monobank',
        type: 'property',
        group: 'transport',
        price: 800,
        icon: '🏦'
    },

    // 6
    {
        n: 'Adidas',
        type: 'property',
        group: 'yellow',
        price: 1000,
        icon: '👟'
    },

    // 7
    {
        n: 'ШАНС',
        type: 'chance',
        icon: '❓'
    },

    // 8
    {
        n: 'Nike',
        type: 'property',
        group: 'yellow',
        price: 1000,
        icon: '👟'
    },

    // 9
    {
        n: 'Puma',
        type: 'property',
        group: 'yellow',
        price: 1200,
        icon: '👟'
    },

    // 10
    {
        n: "В'ЯЗНИЦЯ",
        type: 'jail',
        icon: '🔒'
    },

    // 11
    {
        n: 'Telegram',
        type: 'property',
        group: 'social',
        price: 1400,
        icon: '✈️'
    },

    // 12
    {
        n: 'Kyivstar',
        type: 'property',
        group: 'social',
        price: 1400,
        icon: '📱'
    },

    // 13
    {
        n: 'TikTok',
        type: 'property',
        group: 'social',
        price: 1600,
        icon: '🎵'
    },

    // 14
    {
        n: 'YouTube',
        type: 'property',
        group: 'media',
        price: 1800,
        icon: '▶️'
    },

    // 15
    {
        n: 'Google',
        type: 'property',
        group: 'media',
        price: 1800,
        icon: '🔎'
    },

    // 16
    {
        n: 'ПриватБанк',
        type: 'property',
        group: 'bank',
        price: 2000,
        icon: '🏦'
    },

    // 17
    {
        n: 'ШАНС',
        type: 'chance',
        icon: '❓'
    },

    // 18
    {
        n: 'Живчик',
        type: 'property',
        group: 'drink',
        price: 2200,
        icon: '🥤'
    },

    // 19
    {
        n: 'Моршинська',
        type: 'property',
        group: 'drink',
        price: 2200,
        icon: '💧'
    },

    // 20
    {
        n: 'КАЗИНО',
        type: 'casino',
        icon: '🎰'
    },

    // 21
    {
        n: 'АТБ',
        type: 'property',
        group: 'green',
        price: 2400,
        icon: '🛒'
    },

    // 22
    {
        n: 'ШАНС',
        type: 'chance',
        icon: '❓'
    },

    // 23
    {
        n: 'justin',
        type: 'property',
        group: 'green',
        price: 2400,
        icon: '📦'
    },

    // 24
    {
        n: 'Епіцентр',
        type: 'property',
        group: 'green',
        price: 2600,
        icon: '🏗️'
    },

    // 25
    {
        n: 'Ощадбанк',
        type: 'property',
        group: 'bank',
        price: 2800,
        icon: '🏦'
    },

    // 26
    {
        n: "McDonald's",
        type: 'property',
        group: 'red',
        price: 3000,
        icon: '🍔'
    },

    // 27
    {
        n: 'KFC',
        type: 'property',
        group: 'red',
        price: 3000,
        icon: '🍗'
    },

    // 28
    {
        n: 'ДТЕК',
        type: 'property',
        group: 'utility',
        price: 3200,
        icon: '⚡'
    },

    // 29
    {
        n: 'Burger King',
        type: 'property',
        group: 'red',
        price: 3400,
        icon: '🍔'
    },

    // 30
    {
        n: 'ІДИ У В’ЯЗНИЦЮ',
        type: 'gotojail',
        icon: '🚔'
    },

    // 31
    {
        n: 'Rozetka',
        type: 'property',
        group: 'blue',
        price: 3600,
        icon: '🛍️'
    },

    // 32
    {
        n: 'OLX',
        type: 'property',
        group: 'blue',
        price: 3600,
        icon: '💻'
    },

    // 33
    {
        n: 'ШАНС',
        type: 'chance',
        icon: '❓'
    },

    // 34
    {
        n: 'prom',
        type: 'property',
        group: 'blue',
        price: 3800,
        icon: '🛒'
    },

    // 35
    {
        n: 'Райффайзен',
        type: 'property',
        group: 'bank',
        price: 4000,
        icon: '🏦'
    },

    // 36
    {
        n: 'ПОДАТОК',
        type: 'tax',
        price: 1500,
        icon: '💸'
    },

    // 37
    {
        n: 'Apple',
        type: 'property',
        group: 'premium',
        price: 4200,
        icon: '🍎'
    },

    // 38
    {
        n: 'ШАНС',
        type: 'chance',
        icon: '❓'
    },

    // 39
    {
        n: 'Samsung',
        type: 'property',
        group: 'premium',
        price: 4500,
        icon: '📱'
    }
];


// ============================================================
// НАЗВИ ГРУП
// ============================================================

const GROUPS = {

    orange: {
        name: 'Пошта',
        color: '#ff8c42'
    },

    transport: {
        name: 'Фінанси',
        color: '#777777'
    },

    yellow: {
        name: 'Спорт',
        color: '#ffd43b'
    },

    social: {
        name: 'Соцмережі',
        color: '#00bfff'
    },

    media: {
        name: 'Медіа',
        color: '#ff4444'
    },

    bank: {
        name: 'Банки',
        color: '#4caf50'
    },

    drink: {
        name: 'Напої',
        color: '#00d4ff'
    },

    green: {
        name: 'Магазини',
        color: '#00c853'
    },

    red: {
        name: 'Фастфуд',
        color: '#ff1744'
    },

    utility: {
        name: 'Енергетика',
        color: '#ffd600'
    },

    blue: {
        name: 'Маркетплейси',
        color: '#2979ff'
    },

    premium: {
        name: 'Технології',
        color: '#9c27b0'
    }
};


// ============================================================
// ВАРТІСТЬ БУДИНКІВ
// ============================================================

const HOUSE_COSTS = {

    orange: 200,

    transport: 250,

    yellow: 250,

    social: 300,

    media: 300,

    bank: 350,

    drink: 350,

    green: 400,

    red: 450,

    utility: 450,

    blue: 500,

    premium: 600

};


// ============================================================
// ОРЕНДА
// ============================================================

const RENT_TABLE = {

    orange: {
        base: 50,
        houses: [250, 750, 1500, 2200],
        hotel: 3000
    },

    transport: {
        base: 80,
        houses: [400, 1000, 2000, 3000],
        hotel: 4000
    },

    yellow: {
        base: 80,
        houses: [400, 1000, 2200, 3000],
        hotel: 4000
    },

    social: {
        base: 100,
        houses: [500, 1200, 2500, 3500],
        hotel: 4500
    },

    media: {
        base: 120,
        houses: [600, 1400, 2800, 4000],
        hotel: 5000
    },

    bank: {
        base: 140,
        houses: [700, 1600, 3200, 4500],
        hotel: 5500
    },

    drink: {
        base: 160,
        houses: [800, 1800, 3600, 5000],
        hotel: 6000
    },

    green: {
        base: 180,
        houses: [900, 2000, 4000, 5500],
        hotel: 6500
    },

    red: {
        base: 200,
        houses: [1000, 2200, 4500, 6000],
        hotel: 7000
    },

    utility: {
        base: 220,
        houses: [1100, 2500, 5000, 6500],
        hotel: 7500
    },

    blue: {
        base: 250,
        houses: [1250, 2800, 5500, 7000],
        hotel: 8500
    },

    premium: {
        base: 300,
        houses: [1500, 3500, 6500, 8500],
        hotel: 10000
    }

};


// ============================================================
// СТАН ГРИ
// ============================================================

let S = {

    version: 2,

    phase: 'lobby',

    started: false,

    cur: 0,

    turn: 0,

    doubles: 0,

    dice: [0, 0],

    players: {},

    order: [],

    properties: {},

    bank: {
        houses: 32,
        hotels: 12
    },

    auction: null,

    debt: null,

    trade: null,

    chanceDeck: [],

    chanceIndex: 0,

    log: [],

    createdAt: Date.now()

};


// ============================================================
// ЛОКАЛЬНІ ЗМІННІ
// ============================================================

let isSpectator = false;

let unsubscribe = null;

let disconnectRef = null;

let lastStateHash = '';

let moving = false;

let actionTimer = null;


// ============================================================
// DOM
// ============================================================

const $ = id => document.getElementById(id);


// ============================================================
// УТИЛІТИ
// ============================================================

function esc(value) {

    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

}


function money(value) {

    return `${Math.round(Number(value) || 0).toLocaleString('uk-UA')} ₴`;

}


function uid() {

    return `${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 8)}`;

}


function clone(value) {

    return JSON.parse(JSON.stringify(value));

}


function clamp(value, min, max) {

    return Math.max(min, Math.min(max, value));

}


function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}


function playerIds() {

    return Object.keys(S.players || {});

}


function getPlayer(id = UID) {

    return S.players?.[id] || null;

}


function currentPlayer() {

    return getPlayer(S.order?.[S.cur]);

}


function isMyTurn() {

    return !isSpectator &&
        S.started &&
        S.order?.[S.cur] === UID;

}


function propertyOwner(index) {

    return S.properties?.[index]?.owner || null;

}


function propertyData(index) {

    return T[index];

}


function ownedProperties(id) {

    return Object.keys(S.properties || {})
        .map(Number)
        .filter(index =>
            S.properties[index]?.owner === id
        );

}


function isProperty(index) {

    return T[index]?.type === 'property';

}


function groupProperties(group) {

    return T
        .map((tile, index) => ({
            ...tile,
            index
        }))
        .filter(tile =>
            tile.type === 'property' &&
            tile.group === group
        );

}


function ownsWholeGroup(id, group) {

    const properties = groupProperties(group);

    return properties.length > 0 &&
        properties.every(tile =>
            S.properties?.[tile.index]?.owner === id
        );

}


function buildingCount(index) {

    return Number(
        S.properties?.[index]?.houses || 0
    );

}


function isHotel(index) {

    return Number(
        S.properties?.[index]?.hotel || 0
    ) === 1;

}


function isMortgaged(index) {

    return !!S.properties?.[index]?.mortgaged;

}


// ============================================================
// НОРМАЛІЗАЦІЯ
// ============================================================

function normalize() {

    if (!S.players) {
        S.players = {};
    }

    if (!Array.isArray(S.order)) {
        S.order = [];
    }

    if (!S.properties) {
        S.properties = {};
    }

    if (!Array.isArray(S.log)) {
        S.log = [];
    }

    S.cur = clamp(
        Number(S.cur) || 0,
        0,
        Math.max(0, S.order.length - 1)
    );

    for (const id of Object.keys(S.players)) {

        const p = S.players[id];

        p.name = p.name || 'Гравець';

        p.money = Number.isFinite(Number(p.money))
            ? Number(p.money)
            : START_MONEY;

        p.pos = Number.isFinite(Number(p.pos))
            ? Number(p.pos)
            : 0;

        p.jail = Number(p.jail || 0);

        p.jailTurns = Number(p.jailTurns || 0);

        p.bankrupt = !!p.bankrupt;

        p.color =
            p.color ||
            PLAYER_COLORS[
                Math.max(
                    0,
                    S.order.indexOf(id)
                ) % PLAYER_COLORS.length
            ];

    }

    for (const index of Object.keys(S.properties)) {

        const property = S.properties[index];

        property.owner =
            property.owner || null;

        property.houses =
            Number(property.houses || 0);

        property.hotel =
            Number(property.hotel || 0);

        property.mortgaged =
            !!property.mortgaged;

    }

}


// ============================================================
// ЛОГ
// ============================================================

function addLog(message) {

    S.log = S.log || [];

    S.log.push({
        id: uid(),
        text: message,
        time: Date.now()
    });

    if (S.log.length > 80) {
        S.log = S.log.slice(-80);
    }

}


// ============================================================
// ЗБЕРЕЖЕННЯ
// ============================================================

let saveTimeout = null;

function saveState() {

    normalize();

    clearTimeout(saveTimeout);

    saveTimeout = setTimeout(async () => {

        try {

            await set(ROOM_REF, S);

        } catch (error) {

            console.error(
                'Firebase save error:',
                error
            );

        }

    }, 80);

}


// ============================================================
// ХЕШ СТАНУ
// ============================================================

function stateHash(state) {

    try {

        return JSON.stringify([
            state.phase,
            state.cur,
            state.started,
            state.doubles,
            state.auction,
            state.debt,
            state.trade,
            state.order,
            Object.values(state.players || {})
                .map(p => [
                    p.pos,
                    p.money,
                    p.jail,
                    p.bankrupt
                ]),
            Object.values(state.properties || {})
                .map(p => [
                    p.owner,
                    p.houses,
                    p.hotel,
                    p.mortgaged
                ])
        ]);

    } catch {

        return '';

    }

}


// ============================================================
// FIREBASE WATCH
// ============================================================

function watchRoom() {

    if (unsubscribe) {
        unsubscribe();
    }

    unsubscribe = onValue(
        ROOM_REF,
        snapshot => {

            const data = snapshot.val();

            if (!data) {

                if (!isSpectator) {
                    createRoom();
                }

                return;
            }

            S = data;

            normalize();

            const newHash = stateHash(S);

            if (newHash !== lastStateHash) {

                lastStateHash = newHash;

                render();

            }

        },
        error => {

            console.error(
                'Firebase watch error:',
                error
            );

        }
    );

}


// ============================================================
// СТВОРЕННЯ КІМНАТИ
// ============================================================

async function createRoom() {

    S = {

        version: 2,

        phase: 'lobby',

        started: false,

        cur: 0,

        turn: 0,

        doubles: 0,

        dice: [0, 0],

        players: {},

        order: [],

        properties: {},

        bank: {
            houses: 32,
            hotels: 12
        },

        auction: null,

        debt: null,

        trade: null,

        chanceDeck: [],

        chanceIndex: 0,

        log: [],

        createdAt: Date.now()

    };

    addLog('Створено нову гру');

    await set(
        ROOM_REF,
        S
    );

}


// ============================================================
// ВХІД У ГРУ
// ============================================================

async function enter(spectator = false) {

    isSpectator = spectator;

    let snap;

    try {

        snap = await get(ROOM_REF);

    } catch (error) {

        console.error(error);

        alert(
            'Не вдалося підключитися до гри.'
        );

        return;

    }

    if (!snap.exists()) {

        await createRoom();

    } else {

        S = snap.val();

        normalize();

    }


    if (isSpectator) {

        render();

        return;

    }


    if (!S.players[UID]) {

        if (S.started) {

            isSpectator = true;

            render();

            return;

        }

        if (S.order.length >= MAX_PLAYERS) {

            isSpectator = true;

            alert(
                'У грі вже максимальна кількість гравців.'
            );

            render();

            return;

        }

        const color =
            PLAYER_COLORS[
                S.order.length %
                PLAYER_COLORS.length
            ];

        S.players[UID] = {

            id: UID,

            name: USER_NAME,

            username: tgUser.username || '',

            money: START_MONEY,

            pos: 0,

            jail: 0,

            jailTurns: 0,

            bankrupt: false,

            color,

            joinedAt: Date.now()

        };

        S.order.push(UID);

        addLog(
            `👤 ${USER_NAME} приєднався до гри`
        );

        await set(
            ROOM_REF,
            S
        );

    }


    disconnectRef = ref(
        db,
        `rooms/${ROOM_ID}/players/${UID}`
    );

    try {

        onDisconnect(
            disconnectRef
        ).cancel();

    } catch {}


    render();

}


// ============================================================
// ВИХІД / SPECTATOR
// ============================================================

async function leaveGame() {

    if (isSpectator) {

        showLobby();

        return;

    }

    if (
        S.started &&
        !confirm(
            'Вийти з гри? Це призведе до банкрутства.'
        )
    ) {
        return;
    }


    if (S.started) {

        const p = getPlayer();

        if (p) {

            p.money = 0;

            p.bankrupt = true;

            releaseProperties(
                UID,
                null
            );

        }

    } else {

        delete S.players[UID];

        S.order = S.order.filter(
            id => id !== UID
        );

    }


    addLog(
        `👋 ${USER_NAME} залишив гру`
    );

    await set(
        ROOM_REF,
        S
    );

    showLobby();

}


// ============================================================
// ЗВІЛЬНЕННЯ МАЙНА
// ============================================================

function releaseProperties(
    ownerId,
    newOwner = null
) {

    for (
        const index of ownedProperties(ownerId)
    ) {

        const property =
            S.properties[index];

        if (!property) {
            continue;
        }

        property.owner = newOwner;

        if (newOwner === null) {

            property.houses = 0;

            property.hotel = 0;

            property.mortgaged = false;

        }

    }

}


// ============================================================
// START ГРИ
// ============================================================

async function startGame() {

    if (isSpectator) {
        return;
    }

    if (S.started) {
        return;
    }

    if (S.order.length < 2) {

        alert(
            'Для початку потрібно щонайменше 2 гравці.'
        );

        return;

    }


    S.started = true;

    S.phase = 'roll';

    S.cur = 0;

    S.turn = 1;

    S.doubles = 0;

    S.dice = [0, 0];

    createChanceDeck();

    addLog(
        '🎲 Гра розпочалася!'
    );

    addLog(
        `Хід гравця ${currentPlayer()?.name || ''}`
    );

    await set(
        ROOM_REF,
        S
    );

}


// ============================================================
// ШАНС — КОЛОДА
// ============================================================

function createChanceDeck() {

    const cards = [

        {
            type: 'money',
            value: 500,
            text: '🎁 Бонус! Отримайте 500 ₴.'
        },

        {
            type: 'money',
            value: 1000,
            text: '💰 Ви знайшли 1000 ₴.'
        },

        {
            type: 'money',
            value: -500,
            text: '💸 Сплатіть штраф 500 ₴.'
        },

        {
            type: 'money',
            value: -1000,
            text: '🚨 Неочікувані витрати: -1000 ₴.'
        },

        {
            type: 'move',
            value: 0,
            text: '🏁 Поверніться на СТАРТ.'
        },

        {
            type: 'move',
            value: -3,
            text: '⬅️ Рух назад на 3 клітинки.'
        },

        {
            type: 'jail',
            value: 0,
            text: '🚔 Ідіть у в’язницю.'
        },

        {
            type: 'salary',
            value: 1200,
            text: '💼 Ви отримали зарплату 1200 ₴.'
        },

        {
            type: 'repair',
            value: 300,
            text: '🔧 Ремонт. Сплатіть 300 ₴.'
        },

        {
            type: 'money',
            value: 2000,
            text: '⭐ Великий бонус! +2000 ₴.'
        }

    ];

    S.chanceDeck =
        cards
            .sort(() => Math.random() - 0.5);

    S.chanceIndex = 0;

}


// ============================================================
// ОТРИМАННЯ КАРТКИ ШАНСУ
// ============================================================

function nextChance() {

    if (
        !Array.isArray(S.chanceDeck) ||
        !S.chanceDeck.length
    ) {

        createChanceDeck();

    }

    const card =
        S.chanceDeck[
            S.chanceIndex %
            S.chanceDeck.length
        ];

    S.chanceIndex++;

    return clone(card);

}


// ============================================================
// ПОЗИЦІЯ ГРАВЦЯ
// ============================================================

function movePosition(
    player,
    steps
) {

    const oldPos = Number(player.pos) || 0;

    let newPos =
        oldPos + Number(steps || 0);

    while (newPos < 0) {
        newPos += 40;
    }

    if (newPos >= 40) {

        const laps =
            Math.floor(newPos / 40);

        newPos %= 40;

        player.money +=
            SALARY * laps;

        addLog(
            `💵 ${player.name} отримав ${money(SALARY * laps)} за проходження СТАРТУ`
        );

    }

    player.pos = newPos;

}


// ============================================================
// ДАЙСИ
// ============================================================

function randomDice() {

    return Math.floor(
        Math.random() * 6
    ) + 1;

}


function diceTotal() {

    return (
        Number(S.dice?.[0] || 0) +
        Number(S.dice?.[1] || 0)
    );

}


// ============================================================
// КИНУТИ КУБИКИ
// ============================================================

async function rollDice() {

    if (moving) {
        return;
    }

    if (!isMyTurn()) {
        return;
    }

    if (
        S.phase !== 'roll'
    ) {
        return;
    }

    const p =
        currentPlayer();

    if (!p || p.bankrupt) {
        return;
    }


    moving = true;

    const d1 = randomDice();

    const d2 = randomDice();

    S.dice = [d1, d2];


    // --------------------------------------------------------
    // ТРЕТІЙ ДУБЛЬ
    // --------------------------------------------------------

    if (
        d1 === d2 &&
        !p.jail
    ) {

        S.doubles++;

    } else {

        S.doubles = 0;

    }


    addLog(
        `🎲 ${p.name}: ${d1} + ${d2} = ${d1 + d2}`
    );


    render();


    await sleep(650);


    // --------------------------------------------------------
    // ТРИ ДУБЛІ
    // --------------------------------------------------------

    if (
        S.doubles >= 3 &&
        !p.jail
    ) {

        p.pos = 10;

        p.jail = 1;

        p.jailTurns = 0;

        S.doubles = 0;

        S.phase = 'wait';

        addLog(
            `🚔 ${p.name} кинув три дублі та потрапив у в’язницю`
        );

        await saveAndRender();

        moving = false;

        finishTurn(false);

        return;

    }


    // --------------------------------------------------------
    // РУХ
    // --------------------------------------------------------

    const total =
        d1 + d2;

    S.phase = 'moving';

    await saveAndRender();

    await animateMove(
        p,
        total
    );


    await land(
        p
    );


    moving = false;

    await saveAndRender();


    // --------------------------------------------------------
    // ДУБЛЬ
    // --------------------------------------------------------

    if (
        d1 === d2 &&
        !p.jail &&
        !p.bankrupt
    ) {

        S.phase = 'roll';

        addLog(
            `🎲 ${p.name} отримує додатковий хід за дубль`
        );

        await saveAndRender();

        return;

    }


    finishTurn();

}


// ============================================================
// АНІМАЦІЯ РУХУ
// ============================================================

async function animateMove(
    player,
    steps
) {

    for (
        let i = 0;
        i < steps;
        i++
    ) {

        movePosition(
            player,
            1
        );

        render();

        await sleep(180);

    }

}


// ============================================================
// ЗАВЕРШЕННЯ ХОДУ
// ============================================================

async function finishTurn(
    shouldSave = true
) {

    if (!S.started) {
        return;
    }


    const p =
        currentPlayer();


    // Якщо гравець залишився на дублях
    if (
        S.doubles > 0 &&
        p &&
        !p.jail &&
        !p.bankrupt
    ) {

        S.phase = 'roll';

        if (shouldSave) {
            await saveAndRender();
        }

        return;

    }


    S.doubles = 0;


    let next =
        S.cur + 1;

    let safety = 0;


    while (
        safety < S.order.length
    ) {

        if (
            next >= S.order.length
        ) {
            next = 0;
        }

        const id =
            S.order[next];

        const candidate =
            getPlayer(id);

        if (
            candidate &&
            !candidate.bankrupt
        ) {
            break;
        }

        next++;

        safety++;

    }


    S.cur = next;

    S.turn++;

    const nextPlayer =
        currentPlayer();


    if (nextPlayer?.jail) {

        S.phase = 'jail';

    } else {

        S.phase = 'roll';

    }


    addLog(
        `➡️ Хід гравця ${nextPlayer?.name || ''}`
    );


    if (shouldSave) {

        await saveAndRender();

    } else {

        render();

    }


    checkGameEnd();

}


// ============================================================
// ЗБЕРЕГТИ + РЕНДЕР
// ============================================================

async function saveAndRender() {

    normalize();

    render();

    await set(
        ROOM_REF,
        S
    );

}


// ============================================================
// ПЕРЕВІРКА ЗАВЕРШЕННЯ ГРИ
// ============================================================

function checkGameEnd() {

    const alive =
        S.order.filter(
            id => !S.players[id]?.bankrupt
        );

    if (alive.length <= 1 && S.started) {

        S.phase = 'finished';

        const winner =
            getPlayer(alive[0]);

        if (winner) {

            addLog(
                `🏆 Переможець: ${winner.name}`
            );

        }

        saveState();

    }

}


// ============================================================
// ПОСАДКА НА КЛІТИНКУ
// ============================================================

async function land(player) {

    const index =
        Number(player.pos) || 0;

    const tile =
        T[index];

    if (!tile) {
        return;
    }


    addLog(
        `📍 ${player.name}: ${tile.n}`
    );


    switch (tile.type) {

        case 'start':

            addLog(
                `🏁 ${player.name} зупинився на СТАРТІ`
            );

            break;


        case 'property':

            await landProperty(
                player,
                index
            );

            break;


        case 'chance':

            await drawChance(
                player
            );

            break;


        case 'tax':

            await payTax(
                player,
                tile.price
            );

            break;


        case 'casino':

            await casino(
                player
            );

            break;


        case 'gotojail':

            goToJail(
                player
            );

            break;


        case 'jail':

            addLog(
                `🔒 ${player.name} просто відвідує в’язницю`
            );

            break;

    }

}


// ============================================================
// ВЛАСНІСТЬ
// ============================================================

async function landProperty(
    player,
    index
) {

    const tile =
        T[index];

    const property =
        S.properties[index] ||
        {};

    S.properties[index] =
        property;


    // --------------------------------------------------------
    // НІЧИЯ ВЛАСНІСТЬ
    // --------------------------------------------------------

    if (!property.owner) {

        S.phase = 'buy';

        return;

    }


    // --------------------------------------------------------
    // СВОЯ
    // --------------------------------------------------------

    if (
        property.owner === player.id
    ) {

        addLog(
            `🏠 ${player.name} відвідав свою власність`
        );

        return;

    }


    // --------------------------------------------------------
    // ЗАСТАВА
    // --------------------------------------------------------

    if (property.mortgaged) {

        addLog(
            `🏦 ${tile.n} перебуває в заставі — оренда не стягується`
        );

        return;

    }


    // --------------------------------------------------------
    // ОРЕНДА
    // --------------------------------------------------------

    const owner =
        getPlayer(property.owner);

    if (!owner) {
        return;
    }


    const rent =
        calculateRent(
            index,
            player.id
        );


    await transferMoney(
        player,
        owner,
        rent,
        `🏠 Оренда за ${tile.n}`
    );

}


// ============================================================
// РОЗРАХУНОК ОРЕНДИ
// ============================================================

function calculateRent(
    index,
    visitorId
) {

    const tile =
        T[index];

    if (!tile || tile.type !== 'property') {
        return 0;
    }


    const property =
        S.properties[index];

    if (!property || !property.owner) {
        return 0;
    }


    if (property.mortgaged) {
        return 0;
    }


    const table =
        RENT_TABLE[tile.group];


    if (!table) {
        return Math.max(
            50,
            Math.round(tile.price * 0.1)
        );
    }


    // --------------------------------------------------------
    // БУДІВЛІ
    // --------------------------------------------------------

    if (property.hotel) {

        return table.hotel;

    }


    const houses =
        Number(property.houses || 0);


    if (houses > 0) {

        return table.houses[
            clamp(
                houses - 1,
                0,
                table.houses.length - 1
            )
        ];

    }


    // --------------------------------------------------------
    // ПОВНА ГРУПА
    // --------------------------------------------------------

    if (
        ownsWholeGroup(
            property.owner,
            tile.group
        )
    ) {

        return table.base * 2;

    }


    return table.base;

}


// ============================================================
// ПЕРЕДАЧА ГРОШЕЙ
// ============================================================

async function transferMoney(
    from,
    to,
    amount,
    reason = ''
) {

    amount = Math.max(
        0,
        Math.floor(
            Number(amount) || 0
        )
    );


    if (!amount) {
        return true;
    }


    if (from.money >= amount) {

        from.money -= amount;

        to.money += amount;

        addLog(
            `${reason}: ${from.name} → ${to.name} ${money(amount)}`
        );

        return true;

    }


    // --------------------------------------------------------
    // БОРГ
    // --------------------------------------------------------

    const available =
        Math.max(
            0,
            from.money
        );

    if (available > 0) {

        from.money = 0;

        to.money += available;

    }


    const debtAmount =
        amount - available;


    S.debt = {

        debtor: from.id,

        creditor: to.id,

        amount: debtAmount,

        reason,

        createdAt: Date.now()

    };


    S.phase = 'debt';


    addLog(
        `⚠️ ${from.name} має борг ${money(debtAmount)} перед ${to.name}`
    );


    return false;

}


// ============================================================
// ПОДАТОК
// ============================================================

async function payTax(
    player,
    amount
) {

    amount = Math.max(
        0,
        Number(amount) || 0
    );


    if (player.money >= amount) {

        player.money -= amount;

        addLog(
            `💸 ${player.name} сплатив податок ${money(amount)}`
        );

        return;

    }


    S.debt = {

        debtor: player.id,

        creditor: null,

        amount:
            amount - Math.max(
                0,
                player.money
            ),

        reason: 'Податок',

        createdAt: Date.now()

    };


    player.money = 0;

    S.phase = 'debt';


    addLog(
        `⚠️ ${player.name} не може сплатити податок`
    );

}


// ============================================================
// КАЗИНО
// ============================================================

async function casino(
    player
) {

    const win =
        Math.random() < 0.4;


    if (win) {

        player.money += 1000;

        addLog(
            `🎰 ${player.name} виграв 1000 ₴ у казино`
        );

    } else {

        const loss =
            Math.min(
                600,
                Math.max(
                    0,
                    player.money
                )
            );

        player.money -= loss;

        addLog(
            `🎰 ${player.name} програв ${money(loss)} у казино`
        );

    }

}


// ============================================================
// В'ЯЗНИЦЯ
// ============================================================

function goToJail(
    player
) {

    player.pos = 10;

    player.jail = 1;

    player.jailTurns = 0;

    S.doubles = 0;

    S.phase = 'wait';


    addLog(
        `🚔 ${player.name} відправлений у в’язницю`
    );

}


// ============================================================
// КИДОК ДЛЯ В'ЯЗНИЦІ
// ============================================================

async function rollInJail() {

    if (!isMyTurn()) {
        return;
    }

    const p =
        currentPlayer();

    if (!p?.jail) {
        return;
    }


    const d1 =
        randomDice();

    const d2 =
        randomDice();


    S.dice = [d1, d2];


    addLog(
        `🎲 ${p.name} у в’язниці: ${d1} + ${d2}`
    );


    if (d1 === d2) {

        p.jail = 0;

        p.jailTurns = 0;

        S.phase = 'roll';

        addLog(
            `🔓 ${p.name} викинув дубль і вийшов із в’язниці`
        );

        await saveAndRender();

        return;

    }


    p.jailTurns =
        Number(p.jailTurns || 0) + 1;


    if (p.jailTurns >= 3) {

        if (p.money >= JAIL_FINE) {

            p.money -= JAIL_FINE;

            p.jail = 0;

            p.jailTurns = 0;

            S.phase = 'roll';

            addLog(
                `🔓 ${p.name} сплатив ${money(JAIL_FINE)} після третьої невдалої спроби`
            );

        } else {

            S.phase = 'debt';

            S.debt = {

                debtor: p.id,

                creditor: null,

                amount: JAIL_FINE,

                reason: 'Штраф за в’язницю',

                createdAt: Date.now()

            };

        }

    } else {

        S.phase = 'wait';

        addLog(
            `🔒 ${p.name} залишається у в’язниці`
        );

    }


    await saveAndRender();

}


// ============================================================
// ОПЛАТА ШТРАФУ В'ЯЗНИЦІ
// ============================================================

async function payJailFine() {

    if (!isMyTurn()) {
        return;
    }

    const p =
        currentPlayer();

    if (!p?.jail) {
        return;
    }


    if (p.money < JAIL_FINE) {

        alert(
            `Потрібно ${money(JAIL_FINE)}`
        );

        return;

    }


    p.money -= JAIL_FINE;

    p.jail = 0;

    p.jailTurns = 0;

    S.phase = 'roll';


    addLog(
        `🔓 ${p.name} заплатив ${money(JAIL_FINE)} і вийшов із в’язниці`
    );


    await saveAndRender();

}


// ============================================================
// ШАНС
// ============================================================

async function drawChance(
    player
) {

    const card =
        nextChance();


    addLog(
        `❓ ${player.name}: ${card.text}`
    );


    if (card.type === 'money') {

        if (card.value >= 0) {

            player.money += card.value;

        } else {

            const cost =
                Math.abs(card.value);

            if (player.money >= cost) {

                player.money -= cost;

            } else {

                S.debt = {

                    debtor: player.id,

                    creditor: null,

                    amount:
                        cost - player.money,

                    reason: 'Картка Шансу',

                    createdAt: Date.now()

                };

                player.money = 0;

                S.phase = 'debt';

            }

        }

    }


    else if (
        card.type === 'salary'
    ) {

        player.money += card.value;

    }


    else if (
        card.type === 'move'
    ) {

        if (card.value === 0) {

            const old =
                player.pos;

            if (old !== 0) {

                player.money +=
                    SALARY;

                addLog(
                    `🏁 ${player.name} отримав ${money(SALARY)} за повернення через СТАРТ`
                );

            }

            player.pos = 0;

        } else {

            movePosition(
                player,
                card.value
            );

        }

        if (S.phase !== 'debt') {

            await land(
                player
            );

        }

    }


    else if (
        card.type === 'jail'
    ) {

        goToJail(
            player
        );

    }


    else if (
        card.type === 'repair'
    ) {

        const cost =
            card.value;

        if (player.money >= cost) {

            player.money -= cost;

        } else {

            S.debt = {

                debtor: player.id,

                creditor: null,

                amount:
                    cost - player.money,

                reason: 'Ремонт',

                createdAt: Date.now()

            };

            player.money = 0;

            S.phase = 'debt';

        }

    }


    await saveAndRender();

}


// ============================================================
// БУДІВНИЦТВО — ПЕРЕВІРКИ
// ============================================================

function canBuild(
    playerId,
    index
) {

    if (!isProperty(index)) {
        return {
            ok: false,
            reason: 'Це не власність'
        };
    }


    const tile =
        T[index];

    const property =
        S.properties[index];


    if (
        !property ||
        property.owner !== playerId
    ) {

        return {
            ok: false,
            reason: 'Це не ваша власність'
        };

    }


    if (property.mortgaged) {

        return {
            ok: false,
            reason: 'Власність у заставі'
        };

    }


    if (
        !ownsWholeGroup(
            playerId,
            tile.group
        )
    ) {

        return {
            ok: false,
            reason: 'Потрібно володіти всією групою'
        };

    }


    if (property.hotel) {

        return {
            ok: false,
            reason: 'Вже побудований готель'
        };

    }


    const houses =
        Number(property.houses || 0);


    if (houses >= 4) {

        if (S.bank.hotels <= 0) {

            return {
                ok: false,
                reason: 'У банку немає готелів'
            };

        }

        return {
            ok: true,
            hotel: true
        };

    }


    if (S.bank.houses <= 0) {

        return {
            ok: false,
            reason: 'У банку немає будинків'
        };

    }


    // --------------------------------------------------------
    // РІВНОМІРНА ЗАБУДОВА
    // --------------------------------------------------------

    const group =
        groupProperties(
            tile.group
        );


    const minHouses =
        Math.min(
            ...group.map(
                p =>
                    Number(
                        S.properties[p.index]?.houses || 0
                    ) +
                    (
                        S.properties[p.index]?.hotel
                            ? 4
                            : 0
                    )
            )
        );


    if (
        houses > minHouses
    ) {

        return {
            ok: false,
            reason: 'Будинки потрібно будувати рівномірно'
        };

    }


    return {
        ok: true,
        hotel: false
    };

}


// ============================================================
// ПОБУДУВАТИ
// ============================================================

async function build(
    index
) {

    if (!isMyTurn()) {
        return;
    }


    const check =
        canBuild(
            UID,
            index
        );


    if (!check.ok) {

        alert(
            check.reason
        );

        return;

    }


    const tile =
        T[index];

    const cost =
        HOUSE_COSTS[tile.group];


    const player =
        getPlayer(UID);


    if (player.money < cost) {

        alert(
            `Потрібно ${money(cost)}`
        );

        return;

    }


    player.money -= cost;


    const property =
        S.properties[index];


    if (check.hotel) {

        property.hotel = 1;

        property.houses = 0;

        S.bank.hotels--;

        addLog(
            `🏨 ${player.name} побудував готель на ${tile.n}`
        );

    } else {

        property.houses =
            Number(property.houses || 0) + 1;

        S.bank.houses--;

        addLog(
            `🏠 ${player.name} побудував будинок на ${tile.n}`
        );

    }


    await saveAndRender();

}


// ============================================================
// ПРОДАЖ БУДИНКУ
// ============================================================

async function sellBuilding(
    index
) {

    if (!isMyTurn()) {
        return;
    }


    const property =
        S.properties[index];

    const tile =
        T[index];


    if (
        !property ||
        property.owner !== UID
    ) {

        return;

    }


    const count =
        Number(property.houses || 0);

    const hotel =
        Number(property.hotel || 0);


    if (
        count <= 0 &&
        !hotel
    ) {

        alert(
            'На цій клітинці немає будівель.'
        );

        return;

    }


    const cost =
        HOUSE_COSTS[tile.group];


    // --------------------------------------------------------
    // ГОТЕЛЬ -> ЧОТИРИ БУДИНКИ
    // --------------------------------------------------------

    if (hotel) {

        if (S.bank.houses < 4) {

            alert(
                'У банку недостатньо будинків для розбору готелю.'
            );

            return;

        }


        property.hotel = 0;

        property.houses = 4;

        S.bank.hotels++;

        S.bank.houses -= 4;


        const refund =
            Math.floor(
                cost / 2
            ) * 5;


        getPlayer(UID).money +=
            refund;


        addLog(
            `🏨 ${getPlayer(UID).name} продав готель на ${tile.n} за ${money(refund)}`
        );


        await saveAndRender();

        return;

    }


    // --------------------------------------------------------
    // БУДИНОК
    // --------------------------------------------------------

    property.houses--;

    S.bank.houses++;

    const refund =
        Math.floor(
            cost / 2
        );

    getPlayer(UID).money +=
        refund;


    addLog(
        `🏠 ${getPlayer(UID).name} продав будинок на ${tile.n} за ${money(refund)}`
    );


    await saveAndRender();

}


// ============================================================
// КУПІВЛЯ ВЛАСНОСТІ
// ============================================================

async function buyProperty(
    index
) {

    if (!isMyTurn()) {
        return;
    }


    if (
        S.phase !== 'buy'
    ) {
        return;
    }


    const player =
        getPlayer(UID);

    const tile =
        T[index];


    if (
        !player ||
        tile?.type !== 'property'
    ) {

        return;

    }


    if (
        S.properties[index]?.owner
    ) {

        return;

    }


    const price =
        Number(tile.price || 0);


    if (player.money < price) {

        alert(
            `Недостатньо коштів. Потрібно ${money(price)}`
        );

        startAuction(index);

        return;

    }


    player.money -= price;


    S.properties[index] = {

        owner: UID,

        houses: 0,

        hotel: 0,

        mortgaged: false

    };


    addLog(
        `🏠 ${player.name} купив ${tile.n} за ${money(price)}`
    );


    S.phase = 'wait';


    await saveAndRender();

}


// ============================================================
// ВІДМОВА ВІД ПОКУПКИ → АУКЦІОН
// ============================================================

async function declineProperty(
    index
) {

    if (!isMyTurn()) {
        return;
    }


    if (
        S.phase !== 'buy'
    ) {
        return;
    }


    startAuction(
        index
    );

}


// ============================================================
// АУКЦІОН
// ============================================================

function startAuction(
    index
) {

    if (
        !isProperty(index)
    ) {
        return;
    }


    S.auction = {

        property: index,

        highestBid: 0,

        highestBidder: null,

        active: S.order.filter(
            id =>
                !S.players[id]?.bankrupt
        ),

        passed: [],

        current: 0,

        startedAt: Date.now(),

        endsAt:
            Date.now() + 45000

    };


    S.phase = 'auction';


    addLog(
        `🔨 Аукціон: ${T[index].n}`
    );


    saveAndRender();

}


// ============================================================
// СТАВКА
// ============================================================

async function auctionBid(
    amount
) {

    if (
        S.phase !== 'auction' ||
        !S.auction
    ) {
        return;
    }


    const auction =
        S.auction;


    if (
        !auction.active.includes(UID)
    ) {
        return;
    }


    if (
        auction.passed.includes(UID)
    ) {
        return;
    }


    const player =
        getPlayer(UID);


    amount =
        Math.floor(
            Number(amount) || 0
        );


    if (
        amount <=
        Number(auction.highestBid || 0)
    ) {

        alert(
            `Ставка повинна бути більшою за ${money(auction.highestBid)}`
        );

        return;

    }


    if (
        player.money < amount
    ) {

        alert(
            'У вас недостатньо грошей.'
        );

        return;

    }


    auction.highestBid =
        amount;

    auction.highestBidder =
        UID;


    addLog(
        `🔨 ${player.name} запропонував ${money(amount)}`
    );


    auction.current =
        (
            auction.current + 1
        ) %
        auction.active.length;


    await saveAndRender();

}


// ============================================================
// ПРОПУСТИТИ АУКЦІОН
// ============================================================

async function auctionPass() {

    if (
        S.phase !== 'auction' ||
        !S.auction
    ) {
        return;
    }


    const auction =
        S.auction;


    if (
        !auction.active.includes(UID)
    ) {
        return;
    }


    if (
        !auction.passed.includes(UID)
    ) {

        auction.passed.push(UID);

    }


    addLog(
        `🔨 ${getPlayer(UID)?.name || ''} вийшов з аукціону`
    );


    const remaining =
        auction.active.filter(
            id =>
                !auction.passed.includes(id)
        );


    if (
        remaining.length <= 1
    ) {

        await finishAuction();

        return;

    }


    auction.current =
        (
            auction.current + 1
        ) %
        auction.active.length;


    await saveAndRender();

}


// ============================================================
// ЗАВЕРШЕННЯ АУКЦІОНУ
// ============================================================

async function finishAuction() {

    if (
        !S.auction
    ) {
        return;
    }


    const auction =
        S.auction;


    const index =
        auction.property;


    const winner =
        auction.highestBidder;


    if (
        winner &&
        auction.highestBid > 0
    ) {

        const player =
            getPlayer(winner);


        const bid =
            Number(
                auction.highestBid
            );


        if (
            player &&
            player.money >= bid
        ) {

            player.money -= bid;


            S.properties[index] = {

                owner: winner,

                houses: 0,

                hotel: 0,

                mortgaged: false

            };


            addLog(
                `🔨 ${player.name} виграв ${T[index].n} за ${money(bid)}`
            );

        }

    } else {

        addLog(
            `🔨 На ${T[index].n} не було ставок`
        );

    }


    S.auction = null;

    S.phase = 'wait';


    await saveAndRender();

}


// ============================================================
// ЗАСТАВА
// ============================================================

function mortgageValue(
    index
) {

    const tile =
        T[index];

    if (!tile?.price) {
        return 0;
    }


    return Math.floor(
        tile.price * 0.5
    );

}


// ============================================================
// МОЖНА ЗАСТАВИТИ?
// ============================================================

function canMortgage(
    index,
    playerId
) {

    const property =
        S.properties[index];


    if (
        !property ||
        property.owner !== playerId
    ) {

        return false;

    }


    if (
        property.mortgaged
    ) {

        return false;

    }


    if (
        property.houses > 0 ||
        property.hotel
    ) {

        return false;

    }


    const group =
        T[index].group;


    // Не можна заставляти одну власність,
    // якщо на іншій у цій групі є будинки
    const groupTiles =
        groupProperties(group);


    for (
        const tile of groupTiles
    ) {

        const p =
            S.properties[tile.index];

        if (
            p?.owner === playerId &&
            (
                p.houses > 0 ||
                p.hotel
            )
        ) {

            return false;

        }

    }


    return true;

}


// ============================================================
// ЗАСТАВИТИ
// ============================================================

async function mortgage(
    index
) {

    if (!isMyTurn()) {
        return;
    }


    if (
        !canMortgage(
            index,
            UID
        )
    ) {

        alert(
            'Цю власність зараз не можна заставити.'
        );

        return;

    }


    const value =
        mortgageValue(index);


    S.properties[index].mortgaged =
        true;


    getPlayer(UID).money +=
        value;


    addLog(
        `🏦 ${getPlayer(UID).name} заставив ${T[index].n} та отримав ${money(value)}`
    );


    await saveAndRender();

}


// ============================================================
// ЗНЯТИ ЗАСТАВУ
// ============================================================

async function unmortgage(
    index
) {

    if (!isMyTurn()) {
        return;
    }


    const property =
        S.properties[index];


    if (
        !property ||
        property.owner !== UID ||
        !property.mortgaged
    ) {

        return;

    }


    const base =
        mortgageValue(index);


    const fee =
        Math.ceil(
            base * 0.1
        );


    const cost =
        base + fee;


    const player =
        getPlayer(UID);


    if (
        player.money < cost
    ) {

        alert(
            `Потрібно ${money(cost)}`
        );

        return;

    }


    player.money -= cost;

    property.mortgaged = false;


    addLog(
        `🏦 ${player.name} зняв заставу з ${T[index].n} за ${money(cost)}`
    );


    await saveAndRender();

}


// ============================================================
// ПРОДАЖ ВЛАСНОСТІ БАНКУ
// ============================================================

async function sellPropertyToBank(
    index
) {

    if (!isMyTurn()) {
        return;
    }


    const property =
        S.properties[index];


    if (
        !property ||
        property.owner !== UID
    ) {

        return;

    }


    if (
        property.houses > 0 ||
        property.hotel
    ) {

        alert(
            'Спочатку продайте всі будинки та готель.'
        );

        return;

    }


    const value =
        Math.floor(
            T[index].price * 0.5
        );


    const player =
        getPlayer(UID);


    player.money += value;


    delete S.properties[index];


    addLog(
        `🏦 ${player.name} продав ${T[index].n} банку за ${money(value)}`
    );


    await saveAndRender();

    }
// ============================================================
// БОРГ — ПРОДАЖ АКТИВІВ
// ============================================================

function debtPlayer() {

    if (!S.debt) {
        return null;
    }

    return getPlayer(
        S.debt.debtor
    );

}


function debtAmount() {

    return Math.max(
        0,
        Number(
            S.debt?.amount || 0
        )
    );

}


function debtCanBePaid() {

    if (!S.debt) {
        return true;
    }

    const p =
        debtPlayer();

    if (!p) {
        return true;
    }

    return p.money >= debtAmount();

}


// ============================================================
// ПОГАСИТИ БОРГ
// ============================================================

async function payDebt() {

    if (!S.debt) {
        return;
    }

    const debt =
        S.debt;

    const debtor =
        getPlayer(
            debt.debtor
        );

    if (!debtor) {
        S.debt = null;
        return;
    }


    const amount =
        Math.max(
            0,
            Number(debt.amount || 0)
        );


    if (
        debtor.money < amount
    ) {

        alert(
            `Недостатньо грошей. Борг: ${money(amount)}`
        );

        return;

    }


    debtor.money -= amount;


    if (debt.creditor) {

        const creditor =
            getPlayer(
                debt.creditor
            );

        if (creditor) {

            creditor.money += amount;

        }

    }


    addLog(
        `💰 ${debtor.name} погасив борг ${money(amount)}`
    );


    S.debt = null;

    S.phase = 'wait';


    await saveAndRender();

}


// ============================================================
// ПРОДАТИ БУДИНОК ДЛЯ БОРГУ
// ============================================================

async function debtSellBuilding(
    index
) {

    if (!S.debt) {
        return;
    }


    const debt =
        S.debt;

    if (
        debt.debtor !== UID
    ) {
        return;
    }


    const property =
        S.properties[index];

    if (
        !property ||
        property.owner !== UID
    ) {
        return;
    }


    if (
        property.houses <= 0 &&
        !property.hotel
    ) {

        alert(
            'На цій власності немає будівель.'
        );

        return;

    }


    await sellBuilding(
        index
    );


    if (
        S.debt &&
        getPlayer(UID).money >=
        S.debt.amount
    ) {

        await payDebt();

    }

}


// ============================================================
// ЗАСТАВА ДЛЯ ПОГАШЕННЯ БОРГУ
// ============================================================

async function debtMortgage(
    index
) {

    if (!S.debt) {
        return;
    }


    if (
        S.debt.debtor !== UID
    ) {
        return;
    }


    if (
        !canMortgage(
            index,
            UID
        )
    ) {

        alert(
            'Цю власність зараз не можна заставити.'
        );

        return;

    }


    await mortgage(
        index
    );


    if (
        S.debt &&
        getPlayer(UID).money >=
        S.debt.amount
    ) {

        await payDebt();

    }

}


// ============================================================
// БАНКРУТСТВО
// ============================================================

async function declareBankruptcy() {

    if (!S.debt) {
        return;
    }


    const debt =
        S.debt;


    if (
        debt.debtor !== UID
    ) {
        return;
    }


    const debtor =
        getPlayer(UID);


    if (!debtor) {
        return;
    }


    const creditor =
        debt.creditor
            ? getPlayer(
                debt.creditor
            )
            : null;


    // --------------------------------------------------------
    // БОРГ ГРАВЦЮ
    // --------------------------------------------------------

    if (creditor) {

        // Гроші, що залишилися
        if (debtor.money > 0) {

            creditor.money +=
                debtor.money;

            debtor.money = 0;

        }


        const assets =
            ownedProperties(
                UID
            );


        for (
            const index of assets
        ) {

            const property =
                S.properties[index];

            if (!property) {
                continue;
            }


            // Будинки повертаються банку
            if (
                property.houses > 0
            ) {

                const refund =
                    Math.floor(
                        HOUSE_COSTS[
                            T[index].group
                        ] / 2
                    ) *
                    property.houses;


                creditor.money +=
                    refund;


                S.bank.houses +=
                    property.houses;

            }


            // Готель
            if (
                property.hotel
            ) {

                const refund =
                    Math.floor(
                        HOUSE_COSTS[
                            T[index].group
                        ] / 2
                    ) * 5;


                creditor.money +=
                    refund;


                S.bank.hotels++;

            }


            property.houses = 0;

            property.hotel = 0;


            // Передаємо саму власність
            property.owner =
                creditor.id;


            // Якщо застава — новий власник
            // сплачує 10% банку
            if (
                property.mortgaged
            ) {

                const interest =
                    Math.ceil(
                        mortgageValue(index) *
                        0.1
                    );


                if (
                    creditor.money >=
                    interest
                ) {

                    creditor.money -=
                        interest;

                }


                addLog(
                    `🏦 ${creditor.name} отримав заставлену ${T[index].n}`
                );

            }

        }


        addLog(
            `💀 ${debtor.name} збанкрутував на користь ${creditor.name}`
        );

    }


    // --------------------------------------------------------
    // БОРГ БАНКУ
    // --------------------------------------------------------

    else {

        const assets =
            ownedProperties(
                UID
            );


        for (
            const index of assets
        ) {

            const property =
                S.properties[index];

            if (!property) {
                continue;
            }


            // Будинки банк викуповує за половину
            if (
                property.houses > 0
            ) {

                const refund =
                    Math.floor(
                        HOUSE_COSTS[
                            T[index].group
                        ] / 2
                    ) *
                    property.houses;


                debtor.money +=
                    refund;


                S.bank.houses +=
                    property.houses;


                property.houses = 0;

            }


            // Готель
            if (
                property.hotel
            ) {

                const refund =
                    Math.floor(
                        HOUSE_COSTS[
                            T[index].group
                        ] / 2
                    ) * 5;


                debtor.money +=
                    refund;


                S.bank.hotels++;

                property.hotel = 0;

            }


            property.owner = null;

            property.mortgaged = false;

        }


        addLog(
            `💀 ${debtor.name} збанкрутував перед банком`
        );

    }


    debtor.money = 0;

    debtor.bankrupt = true;


    // Видаляємо з активного порядку
    S.order =
        S.order.filter(
            id => id !== UID
        );


    S.debt = null;


    if (
        S.order.length <= 1
    ) {

        checkGameEnd();

    }


    if (
        S.order.length > 0
    ) {

        S.cur =
            clamp(
                S.cur,
                0,
                S.order.length - 1
            );

    }


    S.phase = 'wait';


    await saveAndRender();

}


// ============================================================
// ПРОФІЛЬ ГРАВЦЯ
// ============================================================

function playerNetWorth(
    id
) {

    const p =
        getPlayer(id);

    if (!p) {
        return 0;
    }


    let total =
        Number(p.money || 0);


    for (
        const index of ownedProperties(id)
    ) {

        const property =
            S.properties[index];

        const tile =
            T[index];


        if (!property || !tile) {
            continue;
        }


        // Вартість власності
        total +=
            Number(tile.price || 0);


        // Вартість будинків
        total +=
            Number(
                property.houses || 0
            ) *
            Number(
                HOUSE_COSTS[
                    tile.group
                ] || 0
            );


        // Готель
        if (
            property.hotel
        ) {

            total +=
                Number(
                    HOUSE_COSTS[
                        tile.group
                    ] || 0
                ) * 5;

        }

    }


    return total;

}


// ============================================================
// СТАТИСТИКА ГРАВЦЯ
// ============================================================

function playerStats(
    id
) {

    const p =
        getPlayer(id);

    if (!p) {
        return null;
    }


    const properties =
        ownedProperties(id);


    const groups =
        {};


    for (
        const index of properties
    ) {

        const group =
            T[index].group;

        groups[group] =
            (groups[group] || 0) + 1;

    }


    let monopolies = 0;


    for (
        const group of Object.keys(
            GROUPS
        )
    ) {

        if (
            ownsWholeGroup(
                id,
                group
            )
        ) {

            monopolies++;

        }

    }


    return {

        properties:
            properties.length,

        monopolies,

        houses:
            properties.reduce(
                (sum, index) =>
                    sum +
                    Number(
                        S.properties[index]?.houses || 0
                    ),
                0
            ),

        hotels:
            properties.reduce(
                (sum, index) =>
                    sum +
                    Number(
                        S.properties[index]?.hotel || 0
                    ),
                0
            ),

        netWorth:
            playerNetWorth(id)

    };

}


// ============================================================
// ТОРГІВЛЯ — СТВОРЕННЯ ПРОПОЗИЦІЇ
// ============================================================

function createTrade(
    targetId
) {

    if (
        !isMyTurn()
    ) {

        alert(
            'Торгувати можна під час свого ходу.'
        );

        return;

    }


    if (
        !targetId ||
        targetId === UID
    ) {

        return;

    }


    const target =
        getPlayer(targetId);


    if (
        !target ||
        target.bankrupt
    ) {

        return;

    }


    S.trade = {

        id: uid(),

        from: UID,

        to: targetId,

        fromMoney: 0,

        toMoney: 0,

        fromProperties: [],

        toProperties: [],

        fromJailCard: 0,

        toJailCard: 0,

        status: 'pending',

        createdAt: Date.now()

    };


    S.phase = 'trade';


    addLog(
        `🤝 ${getPlayer(UID).name} запропонував угоду ${target.name}`
    );


    saveAndRender();

}


// ============================================================
// ДОДАТИ МАЙНО ДО ТОРГІВ
// ============================================================

function toggleTradeProperty(
    index
) {

    if (!S.trade) {
        return;
    }


    const trade =
        S.trade;


    let list;


    if (
        trade.from === UID
    ) {

        list =
            trade.fromProperties;

    } else if (
        trade.to === UID
    ) {

        list =
            trade.toProperties;

    } else {

        return;

    }


    const position =
        list.indexOf(index);


    if (position >= 0) {

        list.splice(
            position,
            1
        );

    } else {

        const property =
            S.properties[index];


        if (
            !property ||
            property.owner !== UID
        ) {

            return;

        }


        // Не можна передавати власність
        // з будинками
        if (
            property.houses > 0 ||
            property.hotel
        ) {

            alert(
                'Спочатку продайте всі будинки та готель.'
            );

            return;

        }


        list.push(index);

    }


    saveAndRender();

}


// ============================================================
// ГРОШІ В ТОРГІ
// ============================================================

function setTradeMoney(
    side,
    value
) {

    if (!S.trade) {
        return;
    }


    value =
        Math.max(
            0,
            Math.floor(
                Number(value) || 0
            )
        );


    const player =
        side === 'from'
            ? getPlayer(
                S.trade.from
            )
            : getPlayer(
                S.trade.to
            );


    if (!player) {
        return;
    }


    value =
        Math.min(
            value,
            player.money
        );


    if (
        side === 'from'
    ) {

        S.trade.fromMoney =
            value;

    } else {

        S.trade.toMoney =
            value;

    }


    saveAndRender();

}


// ============================================================
// ПРИЙНЯТИ ТОРГІВЛЮ
// ============================================================

async function acceptTrade() {

    if (!S.trade) {
        return;
    }


    const trade =
        S.trade;


    if (
        trade.to !== UID
    ) {

        return;

    }


    if (
        trade.status !== 'pending'
    ) {

        return;

    }


    const from =
        getPlayer(
            trade.from
        );

    const to =
        getPlayer(
            trade.to
        );


    if (
        !from ||
        !to ||
        from.bankrupt ||
        to.bankrupt
    ) {

        return;

    }


    // Перевіряємо гроші
    if (
        from.money <
        Number(
            trade.fromMoney || 0
        )
    ) {

        alert(
            'У продавця недостатньо грошей.'
        );

        return;

    }


    if (
        to.money <
        Number(
            trade.toMoney || 0
        )
    ) {

        alert(
            'У вас недостатньо грошей.'
        );

        return;

    }


    // Перевіряємо власності
    for (
        const index of
        trade.fromProperties
    ) {

        if (
            S.properties[index]?.owner !==
            from.id
        ) {

            alert(
                'Одна з власностей більше не належить продавцю.'
            );

            return;

        }

    }


    for (
        const index of
        trade.toProperties
    ) {

        if (
            S.properties[index]?.owner !==
            to.id
        ) {

            alert(
                'Одна з власностей більше не належить другому гравцю.'
            );

            return;

        }

    }


    // --------------------------------------------------------
    // ГРОШІ
    // --------------------------------------------------------

    from.money -=
        Number(
            trade.fromMoney || 0
        );

    to.money +=
        Number(
            trade.fromMoney || 0
        );


    to.money -=
        Number(
            trade.toMoney || 0
        );

    from.money +=
        Number(
            trade.toMoney || 0
        );


    // --------------------------------------------------------
    // ВЛАСНОСТІ
    // --------------------------------------------------------

    for (
        const index of
        trade.fromProperties
    ) {

        S.properties[index].owner =
            to.id;

    }


    for (
        const index of
        trade.toProperties
    ) {

        S.properties[index].owner =
            from.id;

    }


    trade.status =
        'accepted';


    addLog(
        `🤝 ${from.name} та ${to.name} уклали угоду`
    );


    S.trade = null;

    S.phase = 'wait';


    await saveAndRender();

}


// ============================================================
// ВІДХИЛИТИ ТОРГІВЛЮ
// ============================================================

async function rejectTrade() {

    if (!S.trade) {
        return;
    }


    const trade =
        S.trade;


    if (
        trade.to !== UID
    ) {

        return;

    }


    const target =
        getPlayer(
            trade.to
        );


    addLog(
        `❌ ${target?.name || ''} відхилив пропозицію`
    );


    S.trade = null;

    S.phase = 'wait';


    await saveAndRender();

}


// ============================================================
// СКАСУВАТИ ТОРГІВЛЮ
// ============================================================

async function cancelTrade() {

    if (!S.trade) {
        return;
    }


    if (
        S.trade.from !== UID
    ) {

        return;

    }


    addLog(
        `↩️ ${getPlayer(UID)?.name || ''} скасував угоду`
    );


    S.trade = null;

    S.phase = 'wait';


    await saveAndRender();

}


// ============================================================
// ПЕРЕДАЧА ВЛАСНОСТІ ІНШОМУ ГРАВЦЮ
// ============================================================

async function directPropertySale(
    index,
    targetId,
    price
) {

    if (!isMyTurn()) {
        return;
    }


    const property =
        S.properties[index];


    if (
        !property ||
        property.owner !== UID
    ) {

        return;

    }


    const buyer =
        getPlayer(targetId);

    const seller =
        getPlayer(UID);


    if (
        !buyer ||
        buyer.bankrupt ||
        buyer.id === UID
    ) {

        return;

    }


    if (
        property.houses > 0 ||
        property.hotel
    ) {

        alert(
            'Власність з будинками не можна продати. Спочатку продайте будівлі.'
        );

        return;

    }


    price =
        Math.max(
            0,
            Math.floor(
                Number(price) || 0
            )
        );


    if (
        buyer.money < price
    ) {

        alert(
            'У покупця недостатньо коштів.'
        );

        return;

    }


    buyer.money -=
        price;

    seller.money +=
        price;


    property.owner =
        buyer.id;


    addLog(
        `🤝 ${seller.name} продав ${T[index].n} гравцю ${buyer.name} за ${money(price)}`
    );


    await saveAndRender();

}


// ============================================================
// КЕРУВАННЯ МАЙНОМ
// ============================================================

function managementList(
    playerId
) {

    return ownedProperties(
        playerId
    ).map(
        index => {

            const tile =
                T[index];

            const property =
                S.properties[index];


            return {

                index,

                name:
                    tile.n,

                group:
                    tile.group,

                price:
                    tile.price,

                houses:
                    property.houses || 0,

                hotel:
                    property.hotel || 0,

                mortgaged:
                    !!property.mortgaged,

                rent:
                    calculateRent(
                        index,
                        playerId
                    )

            };

        }
    );

}


// ============================================================
// РЕНДЕР ДОШКИ
// ============================================================

function boardIndex(
    index
) {

    return `tile-${index}`;

}


function tileOwnerColor(
    index
) {

    const owner =
        S.properties[index]?.owner;


    if (!owner) {
        return '';
    }


    return getPlayer(owner)?.color || '';

}


function tileHtml(
    index
) {

    const tile =
        T[index];


    const property =
        S.properties[index];


    const owner =
        property?.owner
            ? getPlayer(
                property.owner
            )
            : null;


    const houses =
        Number(
            property?.houses || 0
        );


    const hotel =
        Number(
            property?.hotel || 0
        );


    const mortgaged =
        !!property?.mortgaged;


    let buildingHtml = '';


    if (hotel) {

        buildingHtml =
            `<span class="building hotel">🏨</span>`;

    } else if (houses > 0) {

        buildingHtml =
            `<span class="buildings">${
                '🏠'.repeat(
                    Math.min(
                        houses,
                        4
                    )
                )
            }</span>`;

    }


    const ownerHtml =
        owner
            ? `
                <span
                    class="owner-dot"
                    style="background:${esc(owner.color)}"
                    title="${esc(owner.name)}"
                ></span>
            `
            : '';


    const mortgageHtml =
        mortgaged
            ? `<span class="mortgage-mark">🏦</span>`
            : '';


    const group =
        tile.group
            ? GROUPS[tile.group]
            : null;


    const groupColor =
        group?.color || 'transparent';


    return `
        <div
            class="board-tile ${esc(tile.type)} ${
                mortgaged ? 'mortgaged' : ''
            }"
            id="${boardIndex(index)}"
            data-index="${index}"
        >

            ${
                group
                    ? `
                        <div
                            class="group-strip"
                            style="background:${esc(groupColor)}"
                        ></div>
                    `
                    : ''
            }

            <div class="tile-icon">
                ${esc(tile.icon || '')}
            </div>

            <div class="tile-name">
                ${esc(tile.n)}
            </div>

            ${
                tile.price
                    ? `
                        <div class="tile-price">
                            ${money(tile.price)}
                        </div>
                    `
                    : ''
            }

            ${ownerHtml}

            ${buildingHtml}

            ${mortgageHtml}

        </div>
    `;

}


// ============================================================
// РОЗСТАНОВКА ДОШКИ
// ============================================================

function renderBoard() {

    const board =
        $('board');

    if (!board) {
        return;
    }


    board.innerHTML =
        T.map(
            (_, index) =>
                tileHtml(index)
        ).join('');


    // --------------------------------------------------------
    // ГРАВЦІ НА КЛІТИНКАХ
    // --------------------------------------------------------

    for (
        const id of S.order
    ) {

        const player =
            getPlayer(id);


        if (
            !player ||
            player.bankrupt
        ) {
            continue;
        }


        const tile =
            document.querySelector(
                `#${boardIndex(player.pos)}`
            );


        if (!tile) {
            continue;
        }


        const token =
            document.createElement(
                'div'
            );


        token.className =
            'player-token';


        token.dataset.player =
            id;


        token.style.background =
            player.color;


        token.style.color =
            '#000';


        token.textContent =
            (
                player.name ||
                '?'
            )
            .trim()
            .charAt(0)
            .toUpperCase();


        token.title =
            player.name;


        tile.appendChild(
            token
        );

    }

}


// ============================================================
// ГРАВЦІ
// ============================================================

function renderPlayers() {

    const box =
        $('players');

    if (!box) {
        return;
    }


    box.innerHTML =
        S.order
            .map(
                (id, orderIndex) => {

                    const p =
                        getPlayer(id);


                    if (!p) {
                        return '';
                    }


                    const stats =
                        playerStats(id);


                    const active =
                        id ===
                        S.order[S.cur];


                    return `
                        <div
                            class="player-card ${
                                active
                                    ? 'active'
                                    : ''
                            } ${
                                p.bankrupt
                                    ? 'bankrupt'
                                    : ''
                            }"
                            data-player="${esc(id)}"
                        >

                            <div
                                class="player-avatar"
                                style="background:${esc(p.color)}"
                            >
                                ${esc(
                                    (
                                        p.name ||
                                        '?'
                                    )
                                    .charAt(0)
                                    .toUpperCase()
                                )}
                            </div>


                            <div class="player-info">

                                <div class="player-name">
                                    ${esc(p.name)}

                                    ${
                                        id === UID
                                            ? '<span class="you">ВИ</span>'
                                            : ''
                                    }

                                    ${
                                        active
                                            ? '<span class="turn-dot">●</span>'
                                            : ''
                                    }

                                </div>


                                <div class="player-money">
                                    ${money(p.money)}
                                </div>


                                <div class="player-mini">

                                    🏠 ${stats?.properties || 0}

                                    &nbsp;

                                    ⭐ ${stats?.monopolies || 0}

                                </div>

                            </div>

                        </div>
                    `;

                }
            )
            .join('');

}


// ============================================================
// ЛОГ
// ============================================================

function renderLog() {

    const box =
        $('log');

    if (!box) {
        return;
    }


    const logs =
        S.log || [];


    box.innerHTML =
        logs
            .slice(-30)
            .map(
                item => `
                    <div class="log-line">
                        ${esc(item.text)}
                    </div>
                `
            )
            .join('');


    box.scrollTop =
        box.scrollHeight;

}


// ============================================================
// СТАН ГРИ
// ============================================================

function phaseText() {

    if (!S.started) {

        return 'Очікування гравців';

    }


    if (
        S.phase === 'finished'
    ) {

        return 'Гру завершено';

    }


    if (
        S.phase === 'auction'
    ) {

        return '🔨 Аукціон';

    }


    if (
        S.phase === 'trade'
    ) {

        return '🤝 Торгівля';

    }


    if (
        S.phase === 'debt'
    ) {

        return '⚠️ Потрібно погасити борг';

    }


    if (
        S.phase === 'buy'
    ) {

        return '🏠 Оберіть дію з власністю';

    }


    if (
        S.phase === 'jail'
    ) {

        return '🔒 Ви у в’язниці';

    }


    if (
        S.phase === 'moving'
    ) {

        return '🚶 Рух';

    }


    if (
        S.phase === 'wait'
    ) {

        return '⏳ Очікування';

    }


    return '🎲 Киньте кубики';

}


// ============================================================
// DICE
// ============================================================

function renderDice() {

    const d1 =
        $('dice1');

    const d2 =
        $('dice2');


    if (d1) {

        d1.textContent =
            S.dice?.[0] || '⚄';

    }


    if (d2) {

        d2.textContent =
            S.dice?.[1] || '⚄';

    }

}


// ============================================================
// ГОЛОВНА КНОПКА
// ============================================================

function renderMainButton() {

    const button =
        $('rollBtn');

    if (!button) {
        return;
    }


    button.disabled =
        true;


    button.textContent =
        'КИНУТИ КУБИКИ';


    if (isSpectator) {

        button.textContent =
            'СПОСТЕРІГАЧ';

        return;

    }


    if (!S.started) {

        button.textContent =
            'ГРУ ЩЕ НЕ РОЗПОЧАТО';

        return;

    }


    if (
        S.phase === 'finished'
    ) {

        button.textContent =
            'ГРУ ЗАВЕРШЕНО';

        return;

    }


    if (
        S.phase === 'debt'
    ) {

        button.textContent =
            '⚠️ ПОТРІБНО ПОГАСИТИ БОРГ';

        return;

    }


    if (
        S.phase === 'auction'
    ) {

        button.textContent =
            '🔨 АУКЦІОН';

        return;

    }


    if (
        S.phase === 'trade'
    ) {

        button.textContent =
            '🤝 ТОРГІВЛЯ';

        return;

    }


    if (
        S.order[S.cur] !== UID
    ) {

        const p =
            currentPlayer();


        button.textContent =
            `ХІД: ${p?.name || ''}`;

        return;

    }


    if (
        S.phase === 'buy'
    ) {

        button.textContent =
            '🏠 ОБЕРІТЬ ДІЮ';

        return;

    }


    if (
        S.phase === 'jail'
    ) {

        button.disabled =
            false;

        button.textContent =
            '🎲 КИНУТИ У В’ЯЗНИЦІ';

        return;

    }


    if (
        S.phase === 'roll'
    ) {

        button.disabled =
            false;

        button.textContent =
            S.doubles > 0
                ? '🎲 ДОДАТКОВИЙ ХІД'
                : '🎲 КИНУТИ КУБИКИ';

    }

}


// ============================================================
// КНОПКИ КУПІВЛІ
// ============================================================

function renderBuyPanel() {

    const box =
        $('buyPanel');

    if (!box) {
        return;
    }


    box.innerHTML =
        '';


    if (
        S.phase !== 'buy' ||
        !isMyTurn()
    ) {

        return;

    }


    const p =
        currentPlayer();

    const index =
        p?.pos;


    const tile =
        T[index];


    if (
        !tile ||
        tile.type !== 'property'
    ) {

        return;

    }


    const property =
        S.properties[index];


    if (
        property?.owner
    ) {

        return;

    }


    box.innerHTML = `

        <div class="action-panel">

            <div class="action-title">
                🏠 ${esc(tile.n)}
            </div>

            <div class="action-price">
                ${money(tile.price)}
            </div>


            <div class="action-buttons">

                <button
                    class="ac primary"
                    data-action="buy"
                    data-index="${index}"
                >
                    КУПИТИ
                </button>


                <button
                    class="ac"
                    data-action="auction"
                    data-index="${index}"
                >
                    🔨 АУКЦІОН
                </button>

            </div>

        </div>

    `;

}


// ============================================================
// КНОПКИ В'ЯЗНИЦІ
// ============================================================

function renderJailPanel() {

    const box =
        $('jailPanel');

    if (!box) {
        return;
    }


    box.innerHTML =
        '';


    if (
        !isMyTurn()
    ) {

        return;

    }


    const p =
        currentPlayer();


    if (
        !p?.jail
    ) {

        return;

    }


    box.innerHTML = `

        <div class="action-panel">

            <div class="action-title">
                🔒 ВИ У В’ЯЗНИЦІ
            </div>

            <div class="action-text">
                Спроба ${Math.min(
                    3,
                    Number(
                        p.jailTurns || 0
                    ) + 1
                )} з 3
            </div>


            <div class="action-buttons">

                <button
                    class="ac primary"
                    data-action="jail-roll"
                >
                    🎲 КИНУТИ ДУБЛЬ
                </button>


                <button
                    class="ac"
                    data-action="jail-pay"
                >
                    💰 СПЛАТИТИ ${money(JAIL_FINE)}
                </button>

            </div>

        </div>

    `;

}


// ============================================================
// ПАНЕЛЬ БОРГУ
// ============================================================

function renderDebtPanel() {

    const box =
        $('debtPanel');

    if (!box) {
        return;
    }


    box.innerHTML =
        '';


    if (
        S.phase !== 'debt' ||
        !S.debt
    ) {

        return;

    }


    const debt =
        S.debt;


    const debtor =
        getPlayer(
            debt.debtor
        );


    if (!debtor) {
        return;
    }


    if (
        debtor.id !== UID
    ) {

        box.innerHTML = `

            <div class="action-panel debt">

                <div class="action-title">
                    ⚠️ БОРГ
                </div>

                <div class="action-text">
                    ${esc(debtor.name)}
                    має погасити
                    ${money(debt.amount)}
                </div>

            </div>

        `;

        return;

    }


    box.innerHTML = `

        <div class="action-panel debt">

            <div class="action-title">
                ⚠️ ПОТРІБНО ПОГАСИТИ БОРГ
            </div>

            <div class="action-price">
                ${money(debt.amount)}
            </div>


            <div class="action-buttons">

                ${
                    debtor.money >= debt.amount
                        ? `
                            <button
                                class="ac primary"
                                data-action="pay-debt"
                            >
                                💰 ПОГАСИТИ БОРГ
                            </button>
                        `
                        : ''
                }


                <button
                    class="ac"
                    data-action="debt-assets"
                >
                    🏠 МОЄ МАЙНО
                </button>


                <button
                    class="ac danger"
                    data-action="bankrupt"
                >
                    💀 БАНКРУТСТВО
                </button>

            </div>

        </div>

    `;

}


// ============================================================
// ПАНЕЛЬ АУКЦІОНУ
// ============================================================

function renderAuctionPanel() {

    const box =
        $('auctionPanel');

    if (!box) {
        return;
    }


    box.innerHTML =
        '';


    if (
        S.phase !== 'auction' ||
        !S.auction
    ) {

        return;

    }


    const auction =
        S.auction;


    const tile =
        T[auction.property];


    const highest =
        auction.highestBidder
            ? getPlayer(
                auction.highestBidder
            )
            : null;


    const myPassed =
        auction.passed.includes(
            UID
        );


    box.innerHTML = `

        <div class="action-panel auction">

            <div class="action-title">
                🔨 АУКЦІОН
            </div>

            <div class="action-text">
                ${esc(tile.n)}
            </div>


            <div class="auction-current">

                Поточна ставка:

                <strong>
                    ${money(
                        auction.highestBid || 0
                    )}
                </strong>

            </div>


            ${
                highest
                    ? `
                        <div class="auction-player">
                            👑 ${esc(highest.name)}
                        </div>
                    `
                    : ''
            }


            ${
                !myPassed
                    ? `
                        <div class="auction-buttons">

                            <button
                                class="ac"
                                data-action="bid"
                                data-bid="100"
                            >
                                +100
                            </button>

                            <button
                                class="ac"
                                data-action="bid"
                                data-bid="500"
                            >
                                +500
                            </button>

                            <button
                                class="ac"
                                data-action="bid"
                                data-bid="1000"
                            >
                                +1000
                            </button>

                            <button
                                class="ac danger"
                                data-action="auction-pass"
                            >
                                ПАС
                            </button>

                        </div>
                    `
                    : `
                        <div class="auction-pass">
                            Ви вийшли з аукціону
                        </div>
                    `
            }

        </div>

    `;

}


// ============================================================
// ПАНЕЛЬ ТОРГІВЛІ
// ============================================================

function renderTradePanel() {

    const box =
        $('tradePanel');

    if (!box) {
        return;
    }


    box.innerHTML =
        '';


    if (
        S.phase !== 'trade' ||
        !S.trade
    ) {

        return;

    }


    const trade =
        S.trade;


    const from =
        getPlayer(
            trade.from
        );

    const to =
        getPlayer(
            trade.to
        );


    if (
        !from ||
        !to
    ) {
        return;
    }


    const mine =
        trade.from === UID
            ? trade.fromProperties
            : trade.toProperties;


    const theirs =
        trade.from === UID
            ? trade.toProperties
            : trade.fromProperties;


    const myMoney =
        trade.from === UID
            ? trade.fromMoney
            : trade.toMoney;


    const theirMoney =
        trade.from === UID
            ? trade.toMoney
            : trade.fromMoney;


    const myTurn =
        trade.from === UID;


    box.innerHTML = `

        <div class="action-panel trade">

            <div class="action-title">
                🤝 ТОРГІВЛЯ
            </div>


            <div class="trade-players">

                <div>
                    <strong>
                        ${esc(from.name)}
                    </strong>

                    <div>
                        ${money(
                            trade.fromMoney || 0
                        )}
                    </div>
                </div>


                <div class="trade-arrow">
                    ⇄
                </div>


                <div>
                    <strong>
                        ${esc(to.name)}
                    </strong>

                    <div>
                        ${money(
                            trade.toMoney || 0
                        )}
                    </div>
                </div>

            </div>


            <div class="trade-assets">

                <div class="trade-side">

                    <div class="trade-label">
                        ${esc(from.name)}
                    </div>


                    ${
                        trade.fromProperties
                            .map(
                                index => `
                                    <div class="trade-property selected">
                                        🏠 ${esc(T[index].n)}
                                    </div>
                                `
                            )
                            .join('')
                    }

                </div>


                <div class="trade-side">

                    <div class="trade-label">
                        ${esc(to.name)}
                    </div>


                    ${
                        trade.toProperties
                            .map(
                                index => `
                                    <div class="trade-property selected">
                                        🏠 ${esc(T[index].n)}
                                    </div>
                                `
                            )
                            .join('')
                    }

                </div>

            </div>


            ${
                myTurn
                    ? `

                        <div class="trade-my-properties">

                            <div class="trade-label">
                                Моє майно
                            </div>

                            ${
                                ownedProperties(UID)
                                    .filter(
                                        index => {
                                            const p =
                                                S.properties[index];

                                            return (
                                                p.houses === 0 &&
                                                !p.hotel
                                            );
                                        }
                                    )
                                    .map(
                                        index => `
                                            <button
                                                class="trade-property-btn ${
                                                    mine.includes(index)
                                                        ? 'selected'
                                                        : ''
                                                }"
                                                data-action="trade-property"
                                                data-index="${index}"
                                            >
                                                ${
                                                    mine.includes(index)
                                                        ? '✓'
                                                        : '+'
                                                }

                                                ${esc(T[index].n)}
                                            </button>
                                        `
                                    )
                                    .join('')
                            }

                        </div>


                        <div class="trade-money">

                            <label>
                                Гроші для передачі
                            </label>

                            <input
                                id="tradeMoneyInput"
                                type="number"
                                min="0"
                                max="${getPlayer(UID)?.money || 0}"
                                value="${myMoney || 0}"
                            >

                            <button
                                class="ac"
                                data-action="trade-money"
                            >
                                ОНОВИТИ
                            </button>

                        </div>

                        <div class="action-buttons">

                            <button
                                class="ac danger"
                                data-action="trade-cancel"
                            >
                                СКАСУВАТИ
                            </button>

                        </div>

                    `
                    : `

                        <div class="trade-wait">

                            ${esc(from.name)}
                            очікує вашої відповіді.

                        </div>


                        <div class="action-buttons">

                            <button
                                class="ac primary"
                                data-action="trade-accept"
                            >
                                ✓ ПРИЙНЯТИ
                            </button>


                            <button
                                class="ac danger"
                                data-action="trade-reject"
                            >
                                ✕ ВІДХИЛИТИ
                            </button>

                        </div>

                    `
            }

        </div>

    `;

}


// ============================================================
// ПАНЕЛЬ МАЙНА
// ============================================================

function renderPropertiesPanel() {

    const box =
        $('propertiesPanel');

    if (!box) {
        return;
    }


    if (
        !S.started
    ) {

        box.innerHTML =
            '';

        return;

    }


    const properties =
        managementList(
            UID
        );


    if (!properties.length) {

        box.innerHTML = `

            <div class="property-empty">
                🏠 У вас ще немає власності
            </div>

        `;

        return;

    }


    box.innerHTML = `

        <div class="property-panel">

            <div class="property-title">
                🏠 МОЄ МАЙНО
            </div>


            <div class="property-list">

                ${
                    properties
                        .map(
                            property => {

                                const tile =
                                    T[property.index];


                                const group =
                                    GROUPS[
                                        tile.group
                                    ];


                                return `

                                    <div
                                        class="property-row ${
                                            property.mortgaged
                                                ? 'mortgaged'
                                                : ''
                                        }"
                                    >

                                        <div class="property-main">

                                            <div
                                                class="property-color"
                                                style="background:${
                                                    esc(
                                                        group?.color ||
                                                        '#888'
                                                    )
                                                }"
                                            ></div>


                                            <div>

                                                <div class="property-name">
                                                    ${esc(property.name)}
                                                </div>


                                                <div class="property-meta">

                                                    ${
                                                        property.hotel
                                                            ? '🏨 Готель'
                                                            : property.houses
                                                                ? `🏠 ${property.houses}`
                                                                : 'Без будинків'
                                                    }


                                                    ${
                                                        property.mortgaged
                                                            ? ' · 🏦 Застава'
                                                            : ''
                                                    }

                                                </div>

                                            </div>

                                        </div>


                                        <div class="property-actions">

                                            ${
                                                !property.mortgaged
                                                    ? `
                                                        ${
                                                            property.houses < 4 &&
                                                            !property.hotel
                                                                ? `
                                                                    <button
                                                                        class="mini-btn"
                                                                        data-action="build"
                                                                        data-index="${property.index}"
                                                                    >
                                                                        +
                                                                    </button>
                                                                `
                                                                : ''
                                                        }


                                                        ${
                                                            property.houses > 0 ||
                                                            property.hotel
                                                                ? `
                                                                    <button
                                                                        class="mini-btn"
                                                                        data-action="sell-building"
                                                                        data-index="${property.index}"
                                                                    >
                                                                        −
                                                                    </button>
                                                                `
                                                                : ''
                                                        }


                                                        ${
                                                            property.houses === 0 &&
                                                            !property.hotel
                                                                ? `
                                                                    <button
                                                                        class="mini-btn"
                                                                        data-action="mortgage"
                                                                        data-index="${property.index}"
                                                                    >
                                                                        🏦
                                                                    </button>
                                                                `
                                                                : ''
                                                        }
                                                    `
                                                    : `
                                                        <button
                                                            class="mini-btn"
                                                            data-action="unmortgage"
                                                            data-index="${property.index}"
                                                        >
                                                            🔓
                                                        </button>
                                                    `
                                            }

                                        </div>

                                    </div>

                                `;

                            }
                        )
                        .join('')
                }

            </div>

        </div>

    `;

}


// ============================================================
// ПАНЕЛЬ ІНШИХ ГРАВЦІВ
// ============================================================

function renderOtherPlayersPanel() {

    const box =
        $('otherPlayersPanel');

    if (!box) {
        return;
    }


    const others =
        S.order
            .filter(
                id =>
                    id !== UID &&
                    !S.players[id]?.bankrupt
            );


    box.innerHTML = `

        <div class="players-action-panel">

            <div class="property-title">
                🤝 ГРАВЦІ
            </div>


            ${
                others.length
                    ? others
                        .map(
                            id => {

                                const p =
                                    getPlayer(id);

                                const stats =
                                    playerStats(id);


                                return `

                                    <div class="other-player-row">

                                        <div class="other-player-info">

                                            <span
                                                class="other-player-dot"
                                                style="background:${esc(p.color)}"
                                            ></span>

                                            <span>
                                                ${esc(p.name)}
                                            </span>

                                        </div>


                                        ${
                                            isMyTurn()
                                                ? `
                                                    <button
                                                        class="mini-btn"
                                                        data-action="trade-player"
                                                        data-player="${esc(id)}"
                                                    >
                                                        🤝
                                                    </button>
                                                `
                                                : ''
                                        }

                                    </div>

                                `;

                            }
                        )
                        .join('')
                    : `
                        <div class="property-empty">
                            Немає інших активних гравців
                        </div>
                    `
            }

        </div>

    `;

}


// ============================================================
// ЛОБІ
// ============================================================

function renderLobby() {

    const lobby =
        $('lobby');

    if (!lobby) {
        return;
    }


    const count =
        S.order.length;


    lobby.innerHTML = `

        <div class="lobby-card">

            <div class="lobby-title">
                🇺🇦 МОНОПОЛІЯ УКРАЇНА
            </div>


            <div class="lobby-room">
                Кімната:
                <strong>
                    ${esc(ROOM_ID)}
                </strong>
            </div>


            <div class="lobby-count">
                👥 ${count}/${MAX_PLAYERS}
            </div>


            <div class="lobby-players">

                ${
                    S.order
                        .map(
                            id => {

                                const p =
                                    getPlayer(id);

                                if (!p) {
                                    return '';
                                }


                                return `

                                    <div class="lobby-player">

                                        <span
                                            class="lobby-dot"
                                            style="background:${esc(p.color)}"
                                        ></span>

                                        ${esc(p.name)}

                                    </div>

                                `;

                            }
                        )
                        .join('')
                }

            </div>


            ${
                !isSpectator
                    ? `

                        <button
                            class="ac primary lobby-start"
                            data-action="start-game"
                            ${
                                count < 2
                                    ? 'disabled'
                                    : ''
                            }
                        >
                            🎲 ПОЧАТИ ГРУ
                        </button>

                    `
                    : `
                        <button
                            class="ac lobby-start"
                            data-action="join-game"
                        >
                            ПРИЄДНАТИСЯ
                        </button>
                    `
            }

        </div>

    `;

}


// ============================================================
// PROFILE MODAL
// ============================================================

function showProfile(
    id = UID
) {

    const p =
        getPlayer(id);

    if (!p) {
        return;
    }


    const stats =
        playerStats(id);


    const properties =
        managementList(id);


    const modal =
        $('profileModal');

    if (!modal) {
        return;
    }


    modal.innerHTML = `

        <div class="modal-backdrop"
             data-action="close-profile">

            <div
                class="profile-modal"
                onclick="event.stopPropagation()"
            >

                <button
                    class="modal-close"
                    data-action="close-profile"
                >
                    ✕
                </button>


                <div
                    class="profile-avatar-large"
                    style="background:${esc(p.color)}"
                >
                    ${esc(
                        (
                            p.name ||
                            '?'
                        )
                        .charAt(0)
                        .toUpperCase()
                    )}
                </div>


                <div class="profile-name">
                    ${esc(p.name)}
                </div>


                ${
                    p.username
                        ? `
                            <div class="profile-username">
                                @${esc(p.username)}
                            </div>
                        `
                        : ''
                }


                <div class="profile-money">
                    ${money(p.money)}
                </div>


                <div class="profile-stats">

                    <div class="profile-stat">
                        <span>Власність</span>
                        <strong>
                            ${stats.properties}
                        </strong>
                    </div>


                    <div class="profile-stat">
                        <span>Монополії</span>
                        <strong>
                            ${stats.monopolies}
                        </strong>
                    </div>


                    <div class="profile-stat">
                        <span>Будинки</span>
                        <strong>
                            ${stats.houses}
                        </strong>
                    </div>


                    <div class="profile-stat">
                        <span>Готелі</span>
                        <strong>
                            ${stats.hotels}
                        </strong>
                    </div>


                    <div class="profile-stat">
                        <span>Капітал</span>
                        <strong>
                            ${money(stats.netWorth)}
                        </strong>
                    </div>

                </div>


                <div class="profile-properties">

                    <div class="profile-section-title">
                        🏠 Власності
                    </div>


                    ${
                        properties.length
                            ? properties
                                .map(
                                    property => `

                                        <div class="profile-property">

                                            <div>

                                                <strong>
                                                    ${esc(property.name)}
                                                </strong>

                                                <small>
                                                    ${esc(
                                                        GROUPS[property.group]?.name ||
                                                        ''
                                                    )}

                                                    ${
                                                        property.hotel
                                                            ? ' · 🏨'
                                                            : property.houses
                                                                ? ` · 🏠 ${property.houses}`
                                                                : ''
                                                    }

                                                    ${
                                                        property.mortgaged
                                                            ? ' · 🏦'
                                                            : ''
                                                    }

                                                </small>

                                            </div>

                                            <div>
                                                ${money(property.price)}
                                            </div>

                                        </div>

                                    `
                                )
                                .join('')
                            : `
                                <div class="property-empty">
                                    Немає власності
                                </div>
                            `
                    }

                </div>


                ${
                    id !== UID &&
                    isMyTurn()
                        ? `

                            <button
                                class="ac primary profile-trade-btn"
                                data-action="trade-player"
                                data-player="${esc(id)}"
                            >
                                🤝 ЗАПРОПОНУВАТИ ТОРГІВЛЮ
                            </button>

                        `
                        : ''
                }

            </div>

        </div>

    `;


    modal.classList.add(
        'open'
    );

}


// ============================================================
// ЗАКРИТИ PROFILE
// ============================================================

function closeProfile() {

    const modal =
        $('profileModal');

    if (!modal) {
        return;
    }


    modal.classList.remove(
        'open'
    );

}


// ============================================================
// RENDER
// ============================================================

function render() {

    normalize();


    // --------------------------------------------------------
    // BOARD
    // --------------------------------------------------------

    renderBoard();


    // --------------------------------------------------------
    // PLAYERS
    // --------------------------------------------------------

    renderPlayers();


    // --------------------------------------------------------
    // LOG
    // --------------------------------------------------------

    renderLog();


    // --------------------------------------------------------
    // DICE
    // --------------------------------------------------------

    renderDice();


    // --------------------------------------------------------
    // PANELS
    // --------------------------------------------------------

    renderBuyPanel();

    renderJailPanel();

    renderDebtPanel();

    renderAuctionPanel();

    renderTradePanel();

    renderPropertiesPanel();

    renderOtherPlayersPanel();


    // --------------------------------------------------------
    // MAIN BUTTON
    // --------------------------------------------------------

    renderMainButton();


    // --------------------------------------------------------
    // STATUS
    // --------------------------------------------------------

    const status =
        $('gameStatus');

    if (status) {

        status.textContent =
            phaseText();

    }


    // --------------------------------------------------------
    // ROOM
    // --------------------------------------------------------

    const room =
        $('roomId');

    if (room) {

        room.textContent =
            ROOM_ID;

    }


    // --------------------------------------------------------
    // CURRENT PLAYER
    // --------------------------------------------------------

    const current =
        $('currentPlayer');

    if (current) {

        const p =
            currentPlayer();

        current.textContent =
            p?.name ||
            '—';

    }


    // --------------------------------------------------------
    // MONEY
    // --------------------------------------------------------

    const moneyEl =
        $('myMoney');

    if (moneyEl) {

        moneyEl.textContent =
            money(
                getPlayer(UID)?.money || 0
            );

    }


    // --------------------------------------------------------
    // LOBBY
    // --------------------------------------------------------

    const lobby =
        $('lobby');

    const game =
        $('game');


    if (
        lobby &&
        game
    ) {

        if (!S.started) {

            lobby.style.display =
                'flex';

            game.style.display =
                'none';


            renderLobby();

        } else {

            lobby.style.display =
                'none';

            game.style.display =
                'block';

        }

    }

}


// ============================================================
// CLICK EVENTS
// ============================================================

document.addEventListener(
    'click',
    async event => {

        const target =
            event.target.closest(
                '[data-action]'
            );


        if (!target) {
            return;
        }


        const action =
            target.dataset.action;


        const index =
            target.dataset.index !== undefined
                ? Number(
                    target.dataset.index
                )
                : null;


        try {

            switch (action) {

                // ------------------------------------------------
                // GAME
                // ------------------------------------------------

                case 'start-game':

                    await startGame();

                    break;


                case 'join-game':

                    isSpectator = false;

                    await enter(false);

                    break;


                case 'roll':

                    if (
                        S.phase === 'jail'
                    ) {

                        await rollInJail();

                    } else {

                        await rollDice();

                    }

                    break;


                // ------------------------------------------------
                // BUY
                // ------------------------------------------------

                case 'buy':

                    await buyProperty(
                        index
                    );

                    break;


                case 'auction':

                    await declineProperty(
                        index
                    );

                    break;


                // ------------------------------------------------
                // BUILD
                // ------------------------------------------------

                case 'build':

                    await build(
                        index
                    );

                    break;


                case 'sell-building':

                    await sellBuilding(
                        index
                    );

                    break;


                // ------------------------------------------------
                // MORTGAGE
                // ------------------------------------------------

                case 'mortgage':

                    await mortgage(
                        index
                    );

                    break;


                case 'unmortgage':

                    await unmortgage(
                        index
                    );

                    break;


                // ------------------------------------------------
                // JAIL
                // ------------------------------------------------

                case 'jail-roll':

                    await rollInJail();

                    break;


                case 'jail-pay':

                    await payJailFine();

                    break;


                // ------------------------------------------------
                // AUCTION
                // ------------------------------------------------

                case 'bid': {

                    const currentBid =
                        Number(
                            S.auction?.highestBid || 0
                        );

                    const increment =
                        Number(
                            target.dataset.bid || 0
                        );

                    await auctionBid(
                        currentBid +
                        increment
                    );

                    break;

                }


                case 'auction-pass':

                    await auctionPass();

                    break;


                // ------------------------------------------------
                // DEBT
                // ------------------------------------------------

                case 'pay-debt':

                    await payDebt();

                    break;


                case 'debt-assets':

                    showProfile(
                        UID
                    );

                    break;


                case 'debt-sell':

                    await debtSellBuilding(
                        index
                    );

                    break;


                case 'debt-mortgage':

                    await debtMortgage(
                        index
                    );

                    break;


                case 'bankrupt':

                    if (
                        confirm(
                            'Ви впевнені, що хочете оголосити банкрутство?'
                        )
                    ) {

                        await declareBankruptcy();

                    }

                    break;


                // ------------------------------------------------
                // TRADE
                // ------------------------------------------------

                case 'trade-player':

                    await createTrade(
                        target.dataset.player
                    );

                    break;


                case 'trade-property':

                    toggleTradeProperty(
                        index
                    );

                    break;


                case 'trade-money': {

                    const input =
                        $('tradeMoneyInput');

                    const value =
                        Number(
                            input?.value || 0
                        );


                    if (
                        S.trade?.from === UID
                    ) {

                        setTradeMoney(
                            'from',
                            value
                        );

                    } else if (
                        S.trade?.to === UID
                    ) {

                        setTradeMoney(
                            'to',
                            value
                        );

                    }

                    break;

                }


                case 'trade-accept':

                    await acceptTrade();

                    break;


                case 'trade-reject':

                    await rejectTrade();

                    break;


                case 'trade-cancel':

                    await cancelTrade();

                    break;


                // ------------------------------------------------
                // PROFILE
                // ------------------------------------------------

                case 'profile':

                    showProfile(
                        target.dataset.player ||
                        UID
                    );

                    break;


                case 'close-profile':

                    closeProfile();

                    break;


                // ------------------------------------------------
                // LEAVE
                // ------------------------------------------------

                case 'leave':

                    await leaveGame();

                    break;

            }

        } catch (error) {

            console.error(
                'Action error:',
                error
            );

            alert(
                'Сталася помилка. Перевір консоль.'
            );

        }

    }
);


// ============================================================
// ДІЙСНИЙ КЛІК ПО ГРАВЦЮ
// ============================================================

document.addEventListener(
    'click',
    event => {

        const card =
            event.target.closest(
                '.player-card'
            );


        if (
            !card ||
            event.target.closest(
                '[data-action]'
            )
        ) {
            return;
        }


        const id =
            card.dataset.player;


        if (id) {

            showProfile(
                id
            );

        }

    }
);


// ============================================================
// ESC → ЗАКРИТИ МОДАЛКУ
// ============================================================

document.addEventListener(
    'keydown',
    event => {

        if (
            event.key === 'Escape'
        ) {

            closeProfile();

        }

    }
);


// ============================================================
// КЛІК ПО КЛІТИНЦІ
// ============================================================

document.addEventListener(
    'click',
    event => {

        const tile =
            event.target.closest(
                '.board-tile'
            );


        if (!tile) {
            return;
        }


        const index =
            Number(
                tile.dataset.index
            );


        if (
            !Number.isFinite(index)
        ) {
            return;
        }


        const property =
            S.properties[index];


        if (
            property?.owner
        ) {

            showProfile(
                property.owner
            );

        }

    }
);


// ============================================================
// ОСНОВНА КНОПКА
// ============================================================

function setupRollButton() {

    const button =
        $('rollBtn');


    if (!button) {
        return;
    }


    button.addEventListener(
        'click',
        async () => {

            if (
                S.phase === 'jail'
            ) {

                await rollInJail();

            } else {

                await rollDice();

            }

        }
    );

}


// ============================================================
// КОПІЮВАННЯ ROOM ID
// ============================================================

function setupRoomCopy() {

    const button =
        $('copyRoom');


    if (!button) {
        return;
    }


    button.addEventListener(
        'click',
        async () => {

            try {

                await navigator.clipboard.writeText(
                    ROOM_ID
                );


                button.textContent =
                    '✓ СКОПІЙОВАНО';


                setTimeout(
                    () => {

                        button.textContent =
                            'КОПІЮВАТИ';

                    },
                    1200
                );

            } catch {

                alert(
                    ROOM_ID
                );

            }

        }
    );

}


// ============================================================
// КНОПКА ПРОФІЛЮ
// ============================================================

function setupProfileButton() {

    const button =
        $('profileBtn');


    if (!button) {
        return;
    }


    button.addEventListener(
        'click',
        () => {

            showProfile(
                UID
            );

        }
    );

}


// ============================================================
// КНОПКА ВИХОДУ
// ============================================================

function setupLeaveButton() {

    const button =
        $('leaveBtn');


    if (!button) {
        return;
    }


    button.addEventListener(
        'click',
        async () => {

            await leaveGame();

        }
    );

}


// ============================================================
// ВИДАЛЕННЯ ПОВІДОМЛЕННЯ ПРО ПОМИЛКУ
// ============================================================

window.addEventListener(
    'error',
    event => {

        console.error(
            'Global error:',
            event.error
        );

    }
);


// ============================================================
// BEFORE UNLOAD
// ============================================================

window.addEventListener(
    'beforeunload',
    () => {

        // Не видаляємо гравця автоматично,
        // щоб короткий reload не ламав гру.

    }
);


// ============================================================
// ПУБЛІЧНИЙ API
// ============================================================

Object.assign(
    window,
    {

        Monopoly: {

            getState: () =>
                clone(S),

            getRoom: () =>
                ROOM_ID,

            getPlayer: id =>
                getPlayer(id),

            buyProperty:
                buyProperty,

            build:
                build,

            sellBuilding:
                sellBuilding,

            mortgage:
                mortgage,

            unmortgage:
                unmortgage,

            roll:
                rollDice,

            trade:
                createTrade

        },

        rollDice,

        buyProperty,

        build,

        sellBuilding,

        mortgage,

        unmortgage,

        payDebt,

        declareBankruptcy,

        createTrade,

        acceptTrade,

        rejectTrade,

        showProfile,

        closeProfile

    }
);


// ============================================================
// ЗАПУСК
// ============================================================

setupRollButton();

setupRoomCopy();

setupProfileButton();

setupLeaveButton();


// Спочатку підписуємося,
// потім заходимо в кімнату.
watchRoom();

enter(false);


// ============================================================
// DEBUG
// ============================================================

console.log(
    '%c🇺🇦 МОНОПОЛІЯ УКРАЇНА',
    'font-size:20px;font-weight:bold'
);

console.log(
    'ROOM:',
    ROOM_ID
);

console.log(
    'UID:',
    UID
);

console.log(
    'PLAYER:',
    USER_NAME
);
// ============================================================
// MONOPOLY UKRAINE — FINAL PATCH
// ЧАСТИНА 3/3
// ============================================================

// ------------------------------------------------------------
// ДОДАТКОВІ ЗАХИСТИ СТАНУ
// ------------------------------------------------------------

function ensurePlayerState(p) {

    if (!p) return;

    if (typeof p.money !== 'number') {
        p.money = START_MONEY;
    }

    if (typeof p.pos !== 'number') {
        p.pos = 0;
    }

    if (typeof p.jail !== 'boolean') {
        p.jail = false;
    }

    if (typeof p.jailTurns !== 'number') {
        p.jailTurns = 0;
    }

    if (typeof p.bankrupt !== 'boolean') {
        p.bankrupt = false;
    }

    if (!Array.isArray(p.cards)) {
        p.cards = [];
    }

}


function normalizePlayers() {

    if (!S.players) {
        S.players = {};
    }

    Object.values(S.players).forEach(
        p => ensurePlayerState(p)
    );

}


function normalizeProperties() {

    if (!Array.isArray(S.properties)) {
        S.properties = [];
    }

    for (
        let i = 0;
        i < T.length;
        i++
    ) {

        if (!S.properties[i]) {

            S.properties[i] = {
                owner: null,
                houses: 0,
                hotel: 0,
                mortgaged: false
            };

        }

        const p =
            S.properties[i];

        if (typeof p.houses !== 'number') {
            p.houses = 0;
        }

        if (typeof p.hotel !== 'number') {
            p.hotel = 0;
        }

        if (typeof p.mortgaged !== 'boolean') {
            p.mortgaged = false;
        }

    }

}


// ------------------------------------------------------------
// ПЕРЕВІРКА МОНОПОЛІЇ
// ------------------------------------------------------------

function isColorGroup(
    index
) {

    const tile =
        T[index];

    return !!(
        tile &&
        tile.type === 'property' &&
        tile.group
    );

}


function groupIndexes(
    group
) {

    return T
        .map(
            (tile, index) =>
                tile.group === group
                    ? index
                    : -1
        )
        .filter(
            index => index >= 0
        );

}


function ownsWholeGroup(
    playerId,
    group
) {

    const indexes =
        groupIndexes(group);

    if (!indexes.length) {
        return false;
    }

    return indexes.every(
        index =>
            S.properties[index]?.owner ===
            playerId
    );

}


function groupHasMortgage(
    group
) {

    return groupIndexes(group)
        .some(
            index =>
                S.properties[index]?.mortgaged
        );

}


function groupHasBuildings(
    group
) {

    return groupIndexes(group)
        .some(
            index => {

                const p =
                    S.properties[index];

                return (
                    p?.houses > 0 ||
                    p?.hotel
                );

            }
        );

}


// ------------------------------------------------------------
// РІВНОМІРНЕ БУДІВНИЦТВО
// ------------------------------------------------------------

function canBuildEvenly(
    index
) {

    const tile =
        T[index];

    if (
        !tile ||
        !tile.group
    ) {
        return false;
    }

    if (
        !ownsWholeGroup(
            UID,
            tile.group
        )
    ) {
        return false;
    }

    const indexes =
        groupIndexes(
            tile.group
        );

    const current =
        Number(
            S.properties[index]?.houses || 0
        ) +
        (
            S.properties[index]?.hotel
                ? 5
                : 0
        );

    const levels =
        indexes.map(
            i =>
                Number(
                    S.properties[i]?.houses || 0
                ) +
                (
                    S.properties[i]?.hotel
                        ? 5
                        : 0
                )
        );

    const minimum =
        Math.min(...levels);

    return current <= minimum + 1;

}


// ------------------------------------------------------------
// ВАРТІСТЬ БУДИНКУ
// ------------------------------------------------------------

function getHouseCost(
    index
) {

    const tile =
        T[index];

    if (!tile) {
        return 0;
    }

    if (
        HOUSE_COSTS &&
        HOUSE_COSTS[tile.group]
    ) {

        return Number(
            HOUSE_COSTS[tile.group]
        );

    }

    return Math.max(
        200,
        Math.floor(
            Number(tile.price || 0) * 0.25
        )
    );

}


// ------------------------------------------------------------
// ВАРТІСТЬ ГОТЕЛЮ
// ------------------------------------------------------------

function getHotelCost(
    index
) {

    const tile =
        T[index];

    if (!tile) {
        return 0;
    }

    if (
        HOTEL_COSTS &&
        HOTEL_COSTS[tile.group]
    ) {

        return Number(
            HOTEL_COSTS[tile.group]
        );

    }

    return getHouseCost(index);

}


// ------------------------------------------------------------
// МОЖНА БУДУВАТИ?
// ------------------------------------------------------------

function canBuild(
    index,
    playerId = UID
) {

    const property =
        S.properties[index];

    const tile =
        T[index];

    const player =
        getPlayer(playerId);

    if (
        !property ||
        !tile ||
        !player
    ) {
        return false;
    }

    if (
        tile.type !== 'property'
    ) {
        return false;
    }

    if (
        property.owner !== playerId
    ) {
        return false;
    }

    if (
        property.mortgaged
    ) {
        return false;
    }

    if (
        !ownsWholeGroup(
            playerId,
            tile.group
        )
    ) {
        return false;
    }

    if (
        groupHasMortgage(
            tile.group
        )
    ) {
        return false;
    }

    if (
        property.hotel
    ) {
        return false;
    }

    if (
        property.houses >= 4
    ) {
        return true;
    }

    if (
        !canBuildEvenly(index)
    ) {
        return false;
    }

    return true;

}


// ------------------------------------------------------------
// КУПІВЛЯ БУДИНКУ / ГОТЕЛЮ
// ------------------------------------------------------------

async function buildProperty(
    index
) {

    if (
        !isMyTurn()
    ) {

        alert(
            'Зараз не ваш хід.'
        );

        return;

    }

    const property =
        S.properties[index];

    const tile =
        T[index];

    const player =
        getPlayer(UID);

    if (
        !property ||
        !tile ||
        !player
    ) {
        return;
    }

    if (
        property.owner !== UID
    ) {

        alert(
            'Ця власність вам не належить.'
        );

        return;

    }

    if (
        property.mortgaged
    ) {

        alert(
            'Спочатку зніміть заставу.'
        );

        return;

    }

    if (
        !ownsWholeGroup(
            UID,
            tile.group
        )
    ) {

        alert(
            'Для будівництва потрібна вся група.'
        );

        return;

    }

    if (
        groupHasMortgage(
            tile.group
        )
    ) {

        alert(
            'У групі є заставлена власність.'
        );

        return;

    }

    const indexes =
        groupIndexes(
            tile.group
        );

    const levels =
        indexes.map(
            i =>
                Number(
                    S.properties[i].houses || 0
                ) +
                (
                    S.properties[i].hotel
                        ? 5
                        : 0
                )
        );

    const currentLevel =
        Number(
            property.houses || 0
        ) +
        (
            property.hotel
                ? 5
                : 0
        );

    const minimum =
        Math.min(...levels);

    if (
        currentLevel >
        minimum
    ) {

        alert(
            'Будинки потрібно будувати рівномірно.'
        );

        return;

    }

    // 4 будинки -> готель
    if (
        property.houses >= 4
    ) {

        const hotelCost =
            getHotelCost(index);

        if (
            player.money <
            hotelCost
        ) {

            alert(
                `Потрібно ${money(hotelCost)}`
            );

            return;

        }

        if (
            S.bank.hotels <= 0
        ) {

            alert(
                'У банку немає готелів.'
            );

            return;

        }

        player.money -=
            hotelCost;

        S.bank.houses +=
            4;

        S.bank.hotels -=
            1;

        property.houses = 0;
        property.hotel = 1;

        addLog(
            `🏨 ${player.name} побудував готель на ${tile.n}`
        );

        await saveAndRender();

        return;

    }

    const houseCost =
        getHouseCost(index);

    if (
        player.money <
        houseCost
    ) {

        alert(
            `Потрібно ${money(houseCost)}`
        );

        return;

    }

    if (
        S.bank.houses <= 0
    ) {

        alert(
            'У банку закінчилися будинки.'
        );

        return;

    }

    player.money -=
        houseCost;

    property.houses +=
        1;

    S.bank.houses -=
        1;

    addLog(
        `🏠 ${player.name} побудував будинок на ${tile.n}`
    );

    await saveAndRender();

}


// ------------------------------------------------------------
// ПРОДАЖ БУДІВЛІ
// ------------------------------------------------------------

async function sellBuildingProperty(
    index
) {

    if (!isMyTurn()) {
        return;
    }

    const property =
        S.properties[index];

    const tile =
        T[index];

    const player =
        getPlayer(UID);

    if (
        !property ||
        !tile ||
        !player
    ) {
        return;
    }

    if (
        property.owner !== UID
    ) {
        return;
    }

    const indexes =
        groupIndexes(
            tile.group
        );

    const levels =
        indexes.map(
            i =>
                Number(
                    S.properties[i].houses || 0
                ) +
                (
                    S.properties[i].hotel
                        ? 5
                        : 0
                )
        );

    const currentLevel =
        Number(
            property.houses || 0
        ) +
        (
            property.hotel
                ? 5
                : 0
        );

    const maximum =
        Math.max(...levels);

    if (
        currentLevel <
        maximum
    ) {

        alert(
            'Будівлі потрібно продавати рівномірно.'
        );

        return;

    }

    // Готель -> 4 будинки
    if (
        property.hotel
    ) {

        if (
            S.bank.houses < 4
        ) {

            alert(
                'У банку недостатньо будинків для обміну готелю.'
            );

            return;

        }

        const refund =
            Math.floor(
                getHotelCost(index) / 2
            ) +
            (
                getHouseCost(index) * 4 / 2
            );

        player.money +=
            Math.floor(refund);

        property.hotel = 0;
        property.houses = 4;

        S.bank.hotels += 1;
        S.bank.houses -= 4;

        addLog(
            `🏨 ${player.name} продав готель на ${tile.n}`
        );

        await saveAndRender();

        return;

    }

    if (
        property.houses <= 0
    ) {
        return;
    }

    const refund =
        Math.floor(
            getHouseCost(index) / 2
        );

    player.money +=
        refund;

    property.houses -=
        1;

    S.bank.houses +=
        1;

    addLog(
        `🏠 ${player.name} продав будинок на ${tile.n}`
    );

    await saveAndRender();

}


// ------------------------------------------------------------
// ЗАСТАВА
// ------------------------------------------------------------

function mortgageValue(
    index
) {

    const tile =
        T[index];

    if (!tile) {
        return 0;
    }

    return Math.floor(
        Number(
            tile.price || 0
        ) / 2
    );

}


function canMortgageProperty(
    index,
    playerId = UID
) {

    const property =
        S.properties[index];

    const tile =
        T[index];

    if (
        !property ||
        !tile
    ) {
        return false;
    }

    if (
        property.owner !== playerId
    ) {
        return false;
    }

    if (
        property.mortgaged
    ) {
        return false;
    }

    if (
        property.houses > 0 ||
        property.hotel
    ) {
        return false;
    }

    if (
        groupHasBuildings(
            tile.group
        )
    ) {
        return false;
    }

    return true;

}


async function mortgageProperty(
    index
) {

    if (
        !isMyTurn()
    ) {
        return;
    }

    if (
        !canMortgageProperty(
            index,
            UID
        )
    ) {

        alert(
            'Цю власність зараз не можна заставити.'
        );

        return;

    }

    const player =
        getPlayer(UID);

    const property =
        S.properties[index];

    const value =
        mortgageValue(index);

    property.mortgaged =
        true;

    player.money +=
        value;

    addLog(
        `🏦 ${player.name} заставив ${T[index].n} за ${money(value)}`
    );

    await saveAndRender();

}


// ------------------------------------------------------------
// ЗНЯТТЯ ЗАСТАВИ
// ------------------------------------------------------------

async function unmortgageProperty(
    index
) {

    if (
        !isMyTurn()
    ) {
        return;
    }

    const property =
        S.properties[index];

    const player =
        getPlayer(UID);

    if (
        !property ||
        property.owner !== UID
    ) {
        return;
    }

    if (
        !property.mortgaged
    ) {
        return;
    }

    const principal =
        mortgageValue(index);

    const interest =
        Math.ceil(
            principal * 0.10
        );

    const total =
        principal +
        interest;

    if (
        player.money <
        total
    ) {

        alert(
            `Потрібно ${money(total)}`
        );

        return;

    }

    player.money -=
        total;

    property.mortgaged =
        false;

    addLog(
        `🔓 ${player.name} зняв заставу з ${T[index].n}`
    );

    await saveAndRender();

}


// ------------------------------------------------------------
// РОЗРАХУНОК ОРЕНДИ
// ------------------------------------------------------------

function calculateRent(
    index,
    ownerId
) {

    const tile =
        T[index];

    const property =
        S.properties[index];

    if (
        !tile ||
        !property
    ) {
        return 0;
    }

    if (
        property.mortgaged
    ) {
        return 0;
    }

    const base =
        Number(
            tile.rent ||
            Math.floor(
                Number(tile.price || 0) * 0.10
            )
        );

    if (
        property.hotel
    ) {

        return base * 30;

    }

    const houses =
        Number(
            property.houses || 0
        );

    if (
        houses > 0
    ) {

        return base *
            (
                [1, 5, 12, 20, 30][
                    houses
                ] || 1
            );

    }

    if (
        ownsWholeGroup(
            ownerId,
            tile.group
        )
    ) {

        return base * 2;

    }

    return base;

}


// ------------------------------------------------------------
// ОПЛАТА ОРЕНДИ
// ------------------------------------------------------------

async function collectRent(
    payerId,
    index
) {

    const property =
        S.properties[index];

    if (
        !property?.owner
    ) {
        return;
    }

    if (
        property.owner === payerId
    ) {
        return;
    }

    if (
        property.mortgaged
    ) {
        return;
    }

    const payer =
        getPlayer(payerId);

    const owner =
        getPlayer(
            property.owner
        );

    if (
        !payer ||
        !owner ||
        owner.bankrupt
    ) {
        return;
    }

    const rent =
        calculateRent(
            index,
            owner.id
        );

    if (
        rent <= 0
    ) {
        return;
    }

    // Є гроші
    if (
        payer.money >= rent
    ) {

        payer.money -=
            rent;

        owner.money +=
            rent;

        addLog(
            `💰 ${payer.name} заплатив ${money(rent)} оренди ${owner.name}`
        );

        return;

    }

    // Не вистачає грошей
    const available =
        payer.money;

    payer.money = 0;

    owner.money +=
        available;

    const debt =
        rent -
        available;

    S.debt = {

        debtor:
            payer.id,

        creditor:
            owner.id,

        amount:
            debt,

        reason:
            'rent'

    };

    S.phase =
        'debt';

    addLog(
        `⚠️ ${payer.name} має борг ${money(debt)} перед ${owner.name}`
    );

}


// ------------------------------------------------------------
// БАНКОВИЙ БОРГ
// ------------------------------------------------------------

function createBankDebt(
    playerId,
    amount,
    reason
) {

    const player =
        getPlayer(playerId);

    if (!player) {
        return;
    }

    if (
        player.money >= amount
    ) {

        player.money -=
            amount;

        return;

    }

    const paid =
        player.money;

    player.money = 0;

    S.debt = {

        debtor:
            playerId,

        creditor:
            null,

        amount:
            Math.max(
                0,
                amount - paid
            ),

        reason:
            reason

    };

    S.phase =
        'debt';

}


// ------------------------------------------------------------
// БАНКРУТСТВО
// ------------------------------------------------------------

async function bankruptPlayer() {

    if (!S.debt) {
        return;
    }

    const debt =
        S.debt;

    if (
        debt.debtor !== UID
    ) {
        return;
    }

    const debtor =
        getPlayer(UID);

    if (!debtor) {
        return;
    }

    const creditor =
        debt.creditor
            ? getPlayer(
                debt.creditor
            )
            : null;

    const properties =
        ownedProperties(UID);


    // ========================================================
    // БОРГ ГРАВЦЮ
    // ========================================================

    if (creditor) {

        // Передаємо гроші
        if (
            debtor.money > 0
        ) {

            creditor.money +=
                debtor.money;

            debtor.money = 0;

        }


        for (
            const index of properties
        ) {

            const property =
                S.properties[index];

            if (!property) {
                continue;
            }


            // Будинки / готель
            if (
                property.hotel
            ) {

                const refund =
                    Math.floor(
                        getHotelCost(index) / 2
                    ) +
                    (
                        getHouseCost(index) *
                        4 /
                        2
                    );

                creditor.money +=
                    Math.floor(refund);

                S.bank.hotels += 1;
                S.bank.houses += 4;

            }
            else if (
                property.houses > 0
            ) {

                creditor.money +=
                    Math.floor(
                        getHouseCost(index) / 2
                    ) *
                    property.houses;

                S.bank.houses +=
                    property.houses;

            }


            property.houses =
                0;

            property.hotel =
                0;


            // Передаємо власність
            property.owner =
                creditor.id;

        }


        addLog(
            `💀 ${debtor.name} збанкрутував. Активи отримав ${creditor.name}`
        );

    }

    // ========================================================
    // БОРГ БАНКУ
    // ========================================================

    else {

        for (
            const index of properties
        ) {

            const property =
                S.properties[index];

            if (!property) {
                continue;
            }

            // Будівлі повертаються банку
            if (
                property.houses > 0
            ) {

                debtor.money +=
                    Math.floor(
                        getHouseCost(index) / 2
                    ) *
                    property.houses;

                S.bank.houses +=
                    property.houses;

            }

            if (
                property.hotel
            ) {

                debtor.money +=
                    Math.floor(
                        getHotelCost(index) / 2
                    );

                S.bank.hotels +=
                    1;

            }

            property.houses =
                0;

            property.hotel =
                0;

            property.owner =
                null;

            property.mortgaged =
                false;

        }


        addLog(
            `💀 ${debtor.name} збанкрутував перед банком`
        );

    }


    debtor.money =
        0;

    debtor.bankrupt =
        true;

    debtor.jail =
        false;


    S.order =
        S.order.filter(
            id =>
                id !==
                debtor.id
        );


    S.debt =
        null;


    if (
        S.order.length <= 1
    ) {

        S.phase =
            'finished';

        S.started =
            false;

        addLog(
            '🏆 ГРУ ЗАВЕРШЕНО!'
        );

    }


    await saveAndRender();

}


// ------------------------------------------------------------
// ПЕРЕВІРКА КІНЦЯ ГРИ
// ------------------------------------------------------------

function checkWinner() {

    const alive =
        S.order.filter(
            id =>
                !S.players[id]?.bankrupt
        );

    if (
        alive.length !== 1
    ) {
        return null;
    }

    return alive[0];

}


// ------------------------------------------------------------
// ПРАВИЛЬНИЙ ПЕРЕХІД ХОДУ
// ------------------------------------------------------------

async function nextTurn() {

    if (
        S.phase === 'finished'
    ) {
        return;
    }

    if (
        S.debt
    ) {
        return;
    }

    if (
        !S.order.length
    ) {
        return;
    }


    let next =
        S.cur;


    for (
        let i = 0;
        i < S.order.length;
        i++
    ) {

        next =
            (
                next + 1
            ) %
            S.order.length;

        const id =
            S.order[next];

        const player =
            getPlayer(id);

        if (
            player &&
            !player.bankrupt
        ) {

            S.cur =
                next;

            break;

        }

    }


    S.phase =
        'roll';

    S.doubles =
        0;

    await saveAndRender();

}


// ------------------------------------------------------------
// КИНУТИ КУБИКИ
// ------------------------------------------------------------

async function rollDiceFinal() {

    if (
        !S.started ||
        S.phase !== 'roll'
    ) {
        return;
    }

    if (
        !isMyTurn()
    ) {
        return;
    }

    if (
        S.debt
    ) {
        return;
    }

    const player =
        currentPlayer();

    if (!player) {
        return;
    }


    const d1 =
        Math.floor(
            Math.random() * 6
        ) + 1;

    const d2 =
        Math.floor(
            Math.random() * 6
        ) + 1;

    S.dice =
        [
            d1,
            d2
        ];


    const isDouble =
        d1 === d2;


    if (
        isDouble
    ) {

        S.doubles =
            Number(
                S.doubles || 0
            ) + 1;

    }
    else {

        S.doubles =
            0;

    }


    // Третій дубль
    if (
        isDouble &&
        S.doubles >= 3
    ) {

        player.pos =
            10;

        player.jail =
            true;

        player.jailTurns =
            0;

        S.doubles =
            0;

        S.phase =
            'wait';

        addLog(
            `🔒 ${player.name} отримав третій дубль і потрапив у в'язницю`
        );

        await saveAndRender();

        setTimeout(
            () => nextTurn(),
            700
        );

        return;

    }


    S.phase =
        'moving';

    await saveAndRender();


    await animateDice();


    await movePlayer(
        player.id,
        d1 + d2
    );


    if (
        S.debt
    ) {
        return;
    }


    // Дубль = додатковий хід
    if (
        isDouble &&
        !player.jail
    ) {

        S.phase =
            'roll';

        await saveAndRender();

        return;

    }


    await nextTurn();

}


// ------------------------------------------------------------
// РУХ
// ------------------------------------------------------------

async function movePlayer(
    playerId,
    steps
) {

    const player =
        getPlayer(playerId);

    if (!player) {
        return;
    }


    for (
        let i = 0;
        i < steps;
        i++
    ) {

        const old =
            player.pos;

        const next =
            (
                old + 1
            ) %
            T.length;

        player.pos =
            next;


        // GO
        if (
            next === 0
        ) {

            player.money +=
                SALARY;

            addLog(
                `💵 ${player.name} отримав зарплату ${money(SALARY)}`
            );

        }


        await saveAndRender();


        await sleep(
            180
        );

    }


    await landOnTile(
        player
    );

}


// ------------------------------------------------------------
// ПОПАДАННЯ НА КЛІТИНКУ
// ------------------------------------------------------------

async function landOnTile(
    player
) {

    const index =
        player.pos;

    const tile =
        T[index];

    if (!tile) {
        return;
    }


    addLog(
        `📍 ${player.name}: ${tile.icon || ''} ${tile.n}`
    );


    // ========================================================
    // ВЛАСНІСТЬ
    // ========================================================

    if (
        tile.type === 'property'
    ) {

        const property =
            S.properties[index];


        // Вільна
        if (
            !property.owner
        ) {

            if (
                player.money >=
                Number(tile.price || 0)
            ) {

                S.phase =
                    'buy';

            }
            else {

                await startAuction(
                    index
                );

            }

            await saveAndRender();

            return;

        }


        // Чиясь
        if (
            property.owner !==
            player.id
        ) {

            await collectRent(
                player.id,
                index
            );

            await saveAndRender();

            return;

        }


        S.phase =
            'wait';

        await saveAndRender();

        return;

    }


    // ========================================================
    // ПОДАТОК
    // ========================================================

    if (
        tile.type === 'tax'
    ) {

        createBankDebt(
            player.id,
            Number(
                tile.amount ||
                tile.price ||
                800
            ),
            'tax'
        );

        addLog(
            `💸 ${player.name} сплачує податок`
        );

        await saveAndRender();

        return;

    }


    // ========================================================
    // ШАНС
    // ========================================================

    if (
        tile.type === 'chance'
    ) {

        await drawChance(
            player.id
        );

        return;

    }


    // ========================================================
    // В'ЯЗНИЦЯ
    // ========================================================

    if (
        tile.type === 'gotojail'
    ) {

        player.pos =
            10;

        player.jail =
            true;

        player.jailTurns =
            0;

        S.doubles =
            0;

        S.phase =
            'wait';

        addLog(
            `🔒 ${player.name} потрапив у в'язницю`
        );

        await saveAndRender();

        return;

    }


    // ========================================================
    // КАЗИНО
    // ========================================================

    if (
        tile.type === 'casino'
    ) {

        const win =
            Math.random() < 0.4;

        if (win) {

            player.money +=
                1000;

            addLog(
                `🎰 ${player.name} виграв ${money(1000)}`
            );

        }
        else {

            createBankDebt(
                player.id,
                600,
                'casino'
            );

            addLog(
                `🎰 ${player.name} програв ${money(600)}`
            );

        }

        await saveAndRender();

        return;

    }


    S.phase =
        'wait';

    await saveAndRender();

}


// ------------------------------------------------------------
// КУПІВЛЯ
// ------------------------------------------------------------

async function buyPropertyFinal(
    index
) {

    if (
        !isMyTurn()
    ) {
        return;
    }

    const player =
        currentPlayer();

    const tile =
        T[index];

    const property =
        S.properties[index];


    if (
        !player ||
        !tile ||
        !property
    ) {
        return;
    }

    if (
        player.pos !== index
    ) {
        return;
    }

    if (
        property.owner
    ) {
        return;
    }

    const price =
        Number(
            tile.price || 0
        );

    if (
        player.money < price
    ) {

        alert(
            'Недостатньо коштів.'
        );

        return;

    }


    player.money -=
        price;

    property.owner =
        player.id;

    property.mortgaged =
        false;

    S.phase =
        'wait';


    addLog(
        `🏠 ${player.name} купив ${tile.n} за ${money(price)}`
    );


    await saveAndRender();

}


// ------------------------------------------------------------
// ПОЧАТОК АУКЦІОНУ
// ------------------------------------------------------------

async function startAuction(
    propertyIndex
) {

    if (
        S.phase === 'auction'
    ) {
        return;
    }


    const participants =
        S.order.filter(
            id => {

                const p =
                    getPlayer(id);

                return (
                    p &&
                    !p.bankrupt &&
                    p.money > 0
                );

            }
        );


    if (
        participants.length <= 0
    ) {
        return;
    }


    S.auction = {

        property:
            propertyIndex,

        participants,

        passed: [],

        highestBid:
            0,

        highestBidder:
            null,

        turn:
            0,

        startedAt:
            Date.now()

    };


    S.phase =
        'auction';


    addLog(
        `🔨 Почався аукціон за ${T[propertyIndex].n}`
    );


    await saveAndRender();

}


// ------------------------------------------------------------
// СТАВКА
// ------------------------------------------------------------

async function auctionBidFinal(
    amount
) {

    if (
        S.phase !== 'auction' ||
        !S.auction
    ) {
        return;
    }


    const auction =
        S.auction;

    const player =
        getPlayer(UID);


    if (!player) {
        return;
    }


    if (
        auction.passed.includes(
            UID
        )
    ) {
        return;
    }


    amount =
        Math.floor(
            Number(amount) || 0
        );


    if (
        amount <=
        auction.highestBid
    ) {

        alert(
            `Ставка має бути більшою за ${money(auction.highestBid)}`
        );

        return;

    }


    if (
        amount >
        player.money
    ) {

        alert(
            'У вас недостатньо грошей.'
        );

        return;

    }


    auction.highestBid =
        amount;

    auction.highestBidder =
        UID;


    addLog(
        `🔨 ${player.name} поставив ${money(amount)}`
    );


    await advanceAuction();

}


// ------------------------------------------------------------
// ПАС
// ------------------------------------------------------------

async function auctionPassFinal() {

    if (
        S.phase !== 'auction' ||
        !S.auction
    ) {
        return;
    }


    if (
        !S.auction.passed.includes(
            UID
        )
    ) {

        S.auction.passed.push(
            UID
        );

    }


    const p =
        getPlayer(UID);


    addLog(
        `🔨 ${p?.name || ''} пропустив ставку`
    );


    await advanceAuction();

}


// ------------------------------------------------------------
// НАСТУПНИЙ УЧАСНИК АУКЦІОНУ
// ------------------------------------------------------------

async function advanceAuction() {

    const auction =
        S.auction;


    if (!auction) {
        return;
    }


    const active =
        auction.participants.filter(
            id =>
                !auction.passed.includes(
                    id
                ) &&
                !getPlayer(id)?.bankrupt
        );


    // Є переможець
    if (
        auction.highestBidder &&
        active.length <= 1
    ) {

        await finishAuction();

        return;

    }


    // Немає активних
    if (
        active.length === 0
    ) {

        await finishAuction();

        return;

    }


    let attempts = 0;

    while (
        attempts <
        auction.participants.length
    ) {

        auction.turn =
            (
                auction.turn + 1
            ) %
            auction.participants.length;

        const id =
            auction.participants[
                auction.turn
            ];

        attempts++;


        if (
            !auction.passed.includes(
                id
            ) &&
            !getPlayer(id)?.bankrupt
        ) {

            S.auction.currentPlayer =
                id;

            break;

        }

    }


    await saveAndRender();

}


// ------------------------------------------------------------
// ЗАВЕРШЕННЯ АУКЦІОНУ
// ------------------------------------------------------------

async function finishAuction() {

    const auction =
        S.auction;


    if (!auction) {
        return;
    }


    const property =
        S.properties[
            auction.property
        ];


    const tile =
        T[
            auction.property
        ];


    if (
        auction.highestBidder
    ) {

        const winner =
            getPlayer(
                auction.highestBidder
            );


        if (
            winner &&
            winner.money >=
            auction.highestBid
        ) {

            winner.money -=
                auction.highestBid;

            property.owner =
                winner.id;

            property.mortgaged =
                false;


            addLog(
                `🏆 ${winner.name} виграв ${tile.n} за ${money(auction.highestBid)}`
            );

        }

    }
    else {

        addLog(
            `🔨 Аукціон за ${tile.n} завершено без переможця`
        );

    }


    S.auction =
        null;

    S.phase =
        'wait';


    await saveAndRender();

}


// ------------------------------------------------------------
// В'ЯЗНИЦЯ — КИНУТИ
// ------------------------------------------------------------

async function rollInJailFinal() {

    if (
        !isMyTurn()
    ) {
        return;
    }

    const player =
        currentPlayer();

    if (
        !player?.jail
    ) {
        return;
    }


    const d1 =
        Math.floor(
            Math.random() * 6
        ) + 1;

    const d2 =
        Math.floor(
            Math.random() * 6
        ) + 1;


    S.dice =
        [
            d1,
            d2
        ];


    await saveAndRender();


    if (
        d1 === d2
    ) {

        player.jail =
            false;

        player.jailTurns =
            0;

        S.phase =
            'moving';


        addLog(
            `🔓 ${player.name} викинув дубль і вийшов із в'язниці`
        );


        await movePlayer(
            player.id,
            d1 + d2
        );


        if (
            !S.debt
        ) {

            await nextTurn();

        }

        return;

    }


    player.jailTurns =
        Number(
            player.jailTurns || 0
        ) + 1;


    if (
        player.jailTurns >= 3
    ) {

        await payJailFineFinal();

        return;

    }


    S.phase =
        'wait';


    addLog(
        `🔒 ${player.name} не викинув дубль`
    );


    await saveAndRender();

    await nextTurn();

}


// ------------------------------------------------------------
// ШТРАФ В'ЯЗНИЦІ
// ------------------------------------------------------------

const JAIL_FINE_FINAL =
    500;


async function payJailFineFinal() {

    const player =
        currentPlayer();


    if (
        !player ||
        !player.jail
    ) {
        return;
    }


    if (
        player.money <
        JAIL_FINE_FINAL
    ) {

        S.debt = {

            debtor:
                player.id,

            creditor:
                null,

            amount:
                JAIL_FINE_FINAL -
                player.money,

            reason:
                'jail'

        };


        player.money =
            0;

        S.phase =
            'debt';


        await saveAndRender();

        return;

    }


    player.money -=
        JAIL_FINE_FINAL;

    player.jail =
        false;

    player.jailTurns =
        0;

    S.phase =
        'roll';


    addLog(
        `🔓 ${player.name} заплатив штраф за вихід із в'язниці`
    );


    await saveAndRender();

}


// ------------------------------------------------------------
// ШАНС
// ------------------------------------------------------------

const CHANCE_CARDS_FINAL = [

    {
        text:
            '💰 Ви отримали 500 ₴',
        action:
            p => {
                p.money += 500;
            }
    },

    {
        text:
            '💸 Заплатіть 300 ₴',
        action:
            p => {
                createBankDebt(
                    p.id,
                    300,
                    'chance'
                );
            }
    },

    {
        text:
            '🚗 Ремонт автомобіля — 400 ₴',
        action:
            p => {
                createBankDebt(
                    p.id,
                    400,
                    'chance'
                );
            }
    },

    {
        text:
            '🎁 Бонус від банку — 800 ₴',
        action:
            p => {
                p.money += 800;
            }
    },

    {
        text:
            '🏃 Перемістіться на START',
        action:
            p => {

                p.pos = 0;

                p.money +=
                    SALARY;

            }
    },

    {
        text:
            '🔒 Ідіть у в’язницю',
        action:
            p => {

                p.pos =
                    10;

                p.jail =
                    true;

                p.jailTurns =
                    0;

            }
    }

];


async function drawChanceFinal(
    playerId
) {

    const player =
        getPlayer(playerId);

    if (!player) {
        return;
    }


    const card =
        CHANCE_CARDS_FINAL[
            Math.floor(
                Math.random() *
                CHANCE_CARDS_FINAL.length
            )
        ];


    addLog(
        `🎴 ШАНС: ${card.text}`
    );


    card.action(
        player
    );


    await saveAndRender();

}


// ------------------------------------------------------------
// ТОРГІВЛЯ — ПЕРЕВІРКА
// ------------------------------------------------------------

function validateTrade(
    trade
) {

    if (!trade) {
        return false;
    }

    const from =
        getPlayer(
            trade.from
        );

    const to =
        getPlayer(
            trade.to
        );

    if (
        !from ||
        !to
    ) {
        return false;
    }

    if (
        from.bankrupt ||
        to.bankrupt
    ) {
        return false;
    }

    if (
        from.money <
        Number(
            trade.fromMoney || 0
        )
    ) {
        return false;
    }

    if (
        to.money <
        Number(
            trade.toMoney || 0
        )
    ) {
        return false;
    }


    for (
        const index of
        trade.fromProperties || []
    ) {

        if (
            S.properties[index]?.owner !==
            from.id
        ) {
            return false;
        }

    }


    for (
        const index of
        trade.toProperties || []
    ) {

        if (
            S.properties[index]?.owner !==
            to.id
        ) {
            return false;
        }

    }


    return true;

}


// ------------------------------------------------------------
// ЗАСТОСУВАТИ ТОРГІВЛЮ
// ------------------------------------------------------------

async function applyTradeFinal() {

    const trade =
        S.trade;


    if (
        !validateTrade(trade)
    ) {

        alert(
            'Угода більше недійсна.'
        );

        S.trade =
            null;

        S.phase =
            'wait';

        await saveAndRender();

        return;

    }


    const from =
        getPlayer(
            trade.from
        );

    const to =
        getPlayer(
            trade.to
        );


    const fromMoney =
        Number(
            trade.fromMoney || 0
        );

    const toMoney =
        Number(
            trade.toMoney || 0
        );


    from.money -=
        fromMoney;

    to.money +=
        fromMoney;


    to.money -=
        toMoney;

    from.money +=
        toMoney;


    for (
        const index of
        trade.fromProperties || []
    ) {

        S.properties[index].owner =
            to.id;

    }


    for (
        const index of
        trade.toProperties || []
    ) {

        S.properties[index].owner =
            from.id;

    }


    addLog(
        `🤝 ${from.name} та ${to.name} завершили торгівлю`
    );


    S.trade =
        null;

    S.phase =
        'wait';


    await saveAndRender();

}


// ------------------------------------------------------------
// КІНЕЦЬ ГРИ
// ------------------------------------------------------------

function finishGame() {

    const winnerId =
        checkWinner();

    if (!winnerId) {
        return;
    }

    const winner =
        getPlayer(winnerId);

    if (!winner) {
        return;
    }

    S.phase =
        'finished';

    S.started =
        false;


    addLog(
        `🏆 ${winner.name} переміг у МОНОПОЛІЇ!`
    );


    saveAndRender();

}


// ------------------------------------------------------------
// ЗБЕРЕГТИ + RENDER
// ------------------------------------------------------------

async function saveAndRenderFinal() {

    normalizePlayers();

    normalizeProperties();

    try {

        await set(
            roomRef,
            clone(S)
        );

    } catch (
        error
    ) {

        console.error(
            'Firebase save error:',
            error
        );

    }

    render();

}


// ------------------------------------------------------------
// АНІМАЦІЯ КУБИКІВ
// ------------------------------------------------------------

async function animateDiceFinal() {

    const d1 =
        $('dice1');

    const d2 =
        $('dice2');


    if (!d1 || !d2) {
        return;
    }


    d1.classList.add(
        'rolling'
    );

    d2.classList.add(
        'rolling'
    );


    for (
        let i = 0;
        i < 8;
        i++
    ) {

        d1.textContent =
            Math.floor(
                Math.random() * 6
            ) + 1;

        d2.textContent =
            Math.floor(
                Math.random() * 6
            ) + 1;

        await sleep(
            70
        );

    }


    d1.classList.remove(
        'rolling'
    );

    d2.classList.remove(
        'rolling'
    );


    d1.textContent =
        S.dice[0];

    d2.textContent =
        S.dice[1];

}


// ------------------------------------------------------------
// FIREBASE WATCH
// ------------------------------------------------------------

function watchRoomFinal() {

    onValue(
        roomRef,
        snapshot => {

            const data =
                snapshot.val();

            if (!data) {
                return;
            }


            const oldPhase =
                S.phase;


            Object.assign(
                S,
                data
            );


            normalizePlayers();

            normalizeProperties();


            render();


            // Якщо нам прийшла торгівля
            if (
                oldPhase !== 'trade' &&
                S.phase === 'trade'
            ) {

                // Можна додати звук / вібрацію
                if (
                    navigator.vibrate
                ) {

                    navigator.vibrate(
                        [80, 50, 80]
                    );

                }

            }

        }
    );

}


// ------------------------------------------------------------
// ВХІД У КІМНАТУ
// ------------------------------------------------------------

async function enterFinal(
    spectator = false
) {

    isSpectator =
        spectator;


    const snapshot =
        await get(
            roomRef
        );


    const data =
        snapshot.val();


    if (
        data
    ) {

        Object.assign(
            S,
            data
        );

    }


    normalizePlayers();

    normalizeProperties();


    if (
        !spectator
    ) {

        if (
            !S.players[UID]
        ) {

            if (
                S.order.length >=
                MAX_PLAYERS
            ) {

                alert(
                    'У кімнаті вже немає місця.'
                );

                isSpectator =
                    true;

            }
            else {

                S.players[UID] = {

                    id:
                        UID,

                    name:
                        USER_NAME,

                    username:
                        USER_USERNAME,

                    color:
                        PLAYER_COLORS[
                            S.order.length %
                            PLAYER_COLORS.length
                        ],

                    money:
                        START_MONEY,

                    pos:
                        0,

                    jail:
                        false,

                    jailTurns:
                        0,

                    bankrupt:
                        false,

                    cards:
                        [],

                    joinedAt:
                        Date.now()

                };


                S.order.push(
                    UID
                );

            }

        }

    }


    await saveAndRenderFinal();


    if (
        !spectator
    ) {

        try {

            onDisconnect(
                playerRef(
                    UID
                )
            ).cancel();

        } catch (
            error
        ) {

            console.warn(
                'onDisconnect:',
                error
            );

        }

    }

}


// ------------------------------------------------------------
// ЗАПУСК ГРИ
// ------------------------------------------------------------

async function startGameFinal() {

    if (
        S.started
    ) {
        return;
    }


    if (
        S.order.length < 2
    ) {

        alert(
            'Потрібно щонайменше 2 гравці.'
        );

        return;

    }


    S.started =
        true;

    S.phase =
        'roll';

    S.cur =
        0;

    S.doubles =
        0;

    S.auction =
        null;

    S.trade =
        null;

    S.debt =
        null;


    addLog(
        '🎲 ГРУ РОЗПОЧАТО!'
    );


    addLog(
        `👑 Перший хід: ${getPlayer(S.order[0])?.name || ''}`
    );


    await saveAndRenderFinal();

}


// ------------------------------------------------------------
// ВИХІД
// ------------------------------------------------------------

async function leaveGameFinal() {

    if (
        !S.players[UID]
    ) {
        return;
    }


    const player =
        getPlayer(UID);


    if (
        S.started &&
        !player?.bankrupt
    ) {

        if (
            !confirm(
                'Ви дійсно хочете вийти з гри?'
            )
        ) {
            return;
        }

    }


    delete S.players[UID];


    S.order =
        S.order.filter(
            id =>
                id !== UID
        );


    if (
        S.order.length === 0
    ) {

        S.started =
            false;

    }
    else {

        if (
            S.cur >=
            S.order.length
        ) {

            S.cur =
                0;

        }

    }


    await saveAndRenderFinal();

}


// ============================================================
// ПЕРЕВИЗНАЧЕННЯ ФУНКЦІЙ
// ============================================================

window.rollDice =
    rollDiceFinal;

window.buyProperty =
    buyPropertyFinal;

window.build =
    buildProperty;

window.sellBuilding =
    sellBuildingProperty;

window.mortgage =
    mortgageProperty;

window.unmortgage =
    unmortgageProperty;

window.payJailFine =
    payJailFineFinal;

window.rollInJail =
    rollInJailFinal;

window.rollDice =
    rollDiceFinal;

window.drawChance =
    drawChanceFinal;

window.startGame =
    startGameFinal;

window.leaveGame =
    leaveGameFinal;

window.saveAndRender =
    saveAndRenderFinal;

window.animateDice =
    animateDiceFinal;

window.watchRoom =
    watchRoomFinal;

window.enter =
    enterFinal;

window.startAuction =
    startAuction;

window.auctionBid =
    auctionBidFinal;

window.auctionPass =
    auctionPassFinal;

window.payDebt =
    payDebt;

window.declareBankruptcy =
    bankruptPlayer;

window.nextTurn =
    nextTurn;

window.calculateRent =
    calculateRent;

window.canMortgage =
    canMortgageProperty;


// ============================================================
// ПЕРЕВИЗНАЧЕННЯ ПОСИЛАНЬ У WINDOWS
// ============================================================

Object.assign(
    window,
    {

        rollDice:
            rollDiceFinal,

        buyProperty:
            buyPropertyFinal,

        build:
            buildProperty,

        sellBuilding:
            sellBuildingProperty,

        mortgage:
            mortgageProperty,

        unmortgage:
            unmortgageProperty,

        rollInJail:
            rollInJailFinal,

        payJailFine:
            payJailFineFinal,

        startGame:
            startGameFinal,

        leaveGame:
            leaveGameFinal,

        createBankDebt:
            createBankDebt,

        bankruptPlayer:
            bankruptPlayer,

        startAuction:
            startAuction,

        auctionBid:
            auctionBidFinal,

        auctionPass:
            auctionPassFinal

    }
);


// ============================================================
// ФІНАЛЬНИЙ CLICK HANDLER
// ============================================================

document.addEventListener(
    'click',
    async event => {

        const element =
            event.target.closest(
                '[data-action]'
            );


        if (!element) {
            return;
        }


        const action =
            element.dataset.action;


        const index =
            element.dataset.index !== undefined
                ? Number(
                    element.dataset.index
                )
                : null;


        try {

            // -----------------------------------------------
            // КУПІВЛЯ
            // -----------------------------------------------

            if (
                action === 'buy'
            ) {

                await buyPropertyFinal(
                    index
                );

                return;

            }


            // -----------------------------------------------
            // БУДІВНИЦТВО
            // -----------------------------------------------

            if (
                action === 'build'
            ) {

                await buildProperty(
                    index
                );

                return;

            }


            // -----------------------------------------------
            // ПРОДАЖ
            // -----------------------------------------------

            if (
                action === 'sell-building'
            ) {

                await sellBuildingProperty(
                    index
                );

                return;

            }


            // -----------------------------------------------
            // ЗАСТАВА
            // -----------------------------------------------

            if (
                action === 'mortgage'
            ) {

                await mortgageProperty(
                    index
                );

                return;

            }


            if (
                action === 'unmortgage'
            ) {

                await unmortgageProperty(
                    index
                );

                return;

            }


            // -----------------------------------------------
            // БОРГ
            // -----------------------------------------------

            if (
                action === 'pay-debt'
            ) {

                await payDebt();

                return;

            }


            if (
                action === 'bankrupt'
            ) {

                if (
                    confirm(
                        'Оголосити банкрутство? Цю дію неможливо скасувати.'
                    )
                ) {

                    await bankruptPlayer();

                }

                return;

            }


            // -----------------------------------------------
            // АУКЦІОН
            // -----------------------------------------------

            if (
                action === 'bid'
            ) {

                const current =
                    Number(
                        S.auction?.highestBid ||
                        0
                    );

                const increment =
                    Number(
                        element.dataset.bid ||
                        0
                    );


                await auctionBidFinal(
                    current +
                    increment
                );

                return;

            }


            if (
                action === 'auction-pass'
            ) {

                await auctionPassFinal();

                return;

            }


            // -----------------------------------------------
            // ТОРГІВЛЯ
            // -----------------------------------------------

            if (
                action === 'trade-accept'
            ) {

                await applyTradeFinal();

                return;

            }


            if (
                action === 'trade-reject'
            ) {

                S.trade =
                    null;

                S.phase =
                    'wait';

                await saveAndRenderFinal();

                return;

            }


            if (
                action === 'trade-cancel'
            ) {

                S.trade =
                    null;

                S.phase =
                    'wait';

                await saveAndRenderFinal();

                return;

            }


            // -----------------------------------------------
            // PROFILE
            // -----------------------------------------------

            if (
                action === 'profile'
            ) {

                showProfile(
                    element.dataset.player ||
                    UID
                );

                return;

            }


            if (
                action === 'close-profile'
            ) {

                closeProfile();

                return;

            }

        } catch (
            error
        ) {

            console.error(
                'FINAL ACTION ERROR',
                error
            );

        }

    }
);


// ============================================================
// ДОДАТКОВИЙ UI
// ============================================================

function addFinalStyles() {

    if (
        document.getElementById(
            'monopoly-final-styles'
        )
    ) {
        return;
    }


    const style =
        document.createElement(
            'style'
        );


    style.id =
        'monopoly-final-styles';


    style.textContent = `

        .board-tile {
            position: relative;
            overflow: hidden;
        }

        .group-strip {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 7px;
        }

        .owner-dot {
            display: inline-block;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            margin-top: 3px;
        }

        .player-token {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 900;
            border: 2px solid rgba(255,255,255,.8);
            box-shadow: 0 2px 10px rgba(0,0,0,.45);
            margin: 2px;
            z-index: 5;
        }

        .buildings {
            display: block;
            font-size: 10px;
            letter-spacing: -3px;
        }

        .hotel {
            display: block;
            font-size: 14px;
        }

        .mortgage-mark {
            display: block;
            font-size: 11px;
        }

        .mortgaged {
            opacity: .55;
        }

        .player-card.active {
            outline: 2px solid rgba(255,255,255,.55);
        }

        .bankrupt {
            opacity: .35;
            filter: grayscale(1);
        }

        .turn-dot {
            margin-left: 5px;
            animation: monopolyPulse 1s infinite;
        }

        @keyframes monopolyPulse {

            0% {
                opacity: .3;
            }

            50% {
                opacity: 1;
            }

            100% {
                opacity: .3;
            }

        }

        .action-panel {
            padding: 14px;
            border-radius: 18px;
            background: rgba(20,20,28,.96);
            border: 1px solid rgba(255,255,255,.08);
            margin-top: 10px;
        }

        .action-title {
            font-size: 16px;
            font-weight: 900;
            margin-bottom: 7px;
        }

        .action-price {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 10px;
        }

        .action-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
        }

        .ac {
            border: 0;
            border-radius: 12px;
            padding: 10px 13px;
            background: rgba(255,255,255,.08);
            color: white;
            font-weight: 800;
            cursor: pointer;
        }

        .ac.primary {
            background: #25a244;
        }

        .ac.danger {
            background: #c92a2a;
        }

        .ac:disabled {
            opacity: .4;
            cursor: not-allowed;
        }

        .property-panel,
        .players-action-panel {
            padding: 12px;
            border-radius: 18px;
            background: rgba(20,20,28,.94);
            margin-top: 10px;
        }

        .property-title {
            font-weight: 900;
            margin-bottom: 10px;
        }

        .property-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 8px;
            padding: 9px 0;
            border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .property-main {
            display: flex;
            align-items: center;
            gap: 9px;
            min-width: 0;
        }

        .property-color {
            width: 7px;
            height: 34px;
            border-radius: 6px;
            flex-shrink: 0;
        }

        .property-name {
            font-weight: 800;
            font-size: 13px;
        }

        .property-meta {
            font-size: 11px;
            opacity: .6;
            margin-top: 2px;
        }

        .property-actions {
            display: flex;
            gap: 4px;
        }

        .mini-btn {
            border: 0;
            border-radius: 9px;
            min-width: 31px;
            height: 31px;
            background: rgba(255,255,255,.09);
            color: white;
            font-weight: 900;
            cursor: pointer;
        }

        .property-empty {
            opacity: .5;
            text-align: center;
            padding: 15px;
        }

        .trade-players {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 10px;
            align-items: center;
            text-align: center;
            margin-bottom: 14px;
        }

        .trade-arrow {
            font-size: 24px;
            opacity: .7;
        }

        .trade-assets {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .trade-side {
            background: rgba(255,255,255,.04);
            border-radius: 12px;
            padding: 8px;
        }

        .trade-label {
            font-size: 11px;
            opacity: .55;
            margin-bottom: 5px;
        }

        .trade-property {
            font-size: 12px;
            padding: 6px;
            border-radius: 8px;
            background: rgba(255,255,255,.06);
            margin-bottom: 4px;
        }

        .trade-property-btn {
            border: 0;
            border-radius: 10px;
            padding: 8px;
            margin: 3px;
            background: rgba(255,255,255,.07);
            color: white;
            font-size: 11px;
            cursor: pointer;
        }

        .trade-property-btn.selected {
            background: rgba(37,162,68,.8);
        }

        .trade-money {
            display: flex;
            gap: 6px;
            margin-top: 10px;
        }

        .trade-money input {
            min-width: 0;
            flex: 1;
            border: 0;
            border-radius: 10px;
            background: rgba(255,255,255,.07);
            color: white;
            padding: 9px;
        }

        .other-player-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
        }

        .other-player-info {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .other-player-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        .profile-modal {
            max-width: 430px;
            width: calc(100% - 24px);
            max-height: 90vh;
            overflow-y: auto;
            background: #17171d;
            border-radius: 24px;
            padding: 22px;
            position: relative;
            box-shadow: 0 20px 80px rgba(0,0,0,.65);
        }

        .modal-backdrop {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0,0,0,.72);
            padding: 12px;
        }

        #profileModal {
            display: none;
        }

        #profileModal.open {
            display: block;
        }

        .modal-close {
            position: absolute;
            right: 13px;
            top: 13px;
            width: 34px;
            height: 34px;
            border: 0;
            border-radius: 50%;
            background: rgba(255,255,255,.08);
            color: white;
            cursor: pointer;
        }

        .profile-avatar-large {
            width: 76px;
            height: 76px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 4px auto 10px;
            font-size: 30px;
            font-weight: 900;
        }

        .profile-name {
            text-align: center;
            font-size: 21px;
            font-weight: 900;
        }

        .profile-username {
            text-align: center;
            opacity: .5;
            margin-top: 3px;
        }

        .profile-money {
            text-align: center;
            font-size: 25px;
            font-weight: 900;
            margin: 14px 0;
        }

        .profile-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 7px;
        }

        .profile-stat {
            padding: 10px;
            background: rgba(255,255,255,.05);
            border-radius: 12px;
        }

        .profile-stat span {
            display: block;
            opacity: .5;
            font-size: 10px;
        }

        .profile-stat strong {
            display: block;
            margin-top: 3px;
            font-size: 14px;
        }

        .profile-section-title {
            font-weight: 900;
            margin: 18px 0 8px;
        }

        .profile-property {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            padding: 9px;
            border-radius: 10px;
            background: rgba(255,255,255,.04);
            margin-bottom: 5px;
        }

        .profile-property small {
            display: block;
            opacity: .5;
            font-size: 10px;
            margin-top: 2px;
        }

        .profile-trade-btn {
            width: 100%;
            margin-top: 12px;
        }

        .rolling {
            animation: diceRoll .12s linear infinite;
        }

        @keyframes diceRoll {

            0% {
                transform: rotate(-8deg) scale(1);
            }

            50% {
                transform: rotate(8deg) scale(1.08);
            }

            100% {
                transform: rotate(-8deg) scale(1);
            }

        }

    `;


    document.head.appendChild(
        style
    );

}


// ============================================================
// START FINAL
// ============================================================

addFinalStyles();


// Якщо Firebase watcher ще не запущений
try {

    watchRoomFinal();

} catch (
    error
) {

    console.warn(
        'watchRoomFinal:',
        error
    );

}


console.log(
    '🇺🇦 MONOPOLY UKRAINE FINAL PATCH LOADED'
);
