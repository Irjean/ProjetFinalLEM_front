<template>
    <div>
      <h2>{{ question.title }}</h2>
      <textarea v-model="textAnswer" :maxlength="question.maxLength"></textarea>
    </div>
  </template>
  
  <script>
  export default {
    props: ['question'],
    data() {
      return {
        textAnswer: '',
      };
    },
  };
  </script>