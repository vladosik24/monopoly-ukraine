const START_MONEY = 10000;
const SALARY = 1200;
const MAX_PLAYERS = 6;
const TURN_TIME = 30;

let initializeApp;
let getDatabase;
let ref;
let set;
let onValue;
let update;
let get;
let onDisconnect;
let push;
let query;
let limitToLast;

const firebaseConfig = {
    apiKey: "AIzaSyByYh0VOBkFvPcQYRzabrt8sfj32gpbsWQ",
    authDomain: "monopoly-ukraine.firebaseapp.com",
    databaseURL: "https://monopoly-ukraine-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "monopoly-ukraine",
    storageBucket: "monopoly-ukraine.firebasestorage.app",
    messagingSenderId: "1046709502750",
    appId: "1:1046709502750:web:ba8ad3c1f11780d1a6bf0f"
};

let db = null;

const $ = id => document.getElementById(id);

function startupError(title, error) {
    console.error(title, error);

    const c = $('connectionStatus');

    if (c) {
        c.textContent = '❌ Помилка запуску';
        c.style.color = '#ff5252';
    }

    const box = $('startupError');

    if (box) {
        const msg = error && error.message
            ? error.message
            : String(error || 'Невідома помилка');

        box.innerHTML =
            '<div class="start-error">' +
            '<b>' + esc(title) + '</b><br><br>' +
            esc(msg) +
            '<br><br>' +
            'Перевір консоль браузера для повної інформації.' +
            '</div>';
    }
}

window.addEventListener('error', e => {
    console.error('[MONOPOLY ERROR]', e.error || e.message);

    if (!$('startupError')) return;

    startupError(
        'Помилка JavaScript',
        e.error || new Error(e.message)
    );
});

window.addEventListener('unhandledrejection', e => {
    console.error('[MONOPOLY PROMISE ERROR]', e.reason);

    if (!$('startupError')) return;

    startupError(
        'Помилка Promise',
        e.reason
    );
});

async function loadFirebase() {

    try {

        $('connectionStatus').textContent =
            'Завантаження Firebase...';

        const firebaseApp =
            await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
            );

        const firebaseDatabase =
            await import(
                'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js'
            );

        initializeApp = firebaseApp.initializeApp;

        getDatabase = firebaseDatabase.getDatabase;
        ref = firebaseDatabase.ref;
        set = firebaseDatabase.set;
        onValue = firebaseDatabase.onValue;
        update = firebaseDatabase.update;
        get = firebaseDatabase.get;
        onDisconnect = firebaseDatabase.onDisconnect;
        push = firebaseDatabase.push;
        query = firebaseDatabase.query;
        limitToLast = firebaseDatabase.limitToLast;

        const app = initializeApp(firebaseConfig);

        db = getDatabase(app);

        console.log('[MONOPOLY] Firebase initialized');
        console.log('[MONOPOLY] Database URL:', firebaseConfig.databaseURL);

        $('connectionStatus').textContent =
            'Перевірка Firebase...';

        await checkFirebase();

    } catch (error) {

        startupError(
            'Не вдалося завантажити Firebase',
            error
        );
    }
}

async function checkFirebase() {

    try {

        const connectionRef =
            ref(db, '.info/connected');

        onValue(
            connectionRef,
            snapshot => {

                const connected =
                    snapshot.val() === true;

                console.log(
                    '[MONOPOLY] Firebase connected:',
                    connected
                );

                const c =
                    $('connectionStatus');

                if (!c) return;

                if (connected) {

                    c.textContent =
                        '✅ Firebase підключено';

                    c.style.color =
                        '#2ee67a';

                    const err =
                        $('startupError');

                    if (err) {
                        err.innerHTML = '';
                    }

                    setTimeout(() => {

                        c.style.display =
                            'none';

                        if (!code) {

                            $('lobbyContent')
                                .style.display =
                                'block';

                            loadRooms();
                        }

                    }, 500);

                } else {

                    c.style.display =
                        'block';

                    c.textContent =
                        '❌ Firebase не підключено';

                    c.style.color =
                        '#ff5252';
                }
            },

            error => {

                startupError(
                    'Firebase Realtime Database',
                    error
                );
            }
        );

    } catch (error) {

        startupError(
            'Помилка Firebase',
            error
        );
    }
}

const GC = [
    '#f5b800',
    '#e53935',
    '#f2d000',
    '#2e9e4f',
    '#12b5cb',
    '#2aa8e0',
    '#7b3ff2',
    '#2e9e4f',
    '#f57c00',
    '#8b5cf6',
    '#d63384'
];

const T = [
    ['СТАРТ','s','🏁'],

    ['Нова Пошта',3200,0,'✚','#e1251b'],
    ['Шанс','c','❓'],

    ['Укрпошта',4500,0,'📮','#d90'],
    ['Податок','x','💰'],

    ['monobank',2500,1,'🅼','#000'],
    ['Adidas',5500,2,'👟','#000'],

    ['Шанс','c','❓'],

    ['Nike',5500,2,'✔️','#000'],
    ['Puma',5000,2,'🐆','#000'],

    ['В\'язниця','j','⛓️'],

    ['Telegram',4500,3,'✈️','#27a'],
    ['Kyivstar',4000,3,'✳️','#09f'],
    ['TikTok',4500,3,'🎵','#000'],

    ['YouTube',3500,4,'▶️','#d00'],
    ['Google',3500,4,'🔍','#48f'],

    ['ПриватБанк',2000,1,'🏦','#2a3'],

    ['Шанс','c','❓'],

    ['Живчик',5500,5,'🍋','#2a8'],
    ['Моршинська',5500,5,'⛰️','#d32'],

    ['Казино','k','🎰'],

    ['АТБ',2200,6,'🛒','#17b'],

    ['Шанс','c','❓'],

    ['justin',1800,6,'🟦','#16f'],

    ['Епіцентр',2400,7,'🔧','#14a'],
    ['Ощадбанк',2400,7,'💚','#052'],

    ['McDonald\'s',2600,8,'Ⓜ️','#e90'],
    ['KFC',2600,8,'🍗','#c00'],

    ['ДТЕК',2000,7,'⚡','#fc0'],

    ['Burger King',2800,8,'🍔','#d62'],

    ['Іди в в\'язницю','g','👮'],

    ['Rozetka',3000,9,'😄','#2a8'],
    ['OLX',3000,9,'⭕','#0a7'],

    ['Шанс','c','❓'],

    ['prom',3200,4,'🟪','#60c'],

    ['Райффайзен',3000,1,'✖️','#fc0'],

    ['Податок','x','💰'],

    ['Apple',3500,10,'🍏','#000'],

    ['Шанс','c','❓'],

    ['Samsung',4000,10,'📱','#14a']
];

