<template>
    <form @submit.prevent method="POST" action="http://127.0.0.1:8000/login">
        <h2>Administration</h2>
        <div class="credentials">
            <div class="input-container">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" v-model="email" required>
            </div>
            <div class="input-container">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" v-model="password" required>
            </div>
        </div>
        <span v-if="showError" class="error-msg">Les identifiants ne correspondent pas.</span>
        <button type="submit" @click="login">Login</button>
        <Loading v-if="loading"/>
    </form>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import axios from "axios";
    import router from "../../router.js";
    import { useNavbarStore } from "../../stores/navbar";
    import { useAdminStore } from "../../stores/admin";
    import Loading from "../../components/Loading.vue";

    const email = ref();
    const password = ref();
    let loading = ref(false);
    let showError = ref(false);
    const store = useNavbarStore();
    const adminStore = useAdminStore();

    onMounted(() => {
        store.showNavbar();
        axios.get("sanctum/csrf-cookie")
    });

    const login = async () => {
        loading.value = true;
        showError.value = false;
        axios.post("/api/login", {
            email: email.value,
            password: password.value
        }).then(res => {
            loading.value = false;
            if(res.status == 200){
                adminStore.isAdmin = true;
                router.push("/administration");
            }
        })
        .catch(error => {
            loading.value = false;
            showError.value = true;
            console.error(error);
        })
    }
</script>
<style scoped>
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 35dvh;
        width: 25dvw;
        padding: 30px 0;
    }

    form h2{
        font-size: 2.3rem;
    }

    .credentials{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 60%;
        gap: 10px;
        margin-bottom: 20px;
    }

    .input-container{
        width: 100%
    }

    input{
        border: 1px solid black;
        border-radius: 5px;
        height: 28px;
        width: 100%;
    }

    label{
        width: 100%;
        text-align: left;
    }

    form button{
        background-color: #00bd7e;
        color: white;
        border: none;
        border-radius: 15px;
        padding: 10px 25px;
        font-size: 1.1rem;
        cursor: pointer;
        margin-bottom: 50px;
    }

    form button:hover{
        background-color: #02a871;
    }

    form button:active{
        background-color: #028559;
    }

    .error-msg{
        color: red;
        margin-bottom: 10px;
    }

    @media screen and (max-width: 1100px) {
        form{
            width: 40%;
        }
    }

    @media screen and (max-width: 700px) {
        form{
            width: 70%;
        }
    }
</style>