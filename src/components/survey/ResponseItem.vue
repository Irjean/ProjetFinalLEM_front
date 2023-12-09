<template>
    <div class="response-item">
      <span>{{ question }}:</span>
      <span>{{ answer }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      question: String,
      answer: String,
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>