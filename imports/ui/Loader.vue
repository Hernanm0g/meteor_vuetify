<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="loading"
      persistent
      content-class="loading-dialog">
    <v-progress-circular
      :size="50"
      indeterminate
      color="white">
    </v-progress-circular>
    </v-dialog>
  </div>
</template>
<script>
  export default  {
    data(){
      return {
      }
    },
    computed : {
      loading(){
        return this.$store.state.loading;
      }
    }
  }
</script>
<style>
  .v-overlay--active::before {
    opacity: 0.7;
  }
  .v-dialog.loading-dialog {
    box-shadow: none;

    overflow-y: unset;

    width: auto;
  }
</style>
