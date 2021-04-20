<template>
    <div id="gameJoin">
        <p class="error" v-if="error" >{{errMsg}}</p>
        <div id="information">
            <div id="username">
                <p>Please enter your name</p>
                <input v-model="userName" type="text" placeholder="Username">
            </div>
            <div id="groupCode">
                <p>Please enter your group code</p>
                <input id="code_input" v-model="groupCode" type="text" placeholder="4-letter code">
            </div>
        </div>
        <button v-if="feildsFilled" @click="join_game">Join Game</button>
        <br class="spacer">
        
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'GameJoin',
        data() {
            return {
                userName: '',
                groupCode: '',
                errMsg: '',
                id: '',
            }
        },
        computed: {
            feildsFilled: function() {
                return this.userName != '' && this.groupCode.length > 3
            },
            error: function() {
                return this.errMsg != '';
            }
        },
        methods: {
            async join_game() {
                this.groupCode = this.groupCode.toUpperCase();
                let notFound = false;
                try {
                    let game = await axios.get("/api/games/gamecode/" + this.groupCode);
                    let player = await axios.post("/api/games/" + game.data._id + "/players", {
                        name: this.userName,
                        role: null, 
                        isAlive: true
                    });
                    this.id = player.data._id;
                } catch (error) {
                    if (error.response.status === 404) {
                        notFound = true;
                    } else {
                        console.log(error);
                    }
                }


                if (notFound) {
                    this.errMsg = '*The code you typed does not match any code in the database.';
                } else {
                    localStorage.setItem('secret_hitler_id', this.id);
                    localStorage.setItem('secret_hitler_gameCode', this.groupCode);
                    this.$router.push({name: "gameBoard"});
                }
            }
        }
    
    }
</script>

<style scoped>
    #gameJoin {
        margin: 50px;
        padding: 20px;
        background-color: rgb(247,225,195);
        box-shadow: 0px 0px 20px rgb(20,20,20);
    }

    #code_input {
        text-transform: uppercase;
    }

    #information {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .error {
        color: rgb(255,0,0);
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