<template>
	<div id="about">
		<h1>{{ msg }}</h1>
		<div id="textbox">
			<div id="float_header"><h1>Intro:</h1></div>
			<p>This game has been a crowd favorite amongst my friends for a long time.  
					I always wanted to be able to play with more than 10 players though so I built this
					website as a platform to customize <strong>Secret Hitler</strong>.  This game version
					also includes a way to vote for your presidency anonymosly to give the facists the 
					extra secrecy and increase the level of mystery in the game.  So gather your friends,
					start a game and find Hitler!
			</p>
		</div>

		<div id="textbox">
			<div id="float_header"><h1>How It Works:</h1></div>
			<p>One player in the group will select "Create Game." This will produce a random 4 letter 
					room code.  Each additional player will select "Join Game" and enter the room code. The
					game will ask each player for a name and then let them join the room. Once the group 
					leader selects "Play!" The roles will be randomly sent out and no additional 
					players may be added. The game will run all the voting and card selection.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'About',
	props: {
		msg: String
	}
}
</script>

<style scoped>
#textbox {
	background-color: rgb(74,74,74);
	color: rgb(247,225,195);
	padding:10px;
	margin: 0px 0px 50px 0px;
	border-radius: 5px;
}

#float_header {
	background-color: rgb(25,25,25);
	color: rgb(247,225,195);
	border-radius: 10px;
	padding: 4px;
	text-size-adjust: auto;
	font-family: 'Bungee';
	text-decoration: underline;
}

#about {
	margin: 50px;
	padding: 20px;
	background-color: rgb(247,225,195);
	box-shadow: 0px 0px 20px rgb(20,20,20);
}

</style> 
