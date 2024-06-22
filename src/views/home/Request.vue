<template>
  <ion-page>
    <ion-content class="ion-padding bg-gray-50 z-20">
      
      <!-- popup -->
      <div v-if="pressed" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-8 bg-white rounded-lg shadow-lg w-80">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Choose Payment Method</h2>
      <div class="flex justify-between">
        <button @click="handlePay" class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
          FastPay
        </button>
        <button @click="handlePay" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          FIB
        </button>
      </div>
    </div>
  </div>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-gray-900 mb-6">
          Select a Coach
        </h2>
        <div
          v-if="coaches.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="coach in coaches"
            :key="coach.id"
            class="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div class="p-6">
       <div class="flex w-full justify-between items-center">
        <h3 class="text-xl font-bold text-gray-800">{{ coach.name }}</h3>
        <h3 class="text-xl font-bold text-gray-800">{{ coach.price?coach.price:'' }}$</h3>
       </div>

              <p class="text-gray-600">{{ coach.description }}</p>
              <div class="flex justify-between items-end">
                <div class="flex items-center p-1 gap-2">
                  <svg
                    class="w-5 h-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M391 480c-19.52 0-46.94-7.06-88-30c-49.93-28-88.55-53.85-138.21-103.38C116.91 298.77 93.61 267.79 61 208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82 73.38 58.16 62.65 74.11 52a176.3 176.3 0 0 1 28.64-15.2c1-.43 1.93-.84 2.76-1.21c4.95-2.23 12.45-5.6 21.95-2c6.34 2.38 12 7.25 20.86 16c18.17 17.92 43 57.83 52.16 77.43c6.15 13.21 10.22 21.93 10.23 31.71c0 11.45-5.76 20.28-12.75 29.81c-1.31 1.79-2.61 3.5-3.87 5.16c-7.61 10-9.28 12.89-8.18 18.05c2.23 10.37 18.86 41.24 46.19 68.51s57.31 42.85 67.72 45.07c5.38 1.15 8.33-.59 18.65-8.47c1.48-1.13 3-2.3 4.59-3.47c10.66-7.93 19.08-13.54 30.26-13.54h.06c9.73 0 18.06 4.22 31.86 11.18c18 9.08 59.11 33.59 77.14 51.78c8.77 8.84 13.66 14.48 16.05 20.81c3.6 9.53.21 17-2 22c-.37.83-.78 1.74-1.21 2.75a176.5 176.5 0 0 1-15.29 28.58c-10.63 15.9-21.4 28.21-39.38 36.58A67.4 67.4 0 0 1 391 480"
                    />
                  </svg>

                  <a
                    :href="'tel:' + coach.phone"
                    class="self-end bg-green-300 rounded-lg text-white p-1 block text-center"
                  >
                    Call {{ coach.phone }}
                  </a>
                </div>
                <div class="mt-4 flex justify-end">
                  <button
                    v-if="showResult(coach.id) === 'Select'"
                    @click="handleConfirm(coach.id)"
                    class="btn-select"
                  >
                    Select
                  </button>
                  <button
                    v-else-if="showResult(coach.id) === 'Sent'"
                    @click="cancelCoach(coach.id)"
                    class="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500">No coaches available.</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { IonContent, IonPage } from "@ionic/vue";
import { deleteDocument, getCollection } from "@/firebase/FirebaseMethods"; // Assuming you have a method to fetch coaches from Firebase
// import { useRouter } from 'vue-router';
import { useMainStore } from "@/stores/MainStore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
const coaches = ref<any>([]); // Array to hold the list of coaches
// const router = useRouter();
const mainStore = useMainStore();
const pressed = ref(false)
const selectedI =ref()
const requestList = ref<any>([]);
// Fetch coaches from Firebase on component mount
onMounted(async () => {
  console.log(mainStore.user, "why");
  const getRequest = await getCollection("requests");
  getRequest.forEach((object: any) => {
    requestList.value.push({ coachId: object.coachId, id: object.id });
  });
  const coachesData = await getCollection("users"); // Fetch coaches data from Firebase
  coaches.value = coachesData.filter((coach: any) => coach.role === "coach");
});

const showResult = (id: string) => {
  const isSent = requestList.value.some(
    (object: any) => object.coachId === id && mainStore.user.uid == object.id
  );
  console.log(isSent);
  return isSent ? "Sent" : "Select";
};
// Function to select a coach
const  handleConfirm = (coach:any)=>{
pressed.value = !pressed.value
selectedI.value = coach
}
const handlePay = async ()=>{
  pressed.value = !pressed.value
  await selectCoach(selectedI.value)
}
const selectCoach = async (coach: any) => {
  // Redirect to another page or perform action with selected coach
  const add = await addDoc(collection(db, "requests"), {
    id: mainStore.user.uid,
    email: mainStore.user.email,
    coachId: coach,
  });
  requestList.value = [];
  const getRequest = await getCollection("requests");
  getRequest.forEach((object: any) => {
    requestList.value.push({ coachId: object.coachId, id: object.id });
  });
  const coachesData = await getCollection("users"); // Fetch coaches data from Firebase
  coaches.value = coachesData.filter((coach: any) => coach.role === "coach");

};

const cancelCoach = async (coach: any) => {
  requestList.value = [];
  const requests = await getCollection("requests");
  requests.forEach(async (o: any) => {
    if (o.coachId === coach) {
      await deleteDocument("requests", o.documentId);
    }
  });
  const response = await getCollection("responses");
  response.forEach(async (o: any) => {
    console.log(o.coachId === coach, "test", o.coachId, coach);
    if (o.coachId === coach) {
      console.log(o.documentId === coach, "test");
      await deleteDocument("responses", o.documentId);
    }
  });

  const getRequest = await getCollection("requests");
  getRequest.forEach((object: any) => {
    requestList.value.push({ coachId: object.coachId, id: object.id });
  });
  const coachesData = await getCollection("users"); // Fetch coaches data from Firebase
  coaches.value = coachesData.filter((coach: any) => coach.role === "coach");
};
</script>

<style scoped>
/* Add global styles for ion-page (optional) */
ion-page {
  --ion-background-color: #ffffff; /* Set background color for ion-page */
}

/* Set primary color to green */
.btn-select {
  @apply px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75;
}

.btn-cancel {
  @apply px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75;
}
</style>
