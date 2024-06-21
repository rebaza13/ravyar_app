<template>
  <IonPage>
    <IonContent class="ion-padding" color="light">
      <div class="login-container ion-text-center">
        <img src="/images/undraw_secure_login_pdn4.png" alt="Logo" class="app-logo" />
        <h1 class="ion-text-center ion-margin-vertical">Diet Coach Pro</h1>

        <div class="input-wrapper">
          <IonItem lines="none" class="ion-margin-bottom">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput v-model="email" type="email" required></IonInput>
          </IonItem>

          <IonItem lines="none" class="ion-margin-bottom">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput v-model="password" type="password" required></IonInput>
          </IonItem>
        </div>

        <IonButton color="success" expand="block" class="ion-margin-top" @click="login">Login</IonButton>

        <div class="ion-text-center ion-margin-top">
          <span>Don't have an account? </span>
          <router-link to="/register" class="router-link">Register</router-link>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/firebase/FirebaseMethods';
// import { sendPasswordResetEmail } from 'firebase/auth';
import { IonPage, IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/vue';

const email = ref('');
const password = ref('');
// const resetEmail = ref('');
// const showResetForm = ref(false);

const router = useRouter();

const login = async () => {
  try {
    await loginUser(email.value, password.value);
    // Redirect to dashboard or home page upon successful login
    router.push({ name: 'homeI' });
    console.log('Login successful');
  } catch (error: any) {
    alert(error.message);
    console.error('Error during login:', error);
  }
};

// const sendResetPasswordEmail = async () => {
//   try {
//     await sendPasswordResetEmail(resetEmail.value);
//     alert('A password reset link has been sent to your email address.');
//     showResetForm.value = false; // Hide reset form
//   } catch (error: any) {
//     alert('Error sending reset link:', error.message);
//     console.error('Error sending reset password email:', error);
//   }
// };

// const hideResetForm = () => {
//   showResetForm.value = false; // Hide reset form
// };
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 16px;
}

.app-logo {
  max-width: 150px;
  margin-bottom: 20px;
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e40af; /* Primary color */
  margin-bottom: 16px;
}

.input-wrapper {
  width: 100%;
  max-width: 400px;
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
