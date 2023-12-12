import { defineStore } from 'pinia'

export const useAnswerStore = defineStore('answer', {
  state: () => {
    return {
        answers : []
    }
  },
  actions: {
    addAnswer(question_id, answer) {
      this.answers[question_id] = {
        question_id,
        answer,
      }
    },
  },
})