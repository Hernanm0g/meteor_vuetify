<template>
  <v-snackbar
    v-cloak
    v-model="active"
    :timeout="4000"
    :color="color"
    dark
  >
    <span>
      <v-icon
        v-if="icons[color]"
        left
      >
        {{ icons[color] }}
      </v-icon>
      <b>{{ text }}</b>
    </span>
  </v-snackbar>
</template>
<script  lang="js" cpl="vuetify">
export default {
  name: "SnackBar",
  data() {
    return {
      icons: {
        error: "mdi-close",
        warning: "mdi-alert",
        info: "mdi-information",
        success: "mdi-check"
      }
    }
  },
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
