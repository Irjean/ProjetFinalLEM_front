<template>
    <div>
      <h2>{{ question.title }}</h2>
      <input type="number" v-model="numericAnswer" :max="question.max" :min="question.min" />
    </div>
  </template>
  
  <script>
  export default {
    props: ['question'],
    data() {
      return {
        numericAnswer: null,
      };
    },
  };
  </script>