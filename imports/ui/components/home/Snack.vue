<template>
  <v-card>
    <v-card-title>
      {{$t('home.snack.title')}}
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">{{$t('home.snack.text_1')}}</span>
        <br>
        <v-icon>mdi-cloud</v-icon> <a
          href="https://vuex.vuejs.org/"
          target="_blank"
        >Vuex</a> for state management.
        <br>
        <v-icon>mdi-message</v-icon> <a
          href="https://vuetifyjs.com/en/components/snackbars"
          target="_blank"
        >Vuetify Snackbars</a>
        <br>
        <br>
        <span>{{$t('home.snack.text_2')}}.</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="success"
        @click="showSnack('success', $t('home.snack.oh_yeah'))"
      >
        {{ $t('home.snack.show')}}
      </v-btn>
      <v-spacer />
      <v-btn
        text
        color="error"
        @click="showSnack('error', $t('home.snack.oh_no'))"
      >
        {{ $t('home.snack.show')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script cpl="vuetify">
  export default {
    name:"Snack",
    methods: {
      showSnack(color, text){
        this.$store.commit("snack", {text, color})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>