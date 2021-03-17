<template>
    <div id="gameJoin">
        <div id="information">
            <div id="username">
                <p>Please enter your name</p>
                <input v-model="userName" type="text" placeholder="Username">
            </div>
            <div id="groupCode">
                <p>Please enter your group code</p>
                <input v-model="groupCode" type="text" placeholder="4-letter code">
            </div>
        </div>
        <button v-if="feildsFilled" @click="join_game">Join Game</button>
        <br class="spacer">
        
    </div>
</template>

<script>
    export default {
        name: 'GameJoin',
        data() {
            return {
                userName: '',
                groupCode: ''
            }
        },
        computed: {
            feildsFilled: function() {
                return this.$data.userName != '' && this.$data.groupCode.length > 3
            }
        },
        methods: {
            join_game() {
                this.$root.$data.groups.find(function(group) {
                    if(group.groupCode == "bxdf") return true
                }).users.push(this.$data.userName);
                this.$router.push('/gameBoard')
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

    #information {
        display: flex;
        justify-content: space-evenly;
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