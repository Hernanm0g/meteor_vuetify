<template>
  <div>
    <side-bar
      v-model="drawer"
    />
    <app-bar
      show-nav-icon
      @togle-drawer="drawer=!drawer"
    />
    <v-main>
      <v-container
        :fill-height="fillHeight"
        :fluid="fluid"
      >
        <slot name="default" />
      </v-container>
    </v-main>
  </div>
</template>

<script lang="js">

/*--------  Mixins  --------*/
import fillHeightMixin from '../mixins/layout/fillHeight'
import fluidMixin from '../mixins/layout/fluid'

/*--------  Components  --------*/
import AppBar from '../components/layout/AppBar.vue'
import SideBar from '../components/layout/SideBar.vue'

export default {
  name:"SideBarLayout",
  components: {
    AppBar,
    SideBar
  },
  mixins: [
    fillHeightMixin,
    fluidMixin
  ],
  data() {
    return {
      drawer: null
    }
  },
  computed: {
    fillHeight(){
      if(!this.$route) return false
      return !!this.$route.meta.fillHeight
    }
  }
}
</script>

<style lang="scss" scoped>

</style>