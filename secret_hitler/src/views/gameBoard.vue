<template>
    <div class="mainblock">
        <div v-if="status == 'waiting'">
            <hr class="spacer">
            <div v-if="players_needed" id="waiting_for_players">
                <h1>Waiting for other players to join..</h1>
                <div class="blue">
                    <span>{{players_needed}} more player</span><span v-if="players_needed == 1"> is</span><span v-else>s are</span><span> required to start a game.</span>
                </div>
            </div>
            <div v-else>
                <button @click="startGame">Start!</button>
            </div>
            <div>
                <p v-if="player">Hi {{player.name}}. Your game code is {{gameCode}}</p>
            </div>

            <h2>List of Players</h2>
            <ul>
                <li v-for="player in filteredPlayers" :key="player.id">
                    <p>{{player.name}}</p>
                </li>
            </ul>
            <hr class="spacer">
            <h2>Roles in use</h2> 
            <WaitingRoom :roles="roles"></WaitingRoom>                       
        </div>


        <div v-if="status == 'started'">
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
                            <a data-toggle="collapse" href="#collapse1">Role</a>
                            </h4>
                        </div>
                        <div v-if="player.role" id="collapse1" class="panel-collapse collapse">
                            <div class="panel-body">
                                <p>{{myRole}}</p>
                                <img :src="require(`../../images/${myPartyCard}`)">
                                <img :src="require(`../../images/${myRoleCard}`)">
                            </div>
                            <span>
                                <p>{{player.name}}</p>
                                <div>
                                    <input class="panel-footer" v-model="editName">
                                    <button @click="updateName()" >edit</button>
                                </div>
                            </span>
                        </div>
                        <span v-else class="blue">*an error occured</span>
                    </div>
                </div>
            </div>
        </div>        
        <hr class="spacer">
    </div>
</template>

<script>
    import axios from 'axios';
    import WaitingRoom from '../components/waitingRoom.vue'
    import underscore from 'underscore';
    export default {
        name: 'GameBoard',
        components: {
            WaitingRoom
        },
        data() {
            return {
                gameCode: '',
                id: '',
                game: null,
                player: null,
                role: null,
                editName: '',
                players: [],
                players_needed: null,
                status: ''
            }
        },
        created() {
            this.getData();
            if (this.player == null) {
                this.autoRefresh(5000);
            }
        },
        computed: {
            roles() {
                return this.$root.$data.roles.filter(role => role.id <= this.players.length);
            },
            filteredPlayers() {
                return this.players;
            },
            myRole() {
                if (this.player.role) {
                    return this.$root.$data.roles.find(role => role.id == this.player.role).party;
                }
                return null
            },
            myRoleCard() {
                if (this.player.role) {
                    return this.$root.$data.roles.find(role => role.id == this.player.role).role_image;
                }
                return null
            },
            myPartyCard() {
                if (this.player.role) {
                    return this.$root.$data.roles.find(role => role.id == this.player.role).party_image;
                }
                return null
            }
        },
        methods: {
            async startGame() {
                try {
                    this.game = await axios.put(`/api/games/${this.game._id}`, {
                        status: "started",
                    });
                    await this.shuffleRoles();

                } catch (error) {
                    console.log(error);
                }
            },
            async getData() {
                this.gameCode = localStorage.getItem("secret_hitler_gameCode");
                this.id = localStorage.getItem("secret_hitler_id");
                this.game = await this.getGame();
                this.status = this.game.status;
                this.players = await this.getPlayers();
                this.player = await this.getPlayer();
                if (this.players.length < 2) {
                    this.players_needed = 2 - this.players.length;
                } else {
                    this.players_needed = null;
                }
            },
            async getGame() {
                try {
                    const response = await axios.get("/api/games/gamecode/" + this.gameCode);
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
            async getPlayer() {
                try {
                    const response = await axios.get(`/api/games/${this.game._id}/players/${this.id}`);
                    return response.data;
                } catch (error) {
                    console.log(error);
                }
            },
            async updateName() {
                try {
                    await axios.put(`/api/games/${this.game._id}/players/${this.id}`, {
                        name: this.editName,
                        isAlive: this.player.isAlive,
                        role: this.player.role,
                    });
                    this.getPlayer();
                } catch (error) {
                    console.log(error);
                }
            },
            async updatePlayerRole(playerID, roleID, gameID) {
                try {
                    await axios.put('/api/games/roleChange/' + gameID + '/players/' + playerID, {
                        role: roleID
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            async shuffleRoles() {
                let RoleList = this.$root.$data.roles.filter(role => role.id <= this.players.length);
                let shuffledDeck = underscore.shuffle(RoleList)
                let roleCount = 0;
                this.players.forEach(player => {
                    this.updatePlayerRole(player._id, shuffledDeck[roleCount].id, player.game)
                    roleCount += 1;
                });
            },
            async autoRefresh(time) {
                setInterval(this.getData, time);
            }
            
        }
    }
</script>



<style scoped>
    .mainblock {
        background-color: rgb(105, 105, 105);
        margin: 20px 0px;
        min-height: 85vh;
    }

    ul {
	list-style: none;
	margin: 10px;
    }

    li {
        background-color: rgb(25,25,25);
        color: rgb(247,225,195);
        width: 20%;
        min-width: 150px;
        padding: 10px;
        font-size: 1em;
        display: inline-table;
    }


    h2 {
        background-color: rgb(25,25,25);
        color: rgb(247,225,195);
        padding: 4px;
        text-size-adjust: auto;
        font-family: 'Bungee';
        text-decoration: underline;
    }

    .blue {
        color: rgb(79, 191, 243);
    }

    button {
		font-family: 'Girassol';
		font-weight:bold;
		font-size:larger;
		padding: 10px;
        margin: 10px;
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

    /*  -- board page -- */
    #role {
        position: fixed;
        bottom: 25px;
        left: 5px;
        margin: 10px;
        padding: 10px;
        width:25%;
        max-width: 300px;
        min-width: 100px;
        background-color: rgb(25, 25, 25);
        border-radius: 10px;
        color: rgb(247,225,195);
        z-index: 1;
    }
    #role img {
        max-width: 100px;
        border-radius: 10px;
    }

    #role input{
        width: 70%;
        max-width: 200px;
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
</style>