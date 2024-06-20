<template>
  <ion-page class="update-profile pt-6 pb-20">
    <ion-content class="ion-padding">
      <div class="update-profile-container">
        <h2 class="update-profile-title">your personal detail</h2>
        <form @submit.prevent="submitForm">
          <ion-item class="ion-margin-bottom ">
         <div class="flex flex-col gap-5">   <ion-label position="floating">Age</ion-label>
          <ion-input id="age" type="number" v-model="age"></ion-input></div>
          </ion-item>
          <ion-item class="ion-margin-bottom">
            <div class="flex flex-col gap-5">
            <ion-label position="floating">Gender</ion-label>
            <ion-select id="gender" v-model="gender" interface="popover">
              <ion-select-option value="male">Male</ion-select-option>
              <ion-select-option value="female">Female</ion-select-option>
            </ion-select>
          </div>
          </ion-item>

          <ion-item class="ion-margin-bottom">
            <div class="flex flex-col gap-5">
            <ion-label position="floating">Weight (kg)</ion-label>
            <ion-input id="weight" type="number" v-model="weight"></ion-input>
           </div>
          </ion-item>
          <ion-item class="ion-margin-bottom">
            <div class="flex flex-col gap-5">
            <ion-label position="floating">Height (cm)</ion-label>
            <ion-input id="height" type="number" v-model="height"></ion-input>
           </div>
          </ion-item>
          <ion-item class="ion-margin-bottom">
            <div class="flex flex-col gap-5">
            <ion-label position="floating">Body Type</ion-label>
            <ion-select id="bodyType" v-model="bodyType" interface="popover">
              <ion-select-option value="slim">Slim</ion-select-option>
              <ion-select-option value="average">Average</ion-select-option>
              <ion-select-option value="athletic">Athletic</ion-select-option>
              <ion-select-option value="curvy">Curvy</ion-select-option>
            </ion-select>
            </div>
          </ion-item>
          <ion-button type="submit" expand="block" class="ion-margin-top" color="success">
            Submit
          </ion-button>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>



<script setup>
import { ref } from 'vue';
import { useMainStore } from '@/stores/MainStore';
import { updateDocument } from '@/firebase/FirebaseMethods';
import { useRouter } from 'vue-router';
import { IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption } from '@ionic/vue';

const age = ref('');
const gender = ref('');
const weight = ref('');
const height = ref('');
const bodyType = ref(''); // Added for body type select
const router = useRouter();

const submitForm = async () => {
  try {
    const userStore = useMainStore();
    const userId = userStore.user?.uid;
    if (userId) {
      await updateDocument('users', userId, {
        age: age.value,
        gender: gender.value,
        weight: weight.value,
        height: height.value,
        type: bodyType.value
      });
      alert('Profile updated successfully');
      router.push({ name: 'home' });
      console.log('Profile updated successfully');
    }
  } catch (error) {
    alert(error.message);
    console.error('Error updating profile:', error);
  }
};
</script>

<style scoped>
/* Add global styles for the update-profile class (optional) */
.update-profile-container {
  padding: var(--ion-padding-horizontal) var(--ion-padding-vertical);
}

.update-profile-title {
  margin-bottom: 20px;
}

/* Reset ion-item padding and margin */
.ion-item {
  --padding-start: var(--ion-padding-horizontal);
  --padding-end: var(--ion-padding-horizontal);
  --inner-padding-end: var(--ion-padding-horizontal);
  --inner-padding-start: var(--ion-padding-horizontal);
  --min-height: auto;
  --margin-bottom: var(--ion-margin-bottom);
  margin-bottom: var(--ion-margin-bottom);
}

/* Adjust ion-label positioning */
.ion-label {
  margin-bottom: 8px; /* Adjust as needed */
}

/* Override primary button color to green */
.ion-button.ion-color-success {
  --ion-color-base: #4caf50; /* Green color */
  --ion-color-base-rgb: 76, 175, 80; /* Green color RGB values */
}
</style>

