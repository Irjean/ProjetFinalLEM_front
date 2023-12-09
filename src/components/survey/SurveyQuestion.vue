<template>
    <div class="form-question">
        <div>
            <span class="title-number"> {{ index + 1 }}/{{ questionCount }}</span>
            <h3>{{ question.content }}</h3>
        </div>

        <div class="form-answer-text">
            <div  v-if="question.type == 'A'" class="dotted">
                <div v-for="choice in this.choices" class="form-check">
                    <input :id="'type-a-' + index + '-' + this.choices.indexOf(choice)" :name="'type-a-' + index + '-' + this.choices.indexOf(choice)" v-model="selectedValue" :value="choice" type="radio" class="form-check-input" required>
                    <label :for="'type-a-' + index + '-' + this.choices.indexOf(choice)">{{ choice }}</label>
                </div>
            </div>
            
            <input 
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
            type="text" 
            @keyup="checkNumber(event)" 
            v-model="selectedValue" 
            v-if="question.content == 'Votre âge'" 
            class="form-control" 
            required
            >
            <div v-if="question.content == 'Votre âge'" class="error-message">
                <p v-if="ageError" class="error-text">Veuillez entrer l'âge correct</p>
            </div>

            
            
            <div type="number" v-if="question.type == 'C'" class="number-answer" >
                <div v-if="question.content.includes('Aimeriez') && question.content.includes('vous')">
                    Pas du tout d'accord
                </div>

                <div>
                    <input :id="'type-c-1-' + index" v-model="selectedValue" value="1" :name="'type-c-' + index" type="radio" class="form-check-input">
                    <label :for="'type-c-1-' + index">1</label>
                </div>

                <div>
                    <input :id="'type-c-2-' + index" v-model="selectedValue" value="2" :name="'type-c-' + index" type="radio" class="form-check-input">
                    <label :for="'type-c-2-' + index">2</label>
                </div>

                <div>
                    <input :id="'type-c-3-' + index" v-model="selectedValue" value="3" :name="'type-c-' + index" type="radio" class="form-check-input">
                    <label :for="'type-c-3-' + index">3</label>
                </div>

                <div>
                    <input :id="'type-c-4-' + index" v-model="selectedValue" value="4" :name="'type-c-' + index" type="radio" class="form-check-input">
                    <label :for="'type-c-4-' + index">4</label>
                </div>

                <div>
                    <input :id="'type-c-5-' + index" v-model="selectedValue" value="5" :name="'type-c-' + index" type="radio" class="form-check-input">
                    <label :for="'type-c-5-' + index">5</label>
                </div>
                
                <div v-if="question.content.includes('Aimeriez') && question.content.includes('vous')">
                    Tout à fait d'accord
                </div>
            </div>
        </div>
    </div>

</template>
  
<script>
    export default {
        name: "SurveyQuestion",
        props: {
            question: Object,
            questionCount: Number,
            index: Number,
        },
        data() {
            return {
                choices: JSON.parse(this.question.choices),
                ageError: false,
                emailError: false,
                textFieldError: false,
                selectedValue: null,
            };
        },
        methods: {
            checkNumber: function (event) {
                if (isNaN(this.selectedValue) || this.selectedValue <= 0 || this.selectedValue >120) {
                    this.ageError = true; 
                } else {
                    this.ageError = false;
                }
                this.checkAnswered();
            },

            checkEmail: function () {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(this.selectedValue)) {
                    this.emailError = true;
                }else {
                    this.emailError = false;
                }
                this.checkAnswered();
            },

            checkField: function () {
                if(this.selectedValue === ''){
                    this.textFieldError = true;
                } else {
                    this.textFieldError = false;
                }
                this.checkAnswered();
            },


            checkAnswered: function() {
                console.log(this.question.type);
                let error = true;
                if(this.selectedValue !== null && this.selectedValue !== '' && typeof this.selectedValue !== 'undefined' && this.ageError === false && this.emailError === false && this.textFieldError === false) {
                    error = false;
                } else {
                    error = true;
                }

                this.$emit('question-answered', {
                    error: error,
                    questionId: this.question.id,
                    number: this.index + 1,
                    // type: this.question.type,
                    // label: this.question.content,
                    answerValue: this.selectedValue
                });
            }
        },
        watch: {
            selectedValue(currentVal) {
                console.log('Question:' + (this.index+1) + '- Valeur du choix: ', currentVal);
                if(this.question.type === 'C' || this.question.type === 'A') {
                    this.checkAnswered();
                }
            },
        },
    };
  
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
