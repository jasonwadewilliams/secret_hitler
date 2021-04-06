<template>
<div class="wrapper">
	<div class="roles">
		<div class="role" v-for="role in roles" :key="role.id">
			<div class="info">
				<h1>{{role.name}}</h1>
				<p>{{role.party}}</p>
			</div>
			<div class="image">
				<img :src="require(`../../images/${role.role_image}`)">
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'WaitingRoom',
	props: {
		roles: Array
	}
}
</script>

<style scoped>
.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
}

.roles {
	margin-top: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.role {
	margin: 10px;
	margin-top: 50px;
	width: 200px;
}

.role .image {
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
