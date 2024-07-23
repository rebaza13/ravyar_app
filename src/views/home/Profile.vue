<template>
  <ion-page class="update-profile">
    <ion-content class="ion-padding">
      <!-- User Profile Update Section -->
      <div v-if="mainStore.user.role === 'user'" class="update-profile-container">
        <h2 class="update-profile-title">Update Your Profile</h2>
        <ion-button color="success" @click="toggleEditMode" expand="block" class="mb-4">
          {{ editMode ? 'Cancel Edit' : 'Edit Profile' }}
        </ion-button>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <ion-label position="floating">Name</ion-label>
            <ion-input id="name" v-model="name" :disabled="!editMode"></ion-input>
          </div>
          <div class="form-group">
            <ion-label position="floating">Age</ion-label>
            <ion-input id="age" type="number" v-model="age" :disabled="!editMode"></ion-input>
          </div>
          <div class="form-group">
            <ion-label position="floating">Gender</ion-label>
            <ion-select id="gender" v-model="gender" :disabled="!editMode">
              <ion-select-option value="male">Male</ion-select-option>
              <ion-select-option value="female">Female</ion-select-option>
            </ion-select>
          </div>
          <div class="form-group">
            <ion-label position="floating">Weight (kg)</ion-label>
            <ion-input id="weight" type="number" v-model="weight" :disabled="!editMode"></ion-input>
          </div>
          <div class="form-group">
            <ion-label position="floating">Height (cm)</ion-label>
            <ion-input id="height" type="number" v-model="height" :disabled="!editMode"></ion-input>
          </div>
          <div class="form-group">
            <ion-label position="floating">Body Type</ion-label>
            <ion-select id="bodyType" v-model="bodyType" :disabled="!editMode">
              <ion-select-option value="slim">Slim</ion-select-option>
              <ion-select-option value="average">Average</ion-select-option>
              <ion-select-option value="athletic">Athletic</ion-select-option>
              <ion-select-option value="curvy">Curvy</ion-select-option>
            </ion-select>
          </div>
          <div class="form-group">
            <ion-button @click="takePhoto" color="success" :disabled="!editMode">Take Photo</ion-button>
            <ion-img v-if="photo" :src="photo"></ion-img>
          </div>
          <ion-button type="submit" color="success" expand="block" class="mb-4" :disabled="!editMode">
            Submit
          </ion-button>
        </form>
      </div>

      <!-- Coach Profile Update Section -->
      <div v-if="mainStore.user.role === 'coach'" class="update-profile-container">
        <h2 class="update-profile-title">Update Your Profile</h2>
        <ion-button color="success" @click="toggleEditMode" expand="block" class="mb-4">
          {{ editMode ? 'Cancel Edit' : 'Edit Profile' }}
        </ion-button>
        <form @submit.prevent="submitForm2">
          <img class="w-20  h-20 rounded-full my-6 mx-auto " :src="isImage" alt="">
          <div class="form-group">
            <ion-label position="floating">Name</ion-label>
            <ion-input id="name" v-model="name" :disabled="!editMode"></ion-input>
          </div>
          <div class="form-group">
            <ion-label position="floating">Description</ion-label>
            <ion-input id="description" v-model="description" :disabled="!editMode"></ion-input>
          </div>
          <div class="form-group">
            <ion-label position="floating">work price</ion-label>
            <ion-input id="description" v-model="price" :disabled="!editMode"></ion-input>
          </div>
          <div class="form-group">
            <ion-button @click="takePhoto" color="success" :disabled="!editMode">Take Photo</ion-button>
            <ion-img v-if="photo" :src="photo"></ion-img>
          </div>
          <ion-button type="submit" color="success" expand="block" class="mb-4" :disabled="!editMode">
            Submit
          </ion-button>
          <div class="pb-10"></div>
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
  const gender = ref(''); // Pre-fill with user data
  const price = ref(0); // Pre-fill with user data
  const description = ref(''); // Pre-fill with user data
  const weight = ref('{{ user.weight }}'); // Pre-fill with user data
  const height = ref('{{ user.height }}'); // Pre-fill with user data
  const bodyType = ref('{{ user.type }}'); // Pre-fill with user data
  const editMode = ref(false);
  const imgUrl = ref('')
  const isImage = ref('')
  // const router = useRouter();
  onMounted(async ()=>{
    const user = await getDocument('users',mainStore.user.uid)
    name.value = user.name
    age.value = user.age
    gender.value = user.gender
    weight.value = user.weight
    height.value = user.height
    bodyType.value = user.type
    price.value = user.price?user.price:0
    description.value =  user.description
    isImage.value = user?user.image:''
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
        photo.value = ''
        editMode.value = !editMode.value;
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
          description: description.value,
          image:imgUrl.value,
          price:price.value
        });
        alert('Profile updated successfully');
       
        console.log('Profile updated successfully');
      }
    } catch (error) {
      alert(error.message);
      console.error('Error updating profile:', error);
    }
    imgUrl.value =''
    photo.value = null


    const user = await getDocument('users',mainStore.user.uid)
    name.value = user.name
    age.value = user.age
    gender.value = user.gender
    weight.value = user.weight
    height.value = user.height
    bodyType.value = user.type
    description.value =  user.description
    isImage.value = user?user.image:''  
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
  .update-profile {
    background-color: #ffffff; /* Example background color */
    height: 100%;
  }

  .update-profile-container {
    background-color: #ffffff; /* White background for the container */
    padding: 20px;
    margin-bottom: 20px;

  }

  .update-profile-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333333; /* Dark text color */
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .ion-button {
    --background: #4caf50; /* Custom success button color */
    --border-radius: 8px; /* Custom button border radius */
  }

  .ion-button:hover {
    --background: #388e3c; /* Custom hover background color */
  }
</style>
  
  
