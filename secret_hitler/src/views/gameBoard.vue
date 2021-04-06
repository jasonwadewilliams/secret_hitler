<template>
    <div class="mainblock">
        <div v-if="started">
            <div id="facistBoard">
                <img class="fullWide" src="../../images/fascistBoard_8.png">
                <!--<img src="../../images/card_policy_fascist.png" id="facistPolicy1" class="facistPolicy">-->
            </div>
            <div id="liberalBoard">
                <img class="fullWide" src="../../images/liberalBoard.png">
                <!--<img src="../../images/card_policy_liberal.png" id="liberalPolicy1" class="liberalPolicy">
                <img src="../../images/card_policy_liberal.png" id="liberalPolicy2" class="liberalPolicy">
                <img src="../../images/card_policy_liberal.png" id="liberalPolicy3" class="liberalPolicy">-->
            </div>
            <div id="role" class ="container">
                <div class="panel-group">
                    <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                        <a data-toggle="collapse" href="#collapse1">Your Role</a>
                        </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse">
                        <div class="panel-body">
                            <img src="../../images/facist_membership.png">
                            <img src="../../images/card_role_hitler.png">
                        </div>
                        <div class="panel-footer">Panel Footer</div>
                    </div>
                    </div>
                </div>
                
            </div>
            <div class="middle" id="presidency">
                <h1>Presidency</h1>
                <div id="president">
                    <img src="../../images/card_placard_president.png">
                    <p class="middle">Player 1</p>
                </div>
                <div id="chancellor">
                    <img src="../../images/card_placard_chancellor.png">
                    <p class="middle">Player 2</p>
                </div>
            </div>
        </div>

        <div v-if="waiting">
            <hr class="spacer">
            <h1>Waiting for other players to join..</h1>
            <h2>5 more players are required to start a game.</h2>
            <div>
                <p v-if="player">Hi {{player.name}}. Your game code is {{gameCode}}</p>
            </div>
            <div>
                <button @click="startGame">Start!</button>
                <WaitingRoom :roles="roles" />
            </div>            
        </div>
        <hr class="spacer">
    </div>
</template>

<script>
    import axios from 'axios';
    import WaitingRoom from '../components/waitingRoom.vue'
    //import underscore from 'underscore';
    export default {
        name: 'GameBoard', 
        components: {
            WaitingRoom
        },
        data() {
            return {
                gameCode: '',
                game: null,
                player: null,
                started: false,
                players: [],
            }
        },
        created() {
            this.getData();
        },
        computed: {
            waiting: function() {
                return !this.started;
            },
            roles() {
                return this.$root.$data.roles.filter(role => role.id <= this.players.length);
            }
        },
        methods: {
            startGame() {
                this.started = true;
            },
            async getData() {
                this.gameCode = localStorage.getItem("secret_hitler_gameCode");
                this.game = await this.getGame();
                this.players = await this.getPlayers();
            },
            async getGame() {
                try {
                    const response = await axios.get("/api/gamecode/" + this.gameCode);
                    //console.log(response);
                    return response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async getPlayers() {
                try {
                    const response = await axios.get(`/api/games/${this.game._id}/players`);
                    return response.data;
                } catch (error) {
                    console.log(error);
                }
            },
        }
    }
</script>



<style scoped>
    .mainblock {
        background-color: rgb(105, 105, 105);
        margin: 20px 0px;
        height: 85vh;
    }

    /*  -- board page -- */
    #role {
        position: fixed;
        bottom: 5px;
        left: 5px;
        margin: 10px;
        padding: 10px;
        max-width: 50%;
        background-color: rgb(25, 25, 25);
        border-radius: 10px;
        color: rgb(247,225,195);
        z-index: 1;
    }
    #role img {
        max-width: 100px;
        border-radius: 10px;
    }
    .middle {
        display:flex;
        flex-direction: column;
        align-items: center;
    }

    a {
        text-decoration: none;
        color: rgb(247,225,195);
    }
    a:hover {
        color: rgb(79, 191, 243);
    }

    .fullWide {
        padding: 10px;
        max-width: 100vw;
    }

    #facistBoard #facistPolicy1 {
        top:23%;
        left:7.5%;
        position:absolute;
    }

    #liberalBoard #liberalPolicy1 {
        top:23%;
        left:14.5%;
        position:absolute;
    }
    #liberalBoard #liberalPolicy2 {
        top:23%;
        left:29%;
        position:absolute;
    }
    #liberalBoard #liberalPolicy3 {
        top:23%;
        left:43.5%;
        position:absolute;
    }

    
    .facistPolicy {
        max-width: 13%;
    }
    .liberalPolicy {
        max-width: 13%;
    }

    #presidency {
        display: flex;
        justify-content: space-around;
        font: outline rgb(79, 191, 243);
        color: rgb(247,225,195);
        background-color: rgb(25,25,25);
        font-family: 'Bungee';
        margin-top: 75%;
        border-radius: 10px;
        padding: 10px;
    }
    #presidency p {
        font-family: 'Girassol';
        font-weight:bold;
        color: rgb(25,25,25);
    }
    #president {
        height:10%;
        overflow: hidden;
        margin: 5px;
    }
    #chancellor {
        height:30%;
        overflow: hidden;
        margin: 5px;
    }
    #presidency img {
        max-width: 100%;
        margin-top: -18%;
        margin-bottom: -18%;
    }
</style>