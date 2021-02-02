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
    <confirm-dialog />
    <snack-bar />
  </v-app>
</template>


<script lang="js">


/*--------  Dynamic Async Components  --------*/

const BaseLayout = ()=>import("./layouts/Base.vue")
const AppBarLayout = ()=>import("./layouts/AppBar.vue")
const SideBarLayout = ()=>import("./layouts/SideBar.vue")


/*--------  Sync Components  --------*/

import ConfirmDialog from './components/general/ConfirmDialog.vue'
import SnackBar from './components/general/SnackBar.vue'

export default {
  name:"App",
  components: {
    BaseLayout,
    AppBarLayout,
    SideBarLayout,
    ConfirmDialog,
    SnackBar
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
