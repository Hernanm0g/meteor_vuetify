<template>
  <v-app>
    <!-- Dynamic Layouts are imported where -->
    <keep-alive>
      <component :is="layout">
        <template
          #default
        >
          <keep-alive>
            <router-view />
          </keep-alive>
        </template>
      </component>
    </keep-alive>
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
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Meteor Vuetify. Awesome!!',
    // all titles will be injected into this template
    titleTemplate: '%s | Meteor Vuetify'
  },
  components: {
    BaseLayout,
    AppBarLayout,
    SideBarLayout,
    ConfirmDialog,
    SnackBar
  },
  data() {
    return {
      defaultLayout: "SideBarLayout"
    }
  },
  computed: {
    layout() {
      if(!this.$route){
        return this.defaultLayout
      }
      return this.$route.meta.layout || this.defaultLayout
    }
  }
}
</script>

<style>

</style>
