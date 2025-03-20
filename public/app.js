//starting variables here
let rounds = Number(localStorage.getItem('rounds') ?? 10);
localStorage.setItem('rounds', rounds);
const element = document.getElementById('rounds');
element.innerHTML = String(rounds);
let round = Number(localStorage.getItem('round')) ?? 0;
let turn = Number(localStorage.getItem('turn')) ?? 0;
let stage = Number(localStorage.getItem('stage')) ?? 1;
let playerList = localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : [];
let points = Number(localStorage.getItem('points')) ?? 0;
let offset = Number(localStorage.getItem('offset')) ?? 0;


//pull from memory the room code and validate it still works or ask for room code

//load stage of app and switch to load that part of app
function stageChange() {
    switch (stage) {
        case 1:
            localStorage.setItem('players', '[]');
            playerList = [];
            document.getElementById('stage1').style.display = 'block';
            document.getElementById('stage2').style.display = 'none';
            document.getElementById('stage3').style.display = 'none';
            break;
        case 2:
            document.getElementById('currentRound').innerHTML = round;
            document.getElementById('totalRounds').innerHTML = rounds;
            document.getElementById('points').innerHTML = points;
            const playerListElement = document.getElementById('targetPlayerList');
            //{ name: player.children[0].value, points: 0, bank:0}
            for (const playerIndex in playerList) {
                const child = document.getElementById('playerRow').content.cloneNode(true);
                child.children[0].id = playerList[playerIndex].name;
                child.children[0].children[0].innerHTML = playerList[playerIndex].name;
                child.children[0].children[1].innerHTML = playerList[playerIndex].points;
                child.children[0].children[2].innerHTML = playerList[playerIndex].bank;//3?
                child.children[0].children[3].value = playerIndex;//4?
                if(playerList[playerIndex].bank == 0) {
                    child.children[0].children[3].classList.remove('off');
                } else {
                    child.children[0].children[3].classList.add('off');
                }
                playerListElement.appendChild(child);
            }
            whoesTurn();
            document.getElementById('stage1').style.display = 'none';
            document.getElementById('stage2').style.display = 'block';
            document.getElementById('stage3').style.display = 'none';
            break;
        case 3:
            //TODO code shows scores
            const scoreBoardElement = document.getElementById('scoreBoard');
            playerList.sort((a, b) => b.points - a.points);
            let place = 1;
            for(const player of playerList){
                //clone and add score board list.
                const scoreBoardPlayer = document.getElementById('scorePlayer').content.cloneNode(true);
                scoreBoardPlayer.children[0].children[0].innerHTML = place + 'ST ';
                scoreBoardPlayer.children[0].children[1].innerHTML = player.name;
                scoreBoardPlayer.children[0].children[2].innerHTML = " " + player.points;
                scoreBoardElement.appendChild(scoreBoardPlayer);
                place++;
            }
            document.getElementById('stage1').style.display = 'none';
            document.getElementById('stage2').style.display = 'none';
            document.getElementById('stage3').style.display = 'block';
            break;
        default:
            stage = 1;
            localStorage.setItem('players', '[]');
            playerList = [];
            document.getElementById('stage1').style.display = 'block';
            document.getElementById('stage2').style.display = 'none';
            document.getElementById('stage3').style.display = 'none';
            break;
    }
}
//functions



function roundDown() {
    if (rounds > 1) {
        const element = document.getElementById('rounds');
        rounds = rounds - 1;
        localStorage.setItem('rounds', String(rounds));
        element.innerHTML = String(rounds);
    }
}

function roundUp() {
    if (rounds < 20) {
        const element = document.getElementById('rounds');
        rounds = rounds + 1;
        localStorage.setItem('rounds', String(rounds));
        element.innerHTML = String(rounds);
    }
}

function addPlayer() {
    const target = document.getElementById('stage1List');
    const player = document.getElementById('makePlayer').content.cloneNode(true);
    target.appendChild(player);
}

function submitPlayer(event) {
    const player = event.currentTarget.parentElement;
    const playerRow = document.getElementById('newPlayer').content.cloneNode(true);
    playerRow.children[0].children[0].innerHTML = player.children[0].value + ' ';
    player.parentElement.replaceChild(playerRow, player);
    playerList.push({ name: player.children[0].value, points: 0, bank: 0 });
    localStorage.setItem('players', JSON.stringify(playerList));
}

function deletePlayer(event) {
    const target = event.currentTarget.parentElement;
    const newPlayerList = playerList.filter((x) => x.name != String(target.children[0].innerHTML).slice(0, -1));
    target.parentElement.removeChild(target);
    localStorage.setItem('players', JSON.stringify(newPlayerList));
}

function startGame() {
    if (playerList.length >= 2) {
        stage = 2;
        localStorage.setItem('stage', stage);
        round = 1;
        localStorage.setItem('round', String(round));
        turn = 0;
        localStorage.setItem('turn', String(turn));
        points = 0;
        localStorage.setItem('points', String(points));
        offset = 0;
        localStorage.setItem('offset', String(offset));

        stageChange();
    } else {
        alert('Add More Players');
    }
}

function click2() {
    if (turn <= 2) {
        points += 2;
        localStorage.setItem('points', String(points));
        document.getElementById('points').innerHTML = points;
        turn++;
        localStorage.setItem('turn', String(turn));
        whoesTurn();
    }
}

function click3() {
    points += 3;
    localStorage.setItem('points', String(points));
    document.getElementById('points').innerHTML = points;
    turn++;
    localStorage.setItem('turn', String(turn));
    whoesTurn();
}

function click4() {
    points += 4;
    localStorage.setItem('points', String(points));
    document.getElementById('points').innerHTML = points;
    turn++;
    localStorage.setItem('turn', String(turn));
    whoesTurn();
}

