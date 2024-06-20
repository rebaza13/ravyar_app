import { defineStore } from "pinia";
import {  ref } from "vue";
export const useMainStore = defineStore('mainStore',()=>{
    // @ts-ignore
    // const user = ref(JSON.parse(window.localStorage.getItem("#user")))
    const userString = window.localStorage.getItem('#user');
    const user = ref(userString ? JSON.parse(userString) : {
        role: '',
        name:'',
        email:'',
        photo:'',
        uid: ''  
      });

    

        return {user}
})