//starting variables here
let rounds = Number(localStorage.getItem('rounds')) ?? 10;
const element = document.getElementById('rounds');
element.innerHTML = String(rounds);
let round = Number(localStorage.getItem('round')) ?? 0;
let turn = Number(localStorage.getItem('turn')) ?? 0;
let stage = Number(localStorage.getItem('stage')) ?? 1;
let playerList = localStorage.getItem('players') ? JSON.parse(localStorage.getItem('players')) : [];



//pull from memory the room code and validate it still works or ask for room code

//load stage of app and switch to load that part of app
function stageChange() {
    console.log('here');
    switch (stage) {
        case 1:
            localStorage.setItem('players', '[]');
            playerList = [];
            document.getElementById('stage1').style.display = 'block';
            document.getElementById('stage2').style.display = 'none';
            document.getElementById('stage3').style.display = 'none';
            break;
        case 2:
            document.getElementById('stage1').style.display = 'none';
            document.getElementById('stage2').style.display = 'block';
            document.getElementById('stage3').style.display = 'none';
            break;
        case 3:
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
    playerList.push({ name: player.children[0].value, points: 0 });
    localStorage.setItem('players', JSON.stringify(playerList));
}

function deletePlayer(event) {
    const target = event.currentTarget.parentElement;
    const newPlayerList = playerList.filter((x) => x.name != String(target.children[0].innerHTML).slice(0, -1));
    target.parentElement.removeChild(target);
    localStorage.setItem('players', JSON.stringify(newPlayerList));
}

function startGame() {
    console.log("start game");
    stage = 2;
    stageChange();
}

function click2() {

}

function click3() { }

function click4() { }

function click5() { }

function click6() { }

function click7() { }

function click8() { }

function click9() { }

function click10() { }

function click11() { }

function click12() { }

function clickDoubles() { }

function newGameSamePlayers() { }

function newGame() { }

function bank() { }

stageChange();