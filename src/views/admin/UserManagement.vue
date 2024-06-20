<template>
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold text-primary-dark mb-4">Admin Dashboard</h1>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-primary-light">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Age</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Gender</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.age }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.gender }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="removeUser(user.id)" class="text-sm font-medium text-red-600 hover:text-red-900">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getCollection, deleteDocument } from '@/firebase/FirebaseMethods';
  
  // Array to hold the list of users
  const users = ref([]);
  
  // Fetch users from Firebase on component mount
  onMounted(async () => {
    users.value = await getCollection('users');
  });
  
  // Function to remove a user
  const removeUser = async (userId) => {
    // Call the removeUser method from Firebase methods
    await deleteDocument(userId);
    // Remove the user from the local array
    users.value = users.value.filter(user => user.id !== userId);
  };
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>
  