<template>
  <IonPage>
    <IonContent>
      <div class="max-w-7xl mx-auto pt-10 bg-white sm:px-6 lg:px-8">
        <div v-if="route.fullPath === '/'" class="px-4 sm:px-0">
          <h1 class="text-3xl font-bold text-primary-dark">
            Welcome to Diet Coach
          </h1>
          <p class="mt-4 text-lg text-gray-700">
            Your personalized diet planning assistant.
          </p>
        </div>
        <!-- <RouterView /> -->

        <div class="min-h-screen flex flex-col gap-5 items-center justify-start">
          <div class="w-[370px] h-[200px] shadow-lg z-[1] mx-2 rounded-lg" v-if="route.fullPath === '/home'">
            <swiper :autoplay="true"space-between="30"  class="bg-red flex items-center justify-center">
              <swiper-slide
                class="relative"
                v-for="advice in advices"
                :key="advice.id"
              >
                <div
                  class="bg-gradient-to-r from-green-400 to-blue-500 h-[200px] rounded-lg flex-grow p-6 text-white"
                >
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold">{{ advice.title }}</h3>
                
                  </div>
                  <p class="text-sm">
                 
                  {{ advice.description }}
                  </p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
         
          <div class="grid grid-cols-2 gap-4">
            <!-- Square Button -->

            <button v-if="mainStore.user && mainStore.user.role === 'user'" @click="router.push({ name: 'courses' })"
              class="relative w-36 h-36 bg-green-600 rounded-lg overflow-hidden hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" width="1em" height="1em"
                  viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0M4.911 7.089h11.456a2.197 2.197 0 0 1 2.165 2.19v5.863a2.213 2.213 0 0 1-2.177 2.178H8.04c-1.174 0-2.04-.99-2.04-2.178v-4.639L4.503 7.905c-.31-.42-.05-.816.408-.816m3.415 2.19c-.347 0-.68.21-.68.544s.333.544.68.544h7.905c.346 0 .68-.21.68-.544s-.334-.545-.68-.545zm0 2.177c-.347 0-.68.21-.68.544s.333.544.68.544h7.905c.346 0 .68-.21.68-.544s-.334-.544-.68-.544zm-.013 2.19c-.346 0-.68.21-.68.544s.334.544.68.544h5.728c.347 0 .68-.21.68-.544s-.333-.545-.68-.545z" />
                </svg>
              </div>
            </button>
            <button v-if="mainStore.user && mainStore.user.role === 'user'" @click="router.push({ name: 'user-info2' })"
              class="relative w-36 h-36 bg-green-600 rounded-lg overflow-hidden hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" width="1em" height="1em"
                  viewBox="0 0 48 48">
                  <g fill="currentColor">
                    <path d="M17 31v-2h2v2z" />
                    <path fill-rule="evenodd"
                      d="M20 4a3 3 0 0 0-3 3h-4a3 3 0 0 0-3 3v31a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V10a3 3 0 0 0-3-3h-4a3 3 0 0 0-3-3zm-1 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1zm-3 13a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2zm-1-4a1 1 0 0 1 1-1h15.5a1 1 0 1 1 0 2H16a1 1 0 0 1-1-1m0 12a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm13 4a3 3 0 1 0 0-6a3 3 0 1 0 0 6m-6 4.5c0-2.116 3.997-3.182 6-3.182s6 1.066 6 3.182V39H22z"
                      clip-rule="evenodd" />
                  </g>
                </svg>
              </div>
            </button>

            <button v-if="mainStore.user && mainStore.user.role === 'coach'" @click="router.push({ name: 'response' })"
              class="relative w-36 h-36 bg-green-600 rounded-lg overflow-hidden hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10 9V5l-7 7l7 7v-4.1c5 0 8.5 1.6 11 5.1c-1-5-4-10-11-11" />
                </svg>
              </div>
            </button>
            <button v-if="mainStore.user && mainStore.user.role === 'coach'"
              class="relative w-36 h-36 bg-blue-600 rounded-lg overflow-hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">

              <div class="absolute inset-0 flex items-center justify-center">
                <div class="flex flex-col text-white items-center justify-center">
                  <div>suggest pre course Soon</div>
                  <svg class="w-6 h-6 text-white opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </button>
            <button v-if="mainStore.user && mainStore.user.role === 'coach'" @click="router.push({ name: 'deleter' })"
              class="relative w-36 h-36 bg-red-600 rounded-lg overflow-hidden  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" />
                </svg>
              </div>
            </button>


            <button v-if="mainStore.user && mainStore.user.role === 'user'" @click="router.push({ name: 'request' })"
              class="col-span-2 relative h-36 bg-green-600 rounded-lg overflow-hidden hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </button>

            <button @click="router.push({ name: 'add-coach' })" v-if="mainStore.user && mainStore.user.role === 'admin'"
              class="relative w-36 h-36 bg-green-600 rounded-lg overflow-hidden hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="h-16 w-16 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                  viewBox="0 0 24 24">
                  <g fill="none">
                    <path
                      d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="currentColor"
                      d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10" />
                  </g>
                </svg>
              </div>
            </button>
          </div>
          <div class="flex justify-center mb-20  items-start md:p-8">
              <div class="w-full ">
                <h2 class="text-xl md:text-2xl font-bold text-primary-dark ml-6 mb-4"> Food's detail</h2>
                <Swiper :slides-per-view="3" :space-between="10" class="flex w-[400px] gap-4">
                  <swiper-slide v-for="(food, index) in foods" :key="food.name" class="diet-card w-[50px]  bg-gray-100 rounded-lg">
                    <img :src="food.image" alt="food.name" class="w-full h-32 object-cover rounded-t-lg">
                    <div class="px-4 h-[150px]">
                      <h3 class="text-lg font-semibold text-gray-800">{{ food.name }}</h3>
                      <p class="text-xs text-gray-600">Protein: {{ food.protein }}g</p>
                      <p class="text-xs text-gray-600">Carbs: {{ food.carbs }}g</p>

                      <p class="text-xs text-gray-600">Calories: {{ food.calories }} kcal</p>
                    </div>
                  </swiper-slide>
                </Swiper>
              </div>
            </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { useRouter, useRoute } from "vue-router";
