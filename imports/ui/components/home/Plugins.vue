<template>
  <!-- Vue router and Vuex -->
  <v-card>
    <v-img
      class="white--text"
      height="200px"
      src="https://apod.nasa.gov/apod/image/1906/NoctilucentNetherlands_Simmering_1080.jpg"
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
            <span class="headline">Page Router and State Management</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-text>
      <div>
        <span class="grey--text">Vue Router and Vuex</span>
        <br>
        <v-icon>mdi-link</v-icon> <a
          href="https://router.vuejs.org/"
          target="_blank"
        >Vue router</a> installed.
        <br>
        <v-icon>mdi-cloud</v-icon> <a
          href="https://vuex.vuejs.org/"
          target="_blank"
        >Vuex</a> installed.
        <br>
        <br>
        <span>Want to see VueRouter and Vuex in action? Click on "Change route!!" on this card and watch the breadcrumbs above.</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="orange"
        :to="{name:'about'}"
      >
        Change route!!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
  export default {
    name:"Plugins",
  }
</script>

<style lang="scss" scoped>

</style>