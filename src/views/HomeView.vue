<template>
  <div class="home">
    <user-form :user="user" :key="user.id"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserForm from '@/components/user-form.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    UserForm
  },
  data(vm) {
    return {
      user: {
        id: ''
      }
    }
  },
  mounted() {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(response => response.json())
      .then(user => {
        this.user = user;
      })
  },
});
</script>
