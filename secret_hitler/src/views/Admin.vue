<template>
<div>
    <h1>List of Games</h1>
    <div id="games">
        <button v-for="game in games" :key=game.id @click=selectGame(game)>{{game.groupCode}}</button>
    </div>
    <div class="todoItems" v-if="game">
        <ul>
            <li v-for="player in filteredPlayers" :key="player.id">
                <label>
                {{ player.name }}
                <input type="checkbox" v-model="player.isAlive" @click="killPlayer(player)" />
                <span class="checkmark"></span>
                </label>
                <button @click="deletePlayer(player)" class="delete">X</button>
            </li>
        </ul>
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
      projectName: '',
      color: "#000",
      players: [],
      text: '',
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
    showAll() {
      this.show = 'all';
    },
    showActive() {
      this.show = 'active';
    },
    active(game) {
      return (this.game && game._id === this.game._id);
    },
    darkColor(color) {
      return (this.lightOrDark(color) === 'dark');
    },
    lightOrDark(color) {
      let hex = color;
      if (typeof color === 'object' && color !== null)
        hex = color.hex;

    // Convert it to RGB: http://gist.github.com/983661
      let rgb = +("0x" + hex.slice(1).replace( 
      hex.length < 5 && /./g, '$&$&'));

      const r = rgb >> 16;
      const g = rgb >> 8 & 255;
      const b = rgb & 255;
      
      // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
      const hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
      );

      // Using the HSP value, determine whether the color is light or dark
      if (hsp>127.5) {

          return 'light';
      } 
      else {

          return 'dark';
      }
    }
  }
}
</script>

<style scoped>
/* List */
ul {
  list-style: none;
}

li {
  background: #fff;
  width: 500px;
  min-height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  display: flex;
  align-items: center;
}

.delete {
  display: none;
  margin-left: auto;
}

li:hover .delete {
  display: block;
}

label {
  width: 400px;
}

.completed {
  text-decoration: line-through;
}

/* Form */
input[type=checkbox] {
  transform: scale(1.5);
  margin-right: 10px;
}

input[type=text] {
  font-size: 1em;
}

.vc-swatches {
  margin-bottom: 20px;
}

#games {
  margin-bottom: 20px;
}



button {
  font-family: 'Arvo';
  font-size: 1em;
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

.white {
  color: #fff;
}

/* Controls */
.controls {
  margin-top: 20px;
}

/* Custom checkbox
/* Customize the label (the container) */
.item {
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
.item input {
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
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.item:hover input~.checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.item input:checked~.checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.item input:checked~.checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.item .checkmark:after {
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
