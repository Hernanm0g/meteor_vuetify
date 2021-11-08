<template>
  <v-main>
    <v-container
      :fill-height="fillHeight"
      :fluid="fluid"
    >
      <slot name="default" />
    </v-container>
  </v-main>
</template>

<script cpl="vuetify">
/*--------  Mixins  --------*/
import fillHeightMixin from '../mixins/layout/fillHeight'
import fluidMixin from '../mixins/layout/fluid'

/*--------  Components  --------*/

export default {
  name:"BaseLayout",
  mixins:[
    fillHeightMixin,
    fluidMixin
  ]
}
</script>

<style lang="scss" scoped>

</style>