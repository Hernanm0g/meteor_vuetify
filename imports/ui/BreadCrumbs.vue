<template lang="html">
  <v-toolbar class="mb-2">
    <v-toolbar-title>
      <v-btn
        flat
        class="caption py-1 px-2 ma-0"
        :to="{name:'home'}"
        exact>
        <v-icon>home</v-icon>
        &nbsp;
        Home
      </v-btn>
      <template v-for="(crumb, index) in crumbs">
        <v-icon>arrow_right</v-icon>
        <v-btn
          flat
          class="caption py-1 px-2 ma-0"
          :to="crumb.link"
          exact>
          <v-icon>{{crumb.icon}}</v-icon>
          &nbsp;
          <span class="hidden-xs-only">{{ crumb.name }}</span>
        </v-btn>
      </template>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
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
