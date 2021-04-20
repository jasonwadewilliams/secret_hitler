<template>
    <div class="main">
        <p>Login or create an account now.</p>
        <div class="choices">
            <Login/>
            <span>or</span>
            <Create/>
        </div>
    </div>
</template>

<script>
import Login from '../components/Login.vue';
import Create from '../components/Create.vue';
export default {
    name: 'createAccount',
    components: {
        Login,
        Create
    }
}
</script>
