import React, { useState } from 'react';
import { Dices, Trophy } from 'lucide-react';

const BOARD_SPACES = [
  { id: 0, name: 'Старт', type: 'start', color: null },
  { id: 1, name: 'Луцьк', type: 'property', color: 'brown', price: 600, rent: [20, 100, 300, 900, 1600, 2500] },
  { id: 2, name: 'Скарбниця', type: 'chest', color: null },
  { id: 3, name: 'Тернопіль', type: 'property', color: 'brown', price: 600, rent: [40, 200, 600, 1800, 3200, 4500] },
  { id: 4, name: 'Податок', type: 'tax', color: null, price: 2000 },
  { id: 5, name: 'Залізниця Київ', type: 'railroad', color: null, price: 2000, rent: [250, 500, 1000, 2000] },
  { id: 6, name: 'Чернігів', type: 'property', color: 'lightblue', price: 1000, rent: [60, 300, 900, 2700, 4000, 5500] },
  { id: 7, name: 'Шанс', type: 'chance', color: null },
  { id: 8, name: 'Суми', type: 'property', color: 'lightblue', price: 1000, rent: [60, 300, 900, 2700, 4000, 5500] },
  { id: 9, name: 'Полтава', type: 'property', color: 'lightblue', price: 1200, rent: [80, 400, 1000, 3000, 4500, 6000] },
  { id: 10, name: 'У в\'язниці', type: 'jail', color: null },
  { id: 11, name: 'Житомир', type: 'property', color: 'pink', price: 1400, rent: [100, 500, 1500, 4500, 6250, 7500] },
  { id: 12, name: 'Електростанція', type: 'utility', color: null, price: 1500 },
  { id: 13, name: 'Вінниця', type: 'property', color: 'pink', price: 1400, rent: [100, 500, 1500, 4500, 6250, 7500] },
  { id: 14, name: 'Черкаси', type: 'property', color: 'pink', price: 1600, rent: [120, 600, 1800, 5000, 7000, 9000] },
  { id: 15, name: 'Залізниця Львів', type: 'railroad', color: null, price: 2000, rent: [250, 500, 1000, 2000] },
  { id: 16, name: 'Рівне', type: 'property', color: 'orange', price: 1800, rent: [140, 700, 2000, 5500, 7500, 9500] },
  { id: 17, name: 'Скарбниця', type: 'chest', color: null },
  { id: 18, name: 'Хмельницький', type: 'property', color: 'orange', price: 1800, rent: [140, 700, 2000, 5500, 7500, 9500] },
  { id: 19, name: 'Івано-Франківськ', type: 'property', color: 'orange', price: 2000, rent: [160, 800, 2200, 6000, 8000, 10000] },
  { id: 20, name: 'Відпочинок', type: 'parking', color: null },
  { id: 21, name: 'Запоріжжя', type: 'property', color: 'red', price: 2200, rent: [180, 900, 2500, 7000, 8750, 10500] },
  { id: 22, name: 'Шанс', type: 'chance', color: null },
  { id: 23, name: 'Дніпро', type: 'property', color: 'red', price: 2200, rent: [180, 900, 2500, 7000, 8750, 10500] },
  { id: 24, name: 'Харків', type: 'property', color: 'red', price: 2400, rent: [200, 1000, 3000, 7500, 9250, 11000] },
  { id: 25, name: 'Залізниця Одеса', type: 'railroad', color: null, price: 2000, rent: [250, 500, 1000, 2000] },
  { id: 26, name: 'Миколаїв', type: 'property', color: 'yellow', price: 2600, rent: [220, 1100, 3300, 8000, 9750, 11500] },
  { id: 27, name: 'Херсон', type: 'property', color: 'yellow', price: 2600, rent: [220, 1100, 3300, 8000, 9750, 11500] },
  { id: 28, name: 'Водоканал', type: 'utility', color: null, price: 1500 },
  { id: 29, name: 'Одеса', type: 'property', color: 'yellow', price: 2800, rent: [240, 1200, 3600, 8500, 10250, 12000] },
  { id: 30, name: 'Йди до в\'язниці', type: 'gotojail', color: null },
  { id: 31, name: 'Ужгород', type: 'property', color: 'green', price: 3000, rent: [260, 1300, 3900, 9000, 11000, 12750] },
  { id: 32, name: 'Чернівці', type: 'property', color: 'green', price: 3000, rent: [260, 1300, 3900, 9000, 11000, 12750] },
  { id: 33, name: 'Скарбниця', type: 'chest', color: null },
  { id: 34, name: 'Львів', type: 'property', color: 'green', price: 3200, rent: [280, 1500, 4500, 10000, 12000, 14000] },
  { id: 35, name: 'Залізниця Харків', type: 'railroad', color: null, price: 2000, rent: [250, 500, 1000, 2000] },
  { id: 36, name: 'Шанс', type: 'chance', color: null },
  { id: 37, name: 'Маріуполь', type: 'property', color: 'blue', price: 3500, rent: [350, 1750, 5000, 11000, 13000, 15000] },
  { id: 38, name: 'Податок розкоші', type: 'tax', color: null, price: 1000 },
  { id: 39, name: 'Київ', type: 'property', color: 'blue', price: 4000, rent: [500, 2000, 6000, 14000, 17000, 20000] }
];

