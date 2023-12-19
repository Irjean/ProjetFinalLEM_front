import { defineStore } from 'pinia'

export const useAnswerStore = defineStore('answer', {
  state: () => {
    return {
        answers : [],
        formAnswers: [],
        isFetched: false,
        allAnswered: false,
    }
  },
  actions: {
    addAnswer(question_id, answer) {
      this.formAnswers[question_id] = {
        question_id,
        answer,
      }
    },
    checkFormAnswer(){
      this.formAnswers.length < 21 ? this.allAnswered = false : this.allAnswered = true;
    }
  },
})