// Import Swiper styles
import "swiper/css";
import { getCollection } from "@/firebase/FirebaseMethods";
import { onMounted, ref } from "vue";
import { useMainStore } from "@/stores/MainStore";
import { IonContent, IonPage } from "@ionic/vue";
const advices = ref<any[]>([]); // Array to hold the list of advices

// Fetch advices from Firebase on component mount
onMounted(async () => {
  try {
    const adviceList = await getCollection("advices"); // Assuming 'advices' is the collection name in Firestore
    advices.value = adviceList;
  } catch (error) {
    console.error("Error fetching advices:", error);
    // Handle error (e.g., show error message to user)
  }
});

const router = useRouter();
const mainStore = useMainStore();
const route = useRoute();
const foods = [
  {
    name: "Egg",
    protein: 10,
    carbs: 1,
    fats: 7,
    calories: 80,
    image: "/images/egg.jpg", },
  {
    name: "Chicken",
    protein: 30,
    carbs: 0,
    fats: 4,
    calories: 165,
    image: "/images/chicken.jpg", },
  {
    name: "Broccoli",
    protein: 3,
    carbs: 7,
    fats: 0.4,
    calories: 34,
    image: "/images/brocoli.jpg",},
  {
    name: "Salmon",
    protein: 25,
    carbs: 0,
    fats: 13,
    calories: 206,
    image: "/images/salmon.jpg",
  },
  {
  name: "Avocado",
  protein: 2,
  carbs: 9,
  fats: 15,
  calories: 160,
  image: "/images/avocado.jpg",},
{
  name: "Almonds",
  protein: 21,
  carbs: 22,
  fats: 49,
  calories: 576,
  image: "/images/almond.jpg",},
{
  name: "Sweet Potato",
  protein: 2,
  carbs: 20,
  fats: 0.1,
  calories: 86,
  image: "/images/sweets.jpg",}

]

</script>
