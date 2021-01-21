<template>
  <v-main>
    <v-container>
      <slot name="default" />
    </v-container>
  </v-main>
</template>

<script lang="vuetify">
/*--------  Mixins  --------*/
import fillHeightMixin from '../mixins/layout/fillHeight'

/*--------  Components  --------*/

export default {
  name:"BaseLayout",
  mixins:[
    fillHeightMixin
  ]
}
</script>

<style lang="scss" scoped>

</style>