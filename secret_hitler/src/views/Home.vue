<template>
	<div class="home">
		<img class="banner" alt="Logo" src="../../images/secretHitlerBanner_ColorThin.png">
		<div id="button_box">
			<div class="button_box">
				<div>
					<button @click="setAbout()">ABOUT PAGE</button>        
				</div>
				<div>
					<button @click="setCreate()">CREATE GAME</button>        
				</div>
				<div>
					<button @click="setJoin()">JOIN GAME</button>
				</div>
			</div>
		</div>
		<div v-if="isAbout">
			<About></About>
		</div>
		<div v-if="isCreate">
			<GameSetup></GameSetup>
		</div>
		<div v-if="isJoin">
			<GameJoin></GameJoin>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue'
import GameSetup from '@/components/gameSetup.vue'
import GameJoin from '@/components/gameJoin.vue'

export default {
	name: 'Home',
	data () {
		return {
			isAbout: true,
			isCreate: false,
			isJoin: false,
		}
	},  
	components: {
		About,
		GameJoin,
		GameSetup,
	},
	methods: {
		setCreate() {
			this.$data.isAbout = false;
			this.$data.isCreate = true;
			this.$data.isJoin = false;
		},
		setJoin() {
			this.$data.isAbout = false;
			this.$data.isCreate = false;
			this.$data.isJoin = true;
		},
		setAbout() {
			this.$data.isAbout = true;
			this.$data.isCreate = false;
			this.$data.isJoin = false;
		}
	}
}
</script>

<style scoped>
	.home {
		min-height: 90vh;
	}

	.banner {
		max-width: 80%;
		margin: 20px;
	}

	.button_box {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		margin: 0% 20%
	}

	button {
		font-family: 'Girassol';
		font-weight:bold;
		font-size:larger;
		padding: 20px;
		border-radius: 20px;
		border-style: outset;
		border-width: 3px;
		color:rgb(0, 0, 0);
		background-color:rgb(222, 140, 122);
		box-shadow: 0px 0px 5px rgb(30,30,30);
	}

	button:hover {
		transform:translate(-3px,-3px);
		background-color:rgb(242, 160, 142);
		box-shadow: 0px 0px 12px rgb(20,20,20);
	}
</style>
