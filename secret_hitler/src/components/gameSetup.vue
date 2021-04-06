<template>
    <div id="gameSetup">
        <div class="middle" id="information">
            <p>Please enter your name</p>
            <input v-model="userName" type="text">
        </div>
        <button type="button" @click="CreateGame()" class="middle">Start New Game</button>
        <br class="spacer">
        
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'GameSetup',
        data() {
            return {
                userName: '',
                id: '',
            }
        },
        methods: {
            async CreateGame() {
                let groupCode = MakeCode(4);
                /*do {
                    newCode = MakeCode(4);
                } while (this.$root.$data.groups.find(function(group) {
                        if(group.groupCode == newCode) return true
                    }) != undefined)*/

                try {
                    let game = await axios.post('/api/games', {
                        groupCode: groupCode,
                    })
                    let player = await axios.post("/api/games/" + game.data._id + "/players", {
                        name: this.userName,
                        role: null, 
                        isAlive: true
                    })
                    this.id = player.data._id;
                } catch (error) {
                    console.log(error);
                }

                localStorage.setItem('secret_hitler_id', this.id);
                localStorage.setItem('secret_hitler_gameCode', groupCode);
                this.$router.push({name: "gameBoard"})
            },
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