<template>
    <ion-page>
   
  
      <!-- Content -->
      <ion-content class="ion-padding ">
        <div class="flex justify-center items-start  md:p-8">
          <div class="w-full bg-white   md:p-8">
            <h2 class="text-xl md:text-2xl font-bold text-primary-dark mb-4">Reuqest List</h2>
            <div v-if="userRequests" class="flex flex-col gap-4">
              <div v-for="(user, index) in userRequests" :key="user.id" class=" rounded-lg p-4 md:p-6 mb-4 md:mb-6 shadow-md">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-primary-light rounded-full flex items-center justify-center">
                      <!-- Random icon from SVG -->
                      <!-- <ion-icon name="person-circle-outline" style="font-size: 1.5rem; md:font-size: 2rem; color: #4A90E2;"></ion-icon> -->
                    </div>
                    <div class="ml-3 md:ml-4 text-gray-800 font-medium text-sm md:text-base">{{ user.user.name }}</div>
                  </div>
                  <button  @click="handleDelete(user.id)"  class="  text-rose-500 rounded-lg px-3 py-1 md:px-4 md:py-2 hover: er text-base font-semibold md:text-sm">
                  <p class="bg-text-400">  Delete</p>
                  </button>
                </div>
                <div v-if="responseForms[index]" class="mt-4 p-4 flex flex-col items-center lg:flex-row gap-4 lg:justify-between  border rounded-lg bg-white shadow-sm">
                  <img :src="user.user.image" class="lg:w-1/4 w-full max-h-40 rounded-lg" alt="">
           
                </div>
              </div>
            </div>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { db } from '@/firebase/firebase';
  import { deleteDocument, getCollection, getDocument } from '@/firebase/FirebaseMethods';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { IonPage,IonContent } from '@ionic/vue';
  import { useMainStore } from '@/stores/MainStore';
//   import  {deleteDocumentByQuery} from "@/firebase/FirebaseMethods"


//   const userdata = ref({})
  const userRequests = ref<any>([]); // Array to hold the list of coaches
  const responseForms = ref<{ title: string; description: string; link: string }[][]>([]);
  const mainStore = useMainStore();
  const userId = ref('')
  // Fetch coaches from Firebase on component mount
  onMounted(async () => {
    const requestRef = collection(db, 'requests');
    const q = query(requestRef, where('coachId', '==', mainStore.user.uid));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      userId.value = doc.data().id
      
      responseForms.value.push([{ title: '', description: '', link: '' }]); // Initialize response forms for each user request
  
    const user = await getDocument('users',userId.value)
    // userdata.value = user
    userRequests.value.push({ id: doc.id,  user });
    });
  });
  
//   // Function to show response form for a user
//   const respondToUser = (index: number) => {
//     responseForms.value[index].push({ title: '', description: '', link: '' });
//   };
  
//   // Function to add more response fields
//   const addResponseForm = (index: number) => {
//     responseForms.value[index].push({ title: '', description: '', link: '' });
//   };
  
//   // Function to submit the response
 


const handleDelete = async (id:string)=>{
    let rId :any
    console.log('hellow')
    const document = await getCollection('requests')
    document.forEach(async (obj:any)=>{
      console.log(userId.value,"userID",id,"id from above",obj)

        if(obj.id ===userId.value){
           rId=  obj.documentId 
           await deleteDocument('requests',id)
 
     alert('request removed')

        }
    })
 
    const requestRef = collection(db, 'requests');
    const q = query(requestRef, where('coachId', '==', mainStore.user.uid));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      userId.value = doc.data().id
      
      responseForms.value.push([{ title: '', description: '', link: '' }]); // Initialize response forms for each user request
  
    const user = await getDocument('users',userId.value)
    // userdata.value = user
    userRequests.value.push({ id: doc.id,  user });
    });
}
  </script>
  
  <style>
  /* No additional styles */
  </style>
  