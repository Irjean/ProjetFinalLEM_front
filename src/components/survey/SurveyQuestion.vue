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
                <div v-if="question.content.includes('Aimeriez') && question.content.includes('vous')" class="label-note">
                    Pas du tout d'accord
                </div>

                <div class="number-answer-option">
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
                </div>
                
                
                <div v-if="question.content.includes('Aimeriez') && question.content.includes('vous')" class="label-note">
                    Tout à fait d'accord
                </div>
            </div>
        </div>
    </div>

</template>
  
<script>
import axios from 'axios';

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
                //console.log(this.question.type);
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
            },
        },
        watch: {
            selectedValue(currentVal) {
                //console.log('Question:' + (this.index+1) + '- Valeur du choix: ', currentVal);
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
    
    .label-note {
        font-size: 0.8rem;
        letter-spacing: 0rem;
    }

    .number-answer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }

    .number-answer-option {
        display: contents;
        align-items: flex-start;
        gap: 3rem;
    }
    .number-answer-option div{
        display: flex;
        width: 2.5rem;;
        height: 3.25rem;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
    }

    .title-number{
        color: var(--gray-color);
        font-weight: 600;
    }

    .error-text {
        color: var(--error-color);
    }

    .dotted {
        border: 1px dotted var(--primary-color);
        padding: 10px;
    }


    /* Desktop */
    @media (min-width: 1024px) {
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
        
        .label-note {
            font-size: 0.8rem;
        }

        .number-answer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
        }

        .number-answer-option {
            gap: 3rem;
        }
        .number-answer-option div{
            width: 2.5rem;;
            height: 3.25rem;
            gap: 0.25rem;
        }

        .title-number{
            font-weight: 600;
        }
    }

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1023px) {
        h3 {
        font-size: 1.15rem;
        margin-bottom: 1rem;
        }

        .form-question {
            margin-bottom: 2.5rem;
        }

        .form-control {
            height: 2.8rem;
        }

        label {
            font-size: 1rem;
            font-weight: 500;
        }
        
        .label-note {
            font-size: 0.8rem;
        }

        .number-answer {
            gap: 0.5rem;
        }

        .number-answer-option {
            gap: 2rem;
        }
        .number-answer-option div{
            width: 2.2rem;;
            height: 3.25rem;
            gap: 0.25rem;
        }

        .title-number{
            /* font-size: 1rem; */
            font-weight: 600;
        }
    }

    /* Mobile */
    @media (min-width: 460px) and (max-width: 767px) {
        h3 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
        }

        .form-question {
            margin-bottom: 2rem;
        }

        .form-control {
            height: 2.5rem;
        }

        label {
            font-size: 1rem;
            font-weight: 500;
        }
        
        .label-note {
            font-size: 0.8rem;
        }

        .number-answer {
            display: inline-grid;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }

        .number-answer-option {
            display: inline-grid;
            gap: 0rem;
        }
        .number-answer-option div{
            display: flex;
            flex-direction: row-reverse;
            min-width: 2.2rem;
            height: 3.25rem;
            gap: 0.25rem;
        }

        .title-number{
            /* font-size: 1rem; */
            font-weight: 600;
        }
    }

    @media (max-width: 460px) {

    }
</style>
