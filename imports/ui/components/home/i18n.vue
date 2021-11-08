<template>
  <!-- Vue router and Vuex -->
  <v-card>
    <v-card-title>
      {{ $t('home.i18n.title')}}
    </v-card-title>
    <v-card-text>
      <div>        
        <span>{{ $t('home.i18n.text_1') }}</span>
      </div>
      <LanguagePicker/>
    </v-card-text>
    <v-card-actions>
      
    </v-card-actions>
  </v-card>
</template>

<script cpl="vuetify">
  import LanguagePicker from "../general/LanguagePicker.vue"
  export default {
    name:"Plugins",
    components: {
      LanguagePicker
    }
  }
</script>

<style lang="scss" scoped>
