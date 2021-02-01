<template>
  <div>
    <app-bar />
    <v-main>
      <v-container
        :fill-height="fillHeight"
      >
        <slot name="default" />
      </v-container>
    </v-main>
  </div>
</template>

<script lang="js">

/*--------  Mixins  --------*/
import fillHeightMixin from '../mixins/layout/fillHeight'

/*--------  Components  --------*/
import AppBar from '../components/layout/AppBar.vue'

export default {
  name:"AppBarLayout",
  components: {
    AppBar
  },
  mixins: [
    fillHeightMixin
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