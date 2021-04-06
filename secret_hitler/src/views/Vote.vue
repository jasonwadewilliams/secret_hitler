<template>
    <div class="mainblock">
        <div id="button_box">
            <button id="voteimg"><img src="../../images/card_ballot_nein.png"></button>
            <button id="voteimg"><img src="../../images/card_ballot_ja.png"></button>
        </div>

        <div id="vote">
            <h2>Waiting for 3 players to vote</h2>
            <h2>Results</h2>
            <div id="results">
                <div id="ja">
                    <p>Ja!</p>
                    <p>4</p>
                </div>
                <div id="nein">
                    <p>Nein</p>
                    <p>3</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from 'axios';

export default {
    name: "Vote",
    data() {
        return {
            voteSelected: null,
        }
    },
}
</script>




<style scoped>
    .mainblock {
        background-color: rgb(105, 105, 105);
        margin: 20px 0px;
        height: 87vh;
    }

    /* -- vote page -- */
    #button_box {
        display: flex;
        justify-content: space-evenly;
        padding: 20px;
    }

    #vote {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #vote h2 {
        font-weight: bold;
        text-decoration: underline;
    }

    #voteimg img {
        max-width: 100%;
    }
    #voteimg {
        background-color: none;
        max-width: 25%;
    }

    #results {
        display: flex;
        justify-content: space-around;
    }

    #ja {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #nein {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>