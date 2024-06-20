<template>
  <ion-page>
    <ion-content class="ion-padding ">
      <div class="register-container  bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <img src="/images/undraw_secure_login_pdn4.png" alt="Register" class="register-image mx-auto mb-6">
        <h2 class="register-title text-2xl font-bold mb-6">Create an Account</h2>
        <form @submit.prevent="register">
          <ion-item class="ion-margin-bottom">
            <ion-label position="stacked">Your Full Name</ion-label>
            <ion-input id="name" type="text" v-model="name" class="block w-full"></ion-input>
        </ion-item>
          <ion-item class="ion-margin-bottom">
            <ion-label position="stacked">Email Address</ion-label>
            <ion-input id="email" type="email" v-model="email" class="block w-full"></ion-input>
          </ion-item>
          <ion-item class="ion-margin-bottom">
            <ion-label position="stacked">Password</ion-label>
            <ion-input id="password" type="password" v-model="password" class="block w-full"></ion-input>
          </ion-item>
          <ion-button color="success" type="submit" expand="block" class="ion-margin-bottom">Register</ion-button>
          <router-link to="/login" class="login-link text-primary block text-center mt-2">Already have an account? Login</router-link>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { registerUser, addUserToFirestore, getCollection } from '@/firebase/FirebaseMethods';
import { useMainStore } from "@/stores/MainStore.ts";
import { useRouter } from 'vue-router';
import { auth } from "@/firebase/firebase";
import { updateProfile } from 'firebase/auth';
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/vue';

const name = ref('');
const email = ref('');
const password = ref('');
const mainStore = useMainStore();
const router = useRouter();

const register = async () => {
  try {
    const userCredential = await registerUser(email.value, password.value);
    await addUserToFirestore(userCredential.uid, { email: email.value, id: userCredential.uid, name: name.value, role: 'user' });

    let selectedRole;
    const collectUser = await getCollection('users');
    collectUser.forEach((object) => {
      if (object.id === userCredential.uid) {
        selectedRole = object.role;
      }
    });

    mainStore.user = {
      role: selectedRole,
      name: userCredential.displayName,
      email: userCredential.email,
      photo: userCredential.photoURL,
      uid: userCredential.uid
    };

    console.log(mainStore.user, 'here and there');
    window.localStorage.setItem('#user', JSON.stringify(mainStore.user));
    console.log('Registration successful');
    // Redirect to dashboard or home page upon successful registration
    updateProfile(auth.currentUser, {
      displayName: name.value
    }).then(() => {
      mainStore.user.displayName = name.value;
      console.log(mainStore.user, 'here and there');
      window.localStorage.setItem('#user', JSON.stringify(mainStore.user));
    }).catch((error) => {
      console.log(error)
      // An error occurred
      // ...
    });

    router.push({ name: 'user-info' });
  } catch (error) {
    alert(error.message);
    console.error('Error during registration:', error);
    // Show error message to the user
  }
};
</script>

<style scoped>
/* Tailwind CSS classes are applied directly in the template */
</style>
