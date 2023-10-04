<template>
    <Navbar></Navbar>
    <RouterView></RouterView>
</template>

<script>
import Navbar from "./Navbar.vue";
import { RouterView } from "vue-router";
export default {
  components: {
    Navbar,
    RouterView,
  },
};
</script>