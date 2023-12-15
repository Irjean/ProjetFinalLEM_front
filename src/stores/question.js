import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', {
  state: () => {
    return {
        questions : [],
        isFetched: false
    }
  }
})