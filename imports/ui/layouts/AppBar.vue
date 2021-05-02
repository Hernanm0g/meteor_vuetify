<template>
  <div>
    <app-bar />
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

<script  lang="js" cpl="vuetify">

/*--------  Mixins  --------*/
import fillHeightMixin from '../mixins/layout/fillHeight'
import fluidMixin from '../mixins/layout/fluid'

/*--------  Components  --------*/
import AppBar from '../components/layout/AppBar.vue'

export default {
  name:"AppBarLayout",
  components: {
    AppBar
  },
  mixins: [
    fillHeightMixin,
    fluidMixin
  ],
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