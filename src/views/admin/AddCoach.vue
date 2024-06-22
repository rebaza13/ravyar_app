<template>
  <ion-page class="update-profile">
    <ion-content class="ion-padding bg-slate-400">
      <div class="ion-text-center">
        <img src="/images/undraw_secure_login_pdn4.png" alt="Register" class="mx-auto w-1/4 mb-8 scale-90">
        <h2 class="ion-text-primary text-xl font-bold mb-4">Register a Coach</h2>
        <form @submit.prevent="register" class="ion-margin-vertical">
          <ion-item class="ion-margin-bottom">
            <ion-label position="floating">coach full name</ion-label>
            <ion-input id="name" type="text" v-model="name"></ion-input>
          </ion-item>
          <ion-item class="ion-margin-bottom">
            <ion-label position="floating">Email Address</ion-label>
            <ion-input id="email" type="email" v-model="email" class="block w-full"></ion-input>
          </ion-item>
          <ion-item class="ion-margin-bottom">
            <ion-label position="floating">Description</ion-label>
            <ion-input id="password" type="text" v-model="description"></ion-input>
          </ion-item>
          <ion-item class="ion-margin-bottom">
            <ion-label position="floating">Password</ion-label>
            <ion-input id="password" type="password" v-model="password"></ion-input>
          </ion-item>
          <ion-item class="ion-margin-bottom">
            <ion-label position="floating">Price</ion-label>
            <ion-input id="t" type="text" v-model="price"></ion-input>
          </ion-item>
          <ion-button expand="block" type="submit" color="success">
            Register
          </ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { registerUser, addUserToFirestore } from '@/firebase/FirebaseMethods';
import { useMainStore } from "@/stores/MainStore"
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/vue';

const name = ref('');
const email = ref('');
const description = ref('');
const password = ref('');
const mainStore = useMainStore();
const router = useRouter();
const price = ref()

const register = async () => {
  try {
    const userCredential = await registerUser(email.value, password.value);
    await addUserToFirestore(userCredential.uid, { email: email.value,price:price.value,description:description.value, id: userCredential.uid, name: name.value, role: 'coach' });
    mainStore.user = userCredential;
    console.log('Registration successful');
    router.push({ name: 'user-management' });
  } catch (error: any) {
    alert(error.message);
    console.error('Error during registration:', error.message);
  }
};
</script>

<style scoped>
/* No additional styles needed */
</style>
