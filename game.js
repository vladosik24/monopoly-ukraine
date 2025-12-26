document.addEventListener('DOMContentLoaded', () => {
    // тут весь твій код з game.js
    window.createRoom = async function() {
        const playerNameInput = document.getElementById('playerName');
        myPlayerName = playerNameInput.value || 'Гравець';
        currentRoomCode = generateRoomCode();
        await set(ref(db,'rooms/'+currentRoomCode), {
            code: currentRoomCode,
            status:'waiting',
            players:{[myPlayerId]: {id:myPlayerId,name:myPlayerName,pos:0,money:15000,alive:true,color:'#4caf50'}}
        });
        document.getElementById('roomCodeDisplay').textContent = currentRoomCode;
        document.getElementById('waitingRoom').style.display='block';
        listenToRoom();
    };
    // решта функцій теж всередині DOMContentLoaded
});