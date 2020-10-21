<template>
  <v-snackbar
    v-cloak
    v-model="active"
    top
    :timeout="3000"
    :color="color"
  >
    <span>
      <v-icon
        v-if="color=='error'"
        color="white"
      >mdi-close</v-icon>
      <v-icon
        v-if="color=='success'"
        color="white"
      >mdi-check</v-icon>
      <v-icon
        v-if="color=='info'"
        color="white"
      >mdi-information</v-icon>
      <v-icon
        v-if="color=='warning'"
        color="white"
      >mdi-alert</v-icon>
      &nbsp;{{ text }}
    </span>
  </v-snackbar>
</template>
<script>
export default {
  name: "SnackBar",
  computed:{
    active:{
      get(){
        return this.$store.state.snack.active
      },
      set(a){
        if (!a) {
          this.$store.commit("deactivateSnack")
        }
      }
    },
    color(){
      return this.$store.state.snack.color
    },
    text() {
      return this.$store.state.snack.text
    },
  }
}
</script>
<style lang="css" scoped>
</style>
