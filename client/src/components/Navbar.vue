<template>
    <nav class="navbar">
        <div class="logo">
            <img src="../assets/freya-logo-red.png" />
            <!-- <span class="icon material-symbols-outlined me-2">view_in_ar</span> -->
            <p>Freya</p>
        </div>
        <ul class="nav-links">
            <li class="person">
                <span class="icon material-symbols-outlined me-2">person_raised_hand</span>Hi, {{ currentUser }}
            </li>
            <li class="routerlink-navbar" @click.prevent="showMenu">
                <!-- <RouterLink to="/" class="routerlink-navbar"> -->
                    <!-- <input type="checkbox" id="menuBtn"> -->
                    <span class="icon material-symbols-outlined me-2">menu</span>
                <!-- </RouterLink> -->
            </li>
        </ul>
        <ul v-if="isClicked" class="menu-list" id="menuList">
            <li>
                <RouterLink to="/" >
                    Home
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/generate-message" >
                    Generate Message
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/community" >
                    Freya Community
                </RouterLink>
            </li>
            
            <li>
                <RouterLink to="/about" >
                    About Freya
                </RouterLink>
            </li>
            <li v-if="isLogged">
                <a href="#" @click.prevent="doLogout">Logout</a>
            </li>
        </ul>

        <!-- <ul class="nav-links">
            <li>
                <RouterLink to="/"  class="routerlink-navbar">
                    <span class="icon material-symbols-outlined me-2">cottage</span>
                    Home
                </RouterLink>
            </li>
            <li v-if="!isLogged">
                <RouterLink to="/signin" class="routerlink-navbar">
                    <span class="icon material-symbols-outlined me-2">login</span>
                    Sign In
                </RouterLink>
            </li>
            <li v-if="!isLogged">
                <RouterLink to="/signup" class="routerlink-navbar">
                    <span class="icon material-symbols-outlined me-2">stylus_note</span>
                    Sign Up
                </RouterLink>
            </li>
            <li v-if="isLogged">
                <span class="icon material-symbols-outlined me-2">logout</span>
                <a href="#" @click.prevent="doLogout">Logout</a>
            </li>
        </ul> -->

    </nav>
</template>
    
<script>
import { RouterLink } from "vue-router";
import { mapState, mapActions } from 'pinia';
import { useUserStore } from "../stores/users";

export default {
    name: "Navbar",
    data() {
        return {
            username: '',
            isClicked: false
        }
    },
    methods: {
        ...mapActions(useUserStore, ['logout']),
        doLogout() {
            this.logout()
            this.$router.push("/signin");
        },
        showMenu() {
            this.isClicked = !this.isClicked
        }
        // goHome() {
        //     // console.log(this.filterByTypeId, '<<<di sidebar');
        //     this.fetchLodgings(null, null)
        // }
    },
    computed: {
        ...mapState(useUserStore, ['isLogged', 'currentUser'])
    },
    components: {
        RouterLink,
    },
    created() {
        this.username = localStorage.getItem("username")
    }
};
</script>