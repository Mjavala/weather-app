<template>
  <v-app>
      <RandomNumbers />
  </v-app>
</template>

<script>
import RandomNumbers from './components/RandomNumberGen';


export default {
  name: 'App',
  components: {
    RandomNumbers,
  },
};
</script>
