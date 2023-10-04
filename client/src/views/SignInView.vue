<template>
    <section id="login-section">
        <div class="header">
            <h2>Freya | Sign In</h2>
            <p>"Freya is an AI chatbot that will give you advice for your dating life. You can ask how to build emotional connections with other people, how to give a good first impression, or even how to find a partner who matches your values, interests and goals."</p>
        </div>
        <form id="login-form" class="loginRegister" @submit.prevent="onSubmit">
            <input v-model="email" type="text" name="email" placeholder="Email Address" id="login-email"
                class="inputLoginRegister" required>

            <input v-model="password" type="password" name="password" placeholder="Password" id="login-password"
                class="inputLoginRegister" required>

            <button type="submit" class="buttonLoginRegister">Login</button>
            <span class="signin_message">Or Sign In With</span>
            <div id="buttonDiv" class="google_button">
                <GoogleLogin :callback="onGoogleSubmit" />
            </div>
        </form>
        <div class="register">
            <div class="register_message">Don't have an acoount?</div>
            <RouterLink to="/signup">
                <button class="register_button" id="register-button">
                    Sign Up
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
import { GoogleLogin } from 'vue3-google-login'

const baseUrl = "http://localhost:3000"

export default {
    name: "SignIn",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    
    methods: {
        ...mapActions(useUserStore, ['login', 'googleLogin']),
        onSubmit() {
            const payload = { email: this.email, password: this.password };
            this.login(payload);
            // this.$router.push("/");
        },
        onGoogleSubmit(response) {
            this.googleLogin(response)
            this.$router.push('/')
        }
    },
    components: {
        RouterLink,
        GoogleLogin
    }
};
</script>