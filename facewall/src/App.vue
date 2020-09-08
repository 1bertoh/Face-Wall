<template>
  <v-app>

  <router-view
  @getnormalizados='getNormalizados($event)'
  :normalizados='normalizados'></router-view>
  </v-app>
</template>


<script>
export default {
  name: 'App',
    data() {
      return {
        normalizados: {},
      }
    },
    methods: {
      getNormalizados(norm) {
        this.normalizados = Object.assign({}, this.normalizados, norm)
      }
    }
  
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-coor: #4A1488;
  
}
</style>
