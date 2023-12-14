import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', {
  state: () => {
    return {
        isNavbarVisible : true
    }
  },
  actions: {
    hideNavbar() {
      this.isNavbarVisible = false;
    },
    showNavbar() {
        this.isNavbarVisible = true;
    }
  },
})