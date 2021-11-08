<template lang="html">
  <v-card>
    <v-card-text>
      {{ $t('locale.language' )}}
      <v-radio-group v-if="!!user" v-model="language">
        <template v-for="item in languages">
          <v-radio
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></v-radio>
        </template>
      </v-radio-group>
      <v-radio-group v-if="!user" v-model="language">
        <template v-for="item in languages">
          <v-radio
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></v-radio>
        </template>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>

<script cpl="vuetify">
export default {
  name: "LanguagePicker",
  data() {
    return {
      languages: Meteor.settings.public.i18n.languages
    };
  },
  computed: {
    language: {
      get: function() {
        return this.$store.state.language;
      },
      set: function(lang) {
        this.$store.commit("setLanguage", lang, this.user);
      }
    }
  },
  meteor: {
    user() {
      return Meteor.user();
    }
  }  
};
</script>
