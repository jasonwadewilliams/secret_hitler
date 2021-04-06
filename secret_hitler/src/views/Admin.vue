<template>
<div id="background">
<div id="admin">
	<h1>Games In Progress</h1>
	<span id="games" v-for="game in games" :key=game.id>
		<button @click=selectGame(game)>{{game.groupCode}}</button>
	</span>
	<p v-if="games.length < 1">-There are currently no games in progress-</p>
	<div class="playerList" v-if="game">
		<ul>
			<li class="players" v-for="player in filteredPlayers" :key="player.id">
				<label :class="{ player: true, isAlive: player.isAlive }">
					<div>{{ player.name }}</div>
					<div>
						<input type="checkbox" v-model="player.isAlive" @click="killPlayer(player)" />
						<span class="checkmark"></span>
					</div>
					<div><button @click="deletePlayer(player)" class="delete">X</button></div>
				</label>
				
			</li>
		</ul>
		<button @click=deleteGame(game)>DELETE GAME</button>
		<p>Status: {{game.status}}</p>
	</div>
</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'Home',
	data() {
		return {
			games: [],
			game: null,
			players: [],
		}
	},
	created() {
		this.getGames();
	},
	computed: {
		filteredPlayers() {
			return this.players;
		},
	},
	methods: {
		async getGames() {
			try {
				const response = await axios.get("/api/games");
				this.games = response.data;
			} catch (error) {
				console.log(error);
			}
		},
		async getPlayers() {
			try {
				const response = await axios.get(`/api/games/${this.game._id}/players`);
				this.players = response.data;
			} catch (error) {
				console.log(error);
			}
		},
		selectGame(game) {
			this.game = game;
			this.getPlayers();
		},
		async killPlayer(player) {
			try {
				axios.put(`/api/games/${this.game._id}/players/${player._id}`, {
					name: player.name,
					isAlive: !player.isAlive,
					role: player.role,
				});
				this.getPlayers();
			} catch (error) {
				console.log(error);
			}
		},
		async deletePlayer(player) {
			try {
				await axios.delete(`/api/games/${this.game._id}/players/${player._id}`);
				this.getPlayers();
			} catch (error) {
				console.log(error);
			}
		},
		async deleteGame(game) {
			try {
				await axios.delete(`/api/games/${game._id}/players`);
				this.game = null;
				this.getGames();
			} catch (error) {
				console.log(error);
			}
		},
		active(game) {
			return (this.game && game._id === this.game._id);
		}
	}
}
</script>




<style scoped>
/* List */
ul {
	list-style: none;
	margin: 20px;
}

li {
	background-color: rgb(25,25,25);
	color: rgb(247,225,195);
	width: 30%;
	min-width: 150px;
	min-height: 40px;
	padding: 10px;
	margin-bottom: 10px;
	font-size: 1em;
	display: inline-table;
}


h1 {
	background-color: rgb(25,25,25);
	color: rgb(247,225,195);
	padding: 4px;
	text-size-adjust: auto;
	font-family: 'Bungee';
	text-decoration: underline;
}

#background {
	min-height: 80vh;
	background-color: rgb(74,74,74);
	margin: 20px;
	box-shadow: 0px 0px 10px #444 ;
}

.delete {
	position: relative;
	float: right;
	opacity: 60%;
	font-weight: 200;
	font-size: 0.7em;
	padding: 3px;
	margin: 3px;
}

.delete:hover {
	opacity: 100%
}

label {
	display: flex;
	justify-content: space-around;
}

/* Form */
input[type=checkbox] {
	transform: scale(1.5);
	align-content:flex-end;
}

input[type=text] {
	font-size: 1em;
}

#games {
	margin: 10px;
}



button {
	font-family: 'Bungee';
	font-weight:bold;
	font-size: 1.3em;
	border: none;
	background-color: #bbb;
	padding: 5px 10px;
}

button:focus {
	outline: none;
}

button.selected {
	border-bottom: 2px solid #000;
}

/* Controls */
.controls {
	margin-top: 20px;
}

/* Custom checkbox
/* Customize the label (the container) */
.player {
	display: block;
	position: relative;
	padding-left: 35px;
	margin-bottom: 12px;
	cursor: pointer;
	font-size: 22px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

/* Hide the browser's default checkbox */
.player input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;
}

/* Create a custom checkbox */
.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	background-color: rgb(74,74,74);
}

/* On mouse-over, add a grey background color */
.player:hover input~.checkmark {
	background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.player input:checked~.checkmark {
	background-color: rgb(55,136,149);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}

/* Show the checkmark when checked */
.player input:checked~.checkmark:after {
	display: block;
}

/* Style the checkmark/indicator */
.player .checkmark:after {
	left: 9px;
	top: 5px;
	width: 5px;
	height: 10px;
	border: solid white;
	border-width: 0 3px 3px 0;
	-webkit-transform: rotate(45deg);
	-ms-transform: rotate(45deg);
	transform: rotate(45deg);
}
</style>
