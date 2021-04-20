<template>
    <div class="hero">
        <div class="herobox">
            <form class="pure-form">
            <fieldset>
                <legend>Register for an account</legend>
                <input placeholder="first name" v-model="firstName">
                <input placeholder="last name" v-model="lastName">
            </fieldset>
            <fieldset>
                <input placeholder="username" v-model="username">
                <input type="password" placeholder="password" v-model="password">
            </fieldset>
            <fieldset>
                <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
            </fieldset>
            </form>
            <p v-if="error" class="error">{{error}}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Create',
    data() {
        return {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            error: '',
        }
    },
    methods: {
        async register() {
            this.error = '';
            this.errorLogin = '';
            if (!this.firstName || !this.lastName || !this.username || !this.password)
                return;
            try {
                let response = await axios.post('/api/users', {
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                password: this.password,
                });
                this.$root.$data.user = response.data.user;
            } catch (error) {
                this.error = error.response.data.message;
                this.$root.$data.user = null;
            }
            this.$router.push({name: "Home"});
        },
    }
}
</script>

<style scoped>
.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 120px;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>