const LG = {
    'Нова Пошта':'novaposhta',
    'Укрпошта':'ukrposhta',
    'monobank':'monobank',
    'Adidas':'adidas',
    'Nike':'nike',
    'Puma':'puma',
    'Telegram':'telegram',
    'TikTok':'tiktok',
    'Google':'google',
    'ПриватБанк':'privatbank',
    'Живчик':'zhyvchyk',
    'АТБ':'atb',
    'Ощадбанк':'oschadbank',
    "McDonald's":'mcdonalds',
    'KFC':'kfc',
    'Burger King':'burgerking',
    'Rozetka':'rozetka',
    'OLX':'olx',
    'prom':'prom',
    'Райффайзен':'raiffeisen',
    'Apple':'apple',
    'Samsung':'samsung',
    'Kyivstar':'kyivstar',
    'YouTube':'youtube',
    'Моршинська':'morshynska',
    'justin':'justin',
    'ДТЕК':'dtek'
};

const CARDS = [
    ['Знайшов гаманець: +500',500],
    ['Штраф за паркування: −400',-400],
    ['Лотерея: +1000',1000],
    ['Ремонт авто: −800',-800],
    ['Бабусин подарунок: +300',300],
    ['Іди на СТАРТ',0,'go'],
    ['Лови поліцію! В\'язниця',0,'jail']
];

const SAY = [
    'Повезло',
    'Ну ладно',
    'Фух',
    'Я навіть не здивована',
    'Зараз до Мар\'яни стану',
    'Хто купить Nike?'
];

const NM = [
    'Катерина',
    'Manwol🤍',
    'katya.ali',
    'Вілка🖤'
];

const AV = [
    '😎',
    '👩',
    '🧑‍🎤',
    '🦊'
];

const PC = [
    '#ff4d4d',
    '#3ddc84',
    '#ffd23f',
    '#4aa8ff',
    '#b46bff',
    '#ff7a45'
];

const DF = [
    '⚀',
    '⚁',
    '⚂',
    '⚃',
    '⚄',
    '⚅'
];

const pos = i => {

    if (i <= 10)
        return [1,1+i];

    if (i <= 20)
        return [i-9,11];

    if (i <= 30)
        return [11,31-i];

    return [41-i,1];
};

const side = i => {

    if (i < 10)
        return 'top';

    if (i < 20)
        return 'rt';

    if (i < 30)
        return 'bot';

    return 'lf';
};

const hm = () =>
    new Date().toTimeString().slice(0,5);

const fm = n =>
    Number(n || 0).toLocaleString('uk-UA') + ' ₴';

let code = '';
let R = null;
let S = null;
let LOGS = [];
let showAll = false;
let busy = false;
let started = false;
let P = [];
let own = [];
let lvl = [];
let ROOMS = [];
let modal = null;
let stats = false;
let lastRid = null;
let dzt = null;
let dzh = null;

const tg =
    window.Telegram &&
    window.Telegram.WebApp
        ? window.Telegram.WebApp
        : null;

let tu = null;

if (tg) {

    try {

        tg.ready();
        tg.expand();

        if (tg.setHeaderColor)
            tg.setHeaderColor('#070f22');

        if (tg.setBackgroundColor)
            tg.setBackgroundColor('#070f22');

        console.log(
            '[MONOPOLY] Telegram WebApp ready'
        );

        console.log(
            '[MONOPOLY] Telegram version:',
            tg.version
        );

        console.log(
            '[MONOPOLY] Telegram user:',
            tg.initDataUnsafe &&
            tg.initDataUnsafe.user
        );

        tu =
            tg.initDataUnsafe &&
            tg.initDataUnsafe.user
                ? tg.initDataUnsafe.user
                : null;

    } catch (e) {

        console.error(
            '[MONOPOLY] Telegram error',
            e
        );
    }
}

if (!tu) {

    const q =
        new URLSearchParams(
            location.search
        );

    if (
        q.get('name') ||
        q.get('id')
    ) {

        tu = {
            id:q.get('id') || '',
            first_name:q.get('name') || '',
            username:q.get('u') || '',
            photo_url:q.get('photo') || ''
        };
    }
}

if (!tu) {

    try {

        const d =
            new URLSearchParams(
                location.hash.slice(1)
            ).get('tgWebAppData');

        if (d) {

            const user =
                new URLSearchParams(d)
                    .get('user');

            if (user)
                tu = JSON.parse(user);
        }

    } catch(e) {

        console.warn(
            '[MONOPOLY] Telegram hash parse error',
            e
        );
    }
}

let myId = null;

if (tu && tu.id) {

    myId =
        'tg_' +
        String(tu.id);

} else {

    try {

        myId =
            localStorage.getItem('mid');

    } catch(e) {}
}

if (!myId) {

    myId =
        'p_' +
        Math.random()
            .toString(36)
            .slice(2,10);

    try {

        localStorage.setItem(
            'mid',
            myId
        );

    } catch(e) {}
}

const tname =
    tu
        ? [
            tu.first_name,
            tu.last_name
        ]
        .filter(Boolean)
        .join(' ')
          ||
          tu.username
          ||
          ''
        : '';

const nm = () => {

    const input =
        $('playerName');

    if (!input)
        return 'Гравець';

    return (
        input.value
            .trim()
            .slice(0,24)
        ||
        'Гравець'
    );
};

function okp(u) {

    return /^https:\/\/[^\s"'()<>\\]+$/.test(
        u || ''
    )
        ? u
        : '';
}

const myPh =
    okp(
        tu &&
        (
            tu.photo_url ||
            (
                tu.username
                    ? 'https://t.me/i/userpic/320/' +
                      tu.username +
                      '.jpg'
                    : ''
            )
        )
    );

function avh(p) {

    const u =
        okp(p && p.ph);

    const a =
        esc(
            p && p.a
                ? p.a
                : '?'
        );

    if (!u)
        return a;

    return `
        <img
            src="${u}"
            alt=""
            onerror="this.parentNode.textContent='${a}'"
        >
    `;
}

