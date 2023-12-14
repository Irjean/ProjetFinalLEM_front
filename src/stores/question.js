import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', {
  state: () => {
    return {
        questions : [],
        isFetched: false
    }
  },
  actions: {
    addAnswer(question_id, answer) {
      this.question[question_id] = {
        question_id,
        answer,
      }
    },
  },
})