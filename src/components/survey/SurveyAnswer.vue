<template>
    <div class="form-answer">
      <div>
          <span class="title-number"> {{ index + 1 }}/{{ questionCount }}</span>
          <h3>{{ question.content }}</h3>
      </div>
      <div class="answer-content">
        <p>{{ answer }}</p>
      </div>

    </div>
  </template>
  
  <script>
  export default {
    props: {
      question: String,
      answer: String,
      index: Number,
      questionCount: Number,
    },
  };
  </script>
  
  <style scoped>

  </style>