function CreateGame() {
    let code = MakeCode(4);
    let name = document.getElementById("userName").value;
    let newGame = {game_code: code, players: Player(name)};
    let gameString = JSON.stringify(newGame);
    localStorage.setItem("newGame", gameString);
}

//document.getElementById("createGame").addEventListener("click",CreateGame());

function joinGame() {

}

function Player(name) {
    this.name = name;
}

function generateGameCode() {
}


function MakeCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function addPlayer(gameCode) {
    let name = document.getElementById("userName").nodeValue;
}

