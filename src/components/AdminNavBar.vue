<template>
    <section id="admin-sidebar">
        <div class="nav-container">
            <router-link to="/"><img src="/bigscreen.svg" alt="Bigscreen logo"></router-link>
            <div class="stick"></div>
            <nav>
                <ul>
                    <li>
                        <router-link to="/administration">Accueil</router-link>
                    </li>
                    <li>
                        <router-link to="/administration/questionnaire">Questionnaire</router-link>
                    </li>
                    <li>
                        <router-link to="/administration/reponses">Réponses</router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <router-link to="/administration/login"><button id="logout-btn">Se déconnecter</button></router-link>
    </section>
</template>

<script setup>
    
</script>

<style>
    #admin-sidebar{
        width: 15dvw;
        height: 100%;
        border-right: 1px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 0px;
        background-color: black;
    }

    #admin-sidebar a{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .stick{
        width: 70%;
        height: 1px;
        background-color: white;
    }

    .nav-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 30%;
        width: 100%;
    }

    .nav-container img{
        width: 70%;
    }

    .nav-container li a, .nav-container li a:link, #logout-btn{
        color: white;
        transition: 0.3s;
    }

    .nav-container li a:hover, #logout-btn:hover{
        font-weight: 700;
        text-decoration: underline;
    }
</style>