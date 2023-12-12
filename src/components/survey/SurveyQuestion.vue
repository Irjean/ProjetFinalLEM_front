<template>
    <div class="form-question">
        <div>
            <span class="title-number"> {{ index + 1 }}/{{ questionCount }}</span>
            <h3>{{ question.content }}</h3>
        </div>

        <div class="form-answer-text">
            <div  v-if="question.type == 'A'" class="dotted">
                <div v-for="(choice, ind) in choices" class="form-check">
                    <input :id="ind + 'question' + (index + 1)" :name="ind + 'question' + (index + 1)" v-model="selectedValue" :value="choice" type="radio" class="form-check-input" required>
                    <label :for="ind + 'question' + (index + 1)">{{ choice }}</label>
                </div>
            </div>
            
            <input 
            :id="'question' + (index + 1)"
            type="text"
            v-if="question.type == 'B' && question.content !=='Votre email'  && question.content !=='Votre âge'"
            v-model="selectedValue" 
            @keyup="checkField"
            class="form-control" 
            required
            >
            <div v-if="question.type == 'B' && question.content !=='Votre email'  && question.content !=='Votre âge'">
                <p v-if="textFieldError" class="error-text">Ce champ est obligatoire</p>
            </div>

            
            <input 
            :id="'question' + (index + 1)"
            :type=" question.content == 'Votre email' ? 'email' : 'text' " 
            v-if="question.type == 'B' && question.content =='Votre email'"
            v-model="selectedValue" 
            @keyup="checkEmail"
            class="form-control" 
            required
            >
            <div v-if="question.type == 'B' && question.content =='Votre email'" class="error-message">
                <p v-if="emailError" class="error-text">Veuillez mettre une adresse email valide</p>
            </div>


            <input 
            :id="'question' + (index +1)"
            type="text" 
            v-model="selectedValue" 
            @keypress="typeNumber($event)"
            v-if="question.content == 'Votre âge'" 
            class="form-control" 
            required
            >
            <div v-if="question.content == 'Votre âge'" class="error-message">
                <p v-show="!checkNumber()" class="error-text">Veuillez rentrer un âge valide.</p>
            </div>

            
            
            <div :id="'question' + index +1" type="number" v-if="question.type == 'C'" class="number-answer" >
                <div v-if="question.content.includes('Aimeriez') && question.content.includes('vous')">
                    Pas du tout d'accord
                </div>

                <div>
                    <input :id="'type-c-1-' + index" v-model="selectedValue" value="1" :name="'question' + (index+1)" type="radio" class="form-check-input" required>
                    <label :for="'type-c-1-' + index">1</label>
                </div>

                <div>
                    <input :id="'type-c-2-' + index" v-model="selectedValue" value="2" :name="'question' + (index+1)" type="radio" class="form-check-input">
                    <label :for="'type-c-2-' + index">2</label>
                </div>

                <div>
                    <input :id="'type-c-3-' + index" v-model="selectedValue" value="3" :name="'question' + (index+1)" type="radio" class="form-check-input">
                    <label :for="'type-c-3-' + index">3</label>
                </div>

                <div>
                    <input :id="'type-c-4-' + index" v-model="selectedValue" value="4" :name="'question' + (index+1)" type="radio" class="form-check-input">
                    <label :for="'type-c-4-' + index">4</label>
                </div>

                <div>
                    <input :id="'type-c-5-' + index" v-model="selectedValue" value="5" :name="'question' + (index+1)" type="radio" class="form-check-input">
                    <label :for="'type-c-5-' + index">5</label>
                </div>
                
                <div v-if="question.content.includes('Aimeriez') && question.content.includes('vous')">
                    Tout à fait d'accord
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, watch } from "vue";
import { useAnswerStore } from "../../stores/answer";

const props = defineProps([
    "question",
    "questionCount",
    "index"
]);

const store = useAnswerStore();

let ageError = ref(true);
let emailError = ref(false);
let textFieldError = ref(false);
let selectedValue = ref("");
let choices = ref(JSON.parse(props.question.choices));

watch(selectedValue, (newValue) => {
    if(newValue.length < 1){
        return
    }

    store.addAnswer(props.question.id, selectedValue);
})

function checkEmail () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(selectedValue.value)) {
        emailError = true;
    }else {
        emailError = false;
    }
}

function typeNumber(evt){
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
    }
}

function checkNumber () {
    if(selectedValue.value == ""){
        return true;
    }
    return Number(selectedValue.value) > 5 && Number(selectedValue.value) < 120;
    
}


function checkField () {
    if(selectedValue === ''){
        textFieldError = true;
    } else {
        textFieldError = false;
    }
    checkAnswered();
}


function checkAnswered () {
    let error = true;
    if(selectedValue !== null && selectedValue !== '' && typeof selectedValue !== 'undefined' && ageError === false && emailError === false && textFieldError === false) {
        error = false;
    } else {
        error = true;
    }
    
}

</script>

<style scoped>
    h3 {
        font-size: 1.2rem;
        margin-bottom: 1.3rem;
    }

    .form-question {
        margin-bottom: 3rem;
    }

    .form-control {
        height: 3rem;
    }

    label {
        font-size: 1.1rem;
        font-weight: 500;
    }
   
    .number-answer {
        display: flex;
        align-items: flex-start;
        gap: 73px;
    }
    .number-answer div{
        display: flex;
        width: 52px;
        height: 52px;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .title-number{
        color: var(--gray-color);
        font-weight: 600;
    }

    .error-text {
        color: rgb(214, 4, 4);
    }

    .dotted {
        border: 1px dotted orange;
        padding: 10px;
    }
</style>
