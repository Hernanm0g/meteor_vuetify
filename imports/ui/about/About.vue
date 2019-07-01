<template lang="html">
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          This is an example, so you can see a little piece of what vue-router and vuex can do.
        </v-card-title>
        <v-card-text>
          <ul>
            <li>
              Click on back button in your browser. Thats Vue-router history mode.
            </li>
            <li>
              Open Left Navigation Drawer and go to home page.
            </li>
            <li>
              Use breadcrumbs above to navigate. We store breadcrumbs globally using vuex. You can use Vuex to store anything in a global scope.
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "About",
  mounted(){
    this.$store.commit("updateCrumbs", {
      position: 0,
      name: "About",
      icon:"info",
      link: {
        name:"about"
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>
