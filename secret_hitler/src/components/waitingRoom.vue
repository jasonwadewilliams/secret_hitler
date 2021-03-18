<template>
<div class="wrapper">
  <div class="players">
    <div class="player" v-for="player in players" :key="player.id">
      <div class="info">
        <h1>{{player.name}}</h1>
        <p>{{player.party}}</p>
      </div>
      <div class="image">
        <img :src="require(`../../images/${player.role_image}`)">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'WaitingRoom',
  props: {
    players: Array
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.players {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.player {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.player .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

img {
    width: 100%;
}

.info {
  background: rgb(222, 140, 122);
  color: #000;
  padding: 5px;
}

.info h1 {
  font-size: 25px;
}

.info p {
  margin: 0px;
  font-size: 20px;
}


.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>
