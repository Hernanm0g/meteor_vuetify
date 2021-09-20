<template>
  <!-- Vue router and Vuex -->
  <v-card>
    <v-card-title>
      {{$t('home.plugins.title')}}
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">Vue Router and Vuex</span>
        <br>
        <v-icon>mdi-link</v-icon> <a
          href="https://router.vuejs.org/"
          target="_blank"
        >Vue router</a> installed.
        <br>
        <v-icon>mdi-cloud</v-icon> <a
          href="https://vuex.vuejs.org/"
          target="_blank"
        >Vuex</a> installed.
        <br>
        <br>
        <span>{{$t('home.plugins.see_in_action')}}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="orange"
        :to="{name:'about'}"
      >
        {{$t('home.plugins.change_route')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
  export default {
    name:"Plugins",
  }
</script>

<style lang="scss" scoped>

</style>