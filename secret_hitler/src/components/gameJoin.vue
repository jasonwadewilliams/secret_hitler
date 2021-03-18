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
                groupCode: '',
                errMsg: ''
            }
        },
        computed: {
            feildsFilled: function() {
                return this.$data.userName != '' && this.$data.groupCode.length > 3
            },
            error: function() {
                return this.$data.errMsg != '';
            }
        },
        methods: {
            join_game() {
                let currentCode = this.$data.groupCode.toUpperCase();
                let obj = this.$root.$data.groups.find(function(group) {
                    if(group.groupCode == currentCode) return true
                });
                if (obj != undefined) {
                    obj.users.push(this.$data.userName);
                    localStorage.setItem('groupCode', obj.groupCode);
                    localStorage.setItem('name', this.$data.userName);

                    this.$router.push({name: "gameBoard", params: {gameObject: obj, userName: this.$data.userName}});
                } else {this.$data.errMsg = '*The code you typed does not match any code in the database.'}
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