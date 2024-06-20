<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="login-container">
        <img src="/images/undraw_secure_login_pdn4.png" alt="Logo" class="app-logo">
        <h1 class="text-3xl font-bold">Diet Coach Pro</h1>

        <IonItem class="p-4">
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput v-model="email" type="email" required></IonInput>
        </IonItem>

        <IonItem class="p-4 flex gap-2">
          <IonLabel position="stacked">Password</IonLabel>
          <IonInput v-model="password" type="password" required></IonInput>
        </IonItem>

        <div class="login-actions">
          <IonButton color="success" expand="block" @click="login">Login</IonButton>

          <div class="links">
            <span>Don't have an account? </span>
            <router-link to="/register">Register</router-link>
          </div>

      
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

<style scoped>
/* Option 1: Using CSS Padding (Recommended) */
.ion-item {
  padding: 1rem; /* Adjust padding values as needed */
}

/* Styling for login actions and reset form sections */
.login-actions,
.reset-form {
  margin-top: 1rem;
}

/* Styling for the "Don't have an account?" and "Forgot password?" links */
.links {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.links span {
  margin-right: 0.5rem;
  font-size: 0.8rem; /* Adjust font size as needed */
  color: #888; /* Adjust text color as needed */
}

/* Styling for the reset password form */
.reset-form {
  display: none; /* Initially hide the reset form */
}

.reset-form p {
  margin-bottom: 1rem;
}
</style>
