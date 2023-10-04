<template>
    <section id="login-section">
        <div class="header">
            <h2>Freya | Sign Up</h2>
        </div>
        <form @submit.prevent="onSubmit" class="loginRegister">
            <label for="username">Username:</label><br>
            <input v-model="username" type="text" name="username" placeholder="Username" class="inputLoginRegister"
                required>

            <label for="email">Email:</label><br>
            <input v-model="email" type="text" name="email" placeholder="Email Address" class="inputLoginRegister" required>

            <label for="password">Password:</label><br>
            <input v-model="password" type="password" name="password" placeholder="Password" class="inputLoginRegister"
                required>

            <button type="submit" class="buttonLoginRegister">Register</button>
        </form>
        <div class="register">
            <div class="register_message">Already have an acoount?</div>
            <RouterLink to="/signin">
                <button class="register_button" id="register-button">
                    Sign In
                </button>
            </RouterLink>
        </div>
    </section>
</template>
    
<script>
import { useUserStore } from '../stores/users';
import { mapState, mapActions } from 'pinia';
import { RouterLink } from "vue-router";

import axios from "axios";

const baseUrl = "http://localhost:3000"

export default {
    name: "SignUp",
    data() {
        return {
            username: "",
            email: "",
            password: "",
        };
    },
    methods: {
        ...mapActions(useUserStore, ["register"]),
        onSubmit() {
            const payload = { email: this.email, password: this.password, username: this.username };
            // console.log(payload, '<<<di signup');
            this.register(payload);
        },
    },
    components: {
        RouterLink,
    },
};
</script>