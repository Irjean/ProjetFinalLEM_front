<template>
    <form>
      <h2>{{ question.title }}</h2>
      <p v-if="question.type === 'A'" v-for="option in question.options" :key="option">
        <input type="radio" :name="question.title" :value="option" v-model="selectedOption" />
        {{ option }}
      </p>
    </form>
  </template>
  
  <script>
  export default {
    props: ['question'],
    data() {
      return {
        selectedOption: null,
      };
    },
  };
  </script>