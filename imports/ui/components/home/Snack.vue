<template>
  <v-card>
    <v-img
      class="white--text"
      height="200px"
      src="https://apod.nasa.gov/apod/image/1905/crs17spaceXboggs1024.jpg"
    >
      <v-container
        fill-height
        fluid
      >
        <v-layout fill-height>
          <v-flex
            xs12
            align-end
            flexbox
          >
            <span class="headline">Notifications with SnackBar</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-text>
      <div>
        <span class="grey--text">Vuetify Snackbars are great for users notifications!!</span>
        <br>
        <v-icon>mdi-cloud</v-icon> <a
          href="https://vuex.vuejs.org/"
          target="_blank"
        >Vuex</a> for state management.
        <br>
        <v-icon>mdi-message</v-icon> <a
          href="https://vuetifyjs.com/en/components/snackbars"
          target="_blank"
        >Vuetify Snackbars</a>
        <br>
        <br>
        <span>Want to see SnackBars in action? Click on "Show" buttons on this card.</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="success"
        @click="showSnack('success', 'Oh Yeah!')"
      >
        Show!!
      </v-btn>
      <v-spacer />
      <v-btn
        text
        color="error"
        @click="showSnack('error', 'Oh No!')"
      >
        Show!!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
  export default {
    name:"Snack",
    methods: {
      showSnack(color, text){
        this.$store.commit("snack", {text, color})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>