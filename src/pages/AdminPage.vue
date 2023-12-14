<template>
    <div id="admin-container">
        <AdminNavBar />
        <section>
            paadmin
        </section>
    </div>
</template>

<script setup>
import AdminNavBar from "../components/AdminNavBar.vue";
import { onMounted } from "vue";
import { useNavbarStore } from "../stores/navbar";
import axios from "axios"

const store = useNavbarStore();
onMounted(() => {
    store.hideNavbar();
    getAnswers();
})

function getAnswers(){
    axios("/api/answer/all")
    .then(res => console.log(res))
}
</script>

<style scoped>
    #admin-container{
        display: flex;
        flex-direction: row;
        min-height: 100dvh;
        min-width: 100vw;
    }
</style>