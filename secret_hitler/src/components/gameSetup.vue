<template>
<div>
    <div v-if="user" id="gameSetup">
        <div class="middle" id="information">
            <p>Thanks for playing {{this.$root.$data.user.username}}</p>
        </div>
        <button type="button" @click="CreateGame()" class="middle">Start New Game</button>
        <br class="spacer">
        
    </div>
</div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'GameSetup',
        async created() {
            try {
                let response = await axios.get('/api/users');
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
        methods: {
            async CreateGame() {
                try {
                    let groupCode = MakeCode(4);
                    /*let allGames = await axios.get('/api/games').data
                    while (allGames.find(function(game) {
                        if(game.groupCode == groupCode) return true
                    }) != undefined) {groupCode = MakeCode(4)}*/


                    let game = await axios.post('/api/games', {
                        groupCode: groupCode,
                        status: "waiting",
                    })
                    let player = await axios.post("/api/games/" + game.data._id + "/players", {
                        name: this.$root.$data.user.username,
                        role: null, 
                        isAlive: true
                    })
                    localStorage.setItem('secret_hitler_id', player.data._id);
                    localStorage.setItem('secret_hitler_gameCode', groupCode);
                    this.$router.push({name: "gameBoard"})
                } catch (error) {
                    console.log(error);
                }
            },
            routeToRegister() {
                this.$router.push({name: "createAccount"})
                return false;
            }
        },
        computed: {
            user() {
                if (this.$root.$data.user) return true;
                else  return this.routeToRegister();           
            }
        }
    
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