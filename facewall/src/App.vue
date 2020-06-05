<template>
  <v-app>

  <router-view></router-view>
  </v-app>
</template>


<script>
export default {
  name: 'App',
    data: () => ({
      drawer: false,
    }),
  
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-coor: #4A1488;
  
}
</style>
