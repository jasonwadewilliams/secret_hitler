<template>
    <div id="gameSetup">
        <div class="middle" id="information">
            <p>Please enter your name</p>
            <input v-model="userName" type="text">
        </div>
        <button type="button" onClick="CreateGame()" class="middle">Start New Game</button>
        <br class="spacer">
        
    </div>
</template>

<script>
    export default {
        name: 'GameSetup',
        data() {
            return {
                userName: '',
            }
        }
    
    }
</script>

<style scoped>
    #gameSetup {
        margin: 50px;
        padding: 20px;
        background-color: rgb(247,225,195);
        box-shadow: 0px 0px 20px rgb(20,20,20);
    }

    button {
        font-family: 'Girassol';
        font-weight:bold;
        font-size:larger;
        padding: 5px;
        margin: 10px;
        border-radius: 5px;
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