function click5() {
    points += 5;
    localStorage.setItem('points', String(points));
    document.getElementById('points').innerHTML = points;
    turn++;
    localStorage.setItem('turn', String(turn));
    whoesTurn();
}

function click6() {
    points += 6;
    localStorage.setItem('points', String(points));
    document.getElementById('points').innerHTML = points;
    turn++;
    localStorage.setItem('turn', String(turn));
    whoesTurn();
}

function click7() {
    if (turn > 2) {
        roundOver();
    } else {
        points += 40;
        localStorage.setItem('points', String(points));
        document.getElementById('points').innerHTML = points;
        turn++;
        localStorage.setItem('turn', String(turn));
        whoesTurn();
    }
}

function click8() {
    points += 8;
    localStorage.setItem('points', String(points));
    document.getElementById('points').innerHTML = points;
    turn++;
    localStorage.setItem('turn', String(turn));
    whoesTurn();
}

function click9() {
    points += 9;
    localStorage.setItem('points', String(points));
    document.getElementById('points').innerHTML = points;
    turn++;
    localStorage.setItem('turn', String(turn));
    whoesTurn();
}

function click10() {
    points += 10;
    localStorage.setItem('points', String(points));
    document.getElementById('points').innerHTML = points;
    turn++;
    localStorage.setItem('turn', String(turn));
    whoesTurn();
}

function click11() {
    points += 11;
    localStorage.setItem('points', String(points));
    document.getElementById('points').innerHTML = points;
    turn++;
    localStorage.setItem('turn', String(turn));
    whoesTurn();
}

function click12() {
    if (turn <= 2) {
        points += 12;
        localStorage.setItem('points', String(points));
        document.getElementById('points').innerHTML = points;
        turn++;
        localStorage.setItem('turn', String(turn));
        whoesTurn();
    }
}

function clickDoubles() {
    if (turn > 2) {
        points *= 2;
        localStorage.setItem('points', String(points));
        document.getElementById('points').innerHTML = points;
        turn++;
        localStorage.setItem('turn', String(turn));
        whoesTurn();
    }
}

function newGameSamePlayers() {
localStorage.setItem('turn', '0');
localStorage.setItem('stage', '2');
localStorage.setItem('points', '0');
localStorage.setItem('offset', '0');
localStorage.setItem('round', '1');
//run through the players and reset there points and bank stat.
for (playerIndex in playerList){
    playerList[playerIndex].bank = 0;
    playerList[playerIndex].points = 0;
}
localStorage.setItem('players', JSON.stringify(playerList));
//reset room code or soemthing else
location.reload();
}

function newGame() {
localStorage.setItem('rounds', '10');
localStorage.setItem('turn', '0');
localStorage.setItem('stage', '1');
localStorage.setItem('points', '0');
localStorage.setItem('offset', '0');
localStorage.setItem('round', '0');
localStorage.setItem('players', '[]');
//reset room code
location.reload();
}

function bank(event, playerIndex) {
    if(playerList[playerIndex].bank == 0){
    playerList[playerIndex].bank = points;
    localStorage.setItem('players', JSON.stringify(playerList));
    playerElement = event.currentTarget.parentElement;
    playerElement.children[2].innerHTML = points;//3?
    event.currentTarget.classList.add('off');
    }
    let test = 0;
    for (player of playerList){
        if(player.bank == 0){
            test += 1;
        }
    }
    if(test == 0){
        roundOver();
    }

}

function whoesTurn() {
    const currentPlayer = playerList[(turn + offset) % playerList.length].name;
    document.getElementById('playerTurn').innerHTML = currentPlayer;
    if (turn > 2) {
        document.getElementById("button2").classList.add('off');
        document.getElementById("button12").classList.add('off');
        document.getElementById("button7").classList.add('deadly');
        document.getElementById("buttonDoubles").classList.remove('off');
    } else {
        document.getElementById("button2").classList.remove('off');
        document.getElementById("button12").classList.remove('off');
        document.getElementById("button7").classList.remove('deadly');
        document.getElementById("buttonDoubles").classList.add('off');
    }
    //TODO add stuff to change the display info of the player list
    //const playerListElement = document.getElementById('targetPlayerList');

}

function roundOver() {
    //rest other stuff and increase the round.
    //{ name: player.children[0].value, points: 0, bank:0}
    //where here
    for (const playerIndex in playerList) {
        playerList[playerIndex].points += playerList[playerIndex].bank;
        playerList[playerIndex].bank = 0;
    }
    localStorage.setItem('players', JSON.stringify(playerList));
    if (round < rounds) {
        round += 1;
        localStorage.setItem('round', String(round));
        offset += turn;
        localStorage.setItem('offset', String(offset));
        turn = 0;
        localStorage.setItem('turn', String(turn));
        points = 0;
        localStorage.setItem('points', '0');
        document.getElementById('points').innerHTML = 0;
        const playerListElement = document.getElementById("targetPlayerList");
        let index = 0;
        for(const playerRow of playerListElement.children){
            playerRow.children[3].classList.remove('off');//4?
            //might have add stuff change point values
            playerRow.children[1].innerHTML = playerList[index].points;
            playerRow.children[2].innerHTML = 0;
            index++;
        }
        document.getElementById("currentRound").innerHTML = round;
    } else {
        round = 0;
        localStorage.setItem('round', '0');
        offset = 0;
        localStorage.setItem('offset', '0');
        turn = 0;
        localStorage.setItem('turn', '0');
        points = 0;
        localStorage.setItem('points', '0');
        stage = 3;
        localStorage.setItem('stage', String(stage));
        stageChange();
    }

}

stageChange();