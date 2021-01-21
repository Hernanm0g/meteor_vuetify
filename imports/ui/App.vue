<template>
  <v-app>
    <!-- Dynamic Layouts are imported where -->
    <component :is="layout">
      <template
        #default
      >
        <router-view />
      </template>
    </component>
  </v-app>
</template>


<script lang="vuetify">
const BaseLayout = ()=>import("./layouts/Base.vue")
const AppBarLayout = ()=>import("./layouts/AppBar.vue")
export default {
  name:"App",
  components: {
    BaseLayout,
    AppBarLayout
  },
  computed: {
    layout() {
      if(!this.$route){
        return "BaseLayout"
      }
      return this.$route.meta.layout || "BaseLayout"
    }
  }
}
</script>

<style>

</style>
