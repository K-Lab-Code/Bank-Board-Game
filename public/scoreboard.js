//starting variables
let stage = 0;
let room = '';
let playerList = [];
let playerTurn;
let points;
let round;
let rounds;

//function sets the stage
function stageChange() {
    //switch changes whats visible
    switch (stage) {
        case 0:
            document.getElementById('stage0').style.display = 'block';
            document.getElementById('stage1').style.display = 'none';
            document.getElementById('stage2').style.display = 'none';
            document.getElementById('stage3').style.display = 'none';
            break;
        case 1:
            document.getElementById('stage0').style.display = 'none';
            document.getElementById('stage1').style.display = 'block';
            document.getElementById('stage2').style.display = 'none';
            document.getElementById('stage3').style.display = 'none';
            break;
        case 2:
            const playerListElement = document.getElementById('players');
            for (const playerIndex in playerList) {
                const child = document.getElementById('playerRow').content.cloneNode(true);
                child.children[0].id = playerList[playerIndex].name;
                child.children[0].children[0].innerHTML = playerList[playerIndex].name;
                child.children[0].children[1].innerHTML = playerList[playerIndex].points;
                child.children[0].children[2].innerHTML = playerList[playerIndex].bank;
                playerListElement.appendChild(child);
            }
            document.getElementById('stage0').style.display = 'none';
            document.getElementById('stage1').style.display = 'none';
            document.getElementById('stage2').style.display = 'block';
            document.getElementById('stage3').style.display = 'none';
            break;
        case 3:
            const scoreBoardElement = document.getElementById('scoreBoard');
            let place = 1;
            for (const player of playerList) {
                //clone and add score board list.
                const scoreBoardPlayer = document.getElementById('scorePlayer').content.cloneNode(true);
                scoreBoardPlayer.children[0].children[0].innerHTML = place + 'ST ';
                scoreBoardPlayer.children[0].children[1].innerHTML = player.name;
                scoreBoardPlayer.children[0].children[2].innerHTML = " " + player.points;
                scoreBoardElement.appendChild(scoreBoardPlayer);
                place++;
            }
            document.getElementById('stage0').style.display = 'none';
            document.getElementById('stage1').style.display = 'none';
            document.getElementById('stage2').style.display = 'none';
            document.getElementById('stage3').style.display = 'block';
            break;
        default:
            document.getElementById('stage0').style.display = 'block';
            document.getElementById('stage1').style.display = 'none';
            document.getElementById('stage2').style.display = 'none';
            document.getElementById('stage3').style.display = 'none';
            break;
    }
}
// other functions

//button function updates room code
async function roomCode() {
    try {
        const room = document.getElementById('room').value;
        const response = await fetch(('./api/get/' + room));
        if (response.ok && response.status == 200) {
            const data = await response.json();
            stage = Number(data.stage);
            room = data.room;
            playerList = JSON.parse(data.players);
            playerTurn = data.turn;
            points = Number(data.points);
            round = Number(data.round);
            rounds = Number(data.rounds);
            stageChange()
        } else {
            alert("Can't find the Room your looking for");
        }
    }
    catch (err) {
        console.error(err);
        alert("Somethings wrong with that room code");
    }
}

const timerInterval = setInterval(async () => {
    try {
        //fetch data
        if (room != '') {
            const response = await fetch(('./api/get/' + room));
            if (response.ok && response.status == 200) {
                const data = await response.json();
                //check if state change and change it if has change visuals and run start stage commands
                if (stage != data.stage, room != data.room, playerList != JSON.parse(data.players), playerTurn != data.turn, points != data.points, round != data.round, rounds != data.rounds) {
                    //update variables
                    room = data.room;
                    playerList = JSON.parse(data.players);
                    playerTurn = data.turn;
                    points = Number(data.points);
                    round = Number(data.round);
                    rounds = Number(data.rounds);
                    if(stage != data.stage){
                        stage = Number(data.stage);
                        stageChange();
                    }
                    //update visuals if needed
                    document.getElementById('roomCode').innerHTML = room;
                    document.getElementById('points').innerHTML = points;
                    document.getElementById('turn').innerHTML = playerTurn;
                    document.getElementById('currentRound').innerHTML = round;
                    document.getElementById('totalRounds').innerHTML = rounds;
                    if(stage == 2){
                        const playersChart = document.getElementById('players');
                        for (index in playerList){
                            playersChart.children[index].children[0].innerHTML = playerList[index].name;
                            playersChart.children[index].children[1].innerHTML = playerList[index].points;
                            playersChart.children[index].children[2].innerHTML = playerList[index].bank;
                        }
                    } else if (stage == 3){
                        clearInterval(timerInterval);
                    }


                }
            }
        } else {
            alert("Can't find the Room your looking for");
        }
    }
    catch (err) {
        console.error(err);
        alert("Somethings wrong with that room code");
    }
}, 1000);



stageChange();
