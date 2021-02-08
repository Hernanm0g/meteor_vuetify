<template>
  <div>
    <v-btn
      text
      class="caption py-1 px-2 ma-0"
      :to="{name:'home'}"
      exact
    >
      <v-icon
        :left="$vuetify.breakpoint.smAndUp"
      >
        mdi-home
      </v-icon>
      <span class="hidden-xs-only">Home</span>
    </v-btn>
    <template v-for="(crumb, index) in crumbs">
      <v-icon
        :key="index"
      >
        mdi-menu-right
      </v-icon>
      <v-btn
        :key="index+'button'"
        text
        class="caption py-1 px-2 ma-0"
        :to="crumb.link"
        exact
      >
        <v-icon
          :left="$vuetify.breakpoint.smAndUp"
        >
          {{ crumb.icon }}
        </v-icon>
        <span class="hidden-xs-only">{{ crumb.name }}</span>
      </v-btn>
    </template>
  </div>
</template>

<script lang="js">
export default {
  name:"Breadcrumbs",
  computed: {
    crumbs(){
      if (!this.$store.state.crumbs[0]) {
        return[]
      }
      return this.$store.state.crumbs;
    }
  }
}
</script>

<style lang="css" scoped>
</style>