<template>
        <h2>{{ question.content }}</h2>

        <div>
            <div v-if="question.type == 'A'" v-for="choice in this.choices" class="form-check">
                <input id="type-a" name="type-a" value="{{ choice }}" type="radio" class="form-check-input">
                <label for="type-a">{{ choice }}</label>
            </div>
        </div>
        
        <input type="text" v-if="question.type == 'B'" class="form-control">

        <div type="number" v-if="question.type == 'C'">
            <label for="type-c-1">1</label>
            <input id="type-c-1" name="type-c-1" type="radio" class="form-check-input">

            <label for="type-c-2">2</label>
            <input id="type-c-2" name="type-c-2" type="radio" class="form-check-input">

            <label for="type-c-3">3</label>
            <input id="type-c-3" name="type-c-3" type="radio" class="form-check-input">

            <label for="type-c-4">4</label>
            <input id="type-c-4" name="type-c-4" type="radio" class="form-check-input">

            <label for="type-c-5">5</label>
            <input id="type-c-5" name="type-c-5" type="radio" class="form-check-input">
        </div>


  </template>
  
  <script>
  export default {
    name: "Question",
    props: ['question'],
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
        font-size: 1.4rem;
    }
</style>