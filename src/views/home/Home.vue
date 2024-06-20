<template>
  <ion-page>
    <!-- Header -->
    <ion-header class="bg-green-500">
      <ion-toolbar color="bg-red-500">
        <ion-buttons slot="start">
        
          <div v-if="route.fullPath !='/home'" class="cursor-pointer" @click="router.go(-1)">
            <svg class="text-white w-6 h-6 " xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
		<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292" />
	</svg>
          </div>
        </ion-buttons>
        <ion-title><p class="text-white text-xl font-semibold">Diet Coach</p></ion-title>
        <!-- <ion-buttons slot="end">
          <ion-button @click="handleNotifications">
            <ion-icon :icon="notificationsOutline" />
          </ion-button>
     
          <ion-button v-if="mainStore.user && mainStore.user.role === 'user'" :routerLink="{ name: 'request' }" class="text-white">
            Request
          </ion-button>
          <ion-button v-if="mainStore.user && mainStore.user.role === 'coach'" :routerLink="{ name: 'response' }" class="text-white">
            Response
          </ion-button>
          <ion-button v-if="mainStore.user && mainStore.user.role === 'admin'" :routerLink="{ name: 'user-management' }" class="text-white">
            User Management
          </ion-button>
          <ion-button v-if="mainStore.user && mainStore.user.role === 'admin'" :routerLink="{ name: 'add-coach' }" class="text-white">
            Add Coach
          </ion-button>
          <ion-button class="text-white">
            Courses
          </ion-button>
          <ion-button @click="handleLogout" class="text-white">
            Logout
          </ion-button>
        </ion-buttons> -->
        <ion-buttons slot="end">
        
          <ion-button  @click="handleLogout" class="text-white">
            Logout
          </ion-button>
      </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Content -->
    <ion-content class="ion-padding bg-neutral-light">
      <div class="max-w-7xl mx-auto  sm:px-6 lg:px-8">
        <div v-if="route.fullPath === '/'" class="px-4  sm:px-0">
          <h1 class="text-3xl font-bold text-primary-dark">Welcome to Diet Coach</h1>
          <p class="mt-4 text-lg text-gray-700">Your personalized diet planning assistant.</p>
        </div>
        <!-- <RouterView /> -->
      
       <IonRouterOutlet></IonRouterOutlet>
      </div>
    </ion-content>
    <footer class="fixed bottom-0 left-0 right-0 bg-green-500 flex justify-between items-center py-4 px-6">
  <button
    
    @click="router.push('/home')"
    class="text-white focus:outline-none "
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="min-w-10 min-h-10"  :class="{ 'text-green-700': route.fullPath === '/home' }" viewBox="0 0 24 24"> <path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
    </svg>

  </button>

  <button
   
    @click="router.push({name:'profile'})"
    class="text-white focus:outline-none "
  >
    <svg  :class="{ 'text-green-700': route.fullPath === '/home/profile' }" xmlns="http://www.w3.org/2000/svg" class="min-w-10 min-h-10" viewBox="0 0 24 24"> <path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076A9.959 9.959 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.958 9.958 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22a9.947 9.947 0 0 0 5.675-1.765a10.055 10.055 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clip-rule="evenodd" />
    </svg>
  </button>

	


</footer>


  </ion-page>
</template>

<script setup >
import { IonRouterOutlet } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonButtons,IonTitle, IonButton,  IonContent } from '@ionic/vue';
// import { notificationsOutline } from 'ionicons/icons';
// import { useMainStore } from '@/stores/MainStore';
import { getAuth, signOut } from "firebase/auth";

// Import Swiper styles
import 'swiper/css';



const route = useRoute();
const router = useRouter();
// const mainStore = useMainStore();

// const handleNotifications = () => {
//   // Implement your notifications logic here
//   console.log('Handling notifications...');
// };

const handleLogout = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    router.replace({ name: 'login' });
  }).catch((error) => {
    console.log(error);
    // Handle error
  });
};

</script>

<style scoped>
ion-toolbar {
  --background: #3880ff;
  --color: #ffffff;
}

ion-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.text-primary-dark {
  color: #333;
}
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.active {
  background-color: #ffffff; /* White background color for active button */
}

svg {
  width: 24px;
  height: 24px;
}
.text-gray-700 {
  color: #777;
}
</style>