function tokn(p) {

    const u =
        okp(p.ph);

    return `
        <s
            style="
                --c:${p.c};
                ${u ? `background:url('${u}') center/cover` : ''}
            "
        >
            ${u ? '' : esc(p.a)}
        </s>
    `;
}

function esc(s) {

    return String(
        s == null
            ? ''
            : s
    ).replace(
        /[&<>"']/g,
        c => ({
            '&':'&amp;',
            '<':'&lt;',
            '>':'&gt;',
            '"':'&quot;',
            "'":'&#39;'
        }[c])
    );
}

if ($('playerName')) {

    if (tname) {

        $('playerName').value =
            tname;
    } else {

        try {

            const saved =
                localStorage.getItem(
                    'pname'
                );

            if (saved)
                $('playerName').value =
                    saved;

        } catch(e) {}
    }
}

function hdr() {

    if ($('meName'))
        $('meName').textContent =
            nm();

    if ($('meUser'))
        $('meUser').textContent =
            tu && tu.username
                ? '@' + tu.username
                : '';

    if ($('meAv'))
        $('meAv').innerHTML =
            avh({
                ph:myPh,
                a:nm()[0]
                    ? nm()[0]
                        .toUpperCase()
                    : '?'
            });
}

hdr();

if ($('playerName')) {

    $('playerName').oninput = () => {

        hdr();

        try {

            localStorage.setItem(
                'pname',
                $('playerName').value
            );

        } catch(e) {}
    };
}

function full(i) {

    const group =
        T[i] &&
        typeof T[i][1] === 'number'
            ? T[i][2]
            : null;

    if (group == null)
        return false;

    const props =
        T.map(
            (x,k) =>
                typeof x[1] === 'number' &&
                x[2] === group
                    ? k
                    : -1
        ).filter(
            k => k >= 0
        );

    return props.length > 0 &&
        props.every(
            k => own[k] === own[i]
        );
}

function rent(i) {

    const base =
        Math.round(
            T[i][1] * .10
        );

    const L =
        lvl[i] || 0;

    if (L > 0) {

        const mult = [
            1,
            4,
            8,
            14,
            20
        ];

        return (
            base *
            (mult[L] || 20)
        );
    }

    return full(i)
        ? base * 2
        : base;
}

function tile(b,i) {

    const [r,c] =
        pos(i);

    const s =
        side(i);

    const tk =
        P
            .map(
                p =>
                    p.alive &&
                    p.pos === i
                        ? tokn(p)
                        : ''
            )
            .join('');

    const corner =
        i % 10 === 0;

    const cls =
        (corner ? 'sp ' : '') +
        s;

    if (typeof b[1] !== 'number') {

        return `
            <div
                class="t ${cls}"
                style="grid-area:${r}/${c}"
            >
                <div class="in">
                    <span class="em">
                        ${b[2]}
                    </span>

                    ${
                        corner
                            ? ''
                            : `<span class="nm">
                                ${esc(b[0])}
                               </span>`
                    }
                </div>

                <div class="tk">
                    ${tk}
                </div>
            </div>
        `;
    }

    const owner =
        own[i] >= 0
            ? P[own[i]]
            : null;

    const bg =
        owner
            ? owner.c + 'aa'
            : '#fff';

    return `
        <div
            class="t ${cls}"
            style="
                grid-area:${r}/${c};
                --b:${bg}
            "
        >

            <div class="in">

                ${
                    LG[b[0]]
                        ? `
                            <img
                                class="lg"
                                src="logos/${LG[b[0]]}.png"
                                alt="${esc(b[0])}"
                                onerror="
                                    this.outerHTML =
                                    '<span class=nm>' +
                                    this.alt +
                                    '</span>'
                                "
                            >
                          `
                        : `
                            <span
                                class="em"
                                style="color:${b[4]}"
                            >
                                ${b[3]}
                            </span>

                            <span
                                class="nm"
                                style="color:${b[4]}"
                            >
                                ${esc(b[0])}
                            </span>
                          `
                }

                ${
                    lvl[i]
                        ? `
                            <div class="st">
                                ${'★'.repeat(
                                    lvl[i]
                                )}
                            </div>
                          `
                        : ''
                }

            </div>

            <div
                class="pr"
                style="--g:${GC[b[2]] || '#555'}"
            >
                ${fm(b[1])}
            </div>

            <div class="tk">
                ${tk}
            </div>

        </div>
    `;
}

function sync() {

    if (!S)
        return;

    P =
        Array.isArray(S.players)
            ? S.players
            : [];

    own =
        Array.isArray(S.own)
            ? S.own
            : Array(40).fill(-1);

    lvl =
        Array.isArray(S.lvl)
            ? S.lvl
            : Array(40).fill(0);
}

function on(id) {

    return !(
        R &&
        R.players &&
        R.players[id] &&
        R.players[id].online === false
    );
}

function driver() {

    if (!S || !S.players || !S.players.length)
        return false;

    const c =
        S.players[S.cur];

    if (!c)
        return false;

    if (on(c.id))
        return c.id === myId;

    const h =
        S.players.find(
            p =>
                p.alive &&
                on(p.id)
        );

    return !!h &&
        h.id === myId;
}

function fresh(ps) {

    return {

        players:
            ps.map(
                (p,i) => ({
                    id:p.id,
                    n:p.n,
                    ph:p.ph || '',
                    c:PC[i % PC.length],
                    a:(
                        p.n ||
                        '?'
                    )[0].toUpperCase(),

                    m:START_MONEY,

                    pos:0,

                    jail:0,

                    alive:true,

                    doubles:0,

                    debt:0,

                    stats:{
                        turns:0,
                        properties:0,
                        rentPaid:0,
                        rentEarned:0
                    }
                })
            ),

        own:Array(40).fill(-1),

        lvl:Array(40).fill(0),

        cur:0,

        ph:'roll',

        dice:null,

        rid:null,

        tend:
            Date.now() +
            TURN_TIME * 1000
    };
}

function ev(p,t,c) {

    if (!db || !code)
        return;

    push(
        ref(
            db,
            'rooms/' +
            code +
            '/log'
        ),
        {
            p,
            t,
            c:c ? 1 : 0,
            h:hm()
        }
    );
}

async function save() {

    if (!db || !code || !S)
        return;

    await set(
        ref(
            db,
            'rooms/' +
            code +
            '/state'
        ),
        S
    );
}

async function createRoom() {

    if (!db)
        return;

    try {

        code =
            'GAME-' +
            Math.random()
                .toString(36)
                .slice(2,6)
                .toUpperCase();

        const player = {
            id:myId,
            name:nm(),
            ph:myPh,
            j:Date.now(),
            online:true
        };

        await set(
            ref(
                db,
                'rooms/' +
                code
            ),
            {
                code,
                status:'waiting',
                players:{
                    [myId]:player
                }
            }
        );

        enter();

    } catch(error) {

        alert(
            'Не вдалося створити кімнату:\n' +
            error.message
        );

        console.error(error);
    }
}

async function joinRoom(c) {

    if (!db)
        return;

    try {

        c =
            String(c)
                .trim()
                .toUpperCase();

        const snapshot =
            await get(
                ref(
                    db,
                    'rooms/' +
                    c
                )
            );

        const r =
            snapshot.val();

        if (!r) {

            alert(
                'Кімнату не знайдено!'
            );

            return;
        }

        const ps =
            r.players || {};

        if (!ps[myId]) {

            if (
                r.status !==
                'waiting'
            ) {

                alert(
                    'Гра вже почалась!'
                );

                return;
            }

            if (
                Object.keys(ps).length >=
                MAX_PLAYERS
            ) {

                alert(
                    'Кімната повна!'
                );

                return;
            }

            await set(
                ref(
                    db,
                    'rooms/' +
                    c +
                    '/players/' +
                    myId
                ),
                {
                    id:myId,
                    name:nm(),
                    ph:myPh,
                    j:Date.now(),
                    online:true
                }
            );

        } else {

            await update(
                ref(
                    db,
                    'rooms/' +
                    c +
                    '/players/' +
                    myId
                ),
                {
                    online:true,
                    name:nm(),
                    ph:myPh
                }
            );
        }

        code = c;

        enter();

    } catch(error) {

        alert(
            'Помилка входу:\n' +
            error.message
        );

        console.error(error);
    }
}

function enter(spec) {

    if (!spec) {

        onDisconnect(
            ref(
                db,
                'rooms/' +
                code +
                '/players/' +
                myId
            )
        ).update({
            online:false
        });
    }

    $('lobbyContent').style.display =
        'none';

    $('waitingRoom').style.display =
        'block';

    $('roomCodeDisplay').textContent =
        code;

    listen();
}

function listen() {

    onValue(
        ref(
            db,
            'rooms/' +
            code
        ),
        snapshot => {

            R =
                snapshot.val();

            if (!R)
                return;

            if (
                R.status ===
                'waiting'
            ) {

                const a =
                    Object.values(
                        R.players || {}
                    ).sort(
                        (x,y) =>
                            x.j - y.j
                    );

                $('playersList').innerHTML =
                    a.map(
                        p => `
                            <div class="pi">

                                <span class="av">
                                    ${avh({
                                        ph:p.ph,
                                        a:(
                                            p.name ||
                                            '?'
                                        )[0]
                                            .toUpperCase()
                                    })}
                                </span>

                                ${esc(p.name)}

                                ${
                                    p.online
                                        ? '🟢'
                                        : '🔴'
                                }

                            </div>
                        `
                    ).join('');

                const host =
                    a[0] &&
                    a[0].id === myId;

                $('startGameBtn').style.display =
                    host
                        ? 'block'
                        : 'none';

                $('startGameBtn').disabled =
                    a.length < 2;

                $('startGameBtn').textContent =
                    'Почати гру (' +
                    a.length +
                    ' гравців)';

            } else if (R.state) {

                S =
                    R.state;

                if (!started) {

                    started = true;

                    $('lobby').style.display =
                        'none';

                    $('gameBoard').style.display =
                        'block';
                }

                render();
            }
        },

        error => {

            startupError(
                'Не вдалося відкрити кімнату',
                error
            );
        }
    );

    onValue(
        query(
            ref(
                db,
                'rooms/' +
                code +
                '/log'
            ),
            limitToLast(60)
        ),
        snapshot => {

            LOGS = [];

            snapshot.forEach(
                c => {
                    LOGS.push(
                        c.val()
                    );
                }
            );

            if (S)
                render();
        }
    );
}

async function startGame() {

    if (!db)
        return;

    try {

        const snapshot =
            await get(
                ref(
                    db,
                    'rooms/' +
                    code +
                    '/players'
                )
            );

        const ps =
            Object.values(
                snapshot.val() || {}
            ).sort(
                (a,b) =>
                    a.j - b.j
            );

        if (ps.length < 2)
            return;

        if (
            ps[0].id !== myId
        )
            return;

        const state =
            fresh(
                ps.map(
                    p => ({
                        id:p.id,
                        n:p.name,
                        ph:p.ph || ''
                    })
                )
            );

        await update(
            ref(
                db,
                'rooms/' +
                code
            ),
            {
                state,
                status:'playing'
            }
        );

        ev(
            0,
            'Гра почалась! Капітал ' +
            fm(START_MONEY)
        );

    } catch(error) {

        alert(
            'Не вдалося почати гру:\n' +
            error.message
        );
    }
}

async function newGame() {

    if (!S)
        return;

    if (
        !S.players[0] ||
        S.players[0].id !== myId
    )
        return;

    S =
        fresh(
            S.players.map(
                p => ({
                    id:p.id,
                    n:p.n,
                    ph:p.ph || ''
                })
            )
        );

    await save();

    ev(
        0,
        'Нова гра! Капітал ' +
        fm(START_MONEY)
    );
}

function pay(k,a,to) {

    const p =
        S.players[k];

    if (!p)
        return;

    a =
        Math.max(
            0,
            Math.round(a)
        );

    p.m -= a;

    if (to != null) {

        const target =
            S.players[to];

        if (target) {

            target.m += a;

            if (
                target.stats
            ) {

                target.stats.rentEarned =
                    (
                        target.stats.rentEarned ||
                        0
                    ) + a;
            }
        }

        if (p.stats) {

            p.stats.rentPaid =
                (
                    p.stats.rentPaid ||
                    0
                ) + a;
        }
    }

    if (p.m < 0) {

        p.m = 0;

        p.alive = false;

        S.own.forEach(
            (o,j) => {

                if (o === k) {

                    S.own[j] = -1;

                    S.lvl[j] = 0;
                }
            }
        );

        ev(
            k,
            'збанкрутував 💥'
        );
    }
}

async function roll() {

    if (
        !S ||
        S.ph !== 'roll' ||
        busy ||
        !driver()
    )
        return;

    busy = true;

    sync();

    const k =
        S.cur;

    const p =
        P[k];

    if (!p) {

        busy = false;
        return;
    }

    const d1 =
        1 +
        Math.floor(
            Math.random() * 6
        );

    const d2 =
        1 +
        Math.floor(
            Math.random() * 6
        );

    const doubles =
        d1 === d2;

    S.dice = [
        d1,
        d2
    ];

    S.rid =
        Date.now() +
        Math.random();

    ev(
        k,
        'викидає ' +
        d1 +
        ' + ' +
        d2
    );

    if (p.jail > 0) {

        if (doubles) {

            p.jail = 0;

            p.doubles =
                (p.doubles || 0) + 1;

            ev(
                k,
                'випав дубль — виходить з в\'язниці!'
            );

        } else {

            p.jail++;

            ev(
                k,
                'не випав дубль — залишається у в\'язниці'
            );

            if (p.jail >= 3) {

                p.jail = 0;

                if (p.m >= 500) {

                    p.m -= 500;

                    ev(
                        k,
                        'сплатив штраф 500 ₴'
                    );

                } else {

                    ev(
                        k,
                        'не має 500 ₴ — штраф списано з капіталу'
                    );
                }
            }

            S.ph = 'wait';

            await save();

            setTimeout(
                () => end(),
                1500
            );

            return;
        }
    }

    if (doubles) {

        p.doubles =
            (p.doubles || 0) + 1;

        if (p.doubles >= 3) {

            p.doubles = 0;
            p.pos = 10;
            p.jail = 1;

            ev(
                k,
                'три дубля поспіль — у в\'язницю! 👮'
            );

            S.ph = 'wait';

            await save();

            setTimeout(
                () => end(),
                1500
            );

            return;
        }

    } else {

        p.doubles = 0;
    }

    const steps =
        d1 + d2;

    const old =
        p.pos;

    const np =
        old + steps;

    if (np >= 40) {

        p.m += SALARY;

        ev(
            k,
            'отримав зарплату +' +
            SALARY +
            ' ₴'
        );
    }

    p.pos =
        np % 40;

    if (p.stats)
        p.stats.turns =
            (p.stats.turns || 0) + 1;

    S.ph = 'wait';

    await save();

    setTimeout(
        land,
        1500
    );
}

async function land() {

    if (!S)
        return;

    sync();

    const k =
        S.cur;

    const p =
        P[k];

    if (!p) {
        busy = false;
        return;
    }

    const b =
        T[p.pos];

    const t =
        b[1];

    S.dice = null;

    if (typeof t === 'number') {

        const o =
            own[p.pos];

        if (o === -1) {

            S.ph = 'buy';

            S.tend =
                Date.now() +
                TURN_TIME * 1000;

            await save();

            busy = false;

            return;
        }

        if (o !== k) {

            const r =
                rent(p.pos);

            ev(
                k,
                'платить оренду ' +
                fm(r) +
                ' → ' +
                P[o].n
            );

            pay(
                k,
                r,
                o
            );

        } else if (
            full(p.pos) &&
            lvl[p.pos] < 4
        ) {

            S.ph = 'buy';

            S.tend =
                Date.now() +
                TURN_TIME * 1000;

            await save();

            busy = false;

            return;
        }

    } else if (t === 'c') {

        const c =
            CARDS[
                Math.floor(
                    Math.random() *
                    CARDS.length
                )
            ];

        ev(
            k,
            '🎴 ' + c[0]
        );

        if (c[2] === 'go') {

            p.pos = 0;

            p.m += SALARY;

            ev(
                k,
                'отримав зарплату +' +
                SALARY +
                ' ₴'
            );

        } else if (
            c[2] === 'jail'
        ) {

            p.pos = 10;
            p.jail = 1;

        } else if (
            c[1] > 0
        ) {

            p.m += c[1];

        } else {

            pay(
                k,
                Math.abs(c[1])
            );
        }

    } else if (t === 'x') {

        const tax =
            p.pos === 36
                ? 1500
                : 800;

        ev(
            k,
            'сплатив податок ' +
            fm(tax)
        );

        pay(
            k,
            tax
        );

    } else if (t === 'g') {

        p.pos = 10;
        p.jail = 1;

        ev(
            k,
            'іде у в\'язницю 👮'
        );

    } else if (t === 'k') {

        if (
            Math.random() < .4
        ) {

            p.m += 1000;

            ev(
                k,
                'виграв у казино +1000 ₴ 🎰'
            );

        } else {

            ev(
                k,
                'програв у казино −600 ₴ 🎰'
            );

            pay(
                k,
                600
            );
        }
    }

    await save();

    setTimeout(
        end,
        1200
    );
}

async function buy() {

    if (
        !S ||
        S.ph !== 'buy' ||
        busy ||
        !driver()
    )
        return;

    busy = true;

    sync();

    const k =
        S.cur;

    const p =
        P[k];

    const b =
        T[p.pos];

    if (
        own[p.pos] === k
    ) {

        const cost =
            Math.round(
                b[1] * .25
            );

        if (
            lvl[p.pos] < 4 &&
            p.m >= cost
        ) {

            p.m -= cost;

            lvl[p.pos]++;

            ev(
                k,
                'побудував рівень ' +
                lvl[p.pos] +
                ' на ' +
                b[0] +
                ' за ' +
                fm(cost)
            );

        } else {

            ev(
                k,
                'не вистачає коштів'
            );
        }

    } else if (
        p.m >= b[1]
    ) {

        p.m -= b[1];

        own[p.pos] = k;

        if (p.stats) {

            p.stats.properties =
                (
                    p.stats.properties ||
                    0
                ) + 1;
        }

        ev(
            k,
            'купує ' +
            b[0] +
            ' за ' +
            fm(b[1])
        );

    } else {

        ev(
            k,
            'не вистачає коштів'
        );
    }

    S.ph = 'wait';

    await save();

    setTimeout(
        end,
        900
    );
}

async function skip() {

    if (
        !S ||
        S.ph !== 'buy' ||
        busy ||
        !driver()
    )
        return;

    busy = true;

    S.ph = 'wait';

    await save();

    setTimeout(
        end,
        400
    );
}

async function end() {

    if (!S)
        return;

    sync();

    const alive =
        P.filter(
            p => p.alive
        );

    if (
        alive.length < 2
    ) {

        S.ph = 'over';

        S.dice = null;

        const winner =
            alive[0];

        if (winner) {

            ev(
                P.indexOf(winner),
                '🏆 переміг!'
            );
        }

        await save();

        busy = false;

        return;
    }

    let n =
        S.cur;

    let guard = 0;

    do {

        n =
            (n + 1) %
            P.length;

        guard++;

        if (guard > P.length + 2)
            break;

    } while (
        !P[n].alive
    );

    S.cur = n;

    S.ph = 'roll';

    S.dice = null;

    S.tend =
        Date.now() +
        TURN_TIME * 1000;

    await save();

    busy = false;
}

function say() {

    const input =
        $('ci');

    if (
        !S ||
        !input ||
        !input.value.trim()
    )
        return;

    sync();

    const m =
        P.findIndex(
            p =>
                p.id === myId
        );

    ev(
        m < 0 ? 0 : m,
        input.value
            .trim()
            .slice(0,80),
        1
    );

    input.value = '';
}

function render() {

    if (!S)
        return;

    sync();

    const k =
        S.cur;

    const c =
        P[k];

    if (!c)
        return;

    const mine =
        c.id === myId;

    const ph =
        S.ph;

    const dice =
        S.dice;

    const pb =
        T[c.pos];

    const spec =
        !P.some(
            p =>
                p.id === myId
        );

    const isB =
        typeof pb[1] === 'number' &&
        own[c.pos] === k;

    const pn =
        P.map(
            (p,i) => `
                <div
                    class="pl
                        ${i === k ? 'on' : ''}
                        ${p.alive ? '' : 'dead'}"
                    style="--c:${p.c}"
                    onclick="prof(${i})"
                >

                    ${
                        i === k &&
                        p.alive &&
                        ph !== 'over'
                            ? `
                                <i
                                    class="tm"
                                    id="tm"
                                >
                                    30 c
                                </i>
                              `
                            : ''
                    }

                    <div class="av">
                        ${avh(p)}
                    </div>

                    <div>

                        <b>
                            ${esc(p.n)}
                            ${
                                p.id === myId
                                    ? ' (ти)'
                                    : ''
                            }
                        </b>

                        <span>
                            ${
                                p.alive
                                    ? fm(p.m)
                                    : 'БАНКРУТ'
                            }
                        </span>

                    </div>

                </div>
            `
        ).join('');

    let ac = '';

    if (
        mine &&
        ph === 'buy'
    ) {

        ac = `
            <div class="ac">

                <button
                    class="y"
                    onclick="buy()"
                >
                    ${
                        isB
                            ? 'Покращити ' +
                              Math.round(
                                  pb[1] * .25
                              ) +
                              ' ₴'
                            : 'Купити ' +
                              fm(pb[1])
                    }
                </button>

                <button
                    class="n"
                    onclick="skip()"
                >
                    Пас
                </button>

            </div>
        `;

    } else if (
        ph === 'over' &&
        P[0] &&
        P[0].id === myId
    ) {

        ac = `
            <div class="ac">

                <button
                    onclick="newGame()"
                >
                    Нова гра
                </button>

            </div>
        `;
    }

    let sub =
        'Очікуйте завершення ходу.';

    if (ph === 'over') {

        sub =
            'Гру завершено';

    } else if (
        mine &&
        ph === 'buy'
    ) {

        sub =
            isB
                ? 'Покращити ділянку?'
                : 'Купити ' +
                  pb[0] +
                  '?';

    } else if (
        mine &&
        ph === 'roll'
    ) {

        sub =
            'Твій хід — кидай кубики.';
    }

    const L =
        showAll
            ? LOGS
            : LOGS.slice(-4);

    let h = `
        <div id="top">

            ${pn}

            <button
                class="mn"
                onclick="
                    if(confirm('Вийти з гри?'))
                        location.reload()
                "
            >
                ⋮
            </button>

        </div>

        <div id="bd">

            ${T.map(tile).join('')}

            <div id="mid">

                <h3>

                    Події гри

                    <span class="hb">

                        <span class="ib">
                            👁 ${P.length}
                        </span>

                        <button
                            class="ib"
                            onclick="tgl()"
                        >
                            ${
                                showAll
                                    ? 'Менше'
                                    : 'Усі'
                            }
                        </button>

                    </span>

                </h3>

                <div id="log">

                    ${
                        L.map(
                            e => {

                                const q =
                                    P[e.p] ||
                                    {
                                        c:'#888',
                                        n:''
                                    };

                                return e.c
                                    ? `
                                        <div
                                            class="ev c"
                                            style="--c:${q.c}"
                                        >
                                            <b>
                                                ${esc(q.n)}
                                            </b>

                                            ${esc(e.t)}
                                        </div>
                                      `
                                    : `
                                        <div
                                            class="ev"
                                            style="--c:${q.c}"
                                        >
                                            <b>
                                                ${esc(q.n)}
                                            </b>

                                            ${esc(e.t)}
                                        </div>
                                      `;
                            }
                        ).join('')
                    }

                </div>

                <div class="row">

                    <input
                        id="ci"
                        ${
                            spec
                                ? 'disabled placeholder="Ви спостерігаєте"'
                                : 'placeholder="Написати повідомлення…"'
                        }
                        onkeydown="
                            if(event.key==='Enter')
                                say()
                        "
                    >

                    <button onclick="say()">
                        ➤
                    </button>

                </div>

                <div id="sc">

                    <b>
                        ${
                            ph === 'over'
                                ? 'Кінець гри'
                                : 'Хід гравця ' +
                                  esc(c.n)
                        }
                    </b>

                    <small>
                        ${sub}
                    </small>

                    ${ac}

                </div>

            </div>

        </div>

        ${
            mine &&
            ph === 'roll' &&
            !spec
                ? `
                    <button
                        class="fab"
                        onclick="roll()"
                    >
                        🎲 Кинути кубики
                    </button>
                  `
                : ''
        }

        ${modalHtml()}
    `;

    const oldInput =
        $('ci');

    const oldValue =
        oldInput
            ? oldInput.value
            : '';

    const focused =
        oldInput &&
        document.activeElement ===
        oldInput;

    $('app').innerHTML =
        h;

    const newInput =
        $('ci');

    if (newInput) {

        newInput.value =
            oldValue;

        if (focused)
            newInput.focus();
    }

    const lg =
        $('log');

    if (lg)
        lg.scrollTop =
            lg.scrollHeight;

    if (
        dice &&
        S.rid &&
        S.rid !== lastRid
    ) {

        lastRid =
            S.rid;

        playDice(dice);
    }
}

function tgl() {

    showAll =
        !showAll;

    render();
}

function prof(i) {

    modal = i;
    stats = false;

    render();
}

function closeProf() {

    modal = null;

    render();
}

function tgs() {

    stats =
        !stats;

    render();
}

function modalHtml() {

    if (
        modal == null ||
        !S
    )
        return '';

    const p =
        P[modal];

    if (!p)
        return '';

    const me =
        p.id === myId;

    const my =
        me &&
        S.cur === modal &&
        driver() &&
        (
            S.ph === 'roll' ||
            S.ph === 'buy'
        );

    const ls =
        T.map(
            (b,i) =>
                own[i] === modal
                    ? i
                    : -1
        ).filter(
            i => i >= 0
        );

    const val =
        ls.reduce(
            (s,i) =>
                s + T[i][1],
            0
        );

    const st =
        ls.reduce(
            (s,i) =>
                s + (
                    lvl[i] || 0
                ),
            0
        );

    let h = `
        <div
            class="ov"
            onclick="closeProf()"
        >

            <div
                class="md"
                onclick="event.stopPropagation()"
            >

                <div class="mh">

                    <div
                        class="av big"
                        style="--c:${p.c}"
                    >
                        ${avh(p)}
                    </div>

                    <div>

                        <small class="gd">
                            ${
                                me
                                    ? 'ВАШ ГРАВЕЦЬ'
                                    : 'ГРАВЕЦЬ'
                            }
                        </small>

                        <h2>
                            ${esc(p.n)}
                        </h2>

                        <span class="mm">
                            ${fm(p.m)}
                        </span>

                    </div>

                    <button
                        class="x"
                        onclick="closeProf()"
                    >
                        ✕
                    </button>

                </div>
    `;

    h += `
        <div
            class="mi gold"
            onclick="tgs()"
        >

            <i>👤</i>

            <div>

                <b>Профіль</b>

                <small>
                    Переглянути статистику гравця
                </small>

            </div>

        </div>
    `;

    if (stats) {

        h += `
            <div class="stt">

                Ділянок:
                <b>${ls.length}</b>

                ·

                Вартість:
                <b>${fm(val)}</b>

                ·

                Рівнів:
                <b>${st}</b>

                ${
                    p.debt
                        ? `
                            · Кредит:
                            <b>
                                ${fm(p.debt)}
                            </b>
                          `
                        : ''
                }

            </div>
        `;
    }

    if (me) {

        h += `
            <div class="mi grn">

                <i>🏦</i>

                <div>

                    <b>Кредит</b>

                    <small>
                        ${
                            my
                                ? 'Борг: ' +
                                  fm(p.debt || 0)
                                : 'Доступно під час вашого ходу'
                        }
                    </small>

                    ${
                        my
                            ? `
                                <div class="cb">

                                    <button
                                        onclick="credit(1)"
                                    >
                                        Взяти 2 000 ₴
                                    </button>

                                    <button
                                        class="n"
                                        onclick="credit(0)"
                                    >
                                        Повернути
                                    </button>

                                </div>
                              `
                            : ''
                    }

                </div>

            </div>

            <div
                class="mi red"
                ${
                    my
                        ? 'onclick="surr()"'
                        : 'style="opacity:.55"'
                }
            >

                <i>🏳️</i>

                <div>

                    <b>Здатися</b>

                    <small>
                        ${
                            my
                                ? 'Вийти з гри, програвши'
                                : 'Доступно лише під час вашого ходу'
                        }
                    </small>

                </div>

            </div>
        `;
    }

    return h +
        `
            </div>
        </div>
        `;
}

async function credit(t) {

    if (
        !S ||
        busy ||
        !driver() ||
        !(
            S.ph === 'roll' ||
            S.ph === 'buy'
        )
    )
        return;

    sync();

    const k =
        S.cur;

    const p =
        P[k];

    if (
        !p ||
        p.id !== myId
    )
        return;

    busy = true;

    if (t) {

        if (
            (p.debt || 0) >= 4800
        ) {

            busy = false;

            alert(
                'Ліміт кредиту досягнуто'
            );

            return;
        }

        p.m += 2000;

        p.debt =
            (p.debt || 0) +
            2400;

        ev(
            k,
            'взяв кредит 2000 ₴ (повернути 2400 ₴)'
        );

    } else {

        const x =
            Math.min(
                p.m,
                p.debt || 0
            );

        if (x <= 0) {

            busy = false;

            return;
        }

        p.m -= x;

        p.debt -= x;

        ev(
            k,
            'повернув кредит ' +
            fm(x)
        );
    }

    await save();

    busy = false;

    render();
}

async function surr() {

    if (
        !S ||
        busy ||
        !driver() ||
        !(
            S.ph === 'roll' ||
            S.ph === 'buy'
        )
    )
        return;

    sync();

    const k =
        S.cur;

    const p =
        P[k];

    if (
        !p ||
        p.id !== myId
    )
        return;

    if (
        !confirm(
            'Здатися?'
        )
    )
        return;

    busy = true;

    modal = null;

    p.m = 0;

    p.alive = false;

    S.own.forEach(
        (o,j) => {

            if (o === k) {

                S.own[j] = -1;
                S.lvl[j] = 0;
            }
        }
    );

    ev(
        k,
        'здався 🏳️'
    );

    S.ph = 'wait';

    await save();

    await end();
}

Object.assign(
    window,
    {
        roll,
        buy,
        skip,
        say,
        newGame,
        tgl,
        prof,
        closeProf,
        tgs,
        credit,
        surr,
        joinRoom,
        watch
    }
);

function watch(c) {

    code = c;

    enter(true);
}

function loadRooms() {

    if (!db)
        return;

    onValue(
        ref(db,'rooms'),
        snapshot => {

            ROOMS = [];

            snapshot.forEach(
                child => {

                    const r =
                        child.val();

                    if (
                        !r ||
                        !r.players
                    )
                        return;

                    const ps =
                        Object.values(
                            r.players
                        ).sort(
                            (a,b) =>
                                a.j - b.j
                        );

                    if (
                        !ps.some(
                            p => p.online
                        )
                    )
                        return;

                    const mine =
                        ps.some(
                            p =>
                                p.id === myId
                        );

                    if (
                        r.state &&
                        r.state.ph === 'over' &&
                        !mine
                    )
                        return;

                    ROOMS.push({
                        code:child.key,
                        st:r.status,
                        ps,
                        mine
                    });
                }
            );

            if (!code)
                renderLobby();
        },

        error => {

            console.error(
                '[MONOPOLY] Rooms error',
                error
            );

            if ($('roomList')) {

                $('roomList').innerHTML =
                    `
                        <p class="mut">
                            ⚠️ Не вдалося завантажити кімнати.
                            <br><br>
                            ${esc(error.message)}
                        </p>
                    `;
            }
        }
    );
}

function renderLobby() {

    if (!$('roomList'))
        return;

    $('roomCount').textContent =
        'Знайдено: ' +
        ROOMS.length;

    $('roomList').innerHTML =
        ROOMS.map(
            r => {

                const h =
                    r.ps[0];

                const playing =
                    r.st === 'playing';

                const q =
                    "'" +
                    r.code +
                    "'";

                let btn;

                if (r.mine) {

                    btn =
                        `
                            <button
                                class="y"
                                onclick="joinRoom(${q})"
                            >
                                Продовжити
                            </button>
                        `;

                } else if (playing) {

                    btn =
                        `
                            <button
                                class="n"
                                onclick="watch(${q})"
                            >
                                Дивитися
                            </button>
                        `;

                } else if (
                    r.ps.length >=
                    MAX_PLAYERS
                ) {

                    btn =
                        `
                            <button
                                class="n"
                                disabled
                            >
                                Повна
                            </button>
                        `;

                } else {

                    btn =
                        `
                            <button
                                onclick="joinRoom(${q})"
                            >
                                Приєднатися
                            </button>
                        `;
                }

                return `
                    <div class="rm">

                        <div class="av">

                            ${avh({
                                ph:h.ph,
                                a:(
                                    h.name ||
                                    '?'
                                )[0].toUpperCase()
                            })}

                        </div>

                        <div class="ri">

                            <b>
                                ${esc(h.name)}
                            </b>

                            <span
                                class="bd ${
                                    playing
                                        ? 'pg'
                                        : 'wt'
                                }"
                            >
                                ${
                                    playing
                                        ? 'Гра триває'
                                        : 'Очікування'
                                }
                            </span>

                            <small class="mut">
                                ${
                                    r.ps.length
                                }/${MAX_PLAYERS}
                                гравців
                            </small>

                        </div>

                        ${btn}

                    </div>
                `;
            }
        ).join('')
        ||
        `
            <p class="mut">
                Кімнат поки немає — створи свою!
            </p>
        `;
}

const PIPS = [
    [],
    [5],
    [1,9],
    [1,5,9],
    [1,3,7,9],
    [1,3,5,7,9],
    [1,3,4,6,7,9]
];

function pips(n) {

    let s = '';

    for (
        let i = 1;
        i <= 9;
        i++
    ) {

        s +=
            '<i' +
            (
                PIPS[n].includes(i)
                    ? ' class="p"'
                    : ''
            ) +
            '></i>';
    }

    return s;
}

function playDice(d) {

    const z =
        $('dz');

    if (!z)
        return;

    clearInterval(dzt);
    clearTimeout(dzh);

    z.innerHTML = `
        <div class="dw">

            <div class="dd roll">
                <div class="die"></div>
            </div>

            <div class="dd d2 roll">
                <div class="die"></div>
            </div>

        </div>

        <div class="sum"></div>
    `;

    z.style.display =
        'grid';

    const setDice =
        (a,b) => {

            const els =
                z.querySelectorAll(
                    '.die'
                );

            els.forEach(
                (e,i) => {

                    e.innerHTML =
                        pips(
                            i
                                ? b
                                : a
                        );
                }
            );
        };

    const randomDie =
        () =>
            1 +
            Math.floor(
                Math.random() * 6
            );

    setDice(
        randomDie(),
        randomDie()
    );

    dzt =
        setInterval(
            () => {

                setDice(
                    randomDie(),
                    randomDie()
                );

            },
            90
        );

    dzh =
        setTimeout(
            () => {

                clearInterval(dzt);

                setDice(
                    d[0],
                    d[1]
                );

                z.querySelectorAll(
                    '.dd'
                ).forEach(
                    e => {

                        e.classList.remove(
                            'roll'
                        );

                        e.classList.add(
                            'pop'
                        );
                    }
                );

                const s =
                    z.querySelector(
                        '.sum'
                    );

                if (s) {

                    s.textContent =
                        '= ' +
                        (
                            d[0] +
                            d[1]
                        );

                    s.classList.add(
                        'on'
                    );
                }

                try {

                    if (
                        tg &&
                        tg.HapticFeedback
                    ) {

                        tg.HapticFeedback
                            .impactOccurred(
                                'medium'
                            );
                    }

                } catch(e) {}

                dzh =
                    setTimeout(
                        () => {

                            z.style.display =
                                'none';

                        },
                        1100
                    );

            },
            1000
        );
}

setInterval(
    () => {

        if (
            !S ||
            !R ||
            S.ph === 'over'
        )
            return;

        const tm =
            $('tm');

        if (tm) {

            tm.textContent =
                Math.max(
                    0,
                    Math.ceil(
                        (
                            S.tend -
                            Date.now()
                        ) / 1000
                    )
                ) + ' c';
        }

        if (
            !busy &&
            Date.now() >
                S.tend + 800 &&
            driver()
        ) {

            if (
                S.ph === 'roll'
            ) {

                roll();

            } else if (
                S.ph === 'buy'
            ) {

                skip();
            }
        }

    },
    500
);

$('createBtn').onclick =
    createRoom;

$('joinBtn').onclick =
    () => {

        const c =
            $('roomCodeInput')
                .value
                .trim()
                .toUpperCase();

        if (c)
            joinRoom(c);
    };

$('startGameBtn').onclick =
    startGame;

loadFirebase();