const COLORS = {
  brown: '#8B4513',
  lightblue: '#87CEEB',
  pink: '#FF1493',
  orange: '#FFA500',
  red: '#DC143C',
  yellow: '#FFD700',
  green: '#228B22',
  blue: '#0000CD'
};

const PLAYER_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF'];

export default function App() {
  const [players, setPlayers] = useState([
    { id: 0, name: 'Гравець 1', position: 0, money: 15000, properties: [], inJail: false, color: PLAYER_COLORS[0] },
    { id: 1, name: 'Гравець 2', position: 0, money: 15000, properties: [], inJail: false, color: PLAYER_COLORS[1] }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [gameLog, setGameLog] = useState(['Гра розпочалася! Натисніть "Кинути кубики"']);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [winner, setWinner] = useState(null);

  const addLog = (message) => {
    setGameLog(prev => [...prev.slice(-4), message]);
  };

  const rollDice = () => {
    if (winner) return;
    
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    setDice1(d1);
    setDice2(d2);

    const player = players[currentPlayer];
    
    if (player.inJail) {
      if (d1 === d2) {
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayer].inJail = false;
        setPlayers(updatedPlayers);
        addLog(`${player.name} викинув дубль і вийшов з в'язниці!`);
      } else {
        addLog(`${player.name} не викинув дубль. Залишається у в'язниці.`);
        setCurrentPlayer((currentPlayer + 1) % players.length);
        return;
      }
    }

    const newPosition = (player.position + d1 + d2) % 40;
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayer].position = newPosition;

    if (newPosition < player.position || (player.position + d1 + d2 >= 40)) {
      updatedPlayers[currentPlayer].money += 2000;
      addLog(`${player.name} пройшов Старт і отримав 2000₴!`);
    }

    const space = BOARD_SPACES[newPosition];
    addLog(`${player.name} викинув ${d1} + ${d2} = ${d1 + d2}. Потрапив на "${space.name}"`);

    handleLanding(updatedPlayers, currentPlayer, space);
  };

  const handleLanding = (updatedPlayers, playerIndex, space) => {
    const player = updatedPlayers[playerIndex];

    if (space.type === 'property' || space.type === 'railroad' || space.type === 'utility') {
      const owner = updatedPlayers.find(p => p.properties.includes(space.id));
      
      if (!owner) {
        setSelectedProperty(space);
      } else if (owner.id !== player.id) {
        const rent = calculateRent(space, owner);
        updatedPlayers[playerIndex].money -= rent;
        updatedPlayers[owner.id].money += rent;
        addLog(`${player.name} платить ${rent}₴ оренди гравцю ${owner.name}`);
      }
    } else if (space.type === 'tax') {
      updatedPlayers[playerIndex].money -= space.price;
      addLog(`${player.name} платить податок ${space.price}₴`);
    } else if (space.type === 'gotojail') {
      updatedPlayers[playerIndex].position = 10;
      updatedPlayers[playerIndex].inJail = true;
      addLog(`${player.name} йде до в'язниці!`);
    } else if (space.type === 'chance' || space.type === 'chest') {
      handleCard(updatedPlayers, playerIndex);
    }

    checkBankruptcy(updatedPlayers);
    setPlayers(updatedPlayers);
    
    if (!winner) {
      setCurrentPlayer((playerIndex + 1) % updatedPlayers.length);
    }
  };

  const calculateRent = (space, owner) => {
    if (space.type === 'railroad') {
      const railroadCount = owner.properties.filter(id => 
        BOARD_SPACES[id].type === 'railroad'
      ).length;
      return space.rent[railroadCount - 1];
    } else if (space.type === 'utility') {
      const utilityCount = owner.properties.filter(id => 
        BOARD_SPACES[id].type === 'utility'
      ).length;
      return (dice1 + dice2) * (utilityCount === 2 ? 100 : 40);
    } else {
      return space.rent[0];
    }
  };

  const handleCard = (updatedPlayers, playerIndex) => {
    const cards = [
      { text: 'Отримайте 1000₴', money: 1000 },
      { text: 'Заплатіть 500₴', money: -500 },
      { text: 'Отримайте 2000₴ від банку', money: 2000 },
      { text: 'Йдіть до Старту', position: 0 },
    ];
    
    const card = cards[Math.floor(Math.random() * cards.length)];
    addLog(`Картка: ${card.text}`);
    
    if (card.money) {
      updatedPlayers[playerIndex].money += card.money;
    }
    if (card.position !== undefined) {
      updatedPlayers[playerIndex].position = card.position;
      updatedPlayers[playerIndex].money += 2000;
    }
  };

  const buyProperty = () => {
    if (!selectedProperty) return;
    
    const updatedPlayers = [...players];
    const player = updatedPlayers[currentPlayer];
    
    if (player.money >= selectedProperty.price) {
      player.money -= selectedProperty.price;
      player.properties.push(selectedProperty.id);
      addLog(`${player.name} купив "${selectedProperty.name}" за ${selectedProperty.price}₴`);
      setPlayers(updatedPlayers);
    } else {
      addLog(`${player.name} не має достатньо грошей!`);
    }
    
    setSelectedProperty(null);
  };

  const skipProperty = () => {
    setSelectedProperty(null);
  };

  const checkBankruptcy = (updatedPlayers) => {
    const activePlayers = updatedPlayers.filter(p => p.money > 0);
    if (activePlayers.length === 1) {
      setWinner(activePlayers[0]);
      addLog(`🎉 ${activePlayers[0].name} переміг!`);
    }
  };

  const renderSpace = (space, index) => {
    const playersHere = players.filter(p => p.position === index);
    
    return (
      <div
        key={space.id}
        className="relative border-2 border-gray-700 bg-white flex flex-col items-center justify-center text-xs p-1"
        style={{
          borderTopColor: space.color ? COLORS[space.color] : '#374151',
          borderTopWidth: space.color ? '8px' : '2px'
        }}
      >
        <div className="font-bold text-center leading-tight">{space.name}</div>
        {space.price && <div className="text-gray-600">{space.price}₴</div>}
        
        {playersHere.length > 0 && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-0.5">
            {playersHere.map(p => (
              <div
                key={p.id}
                className="w-3 h-3 rounded-full border-2 border-white"
                style={{ backgroundColor: p.color }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-900">
          🇺🇦 Монополія Україна
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="bg-green-100 p-4 rounded-lg shadow-xl">
              <div className="grid grid-cols-11 gap-0.5 aspect-square">
                {BOARD_SPACES.slice(0, 11).reverse().map(renderSpace)}
                
                {Array.from({ length: 9 }).map((_, i) => (
                  <React.Fragment key={`row-${i}`}>
                    {i < 9 && renderSpace(BOARD_SPACES[30 - i], 30 - i)}
                    <div className="col-span-9 bg-green-200 flex items-center justify-center">
                      {i === 4 && (
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-900">МОНОПОЛІЯ</div>
                          <div className="text-lg text-green-800">УКРАЇНА</div>
                          <div className="mt-2 flex gap-2 justify-center">
                            <div className="text-4xl">{dice1}</div>
                            <div className="text-4xl">{dice2}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    {renderSpace(BOARD_SPACES[10 + i + 1], 10 + i + 1)}
                  </React.Fragment>
                ))}
                
                {BOARD_SPACES.slice(20, 31).map(renderSpace)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                Гравці
              </h2>
              {players.map((player, idx) => (
                <div
                  key={player.id}
                  className={`p-3 mb-2 rounded-lg border-2 ${
                    idx === currentPlayer ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: player.color }}
                    />
                    <span className="font-bold">{player.name}</span>
                  </div>
                  <div className="text-lg font-bold text-green-600">{player.money}₴</div>
                  <div className="text-xs text-gray-600">
                    Власність: {player.properties.length}
                  </div>
                  {player.inJail && (
                    <div className="text-xs text-red-600 font-bold">У в'язниці</div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <button
                onClick={rollDice}
                disabled={winner !== null}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-3"
              >
                <Dices />
                Кинути кубики
              </button>

              {winner && (
                <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 text-center">
                  <Trophy className="w-12 h-12 mx-auto text-yellow-600 mb-2" />
                  <div className="text-xl font-bold text-yellow-800">
                    {winner.name} переміг!
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-bold mb-2">Журнал подій</h3>
              <div className="space-y-1 text-sm max-h-40 overflow-y-auto">
                {gameLog.map((log, idx) => (
                  <div key={idx} className="text-gray-700 border-b border-gray-100 pb-1">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold mb-4">{selectedProperty.name}</h3>
              <div className="mb-4">
                <p className="text-lg mb-2">Ціна: <span className="font-bold text-green-600">{selectedProperty.price}₴</span></p>
                {selectedProperty.rent && (
                  <p className="text-sm text-gray-600">Орендна плата: {selectedProperty.rent[0]}₴</p>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  Ваші гроші: <span className="font-bold">{players[currentPlayer].money}₴</span>
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={buyProperty}
                  disabled={players[currentPlayer].money < selectedProperty.price}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                >
                  Купити
                </button>
                <button
                  onClick={skipProperty}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Пропустити
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
               }
