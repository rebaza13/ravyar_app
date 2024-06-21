<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="flex justify-center items-start md:p-8">
        <div class="w-full bg-white md:p-8">
          <h2 class="text-xl md:text-2xl font-bold text-primary-dark mb-4">Request List</h2>
          <div v-if="userRequests" class="flex flex-col gap-4">
            <div v-for="(user, index) in userRequests" :key="user.id" class="p-4 md:p-6 mb-4 md:mb-6 bg-gray-100 rounded-lg shadow-md">
              <div class="flex items-center justify-between">
                <!-- Avatar or Icon -->
                <div class="w-12 h-12 md:w-16 md:h-16 bg-primary-light rounded-full flex items-center justify-center">
                  <!-- Placeholder for icon or avatar -->
                  <!-- Replace with actual icon or avatar -->
                  <!-- <ion-icon name="person-circle-outline" class="text-2xl md:text-3xl text-blue-500"></ion-icon> -->
                </div>

                <!-- User Information Table -->
                <table class="table-auto ml-4 md:ml-8">
                  <tbody>
                    <tr>
                      <td class="text-gray-800 font-medium text-base pr-4 md:pr-8">Name:</td>
                      <td class="text-gray-800 font-medium text-base"><span class="font-normal">{{ user.user.name }}</span></td>
                    </tr>
                    <tr>
                      <td class="text-gray-800 font-medium text-base pr-4 md:pr-8">Type:</td>
                      <td class="text-gray-800 font-medium text-base"><span class="font-normal">{{ user.user.type }}</span></td>
                    </tr>
                    <tr>
                      <td class="text-gray-800 font-medium text-base pr-4 md:pr-8">Age:</td>
                      <td class="text-gray-800 font-medium text-base"><span class="font-normal">{{ user.user.age }}</span></td>
                    </tr>
                    <tr>
                      <td class="text-gray-800 font-medium text-base pr-4 md:pr-8">Weight:</td>
                      <td class="text-gray-800 font-medium text-base"><span class="font-normal">{{ user.user.weight }}</span></td>
                    </tr>
                    <tr>
                      <td class="text-gray-800 font-medium text-base pr-4 md:pr-8">Height:</td>
                      <td class="text-gray-800 font-medium text-base"><span class="font-normal">{{ user.user.height }}</span></td>
                    </tr>
                  </tbody>
                </table>

                <!-- Respond Button -->
                <div class="bg-green-400 rounded-lg px-3 py-1 md:px-4 md:py-2 cursor-pointer hover:bg-green-500 text-xs md:text-sm">
                  Respond
                </div>
              </div>

              <!-- Response Form -->
              <div v-if="responseForms[index]" class="mt-4 p-4 flex flex-col items-center lg:flex-row gap-4 lg:justify-between border rounded-lg bg-white shadow-sm">
                <img :src="user.user.image" class="lg:w-1/4 w-full max-h-40 rounded-lg" alt="User Image">
                <div class="flex-col w-full">
                  <div v-for="(response, idx) in responseForms[index]" :key="idx" class="mb-4">
                    <ion-input v-model="response.title" placeholder="Title" class="mb-2 p-2 border rounded-lg w-full text-sm md:text-base"></ion-input>
                    <ion-textarea v-model="response.description" placeholder="Description" class="mb-2 p-2 border rounded-lg w-full text-sm md:text-base"></ion-textarea>
                    <ion-input v-model="response.link" placeholder="Link" class="p-2 border rounded-lg w-full text-sm md:text-base"></ion-input>
                  </div>
                  <div class="flex flex-col md:flex-row justify-between mt-4 gap-2">
                    <div class="flex gap-3 justify-center">
                      <ion-button color="success" @click="addResponseForm(index)" expand="block" class="bg-secondary text-white rounded-lg px-3 py-1 md:px-4 md:py-2 hover:bg-secondary-dark text-xs md:text-sm">
                        Add More Days
                      </ion-button>
                      <ion-button color="danger" @click="removeResponseForm(index)" expand="block" class="bg-secondary text-white rounded-lg px-3 py-1 md:px-4 md:py-2 hover:bg-secondary-dark text-xs md:text-sm">
                        Remove
                      </ion-button>
                    </div>
                    <ion-button color="success" @click="submitResponse(index, user.user.id, user.id)" expand="block" class=" text-white rounded-lg px-3 py-1 md:px-4 md:py-2 hover:bg-green-500 text-xs md:text-sm">
                      Submit
                    </ion-button>
                  </div>
                </div>
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
import { useRouter } from 'vue-router';
import { getDocument, setDocumentWithRandomId, updateDocument } from '@/firebase/FirebaseMethods';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { IonPage, IonContent, IonButton, IonInput, IonTextarea } from '@ionic/vue';
import { useMainStore } from '@/stores/MainStore';

const router = useRouter()
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


// Function to add more response fields
const addResponseForm = (index: number) => {
  responseForms.value[index].push({ title: '', description: '', link: '' });
};
const removeResponseForm = (index: number) => {
  responseForms.value[index].pop();
};

// Function to submit the response
const submitResponse = async (index: number, userId: string,docId:string) => {
  try {
    const responses = responseForms.value[index];
    await setDocumentWithRandomId('responses', { responses, coachId: mainStore.user.uid, id: userId });
    await updateDocument('requests',docId, {sent:true})
    alert('Response submitted successfully');
    router.replace({name:'home'})
  } catch (error) {
    console.error('Error submitting response:', error);
    alert('Error submitting response');
  }
};
</script>

<style>
/* No additional styles */
</style>
