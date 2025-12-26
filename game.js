let players = [
    {name:"Гравець 1", money:15000, position:0},
    {name:"Гравець 2", money:15000, position:0}
];
let currentPlayer = 0;

let board = [
    {name:"Старт", price:0, owner:null},
    {name:"Київ", price:2000, owner:null},
    {name:"Львів", price:1800, owner:null},
    {name:"Одеса", price:1500, owner:null},
    {name:"Харків", price:1700, owner:null}
];

const log = document.getElementById("log");
const diceResult = document.getElementById("diceResult");
const rollBtn = document.getElementById("rollBtn");
const propertyPanel = document.getElementById("propertyPanel");
const propertyName = document.getElementById("propertyName");
const propertyPrice = document.getElementById("propertyPrice");
const buyBtn = document.getElementById("buyBtn");
const skipBtn = document.getElementById("skipBtn");

rollBtn.addEventListener("click", rollDice);
buyBtn.addEventListener("click", buyProperty);
skipBtn.addEventListener("click", skipProperty);

function rollDice(){
    let d1 = Math.floor(Math.random()*6)+1;
    let d2 = Math.floor(Math.random()*6)+1;
    let total = d1 + d2;
    diceResult.innerText = `🎲 ${d1} + ${d2} = ${total}`;

    let player = players[currentPlayer];
    player.position = (player.position + total) % board.length;
    logMessage(`${player.name} ходить на ${board[player.position].name}`);

    let landed = board[player.position];
    if(landed.owner === null && landed.price > 0){
        showPropertyPanel(landed);
    } else if(landed.owner && landed.owner !== player){
        let rent = Math.floor(landed.price * 0.1);
        player.money -= rent;
        landed.owner.money += rent;
        logMessage(`${player.name} платить ${rent}₴ → ${landed.owner.name}`);
        nextTurn();
    } else {
        nextTurn();
    }
}

function showPropertyPanel(property){
    propertyPanel.style.display = "block";
    propertyName.innerText = property.name;
    propertyPrice.innerText = `Ціна: ${property.price}₴`;
}

function buyProperty(){
    let player = players[currentPlayer];
    let property = board[player.position];
    if(player.money >= property.price){
        player.money -= property.price;
        property.owner = player;
        logMessage(`${player.name} купив ${property.name}`);
    }
    propertyPanel.style.display = "none";
    nextTurn();
}

function skipProperty(){
    propertyPanel.style.display = "none";
    nextTurn();
}

function nextTurn(){
    currentPlayer = (currentPlayer+1)%players.length;
}

function logMessage(msg){
    log.innerText += msg + "\n";
    log.scrollTop = log.scrollHeight;
}