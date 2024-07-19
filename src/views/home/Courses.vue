<template>
  
  <ion-page>

    <!-- Content -->
    <ion-content class="ion-padding">
      
  <div class="max-w-md mx-auto bg-slate-100 rounded-xl overflow-hidden shadow-lg">
    <div class="p-6">
      <div class="relative">
        <!-- Coming Soon Badge -->
        <div class="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-tr-lg rounded-bl-lg text-xs font-semibold">
          Coming Soon
        </div>

        <!-- Card Title -->
        <h2 class="text-xl font-bold text-gray-800 mb-4">Your Progress This Week</h2>

        <!-- Progress Bar -->
        <div class="flex flex-col h-40 w-12 bg-gray-200 rounded-full overflow-hidden">
          <!-- Monday to Sunday progress -->
          <div class="flex-1 bg-gray-200"></div>
          <div class="flex-1 bg-gray-200"></div>
          <div class="flex-1 bg-gray-200"></div>
          <div class="flex-1 bg-gray-200"></div>
          <div class="flex-1 bg-gray-200"></div>
          <div class="flex-1 bg-gray-200"></div>
          <div class="flex-1 bg-gradient-to-b from-green-400 to-blue-500"></div>
        </div>

        <!-- Progress Labels -->
        <div class="flex justify-between mt-4">
          <span class="text-xs font-semibold text-gray-600">0%</span>
          <span class="text-xs font-semibold text-gray-600">100%</span>
        </div>
        
        <!-- Days of the Week Labels -->
        <div class="flex justify-between mt-2 text-xs text-gray-500">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  </div>

      <div class="max-w-7xl mx-auto pt-6 pb-20 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-primary-dark mb-4">My Courses</h2>
        <div v-if="mixed" class="flex flex-col gap-5">
          <div v-for="(item, index) in mixed" :key="index">
            <!-- User Info -->
            <div class="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
              <div class="min-w-12 min-h-12 overflow-hidden bg-gray-100 rounded-full flex items-center justify-center">
                <!-- You can add user avatar or initials here -->
                 <img class="w-12 h-12 object-cover" :src="item.users.image" alt="">
              </div>
              <div class="ml-4 w-full text-gray-700 flex justify-between items-center font-semibold">
             <p> Coach name:</p>
             <p> {{ item.users.name }}</p>
              </div>
            </div>

            <!-- Courses Section -->
            <section class="bg-gradient-to-t  mt-4">

              <div v-for="course,i in item.responses" :key="course.id" class="flex flex-col items-center space-y-4 bg-gradient-to-tr from-emerald-400 to-green-300  mt-10  rounded-lg p-6 bg-white shadow-md hover:shadow-xl">
                <h2 class="text-xl  font-bold text-white mb-6 text-center">Course - Day {{ index + 1}}</h2>
                <div class="flex items-center space-x-4 mb-4">
                  <svg class="text-slate-600 h-10 w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5.5 2H17a2.5 2.5 0 0 1 2.5 2.5v6.813a6.5 6.5 0 0 0-8.187 8.187H4.5a1 1 0 0 0 1 1h6.232A6.5 6.5 0 0 0 12.81 22H5.5A2.5 2.5 0 0 1 3 19.5v-15A2.5 2.5 0 0 1 5.5 2M7 5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm16 12.5a5.5 5.5 0 1 0-11 0a5.5 5.5 0 0 0 11 0m-6.086-2.403l2.806 1.84q.131.084.205.223q.075.136.075.298a.65.65 0 0 1-.072.298a.6.6 0 0 1-.198.226l-2.807 1.915a.6.6 0 0 1-.158.077a.55.55 0 0 1-.395-.023a.7.7 0 0 1-.193-.135a.7.7 0 0 1-.13-.2a.6.6 0 0 1-.047-.237v-3.758a.62.62 0 0 1 .367-.57a.55.55 0 0 1 .547.045" />
                  </svg>
                  <h3 class="text-xl font-bold text-emerald-700">{{ course.title }}</h3>
                </div>
                <p class="text-gray-600 text-lg">{{ course.description }}</p>
                <div class="flex items-center space-x-2">
                  <span class="inline-flex items-center px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">Level: {{ course.level }}</span>
                  <a :href="course.link" target="_blank" class="text-emerald-500 underline hover:text-emerald-700">View Course</a>
                </div>
              </div>
            </section>
            
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getDocumentsByQuery, getSingleDocumentByQuery } from '@/firebase/FirebaseMethods'; // Assuming you have a method to fetch data from Firebase
import { IonPage,IonContent } from '@ionic/vue';
import { useMainStore } from '@/stores/MainStore';
let indexcourse = 0
const coursesDetail = ref([]);
const coursesCoach = ref([]);
const coachIds = ref([]);
const mainStore = useMainStore();
const mixed = ref([]);
const handleDay = (i)=>{

  
}
onMounted(async () => {
  const mix = [];
  const course = [];
  const coaches = [];

  const getCourses = await getDocumentsByQuery('responses', 'id', mainStore.user.uid);
  
  getCourses.forEach(async (o) => {
    if (o) {
      coachIds.value.push(o.coachId);
      const responses = o.responses;
      course.push({ responses, coachId: o.coachId });
      const users = await getSingleDocumentByQuery('users', 'id', o.coachId);
      coaches.push(users);
      mix.push({ responses, coachId: o.coachId, users });
    }
  });

  setTimeout(() => {
    coursesCoach.value = course;
    coursesDetail.value = coaches;
    mixed.value = mix;
  }, 2000);
});

</script>

<style scoped>
/* Add any additional styles here */
</style>
