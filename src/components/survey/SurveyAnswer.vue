<template>
  <div class="form-answer">
    <div>
        <span class="title-number"> {{ index + 1 }}/{{ questionCount }}</span>
        <h3>{{ question.content }}</h3>
    </div>
    <div class="answer-content">
      <p>{{ answer.content }}</p>
    </div>

  </div>
</template>

<script setup>
const props = defineProps(["index", "question", "answer", "questionCount"]);
</script>

<style scoped>
h3 {
  font-size: 1.2rem;
  margin-bottom: 1.3rem;
}

.form-answer {
  margin: 3rem 0;
}

.answer-content{
  width: fit-content;
  background-color: white;
  padding: 5px 10px;
  border-radius: 15px;
}

.title-number{
  color: var(--gray-color);
  font-weight: 600;
}


/* Desktop */
@media (min-width: 1024px) {
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.3rem;
  }

  .form-answer {
    margin-bottom: 3rem;
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

  .form-answer {
    margin-bottom: 2.5rem;
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
  .form-answer {
    margin-bottom: 2rem;
  }

  .title-number{
    /* font-size: 1rem; */
    font-weight: 600;
  }
}
</style>