<template>
    <ion-page class="update-profile pb-24 pt-6">
      <ion-content class="ion-padding">
        <div v-if="mainStore.user.role =='user'" class="update-profile-container">
          <h2 class="update-profile-title">Update Your Profile</h2>
          <ion-button color="success"  @click="toggleEditMode" expand="block" class="mb-4  text-white hover:bg-green-700">
            {{ editMode ? 'Cancel Edit' : 'Edit Profile' }}
          </ion-button>
          <form @submit.prevent="submitForm">
            <div class="flex flex-col gap-5  " >
              <ion-label position="floating" class="">Name</ion-label>
              <ion-input id="name" v-model="name" :disabled="!editMode"></ion-input>
            </div>
            <div class="flex flex-col gap-5">
              <ion-label position="floating">Age</ion-label>
              <ion-input id="age" type="number" v-model="age" :disabled="!editMode"></ion-input>
            </div>
          
            <div class="flex flex-col gap-5">
              <ion-label position="floating">Gender</ion-label>
              <ion-select id="gender" v-model="gender" :disabled="!editMode">
                <ion-select-option value="male">Male</ion-select-option>
                <ion-select-option value="female">Female</ion-select-option>
              </ion-select>
            </div>
            <div class="flex flex-col gap-5">
              <ion-label position="floating">Weight (kg)</ion-label>
              <ion-input id="weight" type="number" v-model="weight" :disabled="!editMode"></ion-input>
            </div>
            <div class="flex flex-col gap-5">
              <ion-label position="floating">Height (cm)</ion-label>
              <ion-input id="height" type="number" v-model="height" :disabled="!editMode"></ion-input>
            </div>
            <div class="flex flex-col gap-5">
              <ion-label position="floating">Body Type</ion-label>
              <ion-select id="bodyType" v-model="bodyType" :disabled="!editMode">
                <ion-select-option value="slim">Slim</ion-select-option>
                <ion-select-option value="average">Average</ion-select-option>
                <ion-select-option value="athletic">Athletic</ion-select-option>
                <ion-select-option value="curvy">Curvy</ion-select-option>
              </ion-select>
            </div>
            <ion-button @click="takePhoto" color="success" >Take Photo</ion-button>
      <ion-img v-if="photo" :src="photo"></ion-img>

    
            <ion-button type="submit" color="success" expand="block" class=" text-white hover:bg-green-700" :disabled="!editMode">
              Submit
            </ion-button>
           
     
          </form>
        </div>

        <div v-if="mainStore.user.role =='coach'" class="update-profile-container">
          <h2 class="update-profile-title">Update Your Profile</h2>
          <ion-button color="success"  @click="toggleEditMode" expand="block" class="mb-4  text-white hover:bg-green-700">
            {{ editMode ? 'Cancel Edit' : 'Edit Profile' }}
          </ion-button>
          <form @submit.prevent="submitForm2">
            <div class="flex flex-col gap-5  " >
              <ion-label position="floating" class="">Name</ion-label>
              <ion-input id="name" v-model="name" :disabled="!editMode"></ion-input>
            </div>
            <div class="flex flex-col gap-5  " >
              <ion-label position="floating" class="">Description</ion-label>
              <ion-input id="name" v-model="description" :disabled="!editMode"></ion-input>
            </div>
          
            <ion-button type="submit" color="success" expand="block" class=" text-white hover:bg-green-700" :disabled="!editMode">
              Submit
            </ion-button>
     
          </form>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useMainStore } from '@/stores/MainStore';
  import { getDocument, updateDocument } from '@/firebase/FirebaseMethods';
  // import { useRouter } from 'vue-router';

import { Camera, CameraResultType } from '@capacitor/camera';
import { getStorage } from 'firebase/storage';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '@/firebase/firebase';

  import {
    IonPage,
    IonContent,
    IonInput,
    IonImg,
    IonButton,

    IonLabel,
    IonSelect,
    IonSelectOption
  } from '@ionic/vue';
  const mainStore = useMainStore()
  const name = ref(''); // Pre-fill with user data
  const age = ref('{{ user.age }}'); // Pre-fill with user data
  // const email = ref('{{ user.email }}'); // Pre-fill with user data (disabled)
  const gender = ref('{{ user.gender }}'); // Pre-fill with user data
  const description = ref(''); // Pre-fill with user data
  const weight = ref('{{ user.weight }}'); // Pre-fill with user data
  const height = ref('{{ user.height }}'); // Pre-fill with user data
  const bodyType = ref('{{ user.type }}'); // Pre-fill with user data
  const editMode = ref(false);
  const imgUrl = ref('')
  // const router = useRouter();
  onMounted(async ()=>{
    const user = await getDocument('users',mainStore.user.uid)
    name.value = user.name
    age.value = user.age
    gender.value = user.gender
    weight.value = user.weight
    height.value = user.height
    bodyType.value = user.type
    description.value =  user.description
  })
  const toggleEditMode = () => {
    editMode.value = !editMode.value;
  };
  
  const submitForm = async () => {
    try {
      const userStore = useMainStore();
      const userId = userStore.user?.uid;
      if (userId) {
        await uploadPhoto()
        await updateDocument('users', userId, {
          name: name.value,
          age: age.value,
          gender: gender.value,
          weight: weight.value,
          height: height.value,
          type: bodyType.value,
          image:imgUrl.value
        });
        alert('Profile updated successfully');
    
        console.log('Profile updated successfully');
      }
    } catch (error) {
      alert(error.message);
      console.error('Error updating profile:', error);
    }
  };
  const submitForm2 = async () => {
    try {
      const userStore = useMainStore();
      const userId = userStore.user?.uid;
      if (userId) {
        await uploadPhoto()
        await updateDocument('users', userId, {
          name: name.value,
          description: description.value
        });
        alert('Profile updated successfully');
       
        console.log('Profile updated successfully');
      }
    } catch (error) {
      alert(error.message);
      console.error('Error updating profile:', error);
    }
  };

  const storage = getStorage(firebaseApp)
const photo = ref(null);

const takePhoto = async () => {
  const image = await Camera.getPhoto({
    resultType: CameraResultType.DataUrl,
    quality: 90,
  });
  photo.value = image.dataUrl;
};

const uploadPhoto = async () => {
  if (!photo.value) return;

  const photoBlob = await fetch(photo.value).then((r) => r.blob());
  const fileName = new Date().getTime() + '.jpeg';
  const storageReference = storageRef(storage, 'images/' + fileName);

  try {
    await uploadBytes(storageReference, photoBlob);
    const url = await getDownloadURL(storageReference);
    alert('Photo uploaded! URL: ' + url);
    imgUrl.value = url
  } catch (error) {
    console.error('Upload failed', error);
    alert('Upload failed');
  }
};
  </script>
  
  <style scoped>
  ion-img {
  display: block;
  margin: 20px 0;
  width: 100%;
  max-width: 300px;
  height: auto;
  border: 2px solid #ccc;
  border-radius: 8px;
}
  .update-profile-container {
    max-width: 400px;
    margin: 0 auto;
  }
  .update-profile-title {
    text-align: center;
    margin-bottom: 16px;
  }
  
  </style>
  
  
