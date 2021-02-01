<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <installed />
    </v-col>
  </v-row>
</template>

<script lang="vuetify">
  import Installed from '../../components/home/Installed.vue'
  export default {
    name:"Home",
    components: {
      Installed
    }
  }
</script>

<style lang="scss" scoped>

</style>