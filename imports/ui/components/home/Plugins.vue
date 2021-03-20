<template>
  <!-- Vue router and Vuex -->
  <v-card>
    <v-card-title>
      Page Router and State Management
    </v-card-title>
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