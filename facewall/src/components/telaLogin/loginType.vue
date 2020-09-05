<template>
  <div>
    <v-container id="cont" grid-list-xs>
      <v-card id="test">
        <v-card-title justify-center>
          <v-layout row wrap id="test2">
            <v-flex md12 class="text-center">
              <p >Login</p>
            </v-flex>

            <v-flex xs12 md12  class="d-flex justify-center mb-6">
              <v-btn color width="250" 
              class="my-4 purple darken-3  justify-center mb-6" >
                Entrar
                </v-btn>
            </v-flex>

            <v-flex xs12 md12 class="d-flex justify-center" >
              <v-btn width="250" class="my-4 purple darken-4" @click="cadastrar=this.cadastrar=true">
                Cadastrar
                </v-btn>
            </v-flex>

          </v-layout>
        </v-card-title>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'loginType',
  props: {
    goCad: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
    cadastrar: false,
    }
  },
};
</script>
<style lang="">

</style>
