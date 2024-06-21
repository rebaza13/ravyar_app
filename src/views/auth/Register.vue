<template>
  <IonPage>
    <IonContent class="ion-padding" color="light">
      <div class="register-container ion-text-center">
        <img src="/images/undraw_secure_login_pdn4.png" alt="Register" class="app-logo" />
        <h2 class="ion-text-center ion-margin-vertical">Create an Account</h2>
        <form @submit.prevent="register">
          <IonItem lines="none" class="ion-margin-bottom">
            <IonLabel position="stacked">Your Full Name</IonLabel>
            <IonInput id="name" type="text" v-model="name" required></IonInput>
          </IonItem>

          <IonItem lines="none" class="ion-margin-bottom">
            <IonLabel position="stacked">Email Address</IonLabel>
            <IonInput id="email" type="email" v-model="email" required></IonInput>
          </IonItem>

          <IonItem lines="none" class="ion-margin-bottom">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput id="password" type="password" v-model="password" required></IonInput>
          </IonItem>

          <IonButton color="success" type="submit" expand="block" class="ion-margin-top">Register</IonButton>
          <router-link to="/login" class="router-link ion-margin-top">Already have an account? Login</router-link>
        </form>
      </div>
    </IonContent>
  </IonPage>
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
<style>
.register-container {
  display: flex;
  flex-direction: column;

  justify-content: center;
  height: 100%;
  padding: 16px;
}
.input-wrapper {
  width: 100%;
  max-width: 400px;
}

.app-logo {
  max-width: 150px;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e40af; /* Primary color */
  margin-bottom: 16px;
}

ion-item {
  --highlight-color-focused: #1e40af; /* Primary color */
  --highlight-color-valid: #1e40af; /* Primary color */
  --background: #f0f4f8; /* Light background color for inputs */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

ion-input {
  width: 100%;
}

ion-button {
  --background: #10b981; /* Success color */
  --border-radius: 8px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

ion-button:hover {
  --background: #0f9b71;
}

.router-link {
  color: #1e40af; /* Primary color */
  text-decoration: none;
  font-weight: bold;
}

.router-link:hover {
  text-decoration: underline;
}
</style>