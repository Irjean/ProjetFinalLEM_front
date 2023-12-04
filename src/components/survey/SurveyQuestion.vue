<template>
    <div class="form-question">
        <div>
            <span class="title-number"> {{ index + 1 }}/{{ questionCount }}</span>
            <h2>{{ question.content }}</h2>
        </div>

        <div class="form-answer-text">
            <div>
                <div v-if="question.type == 'A'" v-for="choice in this.choices" class="form-check">
                    <input id="type-a" name="type-a" value="{{ choice }}" type="radio" class="form-check-input">
                    <label for="type-a">{{ choice }}</label>
                </div>
            </div>
            
            <input type="text" v-if="question.type == 'B'" class="form-control">

            <div type="number" v-if="question.type == 'C'" class="number-answer">
                <span v-if="question.content.includes('Aimeriez') && question.content.includes('vous')">
                    Pas du tout d'accord
                </span>
                <span>
                    <input id="type-c-1" name="type-c-1" type="radio" class="form-check-input">
                    <label for="type-c-1">1</label>
                </span>

                <span>
                    <input id="type-c-2" name="type-c-2" type="radio" class="form-check-input">
                    <label for="type-c-2">2</label>
                </span>

                <span>
                    <input id="type-c-3" name="type-c-3" type="radio" class="form-check-input">
                    <label for="type-c-3">3</label>
                </span>

                <span>
                    <input id="type-c-4" name="type-c-4" type="radio" class="form-check-input">
                    <label for="type-c-4">4</label>
                </span>

                <span>
                    <input id="type-c-5" name="type-c-5" type="radio" class="form-check-input">
                    <label for="type-c-5">5</label>
                </span>
                <span v-if="question.content.includes('Aimeriez') && question.content.includes('vous')">
                    Tout à fait d'accord
                </span>
            </div>
        </div>
    </div>
        
        


  </template>
  
  <script>
  export default {
    name: "Question",
    props: [
        'question',
        'questionCount',
        'index'
    ],
    data() {
      return {
        selectedChoice: null,
        choices: JSON.parse(this.question.choices)
      };
    },
  };
  </script>

  <style scoped>
    h2 {
        font-size: 1.3rem;
        margin-bottom: 1.3rem;
    }

    .form-question {
        margin-bottom: 3rem;
    }

    .form-control {
        height: 3rem;
    }

    label {
        font-size: 1.15rem;
        font-weight: 500;
    }
   
    .number-answer {
        display: flex;
        align-items: flex-start;
        gap: 73px;
    }
    .number-answer span{
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
</style>