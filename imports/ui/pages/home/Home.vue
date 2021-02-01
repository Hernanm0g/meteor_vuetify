<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <installed />
    </v-col>
    <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <accounts />
    </v-col>
  </v-row>
</template>

<script lang="js">
  import Installed from '../../components/home/Installed.vue'
  import Accounts from '../../components/home/Accounts.vue'
  export default {
    name:"Home",
    components: {
      Installed,
      Accounts
    }
  }
</script>

<style lang="scss" scoped>

</style>